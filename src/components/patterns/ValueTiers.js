import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import PatternCard from './PatternCard';
import { usePatterns } from '../../context/PatternContext';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
}));

const TierTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiTabs-flexContainer': {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  minWidth: 'auto',
  fontWeight: 600,
  textTransform: 'none',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    padding: theme.spacing(1, 1),
  },
}));

const TierContent = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

const ValueTiers = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { patterns, tiers } = usePatterns();
  const [currentTier, setCurrentTier] = useState(0);
  const [tierPatterns, setTierPatterns] = useState([]);

  // Update patterns when tier changes
  useEffect(() => {
    const tierValue = currentTier + 1;
    const filtered = patterns.filter(pattern => pattern.tier === tierValue);
    setTierPatterns(filtered);
  }, [currentTier, patterns]);

  const handleTierChange = (event, newValue) => {
    setCurrentTier(newValue);
  };

  // Get color for tier
  const getTierColor = (tier) => {
    switch (tier) {
      case 1:
        return theme.palette.error.main;
      case 2:
        return theme.palette.warning.main;
      case 3:
        return '#FF9800'; // Orange
      case 4:
        return theme.palette.success.main;
      case 5:
        return theme.palette.info.main;
      case 6:
        return theme.palette.text.secondary;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <SectionContainer>
      <Container>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Value Tiers
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          paragraph 
          align="center"
          sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}
        >
          Serial number patterns are categorized into six value tiers based on their market value, rarity, and collector demand.
        </Typography>

        <TierTabs
          value={currentTier}
          onChange={handleTierChange}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : false}
          allowScrollButtonsMobile
          aria-label="value tiers tabs"
        >
          {tiers.map((tier) => (
            <StyledTab
              key={tier.tier}
              label={`Tier ${tier.tier}: ${tier.value_range}`}
              sx={{
                borderBottom: 3,
                borderColor: 'transparent',
                '&.Mui-selected': {
                  color: getTierColor(tier.tier),
                  borderColor: getTierColor(tier.tier),
                },
              }}
            />
          ))}
        </TierTabs>

        {/* Current tier content */}
        <TierContent elevation={3}>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'flex-start' : 'center',
              mb: 2 
            }}
          >
            <Typography variant="h4" component="h2" color={getTierColor(currentTier + 1)}>
              Tier {currentTier + 1}: {tiers[currentTier].name}
            </Typography>
            <Chip
              label={tiers[currentTier].value_range}
              sx={{
                backgroundColor: getTierColor(currentTier + 1),
                color: 'white',
                fontWeight: 'bold',
                mt: isMobile ? 1 : 0,
              }}
            />
          </Box>
          
          <Typography variant="body1" paragraph>
            {tiers[currentTier].description}
          </Typography>
          
          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography variant="h5" component="h3" gutterBottom>
              Patterns in this tier
            </Typography>
            <Divider sx={{ mb: 3 }} />
          </Box>
          
          {tierPatterns.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No patterns found in this tier.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {tierPatterns.map(pattern => (
                <Grid item key={pattern.id} xs={12} sm={6} md={4}>
                  <PatternCard pattern={pattern} />
                </Grid>
              ))}
            </Grid>
          )}
        </TierContent>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            component={RouterLink}
            to="/patterns"
            variant="contained"
            color="primary"
            size="large"
          >
            View All Patterns
          </Button>
        </Box>
      </Container>
    </SectionContainer>
  );
};

export default ValueTiers;