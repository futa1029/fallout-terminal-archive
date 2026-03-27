// TVシリーズ キャスト記事 バッチ1: メイン＋サポート（10件）
// Wikitextから全文翻訳、全画像DL、X投稿素材作成
const fs = require('fs');
const path = require('path');
const https = require('https');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function downloadImage(url, fp) { return new Promise((resolve, reject) => { fs.mkdirSync(path.dirname(fp), { recursive: true }); const mod = url.startsWith('https') ? https : require('http'); mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => { if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) { downloadImage(res.headers.location, fp).then(resolve).catch(reject); return; } if (res.statusCode !== 200) { resolve(false); return; } const ws = fs.createWriteStream(fp); res.pipe(ws); ws.on('finish', () => { ws.close(); resolve(true); }); ws.on('error', reject); }).on('error', reject); }); }
function getImageUrl(fn) { return new Promise((resolve) => { const url = `https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(fn)}&prop=imageinfo&iiprop=url&format=json`; https.get(url, { headers: { 'User-Agent': 'FalloutLoreArchive/1.0' } }, (res) => { let d = ''; res.on('data', c => d += c); res.on('end', () => { try { const j = JSON.parse(d); const p = Object.values(j.query.pages)[0]; resolve(p.imageinfo?.[0]?.url || null); } catch(e) { resolve(null); } }); }).on('error', () => resolve(null)); }); }

const tmpl = fs.readFileSync('F:/Fallout/mole-miner.html', 'utf8');
const cssBlock = tmpl.substring(tmpl.indexOf('<style>'), tmpl.indexOf('</style>') + '</style>'.length);

