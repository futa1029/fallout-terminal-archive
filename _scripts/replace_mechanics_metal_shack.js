const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/mechanics-metal-shack.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>メカニックの金属小屋（Mechanic's metal shack）</b>は、アパラチアの<a href="the-mire.html" class="auto-link">沼地地帯</a>にある<a href="unmarked-locations.html" class="auto-link">未記載のロケーション</a>です。ビッグBの休憩所の西、<a href="sunday-brothers-cabin.html" class="auto-link">サンデー兄弟の小屋</a>の南に位置しています。</p>

            <h2>レイアウト</h2>
<p>丸みを帯びた屋根を持つこの金属の小屋は、ルート108から少し外れた川の近くに見つけることができます。小屋の周囲は金網フェンスで囲まれており、正面には入り口となる開口部があります。<br>小屋の外側の裏手には、アイテムが入ったゴミ箱や、アクセスできないバンパーカーや木箱、大型セミトレーラーのトラック、フェンスを飛び越える足場として使える倒れたストラングラー・バイン（<a href="strangler-vine.html" class="auto-link">ツル植物</a>）の木など、いくつか興味深いオブジェクトが配置されています。また、一帯には<a href="tick.html" class="auto-link">ティック</a>が多数生息しています。</p>
<p>小屋の内部には、探索可能な様々な<a href="junk.html" class="auto-link">ジャンクアイテム</a>やコンテナが配置されています。<br>入って左手には<a href="armor-workbench.html" class="auto-link">アーマー作業台</a>があります。ベッドルームには睡眠可能なベッドがあり、さらに施錠された金庫（必要スキル: Picklock 2）も見つかります。また、テーブルとして使われている金属製の箱や、アイテムを探索できるキャビネットもあります。機能していないテレビと、座ることができる教会の白い長椅子が、ベッドルームの残りのスペースを構成しています。<br>小屋の南側、金網フェンスの壁の後ろには、ガラクタの機械類や回路などが置かれています。</p>

            <h2>主なアイテム</h2>
<ul class="loot-list">
    <li><b><a href="mini-nuke.html" class="auto-link">ミニ・ニューク</a></b>: ロッカーの上に固定でスポーンします。</li>
    <li><b><a href="fusion-core-fallout-76.html" class="auto-link">フュージョン・コア</a></b>: ロッカーの中に固定でスポーンします。</li>
</ul>

            <h2>関連クエスト</h2>
<ul class="loot-list">
    <li><b><a href="stings-and-things.html" class="auto-link">Stings and Things</a>（デイリー）</b>：メカニックの金属小屋は、「ティックの血の袋」を入手できる候補地としてワールドマップ上にクエストマーカーが表示されます。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                沼地地帯の川沿いにある名もなき未記載のロケーションです。<br>木々に埋もれるようにひっそりと佇む廃品回収業者のような小屋ですが、そこそこのジャンクアイテムが拾えるほか、デイリークエスト「Stings and Things」における「ティック狩り」の名所でもあります。また、確定素材としてミニ・ニュークやフュージョン・コアが配置されているため、弾薬補給にピンポイントで訪れるのも良いかもしれません。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Mechanic's metal shack</h3><img src="images/note_extracted/mechanics-metal-shack/img_main.png" alt="Mechanic's metal shack"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="unmarked-locations.html" class="auto-link">未記載のロケーション</a>（小屋）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="the-mire.html" class="auto-link">沼地地帯</a></span></div><div class="infobox-row"><span class="infobox-label">敵関連</span><span><a href="tick.html" class="auto-link">ティック</a></span></div><div class="infobox-row"><span class="infobox-label">関連クエスト</span><span><a href="stings-and-things.html" class="auto-link">Stings and Things</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, `<h1>Mechanic's metal shack<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">メカニックの金属小屋</span></h1>`);

// Split and merge content
const startMarker = '<h2>概要</h2>';
const endMarker = '<div class="quote-box">';

const preamble = content.split(startMarker)[0];
let endSections = content.split(endMarker)[1];
endSections = endSections.split('<div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">')[1];

let finalHtml = preamble + newContent + '\n            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">\n' + endSections;

// Fix syntax error in comment block
finalHtml = finalHtml.replace("const _commentArticleName = 'Mechanic's Metal Shack';", "const _commentArticleName = " + '"' + "Mechanic's Metal Shack" + '"' + ";");

fs.writeFileSync('f:/Fallout/mechanics-metal-shack.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

メカニックの金属小屋（Mechanic's metal shack）
https://www.fallout-jp.com/mechanics-metal-shack.html

概要

沼地地帯にある未記載のロケーション。フェンスに囲まれた丸屋根の小屋とジャンク品の山があり、ティックが多数生息しています。

---

💭 感想

木々に埋もれるようにひっそりと佇む廃品回収業者のような小屋です。そこそこのジャンクアイテムが拾えるほか、デイリークエスト「Stings and Things」におけるティック狩りの名所でもあります。確定でミニ・ニュークやフュージョン・コアが配置されているため、弾薬目当てに訪れるのもありです！

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/mechanics-metal-shack', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/mechanics-metal-shack/post.md', postContent);

console.log('Done.');
