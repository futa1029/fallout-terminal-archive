// 全HTMLファイルを対象に:
// 1. Wikiマークアップ「*」→ <ul><li> 変換
// 2. 長文段落（300文字以上で<br>なし）に「。」改行を挿入
const fs = require('fs');
const path = require('path');

const DIR = 'f:/Fallout';
const skipFiles = ['lore.html', 'admin.html', 'index.html', 'perk-simulator.html', '_vault_fandom.html'];

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html') && !skipFiles.includes(f));

let asteriskFixed = 0;
let linebreakFixed = 0;

for (const file of files) {
    const filePath = path.join(DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // === Part 1: Wikiマークアップ「*」→ <ul><li> ===
    // パターン1: <p>\n* item<br>\n* item</p>
    const newHtml1 = html.replace(/<p>\r?\n(\*{1,2}\s+[\s\S]*?)<\/p>/g, (match, innerContent) => {
        const lines = innerContent.split(/\r?\n/);
        let listItems = [];
        for (let line of lines) {
            line = line.replace(/<br\s*\/?>$/,'').trim();
            if (!line) continue;
            const starMatch = line.match(/^(\*{1,2})\s+(.*)/);
            if (starMatch) {
                const level = starMatch[1].length;
                const text = starMatch[2];
                if (level === 1) {
                    listItems.push(`<li>${text}</li>`);
                } else {
                    listItems.push(`<li style="margin-left:20px;">${text}</li>`);
                }
            }
        }
        if (listItems.length > 0) {
            return `<ul>\n${listItems.join('\n')}\n</ul>`;
        }
        return match;
    });
    if (newHtml1 !== html) {
        html = newHtml1;
        modified = true;
        asteriskFixed++;
        console.log(`[*→ul] ${file}`);
    }

    // パターン2: 文頭に<b>がある「* <b>item</b>」形式 (vault-63-organics スタイル)
    const newHtml1b = html.replace(/<p>(<b>[^<]*<\/b>)<br>\r?\n(\*{1,2}\s+[\s\S]*?)<\/p>/g, (match, headerTag, innerContent) => {
        const lines = innerContent.split(/\r?\n/);
        let listItems = [];
        for (let line of lines) {
            line = line.replace(/<br\s*\/?>$/,'').trim();
            if (!line) continue;
            const starMatch = line.match(/^(\*{1,2})\s+(.*)/);
            if (starMatch) {
                const level = starMatch[1].length;
                const text = starMatch[2];
                if (level === 1) {
                    listItems.push(`<li>${text}</li>`);
                } else {
                    listItems.push(`<li style="margin-left:20px;">${text}</li>`);
                }
            }
        }
        if (listItems.length > 0) {
            return `<p>${headerTag}</p>\n<ul>\n${listItems.join('\n')}\n</ul>`;
        }
        return match;
    });
    if (newHtml1b !== html) {
        html = newHtml1b;
        modified = true;
        asteriskFixed++;
        console.log(`[*→ul(header)] ${file}`);
    }

    // === Part 2: 長文段落に「。」改行を挿入 ===
    const newHtml2 = html.replace(/<p>([^<]{300,})<\/p>/g, (match, content) => {
        if (content.includes('<br>')) return match;
        // 「。」の後に文字が続く箇所に<br>を挿入（末尾は除外）
        const result = content.replace(/。(?=.)/g, '。<br>');
        if (result !== content) {
            return `<p>${result}</p>`;
        }
        return match;
    });
    if (newHtml2 !== html) {
        html = newHtml2;
        modified = true;
        linebreakFixed++;
        console.log(`[改行追加] ${file}`);
    }

    if (modified) {
        fs.writeFileSync(filePath, html, 'utf8');
    }
}

console.log(`\n=== 完了 ===`);
console.log(`Wikiマークアップ修正: ${asteriskFixed}ファイル`);
console.log(`改行追加: ${linebreakFixed}ファイル`);
