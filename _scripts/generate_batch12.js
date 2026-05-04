const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'christyn-mari',
        enName: 'Christyn Mari',
        jpName: 'クリスティン・マリ',
        rawFile: 'christyn_mari_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: 'ジュニア・エグゼクティブ' }
        ],
        bodyHtml: '<p>クリスティン・マリ（Christyn Mari）は、大戦前のVault-Tec社におけるジュニア・エグゼクティブであり、現在はVault 31で冷凍保存されている人物です。</p><hr><h2>背景</h2><p>クリスティンは、バド・アスキンスが主導するエグゼクティブ・アシスタント訓練プログラム「バズ・バッズ（Bud\'s Buds）」に選抜された若手社員の一人です。この計画は、最終戦争によってVault-Tec社の競争相手がすべて消滅した後の世界において、人類の未来を形作る「スーパーマネージャー」を育成することを目的としていました。</p><p>クリスティンや他の「バッズ」たちはVault 31で冷凍保存（クライオスタシス）されており、バド・アスキンスの管理下で定期的に解凍され、Vault 32やVault 33の居住者の管理や、管理された繁殖（優生学）の相手として派遣される手はずとなっていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Vault 31の冷凍ポッドで眠る「バズ・バッズ」のメンバーの一人です。<br><br>ドラマ内では名前の表記のみなどで存在が示唆されている人物です。数百年かけてVault-Tec社の人間だけで地上を再構築しようという、彼らの果てしない執念が垣間見えます。</div>',
        post: 'Vault 31で冷凍保存されているVault-Tec社員「クリスティン・マリ」のロア記事を公開しました！❄️\nバドの人材育成プログラム「バズ・バッズ」のメンバーの一人で、Vault 32と33を管理するためにポッドで眠り続けています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/christyn-mari.html'
    },
    {
        id: 'claire-feldman',
        enName: 'Claire Feldman',
        jpName: 'クレア・フェルドマン',
        rawFile: 'claire_feldman_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: 'ジュニア・エグゼクティブ' }
        ],
        bodyHtml: '<p>クレア・フェルドマン（Claire Feldman）は、大戦前のVault-Tec社におけるジュニア・エグゼクティブであり、現在はVault 31で冷凍保存されている人物です。</p><hr><h2>背景</h2><p>クレアは、バド・アスキンスが主導するエグゼクティブ・アシスタント訓練プログラム「バズ・バッズ（Bud\'s Buds）」に選抜された若手社員の一人です。この計画は、最終戦争によってVault-Tec社の競争相手がすべて消滅した後の世界において、人類の未来を形作る「スーパーマネージャー」を育成することを目的としていました。</p><p>クレアや他の「バッズ」たちはVault 31で冷凍保存（クライオスタシス）されており、バド・アスキンスの管理下で定期的に解凍され、Vault 32やVault 33の居住者の管理や、管理された繁殖（優生学）の相手として派遣される手はずとなっていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>クリスティンと同じく、Vault 31で眠る「バズ・バッズ」のメンバーの一人です。<br><br>Vault 31内には無数のポッドが存在しているため、こうした名無しのエリート社員たちが他にもいくらでも眠っている状態です。</div>',
        post: '同じくVault 31の冷凍ポッドで眠るVault-Tec社員「クレア・フェルドマン」のロア記事を公開しました！❄️\nバドの手によってスーパーマネージャーとして選別された一人であり、今後のVaultの運命を左右しかねない存在です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/claire-feldman.html'
    },
    {
        id: 'clark-tv-series',
        enName: 'Clark (TV series)',
        jpName: 'クラーク',
        rawFile: 'clark__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: '居住者 / 社員' }
        ],
        bodyHtml: '<p>クラーク（Clark）は、Vault 31の居住者であり、Fallout TVシリーズのシーズン2に登場する人物です。</p><hr><h2>背景</h2><p>クラークは大戦前におけるVault-Tec社の従業員であり、バド・アスキンスによって運営されている「バズ・バッズ」プログラムの参加者として選ばれました。大戦前はロサンゼルス国際空港でハンク・マクレーンやピートらと共に過ごしている描写が残されています。</p><p>その後、人事（R&D）部門から選出された彼ら社員たちは、Vault 32やVault 33の「スーパーマネージャー」として繁殖と管理を行うためにVault 31のクライオポッドで冷凍保存（クライオスタシス）されることになりました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2の描写で登場するVault 31（バズ・バッズ）のメンバーです。<br><br>大戦前の空港でハンクらと一緒にいたという描写があるため、ハンクとは当時から面識があり、Vault-Tec内でもかなり近いポジションの人間だったことが窺えます。</div>',
        post: 'Vault 31の居住者であり、シーズン2に登場する「クラーク」のロア記事を公開しました！💼\n大戦前にはハンクたちと一緒に空港にいる姿が描かれており、Vault-Tec社の社員としてどのような関係性だったのかが気になるキャラクターです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/clark-tv-series.html'
    },
    {
        id: 'claudia-tv-series',
        enName: 'Claudia (TV series)',
        jpName: 'クラウディア',
        rawFile: 'claudia__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: '居住者 / 社員' }
        ],
        bodyHtml: '<p>クラウディア（Claudia）は、Vault 31の居住者であり、Fallout TVシリーズのシーズン2に登場する人物です。</p><hr><h2>背景</h2><p>大戦前のクラウディアはロサンゼルスに住んでおり、「パピー（子犬）」という皮肉な名前を故意に付けた猫を飼っていました。<br>2077年10月半ば、彼女はバド・アスキンスの人材育成プログラム「バズ・バッズ」の一員としてVault-Tec社の採用面接を受け、計画に組み込まれることになります。</p><p>その後、最終戦争が起こり、彼女もVault 31で冷凍保存されることになりました。そして2296年以降、Vault 31にて複数の人間が同時に解凍された際、彼女は「<i>もし全員が一度に解凍されたのなら、ついに再生の日（Reclamation Day）が来たんだわ！</i>」と非常に楽観的な声を上げて目覚めました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2の描写で新たに目覚めるVault 31のメンバーの一人です。<br><br>飼い猫にわざと「パピー（子犬）」と名付けたり、長いコールドスリープから目覚めて即「ついに再生の日が来た！」と喜んだりするあたり、バドが見極めた「スーパーマネージャー」特有の狂気的なポジティブさがよく表れているキャラクターだと思います。</div>',
        post: 'Vault 31で目覚めた陽気な社員「クラウディア」のロア記事を公開しました！🐱\n猫に「子犬」と名付けていたり、目覚めてすぐに「ついに再生の日が来た！」と喜んだりする、Vault-Tec社員らしい狂気的なポジティブさを持ったキャラクターです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/claudia-tv-series.html'
    },
    {
        id: 'cleric',
        enName: 'Cleric',
        jpName: 'B.O.S.クレリック',
        rawFile: 'cleric_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '様々' },
            { label: '所属', value: 'B.O.S. (サンフェルナンド支部)' },
            { label: '役割', value: '宗教的指導者' }
        ],
        bodyHtml: '<p>B.O.S.クレリック（Clerics）は、Fallout TVシリーズに登場するブラザーフッド・オブ・スティールの宗教的指導者たちを指す階級・役職です。</p><hr><h2>背景</h2><p>TVシリーズにおける「サンフェルナンドのナイトたち（Knights of San Fernando）」と呼ばれるB.O.S.支部において、クレリックたちは宗教的な儀式や信仰、候補生（アスピラント）たちの訓練・教練を監督する役割を担っています。<br>この階級には、指導者であるエルダー・クレリック・クインタスや、訓練教官として描かれていたクレリック・フェリックスなどの名有りの人物が含まれるほか、名前のない多数のクレリックが存在しています。</p><p>本編では、新兵の訓練やスクワイア（従者）への昇格儀式、罪人の尋問、そして「神聖なる使命」の布告など、同支部がカルト的・宗教的な側面を劇的に強めていることを象徴する役職として描かれました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ドラマ版B.O.S.の最大の特徴とも言える「カルト宗教的な役職」であるクレリック階級の総称です。<br><br>ゲーム版ではほとんど見ないこの役職が幅を利かせていることにより、西海岸B.O.S.がいかに独自（あるいは古風）の狂気的なコミュニティへと変貌したかが一目でわかるデザインとなっていますね。</div>',
        post: 'ドラマ版のB.O.S.を象徴する役職「B.O.S.クレリック」のロア記事を公開しました！📖\nサンフェルナンド支部のカルト的な側面を強調する宗教的指導者たち。儀式や尋問、洗脳に近い教育を行うなど、ゲーム版とはまた違った不気味な組織の雰囲気を醸し出しています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/cleric.html'
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
