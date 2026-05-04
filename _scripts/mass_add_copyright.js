const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = 'f:/Fallout';
// 処理対象のファイルを絞り込む
const files = fs.readdirSync(dir).filter(f => 
    f.endsWith('.html') && 
    !f.startsWith('_') && 
    !['admin.html', 'admin-drafts.html', 'index.html', 'lore.html', 'vault-76.html', 'ghoul.html', 'super-mutant.html', 'mutation.html', 'protectron.html', 'mr-handy.html', 'assaultron.html', 'sentry-bot.html', 'fusion-core.html', 'radaway.html', 'stimpak.html'].includes(f) // 除外リスト
);

// ファイル名から想定されるWiki URL（スラグ）を生成する
function getWikiSlug(slug) {
    let wikiName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('_');
    wikiName = wikiName.replace(/_Tv_Series$/, '_(TV_series)');
    wikiName = wikiName.replace(/_Tv$/, '_(TV)');
    wikiName = wikiName.replace(/_Fallout_76$/, '_(Fallout_76)');
    return wikiName;
}

// Fandom APIを使用して記事の存在チェック
function checkWikiExists(slug) {
    return new Promise((resolve) => {
        const apiUrl = `https://fallout.fandom.com/api.php?action=query&titles=${slug}&format=json`;
        https.get(apiUrl, { headers: { 'User-Agent': 'NodeJS/Bot' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode !== 200) return resolve(false);
                try {
                    const json = JSON.parse(data);
                    const pages = json.query?.pages || {};
                    const firstKey = Object.keys(pages)[0];
                    if (firstKey === '-1') resolve(false); // missing
                    else resolve(true);
                } catch (e) {
                    resolve(false);
                }
            });
        }).on('error', () => resolve(false));
    });
}

async function run() {
    let added = 0;
    let skipped = 0;
    let noFandom = 0;
    
    console.log(`Target files count: ${files.length}\nStarting scan...`);

    // バッチリクエスト数を抑えるために直列実行するか小さめの並列度で
    for (const file of files) {
        const filePath = path.join(dir, file);
        let html = fs.readFileSync(filePath, 'utf8');
        
        // 既に著作権ブロックがある場合はスキップ
        if (html.includes('copyright-default')) {
            skipped++;
            continue;
        }

        const slug = file.replace('.html', '');
        let wikiSlug = getWikiSlug(slug);
        
        // <h1>から英語名を抽出を試みる（フォールバックはスラグのアンダースコアをスペースにしたもの）
        let englishTitle = wikiSlug.replace(/_/g, ' ');
        const h1Match = html.match(/<h1>([^<]+)(?:<br|<)/i);
        if (h1Match && h1Match[1].trim().match(/^[A-Za-z0-9\s\.\,\'\-]+$/)) {
             englishTitle = h1Match[1].trim();
        }
        
        const url = `https://fallout.fandom.com/wiki/${wikiSlug}`;
        
        // 独自記事チェック
        const exists = await checkWikiExists(wikiSlug);
        if (!exists) {
            noFandom++;
            console.log(`[Skip - Not on Fandom (404)] ${file} -> ${url}`);
            continue;
        }

        // 著作権ブロック文字列
        const copyrightBlock = `
                <!-- 著作権表示 -->
                <p name="copyright-default">This article was created by translating and editing <a href="${url}" target="_blank" rel="noopener">${englishTitle}</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
                <p>&copy; Overseer Mohi's Terminal — Fallout Lore Archive</p>`;

        // コメントセクションの直前に追記する
        if (html.includes('<!-- Comments Section -->')) {
            html = html.replace(
                /(.*?)(\n\s*<\/div>\n\s*<!-- Comments Section -->|\n\s*<!-- Comments Section -->)/s,
                (match, p1, p2) => {
                    // もし </div> を含んでいるなら、</div> 直前（内側）に追記するのが望ましい（デザイン上）
                    if (p2.includes('</div>')) {
                        return p1 + '\\n' + copyrightBlock + p2;
                    } else {
                        return p1 + '\\n' + copyrightBlock + '\\n\\n' + p2; 
                    }
                }
            );
            fs.writeFileSync(filePath, html);
            added++;
            console.log(`[Added]     ${file}`);
        } else {
            console.log(`[Skip - No Insert Point] ${file}`);
        }
    }
    
    console.log(`\\n========== SUMMARY ==========`);
    console.log(`Added: ${added}`);
    console.log(`Skipped (Already has): ${skipped}`);
    console.log(`Skipped (Not on Fandom / Manual): ${noFandom}`);
}

run();
