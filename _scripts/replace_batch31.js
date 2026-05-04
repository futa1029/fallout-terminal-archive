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

// 1. Blight
const fixBlight = () => {
    // Article is already good. Just need to create the SNS post.
    writePost('blight', `「ブライト」のロア記事を再構成しました！🍄
積灰の山に生える毒々しい見た目のキノコですが、熟練のレジデントにとっては火力を劇的に上げる「ブライトのスープ」の材料として欠かせない最高の自生植物です。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/blight.html`);
    console.log('Blight fixed (created post.md).');
};

// 2. Bodhi
const fixBodhi = () => {
    const file = `f:/Fallout/bodhi.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const main = document.querySelector('main.content');
    
    const newContent = `
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
                <button class="like-button" data-article-id="note_bodhi" onclick="toggleLike(this)">
                    <span class="heart">♡</span> <span class="like-count">0</span>
                </button>
            </div>

            <h1>Bodhi (ボーディ)</h1>

            <div class="quote-box">
                「彼女の遺志を継ぐためにも、真実を明らかにするんだ…」
            </div>

            <h2>概要</h2>
            <p>
                <b>ボーディ (Bodhi)</b> は、2024年のアップデートで追加された地域「バーニング・スプリングス (Burning Springs)」の<b>アセンズ (Athens / Highway Town)</b> というロケーションに潜伏しているNPCです。<br>
                彼は「Abraxodyne intel (アブラクソダイン社の極秘情報や機密データ)」を独自に探し求めています。
            </p>
            
            <h2>クエストと関連人物</h2>
            <p>
                ボーディはクエスト <strong>「Dirty Laundry」</strong> に関連して登場します。
            </p>
            <ul>
                <li><b>アムリタ (Amrita)</b><br>
                ボーディの娘。クエストを進めることで、彼女は既に命を落としていることが判明します。<br>
                ボーディがアブラクソダインの情報を追っている背景には、娘の死が深く関わっていると推測されます。</li>
            </ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                バーニング・スプリングスでのクエストラインに関わる重要人物の1人です。<br>
                Fallout 76では戦前の巨大企業（アブラクソクリーナーで有名なアブラクソダインなど）の隠された闇に触れるストーリーが徐々に掘り下げられており、ボーディの物語もその一環となっています。<br>
                娘を失った哀しみと、情報を探り出そうとする彼の執念がプレイヤーを引き込みます。
            </div>

            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <div style="margin-bottom: 10px;">
                    TAGS: <span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#Fallout76</span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#Person</span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#BurningSprings</span>
                </div>
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Bodhi" target="_blank" rel="noopener">Bodhi</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
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
    
    writePost('bodhi', `バーニング・スプリングスで出会うNPC「ボーディ」のロア記事を本格アップデート！📁
アセンズに潜伏し、アブラクソダイン社の極秘情報を探求し続ける男。亡き娘のために真実を暴こうとする彼の背景ストーリーを追加しました。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/bodhi.html`);
    console.log('Bodhi fixed.');
};

// 3. Bottle
const fixBottle = () => {
    const file = `f:/Fallout/bottle.html`;
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
                ヌカ・ワールドの顔とも言えるアイコニックなキャラクターの1人です。<br>
                相棒のキャッピーとは真逆で、安全第一で少しお堅い性格ですが、そのせいでパークの安全ビデオではいつもひどい目に遭わされているのがお約束で面白いですね。<br>
                Vault Boyとのパートナー関係が公式で明言されているのも非常にレアで、Falloutシリーズの多様性を示す象徴的なキャラクターの1人にもなっています！
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
    
    writePost('bottle', `ヌカ・コーラのマスコット「ボトル」のロア記事をアップデートしました！🥤
キャッピーと共にヌカ・ワールドの安全を守る（？）生真面目な相棒。安全ビデオでの理不尽な扱いや、知られざる交友関係についてまとめました。
#Fallout76 #フォールアウト76 #Fallout4
https://www.fallout-jp.com/bottle.html`);
    console.log('Bottle fixed.');
};

fixBlight();
fixBodhi();
fixBottle();
