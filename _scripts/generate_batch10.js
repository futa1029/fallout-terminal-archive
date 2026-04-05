const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'casey-schulz',
        enName: 'Casey Schulz',
        jpName: 'ケイシー・シュルツ',
        rawFile: 'casey_schulz_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男女不明' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: 'ジュニア・エグゼクティブ' }
        ],
        bodyHtml: '<p>ケイシー・シュルツ（Casey Schulz）は、大戦前のVault-Tec社におけるジュニア・エグゼクティブであり、現在はVault 31で冷凍保存されている人物です。</p><hr><h2>背景</h2><p>ケイシーは、バド・アスキンスが主導するエグゼクティブ・アシスタント訓練プログラム「バズ・バッズ（Bud\'s Buds）」に選抜された若手社員の一人です。この計画は、最終戦争によってVault-Tec社の競争相手がすべて消滅した後の世界において、人類の未来を形作る「スーパーマネージャー」を育成することを目的としていました。</p><p>ケイシーや他の「バッズ」たちはVault 31で冷凍保存（クライオスタシス）されており、バド・アスキンスの管理下で定期的に解凍され、Vault 32やVault 33の居住者の管理や、管理された繁殖（優生学）の相手として派遣される手はずとなっていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Vault 31の冷凍ポッドで眠る「バズ・バッズ」のメンバーの一人です。<br><br>本編では直接登場したわけではなく、おそらくポッドのラベル等の名前として確認できる人物だと思われます。バドの「時間という究極の兵器」を体現している存在ですね。</div>',
        post: 'Vault 31で冷凍睡眠についているVault-Tec社の若手幹部候補生「ケイシー・シュルツ」のロア記事を公開しました！❄️\nバド・アスキンスの人材育成プログラム「バズ・バッズ」のメンバーの1人で、将来的にVault 32や33を管理するために保存されています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/casey-schulz.html'
    },
    {
        id: 'cassandra-hawthorne',
        enName: 'Cassandra Hawthorne',
        jpName: 'カサンドラ・ホーソーン',
        rawFile: 'cassandra_hawthorne_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault 4 / Vault-Tec' },
            { label: '役割', value: '遺伝子研究者' }
        ],
        bodyHtml: '<p>カサンドラ・ホーソーン（Cassandra Hawthorne）は、大戦前のアメリカにおける遺伝子研究者であり、Vault 4の本来の居住者でした。</p><hr><h2>背景</h2><p>カサンドラは、人間のDNAにおける放射線の影響を研究するため、その専門知識を見込まれてVault 4に配属された多くの科学者のうちの一人でした。<br>彼女とその夫のロイド・ホーソーン、そして二人の子供たちは、Vault 4の宣伝用コマーシャル映像に出演していました。</p><p>このコマーシャル映像には俳優のクーパー・ハワードも出演しており、クーパーは視聴者に対して「彼女と彼女の夫は共に放射線が人間のDNAに与える影響を研究する科学者だ」と紹介しています。カサンドラはそれに応じて、Vault 4に居住しながら「科学者たちによって率いられるコミュニティ」を導いていくことを笑顔で語っていました。</p><p>しかし実際には、彼女たち科学者はVault 4内での過酷な人体実験の犠牲になったか、あるいはその実験を主導した結果として、最終的にVaultの実験体アボミネーションの反乱によって命を落としたものと推測されます。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ドラマ内でクーパーが出演していたVault 4のCMで、彼と一緒にテーブルを囲んでいた女性科学者です。<br><br>「科学者が主導するコミュニティ」という表向きの輝かしい宣伝とは裏腹に、Vault 4がいかに凶悪な人体実験場であったかを考えると、大戦前のVault-Tecの恐ろしいプロパガンダの１ページとして非常に味わい深いです。</div>',
        post: 'クーパー主演のVault 4のCMに出演していた女性科学者「カサンドラ・ホーソーン」のロア記事を公開しました！🧬\n表向きは「被ばくしたDNAの研究」を目的としていましたが、Vault 4で行われた非道な人体実験の裏側を知っていると、このCMがいかに恐ろしいかがわかりますね…。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/cassandra-hawthorne.html'
    },
    {
        id: 'cathy-tv-series',
        enName: 'Cathy (TV series)',
        jpName: 'キャシー',
        rawFile: 'cathy__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '所属', value: 'Vault 4' },
            { label: '役割', value: '居住者' }
        ],
        bodyHtml: '<p>キャシー（Cathy）は、Fallout TVシリーズに登場する人物で、Vault 4の居住者です。</p><hr><h2>Vault 4での活躍</h2><p>ルーシー・マクレーンがVault 4の禁じられた第12階層に侵入し、過去に行われていた人体実験の動画などを発見してしまったため捕らえられた際、オーヴァーシアのベンジャミンによって彼女の処遇が決まりました。<br>ベンジャミンが下した判決は恐ろしい「死」ではなく、あくまでVault 4からの「追放（banishment）」であり、しかもウェイストランドでの生存に必要な十分な物資を彼女に持たせて地上へ帰すという、極めて慈悲深いものでした。</p><p>この際、ルーシーが荒野で生き延びられるよう、追放前の彼女に「2週間分の食料と水」などの物資セットを両手で運んできたのがキャシーです。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>第7話で、追放されるルーシーに物資を持ってきてあげる役割を持った居住者です。<br><br>Vault 4の住人たちの「一見狂信的でカルトのようだが、実は驚くほど善良でまとも」というギャップを象徴するようなシーンに登場するキャラクターですね。彼女の運んできた補給物資のおかげで、ルーシーは無事に旅を続けることができました。</div>',
        post: 'Vault 4で追放されるルーシーに物資を運んできた居住者「キャシー」のロア記事を公開しました！📦\n「死刑だ！」と思わせといて、まさかの「2週間分の食料と水を持たせて追放」という、あのVault 4の善良すぎるギャップを彩るキャラクターのひとりですね。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/cathy-tv-series.html'
    },
    {
        id: 'charles-whiteknife',
        enName: 'Charles Whiteknife',
        jpName: 'チャールズ・ホワイトナイフ',
        rawFile: 'charles_whiteknife_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'アメリカ海兵隊 / リー・モルデイヴァー' },
            { label: '役割', value: '元海兵隊員 / 俳優' }
        ],
        bodyHtml: '<p>チャールズ・”チャーリー”・ホワイトナイフ（Charles Whiteknife）は、最終戦争前のアメリカ海兵隊員であった人物です。後に俳優となり、クーパー・ハワードの友人として共に過ごしていました。</p><hr><h2>背景</h2><p>チャーリーは、アメリカ海兵隊の伍長（Corporal）としてアラスカやアラスカ・フロントでの激しい戦闘に参加していました。<br>軍を退役した後はハリウッドで俳優となり、同じく退役軍人であるクーパー・ハワードと深く親交を結び、共に酒を飲み交わしながらしばしばハリウッドのイベントに参加していました。</p><p>しかし、彼は政府と巨大企業が共謀して行っている資源独占や戦争推進の「プロパガンダ」の裏側に徐々に気付き始めており、政府批判を行うリー・モルデイヴァー（当時の名前はウィリアムズ）の秘密集会に出入りするようになりました。<br>ある夜の飲み会で、チャーリーはクーパーに対して、退役軍人が集まるイベントや自分たちが語る「武勇伝」についての虚しさを吐露します。<br>「<i>俺たちはどんなことをしたかを話し合うのが好きだ。まあ、全部じゃないけどな。だか、口にする武勇伝は……自分たちの行いを正当化するためのものだ。すべて正しい理由だったと信じるための希望さ。だが俺たちはただの海兵隊員で、真実を知る特権は与えられておらず、ただ上の言うことを信じるしかなかった。</i>」</p><hr><h2>共産主義への傾倒とその後</h2><p>政府やVault-Tec社に疑念を抱くようになったチャーリーは、共産主義者と見なされるグループへと傾倒していき、親友のクーパーにもハリウッド墓地で行われるモルデイヴァーの秘密集会へと参加するよう誘いました。<br>クーパーは当初、彼らが「共産主義者であるか、少なくともそれに近い集団」であると考え激しく警戒しましたが、最終的にチャーリーの言葉に動かされ、妻バーブが関与するVault-Tec社の裏の顔を探るために集会へと足を運ぶことになります。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>クーパーの親友の元海兵隊員で、彼をモルデイヴァーの秘密集会へ誘った重要な人物です。<br><br>「自分たちはただの駒に過ぎなかったのではないか」「自由な世界のために戦ったと言われたが、本当にそうだったのか」という、前線の兵士のリアルな葛藤と虚無感を語るシーンは非常に重みがありました。彼がいなければ、クーパーがVault-Tecの陰謀に気付くことも、Vaultへの盗聴を行うこともありませんでした。</div>',
        post: 'クーパー親友の退役軍人「チャールズ・ホワイトナイフ」のロア記事を公開しました！🪖\nアラスカの前線で戦った元海兵隊員ですが、「自分たちが戦った理由は本当に正しかったのか」という虚脱感に苛まれ、最終的にクーパーをモルデイヴァーの集会へと導いた最重要人物の一人です。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/charles-whiteknife.html'
    },
    {
        id: 'chase-powell',
        enName: 'Chase Powell',
        jpName: 'チェイス・パウエル',
        rawFile: 'chase_powell_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'Vault 31 / Vault-Tec' },
            { label: '役割', value: 'ジュニア・エグゼクティブ' }
        ],
        bodyHtml: '<p>チェイス・パウエル（Chase Powell）は、大戦前のVault-Tec社におけるジュニア・エグゼクティブであり、現在はVault 31で冷凍保存されている人物です。</p><hr><h2>背景</h2><p>チェイスは、バド・アスキンスが主導するエグゼクティブ・アシスタント訓練プログラム「バズ・バッズ（Bud\'s Buds）」に選抜された若手社員の一人です。この計画は、最終戦争によってVault-Tec社の競争相手がすべて消滅した後の世界において、人類の未来を形作る「スーパーマネージャー」を育成することを目的としていました。</p><p>チェイスや他の「バッズ」たちはVault 31で冷凍保存（クライオスタシス）されており、バド・アスキンスの管理下で定期的に解凍され、Vault 32やVault 33の居住者の管理や、管理された繁殖（優生学）の相手として派遣される手はずとなっていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>ケイシーと同じく、Vault 31の冷凍ポッドで眠る「バズ・バッズ」のメンバーの一人です。<br><br>Vault 31にはこうした「大企業の若手幹部」たちが無数に眠っており、彼らが定期的に目覚めてはVault 32や33の監督官（オーヴァーシア）に着任して住民をコントロールしていると思うと、Vault 31・32・33の実験コンセプトの異様さが際立ちます。</div>',
        post: 'Vault 31で冷凍睡眠についているVault-Tec社の若手幹部候補生「チェイス・パウエル」のロア記事を公開しました！❄️\n彼ら「バズ・バッズ」のメンバーは定期的に解凍され、Vault 32や33のオーヴァーシアとして住民たちを管理しながら、純粋なVault-Tecエリートの血統をウェイストランドに広める役目を持っています。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/chase-powell.html'
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
