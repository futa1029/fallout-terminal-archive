const fs = require('fs');

const content = fs.readFileSync('js/lore_index_v7.js', 'utf8');
const lines = content.split(/\r?\n/);

console.log('Total lines:', lines.length);

// 19916行目（0-indexedでは19915）から 10mmピストル が始まる
// その直前のエントリーの終わり（19915行目）までを残す
const cleanLines = lines.slice(0, 19914);
cleanLines.push('        ];');

let newContent = cleanLines.join('\n');

// アーロン・キンバルの修正（文字化け対策とURL修正）
// 既存のエントリーを置換する
newContent = newContent.replace(
    /\{[\s\S]*?url:\s*"aaron-kimball\.html"[\s\S]*?\}/g,
    `{
                name: "Aaron Kimball (アーロン・キンバル)",
                yomi: "アーロン・キンバル",
                url: "aaron-kimball.html",
                category: "人物",
                appearance: ["Fallout: New Vegas"],
                date: "2026-04-20",
                isDraft: false
            }`
);

// 重複していたアーロンホルト農場も整理（もし残っていれば）
// 今回は単純化のため、URLで一意にするような高度な処理はせず、手動で怪しい箇所を直す

fs.writeFileSync('js/lore_index_v8.js', newContent, 'utf8');
console.log('Created js/lore_index_v8.js');
