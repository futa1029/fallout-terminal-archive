const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'davey-tv-series',
        enName: 'Davey (TV series)',
        jpName: 'デイヴィー',
        rawFile: 'davey__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 33 / Vault 32' },
            { label: '役割', value: '居住者' }
        ],
        bodyHtml: '<p>デイヴィー（Davey）は、Vault 33の居住者であり、のちにVault 32の再建に伴って移住した人物です。</p><hr><h2>背景</h2><p>彼は過去にVault 33で行われた監督官（オーヴァーシア）選挙に立候補したことがありましたが、その時はハンク・マクレーンに敗れています。<br>また、2296年に行われた新たなオーヴァーシア選挙では、ベティ・ピアソンに投票しました。</p><h2>Fallout TVシリーズ</h2><p>レイダーたちの襲撃に関する事後処理の際、デイヴィーは手押し車を押してVaultの後片付けを手伝っており、額に小さな怪我を負っている様子が描かれていました。<br>また、彼とレグ・マクフィーは、ルーシーに対して「Vault 32に移住するという話を聞いたが、何か月も向こうの居住者たちとは連絡が取れていない。何か知っているか？」と不安げに尋ねていました。<br>のちにベティによってVault 32への入植プロジェクトが発足した際、彼は32側へ移住するグループに選ばれました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>過去の選挙でハンクに負けたことがあるという背景を持つVault居住者です。<br><br>彼自身が語っていた「ゾウムシ飢饉が起きてハンクに負けた」という当時の背景は、Vault 33における過去の危機を示す重要な設定として機能しています。レイダー襲撃後も生き延びてVault 32側へと移住しました。</div>',
        post: 'Vault 33から32へと移住した居住者「デイヴィー」のロア記事を公開しました！👥\n過去に行われた監督官選挙でハンクに敗北したという経歴を持っており、本編では後片付け中の姿やルーシーの出発を見送る姿などが描かれています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/davey-tv-series.html'
    },
    {
        id: 'dentist-barber',
        enName: 'Dentist-barber',
        jpName: '歯医者兼理髪師',
        rawFile: 'dentist-barber_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男女' },
            { label: '所属', value: 'フィリー' },
            { label: '役割', value: '歯科医 / 床屋' }
        ],
        bodyHtml: '<p>歯医者兼理髪師（Dentist-barber）は、ウェイストランドのジャンク街「フィリー（Filly）」にて店舗を構えている人物（たち）です。</p><hr><h2>Fallout TVシリーズ</h2><p>第2話において、マキシマスが壊れたパワーアーマーの部品を修理工（ジャミラ）に見積もってもらった際、1キャップ足りずに修理を断られてしまいます。<br>そこでマキシマスは、キャップを稼ぐためにフィリーにある「歯医者（兼、理容室）」の看板が掲げられた店へと向かい、自分の奥歯を抜いて売ることで見事に資金を調達しました。</p><p>劇中では看板が表示されるのみで彼らの姿は直接描かれませんでしたが、2024年のSXSWイベント等では「フィリーの歯医者兼理髪師」としてのプロモーションキャストが登場していました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>キャップが足りないマキシマスが、自分の歯を引っこ抜いて金策を行なった際にお世話になったお店です。<br><br>「歯医者」と「床屋」が同じ看板で営業しているあたり、ウェイストランド特有の荒々しい無免許感が漂っていて非常に良い味を出しています。</div>',
        post: 'フィリーのジャンク街にある店「歯医者兼理髪師」のロア記事を公開しました！🦷\n修理代としてあと1キャップが足りなかったマキシマスが、苦し紛れに「自分の歯を引っこ抜いて売る」という荒業に出た際、彼から歯を買い取ったお店です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/dentist-barber.html'
    },
    {
        id: 'dervin',
        enName: 'Dervin',
        jpName: 'ダーヴィン',
        rawFile: 'dervin_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'レイダー' },
            { label: '役割', value: '捕虜' }
        ],
        bodyHtml: '<p>ダーヴィン（Dervin）は、Vault 32を占拠して居住者のフリをしていたレイダーの一人です。</p><hr><h2>Fallout TVシリーズ</h2><p>ダーヴィンは、リー・モルデイヴァーの指示によってVault 32に潜入し、Vault 33との3年に1度の「大豆貿易」に偽装して彼らを襲撃しました。しかし反撃によって部隊は制圧され、彼は他の数名のレイダーと共にVault 33の空き部屋に捕虜として投獄されました。</p><p>彼らは驚くべきことに、オーヴァーシアであるベティの方針によって「更生可能である」と判断され、快適な部屋でマリアンヌからゼリーケーキやおいしい食事を与えられるという厚遇を受けていました。<br>ある日、食事の配膳係に割り当てられたノーム・マクレーンに対し、ダーヴィンは部屋の中から言葉をかけます。<br>ノームは彼を「罪のない居住者たちを虐殺した殺人鬼」と非難しますが、ダーヴィンは嘲笑うように「<b>俺たちが殺したのか？ お前は何もわかっちゃいない</b>」と、Vault 32の居住者たちが自滅した（レイダーたちが殺したわけではない）という事実をほのめかし、ノームがVaultに隠された真実を探求するきっかけの一つを作りました。</p><p>その後、ノームによって密かに彼らの投獄部屋へ毒が仕込まれ、ダーヴィンは他のレイダー全員と共に毒殺されました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Vault内に囚われていたレイダーの生き残りです。<br><br>彼自身はモザイクの掛かったガラス越しにノームと少し会話をしただけですが、この「Vault 32の連中がおかしくなって自滅していた所に、俺たちレイダーが後から入っただけ」という事実は、中盤のもやもやとした謎を加速させる見事なフックになっていました。</div>',
        post: 'Vault 33に囚われていたレイダーの一人「ダーヴィン」のロア記事を公開しました！🔥\nノームに対して「32の連中を殺したのは俺たちじゃない。お前は何もわかってない」と言い放ち、彼が真実の探求へ向かうきっかけを作った人物です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/dervin.html'
    },
    {
        id: 'diane-welch',
        enName: 'Diane Welch',
        jpName: 'ダイアン・ウェルチ',
        rawFile: 'diane_welch_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間 / サイボーグ' },
            { label: '性別', value: '女' },
            { label: '所属', value: '合衆国議会（元）' },
            { label: '役割', value: '下院議員 / メインフレーム' }
        ],
        bodyHtml: '<p>ダイアン・ウェルチ（Diane Welch）は、大戦前のアメリカにおける下院議員であり、メインフレームとして2296年まで生き延びていた人物です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>背景</h2><p>ダイアン・ウェルチは、2070年代にカリフォルニア州グレンデールの選挙区から選出されたアメリカ合衆国下院議員でした。<br>彼女は当時のアメリカ政府においてVault-Tec社などの巨大企業が強大な政治的影響力を持っていることに真っ向から反対しており、すべての企業の献金を拒否していた唯一の現職議員でした。</p><h2>その後の動向</h2><p>清廉潔白に戦い続けていた彼女ですが、最終的に彼女は政治の世界で企業の力に敗北したものと推測されます。<br>彼女は最終戦争の後に自らの脳と人格を「メインフレーム（サイボーグ / AIシステム）」へと移植され、2296年時点でも「ラスベガス管理Vault（Las Vegas management Vault）」や「ラッキー38」を管理するためのメインフレームとして存在し続けていました。</p><p>しかし彼女は、最終的にVault-Tec社の何らかの策謀か、あるいはシステムの停止によって、2296年7月に完全な死（破壊）を遂げることになります。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2絡みで「大戦前の清廉な国会議員が、戦後にラスベガス絡みのメインフレームにされていた」というロマン溢れる設定を持つ重要キャラクターです。<br><br>Vault-Tecの手の掛かっていない貴重な当時の政治家ですが、Vault-Tecとの政治闘争の果てにどのようにしてメインフレーム化されたのか、そしてニューベガスのMr.ハウスとどのような関係があるのか、本編での登場描写が非常に楽しみですね。</div>',
        post: '戦後まで「メインフレーム」として生き延びていた戦前のアメリカ下院議員「ダイアン・ウェルチ」のロア記事を公開しました！🇺🇸\n企業からの献金を一切受け取らずVault-Tecと戦った清廉な政治家ですが、最終的にサイボーグ化されてラスベガスのシステムに組み込まれたという壮絶な設定を持っています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/diane-welch.html'
    },
    {
        id: 'dirigible-squire',
        enName: 'Dirigible squire',
        jpName: '飛行船の従者',
        rawFile: 'dirigible_squire_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'B.O.S. (サンフェルナンド支部)' },
            { label: '役割', value: 'スクワイア（従者）' }
        ],
        bodyHtml: '<p>飛行船の従者（Dirigible squire）は、Fallout TVシリーズのシーズン2に登場する人物です。</p><hr><h2>背景</h2><p>彼は2296年時点におけるB.O.S.のサンフェルナンド支部のスクワイア（従者）です。B.O.S.の飛行船「キャスウェナン（Caswennan）」がエリア51を確保するために移動した際、その部隊の一員として乗船していました。</p><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Golden Rule」エピソードにおいて、マキシマスが謎の施設からコントロールパネルを回収してキャスウェナンへと帰還した際、彼の手から直接パネルを受け取ったクインタスが、近くにいたこの従者にパネルを渡しました。<br>従者はパネルをコンソールに接続し、地上のB.O.S.スクライブたちに光信号を送ります。<br>その直後、巨大な風力タービンが起動し、エリア51全体を覆い隠していた大量の砂丘が吹き飛ばされて、エリア51の全容が明らかになる様子を見届けました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2にて、飛行船キャスウェナン内でクインタスの命令をこなし、エリア51の覆いを取り払う装置を起動したスクワイアです。<br><br>スクワイアと言えば巨大な荷物袋を担いで走る印象がありますが、このように飛行船内部でコンソールを操作する技術的な役割も担っているようですね。</div>',
        post: '飛行船内でエリア51の起動コンソールを操作したB.O.S.要員「飛行船の従者」のロア記事を公開しました！⚙️\nシーズン2にて、マキシマスが持ち帰ったキーパネルを受け取り、エリア51全体の砂を吹き飛ばす巨大タービンを起動させた人物です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/dirigible-squire.html'
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
