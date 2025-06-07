import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Alert,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Fade,
  Zoom,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoIcon from '@mui/icons-material/Info';
import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { isValidSerialNumber, analyzeSerialNumber } from '../../utils/serialChecker';

const MainContainer = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
  backgroundColor: theme.palette.background.default,
}));

const SerialInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    fontSize: '1.75rem',
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 600,
    letterSpacing: '0.15em',
    '& input': {
      textAlign: 'center',
      textTransform: 'uppercase',
      padding: theme.spacing(3),
    },
  },
  '& .MuiFormHelperText-root': {
    textAlign: 'center',
    marginTop: theme.spacing(1),
  },
}));

const ResultCard = styled(Card)(({ theme, hasValue }) => ({
  marginTop: theme.spacing(4),
  borderRadius: 16,
  border: `2px solid ${hasValue ? theme.palette.success.main : theme.palette.grey[300]}`,
  backgroundColor: hasValue ? `${theme.palette.success.main}08` : theme.palette.background.paper,
  transition: 'all 0.3s ease',
  overflow: 'visible',
}));

const ValueDisplay = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  borderRadius: 16,
  background: theme.custom.gradients.primary,
  color: 'white',
  marginBottom: theme.spacing(3),
}));

const PatternCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    boxShadow: theme.shadows[2],
  },
}));

const TierBadge = styled(Chip)(({ theme, tier }) => {
  const getColor = () => {
    switch (tier) {
      case 1: return theme.palette.error.main;
      case 2: return theme.palette.warning.main;
      case 3: return '#FF9800';
      case 4: return theme.palette.success.main;
      case 5: return theme.palette.info.main;
      case 6: return theme.palette.grey[600];
      default: return theme.palette.primary.main;
    }
  };

  return {
    backgroundColor: getColor(),
    color: 'white',
    fontWeight: 700,
    fontSize: '0.875rem',
  };
});

const SerialDisplay = styled(Typography)(({ theme }) => ({
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '2rem',
  fontWeight: 700,
  letterSpacing: '0.2em',
  color: theme.palette.primary.main,
  padding: theme.spacing(2),
  borderRadius: 8,
  backgroundColor: theme.palette.grey[50],
  border: `2px solid ${theme.palette.primary.main}`,
  display: 'inline-block',
}));

