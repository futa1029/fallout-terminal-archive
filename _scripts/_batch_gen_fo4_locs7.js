// _batch_gen_fo4_locs7.js
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
        title: "D.B. Technical High School",
        titleJa: "D.B.テクニカルハイスクール",
        slug: "db-technical-high-school",
        appearance: "Fallout 4",
        wikiSlug: "D.B._Technical_High_School",
        mainImg: "D.B._Technical_High_School.jpg",
        infoRows: [
            ["種族", "レイダー"],
            ["区分", "戦前の高校の廃墟"],
            ["所在地", "ボストン中心部（コンバットゾーンの南西）"],
            ["統治者", "ボスコ"],
        ],
        body: `
<h2>概要</h2>
<p>D.B.テクニカルハイスクール（D.B. Technical High School）は、ボストン市街地にある戦前の高校の廃墟です。現在は「ボスコ」という名の男が率いる狂暴なレイダー集団のアジトとして完全に要塞化されています。</p>

<h2>詳細</h2>
<p>レイダーのボスである「ボスコ」は、かつては別の場所で活動していた名うてのレイダーでしたが、ある日レイダー狩りの野獣（放射線に汚染された狂犬病の犬）に噛まれて以来、深刻な狂犬病を発症して完全に正気を失ってしまいました。<br>彼はこの学校の地下にあった可愛い熊の「マスコットヘッド」を自らの頭に被り、部下すらも恐れるような狂気のバーサーカーと化して地下のプール跡地に君臨しています。</p>
<p>主人公は複雑に入り組んだ校内の教室や体育館を制圧しながら地下へと進み、この狂った熊の着ぐるみを被ったレイダーのボスと対峙することになります。彼を倒すと、このユニーク防具である「マスコットヘッド」を入手することができます。</p>
`,
        kanso: "「狂犬病を発症して熊の被り物をかぶったレイダーのボス」という、情報量が多すぎる大人気のボス。ボスコのターミナルを読むと、彼が徐々に病に侵されて『部下の顔がモンスターに見える』と狂っていく過程が克明に記されており、ただのイロモノではなく悲哀を感じさせる見事な設定です。"
    },
    {
        title: "Walden Pond",
        titleJa: "ウォールデン・ポンド",
        slug: "walden-pond",
        appearance: "Fallout 4",
        wikiSlug: "Walden_Pond",
        mainImg: "FO4_Walden_Pond.jpg",
        infoRows: [
            ["種族", "レイダー"],
            ["区分", "池 / ギフトショップ"],
            ["所在地", "サンクチュアリの南"],
            ["関連", "ビッグ・マック"],
        ],
        body: `
<h2>概要</h2>
<p>ウォールデン・ポンド（Walden Pond）は、19世紀の哲学者ヘンリー・デイヴィッド・ソローが「森の生活」を執筆したことで知られる実在の歴史的な淡水池と、その畔にある戦前のギフトショップです。</p>

<h2>詳細</h2>
<p>現在は「ビッグ・マック」と呼ばれるレイダーが率いる小規模なギャングの拠点となっています。ここのレイダー達は非常にユニークで、彼らのボスであるビッグ・マックは、なんと戦前の哲学者ソローの「超越主義（超絶主義）」の教えに感化されており、部下たちに対して『文学の力』や『超越的な精神性』について熱血指導を行っています。</p>
<p>プレイヤーがステルス状態で彼らに近づくと、レイダーたちが焚き火を囲みながら、「超越主義ってなんだよ」「さぁ…とにかくボスの言う通りに超絶にならなきゃ怒られるぞ」というような、レイダーらしからぬマヌケで知的な会話をしているのを立ち聞きすることができます。池の排水管を通って秘密のアジトへ潜入すると、ビッグ・マック本人からユニーク武器の「ビッグ・マック（パイプレンチ）」を手に入れることができます。</p>
`,
        kanso: "文学者ゆかりの地を占拠したレイダーが、その文学に感化されて部下に哲学をポエトリーリーディングしているという、FO4屈指のコメディロケーション。「超越主義」の意味が全く分かっていない下っ端レイダーたちのボヤキは必聴です。池の底など周辺の景観も美しく、序盤の楽しい寄り道スポットとなっています。"
    },
    {
        title: "College Square",
        titleJa: "カレッジスクエア",
        slug: "college-square",
        appearance: "Fallout 4",
        wikiSlug: "College_Square",
        mainImg: "College_Square.jpg",
        infoRows: [
            ["種族", "フェラル・グール"],
            ["区分", "広場 / 地下鉄駅"],
            ["所在地", "ケンブリッジ中央部"],
            ["関連", "B.O.S.偵察隊の遭難"],
        ],
        body: `
<h2>概要</h2>
<p>カレッジスクエア（College Square）は、ケンブリッジの市街地の中心にある大きな交差点および同名の巨大な地下鉄駅の跡地です。一帯は完全にフェラル・グールの巣窟と化しています。</p>

<h2>詳細</h2>
<p>ケンブリッジ警察署のすぐ西側に位置しており、パラディン・ダンス率いるB.O.S.の「グラディウス偵察隊」のメンバー達が、この場所で押し寄せるグールの大群に襲撃されて致命的な損害を被りました。<br>主人公がこの広場に足を踏み入れると、夥しい数のグールが死んだふりをして横たわっていたり、建物の窓から飛び出してきたりと、ゲーム序盤における最大のグール・パニックの洗礼を味わうことになります。</p>
<p>地下鉄駅（カレッジスクエア駅）の内部も非常に広大で、戦前の惨劇の痕跡と、グールに殺されてしまったB.O.S.のナイトの遺体、および彼らの残した無念のホロテープを見つけることができます。</p>
`,
        kanso: "「ケンブリッジ警察署の目の前にある、絶対に近づきたくないグールの無限湧きポイント」。初めてここを通った時の、見渡す限りの赤マーカー（敵）と、地面からわらわらと這い出してくるグールの恐怖は凄まじく、V.A.T.S.の連打とショットガンが火を吹く激戦区です。"
    },
    {
        title: "Beantown Brewery",
        titleJa: "ビーンタウン醸造所",
        slug: "beantown-brewery",
        appearance: "Fallout 4",
        wikiSlug: "Beantown_Brewery",
        mainImg: "Beantown_Brewery.jpg",
        infoRows: [
            ["種族", "レイダー"],
            ["区分", "ビール醸造所の廃墟"],
            ["所在地", "オベラント駅の北西洋上（川沿い）"],
            ["統治者", "タワー・トム"],
        ],
        body: `
<h2>概要</h2>
<p>ビーンタウン醸造所（Beantown Brewery）は、戦前は地元ボストンの名物ビールである「グインネット・エール」等を醸造していた巨大な飲料工場群です。現在は「タワー・トム」というレイダーが占拠しています。</p>

<h2>詳細</h2>
<p>連邦のレイダー勢力の縄張り争いの面白い背景が見られる場所です。タワー・トムは、食料不足を解決するためにライバルであった別組織のレイダーリーダー（レッド・トゥーレット）の妹である「リリー」を人質に取って食料を巻き上げていました。<br>しかし、不手際によってその人質の妹を死なせてしまったため、タワー・トムは「妹がまだ生きているように見せかけるため」に、死んだ妹のフリをして偽の手紙（脅迫状）を書き続けるという、非常に綱渡りで滑稽な隠蔽工作を行っている最中でした。</p>
<p>また、ダイアモンドシティ・ラジオの気弱なDJである「トラビス」を男らしく成長させるためのサブクエスト「Confidence Man」において、誘拐された酒場の店主バディムを救出するために乗り込むことになる決戦の舞台でもあります。</p>
`,
        kanso: "「敵対するギャングの妹をうっかり殺してしまい、必死で妹のフリをして手紙を偽造し続けるレイダーのボス」という、タワー・トムのポンコツ具合がターミナルで読める名ロケーション。ビール工場ならではの大規模なパイプや醸造タンクが入り組んだ立体的なマップ構造も探索していて非常に楽しいです。"
    },
    {
        title: "Sandy Coves Convalescent Home",
        titleJa: "サンディ・コーヴス・コンヴァレッセント・ホーム",
        slug: "sandy-coves-convalescent-home",
        appearance: "Fallout 4",
        wikiSlug: "Sandy_Coves_Convalescent_Home",
        mainImg: "Sandy_Coves_Convalescent_Home.jpg",
        infoRows: [
            ["種族", "Mr.ハンディ / シンス / 猫"],
            ["区分", "戦前の高齢者向け療養施設（老人ホーム）"],
            ["所在地", "サレムの南"],
            ["関連", "猫の楽園"],
        ],
        body: `
<h2>概要</h2>
<p>サンディ・コーヴス・コンヴァレッセント・ホームは、戦前に建てられた高級な老人療養施設（老人ホーム）の廃墟です。現在は人間は一人も生きておらず、大量のMr.ハンディ（介護ロボット）たちだけが活動を続けています。</p>

<h2>詳細</h2>
<p>内部に入ると、戦前のプログラム通りに清掃活動や受付業務を行っている穏やかなMr.ハンディたちと、多数の「可愛い猫」が自由に歩き回っている平和な光景が広がっています。<br>しかし、施設のターミナルを読むと、戦前のこの施設が「入居者の老人たちの財産を搾り取り、最終的に見捨てる」という極めて悪質な経営を行っていたことが判明します。さらに受付のシステムをハッキングして金庫を開けようとすると、突如として警報が鳴り響き、大量の人造人間（シンス）部隊が壁を破って施設内にテレポートしてくるという激しいインスティチュートの強襲イベントが発生します。</p>
`,
        kanso: "入り口では「猫がたくさんいる平和な施設だ〜」と癒やされるのも束の間、探索を進めると戦前のアメリカの悪徳ビジネスの闇を知り、最後には壁から人造人間が降ってきて平和なロボットたちが巻き添えで皆殺しにされるという、落差の激しすぎるトラップ・ロケーションです。"
    },
    {
        title: "Mahkra Fishpacking",
        titleJa: "マクラッチー魚包装工場（マクラ・フィッシュパッキング）",
        slug: "mahkra-fishpacking",
        appearance: "Fallout 4",
        wikiSlug: "Mahkra_Fishpacking",
        mainImg: "FO4_Mahkra_Fishpacking.jpg",
        infoRows: [
            ["種族", "シンス （人造人間）"],
            ["区分", "水産加工工場の廃墟"],
            ["所在地", "連邦北東部（沿岸沿い）"],
            ["特記事項", "インスティチュートの罠"],
        ],
        body: `
<h2>概要</h2>
<p>マクラ・フィッシュパッキング（Mahkra Fishpacking）は、沿岸部にある戦前の巨大な魚肉加工工場の廃墟。現在はインスティチュートが地上のレイダーやスカベンジャーを抹殺するために仕掛けた「巨大なネズミ捕り（罠）」として機能しています。</p>

<h2>詳細</h2>
<p>プレイヤーがこの工場に足を踏み入れると、最初はレイダーの死体が数体転がっているだけで、全く敵が出現しません。工場の最深部へ向かうためにエレベーターで地下の加工室へ下りると、そこには彼らが探索した後の開けられた物資箱ばかりが置かれています。<br>そして一番奥まで進んだ段階で、突然無数の人造人間（シンス）たちが一斉にテレポートで出現し、プレイヤーは地下室の最奥から地上の出口に至るまでの全ての道のりを、完全に包囲された状態から逆走して突破しなければならないという、極めて難易度の高いデスマッチに陥ります。</p>
`,
        kanso: "「行きはよいよい 帰りは恐い」を地で行く、FO4屈指の初見殺しの罠ダンジョン。奥まで進んで「なんだ、何もないじゃん」と振り返った瞬間に青いテレポートの稲妻が大量に降り注ぐ光景は絶望的であり、インスティチュートの冷酷で機械的な戦術を肌で感じることができる名所です。"
    },
    {
        title: "Federal ration stockpile",
        titleJa: "連邦食糧備蓄庫",
        slug: "federal-ration-stockpile",
        appearance: "Fallout 4",
        wikiSlug: "Federal_ration_stockpile",
        mainImg: "Federal_ration_stockpile.png",
        infoRows: [
            ["種族", "レイダー"],
            ["区分", "戦前の軍事食糧保管庫 / 地下バンカー"],
            ["所在地", "連邦西部（サンクチュアリの南）"],
            ["統治者", "レッド・トゥーレット"],
        ],
        body: `
<h2>概要</h2>
<p>連邦食糧備蓄庫（Federal ration stockpile）は、戦前のアメリカ軍が広大な地下に築いた巨大な物資保管バンカーです。現在は大規模なレイダー集団の難攻不落の本拠地となっています。</p>

<h2>詳細</h2>
<p>この拠点をまとめているのは「レッド・トゥーレット」という冷静で強力な女性リーダーです。彼女は部下たちを厳しく統制し、ここを連邦西部で最大のレイダー要塞へと育て上げました。<br>しかし、彼女には一つの弱点がありました。ライバル勢力であるビーンタウン醸造所の「タワー・トム」に、愛する妹のリリーを人質として奪われてしまっていたのです。彼女のターミナルには、妹から送られてくる手紙（実はトムが偽造したもの）を信じ、妹を奪還するための軍事作戦を計画しながらも、妹の身を案じて不安に押し潰されそうになっている彼女の等身大の悲痛な日記が残されています。</p>
<p>プレイヤーはこの巨大な地下バンカーへ侵入し、そんな彼女の事情を知ろうと知るまいと、彼女とレイダーの軍団を殲滅することになります。</p>
`,
        kanso: "ビーンタウン醸造所の「タワー・トム」の物語と完璧に対になっているレイダーの悲喜劇。妹は既に殺されてしまっているのに、トムからの偽の手紙を信じて大切にターミナルに保存しているレッド・トゥーレットの姿は、レイダーにも血の通った家族愛があることを見せつける素晴らしいテキスト群です。"
    },
    {
        title: "The Shamrock Taphouse",
        titleJa: "シャムロック酒場",
        slug: "the-shamrock-taphouse",
        appearance: "Fallout 4",
        wikiSlug: "The_Shamrock_Taphouse",
        mainImg: "FO4_The_Shamrock_Taphouse.jpg",
        infoRows: [
            ["種族", "レイダー / ミュータント"],
            ["区分", "都市部のパブ / 酒場"],
            ["所在地", "ボストン・コモンの東"],
            ["関連", "ドリンク・イン・バディー"],
        ],
        body: `
<h2>概要</h2>
<p>シャムロック酒場（The Shamrock Taphouse）は、ボストン市街地にある戦前の有名なバー（アイリッシュ・パブ）の跡地。現在はレイダーたちが根城にしています。</p>

<h2>詳細</h2>
<p>付近を強大なスーパーミュータントの拠点に囲まれているため、外部も内部も常に銃撃戦の危険に晒されている物騒な酒場です。このロケーションの最大の目玉は、地下室のパスワードで守られた部屋に眠っている「ドリンク・イン・バディー（Drinkin' Buddy）」という戦前の特製プロテクトロンです。</p>
<p>バディーは「冷たいビールを醸造し、親父ギャグを話す」ことだけに特化した素晴らしい相棒ロボットです。グッドネイバーのホテル・レクスフォードからの依頼で彼を起動し、ホテルのオーナーに彼を引き渡すのが本来のクエストですが、プレイヤーは彼を『自分の所有する居住地』へ誘導して、永久に「冷えたビールとオヤジギャグ」を提供する専属のロボットとして横領してしまうことも可能です。</p>
`,
        kanso: "「ビールをキンキンに冷やしてくれるロボット」という、ウェイストランドで最も実用的で愛らしいロボットの救出舞台。彼を自分の拠点であるサンクチュアリやレッドロケットに連れ帰った瞬間、拠点の生活の質が爆上がりする最高のサブクエスト「Trouble Brewin'」の舞台です。"
    },
    {
        title: "Wilson Atomatoys corporate HQ",
        titleJa: "ウィルソン・アトマトイズ本社",
        slug: "wilson-atomatoys-corporate-hq",
        appearance: "Fallout 4",
        wikiSlug: "Wilson_Atomatoys_corporate_HQ",
        mainImg: "Wilson_Atomatoys_Corporate_HQ.png",
        infoRows: [
            ["種族", "スーパーミュータント"],
            ["区分", "戦前のおもちゃ企業のビル"],
            ["所在地", "ボストン中心地"],
            ["目的", "ギディアップ・バターカップの製造"],
        ],
        body: `
<h2>概要</h2>
<p>ウィルソン・アトマトイズ本社（Wilson Atomatoys corporate HQ）は、戦前のアメリカの子供たちに大人気だった四足歩行の乗用おもちゃ「ギディアップ・バターカップ（ロボット馬）」を製造していた大企業の本社ビルです。</p>

<h2>詳細</h2>
<p>現在はスーパーミュータントによって占拠され、内部は彼らの肉塊と「首の取れたバターカップの部品」が散乱する不気味な空間となっています。<br>この企業のターミナル群を読み解くと、彼らがおもちゃの需要減に対する打開策として、このバターカップの歩行技術（四足歩行ロボットの部品）をどうにかしてアメリカ軍に強力な兵器として売り込もうと、狂気の兵器転用プランを練り続けていたという、戦前企業の黒い歴史が明らかになります。</p>
<p>また、有能なコンパニオンであるグールの「マーカウォーター（Vault-Tec Rep）」に似た境遇の、元ウィルソン社のおもちゃ発明家アーレン・グラスの過去に関する重要な情報（愛する娘たちの音声記録）が残されている場所でもあります。</p>
`,
        kanso: "「子供のおもちゃを軍事兵器に転用しようと必死だった会社」という、Fallout世界あるあるの皮肉な設定が存分に味わえます。そして何より、スロッグにいるアーレン・グラス爺さんの悲しい過去と繋がるホロテープ「アーレンへのメッセージ」を見つけたときの感動は、FO4の隠し要素の中でも屈指の出来栄えです。"
    },
    {
        title: "Nahant Oceanological Society",
        titleJa: "ナハント海洋学協会",
        slug: "nahant-oceanological-society",
        appearance: "Fallout 4",
        wikiSlug: "Nahant_Oceanological_Society",
        mainImg: "Nahant_Oceanological_Society.jpg",
        infoRows: [
            ["種族", "マイアルーク"],
            ["区分", "海洋研究所"],
            ["所在地", "連邦東部（ナハント半島の先端）"],
            ["特記事項", "海洋学のアーカイブ"],
        ],
        body: `
<h2>概要</h2>
<p>ナハント海洋学協会（Nahant Oceanological Society）は、ボストン東部の半島「ナハント」の先端にぽつんと建つ、戦前の海洋生物学の研究施設の廃墟です。</p>

<h2>詳細</h2>
<p>半島全体と共にマイアルークの巨大な巣窟となっており、建物内外には多数のマイアルークやマイアルーク・ハンターが徘徊しています。<br>ここの研究ターミナルには、戦前の科学者たちがこの一帯の海洋汚染や、奇妙な甲殻類の変異（つまり大戦争前の段階で既にマイアルークの原型が誕生しつつあったこと）を警告し、保護と研究を進めていた悲しい形跡が残されています。</p>
<p>インスティチュートから追放された科学者バージル（彼自身もミュータント化している）のクエストに関連して、この施設に残存する特定の海洋調査データを回収しにくるプレイヤーも多く、静かでうら寂しい波の音とマイアルークの不快な足音が響く、独特の雰囲気を持った辺境のロケーションです。</p>
`,
        kanso: "連邦の端っこの美しい海沿いにポツンと佇む、孤独で物悲しい研究所。これといって激しいボス戦はありませんが、「マイアルークの起源」を匂わせる戦前の環境調査のテキスト等、Falloutのクリーチャーたちのルーツに関するフレーバーを楽しめる世界観補完の良い施設です。"
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
