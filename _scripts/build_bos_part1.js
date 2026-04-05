const fs = require('fs');

const htmlContent = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brotherhood of Steel - Fallout Lore Archive</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Share+Tech+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="index.css">
    <style>
        .lightbox-overlay {
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }
        .lightbox-overlay.active { display: flex; }
        .lightbox-overlay img { max-width: 90%; max-height: 90%; border: 2px solid var(--accent-color); }
        .video-container {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
            margin: 30px 0;
            border: 1px solid var(--accent-color);
        }
        .video-container iframe {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
        }
    </style>
</head>
<body data-article-category="勢力">
    <div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
                <button class="like-button" data-article-id="brotherhood-of-steel" onclick="toggleLike(this)"><span>♡</span></button>
            </div>
            <h1>Brotherhood of Steel<br><span style="font-size: 0.6em; color: #888; font-family: 'Noto Sans JP', sans-serif; font-weight: normal;">ブラザーフッド・オブ・スティール</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">FACTION DATA</h3>
                <img src="images/Faction_BoS.png" alt="Brotherhood of Steel Logo" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">正式名称:</div><div class="info-value">ブラザーフッド・オブ・スティール</div>
                    <div class="info-label">組織形態:</div><div class="info-value">テクノ・ミリタリー・オーダー (Techno-religious military order)</div>
                    <div class="info-label">本部:</div><div class="info-value">ロスト・ヒルズ (カリフォルニア)</div>
                    <div class="info-label">創設者:</div><div class="info-value">ロジャー・マクソン大尉</div>
                    <div class="info-label">創設年:</div><div class="info-value">2077年11月 (マリポサの反乱と大出エジプト後)</div>
                    <div class="info-label">イデオロギー:</div><div class="info-value">テクノロジーの保護と管理<br>(支部と伝統主義/改革派により変動)</div>
                    <div class="info-label">登場作品:</div><div class="info-value">Fallout, Fallout 2, Fallout 3, New Vegas, Fallout 4, Fallout 76, Fallout TVシリーズ など</div>
                </div>
            </div>

            <p><b>ブラザーフッド・オブ・スティール (Brotherhood of Steel / B.O.S.)</b> は、北アメリカの「ウェイストランド」全体で活動している、軍事的かつテクノロジー宗教を帯びた騎士団（ミリタリー・オーダー）です。</p>
            <p>「大戦」直後にロジャー・マクソン大尉によってカリフォルニア（ニュー・カリフォルニア地区）のロスト・ヒルズで創設されました。彼らは自分たちのルーツを「大戦の火を生き延びたアメリカ陸軍の兵士たち」と、そのスポンサーであった政府のプログラム群に持っています。</p>
            <p>彼らの主な目標は「人類の科学と技術の結晶を収集、保存、修復し、それらが再び世界を焼き尽くすような過ちを引き起こさないよう厳格に管理する」ことです。組織は基本的に閉鎖主義であり、ウェイストランド人（外部の民間人）との交流や徴兵を好まず、独自の大規模な知識と重火器、および「パワーアーマー」を独占的に運用しています。</p>
            <p>カリフォルニアの「西海岸B.O.S.」の本隊から派生し、中西部の「シカゴ支部（ミッドウェスタン B.O.S.）」、東海岸の「キャピタル・ウェイストランド支部」、アパラチアの拠点（アトラス砦）、そして「連邦（コモンウェルス）」を飛空艇で強襲したアーサー・マクソンの軍団など、地域と時代ごとに様々な派閥とイデオロギーの違いを持つ巨大な軍事勢力へと発展しました。</p>

            <!-- CHUNK 1 ENDS HERE, SCRIPT SPLIT -->
`;

fs.writeFileSync('f:/Fallout/brotherhood-of-steel.html', htmlContent, 'utf8');
console.log("Brotherhood of steel Part 1 HTML created successfully.");
