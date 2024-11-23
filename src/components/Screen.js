import React, { useState, useEffect, useCallback } from 'react';
import YearRangeSlider from './YearRangeSlider';
import '../App.css';
import ChoroplethMap from './ChoroplethMap';
import { Container, Button, Grid, Box } from '@mui/material';
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

        const numericCorrelation = parseFloat(correlation);
        if (!isNaN(numericCorrelation)) {
          setSelectedCountryCorrelation(numericCorrelation);
        } else {
          setSelectedCountryCorrelation(null);
        }
      }
    },
    [selectedCountry]
  );



  return (
    <Container
      style={{
        height: `${windowHeight}px`,
        position: 'relative',
        background: 'linear-gradient(135deg, #101010, #1a1a1a)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.9)',
        overflow: 'hidden',
        animation: 'fadeIn 1s ease',
      }}
    >
      {/* Start Tour Button at the Bottom-Right */}
      <Box
        sx={{
          position: 'absolute',
          top: 196.5, // Distance from the bottom
          right: 730, // Distance from the right
          zIndex: 1000,
        }}
      >
 
      </Box>

      {/* Main Interactive Map and Controls */}
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        style={{ marginBottom: '20px' }}
      >
        <Grid item xs={12} sm={6} md={8}>
          <IndicatorDropdown
            indicator={indicator}
            handleIndicatorChange={handleIndicatorChange}
            style={{
              background: '#2b2b2b',
              borderRadius: '10px',
              color: '#ffffff',
              padding: '10px 15px',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <YearRangeSlider
            startYear={maxYearRange[0]}
            endYear={maxYearRange[1]}
            onChange={handleYearRangeChange}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              padding: '10px',
            }}
          />
        </Grid>
      </Grid>

      <Allotment vertical>
        <Allotment.Pane minSize={200} preferredSize={900}>
          <ChoroplethMap
            yearRange={curYearRange}
            indicator={indicator}
            onClick={(country, correlation) =>
              handleSelectedCountry(country, correlation)
            }
          />
        </Allotment.Pane>

        {selectedCountry && (
          <Allotment.Pane minSize={200} preferredSize={650}>
            <LineChartComponent
              country={selectedCountry}
              yearRange={curYearRange}
              indicator1={'Stock Price'}
              indicator2={indicator}
              correlation={selectedCountryCorrelation}
            />
          </Allotment.Pane>
        )}
      </Allotment>
    </Container>
  );
};

export default Screen;
