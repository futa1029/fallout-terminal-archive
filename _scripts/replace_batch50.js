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

// 1. windy-park
const fixWindy = () => {
    const file = `f:/Fallout/windy-park.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }
    
    // Fix infobox brackets
    const infoSpans = document.querySelectorAll('.infobox-row span');
    infoSpans.forEach(s => {
        if (s.innerHTML.includes('[[Cryptids')) {
            s.innerHTML = s.innerHTML.replace('[[Cryptids', 'クリプティッド');
        }
        if (s.innerHTML.includes('[[Milepost Zero (location)')) {
            s.innerHTML = s.innerHTML.replace('[[Milepost Zero (location)', '<a href="milepost-zero.html" class="auto-link">マイルポスト・ゼロ</a>');
        }
    });

    const quotes = document.querySelectorAll('.quote-box');
    quotes.forEach(q => {
        if (q.textContent.includes('Burning Springsに関わるキャラクター')) {
            q.outerHTML = `
            <div class="quote-box">
                <b>感想</b><br><br>
                マイルポスト・ゼロのアップデートで追加されたキャラクター。<br><br>
                詳細は謎に包まれていますが、バーニング・スプリングスに関連しており、クリプティッドと何らかの関わりを持つとされています。データ上に存在する興味深いNPCの一つであり、今後の拡張での掘り下げが期待されます。
            </div>\n`;
        }
    });

    const pElements = document.querySelectorAll('p');
    for (let p of pElements) {
        if (p.textContent.includes('This article was created by translating')) {
            p.outerHTML = '<p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Windy_Park" target="_blank" rel="noopener">Windy Park</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>';
        }
    }

    // Unminify Comments Section for Standard formatting
    const commentSec = document.querySelector('.comments-section');
    if (commentSec && commentSec.innerHTML.includes('COMMENTS_')) {
        commentSec.outerHTML = `
            <div class="comments-section" id="comments-section">
                <h3 class="comments-title">&gt; COMMENTS</h3>
                <div class="comment-form">
                    <textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力 (最大100文字)..." oninput="updateCharCount()"></textarea>
                    <input type="text" id="hp_field" name="website" style="display:none;position:absolute;left:-9999px" tabindex="-1" autocomplete="off" aria-hidden="true">
                    <div class="comment-form-footer">
                        <span class="char-count"><span id="char-count">0</span> / 100</span>
                        <button class="comment-submit-btn" onclick="submitComment()">SEND &#9654;</button>
                    </div>
                    <div id="comment-msg" class="comment-msg"></div>
                </div>
                <div id="comments-list" class="comments-list"><div class="comment-loading">LOADING...</div></div>
            </div>`;
    }

    fs.writeFileSync(file, dom.serialize());
    writePost('windy-park', `マイルポスト・ゼロで追加された謎のキャラクター「Windy Park」のロア記事を公開しました！👤
バーニング・スプリングスやクリプティッドと関連性を持つとされる人物です。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/windy-park.html`);
    console.log('Windy Park fixed.');
};

// 2. wv-lumber-co
const fixLumber = () => {
    const file = `f:/Fallout/wv-lumber-co.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }
    
    const quotes = document.querySelectorAll('.quote-box');
    quotes.forEach(q => {
        if (q.textContent.includes('荒れた境域の製材所。スーパーミュータントとの激戦')) {
            q.innerHTML = `<b>感想</b><br><br>森林地帯の北西の端に位置する巨大な製材所。<br><br>かつてはフリーラジカルズなどのレイダー集団の拠点として機能していましたが、Wastelandersのアップデート以降はロケーションの調整が入り、現在では大量のスーパーミュータントが占拠する危険地帯となっています。敷地がかなり広く入り組んでいるため、探索しがいのある場所です。`;
        }
    });

    const pElements = document.querySelectorAll('p');
    for (let p of pElements) {
        if (p.textContent.includes('This article was created by translating')) {
            p.outerHTML = '<p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/WV_Lumber_Co." target="_blank" rel="noopener">WV Lumber Co.</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>';
        }
    }

    fs.writeFileSync(file, dom.serialize());
    writePost('wv-lumber-co', `アパラチア北西の端にある大型ロケーション「WV製材会社」の記事を更新しました！🌲🪓
かつてはレイダーたちの拠点でしたが、現在は大量のスーパーミュータントの巣窟へと変貌している探索がいのある場所です。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/wv-lumber-co.html`);
    console.log('WV Lumber fixed.');
};

