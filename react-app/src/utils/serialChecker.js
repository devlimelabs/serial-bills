import { serialNumberPatterns } from '../data/patterns';

// Validate serial number format (letter + 8 digits + letter or star)
export const isValidSerialNumber = (serial) => {
  return /^[A-Z][0-9]{8}[A-Z*]$/.test(serial);
};

// Get condition factor for value calculations
export const getConditionFactor = (condition) => {
  switch (condition) {
    case 'uncirculated':
      return 1.0;  // Full value
    case 'excellent':
      return 0.7;  // 70% of full value
    case 'fine':
      return 0.5;  // 50% of full value
    case 'fair':
      return 0.3;  // 30% of full value
    case 'poor':
      return 0.1;  // 10% of full value
    default:
      return 0.5;  // Default to fine
  }
};

// Get denomination factor for value calculations
export const getDenominationFactor = (denomination) => {
  switch (denomination) {
    case '1':
      return 1.0;  // Standard value
    case '2':
      return 1.2;  // 20% premium
    case '5':
      return 1.1;  // 10% premium
    case '10':
      return 1.0;  // Standard value
    case '20':
      return 0.9;  // 10% discount (more common)
    case '50':
      return 1.2;  // 20% premium
    case '100':
      return 1.3;  // 30% premium
    default:
      return 1.0;  // Default
  }
};

// Calculate pattern value based on pattern, denomination, condition, and star note status
export const calculatePatternValue = (pattern, denomination, condition, isStar) => {
  const baseValue = (pattern.value_range.min + pattern.value_range.max) / 2;
  const conditionFactor = getConditionFactor(condition);
  const denominationFactor = getDenominationFactor(denomination);
  const starFactor = isStar ? 1.5 : 1.0;  // 50% premium for star notes
  
  return baseValue * conditionFactor * denominationFactor * starFactor;
};

