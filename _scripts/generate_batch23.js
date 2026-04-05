const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'irv',
        enName: 'Irv',
        jpName: 'アーヴ',
        rawFile: 'irv_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 32' },
            { label: '役割', value: 'Vaultの居住者' }
        ],
        bodyHtml: '<p>アーヴ（Irv）は、Vault 32の居住者です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の終盤（第6話〜第8話）にかけて登場するようです。<br>シーズン1におけるVault 33と32の出来事の後、復活したVault 32の居住者としてなんらかの役割を担っていると思われます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン1で住民がいったん全滅した「Vault 32」ですが、シーズン2で新たに再建された（あるいはVault 33から住人を分割された）あとのVault 32の様子が描かれるようです。彼はそこで登場する新しいモブ居住者の一人と思われます。</div>',
        post: '「アーヴ」のロア記事を公開しました！📘\nシーズン2に登場する「Vault 32」の居住者の一人です。シーズン1の恐ろしい出来事の後、再建されたVault 32内での様子が描かれるようです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/irv.html'
    },
    {
        id: 'jamila',
        enName: 'Jamila',
        jpName: 'ジャミラ',
        rawFile: 'jamila_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間 (サイボーグ)' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'フィリー' },
            { label: '役割', value: '修理屋' }
        ],
        bodyHtml: '<p>ジャミラ（Jamila）は、スクラップタウン「フィリー（Filly）」で修理屋を営んでいる女性です。Fallout TVシリーズのシーズン1第3話に登場します。</p><hr><h2>背景</h2><p>フィリーのジャンク街で修理業を営む彼女は、頬にインプラントとしての「人工発声器（ヴォーカルボックス）」を埋め込んでいるウェイストランドらしいサイボーグです。</p><h2>Fallout TVシリーズ</h2><p>マキシマスが破壊されたT-60パワーアーマーの部品を修理してもらうために彼女の店を訪れます。<br>彼女は修理代として「5キャップ」を要求しますが、手持ちが4キャップしかなかったマキシマスは値切ろうとしました。しかし彼女はそれを断固として拒否しました。<br><br>その後、歯医者で自らの歯を引っこ抜いて売るというウェイストランドらしい方法で足りない1キャップを稼いだマキシマスが再びやってきて、「チップを弾むから急いでくれ」と言われると、彼女は部品を素早くバーナーで溶接して修理を完了させました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>頬に機械（ボイスボックス）を入れたサイボーグの修理屋のお姉さんです。<br><br>「歯を抜いて金を稼ぐ」という狂った方法でキャップを手に入れて戻ってきたマキシマスに対して、淡々と修理をこなし「ご贔屓に」と一言だけ述べるクールな商売人です。こういった「一見どうでもいいモブのビジュアルがいちいちイカしている」のがFalloutドラマの最高なところですね。</div>',
        post: 'フィリーのサイボーグ修理屋「ジャミラ」のロア記事を公開しました！🔧\n頬に人工発声器のインプラントを埋め込んでいるクールなお姉さんです。T-60の部品修理を値切ろうとするマキシマスを冷たくあしらい、彼に「自分の歯を抜いて売る」という狂った金策を走らせた原因でもあります。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/jamila.html'
    },
    {
        id: 'janey-howard',
        enName: 'Janey Howard',
        jpName: 'ジェイニー・ハワード',
        rawFile: 'janey_howard_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: '不明（大戦前）' },
            { label: '役割', value: 'クーパーの娘' }
        ],
        bodyHtml: '<p>ジェイニー・ハワード（Janey Howard）は、大戦前のハリウッドスターである「クーパー・ハワード（グール）」と、Vault-Tecの重役である「バーブ・ハワード」の間に生まれた一人娘です。Fallout TVシリーズのシーズン1における核戦争前の回想シーンに登場します。</p><hr><h2>背景</h2><p>2065年4月14日生まれ。<br>両親の離婚後、ジェイニーは父親であるクーパーと過ごす時間が多くなり、仕事（ギグ）の手伝いなどをしていました。<br><br>2077年10月23日、12歳のジェイニーは父親と一緒にロサンゼルス（ボーンヤード）周辺の誕生日パーティーの余興に参加していました。その際、彼女は父親から「核爆発のキノコ雲が親指よりも小さければ逃げられる」という親指を使った判別法（Vaultボーイのポーズの由来）を教わりました。<br>そして直後に、彼女はそのパーティー会場から「ロサンゼルスに核ミサイルが降り注ぐ（グレート・ウォーの開戦）」の光景を世界で最初に目撃した一人となりました。<br>崩壊するロサンゼルスの中、彼女は父親のクーパーとともに馬に乗り、生き残るために安全地帯へと逃亡しました。</p><h2>現在</h2><p>2296年現在、グールとなったクーパーは「彼女（と元妻のバーブ）を探し出すこと」を最大の目的としてバウンティハンターを続けています。<br>Vault-Tecの「良好な管理組織」の一員として娘のジェイニーがVaultの中に匿われていると信じているからです。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ドラマの第1話の冒頭、まさに「世界の終わり」の瞬間に立ち会った12歳の少女です。<br><br>「パパ、なんで親指を立てるの？」という彼女の無邪気な質問が、後々になって絶望的な光景と共に回収されるのはドラマ屈指の名シーンです。現在（2296年）彼女が生きているのか、それともグールとなっているのかはシーズン2の最大の関心事の一つですね。</div>',
        post: '「ジェイニー・ハワード」のロア記事を公開しました！👧\nクーパー・ハワード（グール）の最愛の一人娘です。\n第1話の冒頭、世界の終わりである「最終戦争（グレートウォー）」をロサンゼルスの丘から目撃してしまった少女でもあります。果たして現在、彼女は生きているのでしょうか？\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/janey-howard.html'
    },
    {
        id: 'janice-tv-series',
        enName: 'Janice (TV series)',
        jpName: 'ジャニス',
        rawFile: 'janice__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間（故人）' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault-Tec' },
            { label: '役割', value: '受付係' }
        ],
        bodyHtml: '<p>ジャニス（Janice）は、大戦前のVault-Tec本社で働いていた従業員（受付係）です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の第5話「The Wrangler」において、かつての「Vault-Tec本社（Vault-Tec headquarters）」のオフィスの受付デスクに座ったまま、白骨死体となって発見されます。<br>かつて彼女を知る人物（ピート等）からは、「彼女はいつもゴマすり（kiss-ass）だった」と評されています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2の回想、あるいは舞台としての廃墟の探索で登場する（白骨死体）と思われるVault-Tecのモブ社員です。<br><br>Falloutのゲームでは定番となっている「オフィスのパソコンに残された愚痴ホロテープやターミナルの記録によって、戦前の社員たちの嫌な人間関係を知る」というお決まりのパターンである可能性が高そうですね。</div>',
        post: '大戦前のVault-Tec社員「ジャニス」のロア記事を公開しました！💀\nシーズン2に登場する人物（白骨死体）です。かつてはVault-Tec本社の受付嬢であり、同僚からは「おべっか使いのゴマすり野郎」と嫌われていたという、Falloutのターミナルあるあるのような設定を持っています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/janice-tv-series.html'
    },
    {
        id: 'javin',
        enName: 'Javin',
        jpName: 'ジャビン',
        rawFile: 'javin_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: '無所属' },
            { label: '役割', value: '人食い（カニバル）' }
        ],
        bodyHtml: '<p>ジャビン（Javin）は、ロサンゼルス一帯の荒野をうろついている人食い（カニバル）のウェイストランダーです。Fallout TVシリーズのシーズン1第5話に登場します。</p><hr><h2>背景</h2><p>ジャビンとリンクの2人組は、無害な旅行者を装って相手を油断させ、近づいてきたところを襲って食い殺すという性質の悪いカニラブルたちです。<br>彼は弾丸の代わりに「腐った人間の歯」を撃ち出すよう改造された手製のジャンクリボルバーを持ち歩いています。</p><h2>Fallout TVシリーズ</h2><p>タデウスを追ってシェイディ・サンズの廃墟近くにある鉄道橋を渡ろうとしたルーシーとマキシマスの前に現れました。<br>彼らは「我々は非武装だ」と言い張り、反対側から橋を渡ろうと近付いてきました。人の善意を信じるルーシーは武器をしまって歩み寄ろうとしましたが、マキシマスは彼らが背中に武器を隠していることにすぐに気がついていました。<br>すれ違う瞬間、ジャビンたちは本性を現してルーシーたちに襲いかかろうとしましたが、ウェイストランドの掟に慣れているマキシマスに即座に返り討ちに（頭を撃ち抜かれて）殺害されました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>「油断させて近付いてきて殺す」タイプのレイダー（カニバル）です。<br><br>このシーンでは、Vaultの理想主義で人を信じてしまうルーシーと、荒野の現実を熟知しているマキシマスの見事な「価値観の違い」が描かれています。彼が使っていた「弾の代わりに人間の歯を撃ち出すリボルバー」というのは、いかにもパイプウェポンのようなジャンク武器でとても良いですね。</div>',
        post: '人食いのレイダー「ジャビン」のロア記事を公開しました！🍖\n第5話で鉄道橋を渡っていたルーシーたちに「非武装だ」と嘘をついて騙し討ちをしようとした小悪党です。弾丸の代わりに「腐った人間の歯」を撃ち出す手製のリボルバーを持つ、いかにもウェイストランドらしいイカれた連中です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/javin.html'
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
