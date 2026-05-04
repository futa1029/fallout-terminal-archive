const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/nuclear-don.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ヌカ・ドン（Nuclear Don）</b>は、アパラチアの<a href="watoga-civic-center.html" class="auto-link">ワトガ・シビックセンター</a>で開催されている格闘トーナメントに参加している奴隷の闘士です。</p>
<p>彼は自身のロッカーの中に「Nuclear Don's Custom Chem Blend（ヌカ・ドンの特製薬品ブレンド）」と呼ばれる特別な薬品を隠し持っています。</p>

            <h2>関連クエスト</h2>
<ul>
    <li><a href="the-ol-weston-shuffle.html" class="auto-link">The Ol' Weston Shuffle</a>: クエスト中、もしプレイヤーが闘技大会を勝ち進んだ場合、ドンは最初のラウンドの敗戦ペナルティとして、首に巻かれた<a href="slave-collar.html" class="auto-link">奴隷の首輪</a>が爆発して処刑されてしまいます。</li>
</ul>

            <h2>名言</h2>
<ul>
    <li>近づくな。俺は…人に触られるのが好きじゃないんだ！近くに人がいるのが嫌なんだよ！ああっ！あっちへ行け！</li>
    <li>やりたいのか？ああ？ダメだ…ダメだ…試合に集中しないと。お前もそうした方がいいぞ。</li>
    <li>ちょっとしたアドバイスが欲しいのか？いいか、あの中でどう生き残るかは分かってる。ただ…待てよ…何だ？俺の心を乱そうとしてるな！出て行け！出て行け！</li>
    <li>これに勝ったら、それで終わりだ。借金は返し終わる。自由を味わえるんだ。どんな味だ…金属か？いや、それは…何か別のものだな。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                ワトガ・シビックセンターの闘技場クエスト「The Ol' Weston Shuffle」で登場する人間の闘士です。<br>レイダー（クレーター）のサージェントたちに捕らえられた奴隷であり、首輪を付けられて無理やり戦わされています。プレイヤーがゲーム序盤のラウンドを勝ち進んだ場合、敗戦の見せしめとして爆殺（首輪の爆破）されてしまう哀れなNPCとなっています。控室には彼が隠し持っていた独自の特製薬品ブレンドが残されています。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Nuclear Don</h3><img src="images/note_extracted/nuclear-don/img_main.png" alt="Nuclear Don"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="human.html" class="auto-link">人間</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="crater.html" class="auto-link">クレーター（レイダー）</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>奴隷の闘士</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Nuclear Don</h1>', '<h1>Nuclear Don<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ヌカ・ドン</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/nuclear-don.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ヌカ・ドン（Nuclear Don）
https://www.fallout-jp.com/nuclear-don.html

概要

ワトガ・シビックセンターで開催されている格闘トーナメントに参加させられている奴隷の闘士です。控室にある彼自身のロッカーの中には特製薬品が隠されています。

---

💭 感想

レイダーに捕らえられた奴隷であり、首輪を付けられて無理やり戦わされています。プレイヤーがゲーム序盤のラウンドを勝ち進んだ場合、敗戦の見せしめとして爆殺されてしまう哀れなNPCとなっています（借金を返し終わったら自由になれると信じていました）。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/nuclear-don', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/nuclear-don/post.md', postContent);

console.log('Done.');
