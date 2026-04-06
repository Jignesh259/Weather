"""
Weather API Routes

Endpoints:
  GET /api/train-model      — Train / retrain a city's model
  GET /api/predict           — 7-day hourly forecast
  GET /api/aqi-live          — Live AQI (single city or all)
  GET /api/historical-data   — Last day's data (or full history)
  GET /api/cities            — List available cities
  GET /api/status            — Service health
"""

from fastapi import APIRouter, HTTPException, Query
from typing import Optional

from app.services.weather import weather_service
from app.services.aqi import aqi_service
from app.data.cities import get_city_names

router = APIRouter()


# ── Train Model ─────────────────────────────────────────────

@router.get("/train-model")
async def train_model(
    city: str = Query(..., description="Gujarat city name", example="Ahmedabad"),
):
    """Train / retrain the XGBoost model for a specific city."""
    try:
        result = await weather_service.train_city(city)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Training failed: {e}")


# ── Predict ─────────────────────────────────────────────────

@router.get("/predict")
async def predict(
    city: str = Query(..., description="Gujarat city name", example="Ahmedabad"),
):
    """Get 7-day hourly weather forecast for a city."""
    try:
        return weather_service.get_predictions(city)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=404, detail=str(e))


# ── AQI Live ────────────────────────────────────────────────

@router.get("/aqi-live")
async def aqi_live(
    city: Optional[str] = Query(
        None, description="City name — omit for all cities + overall Gujarat"
    ),
):
    """
    Live AQI readings (updated every 5 minutes).
    - With `city` → single city reading
    - Without    → all 35 cities + overall Gujarat average
    """
    try:
        if city:
            return aqi_service.get_city_aqi(city)
        return aqi_service.get_all_aqi()
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# ── Historical Data ─────────────────────────────────────────

@router.get("/historical-data")
async def historical_data(
    city: str = Query(..., description="Gujarat city name", example="Ahmedabad"),
    all_data: bool = Query(
        False, description="True → full history; False → last 24 h only"
    ),
):
    """
    Historical weather data for a city.
    Default: last 24 hours (yesterday's data).
    Set all_data=true for the complete accumulated history.
    """
    try:
        return weather_service.get_historical_data(city, last_day_only=not all_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=404, detail=str(e))


# ── Utility ─────────────────────────────────────────────────

@router.get("/cities")
async def list_cities():
    """List all 35 available Gujarat cities."""
    cities = get_city_names()
    return {"cities": cities, "count": len(cities)}


@router.get("/status")
async def service_status():
    """Service health and initialization status."""
    return weather_service.get_status()
