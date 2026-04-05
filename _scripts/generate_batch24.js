const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'jim-tv-series',
        enName: 'Jim (TV series)',
        jpName: 'ジム',
        rawFile: 'jim__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: '不明（大戦前）' },
            { label: '役割', value: '不明' }
        ],
        bodyHtml: '<p>ジム（Jim）は、大戦前のロサンゼルスの酒場（バー）にいた人物です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の第1話「The Innovator」における大戦前（2077年）のシーンで登場するようです。<br>酒場で一緒に時間を潰していたビルやダンといった友人たちと一緒に登場します。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2の第1話に登場する、大戦前のロサンゼルスの酒場のモブ客です。<br><br>2077年とすれば、ちょうど核爆弾が落ちたあの日（第1話の冒頭や「The End」）などと同じ時間軸の出来事を目撃するキャラクターの一人になるかもしれません。</div>',
        post: '「ジム」のロア記事を公開しました！🍺\nシーズン2第1話の大戦前の回想シーンに登場する、ロサンゼルスの酒場にいる客の一人です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/jim-tv-series.html'
    },
    {
        id: 'joan-tv-series',
        enName: 'Joan (TV series)',
        jpName: 'ジョアン',
        rawFile: 'joan__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'ウラン・シティ強制収容所' },
            { label: '役割', value: 'カナダ人収容者' }
        ],
        bodyHtml: '<p>ジョアン（Joan）は、大戦前に「ウラン・シティ強制収容所（Uranium City Internment Camp）」に抑留されていたカナダ人市民であり、Vault 33に住むステフの母親です。Fallout TVシリーズのシーズン2における回想シーンに登場します。</p><hr><h2>背景</h2><p>ジョアンは、米軍による「カナダ併合（United States annexation of Canada）」の最中に、米軍によってウラン・シティの強制収容所に抑留されたカナダ人市民です。<br>この歴史的経験から、彼女はアメリカ人という存在に対して強い憎悪を抱いており、その考え方を娘のステファニー・ハーパー（ステフ）にも植え付けていました。</p><h2>Fallout TVシリーズ</h2><p>シーズン2の第7話「The Handoff」の回想シーンに登場します。<br>2070年代のある時点で、彼女と娘のステフは強制収容所から脱走を試みますが、ベルチバードと米海兵隊に追い詰められます。「収容所に戻らなければ撃つ」と脅される中、彼女は娘に向かって「あいつらを人間だと思ってはならない。アメリカ人だと思いなさい」と最後の言葉を遺すというショッキングな過去が描かれるようです。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2で明かされるFalloutロアの超重要人物であり、なんとVault 33のマイルドなママであった「ステフ」の本当の母親です！<br><br>アメリカによるカナダ併合という暴挙の被害者であり、強制収容所に入れられていたという重すぎる過去を持っています。この経験が、Vaultの表向きの「アメリカ的理想」に対するステフの歪んだ内面にどう影響したのかがシーズン2の大きな見どころになりそうですね。</div>',
        post: '「ジョアン」のロア記事を公開しました！🇨🇦\nなんとVault 33にいたあの娘「ステフ」の本当の母親です！彼女たちはかつてアメリカによるカナダ併合の被害者として強制収容所に入れられており、アメリカ人に対して強い憎悪を抱かせていたことがシーズン2の回想で明らかになります。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/joan-tv-series.html'
    },
    {
        id: 'joan-polansky',
        enName: 'Joan Polansky',
        jpName: 'ジョアン・ポランスキー',
        rawFile: 'joan_polansky_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: 'ジュニア・エグゼクティブ' }
        ],
        bodyHtml: '<p>ジョアン・ポランスキー（Joan Polansky）は、大戦前のVault-Tecの若手社員（ジュニア・エグゼクティブ）です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>バド・アスキンスのアシスタント訓練プログラム「バズ・バッズ」に参加するために選ばれたVault-Tec社員の一人でした。<br>「Vault 31」の中で冷凍睡眠（クライオ・スタシス）状態で保存されており、来るべき日のために「スーパーマネージャー」として目覚めるのを待っています。<br>最終話において、彼女の名前がクリップボードの居住者名簿に記載されているのが確認できます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Vault 31で冷凍保存されている「バズ・バッズ」のメンバーの一人です。<br><br>ノームがVault 31の内部を探索した際、冷凍ポッドの横にある端末や名簿などで確認できるモブ居住者（あるいは候補生）の名前の一つです。</div>',
        post: 'Vault 31の冷凍睡眠者「ジョアン・ポランスキー」のロア記事を公開しました！🧊\n大戦前のVault-Tecにおけるバド・アスキンスの訓練プログラム「バズ・バッズ」の一員であり、現在もVault 31のポッドの中で（スーパーマネージャーとして世界を支配する日のために）眠り続けています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/joan-polansky.html'
    },
    {
        id: 'joanne-wormwood',
        enName: 'Joanne Wormwood',
        jpName: 'ジョアン・ワームウッド',
        rawFile: 'joanne_wormwood_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: 'ジュニア・エグゼクティブ' }
        ],
        bodyHtml: '<p>ジョアン・ワームウッド（Joanne Wormwood）は、大戦前のVault-Tecの若手社員（ジュニア・エグゼクティブ）です。Fallout TVシリーズのシーズン1に名前が登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>ジョアン・ポランスキーらと同様に、バド・アスキンスのアシスタント訓練プログラム「バズ・バッズ」の一員として選ばれたVault-Tec社員です。<br>大戦後は「Vault 31」の中で冷凍睡眠（クライオ・スタシス）状態となっており、最終話においてノームが確認した名簿の中にその名前が記載されていました。<br>（将来的にVault 32または33の監督官となるべく、解凍される運命にあります）</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Vault 31に眠る数多くの「バズ・バッズ」の一員です。<br><br>ドラマ内で無数に並んでいた冷凍ポッドの中には、ハンクやベティ、ステフのような幹部候補生たちがまだまだ何十人も眠っていることがわかります。（もしかしたらシーズン2でも何人か解凍されるかもしれませんね）</div>',
        post: 'Vault 31のもう一人の冷凍睡眠者「ジョアン・ワームウッド」のロア記事を追加しました！🧊\n彼女もまたVault-Tecの若きエリート「バズ・バッズ」の一員であり、Vault 31の冷凍ポッドの中でコールドスリープに就いている社員の一人です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/joanne-wormwood.html'
    },
    {
        id: 'jorge',
        enName: 'Jorge',
        jpName: 'ホルヘ',
        rawFile: 'jorge_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'ハリウッド' },
            { label: '役割', value: '俳優' }
        ],
        bodyHtml: '<p>ホルヘ（Jorge）は、大戦前のハリウッドで活動していた俳優です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>背景</h2><p>西部劇映画『デッドホースの男（The Man from Deadhorse）』において、クーパー・ハワードと共演した俳優です。<br>彼は映画の中で「ジョーイ・トロ（Joey Toro）」という名の悪党を演じており、クライマックスでクーパーの役柄に撃ち殺されるという役どころでした。</p><h2>Fallout TVシリーズ</h2><p>カリフォルニア・クレスト・スタジオでの映画の撮影現場（回想シーン）で登場し、地面に這いつくばって命乞いをする演技をしていました。<br>その際、共演者であるクーパーが「脚本に納得がいかない」と言って演技を中断したため、ホルヘも演技を止めて戸惑いましたが、クーパーに手を引かれて起き上がり撮影現場から立ち去っていきました。<br><br>後年（2296年）、グールとなったクーパーは、スーパーウルトラ・マーケットの廃墟に放置されていたテレビで、偶然この時の映画が流れているのを目にすることになります。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>大戦前のクーパーの俳優時代のシーンにおける共演者の役者です。<br><br>クーパーが「（保安官は）銃で顔を吹き飛ばしたりはしない！」と言って悪役（ホルヘの役）を殺すことを拒否したあの映画のシーンです。皮肉にも200年後のクーパーは、あのシーンの通りに容赦なく人間の顔を吹き飛ばすレイダーのような男（グール）に成り下がってしまいました。</div>',
        post: '大戦前の映画俳優「ホルヘ」のロア記事を公開しました！🎥\n戦前期にクーパー主演の西部劇映画で悪役の「ジョーイ・トロ」を演じていた役者です。彼が命乞いをするシーンでのクーパーの演技中断は、その後のグールとしての悲哀に強く繋がる印象的な名シーンでした。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/jorge.html'
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
