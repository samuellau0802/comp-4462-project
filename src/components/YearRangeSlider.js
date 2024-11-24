import React, { useState, useCallback } from 'react';
import Slider from '@mui/material/Slider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Minimum distance between slider values
const minDistance = 5;

// Custom dark theme with gradients and glassmorphism
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#82aaff', // Soft blue for active elements
    },
    background: {
      default: '#121212', // Deep dark background
      paper: 'rgba(18, 18, 18, 0.8)', // Subtle frosted glass effect
    },
    text: {
      primary: '#ffffff', // Bright text
      secondary: '#b3b3b3', // Muted text
    },
  },
  typography: {
    fontFamily: '"SF Pro Display", "Roboto", "Helvetica Neue", sans-serif',
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
          height: '50px',
          padding: '8px 16px',
          marginTop: '16px',
          background:
            'linear-gradient(145deg, rgba(130, 170, 255, 0.3), rgba(255, 121, 198, 0.3))',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            // transform: 'scale(1.03)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
          },
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
              borderRadius: '4px',
            },
            '.MuiSlider-thumb': {
              backgroundColor: '#82aaff',
              width: '18px',
              height: '18px',
              border: '3px solid #ffffff',
              boxShadow: '0 4px 12px rgba(130, 170, 255, 0.5)',
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(130, 170, 255, 0.8)',
                // transform: 'scale(1.2)',
              },
              '&.Mui-focusVisible': {
                boxShadow: '0 0 16px rgba(130, 170, 255, 1)',
              },
            },
            '.MuiSlider-rail': {
              backgroundColor: '#4a4a4a',
              opacity: 0.8,
              height: '6px',
              borderRadius: '4px',
            },
            '.MuiSlider-mark': {
              backgroundColor: '#b3b3b3',
              height: '8px',
              width: '8px',
              borderRadius: '50%',
            },
            '.MuiSlider-markActive': {
              backgroundColor: '#82aaff',
            },
            '.MuiSlider-markLabel': {
              color: '#b3b3b3',
              fontSize: '0.8rem',
              fontWeight: 600,
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
}
