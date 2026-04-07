import React from 'react';
import { Box, Tooltip, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import DashboardIcon from '@mui/icons-material/DashboardRounded';
import OpacityIcon from '@mui/icons-material/OpacityRounded';
import AirIcon from '@mui/icons-material/AirRounded';
import CloudIcon from '@mui/icons-material/CloudRounded';
import BarChartIcon from '@mui/icons-material/BarChartRounded';
import LocationCityIcon from '@mui/icons-material/LocationCityRounded';

interface SidebarProps {
  onBack?: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }> = ({ icon, label, active, onClick }) => (
  <Tooltip title={label} placement="right" arrow>
    <Box sx={{ mb: 3 }}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <IconButton
          onClick={onClick}
          sx={{
            color: active ? '#00f2ff' : 'rgba(255, 255, 255, 0.4)',
            backgroundColor: active ? 'rgba(0, 242, 255, 0.1)' : 'transparent',
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: active ? 'rgba(0, 242, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              color: active ? '#00f2ff' : 'rgba(255, 255, 255, 0.8)',
            },
            width: 48,
            height: 48,
          }}
        >
          {icon}
        </IconButton>
      </motion.div>
    </Box>
  </Tooltip>
);

const Sidebar: React.FC<SidebarProps> = ({ onBack, activeTab, onTabChange }) => {
  const menuItems = [
    { icon: <DashboardIcon />, label: 'Dashboard', id: 'dashboard' },
    { icon: <OpacityIcon />, label: 'Precipitation', id: 'precipitation' },
    { icon: <AirIcon />, label: 'Wind Speed', id: 'wind' },
    { icon: <CloudIcon />, label: 'Air Quality', id: 'aqi' },
    { icon: <LocationCityIcon />, label: 'All Cities', id: 'cities' },
    { icon: <BarChartIcon />, label: 'Statistics', id: 'stats' },
  ];

  return (
    <Box
      className="sidebar-gradient"
      sx={{
        width: { xs: '100%', sm: 80 },
        height: { xs: '70px', sm: '100vh' },
        position: 'fixed',
        left: 0,
        bottom: { xs: 0, sm: 'auto' },
        top: { xs: 'auto', sm: 0 },
        display: 'flex',
        flexDirection: { xs: 'row', sm: 'column' },
        alignItems: 'center',
        justifyContent: { xs: 'space-around', sm: 'flex-start' },
        py: { xs: 0, sm: 4 },
        px: { xs: 2, sm: 0 },
        borderRight: { xs: 'none', sm: '1px solid rgba(255, 255, 255, 0.05)' },
        borderTop: { xs: '1px solid rgba(255, 255, 255, 0.05)', sm: 'none' },
        zIndex: 1000,
        backgroundColor: { xs: 'rgba(10, 15, 26, 0.95)', sm: 'transparent' },
        backdropFilter: { xs: 'blur(20px)', sm: 'none' }
      }}
    >
      {/* Logo Area (Hidden on mobile bottom bar) */}
      <Box sx={{ mb: { xs: 0, sm: 6 }, display: { xs: 'none', sm: 'block' } }}>
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          style={{ cursor: 'pointer' }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #00f2ff 0%, #ce5dff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(0, 242, 255, 0.4)',
            }}
          >
            <CloudIcon sx={{ color: '#002022', fontSize: 24 }} />
          </Box>
        </motion.div>
      </Box>

      <Box sx={{ 
        flexGrow: { xs: 1, sm: 0 }, 
        display: 'flex', 
        flexDirection: { xs: 'row', sm: 'column' },
        justifyContent: 'center',
        width: '100%',
        gap: { xs: 1, sm: 0 }
      }}>
        {menuItems.map((item) => (
          <SidebarItem 
            key={item.id}
            icon={
              <Box sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' }, display: 'flex' }}>
                {item.icon}
              </Box>
            } 
            label={item.label} 
            active={activeTab === item.id} 
            onClick={() => onTabChange(item.id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
