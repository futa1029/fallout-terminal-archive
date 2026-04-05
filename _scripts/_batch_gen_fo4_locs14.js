// _batch_gen_fo4_locs14.js
const fs = require('fs');
const path = require('path');
const https = require('https');

function downloadImage(url, fp) {
    return new Promise((resolve, reject) => {
        fs.mkdirSync(path.dirname(fp), { recursive: true });
        const mod = url.startsWith('https') ? https : require('http');
        mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                downloadImage(res.headers.location, fp).then(resolve).catch(reject);
                return;
            }
            if (res.statusCode !== 200) { resolve(false); return; }
            const ws = fs.createWriteStream(fp);
            res.pipe(ws);
            ws.on('finish', () => { ws.close(); resolve(true); });
            ws.on('error', reject);
        }).on('error', reject);
    });
}

function getImageUrl(fn) {
    return new Promise((resolve) => {
        const url = `https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(fn)}&prop=imageinfo&iiprop=url&format=json`;
        https.get(url, { headers: { 'User-Agent': 'FalloutLoreArchive/1.0' } }, (res) => {
            let d = ''; res.on('data', c => d += c);
            res.on('end', () => {
                try {
                    const j = JSON.parse(d);
                    const p = Object.values(j.query.pages)[0];
                    resolve(p.imageinfo?.[0]?.url || null);
                } catch(e) { resolve(null); }
            });
        }).on('error', () => resolve(null));
    });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

const tmpl = fs.readFileSync('f:/Fallout/ulysses.html', 'utf8');

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_fo4_locp14.json', 'utf8'));

const articles = [
    {
        title: "Revere Beach station",
        titleJa: "リビア・ビーチ駅",
        slug: "revere-beach-station",
        appearance: "Fallout 4",
        wikiSlug: "Revere_Beach_station",
        mainImg: imgData["revere-beach-station"][0],
        infoRows: [
            ["種族", "レイダー"],
            ["区分", "地下鉄の駅 / トラップダンジョン"],
            ["所在地", "連邦東部の海岸沿い"],
            ["統治者", "シンダー"],
        ],
        body: `
<h2>概要</h2>
<p>リビア・ビーチ駅は、戦前のボストン東部海岸沿いに位置していた地下鉄駅の廃墟。現在は「シンダー」という残忍な女性レイダーが率いるギャングの要塞化されたアジトとなっています。</p>

<h2>詳細</h2>
<p>このロケーションは、レイダーたちが駅構内の「エスカレーター」や「公衆トイレ」などを利用して、非常に狡猾で悪意のあるブービートラップを無数に仕掛けていることで有名です。<br>手動のトラップドアや仕掛け線がいたる所に張られており、不用意に進むと爆発や落下によって命を落とします。また、シンダーのギャング同士の会話やターミナルの記録から、彼らが駅を通りかかった旅人をどのように罠に掛けて楽しんでいたかが伺えます。</p>
<p>駅の奥深くにはシンダー本人が陣取っており、彼女を倒すことでレイダーたちの資金源を断つことができます。また、駅の地上周辺には海沿いのプロムナードがあり、マイアルークなども生息しています。</p>
`,
        kanso: "「FO4の代表的なトラップ駅」。レイダーたちが工夫を凝らして作った落とし穴や爆弾の数々が待ち受けており、足元への注意力が極限まで試されるダンジョンです。罠にかかった時のレイダーたちの嘲笑がイラッとさせられ、殲滅に燃えることができます。"
    },
    {
        title: "Breakheart Banks",
        titleJa: "ブレイクハート・バンクス",
        slug: "breakheart-banks",
        appearance: "Fallout 4",
        wikiSlug: "Breakheart_Banks",
        mainImg: imgData["breakheart-banks"][0],
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["区分", "水辺の農場跡地"],
            ["所在地", "連邦北東部（スロッグの西）"],
            ["特記事項", "ミュータントの居住拠点"],
        ],
        body: `
<h2>概要</h2>
<p>ブレイクハート・バンクスは、戦前において川沿いに作られたのどかな農村・農場の跡地です。現在ではスーパーミュータントの大規模な集団がここを占拠し、彼らの強固な農村拠点として利用しています。</p>

<h2>詳細</h2>
<p>ここはかつて人間の生存者たちが作物を育てて細々と暮らしていましたが、スーパーミュータントの集団によって襲撃・虐殺され、乗っ取られました。<br>敷地内にはテイトなどの作物がそのまま生い茂っており、ミュータントたちが人間の農場をそのまま「自分たちの土地」として利用している珍しい光景を見ることができます。ミュータント・ハウンドも多数飼育されており、川辺の地形を活かした防衛網が敷かれています。</p>
<p>プレストン・ガービーからのミニッツメン・クエストなどで「入植者の仇を討つ（あるいは居住地を取り戻す）」ためにこの場所の討伐を依頼されることが多く、序盤～中盤におけるプレイヤーの大きな壁となるミュータントの大要塞です。</p>
`,
        kanso: "「緑豊かな農村の風景の中に、人間を食べる巨人が我が物顔で住み着いている」という強烈なホラーカントリー。元々の住人たちがどれほど無惨に殺されたかを想像すると、パワーアーマーを着込んでミュータントをすべて駆逐してやりたくなる場所です。"
    },
    {
        title: "Forest Grove marsh",
        titleJa: "フォレスト・グルーブ・マーシュ",
        slug: "forest-grove-marsh",
        appearance: "Fallout 4",
        wikiSlug: "Forest_Grove_marsh",
        mainImg: imgData["forest-grove-marsh"][0],
        infoRows: [
            ["種族", "フェラル・グール（元住人）"],
            ["区分", "水没した街の廃墟"],
            ["所在地", "連邦西部（マサチューセッツ血液クリニックの南西）"],
            ["特記事項", "屋根伝いの探索"],
        ],
        body: `
<h2>概要</h2>
<p>フォレスト・グルーブ・マーシュは、大戦争以後に近くのダム（水門）が決壊したことで、町全体が深い水に沈んでしまった水没都市です。</p>

<h2>詳細</h2>
<p>町の大通りは完全に冠水しており、建物の1階部分は放射能汚染された水の中に沈んでいます。この町に住んでいた住人たちの多くが大戦争の放射能によってフェラル・グールと化しており、現在も「自分たちの家の屋根の上」を悲しげに徘徊しています。</p>
<p>プレイヤーは、水面から頭を出したグールやマイアルークの強襲を避けながら、家の屋根から屋根へと木の板の足場を伝って探索することになります。<br>町の中央にあるガンショップなどの屋根には、戦前の住人が何とか生き延びようとして築いた粗末なキャンプの跡やターミナルが残されており、彼らがやがて水と放射能によって正気を失い、グールへと成り果てていく凄惨な過程が記録されています。</p>
`,
        kanso: "「水没した町の屋根の上を、元住人だったグールたちが歩き回っている」という、ポストアポカリプスの退廃的な美しさと悲哀が詰まった名所。水の中から突然グールが這い上がってくるホラーテイストと、屋根伝いのアスレチック要素のバランスが素晴らしいマップです。"
    },
    {
        title: "Croup Manor",
        titleJa: "クループ家の館",
        slug: "croup-manor",
        appearance: "Fallout 4",
        wikiSlug: "Croup_Manor",
        mainImg: imgData["croup-manor"][0],
        infoRows: [
            ["種族", "フェラル・グール (クループ一家)"],
            ["区分", "海岸沿いの巨大な洋館 / 居住地候補"],
            ["所在地", "ナハント半島の東の端"],
            ["関連", "セオドア長官の狂気"],
        ],
        body: `
<h2>概要</h2>
<p>クループ家の館（Croup Manor）は、ナハント半島の高台に位置する、戦前の富裕層「クループ家」の豪奢な洋館の廃墟。現在は居住地としてクラフト解放できる場所ですが、そこに隠された「地下室の秘密」はFO4屈指の胸糞エピソードとして有名です。</p>

<h2>詳細</h2>
<p>この館の周囲および館内は大量のフェラル・グールで溢れかえっていますが、彼らは外部から来た敵ではなく、なんと『戦前のクループ家の親族たち』の成れの果てです。<br>大戦争後、クループ家の長である「セオドア」は借金取りから逃れるためにこの館に親族ごと引きこもっていましたが、放射能の影響で家族全員がフェラル・グール（狂暴なゾンビ）へと変異してしまいました。</p>
<p>しかし、なぜかセオドア本人だけは「理性を持った通常のグール」になったため、彼は『狂暴化した親族たちをどうにか再教育して、かつての優雅な貴族の生活を取り戻す』という狂った実験を200年もの間、地下室で繰り返していました。プレイヤーは地下室のターミナルで、彼が家族を幾度となく殺しかけながら「カトラリーの使い方も思い出せないのか！」と絶望していく様を読むことになります。</p>
`,
        kanso: "FO4で最も狂気的で悲惨な家族の物語。正気を保ったまま『ゾンビになった親族たちと貴族の生活をやり直そうとする』セオドアの絶望の記録は、読む者の胸を締め付けます。最終的に彼は親族に食い殺され、その親族たちをプレイヤーが掃除して居住地にするという、凄まじい皮肉が効いています。"
    },
    {
        title: "Charles View Amphitheater",
        titleJa: "チャールズビュー円形劇場",
        slug: "charles-view-amphitheater",
        appearance: "Fallout 4",
        wikiSlug: "Charles_View_Amphitheater",
        mainImg: imgData["charles-view-amphitheater"][0],
        infoRows: [
            ["種族", "人間 (カルト信者)"],
            ["区分", "戦前の野外劇場 / カルト教団の拠点"],
            ["所在地", "チャールズ川の北岸（カボット・ハウスの南西）"],
            ["リーダー", "ブラザー・トーマス"],
        ],
        body: `
<h2>概要</h2>
<p>チャールズビュー円形劇場は、チャールズ川沿いにある戦前の小さな野外シアターの跡地。現在は「ピラーズ・オブ・コミュニティ（コミュニティの柱）」と名乗る怪しい新興スカラー教団の本拠地となっています。</p>

<h2>詳細</h2>
<p>この教団は「ブラザー・トーマス」という口八丁の男が指導者であり、荒廃した連邦で絶望している人々に対し「すべての私有財産を教団に寄付すれば、魂の平穏と安全が手に入る」と説き、信者たちから身ぐるみを剥いでいます。実際にはただの詐欺師の集団であり、財産を巻き上げた後は信者を使い捨てにしています。</p>
<p>コンパニオンのカボット家のクエストの一環で、彼らに洗脳（誘拐）されてしまったエモジーンを取り戻すためにプレイヤーはここを訪れます。<br>ブラザー・トーマスとの会話では、彼に騙されたふりをして全財産を寄付するフリを作ることも、スピーチチャレンジで脅迫することも、あるいは会話の途中で彼らの頭を吹き飛ばしてカルトを崩壊させることも可能です。</p>
`,
        kanso: "「終末世界でお決まりの新興宗教（詐欺）」。善良で絶望した人々がブラザー・トーマスの甘い言葉に騙されて座り込んでいる光景は、 Fallout世界の厳しい現実を反映しています。堂々とペテンを働くトーマスを、正義の鉄槌（ミニ・ヌーク等）で黙らせるのはプレイヤーの密かな楽しみです。"
    },
    {
        title: "Wicked Shipping Fleet Lockup",
        titleJa: "ウィケッド・シッピング・フリート・ロックアップ",
        slug: "wicked-shipping-fleet-lockup",
        appearance: "Fallout 4",
        wikiSlug: "Wicked_Shipping_Fleet_Lockup",
        mainImg: imgData["wicked-shipping-fleet-lockup"][0],
        infoRows: [
            ["種族", "フェラル・グール"],
            ["区分", "戦前の運送会社のトラックヤード"],
            ["所在地", "サンクチュアリの南西"],
            ["関連", "ウィケッド・シッピングの鍵"],
        ],
        body: `
<h2>概要</h2>
<p>ウィケッド・シッピング・フリート・ロックアップは、戦前に悪名高かった運送会社「ウィケッド・シッピング社」のトラック保管庫および配送センターの跡地です。ゲーム序盤のサンクチュアリのすぐ近くに位置しています。</p>

<h2>詳細</h2>
<p>ガレージの周辺にはフェラル・グールが多数うろついており、序盤のプレイヤーにとっての最初の「グールの群れ」の恐怖を味わう場所になります。<br>この場所の最大のポイントは、ガレージ内で手に入る『ウィケッド・シッピングの鍵』です。この運送会社は戦前、連邦中に物資を運んでいましたが、この鍵を持っていれば、連邦の各地（道路上など）に放置されている「Wicked Shipping」と書かれた巨大なトレーラートラックの後部ドア（通常は高いロックがかかっている）を共通で開けることができるようになります。</p>
<p>ターミナルの記録を見ると、この運送会社がマフィアやギャングと結託し、違法薬物や密造武器などをトラックに忍ばせて密輸していたという黒い歴史が判明します。トラックの荷台にいつもお宝や薬物があるのはそのためです。</p>
`,
        kanso: "連邦全域に散らばる「お宝トラック」を開けるためのマスターキーが手に入る、序盤の超重要ロケーション。「ただの運送会社かと思いきや、実はマフィアの運び屋をやっていた」という裏設定を知った時、フィールドに転がるトラックを見る目が少し変わります。"
    },
    {
        title: "Jalbert Brothers Disposal",
        titleJa: "ジャルバートブラザーズ廃棄場",
        slug: "jalbert-brothers-disposal",
        appearance: "Fallout 4",
        wikiSlug: "Jalbert_Brothers_Disposal",
        mainImg: imgData["jalbert-brothers-disposal"][0],
        infoRows: [
            ["種族", "チルドレン・オブ・アトム"],
            ["区分", "戦前の不法投棄場"],
            ["所在地", "連邦北西部（レキシントンの西）"],
            ["特記事項", "極めて高い放射能汚染"],
        ],
        body: `
<h2>概要</h2>
<p>ジャルバートブラザーズ廃棄場（Jalbert Brothers Disposal）は、戦前にジャルバート兄弟が経営していた廃棄物処理場。しかし実態は、安全基準を無視して大量の放射性廃棄物（核物質）をずさんな方法で不法投棄していた最悪なブラック施設です。</p>

<h2>詳細</h2>
<p>敷地内には大量の放射能バレル（黄色いドラム缶）が野ざらしにされており、近づくだけでガイガーカウンターが激しく鳴り響く極度のホットスポットとなっています。<br>この「素晴らしい放射能」に目をつけたカルト教団『チルドレン・オブ・アトム（CoA）』の狂信者たちがこの廃棄場を聖地として乗っ取っており、彼らの粗末な神棚やキャンプが設置されています。</p>
<p>ターミナルを読むと、ジャルバート兄弟がいかに市民の安全を無視して軍や企業から有害物質の処理を請け負い、ただ近所に埋めていただけかという隠蔽工作の記録が残されています。また、チルドレン・オブ・アトムの信者が持っている固有の武器（ガンマ線銃）も厄介です。</p>
`,
        kanso: "「戦前の利益第一主義の不法投棄」が、「200年後の放射能カルトの聖地」になるという強烈な皮肉。無責任な民間業者の尻拭いを、現代のプレイヤーが致死量の放射能を浴びながらやらされるというリアルな企業腐敗の末路を描いた場所です。"
    },
    {
        title: "Listening Post Bravo",
        titleJa: "監視郷（リスニング・ポスト）・ブラボー",
        slug: "listening-post-bravo",
        appearance: "Fallout 4",
        wikiSlug: "Listening_Post_Bravo",
        mainImg: imgData["listening-post-bravo"][0],
        infoRows: [
            ["種族", "パラディン・ダンス / ヤオ・グアイ（周辺）"],
            ["区分", "戦前の軍事通信地下バンカー"],
            ["所在地", "連邦北東部（グリーントップ菜園の東）"],
            ["関連", "Blind Betrayal (B.O.S.クエスト)"],
        ],
        body: `
<h2>概要</h2>
<p>監視郷ブラボー（Listening Post Bravo）は、戦前のアメリカ軍が密かに建設していた地下通信バンカーの一つ。普段はエレベーターの電力が落ちており、地下の最深部にはアクセスできない無人の廃墟です。</p>

<h2>詳細</h2>
<p>このロケーションは、ブラザーフッド・オブ・スティール（B.O.S.）の中盤の最重要クエスト「Blind Betrayal（盲目の裏切り）」の舞台として非常に有名です。<br>このクエストにおいて、プレイヤーの信頼する上官である『パラディン・ダンス』が、実はインスティチュートから逃亡してきた人造人間（シンス）であったという衝撃の事実が発覚します。B.O.S.の教義により処刑命令が出されたダンスは、一人でこの監視郷ブラボーの地下バンカーに身を隠します。</p>
<p>プレイヤーは彼を追ってこのバンカーの最深部へと降り立ち、親友である彼をB.O.S.の規則に従って処刑（射殺）するか、あるいは彼を説得してB.O.S.を裏切り彼を逃がすかという、FO4のストーリーにおいて最も重い決断を迫られることになります。</p>
`,
        kanso: "Fallout 4の全クエストの中でもトップクラスに胸を打つ「パラディン・ダンスとの最終イベント」の舞台。薄暗い地下の通信室で、自分の存在意義を失い、命令のままに死を受け入れようとする彼との会話は、多くのプレイヤーの心に深く刺さる名シーンです。"
    },
    {
        title: "Fairline Hill Estates",
        titleJa: "フェアライン・ヒル・エステート",
        slug: "fairline-hill-estates",
        appearance: "Fallout 4",
        wikiSlug: "Fairline_Hill_Estates",
        mainImg: imgData["fairline-hill-estates"][0],
        infoRows: [
            ["種族", "ヤオ・グアイ / フェラル・グール"],
            ["区分", "戦前の高級住宅地"],
            ["所在地", "連邦南部（ファロンデパートの西）"],
            ["関連", "エレノアの小屋"],
        ],
        body: `
<h2>概要</h2>
<p>フェアライン・ヒル・エステートは、ボストン郊外に位置する戦前の閑静な高級住宅街の跡地。綺麗に整列した立派な家屋が残る美しい場所ですが、現在は獰猛なミュータント・ベア「ヤオ・グアイ」等に支配されています。</p>

<h2>詳細</h2>
<p>大戦争後、この住宅地には少数の生存者たち（レイダーではない一般人）が集まり、小さなコミュニティを形成して平和に暮らそうと努力していました。<br>しかし、彼らのささやかな暮らしは、突如として襲来したヤオ・グアイの群れによって完全に破壊されました。住宅のあちこちには、バリケードを築いて最後まで戦おうとした形跡や、愛する者を守ろうとして倒れた白骨死体が転がっています。</p>
<p>すぐ近くのトレーラーには「エレノア」という女性の商人が1人で暮らしており、彼女だけがこの住宅街の悲劇から生き延びました。住宅街の地下には愛犬を埋葬した跡などの無言のストーリーが隠されています。</p>
`,
        kanso: "「善良な生存者たちが集まって村を作ろうとしたが、大自然の暴力（ヤオ・グアイ）によってあっけなく全滅した」という、ウェイストランドではお約束の悲劇が詰まった美しい住宅街。クエストの目的地になることは少なく、環境ストーリーテリングのためだけに作られた静かなる名ロケーションです。"
    },
    {
        title: "Chestnut Hillock Reservoir",
        titleJa: "チェストナット・ヒロック・タンク",
        slug: "chestnut-hillock-reservoir",
        appearance: "Fallout 4",
        wikiSlug: "Chestnut_Hillock_Reservoir",
        mainImg: imgData["chestnut-hillock-reservoir"][0], // Chestnuck_Hillock_Reservoir.jpg
        infoRows: [
            ["種族", "ブラッドバグ（巨大蚊） / ラッドスタッグ"],
            ["区分", "湖（貯水池）とキャンプ場"],
            ["所在地", "連邦中央部（ボストンの西の湖）"],
            ["関連", "エドウィンのホロテープ"],
        ],
        body: `
<h2>概要</h2>
<p>チェストナット・ヒロック・タンク（Chestnut Hillock Reservoir）は、ボストン市街地のすぐ西にある美しい湖（貯水池）と、それに隣接する小さなキャンプ場の跡地です。</p>

<h2>詳細</h2>
<p>このロケーションには「エドウィン」という名の孤独な生存者の悲しいエピソードが隠されています。<br>この湖畔の小屋にはエドウィンが1人で暮らしていましたが、ある日、彼の飼っていた愛犬の「ベス」が、湖の周囲に大量に繁殖していた巨大な蚊「ブラッドバグ」に襲われて命を落としてしまいます。</p>
<p>エドウィンは愛犬の死を深く悲しみ、その遺体を小屋のすぐそばに埋葬しました。しかし、彼は悲しみのあまり不注意になり、後日ブラッドバグの群れに襲撃されて彼自身も命を落としてしまいました。<br>小屋のターミナルと、湖畔に残された彼のホロテープを聞くことで、犬を愛した男の孤独で悲しい最期を知ることができます。現在はその原因となったブラッドバグの大群がプレイヤーの血を求めて襲いかかってきます。</p>
`,
        kanso: "ウェイストランドの片隅にある小さな無名の悲劇。FO4の世界では、スーパーミュータントやデスクローのような巨大な怪物だけでなく、ただの「羽音のうるさい巨大な虫」によって人間の命が簡単 に終わってしまうという、生態系の恐ろしさを伝えてくれる湖畔のエリアです。"
    }
];

