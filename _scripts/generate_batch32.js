const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'nick-the-prick',
        enName: 'Nick the Prick',
        jpName: 'ニック・ザ・プリック',
        rawFile: 'nick_the_prick_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'グレート・カーンズ / ハンク' },
            { label: '役割', value: 'リーダー' }
        ],
        bodyHtml: '<p>ニック・ザ・プリック（Nick the Prick）は、モハビ・ウェイストランドのレイダー集団「グレート・カーンズ（Great Khans）」のメンバーであり、集団のリーダーです。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Innovator」などのエピソードに登場します。<br>2296年時点において、彼が率いるグレート・カーンズは、かつてNCRの支配下にあった（『Fallout: New Vegas』などで知られる）モハビの居住地「ノバック（Novac）」のダイノバイト・モーテルを占拠しており、建物をカーンズの旗や落書きで彩っています。<br><br>ノバックに到着したルーシーやグールと対峙することになり、彼はグールによって部下たちを次々と殺害されますが生き延びます。しかしその後、ハンク・マクレーンによって捕らえられ、脳内チップを埋め込まれたことで、Vault-Tecの「忠実なオフィスワーカー」として洗脳されてしまいます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ドラマ版シーズン2でついに登場した「グレート・カーンズ」のリーダーです。<br><br>彼らがノバックを占拠しているという事実だけでもモハビの勢力図の変遷が伺えて非常に興奮しますが、あろうことかあのVault-Tec（ハンク）によって頭にチップを埋め込まれ、笑顔の奴隷にされてしまうという皮肉な展開が待っているようです。</div>',
        post: '「ニック・ザ・プリック」のロア記事を公開しました！🦖\nシーズン2で登場する、あの「グレート・カーンズ」のリーダーです。彼のグループはモハビの「ノバック（Novac）」を取り仕切っているようですが、最終的にはハンクの洗脳チップによって従順なオフィス・ワーカーにされてしまうという最悪の展開が待っています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/nick-the-prick.html'
    },
    {
        id: 'norm-maclean',
        enName: 'Norm MacLean',
        jpName: 'ノーム・マクレーン',
        rawFile: 'norm_maclean_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 33' },
            { label: '役割', value: '居住者' },
            { label: 'SPECIAL', value: '3,8,4,4,9,6,6' }
        ],
        bodyHtml: '<p>ノーマン・"ノーム"・マクレーン（Norman "Norm" MacLean）は、Vault 33の居住者であり、主人公ルーシー・マクレーンの弟、ハンク・マクレーンの息子です。Fallout TVシリーズのシーズン1のVaultパートにおける主人公とも言えるキャラクターです。</p><hr><h2>背景</h2><p>父親譲りの前向きな性格や正義感にあふれた姉のルーシーとは対照的に、Vaultの単調な日々や与えられた役割に対してシニカルで無気力な青年として育ちました。<br>あらゆる仕事に対して熱意を持てず、様々なセクション（掃除係や調理場など）をたらい回しにされていましたが、実は非常に高い知能と観察力を持っています。</p><h2>Fallout TVシリーズ</h2><p>第1話でのVault 32のレイダーたち（モルデイヴァー一行）による襲撃と父の誘拐事件以降、ルーシーが父を探すために地上へ旅立ったのとは対照的に、ノームは「レイダーたちはどうやってVault 32に入ってきたのか？」「なぜドアを開けた記録がないのか？」という根本的な疑問を抱き、従兄弟のチェットを巻き込んでVault内部での独自の調査を開始します。<br><br>新しく監督官となったベティ・ピアソンに表面上は従うふりをしつつも、彼は誰もいないVault 32に潜入し、居住者たちが数年前の時点で「自生した争い（あるいはVaultの恐ろしい真実を知ったことによる自暴自棄）」で全滅していたこと、そして外部からレイダーが入るための扉は「Vault 33の端末から（おそらく父親であるハンクによって）意図的に開けられた」という事実を突き止めます。<br><br>シーズン1の終盤、第8話にて彼はついにVault 31への侵入に成功。そこで「バドの脳みそ（Bud. Vault-Tecの経営幹部）」と大量の冷凍睡眠ポッドを目撃し、「Vault 31の居住者（経営陣）が、32と33の住民（優良な遺伝子を持つ社員候補）を交配させて次の中間管理職を生み出す」というVaultの真の目的を知りますが、バドによってVault 31の中に閉じ込められてしまい、冷凍睡眠ポッドに入るか饿死するかの選択を迫られるところでシーズンが終了します。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>最初は無気力ですぐに逃げ出すだけの情けない青年に見えましたが、回を追うごとにその高いIntelligenceとPerceptionによってVault 33最大の謎を解き明かしていく、Vaultパートにおける最高の主役です。<br><br>「事なかれ主義」の大人たちに隠された『Vault-Tec』の恐ろしい真実を知ってしまった彼が、シーズン2でバドの罠からどう抜け出すのかが非常に楽しみです。</div>',
        post: 'ルーシーの弟「ノーム・マクレーン」のロア記事を公開しました！🔎\nVaultの単調な生活に無気力だった青年ですが、事件をきっかけに鋭い観察力でVault 31/32/33の恐るべき真実に誰よりも早く気付いてしまう、Vault側の主人公です。彼なくしてドラマの謎解きは成り立ちませんでした。（SPECIALのIntelligenceは驚異の9！）\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/norm-maclean.html'
    },
    {
        id: 'nose-edmundson',
        enName: 'Nose Edmundson',
        jpName: 'ドクター・"ノーズ"・エドモンドソン',
        rawFile: 'nose_edmundson_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 4' },
            { label: '役割', value: '医師' }
        ],
        bodyHtml: '<p>ドクター・"ノーズ"・エドモンドソン（Dr. "Nose" Edmundson）は、Vault 4の常駐の開業医（クリニシャン）です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第6話のVault 4内で、彼はおそらく自らの変異が原因で「額にもうひとつの鼻がある」という特徴的な外見をしています。<br>彼は治療に訪れたマキシマスの右腕から歯を抜き取り、ステープラー（ホッチキス）で傷口を塞ぐという、Vault環境に特有の荒っぽい（しかし手慣れた）医療技術を披露します。<br><br>後に、彼がシャワーキャップを外しているときにルーシーが見とれてしまい、二つの鼻を凝視されるというシーンがありますが、彼は気を悪くすることなく優しく微笑み、Vault 4のコミュニティがいかに変異者たちを受け入れているかを無言で示していました。<br><br>また、ルーシーがレベル12の実験区域に侵入した際にも、カルテをチェックして「ポッドの一つが空いている」ことを懸念している姿が描かれています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Vault 4のかつての恐ろしい実験の被害者たち（あるいはその子孫）の一人ですが、Vault 4が地上からの避難民を受け入れたことで、現在は非常に平和で善意に満ちたコミュニティの一員として生きています。<br><br>グロテスクな見た目に反して、彼のエピソードはVault 4の人々の暖かさを象徴していました。</div>',
        post: '額に二つの鼻を持つ医師「"ノーズ"・エドモンドソン」のロア記事を追加しました！👃\nVault 4の変異した住人の一人です。少しグロテスクな外見ですが、彼がルーシーに優しく微笑むシーンは、かつて非人道的な実験の場だったVault 4が「変異者や生き残りを分け隔てなく受け入れる優しいコミュニティ」になった事を示す名シーンです。 \n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/nose-edmundson.html'
    },
    {
        id: 'old-woman-gretch',
        enName: 'Old Woman Gretch',
        jpName: '老婆のグレッチ',
        rawFile: 'old_woman_gretch_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'ウェイストランダー' },
            { label: '役割', value: '料理屋の店主' }
        ],
        bodyHtml: '<p>老婆のグレッチ（Old Woman Gretch）は、モハビ・ウェイストランドの片隅で小さな食事処を営んでいる高齢の女性です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Innovator」にて、ルーシーとグールが彼女の店を訪れます。<br>彼女の店で「ノミのスープ（flea soup）」を買って食べたルーシーは、父親のハンクの行方について手掛かりを尋ねます。するとグレッチは「ハンクがここを通って、私の息子をガイドとして連れて行ったんだよ」と語ります。<br><br>ただし、彼女が悲しんでいたのは息子がいなくなったことではなく、「（息子から）借金を取り立てる前にいなくなりやがった」ということでした。<br>後にルーシーとグールがVault 24でその息子を発見した時、息子は既にハンクの手によって脳にチップ（通信機能付きの爆弾）を埋め込まれており、「ルーシーへの伝言」を伝えるスピーカー代わりとして利用され、最後には頭を吹き飛ばされるという悲惨な最期を迎えます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2の冒頭でルーシーたちに「ハンクがモハビで恐ろしい企みを進めていること」を示唆する手掛かりを与える老婆です。<br><br>それにしても、息子の命よりも貸したお金を気にするウェイストランドの老婆と、その息子を平気で伝言用の自爆ドローンのように使い捨てるハンクの恐ろしさなど、シーズン2もFalloutらしいブラックジョークと無慈悲さがたっぷり詰まっています。</div>',
        post: '「老婆のグレッチ（Old Woman Gretch）」のロア記事を公開しました！🍲\nシーズン2でモハビ・ウェイストランドの片隅で「ノミのスープ」を売っている老婆です。ハンク・マクレーンに息子をガイドとして連れ去られてしまいましたが、本人は息子の安否より「借金が回収できなくなったこと」を悔やんでいるという、典型的なFalloutの住人です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/old-woman-gretch.html'
    },
    {
        id: 'party-guest',
        enName: 'Party guest',
        jpName: 'パーティー客',
        rawFile: 'party_guest_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '様々' },
            { label: '所属', value: 'Vault-Tec' },
            { label: '役割', value: '客（社員など）' }
        ],
        bodyHtml: '<p>パーティー客（Party guests）は、大戦前のアメリカにおけるVault-Tecなどの関係者たちです。Fallout TVシリーズに登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第6話の「The Trap」などに登場します。クーパー・ハワードの邸宅で開催されている、Vault-Tecのプロモーション撮影完了を祝うパーティー（ラップ・パーティー）に参加している人々で、その大半はVault-Tecの社員たち（バド・アスキンスを含む）や撮影スタッフ、業界の関係者たちです。<br><br>クーパーが彼らの中を歩いていく際に参加者の一人が「アンカレッジでの交渉がVaultの事前販売に深刻な影響を与えているよ…」と漏らすなど、Vault-Tecが戦争の長期化（あるいは不安）をビジネスに直接利用している様子が断片的な会話から聞こえてきます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>豪華絢爛な戦前のアメリカのパーティー客です。<br><br>彼らの会話の端々から、世界の終わりを前にしても「ビジネスの売り上げ」にしか関心がない資本主義の行き着く先や、迫りくる戦争の影をヒントとして感じ取ることができます。</div>',
        post: '大戦前の「パーティー客」たちのロア記事を追加しました！🍾\nクーパーの大邸宅で開催された、Vault-Tecの宣伝用映像が完成した際の打ち上げパーティーの客たちです。すれ違いざまの彼らの会話から「アンカレッジの情勢が販売モデルにいかに影響するか」など、戦前の生々しいビジネスの裏側が聞こえてきます。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/party-guest.html'
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
