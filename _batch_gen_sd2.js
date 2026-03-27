// 荒れた境域 Named Locations バッチ生成（後半12件）
const fs = require('fs');
const path = require('path');
const https = require('https');

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    const mod = url.startsWith('https') ? https : require('http');
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadImage(res.headers.location, filepath).then(resolve).catch(reject); return;
      }
      if (res.statusCode !== 200) { resolve(false); return; }
      const ws = fs.createWriteStream(filepath);
      res.pipe(ws);
      ws.on('finish', () => { ws.close(); resolve(true); });
      ws.on('error', reject);
    }).on('error', reject);
  });
}
function getImageUrl(filename) {
  return new Promise((resolve) => {
    const url = `https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => { try { const j = JSON.parse(data); const page = Object.values(j.query.pages)[0]; resolve(page.imageinfo?.[0]?.url || null); } catch(e) { resolve(null); } });
    }).on('error', () => resolve(null));
  });
}
const template = fs.readFileSync('F:\\Fallout\\prospect-hill.html', 'utf8');
const cssBlock = template.substring(template.indexOf('<style>'), template.indexOf('</style>') + '</style>'.length);

const articles = [
  {
    slug: 'mysterious-guidestones', title: 'Mysterious Guidestones', titleJa: 'ミステリアス・ガイドストーン',
    wikiSlug: 'Mysterious_Guidestones', ogDesc: 'ミステリアス・ガイドストーン — 荒れた境域の山頂にある謎の石碑群。',
    mainImg: 'FO76_191020_Mysterious_guidestones.png', mapImg: 'FO76WL_Mysterious_guidestones_map.png',
    galleryImgs: [{ f: 'FO76_Mysterious_guidestones_eastern_face.png', c: '東面' }, { f: 'FO76_Mysterious_guidestone_etchings.png', c: '彫刻の詳細' }],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['最寄り','連邦廃棄場HZ-21'],['登場作品','Fallout 76 (Wastelanders)']],
    body: `<h2>概要</h2><p><b>Mysterious Guidestones</b>は、荒れた境域の連邦廃棄場HZ-21の北東に位置する未マークのロケーションである。</p>
<div class="quote-box" style="border-left:3px solid var(--accent-color);padding:10px;margin:15px 0;font-style:italic;">「ミステリアス・ガイドストーンを見たことがあるかい？なかなか壮大だろう？ある者は、あの世のものだと言うかもしれないね…」— ジ・エミサリー</div>
<h2>背景</h2><p>その未知の性質から、マイケル・ブレイク教授は宇宙人の起源であると推測した。</p>
<h2>レイアウト</h2><p>山の頂上に位置し、中央の直立した石板1枚と周囲の4枚の石板で構成される。中央の石板の上には水平な石が載せられ、外側の石板の両面にはペトログリフが刻まれている。</p>
<h2>舞台裏</h2><ul><li>実在のジョージア・ガイドストーン（1980年建造、2022年に破壊）がモデル。文明崩壊後の再建のための10原則が8言語で刻まれていた石碑である。</li></ul>
<div class="quote-box"><b>感想</b><br><br>ジョージア・ガイドストーンという実在の謎の石碑をFallout世界に取り込んだロケーション。宇宙人説が唱えられているのがFalloutらしい。<br>実物は2022年に爆破され撤去されたので、ある意味ゲーム内でしか見られない遺産になっています。</div>`,
  },
  {
    slug: 'north-mountain-lookout', title: 'North Mountain lookout', titleJa: 'ノース・マウンテン監視塔',
    wikiSlug: 'North_Mountain_lookout', ogDesc: 'ノース・マウンテン監視塔 — ハロウィン装飾で彩られた監視塔。',
    mainImg: 'F76_North_Mountain_Lookout_1.png', mapImg: null,
    galleryImgs: [{ f: 'FO76_Halloween_locs_13.png', c: 'ハロウィン装飾' }],
    infoRows: [['種類','監視塔'],['地域','荒れた境域'],['正式名称','ファイアウォッチ・タワー #5'],['オーナー','国立公園局（戦前）'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>North Mountain lookout</b>は、荒れた境域のサニートップ・スキー場ベースロッジの東に位置する監視塔である。戦前の正式名称は「ファイアウォッチ・タワー #5」。</p>
<h2>背景</h2><p>以前はハロウィンの祝い事を極端にやり過ぎた2人の職員が勤務していた。塔を過度に飾り付け、パーティーを開き、政府の家具をバルコニーから投げ落とすなどの行為を行った。度重なる警告を無視したため、雇用主である国立公園局から解雇の脅しを受けた。</p>
<h2>レイアウト</h2><p>塔の下にはロックされた爆発物クレートがある。階段にはフリッジ、ツールボックスなどが散乱。展望室はハロウィン装飾で覆われ、ジャック・オー・ランタン、紙の吊りコウモリ、ポスターが飾られている。</p>
<h2>注目アイテム</h2><ul><li><b>部門通知</b> × 3 — メモ、展望室のテーブル上</li><li><b>ハロウィン衣装（魔女の帽子）</b> — テーブルの上</li><li><b>ハロウィン衣装（スケルトン）</b> — 床の上</li></ul>
<div class="quote-box"><b>感想</b><br><br>ハロウィンの飾り付けをやり過ぎて解雇宣告を受けた職員の物語が楽しい。政府の家具をバルコニーから投げ捨てるとか、どこまで本気だったのか…。<br>フレディ・フィアーズのポスターが窓に貼ってあるなど、細部まで凝っています。</div>`,
  },
  {
    slug: 'point-repose', title: 'Point Repose', titleJa: 'ポイント・リポーズ',
    wikiSlug: 'Point_Repose', ogDesc: 'ポイント・リポーズ — レヴナンツのフェラル化したグールが安らぐ場所。',
    mainImg: 'FO76_PTS_Point_Repose_01.png', mapImg: 'Point_Repose_map.png',
    galleryImgs: [{ f: 'FO76_PTS_Point_Repose_02.png', c: 'ラスト・ドアの看板' }, { f: 'FO76_PTS_Point_Repose_09.png', c: 'バーティバードヤード' }],
    infoRows: [['種類','墓地'],['地域','荒れた境域'],['勢力','レヴナンツ'],['クリーチャー','フェラル・グール'],['ロボット','プロテクトロン'],['登場作品','Fallout 76 (Ghoul Within)']],
    body: `<h2>概要</h2><p><b>Point Repose</b>は、荒れた境域のラディアント・ヒルズ北方に位置するロケーションである。</p>
<h2>背景</h2><p>元バーティバードの着陸・整備場だった。レヴナンツが改名し、フェラル化が進むグールが自らを隔離するための静かな場所として整備した。「最後の扉（ラスト・ドア）」をくぐり、鍵を投げ返して自らを封じるのが、ここでの最期の儀式である。</p>
<p>科学的にも興味深い場所で、崩壊するフェラル・グールからのCO2による酸性土壌のため、他地域の植物が異常成長している。</p>
<h2>注目アイテム</h2><ul><li><b>ラスト・ドアの鍵</b> — 樽の上</li><li><b>ラスト・ドア安全規則</b> — メモ、ラスト・ドアの外壁</li><li><b>親愛なるバーバラ</b> — メモ、バーティバードヤード内</li><li><b>さよならジャスティン</b> — メモ、キャンプファイヤー横のベンチ</li><li><b>ポイント・リポーズへようこそ</b> — メモ、ラスト・ドアの鍵の隣</li></ul>
<h2>メモ</h2><ul><li>グールプレイヤーがフェラルメーターを完全に消耗した状態で訪れると、ラスト・ドアの向こうのフェラル・グールが友好的になり攻撃してこない。</li></ul>
<div class="quote-box"><b>感想</b><br><br>Fallout 76で最も感動的なロケーションの一つ。フェラル化する自分を他者から隔離するために「最後の扉」を自ら閉じるという設定が胸に迫ります。<br>グールプレイヤーだとフェラルが攻撃してこないという仕様も、世界観を深める素晴らしい特典です。</div>`,
  },
  {
    slug: 'radiant-hills', title: 'Radiant Hills', titleJa: 'ラディアント・ヒルズ',
    wikiSlug: 'Radiant_Hills', ogDesc: 'ラディアント・ヒルズ — レヴナンツの本拠地であるミサイルサイロ跡。',
    mainImg: 'FO76_PTS_Radiant_Hills_07.png', mapImg: 'Radiant_Hills_map.png',
    galleryImgs: [{ f: 'FO76_PTS_Radiant_Hills_08.png', c: '入り口' }, { f: 'FO76_PTS_Radiant_Hills_01.png', c: 'リアクター' }],
    infoRows: [['種類','軍事施設'],['地域','荒れた境域'],['勢力','レヴナンツ'],['リーダー','マドックス・マレン、ケヴァン・アシュトン'],['関連クエスト','リープ・オブ・フェイス、フレッシュ・ペア・オブ・ジーンズ'],['登場作品','Fallout 76 (Ghoul Within)']],
    body: `<h2>概要</h2><p><b>Radiant Hills</b>は、荒れた境域の北部に位置するレヴナンツの本拠地である。不活性なミサイルサイロの上と内部に建設された集落。</p>
<h2>背景</h2><p>大戦前は核ミサイルサイロで、核弾頭が発射に失敗して放射能を漏洩。グールにとっては理想的な居住地となった。パーセニア・ブランケンシップが放射能の中で独自にグール化の研究を進め、レヴナンツが入植して本拠地とした。</p>
<h2>レイアウト</h2><p>外部は監視塔、バリケード、作業台、放射能汚染された庭園で構成。内部はエレベーターでサイロに降り、医療室、共同エリア（バー、食堂、ポーカーテーブル）、リアクター周辺の居住区がある。ヒルサイド・ケイバーンにも接続。</p>
<h2>住人</h2><ul><li>マドックス・マレン（共同創設者・リーダー）</li><li>ケヴァン・アシュトン（共同創設者・戦闘訓練担当）</li><li>パーセニア・ブランケンシップ（医師・科学者）</li><li>アーニー・ナバロ（庭師）</li><li>レギュラー・デビー（協力者）</li><li>ジェイ・ヴォー（スタイリスト）</li></ul>
<div class="quote-box"><b>感想</b><br><br>Ghoul Withinアップデートの目玉ロケーション。グールたちが廃棄されたミサイルサイロの中に文明を築いている姿に、Falloutシリーズの「再建」というテーマが詰まっています。<br>人間プレイヤーは外部しか探索できず、内部はグールプレイヤー専用という設計が大胆です。</div>`,
  },
  {
    slug: 'relay-tower-dp-b5-21', title: 'Relay tower DP-B5-21', titleJa: 'リレータワー DP-B5-21',
    wikiSlug: 'Relay_tower_DP-B5-21', ogDesc: 'リレータワー DP-B5-21 — 荒れた境域の無線中継塔。',
    mainImg: 'FO76_Relay_Tower_DP-B5-21.png', mapImg: 'Relay_Tower_DP-B5-21_map.png',
    galleryImgs: [],
    infoRows: [['種類','無線中継塔'],['地域','荒れた境域'],['クリーチャー','スコーチド'],['ターミナル','緊急管理システム中継ターミナル'],['関連クエスト','政府エアドロップ要請、オールウェイズ・ヴィジラント'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Relay tower DP-B5-21</b>は、荒れた境域のアンキャニー・ケイバーンの直北に位置するリレータワーである。</p>
<h2>レイアウト</h2><p>標準的な無線中継塔で、遠くにサマーズビル湖が見える。フェンスと壁で囲まれ、旧式のジープが路上に駐車されている。レーザータレットが出入り口を守る。</p>
<p>建物内部には政府物資要請ホロテープを読み込めるシステム中継ターミナルがある。折り畳みベッドとロッカーが北東壁沿いに並び、弾薬箱と応急処置キットもある。</p>
<div class="quote-box"><b>感想</b><br><br>他のリレータワー同様シンプルな構造ですが、サマーズビル湖を見渡す景色が印象的。政府エアドロップを呼べる実用的なポイントでもあります。</div>`,
  },
  {
    slug: 'scenic-overlook', title: 'Scenic overlook', titleJa: 'シーニック展望台',
    wikiSlug: 'Scenic_overlook', ogDesc: 'シーニック展望台 — 森林地帯とアッシュヒープを見渡す展望ポイント。',
    mainImg: 'F76_Scenic_Overlook.png', mapImg: 'Scenic_Overlook_map.png',
    galleryImgs: [],
    infoRows: [['種類','展望台'],['地域','荒れた境域'],['クリーチャー','モングレル'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Scenic overlook</b>は、荒れた境域の連邦廃棄場HZ-21の北に位置する展望スポットである。</p>
<h2>レイアウト</h2><p>崖の上に位置するこの展望台からは、森林地帯とアッシュヒープの絶景が一望できる。ただし戦利品は乏しい。</p>
<p>左端の仮設トイレには謎のボタンがあり、サイト・チャーリーの緊急出口に接続されている。近くの北東方向にはセトラーズが住む3つのキャビン、さらにハロウィン装飾された廃屋がある。</p>
<div class="quote-box"><b>感想</b><br><br>仮設トイレの中の謎のボタンがサイト・チャーリーの緊急出口に繋がっているという、Falloutらしいシュールな仕掛けが最高です。<br>景色は本当に美しく、写真撮影スポットとしても人気です。</div>`,
  },
  {
    slug: 'sylvie-and-sons-logging-camp', title: 'Sylvie & Sons logging camp', titleJa: 'シルヴィ＆サンズ伐採キャンプ',
    wikiSlug: 'Sylvie_%26_Sons_logging_camp', ogDesc: 'シルヴィ＆サンズ伐採キャンプ — 荒れた境域の旧伐採場。',
    mainImg: 'FO76_Sylvie_%26_Sons_logging_camp.png', mapImg: 'Sylvie_%26_Sons_Logging_Camp_map.png',
    galleryImgs: [],
    infoRows: [['種類','小規模集落'],['地域','荒れた境域'],['クリーチャー','ブロートフライ、ブラッドバグ、モールラット、ラッドラット'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Sylvie & Sons logging camp</b>は、荒れた境域に位置する旧伐採キャンプである。</p>
<h2>背景</h2><p>地元の家族経営企業「シルヴィ＆サンズ」が運営していた山中の小さな伐採キャンプ。</p>
<h2>レイアウト</h2><p>3つの大型テントと多数の木材の山で構成。伐採工たちの骸骨がヘルメットを付けたまま横たわっている。北側テントにはベッド2台と応急処置箱。南東テントにはベッド4台とフットロッカー。南テントにはラジオと蓄音機。</p>
<h2>注目アイテム</h2><ul><li><b>Vault-Tecボブルヘッド</b>（ランダム）× 2</li><li><b>雑誌</b>（ランダム）× 2</li><li>25以上の木材ノード — 木のスクラップを大量収集可能</li></ul>
<div class="quote-box"><b>感想</b><br><br>木材ファーミングの聖地として知られる場所。25以上の木材ノードがあるので、CAMP建築の資材集めにここを周回するプレイヤーは多いはず。<br>ヘルメット姿の骸骨たちが、最後の作業日の姿のまま残っているのが物悲しいです。</div>`,
  },
  {
    slug: 'the-bounty', title: 'The Bounty', titleJa: 'ザ・バウンティ',
    wikiSlug: 'The_Bounty', ogDesc: 'ザ・バウンティ — ブラッドイーグルの崖上キャンプ。',
    mainImg: 'FO76WL_The_Bounty_02.png', mapImg: 'The_Bounty_map.png',
    galleryImgs: [{ f: 'FO76WL_The_Bounty_03.png', c: '「歩け板（プランク）」' }],
    infoRows: [['種類','レイダー拠点'],['地域','荒れた境域'],['勢力','ブラッドイーグル'],['登場作品','Fallout 76 (Wastelanders)']],
    body: `<h2>概要</h2><p><b>The Bounty</b>は、荒れた境域のフィッシャーサイト・アルファの北東、エロイーズ湖を見下ろす位置にあるロケーションである。</p>
<h2>背景</h2><p>元々は2人の居住者がボードゲームを楽しんでいた場所。文盲にもかかわらず常勝していた住人に嫉妬したもう一方が殺害を試み、銃撃戦の末に相討ちとなった。2103年にブラッドイーグルが占拠し要塞化。ボードゲームで階級を決める独自のランキングシステムを採用し、不正を働いた者は崖から「板を歩かされる」。</p>
<h2>注目アイテム</h2><ul><li><b>ブラッドイーグル階級昇進規則</b> — ホロテープ、南東の小屋の2階</li><li><b>Don't Be Board Games全5種</b> — ピクニックテーブルのある小屋</li></ul>
<div class="quote-box"><b>感想</b><br><br>ボードゲームで出世を決めるブラッドイーグル、不正をしたら崖から板を歩かされる——海賊の慣習をレイダーキャンプに持ち込んだユニークな場所。<br>元の住人の相討ちエピソードも業深くて良い。</div>`,
  },
  {
    slug: 'the-bullengrube', title: 'The Bullengrube', titleJa: 'ザ・ブレングルーベ',
    wikiSlug: 'The_Bullengrube', ogDesc: 'ザ・ブレングルーベ — 荒れた境域の美しい湖と滝、水中洞窟。',
    mainImg: 'FO76_PTS_The_Bullengrube_4.png', mapImg: 'The_Bullengrube_map.png',
    galleryImgs: [{ f: 'FO76_PTS_The_Bullengrube_2.png', c: '滝' }, { f: 'FO76_PTS_The_Bullengrube_6.png', c: '水中洞窟' }],
    infoRows: [['種類','湖'],['地域','荒れた境域'],['登場作品','Fallout 76 (Ghoul Within)']],
    body: `<h2>概要</h2><p><b>The Bullengrube</b>（別名ブレングルーベ・ホール）は、荒れた境域のラディアント・ヒルズ近くに位置するロケーションである。</p>
<h2>背景</h2><p>大きな湖、滝、北方へ続く水路で構成される自然地形。上流の池にはバーティバードが墜落している。1950年代に宝が隠されたという伝説があり、ウェイストランダーのリロイが祖父の話を頼りに水中洞窟に辿り着いたが、息が持たずに帰還できず命を落とした。</p>
<h2>レイアウト</h2><p>メインの湖は非常に深い。滝の横の岩場の下を潜ると水中洞窟に到達でき、リロイの骸骨と宝箱（スチーマートランク）、中国装飾花瓶、金のフォークなどの高価なジャンクがある。</p>
<h2>注目アイテム</h2><ul><li><b>馬鹿だった他の誰かへ</b> — メモ、水中洞窟の骸骨の横</li><li><b>叫び</b> — メモ、西の未マーク殺人現場</li></ul>
<div class="quote-box"><b>感想</b><br><br>絵画のように美しい滝と湖、そしてその下に隠された水中洞窟の宝——冒険心をくすぐるロケーションです。<br>リロイの「戻れなかった」という結末が切ない。西にある殺人現場の不気味さとのコントラストも印象的。</div>`,
  },
  {
    slug: 'thomas-farm', title: 'Thomas farm', titleJa: 'トーマス農場',
    wikiSlug: 'Thomas_farm', ogDesc: 'トーマス農場 — 愛犬の癌を治そうとした農夫の悲劇の農場。',
    mainImg: 'FO76_Thomas_farm.png', mapImg: 'Dent_%26_Sons_Construction_map.png',
    galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['最寄り','デント＆サンズ建設'],['オーナー','ビル・トーマス（元）'],['クリーチャー','ラッドスタグ'],['ターミナル','トーマス氏のターミナル'],['関連クエスト','未解決: 善意の行方'],['登場作品','Fallout 76 (Wild Appalachia)']],
    body: `<h2>概要</h2><p><b>Thomas farm</b>は、荒れた境域に位置する未マークロケーションである。</p>
<h2>背景</h2><p>大戦前、ビル・トーマスの農場だった。愛犬ウィンストンが大細胞型リンパ腫と診断され、Vault-Tec大学で得た医学知識を使って癌の治療法を模索。しかし薬剤を噴霧器に入れた際に化学物質が周囲に散布され、近くの鹿を白色に変異させてしまった。</p>
<h2>レイアウト</h2><p>タト、ブラックベリー、コーンの畑がある。大きな納屋と北の農家が主要な建物。納屋にはトーマス氏のターミナル、元素周期表のポスター、「治療法#3」の入った光る瓶がある。</p>
<h2>注目アイテム</h2><ul><li><b>化学検査キット</b> — クエストアイテム、農家のキッチンカウンター</li><li><b>移転通知</b> — メモ、農家の玄関ドアフレーム</li><li><b>獣医診断書</b> — メモ、農家のコーヒーテーブル</li></ul>
<div class="quote-box"><b>感想</b><br><br>愛犬の癌を治そうとして鹿を変異させてしまったというトーマス氏の物語が切ない。善意から始まった行為が予期せぬ結果を生む——Falloutの定番テーマです。<br>白い変異ラッドスタグを見かけたら、この農場の物語を思い出してください。</div>`,
  },
  {
    slug: 'toxic-larrys-meat-n-go', title: "Toxic Larry's Meat 'n Go", titleJa: "トキシック・ラリーのミート・アンド・ゴー",
    wikiSlug: "Toxic_Larry%27s_Meat_%27n_Go", ogDesc: "トキシック・ラリーの精肉店 — 腐った肉に惹かれたスナリーガスターの巣窟。",
    mainImg: 'FO76_ToxicLarrysMeetnGoExt_09.jpg', mapImg: "Toxic_Larry's_Meat_n_Go_map.png",
    galleryImgs: [{ f: 'F76_Toxic_Larry%27s.png', c: '夕暮れの外観' }],
    infoRows: [['種類','小屋'],['地域','荒れた境域'],['オーナー','トキシック・ラリー（元）'],['クリーチャー','スナリーガスター × 3'],['関連クエスト','パーフェクト・ゲッタウェイ'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Toxic Larry's Meat 'n Go</b>は、荒れた境域の辺境に位置する精肉店跡である。</p>
<h2>背景</h2><p>大戦前からトキシック・ラリーという野性的な山男が経営していたエキゾチックな肉の小屋。戦後、腐った肉の匂いに惹かれたスナリーガスターが常に3体出現する場所となった。</p>
<h2>レイアウト</h2><p>マイア方面を見渡す崖際の木造小屋。入り口にはラッドスタグの吊り死体。1階には調理台、猫肉やモールラット肉。2階にはベッド、スチーマートランク、モスマンのポスター、レベル2金庫。屋上にも調理台がある。東にはトイレ小屋があり、その下にレベル3金庫が隠されている。</p>
<h2>注目アイテム</h2><ul><li><b>C.H.マンスリー10月号</b> — メモ、小屋下の丘のキャンプサイト</li><li><b>シンディの日記</b>、<b>デートナイト</b> — パーフェクト・ゲッタウェイ関連</li><li><b>新しい肉</b> — ホロテープ、2階</li><li><b>Vault-Tecボブルヘッド</b>（ランダム）× 2</li></ul>
<div class="quote-box"><b>感想</b><br><br>スナリーガスター3体が確定出現するため、デイリーチャレンジ消化や酸の収集に通うプレイヤーの定番スポット。<br>ピンクのドレスを着たマネキンが2階にいるのは、ラリーの人となりを想像させて不気味さを加えています。</div>`,
  },
  {
    slug: 'wild-wolf-homestead', title: 'Wild Wolf homestead', titleJa: 'ワイルドウルフ農場',
    wikiSlug: 'Wild_Wolf_homestead', ogDesc: 'ワイルドウルフ農場 — 荒れた境域とアッシュヒープの境界にある農場跡。',
    mainImg: 'FO76_Wild_Wolf_homestead_01.png', mapImg: 'Wild_Wolf_homestead_map.png',
    galleryImgs: [{ f: 'FO76_Wild_Wolf_homestead_02.png', c: 'マットフルーツの温室' }],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['最寄り','ホーンライト・エステート'],['クリーチャー','ミュータントハウンド、ラッドスタグ、スーパーミュータント'],['関連クエスト','ザ・メッセンジャー'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Wild Wolf homestead</b>は、荒れた境域のホーンライト・エステートの南、ガラハン鉱業本社の東に位置する未マークロケーションである。</p>
<h2>レイアウト</h2><p>ルート93号線沿いの、荒れた境域とアッシュヒープの境界にある農場。アクセス不可の灰色の家、黄色のガレージ、マットフルーツの温室で構成。温室内で3本のマットフルーツとカボチャ2個を収穫できる。スカベンジャーが薪割りをしていることもある。</p>
<p>東に風車、南にトレーラーなしのセミトレーラーがある。ラッドスタグが西の野原に生息。</p>
<h2>メモ</h2><ul><li>公式ガイドブックではアッシュヒープに分類されているが、ゲーム内では荒れた境域にカウントされている。</li></ul>
<div class="quote-box"><b>感想</b><br><br>地域の境目にひっそりと佇む農場。マットフルーツを3本も収穫できる温室が嬉しい実用的スポット。<br>メッセンジャーイベントの終点になることがあり、スーパーミュータントとスカベンジャーが殴り合っている光景に遭遇することも。</div>`,
  },
];

// generateHtmlとmainはsd1と同一
function generateHtml(a) {
  const articleId = `note_${a.slug.replace(/-/g, '_')}`;
  const galleryHtml = a.galleryImgs.length > 0 ? `\n<div class="gallery-section">\n<h2>ギャラリー</h2>\n<div class="gallery-grid">\n${a.galleryImgs.map((g, i) => `<div class="gallery-item"><img src="images/note_extracted/${a.slug}/img_gallery_${i+1}${path.extname(g.f)}" alt="${g.c}"><div class="caption">${g.c}</div></div>`).join('\n')}\n</div>\n</div>` : '';
  const rows = a.infoRows.map(r => `<div class="infobox-row"><span class="infobox-label">${r[0]}</span><span>${r[1]}</span></div>`).join('');
  const mapHtml = a.mapImg ? `<img src="images/note_extracted/${a.slug}/img_map_marker.png" alt="マップ上の位置" style="width:100%;margin-top:5px;"><div style="text-align:center;font-style:italic;color:#888;font-size:0.8em;margin-bottom:10px;">マップ上の位置</div>` : '';
  return `<!DOCTYPE html>\n<html lang="ja">\n<head>\n    <meta charset="UTF-8"><title>${a.title} | Overseer Mohi's Terminal</title><link rel="canonical" href="https://www.fallout-jp.com/${a.slug}.html"><meta property="og:type" content="article"><meta property="og:site_name" content="Overseer Mohi's Terminal"><meta property="og:locale" content="ja_JP"><meta property="og:title" content="${a.title} | Overseer Mohi's Terminal"><meta property="og:description" content="${a.ogDesc}"><meta property="og:url" content="https://www.fallout-jp.com/${a.slug}.html"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@IwamotoFuta"><script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">\n${cssBlock}\n</head>\n<body data-article-category="場所" data-article-appearance="Fallout 76">\n    <div class="container">\n        <aside class="infobox"><h3 style="margin-top:0;text-align:center;">${a.title}</h3><img src="images/note_extracted/${a.slug}/img_main.png" alt="${a.title}">${mapHtml}${rows}</aside>\n        <main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="${articleId}" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>${a.title}<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">${a.titleJa}</span></h1>\n            ${a.body}\n${galleryHtml}\n            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">\n                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/${a.wikiSlug}" target="_blank" rel="noopener">${a.title}</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>\n                <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>\n            </div>\n            <div class="comments-section"><h2 class="comments-title">&gt; COMMENTS_</h2><div class="comment-form"><textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力..." oninput="updateCharCount()"></textarea><div class="comment-form-footer"><span class="char-count"><span id="char-count">0</span>/100</span><button class="comment-submit-btn" onclick="submitComment()">SUBMIT &gt;</button></div><div id="comment-msg" class="comment-msg"></div></div><div id="comments-list"></div></div>\n        </main>\n    </div>\n    <div class="lightbox-overlay" id="lightbox" onclick="this.classList.remove('active')"><img id="lightbox-img" src="" alt=""></div>\n    <script>\n        const supabaseUrl = 'https://qkdjufvdeisnunismgaw.supabase.co';\n        const supabaseKey = 'sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';\n        const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);\n        async function toggleLike(btn) { const articleId = btn.getAttribute('data-article-id'); let isLiked = localStorage.getItem(articleId + '_liked') === 'true'; btn.disabled = true; if (isLiked) { isLiked = false; const { data, error } = await supabaseClient.rpc('decrement_like', { article_id_param: articleId }); if (!error) { localStorage.setItem(articleId + '_liked', isLiked); updateLikeButton(btn, isLiked, data); } } else { isLiked = true; const { data, error } = await supabaseClient.rpc('increment_like', { article_id_param: articleId }); if (!error) { localStorage.setItem(articleId + '_liked', isLiked); updateLikeButton(btn, isLiked, data); } } btn.disabled = false; }\n        function updateLikeButton(btn, isLiked, count) { const heart = btn.querySelector('.heart'); const countSpan = btn.querySelector('.like-count'); if (isLiked) { btn.classList.add('liked'); heart.textContent = '♥'; } else { btn.classList.remove('liked'); heart.textContent = '♡'; } countSpan.textContent = count; }\n        document.addEventListener('DOMContentLoaded', async () => { const btn = document.querySelector('.like-button'); if (btn) { const articleId = btn.getAttribute('data-article-id'); const isLiked = localStorage.getItem(articleId + '_liked') === 'true'; const { data, error } = await supabaseClient.from('likes').select('like_count').eq('article_id', articleId).single(); let count = 0; if (!error && data) count = data.like_count; updateLikeButton(btn, isLiked, count); } const lightbox = document.getElementById('lightbox'); const lightboxImg = document.getElementById('lightbox-img'); const images = document.querySelectorAll('.content img, .infobox img, .gallery-item img'); images.forEach(img => { img.addEventListener('click', (e) => { e.stopPropagation(); lightboxImg.src = img.src; lightbox.classList.add('active'); }); }); });\n        const _commentArticleId = '${articleId}'; const _commentArticleName = '${a.title.replace(/'/g, "\\'")}'; const _commentArticleUrl = '${a.slug}.html';\n        const ADMIN_TOKEN_KEY = 'fallout_admin_token'; const ADMIN_PASSWORD = 'tq7jtq7j'; const RATE_LIMIT_KEY = 'comment_last_posted'; const RATE_LIMIT_SEC = 60; let _isAdminMode = false;\n        function updateCharCount() { const len = document.getElementById('comment-input').value.length; const el = document.getElementById('char-count'); if (el) { el.textContent = len; el.style.color = len > 90 ? '#ff6b6b' : 'var(--accent-color)'; } }\n        function relativeTime(s) { const d = (Date.now() - new Date(s).getTime()) / 1000; if (d < 60) return 'たった今'; if (d < 3600) return Math.floor(d / 60) + '分前'; if (d < 86400) return Math.floor(d / 3600) + '時間前'; if (d < 86400 * 7) return Math.floor(d / 86400) + '日前'; return new Date(s).toLocaleDateString('ja-JP'); }\n        function escapeHtml(str) { return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }\n        function renderComments(comments) { const list = document.getElementById('comments-list'); if (!list) return; if (!comments || comments.length === 0) { list.innerHTML = '<div class="comment-empty">まだコメントがありません。最初のコメントを投稿してみましょう！</div>'; return; } list.innerHTML = comments.map(c => \`<div class="comment-item" data-id="\${c.id}"><div class="comment-meta"><span class="comment-time">\${relativeTime(c.created_at)}</span>\${_isAdminMode ? \`<button class="comment-delete-btn" onclick="deleteComment('\${c.id}')">&#128465;</button>\` : ''}</div><div class="comment-body">\${escapeHtml(c.content)}</div></div>\`).join(''); }\n        async function loadComments() { const list = document.getElementById('comments-list'); if (!list) return; const { data, error } = await supabaseClient.from('comments').select('id,content,created_at').eq('article_id', _commentArticleId).order('created_at', { ascending: false }).limit(50); if (error) { list.innerHTML = '<div class="comment-empty">コメントを読み込めませんでした。</div>'; return; } renderComments(data || []); }\n        async function submitComment() { const input = document.getElementById('comment-input'); const content = input ? input.value.trim() : ''; if (!content) { showCommentMsg('コメントを入力してください。', false); return; } if (content.length > 100) { showCommentMsg('100文字以内で入力してください。', false); return; } const lastPosted = parseInt(localStorage.getItem(RATE_LIMIT_KEY) || '0'); const now = Date.now(); if (now - lastPosted < RATE_LIMIT_SEC * 1000) { showCommentMsg('あと' + Math.ceil((RATE_LIMIT_SEC * 1000 - (now - lastPosted)) / 1000) + '秒後に投稿できます。', false); return; } const btn = document.querySelector('.comment-submit-btn'); if (btn) btn.disabled = true; const { error } = await supabaseClient.from('comments').insert({ article_id: _commentArticleId, article_name: _commentArticleName, article_url: _commentArticleUrl, content: content }); if (btn) btn.disabled = false; if (error) { showCommentMsg('投稿に失敗しました。', false); return; } localStorage.setItem(RATE_LIMIT_KEY, now.toString()); input.value = ''; updateCharCount(); showCommentMsg('コメントを投稿しました！', true); await loadComments(); }\n        function showCommentMsg(text, ok) { const el = document.getElementById('comment-msg'); if (!el) return; el.textContent = text; el.style.color = ok ? 'var(--accent-color)' : '#ff6b6b'; setTimeout(() => { el.textContent = ''; }, 3000); }\n        async function deleteComment(commentId) { if (!_isAdminMode) return; if (!confirm('このコメントを削除しますか？')) return; const { error } = await supabaseClient.rpc('delete_comment_admin', { comment_id: commentId, admin_token: localStorage.getItem(ADMIN_TOKEN_KEY) || '' }); if (error) { alert('削除失敗: ' + error.message); return; } await loadComments(); }\n        document.addEventListener('keydown', (e) => { if (e.ctrlKey && e.shiftKey && e.key === 'D') { e.preventDefault(); if (_isAdminMode) { _isAdminMode = false; localStorage.removeItem(ADMIN_TOKEN_KEY); loadComments(); alert('管理者モードを終了しました。'); return; } const pw = prompt('管理者パスワードを入力してください:'); if (!pw) return; if (pw === ADMIN_PASSWORD) { _isAdminMode = true; localStorage.setItem(ADMIN_TOKEN_KEY, pw); loadComments(); alert('管理者モードに入りました。'); } else { alert('パスワードが違います。'); } } });\n        document.addEventListener('DOMContentLoaded', () => { loadComments(); });\n    </script>\n    <script src="article-common.js" defer></script>\n</body>\n</html>`;
}

async function main() {
  for (const a of articles) {
    console.log(`\n📄 生成中: ${a.title}`);
    const imgDir = `F:\\Fallout\\images\\note_extracted\\${a.slug}`;
    fs.mkdirSync(imgDir, { recursive: true });
    const mainUrl = await getImageUrl(a.mainImg);
    if (mainUrl) {
      await downloadImage(mainUrl, path.join(imgDir, `img_main${path.extname(a.mainImg)}`));
      const ext = path.extname(a.mainImg);
      if (ext !== '.png') { const s = path.join(imgDir, `img_main${ext}`); const d = path.join(imgDir, 'img_main.png'); if (fs.existsSync(s)) fs.renameSync(s, d); }
      console.log(`  ✅ メイン画像`);
    }
    if (a.mapImg) { const u = await getImageUrl(a.mapImg); if (u) { await downloadImage(u, path.join(imgDir, 'img_map_marker.png')); console.log(`  ✅ マップ画像`); } }
    for (let i = 0; i < a.galleryImgs.length; i++) { const u = await getImageUrl(a.galleryImgs[i].f); if (u) { await downloadImage(u, path.join(imgDir, `img_gallery_${i+1}${path.extname(a.galleryImgs[i].f)}`)); console.log(`  ✅ ギャラリー ${i+1}`); } }
    fs.writeFileSync(`F:\\Fallout\\${a.slug}.html`, generateHtml(a), 'utf8');
    console.log(`  ✅ HTML完了: ${a.slug}.html`);
  }
  console.log('\n✅ 荒れた境域バッチ2（12件）完了！');
}
main().catch(e => console.error('エラー:', e));
