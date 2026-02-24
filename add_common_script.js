/**
 * add_common_script.js
 * 保護ファイルに data属性と article-common.js のscriptタグを一括追加するスクリプト
 * コメントセクションの挿入も行う
 */
const fs = require('fs');
const path = require('path');
const DIR = 'f:\\Fallout';
const supabaseUrl = 'https://qkdjufvdeisnunismgaw.supabase.co';
const supabaseKey = 'sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';
const ADMIN_PASSWORD = 'change_me_admin_2026'; // ← 管理者パスワード

const protectedMeta = {
    'kimball.html': { cat: '人物', app: 'Fallout: New Vegas' },
    'tandi.html': { cat: '人物', app: 'Fallout,Fallout 2' },
    'raiders_76.html': { cat: '勢力', app: 'Fallout 76' },
    'blight.html': { cat: '植物', app: 'Fallout 76' },
    'ncr.html': { cat: '勢力', app: 'Fallout,Fallout 2,Fallout: New Vegas,Fallout TV' },
    'prize_bot.html': { cat: '人物', app: 'Fallout 76' },
    'assaultron_head.html': { cat: '武器', app: 'Fallout 4,Fallout 76' },
    'lee_moldaver.html': { cat: '人物', app: 'Fallout TV' },
    'vault_dweller_lore.html': { cat: '人物', app: 'Fallout' },
    'vault_dweller_jp.html': { cat: '人物', app: 'Fallout' },
    'wayward_jp.html': { cat: '場所', app: 'Fallout 76' },
    'buffalo-gourd-seed.html': { cat: '植物', app: 'Fallout: New Vegas' },
    'vault_tec.html': { cat: '勢力', app: 'Fallout,Fallout 2,Fallout 3,Fallout 4,Fallout 76,Fallout: New Vegas,Fallout TV' },
    'armor-ace.html': { cat: '人物', app: 'Fallout 76' },
    'billings-homestead.html': { cat: '場所', app: 'Fallout 76' },
    'fallout-76-pets.html': { cat: 'システム', app: 'Fallout 76' }
};

// コメントセクションCSS
const COMMENT_CSS = `
        /* コメントセクション */
        .comments-section {
            margin-top: 40px;
            border-top: 2px solid var(--accent-color);
            padding-top: 20px;
        }
        .comments-title {
            font-family: 'Share Tech Mono', monospace;
            color: var(--accent-color);
            margin-bottom: 15px;
            font-size: 1em;
            border: none;
            padding: 0;
        }
        .comment-form { margin-bottom: 20px; }
        .comment-textarea {
            width: 100%;
            box-sizing: border-box;
            background: rgba(0,0,0,0.4);
            border: 1px solid var(--accent-color);
            color: var(--text-color);
            font-family: 'Noto Sans JP', sans-serif;
            font-size: 0.95em;
            padding: 10px;
            border-radius: 4px;
            resize: vertical;
            min-height: 70px;
            outline: none;
            transition: box-shadow 0.2s;
        }
        .comment-textarea:focus { box-shadow: 0 0 8px var(--accent-color); }
        .comment-form-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 6px;
        }
        .char-count {
            font-size: 0.8em;
            color: #888;
            font-family: 'Share Tech Mono', monospace;
        }
        .comment-submit-btn {
            background: transparent;
            border: 1px solid var(--accent-color);
            color: var(--accent-color);
            padding: 6px 16px;
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.9em;
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.2s;
        }
        .comment-submit-btn:hover { background: var(--accent-color); color: var(--bg-color); }
        .comment-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .comment-msg {
            font-size: 0.85em;
            min-height: 1.2em;
            margin-top: 4px;
            font-family: 'Share Tech Mono', monospace;
        }
        .comments-list { display: flex; flex-direction: column; gap: 10px; }
        .comment-item {
            background: rgba(255,255,255,0.04);
            border-left: 3px solid var(--accent-color);
            padding: 10px 14px;
            border-radius: 0 4px 4px 0;
        }
        .comment-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
        }
        .comment-time {
            font-size: 0.78em;
            color: #666;
            font-family: 'Share Tech Mono', monospace;
        }
        .comment-body { font-size: 0.92em; line-height: 1.6; word-break: break-all; }
        .comment-delete-btn {
            background: none; border: none; cursor: pointer;
            font-size: 1em; padding: 2px 6px; border-radius: 3px;
            opacity: 0.7; transition: opacity 0.2s;
        }
        .comment-delete-btn:hover { opacity: 1; }
        .comment-empty, .comment-loading {
            color: #666; font-size: 0.85em;
            font-family: 'Share Tech Mono', monospace; padding: 10px 0;
        }`;

