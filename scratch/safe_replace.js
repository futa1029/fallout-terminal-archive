const fs = require('fs');
const content = fs.readFileSync('remove_duplicates.js', 'utf8');
const newContent = content.replace(/lore_index_v10\.js/g, 'lore_index_v11.js');
fs.writeFileSync('remove_duplicates.js', newContent, 'utf8');
console.log('Done');
