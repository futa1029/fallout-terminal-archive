const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'reg-mcphee',
        enName: 'Reg McPhee',
        jpName: 'レグ・マクフィー',
        rawFile: 'reg_mcphee_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 33' },
            { label: '役割', value: '評議会議員' },
            { label: '教育', value: 'イベント企画博士' }
        ],
        bodyHtml: '<p>レグ・マクフィー（Reg McPhee）は、Vault 33の居住者であり、Vault 33の評議会（カウンシル）メンバーの一人です。Fallout TVシリーズのシーズン1に登場します。<br>イベント企画の博士号（Doctor of Event Planning）という、Vault特有の奇妙な学位を持っています。</p><hr><h2>背景</h2><p>彼は限られた人数のVault内で世代交代を繰り返した結果生まれた「近親交配の産物（Product of inbreeding）」の一人です。彼自身はそのコンプレックスを乗り越えたと語っています。<br>2296年頃には、監督官ハンクの元で、ベティ・ピアソン、ウッディ・トーマスと共にVault 33の政治的決定を下す3人の評議会メンバーの一人となっていました。</p><h2>Fallout TVシリーズ</h2><p>レイダー襲撃事件によってハンクが誘拐された後、彼は他の評議会メンバーらと共に暫定的な共同統治を行いややこしい民主的プロセス（あるいはその真似事）を主導しますが、最終的にはベティが新たな監督官に選出されたことで、再び彼女に従うことになります。<br><br>また、捕らえられたレイダーの処遇を巡って「血祭りにあげるべきだ」という居住者たちの過激な意見に対し、彼ら評議会は「更生プログラムによって彼らを善良な市民に教育する」という非現実的で平和ボケしたVault-Tecの理念を曲げずに実行しようとします。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Vault 33の平和ボケした「事なかれ主義」の大人たちを体現するようなキャラクターです。<br>「イベント企画の博士号」を持っているという絶妙なまでの役立たず感や、近親交配による遺伝子プール問題というFalloutにおけるVaultのリアルな課題の犠牲者でもあります。</div>',
        post: 'Vault 33の評議会議員「レグ・マクフィー」のロア記事を公開しました！📋\n監督官ハンクの誘拐後にVaultの運営を任されたものの、「イベント企画の博士号」しか持っていないため、平和ボケした非現実的な判断ばかり下してしまうVaultの大人たちの象徴です。実は「近親交配」による遺伝子問題の被害者でもあります。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/reg-mcphee.html'
    },
    {
        id: 'reporter-tv-series',
        enName: 'Reporter (TV series)',
        jpName: 'リポーター',
        rawFile: 'reporter__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'ギャラクシー・ニュース・ネットワーク' },
            { label: '役割', value: 'ジャーナリスト' }
        ],
        bodyHtml: '<p>リポーター（Reporter）は、2077年の大戦直前において「ギャラクシー・ニュース・ネットワーク（GNN）」のために働いていたジャーナリストです。Fallout TVシリーズの世界観を紹介するスピンオフ・プロモーション特別番組などで描かれます。</p><hr><h2>背景</h2><p>彼はアンカレッジ戦役におけるアメリカの勝利（2077年1月10日）の一週間後に行われた、最新鋭の地下シェルター「Vault 33」の一般公開イベントの生中継を担当しました。<br>本来はニュースの現場リポートを得意としていましたが、生放送特有のトラブルや、使えないインターンのアーノルドのミスによって放送事故ギリギリの状況に陥り、だんだんとパニック状態になっていきます。<br><br>その後、Vaultツアーの最中に彼もアーノルドと一緒にVault 33に入ることになり、取材を続けていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Falloutの公式プロモーション番組に登場した、GNN（ゲームでおなじみのギャラクシー・ニュース・ラジオの母体）のリポーターです。<br>アメリカが共産主義との戦争のストレスで社会的に病んでいる大戦前の狂騒をレポートしてくれました。</div>',
        post: 'GNNの戦前の「リポーター」のロア記事を追加しました！🎙️\nドラマ版のプロモーション番組にて、2077年当時の「Vault 33完成披露ツアー」の生中継レポートを担当していたGNN（ギャラクシー・ニュース・ネットワーク）のジャーナリストです。使えないインターンのせいで放送中にパニックになっていく様子が面白かったです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/reporter-tv-series.html'
    },
    {
        id: 'rex-tv-series',
        enName: 'Rex (TV series)',
        jpName: '保安官レックス',
        rawFile: 'rex__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'ガバミント' },
            { label: '役割', value: '保安官' }
        ],
        bodyHtml: '<p>保安官レックス（Sheriff Rex）は、ソレル・ブッカーが自称大統領として支配する組織「ガバミント（the Govermint）」の保安官の一人です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第6話のスーパーウルトラ・マーケットでの一連の騒動の後、彼は同僚の保安官トロイと共に駆けつけ、「臓器密売人を殺して商品を台無しにした」としてグール（クーパー・ハワード）を逮捕し、自分たちのトップであるソレル・ブッカー大統領の元（BBQシャック）へと連行しました。<br><br>しかし、グールがその程度の拘束で大人しくしているはずもなく、最終的には拘束を解いたグールによってトロイと共に返り討ちに遭い、死亡しました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>彼らが着ている「Sheriff uniform」は、旧作（Fallout 3やNew Vegas）でプレイヤーが着ていたものとよく似ています。<br>法が存在しないウェイストランドで、勝手に政府（Govermint）を名乗るレイダー紛いの集団の治安維持要員という、非常にFalloutらしい存在です。</div>',
        post: 'ガバミントの「保安官レックス」のロア記事を公開しました！🤠\nソレル・ブッカーが自称大統領を務めるインチキ組織「ガバミント」の二人組保安官の一人です。スーパーウルトラ・マーケットでグールを逮捕して大統領の元へ連行するまでは良かったのですが、逆に拘束を解いたグールに返り討ちにされて弾肉となってしまいました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/rex-tv-series.html'
    },
    {
        id: 'riley-tv-series',
        enName: 'Riley (TV series)',
        jpName: 'ナイト・ライリー',
        rawFile: 'riley__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'B.O.S. (サンフェルナンド支部)' },
            { label: '役割', value: 'ナイト' }
        ],
        bodyHtml: '<p>ナイト・ライリー（Knight Riley）は、B.O.S.（ブラザーフッド・オブ・スティール）のサンフェルナンド支部に所属するナイトの一人です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Golden Rule」などのエピソードに登場します。<br>エリア51（Area 51）の倉庫内において、仲間と一緒に「プラズマ・グレネード（Plasma grenade）」をお手玉のように放り投げて遊んでいる姿が描かれます。マキシマスからは「そんなこと気安くするな」と警告を受けていますが、気にしていない様子です。<br><br>別のエピソード（「The Strip」）では、ヘルメットを脱いだ負傷した姿の彼が描かれており、B.O.S.のニューベガスでの作戦において何らかの戦闘に巻き込まれたことが示唆されています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>エリア51という超重要拠点（宇宙人関連のロアでおなじみ）で、プラズマ兵器でキャッチボールして遊ぶという、いかにもB.O.S.の血気盛ん（かつ少し頭の足りない）若いナイトらしいキャラクターです。<br><br>ニューベガスのストリップ地区での戦闘に参加しているようなので、シーズン2ではNCRや他の勢力との激しい戦闘が待っていそうです。</div>',
        post: 'B.O.S.の「ナイト・ライリー」のロア記事を追加しました！🛡️\nシーズン2に登場するB.O.S.の若きナイトです。驚くべきことに、あの「エリア51」の倉庫内で仲間のナイトとプラズマ・グレネードでキャッチボールして遊んでいるという、死亡フラグの塊のような兵士です。ニューベガスの戦いにも参加するようです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/riley-tv-series.html'
    },
    {
        id: 'rink',
        enName: 'Rink',
        jpName: 'リンク',
        rawFile: 'rink_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'カニバル / ウェイストランダー' },
            { label: '役割', value: '追い剥ぎ' }
        ],
        bodyHtml: '<p>リンク（Rink）は、2296年のロサンゼルス周辺（シェイディ・サンズの廃墟付近）をうろついているウェイストランダーの女性です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第5話にて、相棒のジャヴィン（Javin）と共に、サディアスを追跡中のルーシーとマキシマスが一本橋を渡ろうとしていたところに反対側から現れました。<br>彼女たちは「自分たちは非武装の気弱な旅行者だ」と装い、お互いにすれ違おうと提案します。平和ボケしているルーシーはあっさりと信じますが、ウェイストランド育ちのマキシマスは当然のごとく彼女たちの嘘と隠し持っていた武器（自家製のパイプピストルなど）を見抜いていました。<br><br>橋の真ん中で彼女とジャヴィンはやはり本性を現し、マキシマスたちに発砲します。さらに驚くべきことに、彼らの銃は「腐った人間の歯（Rotten teeth）」を弾丸として撃ち出すという代物であり、彼らが単なる追い剥ぎではなく「カニバル（人食い）」であることが明確に示されます。<br><br>しかし、パワーアーマーはおろかVaultスーツの下のコンバットアーマーすら貫通する威力が無く、マキシマスは全く気にも留めずに彼らを撃ち殺し、死体を橋の下へ投げ捨てました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ジャンクジェットの代わりにパイプ銃で「人間の歯」を発射するという、とんでもない発想と生活感（カニバル）を持ったウェイストランドのモブレイダーです。<br><br>ルーシーのVault育ちの甘さと、マキシマスのウェイストランド人としての経験値の差、そして「油断しなければなんの脅威でもない雑魚敵」というFalloutあるあるを見事に描いた最高のすれ違いシーンでした。</div>',
        post: '人間の歯を撃ち出してくるイカれた追い剥ぎ「リンク（Rink）」のロア記事を公開しました！🦷\n橋の上で非武装の旅行者を装ってルーシーたちを騙討ちしようとしたカニバルです。「人間の歯」を弾丸として手製のパイプピストルから発射しますが、アーマーには傷一つ付けられず、マキシマスに呆気なく返り討ちにされ橋から投げ捨てられました。 \n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/rink.html'
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
