# US Currency Serial Number Patterns Guide

A comprehensive interactive web application for identifying, understanding, and valuing US currency based on serial number patterns.

## Features

- **Pattern Search & Filtering**: Full-text search across pattern names, descriptions, and characteristics with multi-criteria filtering
- **Serial Number Checker**: Pattern recognition algorithm to identify valuable patterns and estimate value
- **Interactive Visualizations**: Value comparison charts, rarity distribution, and pattern relationship diagrams
- **Comprehensive Guide**: Educational content on pattern types, value factors, and collecting strategies
- **Responsive Design**: Optimized for all device sizes from smartphones to desktops

## Tech Stack

- **React**: Frontend framework
- **Material UI**: Component library
- **Chart.js**: Data visualizations
- **Firebase**: Hosting and deployment

## Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Firebase Deployment

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```

3. **Initialize Firebase project** (if not already initialized):
   ```bash
   firebase init
   ```
   - Select "Hosting"
   - Select or create your Firebase project
   - Use "build" as your public directory
   - Configure as a single-page app

4. **Deploy to Firebase:**
   ```bash
   npm run build
   firebase deploy
   ```

## Project Structure

- `/src/components`: React components organized by feature
- `/src/context`: Context API for global state management
- `/src/data`: Data files with pattern information
- `/src/pages`: Page components for different routes
- `/src/theme`: Theme configuration for Material UI
- `/src/utils`: Utility functions including serial number analysis

## Performance Optimization

- Lazy loading of components for code splitting
- Responsive images and optimized assets
- Caching headers for static assets
- React memo and useMemo for component optimization

## Browser Compatibility

Tested and supported on:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome for Android)

## License

MIT