// コメントセクションHTML
const COMMENT_HTML = `
            <!-- Comments Section -->
            <div class="comments-section" id="comments-section">
                <h3 class="comments-title">&gt; COMMENTS</h3>
                <div class="comment-form">
                    <textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力 (最大100文字)..." oninput="updateCharCount()"></textarea>
                    <div class="comment-form-footer">
                        <span class="char-count"><span id="char-count">0</span> / 100</span>
                        <button class="comment-submit-btn" onclick="submitComment()">SEND &#9654;</button>
                    </div>
                    <div id="comment-msg" class="comment-msg"></div>
                </div>
                <div id="comments-list" class="comments-list">
                    <div class="comment-loading">LOADING...</div>
                </div>
            </div>`;

// コメント機能JavaScript
function buildCommentScript(articleId, articleName, articleUrl) {
    return `
        // ========== コメント機能 ==========
        const _commentArticleId = '${articleId}';
        const _commentArticleName = '${articleName.replace(/'/g, "\\'")}';
        const _commentArticleUrl = '${articleUrl}';
        const ADMIN_TOKEN_KEY = 'fallout_admin_token';
        const ADMIN_PASSWORD = '${ADMIN_PASSWORD}';
        const RATE_LIMIT_KEY = 'comment_last_posted';
        const RATE_LIMIT_SEC = 60;
        let _isAdminMode = false;

        function updateCharCount() {
            const len = document.getElementById('comment-input').value.length;
            const el = document.getElementById('char-count');
            if (el) { el.textContent = len; el.style.color = len > 90 ? '#ff6b6b' : 'var(--accent-color)'; }
        }
        function relativeTime(s) {
            const d = (Date.now() - new Date(s).getTime()) / 1000;
            if (d < 60) return 'たった今';
            if (d < 3600) return Math.floor(d/60)+'分前';
            if (d < 86400) return Math.floor(d/3600)+'時間前';
            if (d < 86400*7) return Math.floor(d/86400)+'日前';
            return new Date(s).toLocaleDateString('ja-JP');
        }
        function escapeHtml(str) {
            return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
        }
        function renderComments(comments) {
            const list = document.getElementById('comments-list');
            if (!list) return;
            if (!comments || comments.length === 0) {
                list.innerHTML = '<div class="comment-empty">まだコメントがありません。最初のコメントを投稿してみましょう！</div>';
                return;
            }
            list.innerHTML = comments.map(c => \`<div class="comment-item" data-id="\${c.id}"><div class="comment-meta"><span class="comment-time">\${relativeTime(c.created_at)}</span>\${_isAdminMode ? \`<button class="comment-delete-btn" onclick="deleteComment('\${c.id}')">&#128465;</button>\` : ''}</div><div class="comment-body">\${escapeHtml(c.content)}</div></div>\`).join('');
        }
        async function loadComments() {
            const list = document.getElementById('comments-list');
            if (!list) return;
            const { data, error } = await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_commentArticleId).order('created_at',{ascending:false}).limit(50);
            if (error) { list.innerHTML = '<div class="comment-empty">コメントを読み込めませんでした。</div>'; return; }
            renderComments(data || []);
        }
        async function submitComment() {
            const input = document.getElementById('comment-input');
            const content = input ? input.value.trim() : '';
            if (!content) { showCommentMsg('コメントを入力してください。', false); return; }
            if (content.length > 100) { showCommentMsg('100文字以内で入力してください。', false); return; }
            const lastPosted = parseInt(localStorage.getItem(RATE_LIMIT_KEY) || '0');
            const now = Date.now();
            if (now - lastPosted < RATE_LIMIT_SEC * 1000) {
                showCommentMsg('あと'+Math.ceil((RATE_LIMIT_SEC*1000-(now-lastPosted))/1000)+'秒後に投稿できます。', false); return;
            }
            const btn = document.querySelector('.comment-submit-btn');
            if (btn) btn.disabled = true;
            const { error } = await supabaseClient.from('comments').insert({ article_id:_commentArticleId, article_name:_commentArticleName, article_url:_commentArticleUrl, content:content });
            if (btn) btn.disabled = false;
            if (error) { showCommentMsg('投稿に失敗しました。', false); return; }
            localStorage.setItem(RATE_LIMIT_KEY, now.toString());
            input.value = ''; updateCharCount();
            showCommentMsg('コメントを投稿しました！', true);
            await loadComments();
        }
        function showCommentMsg(text, ok) {
            const el = document.getElementById('comment-msg');
            if (!el) return;
            el.textContent = text; el.style.color = ok ? 'var(--accent-color)' : '#ff6b6b';
            setTimeout(() => { el.textContent = ''; }, 3000);
        }
        async function deleteComment(commentId) {
            if (!_isAdminMode) return;
            if (!confirm('このコメントを削除しますか？')) return;
            const { error } = await supabaseClient.rpc('delete_comment_admin', { comment_id: commentId, admin_token: localStorage.getItem(ADMIN_TOKEN_KEY)||'' });
            if (error) { alert('削除失敗: ' + error.message); return; }
            await loadComments();
        }
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                if (_isAdminMode) {
                    _isAdminMode = false; localStorage.removeItem(ADMIN_TOKEN_KEY);
                    loadComments(); alert('管理者モードを終了しました。'); return;
                }
                const pw = prompt('管理者パスワードを入力してください:');
                if (!pw) return;
                if (pw === ADMIN_PASSWORD) {
                    _isAdminMode = true; localStorage.setItem(ADMIN_TOKEN_KEY, pw);
                    loadComments(); alert('管理者モードに入りました。コメントの🗑ボタンで削除できます。');
                } else { alert('パスワードが違います。'); }
            }
        });
        document.addEventListener('DOMContentLoaded', () => { loadComments(); });`;
}

