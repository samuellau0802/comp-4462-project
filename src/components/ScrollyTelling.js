import React, { useState, useEffect } from 'react';
import ChoroplethMap from './ChoroplethMap';
import LineChartComponent from './LineChart';
import { useInView } from 'react-intersection-observer';
import { Button } from '@mui/material';
import data from '../data/countries_data_2008_2023.json'; // Adjust the path as needed

const ScrollyTelling = ({ onComplete }) => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [highlightedCountry, setHighlightedCountry] = useState(null);
  const [yearRange] = useState([2010, 2020]);
  const [indicator2] = useState('GDP growth (annual %)');
  const [indicator1] = useState('Index Price');
  const [correlation, setCorrelation] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Steps configuration
  const steps = [
    {
      id: 'intro',
      title: 'A World of Correlations',
      description: [
        'Delve into the intricate relationship between index price movements and GDP growth across various nations. By visualizing this dynamic interplay, we uncover how economic growth drives market performance and vice versa, shedding light on the interconnectedness of financial markets and macroeconomic indicators.',
        'This comprehensive exploration offers investors a powerful tool to identify actionable insights, enabling them to navigate global economic trends with precision and strategically align their investment decisions to capitalize on opportunities presented by shifting economic landscapes.',
      ],
      chart: false,
      country: null,
      coordinates: [0, 0],
      zoom: 1,
      correlation: null,
    },
    {
      id: 'focus-usa',
      title: 'The Pulse of the USA',
      description:
        'See how the United States exemplifies a strong link between economic growth and market performance, guiding investment decisions in key sectors.',
      chart: true,
      country: 'United States of America',
      coordinates: [-95, 37],
      zoom: 4,
      correlation: 0.75,
    },
    {
      id: 'compare-europe',
      title: 'Across the Atlantic',
      description: [
        'Contrast Europe’s economic cycles with those of the USA. Explore how varying GDP growth rates and market trends create opportunities for portfolio diversification.',
        'Understanding these differences can help investors identify sectors and regions poised for growth, enabling smarter global investment strategies.',
      ],
      chart: true,
      country: 'Germany',
      coordinates: [10, 50],
      zoom: 4,
      correlation: 0.65,
    },
    {
      id: 'conclusion',
      title: 'Your Investment Journey',
      description:
        'From the USA to Europe, explore how macroeconomic trends shape markets. A new frontier for smarter, data-driven investments awaits.',
      chart: false,
      country: null,
      coordinates: [0, 0],
      zoom: 1,
      correlation: null,
    },
  ];

  // Update position and highlighted country based on the current step
  useEffect(() => {
    const step = steps[currentStepIndex];
    if (step) {
      setPosition({ coordinates: step.coordinates, zoom: step.zoom });
      setHighlightedCountry(step.country);
      setCorrelation(step.correlation);
    }
  }, [currentStepIndex]);

  // Data fetching function
  const getDataForCountry = (country, yearRange, indicator1, indicator2) => {
    const [startYear, endYear] = yearRange;
    const chartData = [];

    if (!data[country]) return chartData;

    for (let year = startYear; year <= endYear; year++) {
      const yearData = data[country]['Economic Data'][year];
      if (yearData) {
        const value1 = parseFloat(yearData[indicator1] || 'NaN');
        const value2 = parseFloat(yearData[indicator2] || 'NaN');

        if (!isNaN(value1) && !isNaN(value2)) {
          chartData.push({
            year: year,
            [indicator1]: value1,
            [indicator2]: value2,
          });
        }
      }
    }

    return chartData;
  };

  // Step Component
  const Step = ({ step, index }) => {
    const { ref, inView } = useInView({
      threshold: 0.7, // Adjusted to ensure only one step is active at a time
      triggerOnce: false,
    });

    useEffect(() => {
      if (inView) {
        setCurrentStepIndex(index);
      }
    }, [inView, index]);

    const chartData =
      step.chart && highlightedCountry
        ? getDataForCountry(highlightedCountry, yearRange, indicator1, indicator2)
        : [];

    return (
      <div ref={ref} className="step" style={stepStyle}>
        <h2 style={stepTitleStyle}>{step.title}</h2>
        {Array.isArray(step.description)
          ? step.description.map((paragraph, idx) => (
              <p key={idx} style={stepDescriptionStyle}>
                {paragraph}
              </p>
            ))
          : (
            <p style={stepDescriptionStyle}>{step.description}</p>
          )}
        {step.chart && highlightedCountry && chartData.length > 0 && (
          <LineChartComponent
            country={highlightedCountry}
            yearRange={yearRange}
            indicator1={indicator1}
            indicator2={indicator2}
            correlation={correlation}
          />
        )}
        {step.chart && highlightedCountry && chartData.length === 0 && (
          <p style={noDataStyle}>No data available for the specified range.</p>
        )}
      </div>
    );
  };

  // Exit button handler
  const handleExit = () => {
    if (onComplete) {
      onComplete();
    }
  };

  // Render the scrolly telling component
  return (
    <div className="app" style={appStyle}>
      <div className="map-container" style={mapContainerStyle}>
        <ChoroplethMap
          yearRange={yearRange}
          indicator={indicator1}
          position={position}
          setPosition={setPosition}
          highlightedCountry={highlightedCountry}
        />
      </div>

      <div className="scrolly-telling" style={scrollyTellingStyle}>
        {steps.map((step, index) => (
          <Step key={step.id} step={step} index={index} />
        ))}
      </div>

      <div style={exitButtonContainerStyle}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleExit}
          style={exitButtonStyle}
        >
          Exit Tour and Explore the Map
        </Button>
      </div>
    </div>
  );
};

// Styles
const appStyle = {
  display: 'flex',
  position: 'relative',
  height: '100vh',
  backgroundColor: '#000000',
  color: '#ffffff',
};

const mapContainerStyle = {
  position: 'sticky',
  top: 0,
  flex: 1,
  background: 'linear-gradient(to bottom, #1c1c1e, #000000)',
  borderRadius: '30px',
  margin: '30px',
  boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.9)',
};

const scrollyTellingStyle = {
  flex: 1,
  overflowY: 'scroll',
  padding: '20px 40px',
  fontFamily: 'San Francisco, Arial, sans-serif',
  WebkitFontSmoothing: 'antialiased',
};

const stepStyle = {
  minHeight: '80vh',
  padding: '40px 20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  marginBottom: '10px',
};

const stepTitleStyle = {
  fontSize: '3rem',
  fontWeight: 600,
  marginBottom: '10px',
  color: '#f9f9f9',
};

const stepDescriptionStyle = {
  fontSize: '1.3rem',
  lineHeight: '1.5',
  color: '#e4e4e4',
};

const noDataStyle = {
  fontSize: '1rem',
  color: '#FF6B6B',
  fontStyle: 'italic',
};

const exitButtonContainerStyle = {
  position: 'fixed',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1000,
};

const exitButtonStyle = {
  padding: '10px 20px',
  fontSize: '1rem',
  fontWeight: 'bold',
  borderRadius: '20px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
};

export default ScrollyTelling;
