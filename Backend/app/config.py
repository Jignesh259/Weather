"""
Application Configuration
Loads settings from environment variables / .env file.
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    CORS_ORIGINS: List[str] = ["*"]
    MODEL_CACHE_TTL: int = 86400        # 24 hours
    AQI_UPDATE_INTERVAL: int = 300      # 5 minutes
    DAILY_TRAIN_HOUR: int = 0           # Midnight
    DAILY_TRAIN_MINUTE: int = 0

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
