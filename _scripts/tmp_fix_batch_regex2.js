const fs = require('fs');
const path = require('path');

const scriptsDir = 'f:/Fallout/_scripts';
const files = fs.readdirSync(scriptsDir).filter(f => f.startsWith('_batch_gen_') && f.endsWith('.js'));

let count = 0;

for (const file of files) {
    const filePath = path.join(scriptsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix 1: Body replacement regex leaving "Ulysses background." 
    // From: .replace(/<h1>.*?(?=<h2>)/s
    // To:   .replace(/<h1>.*?(?=<div class="quote-box")/s
    content = content.replace(/<h1\>.*?\(\?\=\<h2\>\)\/s/g, '<h1>.*?(?=<div class="quote-box")/s');

    // Fix 2: Add <h2>感想</h2> before quote-box replacement if not there
    // The current line is:
    // .replace(/<div class="quote-box" style="margin-top: 40px; border-top: 3px solid var\(--accent-color\);">.*?<\/div>/s, `<div class="quote-box" style="margin-top: 40px; border-top: 3px solid var(--accent-color);"><p class="quote-text">${article.kanso}</p></div>`)
    const targetKansoStr = '`<div class="quote-box" style="margin-top: 40px; border-top: 3px solid var(--accent-color);"><p class="quote-text">${article.kanso}</p></div>`';
    const newKansoStr = '`<h2>感想</h2>\\n<div class="quote-box" style="margin-top: 40px; border-top: 3px solid var(--accent-color);"><p class="quote-text">${article.kanso}</p></div>`';
    
    if (content.includes(targetKansoStr)) {
        content = content.replace(targetKansoStr, newKansoStr);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    count++;
}

console.log(`Fixed 2 missing features in ${count} files.`);
