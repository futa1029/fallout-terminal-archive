// 荒れた境域 Named Locations バッチ生成（前半13件）
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

// CSS抽出
const template = fs.readFileSync('F:\\Fallout\\prospect-hill.html', 'utf8');
const cssBlock = template.substring(template.indexOf('<style>'), template.indexOf('</style>') + '</style>'.length);

const articles = [
  {
    slug: '98-nar-regional', title: '98 NAR Regional', titleJa: '98 NARリージョナル',
    wikiSlug: '98_NAR_Regional', ogDesc: '98 NARリージョナル — 荒れた境域にある鉄道事故現場。',
    mainImg: 'FO76_98_NAR_Regional.png', mapImg: '98_NAR_Regional_map.png', galleryImgs: [],
    infoRows: [['種類','鉄道事故現場'],['地域','荒れた境域'],['クリーチャー','ラッドローチ'],['ロボット','アイボット、ミスター・ガッツィー、プロテクトロン、セントリーボット'],['関連クエスト','シグナル・ストレングス'],['接続先','プレザント・バレー駅、ニュー・アパラチアン中央操車場'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>98 NAR Regional</b>は、アパラチアの荒れた境域に位置するロケーションである。ニュー・アパラチアン中央操車場の北方に位置する。</p>

<h2>背景</h2>
<p>恐ろしい鉄道事故の現場である。98番ニュー・アパラチアン鉄道のリージョナル輸送列車が、武器とロボットを積載した軍用列車と衝突した。数両の列車が脱線し、山岳地帯の道路を塞いでいる。東西の車両やバスと衝突し、事故現場はブルーライン鉄道の一区間とハイウェイ63号線を横断して東の森林地帯まで広がっている。</p>

<h2>レイアウト</h2>
<p>南北に走る2本の脱線列車で構成される。中央エリアの両側に脱線した貨車が並んでいる。4車線のハイウェイ63号線で二分され、廃車が両側に並ぶ。西側では半壊したバスが見つかる。</p>
<p>西側の岩場の上には軍用貨車が載っており、下からアクセスできる。内部は居住空間として使われており、戦利品、Vault-Tecボブルヘッド、レベル2の金庫がある。アイボット、ミスター・ガッツィー、セントリーボットなどの敵対ロボットが出現する。</p>

<h2>注目アイテム</h2>
<ul>
<li><b>Vault-Tecボブルヘッド</b>（ランダム出現）— 西側の転覆した軍用貨車内、ベッド横の小型本棚の上</li>
<li><b>雑誌</b>（ランダム出現）— 別の転覆軍用貨車内、柄付きソファの上</li>
<li><b>RCX01-A39デュプレクサー</b> — クエストアイテム、北端の赤い貨車内</li>
</ul>

<div class="quote-box">
<b>感想</b><br><br>
列車同士の大衝突という壮絶な光景が広がるロケーション。軍事物資を積んだ列車との事故というのがFallout世界らしい設定です。<br>転覆した貨車の下から入れる隠れ家や、セントリーボットとの遭遇など、探索しがいのある場所です。
</div>`,
  },
  {
    slug: 'beckwith-farm', title: 'Beckwith farm', titleJa: 'ベックウィス農場',
    wikiSlug: 'Beckwith_farm', ogDesc: 'ベックウィス農場 — 荒れた境域の放棄された農場。',
    mainImg: 'FO76_Farmhouse_1.png', mapImg: 'Beckwith_Farm_map.png',
    galleryImgs: [{ f: 'F76_Beckwith_Farm_Ent.png', c: '入り口' }, { f: 'F76_Beckwith_Farm.png', c: '農場の眺め' }],
    infoRows: [['種類','農場'],['地域','荒れた境域'],['クリーチャー','アングラー、ガルパー、マイアラーク、ラッドトード、スナリーガスター、ヤオ・グアイ'],['関連クエスト','フリー・レンジ'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>Beckwith farm</b>は、アパラチアの荒れた境域に位置する放棄された農場である。現在は様々なクリーチャーが棲みついている。</p>

<h2>背景</h2>
<p>大戦前からあった農場と農家で、時の経過とともに荒廃した。ベックウィス一家はVault 76が開く遥か前に亡くなっている。</p>

<h2>レイアウト</h2>
<p>板張りで塞がれた家屋と隣接する小屋で構成される。小屋には武器作業台がある。家の西側にはトイレ小屋と風車がある。農場の奥には貴重品箱のあるシェルターと軽度に放射能汚染された池がある。農家の裏にはリン酸塩鉱床のある畑がある。</p>

<h2>注目アイテム</h2>
<ul>
<li><b>アーマーMOD設計図</b>（ランダム）— 納屋内、武器作業台横の低い金属棚の上</li>
<li><b>ワークショップ設計図</b>（ランダム）— 池の近く、暖炉そばの小さな緑のテーブルの上</li>
<li><b>レシピ</b>（ランダム）— 池の近く、暖炉のシンダーブロックの上</li>
</ul>

<div class="quote-box">
<b>感想</b><br><br>
静かに朽ち果てた農家の佇まいが印象的。ベックウィス一家がどんな暮らしをしていたのか想像を掻き立てられます。<br>フリー・レンジ・イベントの経路上にあるため、ブラーミンの護衛中に立ち寄ることも。
</div>`,
  },
  {
    slug: 'big-freds-bbq-shack', title: "Big Fred's BBQ Shack", titleJa: 'ビッグ・フレッドのBBQシャック',
    wikiSlug: "Big_Fred%27s_BBQ_Shack", ogDesc: "ビッグ・フレッドのBBQシャック — レイダーの拠点と化した元バーベキュー店。",
    mainImg: 'FO76_Big_Fred%27s_BBQ_shack_01.jpg', mapImg: "Big_Fred's_BBQ_Shack_map.png",
    galleryImgs: [{ f: "F76_Big_Fred's_BBQ_Shack.png", c: '全景' }],
    infoRows: [['種類','小屋'],['地域','荒れた境域'],['勢力','カットスロート（元）'],['クリーチャー','キツネ、スコーチド、デイヴィッド・ソープ'],['関連クエスト','フリー・レンジ、キー・トゥ・ザ・パスト'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>Big Fred's BBQ Shack</b>は、荒れた境域のトップ・オブ・ザ・ワールドの南東、ミドル・マウンテン・キャビンズの北東に位置するロケーションである。</p>

<div class="quote-box" style="border-left:3px solid var(--accent-color);padding:10px;margin:15px 0;font-style:italic;">
「ビッグ・フレッドのBBQシャックはかなりの語弊のある名前だった。その前置きに反して、ビッグ・フレッドはそれほど大きくなかった。私の記憶では身長5フィート10インチ、体重180ポンドの紳士だった。そして『シャック』という言葉が想起させる質素なイメージとは裏腹に、ビッグ・フレッドの店は私が食べた中で最高のリブを出していた。」— グレン・ラモスのレビュー
</div>

<h2>背景</h2>
<p>かつて愛されたバーベキュー店で、レイダーの拠点に変貌した。現在はカットスロートのリーダーだったデイヴィッド・ソープがスコーチドとなって徘徊している。</p>

<h2>レイアウト</h2>
<p>ルート105号線沿いにある木造の小屋で、調理台がある。2軒の家は封鎖されてアクセス不可。キー・トゥ・ザ・パストのクエスト中はソープ率いるスコーチドと遭遇する。</p>

<h2>注目アイテム</h2>
<ul>
<li><b>バーント・エンズ</b> — メモ、カウンターの上（クリップボードの下に隠されている）</li>
<li><b>カットスロートの鍵の断片</b> — ホロテープ、デイヴィッド・ソープの遺体（キー・トゥ・ザ・パスト中のみ）</li>
</ul>

<div class="quote-box">
<b>感想</b><br><br>
レビュアーの「ビッグ・フレッドは実はそんなに大きくなかった」というコメントが味わい深い。最高のリブを出す小さな店が、今はスコーチドの巣窟に…。<br>ルート105号線のかつての人気店の面影をしのばせる、切ないロケーションです。
</div>`,
  },
  {
    slug: 'carhenge-fo76', title: 'Carhenge', titleJa: 'カーヘンジ',
    wikiSlug: 'Carhenge_(Fallout_76)', ogDesc: 'カーヘンジ — 車をストーンヘンジ風に並べた謎のモニュメント。',
    mainImg: 'FO76_Carhenge_throne_01.png', mapImg: 'Bailey_Family_Cabin_map.png',
    galleryImgs: [{ f: 'FO76_Carhenge_throne_02.png', c: '玉座のクローズアップ' }],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['最寄り','ベイリー家のキャビン'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>Carhenge</b>は、荒れた境域のベイリー家キャビンの北西に位置する未マークのロケーションである。</p>

<h2>レイアウト</h2>
<p>錆びた車がストーンヘンジを模して積み上げられている。中央には車の残骸を使った玉座があり、タイヤに囲まれている。プレイヤーは座ることが可能。アサルト系のランダムエンカウンターが発生する場所でもある。南西の岩場にはモスマンの教団のトーテムがある。</p>

<h2>舞台裏</h2>
<ul>
<li>実在のストーンヘンジがモデル。Fallout 4のウォールデン・ポンド近くにも同様のカーヘンジが登場する。</li>
<li>以前はFallout 76にカーヘンジが2箇所あったが、Wastelanders アップデートで1箇所が「Crossroad」に置き換えられた。</li>
</ul>

<div class="quote-box">
<b>感想</b><br><br>
ウェイストランドの誰かが車でストーンヘンジを再現した、というシュールな光景。中央の玉座に座れるのが楽しい。<br>モスマンの教団のトーテムが近くにあるのも不気味さを加えています。Fallout 4にも同じネタがあるのがシリーズファンにはニヤリとするポイント。
</div>`,
  },
  {
    slug: 'dent-and-sons-construction', title: 'Dent & Sons Construction', titleJa: 'デント＆サンズ建設',
    wikiSlug: 'Dent_%26_Sons_Construction', ogDesc: 'デント＆サンズ建設 — 元レイダー拠点の建設現場。',
    mainImg: 'Dent_and_Sons_Construction.png', mapImg: 'Dent_%26_Sons_Construction_map.png',
    galleryImgs: [{ f: 'FO76_Dent_an_sons_1.png', c: '内部' }],
    infoRows: [['種類','トレーラー'],['地域','荒れた境域'],['勢力','レイダー（元）'],['クリーチャー','ブラッドバグ'],['関連クエスト','ジェネティック・トラックス'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>Dent & Sons Construction</b>は、アパラチアの荒れた境域に位置するロケーションである。</p>

<h2>背景</h2>
<p>大戦前、ルート101号線の南方拡張工事のために掘削が行われていた場所。戦後はレイダーの拠点となった。</p>

<h2>レイアウト</h2>
<p>トレーラーハウスが主要な建物で、内部には化学作業台がある。外にはラッドスタグが吊るされた乾燥ラックと調理台がある。周辺にはレイダーの遺体が散乱。</p>

<div class="quote-box">
<b>感想</b><br><br>
道路拡張工事の現場がそのまま残っているのが、「あの日」で時間が止まった感覚を演出しています。レイダーが住み着いた痕跡と化学作業台の組み合わせが、彼らの生活ぶりを物語っていますね。
</div>`,
  },
  {
    slug: 'foundation-supply-room', title: 'Foundation supply room', titleJa: 'ファウンデーション補給室',
    wikiSlug: 'Foundation_supply_room', ogDesc: 'ファウンデーション補給室 — ファウンデーション内の物資管理施設。',
    mainImg: 'FO76SD_Foundation_supply_room_exterior.jpg', mapImg: null,
    galleryImgs: [{ f: 'FO76SD_Foundation_supply_room_interior.jpg', c: '内部' }],
    infoRows: [['種類','セクション'],['地域','荒れた境域（ファウンデーション内）'],['勢力','セトラーズ'],['関連クエスト','サプライング・デマンズ'],['登場作品','Fallout 76 (Steel Dawn)']],
    body: `<h2>概要</h2>
<p><b>Foundation supply room</b>（ファウンデーション補給室）は、荒れた境域のファウンデーション内にある未マークのロケーションである。</p>

<h2>背景</h2>
<p>ファウンデーションの物流を担う施設で、入出荷される全ての物資がここを通過する。サニーズのショップで販売される商品もまずここで処理される。</p>

<h2>レイアウト</h2>
<p>ファウンデーションの南東の角、兵舎の下に位置。入り口は小さな高架プラットフォームにある。内部にはセキュリティケージ、書棚、テーブル、猫のサニー用のスペースがある。両側にセキュリティドア付きのオフィスが2つ。</p>

<h2>住人</h2>
<ul>
<li>グロリア・チャンス</li>
<li>タッド・チャンス</li>
<li>サニー（猫）</li>
<li>マイク・ティラー（オプション）</li>
<li>キャシー・ハロウェイ</li>
</ul>

<h2>注目アイテム</h2>
<ul>
<li><b>欲しいものを手に入れた</b> — メモ、タッド・チャンスのテーブルの上（南側）</li>
<li><b>今後の出荷予定</b> — メモ、北側の部屋のファイリングキャビネットの上</li>
</ul>

<div class="quote-box">
<b>感想</b><br><br>
ファウンデーションの「裏方」的な施設。物資がどう管理されているかが垣間見えて、コミュニティの運営面を感じられる場所です。<br>猫のサニー専用スペースがあるのが微笑ましい。
</div>`,
  },
  {
    slug: 'founders-hall', title: "Founder's Hall", titleJa: 'ファウンダーズ・ホール',
    wikiSlug: "Founder%27s_Hall", ogDesc: "ファウンダーズ・ホール — ファウンデーションの地下中枢。",
    mainImg: 'FO76WL_Spruce_Knob_Cave.jpg', mapImg: 'Spruce_Knob_map.png',
    galleryImgs: [{ f: 'F76WL_Founders_Hall_1.png', c: '廊下' }, { f: 'F76WL_Founders_Hall_4.png', c: 'オーブリーのクリニック' }],
    infoRows: [['種類','洞窟施設'],['地域','荒れた境域（ファウンデーション内）'],['勢力','セトラーズ'],['ターミナル','ファウンダーズ・ホール・ターミナル'],['関連クエスト','インビジブル・タイズ'],['登場作品','Fallout 76 (Wastelanders)']],
    body: `<h2>概要</h2>
<p><b>Founder's Hall</b>（ゲーム内名: Foundation Interior）は、ファウンデーション内のロケーションである。</p>

<h2>背景</h2>
<p>スプルース・ノブの地下にある巨大なドーム型の洞窟で、大戦前に建設された大規模なポンプ施設を基に、セトラーズがさらに拡張した。スコーチビーストやアパラチアの他の危険から身を守るための理想的な場所とされている。</p>

<h2>レイアウト</h2>
<p>洞窟の中心にエレベーターがある。北にはペイジのオフィスと化学作業台。北東にオーブリーのクリニック。東にジェンの部屋。南東に兵舎。南に水ポンプステーション。西のコンピュータエリアにはトゥッティ・フルッティとペネロペ・ホーンライトが配置される。</p>

<h2>住人</h2>
<ul>
<li>ペイジ（リーダー）</li>
<li>ジェン</li>
<li>オーブリー・ウィレム</li>
<li>キャプテン・フィールズ（Duty Calls完了後）</li>
<li>ペネロペ・ホーンライト（Trade Secrets完了後）</li>
<li>トゥッティ・フルッティ</li>
</ul>

<h2>注目アイテム</h2>
<ul>
<li><b>ペイジの日誌 エントリー1〜5</b> — ホロテープ、各所に配置（クエスト進行で順次出現）</li>
<li><b>ジェンの日誌 エントリー1</b> — ホロテープ、ジェンの部屋のテーブル上</li>
<li><b>オーブリーのメモ</b> — メモ、クリニックのテーブル上（Here to Stay完了後）</li>
</ul>

<div class="quote-box">
<b>感想</b><br><br>
ファウンデーションの「心臓部」。ペイジの日誌をクエスト進行ごとに集めていくと、セトラーズの歩みと苦悩が浮かび上がります。<br>スプルース・ノブの地下という立地も、文明再建の象徴として印象的です。
</div>`,
  },
  {
    slug: 'the-freak-show', title: 'The Freak Show', titleJa: 'ザ・フリークショー',
    wikiSlug: 'The_Freak_Show', ogDesc: 'ザ・フリークショー — レイダーが運営した変異生物の見世物小屋。',
    mainImg: 'FO76_The_Freak_Show.png', mapImg: 'The_Freak_Show_map.png',
    galleryImgs: [{ f: 'F76_Freak_Show_1.png', c: '入り口' }, { f: 'F76_Freak_Show_2.png', c: '内部' }],
    infoRows: [['種類','レイダー拠点'],['地域','荒れた境域'],['勢力','レイダー（元）'],['クリーチャー','ハニービースト、マイアラーク、ラッドラット他多数'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>The Freak Show</b>は、荒れた境域のハンターズヴィルの東に位置するロケーションである。</p>

<h2>背景</h2>
<p>フリークショーはレイダーたちが運営した「動物園」で、ウェイストランドで遭遇する恐ろしい変異生物を — もちろん有料で — 展示していた。</p>

<h2>レイアウト</h2>
<p>崖の下、ルート107号線沿いに広がる元レイダーキャンプ。南端にはチケットブース（金庫、キャップ隠し場所あり）、内部の檻には死んだ変異生物が入っている。ボウリングセクションには死んだラッドスタグ。火炎放射器、骨のチャイム、地雷など多数のトラップがある。人骨で作られた自転車も見つかる。</p>

<h2>注目アイテム</h2>
<ul>
<li><b>フリークショーへようこそ</b> — ホロテープ、チケット係の骸骨の手に</li>
<li><b>研究メモ</b> — メモ、南の崖際の岩の上</li>
<li><b>ザ・ドメスティックス ノート4</b> — メモ、南西のカボチャ畑、樽の上</li>
</ul>

<div class="quote-box">
<b>感想</b><br><br>
「変異生物の見世物小屋」というコンセプトがレイダーらしくて最高。人骨で作った自転車のブラックユーモアもFalloutの真骨頂。<br>レンジャーのデイブがペットの犬ルーファスを助けようとして殺されたという裏話が切ない。
</div>`,
  },
  {
    slug: 'lake-eloise', title: 'Lake Eloise', titleJa: 'エロイーズ湖',
    wikiSlug: 'Lake_Eloise', ogDesc: 'エロイーズ湖 — 荒れた境域の釣りスポットだった湖。',
    mainImg: 'FO76_Lake_Eloise.png', mapImg: 'Lake_Eloise_map.png',
    galleryImgs: [{ f: 'FO76_Lake_Eloise_house.png', c: '湖畔の廃屋' }],
    infoRows: [['種類','湖'],['地域','荒れた境域'],['クリーチャー','フローター、ラッドスタグ、ティック、ウェンディゴ'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>Lake Eloise</b>は、アパラチアの荒れた境域に位置する湖である。</p>

<h2>レイアウト</h2>
<p>かつての釣りスポットで、湖中にはいくつかの小島がある。北東方向にはフィッシャーサイトガンマが近接しており、木の橋2本で本土と繋がった大きな島にはフローターの巣がある。南東の湖畔には廃屋があり、スカベンジャーが住んでいることも。南西の崖上には南方の川を渡る橋がある。</p>

<h2>注目アイテム</h2>
<ul>
<li><b>小さな女の子のメモ</b> — メモ、南東の廃屋内</li>
<li><b>雑誌</b>（ランダム）— 北東の野営地、テレビの裏</li>
</ul>

<div class="quote-box">
<b>感想</b><br><br>
穏やかな釣り場の面影を残す美しい湖ですが、フローターの巣になった小島やウェンディゴの出現が油断を許しません。<br>「小さな女の子のメモ」が見つかる廃屋のストーリーには心が締め付けられます。
</div>`,
  },
  {
    slug: 'metal-dome', title: 'Metal Dome', titleJa: 'メタル・ドーム',
    wikiSlug: 'Metal_Dome', ogDesc: 'メタル・ドーム — ラスト・イーグルズのロボット闘技場。',
    mainImg: 'FO76_metaldome_waster_01.png', mapImg: 'Metal_Dome_map.png',
    galleryImgs: [{ f: 'FO76_metaldome_waster_02.png', c: 'アリーナ入り口' }, { f: 'FO76_metaldome_waster_06.png', c: 'ボスの玉座' }],
    infoRows: [['種類','レイダー闘技場'],['地域','荒れた境域'],['勢力','ラスト・イーグルズ、B.O.S.（ローテーション）'],['リーダー','バズソー'],['イベント','テスト・ユア・メタル'],['登場作品','Fallout 76 (Steel Reign)']],
    body: `<h2>概要</h2>
<p><b>Metal Dome</b>は、荒れた境域のアトラス砦北方に位置するロケーションである。</p>

<h2>背景</h2>
<p>ブラッドイーグルから分派した「ラスト・イーグルズ」のリーダー、バズソーが周辺の建造物を再利用して作り上げたロボット闘技場。B.O.S.のイニシエイト・パッパスは戦闘データを収集するため、部隊を率いてアリーナに参加する。</p>

<h2>レイアウト</h2>
<p>仮設通路、ロボットの残骸、建設装置で構成されたアリーナ。見物席が周囲に配置され、火炎放射器に囲まれた玉座がアリーナを見下ろす。列車車両はワークショップに改造されている。</p>

<h2>注目アイテム</h2>
<ul>
<li><b>あなたの金属を試してみないか？</b> — メモ、南側の壊れたロボブレイン展示品の近く</li>
<li><b>キルボット在庫リスト</b> — メモ、2階の金属小屋のテーブル上</li>
<li><b>退廃のメタル・ドーム</b> — ホロテープ、木箱の上</li>
<li><b>ブラッドイーグル・コード</b> — メモ、在庫リストと同じ小屋の棚</li>
</ul>

<h2>メモ</h2>
<ul>
<li>「世界を殺したのは誰だ？」「私の錆びた金属のケツを噛め」などのグラフィティは映画『マッド・マックス 怒りのデス・ロード』やアニメ『フューチュラマ』のオマージュ。</li>
</ul>

<div class="quote-box">
<b>感想</b><br><br>
マッドマックスの世界観そのままの闘技場。ロボット同士を戦わせるイベント「テスト・ユア・メタル」は76のエンドゲームコンテンツとして人気。<br>グラフィティの文化的レファレンスの豊富さにも開発者の遊び心が溢れています。
</div>`,
  },
  {
    slug: 'middle-mountain-pitstop', title: 'Middle Mountain Pitstop', titleJa: 'ミドル・マウンテン・ピットストップ',
    wikiSlug: 'Middle_Mountain_Pitstop', ogDesc: 'ミドル・マウンテン・ピットストップ — ブルーリッジ・キャラバンの休憩所。',
    mainImg: 'FO76OB_Middle_Mountain_Pitstop_05.png', mapImg: 'Middle_Mountain_Cabins_map.png',
    galleryImgs: [{ f: 'FO76OB_Middle_Mountain_Pitstop_04.png', c: '雑貨店' }, { f: 'FO76OB_The_Boozin_Brahmin.png', c: 'ブージン・ブラーミン（バー）' }],
    infoRows: [['種類','キャビン'],['地域','荒れた境域'],['勢力','ブルーリッジ・キャラバン・カンパニー'],['イベント','セイフ・アンド・サウンド'],['ターミナル','ミドル・マウンテン・ピットストップ・ターミナル'],['登場作品','Fallout 76 (Once in a Blue Moon)']],
    body: `<h2>概要</h2>
<p><b>Middle Mountain Pitstop</b>は、荒れた境域のロケーション。以前は「ミドル・マウンテン・キャビンズ」として知られていたが、ブルーリッジ・キャラバン・カンパニーがリノベーションし改名した。</p>

<h2>背景</h2>
<p>大戦前はハンターや旅行者向けの私営リトリートだった。戦後、オーナーのジョージが放射能で病に倒れ、キャビンは放棄された。2104年にブルーリッジ・キャラバンが入居し、キャラバンの休憩所兼ブラーミン牧場として運営を開始した。</p>
<p>雑貨商のヴェラ・ソーンバーグとバーテンダー兼ガードのクライドが常駐。ただしクリーチャーの攻撃が頻発しており、アリエスが設置したリペラー発電機が故障するとブルー・デビルを含む致命的なクリーチャーを引き寄せてしまう。</p>

<h2>レイアウト</h2>
<p>雑貨店（ヴェラ担当）、ブージン・ブラーミン（クライドのバー）、スリープ・ストップ（宿泊施設）の3棟で構成。ジャンクと木製バリケードで囲まれ、屋上の見張り台が橋で繋がれている。中央にリペラー発電機。</p>

<h2>注目アイテム</h2>
<ul>
<li><b>調査報告書</b> — メモ、南東の木造小屋の床</li>
<li><b>ヴェラへの手紙</b> — メモ、雑貨店のカウンター</li>
<li><b>ピットストップ・ノート</b> — メモ、バーのカウンター裏のゴミ箱</li>
<li><b>安らかに眠れ</b> — メモ、雑貨店裏のジョージの墓</li>
</ul>

<div class="quote-box">
<b>感想</b><br><br>
ブルーリッジ・キャラバンの活気が感じられる数少ない「生きた」拠点。バー「ブージン・ブラーミン」でダーツをしながら一息つけるのが良い。<br>セイフ・アンド・サウンドイベントではリペラーが壊れてカオスになるのがスリリングです。
</div>`,
  },
  {
    slug: 'miners-monument', title: 'Miners Monument', titleJa: 'マイナーズ・モニュメント',
    wikiSlug: 'Miners_Monument', ogDesc: 'マイナーズ・モニュメント — 炭鉱労働者の記念碑。',
    mainImg: 'FO76_Miners_monument.png', mapImg: "Miner's_Monument_map.png",
    galleryImgs: [{ f: 'F76_Miners_Monument_2.png', c: '記念碑' }],
    infoRows: [['種類','記念碑'],['地域','荒れた境域'],['ロボット','プロテクトロン'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>Miners Monument</b>は、荒れた境域のアンキャニー・ケイバーンの東に位置するロケーションである。</p>

<div class="quote-box" style="border-left:3px solid var(--accent-color);padding:10px;margin:15px 0;font-style:italic;">
「アパラチア鉱業共同体は、炭鉱労働者が適正な報酬を受けていること、そして採掘が健康上のリスクや環境への重大な損害を引き起こすという証拠は存在しないことを皆様にお知らせしたいと思います。」— ディック・シェイルのガイドツアー
</div>

<h2>背景</h2>
<p>1952年に建てられた、ウェストバージニア州の全炭鉱労働者に捧げられた記念碑。鉱夫代表組合とアパラチア鉱業共同体が数百の提案デザインから選定した。人気の観光地であり、ベックリー鉱山展示にはレプリカも設置されている。</p>

<h2>レイアウト</h2>
<p>フィッシャーサイトの南東、道路沿いにある。大きな駐車場にはプロテクトロンの充電ステーションがあり、近づくと敵対的に起動する。記念碑前にはオーディオツアーステーションがある。武器作業台あり。</p>

<h2>舞台裏</h2>
<p>この像は、ベックリーのニューリバーパークにある「ウェストバージニア炭鉱労働者の記念碑」とほぼ同一のデザインである。</p>

<div class="quote-box">
<b>感想</b><br><br>
炭鉱州ウェストバージニアの誇りを体現した場所。ディック・シェイルの「鉱業は安全で適正な報酬」という皮肉たっぷりのガイドが、Fallout世界の企業体質を如実に表しています。<br>実在の記念碑がモデルなのも、このゲームの細やかなこだわりを感じます。
</div>`,
  },
  {
    slug: 'moonshiners-overlook', title: "Moonshiner's overlook", titleJa: '密造酒業者の見晴らし台',
    wikiSlug: "Moonshiner%27s_overlook", ogDesc: "密造酒業者の見晴らし台 — 荒れた境域の崖上キャンプ。",
    mainImg: 'FO76_Moonshiners_overlook.png', mapImg: null,
    galleryImgs: [],
    infoRows: [['種類','キャンプ'],['地域','荒れた境域'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2>
<p><b>Moonshiner's overlook</b>は、アパラチアの荒れた境域に位置するロケーションである。</p>

<h2>レイアウト</h2>
<p>崖の上に位置する小さなキャンプ。密造酒を製造していた人物の痕跡が残っている。荒れた境域の景色を一望できる見晴らしの良い場所。</p>

<div class="quote-box">
<b>感想</b><br><br>
アパラチアの伝統的な密造酒文化を感じさせる小ロケーション。崖上からの景色は絶景で、探索の途中での休憩に最適です。
</div>`,
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
<body data-article-category="場所" data-article-appearance="Fallout 76">
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
        const _commentArticleId = '${articleId}'; const _commentArticleName = '${a.title.replace(/'/g, "\\'")}'; const _commentArticleUrl = '${a.slug}.html';
        const ADMIN_TOKEN_KEY = 'fallout_admin_token'; const ADMIN_PASSWORD = 'tq7jtq7j'; const RATE_LIMIT_KEY = 'comment_last_posted'; const RATE_LIMIT_SEC = 60; let _isAdminMode = false;
        function updateCharCount() { const len = document.getElementById('comment-input').value.length; const el = document.getElementById('char-count'); if (el) { el.textContent = len; el.style.color = len > 90 ? '#ff6b6b' : 'var(--accent-color)'; } }
        function relativeTime(s) { const d = (Date.now() - new Date(s).getTime()) / 1000; if (d < 60) return 'たった今'; if (d < 3600) return Math.floor(d / 60) + '分前'; if (d < 86400) return Math.floor(d / 3600) + '時間前'; if (d < 86400 * 7) return Math.floor(d / 86400) + '日前'; return new Date(s).toLocaleDateString('ja-JP'); }
        function escapeHtml(str) { return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
        function renderComments(comments) { const list = document.getElementById('comments-list'); if (!list) return; if (!comments || comments.length === 0) { list.innerHTML = '<div class="comment-empty">まだコメントがありません。最初のコメントを投稿してみましょう！</div>'; return; } list.innerHTML = comments.map(c => \`<div class="comment-item" data-id="\${c.id}"><div class="comment-meta"><span class="comment-time">\${relativeTime(c.created_at)}</span>\${_isAdminMode ? \`<button class="comment-delete-btn" onclick="deleteComment('\${c.id}')">&#128465;</button>\` : ''}</div><div class="comment-body">\${escapeHtml(c.content)}</div></div>\`).join(''); }
        async function loadComments() { const list = document.getElementById('comments-list'); if (!list) return; const { data, error } = await supabaseClient.from('comments').select('id,content,created_at').eq('article_id', _commentArticleId).order('created_at', { ascending: false }).limit(50); if (error) { list.innerHTML = '<div class="comment-empty">コメントを読み込めませんでした。</div>'; return; } renderComments(data || []); }
        async function submitComment() { const input = document.getElementById('comment-input'); const content = input ? input.value.trim() : ''; if (!content) { showCommentMsg('コメントを入力してください。', false); return; } if (content.length > 100) { showCommentMsg('100文字以内で入力してください。', false); return; } const lastPosted = parseInt(localStorage.getItem(RATE_LIMIT_KEY) || '0'); const now = Date.now(); if (now - lastPosted < RATE_LIMIT_SEC * 1000) { showCommentMsg('あと' + Math.ceil((RATE_LIMIT_SEC * 1000 - (now - lastPosted)) / 1000) + '秒後に投稿できます。', false); return; } const btn = document.querySelector('.comment-submit-btn'); if (btn) btn.disabled = true; const { error } = await supabaseClient.from('comments').insert({ article_id: _commentArticleId, article_name: _commentArticleName, article_url: _commentArticleUrl, content: content }); if (btn) btn.disabled = false; if (error) { showCommentMsg('投稿に失敗しました。', false); return; } localStorage.setItem(RATE_LIMIT_KEY, now.toString()); input.value = ''; updateCharCount(); showCommentMsg('コメントを投稿しました！', true); await loadComments(); }
        function showCommentMsg(text, ok) { const el = document.getElementById('comment-msg'); if (!el) return; el.textContent = text; el.style.color = ok ? 'var(--accent-color)' : '#ff6b6b'; setTimeout(() => { el.textContent = ''; }, 3000); }
        async function deleteComment(commentId) { if (!_isAdminMode) return; if (!confirm('このコメントを削除しますか？')) return; const { error } = await supabaseClient.rpc('delete_comment_admin', { comment_id: commentId, admin_token: localStorage.getItem(ADMIN_TOKEN_KEY) || '' }); if (error) { alert('削除失敗: ' + error.message); return; } await loadComments(); }
        document.addEventListener('keydown', (e) => { if (e.ctrlKey && e.shiftKey && e.key === 'D') { e.preventDefault(); if (_isAdminMode) { _isAdminMode = false; localStorage.removeItem(ADMIN_TOKEN_KEY); loadComments(); alert('管理者モードを終了しました。'); return; } const pw = prompt('管理者パスワードを入力してください:'); if (!pw) return; if (pw === ADMIN_PASSWORD) { _isAdminMode = true; localStorage.setItem(ADMIN_TOKEN_KEY, pw); loadComments(); alert('管理者モードに入りました。'); } else { alert('パスワードが違います。'); } } });
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
  console.log('\n✅ 荒れた境域バッチ1（13件）完了！');
}

main().catch(e => console.error('エラー:', e));
