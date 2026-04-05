const fs = require('fs');

const translations = {
  "los-angeles-international-airport": {
    "title": "ロサンゼルス国際空港 (Los Angeles International Airport)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>ロサンゼルス国際空港<br><span style="font-size: 0.6em; color: #888;">Los Angeles International Airport</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/los-angeles-international-airport/1024px-FOTV_s1_ep2_LAX.png" alt="Los Angeles International Airport" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">ボーンヤード</div>
                    <div class="info-label">所有者:</div><div class="info-value">ロサンゼルス市 (戦前)</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>ロサンゼルス国際空港 (Los Angeles International Airport / LAX)</b> は、戦前のボーンヤード（ロサンゼルス）に存在した国際空港であり、TVドラマ版に登場します。</p>

            <h2>背景</h2>
            <p>カリフォルニア州のロサンゼルス広域圏から国際線を運航していた主要空港です。現実世界における「テーマ・ビルディング（Theme Building）」に似た、交差するアーチを備えた象徴的な構造物（管制塔やレストランとして使用されていた建物）が敷地内に存在していました。</p>
            <p>2077年の「大戦」による核爆発で空港の大部分は破壊されましたが、テーマ・ビルディングのアーチの基礎部分や、墜落した旅客機の一部は、2296年の時点でも廃墟として残り続けています。<br>
            また、LAX周辺の平原には、墜落して大破した「ソビエトの人工衛星」や、「ドーナツショップ（Randy's Donuts）」の巨大な看板も残存しています。</p>

            <h2>TVシリーズでの登場 (第2話「ターゲット」)</h2>
            <p>フィリーの街での銃撃戦の後、ルーシーは重傷を負ったシギ・ウィルジグを連れて、ロサンゼルス国際空港の残骸が散らばる平原を歩きながらモルデイヴァーの元へと向かいます。しかし道中、疲弊したウィルジグはこれ以上歩けないと悟り、自身の首を切り落として頭部だけを運ぶようルーシーに要求します。</p>
            <p>首のないウィルジグの死体と犬（CX404）の痕跡を追っていたグールも、その後LAXの廃墟を通り抜けます。<br>
            さらにその後、サディアスとマキシマス（タイタス・ナイトに変装した姿）も同じ道をたどり、ソビエトの人工衛星の傍でウィルジグの遺体を発見することになります。</p>

            <h2>開発秘話</h2>
            <div class="note-box">
                <b>現実のランドマーク:</b><br><br>
                ロサンゼルス国際空港にある象徴的な「テーマ・ビルディング」は、1961年に建てられたミッドセンチュリー・モダン（スペースエイジ建築）の代表的な建造物です。<br>
                UFOのような円盤型のレストランを交差する巨大なアーチが支える構造になっており、TVシリーズにおけるポストアポカリプスのLAの象徴的な廃墟として、VFXによって見事に再現されました。
            </div>

            <div class="quote-box">
                <b>Impression</b><br><br>
                「LAX」の相性で知られる現実のロサンゼルス空港の象徴的建造物が、核の炎でアーチだけ残して吹き飛んでいるというビジュアルは、Falloutの「レトロフューチャーな破滅」を見事に体現しています。ここからソビエトの人工衛星にかけての砂漠の行軍は、ルーシーにとってウェイストランドの過酷さを決定づけるトラウマ的な旅路となりました。
            </div>

            <p>Category:Fallout TV series locations<br>Category:Pre-War locations in California</p>
        </main>
    </div>`
  },
  "wilds": {
    "title": "荒野 (TVシリーズ) (Wilds)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>荒野 (TVシリーズ)<br><span style="font-size: 0.6em; color: #888;">The Wilds</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/wilds/The_Wilds_panorama.jpg" alt="The Wilds" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">西海岸一帯 (カリフォルニア)</div>
                    <div class="info-label">著名な場所:</div><div class="info-value">ヤオ・グアイの洞窟<br>フィリー</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>荒野 (The Wilds / ワイルズ)</b> は、TVドラマ版において、カリフォルニアの文明化された居住地（集落）以外の「未開の世界（ウェイストランド）」を指す総称です。</p>

            <h2>背景</h2>
            <p>戦前の都市や居住地を結ぶ文明化された一帯から離れた、広大な砂漠や森林地帯などの厳しい自然環境を指します。<br>
            この「荒野」には、ヤオ・グアイの洞窟などの危険な野生動物の巣窟や、無法者たちがたむろする廃墟が点在しています。エンクレイヴの施設から脱走したシギ・ウィルジグが逃げ込んだのも、この荒野の一角でした。</p>

            <h2>TVシリーズでの登場</h2>
            <p>ドラマ内において「The Wilds」という言葉は、特定の名前のついた1つの地名というよりは、B.O.S.や文明社会の者たちが「危険で野蛮な未開の地」を指す際の表現として使われます。</p>
            <ul>
                <li>第2話でタイタス・ナイトとマキシマスは、ウィルジグを追って荒野に降下し、ヤオ・グアイの洞窟に遭遇します。</li>
                <li>ルーシーがVault 33を出て最初に足を踏み入れたのもこの荒野の端であり、その後ジャンクタウンである「フィリー」へとたどり着きます。</li>
            </ul>

            <div class="quote-box">
                <b>Impression</b><br><br>
                ゲーム内における「ウェイストランド（Wasteland）」とほぼ同義ですが、TVドラマ版の初期エピソードにおいて、安全なVaultや軍事的なB.O.S.基地の外に広がる「予測不能な無法の自然環境」を強調するためにこの呼称が使われています。木々が立ち並ぶエリアから砂漠まで、多様な顔を持つのが特徴です。
            </div>

            <p>Category:Fallout TV series locations</p>
        </main>
    </div>`
  },
  "sunset-sarsaparilla-factory": {
    "title": "サンセット・サルサパリラ・ファクトリー (Sunset Sarsaparilla factory)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>サンセット・サルサパリラ・ファクトリー<br><span style="font-size: 0.6em; color: #888;">Sunset Sarsaparilla factory</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/sunset-sarsaparilla-factory/FoTV_Sunset_Sarsaparillas.png" alt="Sunset Sarsaparilla factory" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">モハビ・ウェイストランド</div>
                    <div class="info-label">企業:</div><div class="info-value">サンセット・サルサパリラ社 (戦前)</div>
                    <div class="info-label">関連商品:</div><div class="info-value">サンセット・サルサパリラ<br>スターキャップ</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout: New Vegas<br>Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>サンセット・サルサパリラ・ファクトリー (Sunset Sarsaparilla headquarters/factory)</b> は、ラスベガス（モハビ・ウェイストランド）にある巨大な飲料工場兼本社です。TVドラマ版にも看板が登場します。</p>

            <h2>背景</h2>
            <p>戦前のモハビにおいて、あの「ヌカ・コーラ」をも凌ぐ絶大な人気を誇ったご当地清涼飲料水「サンセット・サルサパリラ」の製造工場であり、本社ビルでもありました。<br>
            2281年（New Vegas時代）になっても工場内部のボトリング・マシンや自動化設備の一部は稼働を続けており、マスコットキャラクターの「フェストゥス（Festus）」がエントランスで来客を迎え入れ、「スターキャップ」を集めるプロモーションを永遠に続けています。</p>

            <h2>TVシリーズでの登場 (シーズン2)</h2>
            <p>TVドラマ版のシーズン2において、サンセット・サルサパリラの関連施設や巨大な看板が、ニューベガスの郊外または砂漠地帯で登場します。ドラマ内でモハビ・ウェイストランドが描かれるにあたり、このアイコニックな飲料ブランドの看板は欠かせない要素として風景の一部に組み込まれています。</p>

            <img src="images/note_extracted/sunset-sarsaparilla-factory/Sunset_Sarsaparilla_Headquarters.jpg" alt="Factory exterior in FNV" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">

            <div class="quote-box">
                <b>Impression</b><br><br>
                Fallout: New Vegasのプレイヤーなら誰もが「青い星付きのキャップ（スターキャップ）」を血眼になって集め、この工場のロビーにあるフェストゥス（カウボーイの人形マシン）に持って行った思い出があるでしょう。ドラマ版の広大な風景の中にもしっかり「Sunset Sarsaparilla」のビルボードが立っているのを見ると、実家のモハビに帰ってきたような謎の安心感を覚えます。
            </div>

            <p>Category:Fallout: New Vegas locations<br>Category:Pre-War companies<br>Category:Fallout TV series locations</p>
        </main>
    </div>`
  },
  "fabulous-new-vegas-sign": {
    "title": "ファビュラス・ニューベガスの看板 (Fabulous New Vegas sign)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>ファビュラス・ニューベガスの看板<br><span style="font-size: 0.6em; color: #888;">Fabulous New Vegas sign</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/fabulous-new-vegas-sign/FOTV_Welcome_to_Fabulous_New_Vegas.png" alt="Fabulous New Vegas sign" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">モハビ・ウェイストランド</div>
                    <div class="info-label">所属:</div><div class="info-value">ニューベガス</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout: New Vegas<br>Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>ファビュラス・ニューベガスの看板 (Welcome to Fabulous New Vegas sign)</b> は、モハビ・ウェイストランドにおける最も象徴的なランドマークの一つであり、TVドラマ版にも登場します。</p>

            <h2>背景</h2>
            <p>「Welcome to Fabulous New Vegas（素晴らしいニューベガスへようこそ）」と書かれたこの巨大なネオン看板は、現実のラスベガスに存在する有名な「Welcome to Fabulous Las Vegas」サインのパロディ（オマージュ）です。<br>
            ゲームの『Fallout: New Vegas』においては、プレイヤーが最初にストリップ地区に接近する際に目にするランドマークであり、Mr.ハウスが支配する煌びやかなネオンの街の入り口を象徴しています。</p>

            <h2>TVシリーズでの登場 (シーズン2)</h2>
            <p>ドラマ版のシーズン2において、砂漠の中に立ち尽くすこの象徴的な看板が登場します。ゲーム時代（2281年）とは異なり、2296年時点では周囲の環境がさらに荒廃しているか、あるいは新たな勢力の痕跡が刻まれているなど、時を経た変化が描写されます。<br>
            ハンク・マクレーンがはるばるモハビを歩き通し、ニューベガス（ストリップ地区）を遠方に望むシーンでも、この街の象徴として印象的に映し出されます。</p>

            <img src="images/note_extracted/fabulous-new-vegas-sign/FNV_Welcome_to_Fabulous_New_Vegas_sign.jpg" alt="Sign in FNV" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">

            <div class="quote-box">
                <b>Impression</b><br><br>
                Fallout: New Vegasのパッケージやトレーラー映像でも幾度となく使われた、すべてのモハビ・コンバイン（運び屋）にとっての魂の看板です。ドラマ版で実写化されたこの看板を見た瞬間、多くのプレイヤーが「ついにドラマがニューベガスに到達した」と歓喜しました。錆びついた質感が驚くほど忠実に再現されています。
            </div>

            <p>Category:Fallout: New Vegas locations<br>Category:Fallout TV series locations<br>Category:Monuments</p>
        </main>
    </div>`
  },
  "kpss-radio-station": {
    "title": "KPSSラジオ放送局 (KPSS radio station)",
    "text": `<div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>KPSSラジオ放送局<br><span style="font-size: 0.6em; color: #888;">KPSS radio station</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/kpss-radio-station/FoTV_KPSS_radio_station.png" alt="KPSS radio station" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">ボーンヤード (サンタモニカ近辺)</div>
                    <div class="info-label">運営者:</div><div class="info-value">フレッド (死亡)</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout TVシリーズ</div>
                </div>
            </div>
            
            <p><b>KPSSラジオ放送局 (KPSS radio station)</b> は、TVドラマ版に登場する個人運営のラジオ局のロケーションです。</p>

            <h2>背景</h2>
            <p>高い送信鉄塔を備えたこの小さなラジオ放送局は、大戦をどうにか生き延び、その後「フレッド（Fred）」という名の人物によって運営拠点として利用されていました。<br>
            フレッドは防音ブース（またはただの小さな小屋）の中から、古いレコードを使って様々なバイオリン音楽をウェイストランド全土に向けて放送していましたが、フレッド自身が死んだあとも（おそらく自動で）音楽を流し続けていました。<br>
            ラジオブースのコントロール卓にはマイクがあり、その下には腐敗したフレッドの遺体が座っており、部屋の周囲にはいくつかのブービートラップが仕掛けられていました。</p>

            <h2>TVシリーズでの登場 (第7話「ラジオ」)</h2>
            <p>荒野を放浪していたサディアス（従士）は、「コールドフュージョン・アーティファクト」が入ったシギ・ウィルジグの死体の頭部を携えながら、B.O.S.の通信用アレイを利用してブラザーフッド・オブ・スティールに連絡を取るためにこのラジオ局に立ち寄ります。<br>
            しかし、局の通信機器は動作不良を起こしており、B.O.S.と連絡を取る試みはすべて失敗してしまいます。</p>
            <p>その後、サディアスは怪しい風来坊である「チックン（スネークオイル・セールスマン）」と出会い、彼を殺そうとしますが失敗します。チックンは、マキシマスのパワーアーマーによって潰されてボロボロになっていたサディアスの足を回復させる見返りとして、キャップを要求して怪しい薬（おそらくグール化、あるいはミュータント化する血清）を提供しました。<br>
            しばらくして、マキシマスとルーシーが到着します。マキシマスはサディアスから頭部を奪い返そうとし、激しい口論の末にサディアスを首の高さで撃ち抜きます。<br>
            しかし、サディアスの傷が即座に自然治癒したことで、先ほど摂取した薬のせいで彼が「グール」に変異してしまったことが判明し、彼は驚愕します。<br>
            B.O.S.がグールを嫌悪し容赦なく殺戮することを知っているサディアスは、到着したブラザーフッドの分隊から逃げるため、頭部（アーティファクト）をマキシマスに引き渡して一人で逃亡しました。</p>

            <img src="images/note_extracted/kpss-radio-station/FTV_S1E7_Still_026.png" alt="Thaddeus at KPSS" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">

            <h2>開発秘話</h2>
            <p>この施設の名前は、ゲームにおけるさまざまな「K〜」で始まるラジオステーション（K-ROSE等）に似せて名付けられていますが、明示的に名前がKPSSであると劇中のセリフで語られたわけではなく、サインボード等によって判明しています。</p>

            <div class="quote-box">
                <b>Impression</b><br><br>
                主人公たちが各地で遭遇する「ウェイストランドに音楽を流し続けている放送局の正体」の一つです。マイクの前に白骨死体が座ったままレコードが回り続けているという、Falloutの定番のブラックジョークが映像化されました。サディアスが首を撃ち抜かれても死なずに自分がミュータント化したことに気づく衝撃のシーンの舞台でもあります。
            </div>

            <p>Category:Fallout TV series locations<br>Category:Radio stations</p>
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
console.log("Updated " + updatedCount + " medium location files (Batch 2 - Pt 1).");
