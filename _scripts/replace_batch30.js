const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const writePost = (id, text) => {
    ensureDir(`f:/Fallout/_X/${id}`);
    fs.writeFileSync(`f:/Fallout/_X/${id}/post.md`, text);
};

// 1. Recovered Assaultron Head
const fixAssaultronHead = () => {
    // Article is already good. Just need to create the SNS post.
    writePost('assaultron_head', `回収されたアサルトロン頭部のロア記事を再点検しました！☢️
「ハイリスク・ハイリターン」を体現する特異なエネルギー武器。チャージ全開で放つロマンの一撃は、被曝という大きな代償を伴います。
#Fallout76 #フォールアウト76 #Fallout4
https://www.fallout-jp.com/assaultron_head.html`);
    console.log('Assaultron Head fixed (created post.md).');
};

// 2. Axel
const fixAxel = () => {
    const file = `f:/Fallout/axel-milepost-zero.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const main = document.querySelector('main.content');
    
    const newContent = `
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
                <button class="like-button" data-article-id="note_axel_milepost_zero" onclick="toggleLike(this)">
                    <span class="heart">♡</span> <span class="like-count">0</span>
                </button>
            </div>

            <h1>Axel (アクセル)</h1>

            <div class="quote-box">
                「ああ、君に会えて本当に良かった。なんて朝だ！おやつを探しに超早く抜け出したんだけど、外で500匹ぐらいのオオカミに出くわしたんだ。でも心配しないで、僕たちの方が頭が良かったから！とにかく、おやつのついでに古いガラクタも見つけたんだ。いくつかいる？」<br>
                <br>
                ―― 息を切らしたアクセル
            </div>

            <h2>概要</h2>
            <p>
                <b>アクセル (Axel)</b> は、「Milepost Zero」アップデートで導入されたブルーリッジ・キャラバン・カンパニーの拠点「マイルポスト・ゼロ」で、デコレーター（装飾担当）として雇用できる子供のNPCでした。<br>
                彼を雇用するには125の「物資」が必要であり、彼はセントリーボットの相棒「<a href="gyro.html" class="auto-link">ジャイロ (Gyro)</a>」と一緒に拠点にやってきます。
            </p>
            <p>
                <b>注意:</b> マイルポスト・ゼロの経営ゲームプレイは後の『Burning Springs』アップデートで廃止されました。<br>
                そのアップデート以降、アクセルを雇用することはできなくなり、彼がゲーム内に登場することもなくなっています（削除されたコンテンツ）。
            </p>
            
            <h2>基地のアップグレード</h2>
            <p>
                マイルポスト・ゼロの他のメンバーと同様に、アクセルのアップグレードはマーリーとの会話を通じて行われました。<br>
                アクセルのティアを上げると、拠点の内部装飾テーマの選択肢が増えます。これらのテーマは拠点の見た目を変えるだけで、ステータス等への実質的な影響はありませんでした。
            </p>
            <ul>
                <li><b>ティア1（初期雇用）</b>: 125 物資。装飾テーマ「ブルーリッジ」と「ミリタリー (40物資)」が選択可能。</li>
                <li><b>ティア2</b>: 150 物資。新たな装飾テーマ「アンティーク (40物資)」が解禁。マーリーの近くのテーブルにメモ「測量報告書」が出現。</li>
                <li><b>ティア3</b>: 200 物資。新たな装飾テーマ「カルト教信者 (40物資)」が解禁。また、いずれかのテーマを購入すると、彼から「設計図: アクセルのスノードーム」をもらえる会話オプションが解禁。</li>
            </ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                マイルポスト・ゼロの装飾要素を一手に引き受けていた活発な少年キャラクターです。<br>
                子供の相棒が恐ろしい火力を持つ「セントリーボット」という絵面はいかにもFalloutらしくて笑えました。<br>
                残念ながらマイルポスト・ゼロのシステムの廃止により、彼に出会うことはできなくなってしまいましたが、彼のスノードーム設計図などは形を変えて入手できるように救済措置が取られたようです。
            </div>

            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <div style="margin-bottom: 10px;">
                    TAGS: <span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#Fallout76</span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#Person</span>
                </div>
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Axel_(Milepost_Zero)" target="_blank" rel="noopener">Axel (Milepost Zero)</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
                <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
            </div>

            <div class="comments-section" id="comments-section">
                <h3 class="comments-title">&gt; COMMENTS</h3>
                <div class="comment-form">
                    <textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力 (最大100文字)..." oninput="updateCharCount()"></textarea>
                    <div class="comment-form-footer">
                        <span class="char-count"><span id="char-count">0</span> / 100</span>
                        <button class="comment-submit-btn" onclick="submitComment()">SEND ▶</button>
                    </div>
                    <div id="comment-msg" class="comment-msg"></div>
                </div>
                <div id="comments-list" class="comments-list">
                    <div class="comment-loading">LOADING...</div>
                </div>
            </div>
    `;

    main.innerHTML = newContent;
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('axel_milepost_zero', `マイルポスト・ゼロの「アクセル」のロア記事を本格アップデート！🎒
セントリーボットのジャイロを相棒にし、拠点のデコレーションを担当していた元気な少年。システム改修で姿を消した彼の背景データを補完しました。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/axel-milepost-zero.html`);
    console.log('Axel fixed.');
};

// 3. Big Al's Tattoo Parlor
const fixBigAl = () => {
    const file = `f:/Fallout/big-al-s-tattoo-parlor.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Check if quote-box exists
    let qb = document.querySelector('.quote-box');
    if (!qb) {
        const h1 = document.querySelector('h1');
        const quoteHtml = `
            <div class="quote-box">
                <b>感想</b><br><br>
                表向きは潰れかけのタトゥーショップ、裏の顔は怪しさ満点の「秘密の酒場」！<br>
                Vault-Tec大学の学生たちが秘密裏に集まり、酔いどれロボブレインの「ビブ」と共に「ヌカシャイン」の実験をしていたという最高にアパラチアらしい裏設定が凝縮されたロケーションです。<br>
                お酒に関するクエストの拠点であり、自動販売機の裏から出入りする時のワクワク感は、何度訪れても色褪せません。
            </div>
        `;
        h1.insertAdjacentHTML('afterend', quoteHtml);
    }
    
    // Ensure viewport meta
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('big_als_tattoo_parlor', `「ビッグ・アルのタトゥー・パーラー」のロア記事をアップデートしました！💉
表向きはタトゥーショップ、その地下には学生たちの秘密の酒場が…。酔っ払いロボブレイン「ビブ」とヌカシャインの歴史が詰まった名所です！
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/big-al-s-tattoo-parlor.html`);
    console.log('Big Als Tattoo Parlor fixed.');
};

fixAssaultronHead();
fixAxel();
fixBigAl();
