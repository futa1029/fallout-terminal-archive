const fs = require('fs');

const htmlPath = 'f:/Fallout/the-ghoul.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Extract only content inside <main class="content">
const bodyMatch = htmlContent.match(/<main class="content">([\s\S]*?)<\/main>/);
if (!bodyMatch) {
    console.error('Main content not found');
    process.exit(1);
}
let body = bodyMatch[1];

// 1. Remove specific UI elements
body = body.replace(/<div class="action-header">[\s\S]*?<\/div>/g, '');
body = body.replace(/<div class="comments-section">[\s\S]*?<\/div>/g, '');

// 2. Convert structural tags to clean text line-by-line
// Headings
body = body.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n');
body = body.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n--- \n$1\n');
body = body.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n$1\n');
body = body.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n$1\n');

// Paragraphs & Divs (quotes)
body = body.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');
body = body.replace(/<div class="quote-box">([\s\S]*?)<\/div>/gi, '\n> $1\n');

// Br tags to newlines
body = body.replace(/<br\s*\/?>/gi, '\n');

// 3. Remove ALL other HTML tags (including images, scripts, style)
body = body.replace(/<[^>]*>?/gm, '');

// 4. Clean up whitespace
const lines = body.split('\n');
const cleanLines = lines.map(line => {
    // Unescape entities
    let l = line.replace(/&nbsp;/g, ' ')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&amp;/g, '&');
    return l.trim();
});

// Remove excessive empty lines
let finalBody = cleanLines.join('\n').replace(/\n{3,}/g, '\n\n').trim();

const postHeader = `#Falloutシリーズ #FalloutTV\n\nThe Ghoul (Cooper Howard)\nhttps://www.fallout-jp.com/the-ghoul.html\n\n`;
const postFooter = `\n\n#TheGhoul #CooperHoward #Lore #フォールアウト #グール #クーパーハワード`;

const finalPost = postHeader + finalBody + postFooter;

fs.writeFileSync('f:/Fallout/_X/the-ghoul/post.md', finalPost);
console.log('Post updated with clean content matching the article.');
