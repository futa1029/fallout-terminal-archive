// _batch_gen_fo4_locs12.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_fo4_locp12.json', 'utf8'));

const articles = [
    {
        title: "USAF Satellite Station Olivia",
        titleJa: "USAF衛星通信基地オリビア",
        slug: "usaf-satellite-station-olivia",
        appearance: "Fallout 4",
        wikiSlug: "USAF_Satellite_Station_Olivia",
        mainImg: imgData["usaf-satellite-station-olivia"][0],
        infoRows: [
            ["種族", "レイダー (アックアックのギャング) / モールラット / ラッドローチ"],
            ["区分", "戦前の米空軍(USAF)衛星通信基地"],
            ["所在地", "サンクチュアリの東"],
            ["統治者", "アックアック (Ack-Ack)"],
            ["クエスト", "Returning the Favor (アバナシー農園)"],
        ],
        body: `
<h2>概要</h2>
<p>USAF衛星通信基地オリビア（USAF Satellite Station Olivia）は、戦前のアメリカ空軍（USAF）が使用していた巨大なパラボラアンテナを備えた通信施設の跡地。ゲーム序盤におけるレイダーたちの強力な拠点となっています。</p>

<h2>詳細</h2>
<p>このロケーションは、多くのプレイヤーが「ミニガン」を持つ敵と初めて交戦する場所として有名です。<br>この基地を拠点にしているレイダーの女ボス「アックアック（Ack-Ack）」の一味は、近くのアバナシー農園の娘メアリーを襲撃して残酷に殺害し、彼女の形見である「銀のロケット（ペンダント）」を奪い去りました。主人公はアバナシー家のブレイクからの依頼で、愛娘の仇を討ちロケットを取り返すためにこの地下施設へと潜入します。</p>
<p>地下は薄暗い廊下と小部屋で構成されており、レイダーだけでなく獰猛なモールラットや無数のラッドローチが生息しています。最深部の通信室にはアックアックが陣取っており、彼女が乱射してくるミニガンの猛烈な弾幕は、装備の貧弱な序盤のプレイヤーにとって極めて危険です。無事に彼女を倒せば、ロケットと共に初めての重火器であるミニガンを戦利品として獲得できます。</p>
`,
        kanso: "「序盤の難所」としてプレイヤーに立ちはだかる最初の本格的なレイダー拠点。アックアックのミニガンの銃声が地下室に鳴り響いた時の絶望感と、それを何とか倒して娘のロケットを取り返したときのカタルシスは格別で、連邦での探索の厳しさと楽しさを教えてくれる名所です。"
    },
    {
        title: "Andrew station",
        titleJa: "アンドリュー駅",
        slug: "andrew-station",
        appearance: "Fallout 4",
        wikiSlug: "Andrew_station",
        mainImg: imgData["andrew-station"][0],
        infoRows: [
            ["種族", "レイダー"],
            ["区分", "地下鉄駅の廃墟 / 隠しバンカー"],
            ["所在地", "南ボストン（キャッスルの北西）"],
            ["関連", "エディー・ウィンター / ニック・バレンタイン"],
        ],
        body: `
<h2>概要</h2>
<p>アンドリュー駅（Andrew station）は、戦前のボストン地下鉄（MBTA）の駅の廃墟です。現在はレイダーたちがアジトとして利用していますが、それらのレイダー達すら気付いていない『真の秘密』がこの駅の奥深くには眠っています。</p>

<h2>詳細</h2>
<p>このロケーションの真の価値は、コンパニオン「ニック・バレンタイン」の好感度クエスト「Long Time Coming」の最終目的地であることです。<br>連邦各地の警察署跡に隠された『エディー・ウィンターのホロテープ 1～9』を全て集め、暗号を解読することで、このアンドリュー駅の片隅にある隠し扉のキーパッド（パスコード）を入力できるようになります。</p>
<p>扉を開けた先に広がるのは、戦前のボストン裏社会を牛耳り、ニックの婚約者を殺害した冷酷なマフィアのボス「エディー・ウィンター」が、大戦争の直前に自身をグール化させて引きこもっていた超豪華な核シェルターです。彼は200年もの間、この駅の地下の密室でたった一人で生き延びていました。<br>プレイヤーはニックと共にこのバンカーに踏み込み、200年越しのケジメをつけることになります。</p>
`,
        kanso: "ニック・バレンタインとの長きにわたるホロテープ探しの旅が、ついに決着を迎える感動と復讐の聖地。エディー・ウィンターのバンカーの内装の豪華さと、200年引きこもっていた彼のグールとしての姿には、戦前のマフィアの執念とFallout世界の奇妙さが詰まっています。"
    },
    {
        title: "Park Street station",
        titleJa: "パークストリート駅",
        slug: "park-street-station",
        appearance: "Fallout 4",
        wikiSlug: "Park_Street_station",
        mainImg: imgData["park-street-station"][0],
        infoRows: [
            ["種族", "トリガーマン （マフィア）"],
            ["区分", "地下鉄駅の廃墟"],
            ["所在地", "ボストン中心部（スワンの池のすぐ隣）"],
            ["関連", "Vault 114への入り口"],
        ],
        body: `
<h2>概要</h2>
<p>パークストリート駅（Park Street station）は、ボストン・コモン（スワンの池）のすぐ足元にある地下鉄駅の入り口です。メインクエスト「Unlikely Valentine」において、捕らわれの探偵ニックを救出するために最初に突入する激戦区です。</p>

<h2>詳細</h2>
<p>この駅の内部は、一般的なレイダーではなく、戦前のギャングスタイル（スーツとトミーガン）で武装した「トリガーマン」というマフィアたちの縄張りになっています。<br>駅の構内は非常に広く、改札口からプラットフォーム、さらに地下鉄の線路跡を満水にしている汚染水地帯を抜けていく必要があります。トリガーマンたちのトミーガン（サブマシンガン）の連射は遮蔽物の少ないプラットフォームで脅威となります。</p>
<p>駅の最深部は未完成の核シェルター「Vault 114」の巨大な歯車ドアへと直結しており、プレイヤーはトリガーマンの死体の山を築きながらこのVault内部へと侵攻していくことになります。また、フリーダム・トレイル（レールロードを探すクエスト）の開始地点のすぐ近くでもあります。</p>
`,
        kanso: "「地下鉄の駅の奥に、工事途中のVaultの巨大な扉が隠されている」というワクワクするシチュエーションが体験できる名所。トミーガンを持ったトリガーマンたちが駅のホームで待ち構えている絵面は、マフィア映画とポストアポカリプスが融合したFO4ならではの最高の雰囲気です。"
    },
    {
        title: "Fraternal Post 115",
        titleJa: "フラターナルポスト115",
        slug: "fraternal-post-115",
        appearance: "Fallout 4",
        wikiSlug: "Fraternal_Post_115",
        mainImg: imgData["fraternal-post-115"][0],
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["区分", "戦前の退役軍人ホール（集会所）"],
            ["所在地", "ケンブリッジの南エリア"],
            ["統治者", "デッドアイ（Dead-Eye）"],
        ],
        body: `
<h2>概要</h2>
<p>フラターナルポスト115（Fraternal Post 115）は、戦前に退役軍人たちが集まり、スピーチや式典を行っていた立派なホール（在郷軍人会の建物）の跡地です。現在はスーパーミュータントの拠点となっています。</p>

<h2>詳細</h2>
<p>このロケーションを支配しているのは「デッドアイ（Dead-Eye）」という名のユニークなスーパーミュータントのボスです。彼はその名の通り「盲目（全盲）」であり、視力が全くありません。<br>しかし、彼は非常に聴覚が発達しており、部下のミュータントたちに「音を立てるな」「敵の足音だけを聞け」と指示を出しながら、ミサイルランチャーやミニガンで武装した部下を的確に指揮してプレイヤーを追い詰めてきます。</p>
<p>建物の1階はスピーチ用の演壇と客席が残されており、大戦争の直前にここで栄誉ある演説が行われる予定だったことがターミナルから読み取れます。デッドアイのユニークな設定と、狭い室内での激戦が非常に印象的なロケーションです。</p>
`,
        kanso: "「全盲のスーパーミュータントが指揮を執っている」という、ベセスダの細部へのこだわりを感じるユニークな拠点。実際に彼に隠密で近づくと、見えていないはずなのに足音や匂いで正確にこちらを察知してミサイルをぶち込んでくるため、非常に恐ろしい相手です。"
    },
    {
        title: "Monsignor Plaza",
        titleJa: "モンシニョール・プラザ",
        slug: "monsignor-plaza",
        appearance: "Fallout 4",
        wikiSlug: "Monsignor_Plaza",
        mainImg: imgData["monsignor-plaza"][0],
        infoRows: [
            ["種族", "ガンナー / レイダー"],
            ["区分", "戦前の大型ショッピングモール"],
            ["所在地", "ケンブリッジの東側（C.I.T.廃墟の近く）"],
            ["特記事項", "内部の激しい銃撃戦"],
        ],
        body: `
<h2>概要</h2>
<p>モンシニョール・プラザ（Monsignor Plaza）は、戦前のアメリカで栄えていた吹き抜け構造の大型ショッピングモールの廃墟です。現在は強力な傭兵組織「ガンナー」がここを要塞化し、アジトとして占拠しています。</p>

<h2>詳細</h2>
<p>モールの内部は、中央に巨大な空間が広がり、その周囲を2階・3階の店舗の通路が囲んでいるという、ショッピングモール特有の立体的な構造を持っています。<br>この構造を利用して、ガンナーたちは上の階からプレイヤーに対して激しい十字砲火や手榴弾、時にはミサイルランチャーを浴びせてきます。遮蔽物として利用できるのは壊れた店舗の壁や瓦礫のみであり、FO4の市街地ダンジョンの中でも非常に熱い「撃ち下ろされながらの室内制圧戦」が楽しめます。</p>
<p>かつての洋服店や本屋などの看板がそのまま残っており、ガンナーたちを殲滅した後は、戦前のモールを探索して様々な物資（服飾系ジャンクなど）を回収することができます。</p>
`,
        kanso: "「吹き抜けのショッピングモールで、上階の通路からガンナーの精鋭部隊に一斉射撃される」というシチュエーションが熱すぎる激戦区エリア。入り口から入った瞬間にレーザーの嵐が降ってくるため、スナイパーライフルで上の敵を一人ずつ片付けるか、パワーアーマーで階段を強襲するか、戦闘の楽しさが詰まっています。"
    },
    {
        title: "West Roxbury station",
        titleJa: "ウェスト・ロックスバリー駅",
        slug: "west-roxbury-station",
        appearance: "Fallout 4",
        wikiSlug: "West_Roxbury_station",
        mainImg: imgData["west-roxbury-station"][0],
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["区分", "地下鉄駅 / パズルダンジョン"],
            ["所在地", "ボストン南部（ファロンデパートの西）"],
            ["関連", "走行する列車のパズル"],
        ],
        body: `
<h2>概要</h2>
<p>ウェスト・ロックスバリー駅（West Roxbury station）は、ファロンデパート等が近くにある治安最悪のエリアに位置する地下鉄駅の廃墟。スーパーミュータントの巣窟であると同時に、FO4屈指の「パズルのある駅」として有名です。</p>

<h2>詳細</h2>
<p>この駅の最大の特徴は、駅のホームの制御盤（ボタン）を押すことで、なんと200年経った現在でも「地下鉄の列車（車両）が動く」というギミックです。<br>ホームには左右に2つの列車が停まっており、ボタンを押すと列車が前後にスライド走行します。車両のドアが開いている箇所が通路として機能するため、「左の列車を奥に動かし、右の列車を手前に動かして、開いたドアを通って隣のホームや奥の隠し部屋へ渡る」という、巨大な倉庫番のような大掛かりなパズルを解く必要があります。</p>
<p>列車を動かすたびにけたたましい稼働音が響き、それに気付いたスーパーミュータントたちが車両の隙間から襲いかかってきます。最深部の隠し倉庫にはプロテクトロンや貴重な弾薬が眠っています。</p>
`,
        kanso: "「スイッチを押すと地下鉄の車両がガシャンガシャンと動き出し、道を切り開く」というギミックが最高に楽しい異色の地下鉄ダンジョン。単純に敵を倒すだけでなく、列車のドアの位置を合わせる空間認識能力が求められ、スーパーミュータントとの戦闘とパズルが見事に融合しています。"
    },
    {
        title: "Four Leaf fishpacking plant",
        titleJa: "フォー・リーフ・プラント（水産加工所）",
        slug: "four-leaf-fishpacking-plant",
        appearance: "Fallout 4",
        wikiSlug: "Four_Leaf_fishpacking_plant",
        mainImg: "Four_Leaf_fishpacking_plant.jpg", // Pre-calculated image as not available in the API fallback
        infoRows: [
            ["種族", "フェラル・グール（屋外）/ ワーカー（マフィア）"],
            ["区分", "戦前の魚加工工場 / 秘密の薬物工場"],
            ["所在地", "南ボストンの海岸沿い"],
            ["関連", "マロースキーのケミストリー・ラボ"],
        ],
        body: `
<h2>概要</h2>
<p>フォー・リーフ・プラント（Four Leaf fishpacking plant）は、戦前の魚肉加工プラントの廃墟です。<br>一見するとただのグールだらけのボロボロの工場地帯ですが、この工場の「真の姿」は、グッドネイバーの有力なマフィアのボス『マロースキー』が所有する大規模な秘密の薬物（ケミストリー）工場です。</p>

<h2>詳細</h2>
<p>建物の外側と1階部分は、フェラル・グールたちが大量に徘徊しており、ただの危険な廃墟に偽装されています。しかし、屋上の特定の隠し扉などからパスワードを使って侵入できる「厳重に隔離された防護室（ラボ）」の内部では、防護スーツを着込んだマロースキーの部下の「ワーカー」たちが、日夜大量の違法薬物（ジェット等のケム）を製造しています。</p>
<p>ダイアモンドシティの「ダイアモンドシティ・ブルース」という一連の暗黒街クエストにおいて、マロースキーの資金源を絶つためにこのラボのパスワードを奪い、内部に乗り込んでワーカーたちを殲滅（または彼らから袖の下を受け取る）する重要な舞台となります。<br>ラボ内では大量のケム素材や防護スーツが手に入ります。</p>
`,
        kanso: "「廃墟の工場地帯を擬態させた地下に、防護服を着た薬物密造組織のアジトが隠されている」という、アメリカの人気ドラマ『ブレイキング・バッド』を彷彿とさせる設定がたまらなくクール。悪党になりきってマロースキーのシマを荒らすロールプレイはFO4の醍醐味です。"
    },
    {
        title: "Gwinnett brewery",
        titleJa: "グウィネット醸造所",
        slug: "gwinnett-brewery",
        appearance: "Fallout 4",
        wikiSlug: "Gwinnett_brewery",
        mainImg: "Gwinnett_brewery.png", // Pre-calculated
        infoRows: [
            ["種族", "スーパーミュータント / マイアルーク"],
            ["区分", "戦前のビール工場"],
            ["所在地", "南ボストン（キャッスルの北東）"],
            ["関連", "グウィネット・エール / 酒のレシピ"],
        ],
        body: `
<h2>概要</h2>
<p>グウィネット醸造所（Gwinnett brewery）は、連邦中で愛されている戦前からの銘酒「グウィネット・エール」や「グウィネット・スタウト」などのビールやすべての系列酒を醸造していた巨大なビールの工場の跡地です。</p>

<h2>詳細</h2>
<p>工場内部は、巨大なビールタンクやパイプが複雑に入り組んでおり、現在はスーパーミュータントの大規模な拠点として汚染されています。<br>この場所で最も価値があるのは、最深部のセキュリティルームにあるターミナルです。ここにはグウィネット・ビール各種の「本物の醸造レシピ（サブレーベル・レシピ）」が含まれたホロテープが残されており、これをダイアモンドシティの酒場「コロニアル酒場」のロボットバーテンダー（ワドスワース）に渡すことで、高額な報酬を得ることができます。</p>
<p>また、ビール工場らしく、工場の至る所に未開封の戦前のビール瓶が山のように残されており、アルコールを愛用する（Party Boy/Girl等）プレイヤーにとっては垂涎の補給物資の宝庫となっています。</p>
`,
        kanso: "「ビール工場を占拠したミュータントを退治して、幻の酒のレシピを持ち帰る」。荒廃した世界での、ささやかながらも最高のトレジャーハントクエストの舞台です。パイプやタンクなどの工場資産がそのまま残っているため、探索していても「ここは酒を作っていたんだ」と実感できる構造が素晴らしいですね。"
    },
    {
        title: "Irish Pride Industries shipyard",
        titleJa: "アイリッシュプライド工業造船所",
        slug: "irish-pride-industries-shipyard",
        appearance: "Fallout 4",
        wikiSlug: "Irish_Pride_Industries_shipyard",
        mainImg: imgData["irish-pride-industries-shipyard"][0],
        infoRows: [
            ["種族", "マイアルーク / ルーレット（犬）"],
            ["区分", "戦前の造船所 / 船のドック"],
            ["所在地", "連邦北東部（バンカーヒルの東）"],
            ["関連", "悲劇のSOS / 密閉された船室"],
        ],
        body: `
<h2>概要</h2>
<p>アイリッシュプライド工業造船所（Irish Pride Industries shipyard）は、戦前に巨大な船を建造・修理していた広大な大型ドック（造船所）の跡地。現在は内部が大きく浸水しており、マイアルークたちの巨大な巣となっています。</p>

<h2>詳細</h2>
<p>内部には骨組みだけの巨大な船が鎮座しており、その水浸しの船底や通路から大量のマイアルークが湧き出てきます。<br>このロケーションには、FO4における非常に物悲しい環境ストーリーテリングが存在します。プレイヤーは「誰か助けてくれ、船に閉じ込められた」という無線での悲痛なSOSを受信してここにやってきます。<br>マイアルークを退けながら船の内部へと進み、ターミナルでハッチを開けると、そこには無線を発信していたレイダー（または一般の生存者）と、彼の愛犬「ルーレット」の白骨化した死体が横たわっています。彼らはマイアルークの襲撃から逃れるため船室に閉じこもりましたが、最終的に餓死するか、狂乱状態の果てに命を絶ったという絶望的な結末が描かれています。</p>
`,
        kanso: "「助けを求める無線に応えて決死の潜入をした結果、既に手遅れだった」というFalloutあるあるのもどかしさと悲哀を強く感じる場所。主人と共に死んでいった愛犬ルーレットの死体が、ウェイストランドの無情な現実をこれでもかとプレイヤーの心に突き刺してきます。"
    },
    {
        title: "Hester's Consumer Robotics",
        titleJa: "ヘスター・ロボティクス",
        slug: "hesters-consumer-robotics",
        appearance: "Fallout 4",
        wikiSlug: "Hester's_Consumer_Robotics", // Note the apostrophe might be needed or not, Fandom API handles nicely usually
        mainImg: imgData["hesters-consumer-robotics"][0],
        infoRows: [
            ["種族", "ロボット (Mr.ハンディほか)"],
            ["区分", "戦前のロボットショールーム"],
            ["所在地", "ボストン中心部（ファニエル・ホールの西）"],
            ["特記事項", "ショーウィンドウからのロボット襲来"],
        ],
        body: `
<h2>概要</h2>
<p>ヘスター・ロボティクス（Hester's Consumer Robotics）は、ボストン市街地にある、戦前の家庭用や工業用のロボットを販売・展示していた大型店舗（ショールーム）の跡地です。</p>

<h2>詳細</h2>
<p>この店舗の恐ろしい点は、通りに面した巨大なガラス張りのショーウィンドウの内側に、プロテクトロンやMr.ハンディ、アサルトロンといった商品ロボットがいまだに無傷でずらりと展示されていることです。<br>プレイヤーが不用意に店舗の前に近づいたり、周囲で銃撃戦によって音を立てたり（またはガラスが割れたり）すると、これらの機能停止していたロボットたちが防衛システムのエラーによって一斉に起動し、窓ガラスを突き破ってプレイヤーに襲いかかってきます。</p>
<p>内部のターミナルには、戦前の店長が「新製品（暴徒鎮圧用ロボット）の展示」に頭を悩ませていた記録が残されており、この狂ったロボット展示場と化した店舗の背景設定を補完しています。</p>
`,
        kanso: "「ボストンの街角を歩いていたら、突然ガラスが割れて展示ロボットの大軍が雪崩れ込んできた」。初見のプレイヤーの多くがパニックに陥る、ボストン市街地の名物ドッキリスポットです。特にアサルトロンが起動してレーザーを撃ちながら突っ込んできた時のホラー感はたまりません。"
    }
];

let tasks = Promise.resolve();

articles.forEach(article => {
    tasks = tasks.then(async () => {
        console.log(`Processing ${article.title}...`);
        
        // Handle custom names if needed
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