let count = 0;
for (const [file, meta] of Object.entries(protectedMeta)) {
    const fp = path.join(DIR, file);
    if (!fs.existsSync(fp)) { console.log('Not found: ' + file); continue; }
    let html = fs.readFileSync(fp, 'utf8');
    let changed = false;

    // 1. body タグに data 属性を追加
    if (!html.includes('data-article-category')) {
        html = html.replace(/<body>/i, `<body data-article-category="${meta.cat}" data-article-appearance="${meta.app}">`);
        changed = true;
    }

    // 2. article-common.js の script タグを追加
    if (!html.includes('article-common.js')) {
        html = html.replace(/<\/body>/i, '    <script src="article-common.js" defer></script>\n</body>');
        changed = true;
    }

    // 3. infobox に sticky を追加
    html = html.replace(
        /\.infobox\s*\{([^}]*?)height:\s*fit-content;([^}]*?)\}/s,
        (m, before, after) => {
            if (m.includes('position: sticky')) return m;
            return `.infobox {${before}height: fit-content;\n            position: sticky;\n            top: 20px;\n            align-self: start;${after}}`;
        }
    );
    changed = true;

    // 4. .content のフォントサイズを最適化
    html = html.replace(/\.content\s*\{([^}]*?)font-size:\s*1\.1em;/s, (m, before) => {
        return `.content {${before}font-size: 1em;\n            line-height: 1.9;`;
    });

    // 5. コメントセクションCSSを追加（まだない場合）
    if (!html.includes('comments-section') && html.includes('</style>')) {
        html = html.replace('</style>', COMMENT_CSS + '\n    </style>');
        changed = true;
    }

    // 6. コメントセクションHTMLを追加（</main>の直前）
    if (!html.includes('id="comments-section"') && html.includes('</main>')) {
        html = html.replace('</main>', COMMENT_HTML + '\n        </main>');
        changed = true;
    }

    // 7. コメントJSを追加（既存スクリプトブロック内、lightbox keydownの後）
    if (!html.includes('_commentArticleId') && html.includes('article-common.js')) {
        // 記事IDを取得（いいねボタンのdata-article-id or ファイル名から）
        const idMatch = html.match(/data-article-id="([^"]+)"/);
        const articleId = idMatch ? idMatch[1] : file.replace('.html', '');
        const titleMatch = html.match(/<title>([^|<]+)/);
        const articleName = titleMatch ? titleMatch[1].trim() : file.replace('.html', '');
        const articleUrl = file;

        // </script>の直前（最後のscriptブロックの終わりに）に挿入
        const commentJs = buildCommentScript(articleId, articleName, articleUrl);
        html = html.replace(/(\s*<\/script>\s*\n\s*<script src="article-common\.js")/, `${commentJs}\n    </script>\n    <script src="article-common.js"`);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(fp, html, 'utf8');
        console.log('Updated: ' + file);
        count++;
    } else {
        console.log('Already up to date: ' + file);
    }
}
console.log(`Done: ${count} files updated`);
