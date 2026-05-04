const fs = require('fs');

const tmpl = fs.readFileSync('F:/Fallout/mole-miner.html', 'utf8');
const cssBlock = tmpl.substring(tmpl.indexOf('<style>'), tmpl.indexOf('</style>') + '</style>'.length);

const slugs = [
  "santa-monica", "donut-shop", "starlight-drive-in-theatre-tv-series", "camp-golf-tent", "santa-monica-pier",
  "affordable-al-s-discount-hospital", "headquarters-of-the-united-nations", "westside-medical-clinic", "yao-guai-cave-tv-series", "sonny-s-sundries",
  "the-ghoul-s-grave", "bbq-shack-tv-series", "soviet-satellite", "red-rocket-tv-series", "hawthorne-medical-laboratories"
];

for (const slug of slugs) {
  let html = fs.readFileSync(`F:/Fallout/${slug}.html`, 'utf8');
  
  let titleMatch = html.match(/<h1>(.*?)<br><span[^>]*>(.*?)<\/span><\/h1>/);
  let titleJa = titleMatch ? titleMatch[1].trim() : '';
  let title = titleMatch ? titleMatch[2].trim() : '';
  
  let articleId = `note_${slug.replace(/-/g, '_')}`;

  let mainImgMatch = html.match(/<img src="(images\/[a-zA-Z0-9_\-\/']+\.png|images\/[a-zA-Z0-9_\-\/']+\.jpg|images\/placeholder\.jpg)"[^>]*>/);
  let mainImgStr = mainImgMatch ? `<img src="${mainImgMatch[1]}" alt="${title}">` : '';

  let infoGridMatch = html.match(/<div class="info-grid">([\s\S]*?)<\/div>\s*<\/div>/);
  let infoGridHtml = infoGridMatch ? infoGridMatch[1] : '';
  let infoboxRows = '';
  const r = /<div class="info-label">(.*?)<\/div><div class="info-value">([\s\S]*?)<\/div>/g;
  let m;
  while ((m = r.exec(infoGridHtml)) !== null) {
      infoboxRows += `<div class="infobox-row"><span class="infobox-label">${m[1]}</span><span>${m[2]}</span></div>\n`;
  }

  // Content between infobox and quote-box or end
  let bodyMatch = html.match(/<\/div>\s*<\/div>\s*(<p><b>[\s\S]*?)(?:<div class="quote-box">|<p>Category:)/);
  if (!bodyMatch) {
      bodyMatch = html.match(/(<p><b>[\s\S]*?)(?:<div class="quote-box">|<p>Category:)/);
  }
  let bodyContent = bodyMatch ? bodyMatch[1].trim() : '';
  // remove stray infobox closing divs if they leaked in
  if (bodyContent.startsWith('</div>')) {
      bodyContent = bodyContent.replace(/^<\/div>\s*/, '');
  }

  let impressionMatch = html.match(/<div class="quote-box">\s*<b>(?:Impression|感想)<\/b><br><br>\s*([\s\S]*?)\s*<\/div>/);
  let impression = impressionMatch ? impressionMatch[1].trim() : '';

  let catMatch = html.match(/(<p>Category:[\s\S]*?)<\/main>/);
  let categoryStr = catMatch ? catMatch[1].replace(/<\/p>/g, '').replace(/<br>/g, '\n').replace(/<p>/g, '').trim() : '';
  // Convert Category lines
  // e.g. Category:Fallout TV series locations
  
  let wikiSlug = title.replace(/ /g, '_').replace(/'/g, '%27');

  const newHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8"><title>${title} | Overseer Mohi's Terminal</title><link rel="canonical" href="https://www.fallout-jp.com/${slug}.html"><meta property="og:type" content="article"><meta property="og:site_name" content="Overseer Mohi's Terminal"><meta property="og:locale" content="ja_JP"><meta property="og:title" content="${title} | Overseer Mohi's Terminal"><meta property="og:description" content="${titleJa}"><meta property="og:url" content="https://www.fallout-jp.com/${slug}.html"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@IwamotoFuta"><script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
${cssBlock}
</head>
<body data-article-category="場所" data-article-appearance="Fallout TVシリーズ">
    <div class="container">
        <aside class="infobox"><h3 style="margin-top:0;text-align:center;">${title}</h3>${mainImgStr}${infoboxRows}</aside>
        <main class="content">
            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="${articleId}" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>
            <h1>${title}<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">${titleJa}</span></h1>
            ${bodyContent}
<div class="quote-box"><b>感想</b><br><br>${impression}</div>
            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/${wikiSlug}" target="_blank" rel="noopener">${title}</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
                <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
            </div>
            <div class="comments-section"><h2 class="comments-title">&gt; COMMENTS_</h2><div class="comment-form"><textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力..." oninput="updateCharCount()"></textarea><div class="comment-form-footer"><span class="char-count"><span id="char-count">0</span>/100</span><button class="comment-submit-btn" onclick="submitComment()">SUBMIT &gt;</button></div><div id="comment-msg" class="comment-msg"></div></div><div id="comments-list"></div></div>
        </main>
    </div>
    <div class="lightbox-overlay" id="lightbox" onclick="this.classList.remove('active')"><img id="lightbox-img" src="" alt=""></div>
    <script>
        const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);
        async function toggleLike(btn){const articleId=btn.getAttribute('data-article-id');let isLiked=localStorage.getItem(articleId+'_liked')==='true';btn.disabled=true;if(isLiked){isLiked=false;const{data,error}=await supabaseClient.rpc('decrement_like',{article_id_param:articleId});if(!error){localStorage.setItem(articleId+'_liked',isLiked);updateLikeButton(btn,isLiked,data);}}else{isLiked=true;const{data,error}=await supabaseClient.rpc('increment_like',{article_id_param:articleId});if(!error){localStorage.setItem(articleId+'_liked',isLiked);updateLikeButton(btn,isLiked,data);}}btn.disabled=false;}
        function updateLikeButton(btn,isLiked,count){const heart=btn.querySelector('.heart');const countSpan=btn.querySelector('.like-count');if(isLiked){btn.classList.add('liked');heart.textContent='♥';}else{btn.classList.remove('liked');heart.textContent='♡';}countSpan.textContent=count;}
        document.addEventListener('DOMContentLoaded',async()=>{const btn=document.querySelector('.like-button');if(btn){const articleId=btn.getAttribute('data-article-id');const isLiked=localStorage.getItem(articleId+'_liked')==='true';const{data,error}=await supabaseClient.from('likes').select('like_count').eq('article_id',articleId).single();let count=0;if(!error&&data)count=data.like_count;updateLikeButton(btn,isLiked,count);}const lightbox=document.getElementById('lightbox');const lightboxImg=document.getElementById('lightbox-img');document.querySelectorAll('.content img, .infobox img, .gallery-item img').forEach(img=>{img.addEventListener('click',(e)=>{e.stopPropagation();lightboxImg.src=img.src;lightbox.classList.add('active');});});});
        const _commentArticleId='${articleId}';const _commentArticleName='${title.replace(/'/g,"\\'")}';const _commentArticleUrl='${slug}.html';
        const ADMIN_TOKEN_KEY='fallout_admin_token';const ADMIN_PASSWORD='tq7jtq7j';const RATE_LIMIT_KEY='comment_last_posted';const RATE_LIMIT_SEC=60;let _isAdminMode=false;
        function updateCharCount(){const len=document.getElementById('comment-input').value.length;const el=document.getElementById('char-count');if(el){el.textContent=len;el.style.color=len>90?'#ff6b6b':'var(--accent-color)';}}
        function relativeTime(s){const d=(Date.now()-new Date(s).getTime())/1000;if(d<60)return'たった今';if(d<3600)return Math.floor(d/60)+'分前';if(d<86400)return Math.floor(d/3600)+'時間前';if(d<86400*7)return Math.floor(d/86400)+'日前';return new Date(s).toLocaleDateString('ja-JP');}
        function escapeHtml(str){return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
        function renderComments(comments){const list=document.getElementById('comments-list');if(!list)return;if(!comments||comments.length===0){list.innerHTML='<div class="comment-empty">まだコメントがありません。最初のコメントを投稿してみましょう！</div>';return;}list.innerHTML=comments.map(c=>\`<div class="comment-item" data-id="\${c.id}"><div class="comment-meta"><span class="comment-time">\${relativeTime(c.created_at)}</span>\${_isAdminMode?\`<button class="comment-delete-btn" onclick="deleteComment('\${c.id}')">&#128465;</button>\`:''}</div><div class="comment-body">\${escapeHtml(c.content)}</div></div>\`).join('');}
        async function loadComments(){const list=document.getElementById('comments-list');if(!list)return;const{data,error}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_commentArticleId).order('created_at',{ascending:false}).limit(50);if(error){list.innerHTML='<div class="comment-empty">コメントを読み込めませんでした。</div>';return;}renderComments(data||[]);}
        async function submitComment(){const input=document.getElementById('comment-input');const content=input?input.value.trim():'';if(!content){showCommentMsg('コメントを入力してください。',false);return;}if(content.length>100){showCommentMsg('100文字以内で入力してください。',false);return;}const lastPosted=parseInt(localStorage.getItem(RATE_LIMIT_KEY)||'0');const now=Date.now();if(now-lastPosted<RATE_LIMIT_SEC*1000){showCommentMsg('あと'+Math.ceil((RATE_LIMIT_SEC*1000-(now-lastPosted))/1000)+'秒後に投稿できます。',false);return;}const btn=document.querySelector('.comment-submit-btn');if(btn)btn.disabled=true;const{error}=await supabaseClient.from('comments').insert({article_id:_commentArticleId,article_name:_commentArticleName,article_url:_commentArticleUrl,content:content});if(btn)btn.disabled=false;if(error){showCommentMsg('投稿に失敗しました。',false);return;}localStorage.setItem(RATE_LIMIT_KEY,now.toString());input.value='';updateCharCount();showCommentMsg('コメントを投稿しました！',true);await loadComments();}
        function showCommentMsg(text,ok){const el=document.getElementById('comment-msg');if(!el)return;el.textContent=text;el.style.color=ok?'var(--accent-color)':'#ff6b6b';setTimeout(()=>{el.textContent='';},3000);}
        async function deleteComment(commentId){if(!_isAdminMode)return;if(!confirm('このコメントを削除しますか？'))return;const{error}=await supabaseClient.rpc('delete_comment_admin',{comment_id:commentId,admin_token:localStorage.getItem(ADMIN_TOKEN_KEY)||''});if(error){alert('削除失敗: '+error.message);return;}await loadComments();}
        document.addEventListener('keydown',(e)=>{if(e.ctrlKey&&e.shiftKey&&e.key==='D'){e.preventDefault();if(_isAdminMode){_isAdminMode=false;localStorage.removeItem(ADMIN_TOKEN_KEY);loadComments();alert('管理者モードを終了しました。');return;}const pw=prompt('管理者パスワードを入力してください:');if(!pw)return;if(pw===ADMIN_PASSWORD){_isAdminMode=true;localStorage.setItem(ADMIN_TOKEN_KEY,pw);loadComments();alert('管理者モードに入りました。');}else{alert('パスワードが違います。');}}});
        document.addEventListener('DOMContentLoaded',()=>{loadComments();});
    </script>
    <script src="article-common.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(`F:/Fallout/${slug}.html`, newHtml, 'utf8');
  console.log(`Rebuilt HTML for ${slug}`);
  
  // Create X post
  const xDir = `F:/Fallout/_X/${slug}`;
  if (!fs.existsSync(xDir)) {
      fs.mkdirSync(`${xDir}/images`, { recursive: true });
  }
  let postBody = bodyContent.replace(/<[^>]+>/g, '').replace(/\n\n+/g, '\n\n').trim();
  if (postBody.length > 150) postBody = postBody.substring(0, 150) + '...';
  
  const postMd = `#Fallout #FalloutTV\n\n${title}（${titleJa}）\nhttps://www.fallout-jp.com/${slug}.html\n\n${postBody}\n\n---\n\n💭 感想\n\n${impression.replace(/<br>/g, '\n').trim()}\n\n---\n\nThis article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.\n`;
  fs.writeFileSync(`${xDir}/post.md`, postMd, 'utf8');
  console.log(`Created X post for ${slug}`);
}
