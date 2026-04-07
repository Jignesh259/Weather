import { Box, Typography } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarTodayRounded';

import unnamedImg from '../../assets/unnamed.png';

interface TopBarProps {
  selectedCity: string;
}

const TopBar: React.FC<TopBarProps> = ({ selectedCity }) => {
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, sm: 4 },
        py: { xs: 2, sm: 3 },
        width: '100%',
        backgroundColor: 'transparent',
      }}
    >
      {/* Left: Location & Date */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: '#00f2ff',
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontSize: { xs: '1.2rem', sm: '1.5rem' }
            }}
          >
            {selectedCity}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 400, opacity: 0.5, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
            , GUJARAT
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, opacity: 0.6 }}>
          <CalendarTodayIcon sx={{ fontSize: 14 }} />
          <Typography variant="caption" sx={{ fontWeight: 500 }}>
            {today}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      {/* Right: Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pl: 1 }}>
          <Box
            component="img"
            src={unnamedImg}
            sx={{
              width: { xs: 35, sm: 45 },
              height: { xs: 35, sm: 45 },
              borderRadius: '12px',
              border: '2px solid rgba(0, 242, 255, 0.2)',
              objectFit: 'cover'
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TopBar;
