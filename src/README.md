# Project Structure

## Overview
This project follows a well-organized folder structure for maintainability and scalability.

## Folder Structure

```
src/
├── components/           # Reusable React components
│   ├── charts/          # Data visualization components
│   │   ├── InternetUsageChart.jsx
│   │   ├── FourGCoverageChart.jsx
│   │   ├── DigitalSkillsRadar.jsx
│   │   ├── CybersecurityScatterPlot.jsx
│   │   └── index.js     # Chart exports
│   ├── layout/          # Layout components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── index.js     # Layout exports
│   ├── ui/              # UI utility components
│   │   ├── LoadingSpinner.jsx
│   │   ├── ErrorMessage.jsx
│   │   └── index.js     # UI exports
│   └── index.js         # Main component exports
├── data/                # Data files and utilities
│   ├── SPC_Tech_Connectivity_2025.csv  # Pacific data
│   ├── dataUtils.js     # Data processing utilities
│   ├── constants.js     # Project constants
│   └── index.js         # Data exports
├── assets/              # Static assets
└── styles/              # Additional styles (if needed)
```

## Component Categories

### Charts (`/components/charts/`)
- **InternetUsageChart**: Line chart for internet adoption trends
- **FourGCoverageChart**: Bar chart for mobile coverage comparison
- **DigitalSkillsRadar**: Radar chart for digital literacy
- **CybersecurityScatterPlot**: Scatter plot for cybersecurity vs penetration

### Layout (`/components/layout/`)
- **Header**: Main application header with title and description
- **Footer**: Footer with project attribution

### UI (`/components/ui/`)
- **LoadingSpinner**: Reusable loading indicator
- **ErrorMessage**: Error state component

### Data (`/data/`)
- **SPC_Tech_Connectivity_2025.csv**: Pacific connectivity dataset
- **dataUtils.js**: Data processing and transformation utilities
- **constants.js**: Pacific countries, indicators, and color schemes

## Usage

Import components using the barrel exports:

```javascript
import { InternetUsageChart, FourGCoverageChart } from './components/charts';
import { Header, Footer } from './components/layout';
import { LoadingSpinner, ErrorMessage } from './components/ui';
import { PACIFIC_COUNTRIES, INDICATORS } from './data';
```