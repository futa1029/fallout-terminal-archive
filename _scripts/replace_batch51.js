const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const getStandardScript = (id, name, url) => `
        const supabaseUrl = 'https://qkdjufvdeisnunismgaw.supabase.co';
        const supabaseKey = 'sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';
        const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
        async function toggleLike(btn) { const articleId = btn.getAttribute('data-article-id'); let isLiked = localStorage.getItem(articleId + '_liked') === 'true'; btn.disabled = true; if (isLiked) { isLiked = false; const { data, error } = await supabaseClient.rpc('decrement_like', { article_id_param: articleId }); if (!error) { localStorage.setItem(articleId + '_liked', isLiked); updateLikeButton(btn, isLiked, data); } } else { isLiked = true; const { data, error } = await supabaseClient.rpc('increment_like', { article_id_param: articleId }); if (!error) { localStorage.setItem(articleId + '_liked', isLiked); updateLikeButton(btn, isLiked, data); } } btn.disabled = false; }
        function updateLikeButton(btn, isLiked, count) { const heart = btn.querySelector('.heart'); const countSpan = btn.querySelector('.like-count'); if (isLiked) { btn.classList.add('liked'); heart.textContent = '♥'; } else { btn.classList.remove('liked'); heart.textContent = '♡'; } countSpan.textContent = count; }
        document.addEventListener('DOMContentLoaded', async () => { const btn = document.querySelector('.like-button'); if (btn) { const articleId = btn.getAttribute('data-article-id'); const isLiked = localStorage.getItem(articleId + '_liked') === 'true'; const { data, error } = await supabaseClient.from('likes').select('like_count').eq('article_id', articleId).single(); let count = 0; if (!error && data) count = data.like_count; updateLikeButton(btn, isLiked, count); } const lightbox = document.getElementById('lightbox'); const lightboxImg = document.getElementById('lightbox-img'); document.querySelectorAll('.content img, .infobox img, .gallery-item img').forEach(img => { img.addEventListener('click', (e) => { e.stopPropagation(); lightboxImg.src = img.src; lightbox.classList.add('active'); }); }); });
        const _commentArticleId = '${id}'; const _commentArticleName = '${name}'; const _commentArticleUrl = '${url}'; const ADMIN_TOKEN_KEY = 'fallout_admin_token'; const ADMIN_PASSWORD = 'tq7jtq7j'; const RATE_LIMIT_KEY = 'comment_last_posted'; const RATE_LIMIT_SEC = 60; let _isAdminMode = false;
        function updateCharCount() { const len = document.getElementById('comment-input').value.length; const el = document.getElementById('char-count'); if (el) { el.textContent = len; el.style.color = len > 90 ? '#ff6b6b' : 'var(--accent-color)'; } }
        function relativeTime(s) { const d = (Date.now() - new Date(s).getTime()) / 1000; if (d < 60) return 'たった今'; if (d < 3600) return Math.floor(d/60)+'分前'; if (d < 86400) return Math.floor(d/3600)+'時間前'; if (d < 86400*7) return Math.floor(d/86400)+'日前'; return new Date(s).toLocaleDateString('ja-JP'); }
        function escapeHtml(str) { return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
        function renderComments(comments) { const list = document.getElementById('comments-list'); if (!list) return; if (!comments || comments.length === 0) { list.innerHTML = '<div class="comment-empty">まだコメントがありません。最初のコメントを投稿してみましょう！</div>'; return; } list.innerHTML = comments.map(c => \`<div class="comment-item" data-id="\${c.id}"><div class="comment-meta"><span class="comment-time">\${relativeTime(c.created_at)}</span>\${_isAdminMode ? \`<button class="comment-delete-btn" onclick="deleteComment('\${c.id}')">&#128465;</button>\` : ''}</div><div class="comment-body">\${escapeHtml(c.content)}</div></div>\`).join(''); }
        async function loadComments() { const list = document.getElementById('comments-list'); if (!list) return; const { data, error } = await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_commentArticleId).order('created_at',{ascending:false}).limit(50); if (error) { list.innerHTML = '<div class="comment-empty">コメントを読み込めませんでした。</div>'; return; } renderComments(data || []); }
        async function submitComment() { const input = document.getElementById('comment-input'); const hp = document.getElementById('hp_field'); if (hp && hp.value !== '') return; const content = input ? input.value.trim() : ''; if (!content) { showCommentMsg('コメントを入力してください。', false); return; } if (content.length > 100) { showCommentMsg('100文字以内で入力してください。', false); return; } const NG_WORDS = ['広告','http://','https://','LINE','DMして','死ね','クソ','アホ','ウザイ','discord.gg','t.me']; const lc = content.toLowerCase(); if (NG_WORDS.some(w => lc.includes(w.toLowerCase()))) { showCommentMsg('不適切な表現が含まれているため投稿できません。', false); return; } const lastPosted = parseInt(localStorage.getItem(RATE_LIMIT_KEY) || '0'); const now = Date.now(); if (now - lastPosted < RATE_LIMIT_SEC * 1000) { showCommentMsg('あと'+Math.ceil((RATE_LIMIT_SEC*1000-(now-lastPosted))/1000)+'秒後に投稿できます。', false); return; } const btn = document.querySelector('.comment-submit-btn'); if (btn) btn.disabled = true; const { error } = await supabaseClient.from('comments').insert({ article_id:_commentArticleId, article_name:_commentArticleName, article_url:_commentArticleUrl, content:content }); if (btn) btn.disabled = false; if (error) { showCommentMsg('投稿に失敗しました。', false); return; } localStorage.setItem(RATE_LIMIT_KEY, now.toString()); input.value = ''; updateCharCount(); showCommentMsg('コメントを投稿しました！', true); await loadComments(); }
        function showCommentMsg(text, ok) { const el = document.getElementById('comment-msg'); if (!el) return; el.textContent = text; el.style.color = ok ? 'var(--accent-color)' : '#ff6b6b'; setTimeout(() => { el.textContent = ''; }, 3000); }
        async function deleteComment(commentId) { if (!_isAdminMode) return; if (!confirm('このコメントを削除しますか？')) return; const { error } = await supabaseClient.rpc('delete_comment_admin', { comment_id: commentId, admin_token: localStorage.getItem(ADMIN_TOKEN_KEY)||'' }); if (error) { alert('削除失敗: ' + error.message); return; } await loadComments(); }
        document.addEventListener('keydown', (e) => { if (e.ctrlKey && e.shiftKey && e.key === 'D') { e.preventDefault(); if (_isAdminMode) { _isAdminMode = false; localStorage.removeItem(ADMIN_TOKEN_KEY); loadComments(); alert('管理者モードを終了しました。'); return; } const pw = prompt('管理者パスワードを入力してください:'); if (!pw) return; if (pw === ADMIN_PASSWORD) { _isAdminMode = true; localStorage.setItem(ADMIN_TOKEN_KEY, pw); loadComments(); alert('管理者モードに入りました。'); } else { alert('パスワードが違います。'); } } });
        document.addEventListener('DOMContentLoaded', () => { loadComments(); });
`;

