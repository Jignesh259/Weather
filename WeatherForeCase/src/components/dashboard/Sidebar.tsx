import React from 'react';
import { Box, Tooltip, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import DashboardIcon from '@mui/icons-material/DashboardRounded';
import OpacityIcon from '@mui/icons-material/OpacityRounded';
import AirIcon from '@mui/icons-material/AirRounded';
import CloudIcon from '@mui/icons-material/CloudRounded';
import BarChartIcon from '@mui/icons-material/BarChartRounded';

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
    { icon: <BarChartIcon />, label: 'Statistics', id: 'stats' },
  ];

  return (
    <Box
      className="sidebar-gradient"
      sx={{
        width: 80,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
        borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        zIndex: 1000,
      }}
    >
      {/* Logo Area */}
      <Box sx={{ mb: 6 }}>
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

      {/* Main Nav */}
      <Box sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <SidebarItem 
            key={item.id}
            icon={item.icon} 
            label={item.label} 
            active={activeTab === item.id} 
            onClick={() => onTabChange(item.id)}
          />
        ))}
      </Box>

      {/* Bottom Nav (Settings removed) */}
      <Box>
        {/* You can add a help icon or something else if needed */}
      </Box>
    </Box>
  );
};

export default Sidebar;
