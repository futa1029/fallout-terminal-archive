const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const cheerio = require('cheerio');

const DIR = 'f:\\Fallout';
const IMG_DIR = path.join(DIR, 'images', 'note_extracted');
const DATA_FILE = path.join(DIR, 'note_articles_data.json');

// Supabase設定（既存のものを踏襲）
const supabaseUrl = 'https://qkdjufvdeisnunismgaw.supabase.co';
const supabaseKey = 'sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';

// 画像保存用フォルダ作成
if (!fs.existsSync(IMG_DIR)) {
    fs.mkdirSync(IMG_DIR, { recursive: true });
}

// カテゴリ推定関数 (auto_categorize_lore.js の移植)
function guessCategoryAndAppearance(title, bodyText) {
    let cat = "";
    let apps = new Set();
    let tags = new Set();

    const t = title.toLowerCase();
    const b = bodyText ? bodyText.toLowerCase() : "";

    // -- Category Guessing --
    if (/(駅|小屋|邸宅|集会所|タワー|農場|工場|キャンプ|・リッジ|ロッジ|会社|製造所|橋|灯台|研究所|パビリオン|酒場|教会|Vault|廃品集積場|基地|アンダーグラウンド|ヘルヴェティア|ポイント・プレザント|ポトマック川|キャビン|ステーション|監視地点|ウェイワード|水処理場|鉱山|サマーズビル|洞窟)/i.test(t)) cat = "場所";
    else if (/(ピストル|ガン|ライフル|アサルト|ブランダーバス|剣|弓|頭部|フレア|プラカード|書物|ボルトアクション)/i.test(t)) cat = "武器";
    else if (/(レイダー|エンクレイヴ|入植者|フリーラジカルズ|レスポンダー|ブラザーフッド|BOS|カルト|共和国|ncr|ブラッド・イーグル|アウトキャスト|ギャング)/i.test(t)) cat = "勢力";
    else if (/(おばあちゃん|ダッチェス|モート|ソール|ポリー|キンボール|タンディ|モルデイヴァー|デル・ローソン|モルデカイ|居住者|フランク|ジョン・ハンコック|マジソン・リー|チェイス|サパースタイン|監督官|ロニー|エドウィン|ベケット|ゲイリー|ジェームス|パイパー・ライト|アッシュ・ローズ|アデレード|ドッティ|ジュンコ|ジェフ・ナカムラ|エイミー・ケリー|チャールズ|リー|ザ・クロウ|ゾルボ)/i.test(t)) cat = "人物";
    else if (/(アングラー|スコーチ|ウェンディゴ|ブロートフライ|アサルトロン|ハンディ|プロテクトロン|モールラット|アリ|デスクロー|ビーバー|犬|ラット|ゼータ|モスマン|バラモン|ロボブレイン|ラッドガル|中傷ボット|プライズボット|ブラッドバグ|蜂|クリーチャー|コズワース|エイリアン)/i.test(t)) cat = "クリーチャー";
    else if (/(花|ハルシジェン|ブライト|ユッカ|キノコ|茸|カボチャ|スーザン|マリーゴールド|タバコ)/i.test(t)) cat = "植物";
    else if (/(メンタス|スティムパック|rad-x|radaway|サイコ|アディクトール|ヌカシャイン|コーラ|サルサパリラ|フード|シュガーボム|バファウト|パワーアーマー|バックパック|ボトルキャップ|ランチボックス|石鹸|水|雑誌|ホロテープ|ボトル|ハット|キャップ|服|衣装|カード|マック＆チーズ|バブルガム|ボブルヘッド|Pip-Boy|ゲーム|ホロテープ)/i.test(t)) cat = "アイテム";
    else if (/(イベント|デイリー|クエスト|Fasnacht|Mischief|Meat-Cook|Equinox|パブリックイベント|変異|反射)/i.test(t)) cat = "イベント・現象";
    else cat = "記録"; // デフォルト

    if (/(Fallout 76|アパラチア|ウェイワード|76)/i.test(b) || /(Fallout 76)/i.test(t)) tags.add("#Fallout76");
    if (/(Fallout 4|連邦|サンクチュアリ)/i.test(b) || /(Fallout 4)/i.test(t)) tags.add("#Fallout4");
    if (/(Fallout 3|キャピタル)/i.test(b) || /(Fallout 3)/i.test(t)) tags.add("#Fallout3");
    if (/(New Vegas|モハビ|ニューベガス)/i.test(b) || /(New Vegas)/i.test(t)) tags.add("#FalloutNV");
    if (/(Fallout 1|Fallout 2|クラシック)/i.test(b)) tags.add("#ClassicFallout");

    switch (cat) {
        case "場所": tags.add("#Location"); break;
        case "武器": tags.add("#Weapon"); break;
        case "勢力": tags.add("#Faction"); break;
        case "人物": tags.add("#Person"); break;
        case "クリーチャー": tags.add("#Creature"); break;
        case "植物": tags.add("#Plant"); break;
        case "アイテム": tags.add("#Item"); break;
        case "イベント・現象": tags.add("#Event"); break;
        default: tags.add("#Lore"); break;
    }

    return { category: cat, tags: Array.from(tags) };
}