const processFile = (filename, pId, enName, jpName) => {
    const file = `f:/Fallout/${filename}`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // 1. Add viewport
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }
    
    // 2. Fix copyright
    const pElements = document.querySelectorAll('p');
    for (let p of pElements) {
        if (p.textContent.includes('This article was created by translating')) {
            let encURI = encodeURIComponent(enName).replace(/%20/g, "_");
            p.outerHTML = `<p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/${encURI}" target="_blank" rel="noopener">${enName}</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>`;
        }
    }
    
    // 3. Unminify Comments HTML
    const commentSec = document.querySelector('.comments-section');
    if (commentSec && commentSec.innerHTML.includes('COMMENTS_')) {
        commentSec.outerHTML = `
            <div class="comments-section" id="comments-section">
                <h3 class="comments-title">&gt; COMMENTS</h3>
                <div class="comment-form">
                    <textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力 (最大100文字)..." oninput="updateCharCount()"></textarea>
                    <input type="text" id="hp_field" name="website" style="display:none;position:absolute;left:-9999px" tabindex="-1" autocomplete="off" aria-hidden="true">
                    <div class="comment-form-footer">
                        <span class="char-count"><span id="char-count">0</span> / 100</span>
                        <button class="comment-submit-btn" onclick="submitComment()">SEND &#9654;</button>
                    </div>
                    <div id="comment-msg" class="comment-msg"></div>
                </div>
                <div id="comments-list" class="comments-list"><div class="comment-loading">LOADING...</div></div>
            </div>`;
    }

    // 4. Update Scripts
    const scripts = document.querySelectorAll('script');
    for (let s of scripts) {
        if (!s.src || !s.src.includes('article-common.js')) {
            if (s.src && s.src.includes('supabase')) {
                // keep external
            } else {
                s.remove();
            }
        }
    }
    
    // add standard script before article-common or at the end of body
    let newScript = document.createElement('script');
    newScript.textContent = getStandardScript(pId, enName, filename);
    const body = document.querySelector('body');
    const commonScript = document.querySelector('script[src*="article-common.js"]');
    if (commonScript) {
        body.insertBefore(newScript, commonScript);
    } else {
        body.appendChild(newScript);
    }
    
    fs.writeFileSync(file, dom.serialize());
    console.log(filename + ' fixed.');
};

processFile('supervisor-danforth.html', 'note_supervisor_danforth', 'Supervisor Danforth', '監督官ダンフォース');
processFile('supervisor-chattingham.html', 'note_supervisor_chattingham', 'Supervisor Chattingham', '監督官チャッティンガム');
processFile('supervisor-wellington.html', 'note_supervisor_wellington', 'Supervisor Wellington', '監督官ウェリントン');
