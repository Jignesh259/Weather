"""
Weather Forecast API — Application Entry Point

FastAPI server with two scheduled background jobs:
  ⏰  Daily at midnight  → retrain all 35 city models with accumulated data
  ⏰  Every 5 minutes    → refresh live AQI readings for all cities
"""

import logging
from contextlib import asynccontextmanager
from datetime import datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from apscheduler.triggers.interval import IntervalTrigger

from app.config import settings
from app.routes.weather import router
from app.services.weather import weather_service
from app.services.aqi import aqi_service

# ── Logging ─────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

# ── Scheduler & uptime ─────────────────────────────────────
scheduler = AsyncIOScheduler()
startup_time = datetime.now()


# ── Lifespan ────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    # ─── STARTUP ────────────────────────────────────────
    logger.info("=" * 60)
    logger.info("🌤️  Weather Forecast API — Starting up")
    logger.info("=" * 60)

    # 1. Start background initialization (non-blocking)
    import asyncio
    asyncio.create_task(weather_service.initialize())

    # 2. Schedule daily retrain at midnight (00:00)
    scheduler.add_job(
        weather_service.daily_retrain,
        trigger=CronTrigger(hour=0, minute=0),
        id="daily_retrain",
        name="Daily Model Retrain (Midnight)",
        replace_existing=True,
    )
    logger.info("⏰ Scheduled: daily retrain at 00:00")

    # 3. Schedule AQI refresh every 5 minutes
    scheduler.add_job(
        aqi_service.update_all,
        trigger=IntervalTrigger(minutes=5),
        id="aqi_update",
        name="AQI Live Update (5 min)",
        replace_existing=True,
    )
    logger.info("⏰ Scheduled: AQI update every 5 minutes")

    scheduler.start()
    logger.info("🚀 All systems operational!")

    yield

    # ─── SHUTDOWN ───────────────────────────────────────
    scheduler.shutdown()
    logger.info("👋 Weather Forecast API — Shut down")


# ── FastAPI Application ─────────────────────────────────────

app = FastAPI(
    title="Weather Forecast API",
    description=(
        "Production-ready weather forecasting API for 35 Gujarat cities.\n\n"
        "**Features:**\n"
        "- XGBoost ML model for 7-day hourly forecasts\n"
        "- Live AQI monitoring (updated every 5 minutes)\n"
        "- Daily automatic model retraining at midnight\n"
        "- 35 Gujarat cities with regional climate profiles"
    ),
    version="1.0.0",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(router, prefix="/api", tags=["Weather"])


# ── Root Health Check ───────────────────────────────────────

@app.get("/", tags=["Health"])
async def root():
    uptime = str(datetime.now() - startup_time).split(".")[0]
    return {
        "status": "healthy",
        "service": "Weather Forecast API",
        "version": "1.0.0",
        "uptime": uptime,
        "cities_loaded": len(weather_service.historical_data),
        "models_trained": len(weather_service.models),
    }
