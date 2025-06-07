import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  Collapse,
  Button,
  Divider,
  IconButton,
  useTheme,
  Fade,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const StyledCard = styled(Card)(({ theme, tier }) => {
  const getTierGradient = () => {
    switch (tier) {
      case 1: return `linear-gradient(135deg, ${theme.palette.error.light}15 0%, ${theme.palette.error.main}15 100%)`;
      case 2: return `linear-gradient(135deg, ${theme.palette.warning.light}15 0%, ${theme.palette.warning.main}15 100%)`;
      case 3: return `linear-gradient(135deg, #FFB74D15 0%, #FF980015 100%)`;
      case 4: return `linear-gradient(135deg, ${theme.palette.success.light}15 0%, ${theme.palette.success.main}15 100%)`;
      case 5: return `linear-gradient(135deg, ${theme.palette.info.light}15 0%, ${theme.palette.info.main}15 100%)`;
      case 6: return `linear-gradient(135deg, ${theme.palette.grey[300]}15 0%, ${theme.palette.grey[600]}15 100%)`;
      default: return theme.palette.background.paper;
    }
  };

  return {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 16,
    border: '1px solid',
    borderColor: theme.palette.divider,
    overflow: 'hidden',
    background: getTierGradient(),
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
      borderColor: theme.palette.primary.main,
    },
  };
});

const TierBadge = styled(Box)(({ theme, tier }) => {
  const getColor = () => {
    switch (tier) {
      case 1: return theme.palette.error.main;
      case 2: return theme.palette.warning.main;
      case 3: return '#FF9800';
      case 4: return theme.palette.success.main;
      case 5: return theme.palette.info.main;
      case 6: return theme.palette.grey[600];
      default: return theme.palette.primary.main;
    }
  };

  return {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: getColor(),
    color: 'white',
    padding: theme.spacing(0.5, 2),
    borderRadius: '0 16px 0 16px',
    fontWeight: 700,
    fontSize: '0.875rem',
  };
});

const SerialExample = styled(Typography)(({ theme }) => ({
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '1.5rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  color: theme.palette.primary.main,
  padding: theme.spacing(2, 3),
  borderRadius: 12,
  backgroundColor: theme.palette.grey[50],
  border: `2px solid ${theme.palette.primary.main}`,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

const ValueDisplay = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  backgroundColor: theme.palette.grey[50],
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

const RarityBar = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[200],
  overflow: 'hidden',
  marginTop: theme.spacing(1),
}));

const RarityFill = styled(Box)(({ theme, value, tier }) => {
  const getColor = () => {
    if (value >= 80) return theme.palette.error.main;
    if (value >= 60) return theme.palette.warning.main;
    if (value >= 40) return theme.palette.info.main;
    return theme.palette.success.main;
  };

  return {
    position: 'absolute',
    height: '100%',
    width: `${value}%`,
    background: `linear-gradient(90deg, ${getColor()} 0%, ${getColor()}BB 100%)`,
    transition: 'width 0.8s ease',
  };
});

const DetailSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: 8,
  backgroundColor: theme.palette.grey[50],
}));

const ExpandButton = styled(IconButton)(({ theme, expanded }) => ({
  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: 'transform 0.3s ease',
  marginLeft: 'auto',
}));

const PatternCard = ({ pattern }) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  const getRarityPercentage = (level) => {
    switch (level) {
      case 'Extremely Rare': return 95;
      case 'Very Rare': return 80;
      case 'Rare': return 65;
      case 'Uncommon': return 45;
      case 'Somewhat Common': return 25;
      case 'Common': case 'Common (specific dates can be rare)': return 10;
      default: return 50;
    }
  };

  const formatValueRange = () => {
    const { min, max } = pattern.value_range;
    if (min === max) return `$${min.toLocaleString()}`;
    if (max > 10000 && pattern.tier === 1) return `$${min.toLocaleString()}+`;
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  const rarityValue = getRarityPercentage(pattern.rarity.level);

  return (
    <Fade in timeout={300}>
      <StyledCard tier={pattern.tier}>
        <TierBadge tier={pattern.tier}>
          Tier {pattern.tier}
        </TierBadge>
        
        <CardContent sx={{ flexGrow: 1, pt: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom fontWeight={700}>
            {pattern.name}
          </Typography>
          
          <SerialExample>
            {pattern.examples[0]}
          </SerialExample>
          
          <Typography variant="body2" color="text.secondary" paragraph>
            {pattern.description}
          </Typography>
          
          <ValueDisplay>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
              <MonetizationOnIcon color="primary" />
              <Typography variant="h4" fontWeight={800} color="primary">
                {formatValueRange()}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Estimated Market Value
            </Typography>
          </ValueDisplay>
          
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" fontWeight={600}>
                Rarity: {pattern.rarity.level}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {pattern.rarity.statistical_chance}
              </Typography>
            </Box>
            <RarityBar>
              <RarityFill value={rarityValue} tier={pattern.tier} />
            </RarityBar>
          </Box>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button
            variant="outlined"
            size="medium"
            startIcon={<InfoIcon />}
            onClick={() => setExpanded(!expanded)}
            sx={{ borderRadius: 2 }}
          >
            Details
          </Button>
          <ExpandButton
            expanded={expanded}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandButton>
        </CardActions>
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider />
          <CardContent>
            {pattern.rarity_factors && (
              <DetailSection>
                <Typography variant="subtitle2" gutterBottom fontWeight={700}>
                  <BarChartIcon sx={{ fontSize: 18, verticalAlign: 'middle', mr: 1 }} />
                  Rarity Factors
                </Typography>
                <ul style={{ margin: theme.spacing(0.5, 0, 0, 0), paddingLeft: theme.spacing(3) }}>
                  {pattern.rarity_factors.map((factor, index) => (
                    <li key={index}>
                      <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                        {factor}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </DetailSection>
            )}
            
            <DetailSection sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom fontWeight={700}>
                <TrendingUpIcon sx={{ fontSize: 18, verticalAlign: 'middle', mr: 1 }} />
                Example Patterns
              </Typography>
              <Grid container spacing={1} sx={{ mt: 0.5 }}>
                {pattern.examples.map((example, index) => (
                  <Grid item xs={6} sm={4} key={index}>
                    <Chip
                      label={
                        <Typography 
                          sx={{ 
                            fontFamily: "'JetBrains Mono', monospace",
                            letterSpacing: '0.05em',
                            fontSize: '0.875rem',
                          }}
                        >
                          {example}
                        </Typography>
                      }
                      sx={{ 
                        width: '100%',
                        backgroundColor: theme.palette.grey[100],
                        border: `1px solid ${theme.palette.divider}`,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </DetailSection>
            
            {pattern.notable_sales && (
              <DetailSection sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={700}>
                  Notable Sales
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {pattern.notable_sales}
                </Typography>
              </DetailSection>
            )}
          </CardContent>
        </Collapse>
      </StyledCard>
    </Fade>
  );
};

export default PatternCard;