const fs = require('fs');
const path = require('path');

const dir = 'f:/Fallout';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const problematicFiles = [];

files.forEach(file => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if the file has any simple list items containing "ホロテープ" or "メモ" or "holotape" or "note"
    // AND missing the corresponding box components if they should exist.
    // For simplicity, we just look for bullet points
    const hasBulletedLore = /(?:<p>•|<li>).*?(ホロテープ|メモ|日誌|記録|手紙).*?(<\/p>|<\/li>)/.test(content);
    
    // Also check if it lacks <div class="holotape-box"> or <div class="note-box">
    const hasBox = content.includes('class="holotape-box"') || content.includes('class="note-box"');
    
    // Some files might have both (if only partial integration), so we'll collect any file that has bulleted lore
    // and is a location or character article (assumed if it exists in the main directory)
    // Actually, any bulleted lore is a candidate for checking.
    if (hasBulletedLore) {
        problematicFiles.push(file);
    }
});

fs.writeFileSync('f:/Fallout/lore_integration_candidates.json', JSON.stringify(problematicFiles, null, 2));
console.log(`Found ${problematicFiles.length} files that may need lore integration.`);
