import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0066FF',
      light: '#3380FF',
      dark: '#0052CC',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF4757',
      light: '#FF6B7A',
      dark: '#E32F3F',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FAFBFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1F36',
      secondary: '#6B7394',
    },
    success: {
      main: '#00D68F',
      light: '#00E5A0',
      dark: '#00BA7C',
    },
    warning: {
      main: '#FFB400',
      light: '#FFCC00',
      dark: '#E6A200',
    },
    error: {
      main: '#FF3A44',
      light: '#FF5A63',
      dark: '#E6232D',
    },
    info: {
      main: '#6C5CE7',
      light: '#8B7EF0',
      dark: '#5243D0',
    },
    divider: '#E4E7EB',
    grey: {
      50: '#F8F9FA',
      100: '#F1F3F5',
      200: '#E4E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      '@media (max-width:768px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      '@media (max-width:768px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      '@media (max-width:768px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      letterSpacing: '-0.005em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      letterSpacing: '-0.005em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '-0.005em',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '-0.005em',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    '0px 4px 6px rgba(0, 0, 0, 0.07), 0px 2px 4px rgba(0, 0, 0, 0.06)',
    '0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)',
    '0px 20px 25px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.04)',
    '0px 25px 50px rgba(0, 0, 0, 0.12), 0px 15px 20px rgba(0, 0, 0, 0.08)',
    '0px 30px 60px rgba(0, 0, 0, 0.15), 0px 20px 30px rgba(0, 0, 0, 0.1)',
    '0px 40px 80px rgba(0, 0, 0, 0.18), 0px 25px 40px rgba(0, 0, 0, 0.12)',
    '0px 50px 100px rgba(0, 0, 0, 0.2), 0px 30px 50px rgba(0, 0, 0, 0.15)',
    // Continue the pattern...
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontSize: '0.875rem',
          fontWeight: 600,
          transition: 'all 0.2s ease',
          textTransform: 'none',
          boxShadow: 'none',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0052CC 0%, #0041A3 100%)',
            transform: 'translateY(-1px)',
            boxShadow: '0px 4px 12px rgba(0, 102, 255, 0.3)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #FF4757 0%, #E32F3F 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #E32F3F 0%, #CC1F2F 100%)',
            transform: 'translateY(-1px)',
            boxShadow: '0px 4px 12px rgba(255, 71, 87, 0.3)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            transform: 'translateY(-1px)',
          },
        },
        sizeLarge: {
          padding: '14px 28px',
          fontSize: '1rem',
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.75rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: '#FAFBFC',
            '& fieldset': {
              borderColor: '#E4E7EB',
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: '#C3C8CF',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0066FF',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          border: 'none',
        },
        filled: {
          backgroundColor: '#F1F3F5',
          color: '#374151',
          '&:hover': {
            backgroundColor: '#E4E7EB',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.05)',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(8px)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#E4E7EB',
        },
      },
    },
  },
});

// Custom breakpoints for better responsive design
theme.breakpoints.values = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Add custom theme properties
theme.custom = {
  gradients: {
    primary: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)',
    secondary: 'linear-gradient(135deg, #FF4757 0%, #E32F3F 100%)',
    success: 'linear-gradient(135deg, #00D68F 0%, #00BA7C 100%)',
    warning: 'linear-gradient(135deg, #FFB400 0%, #E6A200 100%)',
    error: 'linear-gradient(135deg, #FF3A44 0%, #E6232D 100%)',
    info: 'linear-gradient(135deg, #6C5CE7 0%, #5243D0 100%)',
  },
  animation: {
    duration: {
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
      decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
};

export default theme;