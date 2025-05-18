import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Button,
  Paper,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { usePatterns } from '../../context/PatternContext';

const FilterContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  position: 'sticky',
  top: 90,
}));

const FilterGroup = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const FilterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
}));

const FilterActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const patternTypes = [
  { value: 'solid', label: 'Solid' },
  { value: 'ladder', label: 'Ladder' },
  { value: 'binary', label: 'Binary' },
  { value: 'radar', label: 'Radar' },
  { value: 'repeater', label: 'Repeater' },
  { value: 'low', label: 'Low Numbers' },
  { value: 'high', label: 'High Numbers' },
  { value: 'date', label: 'Birthday/Anniversary' },
];

const rarityLevels = [
  { value: 'all', label: 'All' },
  { value: 'extremely-rare', label: 'Extremely Rare' },
  { value: 'very-rare', label: 'Very Rare' },
  { value: 'rare', label: 'Rare' },
  { value: 'uncommon', label: 'Uncommon' },
  { value: 'somewhat-common', label: 'Somewhat Common' },
  { value: 'common', label: 'Common' },
];

const FilterSidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { filterPatterns, activeFilters } = usePatterns();
  
  // Local state for filter values
  const [valueRange, setValueRange] = useState([0, 20000]);
  const [selectedPatterns, setSelectedPatterns] = useState([]);
  const [rarity, setRarity] = useState('all');
  const [expanded, setExpanded] = useState(!isMobile);
  
  // Initialize from active filters
  useEffect(() => {
    if (activeFilters) {
      setValueRange([activeFilters.valueMin || 0, activeFilters.valueMax || 20000]);
      setSelectedPatterns(activeFilters.patterns || []);
      setRarity(activeFilters.rarity || 'all');
    }
  }, [activeFilters]);
  
  const handleValueRangeChange = (event, newValue) => {
    setValueRange(newValue);
  };
  
  const handlePatternChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedPatterns([...selectedPatterns, value]);
    } else {
      setSelectedPatterns(selectedPatterns.filter(pattern => pattern !== value));
    }
  };
  
  const handleRarityChange = (event) => {
    setRarity(event.target.value);
  };
  
  const handleApplyFilters = () => {
    filterPatterns({
      valueMin: valueRange[0],
      valueMax: valueRange[1],
      patterns: selectedPatterns,
      rarity: rarity,
    });
  };
  
  const handleResetFilters = () => {
    setValueRange([0, 20000]);
    setSelectedPatterns([]);
    setRarity('all');
    
    filterPatterns({
      clearFilters: true,
    });
  };
  
  const formatValue = (value) => `$${value.toLocaleString()}`;
  
  // Handle accordion expansion
  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };
  
  return (
    <FilterContainer elevation={3}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center' }}>
          <FilterListIcon sx={{ mr: 1 }} />
          Filters
        </Typography>
        
        {isMobile && (
          <Button
            onClick={handleAccordionChange}
            endIcon={<ExpandMoreIcon sx={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />}
            size="small"
          >
            {expanded ? 'Hide' : 'Show'}
          </Button>
        )}
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Box sx={{ display: expanded ? 'block' : 'none' }}>
        <FilterGroup>
          <FilterTitle variant="subtitle1">Value Range</FilterTitle>
          <Box px={1}>
            <Slider
              value={valueRange}
              onChange={handleValueRangeChange}
              valueLabelDisplay="off"
              min={0}
              max={20000}
              step={100}
              color="primary"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {formatValue(valueRange[0])}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {valueRange[1] >= 20000 ? '$20,000+' : formatValue(valueRange[1])}
              </Typography>
            </Box>
          </Box>
        </FilterGroup>
        
        <FilterGroup>
          <FilterTitle variant="subtitle1">Pattern Type</FilterTitle>
          <FormGroup>
            {patternTypes.map((pattern) => (
              <FormControlLabel
                key={pattern.value}
                control={
                  <Checkbox
                    checked={selectedPatterns.includes(pattern.value)}
                    onChange={handlePatternChange}
                    value={pattern.value}
                    size="small"
                  />
                }
                label={pattern.label}
              />
            ))}
          </FormGroup>
        </FilterGroup>
        
        <FilterGroup>
          <FilterTitle variant="subtitle1">Rarity</FilterTitle>
          <RadioGroup value={rarity} onChange={handleRarityChange}>
            {rarityLevels.map((level) => (
              <FormControlLabel
                key={level.value}
                value={level.value}
                control={<Radio size="small" />}
                label={level.label}
              />
            ))}
          </RadioGroup>
        </FilterGroup>
        
        <FilterActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleApplyFilters}
            fullWidth
          >
            Apply Filters
          </Button>
          <Button
            variant="outlined"
            startIcon={<ClearAllIcon />}
            onClick={handleResetFilters}
          >
            Reset
          </Button>
        </FilterActions>
      </Box>
    </FilterContainer>
  );
};

export default FilterSidebar;