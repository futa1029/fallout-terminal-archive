const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'legion-senior-advisor',
        enName: 'Legion senior advisor',
        jpName: 'リージョン上級顧問',
        rawFile: 'legion_senior_advisor_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'シーザー・リージョン' },
            { label: '役割', value: '上級顧問' }
        ],
        bodyHtml: '<p>リージョン上級顧問（Legion senior advisor）は、シーザー・リージョンにおける高位の人物です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Profligate」などに登場し、「新たなシーザー」を自称するラセルタ軍団長の傍仕え（あるいは組織の中核メンバー）として行動するようです。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2から登場するシーザー・リージョンの高位キャラクターです。<br><br>ラセルタ軍団長のお目付け役か、あるいは参謀のような存在と思われます。</div>',
        post: '「リージョン上級顧問」のロア記事を公開しました！🔥\nシーズン2から新たに姿を見せる、モハビのシーザー・リージョン（あるいはその後継組織）の要人です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/legion-senior-advisor.html'
    },
    {
        id: 'legionary-tv-series',
        enName: 'Legionary (TV series)',
        jpName: 'リージョナリー',
        rawFile: 'legionary__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'シーザー・リージョン' },
            { label: '役割', value: '兵士' }
        ],
        bodyHtml: '<p>リージョナリー（Legionary）あるいは軍団兵たちは、モハビ・ウェイストランドの派閥「シーザー・リージョン」の一般的な兵士たちです。Fallout TVシリーズのシーズン2において「2296年の現在」の彼らの姿が描かれます。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の様々なエピソードに登場し、ラセルタ軍団長の指揮下で活動する姿などが確認できます。<br>「The Other Player」のエピソードでは、ルーシーがラスベガスの「管理Vault（management Vault）」で二人のリージョナリーと遭遇しますが、彼らは「脳内コンピュータ・インターフェース・チップ」を埋め込まれているため友好的に振る舞うという、不気味なシーンが存在するようです。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>あの「リージョン兵」たちがついに実写映像化されます！<br><br>しかも、シーズン2のあらすじを見る限り、一部の兵士の脳にサイボーグ技術のような制御チップが埋め込まれているという記述もあり、『New Vegas』の時代よりもさらに歪な組織へと変貌（あるいは別の勢力に利用）されている可能性が示唆されています。</div>',
        post: 'シーザー・リージョンの兵士「リージョナリー」のロア記事を追加しました！🔥\n『New Vegas』でおなじみのアメフト防具を着た狂気の軍団兵たちがシーズン2で実写化！さらに一部の兵士は脳に制御用チップを埋め込まれているという不気味な設定も判明しつつあります。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/legionary-tv-series.html'
    },
    {
        id: 'leon-von-felden',
        enName: 'Leon Von Felden',
        jpName: 'レオン・フォン・フェルデン',
        rawFile: 'leon_von_felden_raw.json',
        category: '人物',
        appearance: 'Fallout TV / 過去作',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'ウエスト・テック (West Tek) / 米軍' },
            { label: '役割', value: '研究部門トップ' }
        ],
        bodyHtml: '<p>レオン・フォン・フェルデン（Leon Von Felden）は、大戦前のアメリカにおける軍需巨大企業「ウエスト・テック（West Tek）」の代表であり、米軍のウイルス兵器開発プロジェクトのトップを務めていた人物です。<br>初代『Fallout』や『Fallout 3』での記録情報として長年語り継がれてきたロア上の人物でしたが、Fallout TVシリーズのシーズン1（第8話）において初めてその姿が映像化されました。</p><hr><h2>背景</h2><p>初代『Fallout』の頃から記録に残されている「F.E.V.（強制進化ウイルス）」の研究責任者です。<br>ウエスト・テック研究施設（後の「グロウ」）から始まり、後には「マリポーサ軍事基地」での非道な人体実験をも主導し、大戦後にウェイストランドを徘徊することになるスーパーミュータントという怪物たちを（間接的に）生み出した張本人とも言えるマッドサイエンティストです。<br>ゲーム本編の記録によれば、2077年の10月23日（最終戦争の日）に死亡したとされています。</p><h2>Fallout TVシリーズ</h2><p>シーズン1の第8話において、西海岸のVault-Tec社の重役であるバーブとバド・アスキンスが主催した「アメリカにおける六大企業による秘密裏の会合（The Meeting）」に、ウエスト・テック社の代表として出席していました。<br>各企業がVaultで行うイカれた社会実験案を出し合う中、彼は「Vaultを出る時のために、（住民を）超自然環境に適応させるミュータント（突然変異株）にすること」を提案しており、文字通りこれが各VaultでのF.E.V.変異実験（Vault 87のスーパーミュータント化実験など）に繋がっていたことが明らかになりました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>なんとあの初代『Fallout』に記録が残る「F.E.V.の開発責任者（スーパーミュータントの生みの親）」が、ドラマで本人として登場を果たしました！<br><br>ドラマの最終話で描かれた「六大企業のトップ会合」は、過去作の歴史の隙間を見事に埋める最高の映像化でした。彼が提案した「居住者をミュータント化するVault」が、まさしく『Fallout 3』のVault 87（東海岸のスーパーミュータントの発生源）であったことが映像で語られた瞬間です。</div>',
        post: 'ウエスト・テック社の代表「レオン・フォン・フェルデン」のロア記事を公開しました！🧪\n初代『Fallout』の頃から記録が残る「スーパーミュータントの生みの親（F.E.V.開発責任者）」です。ドラマ最終話の「六大企業の秘密会合」にウエスト・テックの代表として登場し、『Fallout 3』のVault 87で行われたミュータント実験の計画を嬉々として提案する姿が描かれました！\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/leon-von-felden.html'
    },
    {
        id: 'lloyd-hawthorne',
        enName: 'Lloyd Hawthorne',
        jpName: 'ロイド・ホーソーン',
        rawFile: 'lloyd_hawthorne_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 4 / Vault-Tec' },
            { label: '役割', value: '初代監督官 / 遺伝子研究者' }
        ],
        bodyHtml: '<p>ロイド・ホーソーン（Lloyd Hawthorne）は、Vault-Tecの「ホーソーン医学研究所」のトップであり、Vault 4の初代監督官です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>背景</h2><p>彼は大戦前から人間のDNAに関する遺伝子研究を専門としていたVault-Tecの科学者でした。<br>彼は妻の「カサンドラ」や「80人の被験者（一般人含む）」と共に、大戦前からVault 4で実験を行うためのテスト運用に参加していました。そして大戦後、Vault 4は外界から完全に閉ざされ、彼は監督官として「人間と放射線耐性をもつ動物を掛け合わせる」という残虐な人体実験を行い続けました。この実験によって「ガルパー（Vault 4の人間ベースの個体）」などの化け物が生み出されることになります。</p><h2>Fallout TVシリーズ</h2><p>第1話などの回想（大戦前のパーティー会場）に夫婦で登場しているほか、第6話「The Trap」でその凶行の全貌がホロテープを通じて明かされます。<br>ルーシーたちがVault 4の最下層（第12階層）に潜入した際、かつて彼が残忍な人体実験を指揮していたホロテープ映像を発見しました。<br><br>その後、実験体にされていた被験者たちによる反乱が起き、彼はカサンドラ共々惨殺されたことがターミナルや録画媒体に記録されています。現在のVault 4の住人たちは、この反乱を起こした被験者（または研究所の一般生活者）であったミュータントの子孫たちです。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Vault 4という「狂った科学者が地上の人間に追放（あるいは処刑）された珍しいVault」の元凶となったマッドサイエンティストです。<br><br>ドラマ内で登場する「指の生えたガルパー」は、彼が行っていた人体実験の成れの果てだったわけですね。彼らの行動はまさにロブコやウエスト・テックが行ってきた数々の非道な実験と同様に、Fallout世界における「戦後の科学者のおぞましさ」を象徴しています。</div>',
        post: 'Vault 4の初代監督官「ロイド・ホーソーン」のロア記事を公開しました！🧬\n自らを神と勘違いし、Vault 4の地下で「人間と生き物を掛け合わせる」という狂気の人体実験を繰り返してドラマ版ガルパーを生み出したマッドサイエンティストです。やがて被験者たちの反乱に遭い、凄惨な最期を遂げました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/lloyd-hawthorne.html'
    },
    {
        id: 'lois',
        enName: 'Lois',
        jpName: 'ロイス',
        rawFile: 'lois_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'サンセット・サルサパリラ工場' },
            { label: '役割', value: '不明（子供）' }
        ],
        bodyHtml: '<p>ロイス（Lois）は、Fallout TVシリーズのシーズン2に登場する子供です。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Profligate」などに登場し、モハビ・ウェイストランドの「サンセット・サルサパリラ工場（Sunset Sarsaparilla factory）」に関連するシーンで登場するようです。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2で新たにモハビを彩る子供キャラクターの一人です。<br><br>サンセット・サルサパリラの瓶詰め工場といえば、『New Vegas』においては「フェストゥス（ロボット）」が管理し、特別なスターキャップを集めさせる過酷なチャレンジの舞台でもありましたが、ドラマ版では誰かの拠点として使われているようですね。</div>',
        post: 'シーズン2のキャラクター「ロイス」のロア記事を公開しました！🌟\nモハビ・ウェイストランドの「サンセット・サルサパリラ工場」に関連して登場する子供のようです。『New Vegas』のプレイヤーには思い出深いあのスターキャップの工場が、2296年にはどうなっているのか楽しみですね！\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/lois.html'
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
