const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'enclave-scientist-tv-series',
        enName: 'Enclave scientist (TV series)',
        jpName: 'エンクレイヴの科学者',
        rawFile: 'enclave_scientist__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '様々' },
            { label: '所属', value: 'エンクレイヴ' },
            { label: '役割', value: '科学者' }
        ],
        bodyHtml: '<p>エンクレイヴの科学者（Enclave scientists）は、エンクレイヴの研究拠点において各種研究に従事している人々です。</p><hr><h2>Fallout TVシリーズ</h2><p>第2話において、エンクレイヴの極秘軍事施設（研究コロニー）の様子が描かれます。<br>彼ら科学者たちは、軍用犬として新しく生まれた子犬（パピー）たちの健康状態と体重を検査しており、規定の重量に満たない子犬は躊躇なく即座に焼却処分するという冷酷な実験を行なっています。（そのうちの一人であるシギ・ウィルツィヒは、検査対象だったCX404を哀れみ、意図的に体重をごまかして合格させました）</p><p>また、成長した犬たちを獰猛な軍用犬へと仕立て上げるための訓練や注射を行っている他、ストレッチャーにスーパーミュータントの死体を乗せて運んでいる姿も確認できます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ドラマの第2話で描かれた、エンクレイヴの非情な軍用犬育成システムと研究に従事している科学者たちです。<br><br>規定の体重に満たない子犬や言うことを聞かない犬を容赦なく即座に炎で焼却しており、エンクレイヴという極右軍事組織がいかに血も涙もない「旧世界の人命軽視っぷり」を大戦後も残しているかが痛いほど伝わってくるシーンでした。</div>',
        post: 'エンクレイヴ研究拠点の「エンクレイヴの科学者」のロア記事を公開しました！🔬\n軍用犬の育成に従事しており、規定体重に満たない子犬は問答無用で焼却処分にするという、エンクレイヴ特有の非情で残酷な実験施設で働いている人々です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/enclave-scientist-tv-series.html'
    },
    {
        id: 'enclave-security-tv-series',
        enName: 'Enclave security (TV series)',
        jpName: 'エンクレイヴの警備員',
        rawFile: 'enclave_security__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'エンクレイヴ' },
            { label: '役割', value: '警備' }
        ],
        bodyHtml: '<p>エンクレイヴの警備員（Enclave security）は、研究施設内を警戒している兵士・警備員たちです。</p><hr><h2>Fallout TVシリーズ</h2><p>エンクレイヴの研究拠点（コロニー）において、科学者たちの実験室を巡回し、不正がないかを監視しています。</p><p>ウィルツィヒが子犬（CX404）を抱えて行動学の研究室から退出した際、警備員の一人が彼の身分と行動をスキャンして通過を許可しました。<br>その後、数年が経って管理者が警告アラームを鳴らした際、警戒状態に入った彼らが銃を構えて施設内を捜索する姿が描かれました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>エンクレイヴ施設内でウィルツィヒなどの科学者たちを警備（あるいは監視）している名もなき兵士たちです。<br><br>彼らが着ている軍服はお馴染みの「将校の制服（Enclave officer uniform）」となっており、ファンにとっては見慣れたデザインとなっています。</div>',
        post: 'エンクレイヴ拠点を警備する「エンクレイヴの警備員」のロア記事を公開しました！🔫\n第2話で描かれたエンクレイヴの巨大施設内を巡回し、科学者たちが不正を行わないよう監視を行なっている兵士たちです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/enclave-security-tv-series.html'
    },
    {
        id: 'excited-partygoer',
        enName: 'Excited partygoer',
        jpName: '興奮したパーティー客',
        rawFile: 'excited_partygoer_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'なし' },
            { label: '役割', value: '客' }
        ],
        bodyHtml: '<p>興奮したパーティー客（Excited partygoer）は、Fallout TVシリーズのシーズン2に登場する人物です。</p><hr><h2>背景</h2><p>大戦前の世界において、ニューベガスのラッキー38で開催されたパーティーの客の一人です。</p><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Wrangler」エピソードにおいて登場します。<br>彼女は会場にいるクーパー・ハワードを見て興奮し、彼にキスを迫り、「（遊園地などの）ロケットに乗ってほしい」と要求する姿が描かれます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2絡みで「ニューベガスのラッキー38」で開かれたパーティーに登場する名もなき熱狂的なファンです。<br><br>当時のハリウッドスターであったクーパーがいかに持て囃されていたかが分かるワンシーンですね。新シーズンでラッキー38の中が描かれるのが楽しみです。</div>',
        post: '大戦前のラッキー38の客「興奮したパーティー客」のロア記事を公開しました！🍸\nシーズン2における回想（大戦前）のニューベガス・ラッキー38のパーティーにて、クーパー・ハワードに興奮してサインやキスを迫る女性客です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/excited-partygoer.html'
    },
    {
        id: 'executive-assistant',
        enName: 'Executive assistant',
        jpName: 'エグゼクティヴ・アシスタント',
        rawFile: 'executive_assistant_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: '社員 / 居住者' }
        ],
        bodyHtml: '<p>エグゼクティヴ・アシスタント（Executive assistant）は、Vault 31の居住者であり、Vault-Tec社の社員の一人です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>背景</h2><p>バドによるVault 31の優生学選別計画「バズ・バッズ」のメンバーの一人です。</p><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Golden Rule」において、ノーム・マクレーンがVault 31のコンソールから一斉解凍（マス・リアクティベーション）を起動したため、彼女は他の大量の「バッズ」のメンバーと共にコールドスリープから目覚めます。<br>一斉解凍時、カプセルが開いた際になぜか足場がなく、彼女は悲鳴を上げながらポッドから地面へ激しく落下して頭を打ちました。しかし彼女はすぐに這い上がり、「大丈夫です！（I\'m okay!）」と能天気に周囲の居住者たちに断言しました。</p><p>その後、ノームによって施錠されたVault 31のハッチから地上へ向けて脱出するために、彼女は居住者たちで組み立てた「人間の梯子」をよじ登ります。<br>そしてハッチの扉を解除した結果……その直上で待ち構えていた無数のデスクローたちのうちの一匹の顔面が飛び出し、驚くことになります。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2において、ノームの機転（一斉解凍）によって目覚めることになった可哀想なバッズの一人です。<br><br>高い場所のポッドから落っこちて頭を打っても「大丈夫です！」と元気よく立ち上がるあたりは、やはりバドの言う「スーパーマネージャー」として異常なポジティブ精神を叩き込まれていることが分かります。</div>',
        post: 'ノームの一斉解凍で目覚めたVault 31の社員「エグゼクティヴ・アシスタント」のロア記事を公開しました！❄️\nシーズン2にて、解凍と同時に高いポッドから落っこちて頭を打ったのにも関わらず、すぐに這い上がって「大丈夫です！」と元気に返事をする異常なポジティブさを持った女性です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/executive-assistant.html'
    },
    {
        id: 'false-caesar',
        enName: 'False Caesar',
        jpName: '偽のシーザー',
        rawFile: 'false_caesar_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'シーザー・リージョン（派閥組織）' },
            { label: '役割', value: '指導者' }
        ],
        bodyHtml: '<p>偽のシーザー（False Caesar）は、モハビ・ウェイストランドにおけるシーザー・リージョンンの分裂グループのリーダーです。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>背景</h2><p>元々のシーザー（エドワード・サロウ）が2281年〜2296年の間に死亡した後、強大だったシーザー・リージョン軍には「次なる王座」を巡る内戦が勃発し、現在では組織が二つに分裂しています。</p><p>二人の男が自らを「シーザーの後継者」であると主張しており、一方は自分こそが真の後継者で、もう一方を「偽のシーザーだ」と互いに非難し合って膠着状態（内戦）を続けています。<br>どちらの派閥のリージョナリーたちも、かつてのシーザーが残したとされる「自らの後継者を記した遺言書（彼のポケットに残されているもの）」を手に入れるためにお互いを攻撃し続け、2296年現在も血みどろの抗争が繰り広げられています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ドラマのシーズン2にて、モハビのシーザー・リージョンがどうなったのかを紐解く超重要キャラクター（設定）です。<br><br>FNVの時点でリージョンはシーザーのカリスマ一つで持っていたようなものですから、彼が死ねばこうやって後継者争いで内部崩壊するというのは非常にFalloutらしくて納得のいく歴史の流れですね。</div>',
        post: 'シーザー亡き後、内戦で分裂した組織を引き連れている「偽のシーザー」のロア記事を公開しました！⛺\nシーズン2における強烈な新規ロアです。FNVのシーザーが死亡した結果、リージョン軍は後継者を巡って二つの派閥に分裂し、「自分の王こそが真のシーザーだ」と血みどろの内戦を繰り広げていることが判明しました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/false-caesar.html'
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
