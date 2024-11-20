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
  const getGeographyStyle = useCallback(
    (indicatorValue) => ({
      default: {
        fill: isNaN(indicatorValue) ? '#d3d3d3' : colorScale(indicatorValue),
        outline: 'none',
        stroke: '#000000',
        strokeWidth: 0.5,
      },
      hover: {
        fill: isNaN(indicatorValue) ? '#d3d3d3' : colorScale(indicatorValue),
        fillOpacity: 0.7,
        outline: 'none',
        stroke: '#000000',
        strokeWidth: 0.5,
      },
      pressed: {
        fill: isNaN(indicatorValue) ? '#d3d3d3' : colorScale(indicatorValue),
        outline: 'none',
        stroke: '#000000',
        strokeWidth: 0.5,
      },
    }),
    [colorScale]
  );

  // Memoize the renderGeography function
  const renderGeography = useCallback(
    (geo) => {
      const countryName = geo.properties.name;
      const indicatorValue = computeCorrelation(countryName, yearRange, 'Stock Price', indicator);

      return (
        <Geography
          key={geo.rsmKey}
          geography={geo}
          style={getGeographyStyle(indicatorValue)}
          onClick={() => onClick && onClick(countryName)}
          data-tooltip-id="map"
          data-tooltip-content={`${countryName}: ${indicatorValue}`}
        />
      );
    },
    [yearRange, indicator, onClick, getGeographyStyle]
  );

  // State for managing zoom and center position
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  // Callback to handle movement (zoom and pan)
  const handleMoveEnd = useCallback((newPosition) => {
    setPosition(newPosition);
  }, []);

  // Optional: Reset zoom to default
  const handleReset = () => {
    setPosition({ coordinates: [0, 0], zoom: 1 });
  };

  return (
    <div style={{ position: 'relative', textAlign: 'center', ...style }}>
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
          padding: '5px 10px',
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: '3px',
          cursor: 'pointer',
        }}
      >
        Reset Zoom
      </button>
      {/* Legend */}
      <div style={{ position: 'absolute', bottom: '0px', right: '20px', width: '30%', height: 'auto' }}>
        <svg viewBox="0 0 100 20" preserveAspectRatio="xMinYMin meet" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <linearGradient id="colorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: d3.interpolateRdYlGn(-1), stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: d3.interpolateRdYlGn(1), stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <rect width="100" height="10" fill="url(#colorGradient)" />
          <text x="0" y="15" fontSize="5">-1</text>
          <text x="95" y="15" fontSize="5">1</text>
        </svg>
      </div>
      <Tooltip id="map" />
    </div>
  );
};

export default ChoroplethMap;