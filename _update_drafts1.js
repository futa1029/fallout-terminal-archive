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
        '<div style="margin-top: 30px; border-top: 1px dashed',
        '<div style="margin-top:30px;border-top:1px dashed',
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
    const wcbHtml = `
            <h2>概要</h2>
            <p>
                <b>ウェスト・チャールストン・ブリッジ</b>（West Charleston Bridge）は、アパラチアの森林地帯にある未マークのロケーションである。
            </p>

            <h2>背景</h2>
            <p>
                チャールストン近郊にある、ポセイドン・エネルギープラントWV-06とチャールストン埋立地の両方への入り口として機能していた道路橋。
            </p>

            <h2>レイアウト</h2>
            <p>
                カナワ川にかかる橋であったが、眼下の干上がった川床に向けて崩落している。東側の断崖にはキャンプ場があり、ここではB.O.S.第一遠征隊のイニシエイトであるフェルトン・リードが利用していることがある。東側の橋の左手には、ガードレールを突き破って墜落したバンがあり、後部には様々なアイテムが積まれている。
            </p>

            <h2>備考</h2>
            <ul>
                <li>『Fallout 76 Vault Dweller's Survival Guide』では、この場所が名称付きで言及されている。</li>
            </ul>

            <h2>登場作品</h2>
            <p>
                ウェスト・チャールストン・ブリッジは<a href="fallout76.html" class="auto-link">Fallout 76</a>にのみ登場する。
            </p>
            
            <!-- ===== ギャラリー ===== -->
            <div class="gallery-section">
                <h2>GALLERY_</h2>
                <div class="gallery-grid">
                    <div class="gallery-item"><img src="images/note_extracted/west-charleston-bridge/fo76_west_charleston_bridge_2.png" alt="風景"></div>
                    <div class="gallery-item"><img src="images/note_extracted/west-charleston-bridge/fo76_west_charleston_bridge_3.png" alt="風景"></div>
                    <div class="gallery-item"><img src="images/note_extracted/west-charleston-bridge/fo76_west_charleston_bridge_4.png" alt="風景"></div>
                    <div class="gallery-item"><img src="images/note_extracted/west-charleston-bridge/fo76_west_charleston_bridge_8.png" alt="風景"></div>
                </div>
            </div>

            <div class="quote-box">
                <b>感想</b><br><br>
                チャールストンの歴史を感じさせる崩れ落ちた橋です。水が干上がった川床を覗き込むと、かつての生活を思わせる残骸が転がっており、世紀末のアパラチアの荒涼とした雰囲気を堪能できる隠れたスポットですね。
            </div>`;
    await processArticle('west-charleston-bridge', 'West Charleston Bridge', 'ウェスト・チャールストン・ブリッジ', [
        'FO76_West_Charleston_Bridge_7.png', 'Charleston_map.png', 'FO76_West_Charleston_Bridge_2.png',
        'FO76_West_Charleston_Bridge_3.png', 'FO76_West_Charleston_Bridge_4.png', 'FO76_West_Charleston_Bridge_5.png',
        'FO76_West_Charleston_Bridge_8.png'
    ], wcbHtml);

    const cmHtml = `
            <h2>概要</h2>
            <p>
                <b>クランシー邸宅</b>（Clancy Manor）は、アパラチアの森林地帯にあるロケーションである。
            </p>

            <h2>背景</h2>
            <p>
                毒の谷（Toxic Valley）の端の森の中に隠されている歴史的な邸宅。大戦後の大半の歴史において放棄されてきたが、一時的にレイダーの拠点として利用されていた。2103年、復活したモスマン教団の安息の地として再び占拠され、彼らは邸宅の周囲を教団特有の装飾で埋め尽くした。
            </p>

            <h2>レイアウト</h2>
            <p>
                クランシー邸宅は、大戦後に要塞化された大きな2階建ての家である。家中の家具はホコリ除けの布で覆われているか、壊れている。1階には、キッチンにつながる広々としたダイニング兼リビングエリアがある。この部屋の箱の中には、バブルガムベアやクアンタムベアを含むいくつかのテディベアがある。『Wastelanders』アップデート前は、彼らは料理番組を撮影しているかのように並べられていたが、現在は壁際に移動させられている。
            </p>
            <p>
                2階には、家の中の階段、または外の即席のランプからアクセスできる。2階の部屋には細工師の作業台があり、工具や様々なジャンク品が置かれた棚もある。この階の外側にある階段から屋根に上がることができる。クラフト設備については、邸宅の裏のポーチのさらに後ろにケミストリーステーションがある。
            </p>
            <p>
                『Wastelanders』のアップデートに伴い、この邸宅は劇的な変化を遂げた。カルト教徒たちはここを要塞化された拠点に変え、木々、茂み、そしてあらゆる大きさの骨で飾り立てた。母屋の至る所にモスマンの卵のクラッチが配置され、邸宅を囲む前哨基地にはカルトの歩哨が立っている。
            </p>

            <h2>注目の戦利品</h2>
            <ul>
                <li>ホロテープ「カルト教徒 - 救済」：2階西側の寝室</li>
                <li>ホロテープ「第7章」：キッチンの棚の上</li>
                <li>メモ「ロドニーの詩」：2階角のバレル（樽）の上</li>
                <li>クリスタルの酒類デキャンタ：合計18個配置されており、水晶（クリスタル）集めに最適なロケーション。</li>
            </ul>
            
            <!-- ===== ギャラリー ===== -->
            <div class="gallery-section">
                <h2>GALLERY_</h2>
                <div class="gallery-grid">
                    <div class="gallery-item"><img src="images/note_extracted/clancy-manor/f76wl_clancy_manor_1.png" alt="クランシー邸宅"></div>
                    <div class="gallery-item"><img src="images/note_extracted/clancy-manor/fo76wl_clancy_manor__chapter_7_.png" alt="第7章"></div>
                    <div class="gallery-item"><img src="images/note_extracted/clancy-manor/fo76wl_clancy_manor__rodney_s_poem_.png" alt="ロドニーの詩"></div>
                    <div class="gallery-item"><img src="images/note_extracted/clancy-manor/f76wl_clancy_manor_3.png" alt="内装"></div>
                    <div class="gallery-item"><img src="images/note_extracted/clancy-manor/fo76_clancy_manor_bears.png" alt="テディベア"></div>
                </div>
            </div>

            <div class="quote-box">
                <b>感想</b><br><br>
                森林地帯と毒の谷の境界に佇む、モスマン教団に乗っ取られた不気味な邸宅です。Wastelandersによる変貌ぶりが凄まじく、探索するとそこかしこに狂気の痕跡が見られます。クリスタルが大量に拾える美味しい場所でもありますね。
            </div>`;
    await processArticle('clancy-manor', 'Clancy Manor', 'クランシー邸宅', [
        'F76WL_Clancy_Manor_1.png', 'Clancy_Manor_map.png', 'F76WL_Clancy_Manor_3.png',
        'FO76WL_Clancy_Manor_(Chapter_7).png', 'FO76WL_Clancy_Manor_(Rodney\'s_poem).png',
        'FO76_Clancy_Manor_bears.png', 'F76_Clancy_Manor_2.png'
    ], cmHtml);
}
run();
