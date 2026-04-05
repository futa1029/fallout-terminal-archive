const fs = require('fs');
const path = require('path');

const dir = 'f:/Fallout';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const skipFiles = ['lore.html', 'admin.html', 'index.html', 'perk-simulator.html', '_vault_fandom.html'];

let issuesFound = 0;

for (const file of files) {
    if (skipFiles.includes(file)) continue;
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    let fileIssues = [];

    // Check 1: 壊れたインラインスタイル
    if (content.match(/style="[^"]*<p/)) {
        fileIssues.push('壊れたstyle属性に<p>タグが含まれている');
    }
    if (content.match(/font-weig[^h：:]/)) {
        fileIssues.push('font-weightスタイルが不完全');
    }

    // Check 2: HTMLタグ外に漏れ出た英語テキスト
    if (content.match(/<\/p>[a-zA-Z]/)) {
        fileIssues.push('</p>の直後に英語テキストが漏れ出している');
    }

    // Check 3: 未翻訳セクション見出し
    if (content.includes('<h2>See also</h2>')) {
        fileIssues.push('未翻訳: "See also" セクション');
    }
    if (content.includes('<h2>Behind the scenes</h2>')) {
        fileIssues.push('未翻訳: "Behind the scenes" セクション');
    }
    if (content.includes('<h2>Bugs</h2>') || content.includes('<h2>Bug</h2>')) {
        fileIssues.push('未翻訳: "Bugs" セクション');
    }

    // Check 4: Wikiマークアップ「*」の残留（<p>内の行頭アスタリスク）
    const asteriskPattern = /^[*]{1,2}\s+/m;
    if (asteriskPattern.test(content)) {
        // ただしscriptタグやstyleタグ内は除外
        const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/);
        if (bodyMatch) {
            const bodyContent = bodyMatch[1].replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
            if (asteriskPattern.test(bodyContent)) {
                fileIssues.push('Wikiマークアップ「*」がHTMLリストに変換されていない');
            }
        }
    }

    // Check 5: 長文段落に<br>がない（300文字以上の<p>タグ内テキスト）
    const longParas = content.match(/<p>[^<]{300,}<\/p>/g);
    if (longParas) {
        for (const p of longParas) {
            if (!p.includes('<br>') && !p.includes('<br/>') && !p.includes('<br />')) {
                fileIssues.push(`改行なしの長文段落あり (${p.length}文字)`);
                break;
            }
        }
    }

    // Check 6: <h1>タグの不一致
    const h1Open = (content.match(/<h1[\s>]/g) || []).length;
    const h1Close = (content.match(/<\/h1>/g) || []).length;
    if (h1Open !== h1Close) {
        fileIssues.push(`<h1>タグ不一致: 開き${h1Open} / 閉じ${h1Close}`);
    }

    if (fileIssues.length > 0) {
        console.log(`[!] ${file}:`);
        fileIssues.forEach(i => console.log(`  - ${i}`));
        issuesFound++;
    }
}

if (issuesFound === 0) {
    console.log('全HTMLファイルに深刻なレイアウト・翻訳の問題は見つかりませんでした。');
} else {
    console.log(`\n問題のあるファイル数: ${issuesFound}`);
}
