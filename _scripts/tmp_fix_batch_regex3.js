const fs = require('fs');
const path = require('path');

const scriptsDir = 'f:/Fallout/_scripts';
const files = fs.readdirSync(scriptsDir).filter(f => f.startsWith('_batch_gen_') && f.endsWith('.js'));

let count = 0;

for (const file of files) {
    const filePath = path.join(scriptsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix 2: Add <h2>感想</h2> before quote-box replacement if not there
    const targetKansoRegex = /`<div class="quote-box" style="margin-top: 40px; border-top: 3px solid var\(--accent-color\);"><p class="quote-text">\$\{article\.kanso\}<\/p><\/div>`/g;
    const newKansoStr = '`<h2>感想</h2>\\n<div class="quote-box" style="margin-top: 40px; border-top: 3px solid var(--accent-color);"><p class="quote-text">${article.kanso}</p></div>`';
    
    if (targetKansoRegex.test(content)) {
        content = content.replace(targetKansoRegex, newKansoStr);
        fs.writeFileSync(filePath, content, 'utf8');
        count++;
    }
}

console.log(`Successfully added Kansou header to ${count} files.`);
