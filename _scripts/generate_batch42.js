const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'squire-tv-series',
        enName: 'Squire (TV series)',
        jpName: 'スクワイア（Fallout TV）',
        rawFile: 'squire__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '複数' },
            { label: '所属', value: 'B.O.S. (サンフェルナンド支部)' },
            { label: '役割', value: '従者（見習い兵士）' }
        ],
        bodyHtml: '<p>スクワイア（Squire）は、ブラザーフッド・オブ・スティール（B.O.S.）における階級の一つで、パワーアーマーを装備した騎士（ナイト）の「従者」を指します。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>本作におけるサンフェルナンド支部のスクワイアたちは、非常に重い装備（武器や資材が入った巨大なバッグ）を背負い、主君であるナイトに随行してサポートや武器の受け渡し等の雑用を全般的にこなす役割を担っています。<br>訓練兵（アスピラント）から昇格した者たちが任命されますが、ナイト・タイタスがマキシマスを「盾」にしようとしたように、前線では使い捨ての駒のように扱われることも少なくありません。<br><br>ドラマ本編では、マキシマス、サデウス、デインなどがこのスクワイアの階級に任命されています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Fallout 4などのゲーム版以上に「中世の騎士の従者」の泥臭さをフィーチャーした階級として描かれています（スタッフによれば、アーサー王伝説の従者をモデルにし、彼らは自身の価値を証明し続けなければ命はないという過酷な立場であるとのことです）。<br><br>彼らが背負っている巨大なカバンは、ゲームプレイヤーなら誰もが経験する「重量オーバーによる所持品整理の苦しみ」をB.O.S.がどのように解決しているか（力持ちの人間を荷物持ちにする）を示すユニークな機能を持っています。</div>',
        post: 'B.O.S.の「スクワイア（従者）」のロア記事を追加しました！🧳\nナイトの付き人として巨大なカバンを背負い、ウェイストランドで武器や弾薬を運ぶ見習い兵士たちです。シーズン1ではマキシマスやサデウスが就任し、ナイトの身勝手な振る舞いや「命の軽さ」に翻弄されながらも生き残るために戦いました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/squire-tv-series.html'
    },
    {
        id: 'squirrel-tv-series',
        enName: 'Squirrel (TV series)',
        jpName: 'スクワール',
        rawFile: 'squirrel__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'ガバミント（庇護下）' },
            { label: '役割', value: '臓器狩り' }
        ],
        bodyHtml: '<p>スクワール（Squirrel）は、スーパーウルトラ・マーケットの内部で臓器売買のビジネスを行っている臓器狩り（Organ harvester）の一人です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第4話「The Ghouls」に登場します。<br>彼と同僚のヒューイは、グール（クーパー）が売り払った犠牲者たちを医療用ロボット「スニップ・スニップ」に解体させ、臓器を売って利益を得ていました。彼らは自称政府ガバミント（ソレル・ブッカー）の庇護下にあるため、みかじめ料を払って活動を黙認されています。<br><br>拠点であるスーパーウルトラ・マーケットの奥のテレビの前にヒューイと共に座り、カップラーメンをすすりながら戦前の古い白黒アニメを眺めていました。<br>スニップ・スニップから逃れてきたルーシーに銃を突きつけられ、施設の電源を入れるように要求されますが、ヒューイがルーシーの後ろから注射器を突き刺そうと企み、それを察知したルーシーによって乱闘の末、最終的に射殺されました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ヒュービーと共に「非武装に見せかけて隙を突いて殺そうとしてくる」ウェイストランドの典型的な悪党です。<br><br>人間を解体して臓器を売るという凶悪な仕事をしておきながら、自分たちはテレビで平和なアニメを見ながらカップラーメンを食っているという、Fallout特有の「狂った日常」の対比がよく描かれています。</div>',
        post: '臓器狩りの「スクワール」のロア記事を公開しました！🫀\nシーズン1のスーパーウルトラ・マーケットの裏で、ヒューイやスニップ・スニップと一緒に臓器売買ビジネスを営んでいた男です。人間を解体させながらカップラーメンをすすって古いアニメを見ているという、ウェイストランド特有のイカれた日常を謳歌していました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/squirrel-tv-series.html'
    },
    {
        id: 'stabbed-legionary',
        enName: 'Stabbed legionary',
        jpName: '刺されたリージョナリー',
        rawFile: 'stabbed_legionary_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'シーザー・リージョン' },
            { label: '役割', value: '兵士' }
        ],
        bodyHtml: '<p>刺されたリージョナリー（Stabbed legionary）は、モハビ・ウェイストランドにおけるシーザー・リージョン（Caesar\'s Legion）の残党派閥に所属している兵士です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Strip」に登場します。彼は亡きシーザーのキャンプの一部として、ラセルタ・レガート（Lacerta Legate）の配下で「リージョン内戦（Legion civil war）」を戦っていました。<br><br>グール（クーパー）によって内戦の激化が引き起こされた後、彼はラセルタ・レガートが持ち帰った「シーザー（エドワード・サロウ）の白骨化遺体」をテントに運び込むのを目撃します。彼はレガートが白骨の手に握られていた「シーザーの最期のメモ（遺言状）」を読んでいるのを見て『そこには何が書いてある？誰が次のリーダーになるんだ？』と尋ねます。<br><br>しかし、そのメモに記されていたのは「私と共にリージョンも死ぬべきだ」という、後継者を認めないシーザーの最期の意志でした。この不都合な真実をリージョン兵士たちから隠蔽するため、レガートは「シーザー万歳（Long live Caesar）」と答えながら彼の腹部を剣で刺し殺しました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2で明かされるFallout: New Vegasの「その後」におけるシーザー・リージョンの現状を説明するための重要な犠牲者です。<br><br>シーザーの遺言を知ってしまったがゆえに、「シーザーの名を利用して自分が支配権を握りたい」レガートによって口封じされるという、古代ローマ的かつリージョンらしい内ゲバの犠牲となりました。</div>',
        post: '「刺されたリージョナリー」のロア記事を追加しました！⚔️\nシーズン2で判明したNew Vegas後の『シーザー・リージョン内戦』に参加している兵士です。彼は亡きシーザーの白骨遺体が握っていた最期の遺言を尋ねますが、その内容が不都合であったため、野心を持つレガートによって口封じのために刺殺されてしまいます。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/stabbed-legionary.html'
    },
    {
        id: 'steph-harper',
        enName: 'Steph Harper',
        jpName: 'ステフ・ハーパー',
        rawFile: 'steph_harper_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault 31 -> Vault 32監督官' },
            { label: '役割', value: 'Vault-Tec幹部（大戦前）' }
        ],
        bodyHtml: '<p>ステフ（Stephanie "Steph" Harper）は、ハンク・マクレーンと同じく「Vault 31」のコールドスリープから目覚めてVault 32/33へ送り込まれた大戦前のVault-Tec管理職の一人です。シーズン1終盤にて、再建されたVault 32の暫定監督官となりました。（演：アナベル・オヘイガン）</p><hr><h2>Fallout TVシリーズ</h2><p><b>本作における最大級のロア更新が施されたキャラクターです。</b><br><br>シーズン1では、妊娠中で左目をフォークで刺されながらもレイダーと戦い、のちにチェットと結ばれてVault 32の新しい監督官になるという優秀な（元31の）住人として描かれていました。<br><br><b>シーズン2の特大ロア</b><br>シーズン2以降の描写および背景設定により、彼女が大戦前（2077年）から存在し、ハンク・マクレーンの<b>「大戦前に結婚していた本来の（一人目の）妻」であることが判明しました。</b><br>つまり、彼女はルーシーの「生物学上の（本当の）ステップ・マザー（継母）」ということになります。<br>また、彼女がカナダで名もなきカナダ人を暗殺（喉を切り裂く）するシーンが追加されており、Vault 32の監督官というだけでなく、Vault-Tec（あるいはエンクレイヴ）の暗部の実働部隊として非常に恐ろしい役割を担っていることが明らかになりました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>単なる「Vault 31出身の怪しい住人」だと思いきや、シーズン2でとんでもない設定の爆弾が爆発しました。<br><br>ハンクの大戦前の妻であったこと、そしてカナダでの暗殺描写。彼女のお腹にいた子供（Chet Jr.）の本当の父親は誰だったのか？ローズ（ルーシーの本当の母）とハンクの関係はどうなっていたのか？一気にドラマの人間関係をドロドロの愛憎劇＆企業陰謀論へと引きずり込んだ超重要人物です。</div>',
        post: '重要人物「ステフ・ハーパー」のロア記事を大幅更新しました！👁️\nシーズン1でVault 32監督官となった彼女ですが、シーズン2で最大の爆弾が落とされました。なんと彼女は「大戦前にハンク・マクレーンと結婚していた本来の妻（ルーシーの継母）」であることが判明！さらにカナダで暗殺を行う恐ろしい過去も描かれています。ヤバすぎる！\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/steph-harper.html'
    },
    {
        id: 'stephen-winthrop',
        enName: 'Stephen Winthrop',
        jpName: 'スティーブン・ウィンスロップ',
        rawFile: 'stephen_winthrop_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault-Tec（顧客）' },
            { label: '役割', value: 'プレミアム・エリート・プラス顧客' }
        ],
        bodyHtml: '<p>スティーブン・ウィンスロップ（Stephen "Steve" Winthrop）は、大戦前のアメリカのビジネスマンであり、Vault-Tecから冷凍睡眠の権利を買っていた顧客です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Golden Rule」に登場します。大戦前、彼は自分の成功で得た富を使い、Vault-Tecから「プレミアム・エリート・プラス（Premium Elite Plus）」という上位パッケージを購入していました。これにより「再建の日（Reclamation Day）」まで安全なコールドスリープが保証されていましたが、なんと<b>彼はそのパッケージを「自分自身の分」しか購入しておらず、大戦当日に家族を見捨てて自分だけが凍結装置に入りました。</b><br><br>しかし2296年の7月、彼をポッドから目覚めさせたのはVault-Tecの管理システムではなく、ハンク・マクレーンでした。ハンクはネズミを使ったテストに不満を持ち、「彼のような利己的な顧客」を人間を使ったマインドコントロール・チップの「最初の実験体」として選びました。<br>目覚めつつある彼がシャンパンを注ぐハンクに「君は誰だ？」と尋ねた瞬間、首に埋め込まれたチップが起動してハンクの完全な奴隷となり、彼の洗脳被害者第一号となりました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>大金持ち特有の「自分だけが助かればいい」というエゴイズムの末路です。<br><br>家族を見捨てて自分だけコールドスリープに入った報いとして、目覚めた未来でVault-Tec（ハンク）の洗脳奴隷にされてしまうという皮肉な展開は、Vault-Tecという企業が悪人をさらに上回る究極のサイコパス企業であることを痛感させてくれます。</div>',
        post: '「スティーブン・ウィンスロップ」のロア記事を公開しました！🥶\n大戦前、大金を払ってVault-Tecから「自分一人だけ」の冷凍睡眠パッケージを買い、家族を見捨てて生き延びたビジネスマンです。しかし目覚めた未来で待っていたのは、ハンクによるマインドコントロール・チップの”人間用実験体第一号”にされるという因果応報な結末でした。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/stephen-winthrop.html'
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
