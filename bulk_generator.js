require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// 最新のAPI（gemini-2.5-flash）は数百万文字のコンテキストを一度に処理でき、ロア統合に完璧に対応します
const MODEL_NAME = 'gemini-2.5-flash';

// 再試行付きのフェッチ関数
async function fetchWikiJson(url) {
    for (let i = 0; i < 3; i++) {
        try {
            const res = await fetch(url, { headers: { 'User-Agent': 'FalloutArchiveBot/1.0' } });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (e) {
            console.warn(`Fetch retry ${i+1}/3 failed for ${url}:`, e);
            await new Promise(r => setTimeout(r, 2000));
        }
    }
    return null;
}

// Wikitext内のリンク抽出
function extractWikiLinks(wikitext) {
    const linkRegex = /\[\[([^\]\|]+)(?:\|[^\]]+)?\]\]/g;
    let match;
    const links = new Set();
    while ((match = linkRegex.exec(wikitext)) !== null) {
        let link = match[1].trim();
        if (link.startsWith('Category:') || link.startsWith('File:') || link.startsWith('Template:') || link.startsWith('wikipedia:')) continue;
        if (['Fallout 76', 'Appalachia', 'Brotherhood of Steel', 'Enclave', 'Responders', 'Raiders', 'Settlers', 'The Pitt'].includes(link)) continue;
        links.add(link);
    }
    return Array.from(links);
}

// 複数ページのWikitext一括取得
async function fetchMultiplePages(titles) {
    const result = {};
    for (let i = 0; i < titles.length; i += 50) {
        const chunk = titles.slice(i, i + 50);
        const url = `https://fallout.fandom.com/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&format=json&titles=${encodeURIComponent(chunk.join('|'))}`;
        const data = await fetchWikiJson(url);
        if (data && data.query && data.query.pages) {
            for (const pageId in data.query.pages) {
                const page = data.query.pages[pageId];
                if (page.revisions && page.revisions[0]) {
                    result[page.title] = page.revisions[0].slots.main['*'];
                }
            }
        }
    }
    return result;
}

