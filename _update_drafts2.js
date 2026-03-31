const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function getImageUrl(filename) {
  const apiUrl = "https://fallout.fandom.com/api.php?action=query&titles=File:" + encodeURIComponent(filename) + "&prop=imageinfo&iiprop=url&format=json";
  return new Promise((resolve) => {
    https.get(apiUrl, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const page = Object.values(pages)[0];
          if (page.imageinfo && page.imageinfo[0]) {
            resolve(page.imageinfo[0].url);
          } else { resolve(null); }
        } catch { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    proto.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, filepath).then(resolve).catch(reject);
      }
      const stream = fs.createWriteStream(filepath);
      res.pipe(stream);
      stream.on('finish', () => { stream.close(); resolve(); });
    }).on('error', reject);
  });
}

async function processArticle(slug, title, titleJp, imagesArray, htmlBodyStr) {
    const imgDir = "images/note_extracted/" + slug;
    if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

    for (const img of imagesArray) {
        const url = await getImageUrl(img);
        if (url) {
            const localName = img.replace(/'/g, '_').toLowerCase().replace(/[\s\(\)]+/g, '_').replace(/_+/g, '_').replace(/_\.png$/, '.png').replace(/_\.jpg$/, '.jpg');
            const filepath = path.join(imgDir, localName);
            if (!fs.existsSync(filepath)) {
                await downloadFile(url, filepath);
                console.log("  DL " + localName);
            } else {
                console.log("  SKIP " + localName);
            }
        }
    }

    const realTargetFile = "f:\\Fallout\\" + slug + ".html";
    if (!fs.existsSync(realTargetFile)) {
        console.error("File not found:", realTargetFile);
        return;
    }

    let content = fs.readFileSync(realTargetFile, 'utf8');

    const footerLines = [
        '<div style="margin-top: 30px',
        '<div style="margin-top:30px',
        '<div class="comments-section"'
    ];

    let startIdx = content.indexOf('<h1>');
    if (startIdx === -1) { console.error('No H1 found in', slug); return; }
    
    startIdx = content.indexOf('</h1>', startIdx) + 5;

    let endIdx = -1;
    for (const fl of footerLines) {
        let idx = content.indexOf(fl);
        if (idx !== -1 && (endIdx === -1 || idx < endIdx)) endIdx = idx;
    }

    if (startIdx !== -1 && endIdx !== -1) {
        const titleLine = "\n            <!-- ===== 概要 ===== -->\n";
        content = content.substring(0, startIdx) + titleLine + htmlBodyStr + '\n            ' + content.substring(endIdx);
        
        let loreHtml = fs.readFileSync('f:\\Fallout\\lore.html', 'utf8');
        loreHtml = loreHtml.replace(new RegExp("('url':\\s*'" + slug + "\\.html',[^}]+)isDraft:\\s*true,?.*"), (match, p1) => {
            return p1.replace(/,\s*$/, '');
        });
        fs.writeFileSync('f:\\Fallout\\lore.html', loreHtml, 'utf8');

        fs.writeFileSync(realTargetFile, content, 'utf8');
        console.log("Updated " + slug + ".html successfully.");
    } else {
        console.error("Patterns not found in the HTML:", slug, startIdx, endIdx);
    }
}

async function run() {
    const ctHtml = `
            <h2>概要</h2>
            <p>
                <b>教団のトーテム</b>（Cultist totem）は、アパラチアの森林地帯にある未マークのロケーションである。
            </p>

            <h2>レイアウト</h2>
            <p>
                ポイント・プレザントとマリーゴールド・パビリオンの間に位置する森の斜面に隠された、モスマン教団の儀式会場。木の根に囲まれた角を持つ7体のオブジェがアーチを形成している。中央のトーテムの周囲にはいくつものロウソクの火が灯されており、教団の信者の死体が3体転がっている。この場所は常にオポッサムなどの小動物の死体も引き寄せている。
            </p>
            
            <div class="gallery-section">
                <h2>GALLERY_</h2>
                <div class="gallery-grid">
                    <div class="gallery-item"><img src="images/note_extracted/cultist-totem/fo76_cultist_totems__point_pleasant_.png" alt="風景"></div>
                    <div class="gallery-item"><img src="images/note_extracted/cultist-totem/fo76_cultist_totems__point_pleasant__1_.png" alt="風景"></div>
                    <div class="gallery-item"><img src="images/note_extracted/cultist-totem/fo76_cultist_totems_point_pleasant_tangle_tree_.jpg" alt="トーテム"></div>
                </div>
            </div>

            <div class="quote-box">
                <b>感想</b><br><br>
                ポイント・プレザントのお膝元である森の奥深くでひっそりと行われている不気味な儀式場跡地です。骨と死体のアーチというウエイストランドらしいダークな雰囲気が漂っており、マップに記載されない小さなロケーションならではの発見する喜びと恐怖がありますね。
            </div>`;
    await processArticle('cultist-totem', 'Cultist totem', '教団のトーテム', [
        'FO76_Cultist_Totems_(Point_Pleasant_Tangle_Tree).jpg', 'Marigold_Pavilion_map.png',
        'FO76_Cultist_Totems_(Point_Pleasant)_(1).png', 'FO76_Cultist_Totems_(Point_Pleasant)_(2).png',
        'FO76_Cultist_Totems_(Point_Pleasant)_(3).png'
    ], ctHtml);

    const csHtml = `
            <h2>概要</h2>
            <p>
                <b>カウスポット乳製品製造所</b>（Cow Spots Creamery）は、アパラチアの森林地帯にあるロケーションである。
            </p>

            <h2>背景</h2>
            <p>
                「カウスポット・クリーマリー」は、ニューリバー渓谷橋の西端にある小さなアイスクリームショップで、かつてアイスクリームが製造されていた工場が併設されている。
            </p>

            <h2>レイアウト</h2>
            <p>
                メインの建物の側面には巨大なアイスクリームコーンのオブジェが3つ取り付けられており、店の看板となっている。ロケーションは店舗スペースと工場エリアの2つの建物で構成されており、木製の遊歩道で囲まれている。販売スペースの西側には小さな屋外のシーティングエリアと遊び場がある。
            </p>
            <p>
                店舗設備には、ブース席のあるダイニングエリア、Port-A-Diner、2台のレジがあるフロントカウンターが含まれる。カウンターの奥には2体の白骨死体があり、そのうちの1体はまだクリームのボトルを握りしめている。レジの裏には金庫（Picklock 0）と、クリームの入った冷蔵庫がある。「従業員専用」エリアではエイミー・ケリーの死体が見つかる。
            </p>
            <p>
                工場エリアは南東の別棟にある。ここにはクリームを瓶詰めするためのベルトコンベアと細工師の作業台がある。ミルクボトルの形をしたアイスを食べている赤い庭のノームが垂木の上に座り、下の様子をうかがっている。
            </p>

            <h2>注目の戦利品</h2>
            <ul>
                <li>多数の「クリーム」（計8本以上）</li>
                <li>メモ「<b>エイミーのメモ</b>」：エイミー・ケリーの死体（デイリークエスト『Ecological Balance』進行中）</li>
                <li>ホロテープ「<b>うるさすぎる！</b>」：コンベアのある工場の小さなカートの上</li>
            </ul>

            <div class="gallery-section">
                <h2>GALLERY_</h2>
                <div class="gallery-grid">
                    <div class="gallery-item"><img src="images/note_extracted/cow-spots-creamery/fo76_big_ol_ice_cream_cone.png" alt="外観"></div>
                    <div class="gallery-item"><img src="images/note_extracted/cow-spots-creamery/fo76_cow_spots_creamery_sign.png" alt="看板"></div>
                    <div class="gallery-item"><img src="images/note_extracted/cow-spots-creamery/fo76_cow_spots_creamery_13.png" alt="外観2"></div>
                    <div class="gallery-item"><img src="images/note_extracted/cow-spots-creamery/fo76_amy_kerry.jpg" alt="エイミー"></div>
                    <div class="gallery-item"><img src="images/note_extracted/cow-spots-creamery/fo76_too_much_noise.png" alt="ホロテープ"></div>
                    <div class="gallery-item"><img src="images/note_extracted/cow-spots-creamery/fo76_cow_spots_creamery_gnome.png" alt="ノーム"></div>
                </div>
            </div>

            <div class="quote-box">
                <b>感想</b><br><br>
                カラフルでかわいらしい巨大アイスクリームが目を引く建物ですが、フェラル・グールがうろついているというFalloutらしいギャップが最高です。クリームが大量に手に入るので、料理好きの居住者にはたまらない巡回スポットの一つですね！空調設備の「うるさすぎる！」ノイズも健在です。
            </div>`;
    await processArticle('cow-spots-creamery', 'Cow Spots Creamery', 'カウスポット乳製品製造所', [
        'FO76_Cow_Spots_Creamery.png', 'FO76_Cow_Spots_Creamery_13.png', 'FO76_Cow_Spots_Creamery_sign.png',
        'FO76_Big_ol_ice_cream_cone.png', 'FO76_Cow_Spots_Creamery_(1).jpg', 'FO76_Amy_Kerry.jpg',
        'FO76_Cow_Spots_Creamery_gnome.png', 'FO76_Too_much_noise.png'
    ], csHtml);

    const diHtml = `
            <h2>概要</h2>
            <p>
                <b>デスクロー・アイランド</b>（Deathclaw Island）は、アパラチアの森林地帯にあるロケーションである。
            </p>

            <h2>背景</h2>
            <p>
                その名の通り、島の中心にデスクローが住み家に選んだ中洲の島である。デスクローは地面の下に巣を作り、不用意に足を踏み入れた旅行者や探検家を待ち伏せしては襲い掛かる。
            </p>

            <h2>レイアウト</h2>
            <p>
                プレイヤーが十分に近づくかセンサーの近くに行くまでデスクローは地下の巣に身を潜めているが、ある地点に達すると地面から立ち上がり島を歩き始める。東岸の北端付近には、血まみれの白骨死体が3体転がっているピクニック場がある。ここには川を見下ろすライト付きの屋根付きベンチもある。巣の東側、丸太のすぐ隣にはキャップ箱（Caps stash）が配置されている。
            </p>
            <p>
                西岸には、追加の白骨死体の近くに鍵付き金庫（レベル3）、ダッフルバッグ2つ、そして工業用トランクを積んだ座礁船がある。また、デイリークエスト『Ecological Balance』で必要となるホロテープを取得するデータセンサーもこの近くに設置されている。
            </p>

            <h2>注目の戦利品</h2>
            <ul>
                <li>Vault-Tecバブルヘッドのスポーン候補：島北西部の小屋の屋根の角。</li>
                <li>雑誌のスポーン候補：デスクローの巣の近くのスーツケースに隣接。（※まれに地面に埋まっていることがあるが、インタラクトは可能）</li>
                <li>「ブラックチタン」稼ぎ：確定で素材を落とすため、初期〜中盤のパワーアーマー作成に最適な供給源。</li>
            </ul>

            <div class="gallery-section">
                <h2>GALLERY_</h2>
                <div class="gallery-grid">
                    <div class="gallery-item"><img src="images/note_extracted/deathclaw-island/f76_deathclaw_island.png" alt="島のデスクロー"></div>
                    <div class="gallery-item"><img src="images/note_extracted/deathclaw-island/fo76_location_19521_13.png" alt="死体のピクニック"></div>
                    <div class="gallery-item"><img src="images/note_extracted/deathclaw-island/fo76_location_19521_24.png" alt="景色"></div>
                    <div class="gallery-item"><img src="images/note_extracted/deathclaw-island/fo76_deathclaw_island__bobblehead.png" alt="バブルヘッド"></div>
                </div>
            </div>

            <div class="quote-box">
                <b>感想</b><br><br>
                レベルが一桁だった初心者ホルトの誰もが一度はデス・パニックに陥る、アパラチアの通過儀礼的なロケーションですね。ただのピクニック島かと思いきや、文字通り「デスクローの島」というストレートなネーミングに後から冷や汗をかく最高のスポットです！ブラックチタン欲しさに何度も彼に決闘を挑んだのは良い思い出です。
            </div>`;
    await processArticle('deathclaw-island', 'Deathclaw Island', 'デスクロー・アイランド', [
        'FO76_Deathclaw_Island.png', 'Deathclaw_Island_map.png', 'F76_Deathclaw_Island.png',
        'FO76_Deathclaw_island._bobblehead.png', 'FO76_Location_19521_13.png', 'FO76_Location_19521_24.png',
        'FO76_Location_19521_23.png'
    ], diHtml);
}
run();
