import React from 'react';
import Map from './components/Map';
import './App.css';

const App = () => {
  // Sample tiles data for the Catan map
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
    { q: 0, r: 0, s: 0, terrain: 'desert', number: null }, // Desert tile
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

  return (
    <div className="app">
      <Map tiles={sampleTiles} />
    </div>
  );
};

export default App;