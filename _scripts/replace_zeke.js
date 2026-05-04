const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/zeke-fallout-76.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ジーク（Zeke）</b>は、アパラチアの<a href="camden-park.html" class="auto-link">カムデンパーク</a>で稼働している<a href="mister-handy.html" class="auto-link">Mr.ハンディ</a>です。</p>
<p>ジークは、ゲストが制限時間内に指定された場所の周囲にある手押し車に石炭（設定上の汚泥）を入れることで景品がもらえるカムデンパークのデイリークエスト「Lucky Mucker」の案内人を務めています。彼はアトラクションのテーマに合わせて、昔のステレオタイプな探鉱者の口調を真似るようにプログラムされています。</p>

            <h2>関連クエスト</h2>
<ul>
<li><a href="lucky-mucker.html" class="auto-link">Lucky Mucker</a></li>
<li>Mistaken Identity</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                カムデンパークにある汚泥（と称した石炭）投げゲーム「ラッキー・マッカー」の受付係を務めるMr.ハンディです。<br>麦わら帽子のようなハットをかぶっており、昔の炭鉱夫のような少し訛りのある独特の口調で話しかけてきます。「最近は誰も話しかけてくれなくて少し寂しかった」とこぼすなど、アトラクション用ロボットとしての哀愁や人間臭い一面が見えるのが可愛らしいですね。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Zeke</h3><img src="images/note_extracted/zeke-fallout-76/img_main.png" alt="Zeke"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="mister-handy.html" class="auto-link">Mr.ハンディ</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="camden-park.html" class="auto-link">カムデンパーク</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>アトラクション案内人</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Zeke</h1>', '<h1>Zeke<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ジーク</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/zeke-fallout-76.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ジーク（Zeke）
https://www.fallout-jp.com/zeke-fallout-76.html

概要

カムデンパークにあるデイリークエスト「Lucky Mucker」の案内人を務めているMr.ハンディです。アトラクションのテーマに合わせて、昔のステレオタイプな探鉱者の口調を真似るようにプログラムされています。

---

💭 感想

昔の炭鉱夫風のハットをかぶっており、少し訛りのある独特の口調で話しかけてきます。「最近は誰も話しかけてくれなくて寂しかった」とこぼすなど、アトラクション用ロボットとしての哀愁や人間臭い一面が見えるのが可愛らしいですね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/zeke-fallout-76', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/zeke-fallout-76/post.md', postContent);

console.log('Done.');
