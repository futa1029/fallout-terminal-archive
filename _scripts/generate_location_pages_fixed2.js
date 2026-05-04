const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('f:/Fallout/_drafts/tv_locations_raw.json', 'utf8'));

function getSlug(name) {
    return name.toLowerCase().replace(/[^a-z0-g0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function removeRefs(t) {
    let out = '';
    let i = 0;
    while(i < t.length) {
        let tagStart = t.indexOf('<ref', i);
        if(tagStart === -1) {
            out += t.slice(i);
            break;
        }
        out += t.slice(i, tagStart);
        let tagEnd1 = t.indexOf('/>', tagStart);
        let tagEnd2 = t.indexOf('</ref>', tagStart);
        
        let endIdx = -1;
        if(tagEnd1 !== -1 && tagEnd2 !== -1) {
            endIdx = Math.min(tagEnd1 + 2, tagEnd2 + 6);
        } else if(tagEnd1 !== -1) {
            endIdx = tagEnd1 + 2;
        } else if(tagEnd2 !== -1) {
            endIdx = tagEnd2 + 6;
        } else {
            // Unclosed ref
            endIdx = t.indexOf('>', tagStart);
            if(endIdx === -1) endIdx = t.length;
            else endIdx += 1;
        }
        i = endIdx;
    }
    return out;
}

function parseWiki(text) {
    if(!text) return '';
    let t = text;
    
    // Remove infoboxes manually
    let lines = t.split('\\n');
    let outLines = [];
    let inInfobox = false;
    let braceCount = 0;
    
    for(let line of lines) {
        if(!inInfobox && line.startsWith('{{Infobox')) {
            inInfobox = true;
            braceCount = (line.match(/{{/g) || []).length - (line.match(/}}/g) || []).length;
            continue;
        }
        if(inInfobox) {
            braceCount += (line.match(/{{/g) || []).length - (line.match(/}}/g) || []).length;
            if(braceCount <= 0) {
                inInfobox = false;
            }
            continue;
        }
        outLines.push(line);
    }
    t = outLines.join('\\n');

    t = removeRefs(t);

    // Links [[A|B]] -> B
    t = t.replace(/\\[\\[([^|\\]]+)\\|([^\\]]+)\\]\\]/g, '$2');
    // Links [[A]] -> A
    t = t.replace(/\\[\\[([^\\]]+)\\]\\]/g, '$1');

    // Bold/Italic
    t = t.replace(/'''(.*?)'''/g, '<b>$1</b>');
    t = t.replace(/''(.*?)''/g, '<i>$1</i>');

    // Headers
    t = t.replace(/^===\\s*(.*?)\\s*===$/gm, '<h3>$1</h3>');
    t = t.replace(/^==\\s*(.*?)\\s*==$/gm, '<h2>$1</h2>');

    // Paragraphs
    let paragraphs = t.split(/\\n\\n+/);
    let html = '';
    for(let p of paragraphs) {
        p = p.trim();
        if(!p || p.startsWith('{{') || p.startsWith('}}') || p.startsWith('[[Category')) continue;
        if(p.startsWith('<h')) {
            html += p + '\\n\\n';
        } else {
            html += '<p>' + p + '</p>\\n\\n';
        }
    }
    
    return html;
}

function generateLocation(title, wikitext) {
    const slug = getSlug(title);
    
    let ibMatch = wikitext.match(/\\|image\\s*=\\s*([^\\n]+)/);
    let imageInfo = ibMatch ? ibMatch[1].trim() : '';

    let mMatch = wikitext.match(/\\|map image\\s*=\\s*([^\\n]+)/);
    let mapImage = mMatch ? mMatch[1].trim() : '';
    
    let bodyHtml = parseWiki(wikitext);
    
    let result = \`<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\${title} - Fallout Lore Archive</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Share+Tech+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="index.css">
</head>
<body data-article-category="場所">
    <div class="scanlines"></div><div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>\${title}<br><span style="font-size: 0.6em; color: #888;">TVシリーズ ロケーション</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                \${imageInfo ? \`<img src="images/note_extracted/\${slug}/\${imageInfo.replace(/ /g,'_')}" alt="\${title}" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;">\` : ''}
                \${mapImage ? \`<img src="images/note_extracted/\${slug}/\${mapImage.replace(/ /g,'_')}" alt="Map" style="width:100%; margin-top:5px;">\` : ''}
            </div>
            
            \${bodyHtml}
            
            <div class="quote-box">
                <b>Impression</b><br><br>
                プレースホルダーテキスト。
            </div>
        </main>
    </div>
</body>
</html>\`;

    fs.writeFileSync('f:/Fallout/' + slug + '.html', result, 'utf8');
}

Object.keys(raw).forEach(title => {
    if(!raw[title].startsWith('Error')) {
        generateLocation(title, raw[title]);
    }
});
console.log('Location HTMLs generated (fixed refs).');
