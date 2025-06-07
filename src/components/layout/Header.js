import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Container,
  useMediaQuery,
  useScrollTrigger,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CloseIcon from '@mui/icons-material/Close';

const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  transition: 'all 0.3s ease',
  boxShadow: scrolled ? theme.shadows[4] : 'none',
  backgroundColor: scrolled 
    ? 'rgba(255, 255, 255, 0.98)' 
    : 'transparent',
  backdropFilter: scrolled ? 'blur(10px)' : 'none',
  padding: scrolled ? '0' : theme.spacing(1, 0),
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  fontSize: '0.95rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  padding: theme.spacing(1, 2),
  borderRadius: 8,
  position: 'relative',
  transition: 'all 0.2s ease',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: active ? '30px' : '0',
    height: '3px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '3px 3px 0 0',
    transition: 'width 0.2s ease',
  },
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
    '&::after': {
      width: '30px',
    },
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
  },
  color: theme.palette.text.primary,
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  width: 280,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  return React.cloneElement(children, {
    scrolled: trigger,
  });
}

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const navigationLinks = [
    { text: 'Home', path: '/' },
    { text: 'Check Serial', path: '/checker', highlight: true },
    { text: 'Patterns', path: '/patterns' },
    { text: 'Value Guide', path: '/tiers' },
    { text: 'Learn', path: '/guide' },
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <ElevationScroll>
        <StyledAppBar position="fixed" color="default">
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ minHeight: { xs: 64, sm: 70 } }}>
              <LogoContainer component={RouterLink} to="/">
                <MonetizationOnIcon 
                  sx={{ 
                    fontSize: 32,
                    color: (theme) => theme.palette.primary.main,
                  }} 
                />
                <Box>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: 800,
                      background: (theme) => theme.custom.gradients.primary,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: 1,
                    }}
                  >
                    SerialValue
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    US Currency Guide
                  </Typography>
                </Box>
              </LogoContainer>

              <Box sx={{ flexGrow: 1 }} />

              {!isMobile && (
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {navigationLinks.map((link) => (
                    <NavButton
                      key={link.path}
                      component={RouterLink}
                      to={link.path}
                      active={location.pathname === link.path}
                      variant={link.highlight ? 'contained' : 'text'}
                      color={link.highlight ? 'primary' : 'inherit'}
                      sx={link.highlight ? { 
                        boxShadow: (theme) => theme.shadows[2],
                        '&::after': { display: 'none' }
                      } : {}}
                    >
                      {link.text}
                    </NavButton>
                  ))}
                </Box>
              )}

              <MobileMenuButton
                edge="end"
                aria-label="menu"
                onClick={() => setMobileMenuOpen(true)}
              >
                <MenuIcon />
              </MobileMenuButton>
            </Toolbar>
          </Container>
        </StyledAppBar>
      </ElevationScroll>

      {/* Spacer for fixed AppBar */}
      <Toolbar sx={{ minHeight: { xs: 64, sm: 70 } }} />

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
          }
        }}
      >
        <DrawerContent>
          <DrawerHeader>
            <LogoContainer>
              <MonetizationOnIcon 
                sx={{ 
                  fontSize: 28,
                  color: (theme) => theme.palette.primary.main,
                }} 
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: 'primary.main',
                }}
              >
                SerialValue
              </Typography>
            </LogoContainer>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </DrawerHeader>
          
          <List sx={{ pt: 2 }}>
            {navigationLinks.map((link) => (
              <React.Fragment key={link.path}>
                <ListItemButton 
                  component={RouterLink} 
                  to={link.path}
                  selected={location.pathname === link.path}
                  sx={{
                    mx: 2,
                    mb: 1,
                    borderRadius: 2,
                    backgroundColor: link.highlight ? 'primary.main' : 'transparent',
                    color: link.highlight ? 'primary.contrastText' : 'text.primary',
                    '&:hover': {
                      backgroundColor: link.highlight 
                        ? 'primary.dark' 
                        : 'grey.100',
                    },
                    '&.Mui-selected': {
                      backgroundColor: location.pathname === link.path && !link.highlight
                        ? 'grey.100' 
                        : link.highlight 
                        ? 'primary.main' 
                        : 'transparent',
                    },
                  }}
                >
                  <ListItemText 
                    primary={link.text} 
                    primaryTypographyProps={{
                      fontWeight: link.highlight || location.pathname === link.path ? 600 : 500,
                    }}
                  />
                </ListItemButton>
                {link.highlight && <Divider sx={{ mx: 3, my: 2 }} />}
              </React.Fragment>
            ))}
          </List>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;