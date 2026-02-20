const fs = require('fs');
const path = require('path');

const DIR = 'f:/Fallout';
const slugMap = JSON.parse(fs.readFileSync(path.join(DIR, 'title_to_slug.json'), 'utf8'));

// 1. Update lore.html
const lorePath = path.join(DIR, 'lore.html');
let loreHtml = fs.readFileSync(lorePath, 'utf8');

for (const title of Object.keys(slugMap)) {
    const sanitizedTitle = title.replace(/[\\/:*?"<>|]/g, '_').trim() || 'untitled';
    const oldFilename = sanitizedTitle + '.html';
    const newFilename = slugMap[title] + '.html';

    // Replace standard href
    loreHtml = loreHtml.split(`href="${oldFilename}"`).join(`href="${newFilename}"`);
    // Replace URL encoded
    loreHtml = loreHtml.split(`href="${encodeURIComponent(oldFilename)}"`).join(`href="${newFilename}"`);
    // Replace any leftover Japanese names
    loreHtml = loreHtml.split(`href="${title}.html"`).join(`href="${newFilename}"`);
    loreHtml = loreHtml.split(`href="${encodeURIComponent(title + '.html')}"`).join(`href="${newFilename}"`);

    // 2. Delete old output files
    const oldPath = path.join(DIR, oldFilename);
    const oldPathJp = path.join(DIR, title + '.html');

    if (fs.existsSync(oldPath)) {
        try { fs.unlinkSync(oldPath); console.log('Deleted: ' + oldFilename); } catch (e) { }
    }
    if (fs.existsSync(oldPathJp)) {
        try { fs.unlinkSync(oldPathJp); console.log('Deleted: ' + title + '.html'); } catch (e) { }
    }
}

fs.writeFileSync(lorePath, loreHtml, 'utf8');
console.log('Finished updating lore.html and cleaning up old files.');
