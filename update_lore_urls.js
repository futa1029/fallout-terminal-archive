const fs = require('fs');
const path = require('path');

const DIR = 'f:/Fallout';
const slugMap = JSON.parse(fs.readFileSync(path.join(DIR, 'title_to_slug.json'), 'utf8'));
const lorePath = path.join(DIR, 'lore.html');
let loreHtml = fs.readFileSync(lorePath, 'utf8');

let modified = false;

for (const title of Object.keys(slugMap)) {
    const slug = slugMap[title];
    const newUrl = slug + '.html';

    // Replace URL encoded format
    const urlPattern1 = `url: "${encodeURIComponent(title + '.html')}"`;
    if (loreHtml.includes(urlPattern1)) {
        loreHtml = loreHtml.split(urlPattern1).join(`url: "${newUrl}"`);
        modified = true;
    }

    // Replace raw format
    const urlPattern2 = `url: "${title}.html"`;
    if (loreHtml.includes(urlPattern2)) {
        loreHtml = loreHtml.split(urlPattern2).join(`url: "${newUrl}"`);
        modified = true;
    }

    // Replace sanitized format
    const sanitizedTitle = title.replace(/[\\/:*?"<>|]/g, '_').trim() || 'untitled';
    const urlPattern3 = `url: "${sanitizedTitle}.html"`;
    if (loreHtml.includes(urlPattern3)) {
        loreHtml = loreHtml.split(urlPattern3).join(`url: "${newUrl}"`);
        modified = true;
    }
}

if (modified) {
    fs.writeFileSync(lorePath, loreHtml, 'utf8');
    console.log('lore.html URLs updated successfully.');
} else {
    console.log('No URLs needed updating or format mismatch in lore.html.');
}
