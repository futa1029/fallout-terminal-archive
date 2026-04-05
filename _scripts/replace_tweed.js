const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/tweed.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ツイード（Tweed）</b>は、アパラチアの<a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a>内において、<a href="vendors.html" class="auto-link">ベンダー（商人）</a>として機能している<a href="protectron.html" class="auto-link">プロテクトロン</a>です。</p>

            <h2>背景</h2>
<p>ツイードは、<a href="great-war.html" class="auto-link">最終戦争</a>の少し前に、ホワイトスプリング・リゾートが人間のスタッフと交代させた約1ダースのロボットベンダーの1つです。<br>彼はホワイトスプリング・モールのエリア内にある「ビスポーク（Bespoke）」という店舗に常駐しています。<br>彼はこの店舗で、主に戦前のフォーマルウェア（衣装服）を販売しています。</p>

            <h2>所持品</h2>
<ul class="loot-list">
    <li>販売アイテム：<a href="apparel.html" class="auto-link">服（アパレル）</a>、<a href="plans.html" class="auto-link">設計図</a></li>
    <li>キャップ上限：1400</li>
</ul>

            <h2>豆知識（Behind the scenes）</h2>
<ul class="loot-list">
    <li>「ツイード（Tweed）」とは、元々スコットランドで生産された、織り目の詰まった粗い布地の一種の名称です。<br>また、彼が担当している店の名前である「ビスポーク（Bespoke）」は、ツイード生地を使用することもある「<a href="https://ja.wikipedia.org/wiki/%E3%83%93%E3%82%B9%E3%83%9D%E3%83%BC%E3%82%AF" target="_blank" rel="noopener" class="auto-link" style="border-bottom: 1px dashed var(--accent-color) !important;">ビスポーク・テーラリング（オーダーメイドの仕立屋）</a>」を指しています。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                ホワイトスプリング避難所のモールエリアで稼働している、服飾ベンダーの可愛いプロテクトロンです。<br>派閥を問わない中立のモールベンダーは何かと便利ですが、ツイードからは山高帽のアパレルや、汚れていない綺麗な状態の戦前の服（ゴルフスカート、サスペンダーとスラックス、パトロールマンのサングラスなど）の品揃えも買えるため、ロールプレイや見た目のオシャレに凝りたいプレイヤーが定期的に訪れる定番ショップですね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Tweed</h3><img src="images/note_extracted/tweed/img_main.png" alt="Tweed"><div class="infobox-row"><span class="infobox-label">種族</span><span><a href="protectron.html" class="auto-link">プロテクトロン</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>商人（ベンダー）</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Tweed<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ツイード</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_tweed" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Tweed<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ツイード</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Tweed" target="_blank" rel="noopener">Tweed</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
                <p style="margin-top:15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color:var(--accent-color);">寄付を受け付けております</a>。</p>
            </div>
            
            <div class="comments-section">
                <h2 class="comments-title">&gt; COMMENTS_</h2>
                <div class="comment-form">
                    <textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力..." oninput="updateCharCount()"></textarea>
                    <div class="comment-form-footer">
                        <span class="char-count"><span id="char-count">0</span>/100</span>
                        <button class="comment-submit-btn" onclick="submitComment()">SUBMIT &gt;</button>
                    </div>
                    <div id="comment-msg" class="comment-msg"></div>
                </div>
                <div id="comments-list"></div>
            </div>
        </main>
    </div>
    <div class="lightbox-overlay" id="lightbox" onclick="this.classList.remove('active')"><img id="lightbox-img" src="" alt=""></div>
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_tweed';const _n='Tweed';const _u='tweed.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Tweed</h3><img src="images/note_extracted/tweed/img_main.png" alt="Tweed"><div class="infobox-row"><span class="infobox-label">種族</span><span><a href="protectron.html" class="auto-link">プロテクトロン</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>商人（ベンダー）</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリング・リゾート</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Tweed<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ツイード</span></h1>");

fs.writeFileSync('f:/Fallout/tweed.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ツイード（Tweed）
https://www.fallout-jp.com/tweed.html

概要

ホワイトスプリング・モールで稼働している、服飾ベンダーのプロテクトロン。

---

💭 感想

「ビスポーク」という屋号の通り、仕立屋として様々なフォーマルウェアなどのアパレルを販売してくれます（設計図もありますね）。綺麗な戦前の服やゴルフウェア類もあるので、見た目に凝ったりロールプレイをするプレイヤーが足繁く通う定番ショップです。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/tweed', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/tweed/post.md', postContent);

console.log('Done.');
