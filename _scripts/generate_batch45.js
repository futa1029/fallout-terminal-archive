const fs = require('fs');
const https = require('https');
const path = require('path');

const chars = [
    {
        id: 'tommy-tv-series',
        enName: 'Tommy (TV series)',
        jpName: 'トミー',
        rawFile: 'tommy__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'スカベンジャー / モルデイヴァーの小派閥' },
            { label: '家族', value: 'アダム (父)<br>ルーファス (兄・死亡)<br>サンドラ (妹)' }
        ],
        bodyHtml: '<p>トミー（Tommy）は、Fallout TVシリーズのシーズン1に登場する人物です。ロサンゼルス周辺に住む鉛農家（スカベンジャー）であるアダムの次男です。（演：チャーリー・ベッソ）</p><hr><h2>Fallout TVシリーズ</h2><h3>The Radio (第7話)</h3><p>トミーは父親のアダムと共に、家の近くの砂漠で金属探知機を使って小さな金属類を集めるスカベンジングの旅に出ていました。家に戻ったトミーは、集めたアイテムを溶かすために鍋に空けました。</p><p>二人が家に入ると、そこでは賞金稼ぎのグールが彼らのテーブルでくつろぎながら食事をしていました。グールが長男であるルーファスの名前を出し、一通の封筒を取り出したことで事態は急変します。<br>アダムは激しく動揺し、トミーに「お前は何をしたんだ」「その封筒には何が入っているんだ」と問い詰めます。</p><p>グールが広げた血に染まった手紙には、ルーファスが次男のトミーに大量のキャップを託し、「エンクレイヴからの離反者（シギ・ウィルジグ）」をリー・モルデイヴァーのもとへ安全に輸送するためのクーリエの運賃支払いを依頼していたことが書かれていました。<br>グールがルーファスの死体からその手紙を回収した際、弾痕のせいで手紙の中央の文字が読めず、モルデイヴァーの居場所を知るために彼らの家を訪れたのでした。グールは、モルデイヴァーの居場所さえ教えれば立ち去るとトミーに伝えます。</p><p>トミーは自分を責める父親に謝罪しながらも、「一生土を掘り返して過ごしたくなかった。自分は何かを作り上げたかったし、そのチャンスがあったんだ」と自身の動機を訴えます。しかしアダムは、妹のサンドラを含めて皆殺しにされることを恐れ、グールの要求通りに情報を話すようトミーに強要しました。</p><p>父親からの強い重圧に負け、トミーついにモルデイヴァーがグリフィス天文台にいることを明かしました。これで問題が解決したと安堵したアダムでしたが、グールはトミーに対し「自分が兄を殺したと知っていながら、本当にこのまま自分を帰すつもりか？」と挑発します。<br>アダムが「絶対何もしないから」と必死に弁解する中、トミーの目に静かな殺意が宿っていることをグールは見逃しませんでした。「今日は何もしなくても、いつかはやるだろう」とグールが言うのと同時に、トミーは傍らにあったフリントロック式のマスケット銃に手を伸ばそうとします。<br>しかし、それより早くグールのリボルバーが火を噴き、トミーはその場で射殺されてしまいました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>父親の庇護下から抜け出し、大きなことを成し遂げようと急進的な思想（モルデイヴァーの活動）に傾倒した結果、家全体を破滅の危機にさらしてしまった若者です。<br><br>「自分は一生ゴミ拾いをして生きるのは嫌だった」という彼の叫びは若者ならではの渇望であり理解できますが、手を出した相手がよりにもよって賞金稼ぎのグールだったのは不運でした。最後にグールに復讐心を向けた勇気は賞賛できますが、ウェイストランドでは圧倒的な経験と実力差の前に命を散らすこととなりました。</div>',
        post: '「トミー」のロア記事を追加しました！⛏️\nスカベンジャー「アダム」の息子であり、荒野でゴミを拾うだけの生活に嫌気がさしてモルデイヴァーの活動に手を出した若者です。結果として恐ろしい賞金稼ぎ（グール）を自宅に招き入れてしまい、無謀な反抗を試みた結果、悲惨な結末を迎えました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/tommy-tv-series.html'
    },
    {
        id: 'troy-tv-series',
        enName: 'Sheriff Troy',
        jpName: '保安官トロイ',
        rawFile: 'troy__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'ガバミント (The Govermint)' },
            { label: '役割', value: '保安官' }
        ],
        bodyHtml: '<p>トロイ（Sheriff Troy）は、Fallout TVシリーズのシーズン1に登場する人物です。ソレル・ブッカーが自称する組織「ガバミント（The Govermint）」に仕える保安官であり、同じく保安官のレックスと共に活動しています。彼の父親は、フィリー（Filly）の町で暮らしています。（演：ラッセル・ユーイング）</p><hr><h2>Fallout TVシリーズ</h2><h3>The Trap (第6話)</h3><p>トロイと同僚のレックスは、スーパーデューパー・マートの店内で、臓器密売組織のメンバーたちの死体と共にグールを発見しました。彼らはグールがこの惨劇を引き起こした犯人であると断定し、彼を拘束して「BBQシャック」にいるプレジデント・ブッカーのもとへと連行しました。</p><p>審問の中、グールが「俺はフィリーの町で大勢の人間を殺した」と話したことで空気が変わります。トロイの父親はフィリーに住んでおり、グールが「あいつが臆病者で逃げ出していなければ、俺が殺した奴らの中に混ざっているだろうな」と挑発したため、激昂したトロイは捕虜であるグールに銃口を向けました。<br>最後は一瞬の隙を突いたグールによって、トロイはレックス共々殺害されてしまいました。</p><hr><h2>性格と人物像</h2><p>トロイは「ガバミント」の保安官としての権威を誇示することを躊躇しない傲慢さを持っていましたが、その一方で、フィリーに住む父親のことを深く気にかける思いやりのある一面も持っていました。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>自称「政府（Govermint）」の保安官としてそれなりの権威を振りかざしてはいるものの、本物の死線を潜り抜けてきたグールから見ればただのチンピラに等しい存在でした。<br><br>父親を侮辱されて激昂するあたり、冷酷になりきれない人間らしさが残っていたことが彼の死を早める結果となってしまいました。</div>',
        post: '「保安官トロイ」のロア記事を公開しました！🤠\nソレル・ブッカー大統領率いる「ガバミント」の保安官の一人です。スーパーデューパーマートで倒れていたグールを捕縛し、裁判にかけようとしましたが、彼の父親に関する絶妙な挑発に乗って激昂してしまい、あっさりと返り討ちに遭いました。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/troy-tv-series.html'
    },
    {
        id: 'trudy-tv-series',
        enName: 'Trudy (TV series)',
        jpName: 'トルーディ',
        rawFile: 'trudy__tv_series__raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '女' },
            { label: '現在地', value: 'サンセット・サルサパリラ工場' }
        ],
        bodyHtml: '<p>トルーディ（Trudy）は、Fallout TVシリーズのシーズン2に登場する予定の子どものキャラクターです。（演：アリッサ・ライリー・ンダティ）</p><hr><h2>Fallout TVシリーズ</h2><p>サンセット・サルサパリラ工場周辺に現れる子どもの一人として、シーズン2の第3話「The Profligate」などに登場予定です。（詳細な背景や役割はシーズン2の放送後に追記される見込みです）。</p>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2から本格的に登場する子役キャラクターの一人です。サンセット・サルサパリラ工場というFallout: New Vegasファンにはお馴染みのロケーションに関連しているようです。ニューベガスの工場内に展開されていた星のキャップ収集イベントとの関連など、様々な想像が膨らみますね！</div>',
        post: '「トルーディ」のロア記事を追加しました！🌟\nFallout TVシーズン2に登場する子役キャラクターで、関連ロケーションとしてあの「サンセット・サルサパリラ工場」が設定されています！青い星のキャップに関するイベントなど、ニューベガスファンにとって熱い展開が待っているかもしれません。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/trudy-tv-series.html'
    },
    {
        id: 'u-s-federal-agent',
        enName: 'U.S. federal agent',
        jpName: '米連邦捜査官',
        rawFile: 'u_s__federal_agent_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男' },
            { label: '所属', value: 'アメリカ合衆国政府 / 下院非米活動委員会' }
        ],
        bodyHtml: '<p>米連邦捜査官（U.S. federal agents）は、最終戦争前のアメリカ合衆国連邦政府に所属していた役人たちです。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>背景</h2><p>これらの連邦捜査官は、「下院非米活動委員会（House Un-American Activities Committee）」の権限下で活動しており、大戦前のアメリカにおいて共産主義のシンパや非国民の調査、逮捕を行っていました。劇中ではクーパー・ハワード（後のグール）に対する逮捕状を執行する役割を担っています。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の第8話「The Strip」などに登場予定です。</p><hr><h2>備考</h2><ul><li>現実世界の歴史において、下院非米活動委員会はアメリカ国内での共産党の活動や非米的な活動を調査するために1938年から1975年まで実在した委員会です。Falloutの世界線（Divergence以降）ではこの委員会が存続しつづけ、少なくとも大戦が起こる2077年まで活動していたことが示唆されています。</li><li>ゲーム『Fallout 76』では「米反米活動センター（U.S. Center of Anti-American Activities）」という似た組織が登場しますが、両機関がどのように関連していたかは現時点では不明です。</li></ul>',
        quote: '<div class="quote-box"><b>感想</b><br><br>シーズン2の過去編（戦前）に登場する「赤狩り」の執行官たちです。彼らが逮捕状を持っているということは、ついにクーパー・ハワードが国賊や共産主義のシンパとしてアメリカ政府から弾圧される歴史の決定的瞬間が描かれるということになります。<br><br>現実の歴史を取り入れつつ、冷戦下のパラノイアが2077年まで極限まで煮詰まっていたFalloutの世界観を象徴する存在ですね。</div>',
        post: '「米連邦捜査官（戦前）」のロア記事を公開しました！🇺🇸\nシーズン2の過去編に登場する「下院非米活動委員会（赤狩り）」の執行官です。彼らがクーパー・ハワードに対する逮捕状を執行するということは、シーズン1のラストで彼が行った盗聴や破壊工作がついに政府にバレて弾圧される決定的瞬間が描かれるようです。\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/u-s-federal-agent.html'
    },
    {
        id: 'union-protester',
        enName: 'Union protester',
        jpName: '組合の抗議者',
        rawFile: 'union_protester_raw.json',
        category: '人物',
        appearance: 'Fallout TV',
        info: [
            { label: '人種', value: '人間' },
            { label: '性別', value: '男女' },
            { label: '所属', value: '労働組合' }
        ],
        bodyHtml: '<p>組合の抗議者（Union protesters）は、最終戦争前のアメリカで労働環境や自動化に反対して抗議活動を行っていた人々の集団です。Fallout TVシリーズのシーズン2に登場します。</p><hr><h2>Fallout TVシリーズ</h2><p>シーズン2の第1話「The Innovator」の過去編（戦前）に登場予定です。<br>ロサンゼルスの街角で、労働組合の組合員たちが警察官と対峙しながらデモ活動を行っている姿や、人間の仕事を奪うロボットに対する怒りから「Mr.ハンディ」を破壊している様子が描かれています。</p><hr><h2>備考</h2><ul><li>抗議活動の現場にいるほとんどの組合員はクレジットされていないエキストラやスタント俳優によって演じられていますが、抗議の責任者（protest foreperson）役としてエンジェル・マニュエル（Angel Manuel）だけがクレジットに記載されています。</li></ul>',
        quote: '<div class="quote-box"><b>感想</b><br><br>Falloutの戦前の世界観お馴染みの「オートメーション化による失業とそれに激怒する労働者」の暴動を映像化したエキストラ集団です。Fallout 76やFallout 4のターミナル記録などで、ロボット導入にキレた労働者がストライキを起こして武力弾圧される小ネタは頻繁に登場していましたが、ついに実写でMr.ハンディがリンチされるシーンが見られそうですね。</div>',
        post: '「組合の抗議者（戦前）」のロア記事を追加しました！🪧\nシーズン2の過去編に登場する、街頭でデモを起こしている労働組合のメンバーたちです。ロボットによるオートメーション化に激怒し、街角にいる「Mr.ハンディ」を破壊する暴動を起こしています。ゲーム内のターミナルでよく見た「ロボットに仕事を奪われた労働者の怒り」の映像化ですね！\n#FalloutTV #フォールアウト\nhttps://www.fallout-jp.com/union-protester.html'
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
