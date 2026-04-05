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

// 1. Amy Kelly
const fixAmyKelly = () => {
    const file = `f:/Fallout/amy-kelly.html`;
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
                孤独の中に生きる意味を見出し、アパラチアの環境調査に一身を捧げた彼女のストーリーは、Fallout 76 における最も悲劇的で美しい物語の1つです。<br>
                愛するジェフに遺した最後のメッセージは、荒廃した世界でも決して失われなかった「人の心」を感じさせます。<br>
                <a href="scorch.html" class="auto-link">スコーチ</a>の脅威に対抗するための彼女の研究データは、形を変えて未来のアパラチアを救う希望となりました。
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
    
    writePost('amy-kelly', `エイミー・ケリーのロア記事をアップデートしました！🧪
孤独な環境科学者であり、アパラチアの未来のためにデータを集め続けた彼女の切ない物語。彼女が遺した最期の想いとは？
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/amy-kelly.html`);
    console.log('Amy Kelly fixed.');
};

// 2. Archie the Kid
const fixArchie = () => {
    const file = `f:/Fallout/archie-the-kid.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const main = document.querySelector('main.content');
    
    const newContent = `
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
                <button class="like-button" data-article-id="archie_the_kid" onclick="toggleLike(this)">
                    <span class="heart">♡</span> <span class="like-count">0</span>
                </button>
            </div>

            <h1>Archie the Kid (アーチー・ザ・キッド)</h1>

            <div class="quote-box">
                「あいつらは本当にろくでなしだったが…彼らがいなくなると少し寂しいな」
            </div>

            <h2>概要</h2>
            <p>
                <b>アーチー・ザ・キッド (Archie the Kid)</b> は、2024年のアップデートで追加されたマップ拡張地域「バーニング・スプリングス (Burning Springs)」のロケーション「ルート33 トラフィック・ジャム」にて発見できる人物（NPC）です。<br>
                すでに死亡した状態で発見されます。
            </p>
            <p>
                彼は<b>レモンボーイ・ギャング (Lemon Boy Gang)</b> と呼ばれるアウトロー集団の3人のメンバーの1人であり、仲間の <a href="robyn-the-brute.html" class="auto-link">ロビン・ザ・ブルート</a> や <a href="darwin-the-devil.html" class="auto-link">ダーウィン・ザ・デビル</a> と共に行動していました。
            </p>
            
            <h2>所持品・戦利品</h2>
            <p>
                彼の死体からは以下の重要なアイテム・<a href="note.html" class="auto-link">メモ</a>を入手することができます：
            </p>
            <ul class="loot-list">
                <li>メモ: 「<b>アーチーの目専用</b> (For Archie's eyes only)」</li>
                <li>メモ: 「<b>草の中の蛇</b> (Snake in the grass)」</li>
            </ul>
            <p>
                これらのメモから、ギャング内での裏切りや彼らが直面していたトラブルについて推測することができます。
            </p>

            <div class="quote-box">
                <b>感想</b><br><br>
                新地域バーニング・スプリングスで追加された新たなアンマークド・ロケーションでのみ見つかる、いわゆる「環境ストーリーテリング」用のキャラクターです。<br>
                彼らギャングの間に起きた出来事や裏切りのドラマは、散乱するメモからしか読み取ることができず、プレイヤーの想像力をかき立てられます。<br>
                名前が「○○・ザ・○○」で統一されていて、いかにも西部劇のアウトローのような響きがあるのが特徴的ですね！
            </div>

            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <div style="margin-bottom: 10px;">
                    TAGS: <span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#Fallout76</span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#Person</span>
                </div>
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Archie_the_Kid" target="_blank" rel="noopener">Archie the Kid</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
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
    
    writePost('archie_the_kid', `アーチー・ザ・キッドのロア記事を本格アップデート！🤠
バーニング・スプリングスで命を落としたアウトローギャングの一員。彼が遺したメモが語る裏切りのドラマとは？
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/archie-the-kid.html`);
    console.log('Archie the Kid fixed.');
};

// 3. Armor Ace
const fixArmorAce = () => {
    const file = `f:/Fallout/armor-ace.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // It is already ok, just make sure viewport exists
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    fs.writeFileSync(file, dom.serialize());
    
    writePost('armor_ace', `アーマー・エースのロア記事を点検完了！🇺🇸
「技術は力なり！」
戦前アメリカのプロパガンダを象徴するパワーアーマーヒーロー。彼が戦ったレッド・バイパーとの激闘とは？
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/armor-ace.html`);
    console.log('Armor Ace fixed.');
};

fixAmyKelly();
fixArchie();
fixArmorAce();
