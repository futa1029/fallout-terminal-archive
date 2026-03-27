// 荒れた境域 Unmarked Locations バッチ生成（後半13件）
const fs = require('fs');
const path = require('path');
const https = require('https');
function downloadImage(url, filepath) { return new Promise((resolve, reject) => { fs.mkdirSync(path.dirname(filepath), { recursive: true }); const mod = url.startsWith('https') ? https : require('http'); mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => { if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) { downloadImage(res.headers.location, filepath).then(resolve).catch(reject); return; } if (res.statusCode !== 200) { resolve(false); return; } const ws = fs.createWriteStream(filepath); res.pipe(ws); ws.on('finish', () => { ws.close(); resolve(true); }); ws.on('error', reject); }).on('error', reject); }); }
function getImageUrl(filename) { return new Promise((resolve) => { const url = `https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`; https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => { let data = ''; res.on('data', c => data += c); res.on('end', () => { try { const j = JSON.parse(data); const page = Object.values(j.query.pages)[0]; resolve(page.imageinfo?.[0]?.url || null); } catch(e) { resolve(null); } }); }).on('error', () => resolve(null)); }); }
const template = fs.readFileSync('F:\\Fallout\\prospect-hill.html', 'utf8');
const cssBlock = template.substring(template.indexOf('<style>'), template.indexOf('</style>') + '</style>'.length);

