const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'thaddeus',
        enName: 'Thaddeus',
        jpName: 'サデウス',
        rawFile: 'thaddeus_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: 'ミュータント（グール？）' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'B.O.S. (元)' },
            { label: '役割', value: '元スクワイア' }
        ],
        bodyHtml: '<p>サデウス（Thaddeus）は、ブラザーフッド・オブ・スティール（B.O.S.）のサンフェルナンド支部に所属していた元兵士、および未知のミュータント（グール化の疑い）です。Fallout TVシリーズのシーズン1に登場する主要な助演キャラクターです。（演：ジョニー・ペンバートン）</p><hr><h2>Fallout TVシリーズ</h2><p><b>B.O.S.のスクワイアとして</b><br>当初はマキシマスをいじめる訓練兵（アスピラント）として登場しますが、マキシマスが昇格して基地を去った後、彼もまたスクワイア（従者）に選ばれ「ナイト・タイタス」のもとへ派遣されます。（このとき中身がマキシマスであることには気付いていませんでした）<br>彼はFalloutという過酷な世界における「日和見主義で臆病だが、どこか憎めない小悪党」の典型であり、過酷な任務の中でマキシマスと奇妙な友情を結んでいきます。<br><br><b>ミュータントへの変貌</b><br>ウィルギグ博士の首をめぐる戦いの最中、彼はマキシマスの裏切りを知って首を持ち逃げしますが、足を粉砕骨折する重傷を負ってしまいます。レッドロケット・トラックストップで途方に暮れていた彼は、「胡散臭いセールスマン」から怪しい薬品を購入して注射しました。<br>その結果、足が一瞬で完治しただけでなく、首に矢が刺さっても全く死なないという異常な治癒力（不死性）を獲得します。<br>マキシマスから「お前はグールになりかけている。B.O.S.にバレたら殺されるぞ」と警告されたサデウスは、首をマキシマスに託し、自分が何者になってしまったのかもわからないままウェイストランドへと逃亡しました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>FalloutのNPCに一人は絶対にいる「口先だけで生き延びていく小ずるいコメディリリーフ」を見事に演じ切った素晴らしいキャラクターです。胡散臭い薬を自ら注射してミュータント化する展開もゲーム版の主人公のようで最高でした。<br><br>彼が打った薬の正体については、ファンコミュティでも「グール化の秘薬説」や「FEVウイルス説」など様々な議論が巻き起こっており、シーズン2での彼の再登場（完全なグールになっているのか、スーパーミュータントになっているのか）に大きな期待が寄せられています。</div>',
        post: '「サデウス」のロア記事を追加しました！🎒\nB.O.S.のスクワイアであり、マキシマスをいじめていた小悪党ですが、後に奇妙な友情で結ばれる名キャラクターです。足を粉砕されて怪しい薬を打った結果「首に矢が刺さっても死なない変異体（グール？）」となり、B.O.S.から逃亡するという最高にFalloutな末路を辿りました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/thaddeus.html'
    },
    {
        id: 'thaddeus-minion',
        enName: 'Thaddeus\' minion',
        jpName: 'サデウスの子分',
        rawFile: 'thaddeus__minion_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'B.O.S. (サンフェルナンド支部)' },
            { label: '役割', value: '訓練兵（アスピラント）' }
        ],
        bodyHtml: '<p>サデウスの子分（Thaddeus\' minions）は、ブラザーフッド・オブ・スティール（B.O.S.）のサンフェルナンド支部に所属する5人の訓練兵（アスピラント）のグループです。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第1話「The End」に登場します。<br>リーダー格であるサデウスに取り巻きとして付き従っているいじめっ子たちのグループです。彼らはデインが靴に仕込まれたカミソリで怪我をした事件の後、その犯人として疑われていたマキシマスを取り囲んで集団で袋叩きにしていました。しかしクレリックに見つかりそうになると、途端に蜘蛛の子を散らすように逃げ出しました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>「軍隊内のいじめられっ子が成り上がる」というマキシマスの出発点を描くための分かりやすい悪役たちです。<br><br>この集団の中で名前が判明し、後にスクワイアへと出世したのはリーダー格のサデウスだけでした。</div>',
        post: '「サデウスの子分」たちのロア記事を公開しました！🥾\nシーズン1の第1話にて、B.O.S.の基地の中でマキシマスを集団でリンチしていた訓練兵たちのグループです。サデウスをリーダーとする典型的なイジメっ子集団でした。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/thaddeus-minion.html'
    },
    {
        id: 'thomas-hamilton',
        enName: 'Thomas Hamilton',
        jpName: 'トーマス・ハミルトン',
        rawFile: 'thomas_hamilton_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: 'ジュニア・エグゼクティブ' }
        ],
        bodyHtml: '<p>トーマス・ハミルトン（Thomas Hamilton）は、大戦前のVault-Tecコーポレーションのジュニア・エグゼクティブであり、「Vault 31」のコールドスリープに保管されていた人物の一人です。Fallout TVシリーズのシーズン1・2の背景情報などに登録されています。</p><hr><h2>Fallout TVシリーズ</h2><p>ハンク・マクレーンやステフ・ハーパーらと同じく、バド・アスキンスが手掛けた「バドのつぼみ（Bud\'s Buds）」プログラムに参加した大戦前の企業幹部候補（スーパー・マネージャー）の一人です。<br>彼はVault 31の冷凍睡眠施設（Cryobay）に保管されており、2296年にシステムの解凍（Defrosting）プロセスに関連してその名前が記録されています。Vault 32・33の居住者の管理や、将来のVault-Tecによる地球の再支配に向けて「交配プール」へ送り出される要員の一人です。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ノームのハッキングによって判明した「バドのつぼみ」メンバーの一人です。<br><br>彼らが次々と解凍されているということは、Vault 32が全滅した後の再建プロセスにおいて、新たな”Vault 31出身の怪しい住人”として登場する可能性が高いですね。</div>',
        post: '「トーマス・ハミルトン」のロア記事を追加しました！❄️\n Vault 31のコールドスリープに保管されていたVault-Tecの若きエグゼクティブで、「バドのつぼみ」プログラムの参加者です。2296年に発生したVault 32再建のための解凍プロセスに関連しており、今後のVault内の権力闘争に関わってくるかもしれません。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/thomas-hamilton.html'
    },
    {
        id: 'titus',
        enName: 'Titus',
        jpName: 'タイタス',
        rawFile: 'titus_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'B.O.S. (サンフェルナンド支部)' },
            { label: '役割', value: 'ナイト（騎士）' }
        ],
        bodyHtml: '<p>タイタス（Knight Titus）は、ブラザーフッド・オブ・スティール（B.O.S.）のサンフェルナンド支部に所属する騎士（ナイト）であり、T-60パワーアーマーの本来の着用者です。Fallout TVシリーズのシーズン1に登場します。（演：マイケル・ラパポート）</p><hr><h2>Fallout TVシリーズ</h2><p>B.O.S.の「英雄的な騎士」の精神性がとうの昔に腐敗しきっていることを象徴するような、臆病で身勝手な人物として描かれています。<br><br>スクワイアとして配属されたマキシマスを引き連れて「ウィルギグ博士」の確保任務に赴きますが、彼は教義や名誉には全く興味がなく、ただ安全なパワーアーマーの中で退屈を凌ぐために周囲の人間をいじり、汚い仕事や危険な仕事はすべてマキシマスに押し付けていました。<br><br>フィルモア（Fillmore）の森をパトロール中、変異した巨大な熊「ヤオ・グアイ」に遭遇すると、彼は恐怖のあまり戦うことを放棄して叫びながら逃げ回り、パワーアーマーごとヤオ・グアイにボコボコにされてしまいます。<br>マキシマスが銃撃でヤオ・グアイを仕留めた後、胸部を負傷したタイタスは「スティムパックを打て！」と激怒し、助けてくれなければ基地に戻ってお前を死刑にしてやるとマキシマスを脅迫しました。<br>その結果、マキシマスは彼にスティムパックを投与しないことを決意し、タイタスは自業自得の出血多量で死亡しました。その後、彼のアイデンティティとパワーアーマーはマキシマスによって奪われることになります。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>第一話でマキシマスが憧れていた「正義の騎士」の幻想をあっさりとぶち壊してくれた最高の最低野郎です。<br><br>「2トンの放射能熊が背中に乗ってるんだぞ！」「退屈だから何か撃たせろ！」など、中身がいかに小物であってもパワーアーマーさえ着ていれば威張っていられるという、B.O.S.の歪んだ階級社会と末期症状を見事に演じ切っていました。</div>',
        post: 'B.O.S.の「ナイト・タイタス」のロア記事を大幅更新しました！🐻\nマキシマスが仕えることになった尊敬すべき騎士…の皮を被った、最低最悪の小物です。ヤオ・グアイから悲鳴を上げて逃げ回り、助けてくれたマキシマスを死刑にすると脅した結果、見殺しにされてパワーアーマーを奪われるという完璧な因果応報を迎えました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/titus.html'
    },
    {
        id: 'tom-tv-series',
        enName: 'Tom (TV series)',
        jpName: 'トム',
        rawFile: 'tom__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'スカベンジャー' },
            { label: '役割', value: 'リーダー' }
        ],
        bodyHtml: '<p>トム（Scavenger Tom）は、ニューカリフォルニアのフィリー（Filly）周辺をうろついているスカベンジャー集団のリーダー格です。Fallout TVシリーズのシーズン1に登場します。（演：イーサン・デュビン）</p><hr><h2>Fallout TVシリーズ</h2><p>第3話「The Head」に登場します。<br>自分をナイト・タイタスだと偽っているマキシマスが、パワーアーマーを脱いで修理部品を探しに行っている隙に、放置されていたT-60パワーアーマーを仲間たちとこじ開けようとしていました。<br><br>戻ってきたマキシマスが「そのアーマーから離れろ」と警告しますが、生身で虚勢を張っているだけの彼をトムは嘲笑い、部下たちにマキシマスを袋叩きにさせました。さらには「見つけた者の勝ちだ、マイロード（Finders keepers, milord）」と馬鹿にしながらマキシマスの顔面を殴りつけ、アーマーを奪い取ろうとします。<br><br>しかしその後、マキシマスは隙を突いてパワーアーマーの中に乗り込むことに成功しました。形勢は完全に逆転し、パワーアーマーを起動させたマキシマスは「もう一度言ってみろ」と言い放ち、素手による一撃でトムの頭部（顔面）を完全に粉砕して即死させました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>パワーアーマーの「理不尽なまでの暴力の差」を視聴者とマキシマスに見せつけるために配置された、とても気の毒で自業自得な悪党スカベンジャーです。<br><br>素手のマキシマスをボコボコにしてイキっていた彼が、装甲を着たマキシマス相手には頭をトマトのように潰されてしまうシーンは、Falloutの「装備の差＝絶対的な力の差」というゲーム的リアリティを体現していました。</div>',
        post: '「トム（スカベンジャー）」のロア記事を公開しました！🍅\n無防備に置かれていたT-60アーマーを盗もうとしていた集団のボス。「早い者勝ちだ」と生身のマキシマスをボコボコにしてイキっていましたが、アーマーに乗り込まれた直後にワンパンで頭蓋骨を粉砕されて即死するという、最高に自業自得な最期がたまらない悪党です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/tom-tv-series.html'
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
