const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'freeside-child-hustler',
        enName: 'Freeside child hustler',
        jpName: 'フリーサイドの子供のハスラー',
        rawFile: 'freeside_child_hustler_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'フリーサイド' },
            { label: '役割', value: 'ハスラー（詐欺師・客引き）' }
        ],
        bodyHtml: '<p>フリーサイドの子供のハスラー（Freeside child hustler）は、荒廃したニューベガス周辺の「フリーサイド」にいる子供の一人です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の第7話「The Handoff」において登場することが確認されています。<br>フリーサイドの過酷な環境を生き抜くために、通行人を相手に詐欺や客引き（ハスラー）を行っている子供です。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2絡みで「フリーサイド」の存在が確定し、そこで暮らすNPCキャストたちの情報が出始めました。<br><br>FNVプレイヤーにとっては、フリーサイドの入り口で客引きをしている子供たち（ネズミを追いかけ回したりしているあの子達）の姿がすぐに思い浮かびますね。</div>',
        post: '「フリーサイドの子供のハスラー」のロア記事を公開しました！🎰\nシーズン2における超重要ロアです。ニューベガスの外郭「フリーサイド」がドラマ版にも登場することが確定し、FNVプレイヤーにはお馴染みの「フリーサイドの過酷な環境でスリや客引きをしている子供たち」の存在が明らかになりました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/freeside-child-hustler.html'
    },
    {
        id: 'freeside-child-in-charge',
        enName: 'Freeside child in charge',
        jpName: 'フリーサイドの子供のリーダー',
        rawFile: 'freeside_child_in_charge_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'フリーサイド' },
            { label: '役割', value: 'リーダー格' }
        ],
        bodyHtml: '<p>フリーサイドの子供のリーダー（Freeside child in charge）は、ニューベガス郊外の街「フリーサイド」に群れる子供たちのリーダー格の少女です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の第7話「The Handoff」に登場します。<br>治安の悪い無法地帯であるフリーサイドにおいて、大人顔負けの図太さでスラムの子供たちを束ねているグループのリーダーです。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2のフリーサイドに登場する、子供たちのリーダー格の少女です。<br><br>キングスの支配すらも失われた後のニューベガスにおいて、ならず者だらけのフリーサイドに住む子供たちがどのように身を寄せ合って生き残っているのかが描かれるようです。</div>',
        post: 'シーズン2に登場する「フリーサイドの子供のリーダー」のロア記事を公開しました！👑\n無法地帯と化したニューベガスのスラム街「フリーサイド」において、過酷な環境の中で子供たちのグループを束ねてたくましく生き残っている少女です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/freeside-child-in-charge.html'
    },
    {
        id: 'freeside-child-selling-drugs',
        enName: 'Freeside child selling drugs',
        jpName: '薬を売るフリーサイドの子供',
        rawFile: 'freeside_child_selling_drugs_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'フリーサイド' },
            { label: '役割', value: '薬人' }
        ],
        bodyHtml: '<p>薬を売るフリーサイドの子供（Freeside child selling drugs）は、ニューベガス周辺のスラム街で生計を立てる子供です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の第7話「The Handoff」に登場します。<br>フリーサイドの薄暗い路地などで、生活のために違法な薬物（ケミカル）を売り歩いている子供の一人です。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>フリーサイドのストリートチルドレンの一人です。<br><br>子供相手でも容赦なくヤクの売人をさせるというのが、かつての「ディクソン」がいた頃の治安の悪いフリーサイドそのものを表していて、嫌でも期待が膨らみます。</div>',
        post: '「薬を売るフリーサイドの子供」のロア記事を公開しました！💊\nシーズン2のフリーサイドに登場する少年です。生きていくために通りでヤク（ケミカル）の売人をやって小銭を稼いでおり、フリーサイドというスラム街が相変わらず治安の悪い魔境であることをよく表しています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/freeside-child-selling-drugs.html'
    },
    {
        id: 'freeside-croupier',
        enName: 'Freeside croupier',
        jpName: 'フリーサイドのクルーピエ',
        rawFile: 'freeside_croupier_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'フリーサイド' },
            { label: '役割', value: 'クルーピエ（ディーラー）' }
        ],
        bodyHtml: '<p>フリーサイドのクルーピエ（Freeside croupier）は、フリーサイドにあるカジノ（アトミック・ラングラー等）で働くカジノディーラーです。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の第8話「The Strip」に登場します。<br>ストリップ地区の影に長年隠れてきたフリーサイドにあるギャンブル施設で、ルーレットなどのゲームテーブルを取り仕切っている（Croupier＝ディーラー）女性です。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2のストリップ地区（フィナーレ回）に登場する、フリーサイド側のカジノ従業員です。<br><br>FNVプレイヤーからすれば、フリーサイドのカジノといえば「アトミック・ラングラー（ガレット兄弟の店）」のことですが、果たして2296年時点でもあのボロボロの店が生き残っているのか必見です。</div>',
        post: '「フリーサイドのクルーピエ」のロア記事を公開しました！🃏\nシーズン2のフリーサイドに登場する、カジノのゲームテーブルを取り仕切るディーラーの女性です。フリーサイドのカジノと言えば「アトミック・ラングラー」ですが、現在の所有者が誰になっているのか気になりますね。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/freeside-croupier.html'
    },
    {
        id: 'freeside-customer',
        enName: 'Freeside customer',
        jpName: 'フリーサイドの客',
        rawFile: 'freeside_customer_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '様々' },
            { label: '所属', value: 'フリーサイド' },
            { label: '役割', value: '客' }
        ],
        bodyHtml: '<p>フリーサイドの客（Freeside customers）は、ニューベガス周辺のスラム街に訪れている名もなき客たちです。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の第5話「The Wrangler」に登場します。<br>フリーサイドの酒場やカジノ施設（アトミック・ラングラーなど）で時間を潰している男女の客です。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2でフリーサイドに立ち寄るモブの客たちです。<br><br>登場するエピソードのタイトルが直球で「The Wrangler（ラングラー）」となっていることから、FNVでプレイヤーが入り浸ったカジノ兼酒場であるアトミック・ラングラーが高確率で再登場することが期待できます！</div>',
        post: 'シーズン2に登場する「フリーサイドの客」のロア記事を公開しました！🍺\n治安の悪いスラム街であるフリーサイドの店で酒やギャンブルを楽しむ客たちです。登場エピソードのタイトルが直球で「The Wrangler」であることから、ゲームでお馴染みのアトミック・ラングラーの再登場が事実上確定しました！\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/freeside-customer.html'
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
