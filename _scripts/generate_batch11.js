const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'chet-tv-series',
        enName: 'Chet (TV series)',
        jpName: 'チェット',
        rawFile: 'chet__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 33 / Vault 32' },
            { label: '役割', value: 'ゲートキーパー（元）' }
        ],
        bodyHtml: '<p>チェット（Chet）は、Fallout TVシリーズの登場人物で、Vault 33の居住者です。後にVault 32へと移住しました。</p><hr><h2>背景</h2><p>チェットはVault 33で生まれ育ちました。父親の名前は彼と同じ「チェット・ジュニア」です。主人公であるルーシー・マクレーンの従兄弟にあたります。<br>ルーシーが2296年にマリアージュ（政略結婚）する前までは、彼女と10年にわたって肉体関係を持っていました（いとこ同士のためVault内での婚姻は制限されています）。チェット自身はルーシーに対して強い好意を抱いていましたが、ルーシーの探求心や行動力に引きずられる形で外の世界（あるいはVault外での冒険）に関わることを恐れ、ルーシーの旅立ちを止めるよう説得を試みたりもしました。</p><h2>その後の動向</h2><p>レイダーたちの襲撃事件後、ステフの夫であるバートが死んだことにより、ステフは精神的に不安定になりながらも出産を迎えます。<br>気弱で押しに弱いチェットは、力強いステフに押し切られる形で彼女のパートナーになり、彼女の赤ん坊の面倒を見ることになります。<br>その後、Vault 32に移住した居住者たちの中で、ステフが新たなVault 32のオーヴァーシアであるベティ・ピアソンの腹心となっていく中、チェットは「主夫」のように扱われ、半ば不本意な形で家族関係を築いていくことになります。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>気弱なルーシーのいとこであり、作中でも終始「巻き込まれ体質」の男です。<br><br>Vaultの外の危険を極度に恐れ、安定を求めるいかにもなVault居住者気質ですが、ステフという凶暴な「Vault 31の女」に捕まってしまい尻に敷かれている様子は哀愁を誘います。彼の運命がシーズン2でどうなるのか気になるキャラクターです。</div>',
        post: 'ルーシーのいとこであり、気弱なVault 33居住者「チェット」のロア記事を公開しました！👤\nルーシーの旅立ちに反対し、その後はステフの尻に敷かれて赤ん坊の面倒を（不本意ながら）見続けるという、なんだか可哀想だけどちょっと笑えるキャラクターです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/chet-tv-series.html'
    },
    {
        id: 'chet-jr',
        enName: 'Chet Jr.',
        jpName: 'チェット・ジュニア',
        rawFile: 'chet_jr__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 33 / Vault 32' },
            { label: '役割', value: '赤ん坊' }
        ],
        bodyHtml: '<p>チェット・ジュニア（Chet Jr.）は、ステフと（亡き）バートの間に生まれた赤ん坊です。Vault 33で生まれ、のちにVault 32へと移りました。</p><hr><h2>背景</h2><p>レイダーの襲撃による混乱の最中、夫のバートを失ったステフから生まれました。<br>その後、ステフの力強い押しによって、気弱なチェットがこの赤ん坊の世話を焼くことになりました。チェットがいつも抱いて世話をしていたため、他の居住者たちから勝手に「じゃあ名前はチェット・ジュニアだな」と呼ばれ始めます。<br>チェット本人は「亡き父と同じ名前であり、個人的すぎる」として嫌がっていましたが、母親のステフが面倒くさがって「それでいいわ」と承諾してしまったため、正式に「チェット・ジュニア」という名前になってしまいました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ステフの赤ん坊です。<br><br>「いつもチェットが世話をしてるからチェット・ジュニアでいいだろ」というVault居住者たちの適当さと、それに折れるチェットの扱いの低さが笑える小ネタ設定ですね。</div>',
        post: 'ステフの赤ん坊「チェット・ジュニア」のロア記事を公開しました！🍼\n彼の実の父親はバートですが、チェットが世話を焼かされていたせいで適当に名付けられてしまったという、チェットの不憫さを強調するキャラ設定が光ります。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/chet-jr.html'
    },
    {
        id: 'chet-jr-mentioned',
        enName: 'Chet Jr. (mentioned)',
        jpName: 'チェット・ジュニア（チェットの父）',
        rawFile: 'chet_jr___mentioned__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 33' },
            { label: '役割', value: '居住者（故人）' }
        ],
        bodyHtml: '<p>チェット・ジュニア（Chet Jr.）は、Vault 33におけるチェットの父親であり、ローズ・マクレーン（ハンクの妻・ルーシーの母）の兄弟にあたる人物です。本編時点では既に故人です。</p><hr><h2>背景</h2><p>数年前、Vault 33のプランテーションで発生した「ゾウムシ（Weevil）による飢饉」の際に深刻な食糧難に陥り、彼は餓死してしまいました。<br>息子のチェットは、自分の父親が衰弱して餓死していく姿を目の当たりにしており、その時の光景が深い心の傷として残っています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>チェットの父親であり、Vault内での過去の食糧難の悲惨さを物語る設定上の人物です。<br><br>Vault 33のような恵まれた環境であっても、「ゾウムシの異常発生」などのトラブル一つで餓死者が出兼ねないという、完全閉鎖環境であるVaultの脆さが伺えますね。</div>',
        post: 'チェットの亡き父親「チェット・ジュニア（チェットの父）」のロア記事を公開しました！🌾\n過去にVault 33で起きた「ゾウムシによる飢饉」で餓死してしまった人物。完全閉鎖環境のVaultにおいても、食糧不足がいかに死活問題であるかを物語る設定です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/chet-jr-mentioned.html'
    },
    {
        id: 'chicken-collector',
        enName: 'Chicken collector',
        jpName: '鶏集めの男',
        rawFile: 'chicken_collector_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'なし' },
            { label: '役割', value: '養鶏業者' }
        ],
        bodyHtml: '<p>鶏集めの男（Chicken collector）は、かつてのロサンゼルス広域にあたるウェイストランドで生活している農夫であり、鶏（チキン）を育てて生計を立てています。</p><hr><h2>Fallout TVシリーズ</h2><p>第2話「ターゲット」にて登場します。<br>彼がインチキ薬売り（Snake oil salesman）を酷く殴りつけ、悲鳴を上げさせていたところに、パワーアーマーを着たマキシマスが通りかかります。<br>マキシマスは弱きを助けるB.O.S.の騎士（のフリ）として介入し、養鶏業者からインチキ薬売りを助け出しました。<br>しかし自由の身になった薬売りが逃げ去った後、養鶏業者は悲痛な声で「<b>あいつ、俺の鶏を犯しやがったんだぞ！</b>（The guy was fucking my chickens）」とマキシマスに叫びます。<br>事実を知ったマキシマスは気まずそうに、ただ「仕事を続けろ」と言い残してその場を去りました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ウェイストランドの異常なモラルと、マキシマスの「ヒーロー願望」をへし折る象徴的なコメディシーンに登場するおじさんです。<br><br>「助けた弱者が実はとんでもない変態野郎だった」というFalloutらしい強烈なブラックジョークは視聴者に強い印象を残しました。</div>',
        post: 'インチキ薬売りをボコボコにしていた養鶏家「鶏集めの男」のロア記事を公開しました！🐔\nマキシマスが助けた弱者が、実は「鶏を犯したというとんでもない変態だった」というFallout屈指のブラックジョークシーンに登場する人物です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/chicken-collector.html'
    },
    {
        id: 'chloe-glass',
        enName: 'Chloe Glass',
        jpName: 'クロエ・グラス',
        rawFile: 'chloe_glass_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: 'ジュニア・エグゼクティブ' }
        ],
        bodyHtml: '<p>クロエ・グラス（Chloe Glass）は、大戦前のVault-Tec社におけるジュニア・エグゼクティブであり、現在はVault 31で冷凍保存されている人物です。</p><hr><h2>背景</h2><p>クロエは、バド・アスキンスが主導するエグゼクティブ・アシスタント訓練プログラム「バズ・バッズ（Bud\'s Buds）」に選抜された若手社員の一人です。この計画は、最終戦争によってVault-Tec社の競争相手がすべて消滅した後の世界において、人類の未来を形作る「スーパーマネージャー」を育成することを目的としていました。</p><p>クロエや他の「バッズ」たちはVault 31で冷凍保存（クライオスタシス）されており、バド・アスキンスの管理下で定期的に解凍され、Vault 32やVault 33の居住者の管理や、管理された繁殖（優生学）の相手として派遣される手はずとなっていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ケイシーやチェイスたちと同じく、Vault 31の冷凍ポッドで眠る「バズ・バッズ」のメンバーの一人です。<br><br>Vault 31のポッド組は背景が全員共通であるため本編での直接の登場はありませんが、いずれ彼らが目を覚まし、マクレーン一家に関わってくる可能性はゼロではありません。</div>',
        post: 'Vault 31で冷凍睡眠についているVault-Tec社の若手幹部候補生「クロエ・グラス」のロア記事を公開しました！❄️\n彼女もまたバドの人材育成プログラム「バズ・バッズ」のメンバーであり、時がくれば解凍されてVaultを管理する運命にあります。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/chloe-glass.html'
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
