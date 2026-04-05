const fs = require('fs');

const translations = {
  "ma-june-s-sundries": {
    "title": "マ・ジューンの雑貨店 (Ma June's Sundries)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>マ・ジューンの雑貨店<br><span style="font-size: 0.6em; color: #888;">Ma June's Sundries</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/ma-june-s-sundries/FOTV_Ma_June's_Sundries.png" alt="Ma June's Sundries" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">フィリー (The Wilds)</div>
                    <div class="info-label">所有者:</div><div class="info-value">マ・ジューン</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>マ・ジューンの雑貨店 (Ma June's Sundries)</b> は、TVドラマ版に登場するフィリーの街路にある店舗ロケーションです。</p>

            <h2>背景</h2>
            <p>廃品を集めて作られた集落「フィリー」の中心部にある雑貨店で、マ・ジューン（Ma June）という強気な女性が経営しています。店内には様々なウェイストランドのガラクタ、衣類、武器、日用品が所狭しと陳列されています。また、この店はウェイストランドにおける情報交換の場ともなっており、マ・ジューンはモルデイヴァーなどの重要人物とも繋がりを持っていました。</p>

            <h2>TVシリーズでの登場 (第2話「ターゲット」)</h2>
            <p>Vault 33を旅立ったルーシーは、父親ハンクの行方の手がかりを求めてフィリーに到着し、この店を訪れます。<br>
            ルーシーはマ・ジューンにVault居住者であることを悟られ、冷たくあしらわれますが、そこにシギ・ウィルジグとCX404（ドッグミート）が現れ、彼がマ・ジューンと（モルデイヴァーに関する）密かな取引を行おうとします。<br>
            しかし直後にグール（クーパー・ハワード）が登場し、ウィルジグの首を狙って店内外で激しい銃撃戦（シュートアウト）が勃発します。マ・ジューンはカウンターの下に隠れながらルーシーに麻酔銃を渡し、ルーシーの反撃、さらにはマキシマス（パワーアーマー装着）の加勢によって、店とフィリーの街並みは戦場と化しました。</p>

            <img src="images/note_extracted/ma-june-s-sundries/FOTV_Ma_June_Sundries_interior.jpg" alt="Interior" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">

            <div class="quote-box">
                <b>Impression</b><br><br>
                メガトンやダイアモンドシティにあるような「典型的なウェイストランドの雑貨屋」を実写で完璧に再現したロケーションです。棚に並んだ様々な色のアブラクソー・クリーナーや、ファンシーラッドケーキの箱など、小道具の作り込みが尋常ではなく、ここでの激しい銃撃戦はドラマ序盤の最大の見せ場の一つとなりました。
            </div>

            <p>Category:Fallout TV series locations<br>Category:Shops</p>
        </main>
    </div>`
  },
  "california-crest-studios": {
    "title": "カリフォルニア・クレスト・スタジオ (California Crest Studios)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>カリフォルニア・クレスト・スタジオ<br><span style="font-size: 0.6em; color: #888;">California Crest Studios</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/placeholder.jpg" alt="California Crest Studios" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">カリフォルニア (戦前)</div>
                    <div class="info-label">関連人物:</div><div class="info-value">クーパー・ハワード</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>カリフォルニア・クレスト・スタジオ (California Crest Studios)</b> は、戦前のカリフォルニアに存在した映画製作会社（映画スタジオ）であり、TVドラマ版のフラッシュバックに登場します。</p>

            <h2>背景</h2>
            <p>大戦前の時代、カリフォルニア・クレスト・スタジオは数多くの映画を制作しており、特に俳優「クーパー・ハワード」を起用した西部劇等で知られていました。<br>
            2077年までに、彼らは『The Man from Pampa』シリーズの一作の撮影を行っていましたが、主演のクーパー・ハワードがVault-Tecの広告塔として政治的な議論の的となったため、スタジオ側は彼との関係を危惧し始めていました。</p>

            <h2>TVシリーズでの登場</h2>
            <p>クーパー・ハワード（後のグール）の戦前の回想シーンにおいて、彼が映画の撮影セットにいる場面が描かれます。そこで彼は、映画のラストシーンにおいて「現実なら善意は通用しないから悪役を撃ち殺すべき」という理由から、台本に反して悪役を射殺する演技をしようと主張しますが、監督から「このスタジオは共産主義者（アカ）と同調している俳優を使っていると思われたくない」と窘められます。</p>

            <div class="quote-box">
                <b>Impression</b><br><br>
                戦前のエンターテインメント産業と、当時の極端な「レッドスケア（赤狩り）」の異様な空気が描かれた場所です。Fallout世界における戦前のアメリカがいかに全体主義的で偏執的な空気に包まれていたか、そして有名な西部劇スターであったクーパーがどのようにして社会から孤立していくかを示す重要な背景となっています。
            </div>

            <p>Category:Pre-War companies<br>Category:Fallout TV series locations</p>
        </main>
    </div>`
  },
  "super-duper-mart-tv-series": {
    "title": "スーパーウルトラ・マーケット (TVシリーズ) (Super Duper Mart)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>スーパーウルトラ・マーケット (TVシリーズ)<br><span style="font-size: 0.6em; color: #888;">Super Duper Mart</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/super-duper-mart-tv-series/FoTV_Super_Duper_Mart_exterior.png" alt="Super Duper Mart" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">ボーンヤード (ロサンゼルス)</div>
                    <div class="info-label">所有者:</div><div class="info-value">Super Duper Mart (戦前)</div>
                    <div class="info-label">現在の占拠者:</div><div class="info-value">スナッパー (臓器密売業者)</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>スーパーウルトラ・マーケット (Super Duper Mart)</b> は、TVドラマ版に登場する戦前の大型スーパーマーケットの廃墟です。※ゲーム版の名称に準拠して「スーパーウルトラ・マーケット（原語：Super Duper Mart）」と訳されています。</p>

            <h2>背景</h2>
            <p>戦前のアメリカ全土に展開していた大手小売りチェーン「スーパーウルトラ・マーケット」のロサンゼルス・サンタモニカ近辺の店舗です。<br>
            2296年現在、この店舗は「臓器密売」を行うための拠点として使用されていました。「ヒューイ」「スクイレル」「スナッパー」と呼ばれる悪名高い臓器密売業者（オルガン・ハーベスター）たちがこの建物を占拠し、迷い込んだ人間や取引相手を捕らえ、店内の精肉設備などを使って臓器を摘出してブラックマーケットに売りさばいていました。彼らは地元のギャング「ガバミント（The Govermint）」にみかじめ料を払って保護されていました。</p>

            <h2>TVシリーズでの登場 (第4話「グール」)</h2>
            <p>放射線障害と怪我で弱ったグールは、輸血と新鮮な薬（吸入用バイアル）を手に入れるため、捕らえたルーシーを「商品」として引き連れてこのスーパーウルトラ・マーケットを訪れます。<br>
            グールはルーシーをスナッパーたちに引き渡しバイアルと交換しようとしますが、その最中に彼自身が重度の発作を起こして倒れます。<br>
            ルーシーは臓器摘出されそうになりますが、持ち前のサバイバルスキルと機転でスナッパーたちを撃退します。<br>
            その後、彼女は逃げ出す前に、（フェラル化を防ぐために）多くのバイアルを道端で倒れているグールに提供し、彼を助ける選択をしました。ルーシーが去った後、近隣からやってきた数十体のフェラル・グールがストアになだれ込み、残っていた臓器密売業者たちを貪り食いました。</p>

            <img src="images/note_extracted/super-duper-mart-tv-series/FoTV_Super_Duper_Mart_Snip_Snip_Room.jpg" alt="Organ harvesting room" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">

            <h2>開発秘話</h2>
            <div class="note-box">
                撮影が行われたのは、ニューヨーク州スタテンアイランドに実在する放棄された空のスーパーマーケット・ビル「旧 ShopRite（ショップライト）」の跡地でした。美術スタッフによって店舗内に何百もの陳列棚やレトロな商品パッケージが配置され、ゲーム画面そのままのスーパーウルトラ・マーケットの内部が精密に再構築されました。
            </div>

            <div class="quote-box">
                <b>Impression</b><br><br>
                Fallout 3や4の序盤でプレイヤーが死ぬ気で物資を漁るあの「Super Duper Mart」が、実写ドラマで完璧なクオリティで登場しました。暗闇の中でMr.ハンディ型の医療ロボット「スニップ・スニップ（Snip Snip）」がルーシーの臓器を切り取ろうとするホラー展開や、フェラル・グールの大群の襲撃など、探索場所としての恐ろしさが映像でも存分に発揮されています。
            </div>

            <p>Category:Fallout TV series locations<br>Category:Super Duper Mart locations</p>
        </main>
    </div>`
  },
  "brotherhood-base": {
    "title": "ブラザーフッド・ベース (Brotherhood base)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>ブラザーフッド・ベース<br><span style="font-size: 0.6em; color: #888;">Brotherhood base</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/brotherhood-base/FoTV_brotherhood_base_overview.png" alt="Brotherhood base" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">西部 (ソルトレイク近郊)</div>
                    <div class="info-label">勢力:</div><div class="info-value">ブラザーフッド・オブ・スティール</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>ブラザーフッド・ベース (Brotherhood base / 隠された谷の基地)</b> は、TVドラマ版に登場するブラザーフッド・オブ・スティール（B.O.S.）の中核的な軍事拠点であり訓練施設です。</p>

            <h2>背景</h2>
            <p>アメリカ西部の乾燥した高地のどこか（設定上はユタ州ソルトレイクのウェンドーバー飛行場付近をモデルにしている）に位置する、B.O.S.の大規模な訓練・駐屯基地です。広大な開けた平地に建てられており、T-60パワーアーマーの格納と整備、新兵（Aspirants）の訓練、ベルチバードの駐機などを行っています。<br>
            司令官の最高職である「クイントス（Elder Cleric Quintus）」がこの基地を指揮し、サン・フェルナンド支部の部隊もこの基地に駐屯して命令を受けています。</p>

            <h2>TVシリーズでの登場 (第1話「ジ・エンド」等)</h2>
            <p>マキシマスが所属するB.O.S.の訓練施設として、ドラマの序盤から複数回登場します。マキシマスはここで過酷な訓練を受け、親友デインが一連の事件（靴にカミソリを入れられる）で負傷した後、デインの代わりにタイタス・ナイトの「従士（Squire）」として選抜されます。<br>
            この基地には巨大な「The Prydwen（プリドゥエン/カサウンディン）」と呼ばれるブラザーフッドの飛空艇（Airship）が東海岸地域の命令に基づき飛来（帰還）し、圧倒的な軍事力を誇示しました。</p>
            <p>エルダー・クイントスはこの基地で会議を開き、エンクレイヴから逃亡したウィルジグが持つ「コールドフュージョン・アーティファクト」の確保を全軍に命じました。</p>

            <img src="images/note_extracted/brotherhood-base/FTV_S1E1_Still_023.png" alt="Base interior" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">

            <h2>開発秘話</h2>
            <div class="note-box">
                <b>撮影地: ウェンドーバー飛行場</b><br><br>
                この巨大な訓練基地のシーンは、ユタ州西部の砂漠地帯にある実在の軍事施設跡「ウェンドーバー飛行場（Wendover Airfield）」で撮影されました。第二次世界大戦中の巨大な格納庫や滑走路がそのまま使われており、B.O.S.の軍事的な無骨さと荒涼とした荒野の雰囲気が見事にマッチしています。
            </div>

            <div class="quote-box">
                <b>Impression</b><br><br>
                マキシマス達イニシエイトが生活し訓練を受ける「西部B.O.S.」の巨大な拠点です。New Vegas時代では地下のバンカーに隠れ住んでいた西海岸のB.O.S.が、ドラマの時代（2296年）には飛空艇プリドゥエンを所有するほどの強大な軍事勢力として再び地表を闊歩している姿は、Falloutの歴史が確実に東海岸（Fallout 4のアーサー・マクソン）の影響を受けて変遷していることを示しています。
            </div>

            <p>Category:Fallout TV series locations<br>Category:Brotherhood of Steel locations</p>
        </main>
    </div>`
  },
  "hollywood-boulevard": {
    "title": "ハリウッド大通り (Hollywood Boulevard)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>ハリウッド大通り<br><span style="font-size: 0.6em; color: #888;">Hollywood Boulevard</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/hollywood-boulevard/FoTV_Hollywood_Boulevard.png" alt="Hollywood Boulevard" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">ボーンヤード (ロサンゼルス)</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>ハリウッド大通り (Hollywood Boulevard)</b> は、戦前のロサンゼルスに存在した著名な大通りであり、TVドラマ版に登場する都市遺跡（ボーンヤード）の一部です。</p>

            <h2>背景</h2>
            <p>戦前のハリウッドを象徴する有名な通りであり、道沿いには「ハリウッド・ウォーク・オブ・フェーム（星型のプレートが埋め込まれた歩道）」が存在していました。<br>
            2296年の時点では、大通りは完全に崩壊した都市遺跡となっており、土と砂に埋もれ、建物の残骸や車両が廃墟の中に散乱しています。大戦時の爆発で吹き飛んだ看板や、かつての著名人（クーパー・ハワードなど）の星型プレートだけが、かつての栄華をかすかに伝えています。</p>

            <h2>TVシリーズでの登場 (第3話「頭部」・第4話「グール」)</h2>
            <p>グールは、シギ・ウィルジグの頭部（アーティファクト）を持って逃げたドッグミート（CX404）の痕跡を追い、ルーシーをロープで引きずりながらこのハリウッド大通りの廃墟を横断します。<br>
            その道中、足元の砂塵の中に「ウォーク・オブ・フェーム」の星型プレートを発見します。ルーシーがそれを目にすると、そこにはかつての「クーパー・ハワード」の名前が刻まれていました。<br>
            グールはそれを一皮被った皮肉な表情で見つめ、その後、自分がかつて栄光を極めたこの街の残骸をただ無言で通り過ぎていきます。</p>

            <img src="images/note_extracted/hollywood-boulevard/FoTV_Hollywood_Walk_of_Fame_Cooper_Howard.png" alt="Walk of Fame star" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">

            <div class="quote-box">
                <b>Impression</b><br><br>
                「ボーンヤード」と呼ばれるようになったロサンゼルスの完全な廃墟の中を歩くグールが、かつての人間時代の自分「クーパー・ハワード」の栄光の証（星型プレート）を踏みつけるという、叙情的で残酷な名シーンの舞台です。彼がかつて輝いていたハリウッドという街自体が、今ではただの砂と瓦礫に還ってしまったことが、果てしない時間の残酷さを物語っています。
            </div>

            <p>Category:Fallout TV series locations<br>Category:Pre-War locations in California</p>
        </main>
    </div>`
  }
};

let updatedCount = 0;
for (const [slug, data] of Object.entries(translations)) {
    const filename = "f:/Fallout/" + slug + ".html";
    if (fs.existsSync(filename)) {
        let content = fs.readFileSync(filename, "utf8");
        if (content.includes("<!-- RAW_WIKITEXT_START -->") && content.includes("<!-- RAW_WIKITEXT_END -->")) {
             const replaced = content.replace(/<main class="content">[\s\S]*?<\/main>/, data.text.match(/<main class="content">([\s\S]*?)<\/main>/)[0]);
             fs.writeFileSync(filename, replaced, "utf8");
             updatedCount++;
        } else { 
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
console.log("Updated " + updatedCount + " medium location files (Batch 2 - Pt 2).");
