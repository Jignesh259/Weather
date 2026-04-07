import React from 'react';
import { Box, Typography, Grid, Paper, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import LocationCityIcon from '@mui/icons-material/LocationCityRounded';
import TrendingUpIcon from '@mui/icons-material/TrendingUpRounded';
import type { AQIReading } from '../../types/weather';

interface CitySelectorListProps {
  cities: string[];
  allAQI: AQIReading[];
  onSelect: (city: string) => void;
  selectedCity: string;
}

const CitySelectorList: React.FC<CitySelectorListProps> = ({ cities, allAQI, onSelect, selectedCity }) => {
  // Map AQI readings for quick lookup
  const aqiMap = React.useMemo(() => {
    return allAQI.reduce((acc, curr) => {
      acc[curr.city] = curr;
      return acc;
    }, {} as Record<string, AQIReading>);
  }, [allAQI]);

  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <Typography 
        variant="h4" 
        sx={{ 
          color: '#00f2ff', 
          mb: 4, 
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: 2,
          textAlign: 'center'
        }}
      >
        Gujarat Region Monitoring
      </Typography>

      <Grid container spacing={3}>
        {cities.map((city, index) => {
          const aqiData = aqiMap[city];
          const isSelected = city === selectedCity;

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={city}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                whileHover={{ scale: 1.02, translateY: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Paper
                  onClick={() => onSelect(city)}
                  sx={{
                    p: 3,
                    cursor: 'pointer',
                    borderRadius: '24px',
                    background: isSelected 
                      ? 'linear-gradient(135deg, rgba(0, 242, 255, 0.15) 0%, rgba(206, 93, 255, 0.1) 100%)'
                      : 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid',
                    borderColor: isSelected ? 'rgba(0, 242, 255, 0.4)' : 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      borderColor: 'rgba(0, 242, 255, 0.3)',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 242, 255, 0.1)',
                    },
                  }}
                >
                  {isSelected && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, transparent 50%, #00f2ff 50%)',
                        opacity: 0.2
                      }}
                    />
                  )}

                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700, 
                          color: isSelected ? '#00f2ff' : 'white',
                          fontSize: '1.1rem'
                        }}
                      >
                        {city}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.5, fontWeight: 500 }}>
                        GUJARAT, INDIA
                      </Typography>
                    </Box>
                    <LocationCityIcon sx={{ color: isSelected ? '#00f2ff' : 'rgba(255, 255, 255, 0.3)', fontSize: 28 }} />
                  </Box>

                  {aqiData ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="caption" sx={{ display: 'block', opacity: 0.6, mb: 0.5 }}>
                          LIVE AQI
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="h5" sx={{ fontWeight: 800, color: aqiData.color }}>
                            {aqiData.aqi}
                          </Typography>
                          <TrendingUpIcon sx={{ fontSize: 16, color: aqiData.color, opacity: 0.6 }} />
                        </Box>
                      </Box>
                      <Chip
                        label={aqiData.category}
                        size="small"
                        sx={{
                          backgroundColor: `${aqiData.color}22`,
                          color: aqiData.color,
                          border: `1px solid ${aqiData.color}44`,
                          fontWeight: 700,
                          fontSize: '0.65rem',
                          borderRadius: '8px'
                        }}
                      />
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 1 }}>
                      <Typography variant="caption" sx={{ opacity: 0.3 }}>Initializing data...</Typography>
                    </Box>
                  )}
                </Paper>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CitySelectorList;
