import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Link,
  IconButton,
  useTheme,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const FooterContainer = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(6, 0, 4),
}));

const LogoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const LinkGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  fontSize: '0.95rem',
  fontWeight: 500,
  transition: 'color 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  transition: 'all 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'translateY(-2px)',
  },
}));

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { text: 'Serial Checker', path: '/checker' },
    { text: 'Pattern Guide', path: '/patterns' },
    { text: 'Value Tiers', path: '/tiers' },
    { text: 'Learn', path: '/guide' },
    { text: 'About', path: '/about' },
  ];

  const socialLinks = [
    { icon: <GitHubIcon />, url: 'https://github.com', label: 'GitHub' },
    { icon: <TwitterIcon />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <EmailIcon />, url: 'mailto:contact@serialvalue.com', label: 'Email' },
  ];

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', md: 'flex-start' },
          textAlign: { xs: 'center', md: 'left' },
          gap: 4,
        }}>
          {/* Left Section */}
          <Box>
            <LogoSection>
              <MonetizationOnIcon 
                sx={{ 
                  fontSize: 28,
                  color: theme.palette.primary.main,
                }} 
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  background: theme.custom.gradients.primary,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                SerialValue
              </Typography>
            </LogoSection>
            
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mb: 3, maxWidth: 300 }}
            >
              The #1 resource for identifying and valuing US currency serial number patterns.
            </Typography>

            <Stack direction="row" spacing={1}>
              {socialLinks.map((social) => (
                <SocialButton
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  size="small"
                >
                  {social.icon}
                </SocialButton>
              ))}
            </Stack>
          </Box>

          {/* Right Section */}
          <Box>
            <LinkGroup>
              {footerLinks.map((link) => (
                <FooterLink
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                >
                  {link.text}
                </FooterLink>
              ))}
            </LinkGroup>

            <Box sx={{ 
              pt: 3, 
              borderTop: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: { xs: 'center', md: 'flex-end' },
              alignItems: 'center',
              gap: 2,
            }}>
              <Typography variant="caption" color="text.secondary">
                © {currentYear} SerialValue. All rights reserved.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FooterLink href="#" variant="caption">
                  Privacy Policy
                </FooterLink>
                <Typography variant="caption" color="text.secondary">•</Typography>
                <FooterLink href="#" variant="caption">
                  Terms of Service
                </FooterLink>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;