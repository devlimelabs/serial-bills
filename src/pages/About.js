import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HistoryIcon from '@mui/icons-material/History';
import DataObjectIcon from '@mui/icons-material/DataObject';

const AboutContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const ListIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 36,
  color: theme.palette.primary.main,
}));

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AboutContainer>
      <Container>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Typography color="text.primary">About</Typography>
        </Breadcrumbs>

        <Typography variant="h2" component="h1" gutterBottom>
          About This Project
        </Typography>

        <ContentPaper elevation={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            Project Overview
          </Typography>
          <Typography variant="body1" paragraph>
            The US Currency Serial Number Patterns Guide provides a comprehensive, interactive resource 
            for currency collectors to identify, understand, and value bills based on their serial number patterns. 
            This modern web application delivers an engaging user experience with powerful search, filtering, and visualization tools.
          </Typography>
          
          <Typography variant="body1" paragraph>
            Our guide covers 19 distinct pattern types organized into 6 value tiers, from extremely valuable 
            patterns worth thousands of dollars to more common varieties that still command premiums above face value.
          </Typography>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" component="h2" gutterBottom>
            Key Features
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ color: 'primary.main' }}>
                    Pattern Search
                  </Typography>
                  <Typography variant="body2">
                    Full-text search across pattern names, descriptions, and characteristics with 
                    multi-criteria filtering.
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ color: 'primary.main' }}>
                    Serial Checker
                  </Typography>
                  <Typography variant="body2">
                    Pattern recognition algorithm to identify valuable patterns and estimate value 
                    based on condition and denomination.
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ color: 'primary.main' }}>
                    Visualizations
                  </Typography>
                  <Typography variant="body2">
                    Interactive charts including value comparisons, rarity distribution, and pattern 
                    relationships to illustrate market dynamics.
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ color: 'primary.main' }}>
                    Educational Guide
                  </Typography>
                  <Typography variant="body2">
                    Comprehensive information on pattern types, value factors, and collecting strategies 
                    for beginners and experienced collectors.
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" component="h2" gutterBottom>
            Technical Implementation
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListIcon>
                    <CheckCircleOutlineIcon />
                  </ListIcon>
                  <ListItemText
                    primary="Modern Tech Stack"
                    secondary="Built with React, Material UI, and Chart.js for a responsive, interactive user experience."
                  />
                </ListItem>
                <ListItem>
                  <ListIcon>
                    <CheckCircleOutlineIcon />
                  </ListIcon>
                  <ListItemText
                    primary="Mobile-First Design"
                    secondary="Fully responsive layouts optimized for all device sizes, from smartphones to desktops."
                  />
                </ListItem>
                <ListItem>
                  <ListIcon>
                    <CheckCircleOutlineIcon />
                  </ListIcon>
                  <ListItemText
                    primary="Firebase Hosting"
                    secondary="Deployed on Firebase for fast, reliable access with global content delivery."
                  />
                </ListItem>
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListIcon>
                    <CheckCircleOutlineIcon />
                  </ListIcon>
                  <ListItemText
                    primary="Structured Data"
                    secondary="Comprehensive pattern information stored in structured JSON format for easy maintenance."
                  />
                </ListItem>
                <ListItem>
                  <ListIcon>
                    <CheckCircleOutlineIcon />
                  </ListIcon>
                  <ListItemText
                    primary="Optimized Performance"
                    secondary="Fast loading and responsive interaction through efficient code and modern web techniques."
                  />
                </ListItem>
                <ListItem>
                  <ListIcon>
                    <CheckCircleOutlineIcon />
                  </ListIcon>
                  <ListItemText
                    primary="Accessibility"
                    secondary="Designed with accessibility in mind, following WCAG guidelines for inclusive user experience."
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" component="h2">
              Disclaimer
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" paragraph>
            The information provided on this site is for educational and reference purposes only. 
            Values listed are estimates based on market data and may fluctuate. We make no guarantees 
            regarding the accuracy of pricing information. Always consult with professional numismatic 
            experts for accurate appraisals of valuable currency.
          </Typography>
        </ContentPaper>
        
        <ContentPaper elevation={2}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HistoryIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h2">
                  Research Sources
                </Typography>
              </Box>
              <Typography variant="body2" paragraph>
                Our information is compiled from multiple authoritative sources on currency collecting, including:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="MyCurrencyCollection.com" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="CoinValueChecker.com" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Bureau of Engraving and Printing resources" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Auction records and collector forums" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Statistical analysis of pattern probabilities" />
                </ListItem>
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DataObjectIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h2">
                  Technical Details
                </Typography>
              </Box>
              <Typography variant="body2" paragraph>
                This application is built with modern web technologies to ensure a fast, responsive, and accessible experience:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="React.js frontend framework" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Material UI component library" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Chart.js for data visualizations" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Responsive design for all device sizes" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Firebase hosting for deployment" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </ContentPaper>
      </Container>
    </AboutContainer>
  );
};

export default About;