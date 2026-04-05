// _batch_gen_fo4_locs5.js
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
        title: "Vault 88",
        titleJa: "Vault 88",
        slug: "vault-88",
        appearance: "Fallout 4 (Vault-Tec Workshop DLC)",
        wikiSlug: "Vault_88",
        mainImg: "E3_Fallout4_VaultTecWorkshop_Door.png",
        infoRows: [
            ["種族", "人間 (入植者) / グール"],
            ["区分", "未完成の地下核シェルター (Vault)"],
            ["所在地", "クインシー採石場・地下"],
            ["監督官", "バーストウ (グール) / 主人公"],
        ],
        body: `
<h2>概要</h2>
<p>Vault 88は、DLC「Vault-Tec Workshop」の舞台となる、連邦南東部の地下深くで建造途中のまま放棄されていた広大な核シェルター（Vault）の跡地です。</p>

<h2>詳細</h2>
<p>このVaultは、大戦争の勃発によって工事が中断され、完成を見ることなく200年の月日が流れました。当時からこの施設に留まり続け、グール化しながらもVault-Tecの使命に狂わんばかりの情熱を燃やし続けていたのが、本来の監督官である「バーストウ」です。<br>彼女の救難信号を受信してこの採石場の地下にやってきた主人公は、レイダーたちを掃討し、彼女と協力してこの広大な地下空間を切り拓き、自分だけの「完全オリジナルなVault」を一から建設していくことになります。</p>
<p>Vault-Tecの真の使命である「入植者たちを使った非人道的な社会実験（発電自転車での強制労働、眼球スキャン等）」をバーストウの命令通りに実行するか、あるいはマイルドな安全な実験に留めて彼女を落胆させる（あるいは追放する）かという独自のクエストラインが存在します。</p>
`,
        kanso: "「本編のワークショップ機能では満足できない建築ガチ勢」のための究極の遊び場。圧倒的な広さと高さを誇る地下空間に、本物のVaultのきれいな壁や廊下、アトリウムをパズルのように組み上げていく楽しさは時間泥棒そのものです。バーストウの狂ったVault-Tecイズムも非常に良いスパイスになっています。"
    },
    {
        title: "Vault 75",
        titleJa: "Vault 75",
        slug: "vault-75",
        appearance: "Fallout 4",
        wikiSlug: "Vault_75",
        mainImg: "Vault_75_entrance.png",
        infoRows: [
            ["種族", "ガンナー"],
            ["区分", "地下核シェルター (Vault)"],
            ["所在地", "モールデン中等学校の地下"],
            ["目的", "人類の遺伝子改良実験（優生学）"],
        ],
        body: `
<h2>概要</h2>
<p>Vault 75は、モールデン中等学校の地下に隠されたVault。現在は戦闘集団「ガンナー」が訓練施設および拠点として完全に占拠しています。</p>

<h2>詳細</h2>
<p>このVaultの本来の目的は、人類を「より強靭で優れた遺伝子を持つ種」へと人為的に進化させるという、極めて非人道的な優生学実験を行うことでした。<br>大戦争が起きた日、避難してきた学校の生徒と教師、親たちの中で、大人の家族や教職員はVaultに入った直後（セキュリティチームによって）全員がその場で処刑されました。そして残された18歳未満の「優秀な遺伝子を持つ子供たち」だけが隔離され、過酷な身体能力テストと洗脳教育を受けさせられました。</p>
<p>そして18歳になった子供は自動的に「卒業」と称して処刑され、その中で極めて優秀だった（遺伝子を抽出された）者や、ごく一部の従順な者が次の世代の監視役（研究スタッフ）として登用されるという、地獄のような連鎖が何世代にも渡って続いていました。最終的に被験者の反乱によってこのVaultは崩壊しました。</p>
`,
        kanso: "Vault-Tecの鬼畜実験の中でもとりわけ生々しく、子供たちをモルモットにして殺戮を繰り返した胸糞悪い過去を持つ場所。ガンナーたちの激しい抵抗を押し退けて監督官のターミナルにたどり着き、そのおぞましい記録を読んだプレイヤーは絶句することになります。また、Intelligenceのボブルヘッドが手に入る重要な場所でもあります。"
    },
    {
        title: "The Mechanist's lair",
        titleJa: "メカニストの隠れ家",
        slug: "the-mechanists-lair",
        appearance: "Fallout 4 (Automatron DLC)",
        wikiSlug: "The_Mechanist\\'s_lair",
        mainImg: "RobCoSalesAndServiceCenterInterior.png",
        infoRows: [
            ["種族", "ロボット (メカニスト軍団)"],
            ["区分", "ロボコ・セールス&サービスセンター地下"],
            ["所在地", "ボストン東部"],
            ["統治者", "メカニスト (イザベル・クルス)"],
        ],
        body: `
<h2>概要</h2>
<p>メカニストの隠れ家（The Mechanist's lair）は、DLC「Automatron」における最終決戦の舞台。ボストン東部にあるロボコ施設の地下に隠された、戦前の巨大な軍事用自動ロボット製造プラントです。</p>

<h2>詳細</h2>
<p>連邦全土に「人を助けるため」と称して凶悪な改造ロボット兵器を大量に放ち、結果として無差別に人々を殺戮させていた謎の人物「メカニスト」の絶対的な本拠地です。<br>主人公はコンパニオンであるエイダ（Ada）と共に各所のロボブレインからレーダー設備を回収し、この厳重に隠された地下プラントへ突入します。内部は無数のレーザートラップやアサルトロン、セントリーボットといった凶悪なロボットたちが防衛線を敷いています。</p>
<p>最深部のコントロールルームでは、メカニスト本人からの激しいロボットウェーブ防衛戦（弾幕シューティングゲームのような激戦）が行われます。全てを突破すると、メカニストの正体がただの「連邦の平和を願う空回りのオタク少女（イザベル・クルス）」であることが判明し、彼女を殺すか生かすかの選択となります。</p>
`,
        kanso: "DLCのクライマックスにふさわしい、火花とレーザーが飛び交う圧倒的なロボット軍団との激戦区。クエストクリア後はここを「居住地（ワークショップ）」として利用できるようになり、天井が高く平坦な空間であるため、自作のロボット工場やアリーナとして作り替える拠点ビルダーが後を絶ちません。"
    },
    {
        title: "Saugus Ironworks",
        titleJa: "サウガス製鉄所",
        slug: "saugus-ironworks",
        appearance: "Fallout 4",
        wikiSlug: "Saugus_Ironworks",
        mainImg: "FO4_Saugus_Ironworks.png",
        infoRows: [
            ["種族", "フォージ（レイダー）"],
            ["区分", "戦前の製鉄所跡地"],
            ["所在地", "連邦北東部"],
            ["統治者", "スラッグ"],
        ],
        body: `
<h2>概要</h2>
<p>サウガス製鉄所（Saugus Ironworks）は、戦前のマサチューセッツ州にあった大規模な鉄工所の廃墟。現在は炎と金属を崇拝する凶悪なレイダー集団「フォージ」の本拠地となっています。</p>

<h2>詳細</h2>
<p>内部は未だに溶鉱炉が真っ赤に燃え盛っており、非常に視界が悪く危険な空間です。フォージのメンバーたちは火炎放射器や火炎瓶、シシケバブといった炎に関する武器を愛用しており、新人は入隊の儀式として「高所から捕虜を燃える溶鉱炉に突き落とす」ことを強要されるなど、連邦のレイダーの中でも一際残虐でカルト的な集団です。</p>
<p>主人公は近くの居住地（フィンチ・ファーム）の息子である「ジェイク・フィンチ」が、家宝の剣（シシケバブ）を持ち出してフォージに入団してしまった問題を解決するため、この炎の要塞へと乗り込むことになります。<br>最上階の溶鉱炉エリアでは、パワーアーマーを着こなすフォージのリーダー「スラッグ」との一騎討ちが待ち受けています。</p>
`,
        kanso: "「炎を崇拝するモヒカン狂信者集団のアジト」という、マッドマックスの世界観をそのまま持ち込んだような極めてヒャッハーな名手動ロケーション。至る所から火炎瓶が飛んできて画面が真っ赤になる中、溶鉱炉の前で手に入るユニーク近接武器「シシケバブ（炎の剣）」のカッコよさに多くのプレイヤーが痺れました。"
    },
    {
        title: "Combat Zone",
        titleJa: "コンバットゾーン",
        slug: "combat-zone",
        appearance: "Fallout 4",
        wikiSlug: "Combat_Zone",
        mainImg: "FO4_Locations_27621_53.jpg",
        infoRows: [
            ["種族", "人間 (レイダー達)"],
            ["区分", "アンダーグラウンド闘技場"],
            ["所在地", "ボストン・コモンの中心部"],
            ["関連", "ケイトの雇用場所"],
        ],
        body: `
<h2>概要</h2>
<p>コンバットゾーン（Combat Zone）は、ボストンの中心で開かれている無法者たちのための地下格闘技アリーナです。レイダーたちが日々賭け事と血生臭いショーを楽しんでいます。</p>

<h2>詳細</h2>
<p>入り口から内部にかけて多数のレイダーがたむろしており、中央の巨大な金網（ケージ）では、屈強な女性グラディエーターである「ケイト（Cait）」がレイダーたちを相手にデスゲームを行っています。<br>主人公がこのアリーナに入ると、レイダーたちは主人公を侵入者と見なして一斉に襲いかかってきます。主人公が観客であるレイダーたちを全員皆殺しにすると、オーナーであるグールの「トミー・ローンスター」からケイトの所有権（マネジメント権）を買い取る（譲り受ける）提案を受けます。</p>
<p>これ以降、ピッキングの達人でありショットガンを愛用する魅力的なコンパニオン「ケイト」を引き連れて連邦を旅することが可能になります。</p>
`,
        kanso: "ダイアモンドシティで「危険だから近づくな」と何度も警告される悪名高い闘技場ですが、実態はケイトを仲間にするためのほぼ一本道のイベントエリアです。当初の開発段階ではここでプレイヤー自身が闘技場の選手として戦うクエストが実装される予定でしたが、カットコンテンツとなってしまった背景があります（MODで復元可能）。"
    },
    {
        title: "Thicket Excavations",
        titleJa: "シケット・エクスカーベーションズ",
        slug: "thicket-excavations",
        appearance: "Fallout 4",
        wikiSlug: "Thicket_Excavations",
        mainImg: "Fo4_Thicket_Excavations_Overview.png",
        infoRows: [
            ["種族", "レイダー / ミュータント・マイアルーク"],
            ["区分", "浸水した巨大採石場"],
            ["所在地", "コンコードの東"],
            ["関連", "サリー・マシスのポンプ修理"],
        ],
        body: `
<h2>概要</h2>
<p>シケット・エクスカーベーションズ（Thicket Excavations）は、戦前は大理石を採掘していた連邦最大級のすり鉢状の巨大な採石場です。大戦争後は長年の雨水などにより、最深部が完全に水没しています。</p>

<h2>詳細</h2>
<p>ゲーム序盤にここを訪れると、入り口で「サリー・マシス」という男が「水に沈んでしまったポンプを修理して水を抜きたい」と主人公に依頼してきます。水中に潜ってバルブを回し、マイアルークの巣を排除してポンプを起動すると、少しずつ水位が下がり始めます。<br>しかし、彼が言っていた「水を抜けば安全な居住地になる」というのは真っ赤なウソであり、数日〜数週間後に再びこの場所を訪れると、水が完全に抜け切った巨大な採石場一帯が「レイダーたちの超巨大な軍事キャンプ」として完璧に要塞化されています。</p>
<p>サリー・マシスの正体はレイダーのボスであり、主人公は彼らにダマされて「彼らの拠点作りのための水抜き」を手伝わされていたのでした。プレイヤーは彼への報復として、すり鉢状の最下層から狙撃してくる大量のレイダーたちと激戦を繰り広げることになります。</p>
`,
        kanso: "「地形そのものが時間経過でダイナミックに変化する」という、Fallout 4のマップデザインの凄さを見せつけるギミックロケーション。最初はただの池だと思っていた場所が、後日来ると見上げるほどの巨大な採掘要塞になっている光景と、NPCに騙されたという悔しさが相まって、絶対に忘れられない場所になります。"
    },
    {
        title: "Faneuil Hall",
        titleJa: "ファニュエル・ホール",
        slug: "faneuil-hall",
        appearance: "Fallout 4",
        wikiSlug: "Faneuil_Hall",
        mainImg: "Faneuil_Hall.jpg",
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["区分", "戦前の集会場 / 商業施設"],
            ["所在地", "ボストン中心部（金融街）"],
            ["関連", "金メッキのバッタ"],
        ],
        body: `
<h2>概要</h2>
<p>ファニュエル・ホール（Faneuil Hall）は、実在するボストンの歴史的建築物（会議場・市場）の廃墟です。現在はスーパーミュータントの大規模な拠点として占拠されています。</p>

<h2>詳細</h2>
<p>ボストンの市街地ど真ん中に位置しており、周囲の道路やビルの上から無数のスーパーミュータントと「スーサイダー」が爆弾を抱えて突っ込んでくる極めて危険な激戦区です。<br>この建物の屋上には、探偵ニック・バレンタインのクエスト「The Gilded Grasshopper」の目標となる「金メッキのバッタの風見鶏」が設置されています。プレイヤーはスーパーミュータントとの銃撃戦をくぐり抜けて屋上を目指し、バッタの中から戦前の古い暗号文書をヒントに、古き英雄の遺骸とユニーク剣「シェム・ドラウンの剣」を探し当てることになります。</p>
`,
        kanso: "実在のボストンの観光名所が、見事にミュータント共の死体袋と肉塊がぶら下がる地獄の宴会場になっているというロケーション。ここ周辺（とすぐ北のヘイマーケット・モール）を歩き回る時の処理落ちの激しさや、スーサイダーの「チクタク音」が複数の方向から聞こえてくる恐怖は多くのプレイヤーのトラウマです。"
    },
    {
        title: "Shaw High School",
        titleJa: "ショウ・ハイスクール",
        slug: "shaw-high-school",
        appearance: "Fallout 4",
        wikiSlug: "Shaw_High_School",
        mainImg: "Shaw_High_School.jpg",
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["区分", "高校の廃墟"],
            ["所在地", "ジャマイカ・プレインの北"],
            ["特記事項", "校長の秘密のメンタス実験"],
        ],
        body: `
<h2>概要</h2>
<p>ショウ・ハイスクール（Shaw High School）は、連邦南部にある戦前の巨大な高校の廃墟です。現在はスーパーミュータントたちのアジトになっています。</p>

<h2>詳細</h2>
<p>一見するとただのミュータント退治用のダンジョンですが、探索を進めると戦前のこの高校の「校長」が企てていたおぞましい計画の全貌が明らかになります。<br>この学校は成績不振によって州からの資金打ち切りを宣告されていました。そこで校長は、IQを一時的に爆発的に引き上げる薬物「メンタス（Mentats）」を大量に隠し持ち、それを極秘に特定の生徒たちへ密売・投与するという計画を実行しました。<br>そして見事に学校の平均成績を劇的に向上させて資金を獲得したものの、薬に依存してしまった生徒や、真実に気づいて校長を脅迫する生徒が現れるなど、大戦争の直前で学校がドロドロの内部崩壊を起こしていたというドラマがホロテープやターミナルに残されています。</p>
`,
        kanso: "「成績を上げるために生徒をシャブ漬け（メンタス漬け）にする校長」という、Fallout特有のブラックすぎるショートストーリーが詰まった名所。メンタスというアイテムが世界観の中でいかに危険で魅力的だったかが分かる秀逸なロケーションです。図書館（図書返却機）関連のクエストでもここを訪れることになります。"
    },
    {
        title: "West Everett Estates",
        titleJa: "ウエスト・エバレット私有地",
        slug: "west-everett-estates",
        appearance: "Fallout 4",
        wikiSlug: "West_Everett_Estates",
        mainImg: "FO4_West_Everett_Estates.jpg",
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["区分", "高級住宅街の廃墟"],
            ["所在地", "モールデンの南西"],
            ["関連", "ウェイン・トゥールンクィストの遺志"],
        ],
        body: `
<h2>概要</h2>
<p>ウエスト・エバレット私有地（West Everett Estates）は、かつての高級住宅街の跡地。現在はスーパーミュータントが塹壕を掘って住み着いています。</p>

<h2>詳細</h2>
<p>マップ上ではただのスーパーミュータントの拠点ですが、各家屋に散らばる「ターミナル」や「ホロテープ」を順番に追っていくことで、2077年の大戦争直後にこの住宅街で何が起きたのかという『ある家族の悲劇』を読み解くことができます。<br>核の炎をやり過ごした直後、住民のウェイン・トゥールンクィストとその息子たちは、略奪者から身を守るために近隣コミュニティで協力し合ってバリケードを築きました。しかし資源は枯渇し、最終的に彼らは地下室の隠し金庫に最も重要なものを残して、絶望的な防衛戦の末に離れ離れになってしまいました。</p>
<p>プレイヤーはこのウェインの残した音声記録を頼りに彼の金庫を見つけ出し、「スーパー・スレッジ」を手に入れることができます。</p>
`,
        kanso: "これぞ「環境ストーリーテリング（語られざる物語）」の極致。クエストマーカーは何一つ出ないにも関わらず、廃墟を漁って見つかる数本のホロテープの切実な声の演技だけで、戦後直後の普通の人々のサバイバルと悲劇が脳裏にありありと浮かびます。この住宅街の探索は、FO4の中でも屈指の没入感を誇ります。"
    },
    {
        title: "Suffolk County charter school",
        titleJa: "サフォーク郡チャータースクール",
        slug: "suffolk-county-charter-school",
        appearance: "Fallout 4",
        wikiSlug: "Suffolk_County_charter_school",
        mainImg: "FO4_map_Suffolk_County_Charter.jpg",
        infoRows: [
            ["種族", "フェラル・グール（ピンク色）"],
            ["区分", "公立学校の廃墟"],
            ["所在地", "連邦南部"],
            ["特記事項", "フードペースト実験校"],
        ],
        body: `
<h2>概要</h2>
<p>サフォーク郡チャータースクール（Suffolk County charter school）は、ガンナー・プラザの南西にある戦前の学校跡地。この学校に徘徊するフェラル・グールたちは、なぜか全員「毒々しいピンク色」の体色で光っています。</p>

<h2>詳細</h2>
<p>戦前の政府（あるいはVault-Tecに関連する組織）は、資金難にあえぐこの学校に対し「多額の補助金」と引き換えに、生徒たちの給食をすべて『NAPP（栄養代替ペーストプログラム）』と呼ばれる謎の「ピンク色のペースト（得体のしれない化学物質）」に完全に置き換えるという狂った人体実験を行っていました。<br>このピンクのペーストを食べ続けた生徒たちは徐々に情緒不安定になり、肌の色が変わり、大戦後には全員が「ピンク色のフェラル・グール」へと変異してしまったのでした。</p>
<p>現在でもこの学校のカフェテリアには大量の「ピンク色のフードペースト（Food paste）」が山積みになって放置されており、プレイヤーはそれを回収（もちろん食べることも）できます。</p>
`,
        kanso: "「補助金と引き換えに子供たちに謎のピンクスライムを食わせ続ける校長」という、これもまた痛烈な戦前アメリカのブラックジョークを孕んだロケーション。薄暗い校内で、不気味なピンク色に発光する子供の成れの果て達が襲いかかってくる光景は非常にシュールかつホラーです。"
    }
];

let tasks = Promise.resolve();

articles.forEach(article => {
    tasks = tasks.then(async () => {
        console.log(`Processing ${article.title}...`);
        
        // Dynamic extension based on mainImg definition
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
