# Catan Map Maker Frontend

A React frontend application for displaying and customizing Catan-style hexagonal maps. This serves as the foundation for a full-stack application that can be dockerized or deployed as separate web apps on Render.

## Features

- **Hexagonal Map Display**: Visual representation of Catan-style maps with 19 hexagonal tiles
- **Interactive Tiles**: Click on tiles to select them
- **Map Randomization**: Generate random maps with customizable settings
- **Resource Distribution**: Toggle for balanced resource placement
- **Number Placement**: Toggle for balanced number token placement
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
src/
├── components/
│   ├── HexTile.js          # Individual hexagonal tile component
│   ├── HexTile.css         # Styling for hex tiles
│   ├── MapBoard.js         # Main map display component
│   ├── MapBoard.css        # Styling for map board
│   ├── MapControls.js      # Control panel component
│   └── MapControls.css     # Styling for controls
├── App.js                  # Main application component
├── App.css                 # Main application styling
├── index.js                # Application entry point
└── index.css               # Global styles
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Usage

1. **View the Map**: The application displays a hexagonal map with 19 tiles
2. **Randomize**: Click the "Randomize Map" button to generate a new random map
3. **Customize**: Use the checkboxes to toggle resource distribution and number placement
4. **Interact**: Click on individual hex tiles to select them

## Terrain Types

- **Desert**: Light beige (no number token)
- **Hills**: Brown (brick resource)
- **Mountains**: Gray (ore resource)
- **Fields**: Yellow-green (wheat resource)
- **Pasture**: Light green (sheep resource)
- **Forest**: Dark green (wood resource)

## Number Tokens

- Red numbers (6, 8): High probability of rolling
- Black numbers: Standard probability
- Desert tiles have no number tokens

## Future Enhancements

This frontend is designed to be easily integrated with a backend API. Potential future features:

- Save/load maps
- User authentication
- Map sharing
- Advanced map generation algorithms
- Port and settlement placement
- Multiplayer support

## Deployment

This application is ready for deployment on platforms like:

- **Render**: Deploy as a static site
- **Docker**: Containerize the application
- **Vercel/Netlify**: Deploy with zero configuration

## Technology Stack

- React 18
- CSS3 with modern features
- Responsive design principles
- Component-based architecture

## License

This project is open source and available under the MIT License.
