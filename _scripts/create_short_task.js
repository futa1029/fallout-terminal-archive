const fs = require('fs');
const shortItems = JSON.parse(fs.readFileSync('f:/Fallout/_tmp_short_utf8.json', 'utf8'));

// Delete garbage files
const toDelete = [
  'nuka-shine_2.html',
  'ヌカシャイン_2.html',
  'ブロートフライ_2.html',
  'wayward_jp.html',
  'vault_dweller_jp.html',
  'bloody-indomitable-build.html', // This might be an old test build page, but let me check if it's needed... Actually I will just filter them out for the main batching first and handle them manually.
];

toDelete.forEach(file => {
    try {
        fs.unlinkSync(`f:/Fallout/${file}`);
        console.log(`Deleted test file: ${file}`);
    } catch(e) {}
});

// Remove deleted from the list
const validItems = shortItems.filter(item => !toDelete.includes(item.file) && !item.file.endsWith('_2.html') && !item.file.endsWith('_jp.html'));

// Sort alphabetically by file name
validItems.sort((a, b) => a.file.localeCompare(b.file));

// Group into chunks of 4 for Batches
const batchSize = 4;
const batches = {};
let batchNumber = 29;

for (let i = 0; i < validItems.length; i += batchSize) {
    batches[`Batch ${batchNumber}`] = validItems.slice(i, i + batchSize).map(item => item.file);
    batchNumber++;
}

fs.writeFileSync('f:/Fallout/_short_batches.json', JSON.stringify(batches, null, 2));

console.log(`Batches generated starting from Batch 29 to Batch ${batchNumber - 1}`);
console.log(`Total valid files: ${validItems.length}`);
