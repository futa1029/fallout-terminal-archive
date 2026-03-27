// バッチ記事生成スクリプト — テンプレートベース
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// テンプレートHTMLをprospec-hill.htmlから取得
const templateHtml = fs.readFileSync('F:\\Fallout\\prospect-hill.html', 'utf8');

// テンプレートのCSS+Script部分を抽出
const headEnd = templateHtml.indexOf('</style>') + '</style>'.length + '\n</head>'.length;
const cssBlock = templateHtml.substring(templateHtml.indexOf('<style>'), templateHtml.indexOf('</style>') + '</style>'.length);
const scriptStart = templateHtml.indexOf('<!-- Supabase Scripts');
const scriptBlock = templateHtml.substring(templateHtml.indexOf('<script>\n        const supabaseUrl'), templateHtml.indexOf('</html>'));

// 画像ダウンロード関数
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filepath);
    if (!dir) { reject('no dir'); return; }
    fs.mkdirSync(dir, { recursive: true });
    const mod = url.startsWith('https') ? https : http;
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

// Fandom API画像URL取得
function getImageUrl(filename) {
  return new Promise((resolve, reject) => {
    const url = `https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(data);
          const pages = j.query.pages;
          const page = Object.values(pages)[0];
          if (page.imageinfo && page.imageinfo[0]) resolve(page.imageinfo[0].url);
          else resolve(null);
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

// 記事データ定義
const articles = [
  {
    slug: 'chem-and-hoop-shack',
    title: 'Chem and hoop shack',
    titleJa: 'ケム・アンド・フープ小屋',
    category: '場所',
    appearance: 'Fallout 76',
    region: '積灰の山',
    type: 'unmarked',
    wikiSlug: 'Chem_and_hoop_shack',
    ogDesc: 'ケム・アンド・フープ小屋 — バスケットボールフープとケミストリーステーションのある小屋。',
    images: ['FO76_Chem_and_hoop_shack_01.png', 'Chem_and_hoop_shack_map.png'],
    mainImage: 'FO76_Chem_and_hoop_shack_01.png',
    mapImage: 'Chem_and_hoop_shack_map.png',
    infoboxRows: [
      ['種類', 'unmarked'],
      ['地域', '森林地帯'],
      ['最寄り', 'キャンプ・マクリントック'],
      ['オーナー', 'デイヴィッド、トレヴァー（かつて）'],
      ['設備', 'ケミストリーステーション'],
      ['登場作品', 'Fallout 76'],
    ],
    body: `<h2>概要</h2>
<p><b>Chem and hoop shack</b>は、<b>森林地帯</b>のアパラチアにある未マーク地点である。<br>キャンプ・マクリントックの南に位置する岩壁沿いの小さな小屋で、バスケットボールフープとケミストリーステーションが設置されている。</p>

<h2>背景</h2>
<p>デイヴィッドとトレヴァーがここで遠距離バスケットボール・フープ投げ対決を行った。<br>デイヴィッドが51対4で圧勝した。<br>2103年現在、人間がアパラチアに戻り始め、スカベンジャーがこの小屋に住み着いている。</p>

<h2>レイアウト</h2>
<p>キャンプ・マクリントックの南、岩壁沿いにある非常に小さな小屋で構成されている。<br>小屋の床にはダークカウチがあり、東側の壁にバスケットボールフープが取り付けられている。<br>小屋の南の下り坂にはバスケットボール3個が置かれた木製プラットフォームがあり、デイヴィッドとトレヴァーがここからフープを投げたと推測される。<br>ケミストリーステーションや各種ジャンクアイテム（ラドベアを含む）が見つかる。</p>

<h2>メモ</h2>
<ul>
<li>ヌカシャインを飲んで意識を失った後、ここで目を覚ます可能性がある。</li>
</ul>

<h2>登場作品</h2>
<p>Chem and hoop shackは<b>Fallout 76</b>にのみ登場する。</p>

<div class="quote-box">
<b>感想</b><br><br>
キャンプ・マクリントック南の目立たない岩壁の脇にひっそり佇む小屋。<br>でも中身がなかなか面白くて、バスケットボールフープとスコアボード（51-4！）が残っていて、デイヴィッドとトレヴァーの対決の痕跡が生々しいです。<br>ヌカシャインのブラックアウト先としても機能するので、酔っ払いプレイヤーなら突然ここで目覚めた経験があるかもしれませんね〜。<br>ケミストリーステーションがあるのは地味に便利で、探索の合間に立ち寄れるちょっとした補給ポイントです。
</div>`,
    loreEntry: { name: 'ケム・アンド・フープ小屋', yomi: 'けむあんどふーぷこや', category: '場所', appearance: ['Fallout 76'] },
  },
  {
    slug: 'poseidon-power-substation-px-03',
    title: 'Poseidon power substation PX-03',
    titleJa: 'ポセイドン変電所 PX-03',
    category: '場所',
    appearance: 'Fallout 76',
    region: '毒の峡谷',
    type: 'substation',
    wikiSlug: 'Poseidon_power_substation_PX-03',
    ogDesc: 'ポセイドン変電所 PX-03 — サイトブラボー近くのポセイドン・エナジー変電所。',
    images: ['FO76_Poseidon_Power_substation_PX03.png', 'Poseidon_Power_Substation_PX-03_map.png', 'F76_Poseidon_Power_Substation_PX-03.png', 'F76_Poseidon_Substation_PX03.png'],
    mainImage: 'FO76_Poseidon_Power_substation_PX03.png',
    mapImage: 'Poseidon_Power_Substation_PX-03_map.png',
    infoboxRows: [
      ['種類', '変電所'],
      ['地域', '毒の峡谷'],
      ['オーナー', 'ポセイドン・エナジー（戦前）'],
      ['クリーチャー', 'スコーチ'],
      ['登場作品', 'Fallout 76'],
    ],
    body: `<h2>概要</h2>
<p><b>Poseidon power substation PX-03</b>は、<b>毒の峡谷</b>のアパラチアに位置するロケーションである。<br>ポセイドン・エナジーが戦前に運営していた変電施設で、サイト・ブラボーの危険なほど近くに位置している。</p>

<h2>レイアウト</h2>
<p>フェンスで囲まれた発電施設で、ジャンクアイテムを含む小屋が1つある。<br>複数のスコーチが徘徊している。<br>ポセイドン・エナジー・プラントWV-06を起動すると使用可能になるパワーボックスが設置されている。<br>サイト・ブラボーのすぐ近くという危険なロケーションにある。</p>

<h2>関連施設</h2>
<ul>
<li>ポセイドン・エナジー・プラントWV-06</li>
<li>ポセイドン変電所 PX-01</li>
<li>ポセイドン変電所 PX-02</li>
</ul>

<h2>登場作品</h2>
<p>Poseidon power substation PX-03は<b>Fallout 76</b>にのみ登場する。</p>

<div class="quote-box">
<b>感想</b><br><br>
PX-01、PX-02に続く3番目のポセイドン変電所。<br>サイト・ブラボーのすぐそばにあるので、核ミサイルサイロ攻略のついでに立ち寄ることが多いロケーションです。<br>スコーチがうろついているのはお約束ですが、ジャンク回収ポイントとしてはまずまず。<br>WV-06を稼働させてパワーボックスを有効にすれば、フュージョンコアの生産にもつながるので、エネルギー武器ユーザーには見逃せない場所ですね。
</div>`,
    loreEntry: { name: 'ポセイドン変電所 PX-03', yomi: 'ぽせいどんへんでんしょぴーえっくすぜろさん', category: '場所', appearance: ['Fallout 76'] },
    galleryImages: ['F76_Poseidon_Power_Substation_PX-03.png', 'F76_Poseidon_Substation_PX03.png'],
    galleryCaptions: ['ポセイドン変電所 PX-03', 'ポセイドン変電所 PX-03 外観'],
  },
];

// HTML生成関数
function generateHtml(article) {
  const galleryHtml = article.galleryImages ? `
<div class="gallery-section">
<h2>ギャラリー</h2>
<div class="gallery-grid">
${article.galleryImages.map((img, i) => {
  const ext = path.extname(img);
  const localName = `img_gallery_${i+1}${ext}`;
  return `<div class="gallery-item"><img src="images/note_extracted/${article.slug}/${localName}" alt="${article.galleryCaptions[i]}" onclick="event.stopPropagation()"><div class="caption">${article.galleryCaptions[i]}</div></div>`;
}).join('\n')}
</div>
</div>` : '';

  const infoboxRowsHtml = article.infoboxRows.map(r =>
    `<div class="infobox-row"><span class="infobox-label">${r[0]}</span><span>${r[1]}</span></div>`
  ).join('');

  const mapImageHtml = article.mapImage ?
    `<img src="images/note_extracted/${article.slug}/img_map_marker.png" alt="マップ上の位置" style="width:100%;margin-top:5px;"><div style="text-align:center;font-style:italic;color:#888;font-size:0.8em;margin-bottom:10px;">マップ上の位置</div>` : '';

  const articleId = `note_${article.slug.replace(/-/g, '_')}`;

  return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8"><title>${article.title} | Overseer Mohi's Terminal</title><link rel="canonical" href="https://www.fallout-jp.com/${article.slug}.html"><meta property="og:type" content="article"><meta property="og:site_name" content="Overseer Mohi's Terminal"><meta property="og:locale" content="ja_JP"><meta property="og:title" content="${article.title} | Overseer Mohi's Terminal"><meta property="og:description" content="${article.ogDesc}"><meta property="og:url" content="https://www.fallout-jp.com/${article.slug}.html"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@IwamotoFuta"><script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
${cssBlock}
</head>
<body data-article-category="${article.category}" data-article-appearance="${article.appearance}">
    <div class="container">
        <aside class="infobox"><h3 style="margin-top:0;text-align:center;">${article.title}</h3><img src="images/note_extracted/${article.slug}/img_main.png" alt="${article.title}">${mapImageHtml}${infoboxRowsHtml}</aside>
        <main class="content">
            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="${articleId}" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>
            <h1>${article.title}<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">${article.titleJa}</span></h1>
            ${article.body}
${galleryHtml}
            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/${article.wikiSlug}" target="_blank" rel="noopener">${article.title}</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
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
        const _commentArticleId = '${articleId}';
        const _commentArticleName = '${article.title}';
        const _commentArticleUrl = '${article.slug}.html';
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

// メイン処理
async function main() {
  const today = new Date().toISOString().slice(0, 10);

  for (const article of articles) {
    console.log(`\n📄 生成中: ${article.title}`);

    // 画像ディレクトリ作成
    const imgDir = `F:\\Fallout\\images\\note_extracted\\${article.slug}`;
    fs.mkdirSync(imgDir, { recursive: true });

    // メイン画像ダウンロード
    const mainUrl = await getImageUrl(article.mainImage);
    if (mainUrl) {
      const ext = path.extname(article.mainImage) || '.png';
      await downloadImage(mainUrl, path.join(imgDir, `img_main${ext}`));
      console.log(`  ✅ メイン画像`);
    }

    // マップ画像ダウンロード
    if (article.mapImage) {
      const mapUrl = await getImageUrl(article.mapImage);
      if (mapUrl) {
        await downloadImage(mapUrl, path.join(imgDir, 'img_map_marker.png'));
        console.log(`  ✅ マップ画像`);
      }
    }

    // ギャラリー画像ダウンロード
    if (article.galleryImages) {
      for (let i = 0; i < article.galleryImages.length; i++) {
        const gUrl = await getImageUrl(article.galleryImages[i]);
        if (gUrl) {
          const ext = path.extname(article.galleryImages[i]) || '.png';
          await downloadImage(gUrl, path.join(imgDir, `img_gallery_${i+1}${ext}`));
          console.log(`  ✅ ギャラリー画像 ${i+1}`);
        }
      }
    }

    // HTML生成
    const html = generateHtml(article);
    fs.writeFileSync(`F:\\Fallout\\${article.slug}.html`, html, 'utf8');
    console.log(`  ✅ HTML生成完了: ${article.slug}.html`);
  }

  console.log('\n✅ バッチ生成完了！');
}

main().catch(e => console.error('エラー:', e));
