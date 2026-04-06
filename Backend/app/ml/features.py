"""
Feature Engineering Pipeline

Transforms raw hourly weather data into ML-ready features:
  - Cyclical time encodings (hour, day-of-week, day-of-year)
  - Lag features (1 h, 3 h, 6 h, 24 h)
  - Rolling means (6 h, 24 h windows)
"""

import numpy as np
import pandas as pd
from typing import Tuple, List

TARGET_COLUMNS = ["temperature", "humidity", "wind_speed", "pressure", "aqi"]
LAG_HOURS = [1, 3, 6, 24]
ROLLING_WINDOWS = [6, 24]


def create_time_features(df: pd.DataFrame) -> pd.DataFrame:
    """Extract cyclical time features from timestamps."""
    df = df.copy()
    df["timestamp_dt"] = pd.to_datetime(df["timestamp"])

    hour = df["timestamp_dt"].dt.hour
    dow = df["timestamp_dt"].dt.dayofweek
    doy = df["timestamp_dt"].dt.dayofyear

    df["hour_sin"] = np.sin(2 * np.pi * hour / 24)
    df["hour_cos"] = np.cos(2 * np.pi * hour / 24)
    df["dow_sin"] = np.sin(2 * np.pi * dow / 7)
    df["dow_cos"] = np.cos(2 * np.pi * dow / 7)
    df["doy_sin"] = np.sin(2 * np.pi * doy / 365)
    df["doy_cos"] = np.cos(2 * np.pi * doy / 365)

    return df


def create_lag_features(df: pd.DataFrame) -> pd.DataFrame:
    """Create lag features for all target columns."""
    df = df.copy()
    for col in TARGET_COLUMNS:
        for lag in LAG_HOURS:
            df[f"{col}_lag_{lag}"] = df[col].shift(lag)
    return df


def create_rolling_features(df: pd.DataFrame) -> pd.DataFrame:
    """Create rolling-mean features."""
    df = df.copy()
    for col in TARGET_COLUMNS:
        for window in ROLLING_WINDOWS:
            df[f"{col}_roll_mean_{window}"] = (
                df[col].rolling(window=window).mean()
            )
    return df


def prepare_features(df: pd.DataFrame) -> pd.DataFrame:
    """Full feature-engineering pipeline. Drops NaN rows from lags."""
    df = create_time_features(df)
    df = create_lag_features(df)
    df = create_rolling_features(df)
    df = df.dropna().reset_index(drop=True)
    return df


def get_feature_columns() -> List[str]:
    """Return the ordered list of feature column names for the model."""
    cols = ["hour_sin", "hour_cos", "dow_sin", "dow_cos",
            "doy_sin", "doy_cos", "is_day"]

    for col in TARGET_COLUMNS:
        for lag in LAG_HOURS:
            cols.append(f"{col}_lag_{lag}")

    for col in TARGET_COLUMNS:
        for window in ROLLING_WINDOWS:
            cols.append(f"{col}_roll_mean_{window}")

    return cols


def split_features_targets(
    df: pd.DataFrame,
) -> Tuple[pd.DataFrame, pd.DataFrame]:
    """Split prepared DataFrame into X (features) and y (targets)."""
    feature_cols = get_feature_columns()
    return df[feature_cols], df[TARGET_COLUMNS]
