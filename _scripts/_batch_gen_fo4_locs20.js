// _batch_gen_fo4_locs20.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_fo4_locp20.json', 'utf8'));

const articles = [
    {
        title: "Acadia",
        titleJa: "アカディア",
        slug: "acadia-location",
        appearance: "Fallout 4 (Far Harbor)",
        wikiSlug: "Acadia_(location)",
        mainImg: imgData["acadia-location"][0],
        infoRows: [
            ["種族", "シンス (DiMA)"],
            ["区分", "天文台跡地の拠点"],
            ["所在地", "島の山頂部"],
            ["関連", "DLC第2弾の主要勢力"],
        ],
        body: `
<h2>概要</h2>
<p>アカディア（Acadia）は、DLC『Far Harbor』に登場する巨大な天文台の跡地。現在はインスティチュートから逃亡したシンスたちの隠れ家・コミュニティとなっており、旧型シンスである「DiMA」が指導者としてこの場所を統治しています。</p>

<h2>詳細</h2>
<p>この場所はかつて戦前の国立公園の天文台でした。<br>現在は霧（フォグ）に沈む島の最も高い山頂に位置しており、シンスたちが連邦の追手から身を隠し、平和に自己を確立するための避難所となっています。<br>プレイヤーは行方不明になった少女「カスミ」を追ってこの地を訪れ、DiMAという謎めいた機械人間と出会うことで、島を巡る「ファー・ハーバーの町民」「チルドレン・オブ・アトム」「アカディアのシンス」の3つ巴の対立へと巻き込まれていくことになります。</p>
<p>施設内にはシンスたちの居住区や、DiMA自身が記憶を保存している巨大なコンピュータバンクなどが備えられており、島の平和を保つための『暗い秘密』が隠されています。</p>
`,
        kanso: "「機械が平和を望んだ時、そこに倫理は存在するのか」。初代Falloutのマスターすら彷彿とさせる強烈な哲学を持ったDiMAの拠点。山頂から見下ろす島の風景は不気味ながらも美しく、Far HarborというDLCの卓越したライティングを象徴する場所です。"
    },
    {
        title: "The Island",
        titleJa: "島 (ファー・ハーバー)",
        slug: "the-island",
        appearance: "Fallout 4 (Far Harbor)",
        wikiSlug: "The_Island",
        mainImg: imgData["the-island"][1] || imgData["the-island"][0],
        infoRows: [
            ["種族", "ハーバーマン / アトム教団 等"],
            ["区分", "広域エリア（DLCワールドマップ）"],
            ["所在地", "連邦の遥か北東（メイン州マウント・デザート島）"],
            ["特記事項", "濃霧と独自の生態系"],
        ],
        body: `
<h2>概要</h2>
<p>「島（The Island）」は、DLC『Far Harbor』の舞台となる広大なオープンワールドマップそのものを指します。現実世界におけるメイン州のマウント・デザート島（アカディア国立公園）がモチーフとなっています。</p>

<h2>詳細</h2>
<p>連邦の沿岸から船で数時間北上した場所に位置するこの島は、放射能を含んだ極めて濃い「霧（The Fog）」に島長の大半が覆われており、常に薄暗くジメジメとした気候に支配されています。<br>この特殊な環境によって連邦とは異なる独自の気味が悪い生態系が発達しており、「ガルパー」「アングラー」「フォグ・クロウラー」といった、連邦のミュータントを遥かに凌駕する凶悪な巨大怪物が常に霧の中からプレイヤーを付け狙っています。</p>
<p>島民たちはこの霧を恐れながら沿岸の町「ファー・ハーバー」で細々と生き延びており、一方で霧を神聖視する「チルドレン・オブ・アトム」たちが島の奥地を占拠して対立しています。</p>
`,
        kanso: "本編のカラッと乾燥した連邦の雰囲気から一転、永遠に続くじめじめした霧と、見えないところから突然襲撃してくる巨大怪物がトラウマになる恐怖の島。スティーヴン・キングの『ミスト』やクトゥルフ神話のインスマウスのような最高のホラー体験が全編を通して味わえます。"
    },
    {
        title: "Echo Lake Lumber",
        titleJa: "エコーレイク・ランバー・ミル",
        slug: "echo-lake-lumber",
        appearance: "Fallout 4 (Far Harbor)",
        wikiSlug: "Echo_Lake_Lumber",
        mainImg: imgData["echo-lake-lumber"][0],
        infoRows: [
            ["種族", "フェラル・グール"],
            ["区分", "居住地 / 製材所跡地"],
            ["所在地", "島の西海岸"],
            ["特記事項", "島で最大の建築可能エリア"],
        ],
        body: `
<h2>概要</h2>
<p>エコーレイク・ランバー・ミルは、島（Far Harbor）の西部に位置するかつての製材所の跡地。現在は「トラッパー（島のレイダー）」やフェラル・グールたちの巣窟と化していますが、解放することで非常に優れた居住地となります。</p>

<h2>詳細</h2>
<p>クエスト『Rite of Passage』を進めることで居住地として解放できます。<br>島の拠点の中では圧倒的に面積が広く、巨大な主棟の建物を利用できるほか、木材基地らしく廃材が大量に手に入るため、島の中核となる大要塞を築き上げるのにぴったりの場所です。</p>
<p>また、この場所で発生するクエストで「マルコム」という怪しい男と遭遇し、彼と「人食い」に関するゾッとするようなやり取りを行うことになります。島特有の不気味な後味の悪さを感じさせるイベントの一つです。</p>
`,
        kanso: "「島にようやくまともな大拠点が作れそうだ！」と喜んだ直後、人食いのマルコムとのホラーチックな狂気の選択肢を突きつけられる印象的なロケーション。建築高度も高く、島の中で唯一「連邦のスターライト・ドライブイン」レベルの自由な街づくりが可能な貴重な製材所です。"
    },
    {
        title: "National Park visitor's center",
        titleJa: "国立公園案内所",
        slug: "national-park-visitors-center",
        appearance: "Fallout 4 (Far Harbor)",
        wikiSlug: "National_Park_visitor%27s_center",
        mainImg: imgData["national-park-visitors-center"][0],
        infoRows: [
            ["種族", "トラッパー"],
            ["区分", "居住地 / 公園の受付施設"],
            ["所在地", "島の中北西部"],
            ["関連", "ミッチの生存者の捜索"],
        ],
        body: `
<h2>概要</h2>
<p>国立公園案内所は、戦前のアカディア国立公園を訪れる観光客のためのビジターセンターの跡地。島の中央部からやや西に離れた森の中にひっそりと佇んでいます。</p>

<h2>詳細</h2>
<p>ファー・ハーバーの住人である酒場のマスター、「ミッチ」から『おじさん（アンクル・ケン）を探してくれ』という依頼を受けてここを訪れることになります。アンクル・ケンはトラッパーたちの襲撃を一人で防ぎ続けながら、この案内所にしぶとく立てこもっています。</p>
<p>この場所を居住地として解放した後は、トラッパーからの激しい防衛戦が度々発生します。敷地内には戦前のきれいな展示パネルやギフトショップの残骸が散らばっており、平坦で建築もしやすい優秀な拠点防衛ラインとして運用できます。</p>
`,
        kanso: "偏屈なケンおじさんが一人でトラッパーを撃退し続けている歴戦の案内所。島における「本土からの観光客向けの展示」という戦前の穏やかな空気と、島特有の濃霧のコントラストがとても美しい居住地です。"
    },
    {
        title: "Dalton farm",
        titleJa: "ダルトン・ファーム",
        slug: "dalton-farm",
        appearance: "Fallout 4 (Far Harbor)",
        wikiSlug: "Dalton_farm",
        mainImg: imgData["dalton-farm"][0],
        infoRows: [
            ["種族", "アングラー 等"],
            ["区分", "居住地 / 海岸沿いの廃農家"],
            ["所在地", "島の北西の海岸沿い"],
            ["関連", "ダルトン家の名誉挽回"],
        ],
        body: `
<h2>概要</h2>
<p>ダルトン・ファームは、島でも屈指の名家であった「ダルトン一族」がかつて開拓したとされる北部の海岸沿いの農場跡です。</p>

<h2>詳細</h2>
<p>ファー・ハーバーで生き残っている最後のダルトン一族であり、少し認知症気味の老婆「キャシー・ダルトン」から『一族の復讐（ブラッドバッチ）』を依頼され、ここでフォグ・クロウラーなどの化け物を討伐することで居住地として譲り受けることができます。</p>
<p>広大な海岸線をまるごと建築敷地として利用できるのが最大の特徴で、崖の上に灯台を作ったり、海岸に巨大な浄水ステーションを作ったりと、連邦の「ノードハーゲン・ビーチ」や「沿岸のコテージ」を合わせたような海辺の建築を堪能できます。</p>
`,
        kanso: "「島の名家の最後の生き残りから、復讐の代償として海辺の土地をもらう」という渋いクエストライン。霧の中からアングラーやフォグ・クロウラーがぬーっと現れる海辺の戦いは、まさに本物の『漁師の怪物退治』のような熱いドラマがあります。"
    },
    {
        title: "Red Death Island",
        titleJa: "レッドデスの島",
        slug: "red-death-island",
        appearance: "Fallout 4 (Far Harbor)",
        wikiSlug: "Red_Death_Island",
        mainImg: imgData["red-death-island"][0],
        infoRows: [
            ["種族", "伝説の巨大怪物（？）"],
            ["区分", "孤島 / ボス戦用エリア"],
            ["所在地", "ファー・ハーバーから船で移動した沖合"],
            ["特記事項", "マリナーの最終討伐クエスト"],
        ],
        body: `
<h2>概要</h2>
<p>レッドデスの島は、ファー・ハーバーの船大工「マリナー」からの最後のクエストで特別な船を出して向かうことになる、島民が長年恐れ続けてきた伝説の怪物「レッドデス（赤い死神）」が棲むとされる霧に包まれた絶海の孤島です。</p>

<h2>詳細</h2>
<p>島民たちの間では、「レッドデス」とは軍艦をも引き裂く巨大な赤い双眸を持った伝説のマイアラークの化け物であり、数多くの漁師がこれによって海に引きずり込まれたと語り継がれています。<br>プレイヤーは最凶の決戦に備え、持てる最強の武器（ヌカランチャーやガトリングレーザーなど）とパワーアーマーを着込んでマリナーと共にこの島へ上陸します。</p>
<p>そして霧の奥から現れる「血に飢えた巨大な怪物」との、死闘の果てに見る結末は……Fallout 4の全DLCにおいて最高峰の『肩透かしギャグ』として、プレイヤーの間で長年伝説のミームとして語り継がれています。</p>
`,
        kanso: "「絶対にネタバレしないでプレイしろ、最強のボスだからパワーアーマーと大量のスティムパックを持っていけ」と全ての古参プレイヤーが初心者を騙す、Fallout 4最大のネットミームの聖地。あの霧の奥から現れる「赤い死神」の正体を見たときの脱力感は一生忘れません。"
    },
    {
        title: "Cranberry Island Bog",
        titleJa: "クランベリー島の沼地",
        slug: "cranberry-island-bog",
        appearance: "Fallout 4 (Far Harbor)",
        wikiSlug: "Cranberry_Island_Bog",
        mainImg: imgData["cranberry-island-bog"][0],
        infoRows: [
            ["種族", "フェラル・グール（元住人）"],
            ["区分", "探検・パズルエリア"],
            ["所在地", "島の南端（クランベリー島）"],
            ["特記事項", "隠し物資庫の鍵探し"],
        ],
        body: `
<h2>概要</h2>
<p>クランベリー島の沼地は、ファー・ハーバーのマップの南端に位置する独立した小島です。かつてここで暮らしていた「エリザ・ギボンズ」という少女の日記と、隠された物資庫を巡る探索パズルの舞台となります。</p>

<h2>詳細</h2>
<p>この島に上陸し、「発電機の修理」や「マップの修復」といったパズルをこなしながら、島の各地に残されたエリザの日記（メモ）を拾い集めていくことになります。<br>日記には、戦前にこの島で起きた家族の崩壊の過程と、迫りくる核戦争の恐怖、そしてシェルター（物資庫）へ逃げ込もうとする健気な少女の記録が綴られています。</p>
<p>パズルを全て解き明かして隠されたサプライシェッド（補給小屋）を開けると、そこには大量の crafting 資材（アルミニウムや接着剤など拠点開発に必須の資源）が山のように積まれており、探索の手間に見合う最高の報酬を得ることができます。</p>
`,
        kanso: "戦前のある一家に起きた悲しい物語を追体験しつつ、その見返りとして「アルミニウム、銅、接着剤の山」という、クラフター将軍にとって本編のどのユニーク武器よりも嬉しい最強の実用品がもらえる超優良ロケーション。島に来たらまずここを攻略するのがセオリーです。"
    },
    {
        title: "Vault-Tec: Among the Stars",
        titleJa: "Vault-Tec: アマング・ザ・スター",
        slug: "vault-tec-among-the-stars",
        appearance: "Fallout 4 (Nuka-World)",
        wikiSlug: "Vault-Tec:_Among_the_Stars",
        mainImg: imgData["vault-tec-among-the-stars"][0],
        infoRows: [
            ["種族", "アニマトロニクス / ノバ・トロン"],
            ["区分", "Vault型アトラクション"],
            ["所在地", "ギャラクティックゾーン内"],
            ["関連", "戦前の狂った洗脳人体実験"],
        ],
        body: `
<h2>概要</h2>
<p>Vault-Tec: アマング・ザ・スターは、DLC『Nuka-World』のギャラクティックゾーンにあるアトラクションの一つ。Vault-Tec社が提供する「宇宙にVaultを作ったらどうなるか」という未来予想図（という名目の狂った展示）です。</p>

<h2>詳細</h2>
<p>アトラクションの表向きの展示は「宇宙での快適なVault生活」をマネキンとアナウンス音声でシミュレートしたものですが、スタッフの裏通路（バックヤード）に侵入すると、Vault-Tec社の『真の目的』が明らかになります。</p>
<p>実はこのアトラクション全体が巨大な洗脳実験施設であり、来場者に無意識のうちにサブリミナルによる恐怖を植え付け、宇宙への不安を煽り、最終的に「やはり地球の地下のVaultが一番安全だ」と信じ込ませるための、悪魔のようなマインドコントロール実験が行われていました。Falloutシリーズの象徴たるVault-Tec社の悪辣さを極めた傑作ロケーションです。</p>
`,
        kanso: "「遊園地のアトラクションすら、一般人を洗脳するための人体実験にすぎない」という、シリーズ伝統のVault-Tec社のブラックジョークの極致。表のきらびやかな宇宙展示の裏側に潜入し、狂った研究記録を見つけた時の「やっぱりコイツらサイコパスだ」という安心感は異常です。"
    },
    {
        title: "Home Plate",
        titleJa: "ホームプレート",
        slug: "home-plate",
        appearance: "Fallout 4",
        wikiSlug: "Home_Plate",
        mainImg: imgData["home-plate"][0],
        infoRows: [
            ["種族", "プレイヤーホーム"],
            ["区分", "居住区（購入可能）"],
            ["所在地", "ダイアモンドシティ・マーケット"],
            ["特記事項", "供給ラインの接続不可 / 襲撃ゼロ"],
        ],
        body: `
<h2>概要</h2>
<p>ホームプレートは、連邦最大の街「ダイアモンドシティ」のマーケット敷地内に存在する、プレイヤーがお金を払って購入できる『私有物件（プレイヤーホーム）』です。</p>

<h2>詳細</h2>
<p>市長の秘書であるジェネバから2000キャップで購入できるこの物件は、通常の居住地とはやや仕様が異なります。入植者を募集したり、供給ラインを繋げたり、大きな防衛網を敷くことはできません。<br>しかし、ダイアモンドシティの強力な壁の内側にある完全なロード扉付きの室内オブジェクトであるため、「敵の襲撃がシステム上絶対に発生しない」という絶対的な安全性が保証されています。</p>
<p>大事なユニーク武器やパワーアーマーのコレクションを飾るための専用の倉庫として、あるいは旅の合間に一人でくつろぐための安全な秘密基地的用途として、すべての将軍に愛用される特別な拠点です。</p>
`,
        kanso: "ウェイストランドでどんなに泥と血にまみれても、ダイアモンドシティの『自宅』に帰ってくれば完全に安全だという保証。供給ラインが繋げない不便さを差し引いても、レイダーに大事なユニーク武器を盗まれる心配ゼロの博物館を作りたくなる最高の私室です。"
    },
    {
        title: "Sunshine Tidings co-op",
        titleJa: "サンシャイン・タイディングスCo-op",
        slug: "sunshine-tidings-co-op",
        appearance: "Fallout 4",
        wikiSlug: "Sunshine_Tidings_co-op",
        mainImg: imgData["sunshine-tidings-co-op"][0],
        infoRows: [
            ["種族", "フェラル・グール"],
            ["区分", "居住地 / コミューン（キャンプ）跡"],
            ["所在地", "連邦北西部"],
            ["特記事項", "教授（プロフェッサー・グッドフィールズ）"],
        ],
        body: `
<h2>概要</h2>
<p>サンシャイン・タイディングスCo-opは、連邦の北西部に位置するかつてののどかなコミューン（ヒッピーの夏期キャンプ場のような集落）の跡地。現在は大量のフェラル・グールがキャビン内で休眠しています。</p>

<h2>詳細</h2>
<p>居住地として非常に広大で、多数の個別のキャビンと巨大な倉庫施設が並んでおり、大村落を作り上げるのに最適なキャンバスです。<br>この場所の最大の特徴は、ハッキングされてヒッピー仕様になったミスター・ガッツィーの「プロフェッサー・グッドフィールズ（教授）」がフワフワと漂っていることです。彼は常に「ファラウェーイ、マーン」「ピース（平和）…」と、完全にキマったヒッピーの言葉を呟きながら敷地を巡回しています。</p>
<p>さらに、ここには肉のドロップ率が2倍になる超有用本『ウェイストランド・サバイバルガイド』が配置されているため、多くのプレイヤーが序盤に無理をしてでも訪れる重要ロケーションとなっています。</p>
`,
        kanso: "「ピース…マーン…」と呟くガンギマリのガッツィーを眺めながら、連邦最強の農業＆ドロップ倍増拠点として重宝する素晴らしいコミューン跡地。この平和な空間にタレットとミサイル砲台をズラリと並べ、軍事基地化してしまうのがクラフターの性（サガ）です。"
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
            .replace(/<body data-article-category=".*?" data-article-appearance=".*?">/, `<body data-article-category="拠点/ダンジョン" data-article-appearance="${article.appearance}">`);

        fs.writeFileSync(`f:/Fallout/${article.slug}.html`, html, 'utf8');

        // X post
        const xDir = path.join('F:/Fallout', '_X', article.slug);
        fs.mkdirSync(xDir, { recursive: true });
        
        let postStr = `【Fallout Terminal データベース更新】 📡
【LOCATION: ${article.titleJa}】
${article.appearance}における重要拠点の情報をアーカイブしました。ついに当サイトのFO4ロケーションデータベースが200件に到達！

アーカイブアクセス：
https://www.fallout-jp.com/${article.slug}.html

#Fallout #Fallout4 #フォールアウト #FalloutLore`;
        
        fs.writeFileSync(path.join(xDir, 'post.md'), postStr, 'utf8');

        console.log(`Finished ${article.title}`);
    });
});

tasks.then(() => console.log('All generations completed.'));
