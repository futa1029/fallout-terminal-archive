const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'farmer-tv-series',
        enName: 'Farmer (TV series)',
        jpName: '農夫',
        rawFile: 'farmer__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'なし' },
            { label: '役割', value: '農夫' }
        ],
        bodyHtml: '<p>農夫（Farmer）は、ジャンクの町フィリー郊外に住んでいる現地民です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>背景</h2><p>彼は、ロサンゼルス（ボーンヤード）周辺の砂漠の真ん中にある農場で生計を立てようとしている一般的なウェイストランドの住人です。<br>かつては彼の父親や何人かの兄弟、そしておばと一緒にこの家で暮らしていましたが、彼らは全員、近くの町「フィリー」に立ち寄った際に様々なトラブルで殺されてしまったため、現在はこの農夫一人だけが取り残されて暮らしています。</p><h2>Fallout TVシリーズ</h2><p>第2話において、Vaultから地上へ出たばかりのルーシーが砂漠を放浪していた際、農場の外で浄水器（ウォーターフィルター）と格闘している農夫と出会いました。<br>最初、彼女が防衛のために麻酔銃を突きつけたため、彼は強盗だと勘違いして両手を挙げました。しかし彼女が敵対的でないことがわかると、ルーシーに対して「君が襲撃者なら、ここにあるものはみんな君のものになり得たのに！」と皮肉を交えて応じます。</p><p>その後、ルーシーは持っていたピップボーイの画面を見せ、父親を誘拐したレイダーと同じ「モルデイヴァーの炎のマーク」を知らないかと農夫に尋ねました。<br>しかし彼は「この辺りではそんなマークにわざわざ構っている人間はいない」とそっけなく答え、代わりに情報を集めるなら「フィリー」という町へ行くべきだと道を教えました。<br>なお、その際に彼はルーシーに対し「フィリーではしょっちゅう人が殺されている。俺の親父や兄弟、おばさんもそこで殺された」と、ウェイストランドの無法っぷりを淡々と語り、ルーシーを戦慄させました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>地上へ出たばかりのルーシーの前に現れ、道案内と「ウェイストランドの非情な常識」を親切に教えてくれた心優しい農夫です。<br><br>親族一同が全員フィリーで殺されたと語っているあたり、Falloutの世界観のヤバさが彼の背景から滲み出ています。</div>',
        post: '地上に出たルーシーに初めての道案内をした「農夫」のロア記事を公開しました！🌽\n「フィリーではしょっちゅう人が殺されてる。俺の親父も兄弟もおばさんもあそこで殺された」と淡々とウェイストランドの常識を語り、ルーシーを戦慄させた人物です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/farmer-tv-series.html'
    },
    {
        id: 'felix-tv-series',
        enName: 'Felix (TV series)',
        jpName: 'クレリック・フェリックス',
        rawFile: 'felix__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'B.O.S. (サンフェルナンド支部)' },
            { label: '役割', value: 'クレリック（司祭）' }
        ],
        bodyHtml: '<p>クレリック・フェリックス（Cleric Felix）は、ブラザーフッド・オブ・スティール（B.O.S.）のメンバーです。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>背景</h2><p>2296年時点において「サンフェルナンドのナイトたち（Knights of San Fernando）」と呼ばれるB.O.S.支部に所属し、候補生（アスピラント）たちを教育して独自のイデオロギーを植え付ける「クレリック（司祭）」の階級に就いている人物です。</p><h2>Fallout TVシリーズ</h2><p>第1話において、マキシマスを含む候補生たちに対して「B.O.S.の目的は、大戦前のテクノロジーを見つけ出し保存することだ」と説く教育シーンで登場します。<br>彼は授業中、マキシマスに対してプロジェクターに映し出された遺物の名前を答えさせますが、マキシマスが「回路（サーキット）」ではなく「ローター」だと間違えて解答したため、罰として（見せしめとして）彼の頬を強く殴りつけました。<br>その後、外に巨大な飛行船「キャスウェナン（あるいはプリドゥエン）」が到着したため、彼の授業は中断されました。</p><p>のちに、出撃前のマキシマスを「スクワイア（従者）」に任命する儀式において、フェリックスが神聖な油を塗りながら儀式を執り行っている姿が描かれます。<br>そこで彼はマキシマスに対して、従者としての最も神聖なる義務は「ブラザーフッドを守り、任務を守り、そして新たな主君であるナイト・タイタスを守ることだ」と教え込みました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ドラマ特有のカルトな役職である「クレリック」の肩書を持つ教育係です。<br><br>マキシマスに対してカルトじみた熱心な教育を行っており、東海岸の影響力を持つ飛行船に乗り込めた際には興奮の表情を浮かべるなど、独自の妄信的なB.O.S.愛を持っていることが窺えます。</div>',
        post: '候補生たちにカルトじみた教育を施すB.O.S.の教官「クレリック・フェリックス」のロア記事を公開しました！⚙️\nドラマ特有のイデオロギー教育を体現する司祭階級であり、マキシマスに対してスパルタ教育や従者の任命儀式を執り行った人物です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/felix-tv-series.html'
    },
    {
        id: 'female-server',
        enName: 'Female server',
        jpName: '女性の給仕',
        rawFile: 'female_server_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'なし' },
            { label: '役割', value: '給仕' }
        ],
        bodyHtml: '<p>女性の給仕（Female servers）は、最終戦争前のアメリカにいた人物たちです。Fallout TVシリーズのシーズン1（フラッシュバック）に登場します。</p><hr><h2>背景</h2><p>彼女たちは、クーパー・ハワードの邸宅で開かれたVault-Tec社のプロモーション撮影の「打ち上げパーティー」で、客にドリンクを配っていた二人の給仕です。</p><h2>Fallout TVシリーズ</h2><p>第6話におけるクーパーの回想シーンに登場します。<br>彼女たちは、パーティーの出席者であった俳優「セバスチャン・レスリー」の大ファンであり、彼に向かって「どうか、あのドラマの執事（コズワース）の声をやっていただけませんか？」とねだりました。<br>セバスチャンは快く引き受け、テレビでお馴染みの「バーソロミュー・コズワース執事」の声を本人たちの前で披露しました。女性たちは大喜びして歓声を上げますが、直後にセバスチャンが「仕事が終わったら、俺と一緒にホットタブに入らないか？」と口説き文句を投げかけると、彼女たちは途端に真顔になり、冷たくあしらって立ち去っていきました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>俳優セバスチャンの声真似だけ聞きたいミーハーな雇われ給仕たちです。<br><br>Mr.ハンディなどに搭載されたコズワースの声が当時どのように評価されていたのか、そして俳優セバスチャンの私生活での「扱われ方」がよく分かる面白いワンシーンとなっていました。</div>',
        post: 'クーパーの家のパーティーで働いていた「女性の給仕」のロア記事を公開しました！🍷\n俳優のセバスチャンに「コズワース執事の声真似して！」とねだり、やってもらった直後にナンパされると見事に冷たくあしらって立ち去っていった人たちです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/female-server.html'
    },
    {
        id: 'filly-huge-man',
        enName: 'Filly huge man',
        jpName: 'フィリーの巨漢',
        rawFile: 'filly_huge_man_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'スカベンジャー' },
            { label: '役割', value: 'ゴロツキ' }
        ],
        bodyHtml: '<p>フィリーの巨漢（Filly huge man / scavenger）は、ジャンクの町フィリーに住む大柄な男です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第2話において、初めてフィリーの町に入ってきたルーシーが、スレッジハンマーを手にして立っているこの大男のそばを通り過ぎました。当時彼は、揉め事を起こして暴力を振るっていた他の男を捕まえて、自ら制裁を加えるようにボコボコにしている真っ最中でした。</p><p>その後の第3話では、マキシマスがフィリー郊外に無防備に放置していた「T-60パワーアーマー」の周囲に、トム（Tom）が率いる6人のスカベンジャーの一味として再登場します。<br>彼自身がパワーアーマーの中に入ろうと悪戦苦闘していると、持ち主であるマキシマスが戻ってきて取り返そうとしました。<br>巨漢は仲間と共にマキシマスをボコボコに叩きのめしますが、彼らがマキシマスへの興味を失って背中を向けた隙に、立ち上がったマキシマスによって「巨大なレンチ」でアゴを二度激しく殴打され、気絶（もしくは死亡）しました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>フィリーとその周辺にいたモブの巨漢スカベンジャーです。<br><br>「放置された所有者不明のパワーアーマー」というのはウェイストランド人にとっては一攫千金の宝の山であり、彼らがこぞって群がったのも無理はありません。</div>',
        post: 'フィリーの町にいた柄の悪い男「フィリーの巨漢」のロア記事を公開しました！🛠️\nマキシマスが放置していたパワーアーマーを奪おうとしたスカベンジャー集団の一人であり、マキシマスに巨大なレンチでアゴをカチ割られた男です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/filly-huge-man.html'
    },
    {
        id: 'filly-townsperson',
        enName: 'Filly townsperson',
        jpName: 'フィリーの町民',
        rawFile: 'filly_townsperson_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間 / グール' },
            { label: '性別', value: '様々' },
            { label: '所属', value: 'フィリー' },
            { label: '役割', value: '町民' }
        ],
        bodyHtml: '<p>フィリーの町民（Filly townspeople）は、ロサンゼルス（ボーンヤード）周辺のジャンクの町フィリーにいる人々です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>背景</h2><p>彼らは様々なグループや背景を持つウェイストランダーです。ある者はこの町にずっと住んでいる住人であり、ある者は地域の各地から訪ねてきた訪問者や商人、スカベンジャー、あるいはレイダーです。（その中には、のちに町を取り仕切ることになる保安官「トロイ」の父親なども含まれています）</p><h2>Fallout TVシリーズ</h2><p>ルーシーから自己紹介をされても冷たく無視する者や、双頭の牛（バラモン）を引いて歩く者、そして保安官が殺されても気にも留めずに日常を送る者など、ウェイストランド特有の「自分の身は自分で守る無関心さ」を体現している人々です。<br>町の中でシギ・ウィルツィヒやグール（クーパー）、ルーシーやマキシマスらの銃撃戦が始まると、彼らは慣れた様子で即座に悲鳴を上げて散り散りになり、安全な場所へと隠れ去っていきました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>メガトンやダイヤモンドシティの住人に匹敵する「荒野の町民たち」の総称です。<br><br>目の前で殺し合いが始まっても誰一人加勢したり助けたりせず、「運が悪かったな」と言わんばかりに蜘蛛の子を散らすように隠れるのが最高にFalloutぽいですね。</div>',
        post: 'ジャンクの町で暮らす「フィリーの町民」のロア記事を公開しました！🏠\n挨拶をしても無視する、目の前で殺し合いが起きても蜘蛛の子を散らすように隠れるなど、ウェイストランドならではの「他人に干渉しない（自分の身は自分で守る）」を体現している住人たちです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/filly-townsperson.html'
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
