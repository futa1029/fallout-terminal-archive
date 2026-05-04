const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'shady-sands-farmer',
        enName: 'Shady Sands farmer',
        jpName: 'シェイディ・サンズの農民',
        rawFile: 'shady_sands_farmer_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'New California Republic (NCR)' },
            { label: '役割', value: '農民' }
        ],
        bodyHtml: '<p>シェイディ・サンズの農民（Shady Sands farmer）は、かつてのNCR首都シェイディ・サンズで農業を営んでいた市民の一人です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>本作においてはすでにシェイディ・サンズが核攻撃によって消滅（Fall of Shady Sands）した後の時代が舞台となっているため、彼はシーズン2の回想シーンにて登場します。<br><br>かつて3万人以上の人口を誇った大都市の近郊で、安全な生活と農業を営んでいた彼らの平穏な日々が、Vault-Tecのハンク・マクレーンによっていかにして断ち切られたかが描かれることになります。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>かつてのFallout作品でプレイヤーが目にしてきたであろう「NCRの市民の日常」を描写するキャラクターです。<br><br>モハビ（New Vegas）におけるNCRのシェアクロッパー農場のようなインフラが整った社会で生きていた彼らが、核の炎によって奪われる悲劇を際立たせています。</div>',
        post: '「シェイディ・サンズの農民」のロア記事を追加しました！🌾\nシーズン2の回想シーンに登場するNCR市民の一人です。Fallout 2やNew Vegasでプレイヤーが見てきたであろう「NCRの平和な社会」を営んでいた一般人が、ハンクの核によって日常を奪われる様子に関わってきます。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/shady-sands-farmer.html'
    },
    {
        id: 'shelley-tv-series',
        enName: 'Shelley (TV series)',
        jpName: 'シェリー',
        rawFile: 'shelley__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'ハンク・マクレーン' },
            { label: '役割', value: 'マインドコントロールされた奴隷' }
        ],
        bodyHtml: '<p>シェリー（Shelley）は、ラスベガスの大企業の管理用Vault（Las Vegas management Vault）で肉体労働を強制されている女性です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Other Player」に登場します。彼女は首の後ろにマインドコントロール用のチップを埋め込まれており、ハンク・マクレーンの完全な操り人形として酷使されています。<br><br>かつては自由な意志を持っていたウェイストランダーだったと思われますが、現在はチップの増産ラインなどでただ黙々と働く部品の一つとなっており、ハンクの掲げる「Vault-Tecによる完璧な管理社会の実現」の犠牲者として描かれています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ハンクがいかに「倫理観の欠如した」人間であるかを示す存在です。<br><br>Vault 33では「良き監督官」として振る舞っていたハンクですが、本性を現した彼がいかにウェイストランドの人間たちを「非人間的な扱い（洗脳奴隷化）」にしているかがよく表れています。</div>',
        post: '「シェリー」のロア記事を公開しました！🧠\nシーズン2に登場する、ラスベガスのVaultでマインドコントロール・チップを埋め込まれ、自我を奪われた奴隷の女性です。ハンク・マクレーンが掲げる「Vault-Tecによる完全な管理社会」の犠牲者であり、彼の恐ろしい本性が如実に表れています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/shelley-tv-series.html'
    },
    {
        id: 'sheriff-tv-series',
        enName: 'Sheriff (TV series)',
        jpName: '保安官（ガバミント）',
        rawFile: 'sheriff__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '複数' },
            { label: '所属', value: '「ガバミント (The Govermint)」' },
            { label: '役割', value: '保安官（という名のギャング番兵）' }
        ],
        bodyHtml: '<p>保安官たち（The sheriffs）は、ソレル・ブッカーが率いる自称政府組織「ガバミント（The Govermint）」の法執行官…という名目で動いているギャングの用心棒たちです。Fallout TVシリーズのシーズン1に登場します。（トロイ、レックスなどの名前が確認されています）</p><hr><h2>Fallout TVシリーズ</h2><p>第6話でスーパーウルトラ・マーケットの内部を捜索中だったグール（クーパー・ハワード）を発見し、銃を向けて彼を「逮捕」しました。<br><br>彼らは一応保安官としての制服を身に着けていますが、実態は単なる強盗ギャングの用心棒です。彼らはグールを社長であるブッカーの元へ連行して尋問を行いましたが、グールの恐ろしさを知るブッカーが「彼から手を引け」といった交渉に応じた直後、グールがその場であっさりと保安官二人（トロイ、レックス）を撃ち殺しました。<br><br>彼らは「縛り上げりゃなんとかなる」と高を括っていましたが、グール相手には銃を向ける隙すら与えられませんでした。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>自称政府に雇われただけの小悪党ギャングたちです。<br><br>「新大統領のブッカーがルールだ」と粋がってグールに手錠をかけたものの、結果的にグールの圧倒的な早撃ちの前に全滅するという、ウェイストランドらしいカませ犬役を完璧にこなしてくれました。</div>',
        post: 'ガバミントの「保安官」たちのロア記事を追加しました！👮\nスーパーウルトラ・マーケットでグールを「逮捕」したギャングの用心棒たちです。「政府（ガバミント）のルールだ」と粋がっていましたが、グールの早撃ちの前には全く手も足も出ず、あっさりと射殺されるというFallout世界の噛ませ犬役を見事に全うしてくれました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/sheriff-tv-series.html'
    },
    {
        id: 'sherman-tv-series',
        enName: 'Sherman (TV series)',
        jpName: 'シャーマン',
        rawFile: 'sherman__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: '部族民 (元) / ハンク・マクレーン' },
            { label: '役割', value: 'マインドコントロールされた奴隷' }
        ],
        bodyHtml: '<p>シャーマン（Sherman）は、ラスベガスの大企業の管理用Vault（Las Vegas management Vault）で肉体労働を強制されている男性です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Other Player」に登場します。<br>元々はモハビ・ウェイストランド周辺の「部族（Tribal）」の一員であったとされていますが、ハンク・マクレーンの配下によって捕らえられ、首の後ろにマインドコントロール用のチップを埋め込まれてしまいました。<br><br>現在は自我を奪われ、完全にハンクの管理下でチップ製造ラインの無制限の労働力として酷使されています。彼のような部族民でさえも捕らえて自分たちの都合の良いように「リセット」してしまうハンクの手法は、ある意味でVaultのルールの外（ウェイストランド）にまでVault-Tecの管理が及ぼうとしている狂気を示しています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>部族民出身でありながら、マインドコントロールのチップを埋め込まれて従順なロボットのように働かされている被害者です。<br><br>大戦から200年後の自由なウェイストランドをサバイバルしていた部族までもが、再び戦前の巨大企業（Vault-Tec）の歯車として自我を消去されるという展開は恐ろしいですね。</div>',
        post: '「シャーマン」のロア記事を公開しました！🛠️\nシーズン2に登場。元々は部族民（Tribal）のウェイストランダーでしたが、強制的にマインドコントロール・チップを埋め込まれ、ラスベガスのVaultで自我のない労働奴隷にされてしまった被害者です。戦前の大企業Vault-Tecの狂気が、外部の部族にまで牙を剥き出しています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/sherman-tv-series.html'
    },
    {
        id: 'shirtless-raider',
        enName: 'Shirtless raider',
        jpName: '上半身裸のレイダー',
        rawFile: 'shirtless_raider_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'モルデイヴァーのレイダー' },
            { label: '役割', value: 'レイダー' }
        ],
        bodyHtml: '<p>上半身裸のレイダー（Shirtless raider）は、モルデイヴァーがVault 32/33に侵攻した際に同行していた荒くれ者の一人です。Fallout TVシリーズのシーズン1（第1話）に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>Vault 32ジャンプスーツの下半身部分だけを履き、上半身は裸という狂気に満ちた姿で登場しました。<br>第1話のVault 33襲撃時、彼が折りたたみ式ストックのサブマシンガン（Folding stock SMG）を構えているところに背後からVault 33の住民が飛びかかって組み合いになりました。<br><br>しかし彼は素早く住民の腕をねじ伏せ、相手の「口の中」に直接サブマシンガンの銃口を突っ込み、引き金を引いて残酷に処刑しました。さらに、食料を運ぼうとして通りかかった別の2人の住民も直後に射殺しており、温室育ちのVault居住者たちに「ウェイストランドのリアル（非道さ）」を見せつけたインパクトの強い下っ端レイダーです。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ドラマの第1話で、平和ボケしたVault 33の居住者たちに地獄を見せたレイダー軍団の中でも、特に残忍なキルムーブを見せた男です。<br><br>背後から組み付かれたのに一瞬で相手を無力化し、口の中に直接銃を突っ込んで撃つというゲーム『Fallout』のV.A.T.S.的なゴア描写を実写でフルに表現してくれました。</div>',
        post: '「上半身裸のレイダー」のロア記事を追加しました！🔫\n第1話のVault 33襲撃時に登場したモルデイヴァーの部下です。背後から飛びかかってきたVault居住者の口の中に直接サブマシンガンを突っ込んで処刑するという、ウェイストランドの残忍さとゴア表現をこれでもかと見せつけた印象的なレイダーです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/shirtless-raider.html'
    }
];

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            } else {
                reject(new Error("Failed to download image: " + response.statusCode));
            }
        }).on('error', (err) => {
            fs.unlinkSync(dest);
            reject(err);
        });
    });
}

