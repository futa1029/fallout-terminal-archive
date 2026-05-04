const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/vendor-bot-phoenix.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ベンダーボット・フェニックス（Vendor bot Phoenix）</b>は、<a href="watoga-shopping-plaza.html" class="auto-link">ワトガ・ショッピングモール</a>内の<a href="super-duper-mart.html" class="auto-link">スーパーウルトラ・マーケット</a>内で稼働している<a href="protectron.html" class="auto-link">プロテクトロン</a>のベンダーです。</p>
<p>AMS本社の1ブロック東、ワトガのショッピング地区にフェニックスは配置されています。このプロテクトロンは、B.O.S.の隊員たちが取引や物資調達を行うための出張拠点として<a href="brotherhood-of-steel.html" class="auto-link">ブラザーフッド・オブ・スティール</a>（アパラチア支部）によって広場に設置・プログラミングされました。</p>

            <h2>取り扱い商品</h2>
<p>全ベンダーで共通の上限1400キャップを所持しており、T-45、T-51b、T-60パワーアーマーのほとんどのモジュールの設計図をはじめ、数多くのC.A.M.P.用設計図や各種消耗品、弾薬、武器の設計図などを幅広く販売しています。</p>
<ul>
    <li>ハンドメイドライフルの設計図</li>
    <li>コンバットアーマー関連の設計図</li>
    <li>各種パワーアーマーのモジュール設計図（キャリブレートショック、ジェットパックなど）</li>
</ul>

            <h2>備考・パッチ変更履歴</h2>
<ul>
    <li>プレイヤーキャラクターが<a href="brotherhood-of-steel.html" class="auto-link">B.O.S.</a>の制服（アンダーアーマーのB.O.S.ナイトスーツなど）を着てインタラクトすると、「Ad Victoriam, soldier.（アド・ヴィクトリアム、ソルジャー）」と特別な挨拶をしてくれます。</li>
    <li>時折、ベンダーボット・フェニックスはプログラミングのバグか好戦的な性格からか、自分の取引所を離れて近所をパトロールし始めることがあります。ワトガの敵対的なロボットたちと戦った後、無事であれば最終的に本来の位置に戻ってきます。（※アップデートにより無敵化されました）</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                ワトガの東側にあるスーパーウルトラ・マーケート支店跡地を拠点としている、B.O.S.所属のベンダーボットです。<br>キャップベンダーとして機能しておりB.O.S.向けの設計図などが充実していますが、ワトガの街中を徘徊する好戦的なロボットに自らケンカを吹っ掛けて外へ飛び出していってしまう困った習性があります。「市長を一日で」クエストをクリアする前のプレイヤーにとっては、彼を追いかけて危険な屋外エリアでビームをかいくぐりながら取引をするはめになることもしばしばありました。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Vendor bot Phoenix</h3><img src="images/note_extracted/vendor-bot-phoenix/img_main.png" alt="Vendor bot Phoenix"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="protectron.html" class="auto-link">プロテクトロン</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="brotherhood-of-steel.html" class="auto-link">B.O.S.</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>ベンダー</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace('<h1>Vendor bot Phoenix</h1>', '<h1>Vendor bot Phoenix<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ベンダーボット・フェニックス</span></h1>');

const startMarker = '<h2>概要</h2>';
const endMarker = '<div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">';

const parts = content.split(endMarker);
const preamble = parts[0].split(startMarker)[0];

const finalHtml = preamble + newContent + '\\n            ' + endMarker + parts[1];

fs.writeFileSync('f:/Fallout/vendor-bot-phoenix.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ベンダーボット・フェニックス（Vendor bot Phoenix）
https://www.fallout-jp.com/vendor-bot-phoenix.html

概要

ワトガのスーパーウルトラ・マーケット内で稼働しているプロテクトロンのベンダーです。B.O.S.の隊員たちが取引や物資調達を行うための出張拠点として設置・プログラミングされました。

---

💭 感想

B.O.S.向けの設計図などが充実していますが、ワトガの街中を徘徊する好戦的なプロテクトロン等に自らケンカを吹っ掛けて外へ飛び出していってしまう困った習性があります。「市長を一日で」クエストをクリアする前は、危険な屋外でビームをかいくぐりながら取引することも。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/vendor-bot-phoenix', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/vendor-bot-phoenix/post.md', postContent);

console.log('Done.');
