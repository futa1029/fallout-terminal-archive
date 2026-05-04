const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/penny-wild-appalachia.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>スカウトリーダー・ペニー（Scout Leader Penny）</b>は、アパラチアの<a href="camp-adams.html" class="auto-link">キャンプ・アダムス</a>で稼働している<a href="miss-nanny.html" class="auto-link">ミス・ナニー</a>型のロボットです。</p>
<p>スカウトリーダー・ペニーは、アパラチアにおいて現在も稼働している<a href="pioneer-scouts.html" class="auto-link">パイオニアスカウト</a>のリーダーの一人です。夜になって日が沈むと、彼女はキャンプ・アダムスに集まったパイオニアスカウトたちに向けて、焚き火を囲みながら古い怖い話を語り始めます。</p>

            <h2>関連クエスト</h2>
<ul>
    <li><a href="campfire-tales.html" class="auto-link">Campfire Tales</a>：彼女の語る怖い話を最後まで聞き遂げることが目標となるパブリックイベントです。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                パブリックイベント「Campfire Tales」の進行役を務めるロボットです。<br>夜の時間帯になるとキャンプ・アダムスの焚き火の前に現れ、パイオニアスカウト向けの怪談を語り聞かせます。話の途中で発生する様々なアクシデント（虫の襲撃、迷子になったスカウト・ニアのための持ち物探し、焚き火の薪くべなど）を参加プレイヤーに解決させることでイベントを進行させます。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Scout Leader Penny</h3><img src="images/note_extracted/penny-wild-appalachia/img_main.png" alt="Scout Leader Penny"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="miss-nanny.html" class="auto-link">ミス・ナニー</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="pioneer-scouts.html" class="auto-link">パイオニアスカウト</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>スカウトリーダー</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Scout Leader Penny</h1>', '<h1>Scout Leader Penny<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">スカウトリーダー・ペニー</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/penny-wild-appalachia.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

スカウトリーダー・ペニー（Scout Leader Penny）
https://www.fallout-jp.com/penny-wild-appalachia.html

概要

キャンプ・アダムスで稼働しているミス・ナニー型のロボット。パイオニアスカウトの指導役の一人であり、夜になると焚き火を囲みながら怖い話を語り始めます。

---

💭 感想

パブリックイベント「Campfire Tales」の進行役です。夜になるとキャンプ・アダムスの焚き火の前に現れます。彼女の語る怪談の途中で発生する様々なアクシデントを参加プレイヤーが解決していくことで、イベントが進行します。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/penny-wild-appalachia', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/penny-wild-appalachia/post.md', postContent);

console.log('Done.');
