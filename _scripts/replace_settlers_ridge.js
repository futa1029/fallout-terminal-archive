const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/settlers-ridge.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>セトラーズリッジ（Settler's Ridge）</b>は、アパラチアの<a href="the-forest.html" class="auto-link">森林地帯</a>にある<a href="locations.html" class="auto-link">ロケーション</a>です。<a href="foundation.html" class="auto-link">ファウンデーション</a>の<a href="settlers.html" class="auto-link">入植者</a>たちの前哨基地であり、この居住地は入植者<a href="ashley-ortega.html" class="auto-link">アシュリー・オルテガ</a>によって率いられています。</p>
<p><a href="vault-76.html" class="auto-link">Vault 76</a>と北西の<a href="anchor-farm.html" class="auto-link">アンカー農場</a>の中間付近に位置しています。</p>

            <h2>背景</h2>
<p>セトラーズリッジは、ファウンデーションの入植者によって設立されたいくつかの小規模な居住地やコミュニティの一つです。<br>入植者たちにとっての「新しい家」として、また「住む価値のある場所」として建設されました。</p>
<p>また、ここはかつて有名だった元ボストンの野球選手である<a href="nathan-broadhurst.html" class="auto-link">ネイサン・ブロードハースト</a>が、<a href="charleston.html" class="auto-link">チャールストン</a>で婚約者を探すのに失敗した後、引退して住み着いた場所でもあります。ブロードハーストは、後世にインスピレーションを与えるために、彼の<a href="baseball-bat.html" class="auto-link">野球バット</a>と自伝をこの居住地に残しました。</p>

            <h2>住人</h2>
<ul class="loot-list">
    <li><a href="ashley-ortega.html" class="auto-link">アシュリー・オルテガ</a></li>
    <li>前哨基地の入植者たち</li>
    <li>マーティ（猫）</li>
</ul>

            <h2>主なアイテム</h2>
<ul class="loot-list">
    <li><b><a href="comrades-in-arms.html" class="auto-link">戦友たち（Comrades in arms）</a></b>：クラフト作業台の近くの木枠箱の上にあるメモ。</li>
    <li><b><a href="nathan-broadhursts-autobiogrophy.html" class="auto-link">ネイサン・ブロードハーストの自伝</a></b>：建物の壁の額縁の中に入れられているメモ。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                ファウンデーションから外へ広がる入植者たちの新たな居住地の一つです。初期エリアであるVault 76のすぐ近くに、アップデート（Boardwalk Paradise）によって後から追加されました。<br>拠点にいる名有りの猫「マーティ」や、元ボストンの野球選手ネイサンの残した自伝とバットなど、フレーバーに満ちたロアが詰め込まれており、探索のしがいがあるアパラチアの新たな息吹を感じさせる温かいロケーションです。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Settler&apos;s Ridge</h3><img src="images/note_extracted/settlers-ridge/img_main.png" alt="Settler&apos;s Ridge"><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="the-forest.html" class="auto-link">森林地帯</a></span></div><div class="infobox-row"><span class="infobox-label">勢力</span><span><a href="settlers.html" class="auto-link">入植者</a></span></div><div class="infobox-row"><span class="infobox-label">リーダー</span><span><a href="ashley-ortega.html" class="auto-link">アシュリー・オルテガ</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Settler's Ridge<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">セトラーズリッジ</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_settlers_ridge" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Settler\'s Ridge<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">セトラーズリッジ</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Settler's_Ridge" target="_blank" rel="noopener">Settler's Ridge</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_settlers_ridge';const _n='Settler&apos;s Ridge';const _u='settlers-ridge.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Settler&apos;s Ridge</h3><img src="images/note_extracted/settlers-ridge/img_main.png" alt="Settler&apos;s Ridge"><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="the-forest.html" class="auto-link">森林地帯</a></span></div><div class="infobox-row"><span class="infobox-label">勢力</span><span><a href="settlers.html" class="auto-link">入植者</a></span></div><div class="infobox-row"><span class="infobox-label">リーダー</span><span><a href="ashley-ortega.html" class="auto-link">アシュリー・オルテガ</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Settler's Ridge<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">セトラーズリッジ</span></h1>");

fs.writeFileSync('f:/Fallout/settlers-ridge.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

セトラーズリッジ（Settler's Ridge）
https://www.fallout-jp.com/settlers-ridge.html

概要

アパラチアの森林地帯に建設された入植者の前哨基地。アシュリー・オルテガによって率いられています。

---

💭 感想

初期エリアであるVault 76のすぐ近くに、アップデートによって後から追加された温かい居住地です。元ボストンの野球選手ネイサンの残した自伝とバットなど、フレーバーに満ちたロアが詰め込まれており探索のしがいがあります！

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/settlers-ridge', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/settlers-ridge/post.md', postContent);

console.log('Done.');
