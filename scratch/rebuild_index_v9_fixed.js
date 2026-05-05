const fs = require('fs');

const content = fs.readFileSync('js/lore_index_v5.js', 'utf8');
const lines = content.split(/\r?\n/);

// 重複セクションが始まる 19921行目（0-indexedでは19920）の直前までを取得
const cleanLines = lines.slice(0, 19921);
cleanLines.push('        ];');

let newContent = cleanLines.join('\n');

// アーロン・キンバルの修正
// v5 における Kimball の URL は aaron-kimball.html にすでになっているはずだが
// 念のため内容を完全に上書きする
const kimballEntry = `{
                name: "Aaron Kimball (アーロン・キンバル)",
                yomi: "アーロン・キンバル",
                url: "aaron-kimball.html",
                category: "人物",
                appearance: ["Fallout: New Vegas"],
                date: "2026-04-20",
                isDraft: false
            }`;

const kimballSearchRegex = /\{\s*name:\s*"Aaron Kimball[\s\S]*?url:\s*"aaron-kimball\.html"[\s\S]*?\}/;
newContent = newContent.replace(kimballSearchRegex, kimballEntry);

// アーロンホルト農場の重複削除（もし先頭の方にあれば整理）
// v5 の 28行目は「農場」、36行目は「農家」。これは重複ではないのでそのままにする。
// 重複は 19921行目以降にあったので、slice で消えているはず。

fs.writeFileSync('js/lore_index_v9.js', newContent, 'utf8');
console.log('Successfully created js/lore_index_v9.js (clean version)');
