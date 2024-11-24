import React, { useMemo, useCallback, useState, useEffect } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';
import * as d3 from 'd3';
import geodata from '../data/world-110m.json';
import computeCorrelation from './Correlation';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#1c1c1c',
    color: '#ffffff',
    maxWidth: 280,
    fontSize: theme.typography.pxToRem(14),
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.9)',
    padding: '12px',
    borderRadius: '8px',
    textAlign: 'center',
  },
}));

const ChoroplethMap = ({
  yearRange,
  indicator,
  onClick,
  position: externalPosition,
  setPosition: externalSetPosition,
  highlightedCountry,
  style,
}) => {
  const colorScale = useMemo(
    () => d3.scaleSequential(d3.interpolateRdYlGn).domain([-1, 1]),
    []
  );

  const [position, setPosition] = useState(
    externalPosition || { coordinates: [0, 0], zoom: 1 }
  );
  const [windowHeight, setWindowHeight] = useState(window.innerHeight - 100);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight - 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (externalPosition) {
      setPosition(externalPosition);
    }
  }, [externalPosition]);

  const setPositionWrapper = (newPosition) => {
    if (externalSetPosition) {
      externalSetPosition(newPosition);
    } else {
      setPosition(newPosition);
    }
  };

  const [localHighlightedCountry, setLocalHighlightedCountry] = useState(
    highlightedCountry || null
  );

  useEffect(() => {
    setLocalHighlightedCountry(highlightedCountry || null);
  }, [highlightedCountry]);

  const bringToFront = (element) => {
    const parent = element.parentNode;
    if (parent.lastChild !== element) {
      parent.appendChild(element);
    }
  };

  const getGeographyStyle = useCallback(
    (indicatorValue, countryName) => ({
      default: {
        fill: isNaN(indicatorValue)
          ? '#2b2b2b'
          : colorScale(indicatorValue),
        stroke: countryName === localHighlightedCountry ? '#FFD700' : '#1c1c1c',
        strokeWidth: countryName === localHighlightedCountry ? 2 : 0.5,
        // transition: 'fill 0.5s ease, stroke 0.3s ease',
        outline: 'none',
      },
      hover: {
        fill: isNaN(indicatorValue)
          ? '#4a4a4a'
          : d3.color(colorScale(indicatorValue)).brighter(0.5),
        stroke: '#ffffff',
        strokeWidth: 2,
        // transform: 'scale(1.05)', // Slightly scale the hovered country
        outline: 'none',
      },
      pressed: {
        fill: isNaN(indicatorValue)
          ? '#1c1c1c'
          : d3.color(colorScale(indicatorValue)).darker(0.5),
        stroke: '#FFD700',
        strokeWidth: 2.5,
        outline: 'none',
      },
    }),
    [colorScale, localHighlightedCountry]
  );

  const renderGeography = useCallback(
    (geo) => {
      const countryName = geo.properties.name;
      const indicatorValue = computeCorrelation(
        countryName,
        yearRange,
        'Index Price',
        indicator
      );

      return (
        <CustomTooltip
          key={geo.rsmKey}
          title={
            <React.Fragment>
              <Typography color="inherit">{countryName}</Typography>
              <b>
                {isNaN(indicatorValue)
                  ? 'No data available'
                  : `${indicatorValue.toFixed(3)}`}
              </b>
            </React.Fragment>
          }
          arrow
        >
          <Geography
            geography={geo}
            style={getGeographyStyle(indicatorValue, countryName)}
            onMouseEnter={(e) => {
              bringToFront(e.target); // Bring the country to the top
              // e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              // e.target.style.transform = 'scale(1)';
            }}
            onClick={() =>
              onClick &&
              onClick(
                countryName,
                isNaN(indicatorValue) ? 'No data' : indicatorValue.toFixed(3)
              )
            }
          />
        </CustomTooltip>
      );
    },
    [yearRange, indicator, onClick, getGeographyStyle]
  );

  const handleMoveEnd = useCallback(
    (newPosition) => {
      setPositionWrapper(newPosition);
    },
    [setPositionWrapper]
  );

  const handleReset = () => {
    setPositionWrapper({ coordinates: [0, 0], zoom: 1 });
  };

  const handleZoomIn = () => {
    if (position.zoom >= 8) return;
    setPositionWrapper({ ...position, zoom: position.zoom + 1 });
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPositionWrapper({ ...position, zoom: position.zoom - 1 });
  };

  return (
    <div
      style={{
        ...style,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #101010, #1a1a1a)',
        borderRadius: '20px',
        padding: '10px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.9)',
        overflow: 'hidden',
        margin: '20px auto',
        maxWidth: '1200px',
        animation: 'fadeIn 1s ease',
      }}
    >
      {/* Controls for zooming */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: '5px',
        }}
      >
        <button
          onClick={handleReset}
          style={{
            background: 'linear-gradient(135deg, #82aaff, #ffcc80)',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            color: '#ffffff',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
          }}
        >
          Reset Zoom
        </button>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            onClick={handleZoomIn}
            style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #2b2b2b, #3f3f3f)',
              color: '#82aaff',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #2b2b2b, #3f3f3f)',
              color: '#82aaff',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            −
          </button>
        </div>
      </div>
      <div style={{ height: `${windowHeight * 0.6}px`, width: '100%' }}>
        <ComposableMap projection="geoMercator">
          <ZoomableGroup
            center={position.coordinates}
            zoom={position.zoom}
            onMoveEnd={handleMoveEnd}
          >
            <Geographies geography={geodata}>
              {({ geographies }) => geographies.map(renderGeography)}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      {/* Updated Color Gradient Legend */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '10px',
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
          width: '100%',
          marginTop: '10px',
        }}
      >
        <svg
          viewBox="0 0 300 20"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '20px' }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="-50%" y1="0%" x2="60%" y2="0%">
              <stop offset="0%" style={{ stopColor: d3.interpolateRdYlGn(-1), stopOpacity: 1 }} />
              <stop offset="35%" style={{ stopColor: d3.interpolateRdYlGn(-0.5), stopOpacity: 1 }} />
              <stop offset="75%" style={{ stopColor: d3.interpolateRdYlGn(0), stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: d3.interpolateRdYlGn(1), stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="300" height="20" fill="url(#colorGradient)" />
        </svg>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            color: '#e0e0e0',
            fontSize: '0.9rem',
            marginTop: '10px',
            position: 'relative',
          }}
        >
          <span style={{ position: 'absolute', left: '0'}}>-1</span>
          <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>0</span>
          <span style={{ position: 'absolute', right: '0' }}>1</span>
        </div>
      </div>
    </div>
  );
};

export default ChoroplethMap;
