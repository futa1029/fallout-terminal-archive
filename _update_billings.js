const fs = require('fs');

const htmlBody = `<h2>概要</h2>
<p><b>ビリングス農場</b>（Billings homestead）は、アパラチアの森林地帯にあるロケーションである。ここは、獲得や防衛などのパブリックイベントが発生するパブリックワークショップでもある。</p>

<h2>レイアウト</h2>
<p>地下室のないシンプルな2階建ての農家がある。家の内部にはランダムに配置された戦利品があり、2階にはロックされた金庫（ピックロック・スキル2）がある。裏庭には2つのアッシュ・ローズと、2つのブラックベリーの茂みがある。また、南側の畑には40株以上のレイザーグレインが植えられている。</p>

<p>ワークショップは建物の屋外、南側の壁際にあり、隣にはアーマー作業台が置かれている。アーマー作業台の横にあるスーツケースからは、プレイヤーの収納箱（スタッシュ）にアクセスできる。ワークショップの近くにはポセイドン・エネルギーの配電盤があり、基本的には10ユニットの電力を供給する（ただし、過去に「Powering Up」イベントでポセイドン・エネルギープラントWV-06を復旧させていた場合は、100ユニットの電力が供給される）。資源ポイントはかつて作物を育てていた畑のあちこちに散らばっているが、配電盤の電力は、建築エリアに配置できるすべての抽出機を賄うのに十分以上の量がある。</p>

<p>このロケーションの北側（隣接するシルバ・ホームステッドの南側）には、1つのサイロと、それに隣接する大きな半円形の小屋がある。これらは両方の拠点から等距離にあるように見えるが、実際にはシルバ・ホームステッドの所有物であったと思われる――ドアはシルバ側を向いており、納屋とシルバの農家の間の土地は耕作されているからだ。小屋の内部にはパワーアーマーステーションがあり、パワーアーマーを発見できる可能性がある。</p>

<h2>注目の戦利品</h2>
<ul>
    <li>畑にある40株以上のレイザーグレイン</li>
    <li>放棄されたトラック近くの畑にある16個の野生のテイトの花</li>
</ul>

<div class="quote-box"><b>感想</b><br><br>アパラチアの探索で出会うロケーションの一つです。各地に残されたホロテープやメモから、かつての住人たちの物語を紐解くのが、Fallout 76の探索の醍醐味です。</div>

<div class="gallery-section">
    <h2>GALLERY_</h2>
    <div class="gallery-grid">
        <div class="gallery-item">
            <img src="images/note_extracted/billings-homestead/f76_billings_homestead.png" alt="ビリングス農場">
            <div class="caption">ビリングス農場</div>
        </div>
        <div class="gallery-item">
            <img src="images/note_extracted/billings-homestead/76_bc_billings_homestead_stoop.png" alt="ビリングス農場の玄関の階段">
            <div class="caption">ビリングス農場の玄関の階段</div>
        </div>
        <div class="gallery-item">
            <img src="images/note_extracted/billings-homestead/fo76_agri_site_4.png" alt="家の南にある廃墟となった小屋">
            <div class="caption">家の南にある廃墟となった小屋</div>
        </div>
        <div class="gallery-item">
            <img src="images/note_extracted/billings-homestead/fo76_060921_locations_23.png" alt="風景">
            <div class="caption">風景</div>
        </div>
    </div>
</div>`;

const targetFile = 'f:\\Fallout\\billings-homestead.html';
let content = fs.readFileSync(targetFile, 'utf8');

// replace description up to TAGS section
// However, the previous standard replacement uses endPattern
const startPattern = '<h2>概要</h2>';
const endPattern = '<div style="margin-top: 30px; border-top: 1px dashed';

const startIndex = content.indexOf(startPattern);
const endIndex = content.indexOf(endPattern);

if (startIndex !== -1 && endIndex !== -1) {
    let newContent = content.substring(0, startIndex) + htmlBody + '\n\n            ' + content.substring(endIndex);
    
    // add creatures if missing, or replace empty list
    const infoboxEndIndex = newContent.indexOf('</aside>');
    if (infoboxEndIndex !== -1) {
        const creaturesHtml = '<div class="infobox-row"><span class="infobox-label">敵対生物</span><span>フェラル・グール<br>モングレル<br>リベレーター<br>プロテクトロン</span></div>';
        
        // Remove existing creatures pattern if any
        newContent = newContent.replace(/<div class="infobox-row"><span class="infobox-label">敵対生物<\/span><span>[^<]*<\/span><\/div>/g, '');
        
        const appearancePattern = '<div class="infobox-row"><span class="infobox-label">登場作品';
        const appearanceIndex = newContent.indexOf(appearancePattern);
        if (appearanceIndex !== -1) {
             const finalContent = newContent.substring(0, appearanceIndex) + creaturesHtml + newContent.substring(appearanceIndex);
             fs.writeFileSync(targetFile, finalContent, 'utf8');
             console.log("Updated billings-homestead.html successfully.");
        } else {
             fs.writeFileSync(targetFile, newContent, 'utf8');
             console.log("Updated billings-homestead.html successfully (no appearance field).");
        }
    } else {
        fs.writeFileSync(targetFile, newContent, 'utf8');
        console.log("Updated billings-homestead.html successfully (no infobox modification).");
    }
} else {
    // If we can't find the exact end pattern, we can look for "TAGS:"
    const backupEndIndex = content.indexOf('TAGS:');
    if (backupEndIndex !== -1) {
        // find the div before TAGS:
        const divBefore = content.lastIndexOf('<div', backupEndIndex);
        if (divBefore !== -1 && startIndex !== -1) {
            let newContent = content.substring(0, startIndex) + htmlBody + '\n\n            ' + content.substring(divBefore);
            fs.writeFileSync(targetFile, newContent, 'utf8');
            console.log("Updated using backup end pattern.");
        } else {
            console.error("Backup pattern failed.");
        }
    } else {
        console.error("Patterns not found in the HTML.");
    }
}
