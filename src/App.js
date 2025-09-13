import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import './App.css';

const App = () => {
  // Start with empty tiles array - will be populated from backend
  const [tiles, setTiles] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial map data on component mount
  useEffect(() => {
    const fetchInitialMap = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:5000/generate-constrained', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            constraints: []
          })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const mapData = await response.json();
        setTiles(mapData.tiles);
        setError(null);
      } catch (error) {
        console.error('Error fetching initial map:', error);
        setError('Failed to load initial map');
        // Fallback to sample data if backend fails
        const sampleTiles = [
          { q: 0, r: -2, s: 2, terrain: 'forest', number: 4 },
          { q: 1, r: -2, s: 1, terrain: 'hill', number: 11 },
          { q: 2, r: -2, s: 0, terrain: 'mountain', number: 9 },
          { q: -1, r: -1, s: 2, terrain: 'field', number: 3 },
          { q: 0, r: -1, s: 1, terrain: 'pasture', number: 6 },
          { q: 1, r: -1, s: 0, terrain: 'forest', number: 8 },
          { q: 2, r: -1, s: -1, terrain: 'hill', number: 10 },
          { q: -2, r: 0, s: 2, terrain: 'mountain', number: 5 },
          { q: -1, r: 0, s: 1, terrain: 'field', number: 2 },
          { q: 0, r: 0, s: 0, terrain: 'desert', number: null },
          { q: 1, r: 0, s: -1, terrain: 'pasture', number: 12 },
          { q: 2, r: 0, s: -2, terrain: 'forest', number: 9 },
          { q: -2, r: 1, s: 1, terrain: 'hill', number: 3 },
          { q: -1, r: 1, s: 0, terrain: 'mountain', number: 8 },
          { q: 0, r: 1, s: -1, terrain: 'field', number: 4 },
          { q: 1, r: 1, s: -2, terrain: 'pasture', number: 5 },
          { q: -2, r: 2, s: 0, terrain: 'forest', number: 6 },
          { q: -1, r: 2, s: -1, terrain: 'hill', number: 10 },
          { q: 0, r: 2, s: -2, terrain: 'mountain', number: 11 }
        ];
        setTiles(sampleTiles);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialMap();
  }, []); // Empty dependency array means this runs once on mount

  const handleFeatureClick = async (featureId) => {
    if (featureId === 'generate') {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:5000/generate-constrained', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            constraints: Array.from(selectedFeatures)
          })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const mapData = await response.json();
        setTiles(mapData.tiles);
        setError(null);
        console.log('Generated new map with constraints:', Array.from(selectedFeatures));
      } catch (error) {
        console.error('Error generating map:', error);
        setError('Failed to generate new map');
      } finally {
        setLoading(false);
      }
      return;
    }

    setSelectedFeatures(prev => {
      const newSet = new Set(prev);
      if (newSet.has(featureId)) {
        newSet.delete(featureId);
      } else {
        newSet.add(featureId);
      }
      return newSet;
    });

    // Handle feature-specific actions
    switch (featureId) {
      case 'eightSix':
        console.log('No touching of 8,6 constraint toggled');
        break;
      case 'twoTwelve':
        console.log('No touching of 2,12 constraint toggled');
        break;
      case 'noResources':
        console.log('No same resources touching constraint toggled');
        break;
      case 'noTwoNumber':
        console.log('No two of the same number touching constraint toggled');
        break;
      default:
        console.log(`Feature ${featureId} toggled`);
    }
  };

  // Show loading state while fetching initial data
  if (loading && tiles.length === 0) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner">Loading map...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Sidebar 
        onFeatureClick={handleFeatureClick}
        selectedFeatures={selectedFeatures}
        loading={loading}
        error={error}
      />
      <div className="main-content">
        <Map tiles={tiles} />
      </div>
    </div>
  );
};

export default App;