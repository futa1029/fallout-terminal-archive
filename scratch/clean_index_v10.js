const fs = require('fs');

function cleanIndex() {
    const file = 'js/lore_index_v10.js';
    let content = fs.readFileSync(file, 'utf8');
    const start = content.indexOf('[');
    const end = content.lastIndexOf(']');
    const prefix = content.substring(0, start);
    const suffix = content.substring(end + 1);
    const jsonStr = content.substring(start, end + 1);
    
    let entries = eval(jsonStr);
    
    // Deduplicate by URL
    const map = new Map();
    for (const entry of entries) {
        if (!entry.url) continue;
        
        // Prefer yao-guai.html over yao-guai-fo76.html
        if (entry.url === 'yao-guai-fo76.html') {
            if (!map.has('yao-guai.html')) {
                entry.url = 'yao-guai.html';
                map.set('yao-guai.html', entry);
            }
            continue;
        }
        
        if (entry.url === 'yao-guai.html') {
            // Update to latest comprehensive version
            entry.name = 'ヤオ・グアイ';
            entry.appearance = ["Fallout 3", "Fallout: New Vegas", "Fallout 4", "Fallout 76", "TVシリーズ"];
            entry.isDraft = true;
            map.set(entry.url, entry);
        } else {
            map.set(entry.url, entry);
        }
    }
    
    const cleanedEntries = Array.from(map.values());
    cleanedEntries.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'ja'));
    
    const newContent = prefix + JSON.stringify(cleanedEntries, null, 4) + suffix;
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Cleaned index. Total entries: ${cleanedEntries.length}`);
}

cleanIndex();
