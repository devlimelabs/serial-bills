import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Box, 
  Container, 
  Typography, 
  Pagination, 
  CircularProgress,
  Alert,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PatternCard from './PatternCard';
import FilterSidebar from './FilterSidebar';
import { usePatterns } from '../../context/PatternContext';

const PatternGrid = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { filteredPatterns, loading, searchTerm } = usePatterns();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedPatterns, setPaginatedPatterns] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;

  // Handle pagination
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [filteredPatterns]);

  useEffect(() => {
    if (filteredPatterns.length > 0) {
      const offset = (currentPage - 1) * itemsPerPage;
      setPaginatedPatterns(filteredPatterns.slice(offset, offset + itemsPerPage));
      setTotalPages(Math.ceil(filteredPatterns.length / itemsPerPage));
    } else {
      setPaginatedPatterns([]);
      setTotalPages(1);
    }
  }, [filteredPatterns, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to top of grid
    window.scrollTo({
      top: document.getElementById('pattern-grid-top').offsetTop - 80,
      behavior: 'smooth',
    });
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container>
        <Box id="pattern-grid-top">
          <Typography variant="h2" component="h1" gutterBottom>
            Serial Number Patterns
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Explore valuable serial number patterns and their features. Use the filters to narrow down your search or find specific pattern types.
          </Typography>
        </Box>
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            gap: 4,
            mb: 4
          }}
        >
          {/* Filter sidebar */}
          <Box 
            sx={{ 
              width: isMobile ? '100%' : 300,
              flexShrink: 0,
              order: isMobile ? 1 : 0
            }}
          >
            <FilterSidebar />
          </Box>
          
          {/* Patterns container */}
          <Box sx={{ flexGrow: 1 }}>
            {/* Search results info */}
            {searchTerm && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">
                  Search results for: "{searchTerm}"
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Found {filteredPatterns.length} matching patterns
                </Typography>
              </Box>
            )}
            
            {/* Loading state */}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            )}
            
            {/* No results message */}
            {!loading && filteredPatterns.length === 0 && (
              <Alert severity="info" sx={{ mb: 2 }}>
                No patterns match your current filters. Try adjusting your search criteria.
              </Alert>
            )}
            
            {/* Pattern grid */}
            <Grid container spacing={3}>
              {paginatedPatterns.map((pattern) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={pattern.id}>
                  <PatternCard pattern={pattern} />
                </Grid>
              ))}
            </Grid>
            
            {/* Pagination */}
            {filteredPatterns.length > itemsPerPage && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size={isMobile ? "small" : "medium"}
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PatternGrid;