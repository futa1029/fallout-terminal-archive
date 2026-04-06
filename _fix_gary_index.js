const fs = require('fs');

function fixIndex(file) {
    let content = fs.readFileSync(file, 'utf8');

    // 1) Remove the broken gary-tv-series.html.html block
    const brokenRegex = /\s*\{\s*name:\s*"ゲイリー",\s*yomi:\s*"ゲイリー",\s*url:\s*"gary-tv-series\.html\.html",\s*category:\s*"",\s*appearance:\s*\["Fallout 76"\],\s*date:\s*"2026-02-08",\s*isDraft:\s*true\s*\},/g;
    content = content.replace(brokenRegex, '');

    // 2) Update the gary-tv-series.html block name from 'ゲイリー' to 'Gary (TV series)'
    content = content.replace(
        /name:\s*"ゲイリー",(\s*)yomi:\s*"げいりー",(\s*)url:\s*"gary-tv-series\.html"/g,
        'name: "Gary (TV series)",$1yomi: "げいりー",$2url: "gary-tv-series.html"'
    );

    // 3) Find the ray-gary block to insert gary.html right after or before it
    // Or just append it right before the last closing bracket inside loreEntries.
    // If gary.html is missing
    if (!content.includes('"url": "gary.html"') && !content.includes('url: "gary.html"')) {
        const garyHtmlEntry = `
            {
                name: "Gary",
                yomi: "げいりー",
                url: "gary.html",
                category: "人物",
                appearance: ["Fallout 3", "Fallout 4", "Fallout 76"],
                date: "2026-04-06",
                isDraft: true
            },`;
        
        // Find ray-gary.html block to insert near it
        const rayGaryIndex = content.indexOf('url: "ray-gary.html"');
        if (rayGaryIndex > -1) {
            const blockEnd = content.indexOf('},', rayGaryIndex) + 2;
            content = content.slice(0, blockEnd) + garyHtmlEntry + content.slice(blockEnd);
        } else {
            console.log("Could not find insertion point in " + file);
        }
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log(file + ' updated.');
}

fixIndex('lore.html');
fixIndex('admin-drafts.html');

console.log('Indexes fixed successfully.');
