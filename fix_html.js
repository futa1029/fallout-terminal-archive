const fs = require('fs');
const path = require('path');

const dir = 'f:\\Fallout';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;

files.forEach(f => {
    let filePath = path.join(dir, f);
    let orig = fs.readFileSync(filePath, 'utf8');
    let txt = orig;

    txt = txt.replace(/color:\s*#ffce07\s*!important/gi, 'color: var(--accent-color) !important');
    txt = txt.replace(/border-bottom:\s*1px\s+dashed\s*#ffce07\s*!important/gi, 'border-bottom: 1px dashed var(--accent-color) !important');
    txt = txt.replace(/background-color:\s*rgba\(\s*255\s*,\s*206\s*,\s*7\s*,\s*0\.2\s*\)/gi, 'background-color: color-mix(in srgb, var(--accent-color) 20%, transparent)');
    txt = txt.replace(/border-bottom:\s*1px\s+solid\s*#ffce07\s*!important/gi, 'border-bottom: 1px solid var(--accent-color) !important');

    txt = txt.replace(/<div\s+style=\"[^\"]*border-top:\s*1px\s+solid\s+#444[^\"]*\">[\s\S]*?This article uses material[\s\S]*?<\/div>/gi, '');

    if (txt !== orig) {
        fs.writeFileSync(filePath, txt, 'utf8');
        count++;
    }
});

console.log('Fixed CSS and duplicates in ' + count + ' files.');
