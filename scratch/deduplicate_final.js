const fs = require('fs');

const content = fs.readFileSync('js/lore_index_v9.js', 'utf8');

// エントリーを抽出する簡易パース
// 各 { ... } ブロックを抽出
const entryRegex = /\{\s*name:[\s\S]*?url:\s*"([^"]+)"[\s\S]*?\}/g;
const entries = [];
let match;
while ((match = entryRegex.exec(content)) !== null) {
    const block = match[0];
    const url = match[1];
    
    // date を抽出
    const dateMatch = block.match(/date:\s*"([^"]+)"/);
    const date = dateMatch ? dateMatch[1] : '0000-00-00';
    
    entries.push({ url, date, block });
}

console.log('Total entries found:', entries.length);

const uniqueEntries = new Map();

entries.forEach(entry => {
    if (!uniqueEntries.has(entry.url)) {
        uniqueEntries.set(entry.url, entry);
    } else {
        // すでに存在する場合、日付が新しい方を採用
        const existing = uniqueEntries.get(entry.url);
        if (entry.date > existing.date) {
            uniqueEntries.set(entry.url, entry);
        }
    }
});

console.log('Unique entries:', uniqueEntries.size);

// 新しいファイルの内容を構築
let newContent = 'const loreEntries = [\n';
const values = Array.from(uniqueEntries.values());

// 出現順または日付順にソート（ここでは元の出現順を尊重しつつ、URLで安定させる）
// ユーザーの体験を壊さないよう、基本はそのまま
values.forEach((entry, index) => {
    newContent += '            ' + entry.block;
    if (index < values.length - 1) {
        newContent += ',\n';
    } else {
        newContent += '\n';
    }
});
newContent += '        ];\n';

fs.writeFileSync('js/lore_index_v10.js', newContent, 'utf8');
console.log('Successfully created js/lore_index_v10.js (fully deduplicated)');
