const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'partygoer-tv-series',
        enName: 'Partygoer (TV series)',
        jpName: 'パーティーの参加者（Lucky 38）',
        rawFile: 'partygoer__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '様々' },
            { label: '所属', value: 'ニューベガス（戦前）' },
            { label: '役割', value: 'パーティー客' }
        ],
        bodyHtml: '<p>パーティーの参加者（Partygoers）は、シーズン2の戦前パートにおいて、ニューベガスの「ラッキー38（Lucky 38）」で開催されたパーティーの客たちです。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2のエピソードで描かれる大戦前のアメリカ（2077年）にて、ロブコ・インダストリーズ（あるいはMr.ハウス）がラッキー38で開催しているイベントに参加している客たちです。<br>会場の手前で憲兵たちが抗議者たちを締め出している中で施設へと向かう姿や、施設内部で談笑している姿が描かれています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン1におけるクーパーの家のパーティー客（Vault-Tec関係者）とは異なり、こちらはシーズン2のニューベガスでMr.ハウスの周りに集まっていた客たちです。<br><br>大戦直前のアメリカにおいて、表向きは優雅に振る舞いながらも一皮むけば軍産複合体の癒着まみれである戦前の狂騒（フラマー）を感じさせるキャラクターたちです。</div>',
        post: '戦前のニューベガスにおける「パーティーの参加者」のロア記事を公開しました！🍸\nシーズン2で描かれる、大戦直前の2077年の「ラッキー38」に集う人々です。外では憲兵が抗議者を力ずくで排除している中、施設内で優雅に談笑する軍事産業のエリートや富裕層たちの様子が描かれます。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/partygoer-tv-series.html'
    },
    {
        id: 'patricia-peters',
        enName: 'Patricia Peters',
        jpName: 'パトリシア・ピーターズ',
        rawFile: 'patricia_peters_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault 31 / Vault 33' },
            { label: '役割', value: '監督官（元Vault-Tec社員）' }
        ],
        bodyHtml: '<p>パトリシア・ピーターズ（Patricia Peters）は、大戦前のVault-Tec若手社員であり、「バズ・バッズ」のメンバーの一人です。2125年頃から2271年までのいずれかの期間に、Vault 33の監督官を務めていました。</p><hr><h2>Fallout TVシリーズ</h2><p>Vault 31に冷凍保存されていた彼女はバドの計画によって解凍され、Vault 33の監督官に就任しました。彼女はハンク・マクレーンやベティ・ピアソンと同様に、Vault-Tecの「完璧な管理社会の構築」と優良な遺伝子の交配任務を遂行していました。<br><br>ノームがVault 33の端末で歴代監督官の記録を見直した際、過去の監督官選挙において彼女も選出（事実上の出来レース）されていたことが確認できます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>歴代のVault 33監督官の一人です。<br><br>「Vault 31出身者以外は決して監督官になれない（あるいはなったとしてもすぐに降ろされる）」というVault 33の不自然な選挙システムを表す、記録上の人物です。</div>',
        post: 'Vault 33の歴代監督官「パトリシア・ピーターズ」のロア記事を追加しました！📂\nノーム・マクレーンの調査によって暴かれた、ハンクやベティと同様にVault 31から解凍されてVault 33の監督官に据えられていたVault-Tecの「バズ・バッズ」メンバーの一人です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/patricia-peters.html'
    },
    {
        id: 'pete-tv-series',
        enName: 'Pete (TV series)',
        jpName: 'ピート',
        rawFile: 'pete__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: '社員（バズ・バッズ）' }
        ],
        bodyHtml: '<p>ピート（Pete）は、大戦前のVault-Tec社員であり、「バズ・バッズ」プログラムの参加者としてVault 31に冷凍保存されていた青年です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の回想シーン（プレ・ウォー）において、クラーク（Vault-Tecの同僚）、ハンク・マクレーンと共にロサンゼルス国際空港にいる姿などが描かれます。<br>その後、「スーパーマネージャー」を育成するバドの計画に参加し、Vault 31の冷凍ポッドに入りました。<br><br>しかしシーズン2の「The Strip」などで、冷凍睡眠の状態（あるいは何らかの形）で死亡した無惨な肉体が確認されるという、不気味な展開が待ち受けているようです。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2において、戦前のVault-Tec社員たちがどのようにして「Vault 31」の冷凍睡眠計画に参加していったのかという裏側を描くためのキャラクターの一人です。<br><br>シーズン1の最終話で綺麗に整列していた冷凍ポッドですが、全員が全員無事に目覚められるわけではないというFalloutらしいグロテスクな真実が明かされそうです。</div>',
        post: 'Vault 31の「バズ・バッズ」メンバー「ピート」のロア記事を公開しました！🧊\nハンクの戦前の同僚の一人であり、彼らと共にVault 31の冷凍睡眠計画に参加した青年です。しかしシーズン2では、彼の身に何か非常にマズいこと（冷凍ポッドのトラブル？）が起きた描写があるようです…。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/pete-tv-series.html'
    },
    {
        id: 'petite-raider',
        enName: 'Petite raider',
        jpName: '小柄なレイダー',
        rawFile: 'petite_raider_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'レイダー集団' },
            { label: '役割', value: '偽装居住者' }
        ],
        bodyHtml: '<p>小柄なレイダー（Petite raider）は、リー・モルデイヴァーと共にVault 33を襲撃した地上出身のレイダーの一人です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第1話のVault 32との結婚の儀式にて、32の居住者と偽装してVault 33に入り込み、ルーシーたちの晩餐会のテーブルに座っていました。ステフの皿から勝手に食べ物をつまみ食いするなど、粗野な振る舞いを隠しきれていませんでした。<br><br>正体を現し戦闘が始まると、Vault 32のジャンプスーツの上半身を脱ぎ捨てて二刀流のナイフを取り出し、Vault 33の居住者たちを次々と惨殺して回りました。ノーム・マクレーンにも襲いかかろうとしますが、間一髪のところでルーシーの麻酔銃（トランキライザー）を眼球に撃ち込まれ、そのまま死亡しました。<br><br>その後、第3話では彼女を含む捕らえられた（生き残っていた）レイダーたちに対し、マリアンが食事を運搬する回想（または別の捕虜の姿）に登場します。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>「Vaultの平和で温室育ちな住民」と「血に飢えたウェイストランド人」の圧倒的なギャップを描いた、第1話のハイライトとなる戦闘シーンで暴れまわったレイダーです。<br><br>彼女の殺戮によって、平和ボケしていたVault 33の住民たちはウェイストランドの恐ろしさを骨の髄まで思い知らされることになります。麻酔銃を眼球に直撃させて絶命させるという、ルーシーの「不殺の武器の致命的な使い方」も見事でした。</div>',
        post: '第1話で暴れまわった「小柄なレイダー」のロア記事を公開しました！🔪\n結婚式に紛れ込んでいたレイダーの一人で、正体を現すや否や二刀流のナイフで平和ボケしたVault住民たちを次々と惨殺した恐ろしい女です。最終的にはルーシーの麻酔銃を眼球に撃ち込まれて絶命しました。ウェイストランドは地獄ですね…。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/petite-raider.html'
    },
    {
        id: 'powell',
        enName: 'Powell',
        jpName: 'ナース・パウエル',
        rawFile: 'powell_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 4' },
            { label: '役割', value: '看護師' }
        ],
        bodyHtml: '<p>ナース・パウエル（Nurse Powell）は、Vault 4の診療所で働く男性の看護師（ナース）です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第6話に登場し、額に鼻が二つある「ドクター・ノーズ・エドモンドソン」の助手として、マキシマスの傷の治療（腕から歯を抜き取る処置）を手伝っていました。<br><br>その後、Vault 4でシェイディ・サンズの生き残り（地上出身者）たちが集まって定期的に行っている「儀式（モルデイヴァーへの祈りと灰浴び）」が始まった際、ルーシーに対して「あれは地上人の伝統だよ。私からするとちょっと騒がしすぎる（rambunctious）けどね」と、生粋のVault居住者らしい少し引き気味のコメントを残してその場を去っていきます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Vault 4のもともとの居住者（変異者コミュニティ）と、新しくやってきた地上人たちとの絶妙な距離感を表すキャラクターです。<br><br>Vault 4の住人たちは地上からの避難民を優しく受け入れていますが、NCRの熱狂的な愛国心やモルデイヴァーへの狂信的な信仰までは共有しておらず、「なんだか騒がしい人たちだな」と一歩引いた目線で見ていることがわかります。</div>',
        post: 'Vault 4の「ナース・パウエル」のロア記事を追加しました！💊\nドクター・ノーズの助手をしている看護師です。Vault 4の住人たちは地上からの避難民を受け入れてはいるものの、彼らの「熱狂的なモルデイヴァーへの祈りの儀式」には賛同しておらず、「ちょっと騒がしすぎるんだよね」と微妙に引いているリアルな距離感が描かれています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/powell.html'
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
