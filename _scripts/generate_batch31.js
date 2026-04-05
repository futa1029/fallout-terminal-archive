const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'ncr-caravaner',
        enName: 'NCR caravaner',
        jpName: 'NCRのキャラバン商人',
        rawFile: 'ncr_caravaner_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: '新カリフォルニア共和国 (NCR)' },
            { label: '役割', value: 'キャラバン護衛' }
        ],
        bodyHtml: '<p>NCRのキャラバン商人（NCR caravaner）は、新カリフォルニア共和国（NCR）のバラモン・キャラバンを率いるドライバーです。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>本作においては非常に重要な、そして悲劇的な役割を持ちます。<br>2283年、彼はハンク・マクレーンによって捕らえられ、後頭部に「マインドコントロール・チップ」を埋め込まれて操り人形と化してしまいました。ハンクに操られた彼は、自身の故郷でありNCRの当時の首都であった「シェイディ・サンズ」の中心部に、バラモンの荷物に隠した小型核爆弾を運び込むという任務を強制的に遂行させられます。<br><br>爆弾を運搬している間から爆発までの間、彼はうわ言のように『モハビのパトロールをしていると、核の冬が恋しくなるぜ（Patrolling the Mojave almost makes you wish for a nuclear winter.）』というおなじみのセリフを繰り返していました。<br>最終的にマキシマスの父ジョセフらにチップを発見され取り出されますが時既に遅く、爆弾のタイマーが作動。本人は「モハビ」と呟きながら息絶え、直後にシェイディ・サンズは業火に包まれました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>『Fallout: New Vegas』をプレイした人なら1万回は聞いたであろう、あの有名なNCR兵士の愚痴「Patrolling the Mojave almost makes you wish for a nuclear winter（モハビをパトロールしてると、核の冬が恋しくなるぜ）」が最悪の形で回収されるキャラクターです。<br><br>まさかこのセリフが、首都シェイディ・サンズに本物の「核の冬」をもたらすためのテロの暗号（あるいは洗脳の副作用によるうわ言）に使われるとは誰が想像したでしょうか。</div>',
        post: '「NCRのキャラバン商人」のロア記事を公開しました！☢️\nシーズン2で明かされる、シェイディ・サンズ崩壊の直接的な実行犯です。作中でハンクに洗脳された彼がうわ言のように繰り返す「あのNew Vegasの有名なセリフ」が、最悪の形で実写化（そして伏線回収？）されることになります。これはエグい…。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/ncr-caravaner.html'
    },
    {
        id: 'ncr-citizen-tv-series',
        enName: 'NCR citizen (TV series)',
        jpName: 'NCRの市民',
        rawFile: 'ncr_citizen__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間 / グール' },
            { label: '性別', value: '様々' },
            { label: '所属', value: '新カリフォルニア共和国 (NCR)' },
            { label: '役割', value: '市民' }
        ],
        bodyHtml: '<p>NCRの市民（NCR citizens）は、首都崩壊後のロサンゼルス（ボーンヤード）周辺で、新カリフォルニア共和国（NCR）の残党軍と共に生活している民間人たちです。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第8話にて、グリフィス天文台付近でNCR兵士の保護の下、畑を耕したり共同で食事をとったりして暮らす姿が描かれています。<br>その中には、ルーシーがサンタモニカのスーパーウルトラ・マーケットで臓器密売組織から救いだした、あのグールの市民の姿もありました。<br><br>しかし、彼らのささやかな避難生活は、B.O.S.による突然の軍事襲撃（天文台の戦い）によって打ち砕かれます。多くの市民がパワーアーマーとベルチバードの火力から逃げ惑うことになり、一部の果敢な市民（主に若者）は武器をとってB.O.S.の兵士たちに立ち向かいましたが、一方的に虐殺されてしまいました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>モルデイヴァーが単なるレイダーのボスではなく、NCRという国家を再建しようと努力していたことを示す存在です。<br><br>ルーシーが助けたグールがちゃんとここで安全に暮らしている描写がある反面、B.O.S.（特にマキシマス以外の兵士たちやマキシマス自身が連れてきた同胞たち）が彼ら民間人ごと虐殺するという、B.O.S.の「テクノロジー回収のためなら手段を問わない」恐ろしい側面が際立っています。</div>',
        post: '「NCRの市民」についてのロア記事を追加しました！🐻\n首都崩壊後もロサンゼルスでNCR兵士と共に農作業などをして暮らす残党たちです。ルーシーが道中で救ったあのグールの姿も確認できるなど、モルデイヴァー率いる彼らが単なる悪党集団でないことがわかります。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/ncr-citizen-tv-series.html'
    },
    {
        id: 'ncr-soldier-tv-series',
        enName: 'NCR soldier (TV series)',
        jpName: 'NCR兵士（シーズン1残党）',
        rawFile: 'ncr_soldier__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '様々' },
            { label: '所属', value: '新カリフォルニア共和国 (NCR)' },
            { label: '役割', value: '兵士（残党）' }
        ],
        bodyHtml: '<p>NCR兵士（NCR soldiers）は、新カリフォルニア共和国（NCR）軍の兵士たちです。Fallout TVシリーズのシーズン1では、主にシェイディ・サンズ崩壊後の首都圏に残っていた「残党兵（Remnants）」として登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>首都の消滅により正規の軍隊としての強大な軍事力や物資の供給は絶たれており、ロサンゼルスのグリフィス天文台を拠点に、リー・モルデイヴァーの指揮下で細々と活動していました。<br>装備は旧式のコンバットアーマーやあり合わせの布装備が多く、組織というよりは民兵やレイダーに近い見栄えになっています。<br><br>最終話である第8話での「グリフィス天文台の戦い」において、モルデイヴァーの命令によりコールドフュージョン（常温核融合）施設を防衛するために、襲来したB.O.S.の部隊と激しく交戦しますが、パワーアーマーの圧倒的な戦力差の前に次々と殲滅されていきました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>かつて『Fallout: New Vegas』などで見せた巨大な軍事国家の面影はなく、モルデイヴァーの下で必死に生き残っていた残党たちです。<br><br>モルデイヴァーの正当な護衛とは異なり、多くの残党兵たちはボロボロの装備で戦っていました。</div>',
        post: 'シーズン1に登場する「NCR兵士（残党）」のロア記事を公開しました！🐻\n首都崩壊後のロサンゼルスで、リー・モルデイヴァーのもとで細々と活動していた残党兵たちです。B.O.S.との最終決戦では、かつての栄光の面影もなく、圧倒的な火力の前に次々と倒れていくという悲しい描写がなされました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/ncr-soldier-tv-series.html'
    },
    {
        id: 'ncr-trooper-tv-series',
        enName: 'NCR trooper (TV series)',
        jpName: 'NCRトルーパー（シーズン2）',
        rawFile: 'ncr_trooper__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '様々' },
            { label: '所属', value: '新カリフォルニア共和国 (NCR)' },
            { label: '役割', value: '正規兵' }
        ],
        bodyHtml: '<p>NCRトルーパー（NCR troopers）は、新カリフォルニア共和国軍（NCR Army）の正規兵たちです。Fallout TVシリーズのシーズン2に登場します。<br>※シーズン1に登場した崩壊後の残党兵（Soldiers）とは異なり、こちらは組織として機能している段階の統率された兵士たちを指します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の回想シーン（2283年）では、核攻撃を受ける直前の首都シェイディ・サンズを巡回している、見慣れた標準的な制服姿のトルーパーたちが描かれます。<br><br>また、ロドリゲス大尉が率いる別動隊（あるいは残党）が、ニューベガスのフリーサイドでシーザー・リージョンの勢力等と交戦している姿も描かれています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン1におけるボロボロの残党兵とは異なり、ゲーム『Fallout: New Vegas』で見慣れたあのカーキ色の軍服・ヘルメット・防具をしっかりと装備した正規のNCR兵士たちです。<br><br>シェイディ・サンズ崩壊前の2283年が描かれるため、当時のNCRの街並みと彼らの姿が実写映像でついに堪能できそうです。</div>',
        post: '「NCRトルーパー（シーズン2）」のロア記事を追加しました！🐻\nあのボロボロの残党兵とは違う、ゲームでおなじみのカーキ色の軍服とヘルメットをしっかり着こなした正規のNCR兵士たちです！シーズン2では核兵器で消滅する直前の、「2283年の首都シェイディ・サンズ」での彼らの生活模様が見られそうです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/ncr-trooper-tv-series.html'
    },
    {
        id: 'news-anchor',
        enName: 'News anchor',
        jpName: 'ニュースキャスター',
        rawFile: 'news_anchor_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'テレビ局' },
            { label: '役割', value: 'ニュースキャスター' }
        ],
        bodyHtml: '<p>ニュースキャスター（News anchor）は、2077年の大戦前のアメリカでテレビのニュース番組を担当していた男性です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第1話の冒頭、クーパー・ハワードたちがパーティーをしている家（スペンサー邸）のテレビの中で、アメリカと中国の平和交渉が決裂したという深刻なニュースを伝えています。「過去10年にわたってアメリカ国民が直面してきた核戦争の脅威が…」と語りかけていましたが、途中で不安になったロンダ・スペンサーによってテレビの電源が切られてしまいます。<br><br>また、クーパーの過去の回想（より以前の時期）においても、バーのテレビで「ウランが不足しており、諸外国の間で資源獲得競争が激化している」ことや「今度の冬はエネルギー価格が高騰するかもしれない」という、大戦へと繋がる世界情勢の悪化を淡々と報道しています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>オープニングで世界の終わりを告げる役目を担った戦前のニュースキャスターです。<br><br>Fallout 4の冒頭でもニュースキャスターが切迫した様子で「皆さん、ついにその時が来て証拠が…（Please stand by）」と放送を切り替えるシーンがありましたが、本作のキャスターはテレビを切られてしまい、その後アメリカがどうなったのかを彼が最後まで伝えきれたのかはわかりません。</div>',
        post: '戦前のアメリカの「ニュースキャスター」のロア記事を公開しました！📺\n第1話の冒頭などでテレビを通じ、アメリカと中国の平和交渉決裂や世界的なウラン不足といった「来るべき世界の終わり」を伝えていた人物です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/news-anchor.html'
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
