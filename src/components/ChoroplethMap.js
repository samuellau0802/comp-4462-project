import React, { useMemo, useCallback, useState } from 'react';
import { ComposableMap, ZoomableGroup, Geographies, Geography } from 'react-simple-maps';
import * as d3 from 'd3';
import { Tooltip } from 'react-tooltip';
import geodata from '../data/world-110m.json';
import computeCorrelation from './Correlation';

const ChoroplethMap = ({ yearRange, indicator, onClick, style }) => {
  // Memoize the color scale
  const colorScale = useMemo(() => d3.scaleSequential(d3.interpolateRdYlGn).domain([-1, 1]), []);

  // Extract styles into a function
  const getGeographyStyle = useCallback((indicatorValue) => ({
    default: {
      fill: isNaN(indicatorValue) ? "#4a4a4a" : colorScale(indicatorValue), // Dark gray for no data
      outline: 'none',
      stroke: '#1e1e1f', // Subtle border
      strokeWidth: 0.3,
    },
    hover: {
      fill: isNaN(indicatorValue) ? "#6a6a6a" : colorScale(indicatorValue),
      fillOpacity: 0.8,
      outline: 'none',
      stroke: '#ffffff', // Highlight border on hover
      strokeWidth: 0.5,
    },
    pressed: {
      fill: isNaN(indicatorValue) ? "#6a6a6a" : colorScale(indicatorValue),
      outline: 'none',
      stroke: '#ffffff',
      strokeWidth: 0.5,
    },
  }), [colorScale]);

  // Memoize the renderGeography function
  const renderGeography = useCallback((geo) => {
    const countryName = geo.properties.name;
    const indicatorValue = computeCorrelation(countryName, yearRange, "Stock Price", indicator);

    return (
      <Geography
        key={geo.rsmKey}
        geography={geo}
        style={getGeographyStyle(indicatorValue)}
        onClick={() => onClick && onClick(countryName, indicatorValue.toFixed(3))}
        data-tooltip-id="map"
        data-tooltip-content={`${countryName}: ${indicatorValue.toFixed(3)}`}
      />
    );
  }, [yearRange, indicator, onClick, getGeographyStyle]);

  // State for managing zoom and center position
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  // Callback to handle movement (zoom and pan)
  const handleMoveEnd = useCallback((newPosition) => {
    setPosition(newPosition);
  }, []);

  // Function to reset zoom and center
  const handleReset = () => {
    setPosition({ coordinates: [0, 0], zoom: 1 });
  };
  function handleZoomIn() {
    if (position.zoom >= 7.1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom + 1 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1.9) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom - 1 }));
  }

  return (
    <div style={{ position: 'relative', textAlign: 'center', backgroundColor: '#121212', padding: '20px', borderRadius: '8px', ...style }}>
      <ComposableMap projection="geoMercator">
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          onMoveEnd={handleMoveEnd}
          maxZoom={8}
          minZoom={1}
        >
          <Geographies geography={geodata}>
            {({ geographies }) => geographies.map(renderGeography)}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Reset Zoom Button */}
      <button
        onClick={handleReset}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '8px 12px',
          backgroundColor: '#1d1d1f',
          color: '#e0e0e0',
          border: '1px solid #3a3a3b',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#82aaff';
          e.target.style.color = '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#1d1d1f';
          e.target.style.color = '#e0e0e0';
        }}
      >
        Reset Zoom
      </button>

      <div className="controls" style={{ position: 'absolute', top: '10px', right: '20px', height: 'auto' }}>
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Legend */}
      <div style={{ position: 'absolute', bottom: '10px', right: '20px', width: '30%', height: 'auto' }}>
        <svg viewBox="0 0 100 20" preserveAspectRatio="xMinYMin meet" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <linearGradient id="colorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: d3.interpolateRdYlGn(-1), stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: d3.interpolateRdYlGn(1), stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <rect width="100" height="10" fill="url(#colorGradient)" />
          <text x="0" y="15" fontSize="5" fill="#e0e0e0">-1</text>
          <text x="95" y="15" fontSize="5" fill="#e0e0e0">1</text>
        </svg>
      </div>

      {/* Tooltip */}
      <Tooltip id="map" style={{ backgroundColor: '#1d1d1f', color: '#e0e0e0', border: '1px solid #3a3a3b', borderRadius: '5px', padding: '5px' }} />
    </div>
  );
};

export default ChoroplethMap;
