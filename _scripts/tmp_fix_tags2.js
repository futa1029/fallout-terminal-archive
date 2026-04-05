const fs = require('fs');
const path = require('path');

const dir = 'f:/Fallout';
console.log('Reading dir...');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
console.log(`Found ${files.length} HTML files.`);

let fixedCount = 0;
for (const file of files) {
    const fp = path.join(dir, file);
    let content = fs.readFileSync(fp, 'utf8');
    
    if (content.includes('data-article-appearance="Fallout 3') || content.includes('data-article-appearance="Fallout 3, ') || content.includes('data-article-appearance="Fallout, Fallout 3')) {
        if (content.includes('>#FalloutNewVegas</span>')) {
            content = content.replace(/>#FalloutNewVegas<\/span>/g, '>#Fallout3</span>');
            fs.writeFileSync(fp, content, 'utf8');
            fixedCount++;
        }
    }
}
console.log(`Fixed tags in ${fixedCount} files.`);
