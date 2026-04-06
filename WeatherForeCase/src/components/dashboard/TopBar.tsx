import React from 'react';
import { Box, Typography, IconButton, Badge, Autocomplete, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/SearchRounded';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneRounded';
import CalendarTodayIcon from '@mui/icons-material/CalendarTodayRounded';
import LocationCityIcon from '@mui/icons-material/LocationCityRounded';
import { motion } from 'framer-motion';

import unnamedImg from '../../assets/unnamed.png';

interface TopBarProps {
  selectedCity: string;
  cities: string[];
  onCityChange: (city: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ selectedCity, cities, onCityChange }) => {
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const [inputValue, setInputValue] = React.useState(selectedCity);

  // Sync the inputValue when selectedCity changes from parent
  React.useEffect(() => {
    setInputValue(selectedCity);
  }, [selectedCity]);

  const handleSearch = (city: string | null) => {
    if (city && cities.includes(city)) {
      onCityChange(city);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 4,
        py: 3,
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
              letterSpacing: 1
            }}
          >
            {selectedCity}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 400, opacity: 0.5 }}>
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

      {/* Center: Search Bar with Autocomplete as a List Box */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Autocomplete
          key={cities.length} // Force re-render once cities are loaded
          options={cities}
          loading={cities.length === 0}
          value={selectedCity}
          onChange={(_, newValue) => {
            handleSearch(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(inputValue);
            }
          }}
          blurOnSelect
          openOnFocus
          isOptionEqualToValue={(option, value) => option === value}
          renderOption={(props, option) => (
            <li {...props}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocationCityIcon sx={{ fontSize: 18, color: '#00f2ff', opacity: 0.6 }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{option}</Typography>
              </Box>
            </li>
          )}
          sx={{
            width: { xs: 200, sm: 380 },
            '& .MuiOutlinedInput-root': {
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              pl: 2,
              pr: '0 !important', // Ensure endAdornment is aligned
              '& fieldset': { border: 'none' },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(0, 242, 255, 0.2)',
              },
              '&.Mui-focused': {
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                border: '1px solid rgba(0, 242, 255, 0.4)',
                boxShadow: '0 0 20px rgba(0, 242, 255, 0.1)',
              },
            },
            '& .MuiAutocomplete-inputRoot': {
              padding: '6px 12px !important',
              fontSize: '0.9rem',
            },
            '& .MuiAutocomplete-endAdornment': {
              position: 'relative',
              right: 12,
              top: 0
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search or Select City..."
              variant="outlined"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: null,
                endAdornment: (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {params.InputProps.endAdornment}
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleSearch(inputValue)}
                        sx={{
                          color: '#00f2ff',
                          ml: 1,
                          backgroundColor: 'rgba(0, 242, 255, 0.08)',
                          '&:hover': { backgroundColor: 'rgba(0, 242, 255, 0.15)' }
                        }}
                      >
                        <SearchIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </motion.div>
                  </Box>
                ),
              }}
            />
          )}
          // Customizing the Dropdown Menu (Paper)
          componentsProps={{
            paper: {
              sx: {
                bgcolor: '#161b2a',
                color: 'white',
                borderRadius: '24px',
                border: '1px solid rgba(0, 242, 255, 0.15)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 242, 255, 0.05)',
                backdropFilter: 'blur(30px)',
                marginTop: 1.5,
                zIndex: 2000,
                '& .MuiAutocomplete-listbox': {
                  maxHeight: '400px',
                  padding: '12px',
                  '& .MuiAutocomplete-noOptions': {
                    color: 'rgba(255, 255, 255, 0.4)',
                    padding: '30px',
                    textAlign: 'center',
                    fontSize: '0.9rem'
                  },
                  '& .MuiAutocomplete-option': {
                    borderRadius: '12px',
                    padding: '12px 18px',
                    margin: '2px 0',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      bgcolor: 'rgba(0, 242, 255, 0.08)',
                      color: '#00f2ff',
                      transform: 'translateX(6px)',
                    },
                    '&[aria-selected="true"]': {
                      bgcolor: 'rgba(0, 242, 255, 0.15) !important',
                      color: '#00f2ff',
                      fontWeight: 700,
                    },
                  },
                },
              }
            }
          }}
        />
      </Box>

      {/* Right: Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <motion.div whileHover={{ scale: 1.05 }}>
          <IconButton sx={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px' }} onClick={() => alert('No new notifications')}>
            <Badge variant="dot" color="error">
              <NotificationsIcon sx={{ color: 'rgba(255, 255, 255, 0.6)' }} />
            </Badge>
          </IconButton>
        </motion.div>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pl: 1 }}>
          <Box
            component="img"
            src={unnamedImg}
            sx={{
              width: 45,
              height: 45,
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
