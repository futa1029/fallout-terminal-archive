const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'hank-maclean',
        enName: 'Hank MacLean',
        jpName: 'ハンク・マクレーン',
        rawFile: 'hank_maclean_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 33 / Vault 31 / Vault-Tec' },
            { label: '役割', value: '監督官 / 父親' }
        ],
        bodyHtml: '<p>ハンク・マクレーン（Hank MacLean）は、Fallout TVシリーズの重要人物であり、主人公ルーシーの父親にして「Vault 33」の監督官（Overseer）です。<br>優しく理想的な父親として描かれる一方で、その過去にはVault-Tecの恐るべき秘密と、ウェイストランドに大きな影響を与えた暗い真実が隠されています。</p><hr><h2>背景</h2><p>かつては大戦前のVault-Tec社において、バド・アスキンスのアシスタント訓練プログラム「バズ・バッズ」の一員として働く若手社員でした。<br>大戦が近づく中、彼は「Vault 31」の冷凍睡眠ポッドに入り生存。2260年代に解凍され、Vault 33の監督官に就任しました。<br><br>その後、彼は妻であるローズ（ルーシーの母）が子供たちを連れてウェイストランドの都市「シェイディ・サンズ」へ逃亡した際、彼女を追跡しました。Vaultへと子供たちを連れ戻した後、彼は地上に復興しつつあった文明（NCRの首都であるシェイディ・サンズ）という「Vault-Tecの独占計画に対する脅威」を排除するため、核爆弾を投下して都市を完全に消滅させました。</p><h2>Fallout TVシリーズ</h2><p>2296年、平和なVault 33の監督官として娘のルーシーをVault 32の住人（偽装したモルデイヴァー一行）と結婚させようとしますが、襲撃に遭い、モルデイヴァーによって地上へと拉致されてしまいます。<br>物語の終盤、グリフィス天文台での対峙の中で彼の真の過去とシェイディ・サンズの悲劇が娘に暴露されます。<br>本性を現した彼は、T-60パワーアーマーを奪い取って現場から空を飛んで逃走。シーズン1のラストシーンにおいて、かつてのモハビ・ウェイストランドの宝石である「ニューベガス」へと辿り着く姿が描かれました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ドラマにおける「最愛の父親」であり、「最大の巨悪」でもあるという非常にFalloutらしい複雑なキャラクターです。<br><br>Vault-Tecの管理計画を頑なに信奉する狂信的な一面と、本当に娘のルーシーを愛しているという父親としての善性が同居しており、彼の行動原理こそが本作の根幹にあるテーマ（文明の再建と破壊）を象徴しています。シーズン2でのニューベガスにおける彼の動向から目が離せません。</div>',
        post: 'Vault 33の監督官「ハンク・マクレーン」のロア記事を公開しました！核シェルターの優しき父親…でありながら、その裏には大戦前のVault-Tecによる狂気の計画と、NCR首都「シェイディ・サンズ」崩壊の真実という、とてつもない闇を隠し持った重要キャラクターです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/hank-maclean.html'
    },
    {
        id: 'hollywood-forever-meeting-attendee',
        enName: 'Hollywood Forever meeting attendee',
        jpName: 'ハリウッド・フォーエバーの集会の参加者',
        rawFile: 'hollywood_forever_meeting_attendee_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '様々' },
            { label: '所属', value: 'ミス・ウィリアムズ（モルデイヴァー）' },
            { label: '役割', value: '集会参加者' }
        ],
        bodyHtml: '<p>ハリウッド・フォーエバーの集会の参加者（Hollywood Forever meeting attendees）は、大戦前にミス・ウィリアムズ（リー・モルデイヴァー）が主催していた秘密の反Vault-Tec集会の参加者たちです。Fallout TVシリーズのシーズン1（回想シーン）に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>大戦前、俳優のクーパー・ハワードが友人チャールズ・ホワイトナイフに誘われて「ハリウッド・フォーエバー墓地」で行われた集会に参加した際に登場します。<br>彼らはVault-Tecの独占資本主義やアメリカ政府の暴走に異議を唱えるミス・ウィリアムズの思想に賛同しており、熱心に彼女の演説に耳を傾けていました。（世間一般からは「共産主義者」として非難の対象となるような思想集団でした）</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>大戦前の「レッドスケア（赤狩り）」の対象となっていた、反政府・反企業のインテリ層や労働者たちです。<br><br>Falloutの世界観において、Vault-Tecやポセイドン・エナジーといった企業がいかにアメリカを裏から牛耳っていたか、そしてそれに気付いていた人々が（政府から弾圧されつつも）確実に存在していたことを示す重要な描写のモブです。</div>',
        post: '大戦前の「ハリウッド・フォーエバーの集会の参加者」のロア記事を公開しました！墓地の地下で行われたミス・ウィリアムズ（モルデイヴァー）が主催する反Vault-Tec集会に参加していた人々であり、戦前アメリカにおける思想の弾圧などの時代背景をよく表しています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/hollywood-forever-meeting-attendee.html'
    },
    {
        id: 'honcho',
        enName: 'Honcho',
        jpName: 'ホンチョー',
        rawFile: 'honcho_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: '不明' },
            { label: '役割', value: 'バウンティハンター' }
        ],
        bodyHtml: '<p>ホンチョー（Honcho）は、ウェイストランドで活動しているバウンティハンター（賞金稼ぎ）のリーダーです。Fallout TVシリーズのシーズン1第1話に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>賞金首である「シギ・ウィルツィヒ」の首をとり大金を手にするため、かつて父親と一緒に仕事をしたことがあるという伝説のバウンティハンター「グール」を掘り起こしに、深夜の墓地へとやってきた男です。<br>手下のスリムとビギーと共にドン・ペドロの墓場を襲撃し、棺桶からグールを引っ張り出しますが、グールを「自分たちの下っ端」としてこき使おうとするというミスを犯します。<br>最終的に、彼らを侮っていたグールによってスリムが撃ち殺され、ホンチョー自身は両膝を撃ち抜かれて無力化され、墓場に置き去りにされました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>第1話で「グールがかつての伝説である」ということを視聴者に教えてくれる（そして噛ませ犬になる）わかりやすい賞金稼ぎです。<br><br>父親がグールと働いたことがあると言っていることから、実は何十年も前からグールの存在は（一部の裏社会では）知れ渡っていたようです。</div>',
        post: '賞金稼ぎ「ホンチョー」のロア記事を公開しました！💰\nドラマ第1話に登場した賞金稼ぎのリーダー。一攫千金のために伝説のグールを墓場から掘り起こして自分たちの手駒にしようとするも、グールの圧倒的な強さの前に返り討ちにあってしまう「お手本のような噛ませ犬」です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/honcho.html'
    },
    {
        id: 'huey',
        enName: 'Huey',
        jpName: 'ヒューイ',
        rawFile: 'huey_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: '臓器密売組織 (ガバミントの庇護下)' },
            { label: '役割', value: '臓器コレクター' }
        ],
        bodyHtml: '<p>ヒューイ（Huey）は、荒野で臓器密売を行っている犯罪者です。Fallout TVシリーズのシーズン1第4話に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>廃墟となった「スーパーウルトラ・マーケット」を拠点とし、相棒のスクイールや、医療用Mr.ハンディの「スニップスニップ」と共に、誘拐されてきたり迷い込んだ人間の臓器を摘出して売り捌くビジネスを行っていました。<br>グールによって連れてこられたルーシーの臓器を収穫するつもりでしたが、ルーシーが拘束を解いて反撃した際に、彼女に返り討ちに（銃で撃たれ）されて死亡しました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>第4話における悪役の一人で、スーパーウルトラ・マーケットで違法な臓器ビジネスを行っていた小悪党です。<br><br>いかにもウェイストランドの底辺で生きているようなチンピラであり、テレビの戦前アニメをアホ面で眺めている様は、レイダーの日常行動の再現のようでした。Vaultでの温室育ちから脱却し始めたルーシーの「最初の殺人」の対象となってしまいました。</div>',
        post: '臓器密売人「ヒューイ」のロア記事を公開しました！🔪\n第4話に登場し、スーパーウルトラ・マーケットで拉致被害者の臓器を売り捌いていた小悪党です。いかにもレイダーらしいチンピラであり、最終的にルーシーの手によって（彼女の最初の防衛殺人として）射殺されます。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/huey.html'
    },
    {
        id: 'ian-jackson',
        enName: 'Ian Jackson',
        jpName: 'イアン・ジャクソン',
        rawFile: 'ian_jackson_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 32 / Vault 31 / Vault-Tec' },
            { label: '役割', value: 'Vault 32の監督官（故人）' }
        ],
        bodyHtml: '<p>イアン・ジャクソン（Ian Jackson）は、Vault 32の監督官を務めていた人物です。Fallout TVシリーズのシーズン1において作中より過去の出来事として言及されます。</p><hr><h2>背景</h2><p>彼もまたハンク・マクレーンやベティ・ピアソンと同じく、大戦前のVault-Tecにおけるバド・アスキンスの部下（バズ・バッズ）であり、大戦後は「Vault 31」から解凍されてVault 32の監督官として派遣された人物です。<br>2294年頃、Vault 32の住民たちが外部からの何らかの手助け（恐らくルーシーの母ローズに関係するもの）によって「自分たちのVaultがVault 31による実験場である」という真実に気付いてしまい、大規模な反乱が発生しました。<br>その反乱の最中、イアン・ジャクソンは怒り狂った住民たちによって凄惨に殺害されました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Vault 32の崩壊事件における「殺された監督官」です。<br><br>ノームがVault 32を探索した際に、Vault 31の真実を知った住民たちが彼を拷問し殺した痕跡が残されていました。彼もハンクのような温厚で理想的な監督官を演じていたのでしょうが、真実がバレた時の住民（実験動物）の怒りは凄まじかったことがわかります。</div>',
        post: 'Vault 32の元監督官「イアン・ジャクソン」のロア記事を公開しました！💀\n作中でVault 32が全滅する事件が起きた際、Vault 31の真実を知って怒り狂った住民たちによって拷問・殺害された監督官です。彼もまた、大戦前のVault-Tecで働く「バズ・バッズ」の冷凍保存組の一人でした。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/ian-jackson.html'
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
