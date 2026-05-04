const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'coronado-elder',
        enName: 'Coronado elder',
        jpName: 'コロナドのエルダー',
        rawFile: 'coronado_elder_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'B.O.S. (コロナド支部)' },
            { label: '役割', value: 'エルダー' }
        ],
        bodyHtml: '<p>コロナドのエルダー（Coronado elder）は、2296年時点におけるブラザーフッド・オブ・スティール（B.O.S.）のコロナド支部の指導者です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>背景</h2><p>彼は、サンフェルナンド支部の指導者であるエルダー・クレリック・クインタスから「連邦（Commonwealth）支部に対する内戦」の同盟者として見なされており、B.O.S.全体の覇権を西海岸へ取り戻すための会合に召集されました。</p><p>荒々しく厳格な雰囲気を持ち、他の支部の指導者に対しても攻撃的で高圧的な態度を取ります。例えば女性であるマクレー・エルダー対して女性蔑視的な発言をしたり、グランドキャニオン支部のエルダーを「ヤフー（田舎者）」と見下したりする姿が描かれています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2のB.O.S.西海岸支部同士の会合に登場する強面のエルダーです。<br><br>サンフェルナンドのクインタスと共に、東海岸（連邦）でのみ栄えている現状のB.O.S.のパワーバランスを覆そうとする西海岸勢力の重鎮の一人として描かれています。</div>',
        post: 'B.O.S.コロナド支部の指導者「コロナドのエルダー」のロア記事を公開しました！⚙️\nクインタスと共に西海岸でのB.O.S.の覇権を取り戻すべく集結した、攻撃的で荒々しい人物です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/coronado-elder.html'
    },
    {
        id: 'coronado-knight',
        enName: 'Coronado knight',
        jpName: 'コロナドのナイト',
        rawFile: 'coronado_knight_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'B.O.S. (コロナド支部)' },
            { label: '役割', value: 'ナイト' }
        ],
        bodyHtml: '<p>コロナドのナイト（Coronado knight）は、2296年におけるB.O.S.コロナド支部のナイトです。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>背景</h2><p>彼自身の個人的な歴史は不明ですが、エルダーに従ってサンフェルナンド支部の新本部（エリア51）での会合同行者としてやってきました。<br>エルダー会議において、連邦支部に対する反乱の決定を目の当たりにします。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2でコロナドのエルダーと共にエリア51にやってきたナイトです。<br><br>モブのナイトのうちの一人ですが、西海岸B.O.S.の同盟が結ばれる歴史的瞬間に立ち会いました。</div>',
        post: 'B.O.S.コロナドの騎士「コロナドのナイト」のロア記事を公開しました！⚙️\nエリア51で開催された西海岸支部同士の会合に、自身のエルダーと共に同行したナイトの一人です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/coronado-knight.html'
    },
    {
        id: 'critic',
        enName: 'Critic',
        jpName: '批評家',
        rawFile: 'critic_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '様々' },
            { label: '所属', value: 'なし' },
            { label: '役割', value: '音楽の批評家（故人）' }
        ],
        bodyHtml: '<p>批評家（Critics）は、Fallout TVシリーズに死体として登場するグループです。</p><hr><h2>背景</h2><p>これらの「批評家」と呼ばれる人々は、DJカールがKPSSラジオ局で流している「フィドル音楽（バイオリン演奏のようなカントリー・ミュージック）」を嫌っており、彼にレパートリーを変えさせるか、ラジオ局そのものを沈黙させようとした人々です。<br>カールは彼らの抗議（襲撃）を防ぐため、ラジオ局の周辺に無数のブービートラップを仕掛けました。<br>その結果、ラジオ局の周囲にはこのトラップにかかって死んだ「批評家」たちの死体が散乱することになりました。</p><p>本編では、マキシマスとルーシーがやってきた際、マキシマスがいかさま師から奪った生首の代わりに、このトラップで死んでいた批評家の一人の首を切り落として身代わりとして持ち去りました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>「自分好みの音楽を流さないラジオ局に文句を言いに来て、返り討ち（トラップ）に遭って死んだウェイストランダーたち」というFalloutらしい不条理コメディの犠牲者たちです。<br><br>サディアスがトラップだらけの惨状を見て「世の中には親切にできない連中が多いからな」と同情していましたが、そもそもラジオの選曲で殺し合いになるのが狂っていますね。</div>',
        post: 'ラジオの選曲に文句を言いに来て死んだ人々「批評家」のロア記事を公開しました！📻\nDJカールの流すフィドル音楽が気に入らないという理由でラジオ局を襲撃し、ブービートラップの餌食になったウェイストランダーたちです。マキシマスに生首を利用されました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/critic.html'
    },
    {
        id: 'dan-tv-series',
        enName: 'Dan (TV series)',
        jpName: 'ダン',
        rawFile: 'dan__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'なし' },
            { label: '役割', value: '一般人' }
        ],
        bodyHtml: '<p>ダン（Dan）は、Fallout TVシリーズのシーズン2に登場する人物です。</p><hr><h2>背景</h2><p>最終戦争前のロサンゼルスのバーにおいて、友人であるビル（Bill）やジム（Jim）と共に飲んでいる様子が描かれます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2の戦前ロサンゼルスのバーに登場する人物です。<br><br>クーパーや他のVault-Tec関係者などとどのような関わりを持つのかは本編での描写が待たれます。</div>',
        post: '戦前ロサンゼルスのバーに登場する人物「ダン」のロア記事を公開しました！🍸\nシーズン2における大戦前の描写に含まれるキャラクターです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/dan-tv-series.html'
    },
    {
        id: 'dane-tv-series',
        enName: 'Dane (TV series)',
        jpName: 'デイン',
        rawFile: 'dane__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: 'ノンバイナリー' },
            { label: '所属', value: 'B.O.S. (サンフェルナンド支部)' },
            { label: '役割', value: 'スクライブ / アスピラント（元）' }
        ],
        bodyHtml: '<p>デイン（Dane）は、2296年におけるB.O.S.サンフェルナンド支部のメンバーです。</p><hr><h2>背景</h2><p>デインはB.O.S.で生まれ育った人間ではなく、ウェイストランドから入隊してきた人物です。候補生（アスピラント）としては優秀であり、マキシマスの親友でもあります。<br>タイタスと同世代の候補生の中では最初にスクワイア（従者）に昇格する名誉を受けましたが、これによってウェイストランドの荒野（Wilds）の過酷な最前線へ派遣されることとなりました。</p><p>荒野に出ることを極度に恐れたデインは、ブーツの中にカミソリの刃（あるいは同様の鋭利なもの）を隠し、自ら足を負傷させるという自作自演の妨害行為を行います。<br>しかしこの一件が原因で、親友であるマキシマスに「デインを妬んで刃物を仕込んだ」という容疑が掛けられ、彼が激しい尋問を受けることになってしまいました。<br>デイン自身はその後、怪我によってスクワイアを解任されましたが、代わりにエルダー・クレリック・クインタス直属のスクライブ（記録手）として任務に就くことになります。</p><p>最終話において、マキシマスと共にグリフィス天文台への総攻撃へ参加した際、タイタスナイト殺害の嫌疑で処刑されそうだったマキシマスを助けるため、自ら足を切った事実をマキシマスに告白して謝罪しました。<br>その後、モルデイヴァーが死んでマキシマスが唯一の生存者として発見された際、一刻も早く事態を収束させる為に彼がモルデイヴァーを討ち取ったと誇張して周囲に喧伝し、彼が「ナイト・マキシマス」として英雄扱いされるきっかけを作りました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>マキシマスの親友のB.O.S.メンバーです。Falloutシリーズにおいて実写映像媒体で最初となるノンバイナリー（明確なジェンダー枠組みに当てはまらない、もしくは両方の自認を持つ）のキャラクターです。<br><br>「ウェイストランドが恐ろしくて思わず自傷行為をしてしまった」という弱い一面と、終盤でマキシマスを救うための機転を利かせる一面を持つ人間らしいキャラクターで、マキシマスとはある種の共犯関係にあります。</div>',
        post: 'マキシマスの親友のB.O.S.メンバー「デイン」のロア記事を公開しました！⚙️\nウェイストランドへ派遣されることを恐れて足を自傷した張本人ですが、最後には機転を利かせてマキシマスを英雄「ナイト」へと押し上げました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/dane-tv-series.html'
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
        
        let infoStr = '<div class="infobox-row"><span class="infobox-label">カテゴリ</span><span>' + char.category + '</span></div>\n';
        for (let i of char.info) {
            infoStr += '            <div class="infobox-row"><span class="infobox-label">' + i.label + '</span><span' + (i.value.length > 5 ? ' style="text-align:right"' : '') + '>' + i.value + '</span></div>\n';
        }
        infoStr += '            <div class="infobox-row" style="margin-top:5px;"><span class="infobox-label">登場</span><span>' + char.appearance + '</span></div>';
        
        targetHtml = targetHtml.replace(/<span class="infobox-label">カテゴリ<\/span><span>人物<\/span><\/div>\s*<div class="infobox-row"><span class="infobox-label">人種<\/span><span>人間<\/span><\/div>\s*<div class="infobox-row"><span class="infobox-label">性別<\/span><span>女<\/span><\/div>[\s\S]*?<div class="infobox-row" style="margin-top:5px;"><span class="infobox-label">登場<\/span><span>Fallout TV<\/span><\/div>/, infoStr);

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
                const ext = parts[parts.length - 1].toLowerCase() || 'png';
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
