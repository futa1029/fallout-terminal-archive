const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'sarah-clements',
        enName: 'Sarah Clements',
        jpName: 'サラ・クレメンツ',
        rawFile: 'sarah_clements_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault-Tec' },
            { label: '役割', value: 'Vault-Tec社員' }
        ],
        bodyHtml: '<p>サラ・クレメンツ（Sarah Clements）は、大戦前におけるVault-Tecコーポレーションの社員です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第3話にて、ハリウッドのスタジオでクーパー・ハワード（後のグール）のVault-Tec広告撮影に立ち会っていた Vault-Tec 側のスタッフとして登場します。<br><br>撮影現場でVaultジャンプスーツを着たクーパーから「本当にこれで放射線を防げるのか？」と無邪気に尋ねられた際、同席していたジョージやすぐ横にいたバーブ（クーパーの妻でありVault-Tec役員）からの無言のプレッシャーを受け、明らかに言葉を濁しながら「ええ…ええ、防げますよ」と嘘をつきました。<br>彼女のその戸惑った反応は、最初からジャンプスーツに放射線防御機能など（安価な量産品であるがゆえに）十分には備わっていないというVault-Tecの欺瞞を示していました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>大企業Vault-Tecの「平社員」らしい悲哀と隠蔽体質が描かれたキャラクターです。<br><br>妻のコネで広告塔になったクーパーに対して露骨に気を遣いつつも、自社製品の性能偽装（ジャンプスーツの放射線防御）について突っ込まれると、上司の顔色を窺って咄嗟に嘘をついてしまう姿は、ある意味で現代的なリアルさがあります。</div>',
        post: '戦前のVault-Tec社員「サラ・クレメンツ」のロア記事を追加しました！🎬\nハリウッドでのクーパーの広告撮影に立ち会っていた社員です。Vaultスーツについて「本当に放射線を防ぐの？」とクーパーに聞かれ、上司の顔色をうかがいながら明らかに嘘をついて言い淀む姿が、Vault-Tecの企業体質をよく表していました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/sarah-clements.html'
    },
    {
        id: 'scavenger-tv-series',
        enName: 'Scavenger (TV series)',
        jpName: 'スカベンジャー',
        rawFile: 'scavenger__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '複数' },
            { label: '所属', value: 'フィリー（Filly）' },
            { label: '役割', value: 'スカベンジャー' }
        ],
        bodyHtml: '<p>スカベンジャー（Scavenger）たちは、ウェイストランドの居住地「フィリー（Filly）」の周辺を拠点とする悪党の集団です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第3話において、マキシマスがフィリーの町外れに無防備に放置していたT-60パワーアーマーを発見して群がっていた6人組の荒くれ者（トムをリーダーとする男女）です。<br><br>戻ってきたマキシマスが返せと迫ると、2人が逃げ出しましたが、残る4人（トムや大男を含む）が「俺たちの物だ」とマキシマスに襲いかかりました。最初は集団でマキシマスをボコボコにして地面に叩き伏せ見逃そうとしましたが、血気盛んなマキシマスは配管用レンチや便座を武器にして第二ラウンドを開始し、次々と彼らを気絶させます。<br><br>リーダーのトムたちがマキシマスをパワーアーマーに押し当てて首を絞めようとしますが、マキシマスは隙を突いてパワーアーマーの左腕の中に自分の腕を滑り込ませ、ガントレットの強烈な油圧パワーでトムの頭部を本物のスイカのように握りつぶして勝利しました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ウェイストランドにおいて「放置された貴重なアイテム」に群がるハイエナたちです。<br><br>便座を片手に無双するマキシマスの活躍や、最終的にパワーアーマーの腕力で頭を握り潰される（というゲーム的なゴア表現）の生贄として、非常にFalloutらしい死に様を見せてくれた名モブキャラクターと言えます。</div>',
        post: 'パワーアーマーの前に群がっていた「スカベンジャー」のロア記事を公開しました！🛠️\nマキシマスが不用意に放置していたT-60を見つけてネコババしようとしたフィリーの住人たちです。最後は便座を構えたマキシマスと乱闘になり、パワーアーマーの左腕にあっけなく頭をスイカのように握り潰されるというFalloutらしいゴア表現を魅せてくれました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/scavenger-tv-series.html'
    },
    {
        id: 'scribe-tv-series',
        enName: 'Scribe (TV series)',
        jpName: 'スクライブ',
        rawFile: 'scribe__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '複数' },
            { label: '所属', value: 'B.O.S. (サンフェルナンド支部)' },
            { label: '役割', value: 'スクライブ（記録・通信手）' }
        ],
        bodyHtml: '<p>スクライブ（Brotherhood scribes / Technicians）は、ブラザーフッド・オブ・スティール（B.O.S.）において、情報の記録、通信、テクノロジーの維持管理などを担当する階級の兵士たちです。Fallout TVシリーズに登場する彼らは、「サンフェルナンド支部（Knights of San Fernando）」に所属しています。</p><hr><h2>Fallout TVシリーズ</h2><p>灰色の制服シャツの上に黒いベストを着用し、赤いスカーフを巻いた特徴的な制服を着ています。兵士（ナイトやスクワイア）の武闘派な装備とは対照的に、技術作業に特化した軽装です。<br><br>シーズン1では、基地内で通信機を操作して外部からの無線報告を記録したり、あるいは無線で伝えられる身体的特徴の情報を元に「ウィルギグ博士の精巧な似顔絵（手配書）」を鉛筆でグリッド紙にスケッチするなど、B.O.S.の「知識と情報」を司る専門職としての役割を果たしていました。<br>また、中庭でのクインタス長老による演説や、出撃のブリーフィング等にも立ち会っています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ゲームでは「失われたテクノロジーの探求と保管」という最もB.O.S.らしい仕事をしている階級ですが、ドラマ版では前線に出ることはなく、通信司令部のオペレーターのような役回りで背景に登場していました。<br><br>無線情報だけで正確な似顔絵を描き上げるアナログな技術力は、コンピューターが貴重なFalloutの世界ならではの職人技です。</div>',
        post: 'B.O.S.の技術・通信担当「スクライブ」のロア記事を追加しました！📻\nドラマ版のサンフェルナンド支部では赤いスカーフが特徴の制服を着ており、基地の最深部で通信や情報処理を担当しています。無線で送られてきた情報だけで精密な手配書の似顔絵を描き上げるなど、ウェイストランド特有のアナログな職人技を見せていました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/scribe-tv-series.html'
    },
    {
        id: 'sebastian-leslie',
        enName: 'Sebastian Leslie',
        jpName: 'セバスチャン・レスリー',
        rawFile: 'sebastian_leslie_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: '大戦前のアメリカ' },
            { label: '役割', value: '俳優（Mr.ハンディの声優）' }
        ],
        bodyHtml: '<p>セバスチャン・レスリー（Sebastian Leslie）は、大戦前のアメリカのハリウッドで活躍していた俳優であり、クーパー・ハワードの友人でした。Fallout TVシリーズのシーズン1に登場します。（演：マット・ベリー）</p><hr><h2>Fallout TVシリーズ</h2><p>第6話に登場します。彼はプレ・ウォーのハリウッドで「バーソロミュー・コズワース」というキャラクターを演じて名を馳せたコメディ俳優（イギリス英語の訛りが特徴）でした。<br><br>彼はゼネラル・アトミックス社から「Mr.ハンディ」シリーズのロボットに組み込むための『声の権利』の提供オファーを受け、18万6000ドルで永久に買い取られました。その契約の際、報酬の一部として彼自身の家にも特注のMister Handyが配備されましたが、彼はクーパーに対して「自分の家で、自分の声で喋る召使いロボットの声を聞くのはなんとも気味が悪い」と不満をこぼしていました。<br><br>クーパーがマッカーシズム（赤狩り）の煽りを受けて業界から干され「世界の終わり」に対して不安を抱いていた際、彼は「ハリウッドなんてもう終わりだ。これからの未来は『製品（プロダクト）』だ。お前も私も製品になるんだ。上手く時流に乗れば未来は黄金だぞ」と語り、金儲け主義へと傾倒していく戦前の末期のアメリカ社会を体現するようなセリフを残しています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>全Falloutプレイヤーが何百時間も聞き続けてきた、あの汎用ロボット「Mr.ハンディ」（そしてFallout 4のコズワース）の「オリジナルの声帯（声優）」の正体であったという、特大の神ロアの持ち主です。<br><br>彼の声の権利は完全にゼネラル・アトミックス社に買い取られたため、200年後のウェイストランドでも数え切れないほどのMr.ハンディたちが彼の声で狂ったことを話し続けていると思うと、彼自身が「未来はプロダクトだ」と言った通りの少し皮肉な結果になっています。</div>',
        post: '戦前の俳優「セバスチャン・レスリー」のロア記事を公開しました！🇬🇧\nあのMr.ハンディ（及びコズワース）の「あの独特な声」をゼネラル・アトミックス社に売った声優本人です！クーパーの戦前の友人でもあり、「これからは演技ではなく、自分自身を商品（プロダクト）として売る時代だ」と語りました。Falloutの実写化における最高のロア補完の一つですね。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/sebastian-leslie.html'
    },
    {
        id: 'shady-sands-citizen-tv-series',
        enName: 'Shady Sands citizen (TV series)',
        jpName: 'シェイディ・サンズの市民',
        rawFile: 'shady_sands_citizen__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '複数' },
            { label: '所属', value: 'New California Republic (NCR)' },
            { label: '役割', value: '市民' }
        ],
        bodyHtml: '<p>シェイディ・サンズの市民（Shady Sands citizens）は、新カリフォルニア共和国（NCR）の首都であった「シェイディ・サンズ」の居住者たちです。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>本作では既に「シェイディ・サンズの崩壊（Fall of Shady Sands）」が発生した後の時代が舞台となっているため、市民たちは主にシーズン2の回想シーンとしての登場となります。<br><br>過去のNCRの首都において、ハンク・マクレーンが引き起こした核攻撃による都市の消滅の直前の出来事や、そこで暮らしていた人々の平和な日常がいかにして奪われたかが断片的に描かれます。（作中では名前のない背景の非核武装市民として描写されます）</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>かつてFallout 1、Fallout 2、そしてNew Vegasでプレイヤーが見守り、発展に貢献してきたウェストコースト最大の文明国「NCR」の首都の住民たちです。<br><br>ドラマ版でシェイディ・サンズが核のクレーターと化したことは多くのファンに衝撃を与えましたが、シーズン2の回想でその当事者たちが描かれることで、より悲劇性が高まることになります。</div>',
        post: '「シェイディ・サンズの市民」のロア記事を追加しました！🏙️\n作中ではすでに核攻撃で消滅してしまったNCRの首都に住んでいた人々です。シーズン2では過去の回想シーンにて、Vault-Tecのハンク・マクレーンによってこの街の平和な日常がどのように奪われたのか、崩壊の直前の彼らの姿が描かれることになります。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/shady-sands-citizen-tv-series.html'
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
