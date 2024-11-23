import React, { useState, useEffect } from 'react';
import ChoroplethMap from './ChoroplethMap';
import { useInView } from 'react-intersection-observer';
import { Button } from '@mui/material';

const ScrollyTelling = ({ onComplete }) => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [highlightedCountry, setHighlightedCountry] = useState(null);
  const [yearRange] = useState([2010, 2020]);
  const [indicator] = useState('GDP growth (annual %)');

  const steps = [
    {
      id: 'intro',
      title: 'A World of Correlations',
      description:
        'Explore how Stock Price and GDP growth intertwine across nations. This visual journey empowers investors with actionable insights into macroeconomic trends.',
      action: () => {
        setPosition({ coordinates: [0, 0], zoom: 1 });
        setHighlightedCountry(null);
      },
    },
    {
      id: 'focus-usa',
      title: 'The Pulse of the USA',
      description:
        'See how the United States exemplifies a strong link between economic growth and market performance, guiding investment decisions in key sectors.',
      action: () => {
        setPosition({ coordinates: [-95, 37], zoom: 4 });
        setHighlightedCountry('United States');
      },
    },
    {
      id: 'example',
      title: 'Uncover Insights',
      description:
        'During GDP growth spikes, technology and consumer discretionary sectors thrive. Such patterns illuminate pathways for strategic portfolio decisions.',
      action: () => {
        setPosition({ coordinates: [-95, 37], zoom: 4 });
        setHighlightedCountry('United States');
      },
    },
    {
      id: 'compare-europe',
      title: 'Across the Atlantic',
      description:
        'Contrast Europe’s economic cycles. Diversify globally by uncovering how varied GDP correlations shape opportunities.',
      action: () => {
        setPosition({ coordinates: [10, 50], zoom: 3 });
        setHighlightedCountry(null);
      },
    },
    {
      id: 'conclusion',
      title: 'Your Investment Journey',
      description:
        'From the USA to Europe, explore how macroeconomic trends shape markets. A new frontier for smarter, data-driven investments awaits.',
      action: () => {
        setPosition({ coordinates: [0, 0], zoom: 1 });
        setHighlightedCountry(null);
      },
    },
  ];

  const Step = ({ step }) => {
    const { ref, inView } = useInView({ threshold: 0.5 });

    useEffect(() => {
      if (inView) {
        step.action();
      }
    }, [inView, step]);

    return (
      <div ref={ref} className="step" style={stepStyle}>
        <h2 style={stepTitleStyle}>{step.title}</h2>
        <p style={stepDescriptionStyle}>{step.description}</p>
      </div>
    );
  };

  const handleExit = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="app" style={appStyle}>
      <div className="map-container" style={mapContainerStyle}>
        <ChoroplethMap
          yearRange={yearRange}
          indicator={indicator}
          position={position}
          setPosition={setPosition}
          highlightedCountry={highlightedCountry}
        />
      </div>

      <div className="scrolly-telling" style={scrollyTellingStyle}>
        {steps.map((step) => (
          <Step key={step.id} step={step} />
        ))}
      </div>

      <div style={exitButtonContainerStyle}>
        <Button variant="contained" color="primary" onClick={handleExit} style={exitButtonStyle}>
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
  minHeight: '80vh', // Adjusted height to bring the content higher
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
