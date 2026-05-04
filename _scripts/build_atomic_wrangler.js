const fs = require('fs');

const slug = 'atomic-wrangler-casino';
const title = 'アトミック・ラングラー・カジノ (Atomic Wrangler Casino)';

const html = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Fallout Lore Archive</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Share+Tech+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="index.css">
</head>
<body data-article-category="場所">
    <div class="scanlines"></div><div class="vignette"></div>
    <div class="container">
        <main class="content">
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
            </div>
            <h1>${title}<br><span style="font-size: 0.6em; color: #888;">Atomic Wrangler Bar & Casino</span></h1>
            
            <div class="infobox">
                <h3 style="text-align:center; color:var(--bg-color); background:var(--accent-color); margin:0 -15px 15px -15px; padding:5px;">LOCATION DATA</h3>
                <img src="images/note_extracted/atomic-wrangler-casino/Atomic_Wrangler_Casino.jpg" alt="Atomic Wrangler exterior" style="width:100%; border:1px solid var(--accent-color); margin-bottom:15px;" onerror="this.src='images/placeholder.jpg'">
                <div class="info-grid">
                    <div class="info-label">地域:</div><div class="info-value">フリーサイド</div>
                    <div class="info-label">所有者 (2281年):</div><div class="info-value">フランシーン・ギャレット<br>ジェイムス・ギャレット</div>
                    <div class="info-label">所有者 (2296年):</div><div class="info-value">ショットガン・ジェフ</div>
                    <div class="info-label">著名なロボット:</div><div class="info-value">フィスト (Fisto)</div>
                    <div class="info-label">登場:</div><div class="info-value">Fallout: New Vegas<br>Fallout TVシリーズ (S2)</div>
                </div>
            </div>

            <div class="note-box" style="margin-top: 15px;">
                「腹減ってる？喉が渇いた？それともヤリたい？ アトミック・ラングラーなら全部カバーしてるぜ！」<br>
                — アトミック・ラングラーの呼び込み (Atomic Wrangler crier)
            </div>

            <p><b>アトミック・ラングラー・バー＆カジノ (Atomic Wrangler Bar & Casino)</b>、通称「<b>アトミック・ラングラー</b>」は、モハビ・ウェイストランドのフリーサイドに位置するカジノ兼酒場です。TVドラマ版シーズン2にも登場します。</p>

            <h2>背景</h2>
            
            <h3>大戦前の歴史と暗躍</h3>
            <p>アトミック・ラングラー・バー＆カジノは、大戦前のネバダ州ラスベガスの「フリーモント・ストリート」にあったナイトクラブであり、「西部で最も素晴らしい水飲み場」と宣伝されていました。<br>
            そして2077年、この店は俳優のクーパー・ハワード（後のグール）と連邦議会議員ダイアン・ウェルチによる密会の舞台となりました。彼女は、クーパーがVault-Tecから盗み出した「コールドフュージョン（常温核融合）・ダイオード」をアメリカ合衆国大統領に極秘に渡すための手はずをここで整えました。</p>

            <h3>2281年 (Fallout: New Vegas)</h3>
            <p>2281年までに、アトミック・ラングラーはフリーサイドの貧民街にある唯一の現役カジノとなっており、簡易宿泊施設（ドヤ街）、売春宿、そしてこの地域における主要な麻薬（ケム）の供給源としても機能しています。<br>
            所有者兼運営者は双子のギャレット姉弟（ジェイムスとフランシーン）であり、彼らは保護のために武装した凶漢（Thugs）のスタッフを雇っています。近くのシルバーラッシュを拠点とするヴァン・グラフ家や、通りを下った先にあるキングス・スクール・オブ・インパーソネーションを拠点とする「キングス」のメンバーにもサービスを提供しています。<br>
            また、ニューベガス・ストリップ地区に入るための「深いがま口（高額の入場料）」を持たない多くのキャラバン商人や、貧しいNCR市民もここで見かけることができます。ストリップに入れるほどの金はないがギャンブルはしたいという者にとって、フリーサイドで最高のカジノなのです。</p>

            <h3>2296年 (TVドラマ版シーズン2)</h3>
            <p>2296年の時点でもフリーサイドで営業を続けていますが、その時点でのバーテンダーは「ショットガン・ジェフ」という男であり、ギャレット姉弟がこの施設にまだ関わっているかどうかは不明です。</p>

            <h2>レイアウト (ゲーム版の設定)</h2>
            <p>フリーサイドの南端に位置し、ツギハギの「Freeside」の看板を越えた西側にあります。店先には、スタイリッシュな「原子（Atom）に乗る未来的なカウボーイ」のネオンサインが掲げられています。</p>

            <h3>1階 (ボトムレベル)</h3>
            <p>メインルームにはアーチ型の天井、ステージ、そしてバーがあります。入り口の正面に見える部屋にはキャッシャーとカジノゲーム（ルーレット、ブラックジャック、スロット）があります。右側にはバスルームと2階のバルコニーへの階段があります。<br>
            バーの裏手にはキッチンと貯蔵室があり、アルコール飲料や大量の新鮮なリンゴやニンジンなどが保管されています。</p>

            <h3>2階 (セカンドレベル)</h3>
            <p>ステージとバーを見下ろすバルコニーがある階層です。バルコニーの外れには4つの部屋があり、東の角にある「コーナールーム」は、フランシーンから依頼されるクエスト『Debt Collector』を完了することで、プレイヤーの自宅（プレイヤーハウジング）として使用できるようになります。</p>

            <h3>3階 (サードレベル)</h3>
            <p>ここはギャレット姉弟を含む従業員が生活するエリアです。護衛が徘徊または仮眠をとっており、ギャレット姉弟が交代で寝泊まりする大きな寝室、多数のベッドが置かれた従業員用の寝室2部屋などがあります。</p>

            <h2>ギャンブル</h2>
            <p>アトミック・ラングラーでは、ブラックジャック、ルーレット、スロットマシンがプレイ可能です。<br>
            プレイヤーがキャップ（チップ）を獲得するにつれて、段階的にコンプ（景品）が提供されます。</p>
            <ul>
                <li>1,250+ チップ：ビール</li>
                <li>2,500+ チップ：ウイスキー、粋なギャンブラーの帽子</li>
                <li>3,750+ チップ：アブサン、ラム・アンド・ヌカ、粋なギャンブラーのスーツ</li>
                <li>5,000+ チップ：<b>ギャンブル禁止 (Ban)</b></li>
            </ul>
            <p>5,000以上のチップを獲得すると、アトミック・ラングラーでのギャンブルが永久に禁止されます。ただし、バーの利用や、クエスト『Wang Dang Atomic Tango』完了後に利用可能になる「売春婦（娼婦）」のサービスなどの機能は引き続き利用可能です。</p>

            <img src="images/note_extracted/atomic-wrangler-casino/FOTV_S2E7_Atomic_Wrangler_sign.png" alt="Pre-War Sign" style="width:100%; border:1px solid #444; margin: 15px 0;" onerror="this.src='images/placeholder.jpg'">

            <h2>著名な住人・ロボット</h2>
            <ul>
                <li>フランシーン・ギャレット (フランキー)</li>
                <li>ジェイムス・ギャレット</li>
                <li><b>フィスト (Fisto)</b>: クエスト『Wang Dang Atomic Tango』でプログラムされたセックスボット（プロテクトロンモデル）。「ご希望の体勢をどうぞ（Please assume the position）」のセリフで有名。</li>
                <li>ベアトリクス・ラッセル: グールのカウガール兼ドミネイトリックス。</li>
            </ul>

            <h2>開発秘話</h2>
            <div class="note-box">
                <b>『Dr.ストレンジラブ』からの引用:</b><br><br>
                アトミック・ラングラーのネオンサインにある「落下する核爆弾（原子）にロデオ・カウボーイのように乗る男」のデザインは、名作映画『博士の異常な愛情（Dr. Strangelove）』において、T・J・"キング"・コング少佐が落下する核爆弾に跨る有名なシーンへのオマージュです。
            </div>
            
            <p><b>TVドラマ版 (シーズン2)の撮影セット:</b><br>
            シーズン2におけるフリーサイドおよびアトミック・ラングラーの外装は、カリフォルニア州サンタクラリタにある「メロディ・ランチ・モーション・ピクチャー・スタジオ」で撮影されました。<br>
            また、アトミック・ラングラーの内部セットも同じスタジオですが、通りの向かい側の別の建物が使用されました。この内装用の建物は、ジョナサン・ノーランとリサ・ジョイが手掛けたHBOのドラマシリーズ『ウエストワールド』において、娼館「マリポサ・サルーン（Mariposa Saloon）」の撮影に使用された建物そのものであり、ステージなど一部の配置を変更してアトミック・ラングラーとして流用されています。</p>

            <div class="quote-box">
                <b>Impression</b><br><br>
                「ストリップ地区のおしゃれなカジノには入れない連中が酒とギャンブルと欲望を満たす場所」という、フリーサイドの荒んだ雰囲気を完璧に体現しているカジノです。<br>
                Fallout: New Vegasの全クエストの中でも屈指の知名度と「悪ノリ」を誇るクエスト『Wang Dang Atomic Tango』（なまめかしいグールや雄弁な男娼、そして極めつけにセックスボットの特注プロテクトロン「フィスト」を風俗店として雇い入れるクエスト）の舞台でもあり、多くのプレイヤーがここのコーナールームを自宅として愛用しました。<br><br>
                TVドラマ版シーズン2においては、「かつて大戦前のクーパーが、アメリカ大統領に『コールドフュージョン（常温核融合）技術』を極秘裏に手渡した場所」として、彼とVault-Tecの恐るべき暗躍の歴史の1ページに刻まれることとなりました。メロディ・ランチを使った素晴らしいセットデザインも見どころです。
            </div>
            
            <p>Category:Fallout: New Vegas locations<br>Category:Fallout TV series locations<br>Category:Freeside buildings</p>
        </main>
    </div>
</body>
</html>`;

fs.writeFileSync('f:/Fallout/' + slug + '.html', html, 'utf8');
console.log('Successfully completed building Atomic Wrangler Casino article HTML.');
