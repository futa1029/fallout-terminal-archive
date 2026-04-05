const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'lucky-38-securitron',
        enName: 'Lucky 38 Securitron',
        jpName: 'ラッキー38・セキュリトロン',
        rawFile: 'lucky_38_securitron_raw.json',
        category: '人物（ロボット）',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: 'セキュリトロン' },
            { label: '所属', value: 'ラッキー38 / Mr.ハウス' },
            { label: '役割', value: '護衛ロボット' }
        ],
        bodyHtml: '<p>ラッキー38・セキュリトロン（Lucky 38 Securitron）は、Fallout TVシリーズのシーズン2に登場するロボットです。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Wrangler」において、大戦前のラッキー38（ロブコが建設に関わったとされるカジノ）で行われた何らかの防衛産業の会議（Defense Contractors\' Summit party）の場で、警備を行っている姿が確認されています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>『New Vegas』のロブコ製護衛ロボット「セキュリトロン」が実写化されてシーズン2に登場します！<br><br>ドラマのシーズン1最終話でMr.ハウス本人が登場した時点で予想はできましたが、彼を象徴するこのロボットが動いている姿すら見られるとは胸熱ですね。大戦前のストリップ地区（あるいはラッキー38）が実写でどう描かれているのかも楽しみに待ちたいと思います。</div>',
        post: '「ラッキー38・セキュリトロン」のロア記事を公開しました！🤖\n『New Vegas』のMr.ハウス率いるロブコ製護衛ロボットが、ついにシーズン2で実写映像化されます！大戦前のラッキー38にて警備を行っている姿が映るようです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/lucky-38-securitron.html'
    },
    {
        id: 'lucy-maclean',
        enName: 'Lucy MacLean',
        jpName: 'ルーシー・マクレーン',
        rawFile: 'lucy_maclean_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault 33' },
            { label: '役割', value: '歴史・倫理学の教師（主人公）' }
        ],
        bodyHtml: '<p>ルーシー・マクレーン（Lucy MacLean）は、Fallout TVシリーズの主人公の一人であり、ロサンゼルスの地下にある「Vault 33」で育った純真な居住者（Vault Dweller）です。<br>彼女の視点を通じて、視聴者は放射線に汚染された過酷な「ウェイストランド」の現実を体験していくことになります。</p><hr><h2>背景</h2><p>Vault 33の監督官である「ハンク・マクレーン」を父に持ち、弟のノームと共に何不自由ない地下の平和な環境で「古き良きアメリカの理想」を信じて育ちました。彼女の職業は歴史と倫理学の教師であり、各種スポーツ・体操・銃器の扱い（ターゲット射撃）など、Vaultのカリキュラムを優秀な成績で修了した明るく前向きな女性でした。</p><h2>Fallout TVシリーズ</h2><p>2296年、自身の結婚式の日に突如として他Vaultの住人を装った「レイダー」たち（リー・モルデイヴァー率いる部隊）にVault 33が襲撃され、父親のハンクが地上へと連れ去られてしまいます。<br>父を救い出すため、彼女は安全なVaultの掟を破り、ただ一人で危険なウェイストランドへと足を踏み出しました。<br><br>地上では、冷酷な賞金稼ぎである「グール（クーパー）」や、B.O.S.の兵士「マキシマス」といった全く異なる価値観を持つ人々との出会いを経て、世界の厳しい現実（ルールがないこと）を学んでいきます。<br>彼女の持ち前の黄金律（ゴールデン・ルール：他人にしてもらいたいことを、自分も他人にしなさい）の精神は、たびたび地上の荒んだ倫理観と衝突しますが、それでも彼女は「自分を見失わずに生き抜く」ことの強さを証明していきます。<br><br>シーズン1の終わりには、自分が信じていたVault-Tecの陰謀や、母の死の真実、そして「父ハンクの本当の正体」を知るという残酷な結末を迎えます。それでも彼女は、すべての真相を明らかにするため、グールと共に新たな旅へと向かいました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>純度100%の「Falloutの主人公」らしい主人公です。ゲームを始めたばかりの「善人プレイをしようとしているプレイヤー」そのものを見ているかのような行動を取り続け、最終的に地上の過酷な倫理観に少しずつ適応していく姿は、シリーズファンから見ても完璧な「Vault居住者のロールプレイ」でした。<br><br>単なるお人好しではなく、首を切り落とすことに適応したり、麻酔銃を巧みに操って窮地を脱したりと、サバイバル能力がしっかり高いところも魅力的なキャラクターです。（※エラ・パーネル演）</div>',
        post: 'ドラマ版の主人公「ルーシー・マクレーン」のロア記事を遂に公開！👍\n『Fallout』の初心者が陥りがちな「綺麗事だけでは生きていけないウェイストランドの洗礼」を完璧な形で体現した最高の主人公です！過酷な現実に直面しながらも、それでも黄金律（善き心）を捨てずに適応していく彼女の姿に胸を打たれました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/lucy-maclean.html'
    },
    {
        id: 'ma-june',
        enName: 'Ma June',
        jpName: 'マ・ジューン',
        rawFile: 'ma_june_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'フィリー (Filly)' },
            { label: '役割', value: '雑貨屋マ・ジューンズの店主' }
        ],
        bodyHtml: '<p>マ・ジューン（Ma June）は、ジャンクで作られた町「フィリー（Filly）」で雑貨屋を営む店主です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第2話などに登場し、Vaultから出て間もないルーシーが地上で最初に出会うまともな（？）商人です。<br>過酷な地上の現実を象徴するようなシビアな老婆であり、Vaultから来た世間知らずのルーシーに対して「お前らのようなイワシ野郎は全員死んだもんだと思っていた」と痛烈なセリフを投げかけました。<br>エンクレイヴから逃亡してきた科学者（シギ）の知り合いであり、モルデイヴァーへの橋渡し役も担っていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>まさに「Falloutに出てくる初めの村の癖の強い商人」といった趣の最高のキャラクターです。<br><br>ゲーム内でプレイヤーが大抵最初に出会う、ちょっと口が悪いけど話は通じて、後々もなんとなく関わりを持つ雑貨屋の店主を見事に実写化しています。地上におけるVault居住者の扱い（基本的には無知で金持ちの世間知らずとして馬鹿にされている）を端的に表してくれました。</div>',
        post: 'フィリーの雑貨屋店主「マ・ジューン」のロア記事を公開しました！🛒\n地上に出たルーシーが初めて出会うシビアな商人です。Vault居住者への容赦ない毒舌とサバイバルの厳しさを教える姿は、まさにゲームで最初に会う村の商人を体現した素晴らしいキャラクターでした。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/ma-june.html'
    },
    {
        id: 'man-in-shadows',
        enName: 'Man in shadows',
        jpName: '暗がりに立つ男',
        rawFile: 'man_in_shadows_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'エンクレイヴ（推測）' },
            { label: '役割', value: '会合の監視者' }
        ],
        bodyHtml: '<p>暗がりに立つ男（Man in shadows / Shadowy figure）は、Fallout TVシリーズのシーズン1最終話において、Vault-Tecと六大企業による極秘の会合の場を「文字通り陰から監視していた」謎の人物です。</p><hr><h2>Fallout TVシリーズ</h2><p>大戦前の最終話の回想シーンにおいて、バーブやバド・アスキンス、そして各企業のトップたちが「自らの手で核爆弾を落として世界を終わらせる計画（社会実験の独占）」について話し合っている最中、高台の暗い監視窓の奥からその様子を見下ろしているシルエットだけが映し出されました。<br>その際、バーブのPip-boyに何らかのメッセージが届き、彼女が上の窓を見上げたため、彼がこの会議の「真の黒幕」あるいはさらに上の上位権力者であることが示唆されています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>おそらく「エンクレイヴ（The Enclave）」の代表者であると海外ファンの間でも考察されている謎の人物です。<br><br>Vault-Tecの上にさらに「アメリカのシャドウ・キャビネット（影の政府）」が存在し、企業の計画すらもエンクレイヴの手のひらの上であったという、Falloutの根源的なロア（Vaultは彼らのための社会実験場に過ぎないという真実）を匂わせる鳥肌モノの演出でした。シーズン2で登場するであろう「戦前最後の大統領」との関係も気になりますね。</div>',
        post: '「暗がりに立つ男」のロア記事を公開しました！👤\nシーズン1の最終話、Vault-Tecと六大企業による忌まわしき秘密会合を「上の監視窓から見下ろしていた」謎の人物です。Vault-Tecすらも裏から操っていたであろう「エンクレイヴ」の存在を強烈に匂わせる素晴らしい伏線キャラクターでした。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/man-in-shadows.html'
    },
    {
        id: 'march-sherwood',
        enName: 'March Sherwood',
        jpName: 'マーチ・シャーウッド',
        rawFile: 'march_sherwood_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '不明' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: 'ジュニア・エグゼクティブ' }
        ],
        bodyHtml: '<p>マーチ・シャーウッド（March Sherwood）は、大戦前のVault-Tecの若手社員（ジュニア・エグゼクティブ）です。Fallout TVシリーズのシーズン1に名前が登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>バド・アスキンスの訓練プログラム「バズ・バッズ」のメンバーとして、大戦後は「Vault 31」の中に冷凍睡眠（クライオ・スタシス）状態で保存されています。<br>ノームが確認した居住者名簿にその名前が記載されていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Vault 31で待機中の「バズ・バッズ」のメンバーの一人です。<br><br>ポッドの中でスーパーマネージャーとして解凍されるのを待っています。</div>',
        post: 'Vault 31に眠る社員「マーチ・シャーウッド」のロア記事を追加しました！🧊\nドラマの最終話で名簿上で確認できる、冷凍ポッド内で眠り続けるVault-Tecの「バズ・バッズ」メンバーの一人です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/march-sherwood.html'
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
