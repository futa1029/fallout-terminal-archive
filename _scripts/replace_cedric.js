const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/cedric.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>セドリック（Cedric）</b>は、アパラチアの<a href="arktos-pharma.html" class="auto-link">アークトス・ファーマ</a>で死体として見つけることができる<a href="free-states.html" class="auto-link">フリー・ステイツ</a>の物資調達係です。</p>
<p>彼は研究者である<a href="ella-ames.html" class="auto-link">エラ・エイムズ</a>から、自身のバンカー（<a href="ella-ames-bunker.html" class="auto-link">エラ・エイムズのバンカー</a>）にいくつかの薬品や植物を持ち帰るよう依頼されて活動していました。セドリックの最後の任務は、アークトス・ファーマから<a href="buffout-fallout-76.html" class="auto-link">バファウト</a>、<a href="stimpak.html" class="auto-link">スティムパック</a>、<a href="amber-lily.html" class="auto-link">アンバーリリー</a>、<a href="firecap.html" class="auto-link">ファイアキャップ</a>を回収することでした。</p>

            <h2>所持品</h2>
<ul class="loot-list">
    <li><a href="cedrics-list.html" class="auto-link">セドリックのリスト</a>（彼が死の直前まで持っていた調達品のメモ書き）</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                アークトス・ファーマの入口前で事切れているフリー・ステイツの調達担当メンバーです。<br>エラ・エイムズが行っていたラッドトードの生態調査（イベント：Project Beanstalkの前日譚）で用いる薬品と香草の調達を任されていましたが、目的地の入り口付近で志半ばで息絶えたようです。彼の遺体のすぐそばには、彼女からの依頼内容が記録されたメモ「セドリックのリスト」が残されています。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Cedric</h3><img src="images/note_extracted/cedric/img_main.png" alt="Cedric"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="human.html" class="auto-link">人間</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="free-states.html" class="auto-link">フリー・ステイツ</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>物資調達係</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Cedric</h1>', '<h1>Cedric<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">セドリック</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/cedric.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

セドリック（Cedric）
https://www.fallout-jp.com/cedric.html

概要

アークトス・ファーマで死体として見つけることができるフリー・ステイツの物資調達係です。研究者エラ・エイムズから薬品や植物を持ち帰るよう依頼されて活動していました。

---

💭 感想

アークトス・ファーマの入口前で事切れている人物です。エラ・エイムズが行っていたラッドトードの生態調査で用いる調達リストを任されていましたが、志半ばで息絶えたようです。遺体のすぐそばには「セドリックのリスト」が残されています。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/cedric', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/cedric/post.md', postContent);

console.log('Done.');
