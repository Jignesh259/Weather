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
import { Box, Typography, CircularProgress } from '@mui/material';
import type { HourlyData } from '../../types/weather';

interface WeatherChartsProps {
  data: HourlyData[];
  dataKey?: 'temperature' | 'humidity' | 'wind_speed' | 'aqi';
  color?: string;
  unit?: string;
  loading?: boolean;
}

const CustomTooltip = ({ active, payload, label, viewType, unit }: any) => {
  if (active && payload && payload.length) {
    const formattedLabel = viewType === 'hourly' 
      ? new Date(label).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })
      : label;

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
          {formattedLabel}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: payload[0].fill, boxShadow: `0 0 10px ${payload[0].fill}` }} />
          <Typography variant="body2" sx={{ fontWeight: 800, color: '#fff' }}>
            {payload[0].value}{unit || '°C'}
          </Typography>
        </Box>
      </Box>
    );
  }
  return null;
};

const WeatherCharts: React.FC<WeatherChartsProps> = ({ 
  data, 
  dataKey = 'temperature', 
  color = '#00f2ff',
  unit = '°C',
  loading = false
}) => {
  const [viewType, setViewType] = React.useState<'hourly' | 'weekly'>('hourly');

  const chartData = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    if (viewType === 'hourly') {
      return data.slice(0, 48); // Show 48 hours for a clean look
    }

    // Weekly Aggregation: Group by date and calculate average
    const dailyMap: Record<string, { total: number; count: number; date: string }> = {};

    data.forEach((item) => {
      const date = new Date(item.timestamp).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      if (!dailyMap[date]) {
        dailyMap[date] = { total: 0, count: 0, date };
      }
      dailyMap[date].total += (item[dataKey] as number);
      dailyMap[date].count += 1;
    });

    return Object.values(dailyMap).map((day) => ({
      timestamp: day.date,
      [dataKey]: Math.round((day.total / day.count) * 10) / 10,
    }));
  }, [data, viewType, dataKey]);

  const getTitle = () => {
    const base = dataKey.toUpperCase().replace('_', ' ');
    return viewType === 'hourly' ? `${base} PREDICTION (48H)` : `7-DAY ${base} TREND`;
  };

  const showLoading = loading || data.length === 0;

  return (
    <Box
      className="glass-card"
      sx={{
        p: { xs: 2, md: 4 },
        borderRadius: '32px',
        height: '100%',
        minHeight: 400,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ opacity: 0.6, fontWeight: 800, fontSize: '0.75rem', letterSpacing: 2 }}>
          {getTitle()}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box 
            onClick={() => setViewType('hourly')}
            sx={{ 
              px: 1.5, py: 0.5, borderRadius: '8px', cursor: 'pointer',
              backgroundColor: viewType === 'hourly' ? `${color}22` : 'transparent', 
              color: viewType === 'hourly' ? color : 'rgba(255, 255, 255, 0.3)', 
              fontSize: '0.65rem', fontWeight: 800,
              transition: 'all 0.3s ease',
              '&:hover': { color: color }
            }}
          >
            HOURLY
          </Box>
          <Box 
            onClick={() => setViewType('weekly')}
            sx={{ 
              px: 1.5, py: 0.5, borderRadius: '8px', cursor: 'pointer',
              backgroundColor: viewType === 'weekly' ? `${color}22` : 'transparent', 
              color: viewType === 'weekly' ? color : 'rgba(255, 255, 255, 0.3)', 
              fontSize: '0.65rem', fontWeight: 800,
              transition: 'all 0.3s ease',
              '&:hover': { color: color }
            }}
          >
            WEEKLY
          </Box>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, width: '100%', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {showLoading ? (
          <Box sx={{ textAlign: 'center' }}>
            {loading ? (
              <CircularProgress size={30} sx={{ color: color, mb: 2 }} />
            ) : null}
            <Typography variant="body2" sx={{ opacity: 0.3 }}>
              {loading ? "Synthesizing prediction data..." : "Awaiting data update..."}
            </Typography>
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart key={dataKey} data={chartData as any[]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id={`colorGradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis 
                dataKey="timestamp" 
                tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 500 }}
                tickFormatter={(ts) => {
                  if (viewType === 'hourly') {
                    const date = new Date(ts);
                    return `${date.getHours()}:00`;
                  }
                  return ts.split(',')[0]; // Just the day name (e.g., 'Mon')
                }}
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
              <Tooltip 
                content={<CustomTooltip viewType={viewType} unit={unit} />} 
                cursor={{ stroke: `${color}44`, strokeWidth: 2 }} 
              />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={4}
                fillOpacity={1}
                fill={`url(#colorGradient-${dataKey})`}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Box>
  );
};

export default WeatherCharts;
