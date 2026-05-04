const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/needles.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ニードルズ（Needles）</b>は、アパラチアの<a href="blood-eagles.html" class="auto-link">ブラッドイーグル</a>のメンバーの一人です。（※<a href="steel-reign.html" class="auto-link">Steel Reign</a>アップデートで追加）</p>

            <h2>背景</h2>
<p><a href="tally-lang.html" class="auto-link">タリー・ラング</a>の指揮下にあるメンバーです。<br>タリー、<a href="dillo.html" class="auto-link">ディロ</a>、<a href="eightball.html" class="auto-link">エイトボール</a>と共に、貴重な戦利品（ルートアイテム）を求めて<a href="hellcat-company.html" class="auto-link">ヘルキャット傭兵団</a>を追跡し、<a href="vault-96.html" class="auto-link">Vault 96</a>の中に侵入しました。<br>しかし、<a href="edgar-blackburn.html" class="auto-link">エドガー・ブラックバーン</a>博士がVaultのドアを閉鎖したため、彼らは中に閉じ込められてしまいました。</p>

            <h2>関連クエスト</h2>
<ul class="loot-list">
    <li><b><a href="a-satisfied-conscience.html" class="auto-link">A Satisfied Conscience</a></b>：Vault 96の内部で遭遇します。</li>
</ul>

            <h2>所持品</h2>
<ul class="loot-list">
    <li><b><a href="raider-leathers.html" class="auto-link">レイダー・レザー</a></b></li>
    <li><b><a href="assault-rifle.html" class="auto-link">オートマチック・アサルトライフル</a></b></li>
    <li><b>5.56ラウンド</b> (5)</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                B.O.S.クエストライン「Steel Reign」でVault 96に閉じ込められているブラッドイーグルの一味です。<br>彼には「ここから出たら、どこか暖かいところへ行くんだ」というボイスラインがあり、氷に覆われたVault 96内部のすさまじい寒さに参っている様子が窺えます。死亡フラグのようなセリフですが、結果的に彼らはVault内で主人公に始末されることになります。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Needles</h3><img src="images/note_extracted/needles/img_main.png" alt="Needles"><div class="infobox-row"><span class="infobox-label">種族</span><span><a href="humans.html" class="auto-link">人間</a></span></div><div class="infobox-row"><span class="infobox-label">勢力</span><span><a href="blood-eagles.html" class="auto-link">ブラッドイーグル</a></span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="vault-96.html" class="auto-link">Vault 96</a></span></div><div class="infobox-row"><span class="infobox-label">関連クエスト</span><span><a href="a-satisfied-conscience.html" class="auto-link">A Satisfied Conscience</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Needles<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ニードルズ</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_needles" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Needles<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ニードルズ</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Needles" target="_blank" rel="noopener">Needles</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_needles';const _n='Needles';const _u='needles.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Needles</h3><img src="images/note_extracted/needles/img_main.png" alt="Needles"><div class="infobox-row"><span class="infobox-label">種族</span><span><a href="humans.html" class="auto-link">人間</a></span></div><div class="infobox-row"><span class="infobox-label">勢力</span><span><a href="blood-eagles.html" class="auto-link">ブラッドイーグル</a></span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="vault-96.html" class="auto-link">Vault 96</a></span></div><div class="infobox-row"><span class="infobox-label">関連クエスト</span><span><a href="a-satisfied-conscience.html" class="auto-link">A Satisfied Conscience</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Needles<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ニードルズ</span></h1>");

fs.writeFileSync('f:/Fallout/needles.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ニードルズ（Needles）
https://www.fallout-jp.com/needles.html

概要

ブラッドイーグルのメンバーの一人。タリー・ラングと共に追跡していたところ、Vault 96に閉じ込められてしまいました。

---

💭 感想

B.O.S.のクエスト「Steel Reign」でVault 96内部で遭遇します。「ここから出たら、どこか暖かいところへ行くんだ」というボイスラインがあり、氷に覆われたVault 96内部のすさまじい寒さに参っている様子が窺えます。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/needles', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/needles/post.md', postContent);

console.log('Done.');
