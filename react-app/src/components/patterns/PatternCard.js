import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  Collapse,
  Button,
  LinearProgress,
  Divider,
  IconButton,
  Avatar,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const CardHeaderStyled = styled(CardHeader)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
}));

const ExampleBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  textAlign: 'center',
}));

const SerialNumber = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.mono.fontFamily,
  fontSize: '1.5rem',
  fontWeight: 700,
  letterSpacing: '2px',
  color: theme.palette.primary.main,
}));

const ExpandButton = styled(IconButton)(({ theme, expanded }) => ({
  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.standard,
  }),
}));

const ValueRange = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const RarityMeter = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const PatternCard = ({ pattern }) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Calculate rarity level for progress bar
  const getRarityPercentage = (level) => {
    switch (level) {
      case 'Extremely Rare':
        return 95;
      case 'Very Rare':
        return 80;
      case 'Rare':
        return 65;
      case 'Uncommon':
        return 45;
      case 'Somewhat Common':
        return 25;
      case 'Common':
      case 'Common (specific dates can be rare)':
        return 10;
      default:
        return 50;
    }
  };

  // Get color for tier chip
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

  // Format value range
  const formatValueRange = () => {
    const { min, max, currency = 'USD' } = pattern.value_range;
    
    if (min === max) {
      return `$${min.toLocaleString()}`;
    }
    
    if (max > 10000 && pattern.tier === 1) {
      return `$${min.toLocaleString()}+`;
    }
    
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  return (
    <StyledCard>
      <CardHeaderStyled
        avatar={
          <Avatar 
            variant="rounded"
            src={`/assets/${pattern.image}`} 
            alt={pattern.name}
            sx={{ bgcolor: 'primary.light' }}
          />
        }
        title={
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
            {pattern.name}
          </Typography>
        }
        action={
          <Chip
            label={`Tier ${pattern.tier}`}
            size="small"
            sx={{
              backgroundColor: getTierColor(pattern.tier),
              color: 'white',
              fontWeight: 'bold',
            }}
          />
        }
      />
      
      <ExampleBox>
        <SerialNumber variant="serialNumber">
          {pattern.examples[0]}
        </SerialNumber>
      </ExampleBox>
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {pattern.description}
        </Typography>
        
        <Divider sx={{ my: 1.5 }} />
        
        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'text.secondary' }}>
            Value Range
          </Typography>
          <ValueRange>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {formatValueRange()}
            </Typography>
          </ValueRange>
        </Box>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'text.secondary' }}>
            Rarity
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">{pattern.rarity.level}</Typography>
            <Typography variant="body2" color="text.secondary">
              {pattern.rarity.statistical_chance}
            </Typography>
          </Box>
          <RarityMeter>
            <LinearProgress
              variant="determinate"
              value={getRarityPercentage(pattern.rarity.level)}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: theme.palette.grey[200],
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                  backgroundColor: pattern.tier <= 3 ? 'error.main' : 'primary.main',
                },
              }}
            />
          </RarityMeter>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', padding: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          startIcon={<InfoOutlinedIcon />}
          onClick={handleExpandClick}
        >
          Details
        </Button>
        <ExpandButton
          expanded={expanded ? 1 : 0}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandButton>
      </CardActions>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {pattern.rarity_factors && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                Rarity Factors
              </Typography>
              <ul style={{ paddingLeft: theme.spacing(2), margin: 0 }}>
                {pattern.rarity_factors.map((factor, index) => (
                  <li key={index}>
                    <Typography variant="body2">{factor}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          )}
          
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
            Examples
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {pattern.examples.map((example, index) => (
              <Chip
                key={index}
                label={
                  <Typography variant="body2" sx={{ fontFamily: theme.typography.mono.fontFamily }}>
                    {example}
                  </Typography>
                }
                size="medium"
                variant="outlined"
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Box>
          
          {pattern.notable_sales && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                Notable Sales
              </Typography>
              <Typography variant="body2">{pattern.notable_sales}</Typography>
            </Box>
          )}
        </CardContent>
      </Collapse>
    </StyledCard>
  );
};

export default PatternCard;