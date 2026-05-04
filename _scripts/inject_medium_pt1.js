const fs = require('fs');

const translations = {
  "santa-monica": {
    "title": "サンタモニカ (Santa Monica)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>サンタモニカ<br><span style="font-size: 0.6em; color: #888;">Santa Monica</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/santa-monica/FOTV_credits_Santa_Monica.png" alt="Santa Monica Pier" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">ボーンヤード (ロサンゼルス)</div>
                    <div class="info-label">建造物:</div><div class="info-value">Vault 33</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>サンタモニカ (Santa Monica)</b> は、戦前のカリフォルニア州ロサンゼルス郡にあった都市です。TVドラマ版に登場します。</p>

            <h2>背景</h2>
            <p>大戦前のサンタモニカは、「サンタモニカ・ピア」でよく知られる有名な観光地であり、2296年時点でもその大部分が残存しています。また、海沿いのバンカーコンプレックス内に建設された「Vault 33」の所在地でもありました（ピアから少し内陸に入った場所に位置します）。</p>

            <h2>登場</h2>
            <p>サンタモニカはTVドラマ版『Fallout』に登場しますが、このエリアに相当する場所は初代『Fallout』のワールドマップ上でも確認することができます。</p>

            <h2>開発秘話</h2>
            <p>サンタモニカ・ピアのシーンは、ナミビアにあるゴーストタウンでありかつてのダイヤモンド鉱山であった「エリザベス・ベイ」で撮影されました。観覧車やジェットコースター、背景のマリブ山脈などはVFX（視覚効果）で追加されていますが、ショット内のそれ以外の大部分は実写（プラクティカルセット）です。</p>

            <div class="quote-box">
                <b>Impression</b><br><br>
                主人公ルーシーが生まれ育ったVault 33の地上にあるロケーションです。ドラマのエンディングクレジット等で荒れ果てた「サンタモニカ・ピア（桟橋）」の姿が度々描かれ、かつて賑わっていた西海岸の観光地の無惨なポストアポカリプスの風景を強烈に印象付けました。
            </div>

            <p>Category:Fallout TV series locations</p>
        </main>
    </div>`
  },
  "donut-shop": {
    "title": "ドーナツショップ (Donut shop)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>ドーナツショップ<br><span style="font-size: 0.6em; color: #888;">Donut shop</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/donut-shop/FOTV1-3_donutshop.jpg" alt="Donut shop" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">ボーンヤード (ロサンゼルス)</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>ドーナツショップ (Donut shop)</b> は、カリフォルニア州ロサンゼルスにあるTVドラマ版のロケーションです。※劇中で正式な店舗名は明かされていません。</p>

            <h2>背景</h2>
            <p>ロサンゼルス国際空港の近辺、墜落した「ソビエトの人工衛星」の近くに建てられていたロードサイド店舗です。店舗にはドーナツの形をした巨大な看板が設置されています。<br>
            周囲の建物が完全に破壊されているのとは対照的に、この店舗は「大戦」を生き延び、比較的無傷な状態で残存しています。</p>

            <p>グールとCX404（ドッグミート）は、シギ・ウィルジグの首なし死体を発見し、彼の失われた首を追跡するために出発した後、このショップの横を通り過ぎました。</p>

            <h2>開発秘話</h2>
            <div class="note-box">
                <b>現実世界のランドマーク「Randy's Donuts」</b><br><br>
                このドーナツショップはすべてデジタルエフェクトで作成されましたが、モデルとなったのはカリフォルニア州イングルウッドにあるベーカリー「Randy's Donuts（ランディーズ・ドーナツ）」であり、LAを代表する地元のランドマークとして知られています。<br>
                プロダクション・デザイナーは、ロサンゼルス国際空港のテーマビル（壊れたアーチ）の近くに、かじられた巨大なランディーズ・ドーナツを配置することで、ルーシーやグール、マキシマスといったキャラクターたちが通り過ぎる際に、象徴的なLAの荒廃を演出しました。
            </div>

            <div class="quote-box">
                <b>Impression</b><br><br>
                現実のLAでも極めて有名なランドマーク「Randy's Donuts」のオマージュであり、ゲームで言えば『スローカムズ・ジョー』のような存在です。巨大なドーナツ看板がそのままの形で残っているのが、Fallout独特の「レトロフューチャーな看板だけは異様に頑丈」というお約束を踏襲していてニヤリとできます。
            </div>

            <p>Category:Fallout TV series locations</p>
        </main>
    </div>`
  },
  "starlight-drive-in-theatre-tv-series": {
    "title": "スターライト・ドライブイン劇場 (TVシリーズ)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>スターライト・ドライブイン劇場 (TVシリーズ)<br><span style="font-size: 0.6em; color: #888;">Starlight Drive-in Theatre</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/starlight-drive-in-theatre-tv-series/FTV_S2E1_Still_153.png" alt="Starlight Drive-in Theatre" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">モハビ・ウェイストランド</div>
                    <div class="info-label">所有者:</div><div class="info-value">スターライト・シアターズ (戦前)</div>
                    <div class="info-label">接続:</div><div class="info-value">Vault 24</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout TVシリーズ (S2)</div>
                </div>
            </div>
            
            <p><b>スターライト・ドライブイン劇場 (Starlight Drive-in Theatre)</b> は、モハビ・ウェイストランドにあるTVドラマ版シーズン2のロケーションです。スターライト・シアターズによって運営されていました。</p>

            <h2>背景</h2>
            <p>ネバダ州ラスベガス（ニューベガス）の郊外のどこかに位置する小さなドライブインシアターです。「大戦」が勃発した当時、劇場では午後6時30分から『A Man and His Dog 3（男と犬 3）』の上映が行われており、その日の夜遅くにはドラキュラ関連の映画が2本立てで上映される予定でした。</p>
            <p>また、この劇場は<b>Vault 24</b>への入り口を隠すための立地としても利用されており、Vaultの入り口は巨大な映画用スクリーンのすぐ裏側に隠されていました。</p>

            <h2>TVシリーズでの登場 (シーズン2)</h2>
            <p>ルーシーとグールは、ハンク・マクレーンの足跡をたどってニューベガスに向かう旅の途中、この劇場に出くわします。<br>
            グールは最初、劇場のマーキー（ひさし看板）に自分がかつて出演した古い映画（『A Man and His Dog 3』）の名前がリストされているのを見て心惹かれますが、ルーシーは破れた巨大スクリーンの裏側に「開いたままのVault 24のドア」があるのを発見し、すぐにそちらに注意を向けます。ハンクがそこを通ったことを確信した二人は、後を追うためにVaultに入っていきます。</p>

            <div class="note-box">
                ※Fallout 4における連邦の「スターライト・ドライブイン」とは別の場所（ネバダ州の同系列店舗）です。
            </div>

            <div class="quote-box">
                <b>Impression</b><br><br>
                崩れかけたスクリーンの裏にVaultの巨大な歯車ドアが隠されているという、いかにもVault-Tecらしい狂気の立地設定が最高です。Fallout 4のプレイヤーにはお馴染みの「スターライト・ドライブイン」系列店がモハビにもあったという事実や、クーパー自身が出演した映画が当時の看板にそのまま残っているという切なさが光るロケーションです。
            </div>

            <p>Category:Fallout TV series locations</p>
        </main>
    </div>`
  },
  "camp-golf-tent": {
    "title": "キャンプ・ゴルフのテント (Camp Golf tent)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>キャンプ・ゴルフのテント<br><span style="font-size: 0.6em; color: #888;">Camp Golf Tents</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/camp-golf-tent/CG_tent.jpg" alt="Camp Golf Tents" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">モハビ・ウェイストランド</div>
                    <div class="info-label">勢力:</div><div class="info-value">新カリフォルニア共和国 (NCR)</div>
                    <div class="info-label">所属:</div><div class="info-value">キャンプ・ゴルフ</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout: New Vegas<br>Fallout TVシリーズ</div>
                </div>
            </div>

            <div class="note-box" style="margin-top: 15px;">
                「何が知りたいって？ この場所は戦前、金持ちのクソ野郎どものリゾートだったんだ。今はレンジャーが元のリゾート施設を使ってて、俺たちのような下っ端の歩兵はテント暮らしってわけだ。…クソ典型的な話だろ？」<br>
                — ラズ (Razz)
            </div>
            
            <p><b>キャンプ・ゴルフのテント (Camp Golf Tents)</b> は、モハビ・ウェイストランドの「キャンプ・ゴルフ」内にある、マークされていないロケーション群です。</p>

            <h2>レイアウト</h2>
            <p>キャンプ・ゴルフの主要施設である「ハウス・リゾート」の少し南西に位置しており、NCR歩兵（トルーパー）を収容するためのテントが合計10張り設置されています。<br>
            各テントのレイアウトは異なりますが、基本的には3〜4つの使用可能なベッド、2〜4つのダッフルバッグがあり、1〜2人のNCRトルーパーが寝ていたり、周囲に立っていたりします。テントの上部には天窓があり、日光や空気を取り入れることができます。</p>

            <h2>特筆すべき戦利品</h2>
            <ul>
                <li><b>ステルスボーイ</b> (最大3つ) - テント内のダッフルバッグやフットロッカー（足元の収納箱）の中にランダムで配置されています。</li>
            </ul>

            <img src="images/note_extracted/camp-golf-tent/FOTV_House_Resort.jpg" alt="FOTV House Resort" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">
            <p><i>（図：TVシリーズ版に登場するキャンプ・ゴルフのテント群）</i></p>

            <div class="quote-box">
                <b>Impression</b><br><br>
                エリートであるNCRレンジャーたちが豪華なハウス・リゾートの中に陣取っているのに対し、一般の歩兵であるトルーパーたちが押し込められているテント群です。ラズの愚痴の通り、NCR内部の強烈な階級格差と士気の低さを物語る象徴的な配置となっています。TVドラマ版シーズン2で実写化された際も、背景にしっかりテント群が映り込んでいました。テント内でステルスボーイを複数見つけられるのは、巡回中の兵士からの「ちょっとした横流し」の証かもしれません。
            </div>

            <p>Category:Camp Golf buildings<br>Category:Fallout TV series locations</p>
        </main>
    </div>`
  },
  "santa-monica-pier": {
    "title": "サンタモニカ・ピア (Santa Monica Pier)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>サンタモニカ・ピア<br><span style="font-size: 0.6em; color: #888;">Santa Monica Pier</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/santa-monica-pier/FOTV_S2E1_pre-War_LA_02.png" alt="Pre-War Santa Monica Pier" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">ボーンヤード (ロサンゼルス)</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>サンタモニカ・ピア (Santa Monica Pier)</b> は、カリフォルニア州ロサンゼルス郡にあった戦前のアトラクション施設であり、TVドラマ版に登場します。</p>

            <h2>背景</h2>
            <p>かつてカリフォルニア州サンタモニカに位置していたこのピア（海に突き出た桟橋）は、小規模な遊園地（観覧車やジェットコースターを備える）や売店、太平洋を眺めるためのエリアなどを含む人気の観光スポットでした。<br>
            そして「Vault 33」の入り口は、このピアから少し内陸に入った場所に造られました。</p>

            <p>2296年の時点では、観覧車に至るまでの桟橋の大部分はまだ残っていますが、その奥のセクションは海に崩れ落ちています。いくつかの散在する建物と、現在ではむき出しになっているVault 33の入り口を除いて、周囲の地域のほとんどは砂漠化しており、かつてのサンタモニカの都市遺跡の面影はほとんど残っていません。</p>

            <h2>TVシリーズでの登場</h2>
            <p>サンタモニカ・ピアは、シーズン1の「ジ・エンド」とエンディングクレジットに登場します。また、シーズン2のエピソード「イノベーター」における戦前のフラッシュバックシーンにも登場します。対応するエリアは、初代『Fallout』のワールドマップ上でも確認可能です。</p>

            <div class="note-box">
                <b>現実の撮影地:</b><br><br>
                このサンタモニカ・ピアのシーンは、ナミビアにあるゴーストタウンでありかつてのダイヤモンド鉱山であった「エリザベス・ベイ」で撮影されました。観覧車やジェットコースター等はVFXで追加されています。
            </div>

            <img src="images/note_extracted/santa-monica-pier/Vault33extdoor.png" alt="Vault 33 Entrance near the pier" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">

            <div class="quote-box">
                <b>Impression</b><br><br>
                「サンタモニカ」の親記事と重複する部分が多いですが、こちらはより「桟橋（ピア）と遊園地部分」に焦点を当てた記事です。砂漠の中にポツンとむき出しになったVault 33の巨大な歯車ドアと、崩れかけの観覧車のコントラストは、ドラマ第一話のラストシーンにおける「世界が終わった後の絶望感」を表現する最高のビジュアルでした。
            </div>

            <p>Category:Fallout TV series locations</p>
        </main>
    </div>`
  }
};

let updatedCount = 0;
for (const [slug, data] of Object.entries(translations)) {
    const filename = "f:/Fallout/" + slug + ".html";
    if (fs.existsSync(filename)) {
        let content = fs.readFileSync(filename, "utf8");
        // Replace inner content of body
        if (content.includes("<!-- RAW_WIKITEXT_START -->") && content.includes("<!-- RAW_WIKITEXT_END -->")) {
             // We can just replace the whole <body> or <main>
             const replaced = content.replace(/<main class="content">[\s\S]*?<\/main>/, data.text.match(/<main class="content">([\s\S]*?)<\/main>/)[0]);
             fs.writeFileSync(filename, replaced, "utf8");
             updatedCount++;
        } else { // assume standard layout
             const newContent = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title} - Fallout Lore Archive</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Share+Tech+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="index.css">
</head>
<body data-article-category="場所">
${data.text}
</body>
</html>`;
             fs.writeFileSync(filename, newContent, "utf8");
             updatedCount++;
        }
    } else {
        console.log("File not found: " + filename);
        // create new just in case
        const newContent = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title} - Fallout Lore Archive</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Share+Tech+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="index.css">
</head>
<body data-article-category="場所">
${data.text}
</body>
</html>`;
        fs.writeFileSync(filename, newContent, "utf8");
        updatedCount++;
    }
}
console.log("Updated " + updatedCount + " medium location files (Batch 1 - Pt 1).");
