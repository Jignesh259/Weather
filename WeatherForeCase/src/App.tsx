import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <AnimatePresence mode="wait">
          {view === 'landing' ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <LandingPage onExplore={() => setView('dashboard')} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <DashboardPage onBack={() => setView('landing')} />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </ThemeProvider>
  );
};

export default App;
