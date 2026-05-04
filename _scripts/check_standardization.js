const fs = require('fs');
const brokenData = JSON.parse(fs.readFileSync('f:/Fallout/_truly_broken.json', 'utf8'));
const filesToCheck = [...brokenData.mostlyEnglish, ...brokenData.fullEnglish];

const unstandardized = [];
const missingQuoteBox = [];
const missingViewport = [];
const missingCopyright = [];

for (const f of filesToCheck) {
    const file = `f:/Fallout/${f}`;
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for minified comment script or missing hp_field
    if (!content.includes('id="hp_field"')) {
        unstandardized.push(f);
    }
    
    if (!content.includes('name="viewport"')) {
        missingViewport.push(f);
    }
    if (!content.includes('quote-box')) {
        missingQuoteBox.push(f);
    }
    if (!content.includes('This article was created by translating') && !content.includes('name="copyright-default"')) {
        missingCopyright.push(f);
    }
}

console.log('Total files checked:', filesToCheck.length);
console.log('Unstandardized Script/Comments:', unstandardized.length);
console.log('Missing Viewport:', missingViewport.length, missingViewport);
console.log('Missing Quote Box:', missingQuoteBox.length, missingQuoteBox.slice(0, 10));
console.log('Missing/Broken Copyright:', missingCopyright.length, missingCopyright.slice(0, 10));
