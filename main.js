// Main JavaScript for US Currency Serial Number Patterns Guide

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

// Global variables
let currentPage = 1;
let itemsPerPage = 9;
let filteredPatterns = [];
let currentView = 'grid';

// Initialize the application
function initApp() {
    // Load pattern data
    loadPatternData();
    
    // Initialize UI components
    initNavigation();
    initSearch();
    initFilters();
    initViewControls();
    initTierTabs();
    initSerialChecker();
    initBackToTop();
    initGuideNavigation();
    initVisualizationTabs();
    
    // Populate initial content
    populatePatternCards();
    populateTierContent();
}

// Load and process pattern data
function loadPatternData() {
    // Data is already loaded via data.js
    filteredPatterns = serialNumberPatterns.patterns;
    
    // Sort patterns by tier and then by value
    filteredPatterns.sort((a, b) => {
        if (a.tier !== b.tier) {
            return a.tier - b.tier;
        }
        return b.value_range.max - a.value_range.max;
    });
}

// Initialize navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Handle mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            navMenu.classList.toggle('active');
        });
    }
}

// Initialize search functionality
function initSearch() {
    const searchForm = document.getElementById('global-search');
    const searchInput = document.getElementById('search-input');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (searchTerm) {
                // Filter patterns based on search term
                filterPatterns({
                    search: searchTerm
                });
                
                // Scroll to patterns section
                document.getElementById('patterns').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Quick filter buttons
    const quickFilterButtons = document.querySelectorAll('.filter-btn');
    
    quickFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.dataset.filter;
            
            // Toggle active state
            quickFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Apply filter
            if (filterValue === 'tier-1') {
                filterPatterns({ tier: 1 });
            } else {
                filterPatterns({ 
                    pattern: filterValue 
                });
            }
            
            // Scroll to patterns section
            document.getElementById('patterns').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Initialize filter sidebar functionality
function initFilters() {
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const filterToggle = document.querySelector('.filter-toggle');
    const filterOptions = document.getElementById('filter-options');
    
    // Range slider for value
    const valueMin = document.getElementById('value-min');
    const valueMax = document.getElementById('value-max');
    const valueMinDisplay = document.getElementById('value-min-display');
    const valueMaxDisplay = document.getElementById('value-max-display');
    
    if (valueMin && valueMax) {
        valueMin.addEventListener('input', function() {
            valueMinDisplay.textContent = `$${this.value}`;
            // Ensure min doesn't exceed max
            if (parseInt(this.value) > parseInt(valueMax.value)) {
                valueMax.value = this.value;
                valueMaxDisplay.textContent = `$${this.value}`;
            }
        });
        
        valueMax.addEventListener('input', function() {
            valueMaxDisplay.textContent = this.value >= 20000 ? '$20,000+' : `$${this.value}`;
            // Ensure max doesn't go below min
            if (parseInt(this.value) < parseInt(valueMin.value)) {
                valueMin.value = this.value;
                valueMinDisplay.textContent = `$${this.value}`;
            }
        });
    }
    
    // Apply filters button
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            const filterCriteria = {
                valueMin: parseInt(valueMin.value),
                valueMax: parseInt(valueMax.value),
                patterns: [],
                rarity: document.querySelector('input[name="rarity"]:checked').value
            };
            
            // Get selected pattern types
            document.querySelectorAll('input[name="pattern"]:checked').forEach(checkbox => {
                filterCriteria.patterns.push(checkbox.value);
            });
            
            filterPatterns(filterCriteria);
        });
    }
    
    // Reset filters button
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            // Reset value range
            if (valueMin && valueMax) {
                valueMin.value = 0;
                valueMax.value = 20000;
                valueMinDisplay.textContent = '$0';
                valueMaxDisplay.textContent = '$20,000+';
            }
            
            // Reset pattern checkboxes
            document.querySelectorAll('input[name="pattern"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Reset rarity radio
            document.querySelector('input[name="rarity"][value="all"]').checked = true;
            
            // Reset filters and display all patterns
            resetFilters();
        });
    }
    
    // Filter toggle for mobile
    if (filterToggle && filterOptions) {
        filterToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            filterOptions.classList.toggle('collapsed');
        });
    }
}

