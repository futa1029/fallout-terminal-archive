/**
 * Notes / Behind the scenes セクション
 * Fandom Wiki Section 66-70 に対応
 */
const img = (f, a) => {
  return `
            <div class="note-figure">
                <img src="images/note_extracted/brotherhood-base/${f}" class="article-image" alt="${a}" onerror="this.onerror=null; this.src='images/placeholder.jpg';">
                <div class="image-caption">${a}</div>
            </div>
  `;
};

const html = `
            <h2>備考 (Notes)</h2>
            ${img("BOS_Rhombus.png","パラディン・ロンバス","right")}
            <ul>
                <li>ブラザーフッド・オブ・スティールは、Falloutシリーズのすべてのメインタイトルに登場する唯一の勢力の一つです。Fallout 1から最新のTVシリーズまで、一貫して物語の重要な要素として描かれています。</li>
                <li>「ブラザーフッド」という名称は、中世ヨーロッパの騎士修道会（テンプル騎士団、聖ヨハネ騎士団など）を意識したものです。階級名（パラディン、ナイト、スクライブ、エルダー）も同様に中世的な響きを持っています。</li>
                <li>ロジャー・マクソンは最初のハイ・エルダーであり、マクソン家は世代を超えてブラザーフッドのリーダーシップを担ってきました。Fallout 1のジョン・マクソン、Fallout 4のアーサー・マクソンはいずれもロジャーの子孫です。</li>
                <li>パラディン・ロンバスは、Fallout 1の設定でブラザーフッドが最も尊敬するパラディンとして名前が挙がっています。彼はVault居住者に対して友好的な態度を示し、ブラザーフッドとプレイヤーの関係構築に重要な役割を果たしました。</li>
                <li>Fallout 2では、ブラザーフッドの存在感は比較的控えめであり、サンフランシスコのアウトポストが主な拠点でした。しかし、マシューとフランク・ホリガンのカットシーンは、ゲームで最もドラマチックな場面の一つとなっています。</li>
                <li>Fallout 3のブラザーフッド・アウトキャストは、本来のブラザーフッドの教義に忠実であることを自称しており、リヨンズの方針を「異端」と見なしていました。皮肉なことに、リヨンズの「異端的」方針こそが東海岸ブラザーフッドを最も強力な勢力へと押し上げた要因です。</li>
                <li>ブラザーフッドの紋章は作品ごとにわずかに異なるデザインが使用されていますが、剣・歯車・翼という基本モチーフは一貫しています。</li>
            </ul>

            <h2>舞台裏 (Behind the Scenes)</h2>
            <p>ブラザーフッド・オブ・スティールは、Falloutシリーズの開発において最も初期から構想されていた勢力の一つです。</p>

            <h3>開発者の言葉 (Developer Quotes)</h3>
            <div class="holotape-box">
                <b>Josh Sawyer（Fallout: New Vegas ディレクター）</b><br><br>
                「Fallout: New Vegasでは、ブラザーフッドはFallout 3ほど目立つ存在ではありません。その理由の一つは、時間の経過とともにブラザーフッドがNCRと戦争状態にあったからです。Fallout 2の終わり以降、彼らは基本的に技術の管理——特にエネルギー兵器の管理——を巡ってNCRと衝突しました。ブラザーフッドの主な目的の一つがその技術を管理することだったからです。NCRはそれを引き渡すことを拒否したので、戦争になりました。」
            </div>

            <div class="holotape-box">
                <b>Fallout 4 開発チーム</b><br><br>
                エルダー・アーサー・マクソンのキャラクターは、リヨンズの人道主義とブラザーフッド伝統の技術回収主義を統合する指導者として設計されました。マクソンの複雑さは、プレイヤーにブラザーフッドの善悪を単純に判断させないことを意図しています。
            </div>

            <h3>クリエーション・クラブ (Creation Club)</h3>
            ${img("BoS_FO4_CC_Minigun_Decal_recreation.png","ブラザーフッド・ミニガン・デカール","right")}
            <p>Fallout 4のクリエーション・クラブでは、ブラザーフッドをテーマにした複数のコスメティックアイテムが提供されました。これらには、パワーアーマー用のカスタムデカール（紋章のバリエーション）が含まれています。</p>

            <div class="gallery-grid">
                <div class="gallery-item">
                    ${img("BoS_FO4_CC_Minigun_Decal_recreation.png","ミニガン・デカール","")}
                    <div class="caption">ミニガン・デカール</div>
                </div>
                <div class="gallery-item">
                    ${img("BoS_CC_Wingspan_Decal-3.png","ウィングスパン・デカール","")}
                    <div class="caption">ウィングスパン・デカール</div>
                </div>
                <div class="gallery-item">
                    ${img("BoS_CC_Wings_and_Chevrons_Decal.png","ウィング＆シェブロン・デカール","")}
                    <div class="caption">ウィング＆シェブロン・デカール</div>
                </div>
                <div class="gallery-item">
                    ${img("BoS_CC_Combat_Wing_Decal.png","コンバットウィング・デカール","")}
                    <div class="caption">コンバットウィング・デカール</div>
                </div>
            </div>
`;
module.exports = { html };