// 画像のダウンロード
async function downloadImages(images, slug) {
    const dir = path.join('images', 'note_extracted', slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    for (const img of images) {
        let saveAs = img;
        if (img.toLowerCase().includes('map') && !img.includes('marker')) saveAs = 'img_map_marker.png';
        
        const apiUrl = `https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(img)}&prop=imageinfo&iiprop=url&format=json`;
        const data = await fetchWikiJson(apiUrl);
        if (data && data.query && data.query.pages) {
            const pageId = Object.keys(data.query.pages)[0];
            if (pageId !== '-1' && data.query.pages[pageId].imageinfo) {
                let url = data.query.pages[pageId].imageinfo[0].url.split('/revision/latest')[0];
                try {
                    const res = await fetch(url);
                    const buffer = await res.arrayBuffer();
                    fs.writeFileSync(path.join(dir, saveAs), Buffer.from(buffer));
                    console.log(`[Image] Downloaded ${saveAs}`);
                } catch(e) { console.error(`[Image] Failed to download ${url}`); }
            }
        }
    }
}

// Gemini APIによる一括翻訳とHTML出力
async function generateHTML(articleInfo) {
    const prompt = `
あなたは日本の有能な「Fallout 76」Wikiの翻訳者兼フロントエンドエンジニアです。
提供された「Fallout 76」のWikitext情報、関連するホロテープ/メモの原文、画像リストを元に、完全なHTMLファイルとX(Twitter)投稿用テキスト、インデックス情報をJSONで出力してください。

# 必須要件
- 言語は**必ず自然な日本語**に翻訳すること（スクリプト変数以外）。
- スコーチ、レスポンダー、光りし者などの一般的な公式日本語翻訳（用語）を徹底してください。
- ページの構造は既存のフォーマット（crt-overlay, scanlines, sidebarなど）に完璧に準拠してください。
  - 感想セクションは必ず \`<div class="quote-box"><b>感想</b><br><br>...\` で締めくくってください。アパラチアの居住者として書いたような深いゲーム的考察にしてください。
  - <div class="comments-section" id="comments-section"> などのコメント欄の実装も含めてください。
  - 画像は \`images/note_extracted/{slug}/{実際のファイル名}\` という絶対的なパスに指定してください。マップ画像は必ず \`img_map_marker.png\` にしてください。

## ★★★ ホロテープ・メモ・ターミナルの形式（厳守） ★★★
この記事にホロテープ、メモ、またはターミナルエントリが存在する場合、以下の形式を**必ず厳守**してください。

### CSSクラス定義（<style>内に必ず含めること）
\`\`\`css
.holotape-box {
    border-left: 4px solid #ff9800;
    margin: 20px 0;
    background: color-mix(in srgb, #ff9800 10%, transparent);
    padding: 15px 15px 15px 20px;
    border-radius: 0 5px 5px 0;
    line-height: 1.6;
}
.holotape-box b { color: #ff9800; font-size: 1.05em; }

.note-box {
    border-left: 4px solid #64b5f6;
    margin: 20px 0;
    background: color-mix(in srgb, #64b5f6 10%, transparent);
    padding: 15px 15px 15px 20px;
    border-radius: 0 5px 5px 0;
    line-height: 1.6;
}
.note-box b { color: #64b5f6; font-size: 1.05em; }
\`\`\`

### HTMLの使い方
ホロテープは \`<div class="holotape-box">\`、メモは \`<div class="note-box">\`、ターミナルエントリは \`<div class="note-box">\` を使う。
- **ホロテープの場合のHTML例：**
\`\`\`html
<div class="holotape-box">
    <b>🎙️ 英語タイトル（日本語タイトル）</b><br>
    <em>場所：具体的なゲーム内の場所</em><br><br>
    <b>話者名：</b>セリフの翻訳全文...<br><br>
    <b>別の話者名：</b>セリフの翻訳全文...
</div>
\`\`\`
- **メモの場合のHTML例：**
\`\`\`html
<div class="note-box">
    <b>📄 英語タイトル（日本語タイトル）</b><br>
    <em>場所：具体的なゲーム内の場所</em><br><br>
    メモの翻訳全文...
</div>
\`\`\`
- **ターミナルエントリの場合のHTML例：**
\`\`\`html
<div class="note-box">
    <b>📟 ターミナルエントリ名（日本語訳）</b><br><br>
    エントリの翻訳全文...
</div>
\`\`\`

**絶対に<blockquote>は使わないでください。** 必ず上記のdivクラスを使用すること。
記事内で「主なアイテム」のリストに続けて「発見できるホロテープ・メモ」という<h2>セクションを作り、その中に上記ボックスを配置してください。

- 出力は必ず以下のスキーマを満たすJSON文字列のみとしてください（マークダウンのバッククォート \`\`\`json 等は含めないでください）。

## 出力JSONスキーマ
{
  "name_ja": "日本語化された記事のタイトル",
  "yomi": "ひらがなで入力。例：『あぶいあーるめでぃかるせんたー』",
  "html": "<!DOCTYPE html>\\n<html lang=\\"ja\\">...",
  "post_md": "#Fallout76\\n\\nタイトルの日本語\\nhttps://www.fallout-jp.com/{slug}.html\\n\\n概要\\n\\n..."
}

# ユーザー入力データ
- slug (URL用): ${articleInfo.slug}
- 英語タイトル: ${articleInfo.title}
- メインWikitext:
${articleInfo.main_wikitext}

- 関連するホロテープ/メモ/ターミナルのWikitext (これらもHTMLの該当セクションへ翻訳全文を掲載すること):
${JSON.stringify(articleInfo.lore_pages, null, 2)}
`;

    console.log(`[AI] Generating HTML for ${articleInfo.slug} via ${MODEL_NAME}...`);
    try {
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
            config: {
                 temperature: 0.1,
                 responseMimeType: "application/json"
            }
        });

        const text = response.text;
        return JSON.parse(text);
    } catch (e) {
        console.error("[AI] Error generating or parsing JSON output:", e);
        return null;
    }
}

