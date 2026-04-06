"""
XGBoost Weather Prediction Model

Trains separate regressors for each weather target and
performs autoregressive multi-step forecasting (168 hours = 7 days).
"""

import numpy as np
import pandas as pd
import xgboost as xgb
from datetime import datetime, timedelta
from typing import Dict, List, Optional

from app.ml.features import (
    TARGET_COLUMNS,
    prepare_features,
    get_feature_columns,
    split_features_targets,
)


class WeatherModel:
    """XGBoost-based weather forecasting model for a single city."""

    def __init__(self):
        self.models: Dict[str, xgb.XGBRegressor] = {}
        self.is_trained: bool = False
        self.last_trained: Optional[datetime] = None
        self.training_data: Optional[pd.DataFrame] = None

    # ─── Training ───────────────────────────────────────────

    def train(self, df: pd.DataFrame) -> Dict[str, float]:
        """
        Train XGBoost models on historical hourly data.

        Returns dict mapping target name → training RMSE.
        """
        self.training_data = df.copy()
        prepared = prepare_features(df)
        X, y = split_features_targets(prepared)

        metrics: Dict[str, float] = {}

        for target in TARGET_COLUMNS:
            model = xgb.XGBRegressor(
                n_estimators=200,
                max_depth=6,
                learning_rate=0.05,
                subsample=0.8,
                colsample_bytree=0.8,
                reg_alpha=0.1,
                reg_lambda=1.0,
                random_state=42,
                n_jobs=-1,
            )
            model.fit(X, y[target], verbose=False)

            preds = model.predict(X)
            rmse = float(np.sqrt(np.mean((y[target].values - preds) ** 2)))
            metrics[target] = round(rmse, 4)
            self.models[target] = model

        self.is_trained = True
        self.last_trained = datetime.now()
        return metrics

    # ─── Prediction ─────────────────────────────────────────

    def predict(self, hours: int = 168) -> List[Dict]:
        """
        Autoregressively predict the next *hours* of weather.
        Default 168 h = 7 days.
        """
        if not self.is_trained or self.training_data is None:
            raise RuntimeError("Model must be trained before prediction.")

        feature_cols = get_feature_columns()
        context = self.training_data.copy()
        last_ts = pd.to_datetime(context["timestamp"].iloc[-1])

        # Noise scales per target (for realistic variance)
        noise_scale = {
            "temperature": 0.8,
            "humidity": 2.0,
            "wind_speed": 1.0,
            "pressure": 0.5,
            "aqi": 5.0,
        }
        # Valid ranges per target
        clamp = {
            "temperature": (5, 50),
            "humidity": (5, 100),
            "wind_speed": (0, 60),
            "pressure": (990, 1040),
            "aqi": (10, 500),
        }

        predictions: List[Dict] = []

        for step in range(hours):
            next_ts = last_ts + timedelta(hours=step + 1)
            is_day = 1 if 6 <= next_ts.hour < 18 else 0

            # Placeholder row (values will be overwritten by predictions)
            placeholder = {
                "timestamp": next_ts.isoformat(),
                "temperature": context["temperature"].iloc[-1],
                "humidity": context["humidity"].iloc[-1],
                "wind_speed": context["wind_speed"].iloc[-1],
                "pressure": context["pressure"].iloc[-1],
                "aqi": context["aqi"].iloc[-1],
                "is_day": is_day,
            }
            context = pd.concat(
                [context, pd.DataFrame([placeholder])], ignore_index=True
            )

            # Prepare features on a small tail window
            tail = prepare_features(context.tail(50))
            if tail.empty:
                continue

            X_pred = tail[feature_cols].iloc[[-1]]
            pred_row: Dict = {
                "timestamp": next_ts.isoformat(),
                "is_day": is_day,
            }

            for target in TARGET_COLUMNS:
                raw = float(self.models[target].predict(X_pred)[0])
                noisy = raw + np.random.normal(0, noise_scale[target])
                lo, hi = clamp[target]
                pred_row[target] = round(float(np.clip(noisy, lo, hi)), 1)

            # Feed predictions back into context for next step
            for target in TARGET_COLUMNS:
                context.at[context.index[-1], target] = pred_row[target]

            predictions.append(pred_row)

        return predictions
