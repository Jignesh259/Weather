export interface HourlyData {
  timestamp: string;
  temperature: number;
  humidity: number;
  wind_speed: number;
  pressure: number;
  aqi: number;
  is_day: number;
}

export interface PredictionResponse {
  city: string;
  forecast_hours: number;
  generated_at: string;
  predictions: HourlyData[];
}

export interface AQIReading {
  city: string;
  aqi: number;
  category: string;
  color: string;
  last_updated?: string;
}

export interface AQILiveResponse {
  readings: AQIReading[];
  overall_aqi: number;
  overall_category: string;
  last_updated?: string;
}

export interface HistoricalDataResponse {
  city: string;
  period: string;
  data_points: number;
  data: HourlyData[];
}

export interface CityListResponse {
  cities: string[];
  count: number;
}

export interface DashboardState {
  selectedCity: string;
  predictions: HourlyData[];
  aqiLive: AQIReading | null;
  historical: HourlyData[];
  loading: boolean;
  error: string | null;
}
