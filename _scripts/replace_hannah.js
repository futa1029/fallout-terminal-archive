const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/hannah-wastelanders.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ハンナ（Hannah）</b>は、<a href="anchor-farm.html" class="auto-link">アンカー農場</a>に住んでいる<a href="daniel-wastelanders.html" class="auto-link">ダニエル</a>の娘です。ゲーム内では「入植者」とだけ表記されています。</p>
<p>彼女は父親や他のウェイストランダーたちと一緒に農場に住んでおり、同農場に住んでいる唯一の子供です。彼女は農場が<a href="free-radicals.html" class="auto-link">フリー・ラジカルズ</a>に脅されている一連の状況について何も知りませんが、ダニエルが一人で後悔するようにホロテープを聞いているのには気づいています。</p>

            <h2>関連クエスト</h2>
<ul>
    <li><a href="hunter-for-hire.html" class="auto-link">Hunter for Hire</a>: クエストが進行中の場合、ハンナは会話の中でホロテープ「<a href="agreement-with-radicals.html" class="auto-link">ラジカルズとの協定</a>」（金庫のパスコード）の隠し場所について言及してヒントをくれることがあります。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                Vault 76のすぐ南にあるアンカー農場に住んでいる一家の娘です。<br>レイダー集団「フリー・ラジカルズ」に脅されている一家の事情に唯一気づいていない子供であり、Wastelandersの実装時にはじめて「NPCの子供」がゲーム内に登場したという点で印象に残っているプレイヤーも多いかもしれません。（それまでのアパラチアには生存している人間のNPCさえ一人も存在しませんでした）
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Hannah</h3><img src="images/note_extracted/hannah-wastelanders/img_main.png" alt="Hannah"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="human.html" class="auto-link">人間（入植者）</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="anchor-farm.html" class="auto-link">アンカー農場</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Hannah</h1>', '<h1>Hannah<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ハンナ</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/hannah-wastelanders.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ハンナ（Hannah）
https://www.fallout-jp.com/hannah-wastelanders.html

概要

アンカー農場に住んでいるダニエルの娘です。ゲーム内では「入植者」と表記されます。農場がレイダーに脅されている状況について何も知りませんが、ダニエルが一人で思い悩んでいることには気づいています。

---

💭 感想

Vault 76のすぐ南にあるアンカー農場の娘です。レイダー集団に脅されている一家の事情に唯一気づいておらず、Wastelandersの実装時にはじめて「NPCの子供」がゲーム内に登場したという点で印象に残っているプレイヤーも多いかもしれません。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/hannah-wastelanders', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/hannah-wastelanders/post.md', postContent);

console.log('Done.');
