const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/js/lore_index.js', 'utf8');

// The file looks like: const loreEntries = [ { ... }, { ... } ];
const match = content.match(/const loreEntries = \[([\s\S]*?)\];/);

if (match) {
    let arrayContent = match[1];
    // Split by individual object entries.
    // It's safer to use regex to find all objects.
    const objRegex = /\{\s*name:\s*"[^"]*",\s*yomi:\s*"[^"]*",\s*url:\s*"([^"]+)"[\s\S]*?\}/g;
    
    let seenUrls = new Set();
    let newArrayContent = arrayContent.replace(objRegex, (objStr, url) => {
        if (seenUrls.has(url)) {
            // It's a duplicate, remove it
            console.log('Removed duplicate for url:', url);
            return ''; // This might leave a stray comma, we'll clean it up
        } else {
            seenUrls.add(url);
            return objStr;
        }
    });

    // Clean up commas
    newArrayContent = newArrayContent.replace(/,\s*,/g, ',');
    // Clean up starting comma if any
    newArrayContent = newArrayContent.replace(/^\s*,/, '');
    
    content = content.replace(match[1], newArrayContent);
    fs.writeFileSync('f:/Fallout/js/lore_index.js', content, 'utf8');
    console.log('Deduplication done.');
} else {
    console.log('Could not parse loreEntries.');
}
