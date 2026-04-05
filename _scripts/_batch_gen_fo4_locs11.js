// _batch_gen_fo4_locs11.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_fo4_locp11.json', 'utf8'));

const articles = [
    {
        title: "HalluciGen, Inc.",
        titleJa: "ハルシジェン社",
        slug: "hallucigen-inc",
        appearance: "Fallout 4",
        wikiSlug: "HalluciGen,_Inc.",
        mainImg: imgData["hallucigen-inc"][0],
        infoRows: [
            ["種族", "ガンナー (発狂)"],
            ["区分", "戦前の化学企業ビル"],
            ["所在地", "ボストン中心部（ボストンコモンのすぐ北）"],
            ["特記事項", "暴動鎮圧用ガスの罠"],
        ],
        body: `
<h2>概要</h2>
<p>ハルシジェン社（HalluciGen, Inc.）は、戦前のアメリカにおいて「暴動鎮圧用の非致死性ガス」などを米軍向けに開発していた非人道的な化学実験企業のオフィスビルです。</p>

<h2>詳細</h2>
<p>このロケーションは、非常に強烈な初見殺しとカオスな雰囲気で有名です。館内には大量のガンナー部隊が潜入していましたが、ハルシジェン社が戦前に製造していた「吸い込むと他者が全員敵に見える幻覚ガス（ハルシジェン・ガス）」の漏洩システムが作動してしまい、ガンナーたちは互いを敵と勘違いして激しい同士討ち（狂乱状態）を繰り広げています。</p>
<p>館内の至る所に緑色のガスが充満しており、頭を抱えて発狂しているガンナーや、味方に刃物で斬りかかっているガンナーなど、まさに地獄絵図のような光景が広がっています。最深部にはガスの影響を受けなかった部隊長が閉じこもっています。</p>
<p>グッドネイバーのフレッド・アレンからのクエストなどで、このビルに残された価値ある「ハルシジェン・ガスキャニスター」を回収するために訪れることになります。ガスキャニスターを使えば、敵を同士討ちさせる凶悪な「ハルシジェン・ガスグレネード」を作成可能です。</p>
`,
        kanso: "「ビルに入った瞬間から敵が勝手に殺し合っている」という、FO4の中でも屈指の狂気ロケーション。戦前のターミナルを見ると、非致死性ガスと偽りながら『吸い込んだ人間が精神崩壊して互いに殺し合うガス』を嬉々として開発していたハルシジェン社のブラック企業っぷりが覗け、ベセスダ特有のダークユーモアが炸裂しています。"
    },
    {
        title: "East Boston Preparatory School",
        titleJa: "イーストボーストン・プレップスクール",
        slug: "east-boston-preparatory-school",
        appearance: "Fallout 4",
        wikiSlug: "East_Boston_Preparatory_School",
        mainImg: imgData["east-boston-preparatory-school"][0],
        infoRows: [
            ["種族", "レイダー"],
            ["区分", "戦前の学校（予備校）跡地"],
            ["所在地", "イーストボストン（ノードハーゲン・ビーチの北西）"],
            ["統治者", "ジャッジ・ゼラー"],
        ],
        body: `
<h2>概要</h2>
<p>イーストボーストン・プレップスクール（East Boston Preparatory School）は、戦前にエリート学生が通っていた学校の廃墟。現在は「ジャッジ・ゼラー（ゼラー判事）」を名乗る狂ったレイダーのボスの要塞となっています。</p>

<h2>詳細</h2>
<p>このロケーションを支配するジャッジ・ゼラーは、捕らえた一般市民や商人に対して「レイダーの手下になるか、それとも処刑されるか」という理不尽な誓約書を書かせ、サインを拒否した者を凄惨な拷問にかけて殺害するという、カルトの教祖のようなサイコパスです。<br>3階建ての学校の内部は、教室ごとにレイダーたちがバリケードを築いており、激しい室内戦が展開されます。最深部の部屋のターミナルには、彼が誘拐してきた居住者たちに課した拷問の記録と、恐怖で心を支配して無理やりレイダーに仕立て上げていく邪悪な手口が残されています。</p>
<p>Bunker Hillのケスラーからのクエスト等で、この狂った裁判官の支配を終わらせるために訪れることになります。</p>
`,
        kanso: "「まともな市民を誘拐して拷問し、無理やりレイダーとして洗脳する」という、連邦のレイダーの増殖理由の一つを克明に描き出した胸糞ロケーション。学校という『学ぶ場所』が洗脳と処刑の舞台になっている皮肉も効いており、ゼラーを討伐した時の「世のためになった」感は非常に大きいです。"
    },
    {
        title: "Boston Police rationing site",
        titleJa: "ボストン警察配給所",
        slug: "boston-police-rationing-site",
        appearance: "Fallout 4",
        wikiSlug: "Boston_Police_rationing_site",
        mainImg: imgData["boston-police-rationing-site"][0],
        infoRows: [
            ["種族", "モングレルドッグ / モールラット"],
            ["区分", "戦前の警察配給拠点"],
            ["所在地", "南ボストン（ダイアモンドシティの南東）"],
            ["関連", "エディー・ウィンター / 大量破壊兵器"],
        ],
        body: `
<h2>概要</h2>
<p>ボストン警察配給所（Boston Police rationing site）は、大戦争の直前、物資不足に直面していたアメリカ政府が食料や物資を市民に配給するために設置した警察の臨時拠点です。</p>

<h2>詳細</h2>
<p>この施設内には大量の物資運搬用木箱が散乱しており、現在は野生の犬やモールラットの巣、あるいはレイダーの通り道となっています。コンパニオンのニック・バレンタインの好感度クエスト「Long Time Coming」において、『エディー・ウィンターのホロテープ 0』という非常に重要な手掛かりがこの施設のターミナル横に残されています。</p>
<p>戦前のターミナルの記録を読むと、配給を求める飢えた市民たちを警察が威嚇し、やがて群衆が暴徒化してバリケードを突破する寸前までの逼迫した様子が記録されています。また、この施設に不釣り合いな「放射能兵器」や厳重なセキュリティが張られた区画があり、物資配給の裏で政府の暗部が動いていたことを示唆しています。</p>
`,
        kanso: "エディー・ウィンターのホロテープ探索で全プレイヤーが必ず訪れる小さなロケーション。しかし、ターミナルに残された「食料をよこせと叫ぶ群衆に対し、いつ発砲許可が出るか」と怯える警官の記録は、2077年当時の破滅直前のアメリカのパニックを見事に切り取っています。"
    },
    {
        title: "Mass Bay Medical Center",
        titleJa: "マスベイ医療センター",
        slug: "mass-bay-medical-center",
        appearance: "Fallout 4",
        wikiSlug: "Mass_Bay_Medical_Center",
        mainImg: imgData["mass-bay-medical-center"][0],
        infoRows: [
            ["種族", "ガンナー"],
            ["区分", "戦前の巨大病院 / スカイブリッジ"],
            ["所在地", "ボストン中心部（ファニエル・ホールの南）"],
            ["関連", "X-01 パワーアーマー (屋上)"],
        ],
        body: `
<h2>概要</h2>
<p>マスベイ医療センター（Mass Bay Medical Center）は、ボストンの中心街にそびえ立つ高層の医療センター跡地。現在は連邦最大級の傭兵組織「ガンナー」の超強力な前線基地となっています。</p>

<h2>詳細</h2>
<p>この病院はただの建物ではなく、隣接するオフィス街の屋上や、隣のビルと繋がる「スカイブリッジ（空中回廊）」をも取り込んだ、立体的な都市要塞として機能しています。<br>内部は1階のロビーから上層階に至るまで、アサルトロンや最高ランクのガンナーの将校たちが配備されており、非常に難易度の高い白熱した銃撃戦が体験できます。エレベーターを利用して高層のフロアへと攻め上り、最上階から連絡橋へ抜けるルートはボストン市街地戦の醍醐味です。</p>
<p>また、プレイヤーのレベルが十分に高い（Lv28以上など）状態でこの建物の近くの屋根の上の隔離された区画へ到達すると、フルセットの「X-01 パワーアーマー（最強のPA）」が手に入る可能性がある激アツな隠しスポットとしても有名です。</p>
`,
        kanso: "「FO4の市街地における立体要塞戦」の最高峰のひとつ。ビル内のエレベーターアクション、アサルトロンの恐怖、そして空中にかかる橋でのスナイプ戦と、Fallout 4の戦闘システムをフルに楽しめる設計になっています。屋上のパワーアーマーを狙って何度もリロードしたプレイヤーも多いはず。"
    },
    {
        title: "Federal Surveillance Center K-21B",
        titleJa: "連邦監視センターK-21B",
        slug: "federal-surveillance-center-k-21b",
        appearance: "Fallout 4",
        wikiSlug: "Federal_Surveillance_Center_K-21B",
        mainImg: imgData["federal-surveillance-center-k-21b"][0],
        infoRows: [
            ["種族", "シンス (人造人間)"],
            ["区分", "極秘の地下監視バンカー"],
            ["所在地", "輝きの海（捨てられた小屋の地下）"],
            ["特記事項", "X-01 パワーアーマー確定配置"],
        ],
        body: `
<h2>概要</h2>
<p>連邦監視センターK-21Bは、放射能の嵐に囲まれた最悪の死地「輝きの海（Glowing Sea）」の西端にある「捨てられた小屋（Abandoned shack）」の真下に隠された、戦前のアメリカ政府の極秘監視バンカーです。</p>

<h2>詳細</h2>
<p>一見するとただのボロボロの小屋ですが、床のハッチを開けて地下へ降りると、核攻撃にも耐えた強固で広大な最新鋭の軍事バンカーが当時のままの姿で広がっています。<br>かつては政府の諜報員が連邦全土を監視していましたが、現在はインスティチュートが一足早くこのバンカーを発見しており、夥しい数の人造人間（シンス）による激しい防衛線が敷かれています。最下層は数階層にわたる吹き抜けの階段構造になっており、全方位からのレーザー射撃をかいくぐる必要があります。</p>
<p>このロケーションが伝説的に語られる最大の理由は、最深部の格納庫に「高確率でフルセットのX-01（あるいはそのプレイヤーの最高レベル帯の）パワーアーマー」が鎮座しているためです。輝きの海という最悪の環境を越えてきた熟練プレイヤーへの最高のご褒美です。</p>
`,
        kanso: "「絶対に見つからないような世界の果てのボロ小屋の地下に、最高レベルのハイテクバンカーと最強のロマン装備が眠っている」。これぞ探索ゲーの頂点と言えるような、男の子の夢が全て詰まったロケーションです。輝きの海を探索していてこのハッチを見つけた時の興奮はたまりません。"
    },
    {
        title: "South Boston military checkpoint",
        titleJa: "南ボストン軍防衛線",
        slug: "south-boston-military-checkpoint",
        appearance: "Fallout 4",
        wikiSlug: "South_Boston_military_checkpoint",
        mainImg: imgData["south-boston-military-checkpoint"][0],
        infoRows: [
            ["種族", "ガンナー"],
            ["区分", "戦前の軍事検問所"],
            ["所在地", "南ボストン（ジャマイカ・プレインの東）"],
            ["関連", "ガンナーの放送局 / X-01 アーマー"],
        ],
        body: `
<h2>概要</h2>
<p>南ボストン軍防衛線（South Boston military checkpoint）は、大戦争の勃発時にアメリカ軍が民衆の暴動を抑えるために敷いたバリケードと軍備の跡地。現在は強力なガンナーの要塞化された検問所となっています。</p>

<h2>詳細</h2>
<p>ここはただの検問所ではなく、ガンナーたちの小規模な通信司令所の役割も果たしています。非常に見晴らしのよい高台からミサイルやレーザーライフルによる強烈な迎撃が行われるため、正面から突破するのは骨が折れます。</p>
<p>この場所はFO4プレイヤーの間で「究極のお宝スポット」として広く認知されています。なぜなら、検問所の建物の裏側にある施錠されたセキュリティゲージの中に、レベルに応じた「フルセットのパワーアーマー（レベル28以上でX-01）」が固定配置されているためです。<br>このゲージを開けるためには、マスター(Master)レベルのアドバンスドロックピック、あるいはマスターレベルの手動ハッキングターミナルを突破する必要があり、プレイヤーのPerk育成の成果が最も試される場所となっています。</p>
`,
        kanso: "「FO4でX-01といえばココ」と多くのプレイヤーの脳裏に刻まれているお宝検問所。苦労してカギ開けのスキル（Perk）を最大まで育て、満を持してこのケージの扉を開け『最強のアーマーのフルセット』を持ち帰る瞬間は、RPGとしての成長を実感できる最高の瞬間です。"
    },
    {
        title: "Poseidon Energy (Fallout 4)",
        titleJa: "ポセイドン・エネルギープラント",
        slug: "poseidon-energy-fo4",
        appearance: "Fallout 4",
        wikiSlug: "Poseidon_Energy_(Fallout_4)",
        mainImg: imgData["poseidon-energy-fo4"][0],
        infoRows: [
            ["種族", "レイダー / ミュータント / マイアルーク"],
            ["区分", "戦前の巨大発電所"],
            ["所在地", "連邦南東部の端（ワーウィック農園の南）"],
            ["統治者", "カトラー"],
        ],
        body: `
<h2>概要</h2>
<p>ポセイドン・エネルギープラント（Poseidon Energy）は、戦前のアメリカのエネルギー事業を牛耳っていた巨大企業「ポセイドン・エネルギー」の管轄する巨大な発電施設の廃墟です。</p>

<h2>詳細</h2>
<p>連邦の南東の果てにそびえる、ゲーム内でも最大級の「大乱戦ダンジョン」です。<br>このプラントの内部はとんでもないカオス状態になっています。施設の中央部と高層階はレイダーのボス「カトラー」の軍団が占拠し、下層部からは大量のマイアルークが湧き出し、さらにそこにスーパーミュータントの別働隊が入り込んでおり、三つ巴の激しい大戦争がプラント全域で繰り広げられています。</p>
<p>ステルスで潜入し、ターミナルで防衛用のプロテクトロンやタレットを起動すれば、さらに混沌とした四つ巴の戦場を作り出すことも可能です。高階層の足場を進み、最深部のオフィスでカトラーを倒すことで、貴重な「Agility（敏捷性）のボブルヘッド」と「テスラサイエンス」の雑誌を手に入れることができます。</p>
`,
        kanso: "とにかく敵だらけの巨大工場で、至る所でレイダーとミュータントが叫びながら殺し合っているお祭りダンジョン。レベルを十分に上げてパワーアーマーを着込み、重火器を乱射しながらこの巨大プラントの戦闘に乱入するのは、FO4の戦闘の極致とも言える爽快感があります。"
    },
    {
        title: "Hub City Auto Wreckers",
        titleJa: "ハブシティ・オートウォレッカーズ",
        slug: "hub-city-auto-wreckers",
        appearance: "Fallout 4",
        wikiSlug: "Hub_City_Auto_Wreckers",
        mainImg: imgData["hub-city-auto-wreckers"][0],
        infoRows: [
            ["種族", "ガンナー"],
            ["区分", "ハイウェイを利用したスクラップ場"],
            ["所在地", "連邦北東部（サウガス鉄工所のすぐ隣）"],
            ["統治者", "キャプテン・ブリジット"],
        ],
        body: `
<h2>概要</h2>
<p>ハブシティ・オートウォレッカーズ（Hub City Auto Wreckers）は、戦前の車のスクラップ場と、その頭上を通る「崩落したハイウェイの残骸」を利用して作られた、ガンナーの極めて強固な多層立体要塞です。</p>

<h2>詳細</h2>
<p>すぐ隣にあるレイダー（フォージ）の本拠地「サウガス鉄工所」とは目と鼻の先であり、頻繁にガンナーとフォージの大規模な小競り合いが発生している激戦区です。<br>この要塞の最大の特徴は「手動のクレーン装置」です。プレイヤーは地上の廃車置き場からクレーンのゴンドラに乗り込み、ボタンを押してガンナーの将校たちが待つ『はるか上空の高架（ハイウェイ）』へと昇っていくという、非常にドラマチックな進軍ルートが用意されています。</p>
<p>最上層のハイウェイには、ファットマン（ヌカランチャー）を構え、強固なパワーアーマーを装備したガンナーの指揮官「キャプテン・ブリジット」が待ち構えており、逃げ場のない高所での死闘が強いられます。</p>
`,
        kanso: "「クレーンに乗ってハイウェイの上に乗り込む」というロマン溢れる攻略ルートが用意された名所。上空で待ち構えるキャプテン・ブリジットが容赦無くヌカランチャーを撃ち込んでくるため、ゴンドラの中で爆死したプレイヤーは星の数ほどいます。高所特有のヒリヒリとしたスナイパー戦が最高です。"
    },
    {
        title: "Wattz Consumer Electronics",
        titleJa: "ワッツ・エレクトロニクス",
        slug: "wattz-consumer-electronics",
        appearance: "Fallout 4",
        wikiSlug: "Wattz_Consumer_Electronics",
        mainImg: imgData["wattz-consumer-electronics"][0],
        infoRows: [
            ["種族", "ロボット (プロテクトロン / ロボブレイン等)"],
            ["区分", "戦前の巨大な家電・電子機器量販店"],
            ["所在地", "ケンブリッジの北西"],
            ["関連", "DLC: Automatron / ハッキングの聖地"],
        ],
        body: `
<h2>概要</h2>
<p>ワッツ・エレクトロニクス（Wattz Consumer Electronics）は、戦前の世界で有名なレーザー兵器や電子機器を開発していた企業「ワッツ・エレクトロニクス」の巨大な旗艦店・家電量販店の跡地です。</p>

<h2>詳細</h2>
<p>店内には戦前のプロテクトロンたちがいまだに商品管理のつもりで徘徊していますが、地下室での何らかのシステムエラーにより、完全に敵対的な防衛モードで稼働しています。<br>この店舗はFO4における「ハッキングのテーマパーク」であり、至る所に施錠された金庫、展示ケースのターミナルが存在し、プレイヤーはいかに自分がハッキングが得意かを存分に試すことができます。また、貴重な雑誌「トータル・ハック」を入手するために必ず訪れることになるロケーションです。</p>
<p>また、DLC「Automatron」のクエストラインでは、エイダと共にこの建物の地下へと潜り込み、メカニストの設計図やロボブレインの残骸に関する重要な手掛かりを見つけ出すメイン舞台として活用されます。</p>
`,
        kanso: "ハッキング好きのプレイヤーなら必ず笑顔になる、まさに電子機器のデパート。DLC「Automatron」導入後は、戦前のプロテクトロンだけでなく邪悪なメカニストのロボット軍団の拠点に生まれ変わるため、ロボット特効の兵器を担いで突入するのに最適なSFチックなダンジョンです。"
    },
    {
        title: "Wilson Atomatoys factory",
        titleJa: "ウィルソン・アトマトイズ工場",
        slug: "wilson-atomatoys-factory",
        appearance: "Fallout 4",
        wikiSlug: "Wilson_Atomatoys_factory",
        mainImg: imgData["wilson-atomatoys-factory"][0],
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["区分", "戦前のおもちゃ工場"],
            ["所在地", "連邦南部（サウスボストンの南端）"],
            ["関連", "ギディアップ・バターカップ / アーレン・グラス"],
        ],
        body: `
<h2>概要</h2>
<p>ウィルソン・アトマトイズ工場は、戦前のアメリカの子供たちに大人気だったロボット馬のおもちゃ『ギディアップ・バターカップ』を製造していた夢と希望の巨大工場の跡地です。</p>

<h2>詳細</h2>
<p>現在は大規模なスーパーミュータントの拠点と化しており、工場の生産ラインのあちこちに、無数のギディアップ・バターカップのバラバラになった部品（頭や足）が転がっています。非常に優秀な「ギア」や「ネジ」等のジャンク資源の宝庫です。</p>
<p>このロケーションは、グールの入植地「スロッグ」でオモチャの馬を修理し続けている悲しき老人『アーレン・グラス』の過去に深く関わります。プレイヤーは彼に頼まれてこの工場へ潜入し、彼の専用のおもちゃのパーツ（設計図）を探し出します。<br>工場のターミナルには、戦前、おもちゃ作りに情熱を注いでいたアーレンが、軍需企業に買収された会社の方針（おもちゃを兵器に改造する計画）に絶望して追い出されていく過程が記録されており、FO4でも屈指の切ないバックストーリーを読み解くことができます。</p>
`,
        kanso: "「かつてのオモチャ工場が、戦後に人間を食うミュータントの巣窟になっている」というFalloutらしいギャップのある施設。ターミナルを読んでアーレンの無念を知り、全てのミュータントを駆逐した後に、彼の手作りオモチャのパーツを彼の元（スロッグ）へ届けるクエストは何度やっても泣けます。"
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
