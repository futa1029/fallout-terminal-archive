const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/helena-fallout-76.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ヘレナ（Helena）</b>は、アパラチアの<a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a>で<a href="vendor.html" class="auto-link">ベンダー</a>（商人）として働いている<a href="miss-nanny.html" class="auto-link">ミス・ナニー</a>です。</p>

            <h2>背景</h2>
<p>ヘレナは、<a href="the-great-war.html" class="auto-link">大戦</a>の直前にホワイトスプリング・リゾートが人間のスタッフを解雇し、その配置をロボットに置き換える「2080年イニシアチブ」のために導入されたベンダー・スタッフの一人です。<br>彼女はホワイトスプリング・モール内にある高級装飾品店「オーラム（Aurum）」に常駐しています。主に<a href="silver-pocket-watch-fallout-76.html" class="auto-link">銀の懐中時計</a>や<a href="gold-pocket-watch.html" class="auto-link">金の懐中時計</a>などのジュエリー（宝飾品）、そして銀や金などの貴重な素材を含むジャンクアイテム（スプーンなど）を専門に取り扱って販売しています。</p>

            <h2>取り扱い商品</h2>
<ul class="loot-list">
    <li><a href="junk.html" class="auto-link">ジャンク類</a>（金や銀をベースとした貴重な日用品や宝飾品）</li>
    <li><a href="apparel.html" class="auto-link">アパレル類</a>（一部の衣服や装飾品）</li>
</ul>
<p>※所持キャップは他のホワイトスプリング内ベンダーなどの各派閥ベンダーと共有（最大1400キャップ）されています。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                ホワイトスプリング・モール内で高級装飾品店を営んでいるミス・ナニーです。<br>「永遠のものなんてありませんわ。でも、お店のジュエリー（宝飾品）はそれに近いものです（Nothing is forever, dear. But our jewelry comes close.）」と優雅に語りかけてきます。金や銀などの貴重な素材を含んだ小物が欲しい時に彼女の品揃えを確認すると、ジャンク解体を通じて手っ取り早く素材を集めることができるため便利です。
            </div>
`;

// Replace infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Helena</h3><img src="images/note_extracted/helena-fallout-76/img_main.png" alt="Helena"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="miss-nanny.html" class="auto-link">ミス・ナニー</a>（ベンダー）</span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a></span></div><div class="infobox-row"><span class="infobox-label">担当</span><span>高級装飾品店「オーラム」</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Helena</h1>', '<h1>Helena<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ヘレナ</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/helena-fallout-76.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ヘレナ（Helena）
https://www.fallout-jp.com/helena-fallout-76.html

概要

ホワイトスプリング・モールにある高級装飾品店「オーラム」で働くミス・ナニー。大戦前、人間のスタッフの代わりに導入された宝飾品を取り扱うベンダーです。

---

💭 感想

モール内でジュエリー店を営んでいるミス・ナニー。金や銀からなる宝飾品、銀の懐中時計を中心にジャンクアイテムを販売してくれます。「金」や「銀」などの素材不足に悩まされている時は、彼女の品揃えを確認して買い占めることで素材を確保しやすいです。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/helena-fallout-76', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/helena-fallout-76/post.md', postContent);

console.log('Done.');
