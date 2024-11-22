import React, { useState, useCallback } from 'react';
import Slider from '@mui/material/Slider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Minimum distance between slider values
const minDistance = 5;

// Create a stunning dark theme with gradients
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#82aaff', // Soft blue for active elements
    },
    background: {
      default: '#121212', // Dark base
      paper: 'rgba(18, 18, 18, 0.8)', // Glassmorphism effect
    },
    text: {
      primary: '#ffffff', // Bright white text
      secondary: '#b3b3b3', // Muted grey text
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica Neue", sans-serif',
    fontSize: 14,
  },
});

export default function YearRangeSlider({ startYear, endYear, onChange }) {
  const [curYearRange, setCurYearRange] = useState([startYear, endYear]);

  const handleYearChange = useCallback(
    (event, newValue, activeThumb) => {
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
    },
    [curYearRange, onChange]
  );

  const marks = [
    { value: startYear, label: startYear.toString() },
    { value: endYear, label: endYear.toString() },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <div
        style={{
          height: '45px', // Matches the dropdown height exactly
          padding: '8px 16px',
          marginTop: '16px', // Ensure spacing from the blue bar
          background: 'linear-gradient(135deg, rgba(130,170,255,0.3), rgba(187,134,252,0.3))',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)', // Glassmorphism effect
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center', // Centers the slider vertically
        }}
      >
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
            color: 'primary.main',
            '.MuiSlider-track': {
              background: 'linear-gradient(90deg, #82aaff, #ff79c6)', // Gradient for active track
              height: '6px',
            },
            '.MuiSlider-thumb': {
              backgroundColor: '#82aaff',
              width: '16px',
              height: '16px',
              border: '3px solid #ffffff',
              boxShadow: '0 0 8px rgba(130, 170, 255, 0.5)',
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              '&:hover': {
                boxShadow: '0 0 12px rgba(130, 170, 255, 0.8)',
                transform: 'scale(1.2)',
              },
            },
            '.MuiSlider-rail': {
              backgroundColor: '#4a4a4a',
              opacity: 0.6,
              height: '6px',
            },
            '.MuiSlider-mark': {
              backgroundColor: '#b3b3b3',
              height: '6px',
              width: '6px',
              borderRadius: '50%',
            },
            '.MuiSlider-markLabel': {
              color: '#b3b3b3',
              fontSize: '0.7rem',
              fontWeight: 'bold',
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
}
