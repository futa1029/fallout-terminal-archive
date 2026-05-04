const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'rita-tv-series',
        enName: 'Rita (TV series)',
        jpName: 'リタ',
        rawFile: 'rita__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'シーザー・リージョン (元)' },
            { label: '役割', value: '奴隷 / マインドコントロール' }
        ],
        bodyHtml: '<p>リタ（Rita）は、ラスベガスの大企業の管理用Vault（Las Vegas management Vault）で肉体労働を強制されている女性です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>背景</h2><p>かつてはモハビ・ウェイストランドの強大な勢力「シーザー・リージョン（Caesar\'s Legion）」の奴隷であり、彼らのために「人間を調理する（cook people）」役割を担わされていました。<br>後にハンク・マクレーン（または彼の配下）によって捕らえられ、首の後ろにマインドコントロール用の「ブレイン・コンピューター・インターフェース・チップ」を埋め込まれて、現在はハンクの操り人形として働かされています。</p><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Other Player」に登場し、彼女自身も新たなマインドコントロールチップの製造ラインで働かされています。<br>ハンクはルーシーに対して「自分の技術が人類の役に立つ」と説得するためにリタを実例として挙げます。「以前は食人鬼の奴隷だったが、今では平穏にトレイルミックス（ナッツなどのスナック）を作っているだろう？」とハンクは語りますが、ルーシーは彼女から差し出されたスナックを拒絶します。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>「シーザー・リージョン」の存在が初めて明確にドラマ上で言及（登場）するキャラクターです。<br>恐ろしい奴隷制集団であったリージョンから解放されたと思いきや、今度はVault-Tecの狂信者によってチップで自我を奪われるという、ウェイストランド特有の「地獄から別の地獄への引っ越し」を体現しています。</div>',
        post: '元シーザー・リージョンの奴隷「リタ」のロア記事を公開しました！🔗\nかつてはあの凶悪な「リージョン」で人肉を調理させられていた奴隷ですが、現在はハンクのマインドコントロール技術によって自我を奪われ、チップ製造のための無口な操り人形にされています。恐ろしい勢力名が次々と出てきますね。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/rita-tv-series.html'
    },
    {
        id: 'robert-house',
        enName: 'Robert House',
        jpName: 'ロバート・ハウス（Mr.ハウス）',
        rawFile: 'robert_house_raw.json',
        category: '人物',
        appearance: 'Fallout: New Vegas / Fallout TV',
        info: [
            { label: '人種', value: '人間（サイボーグ）' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'ロブコ・インダストリーズ' },
            { label: '役割', value: '社長 / ニューベガス支配者' }
        ],
        bodyHtml: '<p>ロバート・ハウス（Robert Edwin House）は、大戦前のアメリカにおける巨大企業「ロブコ・インダストリーズ（RobCo Industries）」の創設者にして社長であり、大戦後はモハビ・ウェイストランドの「ニューベガス」を支配している事実上の王（Mr.ハウス）です。<br>Fallout: New Vegasの主要人物の一人ですが、Fallout TVシリーズにおいても重要な役回りで登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン1の最終話（第8話）の回想シーンにて、2077年の大戦直前にVault-Tec本社で行われた「影の役員会議」の出席者の一人として登場しました（演：ラフィ・シルバー）。<br>Vault-Tecのバーブ・ハワードが提案した「自らの手で核兵器を投下し、世界の競争相手を一掃する」という狂気の計画に対し、「それは君の製品の単なる可能性の話か？ それとも成果の『保証』かね？」と、冷徹な経営者らしい質問を投げかけました。<br><br>シーズン2においては、彼の拠点である「ニューベガス」が物語の主要な舞台となるため、彼が支配するストリップ地区やラッキー38、あるいは彼自身の生死がどうなっているかが描かれることになります。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>New Vegasにおける超重要キャラクター（Mr.ハウス）が、ついに実写ドラマに登場しました！<br><br>ゲーム内で彼は「計算上、核戦争が起きる日を予測していた」と語っていましたが、ドラマ版では「そもそも彼自身が（ある程度）核戦争の引き金を引く会議に同席していた」という衝撃的なロアの補完が行われました。彼のコンピューターのような冷徹さがよく表れています。</div>',
        post: 'ロブコ社長「Mr.ハウス（ロバート・ハウス）」のロア記事を更新しました！🎰\n言わずと知れたNew Vegasの支配者ですが、ドラマ版では大戦直前のVault-Tecの「世界の終わり」を決定づける影の役員会議に出席していたことが判明しました。シーズン2のニューベガスで彼がどう絡んでくるのか、世界中のファンが注目しています！\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/robert-house.html'
    },
    {
        id: 'robert-houses-double',
        enName: "Robert House's double",
        jpName: 'Mr.ハウスの影武者',
        rawFile: 'robert_house_s_double_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'ロブコ・インダストリーズ' },
            { label: '役割', value: '影武者（ボディダブル）' }
        ],
        bodyHtml: '<p>Mr.ハウスの影武者（Robert House\'s double）は、ロブコ・インダストリーズの社長であるロバート・ハウスの身代わりとして公の場に立っている人物です。Fallout TVシリーズに登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>本物のロバート・ハウスの腹心として、2067年頃から彼の容姿や服装に似た「影武者（ボディダブル）」として活動している人物です。<br>本物はその間、匿名性を維持しながら研究室などで活動を続けており、世間一般（テレビやメディア）に登場する「ロブコ社長」は実はこの影武者の顔でした。そのため、本物のハウスが公の場に姿を現しても、世間からは有名な大富豪だとは認識されないという事態に陥っています。<br><br>ドラマのシーズン1やシーズン2における「広告やテレビに映るMr.ハウス（演：ラフィ・シルバー）」は、実は本物ではなくこの影武者の方であることが示唆されています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ドラマ版で追加された驚きのロアです。実は「私たちがメディアなどでよく知るMr.ハウスの顔」は影武者のものだったという設定です。<br>この設定により、ドラマ本編において「誰も本物のMr.ハウスの顔（あるいはその正体）を知らない」というミステリー要素が機能するようになっています。</div>',
        post: '「Mr.ハウスの影武者」のロア記事を追加しました！👤\n驚くべきことに、戦前のテレビやメディアに露出していた「ロブコ社長（Mr.ハウス）」の顔は、実は本物ではなく影武者（ボディダブル）のものでした。本物のハウスは裏で研究や暗躍を続けていたため、世間は本当の彼の顔を知らないというトンデモない後付けロアが明らかになっています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/robert-houses-double.html'
    },
    {
        id: 'robert-olsen',
        enName: 'Robert Olsen',
        jpName: 'ロバート・オルセン',
        rawFile: 'robert_olsen_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 31 / Vault 33' },
            { label: '役割', value: '監督官（元Vault-Tec社員）' }
        ],
        bodyHtml: '<p>ロバート・オルセン（Robert Olsen）は、大戦前のVault-Tec若手社員であり、「バズ・バッズ（Bud\'s Buds）」のメンバーの一人です。2101年から2109年までVault 33の監督官を務めていました。</p><hr><h2>Fallout TVシリーズ</h2><p>Vault 31に冷凍保存されていた彼はバドの計画によって解凍され、Vault 33の監督官に就任しました。彼はハンク・マクレーンやベティ・ピアソンと同様に、Vault-Tecの「スーパーマネージャーによる完璧な管理社会の構築」任務を遂行していました。<br><br>ノームがVault 33の端末で歴代監督官の記録を見直した際、過去の監督官選挙において彼が「100%の得票率」という不自然極まりない形で選出（出来レース）されていたことが確認できます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>歴代のVault 33監督官の一人です。<br><br>端末の記録に登場する過去の人物ですが、常に「Vault 31出身者のみが100%近い得票率で当選し続ける」という北朝鮮並の出来レース選挙が100年以上Vault内で続けられていたことを示す、恐ろしい証拠の一つです。</div>',
        post: 'Vault 33の歴代監督官の一人「ロバート・オルセン」のロア記事を追加しました！🗄️\nノームが見つけた端末の記録に登場する人物です。ハンクやベティと同様にVault 31から解凍された大戦前の人間であり、なんと「100%の得票率で監督官選挙に勝利した」というとんでもない出来レースの記録が残されています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/robert-olsen.html'
    },
    {
        id: 'rodriguez',
        enName: 'Rodriguez',
        jpName: 'キャプテン・ロドリゲス',
        rawFile: 'rodriguez_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'New California Republic (NCR)' },
            { label: '役割', value: 'キャプテン' }
        ],
        bodyHtml: '<p>キャプテン・ロドリゲス（Captain Rodriguez）は、NCR軍（新カリフォルニア共和国軍）に所属する将校です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Profligate」などに登場します。彼女はモハビ・ウェイストランドにおける数少ない「NCRの生き残り部隊」の一人です。<br>首都シェイディ・サンズの壊滅後も、彼女とその部隊（レンジャー・ビフなど）はプリム（Primm）近くの前哨基地に踏みとどまり、対シーザー・リージョン戦線を維持し続けていました。<br><br>彼女はNCRがまだ戦争に勝っており、いつか救援部隊が到着すると信じ続けています。基地にやってきたグール（クーパー・ハワード）に対し、「私たちが戦ってきたのは…きれいな水、学校…あなたのような人々への権利のためよ。あなたも昔はそういうものを信じていたはずでしょう？」と必死に訴えかけ、無線でNCRの増援を呼ぶよう懇願します。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2（ニューベガス編）にNCRがどのように関わってくるかを示す重要な生還者です。<br><br>首都が壊滅したことも知らず（あるいは信じず）に、モハビの辺境であるプリムで健気に孤軍奮闘を続けていたNCRの熱い忠誠心が描かれています。グールに対してNCRの正義を語る姿は、New VegasでのNCRルートのプレイヤーの心を熱くさせるものがあります。</div>',
        post: 'モハビで孤軍奮闘を続ける「キャプテン・ロドリゲス」のロア記事を公開しました！🐻\nシーズン2で登場するNCR軍の生き残りです。シェイディ・サンズが消滅したことも知らず、プリム付近の基地でシーザー・リージョンへの警戒を続けつつ救援を待ち続けています。グールに対して「我々は平和や学校のために戦ってきた」と必死に訴える姿が悲しくも熱いです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/rodriguez.html'
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
