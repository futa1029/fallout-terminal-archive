const fs = require('fs');
const path = require('path');

const brokenFile = require('./_truly_broken.json');
const rootDir = 'f:/Fallout';

let notRestored = [];

brokenFile.mostlyEnglish.forEach(file => {
    try {
        const filePath = path.join(rootDir, file);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            // Check if it has the new formatting signifier
            if (!content.includes('data-article-category')) {
                notRestored.push(file);
            }
        } else {
            // File doesn't exist at all
            notRestored.push(file);
        }
    } catch (e) {
        console.error(e);
    }
});

console.log('Not restored count:', notRestored.length);
console.log('Next 10 to restore:\n' + notRestored.slice(0, 10).join('\n'));
