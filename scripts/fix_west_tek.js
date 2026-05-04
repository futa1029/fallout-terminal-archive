const fs = require('fs');
const file = 'f:/Fallout/snallygaster-fo76.html';
const content = fs.readFileSync(file, 'utf8');
const updated = content.replace(/ウエストイーク/g, 'West Tek');
fs.writeFileSync(file, updated, 'utf8');
console.log('snallygaster-fo76.html updated.');
