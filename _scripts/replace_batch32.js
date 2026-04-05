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

// 1. Bruno the Strongbot
const fixBruno = () => {
    const file = `f:/Fallout/bruno-the-strongbot.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const main = document.querySelector('main.content');
    
    const newContent = `
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
                <button class="like-button" data-article-id="note_bruno_the_strongbot" onclick="toggleLike(this)">
                    <span class="heart">♡</span> <span class="like-count">0</span>
                </button>
            </div>

            <h1>Bruno the Strongbot (ブルーノ・ザ・ストロングボット)</h1>

            <div class="quote-box">
                「今日の君はいい顔をしているな、ブルーノ…。キレてるぞ…、仕上がってるぞ…、最高だ…」<br>
                （You are looking frrresh today, Brrruno... Rrripped... Shrrreded... A masterrrpiece.）
            </div>

            <h2>概要</h2>
            <p>
                <b>Bruno the Strongbot (ブルーノ・ザ・ストロングボット)</b> は、「ヌカ・ワールド・オン・ツアー (Nuka-World on Tour)」のエリアに配置されているユニークなプロテクトロンです。
            </p>
            <p>
                名前の通り「ストロングマン（怪力男）」の役割を与えられており、独特の巻き舌（「rrripped」など）を多用した台詞を話します。プレイヤーと直接取引する機能や関連クエストはありませんが、ヌカ・ワールド・オン・ツアーの賑やかな雰囲気を盛り上げるイマーシブなキャラクターとして機能しています。
            </p>

            <h2>舞台裏（声優）について</h2>
            <p>
                ブルーノの英語版の声を担当している <b>Wes Johnson</b> 氏は、意図的に大げさな巻き舌で演技をしています（音声エフェクトではありません）。あまりにも巻き舌が強すぎたため、実際の収録後に少しマイルドに調整されたというエピソードが公式配信で語られています。
            </p>

            <div class="quote-box">
                <b>感想</b><br><br>
                ヌカ・ワールド・オン・ツアーの出し物として設置されているマッスルなプロテクトロンです。<br>
                「強き男」らしさをアピールするために実装された異様に巻き舌な英語ボイス（Rrripped... Shrrreded...）が特徴的で、思わず立ち止まって聞いてしまう面白さがあります。<br>
                自撮りスポットとしても優秀で、世紀末の遊園地に欠かせない愉快なロボットですね！
            </div>

            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <div style="margin-bottom: 10px;">
                    TAGS: <span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#Fallout76</span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#Robot</span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#NukaWorldOnTour</span>
                </div>
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Bruno_the_Strongbot" target="_blank" rel="noopener">Bruno the Strongbot</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
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
    
    writePost('bruno-the-strongbot', `ヌカ・ワールド・オン・ツアーの怪力ロボット「ブルーノ」のロア記事をリメイクしました！💪🤖
超巻き舌の英語ボイスが印象的な看板プロテクトロン。実は声優のWes Johnson氏がガチで巻き舌をやりすぎて調整が入ったという裏話も！
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/bruno-the-strongbot.html`);
    console.log('Bruno fixed.');
};

// 2. Collector Murmrgh
const fixCollector = () => {
    const file = `f:/Fallout/collector-murmrgh.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const main = document.querySelector('main.content');
    
    const newContent = `
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
                <button class="like-button" data-article-id="note_collector_murmrgh" onclick="toggleLike(this)">
                    <span class="heart">♡</span> <span class="like-count">0</span>
                </button>
            </div>

            <h1>Collector Murmrgh (コレクター・マームル / 没データ)</h1>

            <div class="quote-box">
                「彼女に会ったら、私（調達人の方）がよろしく言っていたと伝えておいてくれ」<br>
                （※調達人マームルではないことを強調する別の存在）
            </div>

            <h2>概要</h2>
            <p>
                <b>Collector Murmrgh (コレクター・マームル)</b> は、「マイルポスト・ゼロ (Milepost Zero)」アップデートの開発段階（PTS）で登場する予定だったモールマイナーのベンダーです。<br>
                結果的に実装が見送られ、<b>カットコンテンツ（没データ）</b> となりました。
            </p>
            <p>
                当初は、ブルーリッジ・キャラバン・カンパニーのマイルポスト・ゼロ支部で物資（Supplies）を支払って雇うことができるデコレーター（装飾や機能を提供しつつ拠点に滞在するNPC）として計画されていました。
            </p>

            <h2>ミステリー・クレート</h2>
            <p>
                もし実装されていれば、彼女は通貨を使って通常の取引をするのではなく、物資を使って<b>「ミステリー・クレート (Mystery Crate)」</b>という名のランダムアイテム入りガチャ箱を販売する予定でした。<br>
                森林地帯、毒の峡谷、クランベリー湿原など、各地域ごとの名前を冠したクレートがあり、その地域にちなんだ改造済み武器や未知の設計図などがランダムで手に入る仕組みでした。
            </p>

            <div class="quote-box">
                <b>感想</b><br><br>
                あの有名な「調達人マームル（Purveyor Murmrgh）」とは同名の別個体、あるいはマームルという名前がモールマイナーにおける一種の役職や共通名であることを示唆するようなキャラクターです。<br>
                最終的にカットコンテンツ（没データ）となってしまいましたが、本実装されていれば「ミステリークレート」を展開する新しい遊びとして人気が出たかもしれません。<br>
                いつか別の形で彼女のシステムが復活するのか気になるところです！
            </div>

            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <div style="margin-bottom: 10px;">
                    TAGS: <span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#Fallout76</span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#CutContent</span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#MoleMiner</span>
                </div>
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Collector_Murmrgh" target="_blank" rel="noopener">Collector Murmrgh</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
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
    
    writePost('collector-murmrgh', `【没データ】幻のモールマイナー「コレクター・マームル」のロア記事を作成しました！⛏️
マイルポスト・ゼロの実装時に追加予定だった、地域のアイテムガチャ箱「ミステリー・クレート」を提供する（予定だった）ベンダーです。あの調達人と同名な理由など謎が多い存在ですね。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/collector-murmrgh.html`);
    console.log('Collector Murmrgh fixed.');
};

