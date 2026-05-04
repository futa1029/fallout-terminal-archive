const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'knight-tv-series',
        enName: 'Knight (TV series)',
        jpName: 'ナイト',
        rawFile: 'knight__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '様々' },
            { label: '所属', value: 'ブラザーフッド・オブ・スティール (B.O.S.)' },
            { label: '役割', value: 'ナイト（パラディンの前段階）' }
        ],
        bodyHtml: '<p>ナイト（Knight）は、ブラザーフッド・オブ・スティール（B.O.S.）における階級の一つであり、Fallout TVシリーズのシーズン1およびシーズン2において「サンフェルナンドのナイトたち（Knights of San Fernando）」と呼ばれる支部を中心に多数の人物が登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>B.O.S.の戦闘員であり、パワーアーマー（作中では主にT-60）を装備することを許された実働部隊です。<br>彼らは通常、従者（スクワイア）を付き従えて長期間の任務に就きます。ドラマ作中においては、ナイト・タイタスを筆頭に、多くのナイトがB.O.S.の威信を示す存在として描かれます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>FalloutにおけるB.O.Sの「花形」であり、ウェイストランドで最も恐れられる存在である「パワーアーマーを着た騎士」たちです。<br><br>ただしドラマ版においては「自分の武器のメンテナンスもできない」「従者をゴルフキャディのように扱う」といった腐敗した一面も描かれています。彼らの階層構造がドラマのメインテーマの一つとなっています。</div>',
        post: 'B.O.S.の「ナイト」のロア記事を追加しました！🛡️\nFalloutの代名詞とも言えるT-60パワーアーマーを装備したエリート戦闘員たちです。ドラマ版では彼らの傲慢な一面や、従者を虫ケラのように扱う様子など、今のB.O.S.の「腐敗」を象徴するキャラクター群としても描かれていました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/knight-tv-series.html'
    },
    {
        id: 'lacerta-legate',
        enName: 'Lacerta Legate',
        jpName: 'ラセルタ軍団長',
        rawFile: 'lacerta_legate_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'シーザー・リージョン' },
            { label: '役割', value: '軍団長（新たなシーザー）' }
        ],
        bodyHtml: '<p>ラセルタ・レガテス（Lacerta Legate）は、モハビ・ウェイストランドで活動する超巨大レイダー軍団「シーザー・リージョン（Caesar\'s Legion）」の軍団長（レガテス）です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>背景</h2><p>かつては（本物の）シーザーの軍団に仕える軍団長（Legate）の一人でした。しかしシーザーの死後や軍団の弱体化による内戦の中で、2296年現在、彼は自らこそが「新たなシーザー」であると宣言し、モハビに君臨する巨大ファクションのトップとして活動しています。（※マコーレー・カルキン演）</p><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Profligate」などのエピソードに登場します。<br>ニューベガスやモハビを舞台とするシーズン2において、NCRやMr.ハウス（あるいは残党）らと覇権を争う勢力として、ルーシーらとどう接触するかが描かれます。ドラマ内で彼はルーシーに対し「アメリカに残されたのは、その（システムが）失敗したという圧倒的な証拠だけだ」と語りかけます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ついにドラマに登場する軍団「シーザー・リージョン」の新たな指導者です。<br><br>演じるのは『ホーム・アローン』で有名なマコーレー・カルキンという物凄い配役でした。『New Vegas』から15年が経過した現在、リージョンが内戦状態にある（あるいは分裂した）という考察を裏付けるような存在であり、彼が「自称シーザー」としてどう暴れまわるのか、非常に期待が高まります！</div>',
        post: 'シーザー・リージョンの新たな指導者「ラセルタ軍団長」のロア記事を公開しました！🔥\nなんと演じるのはマコーレー・カルキンです！『New Vegas』後のモハビで「新たなシーザー」を自称して軍団を率いている新キャラクターであり、シーズン2における最大のファクションリーダーとなる予感がします。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/lacerta-legate.html'
    },
    {
        id: 'last-president-of-the-united-states',
        enName: 'Last President of the United States',
        jpName: 'アメリカ合衆国大統領',
        rawFile: 'last_president_of_the_united_states_raw.json',
        category: '人物',
        appearance: 'Fallout TV / 過去作',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'エンクレイヴ' },
            { label: '役割', value: 'アメリカ合衆国の最後の元首' }
        ],
        bodyHtml: '<p>アメリカ合衆国最後の元首（Last President of the United States）は、大戦前のアメリカに存在した最後の大統領です。これまでのFallout作品群（FO2、FO3、NV、FO76など）でたびたび言及されてきた存在でしたが、Fallout TVシリーズのシーズン2において初めてその姿（クランシー・ブラウン演）が映像化されました。</p><hr><h2>背景</h2><p>大戦前（2070年代）、世界が核の炎に包まれる直前のアメリカ合衆国を指揮していた大統領です。<br>彼は政府や軍需産業のシャドウ・キャビネット（影の内閣）と手を結び、「エンクレイヴ（Enclave）」として自らと特権階級の生存権のみを確保するため、ポセイドン・オイル・リグなどへと逃亡しました。<br>各Vaultやウェイストランドの至る所で見つかる戦前の新聞やポスターに彼の言葉が数多く引用されています。</p><h2>Fallout TVシリーズ</h2><p>シーズン2の回想シーン（第7話など）において登場します。<br>アメリカが各国との関係悪化や資源戦争の泥沼化に陥る中、Vault-Tecをはじめとする巨大企業との関係性など、「世界の終わり」にアメリカ合衆国政府が何をしていたのかが描かれるようです。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Falloutの世界で永遠に語り継がれている「あのクソッタレな戦前のアメリカ大統領」がついに映像化されました。<br><br>演じるクランシー・ブラウンの貫禄が凄まじく、すべての悲劇の元凶でもあるエンクレイヴの「顔」としてこれ以上ないキャスティングです。「核爆弾を落とす必要はないが……」と新聞で語っている通り、中国との最終戦争を文字通り最前線で指揮していた存在です。</div>',
        post: '「アメリカ合衆国（最後の）大統領」のロア記事を公開しました！🇺🇸\n歴代ゲームでも「ポセイドン・リグに逃亡したエンクレイヴの元首」として語り継がれてきたあの「戦前最後の大統領」がシーズン2でついに映像化！「世界の終わり」の引き金を引いた張本人の一人がどのような言葉を遺すのか必見です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/last-president-of-the-united-states.html'
    },
    {
        id: 'laurence-ronald',
        enName: 'Laurence Ronald',
        jpName: 'ローレンス・ロナルド',
        rawFile: 'laurence_ronald_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 31 / Vault 33' },
            { label: '役割', value: '過去の監督官' }
        ],
        bodyHtml: '<p>ローレンス・ロナルド（Laurence Ronald）は、大戦前のVault-Tecの若手社員（ジュニア・エグゼクティブ）であり、後にVault 33の監督官となった人物です。Fallout TVシリーズのシーズン1において名前が登場します。</p><hr><h2>背景</h2><p>バド・アスキンスの特別訓練計画「バズ・バッズ」のメンバーの一人として、大戦中は「Vault 31」の中に冷凍睡眠状態で保管されていました。<br>その後（2125年以降から2271年の間）、Vault 31から解凍されて「Vault 33」の監督官として派遣され、Vault-Tecの「スーパーマネージャー」として理想的なコミュニティ作り（という名目の優生学的な交配プログラム）を行う役割を担いました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ベティやハンクの一代前か二代前に監督官をやっていた人物です。<br><br>ドラマ内でノームが閲覧したVault 33の歴代監督官のログに記録されていた名前です。このようにVault 31にいる「バズ・バッズ」たちが定期的に解凍され、順番に監督官を回しながら（都合よく権力を独占しながら）居住者たちの遺伝子管理を行っていたことがわかります。</div>',
        post: '「ローレンス・ロナルド」のロア記事を追加しました！📘\nかつてVault 33の監督官を務めていた人物であり、彼もまたVault 31の冷凍ポッドから解凍されて派遣されたVault-Tecの「バズ・バッズ」のメンバーでした。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/laurence-ronald.html'
    },
    {
        id: 'lee-moldaver',
        enName: 'Lee Moldaver',
        jpName: 'リー・モルデイヴァー',
        rawFile: 'lee_moldaver_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: '新カリフォルニア共和国 (NCR)' },
            { label: '役割', value: '常温核融合の研究者' }
        ],
        bodyHtml: '<p>リー・モルデイヴァー（Lee Moldaver）は、Vault 4の住人たちから「炎の母（Flame Mother）」として崇められ、ウェイストランドで新カリフォルニア共和国（NCR）の残党を率いるリーダーです。<br>大戦前の世界においては「ミス・ウィリアムズ（Miss Williams）」という名で知られていた常温核融合の天才的な研究者であり、Fallout TVシリーズのシーズン1における最重要人物の一人です。</p><hr><h2>背景</h2><p>大戦前の2070年代、彼女はすべての人類に無限のエネルギーをもたらす「常温核融合（Cold Fusion）」の研究を行っていましたが、Vault-Tec（あるいは関連する巨大企業）によってエネルギーの独占を脅かすとして研究を奪われました。その後、彼女は反Vault-Tec（反政府）の思想活動家「ミス・ウィリアムズ」としてハリウッドの地下で秘密裏に活動し、クーパー・ハワードにVault-Tecの闇を気づかせました。<br>何らかの手段によって核の炎と200年の歳月を生き延びた彼女は、戦後の世界（2280年代）でルーシーの母親であるローズと出会い、シェイディ・サンズ（NCR）のために再び常温核融合の復活を目指しました。</p><h2>Fallout TVシリーズ</h2><p>シーズン1の第1話で「Vault 32の居住者」を装ってVault 33を襲撃し、ハンク・マクレーンを地上へと拉致した「恐ろしい悪党のレイダー」として登場します。<br>しかし物語が進むにつれ、彼女の真の目的が「Vault-Tecへの復讐」と「ウェイストランドに無限のエネルギーを取り戻すこと」であったことが明らかになります。<br><br>最終話において、彼女はグリフィス天文台でシギから取り出した「常温核融合のコア」を起動させ、崩壊したロサンゼルスの街に再び「光」を取り戻しましたが、直前に受けた傷が原因でマキシマスにすべてを託し、静かに息を引き取りました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ドラマ開始当初は「主人公の父親を奪った憎き極悪レイダー」という描かれ方で登場し、最後まで見ると「Vault-Tecの狂気から世界を救い、人類のための光を取り戻そうとした真の英雄」であったことがわかる、見事な脚本の要となるキャラクターです。<br><br>200年以上生き延びた方法については明言されていませんが、彼女もまたどこかのVaultのクライオ・ポッド（あるいは個人的な冷凍睡眠装置）を使っていた可能性が高いです。「炎の母」として死してなお語り継がれるであろう伝説の人物です。</div>',
        post: 'NCRの残党を率いるリーダー「リー・モルデイヴァー」のロア記事を公開しました！🔥\n序盤は凶悪なレイダーの親玉として描かれ、後半において「大戦前からすべてのエネルギー問題を解決しようとし、Vault-Tecの狂気から人類を救おうとした天才」であることが明かされる本作屈指の名キャラクターです！\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/lee-moldaver.html'
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
