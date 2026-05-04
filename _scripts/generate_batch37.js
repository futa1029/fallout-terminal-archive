const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'ronda-spencer',
        enName: 'Ronda Spencer',
        jpName: 'ロンダ・スペンサー',
        rawFile: 'ronda_spencer_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: '大戦前のアメリカ' },
            { label: '役割', value: '主婦' }
        ],
        bodyHtml: '<p>ロンダ・スペンサー（Ronda Spencer）は、2077年の大戦直前のアメリカに暮らしていた主婦です。Fallout TVシリーズのシーズン1（第1話）のドラマ全体のオープニングシーンに登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>ロサンゼルスのハリウッドヒルズにある大邸宅に住んでおり、夫のボブ・スペンサーと共に、愛息子であるロイの8歳の誕生日パーティー（2077年10月23日）を開催していました。<br><br>テレビではアンカレッジにおける和平交渉の決裂や深刻な社会不安、さらには大統領の失踪に関する臨時ニュースが流れていましたが、彼女は現実から目を背けるようにテレビの電源やラジオを切り、「今日は楽しいパーティーのことだけを考えましょう！」と他の主婦たちに呼びかけていました。<br><br>その後、遠くロサンゼルスの都市部に閃光が走り、巨大なキノコ雲が上がるのを目撃します。衝撃波が迫る中、彼女は息子を抱きかかえ、クーパーの馬に助けを求めようとするようなパニックの様子が描かれています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Falloutの実写ドラマ版における、「大戦が起こる10月23日当時のアメリカ社会のリアルな空気」を表現する重要なキャラクターです。<br><br>共産主義との果てしない戦争や、大統領失踪という世界的危機が起きていても、「見たくないニュースは見ない」とテレビを消して現実逃避する彼女の姿は、いつの日も変わらない人間の普遍的な愚かさと悲哀を感じさせます。</div>',
        post: '大戦当日に息子の誕生日パーティーを開いていた「ロンダ・スペンサー」のロア記事を公開しました！🎂\n第1話のオープニングに登場する主婦です。テレビから流れる大統領失踪や戦争の絶望的なニュースから目を背け、無理やり日常を維持しようとする彼女の姿は、核の炎に呑まれる直前のアメリカ社会の「現実逃避」を見事に表現していました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/ronda-spencer.html'
    },
    {
        id: 'ronnie-mccurtry',
        enName: 'Ronnie McCurtry',
        jpName: 'ロニー・マクカートリー',
        rawFile: 'ronnie_mccurtry_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: 'アシスタント（バズ・バッズ）' }
        ],
        bodyHtml: '<p>ロニー・マクカートリー（Ronnie McCurtry）は、大戦前のアメリカにおけるVault-Tecコーポレーションの若手社員であり、現在はVault 31で冷凍睡眠状態にあった「バズ・バッズ」のメンバーの一人です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>戦前のロサンゼルスにあったVault-Tec本社の社員であり、上級副社長であったバド・アスキンスのパーソナルアシスタントとして働いていた若者です。彼もまた、大戦後のVault-Tecによる支配の覇権を信じて疑わない狂信者であり、「バズ・バッズ」に選抜されてVault 31の冷凍ポッドに入りました。<br><br>シーズン2の回想シーンでは、同じ研修生であったクラークに対し、Vault-Tecの理念に反する場合は「殺すことも厭わない」という極端な冷酷さを見せるなど、バドの掲げる「スーパーマネージャー」という言葉の実態がいかにカルトじみた特権階級であったかを示しています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2では、戦前のVault-Tecにおける「出世組（Vault 31に入れる特権階級）」がいかに選ばれていたかの裏側が描かれるようです。<br><br>バドの計画に心酔し、会社の理想のためなら同僚をも処刑しようとするその姿は、ある意味でVaultの裏家業に完璧に適性があったと言えます。</div>',
        post: 'Vault 31の「バズ・バッズ」のメンバー「ロニー・マクカートリー」のロア記事を追加しました！🗄️\n戦前のVault-Tec本社でバドのアシスタントを務めており、同じプログラムに参加する若手社員の中でも一際「狂信的」で、会社に反発する同僚を平気で殺そうとする異常な特権意識を持った若者です。シーズン2での回想シーンで登場します。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/ronnie-mccurtry.html'
    },
    {
        id: 'roofus',
        enName: 'Roofus',
        jpName: 'ルーファス',
        rawFile: 'roofus_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: '鉛農家' },
            { label: '役割', value: '運び屋（モルデイヴァー関連）' }
        ],
        bodyHtml: '<p>ルーファス（Roofus）は、ウェイストランドで「鉛の農家（Lead farmer）」として生活しているアダムの三人の子供のうちの一角を担う（最も上の）息子です。Fallout TVシリーズのシーズン1に語られる設定上の人物として登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>ルーファス自身は作中で既に故人となっているため、姿は直接は登場しません。<br>第7話において、グールが彼の実家（鉛農場）を訪れた際、父親のアダムは「上の息子は2年前から『狂女（モルデイヴァー）』と関わるようになって、そこから音信不通だ」と語りました。<br><br>しかしグールは、モルデイヴァーを探す手掛かりとして、実はすでにこのルーファスを殺害していました。グールはルーファスの死体から「エンクレイヴの脱走者（ウィルギグ博士）の安全な輸送に対し、モルデイヴァーへキャップを支払う」という内容が書かれた手紙を回収していました。ただしその手紙の中心にはグールが彼を撃ち抜いた際の巨大な銃創（血の跡）があり、肝心のモルデイヴァーの隠れ家（グリフィス天文台）の場所が読めなくなっていました。<br><br>そのためグールは、彼の弟であるトミーを探し出し、トミーを撃ち殺して残りの手掛かりを得ることになります。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>エンクレイヴから逃げ出したウィルギグ博士を護衛するための「運び屋の手配」に関わっていたという、意外と作中の大きな影のキーパーソンです。<br><br>しかし、彼が大事な手紙を胸に持っていたせいで、グールの無慈悲な銃弾が手紙の肝心な部分を消し飛ばしてしまい、結果的に弟のトミーまで死ぬ羽目になるという最悪のピタゴラスイッチを引き起こしました。</div>',
        post: '「ルーファス」のロア記事を公開しました！✉️\n姿は見せず、グールによって既に殺害されていたという設定だけが登場する人物です。実はモルデイヴァーと関わっており、エンクレイヴの「ウィルギグ博士」の運び屋手配という超重要任務に関与していました。しかしグールの銃弾が彼の手紙の文字ごと吹き飛ばしてしまったことで、一族が悲惨な末路を迎えます。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/roofus.html'
    },
    {
        id: 'roy-spencer',
        enName: 'Roy Spencer',
        jpName: 'ロイ・スペンサー',
        rawFile: 'roy_spencer_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: '大戦前のアメリカ' },
            { label: '役割', value: '子供' }
        ],
        bodyHtml: '<p>ロイ・スペンサー（Roy Spencer）は、2069年生まれの大戦前のアメリカの少年です。Fallout TVシリーズのシーズン1（第1話）のオープニングで、すべての悲劇の幕開けとなるシーンに登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>彼が8歳の誕生日を迎える記念すべき日に行われた盛大なパーティーの日は、「2077年10月23日」でした。<br><br>彼はハリウッドヒルズにある自宅で、かつての西部劇の大スターであるクーパー・ハワードとその愛馬「シュガーフット」を招いての誕生日パーティーを楽しんでいました。クーパーの投げ縄トリックを見学したり、馬に乗って一緒に写真を撮ってもらったりと、幼い少年の無邪気な姿が描かれます。<br><br>しかし、彼が友達と一緒にテレビに夢中になっている間に、遠方のロサンゼルスの空に巨大な光の閃光が走りました。それが彼の大戦前の無邪気な子供時代の終わりの瞬間となりました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>「10月23日」が誕生日の男の子という、Fallout世界において最も残酷な星の下に生まれたキャラクターです。<br><br>彼を演じた子役の無垢な笑顔から一転し、遠くに次々と核爆弾のキノコ雲が上がり、街が消滅し、大人たちが我を忘れてパニックに陥る（クーパーも自分の娘を手引して馬で逃げる）という、ドラマ版の屈指のオープニング・シークエンスを際立たせる存在でした。</div>',
        post: 'バースデーボーイ「ロイ・スペンサー」のロア記事を追加しました！🏇\n第1話のオープニングで、悲しいことに「2077年10月23日」を8歳の誕生日として迎えてしまった男の子です。かつての大スターであるクーパー・ハワードと一緒に笑顔で写真を撮ったわずか数分後、核の炎が全てを無に帰すことになります。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/roy-spencer.html'
    },
    {
        id: 'sandra-tv-series',
        enName: 'Sandra (TV series)',
        jpName: 'サンドラ',
        rawFile: 'sandra__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: '鉛農家' },
            { label: '役割', value: '娘' }
        ],
        bodyHtml: '<p>サンドラ（Sandra）は、ウェイストランドで「鉛の農場」を営むアダムの娘です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第7話において、彼女の家である農場にグールが不法侵入（というよりモルデイヴァーの情報を探しに訪問）してきていた際に遭遇します。<br>父親のアダムと兄のトミーが外でスカベンジングを終えて帰宅し、「ただいま、サンドラ」と呼びかけながら家に入ったところ、食卓でグールが堂々と食事を楽しんでいました。グールは「彼らに食卓を振る舞ってもらった」と言い、「美味しいお水まで淹れてくれたよ。ありがとう、お嬢ちゃん」と、サンドラから平然と水を受け取るというホラーに近い空気を放っていました。<br><br>家族を人質（のように）取られたアダムたちは抵抗できず、結局兄のトミーはグールに情報のありかを吐かされた挙げ句に射殺されてしまいます。結果として、彼女はアダムの3人の子供の中で唯一生き残った最後の一人となってしまいました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>賞金稼ぎであるグール（クーパー）が「いかに容赦なく悪辣な存在か」を表現するためのサイコパス感たっぷりなシーンに登場する娘さんです。<br><br>荒野の農場に帰宅したら知らないゾンビが食卓に上がり込んでいて娘に水を淹れさせていた、という絶望的なシチュエーションは、ウェイストランドにおける日常茶飯事の恐怖です。</div>',
        post: '鉛農場の最後の生き残りの娘「サンドラ」のロア記事を公開しました！👧\n家でお留守番をしていたら、不法侵入して食卓に居座っているグールに脅されて水を淹れさせられていた可哀想な娘さんです。結局、グールに兄のトミーを射殺されてしまい、3人兄弟の中で唯一の生き残りとなってしまいました。ウェイストランドは過酷ですね。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/sandra-tv-series.html'
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
