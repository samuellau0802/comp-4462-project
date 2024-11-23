// ChoroplethMap.js

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
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(20),
    border: '1px solid #dadde9',
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

  // Internal state management for position
  const [position, setPosition] = useState(
    externalPosition || { coordinates: [0, 0], zoom: 1 }
  );

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

  const getGeographyStyle = useCallback(
    (indicatorValue, countryName) => {
      const isHighlighted = countryName === localHighlightedCountry;
      return {
        default: {
          fill: isNaN(indicatorValue)
            ? '#2b2b2b'
            : colorScale(indicatorValue),
          outline: 'none',
          stroke: isHighlighted ? '#FFD700' : '#1f1f1f',
          strokeWidth: isHighlighted ? 2 : 0.5,
        },
        hover: {
          fill: isNaN(indicatorValue)
            ? '#4a4a4a'
            : colorScale(indicatorValue),
          fillOpacity: 0.9,
          outline: 'none',
          stroke: '#ffffff',
          strokeWidth: 1,
        },
        pressed: {
          fill: isNaN(indicatorValue)
            ? '#4a4a4a'
            : colorScale(indicatorValue),
          outline: 'none',
          stroke: '#ffffff',
          strokeWidth: 1,
        },
      };
    },
    [colorScale, localHighlightedCountry]
  );

  const renderGeography = useCallback(
    (geo) => {
      const countryName = geo.properties.name;
      const indicatorValue = computeCorrelation(
        countryName,
        yearRange,
        'Stock Price',
        indicator
      );

      return (
        <CustomTooltip
          key={geo.rsmKey}
          title={
            <React.Fragment>
              <Typography color="inherit">{countryName}</Typography>
              <b>{isNaN(indicatorValue) ? 'N/A' : indicatorValue.toFixed(3)}</b>
            </React.Fragment>
          }
          arrow
        >
          <Geography
            geography={geo}
            style={getGeographyStyle(indicatorValue, countryName)}
            onClick={() =>
              onClick &&
              onClick(
                countryName,
                isNaN(indicatorValue) ? 'N/A' : indicatorValue.toFixed(3)
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
    if (position.zoom >= 7.1) return;
    setPositionWrapper({ ...position, zoom: position.zoom + 1 });
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1.9) return;
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
        background: 'linear-gradient(135deg, #121212, #1c1c1c)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.8)',
        overflow: 'hidden',
        margin: '20px auto',
        maxWidth: '1200px',
      }}
    >
      {/* Map controls (Zoom In, Zoom Out, Reset) */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
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
            e.target.style.boxShadow =
              '0 8px 24px rgba(130, 170, 255, 0.6)';
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

      {/* Map visualization */}
      <div
        style={{
          width: '100%',
          height: `${windowHeight * 0.5}px`,
          marginBottom: '20px',
        }}
      >
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

      {/* Color Gradient Legend */}
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
            <linearGradient
              id="colorGradient"
              x1="-50%"
              y1="0%"
              x2="60%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{
                  stopColor: d3.interpolateRdYlGn(-1),
                  stopOpacity: 1,
                }}
              />
              <stop
                offset="35%"
                style={{
                  stopColor: d3.interpolateRdYlGn(-0.5),
                  stopOpacity: 1,
                }}
              />
              <stop
                offset="75%"
                style={{
                  stopColor: d3.interpolateRdYlGn(0),
                  stopOpacity: 1,
                }}
              />
              <stop
                offset="100%"
                style={{
                  stopColor: d3.interpolateRdYlGn(1),
                  stopOpacity: 1,
                }}
              />
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
          <span style={{ position: 'absolute', left: '0' }}>-1</span>
          <span
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            0
          </span>
          <span style={{ position: 'absolute', right: '0' }}>1</span>
        </div>
      </div>
    </div>
  );
};

export default ChoroplethMap;
