const fs = require('fs');

const wikitext = `The '''Halloween horror hamlet''' is an [[Fallout 76 locations|unmarked location]] in the [[Savage Divide]] region of [[Appalachia]].<ref group="Non-game">''[[Fallout 76 Vault Dweller's Survival Guide]]'' p. 394: ''"'''The Ash Heap (Zone B) - Secondary Locations'''''<br />38. Halloween Horror Hamlet: ''A Halloween-themed farmstead on both sides of the room, where pumpkins are plentiful."''<br />([[Fallout 76 Vault Dweller's Survival Guide Atlas of Appalachia]])</ref>  It is situated southeast of the [[Hornwright Estate]].

==Layout==
This house along [[Fallout 76 roadways|Route 93]] is on the border between the Ash Heap and the [[Savage Divide]]. A [[dirt bike]] and a blue sports car are parked outside of the home, and various [[Fallout 76 creatures|creatures]] may lurk around its exterior. Several [[Halloween]] decorations can be found both inside and outside of the house, including unique ones made with [[Hay bale (Fallout 76)|hay bales]] and five [[Pumpkin (Fallout 76)|pumpkins]] found within these decorations. 

The hamlet itself has two stories and a basement; the first floor has a kitchen area, a dining table and a small den. There is a side hallway accessible from the first floor, with a locked [[Safe (Fallout 76)|safe]] ([[Picklock]] 1) and [[Caps stash (Fallout 76)|caps stash]] that can be looted.

The second floor has two bedrooms and a bathroom. Only the first bed, actually a mattress on the floor, is usable. The bathroom contains a [[First aid (Fallout 76)|first aid]] box but not much else of note. The basement is littered with debris, though there are two desks that can be looted. Various [[Fallout 76 junk items|junk items]] can be found here, as well as the lonely corpse of a [[Settler (Fallout 76)|settler]].

==Notable loot==
* Potential [[Fallout 76 armor mods|armor mod]] - On the wooden shelf on the second floor.

==Notes==
The ''[[Fallout 76 Vault Dweller's Survival Guide]]'' states that the hamlet is in the Ash Heap; however, it is counted as being part of the Savage Divide in-game.`;

