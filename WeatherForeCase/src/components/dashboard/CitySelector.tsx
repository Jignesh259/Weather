import React from 'react';
import { FormControl, Select, MenuItem, Box, Typography } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';

interface CitySelectorProps {
  cities: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ cities, selectedCity, onCityChange }) => {
  return (
    <Box sx={{ minWidth: 200, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, opacity: 0.7 }}>
        <LocationCityIcon fontSize="small" />
        <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: 1 }}>
          SELECT GUJARAT DISTRICT
        </Typography>
      </Box>
      <FormControl fullWidth variant="outlined">
        <Select
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value as string)}
          sx={{
            borderRadius: '16px',
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(187, 134, 252, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#bb86fc',
            },
          }}
        >
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CitySelector;
