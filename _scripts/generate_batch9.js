const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'burly-raider',
        enName: 'Burly raider',
        jpName: '大柄なレイダー',
        rawFile: 'burly_raider_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'レイダー' },
            { label: '役割', value: 'レイダー' }
        ],
        bodyHtml: '<p>大柄なレイダー（Burly raider）は、Fallout TVシリーズに登場するレイダーグループのメンバーです。Vault 32の居住者を装い、Vault 33の襲撃に参加した大柄で屈強な人物です。</p><hr><h2>背景</h2><p>リー・モルデイヴァーによってスカウトされたレイダーの1人で、三つのVaultに対する潜入作戦に参加しました。3年ごとの交易式典乗っ取りのため、Vault 32の衣服を身に着けていました。</p><p>ルーシーとモンティの結婚披露宴の最中、デイヴィーらの隣に座っている姿が確認できます。<br>襲撃が始まると、彼は赤い吸入器から薬物（外見や使用感はジェットに類似していますが、脚本上は「赤い吸入器」とだけ記載されています）を吸い込み、素手でVault 33の居住者たちを圧倒します。その際、近くに隠れていたノームの横を気付かずに通り過ぎていきました。</p><p>その後、Vault間を繋ぐ巨大な扉の前で拘束した警備員を引きずっているところを、ゲートキーパーのチェットに制止されます。<br>レイダーはマチェーテを取り出しチェットに襲い掛かりますが、警備員に足首を掴まれてよろめきました。その瞬間、パニックに陥ったチェットが誤ってPip-Boyの接続を解除してしまったことでVaultの分厚い扉が作動し、大柄なレイダーは扉に挟まれて腰から真っ二つに切断され死亡しました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>第1話のVault襲撃シーンで圧倒的な暴力を見せつけた巨漢のレイダーです。<br><br>赤い吸入器（おそらくジェット）を使ってパワーアップし、マチェーテを振り回す姿はまさにウェイストランドの無法者。最後はチェットの痛恨のミス（？）によってVaultのドアに挟まれて死ぬという、Falloutらしい非常にグロテスクで印象的な最期を遂げました。</div>',
        post: 'TVシリーズ第1話の襲撃で印象的だった「大柄なレイダー」のロア記事を公開しました！🚪\n赤い吸入器（ジェット？）を使った狂暴な戦いぶりと、Vaultのドアに挟まれて真っ二つになる凄惨な最期が鮮烈でしたね…。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/burly-raider.html'
    },
    {
        id: 'cadillac-bob',
        enName: 'Cadillac Bob',
        jpName: 'キャデラック・ボブ',
        rawFile: 'cadillac_bob_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'カリフォルニア・クレスト・スタジオ' },
            { label: '役割', value: '脚本家' }
        ],
        bodyHtml: '<p>キャデラック・ボブ（Cadillac Bob）は、映画『マン・フロム・デッドホース』の元々の脚本家であった大戦前のアメリカ人です。Fallout TVシリーズ内での言及のみ登場します。</p><hr><h2>背景</h2><p>ボブは共産主義者であるとして、カリフォルニア・クレスト・スタジオから解雇されました。その実際の決定打は、映画の脚本をスタジオが求める「新しいアメリカ」の理念——ならず者を冷酷に射殺するような展開——に書き換えることを彼が拒否したためと考えられます。</p><p>主演のクーパー・ハワードはその脚本変更に強く抗議しましたが、その際に初めて、スタジオ幹部のエミールからボブが「共産主義者」として解雇された事実を知らされました。<br>クーパーは「偉大な脚本家だったのに」と彼の解雇を惜しんでいました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>クーパー主演の映画『マン・フロム・デッドホース』の元脚本家です。保安官が無法者の顔面を撃ち抜くという冷酷な脚本への変更を拒否した結果、「アカ（共産主義者）」のレッテルを貼られて追放されてしまいました。<br><br>戦前アメリカの赤狩りの狂気と、メディアをプロパガンダに利用しようとするスタジオの思惑がリアルに表現されている背景設定ですね。</div>',
        post: '映画『マン・フロム・デッドホース』の元脚本家「キャデラック・ボブ」のロア記事を公開しました！🎬\n「無法者の頭を冷酷に撃ち抜く」というプロパガンダ的脚本への変更を拒否したため、共産主義者のレッテルを貼られて解雇されたという戦前社会の深い闇を感じる人物です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/cadillac-bob.html'
    },
    {
        id: 'caesar-tv',
        enName: 'Caesar (TV series)',
        jpName: 'シーザー',
        rawFile: 'caesar__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'シーザー・リージョン' },
            { label: '役割', value: '派閥リーダー' }
        ],
        bodyHtml: '<p>シーザー（Caesar）は、2296年のモハビ・ウェイストランドにおいて、シーザー・リージョンから分裂した派閥のリーダーを務めていた人物です。</p><hr><h2>背景</h2><p>オリジナルのシーザー（エドワード・サロウ）が2281年から2296年の間に死亡した後、リージョンは「誰が後継者となるか」を巡って二つの派閥に分裂しました。<br>二人の男が共にシーザーの座を主張し、互いを「偽のシーザー（False Caesar）」と呼び合いながら対立を深めました。両派閥の部隊は、サロウが後継者の名前を記したとされる遺書を回収しようとしましたが、互いの野営地が向かい合っているために膠着状態が続いていました。</p><p>2296年7月、グール（クーパー・ハワード）が両陣営の対立を利用したことで事態は急変します。<br>グールはルーシーの解放を条件にNCRの最後の拠点の場所を教えるという取引をこのシーザーに持ちかけましたが、最終決戦の演説中にグールが仕掛けた爆発により、対立派閥からの攻撃と勘違いした両陣営間で血みどろの内戦が勃発しました。</p><hr><h2>結末</h2><p>この激しい戦闘の中でシーザーはピルム（槍）で体を貫かれて死亡しました。<br>もう一方の「偽のシーザー」も死亡するか権力を失ったとみられ、内戦後には副官であったラセルタ・レガートが生き残ったリージョン兵たちを掌握し、新たな指導者となりました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>NVのシーザー亡き後、後継者争いで分裂した「もう一人のシーザー」ですね。<br><br>いがみ合いつつも互いに牽制して膠着状態にあったところを、グールの爆発ひとつであっさり血みどろの同士討ちに発展してしまうのが何ともリージョンらしいというか、本国が崩壊した後の末路という感じがして非常に興味深いです。結局、漁夫の利を得たのは副官のラセルタでした。</div>',
        post: 'TVシリーズに登場した分派のリーダー「シーザー」のロア記事を公開しました！🦅\nNVのシーザー（エドワード・サロウ）亡き後、遺書を巡って分裂したリージョンの後継者争いが泥沼化しており、最終的にはグールの機転（爆発）によって同士討ちの末に命を落としました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/caesar-tv.html'
    },
    {
        id: 'canadian-rebel',
        enName: 'Canadian rebel',
        jpName: 'カナダの反乱者',
        rawFile: 'canadian_rebel_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'カナダ' },
            { label: '役割', value: '反乱者' }
        ],
        bodyHtml: '<p>カナダの反乱者（Canadian rebel）は、Fallout TVシリーズのシーズン2に登場する人物です。</p><hr><h2>背景</h2><p>戦前、ウランシティの強制収容所で集団脱走が発生した際、アメリカ軍は逃亡者たちの追跡を行っていました。<br>ステフ・ハーパーと彼女の母親が米海兵隊のベルチバードとT-45パワーアーマーに追い詰められ、「Hoser（カナダ人を侮蔑するスラング）」と呼ばれ銃口を向けられていた絶体絶命の状況下で、このカナダの反乱者が自爆テロを決行しました。</p><p>この爆発により彼自身とパワーアーマーを着た兵士は死亡し、ステフの母親も致命傷を負いましたが、ステフ本人が国境を越えて逃げ延びる千載一遇の隙を作ることになりました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2で描かれた悲惨な戦前カナダ併合問題のワンシーンに登場した人物。<br><br>米軍の理不尽な制圧から逃げ惑うステフ達を救う形になった自爆攻撃ですが、ゲーム内（初代Falloutのオープニング映像等）で米兵に処刑されていたカナダ市民たちの凄惨な歴史をリアルに映像化しており、胸が締め付けられます。</div>',
        post: 'シーズン2に登場した「カナダの反乱者」のロア記事を公開しました！🍁\nウランシティ強制収容所からの脱走中、T-45パワーアーマーに追い詰められたステフ達を救う形になった捨て身の自爆攻撃でした。戦前カナダにおける米軍の弾圧の歴史が重くのしかかるシーンですね。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/canadian-rebel.html'
    },
    {
        id: 'carl-tv-series',
        enName: 'DJ Carl',
        jpName: 'DJカール',
        rawFile: 'carl__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'KPSSラジオ' },
            { label: '役割', value: 'ラジオホスト' }
        ],
        bodyHtml: '<p>DJカール（DJ Carl）は、Fallout TVシリーズに登場するラジオ放送局のホストです。</p><hr><h2>背景</h2><p>ハリウッド・ヒルズの麓にあるラジオ局「KPSS」を運営しており、自身の好む音楽、特にフィドル（バイオリン）の曲ばかりを放送し続けています。<br>しかし、彼の放送を快く思わない多数の「批評家（critics）」たちからの襲撃から身を守るために、彼はラジオ局の周囲に命に関わる危険なブービートラップを無数に設置しています。</p><hr><h2>TVシリーズでの活躍</h2><p>足を骨折して重傷を負いながらシギ・ウィルツィヒの頭部を運んでいたサディウスが、B.O.S.の救助を待つために彼のラジオ局にたどり着きます。<br>サディウスから「そのフィドル音楽、あまり好かれていないんじゃないですか？」と尋ねられると、カールは怒った「批評家」たちのことを語り、彼らがオリジナル音源の持つ「あたたかみのあるサウンド」や低音・高音の豊かな周波数を理解していないのだと熱弁しました。</p><p>サディウスが罠の出来栄えを褒めていると、遠くからルーシーとマキシマスがラジオ局に歩いてくるのをカールが発見します。サディウスが彼らに発砲しはじめたため、カールはただちに局のシャッターを下ろして身を守りました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>スリードッグやミスター・ニューベガスのような個性的すぎるウェイストランドのラジオホストの一人ですね。<br><br>特定の趣味（フィドル）に偏りすぎた選曲のせいでレイダーたちから襲撃を受けているにも関わらず、放送内容を変えるどころか局の周りを罠だらけにして意地でも放送を続けるという、なかなかの狂気を持っています。オリジナルのレコード音源の「あたたかみ（ウォームサウンド）」を語る姿には、どことなく現実のオーディオマニアっぽさも感じられます。</div>',
        post: 'ハリウッド・ヒルズのラジオホスト「DJカール」のロア記事を公開しました！📻\n「フィドル音楽しか流さない」という極端なこだわりのせいで数々のクレーム（物理）を受けており、放送局の周りをブービートラップだらけにして意地でも趣味の放送を続けるというウェイストランドらしい狂人です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/carl-tv-series.html'
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
        
        // simple replacements
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
