# Weather Forecast Backend

Production-ready FastAPI backend with XGBoost ML forecasting for 35 Gujarat cities.

## Features

- **7-day hourly weather forecast** (temperature, humidity, wind speed, pressure, AQI)
- **Live AQI monitoring** — updated every 5 minutes for all cities
- **Daily automatic retraining** — midnight (00:00) model refresh with accumulated data
- **35 Gujarat cities** with regional climate profiles

## Quick Start

### 1. Create virtual environment

```bash
cd Backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Linux/Mac
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 4. Open Swagger docs

Visit: [http://localhost:8000/docs](http://localhost:8000/docs)

## API Endpoints

| Method | Endpoint             | Description                                |
|--------|----------------------|--------------------------------------------|
| GET    | `/api/train-model`   | Train model for a city (`?city=Ahmedabad`) |
| GET    | `/api/predict`       | 7-day forecast (`?city=Ahmedabad`)         |
| GET    | `/api/aqi-live`      | Live AQI (all cities or `?city=Ahmedabad`) |
| GET    | `/api/historical-data`| Last 24h data (`?city=Ahmedabad`)         |
| GET    | `/api/cities`        | List all 35 Gujarat cities                 |
| GET    | `/api/status`        | Service health check                       |
| GET    | `/`                  | Root health check                          |

## Scheduled Jobs

| Job                | Schedule        | Description                          |
|--------------------|-----------------|--------------------------------------|
| Daily Retrain      | Every day 00:00 | Append new data + retrain all models |
| AQI Live Update    | Every 5 minutes | Refresh AQI readings for all cities  |

## Project Structure

```
Backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app + scheduler
│   ├── config.py            # Environment settings
│   ├── schemas.py           # Pydantic models
│   ├── data/
│   │   ├── cities.py        # 35 Gujarat city profiles
│   │   └── generator.py     # Simulated weather data
│   ├── ml/
│   │   ├── features.py      # Feature engineering
│   │   └── model.py         # XGBoost training + prediction
│   ├── services/
│   │   ├── weather.py       # Weather data orchestrator
│   │   └── aqi.py           # Live AQI simulation
│   └── routes/
│       └── weather.py       # API route handlers
├── requirements.txt
├── .env
└── README.md
```

## Example API Responses

### GET /api/predict?city=Ahmedabad

```json
{
  "city": "Ahmedabad",
  "forecast_hours": 168,
  "generated_at": "2026-04-04T12:00:00",
  "predictions": [
    {
      "timestamp": "2026-04-04T13:00:00",
      "temperature": 34.2,
      "humidity": 32.5,
      "wind_speed": 14.3,
      "pressure": 1012.4,
      "aqi": 128,
      "is_day": 1
    }
  ]
}
```

### GET /api/aqi-live

```json
{
  "readings": [
    {"city": "Ahmedabad", "aqi": 142, "category": "Moderate", "color": "#ffbf00", "last_updated": "..."},
    {"city": "Surat", "aqi": 108, "category": "Moderate", "color": "#ffbf00", "last_updated": "..."}
  ],
  "overall_aqi": 89,
  "overall_category": "Satisfactory",
  "last_updated": "2026-04-04T12:05:00"
}
```
