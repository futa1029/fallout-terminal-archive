const fs = require('fs');

const htmlPath = 'f:/Fallout/the-ghoul.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// 1. Precise extraction of the actual article content
// We exclude action-header (top UI) and everything after the main text (License, Comments, etc.)
const bodyMatch = htmlContent.match(/<main class="content">([\s\S]*?)<\/main>/);
if (!bodyMatch) {
    console.error('Main content not found');
    process.exit(1);
}
let body = bodyMatch[1];

// Remove Top UI
body = body.replace(/<div class="action-header">[\s\S]*?<\/div>/g, '');

// Remove Bottom UI & Meta (License, Comments, scripts, etc.)
// We stop at the first <footer> or <div> that starts the metadata/comment section
// Based on file view, the footer starts around line 648
body = body.replace(/<div style="margin-top: 30px;[\s\S]*$/g, '');
body = body.replace(/<div class="comments-section"[\s\S]*$/g, '');
body = body.replace(/<script[\s\S]*$/g, '');

// 2. Structural Formatting for High Readability
// Headings
body = body.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n\n');
body = body.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n■ $1\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n');
body = body.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n【 $1 】\n\n');
body = body.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n● $1\n\n');

// Paragraphs and Quotes
body = body.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');
body = body.replace(/<div class="quote-box">([\s\S]*?)<\/div>/gi, '\n> $1\n\n');

// Lists
body = body.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '・$1\n');
body = body.replace(/<ul[^>]*>/gi, '');
body = body.replace(/<\/ul>/gi, '\n');

// Br tags to newlines
body = body.replace(/<br\s*\/?>/gi, '\n');

// 3. Complete stripping of all remaining HTML tags
body = body.replace(/<[^>]*>?/gm, '');

// 4. Final Text Cleaning
const lines = body.split('\n');
const cleanLines = lines.map(line => {
    let l = line.replace(/&nbsp;/g, ' ')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&amp;/g, '&');
    return l.trim();
});

// Join and handle excessive whitespace
let finalBody = cleanLines.join('\n').replace(/\n{3,}/g, '\n\n').trim();

// Prepare Post Content
const postHeader = `#Falloutシリーズ #FalloutTV\n\n【 The Ghoul (Cooper Howard) 】\nhttps://www.fallout-jp.com/the-ghoul.html\n\n`;
const postFooter = `\n\n#TheGhoul #CooperHoward #Lore #フォールアウト #グール #クーパーハワード`;

const finalPost = postHeader + finalBody + postFooter;

fs.writeFileSync('f:/Fallout/_X/the-ghoul/post.md', finalPost);
console.log('Post updated successfully. UI and Meta sections were strictly excluded.');
