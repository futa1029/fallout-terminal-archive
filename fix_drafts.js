const fs = require('fs');
const FILE_PATH = 'F:/Fallout/remove_duplicates.js';
let code = fs.readFileSync(FILE_PATH, 'utf8');

// protectedFilesリストを取得（公開済み記事のリスト）
const protectedMatch = code.match(/const protectedFiles = \[(.*?)\];/s);
let protectedStr = protectedMatch ? protectedMatch[1] : '';
const protectedFiles = protectedStr.split(',').map(s => s.trim().replace(/'/g, '').replace(/"/g, ''));

// manualEntriesブロックを取得
const manualMatch = code.match(/const manualEntries = \[(.*?)\];/s);
let manualStr = manualMatch[1];
let lines = manualStr.split('\n');

const TO_DELETE = [
    'fo76-guide.html',
    'resources.html',
    'season.html',
    'rules.html',
    'contact.html',
    'fallout-4.html',
    'fallout-3.html',
    'fallout-1.html',
    'fallout-2.html',
    'fallout-new-vegas.html',
    'fallout-tactics.html',
    'mysterious-guidestones.html' // ミステリアス・ガイドストーン(もしこれも対象外なら)
];

let newLines = [];
let fixed = 0;
let deleted = 0;

for (let line of lines) {
    if (!line.trim()) {
        newLines.push(line);
        continue;
    }

    const urlMatch = line.match(/url:\s*"([^"]+)"/);
    if (!urlMatch) {
         newLines.push(line);
         continue;
    }
    const url = urlMatch[1];
    const slug = url.split('.html')[0];

    // UIページやメタページは削除
    if (TO_DELETE.includes(url) || slug === 'fo76-guide' || slug === 'resources' || slug === 'season') {
        deleted++;
        continue;
    }

    // すでに公開されているはずの記事（protectedFilesに含まれる）からstatus:"draft"を削除
    if (protectedFiles.includes(slug) && line.includes('status: "draft"')) {
        let newLine = line.replace(/,\s*status:\s*"draft"/, '');
        newLines.push(newLine);
        fixed++;
        continue;
    }

    newLines.push(line);
}

// コードの置き換え
const newManualStr = newLines.join('\n');
code = code.replace(manualMatch[1], newManualStr);
fs.writeFileSync(FILE_PATH, code, 'utf8');

console.log('Fixed:', fixed, 'entries');
console.log('Deleted:', deleted, 'entries');
