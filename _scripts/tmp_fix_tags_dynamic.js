const fs = require('fs');
const path = require('path');

const baseDir = 'f:/Fallout';
const files = fs.readdirSync(baseDir).filter(f => f.endsWith('.html') && f !== 'template.html');

let updatedCount = 0;

for (const file of files) {
    const filePath = path.join(baseDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Get appearance string
    const match = content.match(/<body[^>]*data-article-appearance="([^"]+)"/);
    if (match) {
        const appearances = match[1].split(',').map(s => s.trim());
        
        let tagsHtml = '';
        const tagMap = {
            'Fallout 3': '#Fallout3',
            'Fallout 4': '#Fallout4',
            'Fallout New Vegas': '#FalloutNewVegas',
            'Fallout 76': '#Fallout76'
        };

        for (const app of appearances) {
            let t = tagMap[app] || '#' + app.replace(/ /g, '');
            tagsHtml += `<span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">${t}</span>`;
        }

        // Add #Lore to all
        tagsHtml += `<span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#Lore</span>`;

        // Replace the tag line
        const tagLineRegex = /TAGS:\s*<span style="background:#222;[^<]+<\/span>/;
        if (tagLineRegex.test(content)) {
            content = content.replace(tagLineRegex, `TAGS: ${tagsHtml}`);
            fs.writeFileSync(filePath, content, 'utf8');
            updatedCount++;
        }
    }
}

console.log(`Updated tags dynamically for ${updatedCount} HTML files based on appearance.`);
