const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/mires-eye.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>マイアの眼（Mire's Eye）</b>は、アパラチアの<a href="the-mire.html" class="auto-link">マイア</a>地域にあるロケーションです。以前は「マイアラークの巣（Mirelurk den）」という名称でした（後述）。</p>
<p>このロケーションに到達するには、<a href="freddy-fears-house-of-scares.html" class="auto-link">フレディ・フィアーの恐怖の家</a>から遠く北東に向かい、川を北に進みます。その後、いくつかの脳みそキノコ群生している池（水たまり）のエリアから東に曲がると、洞窟の入り口の赤い扉が見つかります。</p>

            <h2>レイアウト</h2>
<p>マイアの眼はマップの北東の端っこにあり、扉を通り抜けるとプレイヤーは洞窟の南側から内部に入ります。</p>
<p>洞窟の中央には、この場所を拠点としている<a href="blood-eagles.html" class="auto-link">ブラッドイーグル</a>のメンバーたちによって吊り下げられたマイアラーク・クイーンの死骸が展示されています。東側には木製のバリケードがあるエリアのほか、木箱、寝具、そして魚を干すためのラックがあります。西側には調理設備を備えた高台のプラットフォームがいくつかあります。北側は装備品や保管用のエリアとなっており、2つの檻が置かれています。通常、ここにはパワーアーマーを装備したブラッドイーグルが1人配置されています。また、このエリアの石の壁を探すとボタンがあり、これを押すと壁がスライドして隠し部屋が現れます。そこは武器庫として機能している洞窟エリアへと繋がっており、中には大量の武器や弾薬箱が保管されています。</p>

            <h2>主なアイテム</h2>
<ul class="loot-list">
    <li><b>マイアラークの巣</b>：東の寝室エリアにあるテーブルの上に置かれたメモ。</li>
    <li><b>マイアラーク・メドレー</b>：調理エリアの大きな串の隣のテーブルの上に置かれたメモ（レシピ設定ではない）。</li>
    <li>少なくとも16個の発光キノコ（外の入り口付近に2つ、内部に14個）。</li>
</ul>

            <h2>補足</h2>
<ul>
    <li>このロケーションでスポーンするマイアラークの幼生は「ブラッドイーグルの幼体（Blood Eagle Hatchlings）」と呼ばれています。これは「マイアラークの巣」のメモで筆者が「幼生が我々を親だと思って付いてくるようになった」と述べていることに起因しています。</li>
</ul>

            <h2>舞台裏</h2>
<p>このロケーションはもともと「Steel Dawn」アップデートの際にゲームファイル上にデータとして追加されていましたが、実際にはマップへ実装されず未使用コンテンツとして残されていました。当時のファイル内では「レイダーの巣（raider den）」というデータ名でした。<br>その後、「Boardwalk Paradise」アップデートが行われるまでの数年間ライブゲームには実装されず、初実装時もまだマップマーカーすらない「マイアラークの巣」という名も無き隠しロケーションでした。続く「America's Playground」アップデートにより、このロケーションに正式なマップマーカーが付与され、現在の「マイアの眼」に名前が変更されました。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                マップの最果て、東側の北端にある洞窟のロケーションです。ロケーションそのものの追加はAtlantic Cityアップデート群でしたが、中のデータや内部セルへのロード扉などはSteel Dawnアップデートの頃に実装されていた曰く付きの場所でもあります。<br>ブラッドイーグルたちがマイアラーク・クイーンを血祭りにあげた一方、幼生たちとは共生（？）しているという珍しい生活様式を観察できます。隠し武器庫のギミックがあるなど、探索のやりがいもある場所です。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Mire\'s Eye</h3><img src="images/note_extracted/mires-eye/img_main.png" alt="Mire\'s Eye"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="locations.html" class="auto-link">ロケーション</a>（洞窟）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="the-mire.html" class="auto-link">マイア</a></span></div><div class="infobox-row"><span class="infobox-label">派閥</span><span><a href="blood-eagles.html" class="auto-link">ブラッドイーグル</a></span></div><div class="infobox-row"><span class="infobox-label">実装</span><span>America\'s Playground</span></div></aside>');

// Replace title
content = content.replace('<h1>Mire\'s Eye<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">マイアの眼</span></h1>', '<h1>Mire\'s Eye<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">マイアの眼</span></h1>');

// Wait, the HTML has \`_commentArticleName = 'Mire's Eye'\`. We have to fix quotes if they are broken.
content = content.replace(/_commentArticleName = 'Mire's Eye'/g, "_commentArticleName = 'Mire\\'s Eye'");

const startMarker = '<h2>概要</h2>';
const endMarker = '<div class="quote-box">';

const parts = content.split(endMarker);
const preamble = content.split(startMarker)[0];
const endSections = parts[1].split('<div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">')[1];

const finalHtml = preamble + newContent + '\\n            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">\\n' + endSections;

fs.writeFileSync('f:/Fallout/mires-eye.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

マイアの眼（Mire's Eye）
https://www.fallout-jp.com/mires-eye.html

概要

マイア地域の最北東にある洞窟のロケーション。以前は「マイアラークの巣」という名称でした。ブラッドイーグルの拠点になっており、内部には吊るされたマイアラーク・クイーンの死骸が飾られています。

---

💭 感想

内部セルへのロード扉などはSteel Dawnアップデートの頃に実装されていたものの、数年間放置されていた曰く付きの場所でもあります。最近のアップデートでマップアイコンと現在の名前が付きました。内部にはボタンで開く隠し武器庫のギミックもあります。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/mires-eye', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/mires-eye/post.md', postContent);

console.log('Done.');
