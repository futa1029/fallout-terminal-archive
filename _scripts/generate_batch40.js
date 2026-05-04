const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'shopkeep-simon',
        enName: 'Shopkeep Simon',
        jpName: '店主サイモン',
        rawFile: 'shopkeep_simon_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'ソニーズ・サンドリーズ（自称）' },
            { label: '役割', value: '強盗 / 自称店主' }
        ],
        bodyHtml: '<p>店主サイモン（Shopkeep Simon）は、モハビのフリーサイド（Freeside）にある雑貨店「ソニーズ・サンドリーズ（Sonny\'s Sundries）」の自称店主です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Wrangler」に登場します。ルーシーがニューベガスに到着した際、バファウトの禁断症状を治療するためアディクトール（Addictol）を買いに雑貨店を訪れますが、そこで店主ヅラをしていたのが彼です。<br><br>彼は本来の店主であるソニーを殺害し、遺体を解体して裏のゴミ箱に捨てた後、ソニーの服を奪って着て（サイズが合っておらずピチピチだが）店主になりすましていたただの強盗殺人犯です。彼は店主になるとすぐに、アディクトールの価格を125キャップから1000キャップへと不当に釣り上げていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>治安が最悪になり果てた限界集落フリーサイドの現在を如実に表すスラムの住人です。<br><br>店に入って店主をブッ殺して服を奪い、そのまま平然と「店主」として商売を始めるという、いかにもFalloutのモブレイダーがAIの挙動バグでやりそうな行動を実写化してくれています。</div>',
        post: 'フリーサイドの「店主サイモン」のロア記事を追加しました！🪓\nシーズン2で雑貨店「ソニーズ・サンドリーズ」の店主ヅラをしてルーシーにアディクトールを高値で売りつけてきた男です。実は本物の店主を殺して裏のゴミ箱に捨て、奪った服（サイズが合ってない）を着て成りすましているだけの強盗殺人犯という、治安最悪のモハビを象徴するキャラです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/shopkeep-simon.html'
    },
    {
        id: 'shortsight',
        enName: 'Shortsight',
        jpName: 'ショートサイト',
        rawFile: 'shortsight_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'B.O.S. (サンフェルナンド支部)' },
            { label: '役割', value: 'ペティ将校 (Petty Officer)' }
        ],
        bodyHtml: '<p>ショートサイト（Petty Officer Shortsight）は、ブラザーフッド・オブ・スティール（B.O.S.）のサンフェルナンド支部に所属する階級「ペティ・オフィサー（Petty Officer / 兵曹）」の兵士です。Fallout TVシリーズのシーズン1に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>第1話などのB.O.S.基地内のシーンで登場します。<br>デインがブーツに隠されたカミソリで重傷を負った後、マキシマスを容疑者としてベルチバード内での尋問室へと連行した将校が彼です。その後、容疑が晴れたマキシマスをナイト・タイタスの新たなスクワイア（従者）に任命するため、クインタス長老のブリーフィングの場などで下士官たちを整列させていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>下級兵士の管理や尋問を行う、B.O.S.の「中間管理職」的な立ち位置の将校です。<br><br>「ペティ・オフィサー（兵曹）」という階級の呼び方は、本来の海軍の階級制度を模しているB.O.S.らしい専門用語と言えます。</div>',
        post: 'B.O.S.の「ショートサイト将校」のロア記事を公開しました！⚙️\nサンフェルナンド支部のペティ将校（兵曹）です。デインのカミソリ事件の後、容疑者となったマキシマスをベルチバードの尋問室に連行した人物です。B.O.S.の基地内の秩序を維持する中間管理職として働いていました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/shortsight.html'
    },
    {
        id: 'shotgun-jeff',
        enName: 'Shotgun Jeff',
        jpName: 'ショットガン・ジェフ',
        rawFile: 'shotgun_jeff_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'アトミック・ラングラー' },
            { label: '役割', value: 'バーテンダー' }
        ],
        bodyHtml: '<p>ショットガン・ジェフ（"Shotgun" Jeff）は、モハビのフリーサイドにあるカジノ「アトミック・ラングラー（Atomic Wrangler Casino）」のバーテンダーです。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の「The Wrangler」に登場します。New Vegasプレイヤーにはお馴染みのアトミック・ラングラーのバーカウンターで働いています。<br><br>彼は長い間フリーサイドで生活しており、ニューベガスの「管理体制の変化（Change in management）」を幾度も見てきたと語ります。<br>「NCR、リージョン、NCR、リージョン…クソみたいなロボット軍団。俺にとってはどっちでもいい。いつも誰かが俺たちに指図しようとする。俺から税金を取りに来ない限り、知ったこっちゃねえよ」と不満をこぼし、最近になってクアリージャンクションから流れ込んできたデスクローの群れすらも「ただの次の支配者」だと皮肉っていました。<br>店を訪れた「グール（クーパー）」にウイスキーを出そうとした際、彼がかつての西部劇スターであるクーパー・ハワードであることに気づきました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>New Vegasのフリーサイドにおける「一般市民の視点」を代弁してくれる素晴らしい酒場のオヤジです。<br><br>NCR、リージョン、Mr.ハウス（ロボット）、そして現在はデスクロー。次々と入れ替わるモハビの支配者たちも、その辺の住民からすれば「税金を取るか取らないか」くらいしか違いのない面倒なメリーゴーラウンドに過ぎないという超ドライな世界観が最高です。</div>',
        post: 'アトミック・ラングラーのバーテンダー「ショットガン・ジェフ」のロア記事を追加しました！🍸\nシーズン2に登場したフリーサイドの酒場のオヤジです。「NCRもリージョンもハウスのロボットも、税金さえ取らなきゃ誰がボスでも知ったこっちゃねえよ」と語る、モハビの一般住人のドライすぎるリアルな心境を代弁してくれる名物NPCです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/shotgun-jeff.html'
    },
    {
        id: 'siggi-wilzig',
        enName: 'Siggi Wilzig',
        jpName: 'シギ・ウィルギグ博士',
        rawFile: 'siggi_wilzig_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間（サイボーグ）' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'エンクレイヴ (元) / モルデイヴァー' },
            { label: '役割', value: '研究者（コールドフュージョンの開発者）' }
        ],
        bodyHtml: '<p>シギ・ウィルギグ（Siggi Wilzig）は、大戦前のアメリカから200年以上生き続けている科学者であり、元エンクレイヴ（Enclave）の研究員です。無限のクリーエネルギーを生み出す「コールドフュージョン（常温核融合）」の技術を完成させ、自身の首にそのチップを埋め込んだままエンクレイヴを脱走した、Fallout TVシリーズ（シーズン1）における物語の中核を担う重要人物です。（演：マイケル・エマーソン）</p><hr><h2>Fallout TVシリーズ</h2><p>ドラマ版における最大の「謎」と「MacGuffin（マクガフィン）」を兼ね備えたキャラクターです。<br>シーズン1では、エンクレイヴの極秘研究所で実験犬「CX404」を育てながら密かにコールドフュージョン技術のチップを自身の首の手術で埋め込み、モルデイヴァーの護衛の元へ脱走を図りました。しかし道中で重傷を負い、同行していたルーシーに対して「私の首を切り落として目的地（天文台）まで運べ」という狂気の要求を突きつけ、自ら致死量の薬を飲んで命を絶ちました。<br><br><b>シーズン2で明かされた大戦前の経歴</b><br>彼はサイボーグ技術などによって寿命を延ばしており、実は大戦前（2077年）から生きてエンクレイヴで働いていました。<br>10月23日の大戦直前には、Vault-Tec本社のバーブ・ハワードの元へ派遣され、「エンクレイヴの方針を無視し独断で世界を終わらせる核投下計画を進めれば、家族の安全は保障しない」という警告（脅迫状）を伝達する使者としての役割を果たしていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン1における「頭部（生首）」として世界中から狙われていた重要アイテムの持ち主ですが、なんと大戦前の2070年代からエンクレイヴの使者として活動していた「219歳以上」の人物であることが判明しました。<br><br>彼自身がサイボーグ的な延命処置を受けていると考えられ、モルデイヴァー同様に「200年全く年を取っていないような大戦前の生き残り」の一人として、より複雑なロアの謎を深めています。</div>',
        post: '重要人物「シギ・ウィルギグ博士」のロア記事を大幅更新しました！🧪\nシーズン1における「首」の発案者ですが、実は大戦前の2070年代からエンクレイヴに所属しており、Vault-Tecのバーブを脅迫する使者を務めていたことが判明しました。つまり彼もまた「200年以上生きて年を取っていない大戦前の生存者（サイボーグ？）」というヤバすぎる新ロアが確定しています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/siggi-wilzig.html'
    },
    {
        id: 'slim-tv-series',
        enName: 'Slim (TV series)',
        jpName: 'スリム',
        rawFile: 'slim__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'ホンチョのギャング' },
            { label: '役割', value: '部下' }
        ],
        bodyHtml: '<p>スリム（Slim）は、賞金稼ぎホンチョ（Honcho）の部下の1人です。Fallout TVシリーズのシーズン1（第1話）に出演します。</p><hr><h2>Fallout TVシリーズ</h2><p>第1話にて、ドン・ペドロの敷地内の墓場に埋められていた伝説の賞金稼ぎ「グール」を掘り起こすため、ボスのホンチョ、同僚のビギーと共に墓掘り遠征に参加しました。<br><br>ホンチョの命令でシャベルを使ってグールの埋まった墓を掘り起こしましたが、目覚めたグールにボスたちが交渉（という名の脅迫）をしている間ただ突っ立っていました。結果として交渉は即座に決裂し、グールが隠し持っていた武器によってボスのホンチョとビギーが瞬殺され、最後に残ったスリムもあっさりと射殺されてしまいました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>伝説のグール（クーパー）の実力を視聴者に見せつけるための「最初の生贄3人衆」の一人です。<br><br>ボスの「ドン・ペドロは年に一度彼を掘り起こして肉の塊を切り取っている」というイカれた情報解説を聞かされるための聞き役として重宝しました。</div>',
        post: 'ホンチョの部下「スリム」のロア記事を公開しました！🪦\n第1話で土の中に埋まった「グール」を掘り起こしに行った賞金稼ぎトリオの一人です。目覚めたグールの圧倒的な早撃ちの実力を見せつけるための生贄として、ボスたちと共に一瞬で葬り去られました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/slim-tv-series.html'
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
