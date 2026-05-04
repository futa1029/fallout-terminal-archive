/**
 * HTMLテンプレート抽出スクリプト
 * 既存のbrotherhood-of-steel.htmlからヘッダー/フッターを抽出し、
 * コンテンツプレースホルダー付きのテンプレートを作成する
 */
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "..", "brotherhood-of-steel.html"), "utf8");

// ヘッダー部分を抽出（HTMLからbody開始まで）
const bodyStart = html.indexOf("<body");
const bodyTagEnd = html.indexOf(">", bodyStart) + 1;
const headerCSS = html.substring(0, bodyTagEnd);

// フッターのスクリプト部分を抽出（最後の</main>から末尾まで）
const lastMainClose = html.lastIndexOf("</main>");
const footerHTML = html.substring(lastMainClose);

// サイドバー（infobox）を再構築
const sidebar = `
    <div class="container">
        <aside class="infobox">
            <h3 style="margin-top:0; text-align:center;">Brotherhood of Steel</h3>
            <div style="width: 100%; aspect-ratio: 16/9; background: #1a1a1a; display: flex; align-items: center; justify-content: center; overflow: hidden; margin-bottom: 15px; border: 1px solid #555;">
                <img src="images/note_extracted/brotherhood-base/FOTV_BoS_Base_Flag.png" alt="Brotherhood of Steel flag" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='images/placeholder.jpg';">
            </div>
            <div style="text-align:center; font-size: 0.8em; margin-top:-10px; margin-bottom:15px; color:#aaa;">ブラザーフッド・オブ・スティールの旗 (TVシリーズ版)</div>
            
            <div class="infobox-row"><span class="infobox-label">組織形態</span><span class="info-value">テクノロジカル・パラミリタリー・オーダー<br>(技術的・軍事的な準宗教教団)</span></div>
            <div class="infobox-row"><span class="infobox-label">創設者</span><span class="info-value">ロジャー・マクソン</span></div>
            <div class="infobox-row"><span class="infobox-label">創設年</span><span class="info-value">2077年10月20日 (事実上)<br>2082年頃 (公式)</span></div>
            <div class="infobox-row"><span class="infobox-label">イデオロギー</span><span class="info-value">支部により異なる。<br>伝統主義派と改革派の対立</span></div>
            
            <div class="infobox-row"><span class="infobox-label" style="text-align:center; width:100%; margin-top:10px; border-bottom:1px solid var(--accent-color);">本部 (Headquarters)</span></div>
            <div class="infobox-row"><span class="info-value" style="width:100%; text-align:center;">ロスト・ヒルズ (西海岸)<br>シタデル / ボストン空港 (東海岸)<br>アトラス砦 (アパラチア)<br>ヒドゥンバレー (モハビ)<br>サンフェルナンド基地 (TVシリーズ)</span></div>
            
            <div class="infobox-row"><span class="infobox-label" style="text-align:center; width:100%; margin-top:10px; border-bottom:1px solid var(--accent-color);">主要指導者 (Leaders)</span></div>
            <div class="infobox-row"><span class="info-value" style="width:100%; text-align:left;"><b>\u25a0 ハイ・エルダー</b><br>ロジャー・マクソン<br>マクソン2世<br>ジョン・マクソン<br><b>\u25a0 東海岸エルダー</b><br>オーウェン・リヨンズ<br>サラ・リヨンズ<br>アーサー・マクソン<br><b>\u25a0 モハビ エルダー</b><br>エリヤ / ノーラン・マクナマラ<br><b>\u25a0 TVシリーズ</b><br>エルダー・クレリック / クインタス</span></div>
            
            <div class="infobox-row"><span class="infobox-label" style="text-align:center; width:100%; margin-top:10px; border-bottom:1px solid var(--accent-color);">登場作品</span></div>
            <div class="infobox-row"><span class="info-value" style="width:100%; text-align:center;">Fallout / Fallout 2<br>Fallout 3<br>Fallout: New Vegas<br>Fallout 4<br>Fallout 76<br>Fallout TV Series</span></div>
        </aside>

        <main class="content">
            <div id="breadcrumb-placeholder"></div>
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
                <button class="like-button" data-article-id="note_brotherhood_of_steel_2" onclick="toggleLike(this)">
                    <span class="heart">\u2661</span> <span class="like-count">0</span>
                </button>
            </div>

            <h1>Brotherhood of Steel<br><span style="font-size: 0.6em; color: #888; font-family: 'Noto Sans JP', sans-serif; font-weight: normal;">ブラザーフッド・オブ・スティール</span></h1>

<!-- CONTENT_PLACEHOLDER -->

`;

// テンプレートを組み立て
const template = headerCSS + "\n" + sidebar + "\n        " + footerHTML;
fs.writeFileSync(path.join(__dirname, "bos_template.html"), template, "utf8");
console.log("Template saved: " + template.length + " chars");
