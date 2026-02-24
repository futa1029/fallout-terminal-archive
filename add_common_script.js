/**
 * add_common_script.js
 * 保護ファイルに data属性と article-common.js のscriptタグを一括追加するスクリプト
 */
const fs = require('fs');
const path = require('path');
const DIR = 'f:\\Fallout';

const protectedMeta = {
    'kimball.html': { cat: '人物', app: 'Fallout: New Vegas' },
    'tandi.html': { cat: '人物', app: 'Fallout,Fallout 2' },
    'raiders_76.html': { cat: '勢力', app: 'Fallout 76' },
    'blight.html': { cat: '植物', app: 'Fallout 76' },
    'ncr.html': { cat: '勢力', app: 'Fallout,Fallout 2,Fallout: New Vegas,Fallout TV' },
    'prize_bot.html': { cat: '人物', app: 'Fallout 76' },
    'assaultron_head.html': { cat: '武器', app: 'Fallout 4,Fallout 76' },
    'lee_moldaver.html': { cat: '人物', app: 'Fallout TV' },
    'vault_dweller_lore.html': { cat: '人物', app: 'Fallout' },
    'vault_dweller_jp.html': { cat: '人物', app: 'Fallout' },
    'wayward_jp.html': { cat: '場所', app: 'Fallout 76' },
    'buffalo-gourd-seed.html': { cat: '植物', app: 'Fallout: New Vegas' },
    'vault_tec.html': { cat: '勢力', app: 'Fallout,Fallout 2,Fallout 3,Fallout 4,Fallout 76,Fallout: New Vegas,Fallout TV' },
    'armor-ace.html': { cat: '人物', app: 'Fallout 76' },
    'billings-homestead.html': { cat: '場所', app: 'Fallout 76' },
    'fallout-76-pets.html': { cat: 'システム', app: 'Fallout 76' }
};

let count = 0;
for (const [file, meta] of Object.entries(protectedMeta)) {
    const fp = path.join(DIR, file);
    if (!fs.existsSync(fp)) { console.log('Not found: ' + file); continue; }
    let html = fs.readFileSync(fp, 'utf8');
    let changed = false;

    // 1. body タグに data 属性を追加
    if (!html.includes('data-article-category')) {
        html = html.replace(/<body>/i, `<body data-article-category="${meta.cat}" data-article-appearance="${meta.app}">`);
        changed = true;
    }

    // 2. article-common.js の script タグを追加
    if (!html.includes('article-common.js')) {
        html = html.replace(/<\/body>/i, '    <script src="article-common.js" defer></script>\n</body>');
        changed = true;
    }

    // 3. infobox に sticky を追加（デスクトップでサイドバーが追従するように）
    html = html.replace(
        /\.infobox\s*\{([^}]*?)height:\s*fit-content;([^}]*?)\}/s,
        (m, before, after) => {
            if (m.includes('position: sticky')) return m; // 既にある場合はスキップ
            return `.infobox {${before}height: fit-content;\n            position: sticky;\n            top: 20px;\n            align-self: start;${after}}`;
        }
    );
    changed = true;

    // 4. .content のフォントサイズを最適化（1.1em→1em、line-height追加）
    html = html.replace(/\.content\s*\{([^}]*?)font-size:\s*1\.1em;/s, (m, before) => {
        return `.content {${before}font-size: 1em;\n            line-height: 1.9;`;
    });

    if (changed) {
        fs.writeFileSync(fp, html, 'utf8');
        console.log('Updated: ' + file);
        count++;
    } else {
        console.log('Already up to date: ' + file);
    }
}
console.log(`Done: ${count} files updated`);

