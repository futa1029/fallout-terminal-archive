const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'mcrae',
        enName: 'McRae',
        jpName: 'マクレー',
        rawFile: 'mcrae_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'ブラザーフッド・オブ・スティール (B.O.S.)' },
            { label: '役割', value: 'エルダー（ヨセミテ支部）' }
        ],
        bodyHtml: '<p>エルダー・マクレー（Elder McRae）は、ブラザーフッド・オブ・スティール（B.O.S.）の「ヨセミテ支部（Yosemite chapter）」を率いるリーダー（エルダー）です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Other Player」などのエピソードに登場します。<br>西海岸の最高指導者であるエルダー・クインタスが招集したB.O.S.の各支部のエルダーたち（ヨセミテ、グランドキャニオン、コロナドなど）の一人であり、現在B.O.S.の中で強い影響力を持つ東海岸派兵部隊（本作における「コモンウェルス支部」で、連邦から来た部隊）に対抗するための秘密会議に参加しているようです。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2において、B.O.S.の西海岸派閥の内部事情がかなり深く描かれそうです。<br><br>『Fallout 4』でマクソンが率いていた「東海岸の強硬なB.O.S.」がどのように描かれるのか、そして西海岸の（弱体化した）各支部がどのように結束して連邦の部隊と対立するのか、非常に興味深いロアが提供されるエピソードになりそうです。</div>',
        post: 'B.O.S.ヨセミテ支部の指導者「エルダー・マクレー」のロア記事を公開しました！⚙️\nシーズン2に登場する西海岸支部のエルダーの一人です。どうやら現在最大勢力となっている東海岸の連邦（コモンウェルス）からやって来た部隊に対抗するため、西海岸の各支部が密かに集結しているようです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/mcrae.html'
    },
    {
        id: 'military-police-officer',
        enName: 'Military Police officer',
        jpName: '憲兵（ミリタリーポリス・オフィサー）',
        rawFile: 'military_police_officer_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '様々' },
            { label: '所属', value: '米軍憲兵隊 (Military Police Corps)' },
            { label: '役割', value: '警備' }
        ],
        bodyHtml: '<p>米軍の憲兵（Military Police officers / MPs）は、大戦前のアメリカにおいて軍の規律維持や警備活動を行っていた兵士たちです。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の大戦前を描くエピソードにおいて、ロブコ・インダストリーズの主催によりニューベガス（ラッキー38）で開催されている「防衛産業会議（Defense Contractors\' Summit）」の警備を担当している姿が確認されています。<br>会場の前で抗議活動を行っている人々や議員たちを力ずくで排除するなど、戦前のアメリカ政府と軍産複合体の強権的な姿勢を象徴する役割として描かれます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2の回想シーンを彩る名脇役たちです。<br><br>大戦直前のアメリカにおいて、民間企業（ロブコ）のイベントの警備を「米軍の憲兵」が堂々と行っているという事実から、アメリカ政府といかに軍産複合体が癒着していたかがよく分かるシーンとなっています。</div>',
        post: '大戦前のアメリカの「憲兵（ミリタリーポリス）」のロア記事を追加しました！🚔\nシーズン2の回想シーンにて、ラッキー38で開催されるロブコのイベントの警備を米軍が行っているようです。ゲーム内でもたびたび話題になる「戦前の企業と米軍のズブズブの癒着」が実写映像で分かりやすく描かれそうですね。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/military-police-officer.html'
    },
    {
        id: 'mohawk-legionary',
        enName: 'Mohawk legionary',
        jpName: 'モヒカンのリージョナリー',
        rawFile: 'mohawk_legionary_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'シーザー・リージョン' },
            { label: '役割', value: '兵士' }
        ],
        bodyHtml: '<p>モヒカンのリージョナリー（Mohawk legionary）は、シーザー・リージョンに所属する熱狂的なモヒカン頭の兵士です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Strip」などで、モハビにおけるシーザー軍団の激しい内部抗争（あるいは敵対勢力との戦い）の場に立ち会います。<br>作中ではシーザーの身体から槍を引き抜き、（マコーレー・カルキン演じる）新たなシーザーの座に就いたラセルタ（Lacerta Legate）に対し熱狂的な支持を送る姿が描かれるようです。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>モハビで暴れ回るリージョン兵の一人です。<br><br>『New Vegas』においても、シーザーが死ねばレガテス（ラニウスや他の軍団長）が後を継いで血で血を洗う内戦に発展するだろうと言われていましたが、まさにその通りの悲惨な状況になっているようです。「新しいシーザー」が誕生する瞬間を目の当たりにする兵士の一人です。</div>',
        post: '「モヒカンのリージョナリー」のロア記事を公開しました！🔥\nシーズン2に登場する熱狂的なシーザー・リージョンの兵士であり、作中で「先代のシーザーの遺体から槍を引き抜き、新しいシーザーへと熱狂的な喝采を送るキャラクター」として描かれるようです。モハビの血生臭い内情が伝わってきますね！\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/mohawk-legionary.html'
    },
    {
        id: 'moldavers-elite-guard',
        enName: 'Moldaver\'s elite guard',
        jpName: 'モルデイヴァーのエリート護衛',
        rawFile: 'moldaver_s_elite_guard_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: '新カリフォルニア共和国 (NCR)' },
            { label: '役割', value: '兵士（護衛）' }
        ],
        bodyHtml: '<p>モルデイヴァーのエリート護衛（Moldaver\'s elite guards）は、リー・モルデイヴァーの直属の部下として行動する新カリフォルニア共和国（NCR）の女性兵士たちです。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第1話などのVault 33襲撃時において、Vault 32の居住者に変装しながらも、レイダーたちとは別格の落ち着きで行動し、モルデイヴァーの背後を固めていた二人の護衛です。<br>また物語の終盤では、グリフィス天文台（NCR本部）へと向かうルーシーの行く手を阻んだり、B.O.S.との最終決戦においても戦闘に参加している姿が確認できます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>野盗のようなレイダーの集団の中で、明らかに軍人のような統制のとれた動きを見せていたモルデイヴァーの側近の女性兵士たちです。<br><br>作中では明確にされませんでしたが、彼女たちもまたシェイディ・サンズの生き残りのNCR兵士であったことがわかります。</div>',
        post: 'NCR兵士「モルデイヴァーのエリート護衛」のロア記事を追加しました！🐻\n第1話のVault襲撃時からモルデイヴァーの側近として行動していた、ガラの悪いレイダーとは明らかに異なる統制のとれた動きを見せていた女性護衛たちです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/moldavers-elite-guard.html'
    },
    {
        id: 'monty-tv-series',
        enName: 'Monty (TV series)',
        jpName: 'モンティ',
        rawFile: 'monty__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'レイダー集団' },
            { label: '役割', value: '偽装居住者' }
        ],
        bodyHtml: '<p>モンティ（Monty）は、リー・モルデイヴァーに雇われていた（あるいは率いられていた）ウェイストランドのレイダーの一人です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第1話において、Vault 32の居住者と偽ってVault 33で行われた「三年に一度のトレード（結婚の儀式）」に潜入し、主人公ルーシーの結婚相手として選ばれました。<br>結婚式では紳士的に振る舞っていましたが、晩餐会では精子数について聞かれて無言になるなど、いくつか不審な点を見せていました。<br>儀式後の自室でガイガーカウンターが反応したことによってレイダーであることが発覚し、ルーシーと激しい格闘になります。最終的に彼は割れたガラスの破片（あるいは武器）によって смер致命傷を負い、その命を落としました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ルーシーが自分の結婚式で自らの手で初めて血に染めた相手です。<br><br>表面上は紳士的に装っていましたが、正体がバレた瞬間に暴力を振るうなど、いかにもウェイストランドのレイダーらしい粗暴さを隠し持っていました。彼との死闘は、ルーシーにとって安全なVault生活からの最初の「洗礼」となりました。</div>',
        post: 'ルーシーの偽りの夫「モンティ」のロア記事を公開しました！👰\n第1話で「Vault 32の居住者」になりすまして結婚式に潜入したレイダーです。正体がバレた瞬間に襲いかかり、ルーシーにとって人生で初めての「自分の手で殺すことになった相手」となりました。まさにウェイストランドの洗礼ですね。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/monty-tv-series.html'
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
