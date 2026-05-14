const fs = require('fs');
const { execSync } = require('child_process');

function getEntries(content) {
    const start = content.indexOf('[');
    const end = content.lastIndexOf(']');
    if (start === -1 || end === -1) return [];
    const jsonStr = content.substring(start, end + 1);
    try {
        return JSON.parse(jsonStr);
    } catch (e) {
        try {
            return eval(jsonStr);
        } catch (e2) {
            return [];
        }
    }
}

async function main() {
    const localFile = 'js/lore_index_v10.js';
    const remoteContent = execSync('git show origin/main:js/lore_index_v10.js').toString('utf8');
    const localContent = fs.readFileSync(localFile, 'utf8');

    const remoteEntries = getEntries(remoteContent);
    const localEntries = getEntries(localContent);

    const mergedMap = new Map();

    // Fill with remote entries first
    for (const entry of remoteEntries) {
        if (entry && entry.url) {
            mergedMap.set(entry.url, entry);
        }
    }

    // Yao Guai specific merge
    // We want to ensure 'yao-guai.html' exists and covers all games.
    const yaoGuaiEntry = {
        "name": "ヤオ・グアイ",
        "yomi": "ヤオ・グアイ",
        "url": "yao-guai.html",
        "category": "クリーチャー",
        "appearance": [
            "Fallout 3",
            "Fallout: New Vegas",
            "Fallout 4",
            "Fallout 76",
            "TVシリーズ"
        ],
        "date": "2026-05-14"
    };
    
    mergedMap.set('yao-guai.html', yaoGuaiEntry);
    mergedMap.delete('yao-guai-fo76.html'); // Remove the old one

    const mergedArray = Array.from(mergedMap.values());
    mergedArray.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'ja'));

    const finalContent = 'var loreEntries = ' + JSON.stringify(mergedArray, null, 4) + ';';
    fs.writeFileSync(localFile, finalContent, 'utf8');
    console.log(`Merged entries: ${mergedArray.length}`);
}

main();
