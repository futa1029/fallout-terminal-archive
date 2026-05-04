const fs = require('fs');

const mappings = {
    'athena.html': {
        enName: 'ATHENA', jpName: 'ATHENA',
        fandomUrl: 'ATHENA', category: '人物',
        appearance: 'Fallout 76', image: 'images/placeholder.jpg'
    },
    'autumn-acre-cabin.html': {
        enName: 'Autumn Acre cabin', jpName: 'オータム・エーカー・キャビン',
        fandomUrl: 'Autumn_Acre_cabin', category: 'ロケーション',
        appearance: 'Fallout 76', image: 'images/placeholder.jpg'
    },
    'buds_full.html': {
        enName: 'Ken Ewers', jpName: 'ケン・ユアーズ',
        fandomUrl: 'Ken_Ewers', category: '人物',
        appearance: 'Fallout 3', image: 'images/note_extracted/buds_full/Ken_Ewers.jpg'
    },
    'commie-kazi.html': {
        enName: 'Commie-Kazi', jpName: 'コミーカミカゼ',
        fandomUrl: 'Commie-Kazi', category: 'アイテム',
        appearance: 'Fallout 4, Fallout 76', image: 'images/placeholder.jpg'
    },
    'commissioner-chaos.html': {
        enName: 'Commissioner Chaos', jpName: 'コミッショナー・カオス',
        fandomUrl: 'Commissioner_Chaos', category: '人物',
        appearance: 'Fallout 76', image: 'images/placeholder.jpg'
    },
    'cynnoc.html': {
        enName: 'Cynnoc', jpName: 'シンノック',
        fandomUrl: 'Cynnoc', category: '人物',
        appearance: 'Fallout 76', image: 'images/placeholder.jpg'
    },
    'dr-brainwash.html': {
        enName: 'Dr. Brainwash', jpName: 'Dr.ブレインウォッシュ',
        fandomUrl: 'Dr._Brainwash', category: '人物',
        appearance: 'Fallout 76', image: 'images/placeholder.jpg'
    },
    'joey-bello.html': {
        enName: 'Joey Bello', jpName: 'ジョーイ・ベロ',
        fandomUrl: 'Joey_Bello', category: '人物',
        appearance: 'Fallout 76', image: 'images/placeholder.jpg'
    },
    'manta-man.html': {
        enName: 'Manta Man', jpName: 'マンタ・マン',
        fandomUrl: 'Manta_Man', category: '人物',
        appearance: 'Fallout 4, Fallout 76', image: 'images/placeholder.jpg'
    },
    'mechanist.html': {
        enName: 'Mechanist', jpName: 'メカニスト',
        fandomUrl: 'Mechanist', category: '人物',
        appearance: 'Fallout 3, Fallout 4, Fallout 76', image: 'images/placeholder.jpg'
    },
    'moe-the-mole.html': {
        enName: 'Moe the Mole', jpName: 'モール・ザ・モール',
        fandomUrl: 'Moe_the_Mole', category: '人物',
        appearance: 'Fallout 76', image: 'images/placeholder.jpg'
    },
    'poseidonet.html': {
        enName: 'PoseidoNet', jpName: 'ポセイドネット',
        fandomUrl: 'PoseidoNet', category: 'ロア',
        appearance: 'Fallout 2, Fallout: New Vegas, Fallout 76', image: 'images/placeholder.jpg'
    }
};

const TARGET_DIR = 'f:/Fallout/';

for (const file in mappings) {
    const data = mappings[file];
    let txt = fs.readFileSync(TARGET_DIR + file, 'utf8');

    // Remove the bad structural wrappers
    
    // We need to capture the GOOD content. It usually starts from:
    // <div class="wiki-content"> or <div class="page-content"> or <p><em>このページは
    let contentMatch = txt.match(/<main class="content">[\s\S]*?<\/h1>\s*(?:<\/?div[^>]*>)?\s*(?:<div class="(?:wiki-content|page-content|main-content)">)?\s*([\s\S]*?)<div class="quote-box">/);
    
    // Special case for missing quote-box or different structure
    if (!contentMatch) {
       console.log('Failed to match content on ' + file);
       continue;
    }
    
    let realContent = contentMatch[1];
    
    // Clean up trailing divs
    realContent = realContent.replace(/<\/div>\s*<\/article>\s*$/g, '');
    realContent = realContent.replace(/<\/div>\s*$/g, '');
    
    // Rebuild the correct body structure
    const articleIdMatch = txt.match(/data-article-id="([^"]+)"/);
    const articleId = articleIdMatch ? articleIdMatch[1] : 'note_' + file.replace('.html','');
    
    // Get the comments section block (so we don't lose Fandom links / comments stuff)
    const commentsMatch = txt.match(/<div style="margin-top: 30px[^>]*>([\s\S]*?)<\/html>/);
    let commentsBlock = commentsMatch ? '<div style="margin-top: 30px' + commentsMatch[1] + '</html>' : '';
    
    // Fix the Fandom link inside commentsBlock
    commentsBlock = commentsBlock.replace(/<a href="https:\/\/fallout\.fandom\.com\/wiki\/[^"]+" target="_blank" rel="noopener">[^<]+<\/a>/, 
                                          `<a href="https://fallout.fandom.com/wiki/${data.fandomUrl}" target="_blank" rel="noopener">${data.enName}</a>`);
    
    // Replace Fandom link in JS payload
    commentsBlock = commentsBlock.replace(/const _commentArticleName = '[^']+';/, `const _commentArticleName = '${data.jpName.replace(/'/g, "\\'")}';`);
    
    // Assemble new HTML structure for the modified body
    const replacedTxt = `</head>
<body data-article-category="${data.category}" data-article-appearance="${data.appearance}">
    <div class="container">
        <!-- Sidebar -->
        <aside class="infobox">
            <h3 style="margin-top:0; text-align:center;">${data.enName}</h3>
            <img src="${data.image}" alt="${data.jpName}" onerror="this.src='images/placeholder.jpg'">
            <div class="infobox-row"><span class="infobox-label">カテゴリ</span><span>${data.category}</span></div>
            <div class="infobox-row"><span class="infobox-label">登場作品</span><span>${data.appearance}</span></div>
        </aside>

        <!-- Main Content -->
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
                <button class="like-button" data-article-id="${articleId}" onclick="toggleLike(this)">
                    <span class="heart">♡</span> <span class="like-count">0</span>
                </button>
            </div>

            <h1>${data.enName}<br><span style="font-size: 0.6em; color: #888; font-family: 'Noto Sans JP', sans-serif; font-weight: normal;">${data.jpName}</span></h1>

            ${realContent}

            <div class="quote-box">`;

    // Wait, the body needs everything before </head> to remain intact
    let topHtml = txt.substring(0, txt.indexOf('</head>'));
    
    // Fix the meta titles in topHtml
    topHtml = topHtml.replace(/<title>[^<]+<\/title>/, `<title>${data.enName} | Overseer Mohi's Terminal</title>`);
    topHtml = topHtml.replace(/<meta property="og:title" content="[^"]+">/, `<meta property="og:title" content="${data.enName} | Overseer Mohi's Terminal">`);
    topHtml = topHtml.replace(/<meta property="og:description" content="[^"]+">/, `<meta property="og:description" content="${data.jpName}。Falloutのロア記事。">`);

    const finalHtml = topHtml + replacedTxt + txt.match(/<div class="quote-box">([\s\S]*?)<\/div>/)[1] + `</div>\n\n            ` + commentsBlock;

    fs.writeFileSync(TARGET_DIR + file, finalHtml, 'utf8');
    console.log(`Repaired -> ${file}`);
}
