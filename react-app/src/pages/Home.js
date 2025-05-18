import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
}));

const StatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const IconAvatar = styled(Avatar)(({ theme, color }) => ({
  backgroundColor: color || theme.palette.primary.main,
  width: 56,
  height: 56,
  marginBottom: theme.spacing(2),
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box component="main">
      {/* Intro Section */}
      <SectionContainer 
        sx={{ 
          backgroundColor: theme.palette.background.paper,
          textAlign: 'center'
        }}
      >
        <Container>
          <Typography variant="h2" component="h2" gutterBottom>
            The Hidden Value in Serial Numbers
          </Typography>
          <Typography variant="body1" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
            Your ordinary dollar bills might be worth hundreds or even thousands of times their face value 
            if they contain special serial number patterns. This comprehensive guide explores the fascinating 
            world of currency collecting focused on these unique numerical sequences.
          </Typography>
          
          {/* Key Stats */}
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <StatsCard elevation={2}>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <IconAvatar color="#D32F2F">
                    <MonetizationOnOutlinedIcon fontSize="large" />
                  </IconAvatar>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Highest Value
                  </Typography>
                  <Typography variant="h4" component="p" color="primary" sx={{ fontWeight: 700 }}>
                    $20,000+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Solid 9s in perfect condition
                  </Typography>
                </CardContent>
              </StatsCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <StatsCard elevation={2}>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <IconAvatar color="#1976D2">
                    <SearchIcon fontSize="large" />
                  </IconAvatar>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Pattern Types
                  </Typography>
                  <Typography variant="h4" component="p" color="primary" sx={{ fontWeight: 700 }}>
                    19+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Distinct collectible patterns
                  </Typography>
                </CardContent>
              </StatsCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <StatsCard elevation={2}>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <IconAvatar color="#4CAF50">
                    <MonetizationOnOutlinedIcon fontSize="large" />
                  </IconAvatar>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Rarest Pattern
                  </Typography>
                  <Typography variant="h4" component="p" color="primary" sx={{ fontWeight: 700 }}>
                    1 in 11,111,111
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Odds of finding a solid serial
                  </Typography>
                </CardContent>
              </StatsCard>
            </Grid>
          </Grid>
        </Container>
      </SectionContainer>
      
      {/* Features Section */}
      <SectionContainer>
        <Container>
          <Typography variant="h2" component="h2" align="center" gutterBottom>
            Explore Our Features
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 5 }}>
            Our comprehensive tools help you identify, understand, and value currency based on 
            serial number patterns. Whether you're a seasoned collector or just curious about 
            what might be in your wallet, we have everything you need.
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <FeatureCard elevation={3}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 3 }}>
                  <IconAvatar>
                    <SearchIcon fontSize="large" />
                  </IconAvatar>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Pattern Search
                  </Typography>
                  <Typography variant="body2" paragraph sx={{ flexGrow: 1 }}>
                    Browse our comprehensive database of valuable serial number patterns. 
                    Filter by value, rarity, or pattern type to find exactly what you're looking for.
                  </Typography>
                  <Button 
                    variant="contained" 
                    component={RouterLink} 
                    to="/patterns" 
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    Browse Patterns
                  </Button>
                </CardContent>
              </FeatureCard>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FeatureCard elevation={3}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 3 }}>
                  <IconAvatar color={theme.palette.secondary.main}>
                    <MonetizationOnOutlinedIcon fontSize="large" />
                  </IconAvatar>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Serial Checker
                  </Typography>
                  <Typography variant="body2" paragraph sx={{ flexGrow: 1 }}>
                    Enter any serial number and our tool will identify valuable patterns and provide 
                    an estimated value based on denomination, condition, and rarity.
                  </Typography>
                  <Button 
                    variant="contained" 
                    component={RouterLink} 
                    to="/checker" 
                    color="secondary"
                    sx={{ mt: 2 }}
                  >
                    Check Serial Number
                  </Button>
                </CardContent>
              </FeatureCard>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FeatureCard elevation={3}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 3 }}>
                  <IconAvatar color="#5C6BC0">
                    <MenuBookIcon fontSize="large" />
                  </IconAvatar>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Collector's Guide
                  </Typography>
                  <Typography variant="body2" paragraph sx={{ flexGrow: 1 }}>
                    Learn everything you need to know about collecting valuable serial numbers 
                    with our comprehensive guide, including history, factors affecting value, and more.
                  </Typography>
                  <Button 
                    variant="contained" 
                    component={RouterLink} 
                    to="/guide" 
                    color="primary"
                    sx={{ mt: 2, bgcolor: '#5C6BC0' }}
                  >
                    Read Guide
                  </Button>
                </CardContent>
              </FeatureCard>
            </Grid>
          </Grid>
        </Container>
      </SectionContainer>
      
      {/* Value Tiers Section */}
      <SectionContainer sx={{ backgroundColor: theme.palette.background.paper }}>
        <Container>
          <Typography variant="h2" component="h2" align="center" gutterBottom>
            Value Tiers at a Glance
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 5 }}>
            Serial number patterns are categorized into six value tiers based on their market value, 
            rarity, and collector demand. Explore each tier to discover patterns in your budget range.
          </Typography>
          
          <Button 
            variant="contained" 
            component={RouterLink} 
            to="/tiers" 
            color="primary"
            size="large"
            sx={{ display: 'block', mx: 'auto', mb: 4 }}
          >
            Explore Value Tiers
          </Button>
          
          {/* Preview grid of tiers */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  bgcolor: '#D32F2F', 
                  color: 'white',
                  p: 2,
                  height: '100%'
                }}
              >
                <Typography variant="h6">Tier 1: Extremely Valuable</Typography>
                <Typography variant="body2">$1,000+</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  bgcolor: '#F57C00', 
                  color: 'white',
                  p: 2,
                  height: '100%'
                }}
              >
                <Typography variant="h6">Tier 2: Very Valuable</Typography>
                <Typography variant="body2">$500-$999</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  bgcolor: '#7B1FA2', 
                  color: 'white',
                  p: 2,
                  height: '100%'
                }}
              >
                <Typography variant="h6">Tier 3: Valuable</Typography>
                <Typography variant="body2">$100-$499</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  bgcolor: '#388E3C', 
                  color: 'white',
                  p: 2,
                  height: '100%'
                }}
              >
                <Typography variant="h6">Tier 4: Moderately Valuable</Typography>
                <Typography variant="body2">$50-$99</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  bgcolor: '#1976D2', 
                  color: 'white',
                  p: 2,
                  height: '100%'
                }}
              >
                <Typography variant="h6">Tier 5: Slightly Valuable</Typography>
                <Typography variant="body2">$15-$49</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  bgcolor: '#757575', 
                  color: 'white',
                  p: 2,
                  height: '100%'
                }}
              >
                <Typography variant="h6">Tier 6: Variable Value</Typography>
                <Typography variant="body2">Face Value to $100+</Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </SectionContainer>
      
      {/* CTA Section */}
      <SectionContainer 
        sx={{ 
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container>
          <Typography variant="h3" component="h2" gutterBottom>
            Check Your Bills Now
          </Typography>
          <Typography variant="h6" component="p" gutterBottom sx={{ maxWidth: 800, mx: 'auto', mb: 4, fontWeight: 'normal' }}>
            You might have valuable currency in your wallet right now. 
            Use our serial number checker to find out!
          </Typography>
          
          <Button 
            variant="contained" 
            component={RouterLink} 
            to="/checker" 
            color="secondary"
            size="large"
            sx={{ 
              py: 1.5, 
              px: 4, 
              fontSize: '1.1rem',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: theme.shadows[10],
              },
              transition: 'all 0.3s ease',
            }}
          >
            Check Serial Number
          </Button>
        </Container>
      </SectionContainer>
    </Box>
  );
};

export default Home;