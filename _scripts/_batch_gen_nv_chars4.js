// _batch_gen_nv_chars4.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_nv_char4.json', 'utf8'));
imgData["chief-hanlon"] = ["Chief_Hanlon.jpg"]; // Manual fix

const articles = [
    {
        title: "Borous",
        titleJa: "Dr. ボロス",
        slug: "borous",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Borous",
        mainImg: imgData["borous"][0],
        infoRows: [
            ["種族", "ロボット (脳髄 / シンクタンク)"],
            ["所属", "ビッグ・エンプティ (シンクタンク)"],
            ["役職", "動物・生物実験担当 (の脳)"],
            ["関連", "DLC: Old World Blues / カザドアの創造主"],
        ],
        body: `
<h2>概要</h2>
<p>Dr. ボロス（Borous）は、DLC『Old World Blues』の「シンクタンク」を構成する5人の科学者の一人であり、現在モハビでプレイヤーを苦しめている最悪の生物兵器「カザドア」と「ナイトストーカー」を生み出した張本人です。</p>

<h2>詳細</h2>
<p>非常に大声で、常に芝居がかったアナウンサーのような喋り方をし、動物や昆虫などの倫理観を無視した生体実験・遺伝子操作を専門としていました。戦前の高校時代にいじめられていた強烈なコンプレックスを抱えており、「俺を苛めたリッチー・マーカスめ！！」と意味不明な逆恨みを今でも叫び続けています。</p>
<p>彼が創造した最悪の生体兵器（カザドア等）は、本人は「実験施設の外では絶対に繁殖できない完全な生物」と思い込んでいますが、実際にはとっくに外界へ逃げ出し、200年の間にモハビ全土で大繁殖してウェイストランド人を食い殺しています。<br>プレイヤーが「お前が作ったカザドアが外で繁殖して人を殺しまくってるぞ」と事実を突きつけると、彼は動揺して「そ、そんなはずはない！私の計算は完璧だったはずだ！」と現実から目を背けようとします。</p>
`,
        kanso: "「カザドア」というFOシリーズ最強最悪のクソ害虫を生み出した戦犯。しかし、彼が決してただのサイコパスではなく、かつて飼っていた愛犬（ゲイブ）を失った悲しみや、青春時代のトラウマに今も囚われている哀しき人間（の脳みそ）であることが判明する愛犬イベントは、ボロスの見方が180度変わる名作クエストです。"
    },
    {
        title: "Lily Bowen",
        titleJa: "リリィ・ボウエン",
        slug: "lily-bowen",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Lily_Bowen",
        mainImg: imgData["lily-bowen"][0],
        infoRows: [
            ["種族", "スーパーミュータント (ナイトキン)"],
            ["所属", "ジェイコブズタウン"],
            ["役職", "コンパニオン / おばあちゃん"],
            ["関連", "レオ / ステルス・ガール"],
        ],
        body: `
<h2>概要</h2>
<p>リリィ・ボウエン（Lily Bowen）は、ジェイコブズタウンでビッグホーンの世話をしている心優しき「おばあちゃん」コンパニオンです。その正体は、2メートルを超える青い肌の巨大なステルス・ミュータント部隊『ナイトキン』の一人です。</p>

<h2>詳細</h2>
<p>彼女は戦前、Vault 17で平和に暮らしていた75歳の「普通のおばあちゃん」でした。<br>しかしマスターの軍団に拉致され、FEV（強制進化ウイルス）によって巨大な超人兵士へと変異させられてしまいました。その後遺症と、ナイトキン特有のステルスボーイ乱用による『統合失調症（精神崩壊）』により、彼女の脳内には常に「レオ」という暴力的なもう一つの凶暴な人格が住み着いています。</p>
<p>普段は「まあ、かわいいお孫ちゃん！」とプレイヤー（主人公）を自分の孫と勘違いして優しく接し、戦闘になると「おばあちゃんがやっつけてあげるからね！」と巨大なヘリコプターのプロペラ剣を振り回して敵をミンチにします。<br>Dr.ヘンリーの治療を続けるか、それともレオ（暴力の人格）に従うか、あるいは昔の孫たちの録音テープを聞き続ける（精神薬を半分に減らす）か、プレイヤーの選択が彼女の未来を決定します。</p>
`,
        kanso: "「おばあちゃん、それ（ヘリのプロペラ）重くない？」「これ？ただのお孫ちゃんのオモチャよ！」という会話が最高に和む最強の肉弾戦コンパニオン。彼女が時折聞いている「人間の頃の本当の孫たちの声」のテープの存在は、ミュータント化の悲惨さを静かに物語っています。"
    },
    {
        title: "Chief Hanlon",
        titleJa: "チーフ・ハンロン",
        slug: "chief-hanlon",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Hanlon", // Chief Hanlon
        mainImg: imgData["chief-hanlon"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "NCR (新カリフォルニア共和国)"],
            ["役職", "NCRレンジャー長官"],
            ["関連", "キャンプ・ゴルフ / 第一時フーバーダム攻防戦"],
        ],
        body: `
<h2>概要</h2>
<p>チーフ・ハンロン（Chief Hanlon）は、NCRの最精鋭部隊である「NCRレンジャー」を統括する最高責任者（長官）であり、第一次フーバーダム攻防戦でシーザー・リージョンを撃退した最大の功労者（英雄）の一人です。</p>

<h2>詳細</h2>
<p>現在はキャンプ・ゴルフの湖畔にあるリゾートハウスに駐留しており、白髪交じりの疲れた老兵といった様子を見せています。<br>かつてボルダーシティにリージョン兵を誘い込み、罠で街ごと爆破するという天才的な戦術で軍団長ジョシュアを破った彼は、現在モハビで「不自然な無線の嘘情報」を流し部隊を混乱させている内部犯でもあります。</p>
<p>彼がNCR軍を混乱させていた理由は、「モハビという砂漠の覇権争いに何の意味があるのか」「これ以上、無益な死で有能な若者（レンジャーたち）を失いたくない」という、組織の拡大路線に対する絶望と、疲弊しきった良心から来るものでした。<br>プレイヤーが彼を告発するか見逃すかによって、この老いた英雄の最後（自決するか、レンジャーを率いて再び戦うか）が変化します。</p>
`,
        kanso: "「我々はモハビに血を流しすぎた」と語る、NCRの暗部と限界を象徴する深いキャラクター。彼を突き止めた際、レンジャーの証であるレンジャー・セコイア（巨大なリボルバー）で自らの命を絶つルートの無常感はFNVのシナリオの最高峰であり、彼の長話（各部族の絶滅の歴史）は絶対に聞く価値があります。"
    },
    {
        title: "Swank",
        titleJa: "スワンク",
        slug: "swank",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Swank",
        mainImg: imgData["swank"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "チェアメン (ザ・トップス)"],
            ["役職", "副支配人 / ベニーの右腕"],
            ["関連", "チェッカーのスーツ"],
        ],
        body: `
<h2>概要</h2>
<p>スワンク（Swank）は、ストリップ地区の三大ファミリーの一つ「チェアメン（ザ・トップス・カジノ）」の副支配人であり、ボスのベニーに次ぐナンバー2の地位にあるスタイリッシュな男です。</p>

<h2>詳細</h2>
<p>ボスのベニーとは彼らが荒野の部族（ブートライダーズ）だった頃からの古い付き合いであり、Mr.ハウスに従って現在のスーツ姿の「チェアメン」となった後も、ベニーを深く信頼し、彼の指示に従ってカジノを取り仕切っています。<br>しかし、彼自身は「プラチナチップを盗み出してMr.ハウスを暗殺し、ニューベガスを乗っ取る」というベニーの狂った暴走計画については一切知らされていませんでした。</p>
<p>プレイヤーがベニーの計画の証拠（手紙やタバコの吸殻、イエスマンの存在など）を集めて彼に提示すると、スワンクは激しく動揺しながらも「ファミリーの掟（Mr.ハウスへの忠誠）」を優先し、ベニーを見限ってプレイヤーの暗殺（あるいは制裁）に全面的に協力してくれるようになります。</p>
`,
        kanso: "「ボスは絶対にそんな事しない！」と最初はプレイヤーを疑うものの、決定的な証拠を出されると「なんてこった、頭を冷やすために自分の部屋に連れ込むから、そこで好きなように（始末）してくれ」と即座に寝返る、見事なまでのマフィアの副官。彼を味方につけるとベニー戦が非常にスムーズになります。"
    },
    {
        title: "Muggy",
        titleJa: "マギー",
        slug: "muggy",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Muggy",
        mainImg: imgData["muggy"][0],
        infoRows: [
            ["種族", "ロボット (小型セキュリトロン)"],
            ["所属", "ビッグ・エンプティ (ザ・シンク)"],
            ["役職", "マグカップ清掃ロボット"],
            ["関連", "DLC: Old World Blues / マグカップ中毒"],
        ],
        body: `
<h2>概要</h2>
<p>マギー（Muggy）は、DLC『Old World Blues』の「ザ・シンク」に存在するAI家電の一つ。ミニサイズの可愛らしいセキュリトロンの体を持っていますが、その精神は「コーヒーマグ（マグカップ）への異常な執着」で完全に狂っています。</p>

<h2>詳細</h2>
<p>彼はかつてDr. O（オー）という、Mr.ハウスに対して強烈な劣等感を抱いていた科学者によって作られました。「ハウスの代名詞であるセキュリトロンを、ただのマグカップ洗い機にしてやったぜ！」というDr. Oの憂さ晴らしのためだけに創造された、非常に可哀想な存在です。</p>
<p>彼は「マグカップを見つけて、それを洗浄する」というプログラムを強制的に植え付けられており、「マグカップを見ると綺麗にしたいという欲望が抑えられない！俺は狂っている！殺してくれ！」と激しく葛藤しながら、プレイヤーが拾ってきたコーヒーマグを嬉々として分解します。<br>ゲーム的には、ただのジャンク品であるコーヒーマグを、空のシリンジや各種重要物資（エネルギーセル等）に変換してくれる非常に有能な便利ロボットです。</p>
`,
        kanso: "「あああっ！マグカップだ！！お願いだ、俺にそれを洗わせてくれェェェ！！」と叫び散らす、OWBの狂気（コメディ）を象徴するミニロボット。Dr. Oのくだらない八つ当たりのせいで永遠の強迫神経症に苦しんでいると考えると不憫ですが、そのリアクションが面白すぎて何十個もマグカップを渡してしまいます。"
    },
    {
        title: "Sink Central Intelligence Unit",
        titleJa: "シンク中央知能ユニット",
        slug: "sink-central-intelligence-unit",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Sink_Central_Intelligence_Unit",
        mainImg: imgData["sink-central-intelligence-unit"][0],
        infoRows: [
            ["種族", "AI (AI搭載型設備)"],
            ["所属", "ビッグ・エンプティ (ザ・シンク)"],
            ["役職", "ザ・シンクの執事・商人"],
            ["関連", "DLC: Old World Blues / 盲目のディオゲネス"],
        ],
        body: `
<h2>概要</h2>
<p>シンク中央知能ユニット（Sink Central Intelligence Unit）は、DLC『Old World Blues』の中心地である「ザ・シンク（The Sink）」のメインコンピューターであり、プレイヤーの執事兼、アイテムを売買してくれる優秀な商人AIです。</p>

<h2>詳細</h2>
<p>かつて「盲目のディオゲネス」と呼ばれたAIの人格がベースとなっていると言われており、トースターやマギーといった他の「狂人ぞろいの家電AI」達に比べると、非常に冷静で落ち着いたイギリス紳士のような気品あるトーンで話します。<br>シンク内の設備（ライトのオンオフ等）を制御し、プレイヤーが集めたユニークなアイテムをキャップで買い取ってくれます。</p>
<p>彼は他の家電たちを「少々風変わりな同居人」として呆れながらも纏め上げており、プレイヤーがOWBのクエストを完了した後のエンディングでは、彼らAI家電たちがその後どのような未来を歩んだのかを語り部として静かに語ってくれます。</p>
`,
        kanso: "狂人しかいないOWBの中で、唯一まともに「会話（商取引）」ができる心のオアシス。彼自身は動けませんが、非常に高い修理スキル（Repair 100）と大量のキャップを持っているため、モハビのどの商人よりも重宝される実用性No.1のAIです。"
    },
    {
        title: "James Hsu",
        titleJa: "ジェームズ・シュー",
        slug: "james-hsu",
        appearance: "Fallout: New Vegas",
        wikiSlug: "James_Hsu",
        mainImg: imgData["james-hsu"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "NCR (新カリフォルニア共和国)"],
            ["役職", "大佐 (キャンプ・マッカラン司令官)"],
            ["関連", "NCRの良心 / 有能な指揮官"],
        ],
        body: `
<h2>概要</h2>
<p>ジェームズ・シュー（James Hsu）大佐は、モハビにおけるNCRの最大規模の軍事拠点「キャンプ・マッカラン」の事実上の最高指揮官です。NCR軍の中で最も有能で、プレイヤーからの信頼も厚い「組織の良心」的な人物です。</p>

<h2>詳細</h2>
<p>彼の直属の上官であるオリバー将軍は、手柄と政治的アピールばかりを気にする無能な指揮官ですが、シュー大佐は常に最前線で兵士の命とモハビの平和を第一に考え、常に的確な判断を下します。<br>リージョンとの戦いだけでなく、地元のレイダー（フィーンド）の討伐、キングスとの和平工作、内部スパイの摘発など、山積みの過酷な任務に対して非常に真摯に取り組んでおり、運び屋（プレイヤー）の事もフラットな目線で高く評価してくれます。</p>
<p>「彼が本当のNCR軍のトップであれば、モハビはもっと平和になっていたはずだ」と多くのNPC（およびプレイヤー）から惜しまれる、非常に人格のできた大佐です。NCRルート以外を進めているプレイヤーであっても、彼だけは殺さずに見逃したいと思う人が後を絶ちません。</p>
`,
        kanso: "出世欲にまみれた無能な将軍や、官僚主義に毒されたNCRの政治家たちの中で、ただ一人「現場で泥水をすすりながら兵士を守り続ける」本物の軍人。彼に平和交渉の報告をした時の心底ホッとしたような優しい声色は、運び屋の心に響くものがあります。"
    },
    {
        title: "Silus",
        titleJa: "サイラス",
        slug: "silus",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Silus",
        mainImg: imgData["silus"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "シーザー・リージョン (ケントゥリオ)"],
            ["役職", "百人隊長 (捕虜)"],
            ["関連", "キャンプ・マッカラン / 尋問"],
        ],
        body: `
<h2>概要</h2>
<p>サイラス（Silus）は、シーザー・リージョンの高位指揮官「ケントゥリオ（百人隊長）」でありながら、NCR軍に敗北してキャンプ・マッカランの独房に捕縛されている捕虜です。</p>

<h2>詳細</h2>
<p>NCRは彼からリージョンの軍事機密（スパイの情報など）を聞き出そうと尋問を行っていますが、彼は「リージョンの戦士は死を恐れない」と不敵な笑みを浮かべ、NCR将校（ボイド中尉）を煽りまくって一切口を割りません。<br>業を煮やしたNCRから『彼から情報を引き出してくれ』と依頼されたプレイヤーが独房に入り、彼と直接対決（尋問）することになります。</p>
<p>しかし、実は彼の「リージョンへの狂信」は建前であり、内心では「軍団の掟（捕虜になることは恥であり、生きて帰ればシーザーに処刑される）」を極度に恐れて強がっているだけであることが対話（あるいは医療スキルでの指摘等）から発覚します。<br>プレイヤーは彼を巧みに脅迫・暴力で自白させるか、あるいは彼を密かに独房から逃がしてリージョン側の内通者（スパイ）になるかの選択が可能です。</p>
`,
        kanso: "「フン、俺を殺したければ殺せ！我々リージョンは死を恐れん！」→（Speech成功）→「ひぃっ！分かったから命だけは助けてくれ！」という、リージョンの虚勢と人間らしい弱点を見事に体現しているキャラクター。尋問クエストの駆け引きは非常に面白いです。"
    },
    {
        title: "Manny Vargas",
        titleJa: "マニー・バルガス",
        slug: "manny-vargas",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Manny_Vargas",
        mainImg: imgData["manny-vargas"][0],
        infoRows: [
            ["種族", "人間"],
            ["所属", "ノバックの防衛隊 / (元第1狙撃大隊 / 元グレートカーンズ)"],
            ["役職", "スナイパー"],
            ["関連", "ブーンの元相棒 / レプコン施設"],
        ],
        body: `
<h2>概要</h2>
<p>マニー・バルガス（Manny Vargas）は、ノバックの巨大な恐竜（ディノ・バイト・トイ）の口の中から、ブーンと交代で昼間の町を監視している有能なスナイパーです。<br>メインクエスト「They Went That-a-Way」で、運び屋の頭を撃ち抜いて逃げたベニーの行方を知る重要な人物です。</p>

<h2>詳細</h2>
<p>元々はグレート・カーンズのレイダーとして育ちましたが、組織を抜けてNCRの第1狙撃大隊に入隊。そこでコンパニオンの「ブーン」と親友（スポット担当と狙撃担当のコンビ）になりました。<br>兵役を終えた後はノバックに定住していますが、ブーンの妻である「カーラ」とは極度に折り合いが悪く、彼女がリージョンの奴隷として誘拐された事件に関して、ブーンから疑いの目を向けられ（あるいは疎まれ）、現在はかつての親友と完全に絶縁状態にあります。</p>
<p>プレイヤーがベニーの情報を求めると、彼は交換条件として「付近のレプコン実験施設に蔓延るグールを一掃してくれ」というクエスト（Come Fly With Me）を依頼してきます。<br>（※なお彼の部屋のターミナルをハッキング・またはスリ取れば、クエストを完全に無視して次の街へ進むことも可能です）。</p>
`,
        kanso: "序盤のプレイヤーにとって最大の壁（長大な寄り道クエスト「Come Fly With Me」）を押し付けてくる原因の男。「面倒くさいからターミナルだけ盗み見て無視する」というプレイスタイルは、FNVの自由度（クエストを無理にやらなくても物語が進む）を象徴するシステムとして有名です。"
    },
    {
        title: "Jason Bright",
        titleJa: "ジェイソン・ブライト",
        slug: "jason-bright",
        appearance: "Fallout: New Vegas",
        wikiSlug: "Jason_Bright",
        mainImg: imgData["jason-bright"][0],
        infoRows: [
            ["種族", "グール (発光グール)"],
            ["所属", "ブライト・ブラザーフッド"],
            ["役職", "創設者 / 教祖"],
            ["関連", "レプコン実験施設 / 彼方（Far Beyond）へ"],
        ],
        body: `
<h2>概要</h2>
<p>ジェイソン・ブライト（Jason Bright）は、レプコン実験施設を拠点とするグールの宗教カルト「ブライト・ブラザーフッド」の教祖（創設者）である光りし者（発光グール）です。</p>

<h2>詳細</h2>
<p>放射能の蓄積により体が緑色に神々しく発光しており、知性を保ったままの非常に温和で平和主義的な性格です。<br>彼は「グールという醜い姿の自分たちをこの世界（地球）は決して受け入れてくれない」と悟り、同胞のグールたちと共に戦前のロケットを使って「大いなる彼方（Far Beyond ＝ 宇宙、あるいは新天地）」へと脱出（巡礼）するという壮大な計画を指導しています。</p>
<p>施設を占拠した狂暴なナイトキン達の脅威から信徒を守りつつ、自らをグールだと思いこんでいる人間のメカニック「クリス・ハバーサム」の助けを借りてロケットの打ち上げ準備を進めています。<br>彼自身は教団の「嘘偽りのない真っ直ぐな信仰」を持っており、打ち上げの直前、プレイヤーの行い（ロケットを直すか、妨害するか）によって、彼らの巡礼が伝説的な成功を収めるか、悲劇的な事故（壁への激突）となるかが決まります。</p>
`,
        kanso: "クラシックラジオの名曲『Ride of the Valkyries』と共に、オンボロのロケットが本当に宇宙へと向かって（あるいは壁に向かって）飛散していくシーンは、Falloutシリーズ屈指の美しさとバカバカしさが同居した最高の名シーンです。ジェイソンのどこか浮世離れしたカリスマ性が見事にマッチしています。"
    }
];

let tasks = Promise.resolve();

articles.forEach(article => {
    tasks = tasks.then(async () => {
        console.log(`Processing ${article.title}...`);
        
        let imgUrl = null;
        let ext = '.jpg';
        
        // Manual override for Chief Hanlon as API returned empty array initially in temp JSON
        // The array might be filled by some check or we can just download from fandom via getImageUrl(article.mainImg)
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
                 // Fallback: If array was empty
                 if (article.slug === 'chief-hanlon') {
                     imgUrl = await getImageUrl('Chief_Hanlon.jpg');
                     if (imgUrl) { console.log('Resolved Chief Hanlon manually.'); }
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
