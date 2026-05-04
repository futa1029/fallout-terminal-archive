// _batch_gen_fo4_locs10.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_fo4_locp10.json', 'utf8'));

const articles = [
    {
        title: "Robotics disposal ground",
        titleJa: "ロボット廃棄場",
        slug: "robotics-disposal-ground",
        appearance: "Fallout 4",
        wikiSlug: "Robotics_disposal_ground",
        mainImg: imgData["robotics-disposal-ground"][0],
        infoRows: [
            ["種族", "モールラット / セントリーボット"],
            ["区分", "廃棄場 / スクラップヤード"],
            ["所在地", "サンクチュアリの北東"],
            ["特記事項", "コンバット・セントリー・プロトタイプMKIV"],
        ],
        body: `
<h2>概要</h2>
<p>ロボット廃棄場（Robotics disposal ground）は、サンクチュアリからほど近い場所にある戦前の軍用および民間ロボットの不法投棄・スクラップ場です。ゲーム序盤に訪れることができる、非常に有益なアイテムの宝庫となっています。</p>

<h2>詳細</h2>
<p>このロケーションの最大の目玉は、敷地内のど真ん中に停止した状態で放置されているアメリカ軍の最新鋭兵器「コンバット・セントリー・プロトタイプMKIV（セントリーボット）」です。<br>すぐ近くのプレハブ小屋に落ちているホロテープを再生することで、このセントリーボットを起動し、「警察署」や「軍事基地」等の特定の防衛対象を指定して連邦の各地へパトロールに向かわせることができます。さらに、自己破壊コマンドを送信することで、強力なパーツ等の貴重なジャンクを安全に回収することも可能です。</p>
<p>また、すぐそばのスクラップの山には核弾頭を射出する超兵器「ヌカランチャー（Fat Man）」と、パワーアーマーを塗装するための雑誌「ホットロッダー」、さらにはフュージョン・コアまでが無造作に落ちており、序盤のプレイヤーへのボーナスステージのような場所です。</p>
`,
        kanso: "「序盤のサンクチュアリのすぐ裏に、何故か最強のロボットとヌカランチャーが落ちている」という、ベセスダからの粋なプレゼントスポット。ホロテープで巨大なセントリーボットを起動して各地を巡回させた時の頼もしさと、それがレイダーたちを粉砕していく様子は、連邦の探索の楽しさを教えてくれます。"
    },
    {
        title: "Revere satellite array",
        titleJa: "リビア衛星アレイ",
        slug: "revere-satellite-array",
        appearance: "Fallout 4",
        wikiSlug: "Revere_satellite_array",
        mainImg: imgData["revere-satellite-array"][1], // Use the 2nd image as 1st is just FO4_Revere... Wait, FO4_map_... 
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["区分", "戦前の巨大なパラボラアンテナ施設"],
            ["所在地", "連邦東部（ナハント半島の付け根）"],
            ["関連", "B.O.S.の遭難信号"],
        ],
        body: `
<h2>概要</h2>
<p>リビア衛星アレイ（Revere satellite array）は、戦前のアメリカ軍が通信や防空探知のために建設した、複数の巨大なパラボラアンテナが立ち並ぶ施設です。現在はスーパーミュータントによって占拠され、彼らの非常に強固な防空要塞となっています。</p>

<h2>詳細</h2>
<p>パラボラアンテナのタワーはそれぞれが階段と足場によって繋がっており、タワーの上層部からはミュータントたちによるロケットランチャー等の執拗な狙撃が降り注ぐため、地上からの接近が極めて困難なロケーションです。<br>この場所はB.O.S.（ブラザーフッド・オブ・スティール）の「失踪した偵察隊」の足跡を辿るクエストの目的地であり、アンテナの一つの頂上に、悲惨な最期を遂げたB.O.S.の兵士の死体とホロテープ、さらには「パワーアーマーのフレーム」が放置されています。</p>
`,
        kanso: "「上からロケットランチャーが降ってくる地獄のアンテナ群」。パラボラアンテナの足場という極細の道でスーパーミュータント・スーサイダー（自爆兵）と鉢合わせした時の絶望感は異常です。B.O.S.の兵士がアンテナの頂上でミュータントの群れに包囲されて死んでいった状況を想像すると、胸が痛みます。"
    },
    {
        title: "Fens Street sewer",
        titleJa: "フェンズ・ストリート下水道",
        slug: "fens-street-sewer",
        appearance: "Fallout 4",
        wikiSlug: "Fens_Street_sewer",
        mainImg: imgData["fens-street-sewer"][0],
        infoRows: [
            ["種族", "フェラル・グール（元被害者）/ 発光ウルフ"],
            ["区分", "地下下水道 / 猟奇殺人現場"],
            ["所在地", "ダイアモンドシティの北外郭付近"],
            ["関連", "フェンズ・ファントム事件"],
        ],
        body: `
<h2>概要</h2>
<p>フェンズ・ストリート下水道は、ダイアモンドシティのすぐ外側にある下水道の入り口から侵入できる戦前の水路跡。戦前のアメリカにおける最悪のシリアルキラー「フェンズ・ファントム」の犯行現場であり、彼の狂気の展示室です。</p>

<h2>詳細</h2>
<p>内部には夥しい数の白骨や、無数のマネキンが不気味に並べられています。下水道を進むたびに、フェンズ・ファントムというシリアルキラーが、自分を追いかけている警察の主任刑事を「挑発・嘲笑」するために録音した4本のホロテープを拾うことができます。<br>それらのテープには、彼がいかに被害者を残酷に惨殺し、その骨を「芸術作品」として飾り立てたか、そして警察の無能さをあざ笑う狂気の声が記録されています。</p>
<p>最深部では、彼が最後に刑事を誘い込んで始末するために仕掛けていた「最大の展示物」が発見できます。現在はフェラル・グールと放射能汚染された凶暴な犬たちがうろついており、非常に不気味なホラー・ダンジョンとなっています。</p>
`,
        kanso: "Falloutにおける「戦前のサイコパス犯罪者」エピソードの中でも特に有名なホラーダンジョン。マネキンを使った不気味な展示と、自分を追う刑事に向けた悪趣味なテープの語りが、暗い下水道の環境と相まって最高のホラー映画のような雰囲気を醸し出しています。"
    },
    {
        title: "Weston water treatment plant",
        titleJa: "ウェストン水処理場",
        slug: "weston-water-treatment-plant",
        appearance: "Fallout 4",
        wikiSlug: "Weston_water_treatment_plant",
        mainImg: imgData["weston-water-treatment-plant"][0],
        infoRows: [
            ["種族", "スーパーミュータント / マイアルーク"],
            ["区分", "戦前の浄水施設"],
            ["所在地", "連邦西部（グレイガーデンの南）"],
            ["関連", "浸水エリア / 水のパズル"],
        ],
        body: `
<h2>概要</h2>
<p>ウェストン水処理場（Weston water treatment plant）は、戦前のアメリカで河川の水を浄化していた巨大なプラント施設。現在はスーパーミュータントの拠点となっており、地下エリアは大半が水没しています。</p>

<h2>詳細</h2>
<p>ロボット達が運営する農園「グレイガーデン」の管理者（ホワイト、ブラウン、グリーン）から「水が汚染されているから、水処理場を直してきてほしい」と依頼されて訪れることになります。<br>施設の地下は完全に冠水しており、プレイヤーはターミナルやスイッチを操作して「排水ポンプ」を起動し、水位を徐々に下げながら下層へと進んでいくという、ゼルダの伝説の『水の神殿』のような構成のアクション・パズルダンジョンになっています。</p>
<p>水位が下がるごとに、水の中に潜んでいたマイアルークたちが一斉に出現するため、探索と戦闘のテンポが非常に良い構造になっています。</p>
`,
        kanso: "「スイッチを押して水位を下げて、新しい階層に進む」という、FO4では珍しい本格的なパズル構成のギミックダンジョン。屋上や地表のミュータント基地の激しい銃撃戦と、地下の静かな浸水エリアでのマイアルーク戦という、二種類の異なる戦闘が楽しめる名ロケーションです。"
    },
    {
        title: "Vault-Tec Regional HQ",
        titleJa: "ボルトテック地区本部",
        slug: "vault-tec-regional-hq",
        appearance: "Fallout 4",
        wikiSlug: "Vault-Tec_Regional_HQ",
        mainImg: imgData["vault-tec-regional-hq"][0],
        infoRows: [
            ["種族", "フェラル・グール（元社員）"],
            ["区分", "Vault-Tec社の支部オフィスビル"],
            ["所在地", "ボストン中心部"],
            ["関連", "各Vaultの建設計画"],
        ],
        body: `
<h2>概要</h2>
<p>ボルトテック地区本部（Vault-Tec Regional HQ）は、戦前のアメリカにおいて核シェルター「Vault」を建設・管理していた元凶であるボルトテック社（Vault-Tec）の東海岸における地区本部のオフィスビルです。</p>

<h2>詳細</h2>
<p>館内は暗く崩壊しており、大戦争の当日にオフィス内で被爆してしまった元ボルトテック社員たちがフェラル・グール（および光りし者）と化して徘徊しています。<br>この施設のターミナルには、連邦各地に存在する「Vault 111」「Vault 81」「Vault 114」「Vault 95」といった各Vaultの建設ステータス情報や、彼らが一般市民に対して行っていた非人道的な社会実験の大まかな概要計画が記録されています。</p>
<p>また、Vault 114から連れ出された後、連邦を彷徨っている「Vault-Tecの営業本部長リングェ」に関連するクエストの調査対象にもなります（彼は地下室のセキュリティを突破した先に引きこもっていることもあります）。</p>
`,
        kanso: "「全てを狂わせた悪の企業」の残骸。このオフィスのターミナルから覗き見ることができる各Vaultの悪魔的な社会実験の計画書は、Falloutのロア（世界設定）を知る上で非常に重要です。元社員のグールたちを処理しながら、彼らの戦前の悪徳ビジネスに思いを馳せるのは一興です。"
    },
    {
        title: "Fiddler's Green Trailer Estates",
        titleJa: "フィドラーズ・グリーン・トレーラー・エステート",
        slug: "fiddlers-green-trailer-estates",
        appearance: "Fallout 4",
        wikiSlug: "Fiddler%27s_Green_Trailer_Estates",
        mainImg: imgData["fiddlers-green-trailer-estates"][0],
        infoRows: [
            ["種族", "フェラル・グール"],
            ["区分", "トレーラーハウスの集合団地 / 地下シェルター"],
            ["所在地", "連邦西部（ヘーゲン砦の北東）"],
            ["関連", "リスのシチュー事件"],
        ],
        body: `
<h2>概要</h2>
<p>フィドラーズ・グリーン・トレーラー・エステートは、戦前に低所得者層や短期滞在者が暮らしていた多数のトレーラーハウスが集まる居住区画。現在は見渡す限りのグールの巣窟です。</p>

<h2>詳細</h2>
<p>このロケーションは、FO4の中でも最も胸糞の悪いブラックなエピソードの一つとして有名な「新しいリス（The New Squirrel）」という童話のホロテープが落ちている場所として知られています。<br>大戦の直後、このトレーラーパークの地下にある貧相なシェルターに逃げ込んだ生存者たちのターミナルと、このホロテープの内容を見事に重ね合わせることで、シェルターの内部で何が起きたのか（一人の住人が裏切って皆殺しになったこと）を童話の形でおぞましく暗喩しています。</p>
<p>また、敷地内のプールには大量のフェラル・グールが横たわっており、無防備に近づくと一斉に起き上がってプレイヤーを取り囲む配置になっています。</p>
`,
        kanso: "ターミナルに残された生存者たちの日記と、子供向けの童話「新しいリス」の内容（怪しいリスを森に入れたら他のリスが全部食い殺された）が見事にリンクする、ベセスダの天才的なブラックジョークが光るロケーション。敷地内のプールから大量のグールが湧き出るのもFO4あるあるです。"
    },
    {
        title: "Medford Memorial Hospital",
        titleJa: "メドフォード記念病院",
        slug: "medford-memorial-hospital",
        appearance: "Fallout 4",
        wikiSlug: "Medford_Memorial_Hospital",
        mainImg: imgData["medford-memorial-hospital"][0],
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["区分", "戦前の総合病院"],
            ["所在地", "モルデンの西（連邦中北部）"],
            ["関連", "スーサイダーの箱 / シリンジャー"],
        ],
        body: `
<h2>概要</h2>
<p>メドフォード記念病院（Medford Memorial Hospital）は、巨大な戦前の総合病院の跡地であり、連邦でも最大級のスーパーミュータントの前線基地・アジトとして機能しています。</p>

<h2>詳細</h2>
<p>病院内部は非常に複雑で立体的であり、各フロアに配備されたミュータントが激しい銃撃を展開します。<br>特に有名なのが、この病院の2階の一部通路に設置された「スーサイダーの箱（罠）」です。プレイヤーが不用意にドアのロックを解除（またはハッキング）して特定の部屋に入ると、中に閉じ込められていたスーパーミュータント・スーサイダー（小型核爆弾を持った自爆特攻兵）が『ピピピ…』という音と共に目の前に飛び出してくるという、初見殺しの悪魔的なトラップが存在します。</p>
<p>最深部の手術室では「シリンジャー・ライフル（特殊な注射器を撃ち出す武器）」の確定入手ポイントがあり、さらにこの病院の鍵のパスワードが、コベナントの町を支配する「ジェイコブの手がかり」と繋がっているなど、様々なクエストが交差する結節点でもあります。</p>
`,
        kanso: "「FO4の心臓が止まる初見殺しトラップ」の代表格がこの病院の『スーサイダー箱』です。鍵のかかった部屋を開けて、お宝を探そうとしたプレイヤーの目前で、ミニ・ヌークを抱えたミュータントが爆発する悪意100%のドッキリは必見。乱戦の激しさも相まって非常に人気の高い戦闘ロケーションです。"
    },
    {
        title: "Coast Guard pier",
        titleJa: "沿岸警備隊のピア",
        slug: "coast-guard-pier",
        appearance: "Fallout 4",
        wikiSlug: "Coast_Guard_pier",
        mainImg: imgData["coast-guard-pier"][0], // Wait, Coastguardpier.png is index 0
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["区分", "戦前の沿岸警備隊の基地"],
            ["所在地", "連邦南西部（チャールズ川の河口付近）"],
            ["関連", "エディー・ウィンターのホロテープ"],
        ],
        body: `
<h2>概要</h2>
<p>沿岸警備隊のピア（Coast Guard pier）は、戦前のアメリカ沿岸警備隊（Coast Guard）が治安維持に使用していた軍事・警察施設です。現在はスーパーミュータントのアジトとなっています。</p>

<h2>詳細</h2>
<p>川沿いの桟橋には複数の船の残骸やヘリコプターの残骸が転がっており、川を背にした強固な防衛陣地が築かれています。建物の内部は地下牢のような牢屋が並んでおり、戦前に密輸業者やギャングが拘束されていた形跡が残されています。</p>
<p>コンパニオンクエスト「Long Time Coming」に必要な『エディー・ウィンターのホロテープ』（テープ9）が、ここの証拠保管庫のカギのかかった金庫の中に隠されています。<br>また、ターミナルには戦前の沿岸警備隊の隊員が、ギャングから賄賂を受け取って密輸を見逃していたという腐敗の記録や、上官からのプレッシャーに苦悩する生々しい記録が残されており、大戦争直前のボストンの終わっていた治安を感じることができます。</p>
`,
        kanso: "スーパーミュータントとの激戦地のひとつ。このロケーションの戦前の記録（沿岸警備隊がギャングの賄賂漬けになっており、真面目な隊員が絶望していく様子）は、ニック・バレンタインの追う悪党「エディー・ウィンター」がいかに当時のボストンを裏から支配していたかを裏付けるリアルな証拠となっています。"
    },
    {
        title: "Milton General Hospital",
        titleJa: "ミルトン・ジェネラル病院",
        slug: "milton-general-hospital",
        appearance: "Fallout 4",
        wikiSlug: "Milton_General_Hospital",
        mainImg: imgData["milton-general-hospital"][0],
        infoRows: [
            ["種族", "レイダー / ミュータント"],
            ["区分", "戦前の巨大病院"],
            ["所在地", "ボストン南部（ファロンデパートのすぐ隣）"],
            ["関連", "シルバー・シュラウドの最終決戦"],
        ],
        body: `
<h2>概要</h2>
<p>ミルトン・ジェネラル病院（Milton General Hospital）は、ボストン市街地南部にある巨大な総合病院の廃墟。隣接するファロンデパートやミルトン・パーキングを含め、連邦でも有数のスラム戦区となっています。</p>

<h2>詳細</h2>
<p>このロケーションは、大人気クエスト「The Silver Shroud」のクライマックス、すなわちシルバー・シュラウドの熱狂的なファンであるグールのケント・コノリーが最大のレイダーボス「シンジン」に誘拐され、彼を救出するための最終決戦の舞台として非常に有名です。</p>
<p>病院の内部は地下室から何階にもわたる高層階までエレベーターでつながれており、夥しい数の精鋭レイダーたちが待ち構えています。<br>最上階の死体安置所では、シンジンがケントに銃を突きつけており、「カリスマによる強気の説得」や「シルバー・シュラウドとしての専用セリフによる威嚇」、あるいは「V.A.T.S.での一瞬の早撃ち」などを駆使してケントの命を救い出す、まさにアメコミ・ヒーローさながらの緊迫した大立ち回りが要求されます。</p>
`,
        kanso: "「ファンシーなヒーローごっこ」から一転して「友人を救うための本物のガチ戦闘」へと変貌する、シルバー・シュラウド・クエストの最高のハイライト。シンジンからケントを無傷で救い出せたときのヒーロー的なカタルシスは、Fallout 4の全クエストの中でもトップクラスの達成感です。"
    },
    {
        title: "Hyde Park",
        titleJa: "ハイドパーク",
        slug: "hyde-park",
        appearance: "Fallout 4",
        wikiSlug: "Hyde_Park",
        mainImg: imgData["hyde-park"][0],
        infoRows: [
            ["種族", "レイダー"],
            ["区分", "水没した街の廃墟"],
            ["所在地", "ボストン南部の沼地（ジャマイカ・プレインの南西）"],
            ["統治者", "スキャター"],
        ],
        body: `
<h2>概要</h2>
<p>ハイドパーク（Hyde Park）は、戦前はボストンの美しい郊外の街でしたが、現在は完全に水没し、建物の屋根や張り巡らされた粗末な木の橋だけで繋がれたベネチアのような「水上レイダー要塞」と化しています。</p>

<h2>詳細</h2>
<p>この浸水した街を支配しているのは「スキャター（Scutter）」という名の凶悪なレイダーのボスです。<br>このロケーションは、かつての建物の屋上から屋上へと木の板を何層も架け渡して作られた信じられないほど立体的な構造を持っており、プレイヤーは足元の水場に潜む危険に警戒しながら、頭上から撃ち下ろしてくる大量のレイダーたちと三次元の過酷なスナイパー戦を展開しなければなりません。</p>
<p>水深の深い場所や放射能汚染された水域も多く、迂闊に足を踏み外して落ちると、屋根の上のレイダーたちから一斉に十字砲火を浴びるという、環境と地の利を100%活かしたレイダーの素晴らしい縄張りです。</p>
`,
        kanso: "「沈んだ街の屋根を繋いで作った水上要塞」。その絵画のように美しい退廃的なビジュアルと、立体的なマップ構造の楽しさはFO4随一です。敵の防衛が非常に堅固であり、パワーアーマーで水底を歩いて突破するか、屋根伝いにスナイプで一人ずつ落としていくか、プレイヤーのアプローチの腕が試されます。"
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
