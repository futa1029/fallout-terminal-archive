const fs = require('fs');

function fixIndex() {
    const file = 'js/lore_index_v10.js';
    let content = fs.readFileSync(file, 'utf8');
    
    // Extract everything between the first [ and the last ]
    const start = content.indexOf('[');
    const end = content.lastIndexOf(']');
    const inner = content.substring(start, end + 1);
    
    let entries;
    try {
        entries = eval(inner);
        // If it was nested [[...]], entries[0] will be the array
        if (Array.isArray(entries) && Array.isArray(entries[0])) {
            entries = entries[0];
        }
    } catch (e) {
        console.error("Eval failed: " + e.message);
        return;
    }
    
    const finalContent = 'var loreEntries = ' + JSON.stringify(entries, null, 4) + ';';
    fs.writeFileSync(file, finalContent, 'utf8');
    console.log(`Fixed index. Total entries: ${entries.length}`);
}

fixIndex();
