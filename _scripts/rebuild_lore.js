const fs = require('fs');
const path = require('path');

const dir = 'f:/Fallout';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'lore.html' && f !== 'index.html' && !f.startsWith('_'));

let newEntries = [];

files.forEach(file => {
    const html = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Parse tags: <body data-article-category="人物" data-article-appearance="Fallout 4">
    const catMatch = html.match(/data-article-category="([^"]+)"/);
    const appMatch = html.match(/data-article-appearance="([^"]+)"/);
    
    // Title is usually inside <h1>Name<br><span...>Yomi</span></h1> or <h1>Name</h1>
    // Let's use regex for <h1>(.*?)<br>.*?<span.*?>(.*?)<\/span><\/h1> or similar
    const h1Match = html.match(/<h1>(.*?)(?:<br>.*?<span[^>]*>(.*?)<\/span>)?<\/h1>/s);
    if (!h1Match) return; // Skip if no h1
    
    let name = h1Match[1].replace(/<[^>]*>/g, '').trim();
    let yomi = h1Match[2] ? h1Match[2].replace(/<[^>]*>/g, '').trim() : '';

    if (!catMatch) return; // Skip non-lore articles like rules.html, about.html
    const cat = catMatch[1];
    let appearanceRaw = appMatch ? appMatch[1] : '';
    let appArray = appearanceRaw.includes(',') ? appearanceRaw.split(',').map(s=>s.trim()) : [appearanceRaw];

    // Some custom overrides? Just push it
    newEntries.push({
        name: name,
        yomi: yomi,
        url: file,
        category: cat,
        appearance: appArray,
        date: "2026-04-04"
    });
});

console.log('Found ' + newEntries.length + ' valid html articles.');
// Also read existing lore.html to preserve any old entries that somehow didn't match
const lorePath = path.join(dir, 'lore.html');
let loreHtml = fs.readFileSync(lorePath, 'utf8');

// replace the const loreEntries = [ ... ]; block
const jsStart = loreHtml.indexOf('const loreEntries = [');
const jsEnd = loreHtml.indexOf('];', jsStart) + 2;

if (jsStart > -1 && jsEnd > -1) {
    const jsonStr = JSON.stringify(newEntries, null, 4);
    const newJs = `const loreEntries = ${jsonStr};`;
    loreHtml = loreHtml.slice(0, jsStart) + newJs + loreHtml.slice(jsEnd);
    fs.writeFileSync(lorePath, loreHtml);
    console.log('Rebuilt loreEntries in lore.html');
} else {
    console.log('loreEntries array not found in lore.html');
}
