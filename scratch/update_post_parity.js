const fs = require('fs');

const htmlPath = 'f:/Fallout/the-ghoul.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// 1. 本文の抽出（mainタグ内）
const bodyMatch = htmlContent.match(/<main class="content">([\s\S]*?)<\/main>/);
if (!bodyMatch) {
    console.error('Main content not found');
    process.exit(1);
}
let body = bodyMatch[1];

// 2. 不要なUIセクションをHTMLタグの段階で完全に除去
body = body.replace(/<div class="action-header"[\s\S]*?<\/div>/g, '');
body = body.replace(/<h2 id="gallery">[\s\S]*?<div class="gallery">[\s\S]*?<\/div>/gi, '');
body = body.replace(/<div class="comments-section"[\s\S]*$/g, '');
body = body.replace(/<script[\s\S]*$/g, '');

// 3. ライセンス情報の取得
let copyrightText = "";
const copyrightMatch = htmlContent.match(/This article was created by[\s\S]*?CC BY-SA 3.0/i);
if (copyrightMatch) {
    copyrightText = copyrightMatch[0].replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
}

// 4. 感想（quote-box）とイントロの分離
// イントロ（最初のh2より前のテキスト）を取得
const introMatch = body.match(/^[\s\S]*?(?=<h2)/i);
let intro = introMatch ? introMatch[0] : "";

// 感想（quote-box）を取得して本体から一時的に消す
const quoteMatch = body.match(/<div class="quote-box">([\s\S]*?)<\/div>/i);
let quote = quoteMatch ? quoteMatch[1] : "";
body = body.replace(/<div class="quote-box">([\s\S]*?)<\/div>/gi, '');

// 5. 本文の整形（ステルスボーンスタイル：シンプルな見出しと --- 区切り）
let mainBody = body.replace(/^[\s\S]*?(?=<h2)/i, ''); // イントロを消す

mainBody = mainBody.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n---\n\n$1\n\n');
mainBody = mainBody.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n$1\n\n');
mainBody = mainBody.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n■ $1\n\n');
mainBody = mainBody.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');
mainBody = mainBody.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '・$1\n');

// クリーニング
function cleanTags(text) {
    let t = text.replace(/<br\s*\/?>/gi, '\n');
    t = t.replace(/<[^>]*>?/gm, '');
    const blacklist = ['< BACK TO TERMINAL', '♡ 0', '♥ 0', 'コミュニティ維持のため、寄付を受け付けております。', 'SUBMIT >', 'LOADING...'];
    blacklist.forEach(term => {
        t = t.replace(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '');
    });
    return t.split('\n').map(l => l.trim()).join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

intro = cleanTags(intro);
quote = cleanTags(quote);
mainBody = cleanTags(mainBody);

// 6. 最終構成（Stealth Boy形式）
const finalPost = `#Falloutシリーズ

The Ghoul / Cooper Howard（グール / クーパー・ハワード）
https://www.fallout-jp.com/the-ghoul.html

概要

${intro}

${mainBody}

---

💭 感想

${quote}

---

${copyrightText}`;

fs.writeFileSync('f:/Fallout/_X/the-ghoul/post.md', finalPost);
console.log('Post updated to perfect Stealth Boy parity.');
