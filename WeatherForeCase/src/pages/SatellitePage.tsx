import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import RadarIcon from '@mui/icons-material/RadarRounded';
import { motion, AnimatePresence } from 'framer-motion';
import { getCities, getAQILive } from '../api';
import type { AQIReading } from '../types/weather';

interface SatellitePageProps {
  onBack: () => void;
}

const SatellitePage: React.FC<SatellitePageProps> = ({ onBack }) => {
  const [cities, setCities] = useState<string[]>([]);
  const [aqiReadings, setAqiReadings] = useState<AQIReading[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cityRes, aqiRes] = await Promise.all([
          getCities(),
          getAQILive()
        ]);
        setCities(cityRes);
        if (aqiRes && 'readings' in aqiRes) {
          setAqiReadings(aqiRes.readings);
        }
      } catch (err) {
        console.error("Failed to fetch satellite data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCityInfo = (cityName: string) => {
    return aqiReadings.find(r => r.city.toLowerCase() === cityName.toLowerCase());
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', bgcolor: '#060a12', color: '#fff', position: 'relative', overflowX: 'hidden' }}>
      {/* High-Tech Background Grid */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 242, 255, 0.05) 0%, transparent 70%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(0, 242, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
          }
        }}
      />

      {/* Header */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 100, p: 3, display: 'flex', alignItems: 'center', gap: 3, backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0, 242, 255, 0.1)' }}>
        <IconButton onClick={onBack} sx={{ bgcolor: 'rgba(0, 242, 255, 0.1)', color: '#00f2ff', '&:hover': { bgcolor: 'rgba(0, 242, 255, 0.2)' } }}>
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 900, color: '#00f2ff', letterSpacing: 2, textTransform: 'uppercase', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
            Atmos Network Satellite
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.5, fontWeight: 600, letterSpacing: 1 }}>
            ORBITAL STATUS: ACTIVE | SCANNING 35 REGIONAL NODES
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
          <Box sx={{ px: 2, py: 0.5, borderRadius: '4px', border: '1px solid #00f2ff', color: '#00f2ff', fontSize: '0.7rem', fontWeight: 700 }}>
            SIGNAL: OPTIMAL
          </Box>
        </Box>
      </Box>

      {/* Main Monitoring Hub */}
      <Box sx={{ p: { xs: 2, sm: 6 }, position: 'relative', zIndex: 1 }}>
        <AnimatePresence>
          {loading ? (
            <Box sx={{ height: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
              <CircularProgress sx={{ color: '#00f2ff' }} size={60} thickness={1} />
              <Typography sx={{ letterSpacing: 4, fontWeight: 700, animation: 'pulse 2s infinite' }}>SYNCING SATELLITE ARRAY...</Typography>
            </Box>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Grid container spacing={2}>
                {cities.map((city, idx) => {
                  const info = getCityInfo(city);
                  return (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={city}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.02 }}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 242, 255, 0.05)' }}
                        style={{
                          padding: '16px',
                          borderRadius: '12px',
                          border: '1px solid rgba(0, 242, 255, 0.1)',
                          background: 'rgba(10, 15, 26, 0.6)',
                          backdropFilter: 'blur(5px)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#fff', textTransform: 'uppercase' }}>
                            {city}
                          </Typography>
                          <RadarIcon sx={{ fontSize: 16, color: '#00f2ff', opacity: 0.5 }} />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography sx={{ fontSize: '0.6rem', opacity: 0.4, fontWeight: 700 }}>LIVE DATA</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 900, color: info?.color || '#fff' }}>
                              {info ? `${info.aqi} AQI` : '---'}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography sx={{ fontSize: '0.6rem', opacity: 0.4, fontWeight: 700 }}>STATUS</Typography>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: info ? '#00e676' : '#ff3d00' }}>
                              {info ? 'LOCKED' : 'OFFLINE'}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ mt: 2, height: '2px', width: '100%', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1, overflow: 'hidden' }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: info ? '100%' : '10%' }}
                            transition={{ duration: 1, delay: idx * 0.05 }}
                            style={{ height: '100%', backgroundColor: info?.color || '#ff3d00' }}
                          />
                        </Box>
                      </motion.div>
                    </Grid>
                  );
                })}
              </Grid>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* Floating Orbital UI Elements */}
      <Box sx={{ position: 'fixed', bottom: 40, right: 40, display: { xs: 'none', md: 'block' }, pointerEvents: 'none' }}>
        <Box sx={{ p: 2, border: '1px solid rgba(0, 242, 255, 0.2)', borderRadius: '50%', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: 80, height: 80, border: '1px dashed rgba(0, 242, 255, 0.4)', borderRadius: '50%', animation: 'spin 10s linear infinite' }} />
          <Typography variant="caption" sx={{ position: 'absolute', fontWeight: 900, color: '#00f2ff' }}>72.13°E</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SatellitePage;
