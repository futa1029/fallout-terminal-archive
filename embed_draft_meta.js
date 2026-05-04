const fs = require('fs');
const path = require('path');

// Read loreEntries
const html = fs.readFileSync('f:/Fallout/js/lore_index.js', 'utf8');
const startIdx = html.indexOf('const loreEntries = [');
const endIdx = html.indexOf('];', startIdx);
const arrStr = html.substring(startIdx + 20, endIdx + 1);
const fn = new Function('return ' + arrStr);
const entries = fn();

let updatedCount = 0;
let missingFiles = 0;

entries.forEach(entry => {
    if (entry.isDraft) {
        const filePath = path.join('f:/Fallout', entry.url);
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            // Check if meta tag already exists
            if (!content.includes('<meta name="article-status" content="draft">')) {
                // Insert into <head>
                const headCloseIdx = content.indexOf('</head>');
                if (headCloseIdx !== -1) {
                    content = content.substring(0, headCloseIdx) + '    <meta name="article-status" content="draft">\n' + content.substring(headCloseIdx);
                    fs.writeFileSync(filePath, content, 'utf8');
                    updatedCount++;
                }
            }
        } else {
            missingFiles++;
        }
    }
});

console.log('Embedded meta tag in ' + updatedCount + ' files. Missing files: ' + missingFiles);
