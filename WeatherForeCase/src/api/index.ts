import axios from 'axios';
import type {
  PredictionResponse,
  AQILiveResponse,
  HistoricalDataResponse,
  CityListResponse,
  AQIReading
} from '../types/weather';

const API_BASE_URL = 'http://127.0.0.1:19220/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCities = async (): Promise<string[]> => {
  const response = await api.get<CityListResponse>('/cities');
  return response.data.cities;
};

export const getPredictions = async (city: string): Promise<PredictionResponse> => {
  const response = await api.get<PredictionResponse>(`/predict?city=${city}`);
  return response.data;
};

export const getAQILive = async (city?: string): Promise<AQILiveResponse | AQIReading> => {
  const url = city ? `/aqi-live?city=${city}` : '/aqi-live';
  const response = await api.get<AQILiveResponse | AQIReading>(url);
  return response.data;
};

export const getHistoricalData = async (city: string, allData: boolean = false): Promise<HistoricalDataResponse> => {
  const response = await api.get<HistoricalDataResponse>(`/historical-data?city=${city}&all_data=${allData}`);
  return response.data;
};

export const trainModel = async (city: string) => {
  const response = await api.get(`/train-model?city=${city}`);
  return response.data;
};

export default api;
