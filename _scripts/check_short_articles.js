const fs = require('fs');
const path = require('path');

const dir = 'f:/Fallout';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'admin.html' && f !== 'template.html' && f !== 'lore.html' && f !== 'admin-post.html' && f !== 'index.html' && !f.startsWith('_'));

const suspiciousFiles = [];

for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Ensure it's a standard article file
    if (!content.includes('<main class="content">')) continue;
    
    const quoteBoxMatch = content.match(/<div class="quote-box">([\s\S]*?)<\/div>/);
    let quoteBoxLength = 0;
    let quoteBoxLines = 0;
    
    if (!quoteBoxMatch) {
        suspiciousFiles.push({ file, issue: 'No quote-box (感想セクションなし)' });
        continue;
    } else {
        const rawText = quoteBoxMatch[1].replace(/<[^>]*>?/gm, '').replace(/\s+/g, '').trim();
        quoteBoxLength = rawText.length;
        // Count <br> or <p> splits inside quote box to determine if it's more than "one line"
        quoteBoxLines = (quoteBoxMatch[1].match(/<br\s*\/?>|<\/p>/gi) || []).length + 1;
        
        if (quoteBoxLength < 40 || quoteBoxLines === 1) {
             suspiciousFiles.push({ file, issue: `Short quote-box (長さ: ${quoteBoxLength}文字, 行数: 約${quoteBoxLines}行)` });
             continue;
        }
    }

    // Check main body
    const mainMatch = content.match(/<main class="content">([\s\S]*?)<div class="comments-section">/);
    if (mainMatch) {
        let mainContent = mainMatch[1];
        if (quoteBoxMatch) {
            mainContent = mainContent.replace(quoteBoxMatch[0], '');
        }
        // remove header tags and their contents
        mainContent = mainContent.replace(/<h[1-6]>([\s\S]*?)<\/h[1-6]>/g, '');
        // remove the standard top menu UI
        mainContent = mainContent.replace(/<div class="action-header">([\s\S]*?)<\/div>/g, '');
        // remove standard footer
        mainContent = mainContent.replace(/<div style="margin-top:30px;.*?<\/div>/s, '');
        
        const mainRawText = mainContent.replace(/<[^>]*>?/gm, '').replace(/\s+/g, '').trim();
        if (mainRawText.length < 50) {
            suspiciousFiles.push({ file, issue: `Short main content (本文が短すぎる: ${mainRawText.length}文字)` });
        }
    }
}

fs.writeFileSync('f:/Fallout/_tmp_short_utf8.json', JSON.stringify(suspiciousFiles, null, 2));
console.log(`Saved output to _tmp_short_utf8.json. Total suspicious files: ${suspiciousFiles.length}`);
