const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/sutton-station.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>サットン駅（Sutton Station）</b>は、アパラチアの<a href="the-forest.html" class="auto-link">森林地帯</a>にある<a href="train-stations.html" class="auto-link">鉄道駅</a>です。</p>
<p>サットンの南の郊外の丘の上に位置するこの施設は、戦前のレッドライン（鉄道路線）沿いにあるプラットフォームと駅舎で構成されています。戦前においては、この場所は有人チケット販売のカウンターや自動券売機などの周辺サービスを提供していました。<br>アパラチア全域に広がるかつての鉄道ネットワークシステムの一部であるこの駅は、戦後には<a href="raiders.html" class="auto-link">レイダー</a>たちによって占拠され、ベンダーボットを通じた作戦と取引のハブとして再整備されました。</p>

            <h2>レイアウト</h2>
<p>駅の外側の周辺やテラスには屋外のベンチや座席があり、テーブルの上や周囲には多くのビール瓶が散乱しています。<br>プラットフォームには弾薬自販機、医療品自販機、パンチカードマシン、そしてレジェンダリー交換機が設置されています。</p>
<p>店内には、ショップ・カウンターの前にプレイヤーの収納箱（スタッシュ）が置かれています。また、ロッカーの近くにケミストリーステーションが設置されており、その近くのテーブルの上には廃酸や廃棄物性廃液がスポーンすることがあります。トイレの中にはトイレットペーパーが3つ確定で置かれています。</p>

            <h2>主なアイテム</h2>
<ul class="loot-list">
    <li><b>ヘラルド紙がクイン・カーターを支持</b>：西側の壁沿いにあるロッカーの一番上の棚に置かれたメモ。</li>
</ul>

            <h2>補足</h2>
<ul>
    <li>「Locked & Loaded」アップデートパッチ以降、すべてのアパラチアの鉄道駅にパンチカードマシンが追加されました。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                サ藤（サットン）の街から坂を南に少し下った丘の上にあるレイダー系列の鉄道駅です。<br>トゲトゲのレイダー風の装飾が施されたベンダーボット・レイダーが稼働しており、初心者プレイヤーの不用品の取引やキャップの回収先として役立ちます。フラットウッズやサマーズビル側からのアクセスも良いため、監督官のキャンプの次に見つけることの多い駅の１つです。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Sutton Station</h3><img src="images/note_extracted/sutton-station/img_main.png" alt="Sutton Station"><img src="images/note_extracted/sutton-station/img_map_marker.png" alt="マップ" style="width:100%;margin-top:5px;"><div style="text-align:center;font-style:italic;color:#888;font-size:0.8em;margin-bottom:10px;">マップ上の位置</div><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="train-stations.html" class="auto-link">鉄道駅</a></span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="the-forest.html" class="auto-link">森林地帯</a>（<a href="sutton.html" class="auto-link">サットン</a>）</span></div><div class="infobox-row"><span class="infobox-label">派閥</span><span><a href="raiders.html" class="auto-link">レイダー</a>（管轄区）</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Try to handle escaping for quotes if needed: _commentArticleName = 'Sutton Station' (If it has a single quote elsewhere it wouldn't match. "Sutton Station" doesn't have a single quote in its name.)

const startMarker = '<h2>概要</h2>';
const endMarker = '<div class="quote-box">';

const preamble = content.split(startMarker)[0];
// We split by endMarker, but wait... there's a div style line.
const parts = content.split(endMarker);
const endSections = parts[1].split('<div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">')[1];

const finalHtml = preamble + newContent + '\\n            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">\\n' + endSections;

fs.writeFileSync('f:/Fallout/sutton-station.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

サットン駅（Sutton Station）
https://www.fallout-jp.com/sutton-station.html

概要

森林地帯のサ藤（サットン）の街の南東にある鉄道駅。ベンダーボット・レイダーが店番をしており、レジェンダリー交換機やパンチカードマシンなどを含むすべての基本設備が整っています。

---

💭 感想

監督官のキャンプやフラットウッズからのアクセスが良く、ゲームの序盤で見つけることの多い駅の１つです。初心者プレイヤーの不用品売却やキャップ稼ぎの拠点としてよく利用されています。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/sutton-station', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/sutton-station/post.md', postContent);

console.log('Done.');
