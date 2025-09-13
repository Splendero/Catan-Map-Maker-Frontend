import React from 'react';
import './HexTile.css';

const HexTile = ({ 
  terrain, 
  number, 
  size = 'small'
}) => {
  const getTerrainImagePath = (terrainType) => {
    return `/image/hexs/${terrainType}.svg`;
  };

  const getNumberImagePath = (num) => {
    return `/image/numberss/${num}.svg`;
  };

  const getSizeClass = (size) => {
    const sizeMap = {
      'small': 'hex-small',
    };
    return sizeMap[size] || 'hex-medium';
  };

  return (
    <div className={`hex-tile ${getSizeClass(size)}`}>
      <div className="hex-container">
        {/* Terrain SVG */}
        <div className="terrain-layer">
          <img 
            src={getTerrainImagePath(terrain)} 
            alt={`${terrain} terrain`}
            className="terrain-svg"
          />
        </div>
        
        {number && (
          <div className="number-layer">
            <img 
              src={getNumberImagePath(number)} 
              alt={`Number ${number}`}
              className="number-svg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HexTile;
