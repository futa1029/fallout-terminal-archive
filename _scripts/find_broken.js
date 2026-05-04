const fs = require('fs');

const files = fs.readdirSync('f:/Fallout').filter(f => f.endsWith('.html') && f !== 'lore.html' && f !== 'admin.html');
const broken = [];

files.forEach(f => {
    try {
        const txt = fs.readFileSync('f:/Fallout/' + f, 'utf8');
        
        // Match a single or 2 character title, e.g. <title>ポ |
        const titleMatch = txt.match(/<title>([^<]{1,2})\s*\|/);
        
        // Structural issues that contradict standard layout
        const hasSidebar = txt.includes('class="sidebar"');
        const hasPageContent = txt.includes('class="page-content"');
        const hasMainContent = txt.includes('class="main-content"');
        const hasHeaderTag = txt.includes('</header>');
        const hasFandomSingleChar = txt.match(/<a href="https:\/\/fallout\.fandom\.com\/wiki\/[^"]{1,2}" target="_blank"/);
        
        if ((titleMatch && titleMatch[1].trim().length < 3 && !txt.includes('Mr.')) || hasSidebar || hasPageContent || hasMainContent || hasHeaderTag || hasFandomSingleChar) {
            broken.push({
                file: f,
                title: titleMatch ? titleMatch[1] : null,
                issues: {
                    sidebar: hasSidebar,
                    pageContent: hasPageContent,
                    mainContent: hasMainContent,
                    danglingHeader: hasHeaderTag,
                    fandomShortUrl: !!hasFandomSingleChar
                }
            });
        }
    } catch(e) {
        console.error('Error reading', f);
    }
});

console.log(JSON.stringify(broken, null, 2));
