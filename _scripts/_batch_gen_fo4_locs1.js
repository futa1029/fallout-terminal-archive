// _batch_gen_fo4_locs1.js
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
        title: "Diamond City",
        titleJa: "ダイアモンドシティ",
        slug: "diamond-city",
        appearance: "Fallout 4",
        wikiSlug: "Diamond_City",
        mainImg: "Diamond_City_overview.jpg",
        infoRows: [
            ["種族", "人間"],
            ["区分", "居住区 / 商業ハブ"],
            ["所在地", "コモンウェルス (旧フェンウェイ・パーク)"],
            ["統治者", "マクドナウ市長"],
        ],
        body: `
<h2>概要</h2>
<p>ダイアモンドシティ（Diamond City）は、連邦（コモンウェルス）における最大かつ最も繁栄している居住区であり、「偉大なるグリーン・ジュエル」とも呼ばれています。戦前の野球スタジアムである「フェンウェイ・パーク」の巨大な壁の内側に作られ、スーパーミュータントやレイダーの脅威から守られた強固な要塞都市です。</p>

<h2>詳細</h2>
<p>スタジアムのグラウンド部分にはトタンや木材で作られた無数のバラック建築がひしめき合い、市場や酒場、理髪店、医者、探偵事務所などが立ち並び、豊かな経済圏を形成しています。また、観客席のVIPルーム部分は富裕層の居住区となっており、明確な階級社会が存在します。</p>
<p>長らく連邦の中心地として栄えていましたが、近年は「インスティチュート」による人造人間（シンス）の暗躍や誘拐事件が相次ぎ、住民たちは極度の疑心暗鬼に陥っています。特に数年前に起こった「ブロークン・マスク事件」以降、グールの居住区からの追放や、隣人をシンスだと疑っての殺傷事件など、壁の中の社会は大きな精神的ストレスを抱えています。</p>
<p>主人公（唯一の生存者）は誘拐された息子ショーンの行方を探すため、この街にある「バレンタイン探偵事務所」を最初に訪れることになります。</p>
`,
        kanso: "「スタジアムの中に作られたスラム街」という、ポストアポカリプス作品における最高のロケーションデザイン。初めてこの街に入った時、市場の喧騒と『ヌードル』をすする音、そして市長の演説などが耳に飛び込んできて「ついに大文字の『世界』にやってきた！」という強烈な没入感を与えてくれます。警備隊の着ている野球のキャッチャー防具も世界観に非常にマッチしています。"
    },
    {
        title: "The Prydwen",
        titleJa: "プリドゥエン",
        slug: "the-prydwen",
        appearance: "Fallout 4 / Fallout TV",
        wikiSlug: "The_Prydwen",
        mainImg: "The_Prydwen.png",
        infoRows: [
            ["種族", "ブラザーフッド・オブ・スティール"],
            ["区分", "軍事基地 / 飛行船"],
            ["所在地", "ボストン空港上空"],
            ["指揮官", "アーサー・マクソン（エルダー）"],
        ],
        body: `
<h2>概要</h2>
<p>プリドゥエン（The Prydwen）は、ブラザーフッド・オブ・スティール（B.O.S.）の東海岸支部が誇る超大型の重装甲飛行船であり、彼らの移動式司令部兼、前線基地です。</p>

<h2>詳細</h2>
<p>キャピタル・ウェイストランド（Fallout 3の舞台）のアダムス空軍基地から回収された膨大なパーツと、エンクレイヴの技術を元に数年間の歳月をかけて建造されました。水素ガスの浮力と複数のプロペラエンジンで飛行し、内部にはスクライブの研究施設、医療室、居住区、パワーアーマーの整備ベイなど、一つの都市に匹敵する機能が詰め込まれています。</p>
<p>本作の第一部終了時、夜の連邦の上空に轟音と共に現れ、ベルチバードの編隊を従えて「我々がブラザーフッド・オブ・スティールだ」と宣言しながらボストン空港へ停泊するシーンは、本作における大きなターニングポイントとなります。<br>B.O.S.のルートを進めるプレイヤーにとっては心強い拠点となりますが、他の勢力（インスティチュートやレールロードなど）と敵対した場合は、最終的にこの巨大な飛行船を撃墜するという壮絶なミッションに挑むことになります。</p>
`,
        kanso: "「空に浮かぶ鋼鉄の城」。夜の闇を切り裂くサーチライトと共に、この巨大な飛行船がボストンの上空を覆い尽くした時の圧倒的な絶望感（あるいは頼もしさ）は、Fallout 4における最高の演出として語り草になっています。なお、後にドラマ版Falloutにおいてもその雄姿（あるいは同型の飛行船Caswennan）を見せてくれます。"
    },
    {
        title: "The Castle",
        titleJa: "キャッスル",
        slug: "the-castle",
        appearance: "Fallout 4",
        wikiSlug: "The_Castle",
        mainImg: "TheCastle-Overview-Fallout4.jpg",
        infoRows: [
            ["種族", "ミニッツメン"],
            ["区分", "軍事要塞 / 居住地"],
            ["所在地", "南ボストン（旧インディペンデンス砦）"],
            ["用途", "ミニッツメン本部"],
        ],
        body: `
<h2>概要</h2>
<p>キャッスル（The Castle）は、連邦における民兵組織「ミニッツメン」の歴史的であり象徴的な本部基地です。戦前の「インディペンデンス砦」の星型要塞をそのまま再利用した頑強な防衛拠点となっています。</p>

<h2>詳細</h2>
<p>数十年前まではミニッツメンの全盛期を支える難攻不落の本部として機能し、ここから「ラジオ・フリーダム」を通じて連邦中に支援の呼びかけを行っていました。しかし、巨大なマイアルーク・クイーンによる襲撃と、内部の派閥争いなどによって組織は崩壊し、キャッスルも長きにわたり放棄されていました。</p>
<p>プレストン・ガービーの導きで将軍となった主人公は、ミニッツメン再建の象徴として、この要塞に巣食うマイアルークの群れとクイーンを掃討し、キャッスルを奪還する大規模な作戦「Taking Independence」を実行します。奪還後はかつての将軍の遺体が安置された地下の武器庫から設計図を回収し、大砲（砲撃支援）を連邦全域に展開するための最重要の司令部として機能するようになります。</p>
`,
        kanso: "廃れた組織の伝説的な本部を奪還し、再び大義の火を灯すという熱い展開の舞台。星型要塞は居住地としてのビルドのしがいもあり、壁の壊れた部分をコンクリートの基礎で塞いだり、大量のタレットを配置して「インスティチュートの大規模襲撃」を迎え撃つ最終防衛戦は、タワーディフェンス的な面白さが詰まった最高のイベントです。"
    },
    {
        title: "Vault 81",
        titleJa: "Vault 81",
        slug: "vault-81",
        appearance: "Fallout 4",
        wikiSlug: "Vault_81",
        mainImg: "Vault_81door.jpg",
        infoRows: [
            ["種族", "Vault居住者"],
            ["区分", "地下核シェルター (Vault)"],
            ["所在地", "チェストナット・ヒロック・タワー付近"],
            ["統治者", "監督官マクナマラ"],
        ],
        body: `
<h2>概要</h2>
<p>Vault 81は、ボストン西部にある戦前の地下核シェルターであり、連邦において「現在でも正常に機能し、居住者が平和に暮らしている」非常に稀なVaultの一つです。</p>

<h2>詳細</h2>
<p>このVaultに隠されていた真の目的は、「居住者を実験対象とした、あらゆる疫病や感染症に対する万能治療薬の極秘開発」であり、居住区の外側には完全に隔離された『シークレットVault』が存在し、戦前の科学者たちが永遠の命（グール等）を得て研究を続けるはずでした。<br>しかし、当時の初代監督官がこの非人道的な人体実験に反発し、研究者への連絡を絶って彼らを閉じ込めたため、居住区側の住民は「ただの安全なVault」として平和に生き延びることになりました。</p>
<p>現在では外部との交易も慎重に行っており、プレイヤー（唯一の生存者）がフュージョン・コア３つを渡すことで中に入ることができます。そこでは平和な生活を営む人々と出会える一方、隔離された地下エリアには、200年以上一人で万能薬を作り続けたロボットのキュリー（Curie）が今も眠っています。</p>
`,
        kanso: "連邦の地獄のような地上から隔離された、あまりに清潔で平和すぎる空間。しかしその壁一枚隔てた向こう側に「疫病のモルモットにするための装置」が隠されているという、いかにもVault-Tecらしい狂気の設定が光ります。ここで仲間になる「キュリー」は、Fallout 4における最高の相棒の一人です。"
    },
    {
        title: "Quincy ruins",
        titleJa: "クインシー跡地",
        slug: "quincy-ruins",
        appearance: "Fallout 4",
        wikiSlug: "Quincy_ruins",
        mainImg: "Fo4_Quincy_Ruins.png",
        infoRows: [
            ["種族", "ガンナー"],
            ["区分", "市街地廃墟"],
            ["所在地", "連邦南東部"],
            ["統治者", "クリント（元ミニッツメン）"],
        ],
        body: `
<h2>概要</h2>
<p>クインシー跡地（Quincy ruins）は、連邦南東部にある中規模の街の廃墟。現在は高度に武装した傭兵集団「ガンナー」の強固な拠点となっており、町全体が要塞化されています。</p>

<h2>詳細</h2>
<p>ここはかつて「ミニッツメンの大虐殺」と呼ばれる悲劇が起きた因縁の地です。プレストン・ガービーらミニッツメンの生き残り（スタージェスやま卿など）は元々このクインシーの住民であり、ガンナーの大規模な襲撃を受けた際にミニッツメンからの増援を待っていました。しかし、内部の裏切り者である「クリント」の手引きによって街の防衛線は崩壊し、多数の住民やミニッツメンが虐殺されました。<br>プレストン達はこのクインシーからの長きに渡る逃避行の末に、ゲーム冒頭の「コンコード」へと追い詰められていたのです。</p>
<p>現在クインシーは高所にスナイパーが配置され、ミサイルランチャーやパワーアーマーを着たガンナーの幹部（ベッサ、テッサ、そして裏切り者のクリントなど）がひしめく、ゲーム中でも屈指の激戦区となっています。</p>
`,
        kanso: "プレストン達の過去の悲劇を知った後だと、単なる敵の拠点ではなく「弔い合戦の場」となる胸熱なロケーション。ガンナー達の防衛網は非常に厄介で、不用意に近づくと頭上からのミサイルで消し炭にされます。プレストンを連れてクリントを倒しに行くと、特別な会話（怒り）を聞くことができるため、ぜひ連れて行くべきです。"
    },
    {
        title: "Mass Fusion building",
        titleJa: "マスフュージョン・ビル",
        slug: "mass-fusion-building",
        appearance: "Fallout 4",
        wikiSlug: "Mass_Fusion_building",
        mainImg: "Mass_Fusion.png",
        infoRows: [
            ["種族", "ガンナー / インスティチュート / B.O.S."],
            ["区分", "超高層ビル"],
            ["所在地", "ボストン中心部"],
            ["用途", "戦前のエネルギー企業本社"],
        ],
        body: `
<h2>概要</h2>
<p>マスフュージョン・ビル（Mass Fusion building）は、ボストン中心部にそびえ立つ、連邦で最も高い超高層ビルです。戦前は核融合エネルギーを扱う大企業の本社ビルであり、その屋上から最深部にかけて重要な技術が眠っています。</p>

<h2>詳細</h2>
<p>現在は無数のガンナーたちによって上層から下層まで完全に占拠され、彼らの拠点の一つとなっています。<br>このビルの真の価値は、ビル最上階のさらに上にある「屋上」に設置された最高機密のエグゼクティブ・レベルにあり、そこにはインスティチュートのリアクター（あるいはB.O.S.のリバティ・プライム）を本稼働させるための究極の出力を持つ「ベリリウム撹拌機」が保管されています。</p>
<p>ゲームのメインクエスト後半、このベリリウム撹拌機を巡って、インスティチュートとブラザーフッド・オブ・スティールがビルの屋上で正面衝突する大総力戦「Mass Fusion（またはSpoils of War）」が繰り広げられます。この作戦を開始した瞬間に、選ばなかった側の勢力と完全に敵対関係になるという、物語の決定的な分岐点となる場所です。</p>
`,
        kanso: "「あちらを立てればこちらが立たず」という、Fallout 4における最大の踏み絵となる超重要ロケーション。ビルの屋上にベルチバード（あるいはテレポーション）で強襲落下し、敵勢力やガンナー達とレーザーが交錯する激しい空中戦＆ビル内降下戦のシークエンスは、ハリウッド映画顔負けの盛り上がりを見せます。"
    },
    {
        title: "Covenant",
        titleJa: "コベナント",
        slug: "covenant",
        appearance: "Fallout 4",
        wikiSlug: "Covenant",
        mainImg: "Covenant.jpg",
        infoRows: [
            ["種族", "人間"],
            ["区分", "居住区 / 秘密結社"],
            ["所在地", "連邦北中部"],
            ["用途", "人造人間（シンス）狩りの前哨基地"],
        ],
        body: `
<h2>概要</h2>
<p>コベナント（Covenant）は、背の高いコンクリートの防壁と無数のタレットで守られた、不自然なほど平和で整頓された居住地。戦前の家屋が綺麗に保たれており、住民たちは狂気的なほどフレンドリーに接してきます。</p>

<h2>詳細</h2>
<p>この街に入るためには、入り口で行われる「S.A.F.E.テスト」と呼ばれる奇妙な適性検査（初代FalloutやFallout 3のGOATテストのような心理テスト）に合格する必要があります。<br>この街の真の正体は、シンス（人造人間）に家族を殺された者たちで構成された過激な対シンス組織のフロント企業であり、S.A.F.E.テストを利用して「人間とシンスを見分ける」ための実験を行っています。しかし彼らの見分け方は極めて不完全であり、疑わしき者（多くの場合はただの人間）を地下施設に拉致して拷問・解剖するという恐ろしい凶行に手を染めています。</p>
<p>ダン・ダンス（Honest Dan）という傭兵と共に消えたキャラバンの足跡を辿るクエスト「Human Error」において、プレイヤーはこの街の忌まわしい地下施設の存在を暴くことになります。</p>
`,
        kanso: "「フレンドリーな住民たちの裏の顔」という、サスペンス映画の王道を行く胸糞ロケーション。テストを受けさせられるところから始まり、街中にヒントが散りばめられている探索要素はクエストとして非常に出来が良いです。彼らの歪んだ正義をどう裁くかは、プレイヤーの手に委ねられます（そして大抵の場合、街はもぬけの殻になります）。"
    },
    {
        title: "Dunwich Borers",
        titleJa: "ダンウィッチ・ボーラー",
        slug: "dunwich-borers",
        appearance: "Fallout 4",
        wikiSlug: "Dunwich_Borers",
        mainImg: "Fo4_quarry_E3.png",
        infoRows: [
            ["種族", "レイダー / フェラル・グール"],
            ["区分", "採石場 / ホラーダンジョン"],
            ["所在地", "連邦北東部"],
            ["用途", "古代神の祭壇 (クトゥルフ神話)"],
        ],
        body: `
<h2>概要</h2>
<p>ダンウィッチ・ボーラー（Dunwich Borers）は、戦前の金属巨大企業「ダンウィッチ・ボーラーズLLC」が運営していた巨大な大理石採石場の跡地。現在はレイダーの前哨基地となっていますが、地下の最深部にはおぞましい秘密が隠されています。</p>

<h2>詳細</h2>
<p>Fallout 3にも登場した「ダンウィッチ・ビルディング」と同じ企業であり、クトゥルフ神話（H・P・ラヴクラフト作品）のオマージュとなる超常的な狂気に満ちたロケーションです。<br>一見するとただのレイダーの集落ですが、採石場の深部へと降りていくにつれ、レイダーたちは姿を消し、代わりに大量のフェラル・グールが出現し始めます。<br>さらに地下深部では光が消え、主人公の周りで「戦前の採石場の作業員たちが、何かに狂わされて生贄の儀式に引き込まれていく」という過去の幻影（フラッシュバック現象）が何度も発生します。</p>
<p>最奥部にある放射能で汚染された水溜りの底には、巨大な顔のような彫像と、ユニーク近接武器である「クレンヴの歯（Kremvh's Tooth）」が沈んでおり、古代から続く邪神の静かな息遣いを感じさせます。</p>
`,
        kanso: "Fallout名物「ダンウィッチ（ラヴクラフト）の怪奇現象」のFO4版。急に場面が戦前に切り替わるフラッシュバック演出は本当に心臓に悪く、ホラーゲームかと思うほどの恐怖を味わえます。ここに沈んでいる毒のナイフ「クレンヴの歯」は、アタッチメントを外して別のマチェットに付け替えることができるという裏技（？）があり、実用性も非常に高いです。"
    },
    {
        title: "Sanctuary Hills",
        titleJa: "サンクチュアリ・ヒルズ",
        slug: "sanctuary-hills",
        appearance: "Fallout 4",
        wikiSlug: "Sanctuary_Hills",
        mainImg: "Fo4_Sanctuary_Hills_Overview.png",
        infoRows: [
            ["種族", "人間 (プレイヤーと入植者)"],
            ["区分", "居住区 / 全ての始まりの地"],
            ["所在地", "連邦北西部"],
            ["関連", "Vault 111"],
        ],
        body: `
<h2>概要</h2>
<p>サンクチュアリ・ヒルズ（Sanctuary Hills）は、主人公（唯一の生存者）が大戦争（2077年）の前に妻や赤ん坊のショーンと共に平和に暮らしていた、閑静な郊外の住宅街です。ゲームの幕開けとなる象徴的なロケーションです。</p>

<h2>詳細</h2>
<p>200年後の現在、近隣にあるVault 111の冷凍睡眠からただ一人目覚めた主人公が街に戻ると、かつての美しいマイホームや近所の家々はすべて崩れ落ち、放射能の嵐に晒された廃墟と化していました。しかし、主人公の家のロボット執事であった「コズワース」だけは健気に待ち続けており、ここで最初の再会を果たします。</p>
<p>プレストン・ガービーらコンコードの生存者を救出すると、彼らはこのサンクチュアリへと避難してきます。ここからクラフト（拠点開発）システムが解禁され、プレイヤーの手によって廃墟を切り拓き、農地を作り、浄水器を置き、強固な防衛網を築き上げて「復興の中心地（事実上の主人公のホームベース）」へと変貌させていくことになります。</p>
`,
        kanso: "大戦争前の、あまりにも美しく平和なアメリカン・ドリームを見せられた直後に、それが完全に崩壊した絶望の光景へと放り出される「これぞFallout」という完璧なオープニングを飾る場所。ここをただの廃墟のままで終わらせるか、それとも巨大なビルを建ててライトアップされた大要塞都市にするかは、将軍（プレイヤー）の建築センスと膨大なプレイ時間にかかっています。"
    },
    {
        title: "Bunker Hill",
        titleJa: "バンカーヒル",
        slug: "bunker-hill",
        appearance: "Fallout 4",
        wikiSlug: "Bunker_Hill",
        mainImg: "BunkerHill-Fallout4.jpg",
        infoRows: [
            ["種族", "人間 / グール"],
            ["区分", "居住区 / 商業の中継地"],
            ["所在地", "チャールズタウン"],
            ["統治者", "ケスラー / レールロード"],
        ],
        body: `
<h2>概要</h2>
<p>バンカーヒル（Bunker Hill）は、史跡であるバンカーヒル記念塔の足元を巨大な防壁で囲った、連邦におけるキャラバン（行商人）たちの一大中継基地および居住地です。</p>

<h2>詳細</h2>
<p>町長の役割を果たすケスラーの卓越した交渉術により、周辺のレイダーに「みかじめ料」を支払うことで独立と安全を確保しており、連邦中を回る行商人たちが安全に情報を共有し、休息できる不可欠なハブとなっています。<br>しかし、その町の地下には、人造人間解放組織「レールロード」が運営するシンス（逃亡した人造人間）のための重要な隠しシェルターが密かに存在していました。</p>
<p>物語の中盤、この地下のシンスたちを巡って「インスティチュート（奪還）」「B.O.S.（殲滅）」「レールロード（保護）」の３勢力が一斉にバンカーヒルへなだれ込む超大規模な三つ巴の戦い「The Battle of Bunker Hill」が発生します。この激戦により、平和だった商人の町は火の海と化すことになります。</p>
`,
        kanso: "普段は商人たちの賑やかな憩いの場ですが、メインクエストでの「三つ巴の総力戦」の舞台としてのインパクトが凄まじいロケーション。レーザーやプラズマ、ミサイルが大空を飛び交う中で、プレイヤー自身はどの勢力にも属したふりをして隠語で立ち回ることができるという、Fallout 4における最高にカオティックで熱い戦場の一つです。"
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
