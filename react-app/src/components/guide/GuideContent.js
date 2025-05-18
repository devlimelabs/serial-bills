import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Breadcrumbs,
  Link,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Drawer,
  IconButton,
  Grid,
  useTheme,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// Sample guide content (in a real app, this would be loaded from an API or file)
const guideMarkdown = `
# The Collector's Guide to Valuable US Currency Serial Numbers

## Introduction

The world of currency collecting extends far beyond rare denominations and historical specimens. For many enthusiasts, the fascination lies in the seemingly random combination of numbers and letters printed on every bill. These serial numbers, far from being merely functional identifiers, can transform an ordinary dollar bill into a prized collectible worth hundreds or even thousands of times its face value.

Serial numbers serve a practical purpose—they allow the Bureau of Engraving and Printing to track production and prevent counterfeiting. Yet within these digits lies a universe of patterns, coincidences, and numerical curiosities that have captivated collectors for generations. From perfectly sequential ladders to solid repeating digits, these "fancy" serial numbers represent a specialized niche in numismatic collecting that combines mathematical intrigue with financial opportunity.

This comprehensive guide explores the fascinating realm of valuable US currency serial numbers. We'll journey through the various patterns that command premiums in the collector market, examine the factors that influence their value, and provide insights into how to identify these hidden treasures that might be sitting in your wallet right now. Whether you're a seasoned collector or simply curious about the potential value of the cash in your possession, this guide will equip you with the knowledge to recognize currency whose worth extends far beyond its purchasing power.

## Understanding US Currency Serial Numbers

Before diving into specific valuable patterns, it's essential to understand the basic structure and significance of US currency serial numbers. Each Federal Reserve Note features a unique serial number consisting of eight digits preceded by a letter and followed by another letter. These alphanumeric combinations serve multiple purposes beyond simple identification.

The first letter in the serial number corresponds to the Federal Reserve Bank that issued the note. For example, 'A' represents Boston, 'B' denotes New York, and so on through 'L' for San Francisco. The final letter was historically part of a complex system to track production but now primarily serves as an extension of the serial number itself.

Modern US currency is printed in large sheets, with each denomination having its own production process. Historically, notes were printed to the full range of 99,999,999 for each series and prefix combination. However, in recent decades, production typically stops at 96,000,000 for most series, making certain high serial numbers increasingly difficult to find.

Serial numbers also help identify replacement notes, commonly known as "star notes." These special bills, marked with a star symbol (★) at the end of the serial number instead of a letter, replace damaged notes during the printing process. Star notes with fancy serial numbers represent a double rarity that can significantly enhance collector value.

Understanding these fundamentals provides the foundation for recognizing and appreciating the various patterns that follow. Now, let's explore the most valuable and sought-after serial number configurations in the collector market.

## Tier 1: Extremely Valuable Patterns ($1,000+)

### Solid Serial Numbers

Among the most prized possessions in currency collecting are solid serial numbers—bills where all eight digits are identical. These numerical unicorns represent the pinnacle of serial number collecting, commanding prices that can reach astronomical heights relative to face value.

Imagine holding a crisp $1 bill with the serial number 88888888. This isn't just currency; it's a mathematical marvel with odds of occurrence at approximately 1 in 11 million for any specific solid number. The rarity of these notes is compounded by production limitations—modern currency rarely reaches the full 99,999,999 range, making solid 9s particularly elusive.

The value of solid serial numbers varies significantly based on several factors. The digit itself plays a role, with 9s typically commanding the highest premiums due to their scarcity in modern printing. The denomination affects value as well—while a $1 bill with solid 7s might sell for $1,500-$3,000 in uncirculated condition, the same pattern on a $100 bill could fetch substantially more from the right collector.

Condition is paramount for maximizing value. A solid serial number note with creases, stains, or other imperfections will sell for significantly less than a pristine example. For serious collectors, only bills in Gem Uncirculated condition (with perfect centering, bright paper, and sharp corners) will suffice for these trophy notes.

Historical sales have demonstrated the extraordinary premium these notes can command. In specialized auctions, solid 8s (considered lucky in Chinese culture) have sold for upwards of $8,888, while perfect solid 7s have changed hands for similar amounts. The most spectacular sales have involved solid 1s, with documented transactions exceeding $15,000 for perfect examples.

For the average person, finding a solid serial number in circulation is akin to winning a lottery. These notes are typically pulled from circulation by bank employees or knowledgeable cash handlers long before they reach the general public. Nevertheless, the possibility, however remote, adds an element of treasure hunting to everyday transactions.
`;

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'understanding', label: 'Understanding Serial Numbers' },
  { id: 'tier-1', label: 'Tier 1: Extremely Valuable' },
  { id: 'tier-2', label: 'Tier 2: Very Valuable' },
  { id: 'tier-3', label: 'Tier 3: Valuable' },
  { id: 'tier-4', label: 'Tier 4: Moderately Valuable' },
  { id: 'tier-5', label: 'Tier 5: Slightly Valuable' },
  { id: 'tier-6', label: 'Tier 6: Variable Value' },
  { id: 'factors', label: 'Factors Affecting Value' },
  { id: 'conclusion', label: 'Conclusion' },
];

const GuideContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
}));

const TableOfContents = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  position: 'sticky',
  top: 90,
  maxHeight: 'calc(100vh - 120px)',
  overflowY: 'auto',
}));

const MarkdownContent = styled(Box)(({ theme }) => ({
  '& h1': {
    ...theme.typography.h3,
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
  },
  '& h2': {
    ...theme.typography.h4,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  '& h3': {
    ...theme.typography.h5,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.dark,
  },
  '& p': {
    ...theme.typography.body1,
    marginBottom: theme.spacing(2),
  },
  '& ul, & ol': {
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
  },
  '& li': {
    ...theme.typography.body1,
    marginBottom: theme.spacing(1),
  },
  '& img': {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
  },
  '& blockquote': {
    borderLeft: `4px solid ${theme.palette.primary.light}`,
    paddingLeft: theme.spacing(2),
    margin: theme.spacing(2, 0),
    color: theme.palette.text.secondary,
  },
}));

const GuideContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('introduction');

  // Simulate loading content
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const renderTableOfContents = () => {
    return (
      <List component="nav" aria-label="guide sections" dense={isMobile}>
        {sections.map((section) => (
          <ListItem key={section.id} disablePadding>
            <ListItemButton
              selected={activeSection === section.id}
              onClick={() => handleSectionClick(section.id)}
              sx={{
                borderLeft: '3px solid',
                borderColor: activeSection === section.id ? 'primary.main' : 'transparent',
                bgcolor: activeSection === section.id ? 'rgba(0, 77, 64, 0.08)' : 'transparent',
              }}
            >
              <ListItemText primary={section.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <GuideContainer>
      <Container>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Typography color="text.primary">Collector's Guide</Typography>
        </Breadcrumbs>

        {/* Mobile ToC toggle */}
        {isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="h1">
              Collector's Guide
            </Typography>
            <IconButton 
              onClick={toggleDrawer}
              sx={{ 
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}

        <Grid container spacing={4}>
          {/* Sidebar / Table of Contents */}
          {!isMobile && (
            <Grid item xs={12} md={3}>
              <TableOfContents elevation={2}>
                <Typography variant="h6" gutterBottom>
                  Table of Contents
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {renderTableOfContents()}
              </TableOfContents>
            </Grid>
          )}

          {/* Mobile drawer for ToC */}
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
          >
            <Box sx={{ width: 250, p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Table of Contents
                </Typography>
                <IconButton onClick={toggleDrawer}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {renderTableOfContents()}
            </Box>
          </Drawer>

          {/* Main content */}
          <Grid item xs={12} md={9}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Paper elevation={2} sx={{ p: 4 }}>
                <MarkdownContent>
                  <ReactMarkdown>
                    {guideMarkdown}
                  </ReactMarkdown>
                </MarkdownContent>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </GuideContainer>
  );
};

export default GuideContent;