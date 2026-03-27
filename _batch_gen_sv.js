// スカイライン・バレー不足記事バッチ生成
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
      res.on('end', () => {
        try {
          const j = JSON.parse(data);
          const page = Object.values(j.query.pages)[0];
          resolve(page.imageinfo?.[0]?.url || null);
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

// CSS抽出（prospect-hill.htmlから）
const template = fs.readFileSync('F:\\Fallout\\prospect-hill.html', 'utf8');
const cssBlock = template.substring(template.indexOf('<style>'), template.indexOf('</style>') + '</style>'.length);

const articles = [
  {
    slug: 'rapidan-creek',
    title: 'Rapidan Creek',
    titleJa: 'ラピダン・クリーク',
    wikiSlug: 'Rapidan_Creek',
    ogDesc: 'ラピダン・クリーク — スカイライン・バレー西部を流れる川。',
    mainImg: 'FO76SV_Rapidan_Creek_waterfall.png',
    mapImg: 'Three_Ponds_map.png',
    galleryImgs: [{ f: 'FO76SV_Rapidan_Creek_sign.png', c: 'オールド・クリモラ鉱山の看板' }],
    infoRows: [['種類', 'unmarked'], ['地域', 'スカイライン・バレー'], ['クリーチャー', 'ビーバー'], ['登場作品', 'Fallout 76 (Skyline Valley)']],
    body: `<h2>概要</h2>
<p><b>Rapidan Creek</b>（ラピダン・リバーとも呼ばれる）は、<b>スカイライン・バレー</b>地域のアパラチアにある未マークの川である。</p>

<h2>レイアウト</h2>
<p>ラピダン・クリークはワールドマップ上で確認でき、シェナンドー国立公園（現在のスカイライン・バレー）の西側に位置している。<br>美しいスリー・ポンドを水源とし、ワールドマップの南方境界の外へ流れていく。<br>名前に反して、ラピダン・キャンプには近づかず、キャンプには独自の池がある。</p>
<p>クリークはグラインドストーン・アーチを通って下り、険しい丘陵地帯を蛇行する。<br>主流はネイキッド・クリークとリサーチサイト・サクソニーを過ぎ、この2つのロケーション間で小島が一時的に川を分岐させる。<br>その後、オールド・クリモラ鉱山に流れ込む。<br>そこから南へ続き、マップの境界外へと流れ去る。</p>

<h2>舞台裏</h2>
<p>ラピダン・クリークは、バージニア州北部の実在する<b>ラピダン川</b>をモデルにしている。</p>

<h2>登場作品</h2>
<p>Rapidan Creekは<b>Fallout 76</b>のSkyline Valleyアップデートにのみ登場する。</p>

<div class="quote-box">
<b>感想</b><br><br>
スリー・ポンドからグラインドストーン・アーチを抜けてオールド・クリモラ鉱山まで流れる、スカイライン・バレーの西側を貫く美しい川筋です。<br>ビーバーが住んでいるのがまた雰囲気出ていて、ポストアポカリプスの中にぽっかり残った自然の美しさを感じさせてくれます。<br>名前の元になった実在のラピダン川はバージニア州にあり、シェナンドー国立公園との繋がりもそのまま反映されていますね。
</div>`,
    lore: { name: 'ラピダン・クリーク', yomi: 'らぴだんくりーく', category: '場所', appearance: ['Fallout 76'] },
  },
  {
    slug: 'shenandoah-national-park',
    title: 'Shenandoah National Park',
    titleJa: 'シェナンドー国立公園',
    wikiSlug: 'Shenandoah_National_Park',
    ogDesc: 'シェナンドー国立公園 — スカイライン・バレーのかつての国立公園。',
    mainImg: 'FO76SV_Shenandoah_Trail_Map_face.jpg',
    mapImg: null,
    galleryImgs: [{ f: 'Shenandoah_map_table.webp', c: 'シェナンドー地図テーブル' }, { f: 'FO76SV_Shenandoah_Trail_Map_back.jpg', c: 'シェナンドー・トレイルマップ（裏面）' }],
    infoRows: [['種類', '国立公園'], ['地域', 'スカイライン・バレー'], ['オーナー', '国立公園局（戦前）'], ['登場作品', 'Fallout 76 (Skyline Valley)']],
    body: `<h2>概要</h2>
<p><b>Shenandoah National Park</b>は、大戦前のアメリカ合衆国の自然のランドマークであり国立公園だった。<br>公園の一部のセクションは、戦後のアパラチアで<b>スカイライン・バレー</b>として知られる地域の一部となった。</p>

<h2>メモ</h2>
<ul>
<li>シェナンドー国立公園はゲーム内で明示的にマップマーカーが付けられたロケーションではないが、ゲーム内のスカイライン・バレー地域を包含する戦前の国立公園として複数の場面で言及されている。</li>
</ul>

<h2>登場作品</h2>
<p>Shenandoah National Parkは<b>Fallout 76</b>のSkyline Valleyアップデートにのみ登場する。</p>

<div class="quote-box">
<b>感想</b><br><br>
スカイライン・バレーの「前身」にあたる場所。<br>ゲーム内でマップマーカーはないものの、各所の看板やNPCの台詞でその名前が登場します。<br>実在のシェナンドー国立公園はバージニア州のブルーリッジ山脈に沿って広がる美しい公園で、Fallout 76ではその雰囲気をかなり忠実に再現しています。
</div>`,
    lore: { name: 'シェナンドー国立公園', yomi: 'しぇなんどーこくりつこうえん', category: '場所', appearance: ['Fallout 76'] },
  },
  {
    slug: 'skyline-drive',
    title: 'Skyline Drive',
    titleJa: 'スカイライン・ドライブ',
    wikiSlug: 'Skyline_Drive',
    ogDesc: 'スカイライン・ドライブ — スカイライン・バレーの主要道路。',
    mainImg: 'Ls_stormcorruptedzone01.png',
    mapImg: 'FO76SV_Skyline_Valley_region_map.png',
    galleryImgs: [{ f: 'FO76SV_Loc_Skyline_Drive_Entrance.jpg', c: 'スカイライン・ドライブ入り口' }, { f: 'FO76SV_Marys_Rock_Tunnel_01.png', c: 'メアリーズ・ロック・トンネル' }, { f: 'FO76SV_Skyline_Drive_car_crash.png', c: 'メイクアウト・ポイント南の車両衝突' }],
    infoRows: [['種類', '道路'], ['地域', 'スカイライン・バレー'], ['関連クエスト', '未知の地へ'], ['関連イベント', 'キャラバン：スカイライン・ドライブ'], ['登場作品', 'Fallout 76 (Skyline Valley)']],
    body: `<h2>概要</h2>
<p><b>Skyline Drive</b>は、アパラチアのスカイライン・バレー地域を特徴づける主要道路である。</p>

<h2>背景</h2>
<p>大戦前、バージニア州のシェナンドー国立公園を走る景観道路として知られていた。<br>1930年代に民間保全部隊（CCC）によって建設された。</p>

<h2>レイアウト</h2>
<p>スカイライン・ドライブの主要道路は、スカイライン・バレー地域を囲むほぼ円形のルートを形成している。<br>他のアパラチアの道路とは機能的に切り離されている。<br>北側の入り口にあるトンネルが崩壊しているためだ。<br>南のマイルポスト・ゼロにある別のトンネルは、ブルーリッジ・キャラバン・カンパニーに占拠されている。<br>メアリーズ・ロック・トンネルはスカイライン・バレー内のもう一つの目立つトンネルだが、出口ではない。</p>

<h2>舞台裏</h2>
<ul>
<li>実在のスカイライン・ドライブは、ブルーリッジ山脈のシェナンドー国立公園を105マイルにわたって走るナショナル・パークウェイで、1939年から運用されている。</li>
<li>リードデザイナーのカール・マッケヴィットが2023年に実際のスカイライン・ドライブへリサーチ旅行を行い、ゲームへの登場をTwitterで予告していた。</li>
</ul>

<h2>登場作品</h2>
<p>Skyline Driveは<b>Fallout 76</b>のSkyline Valleyアップデートに登場する。</p>

<div class="quote-box">
<b>感想</b><br><br>
スカイライン・バレーを一周する環状道路で、この地域の「背骨」のような存在です。<br>北のトンネルは崩壊していて、南はブルーリッジ・キャラバンが占拠——つまり事実上の孤立地帯を作り出しているのが、レベルデザインとして巧みだと思います。<br>開発者が実際に現地を取材しに行ったというエピソードも含めて、細部へのこだわりが感じられるロケーションです。
</div>`,
    lore: { name: 'スカイライン・ドライブ', yomi: 'すかいらいんどらいぶ', category: '場所', appearance: ['Fallout 76'] },
  },
  {
    slug: 'skyline-drive-entrance',
    title: 'Skyline Drive: Entrance',
    titleJa: 'スカイライン・ドライブ：入り口',
    wikiSlug: 'Skyline_Drive:_Entrance',
    ogDesc: 'スカイライン・ドライブ入り口 — スカイライン・バレーへの北側エントリーポイント。',
    mainImg: 'FO76SV_Loc_Skyline_Drive_Entrance.jpg',
    mapImg: 'Thunder_Mountain_substation_TM-03_map.png',
    galleryImgs: [{ f: 'FO76SV_Skyline_Drive_Entrance_sign.png', c: '入場料表示の看板' }, { f: 'FO76SV_Skyline_Drive_Entrance_-_Memo.jpg', c: 'メモ' }],
    infoRows: [['種類', 'unmarked'], ['地域', 'スカイライン・バレー'], ['最寄り', 'サンダーマウンテン変電所 TM-03'], ['オーナー', '国立公園局（戦前）'], ['クリーチャー', 'キャティ'], ['関連クエスト', '未知の地へ'], ['ターミナル', 'レンジャー・ヘイリーのターミナル'], ['登場作品', 'Fallout 76 (Skyline Valley)']],
    body: `<h2>概要</h2>
<p><b>Skyline Drive: Entrance</b>は、<b>スカイライン・バレー</b>地域のアパラチアにある未マーク地点である。</p>

<h2>注目アイテム</h2>
<ul>
<li><b>メモ</b> — 入場ステーション内のコーナーテーブルの上</li>
<li><b>雑誌</b>（ランダム出現）— 建物内のマガジンラックの上</li>
</ul>

<h2>メモ</h2>
<ul>
<li>Skyline ValleyのPTS初期バージョンでは、この場所にはマップマーカーが付けられていた。<br>2024年5月9日のPTSアップデートでマーカーが削除された。</li>
</ul>

<h2>舞台裏</h2>
<p>Double Elevenの開発者デイヴィッド・ブラウンがこの場所のレベルデザインを担当した。</p>

<h2>登場作品</h2>
<p>Skyline Drive: Entranceは<b>Fallout 76</b>のSkyline Valleyアップデートにのみ登場する。</p>

<div class="quote-box">
<b>感想</b><br><br>
スカイライン・バレーへの「入り口」を文字通り名前にした場所。<br>PTSでは最初マップマーカーがありましたが、正式リリースではunmarkedに格下げされたようです。<br>レンジャー・ヘイリーのターミナルがあるのがポイントで、この地域の国立公園としての過去を垣間見ることができます。
</div>`,
    lore: { name: 'スカイライン・ドライブ：入り口', yomi: 'すかいらいんどらいぶいりぐち', category: '場所', appearance: ['Fallout 76'] },
  },
  {
    slug: 'the-brown-house',
    title: 'The Brown House',
    titleJa: 'ブラウン・ハウス',
    wikiSlug: 'The_Brown_House',
    ogDesc: 'ブラウン・ハウス — ラピダン・キャンプ内の大統領別荘。',
    mainImg: 'FO76SV_The_Brown_House_ext.png',
    mapImg: 'Rapidan_Camp_map.png',
    galleryImgs: [{ f: 'FO76SV_The_Brown_House_int.png', c: 'ブラウン・ハウス内部' }, { f: 'FO76SV_Presidential_Bunker_Entrance.png', c: '地下室' }, { f: 'FO76SV_The_Brown_House_bobblehead.png', c: 'ボブルヘッド出現ポイント' }],
    infoRows: [['種類', 'セクション'], ['地域', 'スカイライン・バレー'], ['所在地', 'ラピダン・キャンプ'], ['オーナー', 'アメリカ合衆国政府（戦前）'], ['クリーチャー', 'ラッドローチ'], ['ロボット', 'ガムリー'], ['登場作品', 'Fallout 76 (Skyline Valley)']],
    body: `<h2>概要</h2>
<p><b>The Brown House</b>は、スカイライン・バレー地域のラピダン・キャンプ内にある建物である。</p>

<h2>背景</h2>
<p>ブラウン・ハウスは、アメリカ合衆国第21代大統領ハーバート・フーヴァーの任期中に建設され、シェナンドー国立公園での夏の別荘として彼と妻ルー・ヘンリーに使用された。<br>名前はその茶色い木造の外観に由来し、ワシントンD.C.のホワイトハウスにちなんだ遊び心のある命名である。</p>
<p>フーヴァーの任期終了後、彼はキャンプを政府の行政部門に寄贈し、将来の大統領も使えるようにした。<br>ミスター・ハンディのガムリーが管理人・庭師として配置され、歴史的事実を尋ねると教えてくれるようプログラムされている。<br>大戦の日には数名の次官補がブラウン・ハウスに駐在していたが、ガムリーによれば彼らの姿は長い間見ていないという。</p>
<p>戦前のある時点で、ラピダン・キャンプの地下にバンカー複合施設が建設され、ブラウン・ハウスの地下室にその入り口が設けられた。<br>しかし2105年現在、バンカーの入り口は封鎖されており、リモートアクセスも無効化されている。</p>

<h2>注目アイテム</h2>
<ul>
<li><b>技術データ</b> — 2階のサイドオフィスの棚の上</li>
<li><b>Grey & Gouldポケットウォッチ</b> × 2 — 2階の大統領執務室、胸像の隣と給仕テーブルの上</li>
<li><b>Vault-Tecボブルヘッド</b>（ランダム出現）× 2:<ul>
<li>北側入り口のデスクの上</li>
<li>地下室の封鎖されたエリア付近、カウンター裏のファイリングキャビネット内</li>
</ul></li>
</ul>

<h2>メモ</h2>
<ul>
<li>ブラウン・ハウスはインスタンス化された内部空間であり、Grey & Gouldポケットウォッチや損傷のないアメリカ国旗などのレアアイテムが常に利用可能。</li>
<li>シン家の家族写真が玄関デスクと大統領執務室の両方に見つかるなど、複数の不整合が存在する。</li>
<li>大統領紋章のラグが大統領のデスク側を向いている（実世界では訪問者側を向けるのが慣例）。これはBurning Springsアップデートで修正された。</li>
</ul>

<h2>舞台裏</h2>
<p>Double Elevenの開発者ルナ・ダルトンがレベルデザインを担当し、ティアゴ・マルティンスがアートパスを手がけた。</p>

<h2>登場作品</h2>
<p>The Brown Houseは<b>Fallout 76</b>のSkyline Valleyアップデートにのみ登場する。</p>

<div class="quote-box">
<b>感想</b><br><br>
フーヴァー大統領の夏の別荘をFallout世界で体験できるなんて、歴史好きにはたまらない場所です。<br>「ブラウン・ハウス」という名前がホワイトハウスのパロディになっているのがユーモアがあって良い。<br>地下にバンカーがあるのにアクセスできないのがもどかしいですが、今後のアップデートで開放される可能性に期待したいです。<br>ガムリーの「次官補たちをしばらく見ていない」という台詞の切なさが、戦後の荒廃をよく物語っていますね。
</div>`,
    lore: { name: 'ブラウン・ハウス', yomi: 'ぶらうんはうす', category: '場所', appearance: ['Fallout 76'] },
  },
  {
    slug: 'trail-hill-overlook',
    title: 'Trail hill overlook',
    titleJa: 'トレイル・ヒル展望台',
    wikiSlug: 'Trail_hill_overlook',
    ogDesc: 'トレイル・ヒル展望台 — スカイライン・バレーのハイキングコース上の展望ポイント。',
    mainImg: 'FO76SV_Trail_hill_overlook_01.png',
    mapImg: 'FO76SV_Bee\'s_diary_page_6_location.jpg',
    galleryImgs: [{ f: 'FO76SV_Trail_hill_overlook_02.png', c: '展望台の岩場' }, { f: 'FO76SV_Trail_hill_overlook_03.png', c: '撮影セットアップ' }, { f: 'FO76SV_Trail_hill_overlook_RE.png', c: 'ランダムエンカウンター' }],
    infoRows: [['種類', 'unmarked'], ['地域', 'スカイライン・バレー'], ['最寄り', 'スランバー・ミル・モーテル'], ['クリーチャー', 'シープスカッチ'], ['登場作品', 'Fallout 76 (Skyline Valley)']],
    body: `<h2>概要</h2>
<p><b>Trail hill overlook</b>は、<b>スカイライン・バレー</b>地域のアパラチアにある未マーク地点である。</p>

<h2>レイアウト</h2>
<p>スランバー・ミル・モーテルの南東に位置する。<br>モーテルの東側から続く自然遊歩道をたどって到達できる。<br>ランダムエンカウンターポイントを過ぎると、トレイルは北東に続き、その後南東の別ルートへ分岐する。</p>
<p>分岐点では、一方の看板に「簡単な」ルートと表示されているが、実際にはこちらの方が危険で、シープスカッチが確定出現する。<br>もう一方（南側）のルートの方が実際には短い。<br>トレイルの先にはロッキー展望台があり、ビーの日記ページの物語が終わる場所でもある。<br>モー・ザ・モールのカットアウトとカメラが設置された観光撮影スポットがある。</p>

<h2>注目アイテム</h2>
<ul>
<li><b>ビーの日記 #6</b> — 展望台付近の切り株（マルチパーパスアックスが刺さっている）の中</li>
<li><b>ビーの最後のメモ</b> — ビーの日記 #6がある切り株の反対側、丸太の下の骸骨の横</li>
</ul>

<h2>舞台裏</h2>
<p>Double Elevenの開発者ジョージ・プラッテンがこの場所のレベルデザインを担当した。</p>

<h2>登場作品</h2>
<p>Trail hill overlookは<b>Fallout 76</b>のSkyline Valleyアップデートにのみ登場する。</p>

<div class="quote-box">
<b>感想</b><br><br>
「簡単な」ルートの看板に騙されてシープスカッチと遭遇するのは、初見プレイヤーあるあるですね。<br>ビーの日記ページの集大成がここにあり、切り株に刺さった斧と骸骨が静かに物語の終焉を告げています。<br>モー・ザ・モールのカットアウトと撮影セットが残っている観光地の名残が、なんとも言えない哀愁を醸し出しています。
</div>`,
    lore: { name: 'トレイル・ヒル展望台', yomi: 'とれいるひるてんぼうだい', category: '場所', appearance: ['Fallout 76'] },
  },
  {
    slug: 'treetop-lookout',
    title: 'Treetop lookout',
    titleJa: 'ツリートップ展望台',
    wikiSlug: 'Treetop_lookout',
    ogDesc: 'ツリートップ展望台 — スカイライン・バレーの樹上展望ポイント。',
    mainImg: 'FO76SV_Treetop_lookout_01.png',
    mapImg: 'Treetop_lookout_map.png',
    galleryImgs: [{ f: 'FO76SV_Treetop_lookout_02.png', c: 'ツリートップ展望台' }],
    infoRows: [['種類', 'unmarked'], ['地域', 'スカイライン・バレー'], ['登場作品', 'Fallout 76 (Skyline Valley)']],
    body: `<h2>概要</h2>
<p><b>Treetop lookout</b>は、<b>スカイライン・バレー</b>地域のアパラチアにある未マーク地点である。</p>

<h2>注目アイテム</h2>
<ul>
<li><b>破れたメモ</b> × 2 — 崖際のピクニック場所。骸骨がプロポーズのメモを持ったまま落下した場所の上</li>
</ul>

<h2>舞台裏</h2>
<ul>
<li>Double Elevenの開発者デイヴィッド・ブラウンがこの場所のレベルデザインを担当した。</li>
<li>ゲームのファイルに「treetop lookout」と名付けられたカットされた内部セルが残っている。</li>
</ul>

<h2>登場作品</h2>
<p>Treetop lookoutは<b>Fallout 76</b>のSkyline Valleyアップデートにのみ登場する。</p>

<div class="quote-box">
<b>感想</b><br><br>
崖際にプロポーズのメモを持った骸骨が落ちている——そんな小さな環境ストーリーテリングがFalloutらしい場所です。<br>カットされた内部セルがまだファイルに残っているとのことで、本来はもっと大規模なロケーションになる予定だったのかもしれません。<br>展望台という名前の通り、ここからの眺めは確かに見事で、スカイライン・バレーの探索中の一息つきポイントとしても最適です。
</div>`,
    lore: { name: 'ツリートップ展望台', yomi: 'つりーとっぷてんぼうだい', category: '場所', appearance: ['Fallout 76'] },
  },
];

function generateHtml(a) {
  const articleId = `note_${a.slug.replace(/-/g, '_')}`;
  const galleryHtml = a.galleryImgs.length > 0 ? `
<div class="gallery-section">
<h2>ギャラリー</h2>
<div class="gallery-grid">
${a.galleryImgs.map((g, i) => `<div class="gallery-item"><img src="images/note_extracted/${a.slug}/img_gallery_${i+1}${path.extname(g.f)}" alt="${g.c}"><div class="caption">${g.c}</div></div>`).join('\n')}
</div>
</div>` : '';

  const rows = a.infoRows.map(r => `<div class="infobox-row"><span class="infobox-label">${r[0]}</span><span>${r[1]}</span></div>`).join('');
  const mapHtml = a.mapImg ? `<img src="images/note_extracted/${a.slug}/img_map_marker.png" alt="マップ上の位置" style="width:100%;margin-top:5px;"><div style="text-align:center;font-style:italic;color:#888;font-size:0.8em;margin-bottom:10px;">マップ上の位置</div>` : '';

  return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8"><title>${a.title} | Overseer Mohi's Terminal</title><link rel="canonical" href="https://www.fallout-jp.com/${a.slug}.html"><meta property="og:type" content="article"><meta property="og:site_name" content="Overseer Mohi's Terminal"><meta property="og:locale" content="ja_JP"><meta property="og:title" content="${a.title} | Overseer Mohi's Terminal"><meta property="og:description" content="${a.ogDesc}"><meta property="og:url" content="https://www.fallout-jp.com/${a.slug}.html"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@IwamotoFuta"><script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
${cssBlock}
</head>
<body data-article-category="${a.category || '場所'}" data-article-appearance="${a.appearance || 'Fallout 76'}">
    <div class="container">
        <aside class="infobox"><h3 style="margin-top:0;text-align:center;">${a.title}</h3><img src="images/note_extracted/${a.slug}/img_main.png" alt="${a.title}">${mapHtml}${rows}</aside>
        <main class="content">
            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="${articleId}" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>
            <h1>${a.title}<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">${a.titleJa}</span></h1>
            ${a.body}
${galleryHtml}
            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/${a.wikiSlug}" target="_blank" rel="noopener">${a.title}</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
                <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
            </div>
            <div class="comments-section"><h2 class="comments-title">&gt; COMMENTS_</h2><div class="comment-form"><textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力..." oninput="updateCharCount()"></textarea><div class="comment-form-footer"><span class="char-count"><span id="char-count">0</span>/100</span><button class="comment-submit-btn" onclick="submitComment()">SUBMIT &gt;</button></div><div id="comment-msg" class="comment-msg"></div></div><div id="comments-list"></div></div>
        </main>
    </div>
    <div class="lightbox-overlay" id="lightbox" onclick="this.classList.remove('active')"><img id="lightbox-img" src="" alt=""></div>
    <script>
        const supabaseUrl = 'https://qkdjufvdeisnunismgaw.supabase.co';
        const supabaseKey = 'sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';
        const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
        async function toggleLike(btn) { const articleId = btn.getAttribute('data-article-id'); let isLiked = localStorage.getItem(articleId + '_liked') === 'true'; btn.disabled = true; if (isLiked) { isLiked = false; const { data, error } = await supabaseClient.rpc('decrement_like', { article_id_param: articleId }); if (!error) { localStorage.setItem(articleId + '_liked', isLiked); updateLikeButton(btn, isLiked, data); } } else { isLiked = true; const { data, error } = await supabaseClient.rpc('increment_like', { article_id_param: articleId }); if (!error) { localStorage.setItem(articleId + '_liked', isLiked); updateLikeButton(btn, isLiked, data); } } btn.disabled = false; }
        function updateLikeButton(btn, isLiked, count) { const heart = btn.querySelector('.heart'); const countSpan = btn.querySelector('.like-count'); if (isLiked) { btn.classList.add('liked'); heart.textContent = '♥'; } else { btn.classList.remove('liked'); heart.textContent = '♡'; } countSpan.textContent = count; }
        document.addEventListener('DOMContentLoaded', async () => { const btn = document.querySelector('.like-button'); if (btn) { const articleId = btn.getAttribute('data-article-id'); const isLiked = localStorage.getItem(articleId + '_liked') === 'true'; const { data, error } = await supabaseClient.from('likes').select('like_count').eq('article_id', articleId).single(); let count = 0; if (!error && data) count = data.like_count; updateLikeButton(btn, isLiked, count); } const lightbox = document.getElementById('lightbox'); const lightboxImg = document.getElementById('lightbox-img'); const images = document.querySelectorAll('.content img, .infobox img, .gallery-item img'); images.forEach(img => { img.addEventListener('click', (e) => { e.stopPropagation(); lightboxImg.src = img.src; lightbox.classList.add('active'); }); }); });
        const _commentArticleId = '${articleId}'; const _commentArticleName = '${a.title}'; const _commentArticleUrl = '${a.slug}.html';
        const ADMIN_TOKEN_KEY = 'fallout_admin_token'; const ADMIN_PASSWORD = 'tq7jtq7j'; const RATE_LIMIT_KEY = 'comment_last_posted'; const RATE_LIMIT_SEC = 60; let _isAdminMode = false;
        function updateCharCount() { const len = document.getElementById('comment-input').value.length; const el = document.getElementById('char-count'); if (el) { el.textContent = len; el.style.color = len > 90 ? '#ff6b6b' : 'var(--accent-color)'; } }
        function relativeTime(s) { const d = (Date.now() - new Date(s).getTime()) / 1000; if (d < 60) return 'たった今'; if (d < 3600) return Math.floor(d / 60) + '分前'; if (d < 86400) return Math.floor(d / 3600) + '時間前'; if (d < 86400 * 7) return Math.floor(d / 86400) + '日前'; return new Date(s).toLocaleDateString('ja-JP'); }
        function escapeHtml(str) { return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
        function renderComments(comments) { const list = document.getElementById('comments-list'); if (!list) return; if (!comments || comments.length === 0) { list.innerHTML = '<div class="comment-empty">まだコメントがありません。最初のコメントを投稿してみましょう！</div>'; return; } list.innerHTML = comments.map(c => \`<div class="comment-item" data-id="\${c.id}"><div class="comment-meta"><span class="comment-time">\${relativeTime(c.created_at)}</span>\${_isAdminMode ? \`<button class="comment-delete-btn" onclick="deleteComment('\${c.id}')">&#128465;</button>\` : ''}</div><div class="comment-body">\${escapeHtml(c.content)}</div></div>\`).join(''); }
        async function loadComments() { const list = document.getElementById('comments-list'); if (!list) return; const { data, error } = await supabaseClient.from('comments').select('id,content,created_at').eq('article_id', _commentArticleId).order('created_at', { ascending: false }).limit(50); if (error) { list.innerHTML = '<div class="comment-empty">コメントを読み込めませんでした。</div>'; return; } renderComments(data || []); }
        async function submitComment() { const input = document.getElementById('comment-input'); const content = input ? input.value.trim() : ''; if (!content) { showCommentMsg('コメントを入力してください。', false); return; } if (content.length > 100) { showCommentMsg('100文字以内で入力してください。', false); return; } const lastPosted = parseInt(localStorage.getItem(RATE_LIMIT_KEY) || '0'); const now = Date.now(); if (now - lastPosted < RATE_LIMIT_SEC * 1000) { showCommentMsg('あと' + Math.ceil((RATE_LIMIT_SEC * 1000 - (now - lastPosted)) / 1000) + '秒後に投稿できます。', false); return; } const btn = document.querySelector('.comment-submit-btn'); if (btn) btn.disabled = true; const { error } = await supabaseClient.from('comments').insert({ article_id: _commentArticleId, article_name: _commentArticleName, article_url: _commentArticleUrl, content: content }); if (btn) btn.disabled = false; if (error) { showCommentMsg('投稿に失敗しました。', false); return; } localStorage.setItem(RATE_LIMIT_KEY, now.toString()); input.value = ''; updateCharCount(); showCommentMsg('コメントを投稿しました！', true); await loadComments(); }
        function showCommentMsg(text, ok) { const el = document.getElementById('comment-msg'); if (!el) return; el.textContent = text; el.style.color = ok ? 'var(--accent-color)' : '#ff6b6b'; setTimeout(() => { el.textContent = ''; }, 3000); }
        async function deleteComment(commentId) { if (!_isAdminMode) return; if (!confirm('このコメントを削除しますか？')) return; const { error } = await supabaseClient.rpc('delete_comment_admin', { comment_id: commentId, admin_token: localStorage.getItem(ADMIN_TOKEN_KEY) || '' }); if (error) { alert('削除失敗: ' + error.message); return; } await loadComments(); }
        document.addEventListener('keydown', (e) => { if (e.ctrlKey && e.shiftKey && e.key === 'D') { e.preventDefault(); if (_isAdminMode) { _isAdminMode = false; localStorage.removeItem(ADMIN_TOKEN_KEY); loadComments(); alert('管理者モードを終了しました。'); return; } const pw = prompt('管理者パスワードを入力してください:'); if (!pw) return; if (pw === ADMIN_PASSWORD) { _isAdminMode = true; localStorage.setItem(ADMIN_TOKEN_KEY, pw); loadComments(); alert('管理者モードに入りました。コメントの🗑ボタンで削除できます。'); } else { alert('パスワードが違います。'); } } });
        document.addEventListener('DOMContentLoaded', () => { loadComments(); });
    </script>
    <script src="article-common.js" defer></script>
</body>
</html>`;
}

async function main() {
  for (const a of articles) {
    console.log(`\n📄 生成中: ${a.title}`);
    const imgDir = `F:\\Fallout\\images\\note_extracted\\${a.slug}`;
    fs.mkdirSync(imgDir, { recursive: true });

    // メイン画像
    const mainUrl = await getImageUrl(a.mainImg);
    if (mainUrl) {
      await downloadImage(mainUrl, path.join(imgDir, `img_main${path.extname(a.mainImg)}`));
      // jpg/webpをpngにリネーム（テンプレートがpng前提）
      const ext = path.extname(a.mainImg);
      if (ext !== '.png') {
        const src = path.join(imgDir, `img_main${ext}`);
        const dst = path.join(imgDir, 'img_main.png');
        if (fs.existsSync(src)) fs.renameSync(src, dst);
      }
      console.log(`  ✅ メイン画像`);
    }

    // マップ画像
    if (a.mapImg) {
      const mapUrl = await getImageUrl(a.mapImg);
      if (mapUrl) {
        await downloadImage(mapUrl, path.join(imgDir, 'img_map_marker.png'));
        console.log(`  ✅ マップ画像`);
      }
    }

    // ギャラリー画像
    for (let i = 0; i < a.galleryImgs.length; i++) {
      const gUrl = await getImageUrl(a.galleryImgs[i].f);
      if (gUrl) {
        const ext = path.extname(a.galleryImgs[i].f);
        await downloadImage(gUrl, path.join(imgDir, `img_gallery_${i+1}${ext}`));
        console.log(`  ✅ ギャラリー ${i+1}`);
      }
    }

    // HTML生成
    const html = generateHtml(a);
    fs.writeFileSync(`F:\\Fallout\\${a.slug}.html`, html, 'utf8');
    console.log(`  ✅ HTML完了: ${a.slug}.html`);
  }
  console.log('\n✅ スカイライン・バレー バッチ完了！');
}

main().catch(e => console.error('エラー:', e));
