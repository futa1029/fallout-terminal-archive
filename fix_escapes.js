const fs = require('fs');
const path = require('path');

const dirPath = "f:\\Fallout";
const htmlFiles = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));

let count = 0;
for (let file of htmlFiles) {
    let p = path.join(dirPath, file);
    let raw = fs.readFileSync(p, 'utf8');
    
    // Check if it has literal \n text
    if (raw.includes('\\n            <div class="infobox-row">')) {
        let fixed = raw.replace(/\\n            <div class="infobox-row">/g, '\n            <div class="infobox-row">');
        fs.writeFileSync(p, fixed, 'utf8');
        count++;
    }
}
console.log("Fixed literal string in " + count + " files.");