// メイン＋サポート10件
const articles = [
  {
    slug: 'maximus-tv', title: 'Maximus', titleJa: 'マキシマス',
    wikiSlug: 'Maximus', mainImg: 'Maximus_TV_series.png',
    actor: 'アーロン・モーテン', appearance: 'Fallout TVシリーズ',
    infoRows: [['俳優','アーロン・モーテン（子役: アミール・カー）'],['所属','ブラザーフッド・オブ・スティール'],['役職','アスピラント → ナイト → 長老騎士'],['登場','シーズン1, 2'],['登場作品','Fallout TVシリーズ']],
    body: `<h2>概要</h2>
<p><b>マキシマス</b>は、Fallout TVシリーズの主人公の一人である。<br>ブラザーフッド・オブ・スティール（B.O.S.）の下級兵士で、組織内での尊敬と地位を渇望している青年。<br>アーロン・モーテンが演じ、子供時代はアミール・カーが演じている。</p>

<h2>経歴</h2>
<h3>幼少期</h3>
<p>マキシマスは幼少期にシャディ・サンズの崩壊を経験した。<br>核爆発の生存者として、廃墟から救出されてブラザーフッドに引き取られた。<br>この経験がナイト（騎士）への強い憧れを生み出した。</p>

<h3>シーズン1</h3>
<p>B.O.S.のアスピラント（見習い）として訓練を受けていたマキシマスは、親友のデインが自傷行為で任務を辞退した後、タイタス騎士のスクワイア（従者）に抜擢される。<br>しかしタイタスはデスクローとの戦闘中に重傷を負い、マキシマスは彼を見殺しにしてパワーアーマーを奪うという重大な選択をする。</p>
<p>偽のナイトとして行動するマキシマスは、ルーシー・マクレーンと出会い、次第に惹かれ合っていく。<br>彼の同行者サディアスとの関係は複雑で、任務の中で互いの信頼と裏切りが交錯する。<br>最終的にルーシーと共にグリフィス天文台でのリー・モルデイヴァーとの対決に参加する。</p>

<h3>シーズン2</h3>
<p>シーズン2では、マキシマスはB.O.S.のニューベガス侵攻に参加する。<br>ニューベガスの支配を巡る政治的駆け引きの中で、彼は自分自身のリーダーシップと信念を見出していく。<br>最終的にB.O.S.内で重要な地位を獲得し、物語の重要人物として成長を遂げる。</p>

<h2>性格</h2>
<p>マキシマスは善良だが野心的な青年。<br>B.O.S.のテクノロジーとパワーアーマーに強い憧れを抱いているが、組織の権威主義的な側面には疑問を感じることもある。<br>ルーシーとの関係を通じて、Vaultの住人と荒野の住人の価値観の違いに直面する。</p>`,
    kanso: `TVシリーズの中で最も成長するキャラクター。<br>シャディ・サンズの崩壊をきっかけにB.O.S.に入り、組織内での地位を求めながらも善良さを失わない複雑な人物像が魅力的です。<br>タイタスを見殺しにしてパワーアーマーを奪うシーンは、Falloutのグレーモラリティを完璧に体現していて衝撃的でした。<br>ルーシーとの関係も微笑ましく、荒野のボーイ・ミーツ・ガールとして応援したくなります。`,
  },
  {
    slug: 'norm-maclean', title: 'Norm MacLean', titleJa: 'ノーム・マクレーン',
    wikiSlug: 'Norm_MacLean', mainImg: 'Norm_maclean.png',
    actor: 'モイセス・アリアス', appearance: 'Fallout TVシリーズ',
    infoRows: [['俳優','モイセス・アリアス'],['居住','Vault 33'],['家族','ルーシー・マクレーン（姉）、ハンク・マクレーン（父）'],['登場','シーズン1, 2'],['登場作品','Fallout TVシリーズ']],
    body: `<h2>概要</h2>
<p><b>ノーム・マクレーン</b>は、Fallout TVシリーズの主人公の一人である。<br>Vault 33の住人で、ルーシーの弟。<br>モイセス・アリアスが演じている。</p>

<h2>経歴</h2>
<h3>シーズン1</h3>
<p>ノームはVault 33で賢く皮肉屋な青年として暮らしている。<br>姉ルーシーが地上に旅立った後、ノームはVault内に残り、ベティ・ピアソンの新監督官就任や、Vault 32の異変に不審を抱く。</p>
<p>調査を進めるうちに、Vault 31、32、33が相互に接続されていることと、Vault 31に隠された衝撃的な秘密を発見する。<br>Vault 31には冷凍保存されたVault-Tec社の管理職たちが眠っており、彼らが3つのVaultを何世代にもわたって密かに支配してきたことを知る。<br>バッド・アスキンスのルンバ型ロボットと対面し、Vaultの真実に直面する。</p>

<h3>シーズン2</h3>
<p>シーズン2では、ノームはVaultの真実と向き合いながら独自の行動を取る。<br>Vault 31の秘密を知った彼は、Vaultシステムそのものの正当性に疑問を投げかける。</p>

<h2>性格</h2>
<p>ノームは姉のルーシーとは対照的に、Vault生活に対して冷めた見方をしている。<br>知的で観察力が鋭く、他の住人が見過ごす矛盾や違和感に気づく。<br>Vault社会の「幸せな表面」の裏にある闇を暴こうとする探偵的な役割を担う。</p>`,
    kanso: `Vaultの中から物語を動かすキャラクター。<br>ルーシーが外の世界で冒険する一方、ノームはVaultの内部で陰謀を解き明かすという二重構造が見事です。<br>Vault 31の冷凍カプセルを発見するシーンのゾッとする演出は、シーズン1のハイライトの一つ。<br>モイセス・アリアスの皮肉っぽい演技が役にぴったりハマっています。`,
  },
  {
    slug: 'the-ghoul', title: 'Cooper Howard / The Ghoul', titleJa: 'クーパー・ハワード / ザ・グール',
    wikiSlug: 'The_Ghoul', mainImg: 'FOTV_The_Ghoul.png',
    actor: 'ウォルトン・ゴギンズ', appearance: 'Fallout TVシリーズ',
    infoRows: [['俳優','ウォルトン・ゴギンズ'],['本名','クーパー・ハワード'],['大戦前の職業','ハリウッド俳優、カウボーイスター'],['大戦後','グール化したバウンティハンター'],['登場','シーズン1, 2'],['登場作品','Fallout TVシリーズ']],
    body: `<h2>概要</h2>
<p><b>ザ・グール</b>、本名<b>クーパー・ハワード</b>は、Fallout TVシリーズの主人公の一人である。<br>大戦前はハリウッドの人気俳優だったが、核戦争によってグール化し、200年以上を荒野で生き延びたバウンティハンター。<br>ウォルトン・ゴギンズが演じている。</p>

<h2>経歴</h2>
<h3>大戦前</h3>
<p>クーパー・ハワードは、大戦前のハリウッドで西部劇映画のスターとして活躍していた。<br>妻のバーブ・ハワードはVault-Tec社の幹部で、クーパーはVault-Tecの広報活動にも協力していた。<br>しかし、次第にVault-Tecの真の目的に疑念を抱き始める。<br>大戦当日、核爆弾がロサンゼルスに落ちた瞬間、クーパーは娘のジェイニーと共に地上にいた。</p>

<h3>大戦後</h3>
<p>核爆発を生き延びたクーパーはグール化した。<br>200年以上の時を経て「ザ・グール」と呼ばれる恐るべきバウンティハンターとなり、荒野で標的を追う日々を送っている。<br>グールとしての身体を維持するために定期的に薬品を摂取する必要があり、これが彼の行動原理の一つとなっている。</p>

<h3>シーズン1</h3>
<p>グールはシギ・ウィルツィヒ博士を追跡する中でルーシーと遭遇する。<br>冷酷だが独特のユーモアセンスを持ち、ルーシーのナイーブさを嘲りながらも、次第に奇妙な絆が生まれていく。<br>最終的にグリフィス天文台でリー・モルデイヴァーとの対決に参加し、ルーシーの父ハンクの真実が明らかになる。</p>

<h3>シーズン2</h3>
<p>シーズン2ではニューベガスを舞台に、グールは過去の因縁と向き合いながら、娘ジェイニーの行方を追い続ける。<br>かつてのハリウッドスターとしての誇りと、グールとしての残酷な現実の間で葛藤する姿が描かれる。</p>

<h2>性格</h2>
<p>皮肉屋で冷酷だが、かつてのクーパー・ハワードの善良さの片鱗が時折見える。<br>200年以上の荒野での経験から、人間の本性について達観した視点を持つ。<br>グール化前の回想シーンでは温かみのある人間性が描かれ、現在の冷酷さとのコントラストが際立つ。</p>`,
    kanso: `ウォルトン・ゴギンズの演技が圧巻。大戦前のチャーミングなカウボーイスターと、大戦後の冷酷なバウンティハンターを同一人物として演じ分ける技量は見事です。<br>「タイム・イズ・ジ・エイペックス・プレデター（時間こそが頂点捕食者）」という台詞は、200年以上を生きたグールの重みが詰まっていて忘れられない名言。<br>回想シーンで娘と過ごすシーンから一転、現在の荒野で指を切り落とすシーンへの切り替わりは演出の妙。`,
  },
  {
    slug: 'betty-pearson', title: 'Betty Pearson', titleJa: 'ベティ・ピアソン',
    wikiSlug: 'Betty_Pearson', mainImg: 'Betty_Pearson_S1.png',
    actor: 'レスリー・ウガムス', appearance: 'Fallout TVシリーズ',
    infoRows: [['俳優','レスリー・ウガムス（若年期: プリンセス・ベイ）'],['居住','Vault 33'],['役職','監督官'],['登場','シーズン1, 2'],['登場作品','Fallout TVシリーズ']],
    body: `<h2>概要</h2>
<p><b>ベティ・ピアソン</b>は、ハンク・マクレーンの拉致後にVault 33の新しい監督官となる人物。<br>レスリー・ウガムスが演じている。</p>

<h2>経歴</h2>
<p>ハンクが拉致された後、ベティはVault 33の監督官に就任する。<br>表面上は穏やかで気さくな老婦人だが、ノーム・マクレーンは彼女の行動に不審な点があることに気づく。<br>ベティはVault 31から送り込まれた管理者の一人であり、3つのVaultを密かに管理するVault-Tecの計画に加担している。</p>

<h2>性格</h2>
<p>一見すると親しみやすい祖母のような存在だが、その裏にはVault-Tecの秘密を守るための冷徹さを持つ。<br>ノームの追及をかわしながら、Vaultの秩序を維持しようとする。</p>`,
    kanso: `レスリー・ウガムスの「優しいおばあちゃん」と「冷酷な管理者」の二面性の演技が光る。<br>ノーム視点で見ると最も不気味なキャラクターの一人で、Vault社会の笑顔の裏にある恐ろしさを体現しています。`,
  },
  {
    slug: 'chet-tv', title: 'Chet', titleJa: 'チェット',
    wikiSlug: 'Chet_(TV_series)', mainImg: 'Chet_S1.png',
    actor: 'デイヴ・レジスター', appearance: 'Fallout TVシリーズ',
    infoRows: [['俳優','デイヴ・レジスター'],['居住','Vault 33'],['関係','ルーシーとノームの従兄弟'],['登場','シーズン1, 2'],['登場作品','Fallout TVシリーズ']],
    body: `<h2>概要</h2>
<p><b>チェット</b>は、Vault 33の住人でルーシーとノームの従兄弟。<br>デイヴ・レジスターが演じている。</p>

<h2>経歴</h2>
<p>チェットはVault 33で穏やかに暮らす青年で、ノームと共にVault内の異変を調査する。<br>臆病だが忠実な性格で、ノームの陰謀論的な調査に巻き込まれながらも最終的には協力する。</p>`,
    kanso: `コミックリリーフ的な存在ながら、Vault住人の「普通の人間」としてのリアリティを提供してくれるキャラクター。<br>ノームとのコンビは軽妙で、暗い展開の中での息抜きになっています。`,
  },
  {
    slug: 'dane-tv', title: 'Dane', titleJa: 'デイン',
    wikiSlug: 'Dane_(TV_series)', mainImg: 'Dane_FOTV.png',
    actor: 'ゼリア・メンデス＝ジョーンズ', appearance: 'Fallout TVシリーズ',
    infoRows: [['俳優','ゼリア・メンデス＝ジョーンズ'],['所属','ブラザーフッド・オブ・スティール'],['関係','マキシマスの親友'],['登場','シーズン1, 2'],['登場作品','Fallout TVシリーズ']],
    body: `<h2>概要</h2>
<p><b>デイン</b>は、ブラザーフッド・オブ・スティールのメンバーで、マキシマスの親友。<br>ゼリア・メンデス＝ジョーンズが演じている。</p>

<h2>経歴</h2>
<p>デインはマキシマスと共にB.O.S.で訓練を受けていた。<br>ナイトのスクワイアに選ばれる予定だったが、自身の足を刺す自傷行為によって任務を辞退。<br>これによりマキシマスが代わりにタイタスのスクワイアに抜擢されることになった。</p>

<h3>シーズン2</h3>
<p>シーズン2ではB.O.S.のニューベガス作戦に参加し、マキシマスとの関係が新たな局面を迎える。</p>`,
    kanso: `自傷行為で任務を辞退するシーンは衝撃的で、B.O.S.の組織内での圧力と恐怖を如実に表現しています。<br>マキシマスとの友情は複雑で、互いに助け合いながらも組織の中で生き残るための駆け引きがある。`,
  },
  {
    slug: 'siggi-wilzig', title: 'Siggi Wilzig', titleJa: 'シギ・ウィルツィヒ',
    wikiSlug: 'Siggi_Wilzig', mainImg: 'Wilzig_S1.png',
    actor: 'マイケル・エマーソン', appearance: 'Fallout TVシリーズ',
    infoRows: [['俳優','マイケル・エマーソン'],['所属','エンクレイヴ（元）'],['職業','科学者'],['同行者','CX404（犬）'],['登場','シーズン1'],['登場作品','Fallout TVシリーズ']],
    body: `<h2>概要</h2>
<p><b>シギ・ウィルツィヒ博士</b>は、エンクレイヴの科学者で、組織から逃亡した人物。<br>マイケル・エマーソンが演じている。</p>

<h2>経歴</h2>
<p>ウィルツィヒはエンクレイヴの研究施設で働いていた科学者で、ある重要なアーティファクトを持ち出して逃亡する。<br>忠実な犬のCX404を連れて荒野を旅し、モルデイヴァーのもとを目指す。<br>しかしB.O.S.とグールの両方から追われることになる。</p>
<p>ルーシーと出会い、自分がたどり着けない場合に備えて、彼女にアーティファクトを託す。<br>物語の序盤で退場するが、その行動がストーリー全体の推進力となる。</p>`,
    kanso: `マイケル・エマーソン（LOSTのベン・ライナス役で有名）の起用が絶妙。<br>短い出番ながら、エンクレイヴの闇とストーリーの核心を繋ぐ重要なキャラクター。<br>犬のCX404との絆が切なく、Fallout世界のドッグミート的存在として愛されています。`,
  },
  {
    slug: 'barb-howard', title: 'Barb Howard', titleJa: 'バーブ・ハワード',
    wikiSlug: 'Barb_Howard', mainImg: 'Barb_Howard.png',
    actor: 'フランシス・ターナー', appearance: 'Fallout TVシリーズ',
    infoRows: [['俳優','フランシス・ターナー'],['職業','Vault-Tec社幹部'],['家族','クーパー・ハワード（夫）、ジェイニー（娘）'],['時代','大戦前'],['登場','シーズン1, 2'],['登場作品','Fallout TVシリーズ']],
    body: `<h2>概要</h2>
<p><b>バーブ・ハワード</b>は、クーパー・ハワードの妻であり、Vault-Tec社の幹部。<br>フランシス・ターナーが演じている。</p>

<h2>経歴</h2>
<p>バーブは大戦前のロサンゼルスでVault-Tec社の上級副社長として働いていた。<br>夫のクーパーはVault-Tecの広報タレントとして協力していたが、バーブがVault-Tecの秘密プロジェクトに深く関与していることは知らなかった。</p>
<p>バーブはVault-Tec、ロブコ、REPCONN、ウエストテック、ビッグMTの各企業が密かに手を組み、核戦争を「計画」していたという衝撃的な陰謀の中心人物の一人。<br>Vaultは単なる避難所ではなく、大戦後の世界を支配するための社会実験装置であることを知っている。</p>`,
    kanso: `Vault-Tecの陰謀の中心にいる人物として、TVシリーズ最大の衝撃を生み出すキャラクター。<br>核戦争が「偶発的な出来事」ではなく「計画されたもの」だったという暴露シーンは、Falloutのロアに対する最大の追加要素でしょう。<br>クーパーとの夫婦関係を通じて、企業の倫理と個人の愛の相克が丁寧に描かれています。`,
  },
  {
    slug: 'thaddeus-tv', title: 'Thaddeus', titleJa: 'サディアス',
    wikiSlug: 'Thaddeus', mainImg: 'Thaddeus_FOTV.png',
    actor: 'ジョニー・ペンバートン', appearance: 'Fallout TVシリーズ',
    infoRows: [['俳優','ジョニー・ペンバートン'],['所属','ブラザーフッド・オブ・スティール'],['関係','マキシマスの同行者'],['登場','シーズン1'],['登場作品','Fallout TVシリーズ']],
    body: `<h2>概要</h2>
<p><b>サディアス</b>は、B.O.S.のメンバーでマキシマスの任務中の同行者。<br>ジョニー・ペンバートンが演じている。</p>

<h2>経歴</h2>
<p>サディアスはマキシマスのスクワイアとして任務に同行する。<br>最初はマキシマスに対して横暴な態度を取るが、二人の立場が逆転した後は従順になる。<br>最終的にはマキシマスの「偽のナイト」としての秘密を知り、複雑な関係に発展する。</p>
<p>ヘビの油売り（スネーク・オイル・セールスマン）から受けた治療によって、皮肉にもグール化の兆候が現れ始めることが示唆される。</p>`,
    kanso: `マキシマスとの関係性の変化が面白いキャラクター。最初はいじめっ子的なポジションから、立場が逆転して従者になる展開は痛快。<br>グール化の兆候が示唆されるラストは、シーズン2への伏線として秀逸でした。`,
  },
  {
    slug: 'bud-askins', title: 'Bud Askins', titleJa: 'バッド・アスキンス',
    wikiSlug: 'Bud_Askins', mainImg: 'BudRoomba.png',
    actor: 'マイケル・エスパー', appearance: 'Fallout TVシリーズ',
    infoRows: [['俳優','マイケル・エスパー'],['職業','Vault-Tec社 バッド・ライト部門責任者'],['現在','ルンバ型ロボット（脳のみ）'],['名言','"時間こそが頂点捕食者だ"'],['登場','シーズン1, 2'],['登場作品','Fallout TVシリーズ']],
    body: `<h2>概要</h2>
<p><b>バッド・アスキンス</b>は、Vault-Tec社の「バッド・ライト」部門の責任者。<br>マイケル・エスパーが演じている。</p>

<h2>経歴</h2>
<h3>大戦前</h3>
<p>バッドはVault-Tec社でVault計画の中核を担った人物。<br>「バッド・ライト」と呼ばれる人材選抜プログラムを設計し、Vault-Tec社の管理職をVault 31に冷凍保存して、大戦後に3つの相互接続Vault（31、32、33）を通じて人類の「最良の遺伝子」を管理する計画を立案した。</p>

<h3>大戦後</h3>
<p>バッド自身は脳だけがルンバ型（お掃除ロボット型）の筐体に移植され、Vault 31で200年以上にわたって計画を管理し続けている。<br>「時間こそが頂点捕食者だ」という彼の台詞は、TVシリーズを象徴する名言となった。</p>`,
    kanso: `「Brain in a Roomba（ルンバの中の脳）」というコンセプトが最高にFalloutらしい。<br>200年以上ルンバの体で這い回りながらVaultを管理してきたという設定は、狂気と執念の極み。<br>「時間こそが頂点捕食者だ」の名言は、このシリーズの根幹テーマを一言で要約しています。`,
  },
];

