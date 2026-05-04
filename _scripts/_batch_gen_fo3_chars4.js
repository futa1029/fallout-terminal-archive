// _batch_gen_fo3_chars4.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_fo3_char4.json', 'utf8'));

// Manual overrides
imgData["pinkerton"] = ["Fo3_Pinkerton.png", "Pinkerton.png"];
imgData["dave-fo3"] = ["Dave.jpg"];
imgData["sydney"] = ["Sydney.jpg"];

const articles = [
    {
        title: "Dave",
        titleJa: "デイブ大統領",
        slug: "dave-fo3",
        appearance: "Fallout 3",
        wikiSlug: "Dave_(Fallout_3)",
        mainImg: imgData["dave-fo3"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "デイブ共和国"],
            ["役職", "大統領 (終身)"],
            ["関連", "ワンマンアーミー / 俺の国"],
        ],
        body: `
<h2>概要</h2>
<p>デイブ（Dave）は、キャピタル・ウェイストランドの北東の端に存在する『デイブ共和国』のリパブリック（共和国）大統領です。<br>この「国」の人口はわずか数十人（全員が彼自身の家族や親族）であり、彼一人による完全な独裁国家です。</p>

<h2>詳細</h2>
<p>彼は「正当な民主主義に基づいた選挙」によって大統領の座に就いていると豪語していますが、実際には彼以外の候補者は出馬を許されず、もし投票で彼以外に票が入れば即座に開票をごまかす（あるいは追放処置をとる）という徹底した独裁を行っています。<br>非常に傲慢で尊大であり、「この荒野で最も安全で完璧な国」と自分の国を自画自賛していますが、実際はただのフェンスで囲われた小さな集落です。</p>
<p>クエスト『You Gotta Shoot 'Em in the Head』で彼のもとを訪れ、彼の持つ特別な鍵を奪うことになります。<br>また、プレイヤーが彼の大統領選挙の「不正投票（対抗馬への支援）」を成功させて彼を落選させると、デイブは深い絶望と共に「ここはもう私の愛した国ではない！ 新たな国（オールド・オルニー）を建国する！」と叫んで一人で荒野へ去っていきます。<br>（※なおオールド・オルニーはデスクローの巨大な巣窟であり、彼は十中八九そこでデスクローに引き裂かれて命を落とします）。</p>
`,
        kanso: "「俺の国、俺のルール、俺が法律だ」という世紀末の身の程知らずを地でいくおじいちゃん。彼の死体を漁ると、オールド・オルニーに『新デイブ共和国』を建国しようとしていた詳細な計画書（メモ）が手に入り、そのあまりの滑稽さと哀愁に多くのプレイヤーが笑いを誘われました。"
    },
    {
        title: "Roy Phillips",
        titleJa: "ロイ・フィリップス",
        slug: "roy-phillips",
        appearance: "Fallout 3",
        wikiSlug: "Roy_Phillips",
        mainImg: imgData["roy-phillips"][0],
        infoRows: [
            ["種族", "グール"],
            ["所属", "テンペニータワーの地下 (ワーリントン駅)"],
            ["役職", "グール達の過激派リーダー"],
            ["関連", "フェラル・グール・マスク / 虐殺"],
        ],
        body: `
<h2>概要</h2>
<p>ロイ・フィリップス（Roy Phillips）は、テンペニータワーに入ることを拒絶され、地下の地下鉄駅（ワーリントン駅）に身を潜めているグール達のリーダーです。</p>

<h2>詳細</h2>
<p>彼はテンペニータワーの住人たちが「グールだから」という理由だけで自分たちを差別し、入居を拒否していることに対して非常に強い怒りを抱いています。<br>主人公が彼のもとを訪れると、彼は「タワーの地下の電子ロックを解除してくれ。フェラル・グール（自我を失った凶暴なゾンビ）の群れをタワーになだれ込ませて、あの金持ちのレイシスト共を皆殺しにしてやる」という恐ろしい計画を持ちかけてきます。</p>
<p>プレイヤーは、彼の計画に加担してテンペニータワーをフェラル・グールの地獄絵図に変えるか、彼らを平和的にタワーに入居させるよう「住人の差別主義者側を説得（または暗殺）」して和解の道を探すかを選ぶことになります。<br>しかし『平和的解決』を選んでタワーにグールと人間を共存させたとしても、数日後にタワーを訪れると、結局ロイたちがテンペニーを含む『すべての人間の住人』を皆殺しにして地下室へ死体を投げ捨てているという、FO3で最も後味の悪い胸糞結末（バッドエンド）が待っています。</p>
`,
        kanso: "「人間対グールの差別問題」という重いテーマを提示しつつ、「差別されていた弱者（グール）側も、結局は同じくらい残酷な人間性（バケモノ）だった」というFallout特有のダークな現実を突きつけてくる男。この衝撃的な『平和的解決の末路』は、多くの善人プレイヤーに深い心の傷を残しました。"
    },
    {
        title: "Sticky",
        titleJa: "スティッキー",
        slug: "sticky",
        appearance: "Fallout 3",
        wikiSlug: "Sticky",
        mainImg: imgData["sticky"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "リトル・ランプライト -> ビッグタウン"],
            ["役職", "16歳になった追放者"],
            ["関連", "パーティーハット / イラつく喋り方"],
        ],
        body: `
<h2>概要</h2>
<p>スティッキー（Sticky）は、リトル・ランプライトの集落に住んでいた、頭にパーティーハット（三角帽子）を被って甲高い声で喋る16歳の少年です。</p>

<h2>詳細</h2>
<p>リトル・ランプライトでは「16歳になると『大人（マンゴ）』として追放される」という掟があり、彼もちょうど誕生日を迎えて追放されることになりました。<br>しかし外の危険なウェイストランドを一人で歩く度胸がないため、主人公に対して「僕を安全な大人の町（ビッグタウン）まで護衛して連れて行ってよ！」と頼み込んできます。</p>
<p>護衛クエスト自体は単純な目的地への移動ですが、問題は彼が道中ずっと「ねえ！ビッグタウンってどんな所かな！？」「本当に安全なんだよね！？」「ねえねえ！！」と同じセリフや昔話を弾丸のように喋り続けるという『キャピタル・ウェイストランドで最もウザいNPC』だという点です。<br>彼のあまりに鬱陶しいお喋りに耐えきれず、道中のスーパーミュータントの群れの中にわざと突っ込ませて彼を『事故死』させた運び屋が後を絶ちません。</p>
`,
        kanso: "「FOシリーズの護衛対象はだいたいめんどくさい」という法則を作った生ける伝説。無事にビッグタウンまで送り届けるとお礼（パーティーハット等）をくれますが、その後彼はビッグタウンがミュータントに襲撃された際に真っ先に連れ去られるという悲惨な運命が待っていることが多いです。"
    },
    {
        title: "Gob",
        titleJa: "ゴブ",
        slug: "gob",
        appearance: "Fallout 3",
        wikiSlug: "Gob",
        mainImg: imgData["gob"][0],
        infoRows: [
            ["種族", "グール"],
            ["所属", "メガトン (モリアティの酒場)"],
            ["役職", "バーテンダー / 居候"],
            ["関連", "アンダーワールドの出身 / 心優しき男"],
        ],
        body: `
<h2>概要</h2>
<p>ゴブ（Gob）は、メガトンの町にある「モリアティの酒場（Moriarty's Saloon）」でバーテンダーをさせられているグールです。<br>プレイヤーがゲーム序盤にメガトンを訪れた際、一番最初に「人間とは違う種族（グール）」として遭遇する可能性が高いキャラクターです。</p>

<h2>詳細</h2>
<p>彼はアンダーワールド（グールの町）から外の世界へ出てきましたが、グールであるという理由でキャピタル中の人間達から石を投げられ、差別され、最終的に悪辣な店主であるコリン・モリアティに拾われました。現在はモリアティから給料のピンハネや罵倒などのモラハラを受けながら、彼の酒場で低賃金労働させられています。</p>
<p>初対面時に主人公が「うわ！なんだその醜い顔は！」と差別的な態度をとると悲しそうな反応をしますが、「普通に話しかけたり、優しく接する」と、自分がグールであるため人間に人間扱いされたことがない彼は深く感動し、主人公に対して店の飲み物や情報を安く（あるいは無料で）提供してくれるようになります。</p>
`,
        kanso: "初めてのRPGで不安なプレイヤーに対して、「見た目がバケモノでも中身は善人であるNPCがこの世界にはいる」というFalloutの基礎知識を教えてくれる重要なキャラクター。もし店主のモリアティを（暗殺等で）排除すると、彼が店のオーナーになり『ゴブの酒場』という看板に変わるという胸熱な隠し仕様があります。"
    },
    {
        title: "Colin Moriarty",
        titleJa: "コリン・モリアティ",
        slug: "colin-moriarty",
        appearance: "Fallout 3",
        wikiSlug: "Colin_Moriarty",
        mainImg: imgData["colin-moriarty"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "メガトン"],
            ["役職", "酒場のオーナー / 情報屋"],
            ["関連", "アイルランド移民の末裔 / ノヴァ"],
        ],
        body: `
<h2>概要</h2>
<p>コリン・モリアティ（Colin Moriarty）は、メガトンの高台にある酒場『モリアティの酒場』を経営している、常に汚い言葉を使って酒と煙草を呷るアイルランド系の男です。</p>

<h2>詳細</h2>
<p>メガトンにおける最も古い住人の一人であり、「この町のことは俺の頭のコンピューターにすべて入っている」と豪語するほど情報通です。<br>主人公が父親（ジェームズ）の行方を追ってメガトンを訪れた際、彼は明確な行き先を知っているにも関わらず、「教えるから300キャップ寄越せ」あるいは「シルバーという女から借金を回収してこい」と金かクエストを要求してきます。</p>
<p>彼はビジネスの手段を選ばない冷酷な男であり、グールのゴブをタダ同然でこき使い、娼婦のノヴァを借金で縛り付け、さらにメガトンの住人たちすべての弱みを握って裏の顔（秘密）を端末に隠し持っています。<br>この端末をハッキングして彼の隠している秘密を暴くと、父親の行方の情報を無料で手に入れることも可能です。</p>
`,
        kanso: "いかにも『ウェイストランドのあくどい情報屋・酒場の親父』というステレオタイプを煮詰めたような男。多くのプレイヤーは彼に言いくるめられて借金回収を行うか、あるいは彼の高圧的な態度に腹を立ててSpeechで脅し、その端末をハッキングして彼に一銭も払わずに情報を抜き取る道を選びました。"
    },
    {
        title: "Lucas Simms",
        titleJa: "ルーカス・シムズ",
        slug: "lucas-simms",
        appearance: "Fallout 3",
        wikiSlug: "Lucas_Simms",
        mainImg: imgData["lucas-simms"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "メガトン"],
            ["役職", "保安官 / 市長"],
            ["関連", "シムズのダスターコート / 不発弾"],
        ],
        body: `
<h2>概要</h2>
<p>ルーカス・シムズ（Lucas Simms）は、カウボーイハットとダスターコートに身を包み、背中にチャイニーズアサルトライフルを背負ったメガトンという町の事実上の「市長」であり、「保安官」です。</p>

<h2>詳細</h2>
<p>19歳の若造（主人公）が巨大な扉から初めてメガトンに足を踏み入れたとき、最初に話しかけてきて「この町は俺の管理下にある。面倒を起こすなよ」と警告してくる頼もしい（そして渋い）おじさんです。<br>彼は町の中央に鎮座している『不発弾の核爆弾』について、「お前のようなVault育ちの素っ頓狂なやつなら、もしかしたらこの爆弾を安全に解除（デフューズ）できるんじゃないか？」と期待を込めてクエストを依頼してきます。</p>
<p>もし主人公が別の男（Mr.バーク）からメガトン爆破の依頼を受け、それをシムズ保安官に密告した場合、シムズは正義感からバークを逮捕しに行きます。<br>しかし、その際プレイヤーが介入しないと、バークに背後からサイレンサー付きピストルで撃たれてあっけなく死亡してしまいます。（※プレイヤーがバークを撃ち殺して彼を助ける展開も可能です）。</p>
`,
        kanso: "「Vaultを出て初めて出会う、カッコいいテンガロンハットの保安官」。彼の家にはボブルヘッド（能力アップの人形）があるため、不法侵入した挙句にMr.バークのイベントでうっかり（あるいは故意に）彼を死なせてしまい、彼が着ていた超カッコいい『シムズのダスターコート』を剥ぎ取ってプレイヤーの序盤の服にする、という悲しい窃盗の横行が起きました。"
    },
    {
        title: "Sydney",
        titleJa: "シドニー",
        slug: "sydney",
        appearance: "Fallout 3",
        wikiSlug: "Sydney",
        mainImg: imgData["sydney"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "フリーランス"],
            ["役職", "レリックハンター (遺物回収屋)"],
            ["関連", "シドニーの10mmウルトラ・サブマシンガン / 独立宣言書"],
        ],
        body: `
<h2>概要</h2>
<p>シドニー（Sydney）は、ワシントンD.C.の国立公文書館の中で、大量のスーパーミュータントに囲まれて孤立している勝気な女性レリックハンター（トレジャーハンター）です。</p>

<h2>詳細</h2>
<p>アブラハム・ワシントンからのクエスト「Stealing Independence」において、アメリカ合衆国の超重要遺物である『独立宣言書』を回収するために公文書館を訪れた主人公は、既に同じ目的で館内に侵入していた彼女と遭遇します。<br>彼女の雇っていた傭兵や相棒たちは全滅しており、彼女一人で公文書館のバリケードに立てこもって戦っていました。</p>
<p>主人公は彼女と一時的に共闘し、最深部へと進んで独立宣言書を回収することになります。口は悪いですが腕は立ち、固有のユニーク武器「シドニーの10mm 'ウルトラ' サブマシンガン」を所持しています。<br>クエスト完了後、もし道中で彼女の父親の真実（メモ）を見つけて彼女に渡すと、彼女は父親への誤解を解き、感謝の印として彼女の愛銃であるウルトラ・サブマシンガンを主人公に譲ってくれます。</p>
`,
        kanso: "短い期間の一時的な同行NPCでありながら、その勝気で姉御肌な性格と専用のユニーク武器の強力さから非常に人気のある女性キャラクター。公文書館での激戦を共にした後、アンダーワールドで彼女と酒を飲み交わす（オマケに銃までくれる）イベントは、荒野における数少ない友情を感じる瞬間です。"
    },
    {
        title: "Herbert Dashwood",
        titleJa: "ハーバート・ダッシュウッド",
        slug: "herbert-dashwood",
        appearance: "Fallout 3",
        wikiSlug: "Herbert_Dashwood",
        mainImg: imgData["herbert-dashwood"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "テンペニータワー"],
            ["役職", "名誉タワー住人 / 元冒険家"],
            ["関連", "ギャラクシー・ニュース・ラジオの英雄 / アーガイル"],
        ],
        body: `
<h2>概要</h2>
<p>ハーバート・ダッシュウッド（Herbert 'Daring' Dashwood）は、テンペニータワーの裕福な住人の一人として余生を過ごしている老齢の紳士です。<br>彼は単なる金持ちの老人ではなく、GNRのラジオドラマ「向見ずなダッシュウッドの冒険」の主人公のモデルとなった、本物の『戦前の伝説的な冒険家』の生き残りです。</p>

<h2>詳細</h2>
<p>かつて彼は、屈強なグールの従者「アーガイル」と共にウェイストランド中を冒険し、数々の武勇伝（レイダーの退治やスレイブ・キャンプの壊滅など）を残しました。その活躍はスリードッグのGNRを通じてラジオドラマ化され、主人公が旅の途中で何度もそのドラマを耳にするという演出が施されています。</p>
<p>現在の彼は引退し、相棒のアーガイルとは長年行方不明になったままであることを深く悲しんでいます。<br>プレイヤーが彼のもとを訪れ、もし荒野の隠しロケーション「ロックオポリス」の洞窟でアーガイルの死体（結末）を見つけて報告すると、彼は悲嘆に暮れながらも「君は立派な冒険者だ、これを受け取ってくれ」と、彼が使っていた冒険家の金庫の鍵を譲ってくれます。</p>
`,
        kanso: "探索中に何度もラジオで聴くことになる「架空の冒険物語の主人公」が、実はゲーム内に現役で存在したというFO3の素晴らしい世界観と伏線回収。アーガイルの末路を探し、彼に教えてあげるイベントは隠しクエストに近いですが、クリアした際の哀愁と老冒険家への尊敬は非常に心に響きます。"
    },
    {
        title: "Argyle",
        titleJa: "アーガイル",
        slug: "argyle",
        appearance: "Fallout 3",
        wikiSlug: "Argyle",
        mainImg: imgData["argyle"][0],
        infoRows: [
            ["種族", "グール"],
            ["所属", "ダッシュウッドの従者"],
            ["役職", "伝説の冒険家の相棒"],
            ["関連", "ロックオポリス / ラジオドラマ"],
        ],
        body: `
<h2>概要</h2>
<p>アーガイル（Argyle）は、GNRのラジオドラマ「向見ずなダッシュウッドの冒険」の中で登場する、ダッシュウッドの忠実で強力なグールの相棒（従者）です。</p>

<h2>詳細</h2>
<p>ラジオドラマ内では「素手で岩を砕き、レイダーの首をへし折る」という最強の近接能力を持つグールとして描かれ、ダッシュウッドのピンチを何度も救う活躍を見せます。<br>しかしゲーム本編中においては、彼は「過去に行方不明になった」としてダッシュウッドの口から手掛かりのみが語られます。</p>
<p>プレイヤーがスミス・ケーシーのガレージ西側にある隠しロケーション「ロックオポリス」の岩扉を発見して中に入ると、無残に崩落した洞窟の最奥部で、岩の下敷きになったまま息絶えているアーガイルの白骨化した遺体を発見することになります。彼の遺体の横には、彼の持ち主の証である武器と証拠品が悲しく残されています。</p>
`,
        kanso: "「あーん、タラッタラー（ラジオドラマのテーマ曲）」からの「やれやれ、急がないとボスが死んじまうぜ」という劇中劇の中だけの存在だったキャラクターが、荒野の片隅でひっそりと骸になっているのを見つけるという、Fallout特有の『環境ストーリーテリング（死体で物語る）』の最高傑作の一つです。"
    },
    {
        title: "Pinkerton",
        titleJa: "ピンカートン",
        slug: "pinkerton",
        appearance: "Fallout 3",
        wikiSlug: "Pinkerton",
        mainImg: imgData["pinkerton"] ? imgData["pinkerton"][0] : "Fo3_Pinkerton.png",
        infoRows: [
            ["種族", "人間"],
            ["所属", "リベット・シティ (分断された艦首部分)"],
            ["役職", "天才科学者 / 隠遁者"],
            ["関連", "整形手術 / A3-21の過去の消去"],
        ],
        body: `
<h2>概要</h2>
<p>ピンカートン（Pinkerton / Horace Pinkerton）は、巨大水上都市「リベット・シティ」にある、完全に分断されて水没している『壊れた艦首部分（Broken Bow）』にたった一人で隠遁している天才科学者にして整形外科医です。</p>

<h2>詳細</h2>
<p>彼はリベット・シティの創立に関わった古参の一人でしたが、Dr.リー達との意見の対立により町から追放され（あるいは自ら離れ）、大量のマイルラーク（放射能カニ）と水中トラップが仕掛けられた過酷な水没エリアに引きこもって独自の研究を続けています。<br>主人公が「ウェイストランド・サバイバルガイド（人間がマイルラークにバレずに卵を奪えるかというモイラの狂気クエスト）」の過程や、人造人間探しなどを経て彼のもとへ命がけで辿り着くことになります。</p>
<p>彼は並外れた外科手術とコンピューター技術を持っており、Dr.ジマーが追っている「人造人間A3-21」の隠された真実（彼が誰に顔の整形手術と記憶の初期化プログラムを行ってもらったのか）という、物語の決定的な確証となる重要な情報とパスワードを握る超重要人物です。</p>
`,
        kanso: "「あんな水没したカニだらけのトラップ地獄の奥深くに、よく一人で住んでるなこのジジイ」と全プレイヤーが呆れる狂気の引きこもり科学者。彼のパソコンにはリベット・シティの住居者全員の個人情報や悪口が詳細にパスワードロックで書かれており、その偏屈な性格を満喫することができます。"
    }
];

