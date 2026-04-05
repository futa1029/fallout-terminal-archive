const fs = require('fs');
const path = require('path');
const dir = 'f:/Fallout';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'lore.html' && f !== 'admin.html');

let issues = [];

files.forEach(f => {
    const html = fs.readFileSync(path.join(dir, f), 'utf8');
    
    // Links generally formatted as: <a href="some-tape.html"...>name</a> - ホロテープ
    // Or just looking for all cases where "ホロテープ" or "メモ" appears but there is no box.
    const hasHolotapeText = html.includes('ホロテープ');
    const hasNoteText = html.includes('メモ');
    const hasTerminalText = html.includes('ターミナル');
    
    const hasHolotapeBox = html.includes('class="holotape-box"');
    const hasNoteBox = html.includes('class="note-box"');
    const hasTerminalBox = html.includes('class="terminal-box"');

    // More precise extraction: find lines in <ul> or <p> that mention Holotape or Note
    // and have a link
    const regex = /<a href="([^"]+)"[^>]*>([^<]+)<\/a>[^<]*?(ホロテープ|メモ|ターミナル)/g;
    
    let match;
    let missingLogs = [];
    while ((match = regex.exec(html)) !== null) {
        missingLogs.push({ url: match[1], name: match[2], type: match[3] });
    }
    
    // Also check for the format: "監督官のログ、5 - ホロテープ" (without link if auto-link failed)
    const regex2 = /<li>([^<]+)\s*-\s*(ホロテープ|メモ|ターミナル)/g;
    while ((match = regex2.exec(html)) !== null) {
        // filter out ones we already grabbed by auto-link
        if (!missingLogs.some(l => match[1].includes(l.name))) {
            let name = match[1].replace(/<[^>]+>/g, '').trim(); // Remove any inner HTML tags
            missingLogs.push({ url: null, name: name, type: match[2] });
        }
    }

    if (missingLogs.length > 0) {
        // Check if the content is embedded. An embedded holotape usually has the text of the name in the box header,
        // or just generally checking if boxes exist. If 2 tapes are mentioned and only 1 box exists, we have an issue.
        const boxCount = (html.match(/class="holotape-box"/g) || []).length + 
                         (html.match(/class="note-box"/g) || []).length +
                         (html.match(/class="terminal-box"/g) || []).length;
                         
        if (boxCount < missingLogs.length) {
            issues.push({ file: f, missing: missingLogs, boxCount: boxCount });
        }
    }
});

fs.writeFileSync('f:/Fallout/_scripts/missing_tapes_report.json', JSON.stringify(issues, null, 2), 'utf8');
console.log(`Found ${issues.length} articles with missing tapes/notes.`);
