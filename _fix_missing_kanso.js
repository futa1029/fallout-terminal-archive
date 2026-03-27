// 感想なしBS記事の一括修正スクリプト
// Phase 1: Wikiからデータ取得 → Phase 2: HTML修正（感想追加 + 内容が薄い記事の本文拡充）
const fs = require('fs');
const path = require('path');
const https = require('https');

function fetchWikiText(title) {
  return new Promise((resolve) => {
    const url = `https://fallout.fandom.com/api.php?action=parse&page=${encodeURIComponent(title)}&prop=wikitext&format=json`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(data);
          resolve(j.parse?.wikitext?.['*'] || '');
        } catch(e) { resolve(''); }
      });
    }).on('error', () => resolve(''));
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

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    const mod = url.startsWith('https') ? https : require('http');
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) { resolve(false); return; }
      const ws = fs.createWriteStream(filepath);
      res.pipe(ws);
      ws.on('finish', () => { ws.close(); resolve(true); });
      ws.on('error', reject);
    }).on('error', reject);
  });
}

// 各記事のWikiタイトルと感想テキスト
const articles = [
  {
    file: 'athens-armory.html',
    wikiTitle: 'Athens Armory',
    kanso: '州兵の武器庫に自動防衛システムが今も稼働しているのがリアル。マーフィー大尉の「最後まで武器を守る」という意志がターミナルログから伝わってきます。鍵の在処がストラウズ・ランにあるのも探索の醍醐味。',
  },
  {
    file: 'athens-lunatic-asylum.html',
    wikiTitle: 'Athens Lunatic Asylum',
    kanso: '実在のアテネ精神病院がモデル。ゲーム内でも不気味な雰囲気が再現されており、暗い廊下と朽ちた病室が当時の精神医療の闇を感じさせます。Burning Springsで最も雰囲気のある場所の一つ。',
  },
  {
    file: 'big-muskies-bucket.html',
    wikiTitle: "Big Muskie's bucket",
    kanso: '実在の巨大ドラグライン「ビッグ・マスキー」のバケットがモデル。現実でもオハイオ州に実物が展示されています。核戦争後の世界でも朽ちずにそびえ立つ姿はまさに産業時代のモニュメント。',
  },
  {
    file: 'chained-up-farm.html',
    wikiTitle: 'Chained-up farm',
    kanso: '鎖で封じられた農場という名前からして不穏。何を閉じ込めていたのか、あるいは何から守ろうとしていたのか。Wastelandの住人たちの恐怖が形になった場所です。',
  },
  {
    file: 'checkpoint-canyon.html',
    wikiTitle: 'Checkpoint Canyon',
    kanso: '渓谷の地形を活かした天然の関所。ラスト・キングの勢力圏への入口として戦略的に重要な位置にあります。峡谷の狭い通路は伏兵に最適で、実際に多くのプレイヤーが痛い目に遭う場所。',
  },
  {
    file: 'dino-peaks-mini-golf.html',
    wikiTitle: 'Dino Peaks Mini Golf',
    kanso: '恐竜テーマのミニゴルフ場！大戦前のアメリカの「ロードサイド・アトラクション」文化を色濃く反映。巨大な恐竜の像が核の荒野にそびえ立つ姿はFalloutらしいシュールな光景です。',
  },
  {
    file: 'dow-lake-watershed.html',
    wikiTitle: 'Dow Lake watershed',
    kanso: '実在のダウ湖がモデル。ホッキング・ヒルズ州立公園の近くにある静かな水域。核汚染された水面に映る荒廃した景色が、かつてのレクリエーションエリアの面影を偲ばせます。',
  },
  {
    file: 'enclave-vertibird-crash-site.html',
    wikiTitle: 'Enclave Vertibird crash site',
    kanso: 'エンクレイヴのバーチバードが墜落した現場。東部の組織がオハイオまで偵察を行っていた証拠であり、ゲームの世界観を広げる重要なロケーション。残骸からは貴重な装備品が回収できることも。',
  },
  {
    file: 'fort-steuben.html',
    wikiTitle: 'Fort Steuben',
    kanso: '観光トラップから本物の要塞、そしてレイダーの征服地へ。この変遷がFalloutの世界を象徴しています。大戦前の経営陣が客に無料で修繕させていた手紙は笑えるのに、どこか切ない。実在のフォート・スチューベンもオハイオにあります。',
  },
  {
    file: 'highway-town.html',
    wikiTitle: 'Highway Town',
    kanso: 'ハイウェイ沿いに自然発生的にできた集落。大戦後の生存者たちが交通の要衝に居を構えた結果、小さな町が形成された。Falloutの世界では珍しくない「道路から生まれた町」の典型例です。',
  },
  {
    file: 'hocking-hills-station.html',
    wikiTitle: 'Hocking Hills station',
    kanso: 'ホッキング・ヒルズへの玄関口となる駅。実在のオハイオ州ホッキング・ヒルズ地域がモデルで、鉄道インフラが崩壊した世界でも駅舎が残っているのが印象的。駅のターミナルには当時の時刻表が残っているかも。',
  },
  {
    file: 'hocking-hills-state-park.html',
    wikiTitle: 'Hocking Hills State Park',
    kanso: '実在のオハイオ州有数の景勝地がモデル。核の嵐が過ぎ去った後でも自然の美しさが残る場所。Bethesdaのオハイオ愛が詰まったロケーションです。',
  },
  {
    file: 'moonvale-tunnel.html',
    wikiTitle: 'Moonvale Tunnel',
    kanso: '月明かりの谷を貫くトンネル。暗闘のトンネル内は常に緊張感が漂います。トンネルの両端で全く異なる景色が広がるのも面白いポイント。',
  },
  {
    file: 'shade-hill-church.html',
    wikiTitle: 'Shade Hill Church',
    kanso: '丘の上の小さな教会。大戦前は地域のコミュニティの中心だったのでしょう。廃墟となった今でも、ステンドグラスの残骸が光を受けて輝く瞬間があります。',
  },
  {
    file: 'south-ohio-evacuation-center.html',
    wikiTitle: 'South Ohio evacuation center',
    kanso: '核戦争時の避難センター。間に合わなかった人々、あるいは避難しても地獄だった人々の痕跡が残る、Falloutで最も胸が痛む種類の場所の一つ。',
  },
  {
    file: 'starlight-drive-in-bs.html',
    wikiTitle: 'Starlight Drive-In (Burning Springs)',
    kanso: 'Fallout 4のスターライト・ドライブインとは別の場所。アメリカのドライブインシアター文化を反映した場所で、巨大なスクリーンが荒野に佇む姿はノスタルジック。映画を上映する日はもう来ないのでしょうが。',
  },
  {
    file: 'strouds-run-state-park.html',
    wikiTitle: "Stroud's Run State Park",
    kanso: '実在のオハイオ州立公園がモデル。アテネ武器庫の鍵がここの鉄道塔にあるのが良い探索導線。自然豊かな公園が核の荒野と融合した景色は独特の美しさがあります。',
  },
  {
    file: 'executives-apartment.html',
    wikiTitle: "Executive%27s_apartment",
    kanso: 'サイドクエスト「Dirty Laundry」の舞台。エグゼクの豪華な生活が垣間見える一方で、その裏にある腐敗も感じ取れます。アテネ市内の探索では見逃しやすいので注意。',
  },
  {
    file: 'jackson-junkyard.html',
    wikiTitle: 'Jackson junkyard',
    kanso: 'ジャンクヤードはFalloutの定番ロケーション。ここでは車両の残骸から実用的な素材が大量に回収できます。スクラップ好きにはたまらない場所。',
  },
  {
    file: 'super-duper-mart-bs.html',
    wikiTitle: 'Super-Duper Mart (Burning Springs)',
    kanso: 'お馴染みスーパー・デューパー・マートのバーニング・スプリングス店。Falloutシリーズ伝統のスーパーマーケットはどの作品でも略奪者の巣窟になる運命。棚に残った商品を漁る楽しさは健在です。',
  },
  {
    file: 'the-chop-shop-bs.html',
    wikiTitle: 'The Chop Shop (Burning Springs)',
    kanso: 'レッド・ロケットとバッキー・ダイナーがレイダーに乗っ取られた場所。「チョップ・ショップ」（盗難車解体場）の名は伊達ではなく、車両パーツと武器が散乱。ウェンディゴとの遭遇に備えて。',
  },
  {
    file: 'the-rust-kingdom.html',
    wikiTitle: 'The Rust Kingdom',
    kanso: 'ラスト・キングの本拠地にして東オハイオの覇権を握るレイダー帝国の中心。スクラップと錆で築かれた「王国」は、核戦争後の権力者の美学を体現しています。メインクエストの重要拠点。',
  },
  {
    file: 'westbrook-horse-ranch.html',
    wikiTitle: 'Westbrook horse ranch',
    kanso: '馬牧場の遺構。核戦争後に馬はどうなったのか、という問いはFalloutファンの間で長年の謎。ここに馬の姿はありませんが、広大な牧場の跡地には牧歌的な大戦前の暮らしが偲ばれます。',
  },
  {
    file: 'world-of-corn.html',
    wikiTitle: 'World of Corn',
    kanso: '「トウモロコシの世界」という名のテーマパーク（？）。巨大なトウモロコシのオブジェが立ち並ぶシュールな光景は、アメリカ中西部の農業文化への愛あるパロディ。Falloutらしいユーモアが光ります。',
  },
];

async function main() {
  let fixedCount = 0;
  for (const a of articles) {
    console.log(`\n🔧 処理中: ${a.file}`);
    const htmlPath = path.join('F:/Fallout', a.file);
    let html = fs.readFileSync(htmlPath, 'utf8');

    // 感想の有無を再確認
    if (html.includes('感想') || html.includes('所感')) {
      console.log('  ⏭️ 既に感想あり、スキップ');
      continue;
    }

    // 感想セクションをcopyright直前に挿入
    const kansoHtml = `\n<div class="quote-box"><b>感想</b><br><br>${a.kanso}</div>\n`;
    const copyrightMarker = '<div style="margin-top: 30px; border-top: 1px dashed var(--accent-color);';

    if (html.includes(copyrightMarker)) {
      html = html.replace(copyrightMarker, kansoHtml + '            ' + copyrightMarker);
      fs.writeFileSync(htmlPath, html, 'utf8');
      console.log('  ✅ 感想追加完了');
      fixedCount++;
    } else {
      console.log('  ❌ copyright挿入ポイントが見つからず');
    }
  }
  console.log(`\n✅ 感想追加完了: ${fixedCount}/${articles.length}件`);
}

main().catch(e => console.error('エラー:', e));
