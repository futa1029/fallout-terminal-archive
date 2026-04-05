// _batch_gen_nv_chars5.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_nv_char5.json', 'utf8'));
imgData["dr-henry"] = ["Doctor_Henry.jpg"]; // Manual fix

const articles = [
    {
        title: "Oliver Swanick",
        titleJa: "オリバー・スワニック",
        slug: "oliver-swanick",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Oliver_Swanick",
        mainImg: imgData["oliver-swanick"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "パウダーギャング (第14ブロック出身)"],
            ["役職", "ニプトンの宝くじの1等賞当選者"],
            ["関連", "Yeeeeeaaaahhh!!"],
        ],
        body: `
<h2>概要</h2>
<p>オリバー・スワニック（Oliver Swanick）は、壊滅した町「ニプトン」から一人だけ満面の笑みで飛び出してきたパウダーギャングのレイダーです。<br>この世のすべてを手に入れたかのような圧倒的なハイテンション状態にあります。</p>

<h2>詳細</h2>
<p>彼はシーザー・リージョンの悪辣な部隊（ヴルペス・インカルタ）によってニプトンの町が「宝くじ（くじ引きによる死刑宣告）」として虐殺された際、唯一『無傷での生還』を意味する1等賞のクジを引き当てた男です。<br>「ははっ！！俺は勝者だ！！こんな素晴らしい宝くじを見たことがあるか！？空気を吸い込むのがこんなに美味いなんて知らなかったぜッ！！」と歓喜の咆哮を上げながら、主人公の目の前を通り過ぎて西の荒野へと走り去っていきます。</p>
<p>……しかし、彼が走り去った先（西側の砂漠）には巨大なラッドスコルピオンの生息地が広がっており、プレイヤーが見逃して彼を見守っていると、およそ数十秒後にはラッドスコルピオンの毒針で全身を刺されて惨死するという、オチのついた末路を辿ることで有名です。</p>
`,
        kanso: "「フウッハッッッハア！！空気がうめぇ！！」だけでお馴染みの伝説のネタキャラ。彼が飛び出してきた直後にプレイヤーは地獄絵図のニプトンを見ることになるため、彼のテンションとの温度差で風邪を引きます。彼の宝くじ（ただのチケット）をスリ取ろうとして、うっかりV.A.T.S.で彼の顔面を吹き飛ばしてしまった運び屋は数知れません。"
    },
    {
        title: "Motor-Runner",
        titleJa: "モーターランナー",
        slug: "motor-runner",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Motor-Runner",
        mainImg: imgData["motor-runner"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "フィーンド (Fiends)"],
            ["役職", "最高指導者 (ボス)"],
            ["関連", "Vault 3 / 愛犬"],
        ],
        body: `
<h2>概要</h2>
<p>モーターランナー（Motor-Runner）は、モハビ最大の薬物狂いのレイダー集団「フィーンド」の最高指導者であり、彼らが占拠している「Vault 3」の最奥部に陣取っているボスです。</p>

<h2>詳細</h2>
<p>常にヘルメットを被り、右手には強力なチェーンソー（たまに別の武器）を構えています。<br>彼はフィーンドの中で最も恐れられている存在ですが、実は彼自身は薬物（ドラッグ）にはそれほど依存しておらず、ただ単に「大量に暴力と薬物を欲するイカれた部下たちを暴力で支配し、グレート・カーンズからの麻薬取引を管理している」という、冷静でビジネスライクな知能を持ち合わせています。<br>また、足元には彼の愛犬である二匹の番犬（ボーンジョーズとガッシュ）を常に侍らせており、犬に対しては本物の愛情を持っているようです。</p>
<p>NCR軍からは最優先の暗殺対象として賞金首（バウンティハント）に指定されており、多くのプレイヤーが彼の首（証拠品となるヘルメット等）を求めてVault 3の奥深くへと足を踏み入れることになります。</p>
`,
        kanso: "フィーンドという常にヒャッハーしているイカれた集団を束ねるためには、一番イカれた奴ではなく『一番冷静に暴力を振るえる奴』が必要である、という組織論の体現者。彼の飼い犬を先に倒してしまうと、冷静さを失って本気で怒り狂います。"
    },
    {
        title: "Cook-Cook",
        titleJa: "クック・クック",
        slug: "cook-cook",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Cook-Cook",
        mainImg: imgData["cook-cook"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "フィーンド (Fiends)"],
            ["役職", "幹部 (火炎放射器とレイプの専門家)"],
            ["関連", "クィーンという愛牛"],
        ],
        body: `
<h2>概要</h2>
<p>クック・クック（Cook-Cook）は、モハビの中央付近（サウスベガス周辺）を徘徊しているフィーンドの幹部の一人。凄腕の料理人であり、火炎放射器の達人でもあり、極悪非道なレイプ魔です。</p>

<h2>詳細</h2>
<p>彼はNCRの兵士たちにとっても悪夢のような存在です。特にNCR第1狙撃大隊の女性スナイパー「ベッツィ」はかつて彼に捕まり、凄惨な性的暴行を受けたトラウマに現在も苦しんでいます。<br>彼自身は完全に薬物で頭が狂っており、常に「肉を焼け！肉を焼け！」と叫びながら火炎放射器（インシネレーター）を探す敵味方問わず焼き尽くそうとします。</p>
<p>そんな極悪非道な彼ですが、なんと「クィーン」という名のペットのブラミン（双頭の牛）だけは異常なほど愛しており、大切に飼育しています。<br>そのため、彼との戦闘において「彼の大切なペットの牛（クィーン）を真っ先に射殺する」と、彼は発狂して周りの味方（フィーンドの仲間）を火炎放射器で見境なく焼き殺し始めるという特殊な弱点が存在します。</p>
`,
        kanso: "Fallout屈指の「最悪の人間のクズ」の一人。彼の悪事に苦しめられたNPCが多数存在するため、彼をステルス狙撃で処刑した時のスカッと感は格別です。一番残酷な倒し方は、愛牛のクィーンをスナイパーライフルでミンチにして彼が発狂して仲間と殺し合うのを遠くから眺めることです。"
    },
    {
        title: "Driver Nephi",
        titleJa: "ドライバー・ネフィ",
        slug: "driver-nephi",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Driver_Nephi",
        mainImg: imgData["driver-nephi"][1], // Driver_Nephi_NoHelmet.jpg
        infoRows: [
            ["種族", "人間"],
            ["所属", "フィーンド (Fiends)"],
            ["役職", "幹部 (ゴルフクラブの処刑人)"],
            ["関連", "ネフィのゴルフクラブ / 第1狙撃大隊"],
        ],
        body: `
<h2>概要</h2>
<p>ドライバー・ネフィ（Driver Nephi）は、フィーンドの3大幹部の一人であり、サウスベガス周辺の廃墟を拠点にNCR軍と毎日散発的な激戦を繰り広げている男です。「ゴルフクラブ」を愛用する近接戦闘の狂人です。</p>

<h2>詳細</h2>
<p>彼は「ネフィのゴルフクラブ」という名前の付いた特殊な9番アイアン（ゴルフクラブ）を常に持ち歩いており、銃を持った重武装のNCR兵士たちの頭を、このゴルフクラブで物理的にフルスイングしてかち割るという恐ろしい神業を持っています。<br>彼は過去にNCRの部隊を単身で壊滅させたこともあり、兵士たちからはクック・クックに並ぶ恐るべき脅威として賞金がかけられています。</p>
<p>彼を討伐するクエスト（Three-Card Bounty）では、ただ純粋に殴り合って彼の首（頭部）を持ち帰ることも可能ですが、近くに駐留している「NCR第1狙撃大隊の精鋭スナイパー部隊」を囮として使い、彼を引きずり出して大隊の十字砲火（集中狙撃）によって蜂の巣にするという、軍隊らしい痛快な討伐方法も用意されています。</p>
`,
        kanso: "「薬物でキメた状態のフルスイングのゴルフクラブは、アサルトライフルよりも強い」という、Fallout世界における近接脳筋のロマンを体現するボス敵。彼から奪ったゴルフクラブで敵の頭を吹き飛ばすのは、近接ビルド運び屋の定番ルートです。"
    },
    {
        title: "Follows-Chalk",
        titleJa: "フォローズ・チョーク",
        slug: "follows-chalk",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Follows-Chalk",
        mainImg: imgData["follows-chalk"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "デッドホース（ザイオンの部族）"],
            ["役職", "コンパニオン / 偵察兵"],
            ["関連", "DLC: Honest Hearts / 文明への憧れ"],
        ],
        body: `
<h2>概要</h2>
<p>フォローズ・チョーク（Follows-Chalk）は、DLC『Honest Hearts』の舞台であるザイオン国立公園でプレイヤーが出会う、現地の部族「デッドホース」の青年偵察兵です。</p>

<h2>詳細</h2>
<p>部族の伝統的なペイント（白墨＝チョーク）を顔に施し、ザイオンの険しい地形を案内してくれる優秀なガイドでありコンパニオンです。<br>彼は外部の世界（モハビや文明の残り香）に対して非常に強い好奇心を抱いており、プレイヤーに対して「外の世界では、水はどうやって飲むんだ？」「飛行機という空飛ぶ機械は本当にあったのか？」と、純粋な質問を無邪気に繰り返します。</p>
<p>彼は自分の部族の狭い世界観や掟に少し退屈さを感じており、「外の世界へ旅に出たい」という強い願望を持っています。<br>プレイヤーは彼に対して、その夢（文明世界への探求）を後押しするか、あるいは「外の世界は危険だ」と故郷（部族の掟）に従うよう諭すかを選ぶことになります。彼にとっての『初めての外国人』であるプレイヤーの言葉は、彼の人生を決定づける重みを持ちます。</p>
`,
        kanso: "DLC開始直後、ホワイトレッグスの銃撃で死にそうになっているプレイヤーの背後に現れ、一撃で敵の頭を吹き飛ばして助けてくれる超イケメンな部族の若者（しかもなぜか最初からめちゃくちゃ英語が流暢）。彼の純粋さと文明世界への憧れは、滅びた世界における「希望」そのものです。"
    },
    {
        title: "Daniel",
        titleJa: "ダニエル",
        slug: "daniel-honest-hearts",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Daniel_(Honest_Hearts)",
        mainImg: imgData["daniel-honest-hearts"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "ニュー・カナーン (モルモン教徒)"],
            ["役職", "ソローズ部族の指導者 / 宣教師"],
            ["関連", "DLC: Honest Hearts / 徹底した非暴力主義"],
        ],
        body: `
<h2>概要</h2>
<p>ダニエル（Daniel）は、DLC『Honest Hearts』におけるもう一人のキーパーソン。ニュー・カナーンの生き残りにして、ザイオン国立公園に住む無垢な部族「ソローズ」を導き、守ろうとしている敬虔なモルモン教の宣教師です。</p>

<h2>詳細</h2>
<p>同じニュー・カナーンの同胞であるジョシュア・グラハムが「神の鉄槌（暴力による外敵の徹底排除）」を主張しているのに対し、彼ダニエルは徹底して「平和主義と非暴力（逃避）」を主張しています。<br>彼は純真無垢なソローズの部族に「人殺しの業（穢れ）」を負わせることを何よりも恐れており、敵対部族であるホワイトレッグスの侵攻に対しては、ザイオンの地を捨ててでも新しい安住の地へと皆で逃げ出すべきだとプレイヤーに説き続けます。</p>
<p>しかし、彼の非暴力主義は時として「ただ問題を先送りにして逃げているだけではないか」「彼ら自身の生きる力を奪っているのではないか」という厳しい批判にも晒されます。<br>ジョシュアの「戦って故郷を守る」道を選ぶか、ダニエルの「不殺と逃亡」の道を選ぶかが、本DLC最大のクライマックスでの思想的ジレンマとなります。</p>
`,
        kanso: "「無知であること＝神聖であること」だと信じて過保護な親のように部族を守ろうとする宣教師。彼の優しさは本物ですが、残酷なウェイストランドにおいては彼の「純粋な非暴力主義」がいかに危うく不自然なものであるか、プレイヤーは嫌というほど実感することになります。"
    },
    {
        title: "Red Lucy",
        titleJa: "レッド・ルーシー",
        slug: "red-lucy",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Red_Lucy",
        mainImg: imgData["red-lucy"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "ザ・ソーン (地下闘技場)"],
            ["役職", "闘技場の女主人"],
            ["関連", "クリーチャー同士のデスマッチ / ブリード（交尾）"],
        ],
        body: `
<h2>概要</h2>
<p>レッド・ルーシー（Red Lucy）は、ウェストサイドの地下に広がるクリーチャー専門の地下闘技場「ザ・ソーン（The Thorn）」を取り仕切る妖艶な女主人です。</p>

<h2>詳細</h2>
<p>彼女は獰猛な生物の「血統（ブリード）」と闘争に異常なフェティシズムと情熱を注いでおり、地下闘技場で最も偉大で獰猛なクリーチャー同士の生き残り戦を永遠に続けることを人生の目的にしています。<br>プレイヤーは彼女の依頼を受け、モハビの各地から強力なクリーチャーの「卵（ジャイアントマンティス、ラッドスコルピオン、カザドア、デスクロー等）」を集めてくる非常に危険なクエスト（Bleed Me Dry）に挑むことになります。</p>
<p>彼女はただの危ない闘技場のオーナーではなく、依頼を達成するごとにプレイヤーに気前の良い報酬（キャップと弾薬、そしてユニークなハンティングショットガン「ディナーベル」）を与えてくれます。<br>さらに、最難関である「デスクローの卵」を持ち帰ることに成功したプレイヤーは、最上級の賞賛とともに、彼女自身との『特別な一夜（ブリードの儀式）』を賜ることになります。</p>
`,
        kanso: "デスクローの卵というモハビ最大のデスゲームを要求してくる妖艶なマダム。巨大昆虫やクリーチャーの生態にやたらとロマンティックな独自の解釈を語る彼女は、危険な地下闘技場というロケーションに最高の色気を添える名キャラクターです。"
    },
    {
        title: "Orion Moreno",
        titleJa: "オリオン・モレノ",
        slug: "orion-moreno",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Orion_Moreno",
        mainImg: imgData["orion-moreno"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "エンクレイヴ・レムナント (残党)"],
            ["役職", "元パイロット / 重装歩兵"],
            ["関連", "アーケイドのコンパニオンクエスト / 旧アヴァロン"],
        ],
        body: `
<h2>概要</h2>
<p>オリオン・モレノ（Orion Moreno）は、モハビに隠れ住む高齢の老人の一人。……しかしその正体は、かつて西海岸を恐怖で支配した悪の組織『エンクレイヴ』の精鋭部隊の生き残り（レムナント）です。</p>

<h2>詳細</h2>
<p>アーケイド・ギャノンのクエスト「For Auld Lang Syne」で訪れる彼の家には、彼がエンクレイヴであった証拠が大量に隠されています。<br>彼はかつての仲間達（ナヴァロの基地で戦った将兵たち）が、新カリフォルニア共和国（NCR）によって無慈悲に虐殺された過去を絶対に忘れておらず、NCRに対して心からの激しい憎悪を剥き出しにしています。</p>
<p>クエストの終盤、集合したレムナント（残党）たちと共にフーバーダムの戦いで「NCR側」か「リージョン側」のどちらに加勢するかを決める際、彼に『NCRの味方をしろ』と命令すると、モレノは「それは我々の死んだ同胞への裏切りだ！」と激怒し、即座にパワーアーマーを装着してプレイヤーに殺し合い（決闘）を挑んできます。<br>非常に高いSpeechスキルがあれば、彼を説得して共闘させることも可能です。</p>
`,
        kanso: "「昔の悪の軍団の残党のおじいちゃん達が大集合する」という胸熱クエストの中で、ただ一人「絶対にNCRを許さない」というエンクレイヴとしての矜持と怨念を持ち続けた老人。彼の決意は悪党としての意地であり、彼とパワーアーマーで死合を行う展開は非常にドラマチックです。"
    },
    {
        title: "Dr. Henry",
        titleJa: "Dr. ヘンリー",
        slug: "dr-henry",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Henry_(Fallout:_New_Vegas)",
        mainImg: imgData["dr-henry"][0], // Manual fix
        infoRows: [
            ["種族", "人間"],
            ["所属", "エンクレイヴ・レムナント / (ジェイコブズタウン)"],
            ["役職", "研究者 / 医師"],
            ["関連", "スーパーミュータントの治療 / サイバードッグの修復"],
        ],
        body: `
<h2>概要</h2>
<p>Dr.ヘンリー（Henry）は、ジェイコブズタウンのロッジ兼診療所に常駐し、スーパーミュータント（ナイトキン）の精神疾患の治療研究をしている老練な医師です。<br>コンパニオンの愛犬「レックス」の脳移植手術を行ってくれる頼れる名医でもあります。</p>

<h2>詳細</h2>
<p>元々は、戦前の技術を独占していた『エンクレイヴ』に所属する天才的な生体科学者の一人であり、『Fallout 2』にも登場した古参のキャラクターです（当時からサイバードッグの研究をしていました）。<br>現在はエンクレイヴを離れ、純粋に「病に苦しむミュータントたちを医学で救う」という大義のために、ジェイコブズタウンのリーダーであるマーカスと協力して研究を続けています。</p>
<p>研究のためには多少の危険（ステルスボーイを使った生体実験など）も厭わないため、プレイヤーは彼に協力して危険な洞窟へ生体サンプルの採取に向かうことになります。<br>また、彼もまた「エンクレイヴ・レムナント（残党）」の一人であり、アーケイドのクエストの進行によって、懐かしきパワーアーマーを再び身に纏ってフーバーダムに降下してきます。</p>
`,
        kanso: "FO2からの続投キャラであり、シリーズファンにはたまらない超優秀なおじいちゃん研究者。かつては傲慢なエンクレイヴの科学者だった彼が、今はミュータントの命を救うために僻地で一人研究に没頭しているという人生の軌跡は、Falloutの時間の流れとキャラクターの成長を感じさせます。"
    },
    {
        title: "Beagle",
        titleJa: "ビーグル保安官補",
        slug: "beagle",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Beagle",
        mainImg: imgData["beagle"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "プリム"],
            ["役職", "保安官「補」"],
            ["関連", "脱走囚の捕虜 / 情けない男"],
        ],
        body: `
<h2>概要</h2>
<p>ビーグル（Beagle）は、ゲーム序盤に訪れる町「プリム」の自称・代理保安官です。<br>パウダーギャング（脱走囚）たちにカジノ内に監禁されており、プレイヤーが最初に人質救出を行うことになる対象人物です。</p>

<h2>詳細</h2>
<p>「保安官補」という勇ましい肩書きを持っていますが、プリムの本当の保安官（彼の上官であり義理の親戚）がパウダーギャングに殺された際、彼は町を助けるどころか真っ先に隠れようとし、あっさりと捕まってしまいました。<br>非常に卑屈で弱気な性格であり、プレイヤーが助け出すと「や、やった！助かった！君は盾になってくれ、俺は外へ逃げる！」と見事なまでのヘタレぶりを発揮します。</p>
<p>彼は「ベニー（運び屋を撃ったチェックの背広の男）」が行く先を事前に盗み聞きして手帳にメモしており、プレイヤーのメインクエストを進行させるための重要な情報源となります。プレイヤーはスリやSpeechでその情報を聞き出すか、あるいは彼を見殺しにして手帳だけを死体から回収するかを選ぶことができます。</p>
`,
        kanso: "「FOシリーズにおける情けない小悪党・ヘタレNPC」の模範的な存在。せっかく助けてあげてもお礼一つ言わず、隠れてばかりいる彼を見て、『もういいや、こいつ撃ち殺して手帳だけ取ろう』とダークサイドに堕ちる初心者運び屋を量産した罪深い男です。"
    }
];

