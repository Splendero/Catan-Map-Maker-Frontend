import React from 'react';
import './Sidebar.css';

const Sidebar = ({ onFeatureClick, selectedFeatures = new Set(), loading = false, error = null }) => {
  const features = [
    { id: 'eightSix', label: 'No touching of 8,6', icon: '🚫' },
    { id: 'twoTwelve', label: 'No touching of 2, 12', icon: '🚫' },
    { id: 'noResources', label: 'No same resources touching', icon: '🚫' },
    { id: 'noTwoNumber', label: 'No two of the same number touching', icon: '🚫' },
  ];

  const handleFeatureClick = (featureId) => {
    if (onFeatureClick) {
      onFeatureClick(featureId);
    }
  };

  const handleGenerateClick = () => {
    if (onFeatureClick) {
      onFeatureClick('generate');
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Catan Map Maker</h1>
        <p className="sidebar-subtitle">Create your perfect Settlers of Catan board</p>
      </div>
      
      <div className="sidebar-content">
        {/* Show error message if there's an error */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span className="error-text">{error}</span>
          </div>
        )}
        
        <div className="feature-buttons">
          {features.map((feature) => {
            const isSelected = selectedFeatures.has(feature.id);
            return (
              <button
                key={feature.id}
                className={`feature-button ${isSelected ? 'selected' : ''}`}
                onClick={() => handleFeatureClick(feature.id)}
                title={feature.label}
              >
                <span className="feature-icon">{feature.icon}</span>
                <span className="feature-label">{feature.label}</span>
                {isSelected && <span className="selected-indicator">✓</span>}
              </button>
            );
          })}
        </div>
        
        <div className="sidebar-info">
          <h3>Map Info</h3>
          <div className="info-item">
            <span className="info-label">Tiles:</span>
            <span className="info-value">19</span>
          </div>
          <div className="info-item">
            <span className="info-label">Terrain Types:</span>
            <span className="info-value">6</span>
          </div>
          <div className="info-item">
            <span className="info-label">Selected:</span>
            <span className="info-value">{selectedFeatures.size}</span>
          </div>
        </div>

        <div className="generate-section">
          <button 
            className={`generate-button ${loading ? 'loading' : ''}`}
            onClick={handleGenerateClick}
            disabled={loading}
          >
            <span className="generate-icon">
              {loading ? '⏳' : '🎲'}
            </span>
            <span className="generate-text">
              {loading ? 'Generating...' : 'Generate Map'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
