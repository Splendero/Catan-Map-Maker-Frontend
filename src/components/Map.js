import React from 'react';
import HexTile from './HexTile';
import './Map.css';
import { useState, useEffect, useRef } from 'react';

const HexMap = ({ tiles = [] }) => {
  // Add state to track window dimensions
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Add resize event listener
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Get the actual hex size from CSS
  const getHexSize = () => {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    // Get the computed values
    const hexWidth = computedStyle.getPropertyValue('--hex-size-small-height');
    const hexHeight = computedStyle.getPropertyValue('--hex-size-small-height');
    const ratio = computedStyle.getPropertyValue('--width-height-ratio');
    
    // Convert to numbers (remove 'vw' and 'vh')
    const ratioNum = parseFloat(ratio);
    const widthVw = parseFloat(hexWidth) * ratioNum;
    const heightVh = parseFloat(hexHeight);
    
    
    return {
      widthVw: widthVw,
      heightVh: heightVh,
      widthPx: (window.innerHeight * widthVw) / 100,
      heightPx: (window.innerHeight * heightVh) / 100
    };
  };

  // Calculate viewport-based positions using live hex size
  const getViewportPosition = (xOffset, yOffset) => {
    const xCenter = window.innerWidth * 0.5;
    const yCenter = window.innerHeight * 0.5;
    const hexSize = getHexSize();
        
    // Use the actual hex size for spacing
    const x = xCenter + (xOffset * hexSize.widthPx);
    const y = yCenter + (yOffset * hexSize.heightPx);

    return {
      x: x + 'px',
      y: y + 'px'
    };
  };

  // Dictionary mapping each coordinate to viewport-based positions
  const coordinatePositions = {
    // Row 1 (top) - using hex size units
    '0,-2,2': getViewportPosition(-1, -1.48),    // Center top
    '1,-2,1': getViewportPosition(0, -1.48),     // Right top
    '2,-2,0': getViewportPosition(1, -1.48),   // Far right top
    
    // Row 2
    '-1,-1,2': getViewportPosition(-1.5, -0.74),  // Left
    '0,-1,1': getViewportPosition(-0.5, -0.74),   // Center-left
    '1,-1,0': getViewportPosition(0.5, -0.74),  // Center-right
    '2,-1,-1': getViewportPosition(1.5, -0.74), // Right
    
    // Row 3 (middle)
    '-2,0,2': getViewportPosition(-2, 0),       // Far left
    '-1,0,1': getViewportPosition(-1, 0),   // Left
    '0,0,0': getViewportPosition(0, 0),     // Center (desert)
    '1,0,-1': getViewportPosition(1, 0),  // Right
    '2,0,-2': getViewportPosition(2, 0),     // Far right
    
    // Row 4
    '-2,1,1': getViewportPosition(-1.5, 0.74),  // Left
    '-1,1,0': getViewportPosition(-0.5, 0.74),  // Center-left
    '0,1,-1': getViewportPosition(0.5, 0.74), // Center-right
    '1,1,-2': getViewportPosition(1.5, 0.74), // Right
    
    // Row 5 (bottom)
    '-2,2,0': getViewportPosition(-1, 1.48),   // Far left bottom
    '-1,2,-1': getViewportPosition(0, 1.48),   // Left bottom
    '0,2,-2': getViewportPosition(1, 1.48)   // Center bottom
  };

  // Standard Catan map coordinates
  const standardCatanCoords = [
    [0, -2, 2], [1, -2, 1], [2, -2, 0],
    [-1, -1, 2], [0, -1, 1], [1, -1, 0], [2, -1, -1],
    [-2, 0, 2], [-1, 0, 1], [0, 0, 0], [1, 0, -1], [2, 0, -2],
    [-2, 1, 1], [-1, 1, 0], [0, 1, -1], [1, 1, -2],
    [-2, 2, 0], [-1, 2, -1], [0, 2, -2]
  ];

  // Create a map of coordinates to tiles for quick lookup
  const tileMap = new Map();
  tiles.forEach(tile => {
    const key = `${tile.q},${tile.r},${tile.s}`;
    tileMap.set(key, tile);
  });

  // Generate all hex positions for the standard Catan map
  const hexPositions = standardCatanCoords.map(([q, r, s]) => {
    const coordKey = `${q},${r},${s}`;
    const position = coordinatePositions[coordKey];
    const tile = tileMap.get(coordKey) || { q, r, s, terrain: 'desert', number: null };
    
    return {
      ...tile,
      pixelX: position.x,
      pixelY: position.y
    };
  });

  return (
    <>
      {hexPositions.map((tile) => (
        <div
          key={`${tile.q}-${tile.r}-${tile.s}`}
          style={{
            position: 'fixed',
            left: tile.pixelX,
            top: tile.pixelY,
            transform: 'translate(-50%, -50%)',
            zIndex: 1
          }}
        >
          <HexTile
            terrain={tile.terrain}
            number={tile.number}
            size="small"
          />
        </div>
      ))}
    </>
  );
};

export default HexMap;
