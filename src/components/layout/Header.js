import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  Chip,
  useMediaQuery,
  useScrollTrigger,
  Slide
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { usePatterns } from '../../context/PatternContext';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.primary.main,
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
}));

const NavButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginLeft: theme.spacing(2),
  '& > *': {
    marginLeft: theme.spacing(1),
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
  },
  color: theme.palette.common.white,
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  maxWidth: 400,
  '& .MuiOutlinedInput-root': {
    color: theme.palette.common.white,
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputAdornment-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0, 6),
  backgroundImage: 'linear-gradient(rgba(0, 77, 64, 0.9), rgba(0, 77, 64, 0.8))',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: theme.palette.common.white,
  textAlign: 'center',
}));

const QuickFilterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(3),
}));

// Hide on scroll component
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const location = useLocation();
  const { filterPatterns, searchTerm, setSearchTerm } = usePatterns();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isHomePage = location.pathname === '/';

  // Synchronize search input with context
  useEffect(() => {
    setSearchValue(searchTerm);
  }, [searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    filterPatterns({ search: searchValue });
  };

  const handleQuickFilter = (filter) => {
    if (filter === 'tier-1') {
      filterPatterns({ tier: 1 });
    } else {
      filterPatterns({ 
        pattern: filter 
      });
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navigationLinks = [
    { text: 'Patterns', path: '/patterns' },
    { text: 'Value Tiers', path: '/tiers' },
    { text: 'Serial Checker', path: '/checker' },
    { text: 'Guide', path: '/guide' },
    { text: 'About', path: '/about' },
  ];

  const quickFilters = [
    { label: 'Extremely Valuable', value: 'tier-1' },
    { label: 'Solid Numbers', value: 'solid' },
    { label: 'Ladders', value: 'ladder' },
    { label: 'Binary', value: 'binary' },
    { label: 'Radar', value: 'radar' },
  ];

  return (
    <>
      <HideOnScroll>
        <StyledAppBar position="sticky">
          <Toolbar>
            <MobileMenuButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileMenu}
            >
              <MenuIcon />
            </MobileMenuButton>
            
            <LogoContainer>
              <MonetizationOnOutlinedIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  fontWeight: 700,
                }}
              >
                Currency Serial Guide
              </Typography>
            </LogoContainer>

            <NavButtons>
              {navigationLinks.map((link) => (
                <Button
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                  color="inherit"
                  sx={{
                    borderBottom: location.pathname === link.path ? '3px solid' : 'none',
                    borderColor: 'secondary.main',
                    borderRadius: 0,
                    paddingBottom: '3px',
                  }}
                >
                  {link.text}
                </Button>
              ))}
            </NavButtons>

            <Box sx={{ flexGrow: 1 }} />

            {!isMobile && (
              <Box sx={{ maxWidth: 300 }}>
                <form onSubmit={handleSearchSubmit}>
                  <SearchBar
                    placeholder="Search patterns..."
                    size="small"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            color="inherit"
                            type="submit"
                            aria-label="search"
                          >
                            <SearchIcon sx={{ color: 'white' }} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </form>
              </Box>
            )}
          </Toolbar>
        </StyledAppBar>
      </HideOnScroll>

      {/* Mobile drawer menu */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={closeMobileMenu}
        >
          <List>
            {navigationLinks.map((link) => (
              <ListItem 
                button 
                key={link.path} 
                component={RouterLink} 
                to={link.path}
                selected={location.pathname === link.path}
              >
                <ListItemText primary={link.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Hero section only on home page */}
      {isHomePage && (
        <HeroSection>
          <Container maxWidth="md">
            <Typography variant="h1" component="h1" gutterBottom>
              US Currency Serial Number Patterns
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
              Discover the hidden value in your wallet
            </Typography>
            
            {/* Search form for home page */}
            <Box sx={{ mt: 3, mx: 'auto', maxWidth: 500 }}>
              <form onSubmit={handleSearchSubmit}>
                <TextField
                  fullWidth
                  placeholder="Search patterns, values, or examples..."
                  variant="outlined"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          type="submit"
                          color="primary"
                          aria-label="search"
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { 
                      backgroundColor: 'white',
                      borderRadius: 1 
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'transparent',
                      },
                    },
                  }}
                />
              </form>
            </Box>
            
            {/* Quick filter buttons */}
            <QuickFilterContainer>
              {quickFilters.map((filter) => (
                <Chip
                  key={filter.value}
                  label={filter.label}
                  onClick={() => handleQuickFilter(filter.value)}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                />
              ))}
            </QuickFilterContainer>
          </Container>
        </HeroSection>
      )}
    </>
  );
};

export default Header;