const SerialChecker = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  
  const [serialInput, setSerialInput] = useState('');
  const [denomination, setDenomination] = useState('1');
  const [condition, setCondition] = useState('fine');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  useEffect(() => {
    const serialParam = searchParams.get('serial');
    if (serialParam) {
      setSerialInput(serialParam.toUpperCase());
      handleAnalyze(serialParam.toUpperCase());
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSerialChange = (e) => {
    const value = e.target.value.toUpperCase();
    setSerialInput(value);
    setError('');
    
    // Real-time validation feedback
    if (value.length === 10) {
      if (!isValidSerialNumber(value)) {
        setError('Invalid format. Use: Letter + 8 digits + Letter/Star');
      }
    }
  };

  const handleAnalyze = (serial = serialInput) => {
    if (!serial) {
      setError('Please enter a serial number');
      return;
    }
    
    if (!isValidSerialNumber(serial)) {
      setError('Invalid serial number format');
      return;
    }
    
    setLoading(true);
    setResults(null);
    
    // Simulate API processing
    setTimeout(() => {
      try {
        const serialNumber = serial.substring(1, 9);
        const isStar = serial.charAt(9) === '*';
        const result = analyzeSerialNumber(serialNumber, denomination, condition, isStar);
        setResults(result);
        setError('');
      } catch (err) {
        setError('An error occurred while analyzing the serial number');
        setResults(null);
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  const handleCopySerial = () => {
    navigator.clipboard.writeText(serialInput);
  };

  const handleClear = () => {
    setSerialInput('');
    setResults(null);
    setError('');
  };

  return (
    <MainContainer>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
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
            }}
          >
            Serial Number Checker
          </Typography>
          <Typography variant="h5" color="text.secondary" fontWeight={400}>
            Instantly discover if your bills have valuable patterns
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                borderRadius: 4,
                border: `2px solid ${theme.palette.divider}`,
              }}
            >
              <form onSubmit={(e) => { e.preventDefault(); handleAnalyze(); }}>
                <SerialInput
                  autoFocus
                  fullWidth
                  label="Serial Number"
                  placeholder="A12345678B"
                  value={serialInput}
                  onChange={handleSerialChange}
                  error={!!error}
                  helperText={error || "Format: Letter + 8 digits + Letter or Star"}
                  inputProps={{ 
                    maxLength: 10,
                    autoComplete: 'off',
                  }}
                  InputProps={{
                    endAdornment: serialInput && (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClear} size="small">
                          <ClearIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Denomination</InputLabel>
                      <Select
                        value={denomination}
                        onChange={(e) => setDenomination(e.target.value)}
                        label="Denomination"
                      >
                        <MenuItem value="1">$1</MenuItem>
                        <MenuItem value="2">$2</MenuItem>
                        <MenuItem value="5">$5</MenuItem>
                        <MenuItem value="10">$10</MenuItem>
                        <MenuItem value="20">$20</MenuItem>
                        <MenuItem value="50">$50</MenuItem>
                        <MenuItem value="100">$100</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Condition</InputLabel>
                      <Select
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        label="Condition"
                      >
                        <MenuItem value="uncirculated">Uncirculated</MenuItem>
                        <MenuItem value="excellent">Excellent</MenuItem>
                        <MenuItem value="fine">Fine</MenuItem>
                        <MenuItem value="fair">Fair</MenuItem>
                        <MenuItem value="poor">Poor</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading || !serialInput || !!error}
                  sx={{ 
                    mt: 3,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                  }}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CheckCircleIcon />}
                >
                  {loading ? 'Analyzing...' : 'Check Value'}
                </Button>
              </form>

              <Alert 
                severity="info" 
                icon={<InfoIcon />}
                sx={{ 
                  mt: 3,
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2">
                  <strong>Privacy First:</strong> All processing happens in your browser. 
                  Your data is never sent to any server.
                </Typography>
              </Alert>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={7}>
            {loading && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  minHeight: 400,
                }}
              >
                <CircularProgress size={60} />
              </Box>
            )}

            {results && !loading && (
              <Fade in timeout={600}>
                <ResultCard hasValue={results.matchedPatterns.length > 0}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                      <SerialDisplay>
                        {serialInput}
                      </SerialDisplay>
                      <IconButton onClick={handleCopySerial} sx={{ ml: 2 }}>
                        <ContentCopyIcon />
                      </IconButton>
                    </Box>

                    {results.matchedPatterns.length > 0 ? (
                      <>
                        <ValueDisplay>
                          <Typography variant="h6" sx={{ mb: 1, opacity: 0.9 }}>
                            Estimated Value
                          </Typography>
                          <Typography variant="h2" component="div" sx={{ fontWeight: 900 }}>
                            ${results.estimatedValue.toLocaleString()}
                          </Typography>
                          <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Chip 
                              icon={<MonetizationOnIcon />} 
                              label={`$${denomination} Bill`}
                              sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                            />
                            <Chip 
                              icon={<TrendingUpIcon />}
                              label={`${condition.charAt(0).toUpperCase() + condition.slice(1)} Condition`}
                              sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                            />
                            {results.isStar && (
                              <Chip 
                                icon={<AutoAwesomeIcon />}
                                label="Star Note"
                                sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                              />
                            )}
                          </Box>
                        </ValueDisplay>

                        <Typography variant="h5" gutterBottom fontWeight={700}>
                          Patterns Found ({results.matchedPatterns.length})
                        </Typography>

                        {results.matchedPatterns.map((pattern, index) => (
                          <Zoom in timeout={300 + index * 100} key={index}>
                            <PatternCard>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="h6" fontWeight={700} gutterBottom>
                                    {pattern.name}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" paragraph>
                                    {pattern.description}
                                  </Typography>
                                  <Typography variant="body2" fontWeight={600}>
                                    Base Value: ${Math.round(pattern.baseValue).toLocaleString()}
                                  </Typography>
                                </Box>
                                <TierBadge 
                                  label={`Tier ${pattern.tier}`}
                                  tier={pattern.tier}
                                  size="medium"
                                />
                              </Box>
                            </PatternCard>
                          </Zoom>
                        ))}
                      </>
                    ) : (
                      <Box textAlign="center" py={6}>
                        <CancelIcon sx={{ fontSize: 80, color: theme.palette.grey[400], mb: 2 }} />
                        <Typography variant="h5" gutterBottom fontWeight={700}>
                          No Special Patterns Detected
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                          This serial number doesn't contain any of the valuable patterns we track.
                          It's worth its face value of ${denomination}.
                        </Typography>
                        <Button
                          variant="outlined"
                          onClick={handleClear}
                          sx={{ mt: 2 }}
                        >
                          Try Another Serial
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </ResultCard>
              </Fade>
            )}

            {!results && !loading && (
              <Paper
                elevation={0}
                sx={{
                  p: 8,
                  textAlign: 'center',
                  borderRadius: 4,
                  border: `2px dashed ${theme.palette.divider}`,
                  backgroundColor: theme.palette.grey[50],
                }}
              >
                <MonetizationOnIcon sx={{ fontSize: 80, color: theme.palette.grey[400], mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight={700} color="text.secondary">
                  Enter a Serial Number
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We'll analyze it instantly for valuable patterns
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </MainContainer>
  );
};

export default SerialChecker;