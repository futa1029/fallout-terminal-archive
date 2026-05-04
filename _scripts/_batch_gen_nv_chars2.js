// _batch_gen_nv_chars2.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_nv_char2.json', 'utf8'));

const articles = [
    {
        title: "Elijah",
        titleJa: "エリヤ (ファザー・エリヤ)",
        slug: "elijah",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Elijah",
        mainImg: imgData["elijah"][1], // Use Father_Elijah.jpg
        infoRows: [
            ["種族", "人間 (サイボーグ)"],
            ["所属", "元B.O.S. モハビ・チャプター"],
            ["役職", "元エルダー (長老)"],
            ["関連", "DLC: Dead Money / ヘリオス1"],
        ],
        body: `
<h2>概要</h2>
<p>ファザー・エリヤ（Father Elijah）は、DLC第1弾『Dead Money』の黒幕であり、かつてモハビのB.O.S.（ブラザーフッド・オブ・スティール）を率いていた元エルダー（最高指導者）です。狂気と執着に取り憑かれた老いたる天才技術者です。</p>

<h2>詳細</h2>
<p>彼はB.O.S.の長老でありながら、旧世界の軍事テクノロジー（特に大量破壊兵器）の収集と研究に異常な執着を示し、部下たちを無謀な作戦に投入し続けました。<br>その最たるものが「ヘリオス1」の占拠であり、NCR軍の大軍に包囲されて大きな犠牲（B.O.S.のモハビでの大敗北と地下への隠遁）を出した張本人でもあります。彼は敗北のさなか、部下を見捨てて一人で逃亡しました。</p>
<p>その後、彼は戦前に存在したとされる「猛毒の赤い雲（クラウド）」と「ホログラム軍団」兵器を求めて、伝説のシエラ・マドレ・カジノへと行き着きます。<br>彼は無線でプレイヤーや他の人物を誘き寄せ、彼らの首に「爆弾付きの首輪」を取り付けて奴隷のようにこき使い、誰も開けられなかったカジノの地下金庫を強引に開けさせようとします。</p>
`,
        kanso: "「手を出してはいけないテクノロジー」に魅入られ、全てを失ってもなお狂信をやめないB.O.S.のダークサイドを煮詰めたような存在。彼を金庫室に閉じ込めて生きたままミイラ化させるルートは、彼がこれまで首輪をつけて強制労働させてきた犠牲者への最高の意趣返しとなります。"
    },
    {
        title: "Dean Domino",
        titleJa: "ディーン・ドミノ",
        slug: "dean-domino",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Dean_Domino",
        mainImg: imgData["dean-domino"][1], // Use FNV_Dean_Domino_w_glass.png
        infoRows: [
            ["種族", "グール"],
            ["所属", "シエラ・マドレ (捕らわれの身)"],
            ["役職", "戦前の大スター歌手"],
            ["関連", "DLC: Dead Money"],
        ],
        body: `
<h2>概要</h2>
<p>ディーン・ドミノ（Dean Domino）は、戦前のラスベガスで一世を風靡した伝説的なエンターテイナー（歌手・俳優）であり、DLC『Dead Money』で主人公と共に首輪をつけられる仲間（共犯者）の一人です。</p>

<h2>詳細</h2>
<p>戦前の世界において、彼は圧倒的なカリスマと才能を持つ超名門スターでしたが、同時に極度の「自己愛」と「嫉妬心」、そして他者を蹴落とすことを何とも思わない冷酷なサイコパス気質を持っていました。<br>彼はシエラ・マドレ・カジノの創立者である富豪「シンクレア」を騙し、彼の全財産である地下金庫を強奪しようと企てていましたが、その決行の日に最終戦争が勃発し、爆弾の投下によって計画は頓挫しました。</p>
<p>それから200年、グールとなって醜い化け物になり果ててもなお、彼は執念深くシエラ・マドレの街に居座り続け、「いつかあの金庫を開けてシンクレアに勝つ」という欲望だけを糧に生き延びてきました。<br>プライドが異常に高く、会話で少しでも「彼を利用する」ような態度や「彼より優位に立つ（Barter等で言い負かす）」会話選択肢を選ぶと、最終盤で絶対に裏切って敵対するという非常に厄介な人物です。</p>
`,
        kanso: "「プライドが高すぎるため、会話で論破してはいけない」という、FalloutのRPGシステムにおけるメタな罠を仕掛けてくる名キャラクター。彼の戦前の美しい歌声と、現在の醜く腐り果てた姿とのギャップ、そして200年越しの『醜い嫉妬心』の結末は、Dead Moneyの狂った雰囲気を象徴しています。"
    },
    {
        title: "Christine Royce",
        titleJa: "クリスティーン・ロイス",
        slug: "christine-royce",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Christine_Royce",
        mainImg: imgData["christine-royce"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "B.O.S. (サークルの暗殺者)"],
            ["役職", "ナイト"],
            ["関連", "DLC: Dead Money / ベロニカの元恋人"],
        ],
        body: `
<h2>概要</h2>
<p>クリスティーン・ロイス（Christine Royce）は、DLC『Dead Money』で出会う顔に大きな傷跡を持つ女性。同じくファザー・エリヤによって首輪をつけられた仲間の一人です。</p>

<h2>詳細</h2>
<p>彼女は元々、B.O.S.モハビ支部のナイト（騎士）であり、本編で登場するコンパニオン「ベロニカ」と深く愛し合った恋人同士でした。<br>しかし、当時の長老であったエリヤによって二人の関係は引き裂かれ、エリヤがモハビから逃亡した後、彼女はB.O.S.内部の暗殺組織『サークル・オブ・スティール』の暗殺者として、逆賊であるエリヤを処刑する任務を帯びて単身で彼を追い続けてきました。</p>
<p>ビッグ・マウンテン（DLC『Old World Blues』）での死闘を経てエリヤを追ってシエラ・マドレに到達したものの、逆にエリヤの罠にハマり、オートドックで無理やり「声帯を切除」されてしまいました。<br>そのためゲーム中盤までは一切言葉を話すことができず、プレイヤーとは身振り手振り（ジェスチャー）による独特のコミュニケーションを取ることになります。</p>
`,
        kanso: "声帯を奪われているため、プレイヤーは「彼女の怒っている表情やジェスチャー」から推測して選択肢を選ぶという斬新なシステムが面白いキャラクター。本編のベロニカの悲しい過去の「もう一人のヒロイン」であり、DLC間でこれほど美しく悲劇的な伏線が繋がるのはFNVのシナリオの凄まじさです。"
    },
    {
        title: "Mobius",
        titleJa: "Dr. モビウス",
        slug: "mobius",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Mobius",
        mainImg: imgData["mobius"][0],
        infoRows: [
            ["種族", "ロボット (脳髄 / シンクタンク)"],
            ["所属", "ビッグ・エンプティ"],
            ["役職", "戦前の天才科学者 (の脳)"],
            ["関連", "DLC: Old World Blues / ロボスコルピオン"],
        ],
        body: `
<h2>概要</h2>
<p>Dr. モビウス（Mobius）は、DLC第3弾『Old World Blues』の舞台となる巨大研究施設「ビッグ・マウンテン」の中央でプレイヤーの行く手を阻む（とされている）、巨大なロボスコルピオン軍団を操る狂気の科学者です。</p>

<h2>詳細</h2>
<p>狂気を漂わせる巨大な目玉が付いた浮遊タンクに「脳髄」だけを浮かべた姿をしており、施設全体のモニターをハックしては「私こそがモビウス！ビッグ・エンプティの支配者である！」と胡散臭い悪役のような演説を響き渡らせています。<br>元のシンクタンク（他の5人の科学者たち）からは、「狂気に陥って我々を閉じ込めた裏切り者」として敵視されており、プレイヤーは彼の本拠地へとカチコミに行くことになります。</p>
<p>しかしその実態は、他の科学者たちが「自分たちの持つ危険すぎる兵器技術をウェイストランド（外界）にばら撒き、世界を完全に破壊してしまう」という恐ろしい本能に気づき、わざと自分が『共通の敵（悪役）』を演じることで、彼らの興味を永遠に内輪もめに向けさせ、世界を守っていた『真の英雄』でした。<br>その事実を隠すため、そして孤独と罪悪感から逃れるために、彼は常に自身の記憶を薬物（メンタス等）で消し続けています。</p>
`,
        kanso: "「フハハハ！見よこの恐ろしいロボスコルピオン軍団を！」からの、「実は誰よりも世界を愛し、孤独に世界を守り続けるために薬漬けになっていた真の善人」という最高のギャップを見せてくれる愛すべきロボット脳波おじさん。彼の告白シーンはOWB屈指の感動ポイントです。"
    },
    {
        title: "Klein",
        titleJa: "Dr. クライン",
        slug: "klein",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Klein_(Old_World_Blues)",
        mainImg: imgData["klein"][0],
        infoRows: [
            ["種族", "ロボット (脳髄 / シンクタンク)"],
            ["所属", "シンクタンク (ビッグ・エンプティ)"],
            ["役職", "最高責任者 (の脳)"],
            ["関連", "DLC: Old World Blues"],
        ],
        body: `
<h2>概要</h2>
<p>Dr. クライン（Klein）は、DLC第3弾『Old World Blues』の中心人物であり、ビッグ・マウンテンの研究機関「シンクタンク」を統括する戦前の天才科学者（の脳）です。</p>

<h2>詳細</h2>
<p>他の同僚たちと同じく、生体ゼリーの入った浮遊ロボットタンクに脳みそだけを浮かべて200年間狂った研究を続けています。<br>彼自身は自らを「天才中の天才であり、人類の進歩を導くリーダー」だと信じて疑いませんが、倫理観が完全に欠如しており、プレイヤーの「脳、心臓、脊椎」を麻酔なしでくり抜いては『あれ？ どこにやったっけ？』と紛失してしまうという、恐るべきポンコツぶりを発揮します。</p>
<p>彼の傲慢さと技術への盲信は、本編の「Mr.ハウス」の写し鏡のようでもありますが、クラインや他のシンクタンクの面々はモビウスによって記憶の意図的な操作（洗脳）を受けており、「外界のモハビ・ウェイストランドという世界が存在すること自体を忘却させられている」という檻の中で永遠の井の中の蛙として生かされています。</p>
`,
        kanso: "「手と足の先にあるチン毛みたいな変な突起（指のこと）をワキワキさせるな！」と初対面からプレイヤーの度肝を抜いてくる、最高に気が狂ったマッドサイエンティスト（物理）。OWBという神DLCのコメディとマッドネスを完璧に牽引してくれる素晴らしいキャラクターです。"
    },
    {
        title: "Marcus",
        titleJa: "マーカス",
        slug: "marcus",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Marcus",
        mainImg: imgData["marcus"][0],
        infoRows: [
            ["種族", "スーパーミュータント (初代)"],
            ["所属", "ジェイコブズタウン / (元マスターズ・アーミー)"],
            ["役職", "市長 / 指導者"],
            ["関連", "Fallout 2からの続投コンパニオン"],
        ],
        body: `
<h2>概要</h2>
<p>マーカス（Marcus）は、モハビの北西の雪山にあるミュータントの隠れ里「ジェイコブズタウン」の平和的な指導者であり、『Fallout 2』で主人公（選ばれし者）の仲間として共に旅をした伝説的なスーパーミュータントです。</p>

<h2>詳細</h2>
<p>彼は初代『Fallout』の黒幕である「マスター」によって造り出された第一世代の非常に高い知能を持ったスーパーミュータントであり、マスターの死後、各地を放浪した後に人間のパラディン「ジェイコブ」と対決の果てに親友となり、人間とミュータントが共存する街「ブロークン・ヒルズ」を作った偉大な経歴の持ち主です。</p>
<p>ブロークン・ヒルズが寂れた後、彼はモハビの山奥に新たな安住の地「ジェイコブズタウン（親友ジェイコブの名を冠した村）」を築きました。<br>そこで彼は、精神に異常をきたしたナイトキン（透明化の後遺症で狂ったミュータントたち）を保護し、その治療法を探すためにDr.ヘンリーを雇い入れ、外から迫るNCRの傭兵の脅威に対し「暴力ではなく対話」で解決しようと尽力しています。</p>
`,
        kanso: "前作FO2をプレイしたファンなら、彼と再会した瞬間に「マーカスじゃん！！」と叫ぶこと間違いなしのレジェンドキャラクター。旧世代の憎しみや偏見を乗り越え、本当に知の限りと忍耐を尽くして同胞を救おうとする彼の姿は、まさに真の聖人（ミュータント）です。"
    },
    {
        title: "Raul Tejada",
        titleJa: "ラウル・テハダ",
        slug: "raul-tejada",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Raul_Tejada",
        mainImg: imgData["raul-tejada"][0],
        infoRows: [
            ["種族", "グール"],
            ["所属", "ブラックマウンテン (囚われの身)"],
            ["役職", "コンパニオン / 整備士・ガンマン"],
            ["関連", "戦前のメキシコ / 伝説のメキシカン・ヴァケロ"],
        ],
        body: `
<h2>概要</h2>
<p>ラウル・アルフォンソ・テハダ（Raul Alfonso Tejada）は、ブラックマウンテンのスーパーミュータントたちに監禁されているところを助け出すことで仲間になるグールのコンパニオンです。超一流の整備技術を持つ修理屋です。</p>

<h2>詳細</h2>
<p>「はいはい、ボス」と常に腰が低く、皮肉屋ながらも従順なおじいちゃんグールですが、その正体は戦前のメキシコ（メキシコシティ付近）で大戦を生き延びた凄腕のガンマンです。<br>彼はかつて愛する家族（妹のラファエラなど）を無法者に次々と殺され、そのたびに銃（ピースメーカー）を手に取って復讐と報復の流血の旅を続けてきました。<br>しかし「自分が銃を抜いて正義を気取ろうとするたびに、周りの大切な人が酷い死に方をする」という重いトラウマを抱え、現在は銃を置き、ただの老いた修理工としての隠居生活を受け入れています。</p>
<p>同行中にモハビで「今も老いと戦いながら人々のために戦っている老人たち（アンディ、スターリング等）」と会話することで、ラウルは自身の生き方を見つめ直します。<br>銃を取って再び「伝説のヴァケロ（ガンマン）」として復活するか、それとも「最高の整備士」としての余生を生きるか、プレイヤーの言葉が彼の結末を決めます。</p>
`,
        kanso: "「ボスがそう言うなら」と愚痴を言いながらも完璧に武器の劣化を防いでくれる（コンパニオンPerkの性能がヤバい）最高のお供。ボクシングの伝説的映画のような「老兵の復活劇」を描く彼の専用クエストは非常に渋く、カウボーイ装備を着せた時の圧倒的ガンマン感は最高です。"
    },
    {
        title: "Papa Khan",
        titleJa: "パパ・カーン",
        slug: "papa-khan",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Papa_Khan",
        mainImg: imgData["papa-khan"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "グレート・カーンズ"],
            ["役職", "部族長 (リーダー)"],
            ["関連", "レッドロック・キャニオン / ビター・スプリングス事件"],
        ],
        body: `
<h2>概要</h2>
<p>パパ・カーン（Papa Khan）は、レッドロック・キャニオンに本拠地を構える誇り高き部族（巨大レイダー集団）「グレート・カーンズ」の現リーダーです。</p>

<h2>詳細</h2>
<p>グレート・カーンズは初代Falloutの頃からシリーズに登場し続ける古豪であり、かつてのNCRの発展の歴史において常に邪魔な敵（レイダー）として何度も壊滅させられながら、その度に復活してきたしぶとい部族です。<br>パパ・カーンはその族長として部族の「名誉」と「強さ」を重んじていますが、数年前にNCR軍から不意打ちによる凄惨な大虐殺を受けた『ビター・スプリングス事件』により、NCRに対して骨の髄まで深い憎しみを抱いています。</p>
<p>その憎悪につけこまれ、彼は現在シーザー・リージョンの使者（カール）と秘密と同盟を結びかけており、来るべきフーバーダムの戦いでリージョン側についてNCRに復讐（自爆特攻）しようとしています。<br>プレイヤーは彼を説得し、「リージョンの同化政策の嘘（同盟後に部族が解体される事実）」を突きつけてリージョンとの同盟をを破棄させるか、あるいは部族の誇りを取り戻すために自分自身の足で新しい帝国（ワイオミング）へ旅立たせるか、モハビの勢力図の重要なカギを握る選択を行うことになります。</p>
`,
        kanso: "NCRからは単なる極悪レイダー集団としか見られていない部族ですが、パパ・カーンと内部まで関わってみると「彼らなりの絶対的なルールと誇張」があり、決してただの悪ではないことがわかります。彼らに「モハビを捨てて新しい帝国を作れ」と導くルートは、旧世代からの脱却を感じさせる名シナリオです。"
    },
    {
        title: "Gloria Van Graff",
        titleJa: "グロリア・ヴァン・グラフ",
        slug: "gloria-van-graff",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Gloria_Van_Graff",
        mainImg: imgData["gloria-van-graff"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "ヴァン・グラフ一族"],
            ["役職", "シルバーラッシュの店長兼ボス"],
            ["関連", "エネルギー兵器専門商人 / 真の悪党"],
        ],
        body: `
<h2>概要</h2>
<p>グロリア・ヴァン・グラフ（Gloria Van Graff）は、フリーサイドにあるエネルギー兵器専門店「シルバーラッシュ（旧カジノ）」の総責任者であり、NCR内で暗躍する巨大な犯罪商人ギルド『ヴァン・グラフ一族』の幹部です。</p>

<h2>詳細</h2>
<p>彼女は最高級のプラズマ兵器やレーザー兵器を独占的に取り扱っており、店内のテーブルには常に大量のエネルギー兵器がズラリと陳列されています。（なお、多くのプレイヤーによってステルスボーイとZキーでトイレに運ばれ、すべて盗まれるのがお約束の光景です）。</p>
<p>非常に冷酷なビジネスウーマンであり、自分たちの商売の邪魔になる独立系の小規模キャラバン（「キャシディ・キャラバン」等）を容赦なく武力で襲撃・皆殺しにし、市場を独占するという完全にブラックなマフィアのような商法を行っています。<br>コンパニオンの「キャス」の人生を狂わせた直接の張本人の一人であり、プレイヤーはヴァン・グラフ一味に加担して運び屋の仕事をするか、キャスの仇としてグロリアたちを皆殺しにしてシルバーラッシュを血の海にするかを選ぶことになります。</p>
`,
        kanso: "初回来店時に「見せしめの処刑」を堂々と行うなど、フリーサイドの闇を象徴する極悪女ボス。しかし彼女の店には最高の武器がたくさんあるため、大半のプレイヤーは「ある程度買い物を済ませて、用が済んだらキャスの報復と一緒に皆殺しにして在庫を頂く」という、レイダー顔負けの運び屋ムーブの犠牲になります。"
    },
    {
        title: "Fantastic",
        titleJa: "ファンタスティック",
        slug: "fantastic",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Fantastic",
        mainImg: imgData["fantastic"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "NCR (自称・主任研究員)"],
            ["役職", "ヘリオス1の電力制御(担当)"],
            ["関連", "理論物理学の学位（物理的に持っている）"],
        ],
        body: `
<h2>概要</h2>
<p>ファンタスティック（Fantastic）は、巨大太陽光発電所「ヘリオス1（HELIOS One）」で、NCR軍から『最高責任者（主任研究員）』として高給で雇われているサングラスの男です。</p>

<h2>詳細</h2>
<p>ヘリオス1の復旧任務を任されている彼は、いかにもプログラマーのような顔をして巨大な端末の前に立っています。しかしプレイヤーが話しかけると、彼が**「科学やコンピュータの知識を小指の先ほども持っていない完全な詐欺師（ただのアホ）」**であることが瞬時に露呈します。</p>
<p>NCRがヘリオス1を占拠した際、彼は「君たちは理論物理学の学位を知っているか？ 私は物理的に学位の紙を持っているぞ！」というハッタリ一発で、理系知識が皆無のNCR軍の将校たちを見事に騙し切り、現在の地位（毎日コンピューターのフリをしてボタンを適当に押すだけの簡単なお仕事）を手に入れました。<br>プレイヤーがシステムを復旧（メインフレームを修理）してあげると、「俺がやったって上司に報告していいか？」と満面の笑みで手柄を横取りしようとします。</p>
`,
        kanso: "Falloutシリーズを代表する『最強のハッタリ・アホ・お笑い枠』キャラクター。「俺の仕事はこの巨大な機械の全部のボタンを適当に押すことだ」と自慢げに語り、プレイヤーがシーザー軍団に寝返ると、あっさりリージョンの服に着替えて「俺はローマ万歳とか言うぜ」と寝返る、図太すぎる生命力の持ち主です。"
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
