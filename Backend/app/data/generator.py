"""
Weather Data Generator

Produces realistic hourly weather data using mathematical models:
  - Seasonal sine wave  (yearly cycle)
  - Diurnal  sine wave  (daily cycle — day/night)
  - Gaussian random noise for natural variability
"""

import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from typing import Optional

from app.data.cities import get_city_profile


def generate_hourly_data(
    city: str,
    start_date: datetime,
    end_date: datetime,
    seed: Optional[int] = None,
) -> pd.DataFrame:
    """
    Generate realistic hourly weather data for a Gujarat city.

    Returns DataFrame with columns:
        timestamp, temperature, humidity, wind_speed,
        pressure, aqi, is_day
    """
    if seed is not None:
        np.random.seed(seed)

    profile = get_city_profile(city)
    hours = int((end_date - start_date).total_seconds() / 3600)
    timestamps = [start_date + timedelta(hours=h) for h in range(hours)]

    records = []
    for ts in timestamps:
        hour = ts.hour
        doy = ts.timetuple().tm_yday

        # ── Temperature ─────────────────────────────────────
        seasonal = 5 * np.sin(2 * np.pi * (doy - 100) / 365)
        diurnal = profile["temp_amplitude"] * np.sin(
            2 * np.pi * (hour - 5) / 24
        )
        temperature = round(
            profile["base_temp"] + seasonal + diurnal + np.random.normal(0, 1.5),
            1,
        )

        # ── Humidity (inversely correlated with temp) ───────
        hum_diurnal = -15 * np.sin(2 * np.pi * (hour - 5) / 24)
        hum_seasonal = 10 * np.sin(2 * np.pi * (doy - 200) / 365)
        humidity = round(
            np.clip(
                profile["base_humidity"]
                + hum_diurnal
                + hum_seasonal
                + np.random.normal(0, 5),
                10,
                100,
            ),
            1,
        )

        # ── Wind Speed ──────────────────────────────────────
        wind_diurnal = 4 * np.sin(2 * np.pi * (hour - 6) / 24)
        wind_speed = round(
            max(0, profile["base_wind"] + wind_diurnal + np.random.normal(0, 2)),
            1,
        )

        # ── Pressure ────────────────────────────────────────
        pres_diurnal = 2 * np.sin(2 * np.pi * (hour - 10) / 12)
        pressure = round(
            profile["base_pressure"] + pres_diurnal + np.random.normal(0, 1),
            1,
        )

        # ── AQI ─────────────────────────────────────────────
        aqi_diurnal = 20 * (np.sin(2 * np.pi * (hour - 2) / 12) ** 2)
        aqi_seasonal = 15 * np.cos(2 * np.pi * (doy - 350) / 365)
        aqi = round(
            max(10, profile["base_aqi"] + aqi_diurnal + aqi_seasonal + np.random.normal(0, 10)),
            1
        )

        # ── Day / Night flag ────────────────────────────────
        is_day = 1 if 6 <= hour < 18 else 0

        records.append(
            {
                "timestamp": ts.isoformat(),
                "temperature": temperature,
                "humidity": humidity,
                "wind_speed": wind_speed,
                "pressure": pressure,
                "aqi": aqi,
                "is_day": is_day,
            }
        )

    return pd.DataFrame(records)


def generate_initial_data(city: str, days: int = 45) -> pd.DataFrame:
    """Generate initial historical data — last *days* up to now."""
    end = datetime.now().replace(minute=0, second=0, microsecond=0)
    start = end - timedelta(days=days)
    return generate_hourly_data(city, start, end)


def generate_day_data(city: str, date: datetime) -> pd.DataFrame:
    """Generate a full 24-hour block for a specific date (00:00 → 23:00)."""
    start = date.replace(hour=0, minute=0, second=0, microsecond=0)
    end = start + timedelta(days=1)
    return generate_hourly_data(city, start, end)
