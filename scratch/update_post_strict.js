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

// 2. 不要なUI/システム文字列を物理的に排除（完全一致で狙い撃ち）
const unwanted = [
    '<div class="action-header">',
    'コミュニティ維持のため、寄付を受け付けております。',
    '> COMMENTS_',
    '0 / 100',
    'SUBMIT >',
    'LOADING...',
    'まだコメントがありません。',
    'コメントを入力...',
    '寄付を受け付けております'
];

unwanted.forEach(term => {
    // タグを含めた置換
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(escapedTerm, 'gi');
    body = body.replace(re, '');
});

// フッターセクション（License以降）をカット
body = body.replace(/<div style="margin-top: 30px;[\s\S]*$/g, '');
body = body.replace(/<div class="comments-section"[\s\S]*$/g, '');
body = body.replace(/<script[\s\S]*$/g, '');

// 3. 著作権表示（License）のみを別途取得
let copyrightText = "";
const copyrightMatch = htmlContent.match(/This article was created by[\s\S]*?CC BY-SA 3.0/i);
if (copyrightMatch) {
    copyrightText = copyrightMatch[0].replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
}

// 4. フォーマット整形
body = body.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n\n');
body = body.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n■ $1\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n');
body = body.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n【 $1 】\n\n');
body = body.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n● $1\n\n');
body = body.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');
body = body.replace(/<div class="quote-box">([\s\S]*?)<\/div>/gi, '\n> $1\n\n');
body = body.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '・$1\n');

// 残ったHTMLタグと不要な空行を掃除
body = body.replace(/<br\s*\/?>/gi, '\n');
body = body.replace(/<[^>]*>?/gm, '');

const lines = body.split('\n').map(line => {
    let l = line.replace(/&nbsp;/g, ' ')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&amp;/g, '&');
    return l.trim();
});

let finalBody = lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();

// 5. 最終組み立て（ハッシュタグは一切入れない）
const postHeader = `#Falloutシリーズ #FalloutTV\n\n【 The Ghoul (Cooper Howard) 】\nhttps://www.fallout-jp.com/the-ghoul.html\n\n`;
const postFooter = `\n\n---\n${copyrightText}`;

const finalPost = postHeader + finalBody + postFooter;

fs.writeFileSync('f:/Fallout/_X/the-ghoul/post.md', finalPost);
console.log('Post updated: Strict UI cleanup, no extra hashtags.');
