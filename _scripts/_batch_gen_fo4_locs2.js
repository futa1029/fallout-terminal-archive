// _batch_gen_fo4_locs2.js
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

const articles = [
    {
        title: "The Institute",
        titleJa: "インスティチュート",
        slug: "the-institute",
        appearance: "Fallout 4",
        wikiSlug: "The_Institute_(location)",
        mainImg: "Institute_Concourse.png",
        infoRows: [
            ["種族", "人間 / 人造人間（シンス）"],
            ["区分", "地下研究施設 / 派閥本部"],
            ["所在地", "連邦（C.I.T.廃墟の地下）"],
            ["統治者", "ファーザー（ショーン）"],
        ],
        body: `
<h2>概要</h2>
<p>インスティチュート（The Institute）は、連邦における最大の恐怖の対象であり、地下深くで高度な科学技術を研究し続けている秘密結社の本部です。戦前の「C.I.T.（連邦工科大学）」の生存者たちによって設立されました。</p>

<h2>詳細</h2>
<p>荒廃した地上世界（連邦）とは完全に切り離された、白を基調とする驚くほどクリーンで近未来的な巨大地下施設です。内部にはSRB（シンス・リテンション・ビューロー）、バイオサイエンス、アドバンス・システム等、部門ごとに特化した高度な研究セクターが存在し、無数の人造人間（シンス）たちが労働力として酷使されています。<br>彼らは「人類の再定義」というスローガンのもと、汚染された地上を見限っており、自らの実験のために地上へシンスを放って人々を誘拐し、暗殺し、本物とすり替えるといった非人道的な工作を繰り返しています。そのため、連邦の住人からは「夜中に人をさらうボギーマン」として恐れられています。</p>
<p>メインクエストの中盤、主人公は誘拐された息子「ショーン」の行方を追い、コーサーのチップを解読してテレポーターを自作することで、この不可侵の地下施設への侵入を果たすことになります。</p>
`,
        kanso: "「廃墟しかないFalloutの世界に、突如として現れるSF映画のような真っ白な未来都市」。初めてここへテレポートで転送された瞬間の芸術的なレベルデザインと、エレベーターを降りて全貌を見下ろした時の衝撃はFallout 4屈指のものです。彼らの技術力に惹かれて仲間になるか、地上の人々のためにこの美しい施設を核攻撃で粉砕するか、全てはプレイヤー次第です。"
    },
    {
        title: "Goodneighbor",
        titleJa: "グッドネイバー",
        slug: "goodneighbor",
        appearance: "Fallout 4",
        wikiSlug: "Goodneighbor",
        mainImg: "Goodneighbor-Fallout4.jpg",
        infoRows: [
            ["種族", "人間 / グール"],
            ["区分", "居住区 / はぐれ者の街"],
            ["所在地", "ボストン中心部（旧スコレイ広場）"],
            ["統治者", "ジョン・ハンコック"],
        ],
        body: `
<h2>概要</h2>
<p>グッドネイバー（Goodneighbor）は、ボストンの中心部にある無法者やグール、社会のはぐれ者たちが集まるアンダーグラウンドな街です。「ダイアモンドシティ」を追放された者たちの受け皿ともなっています。</p>

<h2>詳細</h2>
<p>戦前の金融街の中心にある裏路地をバリケードで囲って作られており、入り口の不気味なネオンサインが特徴です。<br>ダイアモンドシティの「反グール政策」によって居場所を失った者たちを、現在の市長である「ジョン・ハンコック（グール）」が受け入れて自治を確立しました。この街のモットーは「自分の身は自分で守れ、そして他人の権利を尊重しろ」というものであり、ルールを破る者には過酷な制裁が下されます。</p>
<p>街の中には、記憶を疑似体験できる「メモリー・デン」や、ロボットバーテンダーのホワイトチャペル・チャーリーがいる「サードレール」、狂気の発明家KL-E-0の武器屋など、非常に濃いキャラクターが集まっています。<br>主人公はメインクエストを進める中で、バレンタイン探偵やケロッグの脳の一部を調査するために必ずこの街のメモリー・デンを訪れることになります。</p>
`,
        kanso: "「ダイアモンドシティが表の顔なら、ここは裏の顔」。ノワール映画のようなハードボイルドな雰囲気に満ちた最高のロケーション。初めて訪れた際に絡んでくるチンピラを、市長のハンコック自身が躊躇なくナイフで刺し殺すという衝撃的な歓迎イベントは、この街の掟（自分以外を不当に傷つけてはならない）を体現しています。"
    },
    {
        title: "Glowing Sea",
        titleJa: "輝きの海",
        slug: "glowing-sea",
        appearance: "Fallout 4",
        wikiSlug: "Glowing_Sea",
        mainImg: "Fallout4_E3_Wasteland.png",
        infoRows: [
            ["種族", "チャイルド・オブ・アトム / クリーチャー"],
            ["区分", "極汚染地帯 (グラウンド・ゼロ)"],
            ["所在地", "連邦南西部一帯"],
            ["特記事項", "致死レベルの持続的な放射能汚染"],
        ],
        body: `
<h2>概要</h2>
<p>輝きの海（Glowing Sea）は、連邦の南西部にある広大で地獄のような放射能汚染地帯です。2077年の大戦争において、中国の核ミサイルが直撃した「グラウンド・ゼロ（爆心地）」そのものであり、現在も強烈な放射線と緑色の嵐が吹き荒れています。</p>

<h2>詳細</h2>
<p>通常の連邦マップの境界線を越えた先に広がるエリアであり、パワーアーマーやRAD-X、RADアウェイ、あるいは防護スーツを持たずに足を踏み入れることは文字通り自殺行為です。<br>風景は完全に焼け焦げて砂漠化しており、かつての街や建物はすべて土砂に埋もれています。生息しているのも「デスクロー」「ラッドスコルピオン」「ブラッドバグ」「フェラル・グール」などの最上位の恐ろしい変異生物のみです。</p>
<p>人間が住める環境ではありませんが、狂信的な宗教集団「チャイルド・オブ・アトム」の信者たちだけが、放射能を大いなる神の力と信じてクレーターの中心に住み着いています。また、その奥深くの放棄された地下施設には、インスティチュートから逃亡した重要人物「バージル」が隠れ住んでいます。</p>
`,
        kanso: "Fallout 4における「死の本能」を具現化したような恐ろしい場所。雷鳴と共に常に緑色の不気味な空が広がり、ガイガーカウンターがけたたましく鳴り響き続ける中で、土の中から巨大なラッドスコルピオンが飛び出してくる恐怖はたまりません。ここへ向かうためにパワーアーマーを点検して向かうワクワク感・緊張感は異常です。"
    },
    {
        title: "Vault 111",
        titleJa: "Vault 111",
        slug: "vault-111",
        appearance: "Fallout 4",
        wikiSlug: "Vault_111",
        mainImg: "Vault_111.png",
        infoRows: [
            ["種族", "人間 (プレイヤー)"],
            ["区分", "地下核シェルター (Vault)"],
            ["所在地", "サンクチュアリ・ヒルズ近郊"],
            ["目的", "長期的な極低温休眠実験"],
        ],
        body: `
<h2>概要</h2>
<p>Vault 111は、Vault-Tec社がボストン郊外に建造した地下シェルターであり、本作の主人公（唯一の生存者）が200年間のコールドスリープに就いていた、ゲームの開始地点です。</p>

<h2>詳細</h2>
<p>このVaultの真の実験目的は「人間を極低温状態にし、長期間の休眠がもたらす影響を観察する」ことでした。<br>大戦争が勃発した日、主人公とその家族はかろうじてこのVaultへ避難し、ダマされて冷凍ポッドに入れられます。しかし、数十年前（ゲーム本編から見て）にインスティチュートの傭兵ケロッグが侵入し、純粋な戦前のDNAを持つ赤ん坊の「ショーン」を誘拐し、抵抗した主人公の伴侶を射殺。再び主人公は冬眠させられました。</p>
<p>その後、謎の生命維持装置の停止によって主人公だけが奇跡的に目を覚まし、システムエラーによって白骨化・氷漬けになってしまった他の居住者たちを残して、たった一人でこのVaultから脱出することになります。入り口のマスターロックが掛かったケースには「クライオレーター」と呼ばれる強力な冷凍銃が眠っています。</p>
`,
        kanso: "愛する家族を奪われ、たった一人で重い歯車の扉を開けて200年後の眩しい外の光（と廃墟）を見るという、シリーズ屈指の絶望的でドラマチックなオープニングを飾る場所です。後日、犬（ドッグミート）を連れて戻ってくると、ガラスケース越しに「クライオレーター」をバグで見つけて取ってきてくれるという有名な裏技が存在しました（現在は修正済）。"
    },
    {
        title: "Concord",
        titleJa: "コンコード",
        slug: "concord",
        appearance: "Fallout 4",
        wikiSlug: "Concord",
        mainImg: "FO4_Conc_ext_3.jpg",
        infoRows: [
            ["種族", "レイダー / ミニッツメン"],
            ["区分", "市街地廃墟"],
            ["所在地", "連邦北西部"],
            ["関連", "自由博物館"],
        ],
        body: `
<h2>概要</h2>
<p>コンコード（Concord）は、Vault 111を出た主人公がサンクチュアリの次に訪れることになる中規模の歴史的な町です。アメリカ独立戦争における「コンコードの戦い」の舞台として知られています。</p>

<h2>詳細</h2>
<p>現在は無数のレイダーたちによって占拠されており、町の中心にある「自由博物館（Museum of Freedom）」において、プレストン・ガービーら「ミニッツメン」の最後の生き残り数名がバルコニーに立てこもりってレイダーと撃ち合っています。</p>
<p>主人公は彼らを救出するため、自由博物館に突入することになり、ここで最初のフュージョン・コアと「T-45 パワーアーマー」を手に入れます。さらに、屋上から飛び降りてミニガンでレイダーの群れをなぎ倒す最中、突如としてマンホールから飛び出してきた巨大な「デスクロー」と死闘を演じるという、強烈なチュートリアルイベントの舞台となります。</p>
`,
        kanso: "本来ならゲームの終盤や強敵として出会うはずの「パワーアーマー」「ミニガン」「デスクロー」の３つを、ゲーム開始後１時間で全部見せて惜しげもなくプレイヤーに戦わせるという、Fallout 4のド派手なゲーム性を象徴する最高の街。ここでの体験が、多くのプレイヤーを一気に作品の虜にしました。"
    },
    {
        title: "Lexington",
        titleJa: "レキシントン",
        slug: "lexington",
        appearance: "Fallout 4",
        wikiSlug: "Lexington",
        mainImg: "Lexington.jpg",
        infoRows: [
            ["種族", "フェラル・グール / レイダー"],
            ["区分", "市街地廃墟"],
            ["所在地", "連邦北西部"],
            ["関連", "コルベガ組立工場"],
        ],
        body: `
<h2>概要</h2>
<p>レキシントン（Lexington）は、コンコードの南東に位置する大規模な都市区画の廃墟です。無数のビルやアパートが立ち並び、プレイヤーが序盤に「本格的な市街地の探索」を経験するエリアとなります。</p>

<h2>詳細</h2>
<p>街の地表や地下（スーパーマーケット等）には大量のフェラル・グールが徘徊しており、高架下や屋上には重武装のレイダーたちが陣取っています。<br>特に「ファットマン（ヌカランチャー）」を持ったパワーアーマー装備のレイダーがビルの上から突然小型核爆弾を撃ち下ろしてくる場所として恐れられており、多くの初心者プレイヤーが警報音（「ヒューーー…」という落下音）と共にここで最初の爆死を経験します。</p>
<p>また、街の中心には「スーパーウルトラ・マーケット」があり、隣接する巨大な「コルベガ組立工場」と共に、ミニッツメンの序盤のクエスト（居住地開拓）でほぼ確証で討伐ミッションの目的地に指定されます。</p>
`,
        kanso: "序盤の最大の難所であり、「あの口笛のような音が聞こえたら全力で逃げろ（なお死ぬ）」というヌカランチャーの洗礼を受ける恐怖の街。入り組んだ市街地にレイダーとグールが密集しており、ステルスや遮蔽物を使った立ち回りの基本を文字通り死んで覚えることになります。"
    },
    {
        title: "Corvega assembly plant",
        titleJa: "コルベガ組立工場",
        slug: "corvega-assembly-plant",
        appearance: "Fallout 4",
        wikiSlug: "Corvega_assembly_plant",
        mainImg: "Corvega_assembly_plant_Fallout_4.png",
        infoRows: [
            ["種族", "レイダー"],
            ["区分", "巨大工業施設"],
            ["所在地", "レキシントン南縁"],
            ["統治者", "ジャレッド（レイダーのボス）"],
        ],
        body: `
<h2>概要</h2>
<p>コルベガ組立工場（Corvega assembly plant）は、連邦における最大級の工場地帯であり、戦前にクライスラー・ビル（現実世界）を彷彿とさせる流線型の原子力自動車「コルベガ」を一手に製造していた超巨大施設です。</p>

<h2>詳細</h2>
<p>現在はジャレッド率いる強力なレイダー集団の要塞として完全に改造されています。<br>外周の煙突や高所にはスナイパーやサーチライトが多数配置され、内部の下水道からメイン工場の生産ラインに至るまで、文字通り何十人ものレイダーが防衛網を敷いています。<br>ゲーム序盤において、「テンパインズの断崖」の住人（あるいはプレストンからの最初のミニッツメンクエスト）から「レイダーの親玉を倒してほしい」と依頼されて向かうことになる場所です。</p>
<p>施設があまりにも広大かつ立体的であるため、迷子になるプレイヤーが続出します。最上階の煙突の先端にある「整備用通路」にあるボブルヘッド（Repair）を取り忘れることも多々あります。</p>
`,
        kanso: "ゲーム開始直後にレベル一桁のプレイヤーが挑むには、あまりにもデカくて敵が多すぎる「序盤の壁」ロケーション。しかし、この巨大で複雑に入り組んだ工場をステルスや地の利を活かして制圧しきった時の謎の達成感は凄まじく、ここで集めた大量のレイダーアーマーと武器のスクラップが、将来の開拓の足がかりになります。"
    },
    {
        title: "Red Rocket truck stop",
        titleJa: "レッドロケット・トラックストップ",
        slug: "red-rocket-truck-stop",
        appearance: "Fallout 4",
        wikiSlug: "Red_Rocket_truck_stop",
        mainImg: "Red_Rocket_truck_stop.jpg",
        infoRows: [
            ["種族", "人間 (プレイヤー) / 犬"],
            ["区分", "居住区 / ワークショップ拠点"],
            ["所在地", "サンクチュアリとコンコードの中間"],
            ["関連", "ドッグミートとの出会いの場"],
        ],
        body: `
<h2>概要</h2>
<p>レッドロケット・トラックストップ（Red Rocket truck stop）は、戦前の原子力ガソリンスタンド（冷却水ステーション）の跡地であり、サンクチュアリの橋を渡ってすぐ南に位置しています。</p>

<h2>詳細</h2>
<p>ここはFallout 4のパッケージアートや多くのプロモーション映像の舞台として描かれた象徴的な場所です。<br>Vaultを脱出し、サンクチュアリから歩き出したプレイヤーが必ず立ち寄るようにレベルデザインされており、ここでプレイヤーを待つ一匹のジャーマンシェパード「ドッグミート」との運命の出会いを果たします。<br>また、施設内にはウェポン、アーマー、ケミストリー、クッキングなど一通りの作業台（ワークベンチ）が最初から揃っており、非常にコンパクトかつ見晴らしの良い防衛しやすい地形であるため、多くのプレイヤーがここを「自分専用の絶対的な前線基地（プライベート拠場）」として愛用しています。</p>
`,
        kanso: "「世界で一番帰りたくなるガソリンスタンド」。無駄に広くなく、防衛壁も設置しやすく、必要なものがすべて手の届く範囲にまとまっている最強のワンルームです。他の入植地には人を集めても、ここだけは「ドッグミートとコンパニオン、そして自分」の数人だけを住まわせて個人的な隠れ家にするというプレイヤーが星の数ほどいます。"
    },
    {
        title: "USS Constitution",
        titleJa: "USSコンスティチューション",
        slug: "uss-constitution",
        appearance: "Fallout 4",
        wikiSlug: "USS_Constitution",
        mainImg: "USS_Constitution.png",
        infoRows: [
            ["種族", "ロボット乗組員"],
            ["区分", "歴史的軍艦 / ランドマーク"],
            ["所在地", "チャールズタウンにあるビルの屋上"],
            ["船長", "キャプテン・アイアンサイズ"],
        ],
        body: `
<h2>概要</h2>
<p>USSコンスティチューション（USS Constitution）は、現実のアメリカ海軍にも実在する歴史的な木造帆船（フリゲート艦）ですが、Falloutの狂った世界観によって船体に「巨大なロケットエンジン」が取り付けられ、なぜか内陸のビルの屋上に突き刺さっているという異常なロケーションです。</p>

<h2>詳細</h2>
<p>この船の現在の持ち主は、旧時代のアメリカ海軍の帽子を被り、誇り高く振る舞う巨大なセントリーボット「キャプテン・アイアンサイズ」と、その配下のハンディやプロテクトロンたちです。<br>彼らは「この船を海へと帰し、共産党の脅威からアメリカの海を守る」という壮大なプログラムバグ（あるいは究極のロマン）のために活動しており、船を狙うレイダー（スカベンジャー）たちと抗争を繰り広げています。</p>
<p>プレイヤーは彼らに協力し、レーダー設備やエンジンの修理、ターボポンプの調達を行って、この巨大な帆船を再び空中へと「出航」させるか、あるいはスカベンジャーに加担してロボットたちを破壊するかの選択を迫られます。</p>
`,
        kanso: "ビルの屋上に巨大な木造の海賊船（軍艦）が座礁しており、中には海軍気取りの愉快なロボットたちがいるという、Falloutイズム全開の「最高のバカバカしさ」が詰まった伝説のクエスト。彼らに味方して見事にロケットを点火させ、船がボストンの空を（数十メートルだけ）飛んで、別の高層ビルに突き刺さるオチは必見です。"
    },
    {
        title: "Far Harbor",
        titleJa: "ファー・ハーバー",
        slug: "far-harbor-loc",
        appearance: "Fallout 4 (Far Harbor DLC)",
        wikiSlug: "Far_Harbor_(location)",
        mainImg: "FarHarborTown-FarHarbor.jpg",
        infoRows: [
            ["種族", "人間 (ハーバーマン)"],
            ["区分", "居住区 / 漁港"],
            ["所在地", "マウント・デザート島 (メイン州)"],
            ["統治者", "エイヴリー"],
        ],
        body: `
<h2>概要</h2>
<p>ファー・ハーバー（Far Harbor）は、超大型DLC「Far Harbor」の舞台となるマウント・デザート島の入り口に位置する漁港であり、霧に覆われた過酷な島を生き抜く「ハーバーマン（島民）」たちの最後の防衛拠点です。</p>

<h2>詳細</h2>
<p>本土の連邦とは異なり、この島全体は「霧」と呼ばれる放射能と特有の狂気を帯びたガスに覆われており、ガルパーやアングラーといった凶悪な両生類の変異生物が徘徊しています。<br>ファー・ハーバーの街はその霧を押し留めることができる「特別な送風機（コンデンサー）」によって辛うじて守られた小さな安全地帯であり、常に怪物の襲撃の脅威に晒されています。</p>
<p>島民たちは非常に排他的で頑固ですが、本土からやってきた主人公の助けを借りて島（アカディアのシンス、およびニュークリアスのチャイルド・オブ・アトム）との血で血を洗う対立関係に立ち向かうことになります。</p>
`,
        kanso: "スティーヴン・キングの小説「ミスト」のような、濃霧に覆われたどんよりとした漁村の雰囲気が最高に恐ろしく、そして美しいロケーションです。島に着いた瞬間に村人共々怪物たちの強襲を受ける演出から始まり、ドス黒い人間関係のドラマと、選択次第でこの村を「文字通り全滅（コンデンサーの停止）」させることもできるという、Fallout本来のビターなRPG体験が味わえます。"
    }
];

let tasks = Promise.resolve();

articles.forEach(article => {
    tasks = tasks.then(async () => {
        console.log(`Processing ${article.title}...`);
        
        let imgUrl = await getImageUrl(article.mainImg);
        
        // Dynamic extension
        let ext = '.jpg';
        if (imgUrl) {
            let extMatch = imgUrl.match(/\.([a-zA-Z0-9]+)(?:[\?\/]|$)/);
            if (extMatch) ext = '.' + extMatch[1];
        } else {
            console.log(`Warning: Failed to get URL for ${article.mainImg}`);
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