let tasks = Promise.resolve();

articles.forEach(article => {
    tasks = tasks.then(async () => {
        console.log(`Processing ${article.title}...`);
        
        let imgUrl = null;
        let ext = '.jpg';
        
        if (article.mainImg && !article.mainImg.endsWith('.svg')) {
            imgUrl = await getImageUrl(article.mainImg);
        }
        
        if (imgUrl) {
            let extMatch = imgUrl.match(/\.([a-zA-Z0-9]+)(?:[\?\/]|$)/);
            if (extMatch) ext = '.' + extMatch[1];
        } else {
            console.log(`Warning: Failed to get URL for ${article.mainImg || 'UNKNOWN'}. Will try PNG fallback if valid string.`);
            if (typeof article.mainImg === 'string') {
                if (article.mainImg.endsWith('.jpg') || article.mainImg.endsWith('.jpeg')) {
                     let url = await getImageUrl(article.mainImg.replace(/\.jpe?g$/, '.png'));
                     if (url) { imgUrl = url; ext = '.png'; }
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
            .replace(/<title>.*?<\/title>/, `<title>${article.title} | Overseer Mohi's Terminal</title>`)
            .replace(/<h3 style="margin-top:0;text-align:center;">.*?<\/h3>/, `<h3 style="margin-top:0;text-align:center;">${article.title}</h3>`)
            .replace(/<img src="images\/note_extracted\/.*?alt=".*?">/, imgUrl ? `<img src="${localRelPath}" alt="${article.title}">` : `<!-- No Image Available -->`)
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
Fallout 3の大辞典情報を新規アーカイブしました。あの過酷なキャピタル・ウェイストランドの物語を振り返ります。

アーカイブアクセス：
https://www.fallout-jp.com/${article.slug}.html

#Fallout #Fallout3 #フォールアウト #FalloutLore`;
        
        fs.writeFileSync(path.join(xDir, 'post.md'), postStr, 'utf8');

        console.log(`Finished ${article.title}`);
    });
});

tasks.then(() => console.log('All generations completed.'));
