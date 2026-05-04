const fs = require('fs');
const path = require('path');

const dir = 'f:/Fallout';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('_'));

function getWikiSlug(slug) {
    let wikiName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('_');
    wikiName = wikiName.replace(/_Tv_Series$/, '_(TV_series)');
    wikiName = wikiName.replace(/_Tv$/, '_(TV)');
    wikiName = wikiName.replace(/_Fallout_76$/, '_(Fallout_76)');
    return wikiName;
}

let changedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // "Endor" のコピーライト表記を探す
    const regex = /This article uses material from the “Endor” article on the (Star Wars|Fallout) wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License\.?[　 \t]*/g;

    if (regex.test(html)) {
        const slug = file.replace('.html', '');
        let wikiSlug = getWikiSlug(slug);

        // <h1>から英語名を抽出（フォールバックはスラグをベースに）
        let englishTitle = wikiSlug.replace(/_/g, ' ');
        const h1Match = html.match(/<h1[^>]*>([^<]+)(?:<br|<)/i);
        if (h1Match && h1Match[1].trim().match(/^[A-Za-z0-9\s\.\,\'\-]+$/)) {
            englishTitle = h1Match[1].trim();
        }

        const url = `https://fallout.fandom.com/wiki/${wikiSlug}`;
        
        // 置換する正しい文章
        const correctText = `This article was created by translating and editing <a href="${url}" target="_blank" rel="noopener">${englishTitle}</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.`;

        // 置換後、保存 (すでに <p> 等に囲まれているのでテキストを置き換えるだけ)
        const newHtml = html.replace(regex, correctText);
        
        fs.writeFileSync(filePath, newHtml, 'utf8');
        changedCount++;
        console.log(`[Fixed] ${file}`);
    }
}

console.log(`\n========== SUMMARY ==========`);
console.log(`Fixed files count: ${changedCount}`);