let tasks = Promise.resolve();

articles.forEach(article => {
    tasks = tasks.then(async () => {
        console.log(`Processing ${article.title}...`);
        
        let imgUrl = await getImageUrl(article.mainImg);
        let ext = '.jpg';
        if (imgUrl) {
            let extMatch = imgUrl.match(/\.([a-zA-Z0-9]+)(?:[\?\/]|$)/);
            if (extMatch) ext = '.' + extMatch[1];
        } else {
            console.log(`Warning: Failed to get URL for ${article.mainImg}`);
            url = await getImageUrl(article.mainImg.replace('.jpg', '.png'));
            if (url) {
                imgUrl = url;
                ext = '.png';
            }
        }
        let localRelPath = `images/note_extracted/${article.slug}/img_main${ext}`;
        let localAbsPath = path.join('F:/Fallout', localRelPath);
        
        if (imgUrl && !fs.existsSync(localAbsPath)) {
            await downloadImage(imgUrl, localAbsPath);
            await sleep(500);
        }

        let htmlInfoRows = '';
        for (let row of article.infoRows) {
            htmlInfoRows += `<div class="infobox-row"><span class="infobox-label">${row[0]}</span><span>${row[1]}</span></div>\n`;
        }
        
        let html = tmpl
            // The template is from ulysses.html
            .replace(/<title>.*?<\/title>/, `<title>${article.title} | Overseer Mohi's Terminal</title>`)
            .replace(/<h3 style="margin-top:0;text-align:center;">.*?<\/h3>/, `<h3 style="margin-top:0;text-align:center;">${article.title}</h3>`)
            .replace(/<img src="images\/note_extracted\/.*?alt=".*?">/, `<img src="${localRelPath}" alt="${article.title}">`)
            .replace(/<div class="infobox-row">.*?<\/div>\s*(?=<\/aside>)/s, htmlInfoRows)
            .replace(/<h1>.*?(?=<div class="quote-box")/s, `<h1>${article.title}<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">${article.titleJa}</span></h1>\n${article.body}\n\n`)
            // Quotes replacing using regex:
            .replace(/<div class="quote-box" style="margin-top: 40px; border-top: 3px solid var\(--accent-color\);">.*?<\/div>/s, `<h2>感想</h2>\n<div class="quote-box" style="margin-top: 40px; border-top: 3px solid var(--accent-color);"><p class="quote-text">${article.kanso}</p></div>`)
            .replace(/data-article-id=".*?"/, `data-article-id="note_${article.slug.replace(/-/g, '_')}"`)
            .replace(/href="https:\/\/fallout.fandom.com\/wiki\/.*?"/, `href="https://fallout.fandom.com/wiki/${encodeURIComponent(article.wikiSlug)}"`)
            .replace(/rel="noopener">.*?<\/a> from/, `rel="noopener">${article.title}</a> from`)
            .replace(/const _commentArticleId='.*?';/, `const _commentArticleId='note_${article.slug.replace(/-/g, '_')}';`)
            .replace(/const _commentArticleName='.*?';/, `const _commentArticleName='${article.title}';`)
            .replace(/const _commentArticleUrl='.*?';/, `const _commentArticleUrl='${article.slug}.html';`)
            .replace(/<body data-article-category=".*?" data-article-appearance=".*?">/, `<body data-article-category="拠点/ダンジョン" data-article-appearance="Fallout 4">`);

        fs.writeFileSync(`f:/Fallout/${article.slug}.html`, html, 'utf8');

        // X post
        const xDir = path.join('F:/Fallout', '_X', article.slug);
        fs.mkdirSync(xDir, { recursive: true });
        
        let postStr = `【Fallout Terminal データベース更新】 📡
【LOCATION: ${article.titleJa}】
Fallout 4における重要拠点の情報をアーカイブしました。

アーカイブアクセス：
https://www.fallout-jp.com/${article.slug}.html

#Fallout #Fallout4 #フォールアウト #FalloutLore`;
        
        fs.writeFileSync(path.join(xDir, 'post.md'), postStr, 'utf8');

        console.log(`Finished ${article.title}`);
    });
});

tasks.then(() => console.log('All generations completed.'));
