const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/treadly.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>スカウトリーダー・トレッドリー（Scout Leader Treadly）</b>は、アパラチアの<a href="dolly-sods-wilderness.html" class="auto-link">ドリー・ソッズ自然保護区</a>で稼働している<a href="mister-handy.html" class="auto-link">Mr.ハンディ</a>です。</p>
<p>トレッドリーは、アパラチアで依然として活動を続けている<a href="pioneer-scouts.html" class="auto-link">パイオニアスカウト</a>のリーダーの1体です。彼はかつて昆虫学者の助手を務めていた経歴があり、プレイヤーが適切な材料（虫の部位など）を彼に届ければ、「虫除け（インセクト・リペレント）」を作成してくれます。</p>

            <h2>関連クエスト</h2>
<ul>
    <li>Stings and Things（デイリークエスト）</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                ドリー・ソッズ自然保護区でデイリークエスト「Stings and Things」を担当しているMr.ハンディですね。<br>クエストを通じて彼に様々な虫の部位を届けることで、有給スカウトの証であるバッジや、昆虫に特効のある専用アイテム「虫除け」を手に入れることができます。「昆虫はじつに美しいのに、なぜ皆は気味悪がるのでしょうか」と昆虫の造形美を語る独特の感性を持っており、プレイヤーの斥候作業を導いてくれる頼もしいスカウトリーダーです。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Scout Leader Treadly</h3><img src="images/note_extracted/treadly/img_main.png" alt="Scout Leader Treadly"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="mister-handy.html" class="auto-link">Mr.ハンディ</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="pioneer-scouts.html" class="auto-link">パイオニアスカウト</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>スカウトリーダー</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Scout Leader Treadly</h1>', '<h1>Scout Leader Treadly<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">スカウトリーダー・トレッドリー</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/treadly.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

スカウトリーダー・トレッドリー（Scout Leader Treadly）
https://www.fallout-jp.com/treadly.html

概要

ドリー・ソッズ自然保護区でデイリークエスト「Stings and Things」を担当しているMr.ハンディです。パイオニアスカウトのリーダーの1体であり、かつて昆虫学者の助手を務めていた経歴から虫に関する豊富な知識を持っています。

---

💭 感想

クエストを通じて彼に様々な虫の部位を届けると、昆虫に特効のある専用アイテム「虫除け」を手に入れることができます。「昆虫はじつに美しいのに、なぜ皆は気味悪がるのでしょうか」と昆虫の造形美を語る独特の感性を持っています。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/treadly', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/treadly/post.md', postContent);

console.log('Done.');
