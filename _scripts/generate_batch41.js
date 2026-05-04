const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'slit-throat-victim',
        enName: 'Slit throat victim',
        jpName: '喉を掻き切られた犠牲者',
        rawFile: 'slit_throat_victim_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'カナダの居住者' },
            { label: '役割', value: '犠牲者' }
        ],
        bodyHtml: '<p>喉を掻き切られた犠牲者（Slit throat victim）は、Fallout TVシリーズのシーズン2に登場する名もなきカナダ（Canada）の居住者です。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Handoff」に登場します。この男性は屋外でポークビーンズの缶詰を食べていたところ、突然ステフ・ハーパーによって背後からナイフで喉を掻き切られて死亡しました。<br><br>Falloutユニバースにおいて「カナダ」は2070年代にアメリカ合衆国によって武力併合（侵略）された歴史を持つ地域であり、本編でカナダを舞台としたシーンが実写映像化されるのはこれが初めてとなります。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ドラマ版シーズン2で「カナダの惨状」が描かれることを示す象徴的な犠牲者です。<br><br>ゲームでは初代FalloutのOP映像（パワーアーマーを着た米軍が路上でレジスタンスを処刑する映像）くらいしか直接的な描写がなかったカナダですが、ドラマ版ではその過酷な現実がさらに掘り下げられているようです。</div>',
        post: '「喉を掻き切られた犠牲者」のロア記事を追加しました！🥫\nシーズン2に登場する男で、ポークビーンズを食べていたところをステフに暗殺されました。重要なのは、なんとこのシーンの舞台が『カナダ（アメリカに武力併合された）』であること！実写版でついにカナダの様子が描かれるようです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/slit-throat-victim.html'
    },
    {
        id: 'snake-oil-salesman',
        enName: 'Snake oil salesman',
        jpName: '胡散臭いセールスマン',
        rawFile: 'snake_oil_salesman_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'ハンク・マクレーン配下' },
            { label: '役割', value: 'インチキ薬売り / チキン・ファッカー' }
        ],
        bodyHtml: '<p>胡散臭いセールスマン（Snake oil salesman / "Chicken fucker"）は、モハビ・ウェイストランド周辺を行商して回っているインチキ薬売りの男です。Fallout TVシリーズのシーズン1およびシーズン2に登場します。（演：ジョン・デイリー）</p><hr><h2>Fallout TVシリーズ</h2><p><b>シーズン1の動向</b><br>自称「医者」や「科学者」を名乗って自家製の怪しい薬品（血清）を売り歩く行商人ですが、実態はただのジャンキーであり、スキあらばニワトリ（Chicken）と性行為に及ぼうとする「チキン・ファッカー」というウェイストランドらしい変態です。<br>足を粉砕されて苦しむサデウスに対して「あらゆる病や不幸に効く薬」を売りつけました。「グールになるかもしれない」と警告しながら彼に治療薬（謎の赤い液体）を注射し、驚異的な治癒力をもたらす代わりにサデウスを人間ではないモノ（おそらくグールやその他のミュータント）へと変異させて去っていきました。<br><br><b>シーズン2の動向</b><br>シーズン2に入ると、彼が実は Vault-Tec（ハンク・マクレーン）によってマインドコントロールのチップを埋め込まれていた「操り人形（奴隷）」の一人であったことが示唆されています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>サデウスが見た目そのままの「ニワトリとヤる男＝チキン・ファッカー」と率直に呼んでいたのが最高のキャラクターでした。<br><br>彼がサデウスに盛った薬の正体はいまだに議論の的（FEVウイルス説やグールの血説など）ですが、彼自身がハンクの配下（操り人形）であったことが判明したことで、彼が持っていた変異薬が「Vault-Tecの管理下にある戦前のやばいクスリ」であった可能性が濃厚になってきました。</div>',
        post: '「胡散臭いセールスマン」のロア記事を公開しました！🐔\n怪しい薬を売り歩くチキン・ファッカーです。シーズン1でサデウスに謎の薬（グール化？）を注射して変異させた張本人ですが、実は彼自身もハンクのチップでマインドコントロールされていた人間の一人であることが判明しています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/snake-oil-salesman.html'
    },
    {
        id: 'sonny',
        enName: 'Sonny',
        jpName: 'ソニー',
        rawFile: 'sonny_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'ソニーズ・サンドリーズ' },
            { label: '役割', value: '本物の店主（故人）' }
        ],
        bodyHtml: '<p>ソニー（Sonny）は、モハビのフリーサイド（Freeside）にある雑貨店「ソニーズ・サンドリーズ（Sonny\'s Sundries）」の本来の店主でした。Fallout TVシリーズのシーズン2ではすでに故人として登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Wrangler」での出来事を中心とする背景設定で語られます。<br><br>フリーサイドでケミカルや武器などの物資を売る自分の名前を冠した店を営んでいましたが、2296年の7月頃、「店主サイモン」を名乗るようになる強盗殺人犯の男（当時全裸だった）に突然襲われ、殺害されました。<br><br>サイモンはソニーの遺体を無残に解体して店の裏のゴミ箱に捨てた後、ソニーの服を奪い取って着て（サイズが合っていないのに無理やり着ていた）本物に成りすましていました。<br>後にアディクトールを求めて店を訪れたルーシーがゴミ箱の中にあるソニーの遺体を発見し、真相に気付いてサイモンと対峙することになります。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>理不尽にも全裸の男に殺されて身ぐるみを剥がされ、さらには店の乗っ取りまで許してしまった悲運の商人です。<br><br>「ゴミ箱に本物の遺体がブチ込まれている」というゲーム内の環境ストーリーテリング（白骨死体とアイテムの配置）のようなホラー展開を、ドラマのストーリー構成に組み込んだ面白いモブキャラクターですね。</div>',
        post: 'フリーサイドの「ソニー」のロア記事を追加しました！🗑️\n雑貨店ソニーズ・サンドリーズの【本物】の店主。残念ながら2296年に全裸の強盗（サイモン）に殺害され、店の裏のゴミ箱にバラバラにして捨てられて服と店を乗っ取られていた悲惨なNPC（死体）です。この事実をルーシーが暴きます。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/sonny.html'
    },
    {
        id: 'sorrel-booker',
        enName: 'Sorrel Booker',
        jpName: 'ソレル・ブッカー',
        rawFile: 'sorrel_booker_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'ガバミント' },
            { label: '役割', value: '”大統領”' }
        ],
        bodyHtml: '<p>ソレル・ブッカー（Sorrel Booker）は、ロサンゼルス周辺で自称政府組織「ガバミント（The Govermint）」を名乗って活動しているマフィアのボスです。Fallout TVシリーズのシーズン1に登場します。（演：グレン・フレシュラー）</p><hr><h2>Fallout TVシリーズ</h2><p>第6話で登場。クーパー・ハワード（グール）の古い知り合いです。<br>2296年の時点では、配下の「保安官」たちを使ってスーパーウルトラ・マーケットの臓器売買シンジケートからみかじめ料を取るなどして荒稼ぎしており、自らをガバミントの「大統領（President）」と自称しています。<br><br>廃病院のような建物を「BBQ Shack」と名付け、自分の腹に出来た腫瘍の塊のようなものを皿に盛って見つめながら食事をしているという異様な性癖を持っています。<br><br>部下の保安官たちが偶然グールを捕まえてきた際、ブッカーはかつてグールの圧倒的な強さを見たことがあったため、彼には手を出さずに指名手配書の情報を渡して解放しようとしました。しかしグールはその場で保安官たちを撃ち殺し、彼が気にかけていた絵画を切り取って去っていきました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>マフィアが「大統領」や「保安官」を名乗ってウェイストランドを統治しようとしている、いかにもFalloutな小勢力のボスです。<br><br>部下たちはグールの恐ろしさを知らずにイキっていましたが、ブッカー自身だけはかつてグールが怒り狂って暴れる姿を見たことがあったため、冷静に身を引いて自分だけは生き残る賢さ（小悪党臭さ）を見せていました。</div>',
        post: '「ガバミント」の大統領「ソレル・ブッカー」のロア記事を公開しました！🍖\n自称政府を名乗るマフィアのボス。自身のヘソから切除した肉の塊（嚢胞）を皿に置いて眺めながら食事をするというイカれた性癖を持っています。グールの古い知り合いであり、彼の実力を恐れて部下が殺されても沈黙を貫きました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/sorrel-booker.html'
    },
    {
        id: 'spectator',
        enName: 'Spectator',
        jpName: '見物人（Vault-Tec）',
        rawFile: 'spectator_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '複数' },
            { label: '所属', value: '暗闇の男 / Vault-Tec' },
            { label: '役割', value: '傍観者' }
        ],
        bodyHtml: '<p>見物人（Spectators）は、大戦前においてVault-Tecが各界の大企業トップを招き開いた「秘密会議」を暗闇のバルコニーから観察していた謎の集団です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第8話（最終話）における最大級の伏線の一つです。<br>バーブ・ハワードとバド・アスキンスが、ロバート・ハウス（ロブコ）やフレデリック・シンクレア（ビッグMT）などの巨大企業の代表たちに対して「世界の終わり（と各Vaultの自由な実験権）」をオークションのように提案していた際、その会議の様子を上の階の暗いバルコニーから静かに見下ろす複数人の人影がありました。<br><br>彼らの背後の展望室の暗闇の中には、さらに彼らを統括していると思われる「謎の男（Man in shadows）」が立っていました。（バーブが一瞬だけ彼らのいる上層階へ視線を向ける描写があります）</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>FalloutユニバースにおけるVault-Tecの「真の黒幕（経営陣）」あるいは「エンクレイヴの影の監視者」を暗示する重要なキャラクターたちです。<br><br>アメリカを牛耳るトップ企業のCEOたちですら、この見物人たちが観察する箱庭の中の役者に過ぎなかったのか、それともVault-Tecの真のオーナー層なのか。今後のシーズンで彼らの正体が明かされるのが楽しみです。</div>',
        post: 'Vault会議における謎の「見物人たち」のロア記事を追加しました！👁️\n大戦前、Vault-Tecのバーブが企業のトップ（Mr.ハウス等）を集めて「世界の終わり」を提案していた際、その様子を最上階の暗いバルコニーからじっと見下ろしていた謎の集団です。Vault-Tecの”真の黒幕”であることを予感させる最大の伏線ですね。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/spectator.html'
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
