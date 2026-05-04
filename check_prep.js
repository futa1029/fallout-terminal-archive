const fs = require('fs');
const path = require('path');
const dir = 'f:\\Fallout';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const onlyPrep = [];
const prepWithContent = [];

for (let file of files) {
    const p = path.join(dir, file);
    const content = fs.readFileSync(p, 'utf8');

    if (content.includes('（準備中）')) {
        let match1 = content.match(/<div class="quote-box">\s*<b>感想<\/b><br><br>\s*（準備中）\s*<\/div>/s);
        if (match1) {
            onlyPrep.push(file);
            continue;
        }

        let match2 = content.match(/<div class="quote-box">\s*<b>感想<\/b><br><br>\s*（準備中）<br>\s*(.*?)<\/div>/s);
        if (match2) {
            prepWithContent.push(file);
        }
    }
}

console.log("ONLY PREP:");
console.log(onlyPrep);
console.log("----");
console.log("PREP WITH CONTENT:");
console.log(prepWithContent);
