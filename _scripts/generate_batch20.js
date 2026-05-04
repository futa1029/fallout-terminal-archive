const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'freeside-gambler',
        enName: 'Freeside gambler',
        jpName: 'フリーサイドのギャンブラー',
        rawFile: 'freeside_gambler_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'フリーサイド' },
            { label: '役割', value: 'ギャンブラー' }
        ],
        bodyHtml: '<p>フリーサイドのギャンブラー（Freeside gambler）は、ニューベガスの外周街「フリーサイド」にいる客の一人です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の第8話「The Strip」に登場します。<br>フリーサイドの路上、あるいはカジノなどでキャップ（通貨）を賭けてギャンブルを行っている客の一人です。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2のフィナーレに登場する、フリーサイド側のギャンブラーです。<br><br>キャップを使って賭けをしているということは、やはりアトミック・ラングラーのようなスラム側のカジノ施設の客である可能性が高そうです。</div>',
        post: '「フリーサイドのギャンブラー」のロア記事を公開しました！🎲\nシーズン2におけるフィナーレに登場するフリーサイドの客です。スラムの路上もしくはカジノでキャップを賭けて遊んでいる姿が描かれるようです！\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/freeside-gambler.html'
    },
    {
        id: 'freeside-showgirl',
        enName: 'Freeside showgirl',
        jpName: 'フリーサイドのショーガール',
        rawFile: 'freeside_showgirl_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'フリーサイド' },
            { label: '役割', value: 'エンターテイナー' }
        ],
        bodyHtml: '<p>フリーサイドのショーガール（Freeside showgirls）は、フリーサイドで働くエンターテイナーの女性たちです。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の第5話から第8話にかけて、フリーサイドの様々な場面で背景に姿を見せます。<br>ストリップ地区の高級ショーガールとは異なり、スラム街であるフリーサイドで働く彼女たちは、カジノや酒場などの娯楽施設（恐らくアトミック・ラングラーなど）で客を楽しませるダンサーや客引きとしての役割を担っていると思われます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2のフリーサイド編で様々なエピソードに登場するショーガールたちです。<br><br>高級なストリップ地区のショーガールとの「格差」がどのように描かれるのか気になるところですね。</div>',
        post: '「フリーサイドのショーガール」のロア記事を公開しました！👯‍♀️\nシーズン2のフリーサイドにある酒場やカジノで働くエンターテイナーの女性たちです。ストリップ地区とは違って治安の悪いスラム街で働く彼女たちがどう描かれるのか楽しみです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/freeside-showgirl.html'
    },
    {
        id: 'freesider',
        enName: 'Freesider',
        jpName: 'フリーサイドの住人',
        rawFile: 'freesider_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間 / グール' },
            { label: '性別', value: '様々' },
            { label: '所属', value: 'フリーサイド' },
            { label: '役割', value: '地元民' }
        ],
        bodyHtml: '<p>フリーサイドの住人（Freesiders）は、長らくニューベガスの外郭にあるスラム街「フリーサイド」に住んでいる人々の総称です。Fallout TVシリーズのシーズン2に多数のモブキャラクターとして登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の第5話から第8話にかけて、フリーサイドで暮らす地元民たちが多数登場します。<br>彼らの一部にはセリフが与えられており、また人間だけでなくグールの住人も含まれています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>FNVプレイヤーにはお馴染み、「フリーサイドの住人（Locals）」たちです！<br><br>ゲームではキングスやマザー・ギブソン、シルバーラッシュの護衛たちに混じって、ストリートに点在していたNPCたちです。彼らが2290年代にどうやって生き残っているのか（それとも別の勢力に支配されてスラム暮らしを強いられているのか）非常に気になります。</div>',
        post: '「フリーサイドの住人」のNPC情報を追加しました！🏚️\nシーズン2で舞台となるニューベガスの外周街「フリーサイド」の地元民たちです！人間だけでなくグールも含まれており、FNVから15年経った彼らがどうやってこのスラム街で生き抜いているのかが非常に楽しみです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/freesider.html'
    },
    {
        id: 'galaxy-news-announcer',
        enName: 'Galaxy News announcer',
        jpName: 'ギャラクシー・ニュースのアナウンサー',
        rawFile: 'galaxy_news_announcer_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: '不明' },
            { label: '役割', value: 'アナウンサー' }
        ],
        bodyHtml: '<p>ギャラクシー・ニュースのアナウンサー（Galaxy News announcer）は、大戦前のニュース番組のアナウンサーです。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の第5話「The Wrangler」に登場します。<br>詳細は不明ですが、かつてFallout 3でスリードッグが運営していた「ギャラクシー・ニュース・ラジオ」と同名のニュースネットワーク「（大戦前の）ギャラクシー・ニュース」のアナウンサーであると推測されます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2の回想で出ると思われるニュースキャスターです。<br><br>Falloutシリーズにおいて「ギャラクシー・ニュース」といえば『ギャラクシー・ニュース・ネットワーク（GNN）』のことであり、Fallout 4のOP映像で流れていたニュースキャスターなどがそれに該当します。</div>',
        post: '「ギャラクシー・ニュースのアナウンサー」のロア記事を公開しました！📺\nシーズン2に登場するアナウンサーです。大戦前に存在した巨大メディア「ギャラクシー・ニュース・ネットワーク（GNN）」のニュース映像などとして回想シーンで登場すると思われます。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/galaxy-news-announcer.html'
    },
    {
        id: 'gary-tv-series',
        enName: 'Gary (TV series)',
        jpName: 'ゲイリー',
        rawFile: 'gary__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault-Tec' },
            { label: '役割', value: '映像監督' }
        ],
        bodyHtml: '<p>ゲイリー（Gary）は、Vault-Tec社のプロモーション映像の撮影監督です。Fallout TVシリーズのシーズン1（回想シーン）に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第6話における大戦前のVault-Tecによる「Vaultプロモーション用のコマーシャル撮影」の現場（と、その後の打ち上げパーティー）で登場します。<br>撮影スタジオでVaultボーイの青いジャンプスーツを着たクーパー・ハワードの演技に対し、「カット！OKだ」と撮影終了の合図を出した監督です。</p><p>その後、クーパーの自宅で行われた打ち上げパーティーで、ホーソーン一家の皿を片付けたり、バド・アスキンスがクーパーに挨拶をしている後ろで移動している姿がチラリと映ります。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>あの忌まわしき「Vault 108」にうじゃうじゃいたクローン人間たちのオリジナル……ではなく、単なる名もなきVault-Tecの撮影監督のおじさん（モブ）です。<br><br>あのクーパーの「サムズアップ」の映像にお墨付きを出したという意味では、歴史の立会人と言えるかもしれません。（彼自身は一言も喋っていませんが）</div>',
        post: 'Vault-TecのCM撮影監督「ゲイリー」のロア記事を公開しました！🎥\nドラマ第6話の回想において、クーパーがVault宣伝用の「サムズアップ」をした演技に対して「カット！OKだ」と合図を出した現場監督です。※Vault 108のゲイリー達のオリジナルではありません。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/gary-tv-series.html'
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
