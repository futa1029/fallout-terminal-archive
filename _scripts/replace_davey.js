const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/davey-wastelanders.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>Davey（デイヴィー）</b>は、<a href="free-radicals.html" class="auto-link">フリー・ラジカルズ</a>のメンバーであり、アパラチアのトレジャーハンター（人間のNPC）です。<br>Wastelandersアップデートで追加されました。</p>

            <h2>背景</h2>
<p>デイヴィーは別のフリー・ラジカルズのメンバーとともに「アパラチアの宝」を探しており、それを宣伝する放送（クレーンの看板のラジオ放送）の電波を辿ることで、宝の場所を見つけるのが最適だと考えていました。</p>

            <h2>プレイヤーとのインタラクション</h2>
<p>メインクエスト「<a href="hunter-for-hire.html" class="auto-link">Hunter for Hire</a>」において、プレイヤーの<a href="luck.html" class="auto-link">Luck</a>が2以上ある場合、プレイヤーは目の前のフリー・ラジカルズの名前が「Davey（デイヴィー）」であることを言い当てて、仲間のギャングにもう1人がアンタを殺そうとしていると説得して騙すことができます。成功すると、彼ら2人のフリー・ラジカルズはお互いに撃ち合って争い始めます。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                Vault 76を出た後、ウェイワードに向かうまでのクエストの過程で遭遇するフリー・ラジカルズ2人組のうちのNPCの一人です。（会話内の表示で名前がDaveyだと判明します）<br>LuckのSTATチェック（選択肢）で彼らを同士討ちさせることが可能であり、WastelandersアップデートでのNPC実装による「プレイヤーの選択肢やステータスで事態が変化する」というFallout本来の醍醐味を最初に味わせてくれるキャラクターとなっています。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Davey</h3><img src="images/note_extracted/davey-wastelanders/img_main.png" alt="Davey"><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="free-radicals.html" class="auto-link">フリー・ラジカルズ</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>トレジャーハンター</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span>Vault 76の近く</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76<br>(Wastelanders)</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Davey<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">デイヴィー</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : `<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_davey_wastelanders" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Davey<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">デイヴィー</span></h1>`;

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Davey_(Wastelanders)" target="_blank" rel="noopener">Davey (Wastelanders)</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_davey_wastelanders';const _n='Davey';const _u='davey-wastelanders.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Davey</h3><img src="images/note_extracted/davey-wastelanders/img_main.png" alt="Davey"><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="free-radicals.html" class="auto-link">フリー・ラジカルズ</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>トレジャーハンター</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span>Vault 76の近く</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76<br>(Wastelanders)</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Davey<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">デイヴィー</span></h1>");

fs.writeFileSync('f:/Fallout/davey-wastelanders.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

Davey（デイヴィー）
https://www.fallout-jp.com/davey-wastelanders.html

概要

フリー・ラジカルズのメンバーであるNPC。Vault 76を出た後に出会う。

---

💭 感想

Vault 76を出た後、ウェイワードに向かうまでのクエストの過程で遭遇するフリー・ラジカルズ2人組のうちのNPCの一人です。
Luckステータスの選択肢で彼らを同士討ちさせることが可能であり、Wastelandersアップデートの「プレイヤーの選択で見事に事態が変化する」という醍醐味を最初に味わせてくれるキャラクターとなっています。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/davey-wastelanders', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/davey-wastelanders/post.md', postContent);

console.log('Done.');
