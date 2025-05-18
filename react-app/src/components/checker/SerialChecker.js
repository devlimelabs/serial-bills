import React, { useState } from 'react';
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
  Divider,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TollIcon from '@mui/icons-material/Toll';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

import { isValidSerialNumber, analyzeSerialNumber } from '../../utils/serialChecker';

const CheckerContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
}));

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

const ResultCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  overflow: 'visible',
  position: 'relative',
}));

const ResultBadge = styled(Box)(({ theme, valid }) => ({
  position: 'absolute',
  top: -20,
  left: 20,
  backgroundColor: valid ? theme.palette.success.main : theme.palette.error.main,
  color: 'white',
  borderRadius: 50,
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: theme.shadows[2],
}));

const ValueChip = styled(Chip)(({ theme, tier }) => {
  const getTierColor = (tier) => {
    switch (tier) {
      case 1:
        return theme.palette.error.main;
      case 2:
        return theme.palette.warning.main;
      case 3:
        return '#FF9800'; // Orange
      case 4:
        return theme.palette.success.main;
      case 5:
        return theme.palette.info.main;
      case 6:
        return theme.palette.text.secondary;
      default:
        return theme.palette.primary.main;
    }
  };

  return {
    backgroundColor: getTierColor(tier),
    color: 'white',
    fontWeight: 'bold',
    padding: theme.spacing(1, 2),
  };
});

const SerialDisplay = styled(Typography)(({ theme }) => ({
  fontFamily: "'Roboto Mono', monospace",
  fontSize: '1.75rem',
  fontWeight: 700,
  letterSpacing: '3px',
  color: theme.palette.primary.main,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  textAlign: 'center',
}));

const SerialChecker = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [serialInput, setSerialInput] = useState('');
  const [denomination, setDenomination] = useState('1');
  const [condition, setCondition] = useState('fine');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  const handleSerialChange = (e) => {
    setSerialInput(e.target.value.toUpperCase());
    // Clear error when typing
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate serial number format
    if (!isValidSerialNumber(serialInput)) {
      setError('Invalid serial number format. Please enter a valid format (e.g., A12345678B or A12345678*).');
      setResults(null);
      return;
    }
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        // Extract the 8-digit number part
        const serialNumber = serialInput.substring(1, 9);
        
        // Check for star note
        const isStar = serialInput.charAt(9) === '*';
        
        // Analyze the serial number
        const result = analyzeSerialNumber(serialNumber, denomination, condition, isStar);
        setResults(result);
        setError('');
      } catch (err) {
        setError('An error occurred while analyzing the serial number. Please try again.');
        setResults(null);
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  const renderPatternMatches = () => {
    if (!results || results.matchedPatterns.length === 0) {
      return (
        <Alert severity="info" sx={{ mt: 2 }}>
          No valuable patterns found in this serial number.
        </Alert>
      );
    }

    return (
      <List sx={{ width: '100%' }}>
        {results.matchedPatterns.map((pattern, index) => (
          <ListItem key={index} alignItems="flex-start" divider={index < results.matchedPatterns.length - 1}>
            <ListItemIcon>
              <TollIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                  <Typography variant="subtitle1" component="span" fontWeight="bold">
                    {pattern.name}
                  </Typography>
                  <ValueChip
                    label={`$${Math.round(pattern.baseValue).toLocaleString()}`}
                    tier={pattern.tier}
                    size="medium"
                  />
                </Box>
              }
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="body2" color="text.primary">
                    Tier {pattern.tier} • {results.isStar ? 'Star Note' : 'Regular Note'}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {pattern.description}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <CheckerContainer>
      <Container>
        <Typography variant="h2" component="h1" gutterBottom>
          Serial Number Checker
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Enter your bill's serial number to check for valuable patterns and get an estimated value.
          This tool analyzes the 8-digit portion to identify collectible patterns.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <FormPaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Enter Serial Number Details
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Find the serial number on your bill and enter it below, including the prefix and suffix letters.
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  label="Serial Number"
                  placeholder="A12345678B"
                  fullWidth
                  value={serialInput}
                  onChange={handleSerialChange}
                  margin="normal"
                  inputProps={{ maxLength: 10, style: { fontFamily: "'Roboto Mono', monospace" } }}
                  helperText="Format: Letter + 8 digits + Letter/Star (e.g., A12345678B or A12345678*)"
                  error={!!error}
                  required
                />

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="denomination-label">Denomination</InputLabel>
                      <Select
                        labelId="denomination-label"
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
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="condition-label">Condition</InputLabel>
                      <Select
                        labelId="condition-label"
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
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ mt: 3 }}
                  disabled={loading || !serialInput}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Check Serial Number'}
                </Button>
              </form>

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
            </FormPaper>

            <Alert severity="info" icon={<LocalAtmIcon />}>
              <Typography variant="body2">
                <strong>Privacy Note:</strong> All processing is done locally in your browser. 
                Your serial numbers are never stored or transmitted.
              </Typography>
            </Alert>
          </Grid>
          
          <Grid item xs={12} md={7}>
            {results ? (
              <ResultCard elevation={4}>
                <ResultBadge valid={results.matchedPatterns.length > 0}>
                  {results.matchedPatterns.length > 0 ? (
                    <CheckCircleOutlineIcon />
                  ) : (
                    <ErrorOutlineIcon />
                  )}
                </ResultBadge>
                
                <CardContent sx={{ pt: 3 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Analysis Results
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                    <SerialDisplay>
                      {serialInput.charAt(0)}<strong>{results.serialNumber}</strong>{serialInput.charAt(9)}
                    </SerialDisplay>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  {results.matchedPatterns.length > 0 ? (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle1">
                          Estimated Value:
                        </Typography>
                        <Typography variant="h4" component="p" color="primary" fontWeight="bold">
                          ${results.estimatedValue.toLocaleString()}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        This is an estimated value based on the pattern(s) detected, condition, and 
                        denomination. Actual market value may vary.
                      </Typography>
                      
                      <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                        Patterns Detected:
                      </Typography>
                      
                      {renderPatternMatches()}
                      
                      <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Value Factors:</strong> 
                          {results.isStar && " Star note (+50% value)"}
                          {` ${denomination === '1' ? 'One' : denomination === '2' ? 'Two' : denomination === '5' ? 'Five' : denomination === '10' ? 'Ten' : denomination === '20' ? 'Twenty' : denomination === '50' ? 'Fifty' : 'Hundred'} dollar denomination`}
                          {` in ${condition} condition (${results.conditionFactor * 100}% of max value)`}
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Alert severity="info" sx={{ mb: 2 }}>
                        This serial number doesn't contain any of the valuable patterns we track.
                      </Alert>
                      <Typography variant="body2" paragraph>
                        While this bill doesn't have a collectible pattern, it's worth at least its face value of ${denomination}.
                      </Typography>
                      <Typography variant="body2">
                        Try checking another bill or explore our pattern guide to learn about valuable serial numbers.
                      </Typography>
                    </>
                  )}
                </CardContent>
              </ResultCard>
            ) : (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'background.paper',
                  border: '1px dashed',
                  borderColor: 'divider',
                }}
              >
                <LocalAtmIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Enter a serial number to get started
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  The checker will analyze your bill and identify any valuable patterns
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </CheckerContainer>
  );
};

export default SerialChecker;