const fs = require('fs');
let template = fs.readFileSync('f:/Fallout/billings-homestead.html', 'utf8');

// Replace Metadata
template = template.replace(/Billings homestead \| Overseer Mohi's Terminal/g, `Catarax | Overseer Mohi's Terminal`);
template = template.replace(/Billings homestead（ビリングス農場）/g, 'Catarax（カタラックス）');
template = template.replace(/images\/note_extracted\/billings-homestead\/FO76_Billings_homestead\.png/g, 'images/note_extracted/catarax/FO76_season06_toon03.png');
template = template.replace(/https:\/\/www\.fallout-jp\.com\/billings-homestead\.html/g, 'https://www.fallout-jp.com/catarax.html');

// Replace body dataset
template = template.replace(/data-article-category="場所"/g, 'data-article-category="人物"');

const infoboxRegex = /<aside class="infobox">[\s\S]*?<\/aside>/;
const newInfobox = `<aside class="infobox">
            <h3 style="margin-top:0; text-align:center;">Catarax</h3>
            <img src="images/note_extracted/catarax/FO76_season06_toon03.png" alt="Catarax">
            <div class="infobox-row"><span class="infobox-label">役割</span><span>敵役 / 悪役</span></div>
            <div class="infobox-row"><span class="infobox-label">種族</span><span>人間</span></div>
            <div class="infobox-row"><span class="infobox-label">所属</span><span>ディアボリカルズ</span></div>
            <div class="infobox-row"><span class="infobox-label">所有権</span><span>ハブリス・コミック出版</span></div>
            <div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div>
        </aside>`;
template = template.replace(infoboxRegex, newInfobox);

template = template.replace(/data-article-id="note_billings_homestead"/g, 'data-article-id="note_catarax"');
template = template.replace(/<h1>Billings homestead<br><span style="font-size: 0.6em; color: #888;">ビリングス農場<\/span><\/h1>/, '<h1>Catarax<br><span style="font-size: 0.6em; color: #888;">カタラックス</span></h1>');

const contentRegex = /<!-- ===== Overview ===== -->[\s\S]*?(?=<!-- ===== Footer ===== -->)/;

const newContent = `<!-- ===== Overview ===== -->
            <p style="font-style: italic; color: #888; border-left: 2px solid #888; padding-left: 10px; margin-bottom: 20px;">
                「あなたの世界を暗くしてやるわ！」<br>
                — シーズン6のボード
            </p>

            <p>
                「カタラックス」とはハブリス・コミック出版によって作られた架空のキャラクターである。<br>
                戦前のボードゲーム「アンストッパブルズ！ アンストッパブルズ vs ディアボリカルズ」およびその関連製品やグッズにおいて、「ディアボリカルズ」のメンバーとして登場する。
            </p>

            <h2>概要</h2>
            <p>
                カタラックスは、「アンストッパブルズ」と敵対するギャング「ディアボリカルズ」の3人のメンバーのうちの1人である。
            </p>

            <h2>登場作品</h2>
            <p>
                カタラックスは公式ボードゲーム「アンストッパブルズ！ アンストッパブルズ vs ディアボリカルズ」に登場する。<br>
                このゲームは、Fallout Worldsアップデートに合わせて開催されたFallout 76のシーズン6のプレイエリアとして機能した。
            </p>

            <h2>舞台裏</h2>
            <p>
                カタラックスの名前と外見は、白内障（cataracts）の症状に由来している。
            </p>

            <!-- ===== GALLERY ===== -->
            <div class="gallery-section">
                <h2>ギャラリー</h2>
                <div class="gallery-grid">
                    <div class="gallery-item">
                        <img src="images/note_extracted/catarax/FO76_season06_logo03.png" alt="アンストッパブルズ！ vs ディアボリカルズのスコアボードにおけるカタラックスのロゴ">
                        <div class="caption">カタラックスのロゴ</div>
                    </div>
                </div>
            </div>

            <!-- ===== Kanso ===== -->
            <div class="quote-box">
                <b>感想</b><br><br>
                シーズン6のスコアボードに登場する悪役、カタラックスに関する記事です。<br>
                白内障（cataracts）がモチーフになっているという設定が、いかにもFalloutらしくて面白いですね。<br>
                アメコミのヴィランらしい強烈なビジュアルと、「あなたの世界を暗くしてやるわ！」という決め台詞が印象に残るキャラクターです。<br>
                アンストッパブルズの宿敵として、ディアボリカルズの他メンバーとともに世界観を広げる良いスパイスになっていますね。
            </div>

            `;

template = template.replace(contentRegex, newContent);

template = template.replace(/const _commentArticleId = 'note_billings_homestead';/g, "const _commentArticleId = 'note_catarax';");
template = template.replace(/const _commentArticleName = 'Billings homestead';/g, "const _commentArticleName = 'Catarax';");
template = template.replace(/const _commentArticleUrl = 'billings-homestead\.html';/g, "const _commentArticleUrl = 'catarax.html';");

fs.writeFileSync('f:/Fallout/catarax.html', template);
console.log('Successfully regenerated catarax.html');
