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

// 1. Cowspot Dairy
const fixCowspot = () => {
    const file = `f:/Fallout/cowspot-dairy.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Check if quote-box with "感想" exists
    const quoteBoxes = Array.from(document.querySelectorAll('.quote-box'));
    let hasImpression = quoteBoxes.some(qb => qb.innerHTML.includes('感想'));
    
    if (!hasImpression) {
        // Find copyright block
        const copyrightBlock = document.querySelector('div[style*="margin-top: 30px; border-top: 1px dashed var(--accent-color)"]');
        if (copyrightBlock) {
            const impressionHtml = `
            <div class="quote-box">
                <b>感想</b><br><br>
                ゲーム初期の森林地帯で立ち寄ることになる、ユニークなアイスクリーム工場です。<br>
                探索してみると本当にクリームばかりが大量に落ちており、ここでクリームを集めるロールプレイも可能なほどです。屋根裏などにある配置の細かさや、Atomic Shopで販売されたアイテムとしても馴染み深い場所といえます。<br>
                付近にはフェラル・グールが多いため、低レベル時は少し注意が必要ですが、独特のノスタルジックな雰囲気が魅力的なロケーションの一つです。
            </div>
            `;
            copyrightBlock.insertAdjacentHTML('beforebegin', impressionHtml);
        }
    }
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('cowspot-dairy', `ニューリバー渓谷橋の近くにある「カウスポット乳製品製造所」のロア記事をアップデートしました！🐄🍨
戦前にアイスクリームやクリームを製造していた工場跡地で、現在でも大量の「クリーム」を拾うことができる場所になっています。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/cowspot-dairy.html`);
    console.log('Cowspot Dairy fixed.');
};

// 2. Darwin the Devil
const fixDarwin = () => {
    const file = `f:/Fallout/darwin-the-devil.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const main = document.querySelector('main.content');
    
    const newContent = `
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
                <button class="like-button" data-article-id="note_darwin_the_devil" onclick="toggleLike(this)">
                    <span class="heart">♡</span> <span class="like-count">0</span>
                </button>
            </div>

            <h1>Darwin the Devil (ダーウィン・ザ・デビル)</h1>

            <div class="quote-box">
                かつてアパラチアの道を荒らしたアウトローの1人。今は冷たいアスファルトの上で永遠の眠りについている…。
            </div>

            <h2>概要</h2>
            <p>
                <b>Darwin the Devil (ダーウィン・ザ・デビル)</b> は、Fallout 76のマップ拡張アップデートで追加されたロケーション「ルート33の交通渋滞 (Route 33 traffic jam)」で遺体として発見されるキャラクターです。
            </p>
            <p>
                彼は「レモンボーイ・ギャング (Lemon Boy Gang)」と呼ばれるアウトロー集団のメンバーの一人であり、「アーチー・ザ・キッド」と「ロビン・ザ・ブルート」という仲間と共に活動していました。<br>
                何らかの理由で命を落としており、彼からは関連する記録（メモ）を回収することができます。
            </p>

            <div class="quote-box">
                <b>感想</b><br><br>
                過去のアパラチアで暴れ回っていたと思われるギャングの一員ですが、プレイヤーが出会う頃には既に無残な遺体となっています。<br>
                彼の二つ名である「デビル」が示す通り、生前はかなり危険な人物だったと推測されます。<br>
                各地に散らばる仲間の足跡や遺留品を通して、彼らに何が起きたのかを紐解く、Fallout特有の「環境ストーリーテリング」を構成するピースの1つとなっています。
            </div>

            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <div style="margin-bottom: 10px;">
                    TAGS: <span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#Fallout76</span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#Person</span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#BurningSprings</span>
                </div>
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Darwin_the_Devil" target="_blank" rel="noopener">Darwin the Devil</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
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
    
    writePost('darwin-the-devil', `ルート33に倒れているギャング団の1人「ダーウィン・ザ・デビル」のロア記事を作成しました！😈
今はなき「レモンボーイ・ギャング」に所属し、かつてはアパラチアでアウトローとして活動していた彼の記録についてまとめました。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/darwin-the-devil.html`);
    console.log('Darwin the Devil fixed.');
};

// 3. Davey (TV)
const fixDavey = () => {
    const file = `f:/Fallout/davey-tv.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const main = document.querySelector('main.content');
    
    const newContent = `
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
                <button class="like-button" data-article-id="note_davey_tv" onclick="toggleLike(this)">
                    <span class="heart">♡</span> <span class="like-count">0</span>
                </button>
            </div>

            <h1>Davey (デイヴィー)</h1>

            <div class="quote-box">
                「誰かが気分を害する前に、標識の必要性を調査する委員会の設立を提案します」<br>
                （Vault 32に移住後、左右反転した構造に混乱した彼の苦肉の策）
            </div>

            <h2>概要</h2>
            <p>
                <b>Davey (デイヴィー)</b> は、Fallout TVシリーズ（Amazon Prime）に登場するVault 33の居住者です。俳優のリーア・リアリー (Leer Leary) が演じています。
            </p>
            <p>
                Vault内ではインテリジェンスが高めな教養ある人物として描かれており、捕虜になったレイダーたちに対してウィリアム・シェイクスピアやクリストファー・マーロウの古典文学を教えようと提案するなど、少しズレたVault居住者めいた感性の持ち主です。
            </p>

            <h2>シーズン1から2への動向</h2>
            <p>
                かつてVault 33の監督官選挙でハンク・マクレーンに敗北した過去を持ち、その後の選挙ではベティ・ピアソンに投票したことを親友のウッディやレジに謝罪するなど、気弱ですが誠実な一面を見せます。<br>
                その後、再建されたVault 32の移住メンバーに選ばれ、ステフ、チェット、ウッディたちと共に移り住むことになります。
            </p>
            <p>
                しかし、Vault 32の内部構造がVault 33と「左右反転（ミラー構造）」になっていることに混乱し、ステフに標識の設置を願い出るなど、環境の変化に適応しきれない様子が描かれています。<br>
                やがてチェットとステフの結婚式で神父（立会人）を務めますが、そこで信じられないような暴露事件に巻き込まれ、Vaultの「管理層」に対する反逆の声を上げることになります。
            </p>

            <div class="quote-box">
                <b>感想</b><br><br>
                Vault 33から32へと移住した「The・一般Vault居住者」といった感じのキャラクターで、良い意味で世間知らずで教養ぶった性格がVaultの異常な平和さを際立たせています。<br>
                「間違えて男子トイレ（女子トイレ）に入ってしまった」と構造の反転に文句を言ったり、揉め事を避けるためにわざわざ回りくどい委員会を設置しようとしたりと、いかにもVault生まれらしい滑稽な言動が愛らしいです。<br>
                しかし物語の終盤では彼も真実の一端を知り、これまで信じてきたVaultの管理体制に対して牙を剥くようになるという、居住者の心情的変化を如実に表している重要なバイプレイヤーでもあります。
            </div>

            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <div style="margin-bottom: 10px;">
                    TAGS: <span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#FalloutTV</span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#Vault33</span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#Vault32</span>
                </div>
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Davey_(TV_series)" target="_blank" rel="noopener">Davey</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
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
    
    writePost('davey-tv', `ドラマ版に登場するVault 33居住者「デイヴィー」のロア記事をリメイクしました！👍
レイダー捕虜に古典文学を教えようとしたり、Vault 32の左右反転構造に混乱して委員会を作ろうと提案する、いかにもVault居住者らしい少しズレた性格が魅力的です。
#Falloutドラマ #フォールアウト
https://www.fallout-jp.com/davey-tv.html`);
    console.log('Davey (TV) fixed.');
};

fixCowspot();
fixDarwin();
fixDavey();
