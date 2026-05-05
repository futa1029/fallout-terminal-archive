const fs = require('fs');

const content = fs.readFileSync('js/lore_index_v5.js', 'utf8');
const lines = content.split(/\r?\n/);

// 19920行目が '            },' なので、そこまでを取得
// 0-indexed では 19919
const cleanLines = lines.slice(0, 19920);
cleanLines.push('        ];');

let newContent = cleanLines.join('\n');

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

fs.writeFileSync('js/lore_index_v9.js', newContent, 'utf8');
console.log('Successfully created js/lore_index_v9.js (final fix)');
