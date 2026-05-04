const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('f:/Fallout/_drafts/tv_locations_raw.json', 'utf8'));

function getSlug(name) {
    return name.toLowerCase().replace(/[^a-z0-g0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

// 1. Update changelog
let changelog = [];
try { changelog = JSON.parse(fs.readFileSync('f:/Fallout/changelog-data.json', 'utf8')); } catch(e){}

let titleToSlug = {};
try { titleToSlug = JSON.parse(fs.readFileSync('f:/Fallout/title_to_slug.json', 'utf8')); } catch(e){}

for(let title of Object.keys(raw)) {
    if(raw[title].startsWith('Error')) continue;
    const slug = getSlug(title);
    
    // check if it exists in changelog
    let exists = false;
    for(let entry of changelog) {
        if(entry.url === slug + '.html') {
            exists = true; break;
        }
    }
    
    // Title mapping
    titleToSlug[title] = slug;
    
    if(!exists) {
        changelog.unshift({
            name: title,
            yomi: title.toLowerCase(), // generic yomi
            url: slug + '.html',
            category: '場所',
            appearance: ['Fallout TV series'],
            date: new Date().toISOString().split('T')[0],
            status: 'draft'
        });
    }
}
fs.writeFileSync('f:/Fallout/changelog-data.json', JSON.stringify(changelog, null, 4));
fs.writeFileSync('f:/Fallout/title_to_slug.json', JSON.stringify(titleToSlug, null, 2));

// 2. Add to remove_duplicates manualEntries
let remDup = fs.readFileSync('f:/Fallout/remove_duplicates.js', 'utf8');

// Generate the array snippet
let manualEntriesStr = 'const manualEntries = [\\n';
for(let title of Object.keys(raw)) {
    if(raw[title].startsWith('Error')) continue;
    const slug = getSlug(title);
    if (!remDup.includes(slug + '.html')) {
        manualEntriesStr += \`    { name: "\${title.replace(/"/g, '\\\\"')}", yomi: "\${title.toLowerCase().replace(/"/g, '\\\\"')}", url: "\${slug}.html", category: "場所", appearance: ["Fallout TV series"], date: new Date().toISOString().split('T')[0], status: "draft" },\\n\`;
    }
}
remDup = remDup.replace('const manualEntries = [', manualEntriesStr);
fs.writeFileSync('f:/Fallout/remove_duplicates.js', remDup);

console.log('Indices updated with 63 locations.');
