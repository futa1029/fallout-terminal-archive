// _batch_gen_fo4_locs19.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_fo4_locp19.json', 'utf8'));

const articles = [
    {
        title: "Nuka-Town USA",
        titleJa: "ヌカ・タウンU.S.A.",
        slug: "nuka-town-usa",
        appearance: "Fallout 4 (Nuka-World)",
        wikiSlug: "Nuka-Town_USA",
        mainImg: imgData["nuka-town-usa"][0],
        infoRows: [
            ["種族", "レイダー (3勢力) / 奴隷屋"],
            ["区分", "テーマパークの中央エリア / コア拠点"],
            ["所在地", "ヌカ・ワールドの中央"],
            ["関連", "『オーバーボス』の玉座"],
        ],
        body: `
<h2>概要</h2>
<p>ヌカ・タウンU.S.A.は、DLC『Nuka-World』の舞台となる巨大な遊園地の「中央広場」であり、全てのエリアを繋ぐハブとなる一大拠点です。かつては戦前のヌカ・コーラの魅力を伝える平和なショッピングストリートでしたが、現在は悪党たちが支配する狂気の街と化しています。</p>

<h2>詳細</h2>
<p>このエリアは、ヌカ・ワールドを支配する3つの巨大なレイダー組織「ディサイプルズ」「オペレーターズ」「パックス」たちの共通の拠点となっており、街のあちこちで粗暴なレイダーたちがたむろしています。かつての観光客向けの土産物屋やすぐ横に併設されたレストランは、現在それぞれのレイダー勢力の拠点や奴隷の市場として改造されています。</p>
<p>プレイヤーは「総支配人（オーバーボス）」としてこの街に君臨し、各勢力から貢物（ケミストリー・ステーションにあるオーバーボスのトランク）を受け取ったり、彼らに命令を下して周囲の未踏エリアを占領していくという、レイダー軍団のトップとしての生活をここからスタートさせます。</p>
`,
        kanso: "「悪党どもの巨大な巣窟のトップに立ち、彼らを指揮してアメリカ全土のテーマパークを制圧する」。ベセスダがミニッツメンの対極として用意してくれた、究極の『悪役プレイ』の拠点。3つの敵対的なレイダー勢力がギリギリの均衡でひしめき合っている狂気のアーケード街の雰囲気は最高です。"
    },
    {
        title: "Fizztop Mountain",
        titleJa: "フィズトップ・マウンテン",
        slug: "fizztop-mountain",
        appearance: "Fallout 4 (Nuka-World)",
        wikiSlug: "Fizztop_Mountain",
        mainImg: imgData["fizztop-mountain"][0],
        infoRows: [
            ["種族", "プレイヤー (オーバーボス)"],
            ["区分", "人工の山 / プレイヤーホーム"],
            ["所在地", "ヌカ・タウンU.S.A.の北側"],
            ["特記事項", "頂上が総支配人の拠点"],
        ],
        body: `
<h2>概要</h2>
<p>フィズトップ・マウンテンは、ヌカ・タウンU.S.A.の中心に見える、大きな赤いヌカ・コーラのボトルが頂上に突き刺さった人工の岩山です。このエリアの最高権力者である「総支配人（オーバーボス）」の住居として利用されています。</p>

<h2>詳細</h2>
<p>山の頂上（フィズトップ・グリル）は、見晴らしの良い展望レストランの跡地であり、プレイヤーがコルターを倒して新たな総支配人となった後は、自動的にプレイヤーの安全な自宅（プレイヤーホーム）となります。<br>ここにはベッド、各種作業台、大量の収納箱が完備されているほか、屋外のテラスからはヌカ・ワールドの広大な全景を一望することができます。</p>
<p>山の下層部分は、残虐なレイダー勢力「ディサイプルズ」の薄暗い拠点となっており、彼らが持ち込んだ血生臭い肉や拷問器具が散乱しています。</p>
`,
        kanso: "「テーマパークのシンボルである大山脈の頂上のレストランを、自分だけの王座部屋にする」。この圧倒的な勝ち組感と景色は、連邦のどんな豪華な拠点にも勝る魅力があります。下からディサイプルズの叫び声が聞こえてくるのも、悪の親玉として悪くないBGMです。"
    },
    {
        title: "The Gauntlet",
        titleJa: "ガントレット",
        slug: "the-gauntlet-nuka-world",
        appearance: "Fallout 4 (Nuka-World)",
        wikiSlug: "The_Gauntlet_(Nuka-World)",
        mainImg: imgData["the-gauntlet-nuka-world"][0],
        infoRows: [
            ["種族", "レイダー / 各種トラップ / アリ群"],
            ["区分", "死の迷路（アトラクション）"],
            ["所在地", "ヌカ・ワールド・トランジットセンター〜ヌカ・タウン"],
            ["特記事項", "回避不能な入園テスト"],
        ],
        body: `
<h2>概要</h2>
<p>ガントレット（The Gauntlet）は、ヌカ・ワールドを訪れるすべての者が強制的に挑戦させられる「死の障害物コース」です。前任のオーバーボスであるコルターが、余興と連邦からの侵入者排除を兼ねて作った狂気の迷宮です。</p>

<h2>詳細</h2>
<p>ただただ殺意に満ちたこの迷路は、タレット、火炎放射器、大量の地雷、放射能汚染エリア、さらには無数のマイアラークや飛行アリの巣など、あらゆる殺傷トラップが詰め込まれています。さらにタチの悪いことに、スピーカーからは常にレイダーの「レッドアイ」による実況放送が流れており、プレイヤーが苦しむ様子がヌカ・ワールド中に娯楽として配信されています。</p>
<p>この気が遠くなるほど長い死の迷路を抜け、最後にコロシアム（コーラ・カーズ・アリーナ）で待ち受ける電気無敵アーマーを着たオーバーボス・コルターを水鉄砲（サースト・ザッパー）を使って倒さなければ、ヌカ・ワールドへの正式な入園すら許されません。</p>
`,
        kanso: "「おめでとう！君はヌカ・ワールドの『ガントレット』にご案内だ！」という実況と共に始まる理不尽の極み。本編のミルトン・パーキングのトラップ迷路を遥かに超える巨大な初見殺しダンジョンであり、DLC開始からいきなりプレイヤーの心をへし折りに来る素晴らしいアトラクションです。"
    },
    {
        title: "Galactic Zone",
        titleJa: "ギャラクティックゾーン",
        slug: "galactic-zone",
        appearance: "Fallout 4 (Nuka-World)",
        wikiSlug: "Galactic_Zone",
        mainImg: imgData["galactic-zone"][0],
        infoRows: [
            ["種族", "暴走したロボット群"],
            ["区分", "SF・宇宙テーマエリア"],
            ["所在地", "ヌカ・ワールドの西側"],
            ["特記事項", "スターコアの収集クエスト"],
        ],
        body: `
<h2>概要</h2>
<p>ギャラクティックゾーンは、戦前の「宇宙と未来」をテーマにした広大なエリア。現在は管理システム（スター・コントロール）が暴走し、無数の強力な兵器型ロボット軍団がエリア内を徘徊・防衛している極めて危険な無人領域となっています。</p>

<h2>詳細</h2>
<p>このエリアはロボット工学の粋を集めたアトラクションで構成されており、「ヌカ・ギャラクシー」や「ロブコ・バトルゾーン」などが存在しています。しかし、セキュリティシステムが敵対モードで固定されているため、アサルトロンやセントリーボットといった凶悪なロボットが群れを成して襲ってきます。</p>
<p>このエリアの防衛システムを解除してレイダーの拠点にするためには、エリア内の至る所に散らばっている隠しアイテム「スターコア」をかき集め、中央制御室のメインフレームに差し込んでシステムを段階的にハッキングしていくという、大規模な探索パズルをこなす必要があります。</p>
`,
        kanso: "レーザーが飛び交い、アサルトロンが猛スピードで突っ込んでくる恐怖のSFテーマパーク。さらに「あのスターコアあと1個どこだよ！」と永遠に探し回るハメになる、探索の難易度という意味でも非常にやりごたえのあるエリアです。ユニークPA『クアンタム・パワーアーマー』の展示も魅力的。"
    },
    {
        title: "Safari Adventure",
        titleJa: "サファリアドベンチャー",
        slug: "safari-adventure",
        appearance: "Fallout 4 (Nuka-World)",
        wikiSlug: "Safari_Adventure",
        mainImg: imgData["safari-adventure"][0],
        infoRows: [
            ["種族", "ゲータークロー / シートー"],
            ["区分", "動物園テーマエリア"],
            ["所在地", "ヌカ・ワールドの北側"],
            ["特記事項", "クローニングマシンの暴走"],
        ],
        body: `
<h2>概要</h2>
<p>サファリアドベンチャーは、世界中の野生動物を集めたジャングルテーマの動物園エリア。しかし現在は、戦前の狂ったクローン技術によって生み出されたワニのミュータント「ゲータークロー」が大繁殖し、支配する危険地帯となっています。</p>

<h2>詳細</h2>
<p>エリアに入ると、ワニとデスクローが混ざったような凶悪なモンスター「ゲータークロー」が草むらから次々と急襲してきます。<br>このエリア唯一の人間（？）は、戦前に取り残されたゴリラに育てられたというターザンのような野生児「シートー」です。彼と協力してジャングルを探索し、地下にある秘密のクローニング施設を見つけ出し、無尽蔵にゲータークローを生み出し続けている装置を止めなければ、このエリアを制圧することはできません。</p>
<p>パーク内にはジャングルや爬虫類館などの施設が広がっており、シートーという愛すべきキャラクターの存在と相まって、独特の野性味あふれるクエストが展開されます。</p>
`,
        kanso: "「動物園のワニとカメレオンを遺伝子操作してクローン兵器を大量生産した」という戦前のヌカ・コーラ社のイカれた倫理観が生み出した地獄。自然を愛するゴリラ人間のシートーの純粋さに癒やされつつ、ワニの化け物と戦うドタバタジャングル探検が楽しいです。"
    },
    {
        title: "Dry Rock Gulch",
        titleJa: "ドライロックガルチ",
        slug: "dry-rock-gulch",
        appearance: "Fallout 4 (Nuka-World)",
        wikiSlug: "Dry_Rock_Gulch",
        mainImg: imgData["dry-rock-gulch"][0],
        infoRows: [
            ["種族", "ブラッドワーム / プロテクトロン"],
            ["区分", "西部劇テーマエリア"],
            ["所在地", "ヌカ・ワールドの西〜北西側"],
            ["特記事項", "開拓時代のショーと保安官"],
        ],
        body: `
<h2>概要</h2>
<p>ドライロックガルチは、アメリカ開拓時代（ワイルド・ウエスト）をモチーフにした西部劇テーマエリアです。現在は地面から突然飛び出してくる吸血ミミズ「ブラッドワーム」の巨大な巣窟となっており、エリア全体が赤茶けた砂埃に包まれています。</p>

<h2>詳細</h2>
<p>このエリアを制圧するためには、狂暴化していない「保安官役のプロテクトロン」たちの言うことを聞き、彼らの出す「カウボーイのお使い（早撃ちや金庫のパスワード探しなど）」に付き合わなければなりません。<br>ロボットたちは自分たちが西部劇の登場人物であると完全に信じ込んでおり、プレイヤーに対しても西部の法に従った行動を要求してきます（ロボティクスのPerkがあれば強制ハッキングでスキップも可能）。</p>
<p>エリアの最奥にある鉱山には巨大なブラッドワーム・クイーンが待ち受けており、古き良き西部の決闘と、ドロドロのミュータント退治が融合したエリアとなっています。</p>
`,
        kanso: "「イェーハァ！保安官の命令に従え！」とポンコツテンションで話しかけてくるプロテクトロンのカウボーイたちが非常に可愛らしいエリア。足元からウネウネとブラッドワームが飛び出してくるのは気味が悪いですが、西部のガンマンを気どってリボルバーで戦いたくなる良ロケーションです。"
    },
    {
        title: "World of Refreshment",
        titleJa: "ワールド・オブ・リフレッシュメント",
        slug: "world-of-refreshment",
        appearance: "Fallout 4 (Nuka-World)",
        wikiSlug: "World_of_Refreshment",
        mainImg: imgData["world-of-refreshment"][0],
        infoRows: [
            ["種族", "ヌカルーク（ヌカ・コーラ・クアンタムで変異）"],
            ["区分", "飲料工場 / ボートライド"],
            ["所在地", "ヌカ・ワールドの東側"],
            ["特記事項", "クアンタムの川"],
        ],
        body: `
<h2>概要</h2>
<p>ワールド・オブ・リフレッシュメントは、ヌカ・コーラの製造工場をそのままお客様に開放した「工場見学兼ボートライド」のアトラクション。しかし最悪なことに、ここには青く光る『ヌカ・コーラ・クアンタムの川』が流れているため、それを飲んで突然変異した凶悪な「ヌカルーク（マイアルークの亜種）」たちの超危険な巣窟と化しています。</p>

<h2>詳細</h2>
<p>このエリアは大きく「ボートライド（見学ルート）」と「工場内部」の2つに分かれています。<br>アトラクション部分では世界の様々な地域をモチーフにしたセットの中をクアンタムの川が流れており、そこから青く発光するマイアルークや巨大なマイアルーククイーンが飛び出してきます。<br>さらにバックヤードの工場内部に入ると、戦前のヌカ・コーラ社が「新商品の開発に軍事技術を悪用していた」という黒い秘密の数々がターミナルに残されており、シリーズ伝統の企業ブラックジョークを存分に堪能することができます。</p>
`,
        kanso: "「超絶放射能入りの青いコーラ『クアンタム』の川を飲み続けた結果、カニたちが青く発光する最強の怪物になってしまった」という、このゲームでしか絶対に成立しない世界観。工場内の狂った企業機密を読みあさるのも面白く、Nuka-Worldのテーマを最も象徴するエリアです。"
    },
    {
        title: "Nuka-Galaxy",
        titleJa: "ヌカ・ギャラクシー",
        slug: "nuka-galaxy",
        appearance: "Fallout 4 (Nuka-World)",
        wikiSlug: "Nuka-Galaxy",
        mainImg: imgData["nuka-galaxy"][0],
        infoRows: [
            ["種族", "エイリアン型アニマトロニクス / ロボット"],
            ["区分", "屋内型ジェットコースター"],
            ["所在地", "ギャラクティックゾーン内"],
            ["特記事項", "暗闇の宇宙探索アトラクション"],
        ],
        body: `
<h2>概要</h2>
<p>ヌカ・ギャラクシーは、ギャラクティックゾーンの目玉である『超巨大な屋内型・宇宙旅行ジェットコースター』のアトラクション施設です。</p>

<h2>詳細</h2>
<p>内部は宇宙空間を模したブラックライトとネオンサインでド派手に照らされており、飛び交う小惑星や宇宙船のセットが配置されています。<br>しかし、施設の防衛システムが暴走しているため、エイリアンの形をしたキモいアニマトロニクス（機械仕掛けの人形）がレーザー銃を乱射してきたり、ノバ・トロンと呼ばれるタフなロボットたちが次々と襲いかかってきます。</p>
<p>プレイヤーはこのジェットコースターのレール上を歩いて深い暗闇の中を進み、隠された多数の「スターコア」を回収しながら施設の奥の制御室を目指すことになります。また、乗客と一緒に死んでいる戦前の女性（従業員のロゼッタ）の悲劇的なホロテープなども見つかります。</p>
`,
        kanso: "ディズニーの『スペースマウンテン』を完全にFallout仕様の悪趣味なバイオレンスアトラクションに魔改造した大傑作。暗闇の中で輝くUFOのネオンと、おもちゃの光線銃を撃ってくるエイリアン型ロボットの光景は、戦前のレトロフューチャーの極致とも言える美しさです。"
    },
    {
        title: "Nuka-Cade (Nuka-World)",
        titleJa: "ヌカ・ケード",
        slug: "nuka-cade-nuka-world",
        appearance: "Fallout 4 (Nuka-World)",
        wikiSlug: "Nuka-Cade_(Nuka-World)",
        mainImg: imgData["nuka-cade-nuka-world"][0],
        infoRows: [
            ["種族", "フルーツ (店番のプロテクトロン)"],
            ["区分", "アーケード・ゲームセンター"],
            ["所在地", "ヌカ・タウンU.S.A.内"],
            ["特記事項", "チケットで景品交換"],
        ],
        body: `
<h2>概要</h2>
<p>ヌカ・ケード（Nuka-Cade）は、ヌカ・タウンの中央にある巨大な戦前のゲームセンター。ヌカ・トークン（専用コイン）を使って様々なミニゲームを実際に遊ぶことができる、プレイヤーの憩いの場です。</p>

<h2>詳細</h2>
<p>ここでは、モグラ叩き（ワック・ア・コミー）、バスケットボール、射的など、実際にプレイヤーが操作してポイントを稼げるアーケードゲーム筐体が多数設置されています。<br>非常に良く出来たミニゲームであり、優秀な成績を収めるとゲーム機から紙の「ヌカ・ケード・チケット」がジャラジャラと大量に排出されます。<br>このチケットを集めて、施設のカウンターにある巨大な景品交換端末に読み込ませることで、珍しい武器や大量の弾薬、面白いおもちゃなどと交換することが可能です。10万枚チケットを集めるという狂気の（あるいは連射コントローラー必須の）実績・トロフィーも存在します。</p>
`,
        kanso: "荒廃した世界で、レイダーや怪物の死体の山を越えた先にたどり着いた『ゲームセンター』。実際にトークンを入れてバスケのシュート練習をしたり、モグラ叩きを必死にプレイしたりと、童心に帰ってチケットを稼ぐ無駄骨の時間が最高に楽しいオアシスです。"
    },
    {
        title: "Nuka-World power plant",
        titleJa: "ヌカ・ワールド・発電所",
        slug: "nuka-world-power-plant",
        appearance: "Fallout 4 (Nuka-World)",
        wikiSlug: "Nuka-World_power_plant",
        mainImg: imgData["nuka-world-power-plant"][0],
        infoRows: [
            ["種族", "フェラル・グール / (反逆したレイダー)"],
            ["区分", "巨大発電施設"],
            ["所在地", "ヌカ・ワールドの最西端の山"],
            ["特記事項", "全パークの電源復旧のキー"],
        ],
        body: `
<h2>概要</h2>
<p>ヌカ・ワールド・発電所は、マップの最西端の山岳地帯にポツンと建っている強固な施設。ヌカ・ワールド全体の全アトラクションと施設の電力を賄っていた心臓部です。</p>

<h2>詳細</h2>
<p>この施設はDLCのメインストーリーの「最終目的地」となります。<br>パーク内の5つのエリアを制圧してレイダーの各勢力に分配し終え、反乱を起こした勢力（最も取り分が少なかった勢力）をこの場所で鎮圧し、最上階のコントロールルームでメインスイッチをオンにすることで、数十年の沈黙を破ってヌカ・ワールド全体に『光（電力）』が戻ります。</p>
<p>この電力が復旧することで、これまで停止していたエレベーターや、巨大なジェットコースターのアトラクション、一部の扉などが再稼働し、ヌカ・ワールドの真の全貌がアンロックされる仕組みになっています。総支配人としての試金石とも言える最終ダンジョンです。</p>
`,
        kanso: "「テーマパークの支配を巡る血みどろの抗争を終わらせ、総支配人としてメインスイッチを叩き込む」。その瞬間、パーク全体に眩い光が灯り、遠くで観覧車が回り出す演出は感無量の一言。DLCの壮大なフィナーレを飾る、地味ながらも極めて重要な『心臓部』です。"
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
Fallout 4 (Nuka-World)における重要拠点の情報をアーカイブしました。

アーカイブアクセス：
https://www.fallout-jp.com/${article.slug}.html

#Fallout #Fallout4 #フォールアウト #FalloutLore`;
        
        fs.writeFileSync(path.join(xDir, 'post.md'), postStr, 'utf8');

        console.log(`Finished ${article.title}`);
    });
});

tasks.then(() => console.log('All generations completed.'));
