const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'marianne-tv-series',
        enName: 'Marianne (TV series)',
        jpName: 'マリアン',
        rawFile: 'marianne__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault 33' },
            { label: '役割', value: '居住者（学者）' }
        ],
        bodyHtml: '<p>マリアン（Marianne）は、Vault 33に住む居住者であり、学者です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>捕らえられたVault 32のレイダーたちに食事を配るシーンや、彼らをどう処遇するかを話し合う住民会議のシーンに登場します。<br>彼女は、Vault 32のレイダーたちにシェイクスピアを教えようという提案に対し「彼らにはまだ早すぎるため、カントやミルのような少し道徳的な枠組みから始めるべきだ」と、Vault居住者特有のズレた（しかしまじめな）意見を述べていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>外界のレイダーたちに対しても「時間をかけて教育すれば更生できる」と本気で信じているVault 33の善良な（世間知らずな）住民の一人です。<br><br>こうした住民たちのズレた会議の様子を見たノームは呆れていました。</div>',
        post: 'Vault 33の学者「マリアン」のロア記事を公開しました！📚\n捕らえられた極悪レイダーたちに対して「カントやミルの道徳論から教えるべき」と大真面目に議論する、Vault 33の善良で世間知らずな住民の一人です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/marianne-tv-series.html'
    },
    {
        id: 'marjorie-tv-series',
        enName: 'Marjorie (TV series)',
        jpName: 'マージョリー',
        rawFile: 'marjorie__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'ハンク・マクレーン' },
            { label: '役割', value: 'マインドコントロールされた奴隷' }
        ],
        bodyHtml: '<p>マージョリー（Marjorie）は、Fallout TVシリーズのシーズン2に登場する人物です。<br>かつては殺人鬼でしたが、現在はハンク・マクレーンによって「マインドコントロール・チップ」を埋め込まれ、従順な奴隷にされています。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Other Player」などのエピソードに登場します。<br>ニューベガスに逃げ込んだハンク・マクレーンの指揮下で、脳機能インターフェースを通じて意志を奪われた作業員（あるいは兵士）として利用されているようです。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2におけるハンクの恐ろしい所業の一端を示すキャラクターです。<br><br>殺人鬼でさえも後頭部にチップを埋め込んで笑顔の奴隷にしてしまうという、Big MTのロボトミーや奴隷用爆破首輪とはまた違った嫌なサイボーグ技術をハンク（あるいはVault-Tec / エンクレイヴ）が用いていることがわかります。</div>',
        post: 'シーズン2のキャラクター「マージョリー」のロア記事を公開しました！🧠\n元々は殺人鬼でしたが、現在はハンク・マクレーンの手によって脳にチップを埋め込まれ、マインドコントロールされた従順な奴隷にされています。シーズン2のニューベガスで待ち受ける恐ろしい展開が垣間見えますね。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/marjorie-tv-series.html'
    },
    {
        id: 'massive-legionary',
        enName: 'Massive legionary',
        jpName: '大柄なリージョナリー',
        rawFile: 'massive_legionary_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'ハンク・マクレーン / リージョン' },
            { label: '役割', value: '洗脳された奴隷' }
        ],
        bodyHtml: '<p>大柄なリージョナリー（Massive legionary）は、モハビのシーザー・リージョンに所属していた巨大な体躯の兵士です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Other Player」などのエピソードにおいて、ニューベガス（あるいは管理Vault）でハンク・マクレーンによって捕らえられ、脳内コンピュータ・チップを埋め込まれた状態で登場します。<br><br>NCRの残党であるレンジャー・ビフと激しい争い（シーザー・リージョンの典型的な敵対関係）を繰り広げていましたが、ハンクのコントロール下にあるためか、ルーシーが介入してチップを起動（あるいは再設定）させたことで、彼らの殺意は強制的にシャットダウンされ、ハンクの「親切で従順なオフィス・ワーカー（奴隷）」にされてしまうという恐ろしい顛末が描かれます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>あの凶暴なシーザー・リージョンの兵士でさえも、Vault-Tec（ハンク）のサイボーグ技術の前ではただの笑顔の奴隷にされてしまうという、シーズン2のテーマを象徴するキャラクターです。<br><br>ハンクはルーシーに対し「モハビを支配するリージョンの侵略を止めるには、彼らを洗脳してしまう私のこの技術だけが解決策だ」と説得を試みるようです。Vault-Tecが本気を出した際の恐ろしさが痛いほど伝わってきます。</div>',
        post: '「大柄なリージョナリー」のロア記事を公開しました！🧠\nシーズン2で登場するシーザー・リージョンの兵士ですが、あろうことかハンク・マクレーンの手によって脳にチップを埋め込まれ、強引に「笑顔で従順なオフィスワーカー」としてマインドコントロールされてしまいます。Vault-Tecの恐ろしすぎる技術力が垣間見えるキャラクターです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/massive-legionary.html'
    },
    {
        id: 'maximillian-dottino',
        enName: 'Maximillian Dottino',
        jpName: 'マクシミリアン・ドッティーノ',
        rawFile: 'maximillian_dottino_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: 'ジュニア・エグゼクティブ' }
        ],
        bodyHtml: '<p>マクシミリアン・ドッティーノ（Maximillian Dottino）は、大戦前のVault-Tecの若手社員（ジュニア・エグゼクティブ）です。Fallout TVシリーズのシーズン1に名前が登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>バド・アスキンスの訓練プログラム「バズ・バッズ」のメンバーとして、大戦後は「Vault 31」の中に冷凍睡眠（クライオ・スタシス）状態で保存されています。<br>ノームが確認した居住者名簿にその名前が記載されていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Vault 31で待機中の「バズ・バッズ」のメンバーの一人です。<br><br>いつの日かVault 32か33で「スーパーマネージャー（監督官）」として解凍されるのを待っています。</div>',
        post: 'Vault 31に眠る社員「マクシミリアン・ドッティーノ」のロア記事を追加しました！🧊\nドラマの最終話で名簿上で確認できる、冷凍ポッド内で眠り続けるVault-Tecの「バズ・バッズ」メンバーの一人です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/maximillian-dottino.html'
    },
    {
        id: 'maximus',
        enName: 'Maximus',
        jpName: 'マキシマス',
        rawFile: 'maximus_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'ブラザーフッド・オブ・スティール (B.O.S.) / (元NCR)' },
            { label: '役割', value: 'ナイト（主人公）' },
            { label: 'SPECIAL', value: '7,6,6,5,4,7,5' }
        ],
        bodyHtml: '<p>マキシマス（Maximus）は、Fallout TVシリーズの主人公の一人であり、西海岸の「ブラザーフッド・オブ・スティール（B.O.S.）」のサンフェルナンド支部に所属する若き兵士です。<br>B.O.S.の狂信的な教義と自分自身の良心の間で葛藤を抱えながら、ウェイストランドで生き抜く術を模索しています。</p><hr><h2>背景</h2><p>彼は大戦後（2277年頃）に生まれ、幼少期を新カリフォルニア共和国（NCR）の首都であった「シェイディ・サンズ」で過ごしました。しかし、彼が子供のころ（2280年代）に何者かによってシェイディ・サンズは核攻撃を受け、完全に消滅してしまいます。<br>核攻撃の廃墟の中で、偶然現れたB.O.S.の「T-60パワーアーマー」の姿に救われた（あるいは感銘を受けた）彼は、彼らのように強くなり、弱い者を救う「輝く鎧の騎士」になることを夢見てB.O.S.の志願兵（アスピラント）となりました。</p><h2>Fallout TVシリーズ</h2><p>2296年、彼はナイト・タイタスの従者（スクワイア）として地上へ派遣されます。しかし、真の「騎士」としての高潔な理想とは裏腹に、傲慢で卑怯なタイタスの本性を目の当たりにし、彼を見殺しにすることで自らがナイト・タイタスのアーマーを奪い、「騎士」になりすますという大きな罪を犯します。<br><br>その後、Vault 33から出てきたばかりのルーシーと出会い、彼自身もまた彼女の「黄金律」に触れることで、次第に自身の行動やB.O.S.の在り方に疑問を抱くようになります。二人はエンクレイヴから逃亡した博士（シギ）の首を巡って協力し合い、深い絆で結ばれていきます。<br><br>シーズン1の終盤、グリフィス天文台でのNCR残党とB.O.S.の決戦において、彼はリー・モルデイヴァーの最期を看取ることになります。そこで彼は、自身の故郷を滅ぼした核攻撃の真犯人が「ルーシーの父親であるハンク・マクレーン」であったという残酷な事実を知ります。モルデイヴァーの遺体の傍らに一人で立っていた彼は、駆けつけたB.O.S.の同胞たちから「リー・モルデイヴァーを討ち取った英雄（ナイト・マキシマス）」として祭り上げられるという皮肉な結末を迎えました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ルーシーが「究極の善人プレイ」であるならば、マキシマスは「生存のために手段を選ばないが、少しだけ良心が咎める、いかにもFalloutのプレイヤーらしい選択肢をとる人間」として描かれています。<br><br>B.O.S.の教義に染まりきれない自分に悩みつつも、圧倒的なパワーアーマーの力に魅了され、嘘を重ねながら生き延びていく彼の人間臭さは非常に魅力的です。（※アーロン・モーテン演）</div>',
        post: 'ドラマ版のもう一人の主人公「マキシマス」のロア記事を公開しました！🛡️\nB.O.S.の騎士に憧れる志願兵でありつつも、生き残るために嘘をつき、時には良心を裏切る「いかにもFalloutのプレイヤーらしい」行動の数々をとる非常に人間らしいキャラクターです。故郷シェイディ・サンズの真実を知った彼が今後どうなるのか、シーズン2から目が離せません！\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/maximus.html'
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
