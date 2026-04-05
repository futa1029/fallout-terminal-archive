const fs = require('fs');
const path = require('path');

const batchData = [
    {
        "id": "vault-31-dweller",
        "name": "Vault 31の居住者",
        "yomi": "ぼると31のきょじゅうしゃ",
        "fileName": "vault-31-dweller",
        "rawFile": "vault_31_dweller_raw.json",
        "engName": "Vault 31 dweller",
        "quote": "Vault 31の居住者は、戦前のVault-Tecの「バッズ・バディーズ（Bud's Buds）」計画の一環として冷凍睡眠に置かれたエリートたち。彼らの存在自体が、Fallout世界の冷酷で狂気じみた社会実験の象徴となっています。"
    },
    {
        "id": "vault-32-dweller",
        "name": "Vault 32の居住者",
        "yomi": "ぼると32のきょじゅうしゃ",
        "fileName": "vault-32-dweller",
        "rawFile": "vault_32_dweller_raw.json",
        "engName": "Vault 32 dweller",
        "quote": "Vault 32の居住者たちは、数年前に起きた凄惨な暴動によって全滅してしまった悲劇の住人たちです。彼らの住処であるVaultがレイダーに占拠されたことで、後にVault 33の惨劇を引き起こす舞台となってしまいました。"
    },
    {
        "id": "vault-32-raider",
        "name": "Vault 32のレイダー",
        "yomi": "ぼると32のれいだー",
        "fileName": "vault-32-raider",
        "rawFile": "vault_32_raider_raw.json",
        "engName": "Vault 32 raider",
        "quote": "リー・モルデイヴァーに率いられ、Vault 32からの友好的な訪問者を装ってVault 33に侵入した冷酷なレイダー集団。平和なVaultの日常を突如として地獄に変えた、過酷なウェイストランドの現実を体現する存在です。"
    },
    {
        "id": "vault-33-dweller",
        "name": "Vault 33の居住者",
        "yomi": "ぼると33のきょじゅうしゃ",
        "fileName": "vault-33-dweller",
        "rawFile": "vault_33_dweller_raw.json",
        "engName": "Vault 33 dweller",
        "quote": "何世代にもわたって安全な地下環境で平和裏に暮らし、外の世界の残酷さを微塵も知らずに育ってきた純朴な人々。ルーシーをはじめとする彼らの無垢さは、ドラマ版の核心である「隔絶された二つの世界の衝突」を見事に描き出しています。"
    },
    {
        "id": "vault-33-engineer",
        "name": "Vault 33のエンジニア",
        "yomi": "ぼると33のえんじにあ",
        "fileName": "vault-33-engineer",
        "rawFile": "vault_33_engineer_raw.json",
        "engName": "Vault 33 engineer",
        "quote": "Vault 33のインフラ整備や各種機械のメンテナンスを担う技術者たち。彼らの献身的な働きがあるからこそ、厳しい外界から隔離された地下施設でも長年にわたって平穏な生活が維持されているのです。"
    }
];

const TEMPLATE_FILE = 'f:/Fallout/ava-west.html';
const OUTPUT_DIR = 'f:/Fallout';
const DRAFT_DIR = 'f:/Fallout/_drafts';

const templateHtml = fs.readFileSync(TEMPLATE_FILE, 'utf8');

