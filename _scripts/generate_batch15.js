const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'dom-pedros-guard',
        enName: "Dom Pedro's guard",
        jpName: 'ドン・ペドロの護衛',
        rawFile: 'dom_pedro_s_guard_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'ドン・ペドロの組織' },
            { label: '役割', value: '護衛' }
        ],
        bodyHtml: '<p>ドン・ペドロの護衛（Dom Pedro\'s guard）は、Fallout TVシリーズのシーズン1に登場する人物です。</p><hr><h2>背景</h2><p>彼は賞金稼ぎであるドン・ペドロの下で働く護衛（見張り）の一人であり、2296年時点においてはドン・ペドロの拠点にある「グール（クーパー・ハワード）」が埋められている墓を見張る任務に就いていました。</p><h2>Fallout TVシリーズ</h2><p>第1話「The End（終わり）」において、見張りの任務中にタバコに火をつけようとしていたところ、突然ジャンクジェットから発射された「赤ん坊の人形の腕（プラスチック製）」が胸に深々と突き刺さり死亡しました。<br>彼を殺害したのは、グールを掘り起こすために拠点を襲撃したホンチョ達の部下の「ビギー」でした。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ドラマの第1話にて、ジャンクジェットの犠牲・見せしめとなったモブキャラクターです。<br><br>タバコを吸おうとした瞬間に、暗闇から赤ちゃんのマネキンの腕が飛んできて心臓に突き刺さるという殺され方は、「あ、これは紛れもないFalloutだ」という本作のゴア＆コメディの作風を視聴者に一瞬で理解させる素晴らしい演出でした。</div>',
        post: 'ジャンクジェットの犠牲となったモブキャラクター「ドン・ペドロの護衛」のロア記事を公開しました！🧸\n第1話にて、タバコを吸おうとした瞬間にマネキンの腕が胸に突き刺さって死亡し、ドラマ版の作風を世界に知らしめた張本人です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/dom-pedros-guard.html'
    },
    {
        id: 'elderly-speaker',
        enName: 'Elderly speaker',
        jpName: '年配の司会者',
        rawFile: 'elderly_speaker_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 33' },
            { label: '役割', value: '式の司祭' }
        ],
        bodyHtml: '<p>年配の司会者（Elderly speaker）は、Vault 33の居住者の一人です。</p><hr><h2>Fallout TVシリーズ</h2><p>第1話「The End（終わり）」において、Vaultスーツの上に宗教的（あるいは儀式的）なストール（肩掛け）を羽織り、ルーシーとモンティの結婚式の司祭を務めました。</p><p>しかしその後のレイダーたちの襲撃によって殺害され、のちに武器庫の壁にマチェットで串刺しにされている無残な遺体をルーシーが発見することになります。</p><h2>補足</h2><ul><li>彼が身に着けていたストールは現実のキリスト教の聖職者が身に着けるものに似ていますが、そこにキリスト教のシンボルはなく、「Vault-Tec」のロゴが刺繍されています。</li><li>彼が式典で持っていた大きな本にも、宗教的なシンボルではなくVault-Tecのロゴが描かれており、Vault-Tec社が発行した独自ルールの聖書（あるいは規約集）である可能性があります。</li></ul>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ルーシーの結婚式の進行役を務めていたお爺さんです。<br><br>Vaultという閉鎖空間において、宗教の代わりに一企業のロゴマーク（Vault-Tec）が偶像的に崇拝されているという狂気的なディストピア設定が彼の衣装から読み取れます。</div>',
        post: 'ルーシーの結婚式を進行したVault 33居住者「年配の司会者」のロア記事を公開しました！📖\n彼の衣装や手持ちの本にはすべて十字架の代わりにVault-Tecのロゴが描かれており、企業が宗教に取って代わっているディストピア感が表現されています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/elderly-speaker.html'
    },
    {
        id: 'elmer-greene',
        enName: 'Elmer Greene',
        jpName: 'エルマー・グリーン',
        rawFile: 'elmer_greene_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: 'ジュニア・エグゼクティブ' }
        ],
        bodyHtml: '<p>エルマー・グリーン（Elmer Greene）は、大戦前のVault-Tec社におけるジュニア・エグゼクティブであり、現在はVault 31で冷凍保存されている人物です。</p><hr><h2>背景</h2><p>エルマーは、バド・アスキンスが主導するエグゼクティブ・アシスタント訓練プログラム「バズ・バッズ（Bud\'s Buds）」に選抜された若手社員の一人です。この計画は、最終戦争によってVault-Tec社の競争相手がすべて消滅した後の世界において、人類の未来を形作る「スーパーマネージャー」を育成することを目的としていました。</p><p>彼や他の「バッズ」たちはVault 31で冷凍保存（クライオスタシス）されており、バド・アスキンスの管理下で定期的に解凍され、Vault 32やVault 33の居住者の管理や、管理された繁殖（優生学）の相手として派遣される手はずとなっていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Vault 31で冷凍保存されている「バズ・バッズ」のメンバーの一人です。<br><br>バドの管理下で無限に冷凍眠りし続けている大量のモブ社員のうちの一人ですね。</div>',
        post: 'Vault 31で冷凍保存されているバズ・バッズの一員「エルマー・グリーン」のロア記事を公開しました！❄️\nVault-Tec社の狂気的な優生学プログラムのためにポッドで眠らされている若手社員の一人です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/elmer-greene.html'
    },
    {
        id: 'emil-dale',
        enName: 'Emil Dale',
        jpName: 'エミール・デール',
        rawFile: 'emil_dale_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'カリフォルニア・クレスト・スタジオ' },
            { label: '役割', value: '映画監督' }
        ],
        bodyHtml: '<p>エミール・デール（Emil Dale）は、Fallout TVシリーズのフラッシュバック（大戦前）に登場する人物です。</p><hr><h2>背景</h2><p>エミールは、クーパー・ハワードが主演を務める映画『The Man from Deadhorse（デッドホースから来た男）』の映画監督です。また、彼はキャデラック・ボブが所属するカリフォルニア・クレスト・スタジオの上司でもありましたが、ボブが共産主義の同調者であるという疑惑（赤狩り）を理由に彼を解雇しました。</p><h2>Fallout TVシリーズ</h2><p>映画『The Man from Deadhorse』の撮影中、クーパーが演じる保安官が悪役のジョーイ・トロを殺害するシーンにおいて、クーパーが「本当に彼を殺さなければならないのか」と躊躇し、撮影を止める場面が描かれます。<br>クーパーは「普段のように殺すのではなく悪役を逮捕すべきだ」と主張しましたが、エミールは「観客はすでにあなたが善良な男であることを知っている。だからこそ、善良な男であっても時には『一線を越える（殺す）』ことができるという面を見たいはずだ」と反論します。</p><p>その後、クーパーがキャデラック・ボブの行方について尋ねると、エミールは「彼にはハリウッドの別の場所で新しい機会があった（実際には共産主義者として解雇した）」と誤魔化し、撮影を強行しようとしました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>大戦前のクーパーの主演映画の監督です。<br><br>彼がクーパーに対して言った「善良な男でも一線を越えることができるという部分を見たい」というセリフは、その後のクーパーが辿った「グールとしての修羅の道」を暗に皮肉っている素晴らしいメタファーとなっています。</div>',
        post: '大戦前の映画監督「エミール・デール」のロア記事を公開しました！🎬\nクーパー・ハワードの主演映画の監督であり、彼に「善良な男でも一線を越える部分を見たい」と指示し、のちのクーパーの運命（グール）を暗示するような印象的なセリフを残しています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/emil-dale.html'
    },
    {
        id: 'enclave-administrator',
        enName: 'Enclave administrator',
        jpName: 'エンクレイヴの管理者',
        rawFile: 'enclave_administrator_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'エンクレイヴ' },
            { label: '役割', value: '管理者' }
        ],
        bodyHtml: '<p>エンクレイヴの管理者（Enclave administrator）は、エンクレイヴの研究施設における実験や業務を監督している人物です。</p><hr><h2>Fallout TVシリーズ</h2><p>第2話「The Target（ターゲット）」において、彼は科学者であるシギ・ウィルツィヒが自身の研究室で「CX404（犬）」を規則違反の秘密のペットとして飼育していることを発見します。<br>管理者はウィルツィヒを地面に突き飛ばし、施設中に警報（アラーム）を鳴らしましたが、主人を守ろうとしたCX404によって喉を噛みちぎられて死亡しました。<br>この騒動により、ウィルツィヒは犬と一緒にやむを得ず施設から逃亡することになります。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ウィルツィヒが犬を隠して飼っていることに気づいてしまった哀れな管理者です。<br><br>彼の死が、ウィルツィヒ博士がドッグミート（CX404）と共にエンクレイヴ施設からの脱走を決意する直接の引き金となりました。</div>',
        post: 'エンクレイヴ研究施設の「管理者」のロア記事を公開しました！🔬\nウィルツィヒ博士が規則違反で犬（CX404）を飼っていることを見つけて警報を鳴らした直後、犬に喉を噛みちぎられて死亡した人物です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/enclave-administrator.html'
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
