# COMP 4462 Project
This project is a web application that visualizes macro-economic indicators using a choropleth map and line charts. The application allows users to select year ranges and indicators to explore data interactively.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/samuellau0802/comp-4462-project.git
   cd COMP-4462-project
   ```

2. Install dependencies:
   ```bash
   npm install
   npm install @mui/icons-material

   ```

3. Start the development server:
   ```bash
   npm start
   ```

Visit `http://localhost:3000` in your browser to view the application.

## Deploy to github pages
To deploy to github pages, please run the following command,
```bash
npm run deploy -- -m "Deploy React app to GitHub Pages"
```


## File structure

```plaintext
COMP-462-PROJECT/
│
├── node_modules/            # Contains all the npm dependencies for the project.
│
├── public/                  # Publicly accessible files.
│
├── src/                     # Source code for the React application.
│   ├── components/          # React components for reusable UI elements.
│   │   ├── ChoroplethMap.js # Component for rendering the choropleth map.
│   │   ├── LineChart.js     # Component for rendering line charts.
│   │   ├── YearRangeSlider.js# Component for the year range slider.
│   │   └── ...              # Other components can be added here.
│   │
│   ├── data/                # Contains JSON data files used in the application.
│   │   ├── Combined_Data_2008_2023.json # JSON file containing country-specific economic data.
│   │   └── world-110m.json     # JSON file containing countries geometric data. From https://unpkg.com/browse/world-atlas@2.0.2/countries-110m.json
│   │
│   ├── App.css              # CSS styles for the main App component.
│   ├── App.js               # Main application component that renders the UI.
│   ├── index.js             # Entry point for the React application.
│   ├── reportWebVitals.js   # Utility for measuring performance in the app.
│   ├── setupTests.js        # Setup for testing utilities.
│   ├── package.json         # Project metadata and dependencies.
│   ├── package-lock.json    # Locked versions of project dependencies.
│   └── .gitignore           # Specifies files and directories to ignore in Git.
│
└── README.md                # This README file.
```

## Overview of Key Files and Directories

- **node_modules/**: Contains all the dependencies installed via npm. It is generated automatically and should not be modified directly.

- **public/**: This directory holds static files such as `index.html` and images. The files in this folder are served directly by the web server.

- **src/**: This is where the source code of the application resides.
  - **components/**: This folder contains React components used throughout the application. Each component is responsible for a specific piece of functionality or UI.
  - **data/**: This folder includes JSON files that store data used by the application for visualization and other purposes.

- **App.js**: The main component that combines all other components and manages the application state.

- **index.js**: The entry point of the React application, where the root component is rendered into the DOM.

- **App.css**: Contains styles for the main application component.

- **package.json**: Contains metadata about the project, including dependencies and scripts.

