import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import type { HourlyData } from '../../types/weather';
import WbSunnyIcon from '@mui/icons-material/WbSunnyRounded';
import CloudIcon from '@mui/icons-material/CloudRounded';
import WaterDropIcon from '@mui/icons-material/WaterDropRounded';

interface ForecastGridProps {
  data: HourlyData[];
}

const ForecastGrid: React.FC<ForecastGridProps> = ({ data }) => {
  // Group by day for the "7-day" look, or just take every 24th hour
  // For this demo, let's take one reading every 24 hours to represent days
  const dailyData = data.filter((_, index) => index % 24 === 0).slice(0, 7);

  const getDayName = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', { weekday: 'long' });
  };

  const getForecastIcon = (hum: number) => {
    if (hum > 80) return <WaterDropIcon sx={{ fontSize: 24, color: '#00f2ff' }} />;
    if (hum > 40) return <CloudIcon sx={{ fontSize: 24, color: '#00f2ff' }} />;
    return <WbSunnyIcon sx={{ fontSize: 24, color: '#00f2ff' }} />;
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ opacity: 0.6, fontWeight: 500, fontSize: '0.8rem', letterSpacing: 2, mb: 3 }}>
        7-DAY FORECAST
      </Typography>
      <Box 
        className="scrollbar-hide"
        sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(7, 120px)', md: 'repeat(7, 1fr)' },
          gap: 2,
          overflowX: 'auto',
          pb: 2,
        }}
      >
        {dailyData.map((day, idx) => (
          <motion.div
            key={day.timestamp}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card glass-card-hover"
            style={{
              padding: '20px 16px',
              borderRadius: '20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
              border: idx === 2 ? '1px solid rgba(0, 242, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
              backgroundColor: idx === 2 ? 'rgba(0, 242, 255, 0.05)' : 'rgba(26, 31, 46, 0.4)',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, opacity: 0.5, fontSize: '0.75rem' }}>
              {getDayName(day.timestamp)}
            </Typography>
            
            <Box sx={{ transform: idx === 2 ? 'scale(1.2)' : 'none', transition: 'transform 0.3s' }}>
              {getForecastIcon(day.humidity)}
            </Box>

            <Box sx={{ mt: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1 }}>
                {Math.round(day.temperature)}°
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 500, opacity: 0.3 }}>
                {Math.round(day.temperature - 5)}°
              </Typography>
            </Box>

            {idx === 2 && (
              <Box sx={{ mt: 1, width: 4, height: 4, borderRadius: '50%', backgroundColor: '#00f2ff' }} />
            )}
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default ForecastGrid;
