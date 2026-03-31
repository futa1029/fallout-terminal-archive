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
          const page = Object.values(json.query.pages)[0];
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

    let startIdx = content.indexOf('<h1>');
    if (startIdx === -1) { console.error('No H1 found in', slug); return; }
    startIdx = content.indexOf('</h1>', startIdx) + 5;

    const footerLines = [
        '<div style="margin-top: 30px',
        '<div style="margin-top:30px',
        '<div class="comments-section"'
    ];

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
    const eklHtml = `
            <h2>概要</h2>
            <p>
                <b>イースト・カナー監視塔</b>（East Kanawha lookout）は、アパラチアの森林地帯にあるロケーションである。
            </p>
            <h2>背景</h2>
            <p>
                戦前のレンジャーの監視地点であり、アマチュア無線、地図、そしてその後残されたレンジャーの衣装がある。
            </p>
            <h2>レイアウト</h2>
            <p>
                塔の頂上にはおもちゃ（木製ブロック、エイリアンのおもちゃ、おもちゃの車、おもちゃのトラック）に囲まれた民間人の死骸がある。部屋の反対側には、きれいなマットレスの隣に小さな哺乳瓶と赤ちゃん用のガラガラが置かれている。塔の底近くには「my angel」と木製ブロックで綴られたお墓がある。
            </p>
            <p>
                部屋の隅には鍵のかかったフットロッカー（必要スキル0）がある。レンジャー・ハットが折りたたみ式テーブルの上に置かれている。レンジャーの衣装は、塔の外側にある木箱の上と、周辺地域の地図の上にある。塔の外側で北西を向いているいくつかの箱の上にキャップ箱が出現する可能性がある。
            </p>
            
            <div class="gallery-section">
                <h2>GALLERY_</h2>
                <div class="gallery-grid">
                    <div class="gallery-item"><img src="images/note_extracted/east-kanawha-lookout/f76_east_kanawha_lookout.png" alt="外観"></div>
                    <div class="gallery-item"><img src="images/note_extracted/east-kanawha-lookout/fo76_kaw_lookout_citizen.png" alt="死体"></div>
                    <div class="gallery-item"><img src="images/note_extracted/east-kanawha-lookout/fo76_kaw_lookout_gravesite.png" alt="お墓"></div>
                </div>
            </div>

            <div class="quote-box">
                <b>感想</b><br><br>
                塔の下にある赤ちゃんのおもちゃで飾られた小さなお墓と、塔の上に寄り添うように残された親の死体。Falloutおなじみの言葉なき環境ストーリーテリングの中でも一際悲しく、胸が締め付けられる光景が広がるロケーションです。
            </div>`;
    await processArticle('east-kanawha-lookout', 'East Kanawha lookout', 'イースト・カナー監視塔', [
        'FO76_East_Kanawha_lookout.png', 'East_Kanawha_Lookout_map.png', 'F76_East_Kanawha_Lookout.png',
        'FO76_K_Lookout_map.png', 'FO76_Kaw_lookout_citizen.png', 'FO76_Kaw_lookout_gravesite.png'
    ], eklHtml);

    const vtarHtml = `
            <h2>概要</h2>
            <p>
                <b>Vault-Tec農業研究センター</b>（Vault-Tec Agricultural Research Center）は、アパラチアの森林地帯にあるロケーションである。
            </p>
            <h2>背景</h2>
            <p>
                作物の自動化と肥料の実験のために設立された戦前の研究開発施設で、フラットウッズの小さな町における主要なランドマークの一つだった。カスタマイズされたMr. ハンディロボットである「Mr.ファームハンド」の部隊が、人間の監督なしでほぼすべての作業（肥料やり、種まき、収穫など）を自動で行っていた。
            </p>
            <p>
                大戦により施設はオフラインとなったが、飢えた生存者を救うためにレスポンダーの協力のもとマクファデンによって再稼働した。しかし、マクファデンには技術的な専門知識がなく、ただロボットを再起動させることしかできなかった。彼のスキル不足が原因でファームハンドは暴走し、施設の防衛システムが周囲のあらゆる人間に攻撃を加えるようになってしまった。
            </p>
            <h2>レイアウト</h2>
            <p>
                センターは3階建て（地下室を含む）のメインビルと、植物がもはやない周囲の小屋と温室で構成されている。メインビルには正面玄関、裏の温室のドア、または屋根のドアからアクセスできる。
            </p>
            <p>
                1階にはロッカールーム、バスルーム、いくつかの水耕栽培ラボ（ケミストリーステーションあり）、および受付エリアがある。受付デスクには「監督官のログ」のホロテープがある。2階には複数のオフィスがあり、そのうちの1つにマクファデンのターミナルがある。
            </p>
            <p>
                地下室に続く階段の下には、白衣を着てネズミ用の毒を持った白骨死体がある。農業センターのメインフレームターミナルもここにある。裏手にある3つの温室には、園芸ノームや肥料の袋などが残されている。
            </p>

            <h2>注目の戦利品</h2>
            <ul>
                <li>ホロテープ「<b>監督官のログ - フラットウッズ</b>」：1階フロントカウンター</li>
                <li>4つのVault-Tecバブルヘッドスポーン地点（トイレ、冷蔵庫内、地下等）</li>
                <li>4つの雑誌スポーン地点</li>
                <li>無数のMr.ファームハンド（鉄と鉛の優秀な供給源）</li>
            </ul>

            <div class="gallery-section">
                <h2>GALLERY_</h2>
                <div class="gallery-grid">
                    <div class="gallery-item"><img src="images/note_extracted/vault-tec-agricultural-research-center/f76_vt_agcenter_1.png" alt="外観"></div>
                    <div class="gallery-item"><img src="images/note_extracted/vault-tec-agricultural-research-center/f76_vt_agcenter_3.png" alt="温室"></div>
                    <div class="gallery-item"><img src="images/note_extracted/vault-tec-agricultural-research-center/thevault-tecarctt1.png" alt="地下"></div>
                    <div class="gallery-item"><img src="images/note_extracted/vault-tec-agricultural-research-center/note_to_mac.jpg" alt="マックへのメモ"></div>
                    <div class="gallery-item"><img src="images/note_extracted/vault-tec-agricultural-research-center/note_to_marge.jpg" alt="マージへのメモ"></div>
                </div>
            </div>

            <div class="quote-box">
                <b>感想</b><br><br>
                フラットウッズでのレスポンダー訓練クエストにおいて、誰もが必ず立ち寄ることになる場所です。暴走するMr.ファームハンドの独特なプロパガンダ風のセリフは耳にこびりつきますね。序盤の鉛やジャンク集めに非常にお世話になる施設です。
            </div>`;
    await processArticle('vault-tec-agricultural-research-center', 'Vault-Tec Agricultural Research Center', 'Vault-Tec農業研究センター', [
        'Vault-Tec_Agricultural_Research_Center.jpg', 'Vault-Tec_Agricultural_Research_Center_map.png',
        'FO76_Flatwoods_Overview_4.png', 'FO76_VT_Univ_agrnifsk_2.png', 'F76_VT_AgCenter_1.png',
        'F76_VT_AgCenter_2.png', 'F76_VT_AgCenter_3.png', 'FO76_VT_AgCenter_teapot_ad.png',
        'Note_to_Mac.jpg', 'Note_to_Marge.jpg', 'TheVault-TecARCTT1.png'
    ], vtarHtml);

    const flHtml = `
            <h2>概要</h2>
            <p>
                <b>フラットウッズ監視塔</b>（Flatwoods lookout）は、アパラチアの森林地帯にあるロケーションである。
            </p>
            <h2>背景</h2>
            <p>
                この監視塔と周囲のキャビンはかつてパペットフェイス（ウェイストランダーであり、犬のチェスウィックの飼い主）によって占有されていた。パペットフェイスは行方不明になった友人のスクーターを探しており、チェスウィックを残してきたウィクソン農場への帰還を望んでいたが、最終的な運命は不明である。現在、塔の周辺は4人の入植者によって占拠されている。
            </p>
            <h2>レイアウト</h2>
            <p>
                塔の麓には鍵のかかった爆発物の木枠箱がある。近くにはいくつかキャビンがあり、そのうちの1つにはアコースティックギターと「私たちの元へ戻って（Come back to us）」というメモがある。
            </p>
            <p>
                他のアパラチアの監視塔と同様に、最上階の縁に立って「調査」を実行することで、マップ上の未発見ロケーションをマーキングすることができる。
            </p>

            <div class="gallery-section">
                <h2>GALLERY_</h2>
                <div class="gallery-grid">
                    <div class="gallery-item"><img src="images/note_extracted/flatwoods-lookout/fo76_flatwoods_lookout.png" alt="外観"></div>
                    <div class="gallery-item"><img src="images/note_extracted/flatwoods-lookout/fo76_flatwoods_lookout_interior.png" alt="内部"></div>
                    <div class="gallery-item"><img src="images/note_extracted/flatwoods-lookout/fo76_flatwoods_lookout_cabin_nearby_.jpg" alt="ギターとメモ"></div>
                </div>
            </div>

            <div class="quote-box">
                <b>感想</b><br><br>
                見晴らしの良い監視塔ですが、パペットフェイスと彼らの愛犬であるチェスウィックに関する悲しいドラマが残された場所でもあります。山頂からの景色を堪能しつつ、未発見の場所をマップに記すことで序盤の探索を大いに助けてくれます。
            </div>`;
    await processArticle('flatwoods-lookout', 'Flatwoods lookout', 'フラットウッズ監視塔', [
        'FO76_Flatwoods_lookout.png', 'Flatwoods_Lookout_map.png', 'FO76_Flatwoods_lookout_interior.png',
        'FO76_Flatwoods_lookout_(cabin_nearby).jpg'
    ], flHtml);

    const frHtml = `
            <h2>概要</h2>
            <p>
                <b>フラットウッズ・リバー</b>（Flatwoods River）は、アパラチアの森林地帯にある未マークのロケーションである。
            </p>
            <h2>背景</h2>
            <p>
                フラットウッズの町を横断するこの川は、レスポンダーのキーシャ・マクダーモットが主導する水質汚染テストの対象であった。彼女の研究はフラットウッズの水の安全プロトコルと水文学実験に焦点を当てていた。その調査は彼女をこの浅い川の岸辺へと導いたが、今では彼女の死体と水質調査キットが川岸に残されているのみである。
            </p>
            <h2>レイアウト</h2>
            <p>
                川はニューリバーの枯れ川床との合流点から始まり、フラットウッズの町を北上するように流れる。岸辺にはいくつかの即席のキャンプや利用できるクッキングステーションが並んでいる。また、ブラッドリーフの群生地でもある。
            </p>

            <div class="gallery-section">
                <h2>GALLERY_</h2>
                <div class="gallery-grid">
                    <div class="gallery-item"><img src="images/note_extracted/flatwoods-river/fo76_flatwoods_river_6.png" alt="川"></div>
                    <div class="gallery-item"><img src="images/note_extracted/flatwoods-river/fo76_flatwoods_river_north_1.png" alt="川"></div>
                    <div class="gallery-item"><img src="images/note_extracted/flatwoods-river/fo76_flatwoods_river_5.png" alt="川"></div>
                    <div class="gallery-item"><img src="images/note_extracted/flatwoods-river/fo76_flatwoods_river_7.png" alt="川"></div>
                </div>
            </div>

            <div class="quote-box">
                <b>感想</b><br><br>
                フラットウッズを流れる静かな川ですが、レスポンダー訓練クエストでキーシャの足跡を追って、すべての初心者がここで「沸騰させた水」を作ることになります。水中に隠れるマイアラークや病気のリスクを恐れながら、水を汲んだ懐かしい記憶が呼び起こされます。
            </div>`;
    await processArticle('flatwoods-river', 'Flatwoods River', 'フラットウッズ・リバー', [
        'FO76_Flatwoods_River_6.png', 'FO76_Flatwoods_River_north_1.png', 'FO76_Flatwoods_River_5.png',
        'FO76_Flatwoods_River_4.png', 'FO76_Flatwoods_River_3.png', 'FO76_Flatwoods_River_7.png',
        'FO76_Flatwoods_River_1.png', 'FO76_Fwood_Riv_1.png', 'FO76_Fwood_Riv_2.png', 'FO76_Fwood_Riv_3.png'
    ], frHtml);

    const fibHtml = `
            <h2>概要</h2>
            <p>
                <b>藤仁屋情報基地</b>（Fujiniya Intelligence Base）は、アパラチアの森林地帯にあるロケーションである。
            </p>

            <h2>背景</h2>
            <p>
                ママ・ドルスの食品工場の地下深くに建設された、中国共産党軍の秘密諜報バンカー。この基地は、ウェストバージニアの核サイロや工場都市に潜入し破壊することを目的とした「トリニタイト作戦」の一部であった。秘密を維持するため、基地へのアクセスは厳しく管理され、不審者は残酷な尋問ののち12時間以内に処刑されるという無慈悲なセキュリティプロトコルのもと運用されていた。
            </p>
            <p>
                監視システムやリベレイタードローンの製造および改良工場としても機能しており、「Mk 0-V」リベレイターの大量生産に成功していた。大戦で本国からの連絡が途絶えた後、生き残った人民解放軍の工作員たちはエンクレイヴ（ジェファーソン・グレイ配下）の襲撃を受け、降伏を拒否してその大半が処刑された。その後、エンクレイヴはこの施設を隠れ蓑にし、恐怖の噂を流す基地として利用した。
            </p>

            <h2>レイアウト</h2>
            <p>
                バンカーはママ・ドルス工場の外にある偽の吸水パイプ（入り口）からアクセスでき、開けるには工場長室のキーカードが必要となる。入り口にはタレットが防衛しており、チェックポイントを抜けて下層へ進むことができる。
            </p>
            <p>
                階段を降りた主要な地下フロアには、廃棄された機械、宿舎、そして夥しい数のリベレイターが徘徊している。さらに階段を下ると、中国の工作員たちがアパラチアのサイロの謎を解こうとした情報分析室や、リベレイターの製造・発進ベイに通じている。医務室には、エンクレイヴの部下に捕らえられ拷問された工作員の残骸が生々しく残されている。
            </p>

            <h2>注目の戦利品</h2>
            <ul>
                <li>Vault-Tecバブルヘッドのスポーン候補が4箇所に配置されている。</li>
                <li>「<b>中国軍将校の剣</b>」：入り口の棚、武器庫の中など基地内に複数本置かれている。</li>
                <li>設計図やレシピの出現ポイント多数（ステルス研究ラボ、医務室など）。</li>
                <li>「パワーアーマー」スポーン候補：リベレイター射出ベイにあるキーカードロックされた武器庫内に設置。</li>
                <li>「フュージョン・コア」：最下層のステルス研究室近くにあるコンソール機の中。</li>
            </ul>

            <div class="gallery-section">
                <h2>GALLERY_</h2>
                <div class="gallery-grid">
                    <div class="gallery-item"><img src="images/note_extracted/fujiniya-intelligence-base/f76_fujiniya_1.png" alt="外観"></div>
                    <div class="gallery-item"><img src="images/note_extracted/fujiniya-intelligence-base/f76_fujiniya_2.png" alt="メインホール"></div>
                    <div class="gallery-item"><img src="images/note_extracted/fujiniya-intelligence-base/f76_fujiniya_4.png" alt="情報室"></div>
                    <div class="gallery-item"><img src="images/note_extracted/fujiniya-intelligence-base/f76_fujiniya_7.png" alt="ラボ"></div>
                    <div class="gallery-item"><img src="images/note_extracted/fujiniya-intelligence-base/f76_fujiniya_9.png" alt="発進ベイ"></div>
                    <div class="gallery-item"><img src="images/note_extracted/fujiniya-intelligence-base/powerarmor_fujiniya_intelligence_base.png" alt="PA"></div>
                </div>
            </div>

            <div class="quote-box">
                <b>感想</b><br><br>
                ママ・ドルスのイベントをこなしていたプレイヤーが、ふと謎のパイプに入った途端に巨大な中国軍基地に出くわす最高の探索サプライズが味わえるロケーションです。大量のリベレイターの猛攻をくぐり抜ければ、中国軍将校の剣などの貴重な戦利品が豊富に隠されたウマ味の深いダンジョンとなっています。
            </div>`;
    await processArticle('fujiniya-intelligence-base', 'Fujiniya Intelligence Base', '藤仁屋情報基地', [
        'F76_Fujiniya_1.png', 'Mama_Dolce\'s_Food_Processing_map.png', 'FO76_Fujiniya_Intelligence_Base_(entrance).png',
        'FO76_Fujiniya_Intelligence_Base_(door).png', 'FO76_Fujiniya_Intelligence_Base_(intel_room).png',
        'FO76_Fujiniya_Intelligence_Base_(med_lab).png', 'FO76_Fujiniya_Intelligence_Base_(orlop).png',
        'FO76_Fujiniya_Intelligence_Base_(Virginia_map).png', 'F76_Fujiniya_2.png', 'F76_Fujiniya_3.png',
        'F76_Fujiniya_4.png', 'F76_Fujiniya_5.png', 'F76_Fujiniya_6.png', 'F76_Fujiniya_7.png',
        'F76_Fujiniya_8.png', 'F76_Fujiniya_9.png', 'F76_Fujiniya_10.png', 'F76_Fujiniya_11.png',
        'PowerArmor_Fujiniya_Intelligence_Base.png', 'FO76_Fujiniya_Intelligence_Base_perk_magazine_1.png',
        'FO76_Fujiniya_Intelligence_Base_plan_1.png'
    ], fibHtml);
}
run();