function getThemeColor(category) {
    switch (category) {
        case "人物": return "#00ff00"; // Terminal Green
        case "場所": return "#ffce07"; // Vault Boy Yellow
        case "勢力": return "#00aaff"; // Vault-Tec Blue / NCR Blue
        case "武器": return "#ff4444"; // Danger Red
        case "クリーチャー": return "#ff8800"; // Caution Orange
        case "植物": return "#aaff00"; // Mutated Green
        case "アイテム": return "#ff66cc"; // Mentats Pink
        case "イベント・現象": return "#9933ff"; // Event Purple
        default: return "#00ff00"; // Default Green
    }
}

// 共通レイアウト用HTMLジェネレータ
// firstImageUrl: 本文中の一番最初の画像（もしあれば抽出用）
function generateHtml(article, processedBody, firstImageUrl, categoryName, themeColor, infoboxItems = [], tags = [], copyrightText = "", appearances = []) {
    const safeTitle = article.title.replace(/"/g, '&quot;');
    const articleId = `note_${article.key}`; // supabaseのlike用キー

    // Infobox生成
    let infoboxRows = '';

    // カテゴリは常に一番上に表示する
    let finalItems = [{ label: 'カテゴリ', value: categoryName }];

    if (infoboxItems.length > 0) {
        finalItems = finalItems.concat(infoboxItems);
    }

    infoboxRows = finalItems.map(item => `<div class="infobox-row"><span class="infobox-label">${item.label}</span><span>${item.value}</span></div>`).join('\n            ');

    let tagsHtml = tags.map(t => `<span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">${t}</span>`).join('');

    return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>${safeTitle} | Overseer Mohi's Terminal</title>
    <!-- Open Graph / Discord Embed -->
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Overseer Mohi's Terminal">
    <meta property="og:title" content="${safeTitle} | Overseer Mohi's Terminal">
    <meta property="og:description" content="${safeTitle}のFalloutロア記事。Overseer Mohi's Terminalで読む。">
    <meta property="og:image" content="https://www.fallout-jp.com/${firstImageUrl || 'images/og-default.png'}">
    <meta property="og:url" content="https://www.fallout-jp.com/${article.key ? article.key + '.html' : ''}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${safeTitle} | Overseer Mohi's Terminal">
    <meta name="twitter:description" content="${safeTitle}のFalloutロア記事。Overseer Mohi's Terminalで読む。">
    <meta name="twitter:image" content="https://www.fallout-jp.com/${firstImageUrl || 'images/og-default.png'}">
    <!-- Supabase CDN -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #0f0f0f;
            --text-color: #e0e0e0;
            --accent-color: ${themeColor}; /* Dynamic Theme Color */
            --header-bg: #1a1a1a;
            --panel-bg: #222;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: 'Noto Sans JP', sans-serif;
            margin: 0;
            line-height: 1.8;
        }

        /* 2-Column Grid Layout */
        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 30px;
        }

        h1, h2, h3 {
            font-family: 'Share Tech Mono', 'Noto Sans JP', monospace;
            color: var(--accent-color);
            border-bottom: 1px solid var(--accent-color);
            padding-bottom: 5px;
        }

        h1 {
            font-size: 2.2em;
            margin-top: 0;
            line-height: 1.4;
        }


        /* Sidebar InfoBox */
        .infobox {
            background: var(--panel-bg);
            border: 2px solid var(--accent-color);
            padding: 15px;
            height: fit-content;
            position: sticky;
            top: 20px;
            align-self: start;
        }

        .infobox img {
            width: 100%;
            border: 1px solid #555;
            margin-bottom: 15px;
        }

        .infobox-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            font-size: 0.9em;
            border-bottom: 1px dashed #444;
        }

        .infobox-label {
            color: var(--accent-color);
            font-weight: bold;
        }

        /* Content Area matching manual entries */
        .content {
            background: rgba(255, 255, 255, 0.05);
            padding: 30px;
            border-radius: 5px;
            font-size: 1em;
            line-height: 1.9;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        }

        /* Quote Box for Impressions */
        .quote-box {
            font-style: auto;
            border-left: 4px solid var(--accent-color);
            padding-left: 20px;
            margin: 40px 0 20px 0;
            background: color-mix(in srgb, var(--accent-color) 10%, transparent);
            padding: 15px;
            border-radius: 0 5px 5px 0;
            line-height: 1.6;
        }

        .quote-box b {
            color: var(--accent-color);
            font-size: 1.05em;
        }

        .content a {
            color: var(--accent-color);
            text-decoration: none;
            border-bottom: 1px solid transparent;
        }

        .content a:hover {
            border-bottom: 1px solid var(--accent-color);
        }
        
        /* Auto Cross-Links */
        .auto-link {
            color: var(--accent-color) !important;
            font-weight: bold;
            text-decoration: none;
            border-bottom: 1px dashed var(--accent-color) !important;
            transition: all 0.2s;
            padding: 0 2px;
        }

        .auto-link:hover {
            background-color: color-mix(in srgb, var(--accent-color) 20%, transparent);
            border-bottom: 1px solid var(--accent-color) !important;
        }

        /* Note specific Inline Images */
        .note-figure {
            margin: 30px 0;
            text-align: center;
        }
        
        /* Terminal / Holotape / Note Logs */
        .note-figure blockquote {
            background-color: rgba(0, 0, 0, 0.4);
            border: 1px solid var(--accent-color);
            border-left: 5px solid var(--accent-color);
            padding: 20px;
            margin: 0;
            border-radius: 4px;
            color: #dcdcdc;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.8);
            font-family: 'Share Tech Mono', 'Noto Sans JP', monospace;
            text-align: left;
        }

        .content img {
            max-width: 100%;
            height: auto;
            border: 1px solid #444;
            display: block;
            margin: 0 auto 10px auto;
        }

        .note-figcaption {
            text-align: center;
            font-size: 0.9em;
            color: #888;
            margin-bottom: 20px;
            font-style: italic;
        }

        /* Action Header */
        .action-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }

        .back-link {
            display: inline-block;
            color: var(--accent-color);
            text-decoration: none;
            border: 1px solid var(--accent-color);
            padding: 8px 15px;
            font-family: 'Share Tech Mono', monospace;
            transition: all 0.2s;
        }

        .back-link:hover {
            background: var(--accent-color);
            color: var(--bg-color);
        }

        .like-button {
            background: transparent;
            border: 1px solid var(--accent-color);
            color: var(--accent-color);
            padding: 8px 15px;
            font-size: 1.1em;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: 'Share Tech Mono', monospace;
            border-radius: 4px;
            transition: all 0.2s;
        }

        .like-button:hover {
            box-shadow: 0 0 10px var(--accent-color);
        }

        .like-button.liked {
            background: var(--accent-color);
            color: var(--bg-color);
        }

        @media (max-width: 768px) {
            .container {
                grid-template-columns: 1fr;
                padding: 10px;
                gap: 20px;
            }
            .infobox {
                grid-row: 1;
                width: 100%;
                box-sizing: border-box;
            }
            .content {
                padding: 15px;
            }
            h1 {
                font-size: 1.6em;
            }
            .action-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 15px;
            }
        }

        /* Lightbox */
        .lightbox-overlay {
            display: none;
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.92);
            z-index: 9999;
            cursor: zoom-out;
            justify-content: center;
            align-items: center;
        }
        .lightbox-overlay.active {
            display: flex;
        }
        .lightbox-overlay img {
            max-width: 95vw;
            max-height: 95vh;
            object-fit: contain;
            border: 2px solid var(--accent-color);
            box-shadow: 0 0 40px rgba(0, 255, 0, 0.3);
            border-radius: 4px;
        }
        .content img, .infobox img, .gallery-item img {
            cursor: zoom-in;
        }

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
        .comment-form {
            margin-bottom: 20px;
        }
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
        .comment-textarea:focus {
            box-shadow: 0 0 8px var(--accent-color);
        }
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
        .comment-submit-btn:hover, .comment-submit-btn:not(:disabled):hover {
            background: var(--accent-color);
            color: var(--bg-color);
        }
        .comment-submit-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .comment-msg {
            font-size: 0.85em;
            min-height: 1.2em;
            margin-top: 4px;
            font-family: 'Share Tech Mono', monospace;
        }
        .comments-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
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
        .comment-body {
            font-size: 0.92em;
            line-height: 1.6;
            word-break: break-all;
        }
        .comment-delete-btn {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1em;
            padding: 2px 6px;
            border-radius: 3px;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        .comment-delete-btn:hover { opacity: 1; }
        .comment-empty, .comment-loading {
            color: #666;
            font-size: 0.85em;
            font-family: 'Share Tech Mono', monospace;
            padding: 10px 0;
        }
    </style>
</head>
<body data-article-category="${categoryName}" data-article-appearance="${appearances.join(',')}">
    <div class="container">
        <!-- Sidebar -->
        <aside class="infobox">
            <h3 style="margin-top:0; text-align:center;">${safeTitle}</h3>
            ${firstImageUrl ? `<img src="${firstImageUrl}" alt="${safeTitle}">` : ''}
            ${infoboxRows}
        </aside>

        <!-- Main Content -->
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
                <button class="like-button" data-article-id="${articleId}" onclick="toggleLike(this)">
                    <span class="heart">♡</span> <span class="like-count">0</span>
                </button>
            </div>

            <h1>${safeTitle}</h1>
            
            ${processedBody}

            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <div style="margin-bottom: 10px;">
                    TAGS: ${tagsHtml}
                </div>
                ${copyrightText}
                <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
            </div>

            <!-- Comments Section -->
            <div class="comments-section" id="comments-section">
                <h3 class="comments-title">&gt; COMMENTS</h3>
                <div class="comment-form">
                    <textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力 (最大100文字)..." oninput="updateCharCount()"></textarea>
                    <!-- ハニーポット：ボット対策（人間には見えない） -->
                    <input type="text" id="hp_field" name="website" style="display:none;position:absolute;left:-9999px" tabindex="-1" autocomplete="off" aria-hidden="true">
                    <div class="comment-form-footer">
                        <span class="char-count"><span id="char-count">0</span> / 100</span>
                        <button class="comment-submit-btn" onclick="submitComment()">SEND ▶</button>
                    </div>
                    <div id="comment-msg" class="comment-msg"></div>
                </div>
                <div id="comments-list" class="comments-list">
                    <div class="comment-loading">LOADING...</div>
                </div>
            </div>
        </main>
    </div>

    <!-- Lightbox Overlay -->
    <div class="lightbox-overlay" id="lightbox" onclick="this.classList.remove('active')">
        <img id="lightbox-img" src="" alt="拡大画像">
    </div>

    <!-- Supabase Scripts -->
    <script>
        const supabaseUrl = '${supabaseUrl}';
        const supabaseKey = '${supabaseKey}';
        const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

        async function toggleLike(btn) {
            const articleId = btn.getAttribute('data-article-id');
            let isLiked = localStorage.getItem(articleId + '_liked') === 'true';
            btn.disabled = true;

            if (isLiked) {
                isLiked = false;
                const { data, error } = await supabaseClient.rpc('decrement_like', { article_id_param: articleId });
                if (!error) {
                    localStorage.setItem(articleId + '_liked', isLiked);
                    updateLikeButton(btn, isLiked, data);
                }
            } else {
                isLiked = true;
                const { data, error } = await supabaseClient.rpc('increment_like', { article_id_param: articleId });
                if (!error) {
                    localStorage.setItem(articleId + '_liked', isLiked);
                    updateLikeButton(btn, isLiked, data);
                }
            }
            btn.disabled = false;
        }

        function updateLikeButton(btn, isLiked, count) {
            const heart = btn.querySelector('.heart');
            const countSpan = btn.querySelector('.like-count');
            if (isLiked) {
                btn.classList.add('liked');
                heart.textContent = '♥';
            } else {
                btn.classList.remove('liked');
                heart.textContent = '♡';
            }
            countSpan.textContent = count;
        }

        document.addEventListener('DOMContentLoaded', async () => {
            const btn = document.querySelector('.like-button');
            if (btn) {
                const articleId = btn.getAttribute('data-article-id');
                const isLiked = localStorage.getItem(articleId + '_liked') === 'true';
                const { data, error } = await supabaseClient
                    .from('likes')
                    .select('like_count')
                    .eq('article_id', articleId)
                    .single();

                let count = 0;
                if (!error && data) count = data.like_count;
                updateLikeButton(btn, isLiked, count);
            }
            // コメントを読み込む
            await loadComments();
        });
        // Lightbox: 画像クリックで元画像を表示
        document.querySelectorAll('.content img, .infobox img, .gallery-item img').forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                const overlay = document.getElementById('lightbox');
                document.getElementById('lightbox-img').src = img.src;
                overlay.classList.add('active');
            });
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') document.getElementById('lightbox').classList.remove('active');
        });

        // ========== コメント機能 ==========
        // 記事情報（HTMLから取得）
        const _commentArticleId = (document.querySelector('[data-article-id]') || {}).getAttribute?.('data-article-id') || location.pathname.split('/').pop().replace('.html', '');
        const _commentArticleName = document.title.split('|')[0].trim();
        const _commentArticleUrl = location.pathname.split('/').pop();
        const ADMIN_TOKEN_KEY = 'fallout_admin_token';
        const ADMIN_PASSWORD = 'tq7jtq7j'; // ← ここに管理者パスワードを入力
        const RATE_LIMIT_KEY = 'comment_last_posted';
        const RATE_LIMIT_SEC = 60;
        let _isAdminMode = false;

        // 文字数カウンター
        function updateCharCount() {
            const len = document.getElementById('comment-input').value.length;
            const el = document.getElementById('char-count');
            if (el) {
                el.textContent = len;
                el.style.color = len > 90 ? '#ff6b6b' : 'var(--accent-color)';
            }
        }

        // 相対時刻
        function relativeTime(isoStr) {
            const diff = (Date.now() - new Date(isoStr).getTime()) / 1000;
            if (diff < 60) return 'たった今';
            if (diff < 3600) return Math.floor(diff / 60) + '分前';
            if (diff < 86400) return Math.floor(diff / 3600) + '時間前';
            if (diff < 86400 * 7) return Math.floor(diff / 86400) + '日前';
            return new Date(isoStr).toLocaleDateString('ja-JP');
        }

        // コメント一覧を表示
        function renderComments(comments) {
            const list = document.getElementById('comments-list');
            if (!list) return;
            if (!comments || comments.length === 0) {
                list.innerHTML = '<div class="comment-empty">まだコメントがありません。最初のコメントを投稿してみましょう！</div>';
                return;
            }
            list.innerHTML = comments.map(c => \`
                <div class="comment-item" data-id="\${c.id}">
                    <div class="comment-meta">
                        <span class="comment-time">\${relativeTime(c.created_at)}</span>
                        \${_isAdminMode ? \`<button class="comment-delete-btn" title="完全削除" onclick="deleteComment('\${c.id}')">&#128465;</button><button class="comment-delete-btn" title="非表示(サイレント)" onclick="hideComment('\${c.id}')">&#128064;</button>\` : ''}
                    </div>
                    <div class="comment-body">\${escapeHtml(c.content)}</div>
                </div>
            \`).join('');
        }

        // HTMLエスケープ
        function escapeHtml(str) {
            return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
        }

        // コメント読み込み
        async function loadComments() {
            const list = document.getElementById('comments-list');
            if (!list) return;
            const { data, error } = await supabaseClient
                .from('comments')
                .select('id, content, created_at')
                .eq('article_id', _commentArticleId)
                .order('created_at', { ascending: false })
                .limit(50);
            if (error) {
                list.innerHTML = '<div class="comment-empty">コメントを読み込めませんでした。</div>';
                return;
            }
            renderComments(data || []);
        }

        // コメント投稿
        async function submitComment() {
            const input = document.getElementById('comment-input');
            const msg = document.getElementById('comment-msg');
            if (!input || !msg) return;

            // ① ハニーポットチェック（ボット検出）
            const hp = document.getElementById('hp_field');
            if (hp && hp.value !== '') return; // サイレント拒否

            const content = input.value.trim();
            if (!content) { showCommentMsg('コメントを入力してください。', false); return; }
            if (content.length > 100) { showCommentMsg('100文字以内で入力してください。', false); return; }

            // ② NGワードチェック（クライアント側）
            const NG_WORDS = [
                '広啄', 'http://', 'https://', 'LINE', 'DMして', '難民', 'ビッチ', '死ね',
                'クソ', 'アホ', 'ウザイ', 'メルマガ', 'discord.gg', 't.me', 'clickして'
            ];
            const lc = content.toLowerCase();
            if (NG_WORDS.some(w => lc.includes(w.toLowerCase()))) {
                showCommentMsg('不適切な表現が含まれていルため投稿できません。', false);
                return;
            }

            // レート制限チェック（60秒）
            const lastPosted = parseInt(localStorage.getItem(RATE_LIMIT_KEY) || '0');
            const now = Date.now();
            if (now - lastPosted < RATE_LIMIT_SEC * 1000) {
                const remain = Math.ceil((RATE_LIMIT_SEC * 1000 - (now - lastPosted)) / 1000);
                showCommentMsg(\`あと\${remain}秒後に投稿できます。\`, false);
                return;
            }

            const btn = document.querySelector('.comment-submit-btn');
            if (btn) btn.disabled = true;
            const { error } = await supabaseClient.from('comments').insert({
                article_id: _commentArticleId,
                article_name: _commentArticleName,
                article_url: _commentArticleUrl,
                content: content
            });
            if (btn) btn.disabled = false;

            if (error) {
                showCommentMsg('投稿に失敗しました。', false);
                return;
            }
            localStorage.setItem(RATE_LIMIT_KEY, now.toString());
            input.value = '';
            updateCharCount();
            showCommentMsg('コメントを投稿しました！', true);
            await loadComments();
        }

        function showCommentMsg(text, ok) {
            const el = document.getElementById('comment-msg');
            if (!el) return;
            el.textContent = text;
            el.style.color = ok ? 'var(--accent-color)' : '#ff6b6b';
            setTimeout(() => { el.textContent = ''; }, 3000);
        }

        // 管理者：コメント完全削除
        async function deleteComment(commentId) {
            if (!_isAdminMode) return;
            if (!confirm('このコメントを完全に削除しますか？(非表示にするならビルボードボタンを使ってください)')) return;
            const { error } = await supabaseClient.rpc('delete_comment_admin', {
                comment_id: commentId,
                admin_token: localStorage.getItem(ADMIN_TOKEN_KEY) || ''
            });
            if (error) { alert('削除失敗: ' + error.message); return; }
            await loadComments();
        }

        // 管理者：コメントサイレント非表示（④ is_hidden フラグ）
        async function hideComment(commentId) {
            if (!_isAdminMode) return;
            if (!confirm('このコメントを非表示(サイレント)にしますか？投稿者には通知されません。')) return;
            const { error } = await supabaseClient.rpc('hide_comment_admin', {
                comment_id: commentId,
                admin_token: localStorage.getItem(ADMIN_TOKEN_KEY) || ''
            });
            if (error) { alert('非表示失敗: ' + error.message); return; }
            await loadComments();
        }

        // 管理者モード切替（Ctrl+Shift+D）
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                if (_isAdminMode) {
                    _isAdminMode = false;
                    localStorage.removeItem(ADMIN_TOKEN_KEY);
                    renderComments([]);
                    loadComments();
                    alert('管理者モードを終了しました。');
                    return;
                }
                const pw = prompt('管理者パスワードを入力してください:');
                if (!pw) return;
                if (pw === ADMIN_PASSWORD) {
                    _isAdminMode = true;
                    localStorage.setItem(ADMIN_TOKEN_KEY, pw);
                    loadComments();
                    alert('管理者モードに入りました。\n🗑 = 完全削除 / 👁 = サイレント非表示');
                } else {
                    alert('パスワードが違います。');
                }
            }
        });
    </script>
    <script src="article-common.js" defer></script>
</body>
</html>`;
}

// 画像をダウンロードしてローカルパスを返す関数
async function downloadImageAndFixPath(imageUrl, articleKey, index) {
    if (!imageUrl) return '';
    try {
        const ext = path.extname(new URL(imageUrl).pathname) || '.jpg';
        const filename = `${articleKey}_img_${index}${ext}`;
        const savePath = path.join(IMG_DIR, filename);

        // 既にダウンロード済みならスキップ
        if (fs.existsSync(savePath)) {
            return `images/note_extracted/${filename}`;
        }

        const client = imageUrl.startsWith('https') ? https : http;
        await new Promise((resolve, reject) => {
            client.get(imageUrl, (res) => {
                if (res.statusCode !== 200) {
                    reject(new Error(`Failed to GET ${imageUrl} (${res.statusCode})`));
                    return;
                }
                const fileStream = fs.createWriteStream(savePath);
                res.pipe(fileStream);
                fileStream.on('finish', () => resolve());
            }).on('error', reject);
        });

        return `images/note_extracted/${filename}`;
    } catch (e) {
        console.error(`  [!] Image Download Error: ${e.message}`);
        return imageUrl; // エラー時は元のURLのままにする
    }
}

async function processArticles() {
    if (!fs.existsSync(DATA_FILE)) {
        console.log('No data file found! Run fetch_all_notes.js first.');
        return;
    }

    const dataRaw = fs.readFileSync(DATA_FILE, 'utf8');
    const articles = JSON.parse(dataRaw);
    console.log(`Loaded ${articles.length} articles from JSON.`);

    let titleToSlug = {};
    const slugPath = path.join(DIR, 'title_to_slug.json');
    if (fs.existsSync(slugPath)) {
        titleToSlug = JSON.parse(fs.readFileSync(slugPath, 'utf8'));
    }

    // 既に手作業で作った特定のファイル群を上書きから守るリスト（拡張子除く）
    const protectedFiles = ['kimball', 'tandi', 'raiders_76', 'blight', 'ncr', 'prize_bot', 'assaultron_head', 'lee_moldaver', 'vault_dweller_lore', 'vault_dweller_jp', 'wayward_jp', 'buffalo-gourd-seed', 'vault_tec', 'armor-ace', 'billings-homestead', 'fallout-76-pets', 'bloodleaf', 'single-action-revolver', 'cabbage', 'vault', 'catarax'];
    const usedFilenames = new Set();
    // 既存ファイル名を予約済みにする
    protectedFiles.forEach(f => usedFilenames.add(`${f}.html`));

    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        if (!article.bodyHtml) continue;

        let sanitized = '';
        if (titleToSlug[article.title]) {
            sanitized = titleToSlug[article.title];
        } else {
            sanitized = article.title.replace(/[\\/:*?"<>|]/g, '_').trim();
            if (!sanitized) sanitized = 'untitled';
        }
        let htmlFilename = `${sanitized}.html`;

        // 既に保護リストにある場合は、その記事の生成をスキップする（手動版を優先）
        // ただし、相互リンク辞書（articles[i].htmlFilename）には登録して、他ページからのリンクが正しく張られるようにする
        if (protectedFiles.includes(sanitized)) {
            console.log(`[Protected] Skipping generation for: ${htmlFilename}`);
            articles[i].htmlFilename = htmlFilename;
            articles[i].processedBody = article.bodyHtml; // リンク適用前の生データだが辞書登録には十分
            continue;
        }

        let counter = 2;
        while (usedFilenames.has(htmlFilename)) {
            htmlFilename = `${sanitized}_${counter}.html`;
            counter++;
        }
        usedFilenames.add(htmlFilename);

        const htmlSavePath = path.join(DIR, htmlFilename);

        // （既に個別化しているものを上書き生成しないようにするならスキップ条件をいれる事も可能ですが、今回はすべて共通のターミナルフォーマットで一括生成します。「note_xxxx.html」という接頭辞で別物として保存するため重複しません）

        console.log(`[${i + 1}/${articles.length}] Processing HTML: ${htmlFilename}`);

        let bodyCopy = article.bodyHtml;

        // <img src="URL" ...> を正規表現で探し出し、ローカルに落とす
        const imgRegex = /<img[^>]+src="([^">]+)"/ig;
        let match;
        let imgIndex = 1;

        while ((match = imgRegex.exec(article.bodyHtml)) !== null) {
            const originalUrl = match[1];
            // 画像ダウンロード
            const localRelativePath = await downloadImageAndFixPath(originalUrl, article.key, imgIndex);
            // 本文内のURLをローカルのパスに置き換え
            bodyCopy = bodyCopy.replace(originalUrl, localRelativePath);
            imgIndex++;
        }

        // ==== 最初の画像(figure)の抽出と削除 ====
        // <figure> と <figcaption> を <div> に置換してしまう前に、
        // 最初の画像のブロックごと切り取って Infobox 用に退避させる。
        // これにより </div> の閉じタグが迷子になってレイアウトが崩れるのを確実に防ぐ。
        let firstImageUrl = "";
        const figureRegex = /<figure[^>]*>[\s\S]*?<img[^>]+src="([^">]+)"[\s\S]*?<\/figure>/i;
        const figureMatch = bodyCopy.match(figureRegex);
        if (figureMatch) {
            firstImageUrl = figureMatch[1];
            bodyCopy = bodyCopy.replace(figureRegex, '');
        }

        // note特有の不要なクラス等の掃除（簡易）
        bodyCopy = bodyCopy.replace(/<figure[^>]*>/g, '<div class="note-figure">');
        bodyCopy = bodyCopy.replace(/<\/figure>/g, '</div>');
        bodyCopy = bodyCopy.replace(/<figcaption[^>]*>/g, '<div class="note-figcaption">');
        bodyCopy = bodyCopy.replace(/<\/figcaption>/g, '</div>');

        // ==== ここで記事生成前に一時保存しておく ====
        articles[i].htmlFilename = htmlFilename;
        articles[i].processedBody = bodyCopy;
        articles[i].firstImageUrl = firstImageUrl;
    }

    // ==== 相互リンク生成処理 ====
    // 全記事のタイトルとHTMLファイル名のペアを作成
    // 文字列の長さ順にソート（部分一致を防ぐため：例えば「Fallout 76」より先に「Fallout」を置換させない）
    const linkDict = articles
        .filter(a => a.htmlFilename)
        .map(a => ({ title: a.title, url: a.htmlFilename }))
        .sort((a, b) => b.title.length - a.title.length);

    console.log(`\nApplying cross-links...`);

    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        if (!article.processedBody) continue;

        let finalBody = article.processedBody;

        // <a href> の中やタグの中など、既にHTMLになっている部分を壊さないようにするための簡易置換
        // 今回の要件であれば、本文テキストに対して他の全タイトルを検索してリンク化する
        // ただし自分自身のタイトルはリンクしない
        // HTMLタグを分解してからテキスト部分のみに置換を適用する安全な設計
        // 相互リンクから意図的に外したい特定の記事名（ブラックリスト）
        const excludeFromLinking = ['Vaultの居住者'];

        for (const linkObj of linkDict) {
            if (linkObj.title === article.title) continue;
            if (linkObj.title.length < 2) continue; // 1文字のタイトルは誤爆が多いため除外
            if (excludeFromLinking.includes(linkObj.title)) continue; // 除外リストのタイトルならばスキップ

            const escapedTitle = linkObj.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // 文字種（カタカナ、英数字）のみのタイトルの場合、同じ文字種が前後にある場合のみ置換を除外する
            let beforeBlock = '[ァ-ヶー一-龠A-Za-z0-9]';
            let afterBlock = '[ァ-ヶー一-龠A-Za-z0-9]';
            if (linkObj.title.match(/^[ァ-ヶー]+$/)) {
                beforeBlock = '[ァ-ヶー]';
                afterBlock = '[ァ-ヶー]';
            } else if (linkObj.title.match(/^[A-Za-z0-9\\s-]+$/)) {
                beforeBlock = '[A-Za-z0-9]';
                afterBlock = '[A-Za-z0-9]';
            }
            const searchRegex = new RegExp(`(?<!${beforeBlock})(${escapedTitle})(?!${afterBlock})`, 'g');

            // HTMLをタグとテキストに分解（`<...>` にマッチさせる）
            const parts = finalBody.split(/(<[^>]+>)/g);
            let inLink = false;

            for (let j = 0; j < parts.length; j++) {
                const part = parts[j];
                if (part.startsWith('<')) {
                    // タグの部分
                    if (part.toLowerCase().startsWith('<a')) {
                        inLink = true; // リンク内部に入った
                    } else if (part.toLowerCase().startsWith('</a')) {
                        inLink = false; // リンクから出た
                    }
                } else {
                    // テキストノードの部分
                    if (!inLink && part.trim() !== '') {
                        parts[j] = part.replace(searchRegex, `<a href="${linkObj.url}" class="auto-link">$1</a>`);
                    }
                }
            }
            finalBody = parts.join('');
        }

        const htmlSavePath = path.join(DIR, article.htmlFilename);

        // 2段階目のパスでも保護を適用（書き出しをスキップ）
        let sanitized = '';
        if (titleToSlug[article.title]) {
            sanitized = titleToSlug[article.title];
        } else {
            sanitized = article.title.replace(/[\\/:*?"<>|]/g, '_').trim();
        }
        if (protectedFiles.includes(sanitized)) {
            console.log(`[Protected] Skipping file write for: ${article.htmlFilename}`);
            continue;
        }

        // ==== 感想セクションの quote-box 化 ====
        // <h2>感想</h2> から末尾のライセンス記述 (This article uses material...) までの内容を抽出し、変換する
        const kansoRegex = /(<h2[^>]*>感想<\/h2>\s*)([\s\S]*?)$/i;
        const matchKanso = finalBody.match(kansoRegex);

        if (matchKanso) {
            let kansoContent = matchKanso[2];

            // </div> ゴミが混ざっている場合があるので消去
            kansoContent = kansoContent.replace(/<\/div>/gi, '');
            // 画像タグは感想内では消すか残すか（一応残す場合も考慮してそのまま）

            // <p>を<br>に変換
            kansoContent = kansoContent.replace(/<p[^>]*>/gi, '');
            kansoContent = kansoContent.replace(/<\/p>/gi, '<br><br>');

            // <ul/ol>の除去
            kansoContent = kansoContent.replace(/<\/?(ul|ol)[^>]*>/gi, '');

            // <li>の変換
            kansoContent = kansoContent.replace(/<li[^>]*>/gi, '');
            kansoContent = kansoContent.replace(/<\/li>/gi, '<br><br>');

            // <strong>を<b>に変換し、直後のコロン等を見やすくする
            kansoContent = kansoContent.replace(/<strong[^>]*>/gi, '<b>');
            kansoContent = kansoContent.replace(/<\/strong>/gi, '</b>');

            // 連続する<br>の整理（最大2連続にする）
            kansoContent = kansoContent.replace(/(<br\s*\/?>\s*){3,}/ig, '<br><br>');
            kansoContent = kansoContent.trim();
            // 先頭と末尾の過剰なbrを削除
            kansoContent = kansoContent.replace(/^(<br\s*\/?>\s*)+/, '');
            kansoContent = kansoContent.replace(/(<br\s*\/?>\s*)+$/, '');

            const newKansoHtml = `<div class="quote-box">\n<b>感想</b><br><br>\n${kansoContent}\n</div>\n\n`;

            finalBody = finalBody.replace(kansoRegex, `${newKansoHtml}`);
        }

        // ==== Copyright 分離 ====
        let copyrightText = "";
        const copyRegex = /<p[^>]*>(This article uses material.*?|The Fallout wiki.*?Fandom.*?)<\/p>/i;
        const matchCopy = finalBody.match(copyRegex);
        if (matchCopy) {
            copyrightText = matchCopy[0];
            finalBody = finalBody.replace(copyRegex, ""); // 本文からは消し、フッター用に抽出
        }

        // カテゴリ名とテーマカラーの推定
        let firstImageUrl = article.firstImageUrl || "";
        const { category, tags } = guessCategoryAndAppearance(article.title, article.bodyHtml);
        const themeColor = getThemeColor(category);

        // ==== Infobox 項目の抽出 ====
        let infoboxItems = [];
        const $ = cheerio.load(finalBody, null, false);
        const targetSections = ['概要', 'ステータス', '基本情報', '特性', '統計情報', '人物像', '所属するNPC', '能力', 'バリエーション', '設計図'];

        $('h2').each((i, el) => {
            const h2Text = $(el).text().trim();
            if (targetSections.includes(h2Text)) {
                let current = $(el).next();
                while (current.length > 0 && current[0].name !== 'h2' && current[0].name !== 'hr') {
                    if (current[0].name === 'p' || current[0].name === 'ul' || current[0].name === 'ol') {
                        current.find('p, li').addBack('p, li').each((j, textEl) => {
                            if ($(textEl).children('ul, ol').length > 0 && $(textEl)[0].name === 'li') {
                                return;
                            }
                            let htmlContent = $(textEl).html();
                            if (!htmlContent) return;

                            const lines = htmlContent.split(/<br\s*\/?>/i).map(l => l.trim()).filter(l => l);
                            let modifiedHtmlLines = [];
                            let hasExtracted = false;

                            for (let k = 0; k < lines.length; k++) {
                                let lineStr = lines[k];
                                const regexColon = /^(?:<strong[^>]*>)?([^<]+?)(?:<\/strong>)?\s*[:：]\s*(.+)$/i;
                                let matchColon = lineStr.match(regexColon);

                                if (matchColon) {
                                    let key = matchColon[1].replace(/<\/?[^>]+(>|$)/g, "").trim();
                                    let val = matchColon[2].replace(/<\/?strong[^>]*>/gi, "").trim();
                                    let plainVal = val.replace(/<\/?[^>]+(>|$)/g, "").trim();

                                    if (key.length > 0 && key.length < 20 && plainVal.length > 0 && plainVal.length < 60) {
                                        infoboxItems.push({ label: key, value: val });
                                        hasExtracted = true;
                                        continue;
                                    }
                                } else {
                                    const regexStrong = /^<strong[^>]*>([^<]+?)<\/strong>$/i;
                                    let matchStrong = lineStr.match(regexStrong);
                                    if (matchStrong && k + 1 < lines.length) {
                                        let nextLine = lines[k + 1];
                                        if (nextLine && !nextLine.match(regexStrong) && !nextLine.match(regexColon)) {
                                            let key = matchStrong[1].trim();
                                            let val = nextLine.trim();
                                            let plainVal = val.replace(/<\/?[^>]+(>|$)/g, "").trim();
                                            if (key.length > 0 && key.length < 20 && plainVal.length > 0 && plainVal.length < 60) {
                                                infoboxItems.push({ label: key, value: val });
                                                hasExtracted = true;
                                                k++;
                                                continue;
                                            }
                                        }
                                    }
                                }
                                modifiedHtmlLines.push(lineStr);
                            }

                            if (hasExtracted) {
                                if (modifiedHtmlLines.length === 0) {
                                    $(textEl).remove();
                                } else {
                                    $(textEl).html(modifiedHtmlLines.join('<br>'));
                                }
                            }
                        });
                    }
                    current = current.next();
                }
            }
        });

        $('ul, ol, p').each((i, el) => {
            if ($(el).text().trim() === '' && $(el).find('img, a').length === 0) {
                $(el).remove();
            }
        });

        finalBody = $.html();

        // tags から登場作品リストを生成
        const tagToAppearance = { '#Fallout76': 'Fallout 76', '#Fallout4': 'Fallout 4', '#Fallout3': 'Fallout 3', '#FalloutNV': 'Fallout: New Vegas', '#ClassicFallout': 'Fallout' };
        const appearances = tags.filter(t => tagToAppearance[t]).map(t => tagToAppearance[t]);
        if (appearances.length === 0) appearances.push('Fallout 76'); // デフォルト

        const finalHtml = generateHtml(article, finalBody, firstImageUrl, category, themeColor, infoboxItems, tags, copyrightText, appearances);
        fs.writeFileSync(htmlSavePath, finalHtml, 'utf8');
        console.log(`[${i + 1}/${articles.length}] Processing HTML: ${article.htmlFilename}`);
    }

    console.log('\nAll HTML files mapped and saved!');
}

processArticles();
