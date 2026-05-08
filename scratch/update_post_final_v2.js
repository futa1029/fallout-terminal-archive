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

// 2. 不要なセクションの完全削除
body = body.replace(/<div class="action-header">[\s\S]*?<\/div>/g, '');
body = body.replace(/<div class="comments-section"[\s\S]*$/g, '');
body = body.replace(/<script[\s\S]*$/g, '');

// 3. 著作権表示（License）のみを抽出
let copyrightText = "";
const copyrightMatch = body.match(/This article was created by[\s\S]*?Licensed under[\s\S]*?CC BY-SA 3.0/i);
if (copyrightMatch) {
    copyrightText = copyrightMatch[0]
        .replace(/<[^>]*>?/gm, '')
        .replace(/\s+/g, ' ')
        .trim();
}

// 4. 構造化とクリーニング
body = body.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n\n');
body = body.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n■ $1\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n');
body = body.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n【 $1 】\n\n');
body = body.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n● $1\n\n');
body = body.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');
body = body.replace(/<div class="quote-box">([\s\S]*?)<\/div>/gi, '\n> $1\n\n');
body = body.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '・$1\n');

// 寄付案内とハッシュタグを物理的に除去
body = body.replace(/コミュニティ維持のため、寄付を受け付けております。/g, '');
// 本文中に含まれる可能性のある古いライセンスセクションも一旦消す
body = body.replace(/This article was created by[\s\S]*?CC BY-SA 3.0/gi, '');

// タグ削除
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

// 5. 組み立て（冒頭のタグのみ残し、文末のタグと寄付案内を排除）
const postHeader = `#Falloutシリーズ #FalloutTV\n\n【 The Ghoul (Cooper Howard) 】\nhttps://www.fallout-jp.com/the-ghoul.html\n\n`;
const postFooter = `\n\n---\n${copyrightText}`; // 文末は著作権表示のみ

const finalPost = postHeader + finalBody + postFooter;

fs.writeFileSync('f:/Fallout/_X/the-ghoul/post.md', finalPost);
console.log('Post updated: Donation info and footer hashtags removed.');
