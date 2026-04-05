// _batch_gen_fo4_locs15.js
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

const imgData = JSON.parse(fs.readFileSync('f:/Fallout/temp_imgs_fo4_locp15.json', 'utf8'));

const articles = [
    {
        title: "Greater Mass blood clinic",
        titleJa: "マサチューセッツ血液クリニック",
        slug: "greater-mass-blood-clinic",
        appearance: "Fallout 4",
        wikiSlug: "Greater_Mass_blood_clinic",
        mainImg: imgData["greater-mass-blood-clinic"][0],
        infoRows: [
            ["種族", "ブラッドバグ（巨大蚊） / ブロートフライ"],
            ["区分", "戦前の献血センター / クリニック"],
            ["所在地", "連邦西部（ヘーゲン砦の南東）"],
            ["特記事項", "大量の血液パック"],
        ],
        body: `
<h2>概要</h2>
<p>マサチューセッツ血液クリニック（Greater Mass blood clinic）は、戦前に献血の受付や血液の保管業務を行っていた医療施設の跡地です。</p>

<h2>詳細</h2>
<p>大戦争から200年経った現在、この施設は人間の生き血を啜る巨大な突然変異の虫「ブラッドバグ（巨大な蚊のような生物）」の大規模な巣と化しています。<br>建物の周囲や内部では、ブラッドバグがブンブンと不快な羽音を立てながら徘徊しており、かつての待合室や診察室は完全に虫たちに占拠されています。特に、外にまで飛び出している巨大な個体は、プレイヤーを見つけると鋭い口吻で血を吸いに襲い掛かってきます。</p>
<p>しかし、このクリニックの地下（金庫室）には、戦前の密閉環境のおかげで無数の「血液パック」が未だに腐らずに保管されています。スティムパックの材料を手に入れたいプレイヤーや、吸血鬼プレイをしているプレイヤーにとっては文字通り『血の宝庫』となる非常に価値の高いロケーションです。</p>
`,
        kanso: "「血を集めていた施設が、血を好む巨大虫の巣になっている」という完璧な生態系とロケーションの合致。大量のブラッドバグを退治した後に地下の金庫を開けて、棚にずらりと並んだ血液パックを見た時の「大豊作感」は、クラフト好きにはたまらないご褒美です。"
    },
    {
        title: "Lake Quannapowitt",
        titleJa: "クアナポウィット湖",
        slug: "lake-quannapowitt",
        appearance: "Fallout 4",
        wikiSlug: "Lake_Quannapowitt",
        mainImg: imgData["lake-quannapowitt"][0],
        infoRows: [
            ["種族", "マイアルーククイーン / スーパーミュータントベヒモス"],
            ["区分", "湖 / 放射能汚染水域"],
            ["所在地", "ゼネラル・アトミックス・ガレリアの近く"],
            ["特記事項", "極めて危険な野生生物の巣窟"],
        ],
        body: `
<h2>概要</h2>
<p>クアナポウィット湖（Lake Quannapowitt）は、連邦北部にある巨大な湖。現実にマサチューセッツ州ウェイクフィールドに存在する同名の湖がモデルとなっています。</p>

<h2>詳細</h2>
<p>この美しい湖は、現在では連邦でもトップクラスに危険な「地獄の湖」として知られています。<br>湖畔には白鳥のボートの残骸が転がっており、ボストン・コモンの「スワンの池」を彷彿とさせますが、こちらの湖にはネームドではない凶悪な「スーパーミュータント・ベヒモス」がうろついていることがあります。さらに最悪なことに、この湖は水棲生物の頂点である「マイアルーククイーン」の生息地でもあり、運が悪ければ（あるいは運が良ければ大物が釣れると言えるかもしれませんが）、ベヒモスとクイーンによる巨大怪獣大決戦というFO4屈指のド迫力バトルを目撃することができます。</p>
`,
        kanso: "「うわ、きれいな湖だ」と思って近づいた瞬間、マイアルーククイーンが水柱を上げて現れ、さらに横から数階建てのビルほどの大きさのベヒモスが岩をぶん投げてくるという、連邦の過酷な大自然をこれでもかと叩きつけられる恐怖の湖です。"
    },
    {
        title: "Nordhagen Beach",
        titleJa: "ノードハーゲン・ビーチ",
        slug: "nordhagen-beach",
        appearance: "Fallout 4",
        wikiSlug: "Nordhagen_Beach",
        mainImg: imgData["nordhagen-beach"][0],
        infoRows: [
            ["種族", "入植者 (家族)"],
            ["区分", "砂浜の居住地"],
            ["所在地", "ボストン空港の対岸（イーストボストン沿岸）"],
            ["特記事項", "B.O.S.のプリドゥエンが見える絶景"],
        ],
        body: `
<h2>概要</h2>
<p>ノードハーゲン・ビーチは、連邦を囲む海岸線の砂浜にポツンと小屋を建てて生活している小さな家族の居住地です。美しい波打ち際をクラフトの拠点にできる人気の場所です。</p>

<h2>詳細</h2>
<p>この居住地の最大の特徴は、対岸に位置する「ボストン空港」が非常にはっきりと見えるという立地の良さにあります。B.O.S.（ブラザーフッド・オブ・スティール）が連邦に到着し、空港上空に彼らの巨大な飛行船「プリドゥエン」が停泊すると、このノードハーゲン・ビーチからの眺めは、夜空に浮かぶ巨大な飛行要塞を一望できる超絶景スポットへと変貌します。</p>
<p>一方で、砂浜というロケーションゆえにマイアルークなどの海岸特有の怪物からの襲撃を受けやすいという難点もあり、平和な漁村の風景を維持するためにはプレイヤーによる強力な防衛網の構築（タレットの設置など）が急務となります。</p>
`,
        kanso: "波の音が心地よい長閑な砂浜の居住地ですが、対岸に鋼鉄の教団の巨大な飛行船が浮かび上がることで、一気に「世界観の最前線」へと引き上げられる絶好のロケーション。防波堤をクラフトして、海辺の美しい要塞都市にしたくなる場所です。"
    },
    {
        title: "Reeb Marina",
        titleJa: "リーブ・マリーナ",
        slug: "reeb-marina",
        appearance: "Fallout 4",
        wikiSlug: "Reeb_Marina",
        mainImg: imgData["reeb-marina"][0],
        infoRows: [
            ["種族", "Mr.ハンディ"],
            ["区分", "戦前のボート保管所（マリーナ）"],
            ["所在地", "連邦東部沿岸（ナハント半島の近く）"],
            ["関連", "ユージーンとマルコムの争い"],
        ],
        body: `
<h2>概要</h2>
<p>リーブ・マリーナは、戦前において小型の個人用ボートなどを係留・保管していた裕福な海辺の施設の跡地です。</p>

<h2>詳細</h2>
<p>この場所は、大戦争直前にこのマリーナをめぐって醜い争いを繰り広げていた双子の兄弟「ユージーン」と「マルコム」のエピソードがターミナルの記録やホロテープとして残されています。<br>彼らは親から遺産として贈られたこのマリーナの所有権と運営方針（安全を重視するか、利益を重視するか）で深く対立し、互いの船や施設に細工をしたり、中傷し合ったりと、血を分けた兄弟とは思えないほどの陰湿な嫌がらせ合戦を繰り広げていました。<br>そして最終的に、大戦争の核の炎が彼らの争いを強制的に終わらせることになりました。</p>
<p>現在では兄弟の姿はなく、彼らが残した警備用のMr.ハンディ数機だけが、かつての主人たちの命令（互いを排除しろ）をまだ守り続けており、プレイヤーを侵入者とみなして襲ってきます。</p>
`,
        kanso: "「世界が滅びるその日まで、兄弟でくだらない遺産争いをしていた」という、Falloutらしい人間の業と馬鹿馬鹿しさが詰まったマリーナ。核爆弾が落ちたことで、彼らのどちらがマリーナの正当な所有者かという争いは永遠に無意味になったというビターな結末が効いています。"
    },
    {
        title: "Ticonderoga",
        titleJa: "タイコンデロガ",
        slug: "ticonderoga",
        appearance: "Fallout 4",
        wikiSlug: "Ticonderoga",
        mainImg: imgData["ticonderoga"][0],
        infoRows: [
            ["種族", "レールロード・エージェント / コーサー (後半)"],
            ["区分", "レールロードの秘密セーフハウス"],
            ["所在地", "C.I.T.廃墟の近くの高層ビル"],
            ["リーダー", "ハイライズ"],
        ],
        body: `
<h2>概要</h2>
<p>タイコンデロガ（Ticonderoga）は、ボストン市街地に位置する戦前の高層ビルの跡地であり、秘密結社「レールロード」が運用する非常に重要なセーフハウス（隠れ家）の一つです。</p>

<h2>詳細</h2>
<p>このセーフハウスは、有能なレールロード・エージェントである「ハイライズ（High Rise）」によって管理されており、インスティチュートから逃げ出したシンスを匿う中継地点として機能しています。建物の最上階は居住スペースとして充実しており、レールロードに協力するプレイヤーにとっても心強い補給拠点となります。</p>
<p>しかし、ゲームのストーリーが進行すると、この強固だったはずのセーフハウスの所在地がインスティチュートに特定されてしまいます。<br>インスティチュートの恐るべき暗殺用シンス「コーサー」が部隊を率いて襲撃し、ハイライズを含むエージェントたちは皆殺しにされてしまいます。プレイヤーが事後に訪れると、そこにはレールロードメンバーの死体と、彼らを狩りに来たコーサーたちが待ち受けているという惨状が広がっています。</p>
`,
        kanso: "最初は「頼もしい味方のシークレット基地」だったのに、のちに訪れると無惨な処刑現場になっているという、インスティチュートの脅威（コーサーの恐ろしさ）を強烈に実感させるストーリー上の重要なロケーションです。ハイライズの遺体を見た時の悲力感は相当なものです。"
    },
    {
        title: "Bedford Station",
        titleJa: "ベッドフォード駅",
        slug: "bedford-station",
        appearance: "Fallout 4",
        wikiSlug: "Bedford_Station",
        mainImg: imgData["bedford-station"][0],
        infoRows: [
            ["種族", "フェラル・グール"],
            ["区分", "戦前の鉄道駅と列車の墓場"],
            ["所在地", "サンクチュアリとレキシントンの中間地点"],
            ["関連", "ダッチマンのホロテープ"],
        ],
        body: `
<h2>概要</h2>
<p>ベッドフォード駅は、連邦北西部にある古びた地上の鉄道駅の跡地。線路上には多数の列車の車両が赤錆びて脱線・放置されており、現在は大量のフェラル・グールの温床となっています。</p>

<h2>詳細</h2>
<p>この場所は、レールロードの古い悲劇の痕跡が残る場所です。<br>青い車両の中には、レールロードのエージェントだったという正体不明の「ダッチマン」という男のターミナルとホロテープが残されています。<br>ここにある記録には、彼が追っ手から逃れるために、仲間のエージェントからの「安全な場所へのランタンの合図」を死に物狂いで待ち続けていたこと、そして夜の暗闇の中で、いくら待っても合図の光が灯ることはなく、最終的に助けが来ない孤独の中で彼が死を迎えたか、あるいは変異してしまったという悲痛な最後が記されています。</p>
`,
        kanso: "「真っ暗な夜、仲間のランタンの光での合図だけを信じて列車の中で震えて待っていたが、とうとう光は点かなかった」という、レールロードの活動の過酷さと絶望を見事に表現した駅。プレイヤーがホロテープを聞いた後、周囲には群がるグールのうなり声だけが響き渡ります。"
    },
    {
        title: "Crater of Atom",
        titleJa: "クレーター・オブ・アトム",
        slug: "crater-of-atom",
        appearance: "Fallout 4",
        wikiSlug: "Crater_of_Atom",
        mainImg: imgData["crater-of-atom"][0],
        infoRows: [
            ["種族", "チルドレン・オブ・アトム"],
            ["区分", "核爆発の爆心地 / カルト教団の総本山"],
            ["所在地", "輝きの海（Glowing Sea）の最深部"],
            ["リーダー", "マザー・イゾルデ"],
        ],
        body: `
<h2>概要</h2>
<p>クレーター・オブ・アトムは、FO4のマップ南西部に広がる極悪な放射能汚染地帯「輝きの海（Glowing Sea）」の最深部であり、200年前の大戦争において、中国の核ミサイルが直撃し、ボストンを壊滅させた『まさにその爆心地（グラウンド・ゼロ）』の巨大なクレーターです。</p>

<h2>詳細</h2>
<p>致死量の放射能が絶えず降り注ぎ、デスクローやラッドスコルピオンが闊歩する文字通りの地獄のような環境ですが、驚くべきことにこのクレーターの真ん中には、人が暮らす集落が存在します。<br>それは、放射能を神と崇め、この爆心地を「アトム神の聖地」と狂信的に信じる『チルドレン・オブ・アトム（CoA）』の信者たちの総本山です。彼らは防護服も着ずにこの致死量の放射能を浴びながら、「マザー・イゾルデ」という狂信的なリーダーのもとで祈りを捧げており、彼ら自身もなぜかこの環境で生きていける特異体質（あるいは狂気ゆえの奇跡）を獲得しています。</p>
<p>メインクエストにおいて、逃亡したインスティチュートの科学者「バージル」の居場所の手がかりを求めて、プレイヤーは命がけでこの狂気の集落を訪れることになります。</p>
`,
        kanso: "「マップで最も危険な核爆弾の直撃地点に、ふんどし一丁のような格好で住み着いている狂った宗教集団の総本山がある」。Falloutの世界観のぶっ飛び具合を最も象徴する激ヤバ・ロケーション。輝きの海の暗雲の中、クレーターの底で不気味にぼんやりと光る彼らの集落の景色は一生忘れられません。"
    },
    {
        title: "Cutler Bend",
        titleJa: "カトラー・ベンド",
        slug: "cutler-bend",
        appearance: "Fallout 4",
        wikiSlug: "Cutler_Bend",
        mainImg: imgData["cutler-bend"][0],
        infoRows: [
            ["種族", "マイアルーク"],
            ["区分", "座礁したタグボートの集落"],
            ["所在地", "サマービル・プレイスの西の川沿い"],
            ["特記事項", "船を繋ぎ合わせた簡素な水上集落"],
        ],
        body: `
<h2>概要</h2>
<p>カトラー・ベンドは、連邦南西部の泥々とした川の蛇行部分に位置する水上のロケーション。戦前のタグボートなどの小型の船が幾つか座礁しており、それらが木の板で繋ぎ合わされて、かつて水上居住地として機能していたような名残があります。</p>

<h2>詳細</h2>
<p>ここには現在人間の生存者はおらず、周囲の大自然の環境に適応した無数の「マイアルーク」たちの巣窟となっています。船の中や木の板の足場の上には、彼らの卵の塊がびっしりと産み付けられています。</p>
<p>このロケーションには特別なクエストや強大なボスが存在するわけではありませんが、かつて誰かがここで「船を繋ぎ合わせて、陸上のグールやレイダーから逃れる水上生活コミュニティ」を作ろうとして、結局は水から現れたマイアルークの強襲によって全滅させられたという、ウェイストランドではありふれていながらも残酷な自然淘汰の現実をプレイヤーに伝えています。</p>
`,
        kanso: "強大な敵も派手な爆発もない、静かで寂しい水上の廃墟。船と船を木の板で繋いだ手作りの水上集落の跡が、「かつてここで人々が何とか生き延びようとしていた」という生活感を漂わせており、探索中にふと物悲しい気持ちになる環境ストーリーテリングの良所です。"
    },
    {
        title: "Drumlin Diner",
        titleJa: "ドラムリン・ダイナー",
        slug: "drumlin-diner",
        appearance: "Fallout 4",
        wikiSlug: "Drumlin_Diner",
        mainImg: imgData["drumlin-diner"][0],
        infoRows: [
            ["種族", "人間 (トルーディとパトリック / ウルフギャング)"],
            ["区分", "戦前のダイナー（食堂）/ キャラバン商人"],
            ["所在地", "コンコードの南西"],
            ["関連", "薬物取引のトラブル"],
        ],
        body: `
<h2>概要</h2>
<p>ドラムリン・ダイナーは、アメリカの古き良き50年代スタイルの「戦前の街道沿いの食堂」の跡地を利用して、女店主のトルーディが細々と経営している小さな商店です。ゲーム序盤の貴重な取引拠点となります。</p>

<h2>詳細</h2>
<p>プレイヤーが初めてここを訪れると、店主の「トルーディ」と、荒くれ者の薬の売人「ウルフギャング（およびその用心棒シモーネ）」が銃を突きつけ合いテンションMAXで対峙しているという、西部劇のような一触即発のシーンに出くわします。<br>彼女の息子パトリックがウルフギャングから大量に買った薬物（ジェット）のツケを払えずに引きこもっており、借金取り立てのウルフギャングに対してトルーディがショットガンを構えて徹底抗戦しているという状況です。</p>
<p>プレイヤーは、ウルフギャングを加勢して力づくで借金を回収（または店主を殺害）するか、逆に店主を助けて売人を始末するか、あるいは高いスピーチスキルを用いて「話し合いで円満に（または脅迫して）借金をチャラにさせる」かという、序盤における非常にFalloutらしい「モラルと選択」を突きつけられます。</p>
`,
        kanso: "「ヤクの売人と、息子を守るためにショットガンを構えたおばちゃんの激しい口論」。ゲーム序盤でプレイヤーに「連邦の世知辛さと、選択の自由度」を叩き込んでくれる見事なイベント。平和的に解決すれば、トルーディもウルフギャングも両方とも取引可能な商人として利用できるという美味しいリターンが待っています。"
    },
    {
        title: "Hangman's Alley",
        titleJa: "ハングマンズ・アリー（絞首刑の裏路地）",
        slug: "hangmans-alley",
        appearance: "Fallout 4",
        wikiSlug: "Hangman's_Alley",
        mainImg: imgData["hangmans-alley"][0],
        infoRows: [
            ["種族", "レイダー ➝ (後にプレイヤーの入植者)"],
            ["区分", "ビルとビルの間の裏路地 / 居住地"],
            ["所在地", "ボストン市街地中心部（ダイアモンドシティの北）"],
            ["特記事項", "極端に狭く立体的な建築エリア"],
        ],
        body: `
<h2>概要</h2>
<p>ハングマンズ・アリーは、ボストン中心部の高いビル群の隙間にある、非常に狭くて入り組んだ「裏路地」を利用したレイダーの小要塞。そして、FO4のサバイバルモードにおいて全世界のプレイヤーが血眼になって欲しがる「超最重要の居住地」です。</p>

<h2>詳細</h2>
<p>ダイアモンドシティのすぐ近くに位置しているため、ファストトラベルが禁止される最高難易度「サバイバル」においては、ここを確保できるかどうかが連邦の探索効率を劇的に変えるほど重要な拠点となります。<br>レイダーを数人掃討するだけで居住地として解放できますが、この場所は「横幅が極端に狭く、左右がビルの壁に阻まれている」ため、通常の平面的な建築が全くできません。</p>
<p>その代わりに、既存のビルの壁に「木の階段」を打ち付けて2階、3階へと立体的にフロアを拡張していくという、香港の九龍城砦のようなアングラで密集度の高い「スラム街クラフト」を強要（あるいは推奨）されることになります。</p>
`,
        kanso: "「狭すぎる裏路地に、階段を無理やり組んで空中にベッドや店を配置していく」という、建築のパズル要素とアングラ感がたまらなく楽しい居住地。サバイバルモードの拠点としての実用性も相まって、世界中のクラフト廃人から『九龍城砦の作りがいがある聖地』として絶対的な人気を誇る場所です。"
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
