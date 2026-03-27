// 荒れた境域 Unmarked Locations バッチ生成（前半13件）
const fs = require('fs');
const path = require('path');
const https = require('https');
function downloadImage(url, filepath) { return new Promise((resolve, reject) => { fs.mkdirSync(path.dirname(filepath), { recursive: true }); const mod = url.startsWith('https') ? https : require('http'); mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => { if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) { downloadImage(res.headers.location, filepath).then(resolve).catch(reject); return; } if (res.statusCode !== 200) { resolve(false); return; } const ws = fs.createWriteStream(filepath); res.pipe(ws); ws.on('finish', () => { ws.close(); resolve(true); }); ws.on('error', reject); }).on('error', reject); }); }
function getImageUrl(filename) { return new Promise((resolve) => { const url = `https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`; https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => { let data = ''; res.on('data', c => data += c); res.on('end', () => { try { const j = JSON.parse(data); const page = Object.values(j.query.pages)[0]; resolve(page.imageinfo?.[0]?.url || null); } catch(e) { resolve(null); } }); }).on('error', () => resolve(null)); }); }
const template = fs.readFileSync('F:\\Fallout\\prospect-hill.html', 'utf8');
const cssBlock = template.substring(template.indexOf('<style>'), template.indexOf('</style>') + '</style>'.length);