let tasks = Promise.resolve();

articles.forEach(article => {
    tasks = tasks.then(async () => {
        console.log(`Processing ${article.title}...`);
        
        let imgUrl = null;
        let ext = '.jpg';
        
        if (article.mainImg) {
            imgUrl = await getImageUrl(article.mainImg);
        }
        
        if (imgUrl) {
            let extMatch = imgUrl.match(/\.([a-zA-Z0-9]+)(?:[\?\/]|$)/);
            if (extMatch) ext = '.' + extMatch[1];
        } else {
            console.log(`Warning: Failed to get URL for ${article.mainImg || 'UNKNOWN'}. Will try PNG fallback if valid string.`);
            if (typeof article.mainImg === 'string' && article.mainImg.endsWith('.jpg')) {
                url = await getImageUrl(article.mainImg.replace('.jpg', '.png'));
                if (url) {
                    imgUrl = url;
                    ext = '.png';
                }
            } else if (!article.mainImg || article.mainImg.length === 0) {
                 if (article.slug === 'dr-henry') {
                     imgUrl = await getImageUrl('Doctor_Henry.jpg');
                     if (imgUrl) { console.log('Resolved Dr Henry manually.'); }
                 }
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
            .replace(/<body data-article-category=".*?" data-article-appearance=".*?">/, `<body data-article-category="人物" data-article-appearance="${article.appearance}">`);

        fs.writeFileSync(`f:/Fallout/${article.slug}.html`, html, 'utf8');

        // X post
        const xDir = path.join('F:/Fallout', '_X', article.slug);
        fs.mkdirSync(xDir, { recursive: true });
        
        let postStr = `【Fallout Terminal データベース更新】 📡
【CHARACTER: ${article.titleJa}】
Fallout: New Vegasの主要キャラクター情報のアーカイブを追加完了しました。

アーカイブアクセス：
https://www.fallout-jp.com/${article.slug}.html

#Fallout #FalloutNewVegas #フォールアウト #FalloutLore`;
        
        fs.writeFileSync(path.join(xDir, 'post.md'), postStr, 'utf8');

        console.log(`Finished ${article.title}`);
    });
});

tasks.then(() => console.log('All generations completed.'));
