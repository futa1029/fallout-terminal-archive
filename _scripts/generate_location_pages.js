const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('f:/Fallout/_drafts/tv_locations_raw.json', 'utf8'));
const imagesMapBase = JSON.parse(fs.readFileSync('f:/Fallout/_drafts/tv_locations_images_map.json', 'utf8') || '[]');
let tMap = {};
try { tMap = JSON.parse(fs.readFileSync('f:/Fallout/_scripts/location_translation_map.json', 'utf8')); } catch(e) {}

function getSlug(name) {
    return name.toLowerCase().replace(/[^a-z0-g0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

// Simple WikiText to HTML parser
function parseWiki(text, transMap) {
    if(!text) return '';
    let t = text;
    // Translate full known blocks
    for(let [eng, jp] of Object.entries(transMap)) {
        if(eng && jp && t.includes(eng)) {
            t = t.split(eng).join(jp);
        }
    }
    
    // Remove infoboxes & navboxes
    t = t.replace(/{{Infobox location[\\s\\S]*?\\n(?={{|==|\\w)/, '');
    t = t.replace(/{{Navbox[\\s\\S]*?}}/g, '');
    t = t.replace(/{{Location links[\\s\\S]*?}}/g, '');
    
    // Bold
    t = t.replace(/'''(.*?)'''/g, '<b>$1</b>');
    // Italic
    t = t.replace(/''(.*?)''/g, '<i>$1</i>');
    // Links [[A|B]] -> B
    t = t.replace(/\\[\\[(.*?)\\|(.*?)\\]\\]/g, '$2');
    // Links [[A]] -> A
    t = t.replace(/\\[\\[(.*?)\\]\\]/g, '$1');
    // Refs
    t = t.replace(/<ref.*?\\/?>/g, '');
    t = t.replace(/<ref.*?>.*?<\\/ref>/gs, '');

    // Headers
    t = t.replace(/===\\s*(.*?)\\s*===/g, '<h3>$1</h3>');
    t = t.replace(/==\\s*(.*?)\\s*==/g, '<h2>$1</h2>');

    // Bullet points
    t = t.replace(/^\\*\\s*(.*)$/gm, '<li>$1</li>');
    t = t.replace(/(<li>.*?<\\/li>)/s, '<ul>$1</ul>'); // Rough

    // Transcripts
    t = t.replace(/{{Transcript\\|([^|}]*)\\|([\\s\\S]*?)}}/g, '<div class="note-box"><b>$1</b><br><br>$2</div>');

    // Paragraphs - double newline
    let paragraphs = t.split(/\\n\\n+/);
    let html = '';
    for(let p of paragraphs) {
        p = p.trim();
        if(!p) continue;
        if(p.startsWith('<h') || p.startsWith('<div') || p.startsWith('<ul') || p.startsWith('<li>')) {
            html += p + '\\n\\n';
        } else {
            // translate single line
            if(transMap[p]) p = transMap[p];
            html += '<p>' + p + '</p>\\n\\n';
        }
    }
    
    return html;
}

const template = fs.readFileSync('f:/Fallout/ava-west.html', 'utf8'); // Using character template as base just for structure

function generateLocation(title, wikitext) {
    const slug = getSlug(title);
    
    // Infobox parsing
    let imageInfo = '';
    let mapImage = '';
    let state = '不明', factions = '不明', apps = '不明', leader = '不明';
    
    let ibMatch = wikitext.match(/{{Infobox location([\\s\\S]*?)\\n(?:==|{{)/);
    if(ibMatch) {
        let ib = ibMatch[1];
        let imMatch = ib.match(/\\|image\\s*=\\s*(.*?)\\n/);
        if(imMatch && imMatch[1]) imageInfo = imMatch[1].trim();
        let mMatch = ib.match(/\\|map image\\s*=\\s*(.*?)\\n/);
        if(mMatch && mMatch[1]) mapImage = mMatch[1].trim();
        
        let sMatch = ib.match(/\\|state\\s*=\\s*(.*?)\\n/);
        if(sMatch) state = sMatch[1].replace(/\\[\\[|\\]\\]/g,'');
        
        // rough extraction
    }
    
    let bodyHtml = parseWiki(wikitext, tMap[title] || {});
    
    let result = \`<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\${title} - Fallout Lore Archive</title>
    <!-- CSS etc -->
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Share+Tech+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="index.css">
</head>
<body data-article-category="場所">
    <div class="scanlines"></div><div class="vignette"></div>
    <div class="container">
        <!-- sidebar simplified for space -->
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>\${title}<br><span style="font-size: 0.6em; color: #888;">フォールアウト ロケーション</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                \${imageInfo ? \`<img src="images/note_extracted/\${slug}/\${imageInfo.replace(/ /g,'_')}" alt="\${title}" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;">\` : ''}
                \${mapImage ? \`<img src="images/note_extracted/\${slug}/\${mapImage.replace(/ /g,'_')}" alt="Map" style="width:100%; margin-top:5px;">\` : ''}
                <div class="info-grid">
                    <div class="info-label">州:</div><div class="info-value">\${state}</div>
                </div>
            </div>
            
            \${bodyHtml}
            
            <div class="quote-box">
                <b>感想</b><br><br>
                自動生成によるロケーションインポート。（ここに追記・編集を行います）
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
console.log('Location HTMLs generated.');
