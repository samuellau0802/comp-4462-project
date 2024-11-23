import React, { useState, useEffect } from 'react';
import ChoroplethMap from './ChoroplethMap';
import { useInView } from 'react-intersection-observer';
import { Button } from '@mui/material';

const ScrollyTelling = ({ onComplete }) => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [highlightedCountry, setHighlightedCountry] = useState(null);
  const [yearRange] = useState([2010, 2020]);
  const [indicator] = useState('GDP growth (annual %)');

  // Define the scrolly-telling steps
  const steps = [
    {
      id: 'intro',
      title: 'Introduction',
      description:
        'This map shows the correlation between Stock Price and GDP growth over time. This visualization allows retail investors to explore patterns in macroeconomic data and uncover insights that can guide investment decisions.',
      action: () => {
        setPosition({ coordinates: [0, 0], zoom: 1 });
        setHighlightedCountry(null);
      },
    },
    {
      id: 'focus-usa',
      title: 'Focus on the USA',
      description:
        'Notice how the USA stands out with its high correlation between GDP growth and stock prices. Retail investors can use this data to understand how economic growth impacts stock market trends.',
      action: () => {
        setPosition({ coordinates: [-95, 37], zoom: 4 });
        setHighlightedCountry('United States');
      },
    },
    {
      id: 'example',
      title: 'Example Insight for Investors',
      description:
        'For instance, during periods of strong GDP growth in the USA, sectors such as technology and consumer discretionary often outperform. A retail investor could use this pattern to allocate more resources to these sectors during economic expansions.',
      action: () => {
        setPosition({ coordinates: [-95, 37], zoom: 4 });
        setHighlightedCountry('United States');
      },
    },
    {
      id: 'compare-europe',
      title: 'Comparing Europe',
      description:
        'Let’s compare the European countries. Differences in GDP growth correlation highlight varied economic cycles, helping investors diversify their portfolio geographically.',
      action: () => {
        setPosition({ coordinates: [10, 50], zoom: 3 });
        setHighlightedCountry(null);
      },
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      description:
        'We have explored how different countries correlate with GDP growth. This data-driven approach enables retail investors to make informed decisions based on macroeconomic trends.',
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
        <h2>{step.title}</h2>
        <p>{step.description}</p>
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
        <div style={{ padding: '20px', textAlign: 'center', position: 'relative', top: '-20vh' }}>
          <Button variant="contained" color="primary" onClick={handleExit}>
            Exit Tour and Explore the Map
          </Button>
        </div>
      </div>
    </div>
  );
};

const appStyle = {
  display: 'flex',
  position: 'relative',
  overflow: 'hidden',
};

const mapContainerStyle = {
  position: 'sticky',
  top: '0',
  height: '100vh',
  flex: '1',
  padding: '30px',
  background: 'linear-gradient(135deg, #121212, #1c1c1c)',
  borderRadius: '20px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.8)',
};

const scrollyTellingStyle = {
  flex: '1',
  overflowY: 'auto',
  height: '100vh',
};

const stepStyle = {
  minHeight: '100vh',
  padding: '50px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  color: '#ffffff',
  backgroundColor: '#121212',
};

export default ScrollyTelling;