// Analyze a serial number to identify valuable patterns
export const analyzeSerialNumber = (serialNumber, denomination, condition, isStar) => {
  const results = {
    serialNumber,
    denomination,
    condition,
    isStar,
    matchedPatterns: [],
    estimatedValue: 0,
    conditionFactor: getConditionFactor(condition)
  };
  
  // Check for solid serial number
  if (/^(\d)\1{7}$/.test(serialNumber)) {
    const pattern = serialNumberPatterns.patterns.find(p => p.name === "Solid Serial Numbers");
    if (pattern) {
      results.matchedPatterns.push({
        name: pattern.name,
        tier: pattern.tier,
        baseValue: calculatePatternValue(pattern, denomination, condition, isStar),
        description: pattern.description
      });
    }
  }
  
  // Check for perfect ladder (ascending)
  if (serialNumber === "12345678") {
    const pattern = serialNumberPatterns.patterns.find(p => p.name === "Perfect Ladder Serial Numbers");
    if (pattern) {
      results.matchedPatterns.push({
        name: pattern.name + " (Ascending)",
        tier: pattern.tier,
        baseValue: calculatePatternValue(pattern, denomination, condition, isStar),
        description: pattern.description
      });
    }
  }
  
  // Check for perfect ladder (descending)
  if (serialNumber === "98765432") {
    const pattern = serialNumberPatterns.patterns.find(p => p.name === "Perfect Ladder Serial Numbers");
    if (pattern) {
      results.matchedPatterns.push({
        name: pattern.name + " (Descending)",
        tier: pattern.tier,
        baseValue: calculatePatternValue(pattern, denomination, condition, isStar) * 1.2, // Descending worth more
        description: pattern.description
      });
    }
  }
  
  // Check for low serial number (7 zeros)
  if (/^0{7}[1-9]$/.test(serialNumber)) {
    const pattern = serialNumberPatterns.patterns.find(p => p.name === "Low Serial Numbers (00000001-00000009)");
    if (pattern) {
      const lastDigit = parseInt(serialNumber.charAt(7));
      // Lower numbers are worth more
      const valueFactor = 1 - ((lastDigit - 1) * 0.1);
      
      results.matchedPatterns.push({
        name: pattern.name,
        tier: pattern.tier,
        baseValue: calculatePatternValue(pattern, denomination, condition, isStar) * valueFactor,
        description: pattern.description
      });
    }
  }
  
  // Check for high serial number (7 nines)
  if (/^9{7}[0-9]$/.test(serialNumber)) {
    const pattern = serialNumberPatterns.patterns.find(p => p.name === "High Serial Numbers (9999999X)");
    if (pattern) {
      const lastDigit = parseInt(serialNumber.charAt(7));
      // Higher numbers are worth more
      const valueFactor = 0.9 + (lastDigit * 0.01);
      
      results.matchedPatterns.push({
        name: pattern.name,
        tier: pattern.tier,
        baseValue: calculatePatternValue(pattern, denomination, condition, isStar) * valueFactor,
        description: pattern.description
      });
    }
  }
  
  // Check for million serial number
  if (/^[1-9]0{7}$/.test(serialNumber)) {
    const pattern = serialNumberPatterns.patterns.find(p => p.name === "Million Serial Numbers");
    if (pattern) {
      const firstDigit = parseInt(serialNumber.charAt(0));
      // Higher leading digits are worth more
      const valueFactor = 0.8 + (firstDigit * 0.02);
      
      results.matchedPatterns.push({
        name: pattern.name,
        tier: pattern.tier,
        baseValue: calculatePatternValue(pattern, denomination, condition, isStar) * valueFactor,
        description: pattern.description
      });
    }
  }
  
  // Check for low serial number (6 zeros)
  if (/^0{6}[0-9]{2}$/.test(serialNumber)) {
    const pattern = serialNumberPatterns.patterns.find(p => p.name === "Low Serial Numbers (000000XX)");
    if (pattern) {
      results.matchedPatterns.push({
        name: pattern.name,
        tier: pattern.tier,
        baseValue: calculatePatternValue(pattern, denomination, condition, isStar),
        description: pattern.description
      });
    }
  }
  
  // Check for high serial number (6 nines)
  if (/^9{6}[0-9]{2}$/.test(serialNumber)) {
    const pattern = serialNumberPatterns.patterns.find(p => p.name === "High Serial Numbers (999999XX)");
    if (pattern) {
      results.matchedPatterns.push({
        name: pattern.name,
        tier: pattern.tier,
        baseValue: calculatePatternValue(pattern, denomination, condition, isStar),
        description: pattern.description
      });
    }
  }
  
  // Check for super repeater
  if (/^(\d{2})\1{3}$/.test(serialNumber)) {
    const pattern = serialNumberPatterns.patterns.find(p => p.name === "Super Repeater Serial Numbers");
    if (pattern) {
      results.matchedPatterns.push({
        name: pattern.name,
        tier: pattern.tier,
        baseValue: calculatePatternValue(pattern, denomination, condition, isStar),
        description: pattern.description
      });
    }
  }
  
  // Check for seven in a row
  if (/^(\d)(?:\1{6})([^\1])$/.test(serialNumber) || /^([^\d])(?:\d{6})\1$/.test(serialNumber)) {
    const pattern = serialNumberPatterns.patterns.find(p => p.name === "Seven-In-A-Row Serial Numbers");
    if (pattern) {
      results.matchedPatterns.push({
        name: pattern.name,
        tier: pattern.tier,
        baseValue: calculatePatternValue(pattern, denomination, condition, isStar),
        description: pattern.description
      });
    }
  }
  
  // Check for low serial number (5 zeros)
  if (/^0{5}[0-9]{3}$/.test(serialNumber)) {
    const pattern = serialNumberPatterns.patterns.find(p => p.name === "Low Serial Numbers (00000XXX)");
    if (pattern) {
      results.matchedPatterns.push({
        name: pattern.name,
        tier: pattern.tier,
        baseValue: calculatePatternValue(pattern, denomination, condition, isStar),
        description: pattern.description
      });
    }
  }
  
  // Check for high serial number (5 nines)
  if (/^9{5}[0-9]{3}$/.test(serialNumber)) {
    const pattern = serialNumberPatterns.patterns.find(p => p.name === "High Serial Numbers (99999XXX)");
    if (pattern) {
      results.matchedPatterns.push({
        name: pattern.name,
        tier: pattern.tier,
        baseValue: calculatePatternValue(pattern, denomination, condition, isStar),
        description: pattern.description
      });
    }
  }
  
  // Check for double quad
  if (/^(\d)\1{3}(\d)\2{3}$/.test(serialNumber)) {
    const pattern = serialNumberPatterns.patterns.find(p => p.name === "Double Quad Serial Numbers");
    if (pattern) {
      results.matchedPatterns.push({
        name: pattern.name,
        tier: pattern.tier,
        baseValue: calculatePatternValue(pattern, denomination, condition, isStar),
        description: pattern.description
      });
    }
  }
  
  // Check for true binary (only 0s and 1s)
  if (/^[01]{8}$/.test(serialNumber)) {
    const pattern = serialNumberPatterns.patterns.find(p => p.name === "True Binary Serial Numbers");
    if (pattern) {
      results.matchedPatterns.push({
        name: pattern.name,
        tier: pattern.tier,
        baseValue: calculatePatternValue(pattern, denomination, condition, isStar),
        description: pattern.description
      });
    }
  }
  
  // Check for binary (only two unique digits)
  if (/^([0-9])([0-9])(?:[12])*$/.test(serialNumber)) {
    const uniqueDigits = [...new Set(serialNumber.split(''))];
    if (uniqueDigits.length === 2) {
      const pattern = serialNumberPatterns.patterns.find(p => p.name === "Binary Serial Numbers");
      if (pattern) {
        results.matchedPatterns.push({
          name: pattern.name,
          tier: pattern.tier,
          baseValue: calculatePatternValue(pattern, denomination, condition, isStar),
          description: pattern.description
        });
      }
    }
  }
  
  // Check for repeater (first four digits repeated)
  if (serialNumber.substring(0, 4) === serialNumber.substring(4, 8)) {
    const pattern = serialNumberPatterns.patterns.find(p => p.name === "Repeater Serial Numbers");
    if (pattern) {
      results.matchedPatterns.push({
        name: pattern.name,
        tier: pattern.tier,
        baseValue: calculatePatternValue(pattern, denomination, condition, isStar),
        description: pattern.description
      });
    }
  }
  
  // Check for radar (palindrome)
  if (serialNumber === serialNumber.split('').reverse().join('')) {
    const pattern = serialNumberPatterns.patterns.find(p => p.name === "Radar Serial Numbers");
    if (pattern) {
      results.matchedPatterns.push({
        name: pattern.name,
        tier: pattern.tier,
        baseValue: calculatePatternValue(pattern, denomination, condition, isStar),
        description: pattern.description
      });
    }
  }
  
  // Check for date format (MMDDYYYY or MMDDYY)
  const month = parseInt(serialNumber.substring(0, 2));
  const day = parseInt(serialNumber.substring(2, 4));
  if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
    const pattern = serialNumberPatterns.patterns.find(p => p.name === "Anniversary/Birthday Serial Numbers");
    if (pattern) {
      results.matchedPatterns.push({
        name: pattern.name,
        tier: pattern.tier,
        baseValue: calculatePatternValue(pattern, denomination, condition, isStar),
        description: pattern.description
      });
    }
  }
  
  // Check for trinary (only three unique digits)
  const uniqueDigits = [...new Set(serialNumber.split(''))];
  if (uniqueDigits.length === 3) {
    const pattern = serialNumberPatterns.patterns.find(p => p.name === "Trinary Serial Numbers");
    if (pattern) {
      results.matchedPatterns.push({
        name: pattern.name,
        tier: pattern.tier,
        baseValue: calculatePatternValue(pattern, denomination, condition, isStar),
        description: pattern.description
      });
    }
  }
  
  // Calculate total estimated value
  if (results.matchedPatterns.length > 0) {
    // Use the highest value pattern as the primary value
    results.matchedPatterns.sort((a, b) => b.baseValue - a.baseValue);
    results.estimatedValue = Math.round(results.matchedPatterns[0].baseValue);
    
    // Add 10% for each additional pattern (diminishing returns)
    for (let i = 1; i < results.matchedPatterns.length; i++) {
      const additionalValue = results.matchedPatterns[i].baseValue * 0.1 / i;
      results.estimatedValue += Math.round(additionalValue);
    }
  }
  
  return results;
};

export default {
  isValidSerialNumber,
  getConditionFactor,
  getDenominationFactor,
  calculatePatternValue,
  analyzeSerialNumber
};