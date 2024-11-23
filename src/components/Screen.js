import React, { useState, useEffect, useCallback } from 'react';
import YearRangeSlider from './YearRangeSlider';
import '../App.css';
import ChoroplethMap from './ChoroplethMap';
import { Container, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import LineChartComponent from './LineChart';
import IndicatorDropdown from './IndicatorDropdown';
import { Allotment } from 'allotment';
import computeCorrelation from './Correlation';
import 'allotment/dist/style.css';
import ScrollyTelling from './ScrollyTelling';

const Screen = ({ windowHeight }) => {
  const [maxYearRange] = useState([2008, 2023]);
  const [curYearRange, setCurYearRange] = useState([2008, 2023]);
  const [indicator, setIndicator] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryCorrelation, setSelectedCountryCorrelation] = useState(null);
  const [showScrollyTelling, setShowScrollyTelling] = useState(false);

  const handleYearRangeChange = useCallback(
    (newRange) => {
      setCurYearRange(newRange);
      if (selectedCountry && indicator) {
        const updatedCorrelation = computeCorrelation(
          selectedCountry,
          newRange,
          'Stock Price',
          indicator
        );
        setSelectedCountryCorrelation(updatedCorrelation);
      }
    },
    [selectedCountry, indicator]
  );

  const handleIndicatorChange = useCallback(
    (event) => {
      const newIndicator = event.target.value;
      setIndicator(newIndicator);
      if (selectedCountry && curYearRange) {
        const updatedCorrelation = computeCorrelation(
          selectedCountry,
          curYearRange,
          'Stock Price',
          newIndicator
        );
        setSelectedCountryCorrelation(updatedCorrelation);
      }
    },
    [selectedCountry, curYearRange]
  );

  const handleSelectedCountry = useCallback(
    (country, correlation) => {
      if (selectedCountry === country) {
        setSelectedCountry(null);
        setSelectedCountryCorrelation(null);
      } else {
        setSelectedCountry(country);

        // Parse correlation to ensure it's a number
        const numericCorrelation = parseFloat(correlation);

        if (!isNaN(numericCorrelation)) {
          setSelectedCountryCorrelation(numericCorrelation); // Store as number
        } else {
          setSelectedCountryCorrelation(null);
        }
      }
    },
    [selectedCountry]
  );

  const handleScrollyTellingComplete = () => {
    setShowScrollyTelling(false);
  };

  const startScrollyTelling = () => {
    setShowScrollyTelling(true);
  };

  useEffect(() => {}, [indicator, curYearRange, selectedCountry]);

  if (showScrollyTelling) {
    return <ScrollyTelling onComplete={handleScrollyTellingComplete} />;
  }

  return (
    <Container style={{ height: `${windowHeight}px`, position: 'relative' }}>
      {/* Start Tour Button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={startScrollyTelling}
        style={{ position: 'absolute', top: 56, right: 1220, zIndex: 1000 }}
      >
        Start Tour
      </Button>

      {/* Main Interactive Map and Controls */}
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={6} md={8}>
          <IndicatorDropdown
            indicator={indicator}
            handleIndicatorChange={handleIndicatorChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <YearRangeSlider
            startYear={maxYearRange[0]}
            endYear={maxYearRange[1]}
            onChange={handleYearRangeChange}
          />
        </Grid>
      </Grid>

      <Allotment vertical>
        <Allotment.Pane minSize={200}>
          <ChoroplethMap
            yearRange={curYearRange}
            indicator={indicator}
            onClick={(country, correlation) =>
              handleSelectedCountry(country, correlation)
            }
          />
        </Allotment.Pane>

        {selectedCountry && (
          <Allotment.Pane minSize={200}>
            <LineChartComponent
              country={selectedCountry}
              yearRange={curYearRange}
              indicator1={'Stock Price'}
              indicator2={indicator}
              correlation={selectedCountryCorrelation} // Passing correlation as a number
            />
          </Allotment.Pane>
        )}
      </Allotment>
    </Container>
  );
};

export default Screen;
