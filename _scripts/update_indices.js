const fs = require('fs');

// Update changelog
let changelog = JSON.parse(fs.readFileSync('f:/Fallout/changelog-data.json', 'utf8'));
changelog.unshift({
  name: 'ピット',
  yomi: 'ぴっと',
  url: 'the-pitt.html',
  category: '場所',
  appearance: ['Fallout 3', 'Fallout 76'],
  date: new Date().toISOString().split('T')[0],
  status: 'draft'
});
fs.writeFileSync('f:/Fallout/changelog-data.json', JSON.stringify(changelog, null, 4));

// Update title_to_slug.json
let titleToSlug = JSON.parse(fs.readFileSync('f:/Fallout/title_to_slug.json', 'utf8'));
titleToSlug['The Pitt'] = 'the-pitt';
titleToSlug['ピット'] = 'the-pitt';
fs.writeFileSync('f:/Fallout/title_to_slug.json', JSON.stringify(titleToSlug, null, 2));

// Update remove_duplicates.js (append manualEntry at the top)
let remDup = fs.readFileSync('f:/Fallout/remove_duplicates.js', 'utf8');
const entryCode = `    {
        name: "ピット",
        yomi: "ぴっと",
        url: "the-pitt.html",
        category: "場所",
        appearance: ["Fallout 3", "Fallout 76"],
        date: new Date().toISOString().split('T')[0],
        status: "draft"
    },`;

// Insert the new entry right after 'const manualEntries = ['
remDup = remDup.replace('const manualEntries = [', 'const manualEntries = [\n' + entryCode);
fs.writeFileSync('f:/Fallout/remove_duplicates.js', remDup);

console.log('Indices updated.');
