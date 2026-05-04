const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/yellow-sandys-still.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>イエロー・サンディの蒸留所（Yellow Sandy's still）</b>は、アパラチアの<a href="savage-divide.html" class="auto-link">荒れた境域</a>にある小規模なロケーションです。</p>
<p>この場所はかつて、アパラチアの<a href="raiders.html" class="auto-link">レイダー</a>たちによって様々なアルコール飲料を醸造するために使われていました。しかし、そのうちの一人であるフランクがレシピの実験をやりすぎてしまったことで、仲間のレイダーの怒りを買ってしまったようです。</p>

            <h2>レイアウト</h2>
<p>イエロー・サンディの蒸留所は、<a href="central-mountain-lookout.html" class="auto-link">中央山岳観測所</a>の北東に位置する小さな島にあります。島へは、トリップワイヤー、スパイクトラップ、ベアトラップが仕掛けられた粗末な木製の橋を渡ってアクセスできます。<br>島の海岸線沿いには全体にブービートラップが仕掛けられています。エリアの中央には2台のトレーラーと1台のトラックがあり、中には密造酒のジャグや封じ込めバレルが積まれています。北側のトレーラーの屋根にはキャンプマスター2000（グリル）が置かれています。</p>
<p>また、この島は2人のマイアラーク研究者のNPCなどがスポーンする可能性があるランダムエンカウントの発生地点でもあります。トレーラーの1つの日よけの下には醸造ステーションが設置されています。海岸沿いにはいくつかのジェットスキー、インナーチューブ、インフレータブルラフト（ゴムボート）なども置かれています。</p>

            <h2>主なアイテム</h2>
<ul class="loot-list">
    <li><b>フランクへ</b>：東のトレーラーのドアの外にあるテーブルの上に置かれたメモ。</li>
    <li>Vault-Tecボブルヘッド：東のトレーラーの屋根の上、トレーラーと木を繋ぐ足場の上（確定スポーンではない）。</li>
    <li>雑誌：ヌカ・コーラ自販機がある東の錆びたキャラバントレーラーの中、TVディナートレーが置かれた緑色の小さなテーブルの上（確定スポーンではない）。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                中央山岳観測所の北東すぐ近くにある小さな島のロケーションです。<br>手作りの粗末な橋と、四方にレイダーが設置したであろうブービートラップが張り巡らされています。ランダムエンカウントの発生地点でもあるため、島の中に研究者やスカベンジャーなどのNPCが立ち尽くしていることもあります。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Yellow Sandy\'s Still</h3><img src="images/note_extracted/yellow-sandys-still/img_main.png" alt="Yellow Sandy\'s Still"><img src="images/note_extracted/yellow-sandys-still/img_map_marker.png" alt="マップ" style="width:100%;margin-top:5px;"><div style="text-align:center;font-style:italic;color:#888;font-size:0.8em;margin-bottom:10px;">マップ上の位置</div><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="locations.html" class="auto-link">ロケーション</a>（キャンプ）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="savage-divide.html" class="auto-link">荒れた境域</a></span></div><div class="infobox-row"><span class="infobox-label">派閥</span><span><a href="raiders.html" class="auto-link">レイダー</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Wait, the HTML has \`_commentArticleName = 'Yellow Sandy's Still'\`. We have to fix quotes if they are broken.
content = content.replace(/_commentArticleName = 'Yellow Sandy's Still'/g, "_commentArticleName = 'Yellow Sandy\\'s Still'");

// The original document has multiple <h2>概要</h2> tags, one with meta tags. Let's replace everything from the first <h2>概要</h2> to the <div class="quote-box">
const startMarker = '<h2>概要</h2>';
const endMarker = '<div class="quote-box">';

const preamble = content.split(startMarker)[0];
// We split by endMarker, but wait... there's a div style line.
const parts = content.split(endMarker);
const endSections = parts[1].split('<div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">')[1];

const finalHtml = preamble + newContent + '\\n            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">\\n' + endSections;

fs.writeFileSync('f:/Fallout/yellow-sandys-still.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

イエロー・サンディの蒸留所（Yellow Sandy's still）
https://www.fallout-jp.com/yellow-sandys-still.html

概要

荒れた境域にある小規模なロケーション。レイダーたちがアルコール飲料を醸造するために使っていた小島です。

---

💭 感想

中央山岳観測所の北東にある小さな島です。四方にレイダーが設置したであろうブービートラップが張り巡らされています。ランダムエンカウントの発生地点でもあるため、島の中に無関係なNPCが立ち尽くしていることもあります。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/yellow-sandys-still', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/yellow-sandys-still/post.md', postContent);

console.log('Done.');
