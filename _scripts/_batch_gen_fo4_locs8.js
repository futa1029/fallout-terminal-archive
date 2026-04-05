// _batch_gen_fo4_locs8.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_fo4_locp8.json', 'utf8'));

const articles = [
    {
        title: "Gunners plaza",
        titleJa: "ガンナープラザ",
        slug: "gunners-plaza",
        appearance: "Fallout 4",
        wikiSlug: "Gunners_plaza",
        mainImg: imgData["gunners-plaza"][0],
        infoRows: [
            ["種族", "ガンナー"],
            ["区分", "戦前の放送局（GNN）"],
            ["所在地", "連邦南部（輝きの海の北東端付近）"],
            ["統治者", "キャプテン・ウェス"],
        ],
        body: `
<h2>概要</h2>
<p>ガンナープラザ（Gunners plaza）は、戦前の大手ニュースネットワーク「GNN（Galaxy News Network）」の本社ビル跡地です。現在は連邦全土を脅かす強大な傭兵組織『ガンナー』の事実上の総本部（司令部）として機能しています。</p>

<h2>詳細</h2>
<p>連邦におけるガンナーの最大の要塞であり、外周、屋上、そして内部の全フロアに至るまで、夥しい数の精鋭ガンナーやタレット、ミサイルランチャー装備の兵士たちが配置されており、激しい総力戦となるロケーションです。<br>司令官であるキャプテン・ウェスは、連邦中に散らばるガンナーの各部隊（拠点）と交信し、軍事作戦の指示や報酬の管理をこの施設から行っていました。プレイヤーがここのターミナル群を読み解くことで、名だたるガンナーの小隊長（マクナマラ、クリント等）との通信記録や、彼らの軍隊的な階級制度の全貌を知ることができます。</p>
<p>屋上には巨大なアンテナ設備があり、かつてのニュース放送の設備を悪用して広域通信を行っています。また、施設内には「スモールガンズのボブルヘッド」が置かれています。</p>
`,
        kanso: "「FO4最強のレイダー集団の総本部をたった一人（＋コンパニオン）で陥落させる」という、主人公の超人っぷりが存分に味わえる大激戦区。入り口から最奥の放送室まで激しい銃撃戦が途切れることなく続き、全てを殲滅した時の「連邦を平和にしてやった」という達成感は格別です。ガンナー関連のクエストModでも必ずと言っていいほど舞台になります。"
    },
    {
        title: "Super Duper Mart (Fallout 4)",
        titleJa: "スーパーウルトラ・マーケット",
        slug: "super-duper-mart",
        appearance: "Fallout 4",
        wikiSlug: "Super_Duper_Mart_(Fallout_4)",
        mainImg: imgData["super-duper-mart"][0],
        infoRows: [
            ["種族", "フェラル・グール"],
            ["区分", "巨大スーパーマーケットの廃墟"],
            ["所在地", "レキシントン中心部"],
            ["関連", "ジョシュとエマの避難所"],
        ],
        body: `
<h2>概要</h2>
<p>スーパーウルトラ・マーケット（Super Duper Mart）は、戦前のアメリカにおける巨大なスーパーマーケットチェーンの1つ。レキシントンの店舗は、現在フェラル・グールたちの巨大な巣窟となっています。</p>

<h2>詳細</h2>
<p>Fallout 3でも同名の店舗が凶悪なレイダーの巣窟としてプレイヤーにトラウマを植え付けましたが、本作では大量のグールが待ち伏せするホラーダンジョンとして登場します。<br>店内にはおびただしい数の商品棚が並んでいますが、プレイヤーが足を踏み入れると、棚の裏や陳列台の下から次々とグールが這い出してきて襲いかかってきます。奥に進むと、かつて大戦争の直後にこのスーパーに立て篭もった「ジョシュ」と「エマ」という生存者の記録が散乱しており、彼らが徐々に増え続けるグール（元々は別の生存者たち）の襲撃に耐えきれずに全滅してしまった悲しい足跡をたどることができます。</p>
`,
        kanso: "「FO3のスーパーウルトラマーケットの恐怖再び」。序盤のクエスト（コーベガ組み立て工場など）のついでに軽い気持ちで探索すると、信じられない数のグールの群れに囲まれてパニックになる、初心者向けの第二の洗礼スポット。死んだふりをしているグールの多さにV.A.T.S.索敵の重要性を学ばされます。"
    },
    {
        title: "Boston mayoral shelter",
        titleJa: "ボストン市長用シェルター",
        slug: "boston-mayoral-shelter",
        appearance: "Fallout 4",
        wikiSlug: "Boston_mayoral_shelter",
        mainImg: imgData["boston-mayoral-shelter"][0],
        infoRows: [
            ["種族", "シンス / デスクロー"],
            ["区分", "特権階級向け地下シェルター"],
            ["所在地", "ヘーゲン砦の南西"],
            ["目的", "ボストン市長一族の避難"],
        ],
        body: `
<h2>概要</h2>
<p>ボストン市長用シェルター（Boston mayoral shelter）は、戦前のボストン市長が、自身の家族とごく一部の側近だけを核攻撃から逃がすために、公金を横領して極秘に建設していた豪奢な地下シェルターです。</p>

<h2>詳細</h2>
<p>この施設内には大量の物資はもちろん、個人用のスポーツジムや豪華な居住区まで完備されていました。大戦争勃発当日、市長とその家族はいち早くこのシェルターに逃げ込みました。<br>しかし、彼が市民を見捨てて贅沢なシェルターを建造していたことに気付いた一般市民の暴徒たちが、シェルターの入り口まで怒り狂って押し寄せてきました。軍隊に守られていた入り口の防衛線は最終的に突破され、シェルター内部のターミナルや音声記録には、暴徒がなだれ込んでくる直前の絶望的な状況と、市長が自決に至るまでの非常に生々しい記録が残されています。</p>
<p>現在は人間は一人もおらず、なぜか大量の人造人間（シンス）が徘徊しており、最深部のバスケットコートではデスクローが待ち構えているという極めて危険なダンジョンとなっています。</p>
`,
        kanso: "「自分だけ公金で豪華な避難所を作って逃げた政治家が、怒れる市民の暴動によって制裁される」という、痛快というよりはあまりにも惨たらしく背筋の凍る戦前ストーリーが読める場所。大戦争という非常時における『人間の怒り』の恐ろしさを克明に描いた、Falloutらしい素晴らしい環境ストーリーテリングです。"
    },
    {
        title: "Fallon's department store",
        titleJa: "ファロンデパート",
        slug: "fallons-department-store",
        appearance: "Fallout 4",
        wikiSlug: "Fallon%27s_department_store",
        mainImg: imgData["fallons-department-store"][0],
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["区分", "巨大デパートの廃墟"],
            ["所在地", "ボストン南部（ウェスト・ロックスバリー）"],
            ["関連", "ミルトン・パーキング裏の悪夢"],
        ],
        body: `
<h2>概要</h2>
<p>ファロンデパート（Fallon's department store）は、戦前の巨大な高級デパートの廃墟。ダイアモンドシティにある服屋「ファロンの地下室（ベッキー・ファロン）」のルーツとなる場所ですが、現在はスーパーミュータントの超大規模な要塞と化しています。</p>

<h2>詳細</h2>
<p>巨大な建物内部の吹き抜けのフロアが何層にも重なっており、上階からの執拗な狙撃や、スーサイダーの突撃、更にはミュータント・ハウンドの群れが襲いかかってくる激しい立体的な戦場です。<br>この周辺エリア自体がスーパーミュータントの大規模な拠点となっており、すぐ隣にある「ミルトン・ジェネラル病院」や「ミルトン・パーキング（レイダーが作った悪魔のような殺人迷路がある駐車場）」などと合わせて、非常に治安の悪い広大な戦区を形成しています。</p>
<p>地下の金庫室には無数の金庫とともに、隠しスイッチによって開く防空壕の入り口（ケロッグ関連のクエスト等で関わる場所）のヒントなどが存在しています。</p>
`,
        kanso: "隣にある『ミルトン・パーキングのサイコパス殺人迷路』の印象が強すぎるエリアですが、デパート自体もFO4屈指のスーパーミュータント狩りスポットとして優秀です。エスカレーターや崩れた床を駆使して三次元的に戦う構成は、まさに市街地戦の醍醐味を味わえます。"
    },
    {
        title: "Longneck Lukowski's Cannery",
        titleJa: "長江ルカウスキーの缶詰工場（ロングネック・ルカウスキー）",
        slug: "longneck-lukowskis-cannery",
        appearance: "Fallout 4",
        wikiSlug: "Longneck_Lukowski%27s_Cannery",
        mainImg: imgData["longneck-lukowskis-cannery"][0],
        infoRows: [
            ["種族", "人間 (セオドア・コリンズ) / グール"],
            ["区分", "肉の缶詰工場"],
            ["所在地", "連邦東部沿岸"],
            ["特記事項", "ミステリー・ミートの手がかり"],
        ],
        body: `
<h2>概要</h2>
<p>長江（ロングネック）・ルカウスキーの缶詰工場は、戦前に缶詰肉を製造していた工場の跡地。現在はセオドア・コリンズという商人が、ここで連邦中に出回る「ルカウスキーの美味しい缶製の肉（ミステリー・ミート）」を製造・販売しています。</p>

<h2>詳細</h2>
<p>主人公が工場を訪れると、入り口の商人が「この肉を食べたら具合が悪くなった」と激怒してコリンズに返金を迫っている所に出くわします。コリンズ自身は「これはマイアルークの肉だ」と主張していますが、奥のエレベーターで行けるさらに地下の製造ラインへ潜入すると、身の毛のよだつ真実が発覚します。</p>
<p>彼はマイアルークの肉など使っておらず、工場の地下に巣食う「フェラル・グールの群れ」をベルトコンベアに誘い込み、彼らの腐った病気の肉をミンチにしてそのまま缶詰（ミステリー・ミート）として連邦の居住地へ出荷していたのです。主人公に真実を知られたコリンズは、口封じのために襲いかかってきます。</p>
`,
        kanso: "「放射能で腐敗した動く死体の肉をひき肉にして、住民に内緒で食わせていた」という、Falloutの狂気料理エピソードの中でも最悪の部類に入る胸糞イベント。FO4で一番最初に手に入れた缶詰の肉がコレだった時の、プレイヤーの言い知れぬ絶望感と吐き気は多くの語り草になっています。"
    },
    {
        title: "Greenetech Genetics",
        titleJa: "グリーンテック・ジェネティクス",
        slug: "greenetech-genetics",
        appearance: "Fallout 4",
        wikiSlug: "Greenetech_Genetics",
        mainImg: imgData["greenetech-genetics"][0],
        infoRows: [
            ["種族", "コーサー / ガンナー"],
            ["区分", "戦前の遺伝子研究施設"],
            ["所在地", "ケンブリッジの北西"],
            ["関連", "ガンナーとコーサーの交戦"],
        ],
        body: `
<h2>概要</h2>
<p>グリーンテック・ジェネティクス（Greenetech Genetics）は、戦前に農業や遺伝子工学の研究を行っていた企業の大規模な研究施設の廃墟です。メインクエストの中盤において、インスティチュートへの侵入手段を得るために訪れる最重要ロケーションの一つです。</p>

<h2>詳細</h2>
<p>この施設内には大量のガンナーたちが駐留していましたが、主人公が到着した時、彼らはたった一人の「コーサー（インスティチュートの最強の殺し屋人造人間）」によって、部隊単位で一方的に惨殺され続けている所でした。<br>プレイヤーはガンナーたちの死体の山と断末魔を越えながら塔のような施設を駆け上がり、最上階にて、脱走したシンスを尋問している冷酷無比なコーサー「Z2-47」と直接対決を行います。</p>
<p>コーサーはステルスボーイを駆使しながら強烈なレーザー兵器で攻撃してくるため、FO4における最初の真の「ボス戦」とも呼べる激闘になります。彼を倒すことで、インスティチュート内部へ転送するための「コーサーのチップ」を手に入れることができます。</p>
`,
        kanso: "「インスティチュートの暗殺者がどれほど恐ろしいバケモノなのか」を、数十人のガンナーたちの死体の山という説得力のある絵面で見せつけられる最高にクールなクエスト「Hunter/Hunted」の舞台。ターミネーターのような強敵を倒してチップを抜き取るという燃える展開が待ち受けています。"
    },
    {
        title: "Massachusetts State House",
        titleJa: "マサチューセッツ州議事堂",
        slug: "massachusetts-state-house",
        appearance: "Fallout 4",
        wikiSlug: "Massachusetts_State_House",
        mainImg: imgData["massachusetts-state-house"][0],
        infoRows: [
            ["種族", "マイアルーク / デス爪？"],
            ["区分", "歴史的建造物 / 議事堂"],
            ["所在地", "ボストン・コモン（中心部）"],
            ["特記事項", "マイアルーク・クイーンの恐怖"],
        ],
        body: `
<h2>概要</h2>
<p>マサチューセッツ州議事堂（Massachusetts State House）は、有名な金色のドーム屋根を持つ実在の州議事堂の廃墟。ボストン・コモンの中心のすぐそばに位置し、現在は夥しい数のマイアルークの巨大な巣窟となっています。</p>

<h2>詳細</h2>
<p>一見するとただのレイダーすら住み着いていない静かな建物ですが、内部の議場や通路は壁一面がマイアルークの不気味な卵の塊で覆い尽くされています。<br>探索を進めて最下層の浸水した巨大な広間に到達すると、突如として水の底から最強の巨大水棲クリーチャー「マイアルーク・クイーン」が出現し、密室状態での最悪のデスマッチが強制されます。</p>
<p>マイアルーク・クイーンの吐き出す強酸による即死級のダメージを避けながら、逃げ場のない議事堂の内部で戦わなければならないため、十分な準備（パワーアーマーや重爆等）なしで興味本位で立ち入ったプレイヤーの多くがここで阿鼻叫喚の最期を遂げました。</p>
`,
        kanso: "「キャッスル以外にもう一匹マイアルーク・クイーンがいた！」という驚きと絶望を味合わせてくれる罠ダンジョン。建物の外見の立派さと、中のぬちゃぬちゃした異形空間のギャップが素晴らしく、「迂闊に名所に近づくと死ぬ」というウェイストランドの掟を再確認させてくれます。"
    },
    {
        title: "Libertalia",
        titleJa: "リベルタリア",
        slug: "libertalia",
        appearance: "Fallout 4",
        wikiSlug: "Libertalia",
        mainImg: imgData["libertalia"][0],
        infoRows: [
            ["種族", "レイダー（元ミニッツメン）"],
            ["区分", "水上都市（巨大なボートの連結）"],
            ["所在地", "ナハント半島の西（海の上）"],
            ["統治者", "ワイヤー (元ミニッツメン)"],
        ],
        body: `
<h2>概要</h2>
<p>リベルタリア（Libertalia）は、連邦東部の海上に沈没船やボート、ゴミの山をかき集めて作られた、超巨大な「海上浮遊都市」のレイダー拠点です。</p>

<h2>詳細</h2>
<p>この海賊のような生活を送るレイダー集団を率いているのは「ワイヤー」という男ですが、彼のターミナルを読むと、彼らが元々は「誇り高きミニッツメンの善良な一隊」だった悲しい過去が明らかになります。<br>クインシーの虐殺でミニッツメンが崩壊した後も、彼らは数年間必死に一般市民を守り続けていましたが、誰も彼らに見返りや食料を寄付してくれず、部下たちは飢えて次々と餓死していきました。最終的に「自分たちが生き残るためには、守るべき市民から食料を奪うしかない」という絶望的な決断を下し、かつての英雄たちは現在の凶悪なレイダーへと完全に堕ちてしまったのでした。</p>
<p>インスティチュート関連のクエスト「Synth Retention」において、コーサーのX6-88と共にこの海上要塞へ突撃し、かつての英雄のなれの果てを討伐することになります。</p>
`,
        kanso: "ウォーターワールドのような海上の立体要塞というマップ構造自体が最高に楽しいだけでなく、「なぜ善良な市民がレイダーになってしまうのか」の過程をワイヤーの日記で完璧に描き出した歴史的傑作ロケーション。正義だけでは腹は膨れないという、ウェイストランドで最も生々しいリアルを見せつけられます。"
    },
    {
        title: "Grandchester Mystery Mansion",
        titleJa: "グランチェスター・ミステリー・マンション",
        slug: "grandchester-mystery-mansion",
        appearance: "Fallout 4 (Nuka-World DLC)",
        wikiSlug: "Grandchester_Mystery_Mansion",
        mainImg: imgData["grandchester-mystery-mansion"][0],
        infoRows: [
            ["種族", "ガンナー / アニマトロニクス / ？"],
            ["区分", "お化け屋敷（ホラーアトラクション）"],
            ["所在地", "ヌカ・ワールドのマップ西側"],
            ["関連", "幽霊少女の噂"],
        ],
        body: `
<h2>概要</h2>
<p>グランチェスター・ミステリー・マンションは、DLC「Nuka-World」に登場する戦前のお化け屋敷アトラクション。実在する有名なオカルト建築「ウィンチェスター・ミステリー・ハウス」のパロディです。</p>

<h2>詳細</h2>
<p>この施設は「狂ったグランチェスター家の当主が迷路のようなおかしな屋敷を建て、最終的に少女ルーシーが両親を惨殺した」という架空のホラーストーリーを元にしたガイド付きアトラクションでした。現在はガンナーのアジトになっていますが、ガンナーたちは「本物の幽霊の少女が出た」と本気で怯えきっています。</p>
<p>プレイヤーが自動ガイドの案内に従って屋敷の仕掛けを進んでいくと、確かにドアの隙間や鏡越しに「謎の少女（ルーシー）」の幻影が走り去るのが何度も目撃されます。これはガンナーの罠でもホログラムでもなく、物理的な解明が一切なされない『本物の心霊現象』として描かれており、最上階でガンナーのボスと戦った後も、屋根裏部屋でプレイヤーに「不気味な現象」という強烈な後味を残します。</p>
`,
        kanso: "遊園地のお化け屋敷…と思ったら、本物の少女の幽霊が全力で呪ってくるというガチの心霊スポット。ターミナルを読むと、戦前のスタッフですら「誰も入れていないはずのあの少女役に、一体誰が給料を払っているんだ？」と混乱していた記録があり、開発者の本気の悪ふざけが炸裂した名オカルトダンジョンです。"
    },
    {
        title: "Hubris Comics (Fallout 4)",
        titleJa: "ハブリス・コミック",
        slug: "hubris-comics",
        appearance: "Fallout 4",
        wikiSlug: "Hubris_Comics_(Fallout_4)",
        mainImg: imgData["hubris-comics"][0],
        infoRows: [
            ["種族", "フェラル・グール（光りし者）"],
            ["区分", "コミック出版社 / 撮影スタジオ"],
            ["所在地", "ボストン中心部（スワンの池の近く）"],
            ["関連", "シルバー・シュラウド / グロッグナック"],
        ],
        body: `
<h2>概要</h2>
<p>ハブリス・コミック（Hubris Comics）は、戦前のアメリカで「シルバー・シュラウド」や「野蛮人グロッグナック」などの大人気アメコミヒーローを出版・メディア展開していた娯楽企業の本社および撮影スタジオの跡地です。</p>

<h2>詳細</h2>
<p>現在、館内は夥しい数のフェラル・グールが巣食っており、最上階の社長室には「光りし者」が鎮座しています。<br>この場所は、グッドネイバーで受容できる大人気クエスト「The Silver Shroud」の開始点であり、シルバー・シュラウドの熱狂的ファンであるケントから「撮影スタジオに残された本物のヒーロースーツの小道具を取ってきてくれ」と依頼されて潜入することになります。</p>
<p>探索を進めると、シルバー・シュラウドの衣装一式の他にも、1階のセットには「グロッグナックの斧（強力な近接武器）と衣装の腰巻き」が展示されており、これらを装備することで、プレイヤー自身があらゆるレイダー達を裁く『ウェイストランドの本物のコミックヒーロー』として大活躍する道が開かれます。</p>
`,
        kanso: "これぞスーパーヒーロー誕生の地。FO4で最も熱いロールプレイクエストである「シルバーシュラウド（専用の口調で悪党を裁く）」を始めるために、プレイヤー全員が絶対に訪れる聖地です。壁に貼られたコミックのポスターやテレビ用のスタジオセット等、戦前のアメコミ文化の香りが色濃く残る神ロケーションです。"
    }
];

let tasks = Promise.resolve();

articles.forEach(article => {
    tasks = tasks.then(async () => {
        console.log(`Processing ${article.title}...`);
        
        // Use pre-fetched image name from json
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
            .replace(/href="https:\/\/fallout.fandom.com\/wiki\/.*?"/, `href="https://fallout.fandom.com/wiki/${article.wikiSlug}"`)
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
