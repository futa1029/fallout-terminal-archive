// バッチ1: 高重要度クリーチャー記事13件を生成
// ロア（背景・生態・感想）に集中、ステータス表は省略
const fs = require('fs');
const path = require('path');
const https = require('https');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function downloadImage(url, filepath) { return new Promise((resolve, reject) => { fs.mkdirSync(path.dirname(filepath), { recursive: true }); const mod = url.startsWith('https') ? https : require('http'); mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => { if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) { downloadImage(res.headers.location, filepath).then(resolve).catch(reject); return; } if (res.statusCode !== 200) { resolve(false); return; } const ws = fs.createWriteStream(filepath); res.pipe(ws); ws.on('finish', () => { ws.close(); resolve(true); }); ws.on('error', reject); }).on('error', reject); }); }
function getImageUrl(filename) { return new Promise((resolve) => { const url = `https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`; https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => { let data = ''; res.on('data', c => data += c); res.on('end', () => { try { const j = JSON.parse(data); const page = Object.values(j.query.pages)[0]; resolve(page.imageinfo?.[0]?.url || null); } catch(e) { resolve(null); } }); }).on('error', () => resolve(null)); }); }

const template = fs.readFileSync('F:/Fallout/mole-miner.html', 'utf8');
const cssBlock = template.substring(template.indexOf('<style>'), template.indexOf('</style>') + '</style>'.length);

