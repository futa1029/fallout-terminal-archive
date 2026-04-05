const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/marilyn-fallout-76.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>マリリン（Marilyn）</b>は、<a href="foundation-outpost.html" class="auto-link">ファウンデーション前哨基地</a>にいる死亡した入植者です。</p>
<p>マリリンは、ケネス・ディーンのリーダーシップの下で前哨基地を開拓していた<a href="settlers.html" class="auto-link">入植者</a>の一員でした。<br>
彼らがスーパーミュータントに襲撃されて前哨基地を破壊され殺害された後、マリリンの死体は居住地の階段のそばに横たわっています。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                パブリックイベント「Test Your Metal」の舞台となるファウンデーション前哨基地で、B.O.S.戦闘部隊の到着前にスーパーミュータントの襲撃によって殺害されてしまった入植者のひとりです。<br>彼女の死体は階段の近くに転がっています。「ケネスの日記」などの記録から彼らがこの地を開拓しようと過酷な環境で奮闘していたことが分かりますが、悲惨な結末を迎えてしまいました。アパラチアの無慈悲な側面を物語る、名もなきNPCオブジェクトのひとつですね。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Marilyn</h3><img src="images/note_extracted/marilyn-fallout-76/img_main.png" alt="Marilyn"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="human.html" class="auto-link">人間</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="settlers.html" class="auto-link">入植者</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>ウェイストランダー</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Marilyn</h1>', '<h1>Marilyn<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">マリリン</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/marilyn-fallout-76.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

マリリン（Marilyn）
https://www.fallout-jp.com/marilyn-fallout-76.html

概要

ファウンデーション前哨基地を開拓していた入植者のひとりで、スーパーミュータントの襲撃によって殺害された遺体として登場します。前哨基地の階段のそばで死体を見つけることができます。

---

💭 感想

パブリックイベント「Test Your Metal」の舞台となる前哨基地で殺害されてしまったNPCですね。「ケネスの日記」などの記録から彼らがこの地を開拓しようと過酷な環境で奮闘していたことが分かりますが、悲惨な結末を迎えてしまいました。アパラチアの無慈悲な側面を物語っています。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/marilyn-fallout-76', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/marilyn-fallout-76/post.md', postContent);

console.log('Done.');