function generateHtml(a) {
  const articleId = `note_${a.slug.replace(/-/g, '_')}`;
  const rows = a.infoRows.map(r => `<div class="infobox-row"><span class="infobox-label">${r[0]}</span><span>${r[1]}</span></div>`).join('');
  return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8"><title>${a.title} | Overseer Mohi's Terminal</title><link rel="canonical" href="https://www.fallout-jp.com/${a.slug}.html"><meta property="og:type" content="article"><meta property="og:site_name" content="Overseer Mohi's Terminal"><meta property="og:locale" content="ja_JP"><meta property="og:title" content="${a.title} | Overseer Mohi's Terminal"><meta property="og:description" content="${a.titleJa} — ${a.appearance}"><meta property="og:url" content="https://www.fallout-jp.com/${a.slug}.html"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@IwamotoFuta"><script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
${cssBlock}
</head>
<body data-article-category="人物" data-article-appearance="Fallout TVシリーズ">
    <div class="container">
        <aside class="infobox"><h3 style="margin-top:0;text-align:center;">${a.title}</h3><img src="images/note_extracted/${a.slug}/img_main.png" alt="${a.title}">${rows}</aside>
        <main class="content">
            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="${articleId}" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>
            <h1>${a.title}<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">${a.titleJa}</span></h1>
            ${a.body}
<div class="quote-box"><b>感想</b><br><br>${a.kanso}</div>
            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/${a.wikiSlug}" target="_blank" rel="noopener">${a.title}</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
                <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
            </div>
            <div class="comments-section"><h2 class="comments-title">&gt; COMMENTS_</h2><div class="comment-form"><textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力..." oninput="updateCharCount()"></textarea><div class="comment-form-footer"><span class="char-count"><span id="char-count">0</span>/100</span><button class="comment-submit-btn" onclick="submitComment()">SUBMIT &gt;</button></div><div id="comment-msg" class="comment-msg"></div></div><div id="comments-list"></div></div>
        </main>
    </div>
    <div class="lightbox-overlay" id="lightbox" onclick="this.classList.remove('active')"><img id="lightbox-img" src="" alt=""></div>
    <script>
        const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);
        async function toggleLike(btn){const articleId=btn.getAttribute('data-article-id');let isLiked=localStorage.getItem(articleId+'_liked')==='true';btn.disabled=true;if(isLiked){isLiked=false;const{data,error}=await supabaseClient.rpc('decrement_like',{article_id_param:articleId});if(!error){localStorage.setItem(articleId+'_liked',isLiked);updateLikeButton(btn,isLiked,data);}}else{isLiked=true;const{data,error}=await supabaseClient.rpc('increment_like',{article_id_param:articleId});if(!error){localStorage.setItem(articleId+'_liked',isLiked);updateLikeButton(btn,isLiked,data);}}btn.disabled=false;}
        function updateLikeButton(btn,isLiked,count){const heart=btn.querySelector('.heart');const countSpan=btn.querySelector('.like-count');if(isLiked){btn.classList.add('liked');heart.textContent='♥';}else{btn.classList.remove('liked');heart.textContent='♡';}countSpan.textContent=count;}
        document.addEventListener('DOMContentLoaded',async()=>{const btn=document.querySelector('.like-button');if(btn){const articleId=btn.getAttribute('data-article-id');const isLiked=localStorage.getItem(articleId+'_liked')==='true';const{data,error}=await supabaseClient.from('likes').select('like_count').eq('article_id',articleId).single();let count=0;if(!error&&data)count=data.like_count;updateLikeButton(btn,isLiked,count);}const lightbox=document.getElementById('lightbox');const lightboxImg=document.getElementById('lightbox-img');document.querySelectorAll('.content img, .infobox img, .gallery-item img').forEach(img=>{img.addEventListener('click',(e)=>{e.stopPropagation();lightboxImg.src=img.src;lightbox.classList.add('active');});});});
        const _commentArticleId='${articleId}';const _commentArticleName='${a.title.replace(/'/g,"\\'")}';const _commentArticleUrl='${a.slug}.html';
        const ADMIN_TOKEN_KEY='fallout_admin_token';const ADMIN_PASSWORD='tq7jtq7j';const RATE_LIMIT_KEY='comment_last_posted';const RATE_LIMIT_SEC=60;let _isAdminMode=false;
        function updateCharCount(){const len=document.getElementById('comment-input').value.length;const el=document.getElementById('char-count');if(el){el.textContent=len;el.style.color=len>90?'#ff6b6b':'var(--accent-color)';}}
        function relativeTime(s){const d=(Date.now()-new Date(s).getTime())/1000;if(d<60)return'たった今';if(d<3600)return Math.floor(d/60)+'分前';if(d<86400)return Math.floor(d/3600)+'時間前';if(d<86400*7)return Math.floor(d/86400)+'日前';return new Date(s).toLocaleDateString('ja-JP');}
        function escapeHtml(str){return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
        function renderComments(comments){const list=document.getElementById('comments-list');if(!list)return;if(!comments||comments.length===0){list.innerHTML='<div class="comment-empty">まだコメントがありません。最初のコメントを投稿してみましょう！</div>';return;}list.innerHTML=comments.map(c=>\`<div class="comment-item" data-id="\${c.id}"><div class="comment-meta"><span class="comment-time">\${relativeTime(c.created_at)}</span>\${_isAdminMode?\`<button class="comment-delete-btn" onclick="deleteComment('\${c.id}')">&#128465;</button>\`:''}</div><div class="comment-body">\${escapeHtml(c.content)}</div></div>\`).join('');}
        async function loadComments(){const list=document.getElementById('comments-list');if(!list)return;const{data,error}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_commentArticleId).order('created_at',{ascending:false}).limit(50);if(error){list.innerHTML='<div class="comment-empty">コメントを読み込めませんでした。</div>';return;}renderComments(data||[]);}
        async function submitComment(){const input=document.getElementById('comment-input');const content=input?input.value.trim():'';if(!content){showCommentMsg('コメントを入力してください。',false);return;}if(content.length>100){showCommentMsg('100文字以内で入力してください。',false);return;}const lastPosted=parseInt(localStorage.getItem(RATE_LIMIT_KEY)||'0');const now=Date.now();if(now-lastPosted<RATE_LIMIT_SEC*1000){showCommentMsg('あと'+Math.ceil((RATE_LIMIT_SEC*1000-(now-lastPosted))/1000)+'秒後に投稿できます。',false);return;}const btn=document.querySelector('.comment-submit-btn');if(btn)btn.disabled=true;const{error}=await supabaseClient.from('comments').insert({article_id:_commentArticleId,article_name:_commentArticleName,article_url:_commentArticleUrl,content:content});if(btn)btn.disabled=false;if(error){showCommentMsg('投稿に失敗しました。',false);return;}localStorage.setItem(RATE_LIMIT_KEY,now.toString());input.value='';updateCharCount();showCommentMsg('コメントを投稿しました！',true);await loadComments();}
        function showCommentMsg(text,ok){const el=document.getElementById('comment-msg');if(!el)return;el.textContent=text;el.style.color=ok?'var(--accent-color)':'#ff6b6b';setTimeout(()=>{el.textContent='';},3000);}
        async function deleteComment(commentId){if(!_isAdminMode)return;if(!confirm('このコメントを削除しますか？'))return;const{error}=await supabaseClient.rpc('delete_comment_admin',{comment_id:commentId,admin_token:localStorage.getItem(ADMIN_TOKEN_KEY)||''});if(error){alert('削除失敗: '+error.message);return;}await loadComments();}
        document.addEventListener('keydown',(e)=>{if(e.ctrlKey&&e.shiftKey&&e.key==='D'){e.preventDefault();if(_isAdminMode){_isAdminMode=false;localStorage.removeItem(ADMIN_TOKEN_KEY);loadComments();alert('管理者モードを終了しました。');return;}const pw=prompt('管理者パスワードを入力してください:');if(!pw)return;if(pw===ADMIN_PASSWORD){_isAdminMode=true;localStorage.setItem(ADMIN_TOKEN_KEY,pw);loadComments();alert('管理者モードに入りました。');}else{alert('パスワードが違います。');}}});
        document.addEventListener('DOMContentLoaded',()=>{loadComments();});
    </script>
    <script src="article-common.js" defer></script>
</body>
</html>`;
}

async function main() {
  // Wikiデータから正しい画像名を取得
  const wikiData = JSON.parse(fs.readFileSync('F:/Fallout/_tv_cast_wiki_data.json', 'utf8'));

  for (const a of articles) {
    console.log(`\n📄 生成中: ${a.title}`);
    const imgDir = `F:/Fallout/images/note_extracted/${a.slug}`;
    fs.mkdirSync(imgDir, { recursive: true });

    // Wikiデータからinfobox画像名を取得
    const data = wikiData[a.wikiSlug.replace(/_/g, ' ')] || wikiData[a.wikiSlug];
    let imgFile = a.mainImg;
    if (data) {
      const imgMatch = data.wikitext.match(/\|image\s*=\s*([^\n|{}]+)/);
      if (imgMatch) imgFile = imgMatch[1].trim().replace(/ /g, '_');
    }

    await sleep(300);
    const url = await getImageUrl(imgFile);
    if (url) {
      await downloadImage(url, path.join(imgDir, 'img_main.png'));
      console.log(`  ✅ メイン画像: ${imgFile}`);
    } else {
      // フォールバック: 画像リストから最初の適切なもの
      if (data) {
        const candidate = data.images.find(img =>
          !img.includes('Icon_') && !img.includes('Gametitle') &&
          !img.includes('Bugintro') && !img.includes('icon') &&
          !img.includes('Mbox_')
        );
        if (candidate) {
          await sleep(200);
          const url2 = await getImageUrl(candidate);
          if (url2) {
            await downloadImage(url2, path.join(imgDir, 'img_main.png'));
            console.log(`  ✅ フォールバック画像: ${candidate}`);
          }
        }
      }
      if (!fs.existsSync(path.join(imgDir, 'img_main.png'))) {
        console.log(`  ⚠️ 画像なし`);
      }
    }

    // HTML生成
    fs.writeFileSync(`F:/Fallout/${a.slug}.html`, generateHtml(a), 'utf8');
    console.log(`  ✅ HTML: ${a.slug}.html`);

    // X投稿素材
    const xDir = `F:/Fallout/_X/${a.slug}`;
    fs.mkdirSync(`${xDir}/images`, { recursive: true });
    const mainSrc = path.join(imgDir, 'img_main.png');
    if (fs.existsSync(mainSrc)) fs.copyFileSync(mainSrc, `${xDir}/images/1.png`);
    const postMd = `#Fallout76 #FalloutTV\n\n${a.title}（${a.titleJa}）\nhttps://www.fallout-jp.com/${a.slug}.html\n\n${a.body.replace(/<[^>]+>/g, '').replace(/\n\n+/g, '\n\n').trim()}\n\n---\n\n💭 感想\n\n${a.kanso.replace(/<br>/g, '\n').trim()}\n\n---\n\nThis article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.\n`;
    fs.writeFileSync(`${xDir}/post.md`, postMd, 'utf8');
    console.log(`  ✅ X素材: _X/${a.slug}/post.md`);
  }
  console.log('\n✅ バッチ1（メイン＋サポート10件）完了！');
}
main().catch(e => console.error('エラー:', e));