// 高重要度13件
const articles = [
  {
    slug: 'scorchbeast-fo76', title: 'Scorchbeast', titleJa: 'スコーチビースト',
    wikiSlug: 'Scorchbeast', ogDesc: 'スコーチビースト — アパラチアの空を支配する巨大な翼竜型ミュータント。',
    mainImg: 'FO76_creature_scorchbeast.png', galleryImgs: ['FO76_Scorchbeast_full.png'],
    infoRows: [['種別','ミュータント（コウモリ変異体）'],['地域','アパラチア全域（主にクランベリー湿原）'],['ドロップ','スコーチビーストの脳、超音波放射器官'],['関連','スコーチ病、スコーチビースト・クイーン'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>スコーチビースト</b>は、Fallout 76に登場する大型の飛行クリーチャーである。<br>超音波を放射する巨大なコウモリの変異体で、アパラチアにおいてスコーチ病を拡散させる元凶とされている。</p>

<h2>背景</h2>
<p>スコーチビーストは、アルトゥス鉱山に生息していた巨大コウモリが、ウルトラサイトへの長期間の放射線曝露によって変異した結果生まれた。<br>鉱山労働者のオートマイナーが掘削を進めるにつれ、ウルトラサイトの鉱脈が露出し、コウモリの変異が加速した。<br>最終的にスコーチビーストは地表に出現し、超音波による攻撃とスコーチ病の拡散でアパラチア全土を壊滅に追い込んだ。</p>
<p>B.O.S.のタガーディ長老は「テッド・スコーチビースト」というコードネームでこの脅威を追跡していた。<br>ブラザーフッドは核ミサイルサイロを使ってスコーチビーストの巣を攻撃する計画を立てたが、スコーチビーストの圧倒的な数と、スコーチ化した仲間からの攻撃によって壊滅した。</p>

<h2>特徴</h2>
<p>スコーチビーストは飛行しながら超音波を放射し、地上の敵を攻撃する。<br>この超音波は着弾地点に緑色のスコーチ痕を残し、一定範囲にダメージと放射線を与える。<br>地上に降りた際は翼による打撃と噛みつき攻撃を行う。<br>体力が高く、高レベルのプレイヤーでも単独での撃破は困難。</p>
<p>スコーチビーストを倒さずに放置すると、周囲のクリーチャーや人間をスコーチ化させるため、早期の排除が重要。<br>核を亀裂地帯に投下するとスコーチビースト・クイーンが出現する。</p>`,
    kanso: `アパラチアの空に巨大な影が差した瞬間の絶望感は、FO76でしか味わえない体験です。<br>初めてのスコーチビースト遭遇はレベル20台で逃げ回るしかなかった痛い思い出w<br>ウルトラサイトの放射線でコウモリが変異したという設定は、Falloutの「科学が生んだ怪物」というテーマを完璧に体現しています。<br>核ミサイルサイロでクイーンを呼び出すエンドゲームの導線も見事な設計で、ゲーム全体のストーリーがこのクリーチャーに集約されている感があります。`,
  },
  {
    slug: 'scorchbeast-queen', title: 'Scorchbeast queen', titleJa: 'スコーチビースト・クイーン',
    wikiSlug: 'Scorchbeast_queen', ogDesc: 'スコーチビースト・クイーン — スコーチビーストの頂点に立つ最強の個体。',
    mainImg: 'FO76_creature_scorchbeast_queen.png', galleryImgs: [],
    infoRows: [['種別','ミュータント（コウモリ変異体）'],['出現条件','亀裂地帯への核投下'],['ドロップ','ウルトラサイト設計図各種'],['イベント','スコーチビースト・クイーンの殲滅'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>スコーチビースト・クイーン</b>は、Fallout 76に登場する最強の敵の一つである。<br>核ミサイルを亀裂地帯（クランベリー湿原南部）に投下することで出現する。</p>

<h2>背景</h2>
<p>スコーチビースト・クイーンは、スコーチビーストの群れの中で最も強力な個体であり、スコーチ病の拡散において中心的な役割を果たしている。<br>通常のスコーチビーストよりも遥かに大きく、体色も異なる。</p>

<h2>特徴</h2>
<p>スコーチビースト・クイーン戦はFO76の代表的なエンドゲームコンテンツであり、最大8人のチームで挑むパブリックイベント「スコーチビースト・クイーンの殲滅」として実装されている。<br>クイーンのHPは極めて高く、30分の時間制限内に倒しきる必要がある。<br>戦闘中はスコーチビーストやスコーチが無限に湧き出し、カオスな戦場となる。<br>報酬としてウルトラサイト・パワーアーマーの設計図やレジェンダリー装備がドロップする。</p>`,
    kanso: `FO76プレイヤーなら一度は経験する「ニューク・ドロップ→クイーン戦」の流れは、まさにゲームのハイライト。<br>20人以上のプレイヤーが荒野に集結して巨大なコウモリと戦う光景は、オンラインゲームならではの興奮があります。<br>初期は30分ギリギリで倒せるかどうかの緊張感でしたが、ビルドが成熟した今は数分で溶ける悲しさもw<br>それでもニュークの閃光を見て走って集まるのは毎回ワクワクします。`,
  },
  {
    slug: 'feral-ghoul-fo76', title: 'Feral ghoul', titleJa: 'フェラル・グール',
    wikiSlug: 'Feral_ghoul_(Fallout_76)', ogDesc: 'フェラル・グール — 放射線によって理性を失ったグールの成れの果て。',
    mainImg: 'FO76_Feral_Ghoul.png', galleryImgs: [],
    infoRows: [['種別','ミュータント（グール変異体）'],['攻撃','素手による打撃、放射線ダメージ'],['弱点','頭部'],['地域','アパラチア全域'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>フェラル・グール</b>は、Fallout 76に登場する一般的なクリーチャーである。<br>放射線への過度な曝露により、人間としての知性と社会性を失い、本能的な暴力衝動のみで行動するようになったグール。</p>

<h2>背景</h2>
<p>グールとは、致死量の放射線を浴びたにもかかわらず生存した人間の変異体である。<br>多くのグールは知性を保持するが、時間の経過や追加の放射線曝露によって脳機能が退化し、「フェラル」（野生化）状態に陥る。<br>フェラル・グールは生きている人間を本能的に攻撃するが、正常なグールは攻撃しない。</p>

<h2>バリエーション</h2>
<p>FO76には多数のフェラル・グール亜種が存在する：<br>
チャードフェラル・グール（焦げたグール）、グロウイング・ワン（発光グール）、ブラステッド・フェラル・グール（爆発グール）、ウィザード・フェラル・グール（枯れたグール）など。<br>
レベルに応じて体力と攻撃力が増加する。<br>発光グールは死亡時に周囲にRADを放射する。</p>`,
    kanso: `Falloutシリーズ定番の敵で、どの作品でも最初に「うわぁ！」となる相手。<br>FO76では群れで襲ってくることが多く、廃墟の暗がりから突然ダッシュしてくる演出は何度遭遇しても心臓に悪い。<br>ウェイワード近くの低レベルエリアでも容赦なく出現するので、初心者キラーとしても有名ですね。<br>発光グールが死亡時にRADをばら撒くのは地味にキツい。`,
  },
  {
    slug: 'grafton-monster', title: 'Grafton Monster', titleJa: 'グラフトン・モンスター',
    wikiSlug: 'Grafton_Monster', ogDesc: 'グラフトン・モンスター — ウエストバージニアの都市伝説が現実になった頭のない巨人。',
    mainImg: 'FO76_Grafton_Monster.png', galleryImgs: [],
    infoRows: [['種別','クリプティッド'],['外見','頭のない白い巨大な人型'],['攻撃','投擲物、近接攻撃'],['出没地','毒の峡谷（グラフトン周辺）'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>グラフトン・モンスター</b>は、Fallout 76に登場するクリプティッド（未確認生物）の一種である。<br>頭部を持たない白い巨大な人型のクリーチャーで、ウエストバージニア州グラフトンの実在する都市伝説に基づいている。</p>

<h2>背景</h2>
<p>グラフトン・モンスターは、ウエストイーク社が「グラフトン・スティール」の下請けとして行った非倫理的な実験の結果生まれた。<br>FEV（強制進化ウイルス）を使った実験が行われ、被験者が巨大な頭のない怪物に変異した。<br>1966年6月18日、グラフトンで最初の目撃情報が報告された。これは実在の都市伝説「グラフトン・モンスター」と同じ日付である。</p>

<h2>特徴</h2>
<p>グラフトン・モンスターは非常に高い体力を持ち、地面を叩いて周囲にダメージを与えるほか、投擲物を飛ばして遠距離攻撃も行う。<br>頭がないため、ヘッドショットのクリティカルダメージが発生しない。<br>毒の峡谷のグラフトン周辺に頻繁に出現し、「グラフトンの日」パレードイベントでも登場する。</p>

<h2>実在の都市伝説</h2>
<p>1964年、ウエストバージニア州グラフトンで新聞記者ロバート・コッカレルが巨大な白い頭のない怪物を目撃したと報告した。<br>以来、グラフトン・モンスターはウエストバージニアの代表的なクリプティッドの一つとなっている。</p>`,
    kanso: `ウエストバージニアの実在するクリプティッドをゲームに取り入れるという発想が素晴らしい。<br>FEV実験の産物という設定でFalloutの世界観にうまく落とし込んでいます。<br>頭がないのでヘッドショットが効かないのは地味にイヤらしい設計w<br>グラフトンの日パレードで巨大なバルーンの後ろから本物が出てくる演出は最高に怖かったです。`,
  },
  {
    slug: 'mirelurk-fo76', title: 'Mirelurk', titleJa: 'マイアラーク',
    wikiSlug: 'Mirelurk_(Fallout_76)', ogDesc: 'マイアラーク — 放射線で変異した巨大な甲殻類。',
    mainImg: 'FO76_Mirelurk.png', galleryImgs: [],
    infoRows: [['種別','ミュータント（甲殻類変異体）'],['弱点','腹部（正面の殻は高DR）'],['地域','水辺全般'],['ドロップ','マイアラークの肉、ソフトシェルの肉'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>マイアラーク</b>は、放射線で変異した巨大な甲殻類で、Falloutシリーズの代表的なクリーチャーの一つである。<br>FO76では水辺の近くに広く生息している。</p>

<h2>背景</h2>
<p>マイアラークは、大戦前のチェサピーク湾に生息していたカニやロブスターが放射線によって巨大化・変異したものとされている。<br>硬い外殻に覆われた体は正面からの攻撃に高い耐性を持つが、腹部は比較的脆弱。</p>

<h2>バリエーション</h2>
<p>FO76にはマイアラーク、ソフトシェル・マイアラーク、グロウイング・マイアラーク、マイアラーク・ハンター、マイアラーク・キング、マイアラーク・クイーンなど多数の亜種が存在する。<br>マイアラーク・キングは超音波攻撃を使い、クイーンは酸を吐く攻撃を行う。</p>`,
    kanso: `水辺に近づいたら要注意。砂の中から突然飛び出してくるマイアラークは何度遭遇しても油断できません。<br>正面の殻が硬すぎて弾を弾かれるのがストレスフルですが、V.A.T.S.で腹部を狙うと一気に楽になります。<br>マイアラークの肉は序盤の食料として超優秀なので、倒すモチベーションは高い。`,
  },
  {
    slug: 'radscorpion-fo76', title: 'Radscorpion', titleJa: 'ラッドスコルピオン',
    wikiSlug: 'Radscorpion_(Fallout_76)', ogDesc: 'ラッドスコルピオン — 放射線で巨大化したサソリ。',
    mainImg: 'FO76_Radscorpion.png', galleryImgs: [],
    infoRows: [['種別','ミュータント（サソリ変異体）'],['攻撃','毒針、ハサミ、地中からの奇襲'],['弱点','頭部、尾'],['地域','アパラチア全域'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>ラッドスコルピオン</b>は、放射線によって巨大化したサソリの変異体で、Falloutシリーズ伝統のクリーチャーである。</p>

<h2>背景</h2>
<p>大戦前に実験用に飼育されていた皇帝サソリが放射線で変異し、巨大化した。<br>FO76では地中に潜って移動し、プレイヤーの足元から突然出現する奇襲攻撃を得意とする。<br>毒針による攻撃はダメージに加えて毒効果を与え、継続的に体力を削る。</p>

<h2>特徴</h2>
<p>ラッドスコルピオンは非常にアグレッシブで、遠距離から突進してくる。<br>地中からの奇襲は予兆として地面の振動があるが、気づかないうちに背後に出現することも多い。<br>高レベルの亜種（アルビノ、デスリーなど）は体力が非常に高く、少人数での対処は困難。</p>`,
    kanso: `地面から突然飛び出してくる演出は本当にやめてほしいw<br>採掘場や洞窟の近くを歩いていて突然足元からバサッと出てくるのは心臓に悪すぎます。<br>毒のDoTダメージが地味にキツくて、スティムパックを惜しみなく使わされるのも厄介。<br>ただシリーズ伝統のクリーチャーだけあって、倒した時の達成感は格別です。`,
  },
  {
    slug: 'snallygaster-fo76', title: 'Snallygaster', titleJa: 'スナリーギャスター',
    wikiSlug: 'Snallygaster', ogDesc: 'スナリーギャスター — メリーランド州の都市伝説に基づくFEV変異体。',
    mainImg: 'FO76_Snallygaster.png', galleryImgs: [],
    infoRows: [['種別','ミュータント（FEV変異体）'],['外見','多眼、長い舌、爬虫類的な体'],['攻撃','酸の吐き出し、近接攻撃'],['出没地','毒の峡谷、積灰の山'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>スナリーギャスター</b>は、Fallout 76に登場するFEV変異体のクリーチャーである。<br>メリーランド州の実在する都市伝説「スナリーガスター」に基づいている。</p>

<h2>背景</h2>
<p>スナリーギャスターは、ウエストイーク社のFEV（強制進化ウイルス）研究施設で行われた実験の産物である。<br>多数の目を持つ爬虫類のような外見で、長い舌を使って獲物を捕らえる。<br>FEVと放射線の二重変異により、酸を吐き出す能力を獲得した。</p>

<h2>特徴</h2>
<p>スナリーギャスターは遠距離から酸を吐き、近距離では長い舌と爪で攻撃する。<br>複数の目は弱点であり、V.A.T.S.で狙うと高いクリティカルダメージが出る。<br>群れで出現することは稀だが、単体でも侮れない火力を持つ。</p>

<h2>実在の都市伝説</h2>
<p>スナリーガスター（Snallygaster）は、メリーランド州フレデリック郡の民間伝承に登場する半鳥半爬虫類の怪物。<br>ドイツ系移民が持ち込んだ伝説が起源とされ、「素早い幽霊」を意味するドイツ語が語源。</p>`,
    kanso: `目がいっぱいある見た目のキモさがとにかくインパクト大。<br>毒の峡谷を歩いていると突然酸を飛ばしてくるのが厄介で、特にローレベル時は恐怖の対象でした。<br>FEV実験の産物という設定でグラフトン・モンスターと出自が同じなのも面白いポイント。<br>メリーランドの実在する都市伝説がモデルで、ドイツ語由来の名前というのも異国情緒があって良い。`,
  },
  {
    slug: 'wendigo-colossus', title: 'Wendigo colossus', titleJa: 'ウェンディゴ・コロッサス',
    wikiSlug: 'Wendigo_colossus', ogDesc: 'ウェンディゴ・コロッサス — ウェンディゴが巨大化した3つ頭の恐怖。',
    mainImg: 'FO76WL_Wendigo_Colossus.png', galleryImgs: [],
    infoRows: [['種別','ミュータント（ウェンディゴ変異体）'],['出現条件','核爆発地帯'],['特殊','恐怖効果（フィアー）'],['イベント','コロッサルな問題'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>ウェンディゴ・コロッサス</b>は、Fallout 76に登場する巨大なクリーチャーで、ウェンディゴが極度に成長した姿である。<br>3つの頭を持つ巨大な人型で、パブリックイベント「コロッサルな問題」のボスとして登場する。</p>

<h2>背景</h2>
<p>ウェンディゴ・コロッサスは、ウェンディゴがさらなる放射線曝露と食人によって巨大化した進化形態である。<br>通常のウェンディゴよりも遥かに大きく、複数の腕と3つの頭を持つ。<br>核爆発地帯に出現し、恐怖のオーラを放射してプレイヤーの行動を制限する。</p>

<h2>特徴</h2>
<p>「コロッサルな問題」イベントでは、モノンガー鉱山に核を投下すると地下でウェンディゴ・コロッサスとの戦闘が始まる。<br>恐怖効果（フィアー）により、一定距離内のプレイヤーは強制的に逃走させられる。<br>地面を叩く範囲攻撃と、絡みつく触手攻撃が特徴的。<br>時間制限があり、制限内に倒せない場合は鉱山が崩落して失敗となる。</p>`,
    kanso: `スコーチビースト・クイーンに並ぶFO76のエンドゲームボス。<br>地下の鉱山で戦うシチュエーションが閉所恐怖症的な緊張感を生み出していて、クイーン戦とは全く異なる体験です。<br>恐怖効果で強制的に逃走させられるのが厄介で、特にメレービルドだとめちゃくちゃストレスフルw<br>3つ頭のデザインは純粋にホラーとして優秀で、暗い鉱山の奥から現れる姿は忘れられません。`,
  },
  {
    slug: 'yao-guai-fo76', title: 'Yao guai', titleJa: 'ヤオ・グアイ',
    wikiSlug: 'Yao_guai_(Fallout_76)', ogDesc: 'ヤオ・グアイ — 放射線で変異した巨大なクマ。',
    mainImg: 'FO76_Yao_Guai.png', galleryImgs: [],
    infoRows: [['種別','ミュータント（クマ変異体）'],['語源','中国語「妖怪」'],['攻撃','爪、噛みつき'],['地域','アパラチア全域（特に森林地帯）'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>ヤオ・グアイ</b>は、放射線で変異したアメリカクロクマの変異体である。<br>名前は中国語の「妖怪（yāo guài）」に由来する。</p>

<h2>背景</h2>
<p>大戦後、アメリカ東部に生息していたクロクマが放射線の影響で巨大化・凶暴化した。<br>中国系の生存者たちがこの変異体を「妖怪」と呼んだことから、この名称が定着した。<br>毛が抜け落ちた皮膚、鋭い爪、そして異常な攻撃性を持つ。</p>

<h2>特徴</h2>
<p>ヤオ・グアイは非常にアグレッシブで、視認範囲のプレイヤーに即座に突進してくる。<br>攻撃力が高く、防御力の低いプレイヤーは数発で倒される。<br>しかし、「動物の味方」パークを装備すると友好的になり、攻撃してこなくなる。<br>C.A.M.P.のペットとして手懐けることも可能（Wastelandersアップデート以降）。</p>`,
    kanso: `名前の由来が中国語の「妖怪」というのが面白い。<br>Falloutの世界では中国語由来の名前が結構あって（ヌカワールドのシーダーも）、文化的な混交を感じます。<br>序盤に出くわすと一撃でやられるので恐怖の対象ですが、ビルドが整うと逆にヤオ・グアイのステーキが美味しいという…w<br>「動物の味方」パークでペットにできるのも嬉しいポイント。`,
  },
  {
    slug: 'the-interloper', title: 'The Interloper', titleJa: 'ジ・インターローパー',
    wikiSlug: 'The_Interloper', ogDesc: 'ジ・インターローパー — ラッキーホール鉱山に潜む不気味な存在。',
    mainImg: 'FO76_the_interloper.png', galleryImgs: [],
    infoRows: [['種別','不明（ラブクラフト的存在）'],['所在','ラッキーホール鉱山最深部'],['関連勢力','ラッキーホールの教団'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>ジ・インターローパー</b>は、Fallout 76に登場する謎のエンティティである。<br>ラッキーホール鉱山の最深部に存在する巨大な触手状の有機体で、そのオリジンは一切不明。</p>

<h2>背景</h2>
<p>ラッキーホール鉱山では、大戦前から「何か」が鉱山の奥深くに存在していた。<br>鉱山労働者たちの一部はこの存在に魅了され、やがてカルト教団を形成した。<br>教団員たちは儀式を行い、「闇の中の声」に従って行動するようになった。<br>教団員は鉤爪を腕に装着し、人間の脳を供物として捧げた。</p>
<p>ジ・インターローパーの正体は明確にされておらず、プレイヤーが鉱山の奥で対面できるのは巨大な木のような触手の塊だけである。<br>これがクリーチャーなのか植物なのか、あるいはそれ以上の何かなのかは不明のまま。<br>ラブクラフト的な宇宙的恐怖を想起させるデザインが施されている。</p>`,
    kanso: `FO76で最も不気味な存在。ラッキーホール鉱山を下っていくにつれ増していく不安感と、最深部で巨大な触手の塊と対面した瞬間の「なにこれ…」感は凄まじい。<br>正体が一切明かされないのが逆に怖くて、ラブクラフト的な宇宙的恐怖をFalloutに持ち込んだBethesdaのセンスに脱帽です。<br>教団員が人間の脳を捧げていたという設定も含め、FO76で最もダークなストーリーラインの一つ。`,
  },
  {
    slug: 'ultracite-titan', title: 'Ultracite Titan', titleJa: 'ウルトラサイト・タイタン',
    wikiSlug: 'Ultracite_Titan', ogDesc: 'ウルトラサイト・タイタン — Expeditionsで登場する超巨大スコーチビースト。',
    mainImg: 'FO76SR_Ultracite_Titan.png', galleryImgs: [],
    infoRows: [['種別','ミュータント（スコーチビースト進化形）'],['サイズ','通常のスコーチビーストの数倍'],['イベント','Ultracite Titan特別作戦'],['登場作品','Fallout 76 (Skyline Valley)']],
    body: `<h2>概要</h2>
<p><b>ウルトラサイト・タイタン</b>は、Fallout 76のSkyline Valleyアップデートで追加された超巨大スコーチビーストである。<br>通常のスコーチビーストを遥かに凌駕するサイズと戦闘力を持つ。</p>

<h2>背景</h2>
<p>ウルトラサイト・タイタンは、ウルトラサイト鉱石を大量に摂取して異常成長したスコーチビーストの究極形態とされている。<br>その巨体は空を覆うほどで、出現時には周囲が暗くなるほどの威圧感がある。</p>

<h2>特徴</h2>
<p>ウルトラサイト・タイタンとの戦闘は専用のパブリックイベントとして実装されている。<br>複数フェーズに分かれた戦闘で、弱点部位を順番に破壊していく必要がある。<br>報酬として専用の設計図やレジェンダリー装備がドロップする。</p>`,
    kanso: `FO76の「もっとデカい敵が欲しい」というプレイヤーの声に応えたボス。<br>空を覆い尽くすほどの巨体は初見で思わず声が出るインパクトがあります。<br>専用イベントの演出も凝っていて、フェーズごとに弱点を狙っていく戦略性はクイーン戦より面白いかも。`,
  },
  {
    slug: 'honey-beast-fo76', title: 'Honey beast', titleJa: 'ハニービースト',
    wikiSlug: 'Honey_beast', ogDesc: 'ハニービースト — 巨大な蜂と蜂の巣が融合した不気味なクリーチャー。',
    mainImg: 'FO76_creature_honeybeast.png', galleryImgs: [],
    infoRows: [['種別','ミュータント（昆虫変異体）'],['外見','巨大な蜂、体に蜂の巣が付着'],['攻撃','蜂の群れ召喚、近接攻撃'],['ドロップ','蜂蝋、ハニービーストの翼'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>ハニービースト</b>は、Fallout 76に登場する巨大な蜂型クリーチャーである。<br>体表に蜂の巣が融合しており、戦闘中に小さな蜂の群れを召喚して攻撃する。</p>

<h2>背景</h2>
<p>ハニービーストは、放射線で変異した蜂が蜂の巣と一体化した異形のクリーチャーである。<br>体内で蜜を生成しており、体表の蜂の巣からは小さな蜂の群れが分離して敵を攻撃する。<br>アパラチアの森林地帯やフラワーガーデン周辺に出没する。</p>

<h2>特徴</h2>
<p>ハニービーストの最大の脅威は、召喚される蜂の群れである。<br>本体を攻撃しつつ群れも処理する必要があり、近接ビルドだと厄介な相手。<br>蜂の群れは本体が死ぬと消滅するため、本体集中攻撃が有効。<br>倒すと蜂蝋やハニービーストの翼がドロップし、クラフト素材として使用できる。</p>`,
    kanso: `見た目のインパクトがとにかく凄い。蜂の巣と蜂が一体化した異形のデザインは、FO76オリジナルクリーチャーの中でも際立っています。<br>蜂の群れを召喚されるとうっとうしいですが、本体を素早く倒せば群れも消えるのがコツ。<br>蜂蝋は意外と使い道が多いので、見かけたら積極的に狩りたいクリーチャーです。`,
  },
  {
    slug: 'mega-sloth-fo76', title: 'Mega sloth', titleJa: 'メガ・スロス',
    wikiSlug: 'Mega_sloth', ogDesc: 'メガ・スロス — 放射線で巨大化した三本指ナマケモノ。',
    mainImg: 'FO76_creature_megasloth.png', galleryImgs: [],
    infoRows: [['種別','ミュータント（ナマケモノ変異体）'],['外見','体表にキノコが生えた巨大ナマケモノ'],['攻撃','爪攻撃、投擲'],['地域','沼地地帯'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>メガ・スロス</b>は、Fallout 76に登場する巨大な三本指ナマケモノの変異体である。<br>体表に発光するキノコが共生しており、沼地地帯に生息している。</p>

<h2>背景</h2>
<p>大戦前にバークレー・スプリングスの地域に生息していたナマケモノ（動物園から逃げた個体の子孫と推測）が、放射線の影響で巨大化した。<br>体表に生えたキノコは放射性物質を含み、暗所では発光する。<br>ナマケモノの穏やかなイメージとは裏腹に、メガ・スロスは非常に攻撃的。</p>

<h2>特徴</h2>
<p>メガ・スロスは巨大な爪で近接攻撃を行い、一定距離ではキノコの胞子を投擲してくる。<br>動きは比較的遅いが、攻撃の一つ一つが強力。<br>沼地地帯や森林地帯で出没し、いきなり出くわすと高レベルでも油断できない。<br>C.A.M.P.のペットとして手懐けることも可能。</p>`,
    kanso: `体にキノコが生えた巨大ナマケモノというデザインが最高にFalloutらしい。<br>沼地地帯の薄暗い霧の中から現れる姿は不気味だけど、どこか可愛さもあるんですよね。<br>C.A.M.P.のペットにできるのも嬉しくて、のっそりキャンプを歩き回るメガ・スロスは癒やしの存在です。<br>ただし戦闘時の爪攻撃は本気で痛いので要注意。`,
  },
];

function generateHtml(a) {
  const articleId = `note_${a.slug.replace(/-/g, '_')}`;
  const galleryHtml = a.galleryImgs.length > 0 ? `\n<div class="gallery-section">\n<h2>ギャラリー</h2>\n<div class="gallery-grid">\n${a.galleryImgs.map((g, i) => `<div class="gallery-item"><img src="images/note_extracted/${a.slug}/img_gallery_${i+1}.png" alt="${a.title}"><div class="caption">${a.title}</div></div>`).join('\n')}\n</div>\n</div>` : '';
  const rows = a.infoRows.map(r => `<div class="infobox-row"><span class="infobox-label">${r[0]}</span><span>${r[1]}</span></div>`).join('');
  return `<!DOCTYPE html>\n<html lang="ja">\n<head>\n    <meta charset="UTF-8"><title>${a.title} | Overseer Mohi's Terminal</title><link rel="canonical" href="https://www.fallout-jp.com/${a.slug}.html"><meta property="og:type" content="article"><meta property="og:site_name" content="Overseer Mohi's Terminal"><meta property="og:locale" content="ja_JP"><meta property="og:title" content="${a.title} | Overseer Mohi's Terminal"><meta property="og:description" content="${a.ogDesc}"><meta property="og:url" content="https://www.fallout-jp.com/${a.slug}.html"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@IwamotoFuta"><script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">\n${cssBlock}\n</head>\n<body data-article-category="クリーチャー" data-article-appearance="Fallout 76">\n    <div class="container">\n        <aside class="infobox"><h3 style="margin-top:0;text-align:center;">${a.title}</h3><img src="images/note_extracted/${a.slug}/img_main.png" alt="${a.title}">${rows}</aside>\n        <main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="${articleId}" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>${a.title}<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">${a.titleJa}</span></h1>\n            ${a.body}\n<div class="quote-box"><b>感想</b><br><br>${a.kanso}</div>\n${galleryHtml}\n            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">\n                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/${a.wikiSlug}" target="_blank" rel="noopener">${a.title}</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>\n                <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>\n            </div>\n            <div class="comments-section"><h2 class="comments-title">&gt; COMMENTS_</h2><div class="comment-form"><textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力..." oninput="updateCharCount()"></textarea><div class="comment-form-footer"><span class="char-count"><span id="char-count">0</span>/100</span><button class="comment-submit-btn" onclick="submitComment()">SUBMIT &gt;</button></div><div id="comment-msg" class="comment-msg"></div></div><div id="comments-list"></div></div>\n        </main>\n    </div>\n    <div class="lightbox-overlay" id="lightbox" onclick="this.classList.remove('active')"><img id="lightbox-img" src="" alt=""></div>\n    <script>\n        const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);\n        async function toggleLike(btn){const articleId=btn.getAttribute('data-article-id');let isLiked=localStorage.getItem(articleId+'_liked')==='true';btn.disabled=true;if(isLiked){isLiked=false;const{data,error}=await supabaseClient.rpc('decrement_like',{article_id_param:articleId});if(!error){localStorage.setItem(articleId+'_liked',isLiked);updateLikeButton(btn,isLiked,data);}}else{isLiked=true;const{data,error}=await supabaseClient.rpc('increment_like',{article_id_param:articleId});if(!error){localStorage.setItem(articleId+'_liked',isLiked);updateLikeButton(btn,isLiked,data);}}btn.disabled=false;}\n        function updateLikeButton(btn,isLiked,count){const heart=btn.querySelector('.heart');const countSpan=btn.querySelector('.like-count');if(isLiked){btn.classList.add('liked');heart.textContent='♥';}else{btn.classList.remove('liked');heart.textContent='♡';}countSpan.textContent=count;}\n        document.addEventListener('DOMContentLoaded',async()=>{const btn=document.querySelector('.like-button');if(btn){const articleId=btn.getAttribute('data-article-id');const isLiked=localStorage.getItem(articleId+'_liked')==='true';const{data,error}=await supabaseClient.from('likes').select('like_count').eq('article_id',articleId).single();let count=0;if(!error&&data)count=data.like_count;updateLikeButton(btn,isLiked,count);}const lightbox=document.getElementById('lightbox');const lightboxImg=document.getElementById('lightbox-img');document.querySelectorAll('.content img, .infobox img, .gallery-item img').forEach(img=>{img.addEventListener('click',(e)=>{e.stopPropagation();lightboxImg.src=img.src;lightbox.classList.add('active');});});});\n        const _commentArticleId='${articleId}';const _commentArticleName='${a.title.replace(/'/g,"\\'")}';const _commentArticleUrl='${a.slug}.html';\n        const ADMIN_TOKEN_KEY='fallout_admin_token';const ADMIN_PASSWORD='tq7jtq7j';const RATE_LIMIT_KEY='comment_last_posted';const RATE_LIMIT_SEC=60;let _isAdminMode=false;\n        function updateCharCount(){const len=document.getElementById('comment-input').value.length;const el=document.getElementById('char-count');if(el){el.textContent=len;el.style.color=len>90?'#ff6b6b':'var(--accent-color)';}}\n        function relativeTime(s){const d=(Date.now()-new Date(s).getTime())/1000;if(d<60)return'たった今';if(d<3600)return Math.floor(d/60)+'分前';if(d<86400)return Math.floor(d/3600)+'時間前';if(d<86400*7)return Math.floor(d/86400)+'日前';return new Date(s).toLocaleDateString('ja-JP');}\n        function escapeHtml(str){return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}\n        function renderComments(comments){const list=document.getElementById('comments-list');if(!list)return;if(!comments||comments.length===0){list.innerHTML='<div class="comment-empty">まだコメントがありません。最初のコメントを投稿してみましょう！</div>';return;}list.innerHTML=comments.map(c=>\`<div class="comment-item" data-id="\${c.id}"><div class="comment-meta"><span class="comment-time">\${relativeTime(c.created_at)}</span>\${_isAdminMode?\`<button class="comment-delete-btn" onclick="deleteComment('\${c.id}')">&#128465;</button>\`:''}</div><div class="comment-body">\${escapeHtml(c.content)}</div></div>\`).join('');}\n        async function loadComments(){const list=document.getElementById('comments-list');if(!list)return;const{data,error}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_commentArticleId).order('created_at',{ascending:false}).limit(50);if(error){list.innerHTML='<div class="comment-empty">コメントを読み込めませんでした。</div>';return;}renderComments(data||[]);}\n        async function submitComment(){const input=document.getElementById('comment-input');const content=input?input.value.trim():'';if(!content){showCommentMsg('コメントを入力してください。',false);return;}if(content.length>100){showCommentMsg('100文字以内で入力してください。',false);return;}const lastPosted=parseInt(localStorage.getItem(RATE_LIMIT_KEY)||'0');const now=Date.now();if(now-lastPosted<RATE_LIMIT_SEC*1000){showCommentMsg('あと'+Math.ceil((RATE_LIMIT_SEC*1000-(now-lastPosted))/1000)+'秒後に投稿できます。',false);return;}const btn=document.querySelector('.comment-submit-btn');if(btn)btn.disabled=true;const{error}=await supabaseClient.from('comments').insert({article_id:_commentArticleId,article_name:_commentArticleName,article_url:_commentArticleUrl,content:content});if(btn)btn.disabled=false;if(error){showCommentMsg('投稿に失敗しました。',false);return;}localStorage.setItem(RATE_LIMIT_KEY,now.toString());input.value='';updateCharCount();showCommentMsg('コメントを投稿しました！',true);await loadComments();}\n        function showCommentMsg(text,ok){const el=document.getElementById('comment-msg');if(!el)return;el.textContent=text;el.style.color=ok?'var(--accent-color)':'#ff6b6b';setTimeout(()=>{el.textContent='';},3000);}\n        async function deleteComment(commentId){if(!_isAdminMode)return;if(!confirm('このコメントを削除しますか？'))return;const{error}=await supabaseClient.rpc('delete_comment_admin',{comment_id:commentId,admin_token:localStorage.getItem(ADMIN_TOKEN_KEY)||''});if(error){alert('削除失敗: '+error.message);return;}await loadComments();}\n        document.addEventListener('keydown',(e)=>{if(e.ctrlKey&&e.shiftKey&&e.key==='D'){e.preventDefault();if(_isAdminMode){_isAdminMode=false;localStorage.removeItem(ADMIN_TOKEN_KEY);loadComments();alert('管理者モードを終了しました。');return;}const pw=prompt('管理者パスワードを入力してください:');if(!pw)return;if(pw===ADMIN_PASSWORD){_isAdminMode=true;localStorage.setItem(ADMIN_TOKEN_KEY,pw);loadComments();alert('管理者モードに入りました。');}else{alert('パスワードが違います。');}}});\n        document.addEventListener('DOMContentLoaded',()=>{loadComments();});\n    </script>\n    <script src="article-common.js" defer></script>\n</body>\n</html>`;
}

async function main() {
  for (const a of articles) {
    console.log(`\\n📄 生成中: ${a.title}`);
    const imgDir = `F:/Fallout/images/note_extracted/${a.slug}`;
    fs.mkdirSync(imgDir, { recursive: true });
    // メイン画像DL
    await sleep(200);
    const mainUrl = await getImageUrl(a.mainImg);
    if (mainUrl) { await downloadImage(mainUrl, path.join(imgDir, 'img_main.png')); console.log('  ✅ メイン画像'); }
    // ギャラリー画像DL
    for (let i = 0; i < a.galleryImgs.length; i++) {
      await sleep(200);
      const u = await getImageUrl(a.galleryImgs[i]);
      if (u) { await downloadImage(u, path.join(imgDir, `img_gallery_${i+1}.png`)); console.log(`  ✅ ギャラリー ${i+1}`); }
    }
    // HTML生成
    fs.writeFileSync(`F:/Fallout/${a.slug}.html`, generateHtml(a), 'utf8');
    console.log(`  ✅ HTML完了: ${a.slug}.html`);

    // X投稿素材
    const xDir = `F:/Fallout/_X/${a.slug}`;
    fs.mkdirSync(`${xDir}/images`, { recursive: true });
    // メイン画像をX用にコピー
    const mainSrc = path.join(imgDir, 'img_main.png');
    if (fs.existsSync(mainSrc)) { fs.copyFileSync(mainSrc, `${xDir}/images/1.png`); }
    // post.md生成
    const postMd = `#Fallout76

${a.title}（${a.titleJa}）
https://www.fallout-jp.com/${a.slug}.html

${a.body.replace(/<[^>]+>/g, '').replace(/\n\n+/g, '\n\n').trim()}

---

💭 感想

${a.kanso.replace(/<br>/g, '\n').trim()}

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;
    fs.writeFileSync(`${xDir}/post.md`, postMd, 'utf8');
    console.log(`  ✅ X投稿素材: _X/${a.slug}/post.md`);
  }
  console.log('\\n✅ バッチ1（高重要度13件）完了！');
}

main().catch(e => console.error('エラー:', e));
