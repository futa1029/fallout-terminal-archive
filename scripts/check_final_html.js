const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'brotherhood-of-steel.html');
const imgDir = path.join(__dirname, '..', 'images', 'note_extracted', 'brotherhood-base');
const html = fs.readFileSync(htmlPath, 'utf8');
const localFiles = fs.readdirSync(imgDir);
const localFilesLower = localFiles.map(f => f.toLowerCase());

const imgRegex = /src="images\/note_extracted\/brotherhood-base\/([^"]+)"/g;
let match;
const missing = [];

console.log('--- Final HTML Image Check ---');
while ((match = imgRegex.exec(html)) !== null) {
    const ref = decodeURIComponent(match[1]);
    if (!localFiles.includes(ref)) {
        let suggestion = '';
        const idx = localFilesLower.indexOf(ref.toLowerCase());
        if (idx !== -1) {
            suggestion = ` (Case mismatch? Actual: ${localFiles[idx]})`;
        }
        missing.push(`${ref}${suggestion}`);
    }
}

if (missing.length > 0) {
    console.log('Missing or Mismatched Images:');
    [...new Set(missing)].forEach(m => console.log(` - ${m}`));
} else {
    console.log('All images found in the file system.');
}
