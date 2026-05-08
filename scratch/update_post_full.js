const fs = require('fs');
const path = require('path');

const htmlPath = 'f:/Fallout/the-ghoul.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Simple extraction of text from HTML for post.md
// This is a rough but effective way to get the body content
let body = htmlContent.match(/<main class="content">([\s\S]*?)<\/main>/)[1];

// Remove header/back link
body = body.replace(/<div class="action-header">[\s\S]*?<\/div>/, '');

// Convert headings
body = body.replace(/<h1>([\s\S]*?)<\/h1>/g, '# $1\n');
body = body.replace(/<h2>([\s\S]*?)<\/h2>/g, '## $1\n');
body = body.replace(/<h3>([\s\S]*?)<\/h3>/g, '### $1\n');
body = body.replace(/<h4>([\s\S]*?)<\/h4>/g, '#### $1\n');

// Convert paragraphs
body = body.replace(/<p>([\s\S]*?)<\/p>/g, '$1\n\n');

// Convert quote boxes
body = body.replace(/<div class="quote-box">([\s\S]*?)<\/div>/g, '> $1\n');

// Convert images (just to keep the flow, but usually post.md has text + attachments)
body = body.replace(/<img src="([\s\S]*?)" alt="([\s\S]*?)">/g, '\n![ $2 ]($1)\n');
body = body.replace(/<p class="img-caption">([\s\S]*?)<\/p>/g, '_$1_\n');

// Remove HTML tags
body = body.replace(/<[^>]*>?/gm, '');

// Clean up entities
body = body.replace(/&nbsp;/g, ' ');
body = body.replace(/&lt;/g, '<');
body = body.replace(/&gt;/g, '>');

const postHeader = `#Falloutシリーズ #FalloutTV\n\nThe Ghoul (Cooper Howard)\nhttps://www.fallout-jp.com/the-ghoul.html\n\n`;
const postFooter = `\n\n#TheGhoul #CooperHoward #Lore #フォールアウト #グール #クーパーハワード`;

const finalPost = postHeader + body.trim() + postFooter;

fs.writeFileSync('f:/Fallout/_X/the-ghoul/post.md', finalPost);
console.log('Post updated with full content.');
