const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'george-yaffe',
        enName: 'George Yaffe',
        jpName: 'ジョージ・ヤッファ',
        rawFile: 'george_yaffe_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 33 / Vault-Tec' },
            { label: '役割', value: '監督官 / 撮影スタッフ' }
        ],
        bodyHtml: '<p>ジョージ・ヤッファ（George Yaffe）は、大戦前のVault-Tec社員であり、のちにVault 33の監督官を務めた人物です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>背景</h2><p>かつては大戦前のハリウッド周辺で働いていたVault-Tecの「バズ・バッズ」計画の一員です。<br>ハリウッドのスタジオにおいて、大スターであるクーパー・ハワードがVault-Tecの宣伝用コマーシャル（親指を立てるVaultボーイのポーズ）を撮影した際、現場に立ち会っていた社員の一人でした。<br>クーパーが青いジャンプスーツを着て「これは放射線を防ぐのか？」と尋ねた際、ジョージとサラはためらってから「防ぐ」と嘘をつきました。</p><h2>Fallout TVシリーズ</h2><p>大戦後、彼はバド・アスキンスの計画通り「Vault 31」で冷凍保存されて生き残り、定期的な解凍サイクルの一環としてVault 33へと送られました。<br>彼は2121年から2125年までの間、エヴァ・ウェストの後任としてVault 33の「監督官（Overseer）」を務めていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>第3話における大戦前の回想シーンでクーパーの撮影に立ち会っていたVault-Tecの若手社員の一人です。<br><br>実は彼もハンクたちと同様に「Vault 31」の冷凍睡眠組であり、かつてVault 33でハンクの前に監督官を務めていた人物であることが明かされています。</div>',
        post: 'Vault 33のかつての監督官「ジョージ・ヤッファ」のロア記事を公開しました！🎬\n大戦前の回想において、クーパーのCM撮影に立ち会っていたVault-Tecの社員です。ハンクたち「バズ・バッズ」の一員であり、大戦後はVault 31で冷凍保存され、のちにVault 33の監督官（2121年〜2125年）を務めていた人物です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/george-yaffe.html'
    },
    {
        id: 'the-ghoul',
        enName: 'The Ghoul (Cooper Howard)',
        jpName: 'グール（クーパー・ハワード）',
        rawFile: 'the_ghoul_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: 'グール（元・人間）' },
            { label: '性別', value: '男' },
            { label: '所属', value: '無所属（バウンティハンター）' },
            { label: '役割', value: '主人公 / ガンスリンガー' }
        ],
        bodyHtml: '<p>グール（The Ghoul）こと「クーパー・ハワード」は、Fallout TVシリーズにおける主要な主人公の一人です。<br>戦前のハリウッドの大スターであり、大戦後は200年以上を生き抜く冷酷なバウンティハンターとしてウェイストランドにその名を轟かせています。</p><hr><h2>背景</h2><p>大戦前のクーパー・ハワードは、元・アメリカ海兵隊員であり、アンカレッジの戦いを生き延びた退役軍人でした。<br>その後はハリウッドの西部劇スターとして輝かしいキャリアを築き、Vault-Tec社の重役である妻「バーブ・ハワード」と娘「ジェイニー」と共に充実した生活を送っていましたが、妻の真の計画（世界を自らの手で核の炎で焼く計画）を知ってしまったことで全てを失い、慰謝料を稼ぐために誕生日パーティーの余興で投げ縄を披露するような生活に転落していました。<br>2077年10月23日、頭上に核ミサイルが降り注いだあの日から、彼は放射能の力で「グール化」し、果てしない絶望と荒野の中でのサバイバルを余儀なくされました。</p><h2>Fallout TVシリーズ</h2><p>2296年時点において、彼は「グール」としてウェイストランドの伝説的な賞金稼ぎ（バウンティハンター）となっていました。<br>長年の被曝により鼻が削げ落ちた恐ろしい外見と、倫理観の欠如、そして百発百中の圧倒的な射撃スキルを持つ彼は、Vaultから出てきたばかりのルーシーを「無力な獲物（おとり）」として扱い、様々な非道な行動を取ります。<br>しかし、ルーシーの行動や言葉の節々に「かつての自分が失った人間性」の残滓を垣間見た彼は、徐々に彼女との間に奇妙な絆（あるいは目的の共有）を築いていくことになります。<br>彼の究極的な目的は、自分から奪われた家族（バーブとジェイニー）の行方と、「ゲームを操る黒幕」を探し出して真実を突き止めることです。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ドラマ版Falloutにおける絶対的な「もう一人の主人公」であり、ファンから絶大な人気を集めているキャラクターです。（演じるのは名優ウォルトン・ゴギンズ）<br><br>シリーズのアイコンとも言える「Vaultボーイ」のサムズアップ（親指を立てるポーズ）の元ネタが実は彼であり、さらにVault-Tec特有の狂気的な設定が見事に落とし込まれた大スターです。彼のガンアクションや冷酷さは、まさにFalloutにおける「Evil（悪）カルマプレイ」の象徴とも言えます。</div>',
        post: 'ドラマ版のもう一人の主人公「グール（クーパー・ハワード）」のロア記事を公開しました！🔫\n大戦前はVaultボーイのモデルにもなったハリウッドの大スターでしたが、核戦争後は200年間を生き抜く冷酷無比な賞金稼ぎとして荒野を彷徨う存在です。<br>圧倒的な演技と存在感で本作の顔とも言える人物です！\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/the-ghoul.html'
    },
    {
        id: 'gnatius',
        enName: 'Gnatius',
        jpName: 'ナイト・グナティウス',
        rawFile: 'gnatius_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'B.O.S. (サンフェルナンド支部)' },
            { label: '役割', value: 'ナイト' }
        ],
        bodyHtml: '<p>ナイト・グナティウス（Knight Gnatius）は、ブラザーフッド・オブ・スティール（B.O.S.）のメンバーです。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の第2話「The Golden Rule」に登場します。<br>B.O.S.の重要な会議が行われている最中、後ろで「プラズマグレネード」をいじって遊んでおり、マキシマスにそれを取り上げられて「すいません」と謝まるという抜けた一面を見せるナイトです。</p><p>後のエピソード「The Demon in the Snow」において、彼はマキシマスと（偽のハークネスとなった）タデウスを「サンセット・サルサパリラ工場」から回収する任務に派遣されます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2に登場する、「サンフェルナンドのナイトたち」支部所属のポンコツなナイトです。<br><br>会議中にプラズマグレネードで遊んでいるという異常行動は、B.O.S.の規律が崩壊している（あるいは頭の悪い人間しか残っていない）というドラマ特有のブラックユーモアの表れですね。</div>',
        post: 'シーズン2のB.O.S.メンバー「ナイト・グナティウス」のロア記事を公開しました！💣\n「サンフェルナンドのナイトたち」という組織でありながら、重要な会議の最中にプラズマグレネードで遊んでマキシマスに怒られるという抜け作であり、B.O.S.の「規律の緩さ」をよく表しているポンコツな兵士です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/gnatius.html'
    },
    {
        id: 'grand-canyon-elder',
        enName: 'Grand Canyon elder',
        jpName: 'グランドキャニオンのエルダー',
        rawFile: 'grand_canyon_elder_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'B.O.S. (グランドキャニオン支部)' },
            { label: '役割', value: 'エルダー' }
        ],
        bodyHtml: '<p>グランドキャニオンのエルダー（Grand Canyon elder）は、ブラザーフッド・オブ・スティール（B.O.S.）における「グランドキャニオン支部」を率いる指導者です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>背景</h2><p>2296年時点において、組織の全体構造の下にありながらも高度な自治権を享受している地域支部「グランドキャニオン・ブラザーフッド」の長です。<br>彼は厳しい経験を積んだシニカルな外見をしており、額の顔面にはアリゾナ州の車のナンバープレート（「GRAND CANYON STATE」と刻印されている）が頭蓋骨のプレートとして埋め込まれているという、極めて異様でウェイストランドらしい改造手術の痕があります。</p><h2>Fallout TVシリーズ</h2><p>シーズン2の第2話「The Golden Rule」において、シニア・クレリックのクィンタスに招かれ、ヨセミテ支部およびコロナド支部の戦略家たちとの極秘会議に出席します。<br>この会議の目的は、B.O.S.全体を支配している東海岸の「最高司令部」に対する同盟と反乱の可能性を議論することでした。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>なんとシーズン2では「顔面にアリゾナ州の車のナンバープレートを埋め込んだB.O.S.のエルダー」という最強に狂ったデザインのキャラクターが登場します！<br><br>グランドキャニオンと言えば、シーザー・リージョンとの対立の激戦区にあたる地域です。そこで生き残ってきたエルダーとなれば、あのマクソンすら凌駕するほどの過酷な経験をしているに違いありません。最高司令部（東海岸）への反乱を企てるという展開も熱いです！</div>',
        post: '「グランドキャニオンのエルダー」のロア記事を公開しました！🦅\nシーズン2に登場するB.O.S.支部の指導者ですが、なんと「顔面の頭蓋骨としてアリゾナ州の車のナンバープレートを埋め込んでいる」というとんでもないビジュアルをしている重要人物です！\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/grand-canyon-elder.html'
    },
    {
        id: 'gregory-tv-series',
        enName: 'Gregory (TV series)',
        jpName: 'グレゴリー',
        rawFile: 'gregory__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'ハンク・マクレーン' },
            { label: '役割', value: 'マインドコントロールされた奴隷' }
        ],
        bodyHtml: '<p>グレゴリー（Gregory）は、かつて部族民（Tribal）であった人物であり、現在は心ならずもハンク・マクレーンの奴隷となっている男です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の第6話「The Other Player」に登場します。<br>詳細は不明ですが、「ラスベガス管理Vault（Las Vegas management Vault）」において、ハンク・マクレーンのためにマインドコントロール（洗脳）された状態で働かされている奴隷のようです。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2の終盤に登場する、「ラスベガス管理Vault」における洗脳された奴隷です。<br><br>シーズン1のラストでニューベガスへ向かったハンクですが、シーズン2では部族民をマインドコントロールして彼自身の奴隷（あるいは手駒）として使役しているという、底知れない非道さ（本来のVault-Tecの恐ろしさ）が描かれるようです。</div>',
        post: '「グレゴリー」のロア記事を公開しました！😵\nシーズン2の「ラスベガス管理Vault」に登場する人物であり、なんとVault-Tecの技術によってマインドコントロール（洗脳）されてしまい、ハンク・マクレーンの絶対的な奴隷として使役されている部族民です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/gregory-tv-series.html'
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
