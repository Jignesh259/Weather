import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunnyRounded';
import ThermostatIcon from '@mui/icons-material/ThermostatRounded';
import WaterDropIcon from '@mui/icons-material/WaterDropRounded';
import AirIcon from '@mui/icons-material/AirRounded';
import { motion } from 'framer-motion';
import type { HourlyData } from '../../types/weather';

interface WeatherHeroCardProps {
  data: HourlyData | null;
  city: string;
}

const WeatherHeroCard: React.FC<WeatherHeroCardProps> = ({ data, city }) => {
  if (!data) return null;

  const getCondition = (hum: number) => {
    if (hum > 80) return "Rainy";
    if (hum > 60) return "Cloudy";
    if (hum > 40) return "Partly Cloudy";
    return "Sunny";
  };

  const condition = getCondition(data.humidity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{
        borderRadius: '24px',
        padding: '32px',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Decorative Element */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(0, 242, 255, 0.1) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" sx={{ opacity: 0.6, fontWeight: 500, fontSize: '0.8rem', letterSpacing: 2 }}>
              CURRENT WEATHER
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1 }}>
              <Typography variant="h1" sx={{ fontWeight: 800, fontSize: '4.5rem', lineHeight: 1 }}>
                {Math.round(data.temperature)}°
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 400, opacity: 0.3, ml: 1 }}>
                C
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ mt: 1, fontWeight: 600 }}>
              {condition}
            </Typography>
          </Box>

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <WbSunnyIcon sx={{ fontSize: 80, color: '#00f2ff', filter: 'drop-shadow(0 0 10px rgba(0, 242, 255, 0.4))' }} />
          </motion.div>
        </Box>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid size={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WaterDropIcon sx={{ fontSize: 18, color: '#00f2ff' }} />
              <Box>
                <Typography variant="caption" sx={{ display: 'block', opacity: 0.4 }}>HUMIDITY</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{data.humidity}%</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AirIcon sx={{ fontSize: 18, color: '#00f2ff' }} />
              <Box>
                <Typography variant="caption" sx={{ display: 'block', opacity: 0.4 }}>WIND</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{data.wind_speed} km/h</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ThermostatIcon sx={{ fontSize: 18, color: '#00f2ff' }} />
              <Box>
                <Typography variant="caption" sx={{ display: 'block', opacity: 0.4 }}>PRESSURE</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{data.pressure} mb</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default WeatherHeroCard;