// 3. Collectron
const fixCollectron = () => {
    const file = `f:/Fallout/collectron.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const main = document.querySelector('main.content');
    
    const newContent = `
            <div class="action-header">
                <a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a>
                <button class="like-button" data-article-id="note_collectron" onclick="toggleLike(this)">
                    <span class="heart">♡</span> <span class="like-count">0</span>
                </button>
            </div>

            <h1>Collectron (コレクトロン)</h1>

            <div class="quote-box">
                「私が集めたジャンクを誰かが使う日が来ると信じています。それが人間であれ、別の知的生命体であれ…」
            </div>

            <h2>概要</h2>
            <p>
                <b>Collectron (コレクトロン)</b> は、Fallout 76においてプレイヤーのC.A.M.P.（キャンプ）やワークショップに配置できるアイテム収集用のプロテクトロンの総称です。
            </p>
            <p>
                専用のステーション（Collectron Station）を設置すると、接続されたロボットが付近のエリアを徘徊し、ジャンクや食料、特定のテーマに沿ったアイテムを探し出して内部のコンテナに蓄積してくれます。<br>
                同時にアクティブにできるのは、1つのC.A.M.P.につき1機のみです。
            </p>

            <h2>バリエーション</h2>
            <p>
                コレクトロンにはアトミックショップで購入したり、シーズンの報酬として獲得できる多数のバリエーションが存在します。<br>
                見た目やセリフだけでなく、集めてくるアイテムの傾向が変わるのが特徴です。
            </p>
            <ul>
                <li><b>共産党員コレクトロン (Comrade Collectron):</b> プロレタリアート（民衆・労働階級）の必要とする物資や武器などを集めてくる共産主義版</li>
                <li><b>サンタトロン (Santatron):</b> クリスマスイベント時などにプレゼントやホリデーギフトを集めてくれる</li>
                <li><b>B.O.S.コレクトロン:</b> 軍用スクラップを集めてくれる権威的なボイスのロボット</li>
                <li><b>F.E.T.C.H. コレクトロン:</b> ロボット犬の姿をしてポストアポカリプスを楽しませてくれる犬型タイプ</li>
                <li><b>ヌカトロン / クアンタム・ヌカトロン:</b> 貴重なヌカ・コーラを巡回して集めてくれる</li>
            </ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                個人のC.A.M.P.に設置して自動でアイテムを収集してくれる、アパラチアの居住者にはすっかりお馴染みのロボット端末です。<br>
                「サンタトロン」や「共産党員コレクトロン」のような個性豊かなバリエーションが存在し、集めるアイテムの傾向だけでなくそれぞれが放つおかしな迷言・暴言も非常に良い味を出しています。<br>
                帰還したあとに放たれる「誰かがこれを使うと信じて拾ってきました」といった健気なセリフに愛着が湧くプレイヤーも多いはずです！
            </div>

            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <div style="margin-bottom: 10px;">
                    TAGS: <span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#Fallout76</span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#Robot</span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">#CAMP</span>
                </div>
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Collectron" target="_blank" rel="noopener">Collectron</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
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
    
    writePost('collectron', `C.A.M.P.設備の定番「コレクトロン」のロア記事をリメイクしました！🤖
勝手にジャンクや資源を集めてきてくれる優れものですが、サンタトロンや共産党員などバリエーション豊かな外見と、シュールな迷言を放つシステムが魅力的な彼らについてまとめました。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/collectron.html`);
    console.log('Collectron fixed.');
};

fixBruno();
fixCollector();
fixCollectron();
