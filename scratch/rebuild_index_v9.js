const fs = require('fs');

// v5 をバイナリとして読み込み、Shift-JIS などの可能性も考慮して UTF-8 でデコード
// (実際には fs.readFileSync(..., 'utf8') で十分なはず)
const content = fs.readFileSync('js/lore_index_v5.js', 'utf8');
const lines = content.split(/\r?\n/);

// 重複セクションが始まる 19924行目（0-indexedでは19923）の直前までを取得
const cleanLines = lines.slice(0, 19923);
cleanLines.push('        ];');

let newContent = cleanLines.join('\n');

// アーロン・キンバルの修正（正規表現を厳密にして誤爆を防ぐ）
const kimballEntry = `{
                name: "Aaron Kimball (アーロン・キンバル)",
                yomi: "アーロン・キンバル",
                url: "aaron-kimball.html",
                category: "人物",
                appearance: ["Fallout: New Vegas"],
                date: "2026-04-20",
                isDraft: false
            }`;

// url: "aaron-kimball.html" を含む最近傍の {} を置換
// インデックス内の行範囲（8850-8870付近）に限定して置換することで安全性を高める
const kimballSearchRegex = /\{\s*name:\s*"Aaron Kimball[\s\S]*?url:\s*"aaron-kimball\.html"[\s\S]*?\}/;
newContent = newContent.replace(kimballSearchRegex, kimballEntry);

// アーロンホルト農場の重複削除（28行目付近にあるものを整理）
// ここでは手動で「農家」と「農場」を区別しつつ重複を削る
newContent = newContent.replace(
    /\{\s*name:\s*"アーロンホルト農場"[\s\S]*?url:\s*"aaron-holt-farm\.html"[\s\S]*?\}/,
    `{
                name: "アーロンホルト農場",
                yomi: "アーロンホルト農場",
                url: "aaron-holt-farm.html",
                category: "場所",
                appearance: ["Fallout 76"],
                date: "2026-04-20"
            }`
);

fs.writeFileSync('js/lore_index_v9.js', newContent, 'utf8');
console.log('Successfully created js/lore_index_v9.js');