// 1件分のメインプロセス
async function processItem(item, articlesObj) {
    console.log(`\n================================`);
    console.log(`Processing: ${item.name}`);
    
    const titleQuery = encodeURIComponent(item.name.replace(/ /g, '_'));
    const wikitextRes = await fetchWikiJson(`https://fallout.fandom.com/api.php?action=parse&page=${titleQuery}&prop=wikitext|images&format=json`);
    
    let mainWikitext = '';
    let images = [];
    if (!wikitextRes || !wikitextRes.parse) {
        const searchRes = await fetchWikiJson(`https://fallout.fandom.com/api.php?action=opensearch&search=${encodeURIComponent(item.name)}&format=json`);
        if (searchRes && searchRes[1] && searchRes[1].length > 0) {
            const actualTitle = searchRes[1][0];
            const retryRes = await fetchWikiJson(`https://fallout.fandom.com/api.php?action=parse&page=${encodeURIComponent(actualTitle.replace(/ /g, '_'))}&prop=wikitext|images&format=json`);
            if (retryRes && retryRes.parse) {
                mainWikitext = retryRes.parse.wikitext['*'];
                images = retryRes.parse.images || [];
            }
        }
        if (!mainWikitext) {
            console.error(`Error: Could not fetch wikitext for ${item.name}`);
            return false;
        }
    } else {
        mainWikitext = wikitextRes.parse.wikitext['*'];
        images = wikitextRes.parse.images || [];
    }

    const links = extractWikiLinks(mainWikitext);
    const relatedPages = await fetchMultiplePages(links);
    
    const lorePages = {};
    for (const [title, content] of Object.entries(relatedPages)) {
        if (!content) continue;
        const lower = content.toLowerCase();
        if (lower.includes('type=papernote') || lower.includes('type = papernote') ||
            lower.includes('type=holotape') || lower.includes('type = holotape') ||
            title.toLowerCase().includes('terminal entries') || title.toLowerCase().includes('terminal log')) {
            lorePages[title] = content;
            console.log(`[Lore] Found related lore: ${title}`);
        }
    }

    if (Object.keys(lorePages).length > 3) {
        console.log(`[Skip] 関連ロアエントリが多すぎます(${Object.keys(lorePages).length}件)。トークン数超過(429)を避けるため自動スキップします: ${item.name}`);
        item.status = 'skipped'; // マークして次回以降の処理から外す
        return false;
    }

    const slug = item.url.replace('.html', '');
    
    await downloadImages(images, slug);

    const aiResult = await generateHTML({
        slug,
        title: item.name,
        main_wikitext: mainWikitext,
        lore_pages: lorePages,
        images: images
    });

    if (!aiResult) return false;

    fs.writeFileSync(item.url, aiResult.html, 'utf8');
    
    const xDir = path.join('_X', slug);
    if (!fs.existsSync(xDir)) fs.mkdirSync(xDir, { recursive: true });
    if (!fs.existsSync(path.join(xDir, 'images'))) fs.mkdirSync(path.join(xDir, 'images'), { recursive: true });
    fs.writeFileSync(path.join(xDir, 'post.md'), aiResult.post_md.replace(/\{slug\}/g, slug), 'utf8');
    
    item.name = aiResult.name_ja || item.name;
    item.yomi = aiResult.yomi || item.yomi;
    delete item.status;
    const today = new Date();
    item.date = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    
    console.log(`[Done] Successfully processed ${item.name} -> ${item.yomi}`);
    
    // Add 2 second sleep after successful generation to prevent 429 RPM limits
    await new Promise(r => setTimeout(r, 2000));
    
    return true;
}

async function run() {
    console.log('Starting Fallout Lore Bulk Generator...');
    if (!process.env.GEMINI_API_KEY) {
        console.error('ERROR: GEMINI_API_KEY is not set in .env file.');
        return;
    }
    
    let jsContent = fs.readFileSync('remove_duplicates.js', 'utf8');
    
    const match = jsContent.match(/const manualEntries\s*=\s*(\[[\s\S]*?\]);/m);
    if(!match) {
         console.error("Could not parse manualEntries array from remove_duplicates.js");
         return;
    }
    
    let articlesStr = match[1];
    let articlesObj = [];
    try {
        articlesObj = eval('(' + articlesStr + ')');
    } catch(e) {
        console.error('Eval parse error:', e);
        return;
    }

    const drafts = articlesObj.filter(a => a.status === 'draft' && /^[a-zA-Z0-9\s\'\-\.\&\(\):]+$/.test(a.name) && a.name !== 'Rules' && a.name !== 'Just a moment...');
    console.log(`Found ${drafts.length} pure English drafts.`);

    let processedCount = 0;
    const limitArg = process.argv.indexOf('--limit');
    let limit = limitArg > -1 ? parseInt(process.argv[limitArg+1]) : drafts.length;

    for (let i = 0; i < Math.min(drafts.length, limit); i++) {
        const item = drafts[i];
        let realItem = articlesObj.find(a => a.url === item.url);
        if (realItem) {
            const success = await processItem(realItem, articlesObj);
            if (success) {
                processedCount++;
                
                let newArrayStr = JSON.stringify(articlesObj, null, 4)
                    .replace(/"([^"]+)":/g, '$1:');
                
                let newContent = jsContent.replace(/const manualEntries\s*=\s*\[[\s\S]*?\];/m, `const manualEntries = ${newArrayStr};`);
                fs.writeFileSync('remove_duplicates.js', newContent, 'utf8');
                
                console.log(`=> Progress saved to remove_duplicates.js (${processedCount}/${limit})`);
                
                await new Promise(r => setTimeout(r, 8000));
            } else {
                console.log(`[Skip] Failed to process ${item.name}, continuing...`);
            }
        }
    }
    console.log(`\nAll requested operations finished. Processed ${processedCount} items.`);
}

run();
