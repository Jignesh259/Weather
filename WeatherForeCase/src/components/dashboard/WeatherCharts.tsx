import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Box, Typography } from '@mui/material';
import type { HourlyData } from '../../types/weather';

interface WeatherChartsProps {
  data: HourlyData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: 'rgba(10, 15, 26, 0.95)',
          p: 2,
          border: '1px solid rgba(0, 242, 255, 0.2)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.5, display: 'block', mb: 1 }}>
          {new Date(label).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#00f2ff', boxShadow: '0 0 10px #00f2ff' }} />
          <Typography variant="body2" sx={{ fontWeight: 800, color: '#fff' }}>
            {payload[0].value}°C
          </Typography>
        </Box>
      </Box>
    );
  }
  return null;
};

const WeatherCharts: React.FC<WeatherChartsProps> = ({ data }) => {
  const chartData = data.slice(0, 48); // Show 48 hours for a clean look

  return (
    <Box
      className="glass-card"
      sx={{
        p: 4,
        borderRadius: '24px',
        height: '100%',
        minHeight: 400,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ opacity: 0.6, fontWeight: 500, fontSize: '0.8rem', letterSpacing: 2 }}>
          TEMPERATURE PREDICTION
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{ px: 1.5, py: 0.5, borderRadius: '8px', backgroundColor: 'rgba(0, 242, 255, 0.1)', color: '#00f2ff', fontSize: '0.65rem', fontWeight: 700 }}>
            HOURLY
          </Box>
          <Box sx={{ px: 1.5, py: 0.5, borderRadius: '8px', backgroundColor: 'transparent', color: 'rgba(255, 255, 255, 0.3)', fontSize: '0.65rem', fontWeight: 700 }}>
            WEEKLY
          </Box>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, width: '100%', minHeight: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00f2ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis 
              dataKey="timestamp" 
              tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 500 }}
              tickFormatter={(ts) => new Date(ts).getHours() + ":00"}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis 
              tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(0, 242, 255, 0.2)', strokeWidth: 2 }} />
            <Area
              type="monotone"
              dataKey="temperature"
              stroke="#00f2ff"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorTemp)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default WeatherCharts;
