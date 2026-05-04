const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = 'f:/Fallout';
const reportPath = 'f:/Fallout/_scripts/missing_tapes_report.json';
const issues = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

// False positive generic terms
const blockedTerms = ['Fallout', 'ホロテープ', 'ターミナル', 'メモ', 'パワーアーマー', 'ロボット', 'ボブルヘッド', '雑誌', 'フュージョン・コア'];

let finalTargets = [];

issues.forEach(issue => {
    const html = fs.readFileSync(path.join(dir, issue.file), 'utf8');
    let realMissing = [];
    
    // We only want the ones in '主なアイテム' or 'Notable loot'
    // But since the structure might vary, let's just parse the HTML robustly for <li>
    const liMatches = html.match(/<li>(.*?)<\/li>/g) || [];
    
    liMatches.forEach(li => {
        if (!li.includes('ホロテープ') && !li.includes('メモ') && !li.includes('ターミナル')) return;
        if (li.includes('class="holotape-box"') || li.includes('class="note-box"')) return;
        
        let aMatch = li.match(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/);
        let name = null;
        let url = null;
        let type = 'メモ';
        if (li.includes('ホロテープ')) type = 'ホロテープ';
        else if (li.includes('ターミナル')) type = 'ターミナル';
        
        if (aMatch) {
            url = aMatch[1];
            name = aMatch[2];
        } else {
            // "監督官のログ、5 - ホロテープ" like structure
            let parts = li.replace(/<[^>]+>/g, '').split('-');
            if (parts.length > 1) {
                name = parts[0].trim();
            }
        }
        
        if (name && !blockedTerms.some(b => name.includes(b))) {
            // Map the filename/name to an actual English title if possible, or we search fandom
            // The Fandom URL slug is usually the Japanese filename minus .html?
            // Actually they are in English: "overseer-s-journal-entry-5.html" -> "Overseer's journal, entry 5"
            // Wait, I can extract the real English title from `title_to_slug.json` or do a Fandom search!
            realMissing.push({ name, url, type, textContent: li });
        }
    });

    if (realMissing.length > 0) {
        
        let fileBoxCount = (html.match(/class="holotape-box"/g) || []).length + 
                           (html.match(/class="note-box"/g) || []).length +
                           (html.match(/class="terminal-box"/g) || []).length;
                           
        if (fileBoxCount < realMissing.length) {
            // Filter ones that are already successfully embedded
            let trulyNeeded = realMissing.filter(rm => !html.includes('>' + rm.name + '<') && !html.includes(rm.name + '</'));
            if (trulyNeeded.length > 0) {
                finalTargets.push({ file: issue.file, items: trulyNeeded });
            }
        }
    }
});

fs.writeFileSync('f:/Fallout/_scripts/final_missing_tapes.json', JSON.stringify(finalTargets, null, 2), 'utf8');
console.log(`Found ${finalTargets.length} files with missing items.`);
