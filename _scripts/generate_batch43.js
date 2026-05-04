const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'street-hustler',
        enName: 'Street hustler',
        jpName: 'ストリート・ハスラー',
        rawFile: 'street_hustler_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'フリーサイド' },
            { label: '役割', value: 'ハスラー（殴られ屋）' }
        ],
        bodyHtml: '<p>ストリート・ハスラー（Street hustler）は、モハビ・ウェイストランドのフリーサイド（Freeside）にいる住人です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Wrangler」に登場します。<br><br>フリーサイドを歩くルーシーとグールの前に立ちはだかり、赤いペンキで「BEAT ME UP 4 CAPS（4キャップで俺を殴れ）」と書かれた看板を首から下げていました。<br>彼はキャップ（お金）さえもらえれば他人が自分に肉体的な苦痛を与えることを許可するという、命を削る商売（殴られ屋）をしているようです。ルーシーは彼の申し出を丁重に断り、彼を避けて通り過ぎました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>治安が悪すぎるフリーサイドの闇深さを一瞬で表現した素晴らしいモブキャラクターです。<br><br>暴力が日常茶飯事のウェイストランドにおいて「金さえ払えば合法的にサンドバッグになってやる」という最底辺のハッスルは、いかにもFallout世界のリアルな底辺労働者という感じがして最高です。</div>',
        post: 'フリーサイドの「ストリート・ハスラー」のロア記事を追加しました！👊\nシーズン2に登場する人物で、「4キャップで俺を殴れ」という看板を下げている日雇いの”殴られ屋”です。フリーサイドにおける命の安さと、底辺労働のリアルな狂気を体現する最高のモブキャラですね。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/street-hustler.html'
    },
    {
        id: 'subject-476',
        enName: 'Subject 476',
        jpName: '被験体476',
        rawFile: 'subject_476_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault 4（実験体）' },
            { label: '役割', value: 'ホロテープの被験体' }
        ],
        bodyHtml: '<p>被験体476（Subject 476）は、かつてのVault 4で行われていた非人道的な実験の犠牲者となった女性です。Fallout TVシリーズのシーズン1にホロテープの映像として登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第6話「The Trap」に登場します。<br>Vault 4の居住区（レベル12）に侵入したルーシーが再生したVault-Tecの過去の実験ホロテープ映像の記録被験体です。<br><br>映像の中で彼女は、Vault 4の白衣の科学者たちに囲まれながら出産を行っていました。しかし彼女の股から産まれてきたのは人間の赤ん坊ではなく、無数の「巨大サンショウウオ（ガルパー）の幼体」でした。<br>産み落とされた直後、腹を空かせた大量のベビー・ガルパーたちは振り返り、ピラニアのような群れとなって実の母親である被験体476に群がり、彼女を生きたまま食い殺すという地獄のような光景が記録されていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>作中はおろかFalloutシリーズの映像作品全般を通してもトップクラスにグロテスクで狂気的なVault-Tecの「人体実験」を描写したキャラクター（犠牲者）です。<br><br>なぜサンショウウオに人間の女性を妊娠させたのか、その目的すら不明なのがVault-Tecの恐ろしさを加速させています。現在の善良な「一つ目ガルパー」たちの祖先は、こうやって人肉を食べて育った個体だったのでしょうか。</div>',
        post: 'Vault 4の犠牲者「被験体476」のロア記事を公開しました！🦎\nルーシーが再生した過去の実験映像の妊婦です。サンショウウオを妊娠させられ、産み落とした大量のベビー・ガルパーの群れに生きたまま食い殺されるという、Vault-Tecの狂気の極みを見せつけてくれました。映像のトラウマ度が凄まじいです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/subject-476.html'
    },
    {
        id: 'sunburned-man',
        enName: 'Sunburned man',
        jpName: '日焼けした男',
        rawFile: 'sunburned_man_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault-Tec（ハンクの実験体）' },
            { label: '役割', value: '伝言役（犠牲者）' }
        ],
        bodyHtml: '<p>日焼けした男（Sunburned man）は、ロサンゼルス周辺に住む一般人で、年老いた女性「グレッチ（Old Woman Gretch）」の実の息子です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Innovator」に登場します。<br><br>ノミのスープ（Flea soup）を売っている母親の屋台を訪れたルーシーとグールは、彼女の息子が「ハンク・マクレーン」によって連れ去られたことを知ります。母親は息子が連れ去られたこと自体には無関心でしたが、「息子に貸していたお金（キャップ）が返ってこなくなった」ことだけを悲しんでいました。<br><br>その後、ルーシーとグールは放棄された「Vault 24」の内部でこの日焼けした男を発見します。<br>しかし彼はすでにハンクによって首の後ろにマインドコントロール・チップ（Brain-computer interface chip）を埋め込まれており、ハンクの意思をルーシーに伝えるための「伝言役（メッセンジャー）」にされていました。<br>彼はロボットのように『私だ…私が直す。帰れ、シュガーボム。帰れ！帰れ！行け！』とハンクの言葉をルーシーに伝えた直後、<b>チップの負荷によって頭部が完全に爆発</em>し、ルーシーとグールに大量の血と脳漿を浴びせて即死しました。この凄惨な光景を見たルーシーは「父は人を傷つけるのをやめない」と絶望することになります。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2におけるハンクの「人間性の欠如」を完璧に表現した最胸糞キャラクターの一人です。<br><br>無差別にその辺のウェイストランダーを誘拐し、単に「娘に伝言を残すだけ」のためにマインドコントロール・チップを埋め込んで爆死させるという、完全に「Vault-Tecの化け物」と化したハンクの恐ろしさを象徴する残酷な演出でした。</div>',
        post: '「日焼けした男」のロア記事を追加しました！🤯\nシーズン2でスープ屋の老婆の息子ですが、ハンクに攫われて「マインドコントロールのテスト兼、娘への伝言役」にされました。ルーシーに「帰れ、シュガーボム」と伝えた直後に頭が破裂して爆死するという、ハンクが完全に”Vault-Tecの化け物”であることを見せつける残酷な犠牲者です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/sunburned-man.html'
    },
    {
        id: 'tatyana-lee',
        enName: 'Tatyana Lee',
        jpName: 'タチアナ・リー',
        rawFile: 'tatyana_lee_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: 'ジュニア・エグゼクティブ' }
        ],
        bodyHtml: '<p>タチアナ・リー（Tatyana Lee）は、大戦前のVault-Tecコーポレーションのジュニア・エグゼクティブであり、現在は「Vault 31」のコールドスリープに保管されている人物の一人です。Fallout TVシリーズのシーズン1の背景情報に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第8話「The Beginning」などで、ノームがVault 31の情報をハッキングした際の名前リスト（Cryobayのコールドスリープ名簿）の中に彼女の名前が確認できます。<br><br>彼女はバド・アスキンスが立ち上げた「バドのつぼみ（Bud\'s Buds）」プログラムに参加した有望な若手管理職の一人です。このプログラムの目的は、放射能で地上を浄化した後、Vault-Tecの企業理念を叩き込まれた「スーパー・マネージャー」たちを定期的に解凍し、Vault 32・33の居住者たちと交配（優生学的な繁殖）させることで、地球を継承する完璧な独占労働者階級を作り上げることでした。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Vault 31の冷凍睡眠端末のリストに載っていた、ハンク神父…もといハンク・マクレーンやステフ、ベティらの同僚の一人です。<br><br>彼女が今後解凍されて監督官として派遣されるのか、それとも過去のアーカイブ上の人物として扱われるだけなのかは不明ですが、リストの名前一つ一つにVault-Tecのヤバすぎる「優生学計画」が詰まっています。</div>',
        post: '「タチアナ・リー」のロア記事を公開しました！🧬\nシーズン1の最終話で、ノームが見ていたVault 31の「冷凍睡眠名簿リスト」に名前が載っていたVault-Tecのジュニア・エグゼクティブです。ハンクやステフと同じく「バドのつぼみ」プログラムの参加者であり、いつか32や33の監督官候補として解凍されるかもしれません。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/tatyana-lee.html'
    },
    {
        id: 'television-host',
        enName: 'Television host',
        jpName: 'テレビ司会者',
        rawFile: 'television_host_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: '不明（テレビ局）' },
            { label: '役割', value: '番組のインタビュアー' }
        ],
        bodyHtml: '<p>テレビ司会者（Television host）は、Fallout TVシリーズのシーズン2に登場する人物です。（演：ベッツィ・ザジコ）</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Innovator」に登場します。<br>ロサンゼルスのバーに設置されているテレビ画面に映し出された番組の中で、ロブコ・インダストリーズ（RobCo Industries）のCEOであるロバート・ハウス（Mr.ハウス）にインタビューを行っていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>バーのテレビ越しにMr.ハウスをインタビューしている司会者です。<br><br>「Mr.ハウスがテレビ番組で喋っている」という描写は、大戦前の彼がどれほど影響力のあるメディアの寵児であったかを示す良いフレーバーになっています。</div>',
        post: '「テレビ司会者」のロア記事を追加しました！📺\nシーズン2に登場。ロサンゼルスのバーのテレビ画面に映っている番組の司会者で、我らが”ご神体”ことロバート・ハウス（ロブコCEO）にインタビューを行っていた人物です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/television-host.html'
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
