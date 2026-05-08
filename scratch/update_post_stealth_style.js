const fs = require('fs');

const htmlPath = 'f:/Fallout/the-ghoul.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// 1. 本文の抽出
const bodyMatch = htmlContent.match(/<main class="content">([\s\S]*?)<\/main>/);
if (!bodyMatch) {
    console.error('Main content not found');
    process.exit(1);
}
let body = bodyMatch[1];

// 2. 不要セクションの完全除去
body = body.replace(/<div class="action-header"[\s\S]*?<\/div>/g, '');
body = body.replace(/<div id="gallery"[\s\S]*?<div class="gallery">[\s\S]*?<\/div>/gi, '');
body = body.replace(/<h2 id="gallery">[\s\S]*?<div class="gallery">[\s\S]*?<\/div>/gi, '');
body = body.replace(/<div class="comments-section"[\s\S]*$/g, '');
body = body.replace(/<script[\s\S]*$/g, '');

// 3. ライセンス情報の取得
let copyrightText = "";
const copyrightMatch = htmlContent.match(/This article was created by[\s\S]*?CC BY-SA 3.0/i);
if (copyrightMatch) {
    copyrightText = copyrightMatch[0].replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
}

// 4. ステルスボーイ風のフォーマット整形
// - 見出しはシンプルなテキストに
// - セクション区切りは ---
// - 箇条書きは ・
body = body.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, ''); // タイトルはヘッダーで出すので消す
body = body.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n---\n\n$1\n\n');
body = body.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n$1\n\n');
body = body.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n■ $1\n\n');

// 引用（感想など）を 💭 感想 形式に
body = body.replace(/<div class="quote-box">([\s\S]*?)<\/div>/gi, '\n---\n\n💭 感想\n\n$1\n\n');

body = body.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');
body = body.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '・$1\n');

// クリーニング
body = body.replace(/<br\s*\/?>/gi, '\n');
body = body.replace(/<[^>]*>?/gm, '');

// 不要UI文字列の最終掃除
const blackList = ['< BACK TO TERMINAL', '♡ 0', '♥ 0', 'コミュニティ維持のため、寄付を受け付けております。', 'SUBMIT >', 'LOADING...'];
blackList.forEach(t => body = body.replace(new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), ''));

const lines = body.split('\n').map(l => l.trim());
let finalBody = lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();

// 5. 最終構成
const postHeader = `#Falloutシリーズ\n\nThe Ghoul / Cooper Howard（グール / クーパー・ハワード）\nhttps://www.fallout-jp.com/the-ghoul.html\n\n`;
const postFooter = `\n\n---\n\n${copyrightText}`;

const finalPost = postHeader + finalBody + postFooter;

fs.writeFileSync('f:/Fallout/_X/the-ghoul/post.md', finalPost);
console.log('Post updated to match Stealth Boy style.');
