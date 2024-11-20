import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, ThemeProvider, createTheme } from '@mui/material';

// Create a dark theme using Material-UI's ThemeProvider
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#82aaff', // Soft blue for primary color
    },
    secondary: {
      main: '#bb86fc', // Secondary purple accent
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1d1d1f', // Slightly lighter dark for elements
    },
    text: {
      primary: '#e0e0e0', // Light text color
      secondary: '#b0b0b0', // Muted text
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    fontSize: 14, // Standard font size
  },
});

const IndicatorDropdown = ({ indicator, handleIndicatorChange }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <FormControl fullWidth variant="outlined" sx={{ marginTop: 2, backgroundColor: 'background.paper', borderRadius: '8px' }}>
        <InputLabel id="select-label" sx={{ color: 'text.secondary' }}>
          Macro-Economic Indicator
        </InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={indicator}
          label="Indicator"
          onChange={handleIndicatorChange}
          sx={{
            color: 'text.primary',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'text.secondary',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
          }}
        >
          <MenuItem value="GDP growth (annual %)">GDP growth (annual %)</MenuItem>
          <MenuItem value="FX Reserves">FX Reserves</MenuItem>
          <MenuItem value="Government Debt-to-GDP">Government Debt-to-GDP</MenuItem>
          <MenuItem value="Balance of Trade">Balance of Trade</MenuItem>
          <MenuItem value="Inflation">Inflation</MenuItem>
          <MenuItem value="Unemployment Rate">Unemployment Rate</MenuItem>
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};

export default IndicatorDropdown;
