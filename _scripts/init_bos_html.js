const fs = require('fs');

const introHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>ブラザーフッド・オブ・スティール | Overseer Mohi's Terminal</title>
    <link rel="canonical" href="https://www.fallout-jp.com/brotherhood-of-steel.html">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Overseer Mohi's Terminal">
    <meta property="og:locale" content="ja_JP">
    <meta property="og:title" content="ブラザーフッド・オブ・スティール | Overseer Mohi's Terminal">
    <meta property="og:description" content="ウェイストランド最大のテクノ・ミリタリー教団「ブラザーフッド・オブ・スティール」の全歴史を網羅した詳細なロア記事です。">
    <meta property="og:image" content="https://www.fallout-jp.com/images/note_extracted/brotherhood-base/FOTV_BoS_Base_Flag.png">
    <meta property="og:url" content="https://www.fallout-jp.com/brotherhood-of-steel.html">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@IwamotoFuta">
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <style>
        :root { --bg-color: #0f0f0f; --text-color: #e0e0e0; --accent-color: #00ff00; --header-bg: #1a1a1a; --panel-bg: #222; }
        body { background-color: var(--bg-color); color: var(--text-color); font-family: 'Noto Sans JP', sans-serif; margin: 0; line-height: 1.8; }
        .container { max-width: 1000px; margin: 0 auto; padding: 20px; display: grid; grid-template-columns: 300px 1fr; gap: 30px; }
        h1, h2, h3 { font-family: 'Share Tech Mono', 'Noto Sans JP', monospace; color: var(--accent-color); border-bottom: 1px solid var(--accent-color); padding-bottom: 5px; }
        h1 { font-size: 2.2em; margin-top: 0; line-height: 1.4; }
        .infobox { background: var(--panel-bg); border: 2px solid var(--accent-color); padding: 15px; height: fit-content; position: sticky; top: 20px; align-self: start; }
        .infobox img { width: 100%; border: 1px solid #555; margin-bottom: 15px; cursor: zoom-in; }
        .infobox-row { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9em; border-bottom: 1px dashed #444; text-align: right; }
        .infobox-label { color: var(--accent-color); font-weight: bold; text-align: left; }
        .content { background: rgba(255, 255, 255, 0.05); padding: 30px; border-radius: 5px; font-size: 1em; line-height: 1.9; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); }
        .article-image { max-width: 100%; height: auto; border: 1px solid #444; display: block; margin: 30px auto; cursor: zoom-in; }
        .article-image.right { float: right; width: 45%; margin: 10px 0 20px 25px; clear: right; }
        .article-image.left { float: left; width: 45%; margin: 10px 25px 20px 0; clear: left; }
        .image-caption { text-align: center; font-size: 0.9em; color: #888; margin-top: -20px; margin-bottom: 30px; font-style: italic; }
        .quote-box { border-left: 4px solid var(--accent-color); margin: 40px 0 20px 0; background: color-mix(in srgb, var(--accent-color) 10%, transparent); padding: 15px 15px 15px 20px; border-radius: 0 5px 5px 0; line-height: 1.6; }
        .quote-box b { color: var(--accent-color); font-size: 1.05em; }
        .holotape-box { border-left: 4px solid #E67E22; margin: 30px 0; background: rgba(230, 126, 34, 0.08); padding: 15px 15px 15px 20px; border-radius: 0 5px 5px 0; line-height: 1.7; }
        .holotape-box b { color: #E67E22; font-size: 1.05em; }
        .note-box { border-left: 4px solid #8b9dc3; margin: 30px 0; background: rgba(139, 157, 195, 0.08); padding: 15px 15px 15px 20px; border-radius: 0 5px 5px 0; line-height: 1.7; }
        .note-box b { color: #8b9dc3; font-size: 1.05em; }
        .content a { color: var(--accent-color); text-decoration: none; border-bottom: 1px dashed transparent; }
        .content a:hover { border-bottom: 1px dashed var(--accent-color); }
        .action-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .back-link { display: inline-block; color: var(--accent-color); text-decoration: none; border: 1px solid var(--accent-color); padding: 8px 15px; font-family: 'Share Tech Mono', monospace; transition: all 0.2s; }
        .back-link:hover { background: var(--accent-color); color: var(--bg-color); }
        .like-button { background: transparent; border: 1px solid var(--accent-color); color: var(--accent-color); padding: 8px 15px; font-size: 1.1em; cursor: pointer; display: flex; align-items: center; gap: 8px; font-family: 'Share Tech Mono', monospace; border-radius: 4px; transition: all 0.2s; }
        .like-button:hover { box-shadow: 0 0 10px var(--accent-color); }
        .like-button.liked { background: var(--accent-color); color: var(--bg-color); }
        ul { list-style-type: square; } li::marker { color: var(--accent-color); }
        .gallery-section { margin-top: 50px; }
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
        .gallery-item { background: var(--panel-bg); border: 1px solid #444; border-radius: 4px; overflow: hidden; transition: all 0.3s; }
        .gallery-item:hover { border-color: var(--accent-color); box-shadow: 0 0 10px rgba(0, 255, 0, 0.3); transform: translateY(-2px); }
        .gallery-item img { width: 100%; height: 180px; object-fit: cover; display: block; cursor: zoom-in; }
        .gallery-item .caption { padding: 8px; font-size: 0.8em; color: #aaa; text-align: center; }
        @media (max-width: 768px) { .container { grid-template-columns: 1fr; padding: 10px; gap: 20px; } .infobox { grid-row: 1; width: 100%; box-sizing: border-box; position: static; } .content { padding: 15px; } h1 { font-size: 1.6em; } .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); } .article-image.right { float: none; width: 100%; margin: 10px 0; } }
        .lightbox-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.92); z-index: 9999; cursor: zoom-out; justify-content: center; align-items: center; }
        .lightbox-overlay.active { display: flex; }
        .lightbox-overlay img { max-width: 95vw; max-height: 95vh; object-fit: contain; border: 2px solid var(--accent-color); box-shadow: 0 0 40px rgba(0, 255, 0, 0.3); border-radius: 4px; }
        .comments-section { margin-top: 40px; border-top: 2px solid var(--accent-color); padding-top: 20px; }
        .comments-title { font-family: 'Share Tech Mono', monospace; color: var(--accent-color); margin-bottom: 15px; font-size: 1em; border: none; padding: 0; }
        .comment-form { margin-bottom: 20px; }
        .comment-textarea { width: 100%; box-sizing: border-box; background: rgba(0,0,0,0.4); border: 1px solid var(--accent-color); color: var(--text-color); font-family: 'Noto Sans JP', sans-serif; font-size: 0.95em; padding: 10px; border-radius: 4px; resize: vertical; min-height: 70px; outline: none; transition: box-shadow 0.2s; }
        .comment-textarea:focus { box-shadow: 0 0 8px var(--accent-color); }
        .comment-form-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 6px; }
        .char-count { font-size: 0.8em; color: #888; font-family: 'Share Tech Mono', monospace; }
        .comment-submit-btn { background: transparent; border: 1px solid var(--accent-color); color: var(--accent-color); padding: 6px 16px; font-family: 'Share Tech Mono', monospace; font-size: 0.9em; cursor: pointer; border-radius: 4px; transition: all 0.2s; }
        .comment-submit-btn:hover { background: var(--accent-color); color: var(--bg-color); }
        .comment-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .comment-msg { font-size: 0.85em; min-height: 1.2em; margin-top: 4px; font-family: 'Share Tech Mono', monospace; }
        .comments-list { display: flex; flex-direction: column; gap: 10px; }
        .comment-item { background: rgba(255,255,255,0.04); border-left: 3px solid var(--accent-color); padding: 10px 14px; border-radius: 0 4px 4px 0; }
        .comment-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
        .comment-time { font-size: 0.78em; color: #666; font-family: 'Share Tech Mono', monospace; }
        .comment-body { font-size: 0.92em; line-height: 1.6; word-break: break-all; }
        .comment-delete-btn { background: none; border: none; cursor: pointer; font-size: 1em; padding: 2px 6px; border-radius: 3px; opacity: 0.7; transition: opacity 0.2s; }
        .comment-delete-btn:hover { opacity: 1; }
        .comment-empty, .comment-loading { color: #666; font-size: 0.85em; font-family: 'Share Tech Mono', monospace; padding: 10px 0; }
    </style>
</head>
<body data-article-category="勢力" data-article-appearance="Fallout 全般">
    <div class="container">
        <aside class="infobox">
            <h3 style="margin-top:0; text-align:center;">Brotherhood of Steel</h3>
            <img src="images/note_extracted/brotherhood-base/FOTV_BoS_Base_Flag.png" alt="Brotherhood of Steel flag" onerror="this.src='images/placeholder.jpg'">
            <div style="text-align:center; font-size: 0.8em; margin-top:-10px; margin-bottom:15px; color:#aaa;">ブラザーフッド・オブ・スティールの旗 (TVシリーズ版)</div>
            
            <div class="infobox-row"><span class="infobox-label">組織形態</span><span class="info-value">テクノロジカル・パラミリタリー・オーダー<br>(技術的・軍事的な準宗教教団)</span></div>
            <div class="infobox-row"><span class="infobox-label">創設者</span><span class="info-value">ロジャー・マクソン</span></div>
            <div class="infobox-row"><span class="infobox-label">創設年</span><span class="info-value">2077年10月20日 (事実上)<br>2082年頃 (公式)</span></div>
            <div class="infobox-row"><span class="infobox-label">イデオロギー</span><span class="info-value">支部により異なる。<br>伝統主義派と改革派の対立</span></div>
            
            <div class="infobox-row"><span class="infobox-label" style="text-align:center; width:100%; margin-top:10px; border-bottom:1px solid var(--accent-color);">本部 (Headquarters)</span></div>
            <div class="infobox-row"><span class="info-value" style="width:100%; text-align:center;">ロスト・ヒルズ (西海岸)<br>要塞 / ボストン空港 (東海岸)<br>アトラス砦 (アパラチア)<br>ヒドゥンバレー (モハビ)<br>サンフェルナンド・ブラザーフッド基地<br>モンタナ・バンカー</span></div>

            <div class="infobox-row"><span class="infobox-label" style="text-align:center; width:100%; margin-top:10px; border-bottom:1px solid var(--accent-color);">主要指導者 (Leaders)</span></div>
            <div class="infobox-row"><span class="info-value" style="width:100%; text-align:left;"><b>■ エルダー評議会（西海岸）</b><br>エルダー・ジェイコブ<br>エルダー・レイチェル<br>エルダー・ジョナサン<br>エルダー・メアリー<br><b>■ ハイ・エルダー</b><br>ロジャー・マクソン<br>マクソン2世<br>ジョン・マクソン<br><b>■ 東海岸エルダー</b><br>オーウェン・リヨンズ<br>サラ・リヨンズ<br>アーサー・マクソン (最高司令官)</span></div>
        </aside>

        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
                <button class="like-button" data-article-id="note_brotherhood_of_steel_2" onclick="toggleLike(this)">
                    <span class="heart">♡</span> <span class="like-count">0</span>
                </button>
            </div>

            <h1>Brotherhood of Steel<br><span style="font-size: 0.6em; color: #888; font-family: 'Noto Sans JP', sans-serif; font-weight: normal;">ブラザーフッド・オブ・スティール</span></h1>

`;

fs.writeFileSync('f:/Fallout/brotherhood-of-steel-full.html', introHtml, 'utf8');
console.log('HTML scaffold created.');
