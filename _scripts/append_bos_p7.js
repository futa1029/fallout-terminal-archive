const fs = require('fs');

const p7 = `
            <div class="gallery-section">
                <h2>ギャラリー (Gallery)</h2>
                <p>ブラザーフッド・オブ・スティールの各支部や歴史に関わる画像資料群です。</p>
                <div class="gallery-grid">
                    <div class="gallery-item">
                        <img src="images/note_extracted/brotherhood-base/FOTV_BoS_Base_PA_Bay_Interior.png" alt="パワーアーマー格納庫" onerror="this.src='images/placeholder.jpg'">
                        <div class="caption">基地内のパワーアーマー・ベイ (TV版)</div>
                    </div>
                    <div class="gallery-item">
                        <img src="images/note_extracted/brotherhood-base/Fo1_Brotherhood_Corridor.png" alt="西海岸本部の回廊" onerror="this.src='images/placeholder.jpg'">
                        <div class="caption">FO1時代の「ロスト・ヒルズ」内部</div>
                    </div>
                    <div class="gallery-item">
                        <img src="images/note_extracted/brotherhood-base/Fo3_Citadel_flag_rev2.png" alt="シタデルの旗" onerror="this.src='images/placeholder.jpg'">
                        <div class="caption">FO3 東海岸支部（シタデル）の旗</div>
                    </div>
                    <div class="gallery-item">
                        <img src="images/note_extracted/brotherhood-base/FOTV_BoS_Base_Vertibirds.png" alt="駐機するベルチバード" onerror="this.src='images/placeholder.jpg'">
                        <div class="caption">B.O.S.の主力航空機ベルチバード</div>
                    </div>
                    <div class="gallery-item">
                        <img src="images/note_extracted/brotherhood-base/FOTV_BoS_Base_Hangar.png" alt="メインハンガー" onerror="this.src='images/placeholder.jpg'">
                        <div class="caption">サンフェルナンド・バレー基地の格納庫</div>
                    </div>
                    <div class="gallery-item">
                        <img src="images/note_extracted/brotherhood-base/Gametitle-FOT.png" alt="Tacticsタイトルロゴ" onerror="this.src='images/placeholder.jpg'">
                        <div class="caption">中西部への遠征 (FO:Tactics)</div>
                    </div>
                </div>
            </div>

            <div class="quote-box">
                <b>感想</b><br><br>
                Falloutシリーズといえば「青いジャンプスーツ（Vault）」と並んで、彼らブラザーフッド・オブ・スティールのパワーアーマーの存在を思い浮かべる人も多いのではないでしょうか。<br>
                マクソンの反乱から始まり、西海岸でのNCRに対する敗走と没落、そして東海岸でアーサー・マクソンが成し遂げた圧倒的なミリタリー国家への飛躍と、彼らの歴史はそっくりそのままFalloutの世界全体の歴史の流れとシンクロしています。<br>
                ただの「正義の味方」なんかじゃなく、教義に縛られて独善的で、狂信的で、時としてレイダーやスーパーミュータントよりも暴力的にテクノロジーをむしり取っていく姿勢こそが、いかにもFalloutらしくて最高にクールですよね！「Ad Victoriam！」と誇り高く叫びながらベルチバードからパワーアーマーで降下してくる彼らを見ると、やはりテンションが上がらずにはいられません。彼らなしにはこのウェイストランドは語れない、そう思わせてくれる最高の勢力だと思います。
            </div>

            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <p>This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Brotherhood_of_Steel" target="_blank" rel="noopener">Brotherhood of Steel</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
                <p>&copy; Overseer Mohi's Terminal — Fallout Lore Archive</p>
                <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
            </div>

            <!-- Comments Section -->
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
            </div>
        </main>
    </div>

    <!-- Lightbox -->
    <div class="lightbox-overlay" id="lightbox" onclick="this.classList.remove('active')">
        <img id="lightbox-img" src="" alt="拡大画像">
    </div>

    <script>
        const supabaseUrl = 'https://qkdjufvdeisnunismgaw.supabase.co';
        const supabaseKey = 'sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';
        let supabaseClient;
        try { supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey); } catch (e) {}

        const _commentArticleId = 'note_brotherhood_of_steel_2'; 
        const _commentArticleName = 'Brotherhood of Steel'; 
        const _commentArticleUrl = 'brotherhood-of-steel.html'; 
        const ADMIN_TOKEN_KEY = 'fallout_admin_token'; 
        const ADMIN_PASSWORD = 'tq7jtq7j'; 
        const RATE_LIMIT_KEY = 'comment_last_posted'; 
        const RATE_LIMIT_SEC = 60; 
        let _isAdminMode = false;

        async function toggleLike(btn) { 
            const articleId = btn.getAttribute('data-article-id'); 
            let isLiked = localStorage.getItem(articleId + '_liked') === 'true'; 
            btn.disabled = true; 
            if (isLiked) { 
                isLiked = false; 
                const { data, error } = await supabaseClient.rpc('decrement_like', { article_id_param: articleId }); 
                if (!error) { localStorage.setItem(articleId + '_liked', isLiked); updateLikeButton(btn, isLiked, data); } 
            } else { 
                isLiked = true; 
                const { data, error } = await supabaseClient.rpc('increment_like', { article_id_param: articleId }); 
                if (!error) { localStorage.setItem(articleId + '_liked', isLiked); updateLikeButton(btn, isLiked, data); } 
            } 
            btn.disabled = false; 
        }

        function updateLikeButton(btn, isLiked, count) { 
            const heart = btn.querySelector('.heart'); 
            const countSpan = btn.querySelector('.like-count'); 
            if (isLiked) { btn.classList.add('liked'); heart.textContent = '♥'; } 
            else { btn.classList.remove('liked'); heart.textContent = '♡'; } 
            countSpan.textContent = count || 0; 
        }

        function openLightbox(src) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            lightboxImg.src = src;
            lightbox.classList.add('active');
        }

        document.addEventListener('DOMContentLoaded', async () => { 
            const btn = document.querySelector('.like-button'); 
            if (btn && supabaseClient) { 
                const articleId = btn.getAttribute('data-article-id'); 
                const isLiked = localStorage.getItem(articleId + '_liked') === 'true'; 
                const { data, error } = await supabaseClient.from('likes').select('like_count').eq('article_id', articleId).single(); 
                let count = 0; 
                if (!error && data) count = data.like_count; 
                updateLikeButton(btn, isLiked, count); 
            } 
            document.querySelectorAll('.content img, .infobox img, .gallery-item img').forEach(img => { 
                img.addEventListener('click', (e) => { 
                    e.stopPropagation(); 
                    openLightbox(img.src); 
                }); 
            }); 
            loadComments();
        });

        function updateCharCount() { const len = document.getElementById('comment-input').value.length; const el = document.getElementById('char-count'); if (el) { el.textContent = len; el.style.color = len > 90 ? '#ff6b6b' : 'var(--accent-color)'; } }
        function relativeTime(s) { const d = (Date.now() - new Date(s).getTime()) / 1000; if (d < 60) return 'たった今'; if (d < 3600) return Math.floor(d/60)+'分前'; if (d < 86400) return Math.floor(d/3600)+'時間前'; if (d < 86400*7) return Math.floor(d/86400)+'日前'; return new Date(s).toLocaleDateString('ja-JP'); }
        function escapeHtml(str) { return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
        
        function renderComments(comments) { 
            const list = document.getElementById('comments-list'); 
            if (!list) return; 
            if (!comments || comments.length === 0) { list.innerHTML = '<div class="comment-empty">まだコメントがありません。最初のコメントを投稿してみましょう！</div>'; return; } 
            list.innerHTML = comments.map(c => \`<div class="comment-item" data-id="\${c.id}"><div class="comment-meta"><span class="comment-time">\${relativeTime(c.created_at)}</span>\${_isAdminMode ? \`<button class="comment-delete-btn" onclick="deleteComment('\${c.id}')">&#128465;</button>\` : ''}</div><div class="comment-body">\${escapeHtml(c.content)}</div></div>\`).join(''); 
        }

        async function loadComments() { 
            const list = document.getElementById('comments-list'); 
            if (!list || !supabaseClient) return; 
            const { data, error } = await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_commentArticleId).order('created_at',{ascending:false}).limit(50); 
            if (error) { list.innerHTML = '<div class="comment-empty">コメントを読み込めませんでした。</div>'; return; } 
            renderComments(data || []); 
        }

        async function submitComment() { 
            if (!supabaseClient) return;
            const input = document.getElementById('comment-input'); 
            const hp = document.getElementById('hp_field'); 
            if (hp && hp.value !== '') return; 
            const content = input ? input.value.trim() : ''; 
            if (!content) { showCommentMsg('コメントを入力してください。', false); return; } 
            if (content.length > 100) { showCommentMsg('100文字以内で入力してください。', false); return; } 
            const NG_WORDS = ['広告','http://','https://','LINE','DMして','死ね','クソ','アホ','ウザイ','discord.gg','t.me']; 
            const lc = content.toLowerCase(); 
            if (NG_WORDS.some(w => lc.includes(w.toLowerCase()))) { showCommentMsg('不適切な表現が含まれているため投稿できません。', false); return; } 
            const lastPosted = parseInt(localStorage.getItem(RATE_LIMIT_KEY) || '0'); 
            const now = Date.now(); 
            if (now - lastPosted < RATE_LIMIT_SEC * 1000) { showCommentMsg('あと'+Math.ceil((RATE_LIMIT_SEC*1000-(now-lastPosted))/1000)+'秒後に投稿できます。', false); return; } 
            const btn = document.querySelector('.comment-submit-btn'); 
            if (btn) btn.disabled = true; 
            const { error } = await supabaseClient.from('comments').insert({ article_id:_commentArticleId, article_name:_commentArticleName, article_url:_commentArticleUrl, content:content }); 
            if (btn) btn.disabled = false; 
            if (error) { showCommentMsg('投稿に失敗しました。', false); return; } 
            localStorage.setItem(RATE_LIMIT_KEY, now.toString()); 
            input.value = ''; updateCharCount(); showCommentMsg('コメントを投稿しました！', true); await loadComments(); 
        }

        function showCommentMsg(text, ok) { const el = document.getElementById('comment-msg'); if (!el) return; el.textContent = text; el.style.color = ok ? 'var(--accent-color)' : '#ff6b6b'; setTimeout(() => { el.textContent = ''; }, 3000); }
        async function deleteComment(commentId) { if (!_isAdminMode || !supabaseClient) return; if (!confirm('このコメントを削除しますか？')) return; const { error } = await supabaseClient.rpc('delete_comment_admin', { comment_id: commentId, admin_token: localStorage.getItem(ADMIN_TOKEN_KEY)||'' }); if (error) { alert('削除失敗: ' + error.message); return; } await loadComments(); }
        
        document.addEventListener('keydown', (e) => { 
            if (e.ctrlKey && e.shiftKey && e.key === 'D') { 
                e.preventDefault(); 
                if (_isAdminMode) { _isAdminMode = false; localStorage.removeItem(ADMIN_TOKEN_KEY); loadComments(); alert('管理者モードを終了しました。'); return; } 
                const pw = prompt('管理者パスワードを入力してください:'); if (!pw) return; 
                if (pw === ADMIN_PASSWORD) { _isAdminMode = true; localStorage.setItem(ADMIN_TOKEN_KEY, pw); loadComments(); alert('管理者モードに入りました。'); } 
                else { alert('パスワードが違います。'); } 
            } 
        });
    </script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

fs.appendFileSync('f:/Fallout/brotherhood-of-steel-full.html', p7, 'utf8');
console.log('Appended part 7 and finished HTML generation.');
