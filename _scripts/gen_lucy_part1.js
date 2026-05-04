// ルーシー・マクレーン記事生成 Part1: HEAD + CSS + Infobox
const fs = require('fs');
const path = 'f:/Fallout/lucy-maclean.html';
const IMG = 'images/note_extracted/lucy-maclean';

const html = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Lucy MacLean | Overseer Mohi's Terminal</title>
    <link rel="canonical" href="https://www.fallout-jp.com/lucy-maclean.html">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Overseer Mohi's Terminal">
    <meta property="og:locale" content="ja_JP">
    <meta property="og:title" content="Lucy MacLean (ルーシー・マクレーン) | Overseer Mohi's Terminal">
    <meta property="og:description" content="ルーシー・マクレーンのFalloutロア記事。Overseer Mohi's Terminalで読む。">
    <meta property="og:image" content="https://www.fallout-jp.com/${IMG}/Lucy_MacLean_TV_infobox.png">
    <meta property="og:url" content="https://www.fallout-jp.com/lucy-maclean.html">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@IwamotoFuta">
    <meta name="twitter:title" content="Lucy MacLean (ルーシー・マクレーン) | Overseer Mohi's Terminal">
    <meta name="twitter:description" content="ルーシー・マクレーンのFalloutロア記事。Overseer Mohi's Terminalで読む。">
    <meta name="twitter:image" content="https://www.fallout-jp.com/${IMG}/Lucy_MacLean_TV_infobox.png">
    <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        :root { --bg-color: #0f0f0f; --text-color: #e0e0e0; --accent-color: #00ff00; --header-bg: #1a1a1a; --panel-bg: #222; }
        body { background-color: var(--bg-color); color: var(--text-color); font-family: 'Noto Sans JP', sans-serif; margin: 0; line-height: 1.8; }
        h1, h2, h3 { font-family: 'Share Tech Mono', monospace; color: var(--accent-color); border-bottom: 1px solid var(--accent-color); padding-bottom: 5px; }
        .container { max-width: 1000px; margin: 0 auto; padding: 20px; display: grid; grid-template-columns: 300px 1fr; gap: 30px; }
        .infobox { background: var(--panel-bg); border: 2px solid var(--accent-color); padding: 15px; height: fit-content; position: sticky; top: 20px; align-self: start; }
        .infobox img { width: 100%; border: 1px solid #555; margin-bottom: 15px; }
        .infobox-row { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9em; border-bottom: 1px dashed #444; }
        .infobox-label { color: var(--accent-color); font-weight: bold; }
        .content { background: rgba(255, 255, 255, 0.05); padding: 30px; border-radius: 5px; }
        .quote-box { border-left: 4px solid var(--accent-color); margin: 40px 0 20px 0; background: color-mix(in srgb, var(--accent-color) 10%, transparent); padding: 15px 15px 15px 20px; border-radius: 0 5px 5px 0; line-height: 1.6; }
        .quote-box b { color: var(--accent-color); font-size: 1.05em; }
        .dialogue-box { font-style: italic; border-left: 4px solid var(--accent-color); padding: 15px 15px 15px 20px; margin: 20px 0; color: #aaffaa; background: rgba(0, 255, 0, 0.05); }
        .article-image { max-width: 100%; border: 1px solid #444; margin: 20px 0; display: block; cursor: pointer; }
        .image-caption { font-size: 0.85em; color: #888; margin-top: -15px; margin-bottom: 20px; }
        .image-right { float: right; max-width: 250px; margin: 0 0 15px 20px; border: 1px solid #444; cursor: pointer; }
        .image-left { float: left; max-width: 250px; margin: 0 20px 15px 0; border: 1px solid #444; cursor: pointer; }
        .clearfix::after { content: ""; display: table; clear: both; }
        .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }
        .gallery-item { position: relative; overflow: hidden; border: 1px solid #444; cursor: pointer; }
        .gallery-item img { width: 100%; display: block; transition: transform 0.3s; }
        .gallery-item:hover img { transform: scale(1.05); }
        .gallery-item .caption { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.75); color: #ddd; font-size: 0.78em; padding: 6px 8px; text-align: center; }
        .back-link { display: inline-block; margin-bottom: 20px; color: var(--accent-color); text-decoration: none; border: 1px solid var(--accent-color); padding: 5px 15px; }
        .back-link:hover { background: var(--accent-color); color: #000; }
        .action-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .action-header .back-link { margin-bottom: 0; }
        .like-button { background: transparent; border: 1px solid var(--accent-color); color: var(--accent-color); padding: 5px 15px; font-size: 1.1em; cursor: pointer; display: flex; align-items: center; gap: 8px; font-family: 'Share Tech Mono', monospace; transition: all 0.2s; border-radius: 4px; }
        .like-button:hover { box-shadow: 0 0 8px var(--accent-color); }
        .like-button.liked { background: var(--accent-color); color: var(--bg-color); }
        .content a { color: var(--accent-color); text-decoration: none; border-bottom: 1px solid transparent; }
        .content a:hover { border-bottom: 1px solid var(--accent-color); }
        .auto-link { color: var(--accent-color) !important; font-weight: bold; text-decoration: none; border-bottom: 1px dashed var(--accent-color) !important; transition: all 0.2s; padding: 0 2px; }
        .auto-link:hover { background-color: color-mix(in srgb, var(--accent-color) 20%, transparent); border-bottom: 1px solid var(--accent-color) !important; }
        .lightbox-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 9999; justify-content: center; align-items: center; cursor: pointer; }
        .lightbox-overlay.active { display: flex; }
        .lightbox-overlay img { max-width: 90%; max-height: 90%; border: 2px solid var(--accent-color); }
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
        @media (max-width: 768px) {
            .container { grid-template-columns: 1fr; padding: 10px; gap: 20px; }
            .infobox { grid-row: 1; width: 100%; box-sizing: border-box; position: static; }
            .content { padding: 15px; }
            h1 { font-size: 1.5em; }
            .gallery { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
            .back-link { padding: 12px 20px; font-size: 1.1em; }
            .like-button { padding: 10px 15px; font-size: 1em; }
            .image-right, .image-left { float: none; max-width: 100%; margin: 15px 0; }
        }
    </style>
</head>
<body data-article-category="人物" data-article-appearance="Fallout TV">
    <div class="container">
        <aside class="infobox">
            <h3 style="margin-top:0; text-align:center;">Lucy MacLean<br><span style="font-size:0.7em; color:#888; font-weight:normal;">ルーシー・マクレーン</span></h3>
            <img src="${IMG}/Lucy_MacLean_TV_infobox.png" alt="ルーシー・マクレーン">
            <div class="infobox-row"><span class="infobox-label">種族</span><span>人間</span></div>
            <div class="infobox-row"><span class="infobox-label">性別</span><span>女性</span></div>
            <div class="infobox-row"><span class="infobox-label">職業</span><span>歴史・倫理学の教師</span></div>
            <div class="infobox-row"><span class="infobox-label">あだ名</span><span style="text-align:right;font-size:0.85em">スウィートハート<br>ヴォルティー<br>シュガーボム</span></div>
            <div class="infobox-row"><span class="infobox-label">家族</span><span style="text-align:right;font-size:0.85em">ハンク・マクレーン（父）<br>ローズ・マクレーン（母）<br>ノーム・マクレーン（弟）</span></div>
            <div class="infobox-row"><span class="infobox-label">所属</span><span style="text-align:right">Vault 33</span></div>
            <div class="infobox-row"><span class="infobox-label">俳優</span><span style="text-align:right">エラ・パーネル</span></div>
            <div class="infobox-row"><span class="infobox-label">登場</span><span>Fallout TV</span></div>
        </aside>

        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
                <button class="like-button" data-article-id="lucy_maclean" onclick="toggleLike(this)">
                    <span class="heart">♡</span> <span class="like-count">0</span>
                </button>
            </div>

            <h1>Lucy MacLean<br><span style="font-size: 0.6em; color: #888; font-family: 'Noto Sans JP', sans-serif; font-weight: normal;">ルーシー・マクレーン</span></h1>

            <div class="dialogue-box">
                「私はあなたのような見た目になるかもしれない……でも、あなたのような人間には絶対にならない。<br>ゴールデン・ルールよ、このクソ野郎」<br><br>
                ―― ルーシー、グールに対して
            </div>
`;

fs.writeFileSync(path, html, 'utf8');
console.log('Part1 written:', html.length, 'bytes');
