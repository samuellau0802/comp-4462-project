import React, { useState, useCallback } from 'react';
import Slider from '@mui/material/Slider';

const minDistance = 5;

export default function YearRangeSlider({ startYear, endYear, onChange }) {
  const [curYearRange, setCurYearRange] = useState([startYear, endYear]);

  const handleYearChange = useCallback((event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    const newYearRange = activeThumb === 0
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
    />
  );
}