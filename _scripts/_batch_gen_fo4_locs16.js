// _batch_gen_fo4_locs16.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_fo4_locp16.json', 'utf8'));

const articles = [
    {
        title: "Malden Center",
        titleJa: "モールデン・センター",
        slug: "malden-center",
        appearance: "Fallout 4",
        wikiSlug: "Malden_Center",
        mainImg: imgData["malden-center"][0],
        infoRows: [
            ["種族", "シンス (第1・第2世代) / ガンナー"],
            ["区分", "地下鉄の駅"],
            ["所在地", "連邦北部（メッド・テック・リサーチの南）"],
            ["特記事項", "シンスとガンナーの大規模な交戦"],
        ],
        body: `
<h2>概要</h2>
<p>モールデン・センターは、戦前の地下鉄の駅。地下には広大なプラットフォームと列車のトンネルが広がっており、現在はインスティチュートの人造人間（シンス）と傭兵組織「ガンナー」が激しい縄張り争いを繰り広げている激戦区です。</p>

<h2>詳細</h2>
<p>この駅の内部に入ると、至る所でシンス部隊のレーザー火器とガンナーたちの実弾火器が飛び交う激しい戦闘音を耳にします。ガンナー側はタレットを設置するなど拠点を強固に防衛していますが、インスティチュートはテレポートで次々とシンスを送り込んでおり、泥沼の消耗戦が続いています。</p>
<p>最深部にはガンナーの指揮官がおり、彼らを全滅させるか、あるいは両勢力が潰し合うのを漁夫の利で狙うかなど、プレイヤーの立ち回りの自由度が高いダンジョンです。また、地下の線路の途中の小部屋には、発電機とエレベーターの電力を回復させるためのちょっとしたパズル要素が存在します。</p>
`,
        kanso: "「地下鉄の暗闇の中で、青いレーザーと赤い銃火が交差する」。派閥同士の抗争を眺めるのが楽しいFO4ならではの大規模な乱戦の舞台です。ステルス状態で見守り、ガンナーとシンスが共倒れになったあとに悠々と死体から戦利品を漁るのがウェイストランダーの基本ですね。"
    },
    {
        title: "Milton parking garage",
        titleJa: "ミルトン・パーキング・ガレージ",
        slug: "milton-parking-garage",
        appearance: "Fallout 4",
        wikiSlug: "Milton_parking_garage",
        mainImg: imgData["milton-parking-garage"][0],
        infoRows: [
            ["種族", "フェラル・グール"],
            ["区分", "立体駐車場 / 『ソウ』風トラップ迷路"],
            ["所在地", "連邦南部（ファロンデパートのすぐ隣）"],
            ["特記事項", "狂気の迷路と究極の選択"],
        ],
        body: `
<h2>概要</h2>
<p>ミルトン・パーキング・ガレージは、ファロンデパートに併設されている戦前の巨大な立体駐車場の廃墟ですが、FO4の全ロケーションの中でも最も異彩を放つ「狂気のトラップ迷路（通称：ソウ迷路）」として非常に有名な場所です。</p>

<h2>詳細</h2>
<p>この駐車場は、猟奇的な殺人鬼（レイダー？）によって、内部が完全に隔離された「死の迷路」へと改造されています。<br>矢印のペイントに従って進むと、無数の地雷、仕掛け線、飛び出すトラップドア、放射能バレル、爆発するマネキン、火炎放射器など、ありとあらゆる悪趣味なトラップがプレイヤーを殺しにきます。途中の牢屋に閉じ込められたグールなどの演出は、まさにホラー映画『ソウ（SAW）』を彷彿とさせます。</p>
<p>そして最深部のゴールには、左右に2つの「扉とボタン」が用意されており、どちらか一方のボタンを押すと、片方の部屋の扉が開いて貴重な戦利品（核物資や大金）が手に入りますが、もう片方の部屋の戦利品は爆発して燃え尽きるという「究極の2択」を最後に突きつけられます。</p>
`,
        kanso: "FO4の開発者が『おふざけ』と『悪意』を半々で混ぜ合わせて全力で作ったような、伝説の超胸糞＆大パニックアトラクション。足元や天井を常に警戒しながら進む緊張感は尋常ではなく、最後の2択ボタンの前での「どっちを開ければいいんだ！？」という葛藤は最高に楽しいゲーム体験です。"
    },
    {
        title: "Hub 360",
        titleJa: "ハブ360",
        slug: "hub-360",
        appearance: "Fallout 4",
        wikiSlug: "Hub_360",
        mainImg: imgData["hub-360"][0],
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["区分", "戦前の高層ビル / パルクール地帯"],
            ["所在地", "ボストン市街地・金融地区内"],
            ["特記事項", "崩落した高速道路との連結"],
        ],
        body: `
<h2>概要</h2>
<p>ハブ360（Hub 360）は、ボストン金融地区にそびえ立つ、360度のガラス張り展望レストランを備えた戦前の高層ビルの跡地。現在はスーパーミュータントが占拠し、彼らの空中拠点として機能しています。</p>

<h2>詳細</h2>
<p>このビルは、ボストン市街地を「上空の足場」を使って移動するための重要なハブとなっています。<br>崩壊した高速道路の陸橋や、隣接する他のビルから板を渡ってこのビルの屋上・上層階へとアクセスすることができ、そこからさらに別のビルへと飛び移るなど、高低差を利用した「パルクール」のようなスリリングな空中散歩が楽しめます。</p>
<p>ビルの最上階から狙撃してくるスーパーミュータントは地上を歩くプレイヤーにとって非常に厄介であり、下から攻め上がるか、あるいは最初から他のビルを経由して上空から強襲（パワーアーマーを用いた落下攻撃など）を行うか、様々な戦術が考えられます。</p>
`,
        kanso: "ボストンの複雑な地形を堪能できる「空中回廊」の要所。ビルからビルへと飛び移りながら、眼下のレイダーやミュータントを見下ろしつつスナイプするのは、都市型ポストアポカリプスならではの醍醐味です。"
    },
    {
        title: "The Gwinnett Restaurant",
        titleJa: "グウィネット・レストラン",
        slug: "the-gwinnett-restaurant",
        appearance: "Fallout 4",
        wikiSlug: "The_Gwinnett_Restaurant",
        mainImg: imgData["the-gwinnett-restaurant"][0],
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["区分", "レストラン / 醸造所併設"],
            ["所在地", "南ボストン（グウィネット醸造所のすぐ西）"],
            ["特記事項", "未発酵のビールとミュータント"],
        ],
        body: `
<h2>概要</h2>
<p>グウィネット・レストランは、連邦の銘酒「グウィネット・ビール」を製造している巨大な『グウィネット醸造所』に併設・直結している、戦前の公式ビヤホールの廃墟です。</p>

<h2>詳細</h2>
<p>醸造所と同じく、建物の内部はスーパーミュータントたちの巣として完全に荒らされていますが、かつては出来立てのビールをその場で飲めるという大人気の観光名所であったことが、残された看板や飲食スペースの作りから伺えます。<br>内部には大量の空き瓶や、まだ回収されていない戦前のグウィネット・エールなどが散乱しており、ここを探索するだけで大量のアルコール飲料を確保することができます。</p>
<p>建物の裏手にあるパイプを通ることで、隣接する巨大なグウィネット醸造所の内部へと直接侵入することができ、ミュータントの防衛線を強行突破するための裏口としても機能します。</p>
`,
        kanso: "工場見学の後に出来立てのビールが飲める、現実のキリンビール工場のようなコンセプトの戦前の施設の成れの果て。荒れ果てたレストランのテーブルに未だにビール瓶がポツンと置かれている風景を見ると、大戦争の瞬間のパニックが鮮明に目に浮かびます。"
    },
    {
        title: "Trinity Church",
        titleJa: "トリニティ・チャーチ",
        slug: "trinity-church",
        appearance: "Fallout 4",
        wikiSlug: "Trinity_Church",
        mainImg: imgData["trinity-church"][0],
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["区分", "歴史的教会の廃墟"],
            ["所在地", "ボストン・バックベイ地区（トリニティ・タワーの足元）"],
            ["関連", "アステリアのホロテープ"],
        ],
        body: `
<h2>概要</h2>
<p>トリニティ・チャーチは、現実のボストン・コプリー広場に実在する歴史的建造物としても有名な教会の廃墟。ゲーム内では、巨大なトリニティ・タワーのすぐ足元にひっそりと佇んでいます。</p>

<h2>詳細</h2>
<p>内部は崩落が激しく、スーパーミュータントたちの野営地の一部として利用されています。教会の祭壇や長椅子は破壊され、神聖な場所がゴアバッグ（肉の詰まった袋）で汚染されている光景は、ミュータントたちの野蛮さを強調しています。</p>
<p>この教会の内部には、戦後にこの場所に隠れ住んでいたかもしれない「アステリア」という名の人骨（または生存者）に関連するホロテープが落ちていることがあり、荒廃した世界で信仰にすがって生き延びようとした人々のささやかな祈りが残されています。</p>
`,
        kanso: "現実に存在する歴史的な教会がグチャグチャに破壊され、ミュータントの寝床にされているという、Falloutの現実と虚構の交差点。見上げれば巨大なトリニティ・タワーがそびえ立つ、ボストン市街地観光の隠れた名スポットです。"
    },
    {
        title: "Lynn Woods",
        titleJa: "リン・ウッズ",
        slug: "lynn-woods",
        appearance: "Fallout 4",
        wikiSlug: "Lynn_Woods",
        mainImg: imgData["lynn-woods"][0],
        infoRows: [
            ["種族", "レイダー / デスクロー"],
            ["区分", "塔のある森 / 野営地"],
            ["所在地", "パーソンズ州立精神病の西の森"],
            ["特記事項", "塔の上のサイレンと究極の罠"],
        ],
        body: `
<h2>概要</h2>
<p>リン・ウッズ（Lynn Woods）は、鬱蒼とした森の中に戦前の古い石造りの塔（展望塔）がそびえ立つ自然公園の跡地。現在は多数のレイダーが掘っ建て小屋を建てて野営地にしています。</p>

<h2>詳細</h2>
<p>このロケーションは「塔の上のサイレン」による大乱戦のギミックでFO4プレイヤーの間で非常に有名です。<br>このエリアはレイダーの集団だけでなく、周辺に最凶の怪物「デスクロー」が複数生息している危険地帯です。プレイヤーがレイダーたちを倒しながら塔の石階段を最上階まで登りきり、そこにある「回路ブレーカー」をオンにして防空サイレンを鳴らすと、凄まじい大音量に引き寄せられたデスクロー（2体以上）が突如として乱入してきます。</p>
<p>生き残っていたレイダーたちはサイレンの音と共に現れたデスクローに為す術なく切り刻まれ、塔の上にいるプレイヤーを出待ちするという、まさに地獄絵図のような生存競争が繰り広げられます。</p>
`,
        kanso: "「よくわからないスイッチがあったらとりあえず押す」というゲーマーの習性を利用した、ベセスダからの極悪なプレゼント。サイレンの音と共に森の奥からデスクローが猛スピードで突っ込んできてレイダーを紙切れのように引き裂く光景は、絶対に見るべき名シーンです。"
    },
    {
        title: "Boylston Club",
        titleJa: "ボイルストンクラブ",
        slug: "boylston-club",
        appearance: "Fallout 4",
        wikiSlug: "Boylston_Club",
        mainImg: imgData["boylston-club"][0],
        infoRows: [
            ["種族", "なし (白骨死体のみ)"],
            ["区分", "戦前の高級会員制クラブ"],
            ["所在地", "ボストン・コモン（スワンの池）のすぐ東"],
            ["関連", "集団自殺の毒入りワイン"],
        ],
        body: `
<h2>概要</h2>
<p>ボイルストンクラブは、戦前のボストンの政財界のトップや特権階級の富裕層だけが出入りを許されていた、超高級な会員制社交クラブの店舗跡です。</p>

<h2>詳細</h2>
<p>ここは敵が一切出現しない安全なロケーションですが、内部の光景は非常に異様です。豪華なバーカウンターやソファには、タキシードやドレスを着た「大量の白骨死体」がグラスを手にしたまま行儀よく並んで座っています。</p>
<p>ターミナルの記録によれば、大戦争が起きて世界が崩壊したことを悟ったVIP会員たちは、「ミュータントや無法者の溢れる外の世界で苦しむくらいなら、自分たちらしく最高級のワインを飲んで優雅に死のう」と決断し、毒（致死量の睡眠薬など）を混ぜたワインで最後に乾杯し、全員で集団自殺を遂げたのです。<br>店内には彼らが最後に口をつけた「毒入りのワイン」のボトルがいまだに大量に残されています（飲むと強烈なダメージを受けます）。</p>
`,
        kanso: "「狂った終末世界における、富裕層たちの最後のプライドと結末」。敵が一切出ない静寂と、綺麗に並んだ骨とワイングラスだけが、戦前のエリートたちの絶望を雄弁に物語っています。Fallout特有のブラックで切ない世界観が120%発揮された屈指の隠れ名所です。"
    },
    {
        title: "Gorski cabin",
        titleJa: "ゴルスキーの小屋",
        slug: "gorski-cabin",
        appearance: "Fallout 4",
        wikiSlug: "Gorski_cabin",
        mainImg: imgData["gorski-cabin"][0],
        infoRows: [
            ["種族", "フェラル・グール（ウェイン・ゴルスキー）"],
            ["区分", "森の小屋 / 手作りの地下バンカー"],
            ["所在地", "コンコードの南側"],
            ["関連", "爆弾の解体と妄想"],
        ],
        body: `
<h2>概要</h2>
<p>ゴルスキーの小屋は、サンクチュアリの南、ドラムリン・ダイナーのすぐ近くにある何の変哲もない小さな森の木こり小屋。しかしその地下には、個人の手作りとしては異常な規模の施設が隠されています。</p>

<h2>詳細</h2>
<p>小屋の中にあるハッチを開けると、戦前にこの小屋の主だった「ウェイン・ゴルスキー」という男が独学で掘り進めた、広大で不気味な地下バンカーが広がっています。<br>ターミナルの記録を読むと、彼は重度の政府陰謀論者であり、「自分は連邦政府から電波で洗脳され監視されている」という妄想に取り憑かれ、電波を防ぐための地下要塞を長年掘り続けていたことが分かります。</p>
<p>彼は近所の鉄塔が洗脳電波のアンテナだと思い込み、それを爆破するために手作りの核爆弾（ミニ・ヌークの部品）を収集していましたが、結局その目標を達成する前に大戦争による『本物の核爆弾』が落下。皮肉にも、彼の無意味だった秘密基地が本当に彼を核から守り、その地下で彼は200年の間孤独に狂いながらグール化し、今もウロウロしています。</p>
`,
        kanso: "「重度の陰謀論者が妄想で作ったシェルターが、予期せず彼を本物の終末から救ってしまった」という激ヤバな皮肉ストーリー。地下で一人ぼっちでグールになったゴルスキーの姿と、彼が集めていた大量のガラクタと爆弾の部品から、人間の狂気の深淵を覗き見ることができます。"
    },
    {
        title: "Ranger cabin",
        titleJa: "レンジャーの小屋",
        slug: "ranger-cabin",
        appearance: "Fallout 4",
        wikiSlug: "Ranger_cabin",
        mainImg: imgData["ranger-cabin"][0],
        infoRows: [
            ["種族", "なし (時にマイアルークなど)"],
            ["区分", "自然公園の管理人小屋"],
            ["所在地", "アバナシーファームの南西の森"],
            ["関連", "家出少女のホロテープ"],
        ],
        body: `
<h2>概要</h2>
<p>レンジャーの小屋は、連邦北西部の森の奥深くにポツンと建っている、かつて自然公園の管理人（パークレンジャー）が使用していた小さな丸太小屋の廃墟です。</p>

<h2>詳細</h2>
<p>小屋の中には白骨死体が1つと、古いベッド、そして「家出少女のホロテープ」というアイテムが残されています。<br>このホロテープを再生すると、戦前に親の過干渉に耐えきれずに家出し、この誰もいないレンジャー小屋に身を隠した少女の震える声が聞こえてきます。<br>彼女は「ここなら誰も見つけられないから大丈夫」と自分に言い聞かせていましたが、ホロテープの最後には、遠くで鳴り響く『大戦争の核爆発のサイレン』の音と、何が起きたのか理解できずに混乱する彼女の叫び声がそのまま録音されています。</p>
<p>彼女の一番の悲劇は、家出をして数時間後という最悪のタイミングで世界が滅亡してしまい、家族に謝ることも、親と二度と会うこともできずに、たった一人で森の中で核の炎と放射能に焼かれて死ぬしかなかったという事実です。</p>
`,
        kanso: "Fallout 4で最もプレイヤーの心をえぐるホロテープの一つ。親への反抗心で飛び出した数時間後に核サイレンが鳴り響くという絶望のタイミング。彼女の震える声を背に、小屋に横たわる小さな白骨死体を見つめる時間は、核戦争の不条理を痛感させられます。"
    },
    {
        title: "Westing Estate",
        titleJa: "ウェスティング・エステート",
        slug: "westing-estate",
        appearance: "Fallout 4",
        wikiSlug: "Westing_Estate",
        mainImg: imgData["westing-estate"][0],
        infoRows: [
            ["種族", "マイアルーク / マイアルークキング"],
            ["区分", "水没した高級邸宅 / 野球選手の家"],
            ["所在地", "チャールズ川沿い（ダイアモンドシティの西）"],
            ["関連", "モー・クローマーからの依頼 / 野球のお宝"],
        ],
        body: `
<h2>概要</h2>
<p>ウェスティング・エステートは、完全に水没してしまったチャールズ川周辺の低地に建つ、かつての大富豪の屋敷です。戦前の有名プロ野球選手「ウェスティング」の自宅でした。</p>

<h2>詳細</h2>
<p>現在、屋敷の1階部分や周辺の敷地は完全に浸水しており、巨大なマイアルークたちが卵を産み付ける巣と化しています。<br>ダイアモンドシティのベースボール用品商人であるモー・クローマーから、「戦前の伝説の野球選手に関するお宝（グローブやサインボール等）を取ってきてくれ」という依頼（Out in Left Field）を受けた際に訪れる場所です。</p>
<p>屋根や倒木を使って水没した足場を進み、最深部の金庫から「サイン入りのキャッチャーミット」や「サイン入りのベースボールカード」など、往年のファン垂涎の超プレミアアイテム（戦後ではただのガラクタですが）を回収します。</p>
`,
        kanso: "「水没した豪邸に住むカニのバケモノをなぎ倒して、戦前の野球選手のサインボールを回収する」。アメリカの国民的スポーツへの並々ならぬ敬意と、それが完全に無価値になったポストアポカリプスのシュールなユーモアが混ざり合った、探索の楽しいお屋敷です。"
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
