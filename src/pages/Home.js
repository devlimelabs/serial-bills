import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  Paper,
  Fade,
  Zoom
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VerifiedIcon from '@mui/icons-material/Verified';
import SpeedIcon from '@mui/icons-material/Speed';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { isValidSerialNumber } from '../utils/serialChecker';

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '85vh',
  display: 'flex',
  alignItems: 'center',
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[50]} 100%)`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(0, 102, 255, 0.05) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    right: '-10%',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(255, 71, 87, 0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
}));

const SerialInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    fontSize: '1.25rem',
    fontFamily: "'JetBrains Mono', monospace",
    backgroundColor: theme.palette.background.paper,
    '& input': {
      textAlign: 'center',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: 16,
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  border: `2px solid transparent`,
  '&:hover': {
    transform: 'translateY(-4px)',
    borderColor: theme.palette.primary.main,
    boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: 16,
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const SerialExample = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  padding: theme.spacing(0.5, 1.5),
  backgroundColor: theme.palette.grey[100],
  borderRadius: 8,
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '0.875rem',
  letterSpacing: '0.05em',
  margin: theme.spacing(0.5),
  border: `1px solid ${theme.palette.divider}`,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    transform: 'translateY(-2px)',
  },
}));

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [serialInput, setSerialInput] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSerialSubmit = (e) => {
    e.preventDefault();
    if (!serialInput) {
      setInputError('Please enter a serial number');
      return;
    }
    if (!isValidSerialNumber(serialInput)) {
      setInputError('Invalid format. Use: Letter + 8 digits + Letter/Star');
      return;
    }
    navigate(`/checker?serial=${serialInput}`);
  };

  const handleExampleClick = (serial) => {
    setSerialInput(serial);
    setInputError('');
  };

  const features = [
    {
      icon: <VerifiedIcon sx={{ fontSize: 40 }} />,
      title: 'Instant Verification',
      description: 'Check any serial number instantly to discover valuable patterns and estimated worth',
      link: '/checker',
      color: theme.palette.success.main,
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Market Values',
      description: 'Real-time market values based on recent sales data and collector demand',
      link: '/patterns',
      color: theme.palette.warning.main,
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Pattern Recognition',
      description: 'Advanced pattern detection for 19+ valuable serial number types',
      link: '/guide',
      color: theme.palette.info.main,
    },
  ];

  const stats = [
    { label: 'Highest Value', value: '$20,000+', subtext: 'Solid 9s Perfect Condition' },
    { label: 'Rarest Pattern', value: '1 in 11M', subtext: 'Solid Serial Numbers' },
    { label: 'Pattern Types', value: '19+', subtext: 'Collectible Patterns' },
    { label: 'Active Collectors', value: '50,000+', subtext: 'Worldwide Community' },
  ];

  const popularSerials = [
    'A12345678B',
    'A88888888B',
    'A11111111*',
    'A98765432B',
    'A00000001B',
    'A12121212B',
  ];

  return (
    <Box>
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in timeout={800}>
                <Box>
                  <Typography 
                    variant="overline" 
                    sx={{ 
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      mb: 2,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <AutoAwesomeIcon fontSize="small" />
                    CHECK YOUR BILLS TODAY
                  </Typography>
                  
                  <Typography 
                    variant="h1" 
                    component="h1" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 900,
                      background: theme.custom.gradients.primary,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 3,
                    }}
                  >
                    Your Bills Could Be Worth Thousands
                  </Typography>
                  
                  <Typography 
                    variant="h5" 
                    color="text.secondary" 
                    paragraph
                    sx={{ mb: 4, fontWeight: 400 }}
                  >
                    Instantly check any US dollar bill serial number for valuable patterns. 
                    Some bills are worth 100x+ their face value.
                  </Typography>

                  <form onSubmit={handleSerialSubmit}>
                    <SerialInput
                      fullWidth
                      placeholder="A12345678B"
                      value={serialInput}
                      onChange={(e) => {
                        setSerialInput(e.target.value.toUpperCase());
                        setInputError('');
                      }}
                      error={!!inputError}
                      helperText={inputError}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              type="submit"
                              sx={{ 
                                background: theme.custom.gradients.primary,
                                color: 'white',
                                '&:hover': {
                                  background: theme.custom.gradients.primary,
                                  transform: 'scale(1.05)',
                                },
                              }}
                            >
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 3 }}
                    />
                  </form>

                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Try these examples:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {popularSerials.map((serial) => (
                        <SerialExample 
                          key={serial}
                          onClick={() => handleExampleClick(serial)}
                        >
                          {serial}
                        </SerialExample>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={6}>
              <Zoom in timeout={1000}>
                <Grid container spacing={2}>
                  {stats.map((stat, index) => (
                    <Grid item xs={6} key={index}>
                      <StatCard elevation={0}>
                        <Typography 
                          variant="h4" 
                          sx={{ 
                            fontWeight: 800,
                            color: theme.palette.primary.main,
                            mb: 0.5,
                          }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {stat.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {stat.subtext}
                        </Typography>
                      </StatCard>
                    </Grid>
                  ))}
                </Grid>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" component="h2" gutterBottom fontWeight={800}>
            Everything You Need
          </Typography>
          <Typography variant="h5" color="text.secondary" fontWeight={400}>
            Professional tools for serial number collectors and enthusiasts
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in timeout={800 + index * 200}>
                <FeatureCard
                  onClick={() => navigate(feature.link)}
                  elevation={0}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: `${feature.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        color: feature.color,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom fontWeight={700}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ 
        py: 8, 
        background: theme.custom.gradients.primary,
        color: 'white',
        textAlign: 'center',
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom fontWeight={800}>
            Start Checking Your Bills Now
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, fontWeight: 400 }}>
            Join thousands of collectors who've discovered valuable bills in their wallets
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/checker"
            sx={{
              backgroundColor: 'white',
              color: theme.palette.primary.main,
              fontWeight: 700,
              px: 4,
              py: 1.5,
              '&:hover': {
                backgroundColor: theme.palette.grey[100],
                transform: 'translateY(-2px)',
              },
            }}
          >
            Check a Serial Number
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;