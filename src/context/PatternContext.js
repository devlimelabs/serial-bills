import React, { createContext, useState, useContext, useEffect } from 'react';
import { serialNumberPatterns } from '../data/patterns';

// Create context
const PatternContext = createContext();

// Pattern provider component
export const PatternProvider = ({ children }) => {
  const [patterns, setPatterns] = useState([]);
  const [filteredPatterns, setFilteredPatterns] = useState([]);
  const [tiers, setTiers] = useState([]);
  const [valueFactors, setValueFactors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    tier: null,
    valueMin: 0,
    valueMax: 20000,
    patterns: [],
    rarity: 'all',
  });

  // Initialize data on mount
  useEffect(() => {
    // In a real app, this might be an API call
    setPatterns(serialNumberPatterns.patterns);
    setFilteredPatterns(serialNumberPatterns.patterns);
    setTiers(serialNumberPatterns.tiers);
    setValueFactors(serialNumberPatterns.value_factors);
    setLoading(false);
  }, []);

  // Filter patterns based on criteria
  const filterPatterns = (criteria) => {
    let filtered = patterns;
    
    // Save active filters state
    setActiveFilters({ ...activeFilters, ...criteria });

    // Filter by search term
    if (criteria.search) {
      setSearchTerm(criteria.search);
      const search = criteria.search.toLowerCase();
      filtered = filtered.filter(pattern => {
        return pattern.name.toLowerCase().includes(search) ||
               pattern.description.toLowerCase().includes(search) ||
               pattern.examples.some(ex => ex.toLowerCase().includes(search)) ||
               (pattern.search_terms && pattern.search_terms.some(term => term.toLowerCase().includes(search)));
      });
    } else if (searchTerm && !criteria.clearSearch) {
      // Keep existing search term if not clearing
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(pattern => {
        return pattern.name.toLowerCase().includes(search) ||
               pattern.description.toLowerCase().includes(search) ||
               pattern.examples.some(ex => ex.toLowerCase().includes(search)) ||
               (pattern.search_terms && pattern.search_terms.some(term => term.toLowerCase().includes(search)));
      });
    }

    // Filter by tier
    if (criteria.tier) {
      filtered = filtered.filter(pattern => pattern.tier === criteria.tier);
    } else if (activeFilters.tier && !criteria.clearFilters) {
      filtered = filtered.filter(pattern => pattern.tier === activeFilters.tier);
    }

    // Filter by specific pattern type
    if (criteria.pattern) {
      filtered = filtered.filter(pattern => {
        return pattern.search_terms && pattern.search_terms.includes(criteria.pattern);
      });
    }

    // Filter by value range
    if (criteria.valueMin !== undefined && criteria.valueMax !== undefined) {
      filtered = filtered.filter(pattern => {
        return (pattern.value_range.min >= criteria.valueMin && pattern.value_range.min <= criteria.valueMax) ||
               (pattern.value_range.max >= criteria.valueMin && pattern.value_range.max <= criteria.valueMax) ||
               (pattern.value_range.min <= criteria.valueMin && pattern.value_range.max >= criteria.valueMax);
      });
    } else if (!criteria.clearFilters && 
               (activeFilters.valueMin !== undefined && activeFilters.valueMax !== undefined)) {
      filtered = filtered.filter(pattern => {
        return (pattern.value_range.min >= activeFilters.valueMin && pattern.value_range.min <= activeFilters.valueMax) ||
               (pattern.value_range.max >= activeFilters.valueMin && pattern.value_range.max <= activeFilters.valueMax) ||
               (pattern.value_range.min <= activeFilters.valueMin && pattern.value_range.max >= activeFilters.valueMax);
      });
    }

    // Filter by multiple pattern types
    if (criteria.patterns && criteria.patterns.length > 0) {
      filtered = filtered.filter(pattern => {
        return pattern.search_terms && criteria.patterns.some(p => pattern.search_terms.includes(p));
      });
    } else if (!criteria.clearFilters && 
               activeFilters.patterns && activeFilters.patterns.length > 0) {
      filtered = filtered.filter(pattern => {
        return pattern.search_terms && activeFilters.patterns.some(p => pattern.search_terms.includes(p));
      });
    }

    // Filter by rarity
    if (criteria.rarity && criteria.rarity !== 'all') {
      filtered = filtered.filter(pattern => {
        const rarityLevel = pattern.rarity.level.toLowerCase().replace(' ', '-');
        return rarityLevel === criteria.rarity;
      });
    } else if (!criteria.clearFilters && 
               activeFilters.rarity && activeFilters.rarity !== 'all') {
      filtered = filtered.filter(pattern => {
        const rarityLevel = pattern.rarity.level.toLowerCase().replace(' ', '-');
        return rarityLevel === activeFilters.rarity;
      });
    }

    // Clear filters if specified
    if (criteria.clearFilters) {
      setActiveFilters({
        tier: null,
        valueMin: 0,
        valueMax: 20000,
        patterns: [],
        rarity: 'all',
      });
      setSearchTerm('');
    }

    // Update filtered patterns
    setFilteredPatterns(filtered);
    
    return filtered;
  };

  // Value for the context provider
  const value = {
    patterns,
    filteredPatterns,
    tiers,
    valueFactors,
    loading,
    searchTerm,
    activeFilters,
    filterPatterns,
    setSearchTerm,
  };

  return (
    <PatternContext.Provider value={value}>
      {children}
    </PatternContext.Provider>
  );
};

// Custom hook to use the pattern context
export const usePatterns = () => {
  const context = useContext(PatternContext);
  if (context === undefined) {
    throw new Error('usePatterns must be used within a PatternProvider');
  }
  return context;
};

export default PatternContext;