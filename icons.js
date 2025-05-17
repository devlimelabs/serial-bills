// Icons for US Currency Serial Number Patterns

// Create SVG icons for each pattern type
document.addEventListener('DOMContentLoaded', function() {
    createPatternIcons();
});

// Create pattern icons
function createPatternIcons() {
    // Create SVG icons for each pattern type
    createSolidIcon();
    createLadderIcon();
    createLowNumberIcon();
    createHighNumberIcon();
    createMillionIcon();
    createSuperRepeaterIcon();
    createSevenInRowIcon();
    createDoubleQuadIcon();
    createBinaryIcon();
    createRepeaterIcon();
    createRadarIcon();
    createDateIcon();
    createTrinaryIcon();
    createDefaultIcon();
}

// Create solid serial number icon
function createSolidIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    svg.setAttribute("class", "pattern-svg-icon");
    
    // Background
    const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("x", "5");
    bg.setAttribute("y", "20");
    bg.setAttribute("width", "90");
    bg.setAttribute("height", "60");
    bg.setAttribute("rx", "5");
    bg.setAttribute("fill", "#f5f5f5");
    bg.setAttribute("stroke", "#004D40");
    bg.setAttribute("stroke-width", "2");
    svg.appendChild(bg);
    
    // Digits
    for (let i = 0; i < 8; i++) {
        const digit = document.createElementNS("http://www.w3.org/2000/svg", "text");
        digit.setAttribute("x", 15 + i * 10);
        digit.setAttribute("y", "55");
        digit.setAttribute("font-family", "monospace");
        digit.setAttribute("font-size", "20");
        digit.setAttribute("font-weight", "bold");
        digit.setAttribute("fill", "#004D40");
        digit.textContent = "7";
        svg.appendChild(digit);
    }
    
    // Save as file
    const svgString = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgString], {type: "image/svg+xml"});
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement("a");
    a.href = url;
    a.download = "solid.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Create ladder serial number icon
function createLadderIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    svg.setAttribute("class", "pattern-svg-icon");
    
    // Background
    const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("x", "5");
    bg.setAttribute("y", "20");
    bg.setAttribute("width", "90");
    bg.setAttribute("height", "60");
    bg.setAttribute("rx", "5");
    bg.setAttribute("fill", "#f5f5f5");
    bg.setAttribute("stroke", "#004D40");
    bg.setAttribute("stroke-width", "2");
    svg.appendChild(bg);
    
    // Digits
    for (let i = 0; i < 8; i++) {
        const digit = document.createElementNS("http://www.w3.org/2000/svg", "text");
        digit.setAttribute("x", 15 + i * 10);
        digit.setAttribute("y", "55");
        digit.setAttribute("font-family", "monospace");
        digit.setAttribute("font-size", "20");
        digit.setAttribute("font-weight", "bold");
        digit.setAttribute("fill", "#004D40");
        digit.textContent = (i + 1).toString();
        svg.appendChild(digit);
    }
    
    // Save as file
    const svgString = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgString], {type: "image/svg+xml"});
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement("a");
    a.href = url;
    a.download = "ladder.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Create low number icon
function createLowNumberIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    svg.setAttribute("class", "pattern-svg-icon");
    
    // Background
    const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("x", "5");
    bg.setAttribute("y", "20");
    bg.setAttribute("width", "90");
    bg.setAttribute("height", "60");
    bg.setAttribute("rx", "5");
    bg.setAttribute("fill", "#f5f5f5");
    bg.setAttribute("stroke", "#004D40");
    bg.setAttribute("stroke-width", "2");
    svg.appendChild(bg);
    
    // Digits
    for (let i = 0; i < 7; i++) {
        const digit = document.createElementNS("http://www.w3.org/2000/svg", "text");
        digit.setAttribute("x", 15 + i * 10);
        digit.setAttribute("y", "55");
        digit.setAttribute("font-family", "monospace");
        digit.setAttribute("font-size", "20");
        digit.setAttribute("font-weight", "bold");
        digit.setAttribute("fill", "#004D40");
        digit.textContent = "0";
        svg.appendChild(digit);
    }
    
    // Last digit
    const lastDigit = document.createElementNS("http://www.w3.org/2000/svg", "text");
    lastDigit.setAttribute("x", "85");
    lastDigit.setAttribute("y", "55");
    lastDigit.setAttribute("font-family", "monospace");
    lastDigit.setAttribute("font-size", "20");
    lastDigit.setAttribute("font-weight", "bold");
    lastDigit.setAttribute("fill", "#004D40");
    lastDigit.textContent = "1";
    svg.appendChild(lastDigit);
    
    // Save as file
    const svgString = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgString], {type: "image/svg+xml"});
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement("a");
    a.href = url;
    a.download = "low.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Create high number icon
function createHighNumberIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    svg.setAttribute("class", "pattern-svg-icon");
    
    // Background
    const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("x", "5");
    bg.setAttribute("y", "20");
    bg.setAttribute("width", "90");
    bg.setAttribute("height", "60");
    bg.setAttribute("rx", "5");
    bg.setAttribute("fill", "#f5f5f5");
    bg.setAttribute("stroke", "#004D40");
    bg.setAttribute("stroke-width", "2");
    svg.appendChild(bg);
    
    // Digits
    for (let i = 0; i < 7; i++) {
        const digit = document.createElementNS("http://www.w3.org/2000/svg", "text");
        digit.setAttribute("x", 15 + i * 10);
        digit.setAttribute("y", "55");
        digit.setAttribute("font-family", "monospace");
        digit.setAttribute("font-size", "20");
        digit.setAttribute("font-weight", "bold");
        digit.setAttribute("fill", "#004D40");
        digit.textContent = "9";
        svg.appendChild(digit);
    }
    
    // Last digit
    const lastDigit = document.createElementNS("http://www.w3.org/2000/svg", "text");
    lastDigit.setAttribute("x", "85");
    lastDigit.setAttribute("y", "55");
    lastDigit.setAttribute("font-family", "monospace");
    lastDigit.setAttribute("font-size", "20");
    lastDigit.setAttribute("font-weight", "bold");
    lastDigit.setAttribute("fill", "#004D40");
    lastDigit.textContent = "9";
    svg.appendChild(lastDigit);
    
    // Save as file
    const svgString = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgString], {type: "image/svg+xml"});
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement("a");
    a.href = url;
    a.download = "high.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Create million serial number icon
function createMillionIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    svg.setAttribute("class", "pattern-svg-icon");
    
    // Background
    const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("x", "5");
    bg.setAttribute("y", "20");
    bg.setAttribute("width", "90");
    bg.setAttribute("height", "60");
    bg.setAttribute("rx", "5");
    bg.setAttribute("fill", "#f5f5f5");
    bg.setAttribute("stroke", "#004D40");
    bg.setAttribute("stroke-width", "2");
    svg.appendChild(bg);
    
    // First digit
    const firstDigit = document.createElementNS("http://www.w3.org/2000/svg", "text");
    firstDigit.setAttribute("x", "15");
    firstDigit.setAttribute("y", "55");
    firstDigit.setAttribute("font-family", "monospace");
    firstDigit.setAttribute("font-size", "20");
    firstDigit.setAttribute("font-weight", "bold");
    firstDigit.setAttribute("fill", "#004D40");
    firstDigit.textContent = "5";
    svg.appendChild(firstDigit);
    
    // Zeros
    for (let i = 1; i < 8; i++) {
        const digit = document.createElementNS("http://www.w3.org/2000/svg", "text");
        digit.setAttribute("x", 15 + i * 10);
        digit.setAttribute("y", "55");
        digit.setAttribute("font-family", "monospace");
        digit.setAttribute("font-size", "20");
        digit.setAttribute("font-weight", "bold");
        digit.setAttribute("fill", "#004D40");
        digit.textContent = "0";
        svg.appendChild(digit);
    }
    
    // Save as file
    const svgString = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgString], {type: "image/svg+xml"});
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement("a");
    a.href = url;
    a.download = "million.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Create super repeater icon
function createSuperRepeaterIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    svg.setAttribute("class", "pattern-svg-icon");
    
    // Background
    const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("x", "5");
    bg.setAttribute("y", "20");
    bg.setAttribute("width", "90");
    bg.setAttribute("height", "60");
    bg.setAttribute("rx", "5");
    bg.setAttribute("fill", "#f5f5f5");
    bg.setAttribute("stroke", "#004D40");
    bg.setAttribute("stroke-width", "2");
    svg.appendChild(bg);
    
    // Digits
    for (let i = 0; i < 4; i++) {
        const digit1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
        digit1.setAttribute("x", 15 + i * 20);
        digit1.setAttribute("y", "55");
        digit1.setAttribute("font-family", "monospace");
        digit1.setAttribute("font-size", "20");
        digit1.setAttribute("font-weight", "bold");
        digit1.setAttribute("fill", "#004D40");
        digit1.textContent = "1";
        svg.appendChild(digit1);
        
        const digit2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
        digit2.setAttribute("x", 25 + i * 20);
        digit2.setAttribute("y", "55");
        digit2.setAttribute("font-family", "monospace");
        digit2.setAttribute("font-size", "20");
        digit2.setAttribute("font-weight", "bold");
        digit2.setAttribute("fill", "#004D40");
        digit2.textContent = "2";
        svg.appendChild(digit2);
    }
    
    // Save as file
    const svgString = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgString], {type: "image/svg+xml"});
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement("a");
    a.href = url;
    a.download = "super_repeater.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Create seven in a row icon
function createSevenInRowIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    svg.setAttribute("class", "pattern-svg-icon");
    
    // Background
    const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("x", "5");
    bg.setAttribute("y", "20");
    bg.setAttribute("width", "90");
    bg.setAttribute("height", "60");
    bg.setAttribute("rx", "5");
    bg.setAttribute("fill", "#f5f5f5");
    bg.setAttribute("stroke", "#004D40");
    bg.setAttribute("stroke-width", "2");
    svg.appendChild(bg);
    
    // First digit
    const firstDigit = document.createElementNS("http://www.w3.org/2000/svg", "text");
    firstDigit.setAttribute("x", "15");
    firstDigit.setAttribute("y", "55");
    firstDigit.setAttribute("font-family", "monospace");
    firstDigit.setAttribute("font-size", "20");
    firstDigit.setAttribute("font-weight", "bold");
    firstDigit.setAttribute("fill", "#004D40");
    firstDigit.textContent = "3";
    svg.appendChild(firstDigit);
    
    // Repeated digits
    for (let i = 1; i < 8; i++) {
        const digit = document.createElementNS("http://www.w3.org/2000/svg", "text");
        digit.setAttribute("x", 15 + i * 10);
        digit.setAttribute("y", "55");
        digit.setAttribute("font-family", "monospace");
        digit.setAttribute("font-size", "20");
        digit.setAttribute("font-weight", "bold");
        digit.setAttribute("fill", "#004D40");
        digit.textContent = "7";
        svg.appendChild(digit);
    }
    
    // Save as file
    const svgString = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgString], {type: "image/svg+xml"});
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement("a");
    a.href = url;
    a.download = "seven.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Create double quad icon
function createDoubleQuadIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    svg.setAttribute("class", "pattern-svg-icon");
    
    // Background
    const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("x", "5");
    bg.setAttribute("y", "20");
    bg.setAttribute("width", "90");
    bg.setAttribute("height", "60");
    bg.setAttribute("rx", "5");
    bg.setAttribute("fill", "#f5f5f5");
    bg.setAttribute("stroke", "#004D40");
    bg.setAttribute("stroke-width", "2");
    svg.appendChild(bg);
    
    // First quad
    for (let i = 0; i < 4; i++) {
        const digit = document.createElementNS("http://www.w3.org/2000/svg", "text");
        digit.setAttribute("x", 15 + i * 10);
        digit.setAttribute("y", "55");
        digit.setAttribute("font-family", "monospace");
        digit.setAttribute("font-size", "20");
        digit.setAttribute("font-weight", "bold");
        digit.setAttribute("fill", "#004D40");
        digit.textContent = "3";
        svg.appendChild(digit);
    }
    
    // Second quad
    for (let i = 4; i < 8; i++) {
        const digit = document.createElementNS("http://www.w3.org/2000/svg", "text");
        digit.setAttribute("x", 15 + i * 10);
        digit.setAttribute("y", "55");
        digit.setAttribute("font-family", "monospace");
     
(Content truncated due to size limit. Use line ranges to read in chunks)