// _batch_gen_fo4_locs17.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_fo4_locp17.json', 'utf8'));

const articles = [
    {
        title: "Memory Den",
        titleJa: "メモリー・デン",
        slug: "memory-den",
        appearance: "Fallout 4",
        wikiSlug: "Memory_Den",
        mainImg: imgData["memory-den"][0],
        infoRows: [
            ["種族", "人間 (グッドネイバー住人) / マグノリア"],
            ["区分", "記憶体験施設 / 歓楽街の店舗"],
            ["所在地", "グッドネイバーの中心部"],
            ["店主", "イルマ"],
        ],
        body: `
<h2>概要</h2>
<p>メモリー・デンは、アウトローの街「グッドネイバー」の中心に位置する、連邦でも非常に珍しい戦前のハイテク施設を利用したサービスを提供する店舗です。店主のイルマが経営し、Dr.アマリが技術的なサポートを行っています。</p>

<h2>詳細</h2>
<p>この施設内には「メモリー・ラウンジャー」と呼ばれる、戦前に記憶を保存・再生するために作られたカプセル型の装置がいくつも設置されています。荒廃した終末世界において、顧客はこのラウンジャーに入ることで、「戦前の平和だった頃の自分の記憶」や「人生の最も幸福だった瞬間」をバーチャルリアリティのような形で鮮明に再体験することができます。<br>そのため、現実の苦しみを忘れたいグールやジャンキーたちが、こぞって自分の一番良い記憶に浸るためにこの店を訪れ、文字通り「過去に溺れて」います。</p>
<p>FO4のメインクエストにおいて、プレイヤーが敵対組織の手がかりを探るため、あるいは自分自身の失われた記憶（ケロッグの記憶など）を辿るために、このメモリー・デンのラウンジャーに入ることになり、ストーリー上の極めて重要な役割を果たします。</p>
`,
        kanso: "「放射能と暴力にまみれた現実から逃げ出し、頭に機械を繋いで『最も幸せだった過去』の夢を見続ける」。サイバーパンクとポストアポカリプスが見事に融合した、信じられないほど退廃的で美しい設定の施設です。メインクエストでケロッグの記憶の中を歩き回る演出はFO4屈指の名シーンですね。"
    },
    {
        title: "The Third Rail",
        titleJa: "サードレール",
        slug: "the-third-rail",
        appearance: "Fallout 4",
        wikiSlug: "The_Third_Rail",
        mainImg: imgData["the-third-rail"][0],
        infoRows: [
            ["種族", "人間 / グール"],
            ["区分", "地下鉄を利用した酒場・クラブ"],
            ["所在地", "グッドネイバーの地下"],
            ["店主", "ホワイトチャペル・チャーリー"],
        ],
        body: `
<h2>概要</h2>
<p>サードレール（The Third Rail）は、グッドネイバーの地下鉄の駅と廃車両を改装して作られた、連邦で最もアングラな雰囲気を持つ酒場でありクラブです。</p>

<h2>詳細</h2>
<p>店名の「サードレール」は、地下鉄に電力を供給する「第三軌条」から名付けられています。<br>薄暗い店内では、Mr.ハンディのバーテンダー「ホワイトチャペル・チャーリー」が絶え間なく皮肉を吐きながら酒を振る舞い、用心棒の「マクレディ」が傭兵の仕事を探して入口に立っています。<br>そして何より、このサードレールのステージでは、連邦の歌姫「マグノリア」（声を演じているのは実在の歌手リンダ・カーター）が専属でジャズを歌っており、彼女の美しい歌声がグッドネイバーの住民たちの荒んだ心を癒やしています。</p>
<p>この酒場は、情報の売買、傭兵の雇用、そして暗殺の依頼など、あらゆる裏の取引が行われる文字通りの「裏社会の社交場」として機能しています。</p>
`,
        kanso: "「地下鉄の廃墟の奥深くに、美しいジャズの生歌が響き渡る最高のバーがある」。Fallout 4の街作りの中でもぶっちぎりでセンスが光るロケーション。初めてここを訪れて、ステージで歌うマグノリアを見た時の『大人の秘密基地』を見つけたような興奮は最高です。"
    },
    {
        title: "Tenpines Bluff",
        titleJa: "テンパインズの断崖",
        slug: "tenpines-bluff",
        appearance: "Fallout 4",
        wikiSlug: "Tenpines_Bluff",
        mainImg: imgData["tenpines-bluff"][0],
        infoRows: [
            ["種族", "入植者"],
            ["区分", "高台の小さな居住地"],
            ["所在地", "連邦北西部（サンクチュアリの東）"],
            ["特記事項", "プレストンからの最初のクエスト候補地"],
        ],
        body: `
<h2>概要</h2>
<p>テンパインズの断崖は、切り立った崖の上にポツンとボロ家とテイトの畑があるだけの非常に小規模な居住地。遠くに連邦の景色を見渡せる見晴らしの良い場所にあります。</p>

<h2>詳細</h2>
<p>多くのプレイヤーにとって、この居住地は「ミニッツメン」の復興において最も印象に残る場所の一つです。なぜなら、コンコードでプレストン・ガービーを救出した後、彼から「助けを求めている」として最初に派遣されるクエストの目的地が、このテンパインズの断崖（またはオバーランド駅）になることが大半だからです。</p>
<p>ここの入植者は「コルベガ工場にいるレイダーのせいで夜も眠れない」と訴えかけてきおり、プレイヤーは序盤の最難関ダンジョンである巨大なコルベガ組み立て工場のレイダー殲滅へと向かうことになります。</p>
`,
        kanso: "無数のプレイヤーがプレストン将軍から「将軍、地図に印をつけておいた」と言われて真っ先に飛ばされる場所。ボロボロの服を着た入植者に「助けてくれ」と頼まれ、超巨大なコルベガ工場にたった一人でカチコミに行くという、ミニッツメンの実質的チュートリアルの舞台です。"
    },
    {
        title: "Finch farm",
        titleJa: "フィンチ・ファーム",
        slug: "finch-farm",
        appearance: "Fallout 4",
        wikiSlug: "Finch_farm",
        mainImg: imgData["finch-farm"][0],
        infoRows: [
            ["種族", "フィンチ一家 (人間)"],
            ["区分", "高速道路の下の農場 / 居住地"],
            ["所在地", "サウガス鉄瓶所のすぐ南"],
            ["関連", "アブラハム家の家宝の剣"],
        ],
        body: `
<h2>概要</h2>
<p>フィンチ・ファームは、サウガス鉄瓶所に隣接する崩落した高速道路の高架下に作られた、アブラハム・フィンチ一家が営む農場です。上空の高速道路部分までクラフトエリアに含まれるため、高層建築が可能な居住地としても人気です。</p>

<h2>詳細</h2>
<p>この農場は、父親のアブラハムが家族を守りながら堅実に運営していましたが、息子の「ジェイク」がレイダー集団『フォージ（炎を崇拝する狂信的なレイダーたち）』に感化されてしまい、家宝である戦前の伝説の日本刀『シシケバブ』を盗み出してサウガス鉄瓶所のフォージの元へ走ってしまいました。</p>
<p>プレイヤーはアブラハムから「馬鹿な息子を連れ戻し、家宝を取り返してくれ」と頼まれ、フォージの本拠地へ突入することになります。説得に成功すれば、ジェイクは反省して農場を手伝うようになり、クラフト拠点としてこの場所を利用できるようになります。</p>
`,
        kanso: "「上にある高速道路までが建築範囲」という仕様を利用して、高架上に天空の城を作ったり、地上への巨大エレベーターを作ったりと、建築ガチ勢からの人気が非常に高い居住地。不良になった息子と和解するお使いイベントも王道で良いですね。"
    },
    {
        title: "Murkwater construction site",
        titleJa: "マークウォーター建設現場",
        slug: "murkwater-construction-site",
        appearance: "Fallout 4",
        wikiSlug: "Murkwater_construction_site",
        mainImg: imgData["murkwater-construction-site"][0],
        infoRows: [
            ["種族", "マイアルーククイーン"],
            ["区分", "泥沼の建設現場 / 居住地候補"],
            ["所在地", "連邦南部の湿地帯（クインシーの南西）"],
            ["特記事項", "クイーンとの強制戦闘"],
        ],
        body: `
<h2>概要</h2>
<p>マークウォーター建設現場は、連邦南部の薄暗い泥沼地帯にある、半分水没した重機とブルドーザーが放置されている戦前の建設予定地。FO4の居住地候補の中でも最も環境が劣悪で危険な場所の一つです。</p>

<h2>詳細</h2>
<p>この場所を居住地として解放するためには、プレイヤーは最悪の試練を乗り越えなければなりません。この建設現場の泥沼の中には、巨大な『マイアルーククイーン』が鎮座しており、近づいた瞬間に酸のブレスと産卵攻撃による強烈な弾幕を浴びせてきます。</p>
<p>苦労してクイーンを討伐し、ワークショップを解放しても、周囲は常に薄暗く、霧が立ち込める陰湿な沼地であり、普通の家を建てても全く見栄えがしません。また、クイーンが後日リスポーンしてしまい、入植者が酸を浴びて大パニックになるという悲惨なバグ（または仕様）も報告されており、ある意味で上級者向けの拠点となっています。</p>
`,
        kanso: "「なんでこんなドブ沼を居住地にしようと思ったんだ？」とミニッツメンの正気を疑う最悪の立地。わざわざここに綺麗な家を建てるよりは、沼地のスラムや、魔女が住むホラー風味の隠れ家など、環境の悪さを逆手に取った『ロールプレイ特化』の建築が輝くユニークな居住地です。"
    },
    {
        title: "Concord civic access",
        titleJa: "コンコード市街地へのアクセス（地下水路）",
        slug: "concord-civic-access",
        appearance: "Fallout 4",
        wikiSlug: "Concord_civic_access",
        mainImg: imgData["concord-civic-access"][0],
        infoRows: [
            ["種族", "マイアルーク / ラッドローチ"],
            ["区分", "下水道 / メンテナンス通路"],
            ["所在地", "コンコードの地下"],
            ["特記事項", "デスクロー登場の舞台裏"],
        ],
        body: `
<h2>概要</h2>
<p>コンコード市街地の地下に通っている、広大な古い下水道やメンテナンス用のトンネル網。序盤のコンコード探索中、マンホール等から侵入することが可能な隠しオプショナル・ダンジョンです。</p>

<h2>詳細</h2>
<p>自由博物館のイベントでプレストン・ガービーたちを助ける際、地上で巨大なデスクローが地面の鉄格子を突き破って出現するという超ド派手な演出がありますが、実はそのデスクローが『直前まで潜んでいた地下空間』がこの場所です。</p>
<p>プレイヤーはこの地下水路を探索することで、「なぜデスクローがコンコードの地下にいたのか」「戦後にここで何が起きていたのか」の痕跡を見つけることができます。中にはレイダーの死体や、ゴミを漁っていたマイアルークなどが生息しており、探索することで大量のジャンク品や貴重なフュージョン・コアなどを回収できる序盤のボーナスエリアとなっています。</p>
`,
        kanso: "博物館のイベント後に「あのデスクロー、どこから出てきたんだろう？」と思って開いたマンホールの先に、広大な地下ダンジョンが広がっているという感動。序盤の資源不足の時期にここを見つけると、探検家の気分を大いに満たしてくれます。"
    },
    {
        title: "Old Gullet sinkhole",
        titleJa: "オールド・ガレット・シンクホール",
        slug: "old-gullet-sinkhole",
        appearance: "Fallout 4",
        wikiSlug: "Old_Gullet_sinkhole",
        mainImg: imgData["old-gullet-sinkhole"][0],
        infoRows: [
            ["種族", "デスクロー (確定) / フェラル・グール"],
            ["区分", "巨大な陥没穴 / 洞窟"],
            ["所在地", "連邦北東部（グリーントップ菜園の西）"],
            ["特記事項", "飛び込むと地下洞窟へ"],
        ],
        body: `
<h2>概要</h2>
<p>オールド・ガレット・シンクホールは、連邦北東部にある巨大な陥没穴。周囲の家屋や車両が深いすり鉢状の穴に飲み込まれており、最深部は水没しています。穴の周辺には「デスクロー」が徘徊している非常に危険なロケーションです。</p>

<h2>詳細</h2>
<p>この場所の最大のギミックは、「穴の底の水場に飛び込む」ことで、別の地下洞窟エリアへと強制的に流されるという点です。<br>この水路の奥深くには、戦前にこの陥没事故によって生き埋めになり、そのまま死んだかフェラル・グールと化した不運な人々の無残な痕跡が残されています。また、このシンクホールの底の洞窟は、地上でデスクローに追われたプレイヤーが逃げ込むための唯一の退路にもなっています。</p>
<p>地下には大量のジャンク品やスキルブック等が隠されており、ただの陥没穴だと思って近づいたプレイヤーに『デスクローとの死闘』と『深穴へのダイブ』というアトラクションを提供してくれます。</p>
`,
        kanso: "「あ、なんかデカい穴があいてる…」と覗き込んだ瞬間に、背後からデスクローが突進してきてそのまま一緒に穴の底へ転落させられるという、天然のトラップ地帯。飛び込んだ先の水路を通って脱出ルートを探す冒険感は、FO4のフィールド探索の面白さが詰まっています。"
    },
    {
        title: "Mass Pike Interchange",
        titleJa: "マスパイク・インターチェンジ",
        slug: "mass-pike-interchange",
        appearance: "Fallout 4",
        wikiSlug: "Mass_Pike_Interchange",
        mainImg: imgData["mass-pike-interchange"][0],
        infoRows: [
            ["種族", "ガンナー / アサルトロン / ウィンロック＆バーンズ"],
            ["区分", "崩落した高速道路上の要塞"],
            ["所在地", "ボストン市街地西部の空中（エレベーターアクセス）"],
            ["関連", "マクレディの復讐クエスト"],
        ],
        body: `
<h2>概要</h2>
<p>マスパイク・インターチェンジは、ボストンの上空を走る高い高速道路（ハイウェイ）の分かれ道部分をガンナーたちが不法占拠し、土嚢と重火器でガチガチに武装した「空中要塞」です。</p>

<h2>詳細</h2>
<p>この空中の拠点にアクセスするためには、下にある地上部分から小さな黄色い工事用エレベーターに乗って、無防備な状態で長々と上昇していくしかありません。エレベーターが上に到着した瞬間、ガンナーとアサルトロンによる激しい迎撃の十字砲火を浴びることになります。</p>
<p>この場所はコンパニオン「マクレディ」の好感度クエストの目的地であり、彼のかつての古巣の仲間であり、現在はいがみ合っているガンナーの指揮官「ウィンロック」と「バーンズ」がここで待ち受けています。マクレディの因縁を晴らすため、プレイヤーは高速道路上での激しいアサルトライフル戦を繰り広げることになります。また、ここにはパワーアーマーのフレームも置いてあります。</p>
`,
        kanso: "「ガンナーが占拠する高速道路上の空中要塞」。エレベーターで上がっていく時の『絶対に上で蜂の巣にされる』というプレッシャーと、到着した瞬間にタレットやアサルトロンからレーザーの嵐を浴びる激しさは、FO4のガンファイティングの中でも屈指の楽しさです。下へ突き落として倒すのも一興。"
    },
    {
        title: "Quincy quarries",
        titleJa: "クインシー採石場",
        slug: "quincy-quarries",
        appearance: "Fallout 4",
        wikiSlug: "Quincy_Quarries",
        mainImg: imgData["quincy-quarries"][0],
        infoRows: [
            ["種族", "レイダー"],
            ["区分", "放射能汚染された採石場"],
            ["所在地", "クインシーのすぐ北"],
            ["関連", "のちの『Vault 88』（Vault-Tec Workshop）"],
        ],
        body: `
<h2>概要</h2>
<p>クインシー採石場は、巨大な穴が掘り返された戦前の採掘現場。放射能の高濃度汚染水が溜まっており、レイダーの集団（スロイス等）が足場を組んで採石場の周囲や底を拠点としている危険地帯です。</p>

<h2>詳細</h2>
<p>レイダーたちはこの採石場から発掘される資源（核物質？）などを狙っているようですが、ガイガーカウンターが鳴り響く劣悪な環境です。<br>この場所の真の価値は、DLC「Vault-Tec Workshop」を導入することで明らかになります。DLC導入後、この採石場の最深部の壁の一部が取り払われ、そこから未完成の巨大な地下シェルター『Vault 88』へとアクセスできるようになります。</p>
<p>つまり、単なるレイダーの放射能の住処であったこの採石場は、プレイヤーが自らの手で巨大なVaultを建築して監督官となるための「秘密の入口」だったのです。DLC導入後は大量のレイダーとグールが入り乱れる大乱戦の現場へと変貌します。</p>
`,
        kanso: "本編発売当時は「ただレイダーがいっぱいいて放射能がキツイだけの嫌な岩場」だったのが、DLCによって「ここが俺たちの（未完成の）Vaultの正面玄関だ！」と大化けしたロケーション。ゲームの拡張によって意味合いが180度変わるというオープンワールドらしい変化を楽しめる場所です。"
    },
    {
        title: "Slocum's Joe Corporate HQ",
        titleJa: "スローカムズ・ジョー本社",
        slug: "slocums-joe-corporate-hq",
        appearance: "Fallout 4",
        wikiSlug: "Slocum's_Joe_Corporate_HQ",
        mainImg: imgData["slocums-joe-corporate-hq"][0],
        infoRows: [
            ["種族", "レイダー"],
            ["区分", "戦前の企業オフィスビル"],
            ["所在地", "連邦北西部（レキシントンから北西）"],
            ["関連", "『バズ・ビーツ』の開発秘話"],
        ],
        body: `
<h2>概要</h2>
<p>スローカムズ・ジョー本社は、戦前の連邦において圧倒的な人気を誇っていたドーナツとコーヒーのチェーン店「スローカムズ・ジョー」のコーポレート機能を取り仕切っていた中規模のオフィスビルの廃墟です。</p>

<h2>詳細</h2>
<p>現在はレイダーの駐屯地となっていますが、ビル内のターミナルには、この企業がいかに戦前の「倫理観の崩壊した狂った企業」であったかを示す面白い履歴が残されています。<br>彼らは利益を追求するあまり、コーヒーを高熱に保つためにヤバすぎる添加物を使用したり、競合他社を違法な手段で潰そうとしたりとやりタイ放題でした。<br>最大の狂気は、極限まで熱したコーヒーをドーナツ生地に閉じ込めた『バズ・ビーツ（Buzzbites）』という新商品の開発です。これは「一口かじれば中の超高熱スープ状コーヒーが口内で飛び出して第三度熱傷を負う」という完全な兵器レベルの食品でしたが、彼らはこれを強引に販売しようと計画していました。</p>
<p>プレイヤーはこのビルで、そのヤバすぎるバズ・ビーツの『レシピ』を見つけることができ、実際に自分のクッキングステーションで製造し、食べる（体力を回復しつつAGIが上昇）ことができるようになります。</p>
`,
        kanso: "「口に入れたら大火傷する兵器のようなドーナツを本気で売ろうとしていた」という、Fallout特有のブラック企業ジョークの極致。実際にレシピを入手して作れるようになるというバカバカしさがあり、世界観の狂気を美味しく（？）体験できる素晴らしいロケーションです。"
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
