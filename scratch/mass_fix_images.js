const fs = require('fs');
const path = require('path');

const DIR = 'f:\\Fallout';
const TARGET = 'https://www.fallout-jp.com/images/note_extracted/ulysses_img_1.png';
const REPLACE = 'images/placeholder.jpg';

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(TARGET)) {
        content = content.split(TARGET).join(REPLACE);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${file}`);
    }
});
