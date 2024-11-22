import React, { useMemo, useCallback, useState } from 'react';
import { ComposableMap, ZoomableGroup, Geographies, Geography } from 'react-simple-maps';
import * as d3 from 'd3';
import { Tooltip } from 'react-tooltip';
import geodata from '../data/world-110m.json';
import computeCorrelation from './Correlation';

const ChoroplethMap = ({ yearRange, indicator, onClick, style }) => {
  const colorScale = useMemo(() => d3.scaleSequential(d3.interpolateRdYlGn).domain([-1, 1]), []);

  const getGeographyStyle = useCallback(
    (indicatorValue) => ({
      default: {
        fill: isNaN(indicatorValue) ? '#2b2b2b' : colorScale(indicatorValue),
        outline: 'none',
        stroke: '#1f1f1f',
        strokeWidth: 0.5,
      },
      hover: {
        fill: isNaN(indicatorValue) ? '#4a4a4a' : colorScale(indicatorValue),
        fillOpacity: 0.9,
        outline: 'none',
        stroke: '#ffffff',
        strokeWidth: 1,
      },
      pressed: {
        fill: isNaN(indicatorValue) ? '#4a4a4a' : colorScale(indicatorValue),
        outline: 'none',
        stroke: '#ffffff',
        strokeWidth: 1,
      },
    }),
    [colorScale]
  );

  const renderGeography = useCallback(
    (geo) => {
      const countryName = geo.properties.name;
      const indicatorValue = computeCorrelation(countryName, yearRange, 'Stock Price', indicator);

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
    },
    [yearRange, indicator, onClick, getGeographyStyle]
  );

  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  const handleMoveEnd = useCallback((newPosition) => {
    setPosition(newPosition);
  }, []);

  const handleReset = () => {
    setPosition({ coordinates: [0, 0], zoom: 1 });
  };

  const handleZoomIn = () => {
    if (position.zoom >= 7.1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom + 1 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1.9) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom - 1 }));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #121212, #1c1c1c)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.8)',
        overflow: 'hidden',
        margin: '20px auto',
        maxWidth: '1200px',
      }}
    >
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button
          onClick={handleReset}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #82aaff, #bb86fc)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.boxShadow = '0 8px 24px rgba(130, 170, 255, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
          }}
        >
          Reset Zoom
        </button>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleZoomIn}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#2b2b2b',
              color: '#82aaff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#82aaff';
              e.target.style.color = '#ffffff';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#2b2b2b';
              e.target.style.color = '#82aaff';
              e.target.style.transform = 'scale(1)';
            }}
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#2b2b2b',
              color: '#82aaff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#82aaff';
              e.target.style.color = '#ffffff';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#2b2b2b';
              e.target.style.color = '#82aaff';
              e.target.style.transform = 'scale(1)';
            }}
          >
            -
          </button>
        </div>
      </div>

      <div style={{ width: '100%', height: '600px', marginBottom: '20px' }}>
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
      </div>

      {/* Reverted Color Gradient Legend */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '10px',
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
          width: '80%',
          marginTop: '10px',
        }}
      >
        <svg viewBox="0 0 300 10" preserveAspectRatio="xMinYMin meet" style={{ width: '100%', height: '20px' }}>
          <defs>
            <linearGradient id="colorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: d3.interpolateRdYlGn(-1), stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: d3.interpolateRdYlGn(0), stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: d3.interpolateRdYlGn(1), stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <rect width="300" height="20" fill="url(#colorGradient)" />
        </svg>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            color: '#e0e0e0',
            fontSize: '0.9rem',
            marginTop: '5px',
          }}
        >
          <span>-1</span>
          <span>0</span>
          <span>1</span>
        </div>
      </div>

      <Tooltip
        id="map"
        style={{
          backgroundColor: '#1c1c1c',
          color: '#e0e0e0',
          border: '1px solid #82aaff',
          borderRadius: '8px',
          padding: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
        }}
      />
    </div>
  );
};

export default ChoroplethMap;
