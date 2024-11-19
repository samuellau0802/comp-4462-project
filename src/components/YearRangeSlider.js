import * as React from 'react';
import Slider from '@mui/material/Slider';

const minDistance = 5;

export default function YearRangeSlider({ startYear, endYear, onChange }) {
  const [curYearRange, setCurYearRange] = React.useState([startYear, endYear]);

  const handleYearChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    let newYearRange;
    if (activeThumb === 0) {
      newYearRange = [Math.min(newValue[0], curYearRange[1] - minDistance), curYearRange[1]];
    } else {
      newYearRange = [curYearRange[0], Math.max(newValue[1], curYearRange[0] + minDistance)];
    }

    setCurYearRange(newYearRange);

    // Call the onChange callback with the updated values
    if (onChange) {
      onChange(newYearRange);
    }
  };

  const marks = [
    {
      value: startYear,
      label: startYear.toString(),
    },
    {
      value: endYear,
      label: endYear.toString(),
    },
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