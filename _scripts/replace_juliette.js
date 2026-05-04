const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/juliette.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ジュリエット（Juliette）</b>は、アパラチアの<a href="mountainside-bed-breakfast.html" class="auto-link">マウンテンサイドB&B</a>で受付係をしている人間の女性です。</p>
<p>ジュリエットはマウンテンサイドB&B（ベッド＆ブレックファスト）の管理人を名乗っています。彼女はVault居住者を含め、やってくる訪問者のすべてに、眠るためのベッドと翌朝の朝食（彼女の夫であるヒューバートが調理します）をたったの5キャップという安値で提供してくれます。</p>

            <h2>イベントでのインタラクション</h2>
<p>ジュリエットはプレイヤーに5キャップで宿泊場所を提供しますが、実は罠です。プレイヤーのPerceptionが12以上あれば、彼女と夫が人食い集団（カニバル）によって無理やり働かされて利用されている事実を見抜くことができます。それを突きつけると、彼女から人食いたちが地下室で待ち伏せしていることを聞き出し、先手を打って地下室で殲滅させることができます（戦闘中や戦闘後、彼女は怯えたままになります）。</p>
<p>もし部屋を借りてPerceptionチェックを通過しなかった場合、プレイヤーは二階のベッドでそのまま眠ることになります。そして真夜中、プレイヤーは隣の部屋で待ち伏せているカニバルたちの不気味な囁き声で強制的に目覚めさせられ、そこから戦闘へと発展します。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                マウンテンサイドB&B（Bed and Breakfast）で受付係をしている女性です。<br>一見すると破格の安さで親切に宿を提供してくれる人物ですが、実はカニバル集団に脅されて旅行客を誘い込む罠の「客寄せ」の役割を担わされています。勘の良い居住者（Perception 12以上）なら彼女の様子がおかしいことに気づき、真っ向からカニバル軍団を退治することが可能です。アパラチアの狂気を象徴する不気味なホラー映画のようなイベントですね。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Juliette</h3><img src="images/note_extracted/juliette/img_main.png" alt="Juliette"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="human.html" class="auto-link">人間</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="mountainside-bed-breakfast.html" class="auto-link">マウンテンサイドB&B</a>（人食い集団）</span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>受付・管理人</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Juliette</h1>', '<h1>Juliette<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ジュリエット</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/juliette.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ジュリエット（Juliette）
https://www.fallout-jp.com/juliette.html

概要

マウンテンサイドB&Bで受付係をしている女性です。やってくる訪問者に、眠るためのベッドと翌朝の朝食（夫のヒューバートが調理）をたったの5キャップという破格の安値で提供してくれます。

---

💭 感想

一見すると安さで親切に宿を提供してくれる人物ですが、実はカニバル集団に脅されて旅行客を誘い込む罠の「客寄せ」の役割を担わされています。勘の良い居住者（Perception 12以上）なら彼女の様子がおかしいことに気づき、真っ向からカニバル軍団を退治することが可能です（気づかずに寝るとホラーな展開になります）。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/juliette', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/juliette/post.md', postContent);

console.log('Done.');