// Filter patterns based on criteria
function filterPatterns(criteria) {
    let filtered = serialNumberPatterns.patterns;
    
    // Filter by search term
    if (criteria.search) {
        filtered = filtered.filter(pattern => {
            // Search in name, description, examples, and search terms
            return pattern.name.toLowerCase().includes(criteria.search) ||
                   pattern.description.toLowerCase().includes(criteria.search) ||
                   pattern.examples.some(ex => ex.toLowerCase().includes(criteria.search)) ||
                   (pattern.search_terms && pattern.search_terms.some(term => term.toLowerCase().includes(criteria.search)));
        });
    }
    
    // Filter by tier
    if (criteria.tier) {
        filtered = filtered.filter(pattern => pattern.tier === criteria.tier);
    }
    
    // Filter by pattern type
    if (criteria.pattern) {
        filtered = filtered.filter(pattern => {
            // Check if any search term matches the pattern type
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
    }
    
    // Filter by pattern types (multiple)
    if (criteria.patterns && criteria.patterns.length > 0) {
        filtered = filtered.filter(pattern => {
            return pattern.search_terms && criteria.patterns.some(p => pattern.search_terms.includes(p));
        });
    }
    
    // Filter by rarity
    if (criteria.rarity && criteria.rarity !== 'all') {
        filtered = filtered.filter(pattern => {
            const rarityLevel = pattern.rarity.level.toLowerCase().replace(' ', '-');
            return rarityLevel === criteria.rarity;
        });
    }
    
    // Update filtered patterns and refresh display
    filteredPatterns = filtered;
    currentPage = 1;
    updatePatternsDisplay();
}

// Reset all filters
function resetFilters() {
    filteredPatterns = serialNumberPatterns.patterns;
    currentPage = 1;
    updatePatternsDisplay();
}

// Initialize view controls (grid, list, chart)
function initViewControls() {
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const viewType = this.dataset.view;
            
            // Update active button
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update view
            updateView(viewType);
        });
    });
}

// Update the current view (grid, list, chart)
function updateView(viewType) {
    const patternsGrid = document.getElementById('patterns-grid');
    const patternsList = document.getElementById('patterns-list');
    const patternsChart = document.getElementById('patterns-chart');
    
    // Hide all views
    patternsGrid.style.display = 'none';
    patternsList.style.display = 'none';
    patternsChart.style.display = 'none';
    
    // Show selected view
    if (viewType === 'grid') {
        patternsGrid.style.display = 'grid';
    } else if (viewType === 'list') {
        patternsList.style.display = 'block';
    } else if (viewType === 'chart') {
        patternsChart.style.display = 'block';
        initValueComparisonChart();
    }
    
    currentView = viewType;
}

// Initialize tier tabs
function initTierTabs() {
    const tierTabs = document.querySelectorAll('.tier-tab');
    
    tierTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tierId = this.dataset.tier;
            
            // Update active tab
            tierTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tier content
            document.querySelectorAll('.tier-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            
            const tierPanel = document.getElementById(`${tierId}-content`);
            if (tierPanel) {
                tierPanel.classList.add('active');
            }
        });
    });
}

// Initialize serial number checker tool
function initSerialChecker() {
    const checkerForm = document.getElementById('serial-checker-form');
    const checkerResults = document.getElementById('checker-results');
    
    if (checkerForm) {
        checkerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const serialInput = document.getElementById('serial-input').value.trim();
            const denomination = document.getElementById('denomination-select').value;
            const condition = document.getElementById('condition-select').value;
            
            // Validate serial number format
            if (!isValidSerialNumber(serialInput)) {
                checkerResults.innerHTML = `
                    <div class="result-error">
                        <h3>Invalid Serial Number</h3>
                        <p>Please enter a valid serial number format (e.g., A12345678B or A12345678*).</p>
                    </div>
                `;
                return;
            }
            
            // Extract the 8-digit number part
            const serialNumber = serialInput.substring(1, 9);
            
            // Check for star note
            const isStar = serialInput.charAt(9) === '*';
            
            // Analyze the serial number
            const result = analyzeSerialNumber(serialNumber, denomination, condition, isStar);
            
            // Display results
            displayCheckerResults(result);
        });
    }
}

// Validate serial number format
function isValidSerialNumber(serial) {
    // Basic validation: letter + 8 digits + letter or star
    return /^[A-Z][0-9]{8}[A-Z*]$/.test(serial);
}

// Analyze serial number for patterns
function analyzeSerialNumber(serialNumber, denomination, condition, isStar) {
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
            
            results.matchedPatterns.push
(Content truncated due to size limit. Use line ranges to read in chunks)