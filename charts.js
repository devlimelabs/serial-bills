// Charts and Visualizations for US Currency Serial Number Patterns Guide

document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts when visualization tabs are clicked
    initChartControls();
});

// Initialize chart controls
function initChartControls() {
    const chartControls = document.querySelectorAll('.chart-control');
    
    if (chartControls) {
        chartControls.forEach(control => {
            control.addEventListener('click', function() {
                const chartType = this.dataset.chart;
                
                // Update active control
                chartControls.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                
                // Initialize the appropriate chart
                if (chartType === 'value') {
                    initValueComparisonChart();
                } else if (chartType === 'rarity') {
                    initRarityComparisonChart();
                } else if (chartType === 'tier') {
                    initTierDistributionChart();
                }
            });
        });
    }
}

// Initialize value comparison chart
function initValueComparisonChart() {
    const ctx = document.getElementById('value-comparison-chart');
    
    if (ctx) {
        // Destroy existing chart if it exists
        if (window.valueChart) {
            window.valueChart.destroy();
        }
        
        // Prepare data
        const patterns = filteredPatterns.slice(0, 10); // Limit to top 10 for readability
        const labels = patterns.map(p => p.name);
        const minValues = patterns.map(p => p.value_range.min);
        const maxValues = patterns.map(p => p.value_range.max);
        const avgValues = patterns.map(p => (p.value_range.min + p.value_range.max) / 2);
        
        // Create chart
        window.valueChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Minimum Value ($)',
                        data: minValues,
                        backgroundColor: 'rgba(38, 166, 154, 0.6)',
                        borderColor: 'rgba(38, 166, 154, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Average Value ($)',
                        data: avgValues,
                        backgroundColor: 'rgba(255, 193, 7, 0.6)',
                        borderColor: 'rgba(255, 193, 7, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Maximum Value ($)',
                        data: maxValues,
                        backgroundColor: 'rgba(13, 71, 161, 0.6)',
                        borderColor: 'rgba(13, 71, 161, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Value in USD'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Value Comparison of Serial Number Patterns',
                        font: {
                            size: 16,
                            family: "'Montserrat', sans-serif",
                            weight: 'bold'
                        },
                        color: '#004D40',
                        padding: {
                            top: 10,
                            bottom: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += '$' + context.raw.toLocaleString();
                                return label;
                            }
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: "'Open Sans', sans-serif"
                            },
                            padding: 20
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                },
                onClick: function(e, elements) {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        const pattern = patterns[index];
                        
                        // Filter to show only this pattern
                        filteredPatterns = [pattern];
                        currentPage = 1;
                        
                        // Update display and scroll to patterns section
                        updatePatternsDisplay();
                        document.getElementById('patterns').scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    }
}