for (const char of batchData) {
    console.log(`Processing ${char.fileName}...`);
    
    // Read raw data
    const rawDataPath = path.join(DRAFT_DIR, char.rawFile);
    let rawData = null;
    if (fs.existsSync(rawDataPath)) {
        rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'));
    } else {
        console.warn(`Warning: raw file not found for ${char.fileName}`);
    }

    // Process images
    const xDir = path.join(OUTPUT_DIR, '_X', char.fileName);
    if (!fs.existsSync(xDir)) {
        fs.mkdirSync(xDir, { recursive: true });
    }
    const imgDir = path.join(xDir, 'images');
    if (!fs.existsSync(imgDir)) {
        fs.mkdirSync(imgDir, { recursive: true });
    }

    let galleryHtml = '';
    let mainImgHtml = '';
    
    if (rawData && rawData.images && rawData.images.length > 0) {
        galleryHtml = '<div class="gallery-section"><h2>Gallery</h2><div class="gallery-grid">';
        
        rawData.images.forEach((url, index) => {
            if (index === 0) {
                mainImgHtml = `<img src="${url}" alt="${char.engName}">`;
            }
            galleryHtml += `
            <div class="gallery-item">
                <img src="${url}" alt="${char.engName} ${index + 1}">
            </div>`;
        });
        
        galleryHtml += '</div></div>';
    } else {
        mainImgHtml = '<div style="padding:20px;text-align:center;border:1px dashed #555;color:#555;">No Image Available</div>';
    }

    // Build the specific translations / bodies based on Wiki description (Extracted manually or just basic for now)
    let bodyHtml = '';
    
    if (char.id === 'vault-31-dweller') {
        bodyHtml = `<h2>概要</h2>
<p><b>${char.name}</b> は、戦前の「バッズ・バディーズ（Bud's Buds）」プログラムの一環としてVault 31の内部で冷凍睡眠を施されたVault-Tecの元従業員たちです。</p>
<h2>背景</h2>
<p>プログラムの目的の一部として、彼らは最終戦争後の荒廃した世界を管理・指導するためのエリートとして選ばれており、Vault 32やVault 33に管理職・監督官候補として目覚めさせられるのを待っていました。</p>`;
    } else if (char.id === 'vault-32-dweller') {
        bodyHtml = `<h2>概要</h2>
<p><b>${char.name}</b> は、Vault 32の正規の居住者たちです。彼らはドラマのメインストーリーが始まる2294年よりも前に、謎の状況下で全員が死亡しました。</p>
<h2>背景</h2>
<p>Vault 33の居住者たちは、Vault 32について深刻な危機（作物の不作など）があったとは知らされておらず、単に交流の時期が来たから扉が開かれたと考えていました。しかし、後にVault内の惨状がルーシーやノームたちによって発見され、Vault 31との裏の繋がりや恐ろしい真実を知った居住者同士で殺し合いが発生した結果であることが示唆されます。</p>`;
    } else if (char.id === 'vault-32-raider') {
        bodyHtml = `<h2>概要</h2>
<p><b>${char.name}</b> は、リー・モルデイヴァーが率いるレイダー集団であり、Vault 32の居住者を装ってVault 33に侵入した者たちです。</p>
<h2>背景</h2>
<p>モルデイヴァーは、全滅していたVault 32に地上からトンネルを使ってアクセスし、そこにレイダーを配置してVault 33との合同結婚式を装って侵入しました。彼らの襲撃によって平和だったVault 33に大量の被害者が出ており、ハンク・マクレーンの誘拐という本作の発端となる事件を起こしました。</p>`;
    } else if (char.id === 'vault-33-dweller') {
        bodyHtml = `<h2>概要</h2>
<p><b>${char.name}</b> は、南カリフォルニアにあるVault 33の居住者たちです。</p>
<h2>背景</h2>
<p>彼らは他者の幸福やルールの厳守を最優先するように育てられており、外部の世界については完全に情報が遮断されていました。農業技術や修理技術に長け、アメリカ再建を目指して日々平和に生活をしていましたが、Vault 32のレイダーたちによる襲撃によって、その温室育ちの世界観が崩壊することになります。</p>`;
    } else if (char.id === 'vault-33-engineer') {
        bodyHtml = `<h2>概要</h2>
<p><b>${char.name}</b> は、Vault 33の機械設備やインフラストラクチャーの保守・修理を担当する職員たちです。</p>
<h2>背景</h2>
<p>Vault 33に不可欠な電算設備や配管、さらには水のチップに至るまでのメンテナンスを行っています。彼らの技術力により、Vault 33は長い間ウェイストランドの影響を受けることなく機能し続けることができました。</p>`;
    }

    let resultHtml = templateHtml.replace(/data-article-id="[^"]*"/, `data-article-id="note_${char.fileName.replace(/-/g, '_')}"`);
    resultHtml = resultHtml.replace(/<title>.*?<\/title>/, `<title>${char.name} | Overseer Mohi's Terminal</title>`);
    resultHtml = resultHtml.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${char.name} | Overseer Mohi's Terminal">`);
    resultHtml = resultHtml.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="https://www.fallout-jp.com/${char.fileName}.html">`);
    resultHtml = resultHtml.replace(/<h3[^>]*>.*?<\/h3>/, `<h3 style="margin-top:0;text-align:center;">${char.name}</h3>`);
    resultHtml = resultHtml.replace(/<aside class="infobox">.*?<\/aside>/s, 
        `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">${char.name}</h3>${mainImgHtml}<div class="infobox-row"><span class="infobox-label">種類</span><span>人物</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout TV</span></div></aside>`);
    
    resultHtml = resultHtml.replace(/<h1>.*?<\/h1>/s, `<h1>${char.name}<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">${char.engName}</span></h1>`);
    
    resultHtml = resultHtml.replace(/<main class="content">.*?<div class="quote-box">/s, 
        `<main class="content">
            
            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_${char.fileName.replace(/-/g, '_')}" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>
            <h1>${char.name}<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">${char.engName}</span></h1>
            
${bodyHtml}
${galleryHtml}
            
            <div class="quote-box">`);

    resultHtml = resultHtml.replace(/<div class="quote-box">.*?<\/div>/s, 
        `<div class="quote-box">
                <b>感想</b><br><br>
                ${char.quote.replace(/\n/g, '<br>')}
            </div>`);

    resultHtml = resultHtml.replace(/<a href="https:\/\/fallout\.fandom\.com\/wiki\/[^"]*" target="_blank" rel="noopener">.*?<\/a>/, 
        `<a href="https://fallout.fandom.com/wiki/${char.engName.replace(/ /g, '_')}" target="_blank" rel="noopener">${char.engName}</a>`);
    
    resultHtml = resultHtml.replace(/const _commentArticleId = '(.*?)';/, `const _commentArticleId = 'note_${char.fileName.replace(/-/g, '_')}';`);
    resultHtml = resultHtml.replace(/const _commentArticleName = '(.*?)';/, `const _commentArticleName = '${char.name}';`);
    resultHtml = resultHtml.replace(/const _commentArticleUrl = '(.*?)';/, `const _commentArticleUrl = '${char.fileName}.html';`);

    const outputFilePath = path.join(OUTPUT_DIR, `${char.fileName}.html`);
    fs.writeFileSync(outputFilePath, resultHtml, 'utf8');

    // Create post.md
    const postContent = `New Note: ${char.name}

${char.name}（${char.engName}）のVault内端末データを複合化しました。

🔽ターミナルにアクセス
https://www.fallout-jp.com/${char.fileName}.html

#Fallout #フォールアウト #FalloutTV`;
    fs.writeFileSync(path.join(xDir, 'post.md'), postContent, 'utf8');

    // Generate curl command to download images
    let dlScript = '';
    if (rawData && rawData.images) {
        rawData.images.forEach((url, index) => {
            dlScript += `curl -o "f:/Fallout/_X/${char.fileName}/images/img_${index}.png" "${url}"\n`;
        });
        fs.writeFileSync(path.join(xDir, 'dl_images.bat'), dlScript, 'utf8');
        const execSync = require('child_process').execSync;
        try {
            execSync(`call "f:/Fallout/_X/${char.fileName}/dl_images.bat"`);
        } catch (e) {
            console.log(`Failed to download images for ${char.fileName}`);
        }
    }
    
    console.log(`Successfully processed ${char.fileName}`);
}
