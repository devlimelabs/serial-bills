# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML/CSS/JavaScript website called "US Currency Serial Number Patterns Guide" that provides a comprehensive resource for currency collectors to identify and value bills based on their serial number patterns. The site features:

- Interactive search and filtering of 19 distinct serial number patterns
- Pattern identification tool with value estimation
- Interactive data visualizations using Chart.js
- Responsive design for all device sizes

## Repository Structure

- `index.html` - Main HTML structure 
- `styles.css` - Main stylesheet
- `mobile-fixes.css` - Mobile-specific style overrides
- `main.js` - Core application logic
- `data.js` - JSON data structure with pattern information
- `charts.js` - Chart.js visualizations
- `icons.js` - SVG icon handling
- `*.svg` files - Pattern-specific SVG icons
- `guide_content.md` - Comprehensive guide content
- `categorized_patterns.md` - Pattern categorization documentation
- `research_notes.md` - Research findings and sources

## Development Workflow

### Running the Project

This is a static HTML site. To view it locally:

```bash
# If you have Python installed
python -m http.server

# If you have Node.js installed
npx serve

# Alternative: Simply open index.html in a browser
open index.html
```

### Project Structure

The application follows a modular JavaScript architecture:

1. `main.js` contains the core functionality:
   - `initApp()` - Main initialization function
   - Pattern filtering and display logic
   - UI interaction handlers
   - Serial number analysis

2. `data.js` contains structured JSON data:
   - Pattern definitions with IDs, tiers, descriptions, examples
   - Value ranges and rarity information
   - Search terms for filtering

3. `charts.js` handles data visualizations:
   - Value comparison chart 
   - Rarity distribution chart
   - Tier distribution chart

### Key Features

1. **Pattern Search & Filtering**
   - Full-text search across pattern names, descriptions, examples
   - Multi-criteria filtering by value, rarity, and pattern type
   - Visual card display with expandable details

2. **Serial Number Checker**
   - Pattern recognition algorithm to identify valuable patterns
   - Value estimation based on condition, denomination, and pattern type
   - Detailed breakdown of value factors

3. **Interactive Visualizations**
   - Value comparison charts across pattern types
   - Rarity distribution visualization
   - Pattern relationship diagram
   - Value tier breakdown

## Architecture Notes

- The application uses vanilla JavaScript without frameworks
- Data is stored in a structured JavaScript object (`serialNumberPatterns`) in `data.js`
- Chart.js is used for all data visualizations
- The site is fully responsive with custom mobile optimizations

## How the Application Works

1. On page load, `initApp()` is called which:
   - Loads pattern data from `data.js`
   - Initializes UI components
   - Sets up event listeners
   - Populates initial content

2. When users search or filter:
   - `filterPatterns()` is called with criteria
   - Results are stored in `filteredPatterns` array
   - `updatePatternsDisplay()` refreshes the UI

3. For serial number checking:
   - Input is validated using `isValidSerialNumber()`
   - `analyzeSerialNumber()` identifies patterns
   - Results are displayed with value estimation

4. Charts are initialized on demand when users interact with visualization tabs