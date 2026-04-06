"""
Weather Service — Central Orchestrator

Manages per-city historical data, ML model lifecycle, and prediction cache.

Key behaviors:
  • On startup  → generate 45 days of data, train all 35 models
  • Every midnight → append yesterday's 24 h data, retrain all models
  • Predictions are cached and refreshed after each retrain
"""

import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional

import pandas as pd

from app.data.cities import GUJARAT_CITIES, get_city_names
from app.data.generator import generate_initial_data, generate_day_data
from app.ml.model import WeatherModel

logger = logging.getLogger(__name__)


class WeatherService:
    """Manages weather data and ML models for all Gujarat cities."""

    def __init__(self):
        # city → DataFrame of accumulated hourly data
        self.historical_data: Dict[str, pd.DataFrame] = {}
        # city → trained WeatherModel
        self.models: Dict[str, WeatherModel] = {}
        # city → list[dict] (7-day hourly predictions)
        self.predictions_cache: Dict[str, List[Dict]] = {}
        # city → date of last appended data
        self.last_data_date: Dict[str, datetime] = {}
        self.initialized: bool = False

    # ─── Startup ────────────────────────────────────────────

    async def initialize(self):
        """Generate initial data and train all models (called once at startup)."""
        logger.info(
            "🌤️  Initializing weather service for %d cities …",
            len(GUJARAT_CITIES),
        )

        for city in get_city_names():
            try:
                # 1. Generate 45 days of hourly data
                df = generate_initial_data(city, days=45)
                self.historical_data[city] = df
                self.last_data_date[city] = datetime.now().replace(
                    hour=0, minute=0, second=0, microsecond=0
                )

                # 2. Train model
                model = WeatherModel()
                metrics = model.train(df)
                self.models[city] = model

                # 3. Cache 7-day predictions
                self.predictions_cache[city] = model.predict(hours=168)

                logger.info(
                    "  ✅ %s — RMSE: temp=%.2f  aqi=%.2f",
                    city,
                    metrics["temperature"],
                    metrics["aqi"],
                )
            except Exception as e:
                logger.error("  ❌ %s failed: %s", city, e)

        self.initialized = True
        logger.info(
            "🚀 Weather service ready — %d/%d cities loaded",
            len(self.models),
            len(GUJARAT_CITIES),
        )

    # ─── Daily Retrain (midnight) ───────────────────────────

    async def daily_retrain(self):
        """
        Midnight routine:
          1. Generate yesterday's 24 h data for every city
          2. Append to accumulated history
          3. Retrain all models on full history
          4. Refresh prediction cache
        """
        logger.info("🔄 Daily retrain started at %s", datetime.now().isoformat())

        yesterday = datetime.now().replace(
            hour=0, minute=0, second=0, microsecond=0
        ) - timedelta(days=1)

        for city in get_city_names():
            try:
                # 1. New day's data
                new_data = generate_day_data(city, yesterday)

                # 2. Append (accumulate)
                if city in self.historical_data:
                    self.historical_data[city] = pd.concat(
                        [self.historical_data[city], new_data],
                        ignore_index=True,
                    )
                else:
                    self.historical_data[city] = new_data

                self.last_data_date[city] = datetime.now().replace(
                    hour=0, minute=0, second=0, microsecond=0
                )

                # 3. Retrain
                model = WeatherModel()
                metrics = model.train(self.historical_data[city])
                self.models[city] = model

                # 4. Refresh predictions
                self.predictions_cache[city] = model.predict(hours=168)

                logger.info("  ✅ %s retrained — %s", city, metrics)
            except Exception as e:
                logger.error("  ❌ %s retrain failed: %s", city, e)

        logger.info("🔄 Daily retrain complete")

    # ─── Manual Train ───────────────────────────────────────

    async def train_city(self, city: str) -> dict:
        """Manually trigger training for a single city."""
        if city not in GUJARAT_CITIES:
            raise ValueError(f"Unknown city: {city}")

        df = self.historical_data.get(city)
        if df is None:
            df = generate_initial_data(city, days=45)
            self.historical_data[city] = df

        model = WeatherModel()
        metrics = model.train(df)
        self.models[city] = model

        self.predictions_cache[city] = model.predict(hours=168)

        return {
            "status": "success",
            "city": city,
            "message": f"Model trained successfully for {city}",
            "metrics": metrics,
            "trained_at": datetime.now().isoformat(),
            "data_points": len(df),
        }

    # ─── Getters ────────────────────────────────────────────

    def get_predictions(self, city: str) -> dict:
        if city not in GUJARAT_CITIES:
            raise ValueError(f"Unknown city: {city}")
        if city not in self.predictions_cache:
            raise RuntimeError(
                f"No predictions for {city}. Train the model first."
            )
        return {
            "city": city,
            "forecast_hours": len(self.predictions_cache[city]),
            "generated_at": datetime.now().isoformat(),
            "predictions": self.predictions_cache[city],
        }

    def get_historical_data(
        self, city: str, last_day_only: bool = True
    ) -> dict:
        """Return historical data. Default: last 24 hours only."""
        if city not in GUJARAT_CITIES:
            raise ValueError(f"Unknown city: {city}")
        df = self.historical_data.get(city)
        if df is None:
            raise RuntimeError(f"No historical data for {city}")

        if last_day_only:
            df_slice = df.tail(24)
            period = "last_24_hours"
        else:
            df_slice = df
            period = "all"

        return {
            "city": city,
            "period": period,
            "data_points": len(df_slice),
            "data": df_slice.to_dict(orient="records"),
        }

    def get_status(self) -> dict:
        return {
            "initialized": self.initialized,
            "cities_loaded": len(self.historical_data),
            "models_trained": len(self.models),
            "cities": get_city_names(),
        }


# Singleton instance
weather_service = WeatherService()