// 3. xander-brown
const fixXander = () => {
    const file = `f:/Fallout/xander-brown.html`;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    let head = document.querySelector('head');
    if (!head.querySelector('meta[name="viewport"]')) {
        head.insertAdjacentHTML('afterbegin', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }
    
    const quotes = document.querySelectorAll('.quote-box');
    quotes.forEach(q => {
        if (q.textContent.includes('アパラチアで命を落としたキャラクター。')) {
            q.outerHTML = `
            <div class="quote-box">
                <b>感想</b><br><br>
                マイルポスト・ゼロのアップデートで追加されたロケーション「バーニング・スプリングス」に関連する人物。<br><br>
                彼の残した記録からは、戦前のスーパードゥーパー・マートの裏事情や、戦後のレイダー同士の抗争、そして過酷なサバイバル生活の様子が如実に読み取れます。<br>最終的にラッドスコルピオンの襲撃によって最期を迎えたという、ウェイストランドらしい無常感のあるエピソードを持っています。
            </div>\n`;
        }
    });

    const pElements = document.querySelectorAll('p');
    for (let p of pElements) {
        if (p.textContent.includes('This article was created by translating')) {
            p.outerHTML = '<p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Xander_Brown" target="_blank" rel="noopener">Xander Brown</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>';
        }
    }

    // Unminify Comments Section for Standard formatting
    const commentSec = document.querySelector('.comments-section');
    if (commentSec && commentSec.innerHTML.includes('COMMENTS_')) {
        commentSec.outerHTML = `
            <div class="comments-section" id="comments-section">
                <h3 class="comments-title">&gt; COMMENTS</h3>
                <div class="comment-form">
                    <textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力 (最大100文字)..." oninput="updateCharCount()"></textarea>
                    <input type="text" id="hp_field" name="website" style="display:none;position:absolute;left:-9999px" tabindex="-1" autocomplete="off" aria-hidden="true">
                    <div class="comment-form-footer">
                        <span class="char-count"><span id="char-count">0</span> / 100</span>
                        <button class="comment-submit-btn" onclick="submitComment()">SEND &#9654;</button>
                    </div>
                    <div id="comment-msg" class="comment-msg"></div>
                </div>
                <div id="comments-list" class="comments-list"><div class="comment-loading">LOADING...</div></div>
            </div>`;
    }

    // Fix minified Supabase script: Replace <script> blocks with standard article-common or keep minimal logic by relying on article-common.js which is already included.
    // The easiest way is to let article-common.js handle it, but wait! The minified files had custom inline scripts instead of proper loadComments etc.
    // Actually, I can just replace the whole `<script>` block containing supabase init with the standard script. 
    // Wait, the current approach works as long as the HTML comment structure is standard. Let's just swap the script chunk to be safe.
    let scripts = document.querySelectorAll('script');
    for (let s of scripts) {
        if (s.textContent.includes('const supabaseUrl')) {
            s.textContent = `
        const supabaseUrl = 'https://qkdjufvdeisnunismgaw.supabase.co';
        const supabaseKey = 'sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';
        const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
        async function toggleLike(btn) { const articleId = btn.getAttribute('data-article-id'); let isLiked = localStorage.getItem(articleId + '_liked') === 'true'; btn.disabled = true; if (isLiked) { isLiked = false; const { data, error } = await supabaseClient.rpc('decrement_like', { article_id_param: articleId }); if (!error) { localStorage.setItem(articleId + '_liked', isLiked); updateLikeButton(btn, isLiked, data); } } else { isLiked = true; const { data, error } = await supabaseClient.rpc('increment_like', { article_id_param: articleId }); if (!error) { localStorage.setItem(articleId + '_liked', isLiked); updateLikeButton(btn, isLiked, data); } } btn.disabled = false; }
        function updateLikeButton(btn, isLiked, count) { const heart = btn.querySelector('.heart'); const countSpan = btn.querySelector('.like-count'); if (isLiked) { btn.classList.add('liked'); heart.textContent = '♥'; } else { btn.classList.remove('liked'); heart.textContent = '♡'; } countSpan.textContent = count; }
        document.addEventListener('DOMContentLoaded', async () => { const btn = document.querySelector('.like-button'); if (btn) { const articleId = btn.getAttribute('data-article-id'); const isLiked = localStorage.getItem(articleId + '_liked') === 'true'; const { data, error } = await supabaseClient.from('likes').select('like_count').eq('article_id', articleId).single(); let count = 0; if (!error && data) count = data.like_count; updateLikeButton(btn, isLiked, count); } const lightbox = document.getElementById('lightbox'); const lightboxImg = document.getElementById('lightbox-img'); document.querySelectorAll('.content img, .infobox img, .gallery-item img').forEach(img => { img.addEventListener('click', (e) => { e.stopPropagation(); lightboxImg.src = img.src; lightbox.classList.add('active'); }); }); });
        `;
        }
    }

    fs.writeFileSync(file, dom.serialize());
    writePost('xander-brown', `バーニング・スプリングス関連の人物「ザンダー・ブラウン（サビついたレイダー）」のロア記事を作成しました！💀
スーパー・ドゥーパー・マートの元従業員であり、戦後にラスト・キング・アーミーへ加わった彼の過酷な足跡を辿ります。
#Fallout76 #フォールアウト76
https://www.fallout-jp.com/xander-brown.html`);
    console.log('Xander fixed.');
};

fixWindy();
fixLumber();
fixXander();
