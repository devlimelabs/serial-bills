import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Bar, Pie, Radar } from 'react-chartjs-2';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

import { usePatterns } from '../../context/PatternContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
}));

const ChartCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const ChartContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  minHeight: 400,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const ControlsContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const ChartTypeToggle = styled(ToggleButtonGroup)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const PatternCharts = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { patterns, tiers } = usePatterns();
  const [chartType, setChartType] = useState('value');

  const handleChartTypeChange = (event, newType) => {
    if (newType !== null) {
      setChartType(newType);
    }
  };

  // Color helpers
  const getTierColor = (tier, alpha = 1) => {
    const colors = {
      1: `rgba(211, 47, 47, ${alpha})`, // Red
      2: `rgba(245, 124, 0, ${alpha})`, // Orange
      3: `rgba(123, 31, 162, ${alpha})`, // Purple
      4: `rgba(56, 142, 60, ${alpha})`, // Green
      5: `rgba(25, 118, 210, ${alpha})`, // Blue
      6: `rgba(117, 117, 117, ${alpha})` // Grey
    };
    
    return colors[tier] || `rgba(0, 77, 64, ${alpha})`;
  };

  // Prepare data for value comparison chart
  const getValueComparisonData = () => {
    // Get top 10 patterns by max value
    const topPatterns = [...patterns]
      .sort((a, b) => b.value_range.max - a.value_range.max)
      .slice(0, 10);
    
    return {
      labels: topPatterns.map(p => p.name),
      datasets: [
        {
          label: 'Minimum Value ($)',
          data: topPatterns.map(p => p.value_range.min),
          backgroundColor: topPatterns.map(p => getTierColor(p.tier, 0.6)),
          borderColor: topPatterns.map(p => getTierColor(p.tier)),
          borderWidth: 1
        },
        {
          label: 'Maximum Value ($)',
          data: topPatterns.map(p => p.value_range.max),
          backgroundColor: topPatterns.map(p => getTierColor(p.tier, 0.3)),
          borderColor: topPatterns.map(p => getTierColor(p.tier, 0.8)),
          borderWidth: 1
        }
      ]
    };
  };

  // Prepare data for tier distribution chart
  const getTierDistributionData = () => {
    // Count patterns in each tier
    const tierCounts = tiers.map(tier => {
      return patterns.filter(p => p.tier === tier.tier).length;
    });
    
    return {
      labels: tiers.map(tier => `Tier ${tier.tier}: ${tier.name}`),
      datasets: [
        {
          data: tierCounts,
          backgroundColor: tiers.map(tier => getTierColor(tier.tier, 0.7)),
          borderColor: tiers.map(tier => getTierColor(tier.tier)),
          borderWidth: 1
        }
      ]
    };
  };

  // Prepare data for rarity radar chart
  const getRarityRadarData = () => {
    const rarityLevels = [
      'Extremely Rare',
      'Very Rare',
      'Rare',
      'Uncommon',
      'Somewhat Common',
      'Common'
    ];
    
    // Count patterns for each rarity level
    const rarityData = rarityLevels.map(level => 
      patterns.filter(p => p.rarity.level === level).length
    );
    
    // Calculate average value for each rarity level
    const valueData = rarityLevels.map(level => {
      const levelPatterns = patterns.filter(p => p.rarity.level === level);
      if (levelPatterns.length === 0) return 0;
      
      const totalValue = levelPatterns.reduce((sum, pattern) => {
        return sum + ((pattern.value_range.min + pattern.value_range.max) / 2);
      }, 0);
      
      return Math.round(totalValue / levelPatterns.length);
    });
    
    return {
      labels: rarityLevels,
      datasets: [
        {
          label: 'Pattern Count',
          data: rarityData,
          backgroundColor: 'rgba(0, 77, 64, 0.2)',
          borderColor: theme.palette.primary.main,
          borderWidth: 2,
          pointBackgroundColor: theme.palette.primary.main,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: theme.palette.primary.main,
        },
        {
          label: 'Avg. Value ($)',
          data: valueData,
          backgroundColor: 'rgba(255, 193, 7, 0.2)',
          borderColor: theme.palette.secondary.main,
          borderWidth: 2,
          pointBackgroundColor: theme.palette.secondary.main,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: theme.palette.secondary.main,
        }
      ]
    };
  };

  const valueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value in USD'
        },
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Value Comparison of Top Serial Number Patterns',
        font: {
          size: 16,
          family: "'Montserrat', sans-serif",
          weight: 'bold'
        },
        color: '#004D40',
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += '$' + context.raw.toLocaleString();
            return label;
          }
        }
      },
      legend: {
        position: 'bottom',
      }
    },
  };

  const tierChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Distribution of Patterns by Value Tier',
        font: {
          size: 16,
          family: "'Montserrat', sans-serif",
          weight: 'bold'
        },
        color: '#004D40',
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw;
            const percentage = Math.round((value / patterns.length) * 100);
            return `${label}: ${value} patterns (${percentage}%)`;
          }
        }
      },
      legend: {
        position: 'right',
        labels: {
          boxWidth: 15
        }
      }
    },
  };

  const rarityChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        pointLabels: {
          font: {
            size: isMobile ? 8 : 12
          }
        },
        ticks: {
          showLabelBackdrop: false,
          font: {
            size: 8
          }
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Rarity vs Value Relationship',
        font: {
          size: 16,
          family: "'Montserrat', sans-serif",
          weight: 'bold'
        },
        color: '#004D40',
        padding: {
          top: 10,
          bottom: 20
        }
      },
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const dataset = context.dataset.label;
            const value = context.raw;
            return dataset === 'Avg. Value ($)' 
              ? `Average Value: $${value.toLocaleString()}`
              : `Pattern Count: ${value}`;
          }
        }
      }
    },
  };

  return (
    <ChartContainer>
      <Container>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Pattern Visualizations
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          paragraph 
          align="center"
          sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}
        >
          Explore the relationships between pattern types, rarity, and value through interactive visualizations.
          These charts help illustrate the market dynamics of serial number collecting.
        </Typography>

        <ControlsContainer elevation={1}>
          <Typography variant="h6" gutterBottom>
            Select Chart Type
          </Typography>
          <ChartTypeToggle
            value={chartType}
            exclusive
            onChange={handleChartTypeChange}
            aria-label="chart type"
          >
            <ToggleButton value="value" aria-label="value comparison">
              <BarChartIcon sx={{ mr: 1 }} />
              {!isMobile && 'Value Comparison'}
            </ToggleButton>
            <ToggleButton value="tier" aria-label="tier distribution">
              <PieChartIcon sx={{ mr: 1 }} />
              {!isMobile && 'Tier Distribution'}
            </ToggleButton>
            <ToggleButton value="rarity" aria-label="rarity radar">
              <DonutLargeIcon sx={{ mr: 1 }} />
              {!isMobile && 'Rarity Analysis'}
            </ToggleButton>
          </ChartTypeToggle>
        </ControlsContainer>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <ChartCard elevation={3}>
              <ChartContent>
                {chartType === 'value' && (
                  <Bar data={getValueComparisonData()} options={valueChartOptions} />
                )}
                {chartType === 'tier' && (
                  <Box sx={{ maxWidth: 700, margin: '0 auto' }}>
                    <Pie data={getTierDistributionData()} options={tierChartOptions} />
                  </Box>
                )}
                {chartType === 'rarity' && (
                  <Box sx={{ maxWidth: 700, margin: '0 auto' }}>
                    <Radar data={getRarityRadarData()} options={rarityChartOptions} />
                  </Box>
                )}
              </ChartContent>
            </ChartCard>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Chart Insights
          </Typography>
          <Typography variant="body2" paragraph>
            {chartType === 'value' && 
              'This chart shows the value range for the top 10 most valuable serial number patterns. Notice how Tier 1 patterns command significantly higher premiums compared to other tiers.'}
            {chartType === 'tier' && 
              'This chart shows the distribution of patterns across the six value tiers. The higher tiers (1-3) contain fewer patterns but command much higher premiums.'}
            {chartType === 'rarity' && 
              'This radar chart illustrates the relationship between rarity and value. Notice how average value increases significantly as patterns become rarer, with extremely rare patterns commanding the highest premiums.'}
          </Typography>
        </Box>
      </Container>
    </ChartContainer>
  );
};

export default PatternCharts;