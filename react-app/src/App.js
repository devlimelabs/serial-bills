import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import { PatternProvider } from './context/PatternContext';
import theme from './theme/theme';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import About from './pages/About';

// Components
import PatternGrid from './components/patterns/PatternGrid';
import ValueTiers from './components/patterns/ValueTiers';
import SerialChecker from './components/checker/SerialChecker';
import GuideContent from './components/guide/GuideContent';
import PatternCharts from './components/visualizations/PatternCharts';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PatternProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/patterns" element={<PatternGrid />} />
              <Route path="/tiers" element={<ValueTiers />} />
              <Route path="/checker" element={<SerialChecker />} />
              <Route path="/guide" element={<GuideContent />} />
              <Route path="/charts" element={<PatternCharts />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h4">Page Not Found</Typography>
                  <Typography variant="body1">The page you requested does not exist.</Typography>
                </Box>
              } />
            </Routes>
          </Layout>
        </Router>
      </PatternProvider>
    </ThemeProvider>
  );
};

export default App;