// Initialize rarity comparison chart
function initRarityComparisonChart() {
    const ctx = document.getElementById('value-comparison-chart');
    
    if (ctx) {
        // Destroy existing chart if it exists
        if (window.valueChart) {
            window.valueChart.destroy();
        }
        
        // Group patterns by rarity level
        const rarityLevels = ['Extremely Rare', 'Very Rare', 'Rare', 'Uncommon', 'Somewhat Common', 'Common'];
        const rarityGroups = {};
        
        rarityLevels.forEach(level => {
            rarityGroups[level] = filteredPatterns.filter(p => p.rarity.level === level);
        });
        
        // Calculate average values for each rarity level
        const data = rarityLevels.map(level => {
            const patterns = rarityGroups[level];
            if (patterns.length === 0) return 0;
            
            const sum = patterns.reduce((total, pattern) => {
                return total + ((pattern.value_range.min + pattern.value_range.max) / 2);
            }, 0);
            
            return sum / patterns.length;
        });
        
        // Count patterns in each rarity level
        const counts = rarityLevels.map(level => rarityGroups[level].length);
        
        // Create chart
        window.valueChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: rarityLevels,
                datasets: [
                    {
                        label: 'Average Value ($)',
                        data: data,
                        backgroundColor: rarityLevels.map((_, index) => {
                            const hue = 200 - (index * 30);
                            return `hsla(${hue}, 70%, 50%, 0.7)`;
                        }),
                        borderColor: rarityLevels.map((_, index) => {
                            const hue = 200 - (index * 30);
                            return `hsla(${hue}, 70%, 50%, 1)`;
                        }),
                        borderWidth: 1,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Number of Patterns',
                        data: counts,
                        type: 'line',
                        borderColor: '#FF6384',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderWidth: 2,
                        pointBackgroundColor: '#FF6384',
                        pointRadius: 5,
                        fill: false,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Average Value in USD'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    },
                    y1: {
                        beginAtZero: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Number of Patterns'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Rarity Level'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Rarity vs. Value Relationship',
                        font: {
                            size: 16,
                            family: "'Montserrat', sans-serif",
                            weight: 'bold'
                        },
                        color: '#004D40',
                        padding: {
                            top: 10,
                            bottom: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const datasetLabel = context.dataset.label;
                                const value = context.raw;
                                
                                if (datasetLabel === 'Average Value ($)') {
                                    return `Average Value: $${value.toLocaleString()}`;
                                } else {
                                    return `Number of Patterns: ${value}`;
                                }
                            },
                            afterBody: function(context) {
                                const rarityLevel = context[0].label;
                                const patterns = rarityGroups[rarityLevel];
                                
                                if (patterns.length > 0) {
                                    const patternNames = patterns.slice(0, 3).map(p => p.name).join(', ');
                                    return [`Examples: ${patternNames}${patterns.length > 3 ? '...' : ''}`];
                                }
                                
                                return [];
                            }
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: "'Open Sans', sans-serif"
                            },
                            padding: 20
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                },
                onClick: function(e, elements) {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        const rarityLevel = rarityLevels[index];
                        
                        // Filter to show only patterns with this rarity
                        filteredPatterns = serialNumberPatterns.patterns.filter(p => p.rarity.level === rarityLevel);
                        currentPage = 1;
                        
                        // Update display and scroll to patterns section
                        updatePatternsDisplay();
                        document.getElementById('patterns').scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    }
}

// Initialize tier distribution chart
function initTierDistributionChart() {
    const ctx = document.getElementById('value-comparison-chart');
    
    if (ctx) {
        // Destroy existing chart if it exists
        if (window.valueChart) {
            window.valueChart.destroy();
        }
        
        // Prepare data
        const tiers = serialNumberPatterns.tiers;
        const tierCounts = tiers.map(tier => {
            return filteredPatterns.filter(p => p.tier === tier.tier).length;
        });
        
        // Calculate average values for each tier
        const tierValues = tiers.map(tier => {
            const patterns = filteredPatterns.filter(p => p.tier === tier.tier);
            if (patterns.length === 0) return 0;
            
            const sum = patterns.reduce((total, pattern) => {
                return total + ((pattern.value_range.min + pattern.value_range.max) / 2);
            }, 0);
            
            return sum / patterns.length;
        });
        
        // Create chart
        window.valueChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: tiers.map(tier => `Tier ${tier.tier}: ${tier.name}`),
                datasets: [{
                    data: tierCounts,
                    backgroundColor: tiers.map(tier => getTierColor(tier.tier)),
                    borderColor: tiers.map(tier => getTierColor(tier.tier).replace('0.6', '1')),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Distribution of Patterns by Value Tier',
                        font: {
                            size: 16,
                            family: "'Montserrat', sans-serif",
                            weight: 'bold'
                        },
                        color: '#004D40',
                        padding: {
                            top: 10,
                            bottom: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw;
                                const percentage = Math.round((value / filteredPatterns.length) * 100);
                                const tierIndex = context.dataIndex;
                                const avgValue = tierValues[tierIndex];
                                
                                return [
                                    `Patterns: ${value} (${percentage}%)`,
                                    `Average Value: $${avgValue.toLoc
(Content truncated due to size limit. Use line ranges to read in chunks)