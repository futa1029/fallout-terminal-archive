const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'joseph-tv-series',
        enName: 'Joseph (TV series)',
        jpName: 'ジョセフ',
        rawFile: 'joseph__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: '新カリフォルニア共和国 (NCR)' },
            { label: '役割', value: 'マキシマスの父' }
        ],
        bodyHtml: '<p>ジョセフ（Joseph）は、新カリフォルニア共和国（NCR）の市民であり、マキシマスの父親です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の回想シーン（第2話、第8話など）に登場するようです。<br>かつてのマキシマスが子供だった頃の「シェイディ・サンズ」での生活や、都市が破壊された「2283年の悲劇（Fall of Shady Sands）」に関わる形でその姿が描かれます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2の回想に登場するマキシマスの父親です。<br><br>シーズン1におけるマキシマスは、B.O.S.による救出シーンで冷蔵庫の中に隠れていたこと以外は、大戦後のシェイディ・サンズの暮らしについて深く語られることはありませんでした。シーズン2では、彼の両親に何があったのか、そして「本当は誰がシェイディ・サンズを破壊した引き金になったのか」についてのさらなる詳細が明かされそうです。</div>',
        post: '「ジョセフ」のロア記事を公開しました！🏠\nシーズン2に登場する、マキシマスの本当の父親です。かつてのNCR首都「シェイディ・サンズ」で暮らしていた時代のマキシマスのルーツや、都市が崩壊したあの悲劇の日の出来事が、シーズン2でさらに掘り下げて描かれるようです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/joseph-tv-series.html'
    },
    {
        id: 'joseph-moerder',
        enName: 'Joseph Moerder',
        jpName: 'ジョセフ・モールダー',
        rawFile: 'joseph_moerder_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: 'ジュニア・エグゼクティブ' }
        ],
        bodyHtml: '<p>ジョセフ・モールダー（Joseph Moerder）は、大戦前のVault-Tecの若手社員（ジュニア・エグゼクティブ）です。Fallout TVシリーズのシーズン1に名前が登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>バド・アスキンスのアシスタント訓練プログラム「バズ・バッズ」に参加するために選ばれたVault-Tec社員の一人でした。<br>「Vault 31」の中で冷凍睡眠（クライオ・スタシス）状態で保存されており、現在も来るべき日のために「スーパーマネージャー」として目覚めるのを待っています。<br>最終話において、ノームがVault 31を探索した際に確認できる居住者名簿にその名前が記載されています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Vault 31で冷凍保存されている「バズ・バッズ」のメンバーの一人です。<br><br>ハンク・マクレーンの同僚です。今後Vault 31の冷凍ポッドから続々と悪魔のVault-Tec社員たちが解凍される展開になると面白そうですね。</div>',
        post: 'Vault 31で冷凍保存されている社員「ジョセフ・モールダー」のロア記事を追加しました！🧊\n彼もまた、Vault-Tecの「バズ・バッズ」計画に選ばれた若手社員の一人であり、現在もポッドの中で「スーパーマネージャーとして地上を支配する日」を待ち受けています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/joseph-moerder.html'
    },
    {
        id: 'julia-tv-series',
        enName: 'Julia (TV series)',
        jpName: 'ジュリア',
        rawFile: 'julia__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: '新カリフォルニア共和国 (NCR)' },
            { label: '役割', value: 'マキシマスの母' }
        ],
        bodyHtml: '<p>ジュリア（Julia）は、新カリフォルニア共和国（NCR）の市民であり、マキシマスの母親です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の回想シーン（第2話、第8話など）に登場するようです。<br>夫のジョセフとともに「シェイディ・サンズ」で暮らしていましたが、ドラマの中で「私たち、まだ始まったばかりなのに（We were just getting started.）」という最後の言葉を遺して2283年に亡くなっています。これはおそらくハンクが引き起こした核爆発に関連する出来事と推測されます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2の回想に登場するマキシマスの亡き母親です。<br><br>核爆発の直前か直後にマキシマスをあの冷蔵庫（インディ・ジョーンズのパロディとして有名なFalloutの定番冷蔵庫）の中に匿った張本人なのかもしれません。「まだ始まったばかりなのに」というセリフは、復興しつつあったNCRの希望がVault-Tecによって無慈悲に奪われた無念さを強く感じさせます。</div>',
        post: '「ジュリア」のロア記事を公開しました！👩\nシーズン2に登場する「マキシマスの本当の母親」です。かつてシェイディ・サンズで幸せに暮らしていたようですが、2283年の崩壊事件で死亡し、「私たち、まだ始まったばかりなのに」という悲痛な最期の言葉を残しています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/julia-tv-series.html'
    },
    {
        id: 'julia-masters',
        enName: 'Julia Masters',
        jpName: 'ジュリア・マスターズ',
        rawFile: 'julia_masters_raw.json',
        category: '人物',
        appearance: 'Fallout TV / New Vegas',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'レプコン (REPCONN)' },
            { label: '役割', value: 'CFO（最高財務責任者）' }
        ],
        bodyHtml: '<p>ジュリア・マスターズ（Julia Masters）は、大戦前の巨大航空宇宙企業「レプコン（REPCONN Aerospace）」のCFO（最高財務責任者）です。<br>『Fallout: New Vegas』内のターミナルや資料にて言及されるロア上の人物でしたが、Fallout TVシリーズのシーズン1（第8話）において初めてその姿が映像化されました。</p><hr><h2>背景</h2><p>『Fallout: New Vegas』の時点では、レプコン本社のターミナルに名前が残されている人物でした（RobCoによるレプコン社買収計画の際、社長に対する不信任案の工作などを行っていたと記録されています）。</p><h2>Fallout TVシリーズ</h2><p>シーズン1の第8話において、西海岸のVault-Tec社の重役であるバーブとバド・アスキンスが主催した「アメリカにおける六大企業による秘密裏の会合（The Meeting）」に、レプコン社の代表として出席していました。<br>彼女はビッグMTのフレデリック・シンクレア、ウエスト・テックのレオン・フォン・フェルデン、ロブコ・インダストリーズのロバート・ハウスらとともに、Vault-Tecから提案された「複数のVaultを使った自由な社会実験の認可権」について議論しました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>New Vegasのターミナルに名前だけ残っていた人物が「六大企業のトップ会合」という超重要シーンでまさかの本人登場を果たすという、NVファンを熱狂させたキャラクターの一人です。<br><br>ドラマで描かれた「各企業が自分たちのイデオロギーに基づいたVaultでの実験計画を持ち寄る」という描写により、過去作の各地のVaultがいったい誰の指示であのようなイカれた実験を行っていたのかの真実が明かされました。</div>',
        post: 'レプコン社の代表「ジュリア・マスターズ」のロア記事を公開しました！🚀\n元々はゲームの『New Vegas』のターミナルのみで語られていたレプコンのCFOでしたが、ドラマの最終話における「Vault-Tecと六大企業によるVault社会実験の秘密会合」の場に本人として登場。「ゲームのロアが映像化で繋がった」最高に熱い瞬間でした！\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/julia-masters.html'
    },
    {
        id: 'kathryn-cep',
        enName: 'Kathryn Cep',
        jpName: 'キャスリン・セップ',
        rawFile: 'kathryn_cep_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: 'ジュニア・エグゼクティブ' }
        ],
        bodyHtml: '<p>キャスリン・セップ（Kathryn Cep）は、大戦前のVault-Tecの若手社員（ジュニア・エグゼクティブ）です。Fallout TVシリーズのシーズン1に名前が登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>ジョアン・ポランスキーらと同様に、バド・アスキンスのアシスタント訓練プログラム「バズ・バッズ」の一員として選ばれたVault-Tec社員です。<br>大戦後は「Vault 31」の中で冷凍睡眠（クライオ・スタシス）状態となっており、最終話においてノームが確認した居住者名簿の中にその名前が記載されていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Vault 31に眠る「バズ・バッズ」の一員です。<br><br>おそらくドラマの撮影現場にあった「Vault 31の居住者リスト」の小道具（クリップボード等）に記載されていた名前を、海外のFallout Wiki（Nukapedia）の有志が目を皿のようにして読み取ってキャラクターとしてリストアップしたものと思われます。ファンコミュニティの熱量の高さを感じますね。</div>',
        post: 'Vault 31に眠る社員「キャスリン・セップ」のロア記事を追加しました！🧊\nドラマの最終話で登場する「バズ・バッズ」のメンバーリスト（クリップボード）に名前が記載されていた、冷凍保存中のVault-Tec社員です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/kathryn-cep.html'
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
