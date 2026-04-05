const fs = require('fs');
const path = require('path');

const batchData = [
    { "fileName": "adam-tv-series", "rawFile": "adam__tv_series__raw.json", "name": "アダム", "engName": "Adam", "bodyHtml": "<h2>概要</h2><p><b>アダム</b> は、広域ロサンゼルスエリアに住む鉛農家の男性です。</p><h2>背景</h2><p>2296年、アダムは金属探知機を使って古いスクラップや薬莢を拾い集める生活を送っています。彼は過去にグールとの間に銃撃戦を含む暴力的な遭遇があったことが示唆されています。後に身を固め、長男ルーファス、次男トミー、娘サンドラという3人の子供をもうけました。</p><h3>Fallout TVシリーズ（ザ・ラジオ）</h3><p>ある日、アダムと次男トミーは家の近くの砂漠で金属漁りをしていました。二人が家に帰ると、食卓にはグールが座っており、彼らの夕食を勝手に食べていました。グールは脅迫めいた態度で、長男ルーファスがリー・モルデイヴァーの作戦に関わった結果、自分に殺されたことを明かします。<br><br>グールは、血まみれの手紙を見せ、ルーファスがトミーにモルデイヴァーの元へ「エンクレイヴの離反者」を運ぶための資金調達を任せていたことを暴露しました。グールはモルデイヴァーの居場所さえ教えれば立ち去ると約束します。息子たちを犯罪行為から遠ざけ、家族を守ろうとするアダムの必死の説得により、トミーはモルデイヴァーがグリフィス天文台にいることを明かします。しかし、兄の復讐を果たそうとしたトミーがマスケット銃に手を伸ばしたため、グールによって射殺されてしまいます。立ち去るグールの背後で、アダムは二人目の息子を失った悲しみに暮れるのでした。</p>" },
    { "fileName": "arnold-galaxy-news-network", "rawFile": "arnold__galaxy_news_network__raw.json", "name": "アーノルド", "engName": "Arnold", "bodyHtml": "<h2>概要</h2><p><b>アーノルド</b> は、2077年にギャラクシー・ニュース・ネットワーク（GNN）で働いていたインターンの青年です。</p><h2>背景</h2><p>アーノルドはVault 33からの『特別ライブレポート』の際、アナウンサーの下で番組の進行台本を担当していました。しかし、彼はニュース記事の代わりに広告ばかりを読ませようとしたため、リポーターを苛立たせます。23歳にもかかわらず15歳にしか見えないアーノルドの無能ぶりに腹を立てたリポーターが縁故採用を疑うと、アーノルドの叔父がGNNのゼネラルマネージャーであることが判明します。<br><br>生放送中にも関わらず、状況に応じた的確な対応ができず、質問にもまともに答えないアーノルドにリポーターの怒りは爆発し、ついには放送中に精神的な崩壊を引き起こしてしまいます。しかし、激怒したリポーターがアーノルド自身はVaultに入れるのかと尋ねると、驚くべきことに彼とアーノルドは同じVault 33に入居予定であることが判明します。この事実を知ったリポーターは、アーノルドと一緒に一生をVaultで過ごすという運命を受け入れ、Vaultツアーの放送を開始するのでした。</p>" },
    { "fileName": "aspirant-tv-series", "rawFile": "aspirant__tv_series__raw.json", "name": "アスピラント", "engName": "Aspirant", "bodyHtml": "<h2>概要</h2><p><b>アスピラント</b> は、ドラマシリーズに登場するB.O.S.（ブラザーフッド・オブ・スティール）の見習い・訓練生たちです。</p><h2>背景</h2><p>サンフェルナンド騎士団と呼ばれるB.O.S.の支部において、アスピラントは最も階級の低い訓練生を指します。子供や成人した新兵たちで構成されており、多くの名も無きアスピラントたちの他に、マキシマス、デイン、サディアスといった主要キャラクターたちも元々はこの階級からスタートし、後にスクワイア（従者）へと昇格しました。<br><br>彼らは白のTシャツという質素な服装で日々過酷な肉体・戦闘訓練を積んでおり、上位のクレリック（聖職者）であるフェリックスなどから厳しい軍事的、時には体罰を伴う指導を受けています。</p>" },
    { "fileName": "bartender-los-angeles", "rawFile": "bartender__los_angeles__raw.json", "name": "バーテンダー", "engName": "Bartender (Los Angeles)", "bodyHtml": "<h2>概要</h2><p><b>バーテンダー</b> は、ドラマシリーズ第6話「ザ・トラップ」に登場するキャラクターです。</p><h2>背景</h2><p>彼はロサンゼルスのバーで働いており、戦前のシーンでクーパー・ハワードとチャールズ・ホワイトナイフがVault-Tec社への不信感について密約を交わしている際に客に酒を提供していました。ホワイトナイフが去った後、クーパーはこのバーテンダーにもう一杯の酒を注文しました。</p>" },
    { "fileName": "bartender-lucky-38", "rawFile": "bartender__lucky_38__raw.json", "name": "バーテンダー（ラッキー38）", "engName": "Bartender (Lucky 38)", "bodyHtml": "<h2>概要</h2><p><b>バーテンダー（ラッキー38）</b> は、戦前の「ラッキー38」で働いていた従業員たちです。ドラマ版シーズン2に登場します。</p><h2>背景</h2><p>シーズン2の「The Wrangler」および「The Other Player」において、ラッキー38のカジノや、ディーン・ドミノ・ラウンジのスタッフとしてゲストにサービスを提供する姿が描かれています。</p>" },
    { "fileName": "bar-patron-tv-series", "rawFile": "bar_patron__tv_series__raw.json", "name": "バーの客", "engName": "Bar patron", "bodyHtml": "<h2>概要</h2><p><b>バーの客</b> は、ドラマシリーズ第6話「ザ・トラップ」に登場するロサンゼルスのバーの利用客たちです。</p><h2>背景</h2><p>クーパー・ハワードとチャールズ・ホワイトナイフがVault-Tecの陰謀について会談していたバーで、酒を飲んだり会話を楽しんでいた名も無き市民たちです。</p>" },
    { "fileName": "benjamin-tv-series", "rawFile": "benjamin__tv_series__raw.json", "name": "ベンジャミン", "engName": "Overseer Benjamin", "bodyHtml": "<h2>概要</h2><p><b>オーバーシアー・ベンジャミン</b>（通称ベン）は、2296年時点でのVault 4のオーバーシアーを務める人物です。</p><h2>背景</h2><p>ベンジャミンの祖先は、元々地上からの難民としてVault 4に引き入れられた人々でした。当時のVault 4の科学者たちは、受け入れた難民たちを放射線耐性のある生物と交配させる恐ろしい遺伝子実験の被験体として利用していました（ベンの大叔父ピーターもその実験でガルパーにされたと言われています）。やがて被験者たちが反乱を起こしVaultを制圧して以降、彼らミュータントの子孫がVault 4を統治しながら、善意に基づいて地上の難民を受け入れる方針を続けています。<br><br>ベンジャミン自身もその遺伝子実験の影響を色濃く残しており、一つ目の異形な外見を持っていますが、本人は他者からどう見られているかあまり気にしていません。</p><h2>パーソナリティ</h2><p>表面上は礼儀正しく従順に見えますが、本音では難民たち（サーフィー）の体臭や奇妙で野蛮な習慣を見下している非常に偏見に満ちた人物です。しかし、その内面とは裏腹に、彼はオーバーシアーとしての力を使って難民を虐待・排斥することは一切なく、作中でも際立って慈悲深く平和的な統治者として描かれています。<br><br>最大の関心事はレベル12にいる実験の犠牲者（ガルパーなどの元人間の家族たち）を安全で快適に守ることです。儀式に対する無知から彼らの安息の地を荒らし、介護者に傷を負わせたルーシーに対し、彼は激怒したものの、下した「死刑判決」とは、「2週間分のサバイバル物資を持たせて地上に追放する」というものでした。極めて偽善的で世間知らずな男ではありますが、最終的には強い人権意識と同情心に突き動かされる心優しき指導者です。</p>" },
    { "fileName": "bert-tv-series", "rawFile": "bert__tv_series__raw.json", "name": "バート", "engName": "Bert", "bodyHtml": "<h2>概要</h2><p><b>バート</b> は、Vault 33に住んでいた温厚な住人の一人です。</p><h2>背景</h2><p>彼は2294年にステフ・ハーパーと結婚しました。ステフの話によれば、バートは靴をとても大切にし、丁寧に手入れをしていましたが、靴の話題になると周りの人間がうんざりして立ち去るほど話し続けてしまうという少々退屈な一面がありました。2296年までに、ステフとの間に第一子をもうけていました。<br><br>ルーシーの結婚式の日、Vault 32の住人を歓迎し、彼らと共に宴会を楽しみましたが、その後Vault 32の住人の正体がレイダーであったことが判明し、突判として始まった大虐殺に巻き込まれてしまいます。武器を持たず逃げ惑うバートはレイダーの一人に首を切り裂かれて死亡。彼の無惨な死を目の当たりにしたステフは悲しみと怒りで狂乱し、レイダーにフォークを突き立てて反撃を試みました。</p>" },
    { "fileName": "biff-tv-series", "rawFile": "biff__tv_series__raw.json", "name": "ビフ", "engName": "Ranger Biff", "bodyHtml": "<h2>概要</h2><p><b>ビフ</b> は、新カリフォルニア共和国（NCR）のレンジャー残党の一人です。ドラマ版のシーズン2に登場します。</p><h2>背景</h2><p>ビフはモハビ・ウェイストランドにおけるNCRの最後の生き残りの一人であり、シェイディ・サンズの崩壊とそれに伴う他部隊との通信途絶以降、シーザー・リージョンの動きを警戒し続けていました。2296年時点では、ロドリゲス大尉ともう一人のベテランレンジャーと共にプリムの近くのNCR前哨基地で野営しており、ペットのリスを世話しながら孤独と絶望の中で時間を潰していました。<br><br>長年の孤立と激戦により精神的にすり減りながらも任務への強い信仰を保ち続け、「いつかNCRの大部隊が戻ってくる」という希望を捨てていませんでした。</p><h3>Fallout TVシリーズ</h3><p>グールがルーシー救出のための助っ人を求めて基地に現れた際、ビフとロドリゲスは彼の申し出をキッパリと断ります（The Profligate）。その後、リージョンの攻撃を避けるため基地を撤収して移動していたところ、ハンク・マクレーンの支配下にある謎の勢力に拉致され、同様に捕らえられたリージョンの巨大な兵士と共に『ブレイン・コンピュータ・インターフェース・チップ』を埋め込まれてしまいます。<br><br>「The Other Player」にて、ルーシーの決断によりチップの起動スイッチが押されたことにより、ビフは完全に洗脳され、直前まで殺し合っていたリージョンの兵士と友好的に接し合うような、Vault-Tecの模範的な従業員（奴隷）へと変貌させられてしまいました。</p>" },
    { "fileName": "bill-tv-series", "rawFile": "bill__tv_series__raw.json", "name": "ビル", "engName": "Bill", "bodyHtml": "<h2>概要</h2><p><b>ビル</b> は、ドラマ版のシーズン2第1話「The Innovator」に登場する失業中の建設作業員です。</p><h2>背景</h2><p>恰幅が良くハゲ頭のビルは、ロブコ・インダストリーズが進める「人間をロボットに置き換える」オートメーション化の政策に大きな不満を抱いており、オートメーション暴動の抗議者たちと共にロサンゼルスのバーで時間を潰していました。<br><br>バーのテレビでMr.ハウスについての演説を見たビルは暴言を吐きますが、そこに現れた見知らぬ男（本物のMr.ハウス）がハウスの権力を賞賛し始めたため、仲間と共に彼をバーから叩き出します。しかし、男から3100万ドルという途方も無い現金が積まれた車のトランクを見せられ、「後頭部に小さなデバイス（インターフェース・チップ）を挿入する市場調査」の取引を持ち掛けられます。<br><br>ビルは取引を拒否し、「金だけ奪う」と凄んでハウスの腕をへし折ろうとしますが、隙を突いたハウスにデバイスを首の裏へ直接ねじ込まれてしまいます。チップが起動した直後、自我を奪われたビルは渡されたバットで嬉々としてかつての仲間たちを撲殺しました。最後はハウスがチップの出力を操作したことで頭が爆発し、「世界が終わろうとも技術は進歩を続ける」というハウスの不気味な実験の犠牲者として果てました。</p>" },
    { "fileName": "brotherhood-soldier-tv-series", "rawFile": "brotherhood_soldier__tv_series__raw.json", "name": "ブラザーフッド・ソルジャー", "engName": "Brotherhood soldier", "bodyHtml": "<h2>概要</h2><p><b>ブラザーフッド・ソルジャー（兵士）</b> は、ドラマシリーズに登場するB.O.S.の大規模な戦闘歩兵部隊を形成するメンバーです。</p><h2>背景</h2><p>サンフェルナンド騎士団におけるソルジャーは、赤いアンダーシャツと黒・灰色の戦闘服（コンバットアーマー）を身にまとった下級の現役隊員たちです。赤いオーバーコートを着たB.O.S.オフィサーに率いられ、ベルチバードを操縦するパイロットなどと共に展開します。<br><br>彼らはエンクレイヴの離反者シギ・ウィルジグに対する捜索命令を聞くため広場に集結したり、最終話でのフィリーやグリフィス天文台への総攻撃に大量に動員されました。グリフィス天文台の戦いでは、NCRの兵士たちと激しい銃撃戦を繰り広げますが、直後に乱入してきたグールによって暗闇に乗じて次々と殺戮されていく様子が描かれました。</p>" },
    { "fileName": "tommy-tv-series", "rawFile": "tommy__tv_series__raw.json", "name": "トミー", "engName": "Tommy", "bodyHtml": "<h2>概要</h2><p><b>トミー</b> は、荒野でスクラップ拾いをして暮らす鉛農家の少年です。父親のアダム、兄のルーファス、妹のサンドラと共に暮らしていました。</p><h2>背景</h2><p>ある日、父アダムと共に砂漠でスクラップを回収して帰宅すると、家の中に賞金稼ぎのグールが待ち構えていました。グールは、トミーの兄であるルーファスが新カリフォルニア共和国（NCR）の残党を率いる「狂女」リー・モルデイヴァーの作戦に深く関わり、その結果グール自身によって殺害されたことを告げます。<br><br>グールが持っていた血に染まった手紙の記述から、ルーファスが弟のトミーを利用し、エンクレイヴの離反者をモルデイヴァーの下へ安全に届けるための資金調達を任せていたことが明らかになりました。<br><br>これを知った父アダムは激怒し、モルデイヴァーの居場所を隠蔽しようとするトミーに対して、妹や家族の命がかかっていると説得します。トミーは「泥にまみれた鉛農家としての一生を送りたくなかった。偉大な再建計画のチャンスだったんだ」と自分の動機を語りますが、最終的には父の圧力に折れてモルデイヴァーがグリフィス天文台にいることを明かします。<br><br>用が済み立ち去ろうとするグールに、トミーは兄の復讐心から殺意を向け、傍らにあったマスケット銃に手を伸ばしました。しかし、百戦錬磨のグールの方が圧倒的に速く、トミーは即座に射殺され、その短い命を終えることになりました。</p>" },
    { "fileName": "troy-tv-series", "rawFile": "troy__tv_series__raw.json", "name": "トロイ", "engName": "Sheriff Troy", "bodyHtml": "<h2>概要</h2><p><b>トロイ</b> は、ソレル・ブッカーが自称するウェイストランドの「ガバミント（Govermint）」の保安官を務めていた男です。</p><h2>背景</h2><p>トロイは同僚のレックス保安官と共に、ブッカー大統領の「ガバミント」の権力を盾にして横暴な取締りを行っていました。彼の父親は、同じく近郊のジャンク街であるフィリー（Filly）に住んでいます。<br><br>スーパーウルトラ・マーケットでの臓器密売組織の虐殺現場を通りかかり、そこに居合わせたグールを犯人だと思い込み（実際には本編の通り彼が引き起こしたものですが）、逮捕してブッカーのBBQ小屋へと連行しました。<br><br>ブッカーの前で尋問が行われている最中、グールが「フィリーで多くの人間を殺した。お前の親父が臆病者じゃないなら、きっと巻き添えを食って死んでるだろうな」と挑発します。これに逆上したトロイはリボルバーを抜いてグールに銃口を向けますが、グールにあっさりと返り討ちにされ、レックスと共に射殺されました。</p>" },
    { "fileName": "trudy-tv-series", "rawFile": "trudy__tv_series__raw.json", "name": "トルーディ", "engName": "Trudy", "bodyHtml": "<h2>概要</h2><p><b>トルーディ</b> は、ドラマ版のシーズン2に登場する子供です。</p><h2>背景</h2><p>シーズン2のエピソード「The Profligate」等において、サンセット・サルサパリラの工場に関連するシーンで登場することが判明しています。</p>" }
];

