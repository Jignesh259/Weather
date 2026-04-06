You are a senior full-stack developer and ML engineer.

Create a complete production-ready Weather Forecast Web Application with the following requirements:

📁 Project Structure:
Weather/
 ├── Backend/  (Python - FastAPI)
 └── WeatherForeCase/ (Frontend - React + TypeScript + MUI)

========================================
🔹 BACKEND REQUIREMENTS (FastAPI + ML)
========================================

Tech stack:
- FastAPI
- Uvicorn[standard]
- Pydantic
- Pandas
- NumPy
- XGBoost
- yfinance (optional for external data simulation)

Core Features:
1. Data Collection:
   - Fetch or simulate last 45 days weather data
   - Data granularity: hourly (day & night)
   - Fields:
     temperature, humidity, wind_speed, pressure, AQI

2. Data Processing:
   - Clean missing values
   - Feature engineering (hour, day, lag features)
   - Normalize or scale data

3. Model Training:
   - Use XGBoost Regressor
   - Train on last 45 days hourly data
   - Predict next 7 days hourly forecast
   - Ensure:
     - Predictions are NOT constant
     - Add slight randomness/variance (realistic fluctuation)

4. Prediction Output:
   - Next 7 days forecast:
     - temperature
     - humidity
     - wind speed
     - AQI
   - Include day/night differentiation

5. AQI Live Endpoint:
   - Provide AQI updates every 5 minutes
   - Simulate real-time AQI changes

6. APIs:
   - GET /train-model
   - GET /predict
   - GET /aqi-live
   - GET /historical-data

7. Use proper schema validation with Pydantic

8. Optimize backend:
   - Async routes
   - Caching (optional)

========================================
🔹 FRONTEND REQUIREMENTS (React + MUI + TS)
========================================

Tech stack:
- React (TypeScript)
- Material UI (MUI)
- Axios
- Framer Motion (for animations)
- Chart.js or Recharts

Pages:

1. Landing Page:
   - Inspired by: https://venturi.space/en/
   - Smooth animations
   - Gradient backgrounds
   - Weather-themed hero section
   - Interactive elements

2. Dashboard Page:
   - 7-day forecast (hourly breakdown)
   - Graphs:
     temperature, AQI, humidity, wind speed
   - Day/Night toggle UI

3. AQI Live Widget:
   - Auto-refresh every 5 minutes
   - Show:
     AQI level (color-coded)
     last updated time

4. Gujarat District Selection:
   - Dropdown for all 36 districts
   - On selection → fetch data

5. UI Requirements:
   - Fully responsive
   - Smooth transitions
   - Glassmorphism / modern UI
   - Loading skeletons

========================================
🔹 SYSTEM FEATURES
========================================

- Every 5 minutes:
  frontend → call backend AQI API
- Use environment variables
- Proper folder structure
- Clean modular code
- Add comments for clarity

========================================
🔹 BONUS FEATURES
========================================

- Add dark/light theme toggle
- Add error handling UI
- Add caching for predictions
- Add animated weather icons

========================================

Output required:
1. Full backend code (FastAPI)
2. Full frontend code (React + TS + MUI)
3. Folder structure
4. Setup instructions
5. Example API responses

Ensure code is clean, scalable, and follows best practices.