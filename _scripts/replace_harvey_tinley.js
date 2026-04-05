const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/harvey-tinley.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ハーベイ・ティンリー（Harvey Tinley）</b>は、アパラチアの<a href="clarksburg.html" class="auto-link">クラークスバーグ</a>に生息している<a href="feral-ghoul.html" class="auto-link">フェラル・グール</a>です。</p>

            <h2>背景</h2>
<p>ハーベイは、チェルシー・ウェズリーと友達だった少女<a href="mary-tinley.html" class="auto-link">メアリー・ティンリー</a>の父親でした。彼らの家族はお金に余裕がありませんでした。<br>ハーベイはその後、フェラル・グールと化し、今でもクラークスバーグにある一家のトレーラーハウスに留まり続けています。</p>

            <h2>メモ</h2>
<p>ハーベイは、「<a href="feral-ghoul.html" class="auto-link">フェラル・グール・ローマー</a>」と同じダメージ耐性およびステータスを持っています。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                クラークスバーグにあるティンリー一家の古いトレーラーハウスで遭遇する名有りのフェラル・グールです。<br>彼はメアリーの父親であり、クエスト「Unsolved: Picnic Panic」でウェズリー家の失踪事件を調査する中で、プレイヤーは間接的に彼らの悲惨な末路を知ることになります。彼自身が特別なアイテムをドロップするわけではありませんが、戦前の生活の痕跡と合わせて、アパラチアの残酷な現実を物語る存在となっています。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Harvey Tinley</h3><img src="images/note_extracted/harvey-tinley/img_main.png" alt="Harvey Tinley"><div class="infobox-row"><span class="infobox-label">種族</span><span><a href="feral-ghoul.html" class="auto-link">フェラル・グール</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>父親</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="clarksburg.html" class="auto-link">クラークスバーグ</a></span></div><div class="infobox-row"><span class="infobox-label">関連クエスト</span><span><a href="unsolved-picnic-panic.html" class="auto-link">Unsolved: Picnic Panic</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Harvey Tinley<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ハーベイ・ティンリー</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_harvey_tinley" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Harvey Tinley<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ハーベイ・ティンリー</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Harvey_Tinley" target="_blank" rel="noopener">Harvey Tinley</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_harvey_tinley';const _n='Harvey Tinley';const _u='harvey-tinley.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Harvey Tinley</h3><img src="images/note_extracted/harvey-tinley/img_main.png" alt="Harvey Tinley"><div class="infobox-row"><span class="infobox-label">種族</span><span><a href="feral-ghoul.html" class="auto-link">フェラル・グール</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>父親</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="clarksburg.html" class="auto-link">クラークスバーグ</a></span></div><div class="infobox-row"><span class="infobox-label">関連クエスト</span><span><a href="unsolved-picnic-panic.html" class="auto-link">Unsolved: Picnic Panic</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Harvey Tinley<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ハーベイ・ティンリー</span></h1>");

fs.writeFileSync('f:/Fallout/harvey-tinley.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ハーベイ・ティンリー（Harvey Tinley）
https://www.fallout-jp.com/harvey-tinley.html

概要

クラークスバーグに生息している名有りのフェラル・グール。チェルシーと友達だった少女メアリーの父親であり、今でも一家のトレーラーハウスに留まっています。

---

💭 感想

クエスト「Unsolved: Picnic Panic」でウェズリー家の失踪事件を調査する中で、間接的に彼らの悲劇的な末路を知ることになります。彼自身が特別なアイテムを落とすわけではありませんが、戦前のアパラチアの過酷な現実を物語る存在ですね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/harvey-tinley', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/harvey-tinley/post.md', postContent);

console.log('Done.');
