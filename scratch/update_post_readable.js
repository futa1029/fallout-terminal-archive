const fs = require('fs');

const htmlPath = 'f:/Fallout/the-ghoul.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Extract content inside <main class="content">
const bodyMatch = htmlContent.match(/<main class="content">([\s\S]*?)<\/main>/);
if (!bodyMatch) {
    console.error('Main content not found');
    process.exit(1);
}
let body = bodyMatch[1];

// 1. Remove UI and Meta sections (Back links, Likes, Comments, License, etc.)
body = body.replace(/<div class="action-header">[\s\S]*?<\/div>/g, '');
body = body.replace(/<div class="comments-section">[\s\S]*?<\/div>/g, '');
body = body.replace(/<div class="copyright">[\s\S]*?<\/div>/g, '');
// Specifically target the donation/comment strings mentioned by user
body = body.replace(/コミュニティ維持のため、寄付を受け付けております。/g, '');
body = body.replace(/> COMMENTS_/g, '');
body = body.replace(/0 \/ 100/g, '');
body = body.replace(/SUBMIT >/g, '');
body = body.replace(/LOADING\.\.\./g, '');

// 2. Formatting Headings with clear spacing
body = body.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n\n');
body = body.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n■ $1\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n');
body = body.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n【 $1 】\n\n');
body = body.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n● $1\n\n');

// 3. Formatting Paragraphs and Quotes
body = body.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');
body = body.replace(/<div class="quote-box">([\s\S]*?)<\/div>/gi, '\n> $1\n\n');

// 4. Clean up all remaining HTML tags
body = body.replace(/<br\s*\/?>/gi, '\n');
body = body.replace(/<[^>]*>?/gm, '');

// 5. Final Text Cleaning (Whitespace & Entities)
const cleanLines = body.split('\n').map(line => {
    let l = line.replace(/&nbsp;/g, ' ')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&amp;/g, '&');
    return l.trim();
});

// Remove excessive empty lines but keep paragraph breaks
let finalBody = cleanLines.join('\n').replace(/\n{3,}/g, '\n\n').trim();

// Prepare Post
const postHeader = `#Falloutシリーズ #FalloutTV\n\n【 The Ghoul (Cooper Howard) 】\nhttps://www.fallout-jp.com/the-ghoul.html\n\n`;
const postFooter = `\n\n#TheGhoul #CooperHoward #Lore #フォールアウト #グール #クーパーハワード`;

const finalPost = postHeader + finalBody + postFooter;

fs.writeFileSync('f:/Fallout/_X/the-ghoul/post.md', finalPost);
console.log('Post updated with beautiful, readable text and no UI artifacts.');
