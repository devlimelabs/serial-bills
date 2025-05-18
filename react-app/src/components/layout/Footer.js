import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Link, 
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.dark,
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MonetizationOnOutlinedIcon sx={{ mr: 1 }} />
              <Typography variant="h6" component="div" fontWeight="bold">
                Currency Serial Guide
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              The ultimate resource for identifying and valuing collectible US currency serial number patterns.
            </Typography>
            <Typography variant="body2">
              © {new Date().getFullYear()} Currency Serial Guide
            </Typography>
          </Grid>

          <Grid item xs={6} sm={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Navigation
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/" color="inherit" underline="hover">
                  Home
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/patterns" color="inherit" underline="hover">
                  Patterns
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/tiers" color="inherit" underline="hover">
                  Value Tiers
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/checker" color="inherit" underline="hover">
                  Serial Checker
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6} sm={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Resources
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/guide" color="inherit" underline="hover">
                  Collector's Guide
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/about" color="inherit" underline="hover">
                  About
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="https://www.bep.gov/" target="_blank" rel="noopener" color="inherit" underline="hover">
                  Bureau of Engraving
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="https://www.uspapermoney.info/" target="_blank" rel="noopener" color="inherit" underline="hover">
                  US Paper Money Info
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              About This Project
            </Typography>
            <Typography variant="body2" paragraph>
              This site provides a comprehensive guide to valuable US currency serial number patterns, 
              helping collectors identify and value bills based on their unique numerical sequences.
            </Typography>
            <Typography variant="body2">
              Information is for educational purposes only and market values may fluctuate.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255,255,255,0.1)' }} />

        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center'
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Currency Serial Guide
          </Typography>
          <Box sx={{ display: 'flex', mt: isMobile ? 2 : 0 }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              <Link color="inherit" underline="hover" href="#">
                Privacy Policy
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link color="inherit" underline="hover" href="#">
                Terms of Use
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;