(async () => {
    const templateHtml = fs.readFileSync('f:/Fallout/ava-west.html', 'utf8');
    
    for (let char of chars) {
        console.log("Processing " + char.id + "...");
        
        let targetHtml = templateHtml.replace(/ava-west\.html/g, char.id + '.html');
        targetHtml = targetHtml.replace(/ava_west/g, char.id.replace(/-/g, '_'));
        targetHtml = targetHtml.replace(/Ava West/g, char.enName);
        targetHtml = targetHtml.replace(/エヴァ・ウェスト/g, char.jpName);
        
        // Remove existing info tags
        targetHtml = targetHtml.replace(/<span class="infobox-label">カテゴリ<\/span><span>人物<\/span><\/div>\s*<div class="infobox-row"><span class="infobox-label">人種<\/span><span>人間<\/span><\/div>\s*<div class="infobox-row"><span class="infobox-label">性別<\/span><span>女<\/span><\/div>[\s\S]*?<div class="infobox-row" style="margin-top:5px;"><span class="infobox-label">登場<\/span><span>Fallout TV<\/span><\/div>/, '%%%INFOBOX_CONTENT%%%');

        let infoStr = '<div class="infobox-row"><span class="infobox-label">カテゴリ</span><span>' + char.category + '</span></div>\n';
        for (let i of char.info) {
            infoStr += '            <div class="infobox-row"><span class="infobox-label">' + i.label + '</span><span' + (i.value.length > 5 ? ' style="text-align:right"' : '') + '>' + i.value + '</span></div>\n';
        }
        infoStr += '            <div class="infobox-row" style="margin-top:5px;"><span class="infobox-label">登場</span><span>' + char.appearance + '</span></div>';
        
        targetHtml = targetHtml.replace('%%%INFOBOX_CONTENT%%%', infoStr);

        targetHtml = targetHtml.replace(/<p>エヴァ・ウェスト（Ava West）は、[\s\S]*?<div class="quote-box">/, char.bodyHtml + '\n            ' + char.quote.replace('<div class="quote-box">', '<div class="quote-box">'));
        
        targetHtml = targetHtml.replace(/<span style="background:#222; padding:2px 5px; border-radius:3px; color:var\(--accent-color\); margin-right:5px;">#Vault33<\/span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var\(--accent-color\); margin-right:5px;">#Vault-Tec<\/span>/, '');
        
        let rawData;
        try {
            rawData = JSON.parse(fs.readFileSync('f:/Fallout/_drafts/' + char.rawFile));
        } catch(e) {
            console.log("No raw json found for " + char.id + " " + e.message);
            rawData = { images: [] };
        }
        
        const imgDir = 'f:/Fallout/images/note_extracted/' + char.id;
        if (rawData.images && rawData.images.length > 0) {
            if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
            
            let imgTags = '';
            for (let i = 0; i < rawData.images.length; i++) {
                const parts = rawData.images[i].split('?')[0].split('.');
                let ext = parts[parts.length - 1].toLowerCase();
                ext = ext.split('#')[0]; // Remove hash if any
                const validExt = ['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext) ? ext : 'png';
                const destPath = path.join(imgDir, "img_" + i + "." + validExt);
                try {
                    await downloadImage(rawData.images[i], destPath);
                    const webPath = "images/note_extracted/" + char.id + "/img_" + i + "." + validExt;
                    
                    if (i === 0) {
                        targetHtml = targetHtml.replace(/<img src="images\/bg-placeholder\.png"[^>]*>/, '<img src="' + webPath + '" alt="' + char.jpName + ' (' + char.enName + ')">');
                    } else {
                        imgTags += '<img src="' + webPath + '" alt="' + char.jpName + '" style="max-width:300px; display:inline-block; margin:5px;">\n';
                    }
                } catch(e) {
                    console.error("Failed to download image: " + rawData.images[i]);
                }
            }
            if (imgTags) {
                targetHtml = targetHtml.replace('<h2>結末</h2>', '<h2>ギャラリー</h2>\n<div class="gallery">\n' + imgTags + '</div>\n<h2>結末</h2>');
                if (!targetHtml.includes('<div class="gallery">')) {
                   targetHtml = targetHtml.replace('<div class="quote-box">', '<h2>ギャラリー</h2>\n<div class="gallery">\n' + imgTags + '</div>\n<div class="quote-box">');
                }
            }
        }
        
        fs.writeFileSync('f:/Fallout/' + char.id + '.html', targetHtml);
        
        const xDir = 'f:/Fallout/_X/' + char.id;
        if (!fs.existsSync(xDir)) fs.mkdirSync(xDir, { recursive: true });
        
        const xImagesDir = path.join(xDir, 'images');
        if (!fs.existsSync(xImagesDir)) fs.mkdirSync(xImagesDir, { recursive: true });
        
        if (fs.existsSync(imgDir)) {
            let files = fs.readdirSync(imgDir).filter(f => f.startsWith('img_')).slice(0, 4);
            files.forEach(f => {
                fs.copyFileSync(path.join(imgDir, f), path.join(xImagesDir, f));
            });
        }
        
        fs.writeFileSync(path.join(xDir, 'post.md'), char.post);
        console.log("Successfully processed " + char.id);
    }
})();
