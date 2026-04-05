// _batch_gen_fo3_chars3.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_fo3_char3.json', 'utf8'));
// Manual overrides
imgData["calvert"] = ["Professor_Calvert.jpg", "Calvert.jpg"];
imgData["sierra-petrovita"] = ["FO3_Character_Sierra_Petrovita.png"];

const articles = [
    {
        title: "Agatha",
        titleJa: "アガサ",
        slug: "agatha",
        appearance: "Fallout 3",
        wikiSlug: "Agatha",
        mainImg: imgData["agatha"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "アガサの家"],
            ["役職", "バイオリン奏者 / ラジオパーソナリティ"],
            ["関連", "ソイル・ストラディバリウス / アガサ・ラジオ"],
        ],
        body: `
<h2>概要</h2>
<p>アガサ（Agatha / Agatha Egglebrecht）は、キャピタル・ウェイストランドの北東にある『アガサの家』にたった一人で暮らしている老婆です。<br>この荒廃した世界において、戦前の本物のクラシック音楽（バイオリン）を愛し、演奏し続けている非常に珍しい文化人です。</p>

<h2>詳細</h2>
<p>彼女の夫は既に亡くなっており、周囲のレイダーやミュータントから身を隠しながら、亡き夫が愛したバイオリンを密かに演奏して自家製ラジオでウェイストランドへ流し続けています。<br>しかし、現在彼女が持っているバイオリンは粗悪な手作りのものであり、彼女は「Vault 92」に保管されているという伝説の名器『ソイル・ストラディバリウス』を探してきてほしいと主人公に依頼してきます。</p>
<p>狂気に満ちたVault 92から無事にストラディバリウスを持ち帰ると、彼女は涙を流して喜び、その場で見事な音色の演奏を聴かせてくれます。<br>さらに、主人公は礼として「アガサ・ラジオ」の受信帯を教えてもらうことができ、以降は旅の最中いつでも、荒涼とした景色を神聖な響きで包み込む「彼女のストラディバリウスの生演奏（バッハ等のクラシック集）」をラジオで聴くことができるようになります。</p>
`,
        kanso: "血と肉片に塗れたFO3の探索において、彼女の弾くバイオリンの調べはまさに一筋の天上の光。特に夕暮れのウェイストランドを歩きながら聴くアガサ・ラジオは、Falloutシリーズの中でも屈指の『美しい終末の風景』をプレイヤーに提供してくれます。"
    },
    {
        title: "Allistair Tenpenny",
        titleJa: "アリステア・テンペニー将軍",
        slug: "allistair-tenpenny",
        appearance: "Fallout 3",
        wikiSlug: "Allistair_Tenpenny",
        mainImg: imgData["allistair-tenpenny"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "テンペニータワー"],
            ["役職", "創設者 / 社長"],
            ["関連", "イギリスからの移民 / メガトン爆破命令"],
        ],
        body: `
<h2>概要</h2>
<p>アリステア・テンペニー（Allistair Tenpenny）は、キャピタル・ウェイストランドで最も豪華な高層マンション「テンペニータワー」の創設者にして絶対的なオーナーです。「将軍」とは自称であり、元はイギリスからこのアメリカ大陸に渡ってきた移民です。</p>

<h2>詳細</h2>
<p>彼は莫大な富（キャップ）とスナイパーライフルを持つ横暴な老齢の資本家で、ウェイストランドの貧しい人々を見下し、タワーの最上階から双眼鏡で荒野を眺めては、下層民やミュータントを狙撃して暇を潰しています。<br>彼はFOVの中盤で訪れる重要クエスト「The Power of the Atom」において、主人公に対して『バルコニーからの景色を遮る邪魔なガラクタの町（メガトン）を、町の中央にある不発弾を使って核爆発させて消し飛ばしてくれ』という、信じられないほど身勝手でサイコパスな依頼を平然と持ちかけてきます。</p>
<p>もし主人公が悪の手先となりメガトンを爆破してタワーに戻ると、彼は「素晴らしい花火だった。これで景色が少しはマシになったな」と笑いながら気前よく報酬（スイートルームなど）を与えてくれます。<br>なお、反対のクエスト（彼を殺害するか、グールにタワーを乗っ取らせる）で彼がタワーから転落して死んだとしても、ウェイストランドの大義に影響は一切ありません。</p>
`,
        kanso: "「ただ景色が目障りだから、核爆弾で何百人が住む町を一つ消してこい」という、FO3の倫理観の崩壊（カルマシステム）を象徴する悪党の代表格。バルコニーからメガトンのキノコ雲を眺めるサイコパスな演出は、良くも悪くもゲーム史に残る悪役のマスターピースです。"
    },
    {
        title: "Sierra Petrovita",
        titleJa: "シエラ・ペトロビタ",
        slug: "sierra-petrovita",
        appearance: "Fallout 3",
        wikiSlug: "Sierra_Petrovita",
        mainImg: imgData["sierra-petrovita"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "ギルダーシェイド"],
            ["役職", "ヌカ・コーラ マニア"],
            ["関連", "ヌカ・コーラ・クアンタム / ヌカ・コーラ・クリア"],
        ],
        body: `
<h2>概要</h2>
<p>シエラ・ペトロビタ（Sierra Petrovita）は、ギルダーシェイドに住む、全身から狂気が滲み出ている「ヌカ・コーラの熱狂的（異常な）コレクター兼マニア」の女性です。</p>

<h2>詳細</h2>
<p>彼女の自宅は数千本のヌカ・コーラとその関連グッズで埋め尽くされた博物館のようになっており、彼女自身もヌカ・コーラのことしか考えておらず、プレイヤーに「ヌカ・コーラ・クアンタム」というレアな青く光る飲料をなんと『30本』も集めてくるように依頼してきます（The Nuka-Cola Challenge）。</p>
<p>彼女のヌカ・コーラ愛は完全に常軌を逸しており、「尿の色が青く光っているが、これはクアンタムに含まれる健康な放射能の証拠なの！」と嬉しそうに語る手遅れな一面も見せます。<br>彼女の狂気は10年後の『Fallout 4（Nuka-World）』でも全く衰えておらず、ヌカ・ワールドの現地で新たなクアンタムと真実を求めて主人公を再びパシリに使うという、執念深すぎる続投を果たしました。</p>
`,
        kanso: "Falloutにおける「収集（コレクト）」の狂気を擬人化したような女。彼女のクアンタム30本収集クエストに絶望し、数時間かけてウェイストランド中の自動販売機とダンジョンを漁り回った（あるいは彼女のライバルであるロナルドに横流しした）FO3プレイヤーは後を絶ちません。"
    },
    {
        title: "Dr. Zimmer",
        titleJa: "Dr. ジマー",
        slug: "zimmer",
        appearance: "Fallout 3",
        wikiSlug: "Zimmer",
        mainImg: imgData["zimmer"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "インスティチュート (連邦)"],
            ["役職", "SRB（コーサー）のトップ / 科学者"],
            ["関連", "ハークネス (A3-21) / 人造人間"],
        ],
        body: `
<h2>概要</h2>
<p>Dr. ジマー（Zimmer）は、リベット・シティの研究所をうろついている、高圧的で傲慢な老人です。<br>彼はキャピタル・ウェイストランドの住人ではなく、北の『連邦（The Commonwealth）』にある謎の科学組織インスティチュートから派遣されてきた科学者部隊の長です。</p>

<h2>詳細</h2>
<p>彼は「逃亡した非常に高度で危険なアンドロイド（A3-21）」を連れ戻すためにワシントンD.C.へやってきました。<br>彼は主人公に対して、「周囲の人間に完全に溶け込んでいるそのアンドロイドを探し出し、所有者である私の元へ連れ戻せ」というクエスト（The Replicated Man）を強要してきます。<br>このクエストこそが、後のシリーズ『Fallout 4』のメインテーマとなる「自我を持った人造人間（シンス）とインスティチュート」という概念が世界で初めて提示された伝説的な布石です。</p>
<p>もし彼に正解（アンドロイドの正体は警備主任ハークネスであること）を教えれば手厚い報酬（強力なPerk）をくれますが、ハークネスの記憶を復活させてジマーを返り討ちにする（殺害する）ことも可能です。（さらに、報酬だけ貰ってから射殺するという両取りも可能です）。</p>
`,
        kanso: "FO3発売当時は「北の連邦にある地下組織ってなんだ？」というただのサブクエストの設定でしたが、数年後に『Fallout 4』が本当にその設定を軸にして作られたことで、改めてジマーの存在（そして彼が言うSRBやコーサーという単語）の信憑性にファンが驚愕することになりました。"
    },
    {
        title: "Uncle Leo",
        titleJa: "アンクル・レオ",
        slug: "uncle-leo",
        appearance: "Fallout 3",
        wikiSlug: "Uncle_Leo",
        mainImg: imgData["uncle-leo"][0],
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["所属", "なし (放浪者)"],
            ["役職", "平和主義者のミュータント"],
            ["関連", "ランダムエンカウント / 知的好奇心"],
        ],
        body: `
<h2>概要</h2>
<p>アンクル・レオ（Uncle Leo）は、キャピタル・ウェイストランドをただ一人で放浪している、非常に珍しい完全平和主義のスーパーミュータントです。</p>

<h2>詳細</h2>
<p>FO3のスーパーミュータント達は皆一様に凶暴で人間を虐殺していますが、フォークスと同様に、彼もなぜかミュータント化する過程で「高い知能と深い慈愛の心」を獲得しました。<br>しかしフォークスが監禁されていたのに対し、レオはその「戦いを好まない性格」ゆえに同族達からリンチを受け、すべてを奪われて荒野へ追放されました。</p>
<p>ランダムエンカウントでのみ彼と遭遇することができ、銃を向けても決して攻撃してこず、プレイヤーに対して「人間よ、なぜ君も同族の仲間同士で争うんだい？」と深い哲学的な問いを投げかけます。<br>彼に親切に接すれば心からの感謝と少しのアイテムをくれ、そのまま再び孤独な放浪の旅へと歩き去っていきます。</p>
`,
        kanso: "「狂った世界の中で、バケモノの姿をした彼が一番まともな人間性を持っている」というFallout特有のアイロニーを象徴するキャラクター。彼との会話は非常に心が洗われますが、ランダムエンカウントで彼がレイダーや過激派のB.O.S.にあっさり射殺されている死体を見つけて悲しみに暮れたプレイヤーも数しれず。"
    },
    {
        title: "Desmond Lockheart",
        titleJa: "デズモンド・ロックハート",
        slug: "desmond-lockheart",
        appearance: "Fallout 3 (Point Lookout)",
        wikiSlug: "Desmond_Lockheart",
        mainImg: imgData["desmond-lockheart"][0],
        infoRows: [
            ["種族", "グール"],
            ["所属", "ポイントルックアウト (カルバート屋敷)"],
            ["役職", "イギリスの元諜報員"],
            ["関連", "カルバート教授との200年の死闘 / 『ゲーム』"],
        ],
        body: `
<h2>概要</h2>
<p>デズモンド（Desmond Lockheart）は、DLC『Point Lookout』に登場する、怪しげな黒縁眼鏡をかけた尊大で口の悪い知的なグールの老人です。</p>

<h2>詳細</h2>
<p>ただのグールではなく、戦前（200年前）はイギリス高官の超エリート諜報員であり、この世界が核の炎で滅びる以前から、宿敵である「カルバート一族」と裏社会で血で血を洗う権力闘争（ゲーム）を繰り広げていた怪物です。<br>彼はポイントルックアウトの広大な屋敷に閉じこもり、防衛網と犬たちを駆使して、200年経った今でもなお『カルバート教授』との終わらない殺し合いを続けています。</p>
<p>主人公が館を訪れると、彼はいきなり「新入り、さっさと銃を取って外の部族兵（カルバートの刺客）を撃ち殺せ！」と命令してきます。<br>彼は主人公をただの使い走りの小間使いとして見下していますが、カルバート教授の圧倒的な知略に対抗し、この『200年のゲーム』に終止符を打つために、彼と奇妙な共闘関係を結ぶことになります。</p>
`,
        kanso: "「核戦争が起きて世界が崩壊しようが、俺たちの権力闘争のゲームは終わらねぇんだよ」という、戦前のVIP特権階級の恐るべき執念を見事に描いた男。強烈に嫌味なジジイですが、裏切りが蔓延るあの沼地においては、最初から最後まで裏表なく『クソ野郎のまま』接してくる彼にある種の頼もしさを覚えるはずです。"
    },
    {
        title: "Calvert",
        titleJa: "カルバート教授",
        slug: "calvert",
        appearance: "Fallout 3 (Point Lookout)",
        wikiSlug: "Calvert",
        mainImg: imgData["calvert"] ? imgData["calvert"][0] : "Icon_disambig.svg", // safe fallback
        infoRows: [
            ["種族", "AI / (あるいは脳髄)"],
            ["所属", "ポイントルックアウト"],
            ["役職", "戦前の特権階級 / 脳の保存者"],
            ["関連", "精神感応 (テレパシー) / デズモンドの宿敵"],
        ],
        body: `
<h2>概要</h2>
<p>カルバート（Calvert）は、DLC『Point Lookout』における黒幕であり、デズモンドの永遠の宿敵です。ゲーム中盤までは実体を持たず、テレパシーや機械の音声としてのみ主人公に接触してきます。</p>

<h2>詳細</h2>
<p>戦前のメリーランド州ポイントルックアウトの土地を支配していた超富裕層『カルバート家』の当主であり、彼もまた核戦争を生き延びるために、自分自身の「脳髄」だけを巨大な保護水槽（ロボブレイン技術の応用）の中に保存し、地下施設から島のすべてを監視・支配し続けていました。<br>彼は強力なテレパシー能力を使って現地の狂った部族たちを洗脳してカルト化させ、彼らを操ってデズモンドの館を永続的に襲撃させていました。</p>
<p>非常に慇懃無礼で紳士的な口調で主人公に接触し、「デズモンドは狂人だ。私に協力して彼を排除しなさい」と持ちかけてきますが、どちらに味方しても最終的には地下の最深部で「巨大な脳みその入ったビン（Professor Calvert）」としてその醜悪な真の姿を現します。</p>
`,
        kanso: "「200年間脳みそだけの姿で生き続け、因縁の相手との戦争をゲームのように楽しむ戦前の富豪」というマッドサイエンスの極致。デズモンド側につくか、カルバート側につくかはプレイヤー次第ですが、大抵のプレイヤーはデズモンドの毒舌に絆されてカルバートの脳ミソのビンを叩き割るルートを選びます。"
    },
    {
        title: "Ishmael Ashur",
        titleJa: "ロード・アッシャー",
        slug: "ishmael-ashur",
        appearance: "Fallout 3 (The Pitt)",
        wikiSlug: "Ishmael_Ashur",
        mainImg: imgData["ishmael-ashur"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "ザ・ピット (ピッツバーグ)"],
            ["役職", "奴隷使役者たちの指導者 (ロード)"],
            ["関連", "B.O.S.の元隊員 / パワーアーマー"],
        ],
        body: `
<h2>概要</h2>
<p>イシュマエル・アッシャー（Ishmael Ashur）は、DLC『The Pitt』の舞台であるピッツバーグ（ザ・ピット）を暴力と恐怖で支配する独裁者であり、「レイダーと奴隷の帝国」の頂点に君臨するロードです。</p>

<h2>詳細</h2>
<p>彼は単なる略奪者ではなく、実はかつてエルダー・リオンズがピッツバーグでの大虐殺（スカージ）を行った際に残されてしまった、B.O.S.の元隊員（生き残り）です。<br>彼はこの絶望的な地獄の環境で一人孤立し、生き延びるために「力による絶対支配」の哲学に目覚めました。</p>
<p>彼はピットに蔓延る『トロッグ（退化病）』の特効薬を作り出すため、外部から人間を奴隷として拉致し、過酷な製鉄所で強制労働させて社会基盤を無理やり維持しています。<br>「奴隷制度は必要悪である。この町（ピット）を再建し、いつか病を克服すれば、すべての奴隷を解放する」という彼自身の理想を本気で信じており、ただの冷徹な非道とは言い切れない、非常に深い思想と苦悩を持つ支配者です。</p>
`,
        kanso: "FO3において「完全な悪とは何か」をプレイヤーに強烈に問いかけてくる傑作DLCのボス。赤ん坊（治療薬の源）を彼と妻から奪って奴隷の反乱を支援するか、アッシャーを信じて奴隷達の悲鳴を黙殺して体制を維持するか。どちらを選んでも「誰も完全に救われない」という後味の悪さはシリーズ随一です。"
    },
    {
        title: "Wernher",
        titleJa: "ワーナー",
        slug: "wernher",
        appearance: "Fallout 3 (The Pitt)",
        wikiSlug: "Wernher",
        mainImg: imgData["wernher"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "ザ・ピット (元レイダー)"],
            ["役職", "奴隷解放のレジスタンス"],
            ["関連", "奴隷の反乱 / 皮肉な救世主"],
        ],
        body: `
<h2>概要</h2>
<p>ワーナー（Wernher）は、DLC『The Pitt』において、悲惨な奴隷たちをアッシャーの支配から解放するためにピッツバーグから脱走し、キャピタル・ウェイストランドへ助け（主人公）を求めてきた男です。</p>

<h2>詳細</h2>
<p>彼は「病気の治療薬がアッシャーの基地に隠されている。それを奪えば奴隷たちを救える！」と主人公に訴えかけ、主人公を奴隷のふりをしてピットへ潜入させる作戦を立案します。<br>しかし、彼自身は純粋な正義の味方というわけではなく、元々は「アッシャーの部下（レイダーの副官）」であり、権力闘争に敗れてスラムへ追放された因縁がある男でした。</p>
<p>ワーナーの真の目的が「奴隷の解放」なのか、それとも「アッシャーへの復讐と権力の簒奪」なのか、最後まで明確にはされません。<br>さらに、彼が執着する『治療薬』の正体が「アッシャーの愛娘（免疫を持った生きた赤ん坊）」であると判明した時、それでもワーナーの企みに乗って罪のない赤ん坊を誘拐するべきなのか、プレイヤーは激しいジレンマに直面します。</p>
`,
        kanso: "「奴隷解放軍のレジスタンスのリーダー」という肩書きで主人公にすり寄りながら、その実態は復讐心と権力欲が透けて見える、FO世界の『レボリューション（革命）』の冷酷さを体現する男。ワーナー側についた結果、「アッシャーよりもマシな未来が来る要素が全く感じられない」という点が絶望感を煽ります。"
    },
    {
        title: "General Jingwei",
        titleJa: "ジンウェイ将軍",
        slug: "jingwei",
        appearance: "Fallout 3 (Operation Anchorage)",
        wikiSlug: "Jingwei",
        mainImg: imgData["jingwei"][0],
        infoRows: [
            ["種族", "人間 (仮想現実プログラムのデータ)"],
            ["所属", "旧中国軍"],
            ["役職", "アラスカ戦線侵攻部隊 指揮官"],
            ["関連", "ショックソード / オペレーション・アンカレッジ"],
        ],
        body: `
<h2>概要</h2>
<p>ジンウェイ将軍（General Jingwei）は、DLC『Operation Anchorage』に登場するボスキャラクター。戦前（2077年以前）のアラスカ戦線（アンカレッジ）に侵攻した中国人民解放軍の最高司令官です。</p>

<h2>詳細</h2>
<p>彼自身は200年前の人物であり既に故人ですが、主人公が米軍の訓練用VR（仮想現実）シミュレーションシステムに入り込んだため、VRプログラム内部の軍事シミュレーターのラスボスとして主人公の前に立ちはだかります。<br>ゲーム内ではアメリカ軍の将校たちを捕らえて残酷に処刑しており、強力な電撃を纏った剣「ジンウェイのショックソード」を自在に操る近接戦闘の達人としてプログラミングされています。</p>
<p>最終決戦では、交渉（Speech）によって彼に名誉ある切腹（自害）を選ばせることも可能です。<br>なお、このシミュレーションで彼を倒すことで、現実世界の武器庫のロックが解除され、最強の防御力を誇る「T-51b パワーアーマー（の冬期迷彩版）」などを手に入れることができます。</p>
`,
        kanso: "『Fallout世界の戦前の米中戦争』を直接体験できる貴重なDLCの中で、圧倒的な存在感を放つ中国軍のボス。VRシミュレーションの中の彼が「実際の軍事記録に基づいている」のか、それとも「米軍のプロパガンダによって極端に残酷な悪役としてプログラムされただけ」なのかは、プレイヤー達の興味深い考察対象となっています。"
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
