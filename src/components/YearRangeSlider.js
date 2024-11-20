import React, { useState, useCallback } from 'react';
import Slider from '@mui/material/Slider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const minDistance = 5;

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#82aaff', // Soft blue for active elements
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1d1d1f', // Slightly lighter for components
    },
    text: {
      primary: '#e0e0e0', // Light text
      secondary: '#b0b0b0', // Muted text
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    fontSize: 14,
  },
});

export default function YearRangeSlider({ startYear, endYear, onChange }) {
  const [curYearRange, setCurYearRange] = useState([startYear, endYear]);

  const handleYearChange = useCallback((event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    const newYearRange =
      activeThumb === 0
        ? [Math.min(newValue[0], curYearRange[1] - minDistance), curYearRange[1]]
        : [curYearRange[0], Math.max(newValue[1], curYearRange[0] + minDistance)];

    setCurYearRange(newYearRange);

    if (onChange) {
      onChange(newYearRange);
    }
  }, [curYearRange, onChange]);

  const marks = [
    { value: startYear, label: startYear.toString() },
    { value: endYear, label: endYear.toString() },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ padding: '10px', backgroundColor: darkTheme.palette.background.paper, borderRadius: '8px' }}>
        <Slider
          getAriaLabel={() => 'Year Range'}
          value={curYearRange}
          onChange={handleYearChange}
          valueLabelDisplay="auto"
          step={1}
          disableSwap
          min={startYear}
          max={endYear}
          marks={marks}
          sx={{
            color: 'primary.main', // Slider track color
            '.MuiSlider-thumb': {
              backgroundColor: 'primary.main', // Thumb color
              '&:hover': {
                boxShadow: '0 0 0 8px rgba(130, 170, 255, 0.16)', // Subtle glow effect on hover
              },
            },
            '.MuiSlider-rail': {
              backgroundColor: 'text.secondary', // Slider rail color
            },
            '.MuiSlider-mark': {
              backgroundColor: 'text.secondary', // Marks color
              opacity: 0.8,
            },
            '.MuiSlider-markLabel': {
              color: 'text.secondary', // Label color
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
}
