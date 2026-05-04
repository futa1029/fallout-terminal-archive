const fs = require('fs');
const path = require('path');

const DIR = 'f:\\Fallout';

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace broken onerror patterns with loop-protected version
    const pattern = /onerror="this\.src='images\/placeholder\.jpg'\"/g;
    const replacement = 'onerror="this.onerror=null; this.src=\'images/placeholder.jpg\';"';
    
    if (content.match(pattern)) {
        content = content.replace(pattern, replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed infinite loop in: ${file}`);
    }
});