const articles = [
  {
    slug: 'allegheny-mountains', title: 'Allegheny Mountains', titleJa: 'アレゲニー山脈',
    wikiSlug: 'Allegheny_Mountains', ogDesc: 'アレゲニー山脈 — アパラチアの山岳地帯。',
    mainImg: 'FO76_Landscape_Sav_Divide.png', mapImg: 'Spruce_Knob_map.png', galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','アパラチア'],['最高峰','スプルース・ノブ（標高4863フィート）'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Allegheny Mountains</b>（アレゲニー山脈）は、ウェストバージニア州のアパラチアに属する山岳地帯である。</p>
<div class="quote-box" style="border-left:3px solid var(--accent-color);padding:10px;margin:15px 0;font-style:italic;">「マウンテン・ステートの頂上へようこそ」— ゲーム内看板</div>
<h2>背景</h2><p>スプルース・ノブが最高峰で、海抜4863フィート。モノンガヒラ国有林が管理する展望台が設置されており、下のスプルース・ノブ湖を見渡せる。</p>
<h2>メモ</h2><ul><li>フォート・ディファイアンスの旧名「アレゲニー精神病院」は、この山脈と同じ名前を持つ。</li><li>ホワイトスプリング・リゾートの舞踏室の一つは「アレゲニー・ルーム」と名付けられている。</li></ul>
<h2>舞台裏</h2><p>実在のアレゲニー山脈がモデル。</p>
<div class="quote-box"><b>感想</b><br><br>荒れた境域の骨格をなす山岳地帯。スプルース・ノブからの絶景は76の中でも屈指の美しさです。</div>`,
  },
  {
    slug: 'ammo-dump', title: 'Ammo dump', titleJa: '弾薬庫',
    wikiSlug: 'Ammo_dump', ogDesc: '弾薬庫 — 荒れた境域の隠れた弾薬集積所。',
    mainImg: 'FO76_Ammo_dump_01.png', mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['最寄り','サニートップ・スキー場'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Ammo dump</b>は、荒れた境域のサニートップ・スキー場の北東に位置する未マークロケーションである。</p>
<h2>レイアウト</h2><p>岩の裂け目に隠された小さな弾薬集積所。複数の弾薬箱と爆発物クレートが見つかる。</p>
<div class="quote-box"><b>感想</b><br><br>名前通りの弾薬庫。知る人ぞ知る補給スポットで、弾薬不足の時に立ち寄りたい場所です。</div>`,
  },
  {
    slug: 'barrel-burial', title: 'Barrel burial', titleJa: 'ドラム缶埋葬地',
    wikiSlug: 'Barrel_burial', ogDesc: 'ドラム缶埋葬地 — 荒れた境域の不気味な埋葬現場。',
    mainImg: 'FO76_Barrel_burial_01.png', mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['最寄り','プレザント・バレー・キャビンズ'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Barrel burial</b>は、荒れた境域のプレザント・バレー・キャビンズの近くに位置する未マークロケーションである。</p>
<h2>レイアウト</h2><p>地面に半分埋まったドラム缶の周囲に骸骨が散らばる不気味な場所。放射性廃棄物の不法投棄か、それとも何か別の闇の行為の痕跡か。</p>
<div class="quote-box"><b>感想</b><br><br>ウェイストランドの闇の一端を垣間見るロケーション。誰がなぜここにドラム缶を埋めたのか、想像力が掻き立てられます。</div>`,
  },
  {
    slug: 'clifftop-vista-cabin', title: 'Clifftop vista cabin', titleJa: '崖上展望キャビン',
    wikiSlug: 'Clifftop_vista_cabin', ogDesc: '崖上展望キャビン — 絶景を望む崖の上のキャビン。',
    mainImg: 'FO76_Clifftop_vista_cabin_01.png', mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['最寄り','トップ・オブ・ザ・ワールド'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Clifftop vista cabin</b>は、荒れた境域に位置する未マークのキャビンである。</p>
<h2>レイアウト</h2><p>崖の端に建てられた木造キャビンで、荒れた境域の壮大な景色を一望できる。内部には生活用品が残されている。</p>
<div class="quote-box"><b>感想</b><br><br>絶景を楽しめる隠れ家的キャビン。CAMP建設の参考にしたくなるロケーションです。</div>`,
  },
  {
    slug: 'crossroad', title: 'Crossroad', titleJa: 'クロスロード',
    wikiSlug: 'Crossroad', ogDesc: 'クロスロード — モスマンの教団の野営地。',
    mainImg: 'FO76WL_Sacrament.png', mapImg: 'Sacrament_map.png',
    galleryImgs: [{ f: 'FO76WL_Sacrament_altar.png', c: '祭壇' }],
    infoRows: [['種類','カルティスト拠点'],['地域','荒れた境域'],['勢力','モスマンの教団'],['登場作品','Fallout 76 (Wastelanders)']],
    body: `<h2>概要</h2><p><b>Crossroad</b>（旧名: Sacrament）は、荒れた境域のパレス・オブ・ザ・ワインディング・パスの北東に位置するロケーションである。2103年にモスマンの教団がアパラチアに帰還した際に建設された。</p>
<h2>レイアウト</h2><p>木壁で囲まれた野営地で、中央にモスマンの偶像が鎮座し、5つのモスマンの卵の群れが周囲を取り囲む。壁の外にはレベル3のロックされた金庫がある。西側に3つの小型テントと調理台。</p>
<h2>注目アイテム</h2><ul><li><b>ヌカ・コーラ・クランベリー</b> — 長い足場の下の開いた木箱の中</li><li><b>Vault-Tecボブルヘッド</b>（ランダム）— 高台への階段上の木の手すりの上</li></ul>
<h2>メモ</h2><ul><li>Wastelandersアップデート時は「Sacrament」という名称だったが、Skyline Valleyアップデートで「Crossroad」に改名された。Sacramental Gladeとの区別のためと思われる。</li></ul>
<div class="quote-box"><b>感想</b><br><br>モスマンの教団の不気味な野営地。中央の偶像と卵の群れが異様な雰囲気を醸し出しています。<br>改名の経緯もゲームの世界観の拡張を感じさせる興味深いエピソード。</div>`,
  },
  {
    slug: 'devils-alley', title: "Devil's Alley", titleJa: 'デビルズ・アレー',
    wikiSlug: "Devil%27s_Alley", ogDesc: "デビルズ・アレー — 荒れた境域の不吉な峡谷。",
    mainImg: "FO76_Devil's_Alley_02.png", mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Devil's Alley</b>は、荒れた境域に位置する未マークの峡谷エリアである。</p>
<h2>レイアウト</h2><p>両側を切り立った岩壁に挟まれた狭い通路。不吉な名前にふさわしく、危険なクリーチャーが待ち伏せる地形となっている。</p>
<div class="quote-box"><b>感想</b><br><br>名前の通り不気味な雰囲気の峡谷。狭い通路で敵に遭遇すると逃げ場がないのでスリリングです。</div>`,
  },
  {
    slug: 'dr-eddie-harrisons-house', title: "Dr. Eddie Harrison's house", titleJa: 'エディ・ハリソン医師の家',
    wikiSlug: "Dr._Eddie_Harrison%27s_house", ogDesc: 'エディ・ハリソン医師の家 — 闇のドクターの廃屋。',
    mainImg: "FO76_Dr._Eddie_Harrison's_house_01.png", mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['オーナー','エディ・ハリソン医師'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Dr. Eddie Harrison's house</b>は、荒れた境域に位置する未マークの廃屋である。</p>
<h2>背景</h2><p>エディ・ハリソン医師が住んでいた家。医師の正体と彼がここで何をしていたかは、内部に残された手がかりから推測できる。</p>
<h2>レイアウト</h2><p>荒れた家屋の内部には医療用品や研究の痕跡が残されている。</p>
<div class="quote-box"><b>感想</b><br><br>「ドクター」の称号を持つ人物の家にしては不穏な雰囲気。何を研究していたのか、残された痕跡がゾッとさせます。</div>`,
  },
  {
    slug: 'emmett-mountain-side-tunnel', title: 'Emmett Mountain side tunnel', titleJa: 'エメット・マウンテン側トンネル',
    wikiSlug: 'Emmett_Mountain_side_tunnel', ogDesc: 'エメット・マウンテン側トンネル — 荒れた境域の隠されたトンネル。',
    mainImg: 'FO76_PTS_Emmett_tunnel_01.png', mapImg: null, galleryImgs: [],
    infoRows: [['種類','トンネル'],['地域','荒れた境域'],['勢力','レヴナンツ'],['関連クエスト','リープ・オブ・フェイス'],['登場作品','Fallout 76 (Ghoul Within)']],
    body: `<h2>概要</h2><p><b>Emmett Mountain side tunnel</b>は、エメット・マウンテン処理場の裏手に位置するロケーションである。</p>
<h2>背景</h2><p>リープ・オブ・フェイスのクエスト中にアクセスするトンネルで、レヴナンツの本拠地であるラディアント・ヒルズへの道筋となる。</p>
<div class="quote-box"><b>感想</b><br><br>Ghoul Withinのストーリーでレヴナンツと出会う重要な通過点。秘密の通路感がワクワクします。</div>`,
  },
  {
    slug: 'end-of-the-road', title: 'End of the road', titleJa: '道の終わり',
    wikiSlug: 'End_of_the_road', ogDesc: '道の終わり — 荒れた境域の行き止まりキャンプ。',
    mainImg: 'FO76_End_of_road_01.png', mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>End of the road</b>は、荒れた境域に位置する未マークのキャンプサイトである。</p>
<h2>レイアウト</h2><p>文字通り道が途切れる場所に設けられた小さなキャンプ。行き止まりの道の先に、誰かが最後の場所として選んだ痕跡が残る。</p>
<div class="quote-box"><b>感想</b><br><br>「道の終わり」という名前が暗示する終末感。ウェイストランドの人々がどこへ向かい、どこで止まったのかを考えさせられます。</div>`,
  },
  {
    slug: 'explosives-shrine', title: 'Explosives shrine', titleJa: '爆発物の祠',
    wikiSlug: 'Explosives_shrine', ogDesc: '爆発物の祠 — 爆発物を崇拝する謎の祭壇。',
    mainImg: 'FO76_Explosives_shrine_01.png', mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Explosives shrine</b>は、荒れた境域に位置する未マークロケーションである。</p>
<h2>レイアウト</h2><p>爆発物を神聖なものとして祀った奇妙な祭壇。ミニニュークやグレネードなどが祭壇状に配置されている。</p>
<div class="quote-box"><b>感想</b><br><br>爆発物を崇拝する…ウェイストランドには本当にいろんな信仰があるものです。実用的に美味しい爆発物が手に入る場所でもあります。</div>`,
  },
  {
    slug: 'gardeners-shack', title: "Gardener's shack", titleJa: '庭師の小屋',
    wikiSlug: "Gardener%27s_shack", ogDesc: "庭師の小屋 — 荒れた境域の園芸愛好家の隠れ家。",
    mainImg: "FO76_Gardener's_shack_01.png", mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Gardener's shack</b>は、荒れた境域に位置する未マークの小屋である。</p>
<h2>レイアウト</h2><p>園芸用品が並ぶ小さな小屋。世界が終わっても植物を育て続けた誰かの痕跡が残っている。</p>
<div class="quote-box"><b>感想</b><br><br>核戦争後も庭いじりを続けた人がいた、という事実がFalloutの世界を味わい深くしています。</div>`,
  },
  {
    slug: 'glamping-site', title: 'Glamping site', titleJa: 'グランピングサイト',
    wikiSlug: 'Glamping_site', ogDesc: 'グランピングサイト — 荒れた境域の豪華キャンプ跡。',
    mainImg: 'FO76_Glamping_site_01.png', mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Glamping site</b>は、荒れた境域に位置する未マークのキャンプサイトである。</p>
<h2>レイアウト</h2><p>「グラマラス・キャンピング」の名の通り、通常のキャンプ場より豪華な設備が残る。大戦前の贅沢なアウトドア体験の名残り。</p>
<div class="quote-box"><b>感想</b><br><br>グランピングという現代的なトレンドがFallout世界にも存在していたのが面白い。核の荒野でも贅沢の痕跡は消えません。</div>`,
  },
  {
    slug: 'gnomes-allotment', title: "Gnomes' allotment", titleJa: 'ノームの菜園',
    wikiSlug: "Gnomes%27_allotment", ogDesc: "ノームの菜園 — 庭のノーム人形が守る畑。",
    mainImg: "FO76_Gnomes_allotment_01.png", mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Gnomes' allotment</b>は、荒れた境域に位置する未マークの菜園である。</p>
<h2>レイアウト</h2><p>庭のノーム人形たちが守る小さな菜園。Falloutシリーズお馴染みのノームたちが、今回は農業に従事（？）している。</p>
<div class="quote-box"><b>感想</b><br><br>Falloutと言えばノーム人形！彼らが菜園を「経営」しているというシュールな光景は、シリーズファンへのサービスです。</div>`,
  },
];

function generateHtml(a) {
  const articleId = `note_${a.slug.replace(/-/g, '_')}`;
  const galleryHtml = a.galleryImgs.length > 0 ? `\n<div class="gallery-section">\n<h2>ギャラリー</h2>\n<div class="gallery-grid">\n${a.galleryImgs.map((g, i) => `<div class="gallery-item"><img src="images/note_extracted/${a.slug}/img_gallery_${i+1}${path.extname(g.f)}" alt="${g.c}"><div class="caption">${g.c}</div></div>`).join('\n')}\n</div>\n</div>` : '';
  const rows = a.infoRows.map(r => `<div class="infobox-row"><span class="infobox-label">${r[0]}</span><span>${r[1]}</span></div>`).join('');
  const mapHtml = a.mapImg ? `<img src="images/note_extracted/${a.slug}/img_map_marker.png" alt="マップ上の位置" style="width:100%;margin-top:5px;"><div style="text-align:center;font-style:italic;color:#888;font-size:0.8em;margin-bottom:10px;">マップ上の位置</div>` : '';
  return `<!DOCTYPE html>\n<html lang="ja">\n<head>\n    <meta charset="UTF-8"><title>${a.title} | Overseer Mohi's Terminal</title><link rel="canonical" href="https://www.fallout-jp.com/${a.slug}.html"><meta property="og:type" content="article"><meta property="og:site_name" content="Overseer Mohi's Terminal"><meta property="og:locale" content="ja_JP"><meta property="og:title" content="${a.title} | Overseer Mohi's Terminal"><meta property="og:description" content="${a.ogDesc}"><meta property="og:url" content="https://www.fallout-jp.com/${a.slug}.html"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@IwamotoFuta"><script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">\n${cssBlock}\n</head>\n<body data-article-category="場所" data-article-appearance="Fallout 76">\n    <div class="container">\n        <aside class="infobox"><h3 style="margin-top:0;text-align:center;">${a.title}</h3><img src="images/note_extracted/${a.slug}/img_main.png" alt="${a.title}">${mapHtml}${rows}</aside>\n        <main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="${articleId}" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>${a.title}<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">${a.titleJa}</span></h1>\n            ${a.body}\n${galleryHtml}\n            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">\n                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/${a.wikiSlug}" target="_blank" rel="noopener">${a.title}</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>\n                <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>\n            </div>\n            <div class="comments-section"><h2 class="comments-title">&gt; COMMENTS_</h2><div class="comment-form"><textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力..." oninput="updateCharCount()"></textarea><div class="comment-form-footer"><span class="char-count"><span id="char-count">0</span>/100</span><button class="comment-submit-btn" onclick="submitComment()">SUBMIT &gt;</button></div><div id="comment-msg" class="comment-msg"></div></div><div id="comments-list"></div></div>\n        </main>\n    </div>\n    <div class="lightbox-overlay" id="lightbox" onclick="this.classList.remove('active')"><img id="lightbox-img" src="" alt=""></div>\n    <script>\n        const supabaseUrl = 'https://qkdjufvdeisnunismgaw.supabase.co'; const supabaseKey = 'sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl'; const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);\n        async function toggleLike(btn){const articleId=btn.getAttribute('data-article-id');let isLiked=localStorage.getItem(articleId+'_liked')==='true';btn.disabled=true;if(isLiked){isLiked=false;const{data,error}=await supabaseClient.rpc('decrement_like',{article_id_param:articleId});if(!error){localStorage.setItem(articleId+'_liked',isLiked);updateLikeButton(btn,isLiked,data);}}else{isLiked=true;const{data,error}=await supabaseClient.rpc('increment_like',{article_id_param:articleId});if(!error){localStorage.setItem(articleId+'_liked',isLiked);updateLikeButton(btn,isLiked,data);}}btn.disabled=false;}\n        function updateLikeButton(btn,isLiked,count){const heart=btn.querySelector('.heart');const countSpan=btn.querySelector('.like-count');if(isLiked){btn.classList.add('liked');heart.textContent='♥';}else{btn.classList.remove('liked');heart.textContent='♡';}countSpan.textContent=count;}\n        document.addEventListener('DOMContentLoaded',async()=>{const btn=document.querySelector('.like-button');if(btn){const articleId=btn.getAttribute('data-article-id');const isLiked=localStorage.getItem(articleId+'_liked')==='true';const{data,error}=await supabaseClient.from('likes').select('like_count').eq('article_id',articleId).single();let count=0;if(!error&&data)count=data.like_count;updateLikeButton(btn,isLiked,count);}const lightbox=document.getElementById('lightbox');const lightboxImg=document.getElementById('lightbox-img');document.querySelectorAll('.content img, .infobox img, .gallery-item img').forEach(img=>{img.addEventListener('click',(e)=>{e.stopPropagation();lightboxImg.src=img.src;lightbox.classList.add('active');});});});\n        const _commentArticleId='${articleId}';const _commentArticleName='${a.title.replace(/'/g,"\\'")}';const _commentArticleUrl='${a.slug}.html';\n        const ADMIN_TOKEN_KEY='fallout_admin_token';const ADMIN_PASSWORD='tq7jtq7j';const RATE_LIMIT_KEY='comment_last_posted';const RATE_LIMIT_SEC=60;let _isAdminMode=false;\n        function updateCharCount(){const len=document.getElementById('comment-input').value.length;const el=document.getElementById('char-count');if(el){el.textContent=len;el.style.color=len>90?'#ff6b6b':'var(--accent-color)';}}\n        function relativeTime(s){const d=(Date.now()-new Date(s).getTime())/1000;if(d<60)return'たった今';if(d<3600)return Math.floor(d/60)+'分前';if(d<86400)return Math.floor(d/3600)+'時間前';if(d<86400*7)return Math.floor(d/86400)+'日前';return new Date(s).toLocaleDateString('ja-JP');}\n        function escapeHtml(str){return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}\n        function renderComments(comments){const list=document.getElementById('comments-list');if(!list)return;if(!comments||comments.length===0){list.innerHTML='<div class="comment-empty">まだコメントがありません。最初のコメントを投稿してみましょう！</div>';return;}list.innerHTML=comments.map(c=>\`<div class="comment-item" data-id="\${c.id}"><div class="comment-meta"><span class="comment-time">\${relativeTime(c.created_at)}</span>\${_isAdminMode?\`<button class="comment-delete-btn" onclick="deleteComment('\${c.id}')">&#128465;</button>\`:''}</div><div class="comment-body">\${escapeHtml(c.content)}</div></div>\`).join('');}\n        async function loadComments(){const list=document.getElementById('comments-list');if(!list)return;const{data,error}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_commentArticleId).order('created_at',{ascending:false}).limit(50);if(error){list.innerHTML='<div class="comment-empty">コメントを読み込めませんでした。</div>';return;}renderComments(data||[]);}\n        async function submitComment(){const input=document.getElementById('comment-input');const content=input?input.value.trim():'';if(!content){showCommentMsg('コメントを入力してください。',false);return;}if(content.length>100){showCommentMsg('100文字以内で入力してください。',false);return;}const lastPosted=parseInt(localStorage.getItem(RATE_LIMIT_KEY)||'0');const now=Date.now();if(now-lastPosted<RATE_LIMIT_SEC*1000){showCommentMsg('あと'+Math.ceil((RATE_LIMIT_SEC*1000-(now-lastPosted))/1000)+'秒後に投稿できます。',false);return;}const btn=document.querySelector('.comment-submit-btn');if(btn)btn.disabled=true;const{error}=await supabaseClient.from('comments').insert({article_id:_commentArticleId,article_name:_commentArticleName,article_url:_commentArticleUrl,content:content});if(btn)btn.disabled=false;if(error){showCommentMsg('投稿に失敗しました。',false);return;}localStorage.setItem(RATE_LIMIT_KEY,now.toString());input.value='';updateCharCount();showCommentMsg('コメントを投稿しました！',true);await loadComments();}\n        function showCommentMsg(text,ok){const el=document.getElementById('comment-msg');if(!el)return;el.textContent=text;el.style.color=ok?'var(--accent-color)':'#ff6b6b';setTimeout(()=>{el.textContent='';},3000);}\n        async function deleteComment(commentId){if(!_isAdminMode)return;if(!confirm('このコメントを削除しますか？'))return;const{error}=await supabaseClient.rpc('delete_comment_admin',{comment_id:commentId,admin_token:localStorage.getItem(ADMIN_TOKEN_KEY)||''});if(error){alert('削除失敗: '+error.message);return;}await loadComments();}\n        document.addEventListener('keydown',(e)=>{if(e.ctrlKey&&e.shiftKey&&e.key==='D'){e.preventDefault();if(_isAdminMode){_isAdminMode=false;localStorage.removeItem(ADMIN_TOKEN_KEY);loadComments();alert('管理者モードを終了しました。');return;}const pw=prompt('管理者パスワードを入力してください:');if(!pw)return;if(pw===ADMIN_PASSWORD){_isAdminMode=true;localStorage.setItem(ADMIN_TOKEN_KEY,pw);loadComments();alert('管理者モードに入りました。');}else{alert('パスワードが違います。');}}});\n        document.addEventListener('DOMContentLoaded',()=>{loadComments();});\n    </script>\n    <script src="article-common.js" defer></script>\n</body>\n</html>`;
}
async function main() {
  for (const a of articles) {
    console.log(`\\n📄 生成中: ${a.title}`);
    const imgDir = `F:\\Fallout\\images\\note_extracted\\${a.slug}`;
    fs.mkdirSync(imgDir, { recursive: true });
    const mainUrl = await getImageUrl(a.mainImg);
    if (mainUrl) { await downloadImage(mainUrl, path.join(imgDir, `img_main${path.extname(a.mainImg)}`)); const ext = path.extname(a.mainImg); if (ext !== '.png') { const s = path.join(imgDir, `img_main${ext}`); const d = path.join(imgDir, 'img_main.png'); if (fs.existsSync(s)) fs.renameSync(s, d); } console.log(`  ✅ メイン画像`); }
    if (a.mapImg) { const u = await getImageUrl(a.mapImg); if (u) { await downloadImage(u, path.join(imgDir, 'img_map_marker.png')); console.log(`  ✅ マップ画像`); } }
    for (let i = 0; i < a.galleryImgs.length; i++) { const u = await getImageUrl(a.galleryImgs[i].f); if (u) { await downloadImage(u, path.join(imgDir, `img_gallery_${i+1}${path.extname(a.galleryImgs[i].f)}`)); console.log(`  ✅ ギャラリー ${i+1}`); } }
    fs.writeFileSync(`F:\\Fallout\\${a.slug}.html`, generateHtml(a), 'utf8');
    console.log(`  ✅ HTML完了: ${a.slug}.html`);
  }
  console.log('\\n✅ 荒れた境域Unmarkedバッチ1（13件）完了！');
}
main().catch(e => console.error('エラー:', e));