const TEMPLATE_FILE = 'f:/Fallout/ava-west.html';
const OUTPUT_DIR = 'f:/Fallout';
const DRAFT_DIR = 'f:/Fallout/_drafts';

const templateHtml = fs.readFileSync(TEMPLATE_FILE, 'utf8');

for (const char of batchData) {
    console.log('Processing ' + char.fileName + '...');
    const rawDataPath = path.join(DRAFT_DIR, char.rawFile);
    let rawData = null;
    if (fs.existsSync(rawDataPath)) rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'));

    const xDir = path.join(OUTPUT_DIR, '_X', char.fileName);
    if (!fs.existsSync(xDir)) fs.mkdirSync(xDir, { recursive: true });
    
    let galleryHtml = '';
    let mainImgHtml = '<div style="padding:20px;text-align:center;border:1px dashed #555;color:#555;">No Image Available</div>';
    
    if (rawData && rawData.images && rawData.images.length > 0) {
        galleryHtml = '<div class="gallery-section"><h2>Gallery</h2><div class="gallery-grid">';
        let addedImages = 0;
        rawData.images.forEach((url) => {
            if (!url) return;
            if (addedImages === 0) mainImgHtml = '<img src="' + url + '" alt="' + char.engName + '">';
            galleryHtml += '            <div class="gallery-item">\\n                <img src="' + url + '" alt="' + char.engName + ' ' + (addedImages + 1) + '">\\n            </div>';
            addedImages++;
        });
        galleryHtml += '</div></div>';
    }

    let outContent = templateHtml;
    // Basic attribute replaces
    outContent = outContent.replace(/data-article-id="[^"]*"/g, 'data-article-id="note_' + char.fileName.replace(/-/g, '_') + '"');
    
    const mohisTerm = " | Overseer Mohi's Terminal";
    outContent = outContent.replace(/<title>.*?<\/title>/g, '<title>' + char.name + mohisTerm + '</title>');
    outContent = outContent.replace(/<meta property="og:title" content="[^"]*">/g, '<meta property="og:title" content="' + char.name + mohisTerm + '">');
    outContent = outContent.replace(/<meta property="og:url" content="[^"]*">/g, '<meta property="og:url" content="https://www.fallout-jp.com/' + char.fileName + '.html">');

    // Replace the main block
    const mainStart = outContent.indexOf('<main class="content">');
    const quoteStart = outContent.indexOf('<div class="quote-box">');
    
    if (mainStart !== -1 && quoteStart !== -1) {
        const replaceStr = '<main class="content">\\n' +
            '            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_' + char.fileName.replace(/-/g, '_') + '" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\\n' +
            '            <h1>' + char.name + '<br><span style="font-size:0.6em;color:#888;font-family:\\"Noto Sans JP\\",sans-serif;font-weight:normal;">' + char.engName + '</span></h1>\\n' +
            char.bodyHtml + '\\n' + galleryHtml + '\\n            ';
        outContent = outContent.substring(0, mainStart) + replaceStr + outContent.substring(quoteStart);
    }

    // Replace quote box
    const newQuoteStart = outContent.indexOf('<div class="quote-box">');
    const newQuoteEnd = outContent.indexOf('</div>', newQuoteStart);
    if (newQuoteStart !== -1 && newQuoteEnd !== -1) {
        const quoteRep = '<div class="quote-box">\\n                <b>感想</b><br><br>\\n                Fallout TVシリーズのロア拡張ログ。ターミナルの復号により抽出された記録データ。\\n            ';
        outContent = outContent.substring(0, newQuoteStart) + quoteRep + outContent.substring(newQuoteEnd);
    }

    // Replace infobox
    const infoStart = outContent.indexOf('<aside class="infobox">');
    const infoEnd = outContent.indexOf('</aside>', infoStart);
    if (infoStart !== -1 && infoEnd !== -1) {
        const infoRep = '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">' + char.name + '</h3>' + mainImgHtml + '<div class="infobox-row"><span class="infobox-label">種類</span><span>人物</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout TV</span></div>';
        outContent = outContent.substring(0, infoStart) + infoRep + outContent.substring(infoEnd);
    }

    // Use regular string operations to find/replace wiki links to avoid regex escapes for wikipedia links
    // Just find first Fandom link
    if (outContent.indexOf('href="https://fallout.fandom.com/wiki/') !== -1) {
        const fandomUrlStart = outContent.indexOf('href="https://fallout.fandom.com/wiki/');
        const aTagEnd = outContent.indexOf('</a>', fandomUrlStart);
        if (aTagEnd !== -1) {
            const startOfAtag = outContent.lastIndexOf('<a ', fandomUrlStart);
            if (startOfAtag !== -1) {
                const urlEng = char.engName.replace(/ /g, '_');
                const newAtag = '<a href="https://fallout.fandom.com/wiki/' + urlEng + '" target="_blank" rel="noopener">' + char.engName + '</a>';
                outContent = outContent.substring(0, startOfAtag) + newAtag + outContent.substring(aTagEnd + 4);
            }
        }
    }

    outContent = outContent.replace(/const _commentArticleId = '(.*?)';/g, "const _commentArticleId = 'note_" + char.fileName.replace(/-/g, '_') + "';");
    outContent = outContent.replace(/const _commentArticleName = '(.*?)';/g, "const _commentArticleName = '" + char.name + "';");
    outContent = outContent.replace(/const _commentArticleUrl = '(.*?)';/g, "const _commentArticleUrl = '" + char.fileName + ".html';");

    fs.writeFileSync(path.join(OUTPUT_DIR, char.fileName + '.html'), outContent, 'utf8');

    let dlScript = '';
    if (rawData && rawData.images) {
        let i = 0;
        rawData.images.forEach((url) => {
            if(!url) return;
            dlScript += 'curl -L -s -o "f:/Fallout/_X/' + char.fileName + '/images/img_' + i + '.png" "' + url + '"\\n';
            i++;
        });
        if(dlScript !== '') {
            fs.writeFileSync(path.join(xDir, 'dl_images.bat'), dlScript, 'utf8');
            try { require('child_process').execSync('call "f:/Fallout/_X/' + char.fileName + '/dl_images.bat"'); } catch (e) {}
        }
    }
    console.log('Successfully processed ' + char.fileName);
}
