const fs = require('fs');
const path = require('path');

const targetDir = 'f:/Fallout';
const regex = /\s*<h2>感想<\/h2>\s*<div class="quote-box">/g;
const replaceWith = '\n            <div class="quote-box">';

fs.readdir(targetDir, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }
    
    let changedCount = 0;
    const htmlFiles = files.filter(f => f.endsWith('.html'));

    htmlFiles.forEach(file => {
        const filePath = path.join(targetDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        if (regex.test(content)) {
            content = content.replace(regex, replaceWith);
            fs.writeFileSync(filePath, content, 'utf8');
            changedCount++;
            console.log(`Removed <h2>感想</h2> from ${file}`);
        }
    });

    console.log(`Total files updated: ${changedCount}`);
});
