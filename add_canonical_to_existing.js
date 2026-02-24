/**
 * add_canonical_to_existing.js
 * 既にOGPタグがある（inject_ogp.js適用済み）記事ページに、
 * canonical・og:locale・twitter:siteが不足している場合は追加する
 */

const fs = require('fs');
const path = require('path');

const DIR = 'f:\\Fallout';
const BASE_URL = 'https://www.fallout-jp.com';

// 非記事ページはスキップ
const SKIP_FILES = ['lore.html', 'index.html', 'f76.html', 'nw.html', 'buds_full.html',
    'about.html', 'rules.html', 'resources.html', 'changelog.html', 'donate.html'];

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html') && !SKIP_FILES.includes(f));

let updatedCount = 0;
let skippedCount = 0;

for (const file of files) {
    const filePath = path.join(DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    const ogUrl = `${BASE_URL}/${file}`;

    // canonical がない場合は </title> の直後に追加
    if (!html.includes('rel="canonical"')) {
        html = html.replace(/(<\/title>)/i, `$1\n    <link rel="canonical" href="${ogUrl}">`);
        changed = true;
    }

    // og:locale がない場合は og:site_name の後に追加
    if (!html.includes('og:locale')) {
        html = html.replace(
            /(<meta property="og:site_name"[^>]+>)/i,
            `$1\n    <meta property="og:locale" content="ja_JP">`
        );
        changed = true;
    }

    // twitter:site がない場合は twitter:card の後に追加
    if (!html.includes('twitter:site')) {
        html = html.replace(
            /(<meta name="twitter:card"[^>]+>)/i,
            `$1\n    <meta name="twitter:site" content="@IwamotoFuta">`
        );
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, html, 'utf8');
        updatedCount++;
    } else {
        skippedCount++;
    }
}

console.log(`完了: ${updatedCount}件更新、${skippedCount}件スキップ`);
