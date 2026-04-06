"""
Pydantic Schemas — Request / Response Models

Used for automatic validation and Swagger documentation.
"""

from pydantic import BaseModel, Field
from typing import List, Dict, Optional


# ── Hourly Data Point ───────────────────────────────────────

class HourlyData(BaseModel):
    timestamp: str
    temperature: float
    humidity: float
    wind_speed: float
    pressure: float
    aqi: float
    is_day: int


# ── Training ────────────────────────────────────────────────

class TrainResponse(BaseModel):
    status: str
    city: str
    message: str
    metrics: Dict[str, float]
    trained_at: str
    data_points: int


# ── Prediction ──────────────────────────────────────────────

class PredictionResponse(BaseModel):
    city: str
    forecast_hours: int
    generated_at: str
    predictions: List[HourlyData]


# ── AQI Live ────────────────────────────────────────────────

class AQIReading(BaseModel):
    city: str
    aqi: int
    category: str
    color: str
    last_updated: Optional[str] = None


class AQILiveResponse(BaseModel):
    readings: List[AQIReading]
    overall_aqi: int
    overall_category: str
    last_updated: Optional[str] = None


# ── Historical Data ─────────────────────────────────────────

class HistoricalDataResponse(BaseModel):
    city: str
    period: str
    data_points: int
    data: List[HourlyData]


# ── Utility ─────────────────────────────────────────────────

class CityListResponse(BaseModel):
    cities: List[str]
    count: int


class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    uptime: str
    cities_loaded: int
    models_trained: int
