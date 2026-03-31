const fs = require('fs');
const targetFile = 'f:\\Fallout\\biplane-crash-anchor-farm.html';
let content = fs.readFileSync(targetFile, 'utf8');

// replace <h2>概要</h2> to <h2>登場作品</h2>
const startIdx = content.indexOf('<!-- ===== 概要 ===== -->');
const endIdx = content.indexOf('<!-- ===== 感想 ===== -->');

if (startIdx !== -1 && endIdx !== -1) {
    const replacement = `<!-- ===== 概要 ===== -->
            <h2>概要</h2>
            <p>
                <b>複葉機の墜落現場</b>（Biplane crash）は、アパラチアの森林地帯にある未マークのロケーションである。アンカー農場の近隣に位置している。
            </p>

            <!-- ===== レイアウト ===== -->
            <h2>レイアウト</h2>
            <p>
                <a href="anchor-farm.html" class="auto-link">アンカー農場</a>の北東にある背の高い草むらの空き地に、墜落して真っ二つに折れたPT-00D複葉機が横たわっている。かつてこの機体を操縦していたパイロットは、墜落の衝撃で投げ出されたのか、飛行機の少し手前に倒れている。
            </p>

            <!-- ===== 備考 ===== -->
            <h2>備考</h2>
            <ul>
                <li>『Fallout 76 Vault Dweller's Survival Guide』では、この墜落した小型機の周囲の焼け焦げた地面から薬物（ケム）を回収できると言及されている。</li>
            </ul>

            <!-- ===== 登場作品 ===== -->
            <h2>登場作品</h2>
            <p>
                この複葉機の墜落現場は<a href="fallout76.html" class="auto-link">Fallout 76</a>にのみ登場する。
            </p>

            `;
            
    content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
    fs.writeFileSync(targetFile, content, 'utf8');
    console.log("Updated via script successfully.");
} else {
    console.log("Not found.");
}
