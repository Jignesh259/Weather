"""
AQI Live Service

Simulates real-time AQI readings for all Gujarat cities.
Uses random-walk with mean-reversion for realistic fluctuations.
Updated every 5 minutes by the scheduler.
"""

import logging
import numpy as np
from datetime import datetime
from typing import Dict, Optional

from app.data.cities import GUJARAT_CITIES, get_city_names

logger = logging.getLogger(__name__)

# ── Indian National AQI categories ──────────────────────────
AQI_CATEGORIES = [
    (50,  "Good",          "#00e400"),
    (100, "Satisfactory",  "#92d050"),
    (200, "Moderate",      "#ffbf00"),
    (300, "Poor",          "#ff4d4d"),
    (400, "Very Poor",     "#8f3f97"),
    (500, "Severe",        "#7e0023"),
]


def get_aqi_category(aqi: int) -> tuple:
    """Return (category_name, hex_color) for a given AQI value."""
    for threshold, name, color in AQI_CATEGORIES:
        if aqi <= threshold:
            return name, color
    return "Severe", "#7e0023"


class AQILiveService:
    """Manages live AQI simulation for all Gujarat cities."""

    def __init__(self):
        self.current_aqi: Dict[str, int] = {}
        self.last_updated: Optional[datetime] = None
        self._initialize()

    def _initialize(self):
        """Seed initial AQI values from city base profiles."""
        for city, profile in GUJARAT_CITIES.items():
            noise = int(np.random.normal(0, 10))
            self.current_aqi[city] = max(10, profile["base_aqi"] + noise)
        self.last_updated = datetime.now()
        logger.info("📊 AQI service initialized for %d cities", len(self.current_aqi))

    async def update_all(self):
        """
        Update AQI for every city (called every 5 minutes).
        Random walk with mean-reversion toward each city's baseline.
        """
        for city in self.current_aqi:
            current = self.current_aqi[city]
            base = GUJARAT_CITIES[city]["base_aqi"]

            drift = 0.1 * (base - current)       # pull toward baseline
            noise = np.random.normal(0, 8)
            self.current_aqi[city] = int(np.clip(current + drift + noise, 10, 500))

        self.last_updated = datetime.now()
        logger.debug("📊 AQI updated at %s", self.last_updated.isoformat())

    # ─── Getters ────────────────────────────────────────────

    def get_city_aqi(self, city: str) -> dict:
        """Current AQI reading for one city."""
        if city not in self.current_aqi:
            raise ValueError(f"Unknown city: {city}")

        aqi = self.current_aqi[city]
        category, color = get_aqi_category(aqi)

        return {
            "city": city,
            "aqi": aqi,
            "category": category,
            "color": color,
            "last_updated": (
                self.last_updated.isoformat() if self.last_updated else None
            ),
        }

    def get_all_aqi(self) -> dict:
        """All cities + overall Gujarat average."""
        readings = []
        total = 0

        for city in sorted(self.current_aqi):
            r = self.get_city_aqi(city)
            readings.append(r)
            total += r["aqi"]

        overall_aqi = int(total / len(readings)) if readings else 0
        overall_cat, _ = get_aqi_category(overall_aqi)

        return {
            "readings": readings,
            "overall_aqi": overall_aqi,
            "overall_category": overall_cat,
            "last_updated": (
                self.last_updated.isoformat() if self.last_updated else None
            ),
        }


# Singleton instance
aqi_service = AQILiveService()
