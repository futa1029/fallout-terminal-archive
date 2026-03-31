const fs = require('fs');
const path = require('path');

const targetDir = 'f:/Fallout';
const regex = /<div class="quote-box"><b>感想<\/b><br><br>([\s\S]*?)<\/div>/g;
const replaceWith = '<div class="quote-box"><p class="quote-text">$1</p></div>';

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

        // Some files might be already modified, wait I must check if they match the regex.
        if (regex.test(content)) {
            content = content.replace(regex, replaceWith);
            fs.writeFileSync(filePath, content, 'utf8');
            changedCount++;
            console.log(`Updated ${file}`);
        }
    });

    console.log(`Total files updated: ${changedCount}`);
});
