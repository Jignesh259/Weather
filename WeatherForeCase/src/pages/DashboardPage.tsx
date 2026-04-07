import React, { useEffect, useState } from 'react';
import { Box, Grid, CircularProgress, Alert, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/dashboard/Sidebar';
import TopBar from '../components/dashboard/TopBar';
import WeatherHeroCard from '../components/dashboard/WeatherHeroCard';
import AQIWidget from '../components/dashboard/AQIWidget';
import WeatherCharts from '../components/dashboard/WeatherCharts';
import ForecastGrid from '../components/dashboard/ForecastGrid';
import CitySelectorList from '../components/dashboard/CitySelectorList';
import { getCities, getPredictions, getAQILive } from '../api';
import type { HourlyData, AQIReading } from '../types/weather';

interface DashboardPageProps {
  onBack?: () => void;
}

const GUJARAT_DISTRICTS = [
  'Ahmedabad', 'Amreli', 'Anand', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Bhuj',
  'Chhota Udaipur', 'Dahod', 'Daman', 'Dwarka', 'Gandhinagar', 'Godhra', 'Gondal',
  'Himatnagar', 'Jamnagar', 'Junagadh', 'Mehsana', 'Morbi', 'Nadiad', 'Nargol',
  'Navsari', 'Palanpur', 'Patan', 'Porbandar', 'Rajkot', 'Savarkundla', 'Surat',
  'Surendranagar', 'Upleta', 'Vadodara', 'Valsad', 'Vapi', 'Veraval', 'Wankaner'
];

const DashboardPage: React.FC<DashboardPageProps> = ({ onBack }) => {
  const [cities, setCities] = useState<string[]>(GUJARAT_DISTRICTS);
  const [selectedCity, setSelectedCity] = useState('Ahmedabad');
  const [predictions, setPredictions] = useState<HourlyData[]>([]);
  const [aqi, setAqi] = useState<AQIReading | null>(null);
  const [allAQI, setAllAQI] = useState<AQIReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const fetchData = async (city: string) => {
    try {
      setLoading(true);
      const [predRes, aqiRes] = await Promise.all([
        getPredictions(city),
        getAQILive(city)
      ]);
      setPredictions(predRes.predictions);
      setAqi(aqiRes as AQIReading);
      setError(null);
    } catch (err: any) {
      if (err.response?.status === 503) {
        setError(err.response.data.detail || "Service is still initializing models. Please wait a moment...");
      } else {
        setError("Failed to fetch weather data. Is the backend running?");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const [cityList, aqiData] = await Promise.all([
          getCities(),
          getAQILive()
        ]);
        setCities(cityList);
        if (aqiData && 'readings' in aqiData) {
          setAllAQI(aqiData.readings);
        }
        await fetchData(selectedCity);
      } catch (err) {
        setError("Could not connect to backend.");
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (selectedCity) fetchData(selectedCity);
  }, [selectedCity]);

  if (loading && cities.length === 0) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#0d1321' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <CircularProgress sx={{ color: '#00f2ff' }} />
        </motion.div>
      </Box>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Grid container spacing={4}>
            {/* Top Row: Weather Hero & AQI */}
            <Grid size={{ xs: 12, md: 8 }}>
              {predictions && predictions.length > 0 ? (
                <WeatherHeroCard data={predictions[0]} city={selectedCity} />
              ) : (
                <Box sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '32px', textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ opacity: 0.5 }}>No prediction data available for {selectedCity}.</Typography>
                </Box>
              )}
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <AQIWidget data={aqi} />
            </Grid>

            {/* Middle Row: Forecast */}
            <Grid size={12}>
              {predictions && predictions.length > 0 ? (
                <ForecastGrid data={predictions} />
              ) : null}
            </Grid>

            {/* Bottom Row: Charts & Extra Metrics */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <WeatherCharts data={predictions} />
            </Grid>

            <Grid size={{ xs: 12, lg: 4 }}>
              <Box className="glass-card" sx={{ p: 4, borderRadius: '24px', height: '100%' }}>
                <Typography variant="h6" sx={{ opacity: 0.6, fontWeight: 500, fontSize: '0.8rem', letterSpacing: 2, mb: 3 }}>
                  AIR POLLUTANTS
                </Typography>
                {[
                  { name: 'PM2.5', value: 45, max: 100, color: '#00f2ff' },
                  { name: 'SO2', value: 12, max: 50, color: '#ce5dff' },
                  { name: 'CO', value: 0.8, max: 5, color: '#00f2ff' },
                  { name: 'NO2', value: 24, max: 80, color: '#ce5dff' }
                ].map((p, i) => (
                  <Box key={i} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{p.name}</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.5 }}>{p.value} μg/m³</Typography>
                    </Box>
                    <Box sx={{ height: 4, width: '100%', bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2, overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(p.value / p.max) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                        style={{ height: '100%', backgroundColor: p.color }}
                      />
                    </Box>
                  </Box>
                ))}

                <Box sx={{ mt: 4, p: 3, borderRadius: '20px', backgroundColor: 'rgba(0, 242, 255, 0.03)', border: '1px solid rgba(0, 242, 255, 0.1)' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#00f2ff' }}>
                    Expert Insight
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.6, lineHeight: 1.5, display: 'block' }}>
                    Air quality is expected to remain stable for the next 24 hours. No significant health risks are anticipated for general population.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        );
      case 'precipitation':
        return (
          <WeatherCharts
            data={predictions}
            dataKey="humidity"
            color="#00f2ff"
            unit="%"
            loading={loading}
          />
        );
      case 'wind':
        return (
          <WeatherCharts
            data={predictions}
            dataKey="wind_speed"
            color="#fff"
            unit=" km/h"
            loading={loading}
          />
        );
      case 'aqi':
        return (
          <WeatherCharts
            data={predictions}
            dataKey="aqi"
            color="#ce5dff"
            unit=" AQI"
            loading={loading}
          />
        );
      case 'stats':
        return (
          <WeatherCharts
            data={predictions}
            dataKey="temperature"
            color="#00f2ff"
            loading={loading}
          />
        );
      case 'cities':
        return (
          <CitySelectorList
            cities={cities}
            allAQI={allAQI}
            selectedCity={selectedCity}
            onSelect={(city) => {
              setSelectedCity(city);
              setActiveTab('dashboard');
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0d1321', color: 'white', overflow: 'hidden' }}>
      {/* Sidebar - Fixed */}
      <Sidebar onBack={onBack} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { xs: 0, sm: '80px' }, // Dynamic margin
          mb: { xs: '70px', sm: 0 }, // Room for bottom bar on mobile
          height: '100vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transition: 'all 0.3s ease'
        }}
      >
        <TopBar
          selectedCity={selectedCity}
        />

        <Box
          sx={{
            p: { xs: 2.5, sm: 4 }, // Responsive padding
            flexGrow: 1,
            position: 'relative',
            zIndex: 1,
            // Premium Background Image with Overlay
            '&::before': {
              content: '""',
              position: 'fixed',
              top: 0,
              left: { xs: 0, sm: '80px' }, // Responsive position
              right: 0,
              bottom: 0,
              backgroundImage: 'url("https://images.unsplash.com/photo-1534088568595-a066f710b721?q=80&w=2560&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              opacity: 0.15,
              filter: 'grayscale(0.5) contrast(1.2)',
              zIndex: -1,
            },
            background: 'linear-gradient(180deg, rgba(13, 19, 33, 0.8) 0%, rgba(13, 19, 33, 0.95) 100%)',
          }}
        >
          <AnimatePresence mode="wait">
            {error && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Alert severity="error" sx={{ mb: 4, borderRadius: '16px', bgcolor: 'rgba(211, 47, 47, 0.1)', color: '#ffcdd2', border: '1px solid rgba(211, 47, 47, 0.2)' }}>
                  {error}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Simple Footer */}
        <Box sx={{ p: 4, opacity: 0.3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption">© 2026 GUJARAT DISTRICT MONITORING</Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography variant="caption">Data Privacy</Typography>
            <Typography variant="caption">Stations</Typography>
            <Typography variant="caption">API Status</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