const htmlBody = `<h2>概要</h2>
<p><b>Halloween horror hamlet</b>は、アパラチアの荒れた境域地域にある未マークのロケーションである。ホーンライト邸の南東に位置している。</p>

<h2>レイアウト</h2>
<p>ルート93沿いにあるこの家は、積灰の山と荒れた境域の境界線上に位置している。家の外にはダートバイクと青いスポーツカーが停まっており、建物の周囲には様々なクリーチャーが潜んでいる可能性がある。<br>
家の内外には、干し草ベイルで作られたユニークなものや、装飾の中に紛れ込んでいる5つのかぼちゃなど、複数のハロウィンの装飾が施されている。</p>

<p>集落の建物自体は2階建てで、地下室を備えている。<br>
1階にはキッチンエリア、ダイニングテーブル、小さな書斎がある。1階からアクセスできる側面の廊下には、ロックされた金庫（ピックロック・スキル1）とキャップの隠し場所があり、アイテムを回収できる。</p>

<p>2階には2つの寝室とバスルームがある。ベッドのうち使用可能なのは最初の1つ（実際には床に置かれたマットレス）のみである。バスルームにはファーストエイドボックスがあるが、それ以外に特筆すべきものはない。<br>
地下室にはがれきが散乱しているが、漁ることができるデスクが2つある。ここには様々なジャンクアイテムのほか、孤独な入植者の死体が転がっている。</p>

<h2>注目の戦利品</h2>
<ul>
    <li>アーマーモッド（ランダム生成） - 2階の木製の棚の上。</li>
</ul>

<h2>備考</h2>
<ul>
    <li>『Fallout 76 Vault Dweller's Survival Guide』では、この集落は積灰の山にあると記載されている。しかし、ゲーム内では荒れた境域の一部としてカウントされている。</li>
</ul>

<div class="quote-box"><b>感想</b><br><br>「恐怖農場」のさらに上を行くホラー集落。Falloutの世界では核の恐怖よりもハロウィンの方が怖いかもしれません。</div>

<div class="gallery-section">
    <h2>GALLERY_</h2>
    <div class="gallery-grid">
        <div class="gallery-item">
            <img src="images/note_extracted/halloween-horror-hamlet/fo76_halloween_horror_hamlet_03.png" alt="1階">
            <div class="caption">1階</div>
        </div>
        <div class="gallery-item">
            <img src="images/note_extracted/halloween-horror-hamlet/fo76_halloween_horror_hamlet_02.png" alt="地下室の入植者の死体">
            <div class="caption">地下室の入植者の死体</div>
        </div>
        <div class="gallery-item">
            <img src="images/note_extracted/halloween-horror-hamlet/fo76_halloween_horror_hamlet_04.png" alt="金庫とキャップの隠し場所">
            <div class="caption">金庫とキャップの隠し場所</div>
        </div>
        <div class="gallery-item">
            <img src="images/note_extracted/halloween-horror-hamlet/fo76_halloween_loc_16.png" alt="ハロウィンホラー集落の風景1">
            <div class="caption">ハロウィンホラー集落の風景1</div>
        </div>
        <div class="gallery-item">
            <img src="images/note_extracted/halloween-horror-hamlet/fo76_halloween_loc_15.png" alt="ハロウィンホラー集落の風景2">
            <div class="caption">ハロウィンホラー集落の風景2</div>
        </div>
        <div class="gallery-item">
            <img src="images/note_extracted/halloween-horror-hamlet/fo76_halloween_loc_14.png" alt="ハロウィンホラー集落の風景3">
            <div class="caption">ハロウィンホラー集落の風景3</div>
        </div>
        <div class="gallery-item">
            <img src="images/note_extracted/halloween-horror-hamlet/fo76_halloween_locs_11.png" alt="集落の隣人">
            <div class="caption">集落の隣人</div>
        </div>
    </div>
</div>`;

const targetFile = 'f:\\Fallout\\halloween-horror-hamlet.html';
let content = fs.readFileSync(targetFile, 'utf8');

// 本文部分の置換 (<h2>概要</h2> から <div style="margin-top: 30px; border-top: 1px dashed の前まで)
const startPattern = '<h2>概要</h2>';
const endPattern = '<div style="margin-top: 30px; border-top: 1px dashed';

const startIndex = content.indexOf(startPattern);
const endIndex = content.indexOf(endPattern);

if (startIndex !== -1 && endIndex !== -1) {
    const newContent = content.substring(0, startIndex) + htmlBody + '\n\n            ' + content.substring(endIndex);
    
    // クリーチャー情報をInfoboxに追加
    const infoboxEndIndex = newContent.indexOf('</aside>');
    if (infoboxEndIndex !== -1) {
        const creaturesHtml = '<div class="infobox-row"><span class="infobox-label">敵対生物</span><span>アリ<br>ブロートフライ<br>ブラッドバグ<br>モールラット<br>ラッドローチ</span></div>';
        // 登場作品の前に追加
        const appearancePattern = '<div class="infobox-row"><span class="infobox-label">登場作品';
        const appearanceIndex = newContent.indexOf(appearancePattern);
        if (appearanceIndex !== -1) {
             const finalContent = newContent.substring(0, appearanceIndex) + creaturesHtml + newContent.substring(appearanceIndex);
             fs.writeFileSync(targetFile, finalContent, 'utf8');
             console.log("Updated halloween-horror-hamlet.html successfully.");
        } else {
             fs.writeFileSync(targetFile, newContent, 'utf8');
             console.log("Updated halloween-horror-hamlet.html successfully (no appearance field).");
        }
    } else {
        fs.writeFileSync(targetFile, newContent, 'utf8');
        console.log("Updated halloween-horror-hamlet.html successfully (no infobox modification).");
    }
} else {
    console.error("Patterns not found in the HTML.");
}
