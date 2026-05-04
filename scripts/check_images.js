const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'brotherhood-of-steel.html');
const imgDir = path.join(__dirname, '..', 'images', 'note_extracted', 'brotherhood-base');

if (!fs.existsSync(htmlPath)) {
    console.error('HTML file not found');
    process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');
const localFiles = fs.readdirSync(imgDir);

// <img>タグのsrc属性からファイル名を抽出
const imgRegex = /images\/note_extracted\/brotherhood-base\/([^"'\s>]+)/g;
const references = new Set();
let match;

while ((match = imgRegex.exec(html)) !== null) {
    references.add(match[1]);
}

console.log(`総参照画像数: ${references.size}`);
console.log(`ローカル画像数: ${localFiles.length}`);

const missing = [];
for (const ref of references) {
    const decoded = decodeURIComponent(ref);
    if (!localFiles.includes(ref) && !localFiles.includes(decoded)) {
        missing.push(ref);
    }
}

if (missing.length > 0) {
    console.log('\n--- リンク切れ画像リスト ---');
    missing.forEach(m => console.log(m));
} else {
    console.log('\nすべての画像が正常にリンクされています。');
}
