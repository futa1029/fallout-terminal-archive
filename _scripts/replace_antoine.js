const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/antoine.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>アントワーヌ（Antoine）</b>（個体名: PM-08）は、アパラチアの<a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a>（ホワイトスプリング・モール内）で<a href="vendor.html" class="auto-link">ベンダー</a>として働いている<a href="protectron.html" class="auto-link">プロテクトロン</a>です。</p>

            <h2>背景</h2>
<p>アントワーヌは、<a href="the-great-war.html" class="auto-link">大戦</a>の直前にホワイトスプリング・リゾートが人間のスタッフを解雇し、その配置を置き換えるために導入したロボット・ベンダー・スタッフの一人です。<br>彼はホワイトスプリング・モール内にあるレストラン「ル・グラン・グルメ（Le Grand Gourmet）」の自動化化されたヘッドシェフであり、販売用に多種多様な料理のレシピを取り扱っています。彼は同僚のロボットである<a href="marie-fallout-76.html" class="auto-link">マリー</a>と一緒に店舗にて勤務しています。</p>

            <h2>取り扱い商品</h2>
<ul class="loot-list">
    <li><a href="recipes.html" class="auto-link">レシピ類</a>（料理・飲料全般の設計図）</li>
</ul>
<p>※所持キャップは他のホワイトスプリング内ベンダーなどの各派閥ベンダーと共有（最大1400キャップ）されています。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                ホワイトスプリング・リゾートの地下モール内で営業しているレストランのシェフ兼ベンダーのプロテクトロンです。<br>「最高の食材には最高の調理が必要です」と言いながら、プレイヤーに調理用のレシピ図面を販売してくれます。料理や飲料水関連のレシピをまとめて買い揃えたい時に、非常に重宝する存在です。
            </div>
`;

// Replace infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Antoine</h3><img src="images/note_extracted/antoine/img_main.png" alt="Antoine"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="protectron.html" class="auto-link">プロテクトロン</a>（ベンダー）</span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a></span></div><div class="infobox-row"><span class="infobox-label">担当</span><span>ル・グラン・グルメ</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Antoine</h1>', '<h1>Antoine<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">アントワーヌ</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/antoine.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

アントワーヌ（Antoine）
https://www.fallout-jp.com/antoine.html

概要

ホワイトスプリング・モールのレストラン「ル・グラン・グルメ」でヘッドシェフを務めるプロテクトロン。大戦前、人間のスタッフの代わりに導入された調理用ロボットです。

---

💭 感想

ホワイトスプリング・モール内で調理レシピを専門に販売しているプロテクトロンの店員です。「最高の食材には最高の調理が必要です」と言いながら多種多様なレシピを売ってくれるので、料理系の設計図をまとめて買い揃えたい時に非常に重宝する存在です。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/antoine', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/antoine/post.md', postContent);

console.log('Done.');
