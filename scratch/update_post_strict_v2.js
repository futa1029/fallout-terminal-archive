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

// 2. 不要なUIパーツの徹底排除リスト（完全一致・パターン一致）
const blackList = [
    '< BACK TO TERMINAL',
    '♡ 0',
    '♥ 0',
    'コミュニティ維持のため、寄付を受け付けております。',
    '> COMMENTS_',
    '0 / 100',
    'SUBMIT >',
    'LOADING...',
    'まだコメントがありません。',
    'コメントを入力...',
    '寄付を受け付けております'
];

blackList.forEach(term => {
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(escapedTerm, 'gi');
    body = body.replace(re, '');
});

// フッターとコメントセクションを物理的にカット
body = body.replace(/<div class="action-header"[\s\S]*?<\/div>/g, '');
body = body.replace(/<div style="margin-top: 30px;[\s\S]*$/g, '');
body = body.replace(/<div class="comments-section"[\s\S]*$/g, '');
body = body.replace(/<script[\s\S]*$/g, '');

// 3. 著作権表示の取得
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

// 最終タグ削除
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

// 5. 組み立て（冒頭タグ + 本文 + ライセンスのみ）
const postHeader = `#Falloutシリーズ #FalloutTV\n\n【 The Ghoul (Cooper Howard) 】\nhttps://www.fallout-jp.com/the-ghoul.html\n\n`;
const postFooter = `\n\n---\n${copyrightText}`;

const finalPost = postHeader + finalBody + postFooter;

fs.writeFileSync('f:/Fallout/_X/the-ghoul/post.md', finalPost);
console.log('Post updated: Removed "< BACK" and Like counts.');