const articles = [
  {
    slug: 'halloween-fright-farm', title: 'Halloween fright farm', titleJa: 'ハロウィン恐怖農場',
    wikiSlug: 'Halloween_fright_farm', ogDesc: 'ハロウィン恐怖農場 — ハロウィン装飾で彩られた不気味な農場。',
    mainImg: 'FO76_Halloween_fright_farm_01.png', mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Halloween fright farm</b>は、荒れた境域に位置する未マークのロケーションである。</p>
<h2>レイアウト</h2><p>ハロウィンの装飾で飾り付けられた農場。カボチャのランタン、かかし、不気味な飾りが至る所に。大戦前のハロウィンシーズンの雰囲気がそのまま残っている。</p>
<div class="quote-box"><b>感想</b><br><br>核戦争後もハロウィンの装飾が残っているのがFalloutらしい。ノース・マウンテン監視塔と合わせて「ハロウィン巡り」ができます。</div>`,
  },
  {
    slug: 'halloween-horror-hamlet', title: 'Halloween horror hamlet', titleJa: 'ハロウィンホラー集落',
    wikiSlug: 'Halloween_horror_hamlet', ogDesc: 'ハロウィンホラー集落 — 恐怖のハロウィン装飾に包まれた小さな集落。',
    mainImg: 'FO76_Halloween_horror_hamlet_01.png', mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Halloween horror hamlet</b>は、荒れた境域に位置する未マークのロケーションである。</p>
<h2>レイアウト</h2><p>ハロウィンのホラー装飾で埋め尽くされた小さな集落。恐怖農場よりもさらにホラー寄りの装飾が施されている。</p>
<div class="quote-box"><b>感想</b><br><br>「恐怖農場」のさらに上を行くホラー集落。Falloutの世界では核の恐怖よりもハロウィンの方が怖いかもしれません。</div>`,
  },
  {
    slug: 'hillside-cavern', title: 'Hillside cavern', titleJa: 'ヒルサイド・ケイバーン',
    wikiSlug: 'Hillside_cavern', ogDesc: 'ヒルサイド・ケイバーン — ラディアント・ヒルズに繋がる洞窟。',
    mainImg: 'FO76_PTS_Hillside_cavern_01.png', mapImg: 'Hillside_Cavern_map.png',
    galleryImgs: [{ f: 'FO76_PTS_Hillside_cavern_04.png', c: 'サイロへの道' }, { f: 'FO76_PTS_Hillside_cavern_09.png', c: '漏洩する核弾頭' }],
    infoRows: [['種類','洞窟'],['地域','荒れた境域'],['勢力','レヴナンツ'],['接続先','ラディアント・ヒルズ'],['住人','パーセニア・ブランケンシップ'],['関連クエスト','リープ・オブ・フェイス、フレッシュ・ペア・オブ・ジーンズ'],['登場作品','Fallout 76 (Ghoul Within)']],
    body: `<h2>概要</h2><p><b>Hillside cavern</b>は、荒れた境域の北部に位置する洞窟で、レヴナンツの本拠地ラディアント・ヒルズに接続している。</p>
<h2>背景</h2><p>一見普通の自然洞窟だが、爆薬で破壊されたコンクリート壁を通じてミサイルサイロの一部にアクセスできる。パーセニア・ブランケンシップが研究室兼グール化施設として使用。故障した核弾頭から漏れる放射能を利用して、人間のグール化を促進する実験を行っている。</p>
<h2>レイアウト</h2><p>洞窟入口から線形の通路を降り、最終的にサイロのコンクリート壁を突破した地点に到達。研究室エリアには化学作業台2つ、ティンカー作業台、監視用ベッドがある。北の通路を通って核弾頭の格納室（フレッシュ・ペア・オブ・ジーンズ中のみアクセス可）とラディアント・ヒルズ内部への接続ドアがある。</p>
<h2>注目アイテム</h2><ul><li><b>エメット・マウンテン側トンネルの鍵</b> — リープ・オブ・フェイス中に入手</li></ul>
<div class="quote-box"><b>感想</b><br><br>Ghoul Withinのストーリーの核心となる場所。パーセニアの研究室で核弾頭から放射能を浴びてグール化するシーンは、FO76で最もインパクトのある瞬間の一つです。</div>`,
  },
  {
    slug: 'jaggys-crag', title: "Jaggy's Crag", titleJa: 'ジャギーズ・クラッグ',
    wikiSlug: "Jaggy%27s_Crag", ogDesc: "ジャギーズ・クラッグ — 荒れた境域の岩場。",
    mainImg: "FO76_Jaggy's_Crag_01.png", mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Jaggy's Crag</b>は、荒れた境域に位置する未マークの岩場のロケーションである。</p>
<h2>レイアウト</h2><p>ギザギザとした岩場が特徴的な場所。名前の「Jaggy」（ギザギザ）の通り、鋭い岩が突き出ている。</p>
<div class="quote-box"><b>感想</b><br><br>荒れた境域の険しい地形を体現した岩場。景色を楽しむには良い場所ですが、足を滑らせないよう注意。</div>`,
  },
  {
    slug: 'mountainside-cabin', title: 'Mountainside cabin', titleJa: '山腹のキャビン',
    wikiSlug: 'Mountainside_cabin', ogDesc: '山腹のキャビン — 荒れた境域の山中の小屋。',
    mainImg: 'FO76_Mountainside_cabin_01.png', mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Mountainside cabin</b>は、荒れた境域の山腹に位置する未マークのキャビンである。</p>
<h2>レイアウト</h2><p>山の斜面に建てられた小さなキャビン。周囲には木々が茂り、静かな隠れ家のような雰囲気。</p>
<div class="quote-box"><b>感想</b><br><br>山奥のひっそりとしたキャビン。嵐の日にここで過ごすのも乙かもしれません（放射能の嵐でなければ）。</div>`,
  },
  {
    slug: 'north-mountain-oratory-camp', title: 'North Mountain oratory camp', titleJa: 'ノース・マウンテン演説キャンプ',
    wikiSlug: 'North_Mountain_oratory_camp', ogDesc: 'ノース・マウンテン演説キャンプ — モスマンの教団の集会場。',
    mainImg: 'FO76_North_Mountain_oratory_01.png', mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['勢力','モスマンの教団'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>North Mountain oratory camp</b>は、荒れた境域のノース・マウンテン付近に位置する未マークのロケーションである。</p>
<h2>レイアウト</h2><p>モスマンの教団が演説や集会に使用したキャンプ。教団の象徴や祭壇が設置されている。</p>
<div class="quote-box"><b>感想</b><br><br>モスマンの教団の活動拠点の一つ。山中で秘密の集会を開くというカルト的な雰囲気がゾクゾクします。</div>`,
  },
  {
    slug: 'old-danielson-cabin', title: 'Old Danielson cabin', titleJa: 'オールド・ダニエルソン・キャビン',
    wikiSlug: 'Old_Danielson_cabin', ogDesc: 'オールド・ダニエルソン・キャビン — 荒れた境域の古い山小屋。',
    mainImg: 'FO76_Old_Danielson_cabin_01.png', mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Old Danielson cabin</b>は、荒れた境域に位置する未マークの古いキャビンである。</p>
<h2>レイアウト</h2><p>ダニエルソン家のものだった古い山小屋。長年の風雪に耐えた佇まいが歴史を感じさせる。</p>
<div class="quote-box"><b>感想</b><br><br>「Old」の名にふさわしい、年季の入ったキャビン。ダニエルソン一家はどんな暮らしをしていたのでしょうか。</div>`,
  },
  {
    slug: 'raider-outhouse-and-moat', title: 'Raider outhouse and moat', titleJa: 'レイダーのトイレと堀',
    wikiSlug: 'Raider_outhouse_and_moat', ogDesc: 'レイダーのトイレと堀 — レイダーの独創的な防衛施設。',
    mainImg: 'FO76_Raider_outhouse_01.png', mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['勢力','レイダー'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Raider outhouse and moat</b>は、荒れた境域に位置する未マークのロケーションである。</p>
<h2>レイアウト</h2><p>レイダーが建設した独創的な「防衛施設」。トイレ小屋を中心に堀が掘られている。レイダーならではのブラックユーモア溢れるデザイン。</p>
<div class="quote-box"><b>感想</b><br><br>トイレ小屋の周りに堀を掘るという発想がレイダーの真骨頂。中世の城の攻城戦をトイレでやっているような馬鹿馬鹿しさが最高です。</div>`,
  },
  {
    slug: 'secluded-cave', title: 'Secluded cave', titleJa: '人里離れた洞窟',
    wikiSlug: 'Secluded_cave', ogDesc: '人里離れた洞窟 — 荒れた境域の隠された洞窟。',
    mainImg: 'FO76_Secluded_cave_01.png', mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Secluded cave</b>は、荒れた境域に位置する未マークの洞窟である。</p>
<h2>レイアウト</h2><p>人里離れた場所にひっそりと口を開ける洞窟。内部には何者かが生活していた痕跡がある。</p>
<div class="quote-box"><b>感想</b><br><br>名前の通り「人里離れた」場所。WastelandでのSolo生活を選んだ誰かの隠れ家だったのかもしれません。</div>`,
  },
  {
    slug: 'ski-lift', title: 'Ski lift', titleJa: 'スキーリフト',
    wikiSlug: 'Ski_lift', ogDesc: 'スキーリフト — アパラチアのスキーリフト施設。',
    mainImg: 'FO76_Ski_lift_7.png', mapImg: null, galleryImgs: [],
    infoRows: [['種類','施設'],['地域','荒れた境域'],['関連施設','プレザント・バレー・スキーリゾート、サニートップ・スキー場'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Ski lift</b>は、アパラチアのスキーリゾートに設置された輸送施設である。</p>
<h2>背景</h2><p>大戦前に建設されたスキーリフトで、スキーヤーを斜面の上まで運搬するためのもの。プレザント・バレー・スキーリゾートとサニートップ・スキー場に設置されている。</p>
<h2>特徴</h2><p>チェアとゴンドラが連続する鋼鉄のケーブルループに取り付けられ、複数の中間タワーを経由する。ゴンドラはスキーリゾート以外にもアパラチア各地で家具や仮設トイレとして再利用されている。</p>
<div class="quote-box"><b>感想</b><br><br>止まったスキーリフトのゴンドラがウェイストランド中で再利用されているのが面白い。ボルトン・グリーンズではソファに改造され、カットスロートキャンプではトイレとして使われています。</div>`,
  },
  {
    slug: 'ski-lift-base-camp', title: 'Ski lift base camp', titleJa: 'スキーリフト・ベースキャンプ',
    wikiSlug: 'Ski_lift_base_camp', ogDesc: 'スキーリフト・ベースキャンプ — リフト下のキャンプ。',
    mainImg: 'FO76_Ski_lift_base_camp_01.png', mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['最寄り','トップ・オブ・ザ・ワールド'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Ski lift base camp</b>は、トップ・オブ・ザ・ワールドの西下方に位置する未マークのキャンプである。</p>
<h2>レイアウト</h2><p>錆びた赤いゴンドラが散乱する中規模のキャンプ。スキーリフトの麓に位置し、かつてのスキーヤーやレイダーの痕跡が混在する。</p>
<div class="quote-box"><b>感想</b><br><br>壊れたスキーリフトのゴンドラが散らばる光景は、大戦前のレジャー産業の終焉を象徴しています。</div>`,
  },
  {
    slug: 'tightrope', title: 'Tightrope', titleJa: '綱渡り',
    wikiSlug: 'Tightrope', ogDesc: '綱渡り — 崖の間に張られた命知らずのロープ。',
    mainImg: 'FO76_Tightrope_01.png', mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Tightrope</b>は、荒れた境域に位置する未マークロケーションである。</p>
<h2>レイアウト</h2><p>崖と崖の間にロープが張られた場所。命知らずの誰かがここで綱渡りをしていた形跡がある。落ちたら即死の高さ。</p>
<div class="quote-box"><b>感想</b><br><br>核戦争後の世界でも綱渡りをする人がいるとは…。スリルを求める心は不滅なようです。プレイヤーも挑戦できますが、落下に注意！</div>`,
  },
  {
    slug: 'walking-trail-picnic-area', title: 'Walking trail picnic area and vista', titleJa: '散策路のピクニックエリアと展望台',
    wikiSlug: 'Walking_trail_picnic_area_and_vista', ogDesc: '散策路のピクニックエリアと展望台 — 美しい景色を楽しめるピクニック場。',
    mainImg: 'FO76_Walking_trail_01.png', mapImg: null, galleryImgs: [],
    infoRows: [['種類','unmarked'],['地域','荒れた境域'],['登場作品','Fallout 76']],
    body: `<h2>概要</h2><p><b>Walking trail picnic area and vista</b>は、荒れた境域に位置する未マークのピクニックエリアである。</p>
<h2>レイアウト</h2><p>散策路沿いにあるピクニックテーブルとベンチが設置された休憩エリア。展望ポイントからは荒れた境域の風景を一望できる。</p>
<div class="quote-box"><b>感想</b><br><br>大戦前はハイキング客で賑わっていたであろうピクニック場。今は静かに荒野を見つめる展望台として、探索中の休憩に最適です。</div>`,
  },
];

function generateHtml(a) {
  const articleId = `note_${a.slug.replace(/-/g, '_')}`;
  const galleryHtml = a.galleryImgs.length > 0 ? `\n<div class="gallery-section">\n<h2>ギャラリー</h2>\n<div class="gallery-grid">\n${a.galleryImgs.map((g, i) => `<div class="gallery-item"><img src="images/note_extracted/${a.slug}/img_gallery_${i+1}${path.extname(g.f)}" alt="${g.c}"><div class="caption">${g.c}</div></div>`).join('\n')}\n</div>\n</div>` : '';
  const rows = a.infoRows.map(r => `<div class="infobox-row"><span class="infobox-label">${r[0]}</span><span>${r[1]}</span></div>`).join('');
  const mapHtml = a.mapImg ? `<img src="images/note_extracted/${a.slug}/img_map_marker.png" alt="マップ上の位置" style="width:100%;margin-top:5px;"><div style="text-align:center;font-style:italic;color:#888;font-size:0.8em;margin-bottom:10px;">マップ上の位置</div>` : '';
  return `<!DOCTYPE html>\n<html lang="ja">\n<head>\n    <meta charset="UTF-8"><title>${a.title} | Overseer Mohi's Terminal</title><link rel="canonical" href="https://www.fallout-jp.com/${a.slug}.html"><meta property="og:type" content="article"><meta property="og:site_name" content="Overseer Mohi's Terminal"><meta property="og:locale" content="ja_JP"><meta property="og:title" content="${a.title} | Overseer Mohi's Terminal"><meta property="og:description" content="${a.ogDesc}"><meta property="og:url" content="https://www.fallout-jp.com/${a.slug}.html"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@IwamotoFuta"><script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">\n${cssBlock}\n</head>\n<body data-article-category="場所" data-article-appearance="Fallout 76">\n    <div class="container">\n        <aside class="infobox"><h3 style="margin-top:0;text-align:center;">${a.title}</h3><img src="images/note_extracted/${a.slug}/img_main.png" alt="${a.title}">${mapHtml}${rows}</aside>\n        <main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="${articleId}" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>${a.title}<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">${a.titleJa}</span></h1>\n            ${a.body}\n${galleryHtml}\n            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">\n                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/${a.wikiSlug}" target="_blank" rel="noopener">${a.title}</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>\n                <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>\n            </div>\n            <div class="comments-section"><h2 class="comments-title">&gt; COMMENTS_</h2><div class="comment-form"><textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力..." oninput="updateCharCount()"></textarea><div class="comment-form-footer"><span class="char-count"><span id="char-count">0</span>/100</span><button class="comment-submit-btn" onclick="submitComment()">SUBMIT &gt;</button></div><div id="comment-msg" class="comment-msg"></div></div><div id="comments-list"></div></div>\n        </main>\n    </div>\n    <div class="lightbox-overlay" id="lightbox" onclick="this.classList.remove('active')"><img id="lightbox-img" src="" alt=""></div>\n    <script>\n        const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);\n        async function toggleLike(btn){const articleId=btn.getAttribute('data-article-id');let isLiked=localStorage.getItem(articleId+'_liked')==='true';btn.disabled=true;if(isLiked){isLiked=false;const{data,error}=await supabaseClient.rpc('decrement_like',{article_id_param:articleId});if(!error){localStorage.setItem(articleId+'_liked',isLiked);updateLikeButton(btn,isLiked,data);}}else{isLiked=true;const{data,error}=await supabaseClient.rpc('increment_like',{article_id_param:articleId});if(!error){localStorage.setItem(articleId+'_liked',isLiked);updateLikeButton(btn,isLiked,data);}}btn.disabled=false;}\n        function updateLikeButton(btn,isLiked,count){const heart=btn.querySelector('.heart');const countSpan=btn.querySelector('.like-count');if(isLiked){btn.classList.add('liked');heart.textContent='♥';}else{btn.classList.remove('liked');heart.textContent='♡';}countSpan.textContent=count;}\n        document.addEventListener('DOMContentLoaded',async()=>{const btn=document.querySelector('.like-button');if(btn){const articleId=btn.getAttribute('data-article-id');const isLiked=localStorage.getItem(articleId+'_liked')==='true';const{data,error}=await supabaseClient.from('likes').select('like_count').eq('article_id',articleId).single();let count=0;if(!error&&data)count=data.like_count;updateLikeButton(btn,isLiked,count);}const lightbox=document.getElementById('lightbox');const lightboxImg=document.getElementById('lightbox-img');document.querySelectorAll('.content img, .infobox img, .gallery-item img').forEach(img=>{img.addEventListener('click',(e)=>{e.stopPropagation();lightboxImg.src=img.src;lightbox.classList.add('active');});});});\n        const _commentArticleId='${articleId}';const _commentArticleName='${a.title.replace(/'/g,"\\'")}';const _commentArticleUrl='${a.slug}.html';\n        const ADMIN_TOKEN_KEY='fallout_admin_token';const ADMIN_PASSWORD='tq7jtq7j';const RATE_LIMIT_KEY='comment_last_posted';const RATE_LIMIT_SEC=60;let _isAdminMode=false;\n        function updateCharCount(){const len=document.getElementById('comment-input').value.length;const el=document.getElementById('char-count');if(el){el.textContent=len;el.style.color=len>90?'#ff6b6b':'var(--accent-color)';}}\n        function relativeTime(s){const d=(Date.now()-new Date(s).getTime())/1000;if(d<60)return'たった今';if(d<3600)return Math.floor(d/60)+'分前';if(d<86400)return Math.floor(d/3600)+'時間前';if(d<86400*7)return Math.floor(d/86400)+'日前';return new Date(s).toLocaleDateString('ja-JP');}\n        function escapeHtml(str){return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}\n        function renderComments(comments){const list=document.getElementById('comments-list');if(!list)return;if(!comments||comments.length===0){list.innerHTML='<div class="comment-empty">まだコメントがありません。最初のコメントを投稿してみましょう！</div>';return;}list.innerHTML=comments.map(c=>\`<div class="comment-item" data-id="\${c.id}"><div class="comment-meta"><span class="comment-time">\${relativeTime(c.created_at)}</span>\${_isAdminMode?\`<button class="comment-delete-btn" onclick="deleteComment('\${c.id}')">&#128465;</button>\`:''}</div><div class="comment-body">\${escapeHtml(c.content)}</div></div>\`).join('');}\n        async function loadComments(){const list=document.getElementById('comments-list');if(!list)return;const{data,error}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_commentArticleId).order('created_at',{ascending:false}).limit(50);if(error){list.innerHTML='<div class="comment-empty">コメントを読み込めませんでした。</div>';return;}renderComments(data||[]);}\n        async function submitComment(){const input=document.getElementById('comment-input');const content=input?input.value.trim():'';if(!content){showCommentMsg('コメントを入力してください。',false);return;}if(content.length>100){showCommentMsg('100文字以内で入力してください。',false);return;}const lastPosted=parseInt(localStorage.getItem(RATE_LIMIT_KEY)||'0');const now=Date.now();if(now-lastPosted<RATE_LIMIT_SEC*1000){showCommentMsg('あと'+Math.ceil((RATE_LIMIT_SEC*1000-(now-lastPosted))/1000)+'秒後に投稿できます。',false);return;}const btn=document.querySelector('.comment-submit-btn');if(btn)btn.disabled=true;const{error}=await supabaseClient.from('comments').insert({article_id:_commentArticleId,article_name:_commentArticleName,article_url:_commentArticleUrl,content:content});if(btn)btn.disabled=false;if(error){showCommentMsg('投稿に失敗しました。',false);return;}localStorage.setItem(RATE_LIMIT_KEY,now.toString());input.value='';updateCharCount();showCommentMsg('コメントを投稿しました！',true);await loadComments();}\n        function showCommentMsg(text,ok){const el=document.getElementById('comment-msg');if(!el)return;el.textContent=text;el.style.color=ok?'var(--accent-color)':'#ff6b6b';setTimeout(()=>{el.textContent='';},3000);}\n        async function deleteComment(commentId){if(!_isAdminMode)return;if(!confirm('このコメントを削除しますか？'))return;const{error}=await supabaseClient.rpc('delete_comment_admin',{comment_id:commentId,admin_token:localStorage.getItem(ADMIN_TOKEN_KEY)||''});if(error){alert('削除失敗: '+error.message);return;}await loadComments();}\n        document.addEventListener('keydown',(e)=>{if(e.ctrlKey&&e.shiftKey&&e.key==='D'){e.preventDefault();if(_isAdminMode){_isAdminMode=false;localStorage.removeItem(ADMIN_TOKEN_KEY);loadComments();alert('管理者モードを終了しました。');return;}const pw=prompt('管理者パスワードを入力してください:');if(!pw)return;if(pw===ADMIN_PASSWORD){_isAdminMode=true;localStorage.setItem(ADMIN_TOKEN_KEY,pw);loadComments();alert('管理者モードに入りました。');}else{alert('パスワードが違います。');}}});\n        document.addEventListener('DOMContentLoaded',()=>{loadComments();});\n    </script>\n    <script src="article-common.js" defer></script>\n</body>\n</html>`;
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
  console.log('\\n✅ 荒れた境域Unmarkedバッチ2（13件）完了！');
}
main().catch(e => console.error('エラー:', e));
