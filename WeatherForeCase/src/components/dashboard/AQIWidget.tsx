import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import type { AQIReading } from '../../types/weather';
import AirIcon from '@mui/icons-material/AirRounded';

interface AQIWidgetProps {
  data: AQIReading | null;
}

const AQIWidget: React.FC<AQIWidgetProps> = ({ data }) => {
  if (!data) return null;

  const getStatusDescription = (category: string) => {
    switch (category.toLowerCase()) {
      case 'good': return "Air quality is considered satisfactory, and air pollution poses little or no risk.";
      case 'moderate': return "Air quality is acceptable; however, for some pollutants there may be a moderate health concern.";
      case 'unhealthy': return "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
      default: return "Air quality data is currently being monitored for your safety.";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card"
      style={{
        borderRadius: '24px',
        padding: '32px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(0, 242, 255, 0.1)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h6" sx={{ opacity: 0.6, fontWeight: 500, fontSize: '0.8rem', letterSpacing: 2 }}>
          AIR QUALITY INDEX
        </Typography>
        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: '8px',
            backgroundColor: 'rgba(0, 242, 255, 0.1)',
            color: '#00f2ff',
            fontSize: '0.7rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#00f2ff' }} />
          LIVE UPDATES
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 2 }}>
        <Typography variant="h2" sx={{ fontWeight: 800, fontSize: '4rem', lineHeight: 1 }}>
          {data.aqi}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 600, color: data.color }}>
          {data.category}
        </Typography>
      </Box>

      {/* Progress Bar */}
      <Box
        sx={{
          height: 8,
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 4,
          overflow: 'hidden',
          mb: 4
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, (data.aqi / 300) * 100)}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            height: '100%',
            backgroundColor: data.color,
            boxShadow: `0 0 10px ${data.color}`
          }}
        />
      </Box>

      <Typography variant="body2" sx={{ opacity: 0.6, lineHeight: 1.6, mb: 4 }}>
        {getStatusDescription(data.category)}
      </Typography>

      <Box
        sx={{
          mt: 'auto',
          p: 2,
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            backgroundColor: 'rgba(0, 242, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <AirIcon sx={{ fontSize: 18, color: '#00f2ff' }} />
        </Box>
        <Typography variant="caption" sx={{ fontWeight: 500, opacity: 0.8 }}>
          Dominant Pollutant: PM2.5 (High Sensitivity)
        </Typography>
      </Box>
    </motion.div>
  );
};

export default AQIWidget;
