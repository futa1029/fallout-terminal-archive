const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'protest-foreperson',
        enName: 'Protest foreperson',
        jpName: '抗議活動のまとめ役',
        rawFile: 'protest_foreperson_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: '抗議者' },
            { label: '役割', value: 'まとめ役' }
        ],
        bodyHtml: '<p>抗議活動のまとめ役（Protest foreperson）は、大戦前のアメリカ・ロサンゼルスで活動していた民間人の一人です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Innovator」などに登場し、大企業の横暴や社会の不平等に対してロサンゼルスで行われている抗議デモの代表的（まとめ役）な存在として描かれます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>大戦直前のアメリカがいかに内政面でも崩壊しかけていたか（あるいは自由が弾圧されていたか）を示すキャラクターです。<br><br>シーズン2のニューベガスのラッキー38前で憲兵によって排除されていた抗議者たちと同様に、戦前の社会不安の伏線として重要な役割と見られます。</div>',
        post: '「抗議活動のまとめ役」のロア記事を公開しました！📢\nシーズン2で登場する、大戦前のロサンゼルスで巨大企業等に対してデモを行っていた民間人です。Vault-Tecやロブコなどが裏で世界を牛耳っていく中、当時のアメリカ社会がいかに不穏な空気に包まれていたかを象徴しています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/protest-foreperson.html'
    },
    {
        id: 'quintus',
        enName: 'Quintus',
        jpName: 'エルダー・クレリック・クインタス',
        rawFile: 'quintus_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'B.O.S. (サンフェルナンド支部)' },
            { label: '役割', value: 'エルダー・クレリック' }
        ],
        bodyHtml: '<p>エルダー・クレリック・クインタス（Elder Cleric Quintus）は、2296年における「サンフェルナンドの騎士団（Knights of San Fernando）」と呼ばれるB.O.S.（ブラザーフッド・オブ・スティール）の一派閥を率いる指導者です。Fallout TVシリーズのシーズン1における、B.O.S.側の主要人物の一人です。<br>「統一者クインタス（Quintus the Unifier）」または「破壊者クインタス（Quintus the Destroyer）」などの異名で呼ばれることもあります。</p><hr><h2>Fallout TVシリーズ</h2><p>かつては彼自身もパワーアーマーを身にまとう「ナイト」だった時代がありましたが、現在ではクレリックとエルダーの役割を兼ね備えた支配者としてサンフェルナンドの基地に君臨しています。<br>幼少期にシェイディ・サンズが核攻撃で消滅した際、がれきの中で途方に暮れていたマキシマスを助け出し（あるいはB.O.S.にスカウトし）彼をスクワイアとして育て上げた張本人でもあります。<br><br>第1話において、彼は荒れ果てたB.O.S.の再興を掲げ「名誉と共に進め。そしてお前の剣で未来を切り開くのだ」と訓示を行い、ウィルギグ博士の首（コールドフュージョンの秘密）を奪還する任務を部隊に命じます。<br><br>終盤（第8話）におけるグリフィス天文台での最終決戦に勝利した後、彼らはコールドフュージョンを手中に収めました。クインタスはマキシマスの活躍を評価し「この力を使って、真の意味での我々のブラザーフッドを築く」という野心をあらわにしています。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>宗教色が非常に強い「クレリック（聖職者）」の側面を併せ持つ、少し変わったB.O.S.のエルダーです。<br><br>シーズン1を通して彼が率いるサンフェルナンド支部がいかに狂信的で野蛮な集団であるかが描かれますが、過去の彼自身がナイトとしてマキシマスを救った姿や、最後に語る「我々のブラザーフッド（新たな王国の建設）」という言葉から、西海岸側のB.O.S.に何らかの独自の改革を起こそうとしていることが伺えます。</div>',
        post: '「エルダー・クレリック・クインタス」のロア記事を追加しました！🛡️\nB.O.S.サンフェルナンド支部の強大な指導者です。幼きマキシマスを助けた過去の「ナイト」の姿と、現在「クレリック」として狂信的な兵士を束ねているカリスマ性のギャップが魅力です。ラストで見せた彼の野心が、シーズン2の西海岸B.O.S.の動きにどう繋がるのか注目です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/quintus.html'
    },
    {
        id: 'raider-3',
        enName: 'Raider 3',
        jpName: 'レイダー3',
        rawFile: 'raider_3_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'アメリカ海兵隊' },
            { label: '役割', value: 'コールサイン' }
        ],
        bodyHtml: '<p>レイダー3（Raider 3）は、大戦前のアメリカ海兵隊（USMC）における兵士の「コールサイン」です。作中における声のみの登場人物で、Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Demon in the Snow」にて、クーパー・ハワードの過去の回想（戦前のアメリカ・中国の戦争である「アンカレッジ戦役（Sino-American War）」の時代）に登場します。<br><br>アラスカ戦線のどこかの島で、クーパー・ハワードやチャーリー・ホワイトナイフらと共に戦っていた戦友であり、行方不明になっていた彼をクーパーたちが捜索しています。<br>無線で「こちらレイダー3…アカ（中国軍）が全方位から前進してきている。我々は制圧された！繰り返す、制圧…！」と絶望的な通信を残しました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Falloutシリーズでも大人気のロアである「アンカレッジ戦役」が、ついに実写（クーパーの回想）で描かれる際に関わってくる兵士です。<br><br>戦前にT-45パワーアーマーの性能実験場となった地獄の戦線で、クーパーがどのような体験をしたのかが、彼の通信から生々しく伝わってきます。</div>',
        post: '「レイダー3」のロア記事を公開しました！📻\nシーズン2で描かれる「アンカレッジ戦役」の回想シーンにて、戦前のクーパー・ハワードたちと共闘していたアメリカ海兵隊員のコールサインです。「こちらレイダー3、中国軍に制圧された…！」という絶望的な通信を残しており、地獄だったとされるアラスカ戦線が遂に映像化されそうです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/raider-3.html'
    },
    {
        id: 'red-haired-man',
        enName: 'Red-haired man',
        jpName: '赤毛の男',
        rawFile: 'red-haired_man_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 33' },
            { label: '役割', value: '居住者' }
        ],
        bodyHtml: '<p>赤毛の男（Red-haired man）は、Vault 33で暮らす居住者の一人です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>赤毛の女（Red-haired woman）とパートナー（恋人あるいは夫婦）の関係にあり、Vault 33における日常風景のモブキャラクターとして「The Innovator」などに登場します。<br>Vault内での社会や生活を営む居住者たちの一部です。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Vault 33のモブキャラクターです。シーズン2でわざわざ個別クレジットされているということは、Vault 33内の新たな居住者間の軋轢や、ノーム不在の中で何か役割を果たすのかもしれません。</div>',
        post: 'Vault 33の「赤毛の男」のロア記事を追加しました！🧑‍🦰\nシーズン2に登場するVault 33の居住者のひとりです。赤毛の女とパートナー関係にあり、ベティが監督官として君臨し続けるVault内部で彼らがどう平和な（あるいは異常な）暮らしを続けるのかが注目されます。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/red-haired-man.html'
    },
    {
        id: 'red-haired-woman',
        enName: 'Red-haired woman',
        jpName: '赤毛の女',
        rawFile: 'red-haired_woman_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault 33' },
            { label: '役割', value: '居住者' }
        ],
        bodyHtml: '<p>赤毛の女（Red-haired woman）は、Vault 33で暮らす居住者の一人です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>赤毛の男（Red-haired man）とパートナー（恋人あるいは夫婦）の関係にあり、Vault 33における日常風景のモブキャラクターとして「The Innovator」などに登場します。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2のVault 33サイドに登場する居住者キャラクターです。<br>彼らの中にも「実はVault 31の人間がお忍びで混ざっている」といった展開が今後あるかもしれませんね。</div>',
        post: 'Vault 33の「赤毛の女」のロア記事を追加しました！👩‍🦰\nシーズン2に登場するVault 33の居住者のひとりで、赤毛の男のパートナーです。モブキャラクターとはいえ、Vault 33内は謎だらけなので、今後の展開への関与が気になります！\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/red-haired-woman.html'
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
