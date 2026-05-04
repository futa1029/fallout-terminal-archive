const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'filly-vendor',
        enName: 'Filly vendor',
        jpName: 'フィリーの商人',
        rawFile: 'filly_vendor_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '様々' },
            { label: '所属', value: 'フィリー' },
            { label: '役割', value: '商人' }
        ],
        bodyHtml: '<p>フィリーの商人（Filly vendors）は、ジャンクの町フィリーに集まっている複数の売り手たちです。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>背景</h2><p>ロサンゼルス周辺の居住地であるフィリーの町において、屋台を出して様々な食料品やジャンクを売っている人々です。</p><h2>Fallout TVシリーズ</h2><p>第2話において、初めてフィリーの町を訪れたルーシーが彼らの前を通り過ぎました。<br>彼女は、新鮮な「イグアナ焼き（Iguana-on-a-stick）」を売っている商人に対して父親（ハンク）の行方に関する情報を尋ねましたが、冷たくあしらわれました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ゲームでお馴染みの「イグアナ焼き」など、ウェイストランド特有のゲテモノ食料を売っているフィリーの商人たちです。</div>',
        post: 'ジャンクの町に屋台を出している「フィリーの商人」のロア記事を公開しました！🦎\nゲームでお馴染みの「イグアナ焼き（Iguana-on-a-stick）」などのゲテモノ食料を売っており、ルーシーに話しかけられても冷たくあしらった無愛想な人々です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/filly-vendor.html'
    },
    {
        id: 'francesca-mahajan',
        enName: 'Francesca Mahajan',
        jpName: 'フランチェスカ・マハジャン',
        rawFile: 'francesca_mahajan_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: 'ジュニア・エグゼクティブ' }
        ],
        bodyHtml: '<p>フランチェスカ・マハジャン（Francesca Mahajan）は、大戦前のVault-Tec社におけるジュニア・エグゼクティブであり、現在はVault 31で冷凍保存されている人物です。</p><hr><h2>背景</h2><p>フランチェスカは、バド・アスキンスが主導するエグゼクティブ・アシスタント訓練プログラム「バズ・バッズ（Bud\'s Buds）」に選抜された若手社員の一人です。この計画は、最終戦争によってVault-Tec社の競争相手がすべて消滅した後の世界において、人類の未来を形作る「スーパーマネージャー」を育成することを目的としていました。</p><p>彼女や他の「バッズ」たちはVault 31で冷凍保存（クライオスタシス）されており、バド・アスキンスの管理下で定期的に解凍され、Vault 32やVault 33の居住者の管理や、管理された繁殖（優生学）の相手として派遣される手はずとなっていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Vault 31で冷凍保存されている「バズ・バッズ」のメンバーの一人です。<br><br>エルマー・グリーン同様、ノームがコンソールを閲覧した際のリストに記載されている名もなき「バッズ」の社員の一人ですね。</div>',
        post: 'Vault 31で冷凍保存されているバズ・バッズの一員「フランチェスカ・マハジャン」のロア記事を公開しました！❄️\nVault-Tec社の狂気的な優生学プログラムのためにポッドで眠っているモブ若手社員の一人です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/francesca-mahajan.html'
    },
    {
        id: 'frank-tv-series',
        enName: 'Frank (TV series)',
        jpName: 'フランク',
        rawFile: 'frank__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'なし' },
            { label: '役割', value: 'パーティー客' }
        ],
        bodyHtml: '<p>フランク（Frank）は、娘と共にロイの誕生日パーティーに出席していた人物です。Fallout TVシリーズのシーズン1（回想シーン）に登場します。</p><hr><h2>背景</h2><p>最終戦争が勃発した日に、ロサンゼルス周辺で行われていたクーパー・ハワードの友人「ボブ・スペンサー」の息子であるロイの誕生日パーティーに招かれていた親の一人です。</p><h2>Fallout TVシリーズ</h2><p>第1話冒頭の誕生日パーティー会場にて、フランクはボブの横に立ち、かつてのハリウッド大スターであったクーパー・ハワードが子供たちの前で投げ縄ショーを披露しているのを見ていました。<br>フランクは「クーパーのような世界的スターが、どうしてこんな一般家庭の誕生日パーティーの営業にきているんだ？」とボブに尋ね、ボブは「慰謝料を払うためさ」と教えられました。</p><p>その後、仕事と記念撮影を終えたクーパーが立ち去り際にお金を受け取るのを見て、フランクは「彼は（共産主義かぶれの）アカ野郎（pinko）だ」と吐き捨てますが、ボブは「それでも金は受け取るんだな」と皮肉交じりに同意しました。<br>子供がケーキの火を吹き消した直後、ロサンゼルスの街に無数の核ミサイルが着弾。閃光と衝撃波が窓ガラスを吹き飛ばし、阿鼻叫喚の中でボブの家の「防空壕」へと避難しようとしたフランクでしたが、我先に避難しようと焦ったボブ本人に顔面を強く殴られ、地面に倒れ伏してしまいました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>第1話冒頭の回想シーンにて、妻のせいで「共産主義者」とのレッテルを貼られていた当時のクーパーに陰口を叩いていた親です。<br><br>ボブとは普通に談笑していましたが、核攻撃という極限状態に陥った瞬間にそのボブ本人に顔面を殴られて防空壕への避難を阻止されるという、見事な人間賛歌（ディストピア）を体現する踏み台にされてしまいました。</div>',
        post: '第1話冒頭でボブ・スペンサーに殴られた客「フランク」のロア記事を公開しました！🎂\nクーパーに「アカ野郎」と陰口を叩いていましたが、核ミサイルが着弾して極限状態に陥った瞬間に、我先に我が家のシェルターへ避難しようとしたボブ本人に顔面を殴られて倒れた不運な人物です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/frank-tv-series.html'
    },
    {
        id: 'franks-daughter',
        enName: "Frank's daughter",
        jpName: 'フランクの娘',
        rawFile: 'frank_s_daughter_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'なし' },
            { label: '役割', value: 'パーティー客' }
        ],
        bodyHtml: '<p>フランクの娘（Frank\'s daughter）は、ロイの誕生日パーティーに出席していた子供です。Fallout TVシリーズのシーズン1（回想シーン）に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第1話冒頭、ロサンゼルス郊外で行われていたロイ（ボブ・スペンサーの息子）の誕生日パーティーに参加していた子供の一人です。<br>庭でクーパー・ハワードが馬に乗って披露した「投げ縄ショー」を他の子供たちと一緒に楽しんでいました。</p><p>その後、リビングルームでテレビを見ていた最中に核ミサイルが投下され、父親であるフランクに連れられてボブの家の防空壕へと逃げ込もうとしたものの、錯乱したボブがフランクを殴り倒してしまったことで、彼女も逃げ遅れて取り残されてしまいました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>フランクと一緒に来ていた名もなき可哀想な女の子です。<br><br>恐らくあそこで父親ともども核兵器により死亡もしくはグール化したと推測されます。</div>',
        post: '第1話冒頭のパーティー客「フランクの娘」のロア記事を公開しました！🎂\nクーパーの投げ縄を眺めて楽しんでいましたが、核ミサイルが投下された際、目前で錯乱したボブ（家主）に父親が殴り倒されたことで逃げ場を失ってしまった可哀想な子供です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/franks-daughter.html'
    },
    {
        id: 'frederick-sinclair',
        enName: 'Frederick Sinclair',
        jpName: 'フレデリック・シンクレア',
        rawFile: 'frederick_sinclair_raw.json',
        category: '人物',
        appearance: 'Fallout: New Vegas / Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'シエラ・マドレ / ビッグMT' },
            { label: '役割', value: '創設者 / 実業家' }
        ],
        bodyHtml: '<p>フレデリック・シンクレア（Frederick Sinclair）は、莫大な資産を有する大戦前の実業家であり、「シエラ・マドレ・カジノ（Sierra Madre）」の創設者・出資者です。<br>彼はゲーム『Fallout: New Vegas』のDLC「Dead Money」における中心的な歴史上の存在であり、ゲームの枠を超えてFallout TVシリーズのシーズン1（第8話）のフラッシュバックにおいても衝撃的な姿で登場します。</p><hr><h2>背景</h2><p>彼は大戦前のアメリカにおいて信じられないほどの富を築いた実業家です。<br>巨大カジノ「シエラ・マドレ」を建設した張本人であり、戦前のビッグMT（Big MT）の主要な顧客でもあり、彼らの実験的テクノロジー（ホログラムシステムやオートドック、悪名高い暗雲「クラウド」など）をカジノの防衛や娯楽のために大量に導入していました。</p><p>彼は有名女優「ヴェラ・キーズ（Vera Keyes）」を深く愛しており、彼女の為にシエラ・マドレのすべての金庫やシステムを彼女の声でのみロック解除できるようにするなど、その愛（あるいは妄執）は常軌を逸していました。</p><h2>Fallout TVシリーズ</h2><p>第8話における大戦前のロサンゼルスでの回想シーン（2077年）にて、Vault-Tec社の役員であるバーブ・ハワードが招集した「アメリカを裏から支配する大企業間の極秘会議」に、彼も「ビッグMT（Big MT）の主要な代表者・顧客」の一人として同席していました。<br>彼はこの会議でVault-Tecやロブコ・インダストリーズ、レプコン、ウエストテックなどのトップたちと共に、Vaultの優生学選別実験や、アメリカの未来を企業のものとするための「自らの手による核兵器の投下」という悪魔のような計画に参加・同意した一人として描かれています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Fallout New Vegasの超重要DLC「Dead Money」に登場するシエラマドレ・カジノの創始者が、まさかのドラマ本編の「極秘企業会議」の場に（一瞬ですが）登場するという特大のファンサービス！<br><br>彼自身がビッグMTとの凄まじいコネクションを持っていたこと、そしてVault-Tecが主導する核攻撃計画の場に同席していたという事実が描かれたことで、旧作のロアと最新のドラマのロアが見事にリンクしました。Mr.ハウスと共に「知ってる顔」が座っていたあの会議シーンは鳥肌ものでしたね。</div>',
        post: 'FNVの超重要人物「フレデリック・シンクレア」のTVシリーズでの姿を反映したロア記事を公開しました！💰\nなんとDLC「Dead Money」の舞台であるシエラ・マドレ・カジノの創設者本人が、ドラマ第8話の「Vault-Tecの極秘会議」の同席者として登場していました！ビッグMTとの繋がりや本作の黒幕設定を見事にリンクさせた特大のファンサービスです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/frederick-sinclair.html'
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
