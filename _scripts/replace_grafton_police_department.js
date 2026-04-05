const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/grafton-police-department.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>グラフトン警察署（Grafton Police Department）</b>は、アパラチアの<a href="toxic-valley.html" class="auto-link">毒の谷</a>地域にある町<a href="grafton.html" class="auto-link">グラフトン</a>のマップにマークされていない<a href="locations.html" class="auto-link">ロケーション</a>です。</p>

            <h2>背景</h2>
<p><a href="great-war.html" class="auto-link">大戦</a>前の法執行機関であり、警察署の管轄区域は市境を越えており、北東に少し離れた場所にある<a href="wavy-willards-water-park.html" class="auto-link">ウェービー・ウィラーズ・ウォーターパーク</a>で発生した事件の調査にも対応し、従事していました。</p>
<p>警察は、不法侵入や誘拐（クロコールの着ぐるみに子供が飲み込まれた事件、など）といった深刻な犯罪の容疑について、ウォーターパークの警備部隊と協力していました。</p>

            <h2>レイアウト</h2>
<p>警察署は、West Boyd（ウェストボイド）とBeech Street（ビーチストリート）の交差点にあります。<br>建物の裏手にある留置所の独房に通じる壁の裂け目から、または2階のドアから内部へと入ることができます。</p>
<p>1階のフロントデスクがある部屋には車が衝突して突っ込んでいます。2階は保管庫およびスタッフルーム（休憩室）として使用されていました。<br>建物の屋上にアクセスすることができ、そこには2つの<a href="duffle-bag.html" class="auto-link">ダッフルバッグ</a>が置かれていますが、数体の<a href="super-mutant.html" class="auto-link">スーパーミュータント</a>がパトロールしています。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                グラフトンの市街地の中、グラフトン市長がいるビルの南ブロックにある警察署の跡地です。<br>グラフトン市長がプレイヤーに依頼するウェービー・ウィラーズ・ウォーターパークに関する行方不明の子供の事件などについても、戦前にこの警察署の警官たちとウォーターパークの警備隊との間で調査ややり取りが行われていたというロアがターミナルなどに残されています。<br>現在は完全にスーパーミュータントたちの拠点の一部となってしまっていますね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Grafton Police Department</h3><img src="images/note_extracted/grafton-police-department/img_main.png" alt="Grafton Police Department"><div class="infobox-row"><span class="infobox-label">種類</span><span>未登録POI（警察署）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="grafton.html" class="auto-link">グラフトン</a>（市街地）</span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="super-mutant.html" class="auto-link">スーパーミュータント</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Grafton Police Department<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">グラフトン警察署</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : `<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_grafton_police" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Grafton Police Department<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">グラフトン警察署</span></h1>`;

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Grafton_Police_Department" target="_blank" rel="noopener">Grafton Police Department</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_grafton_police';const _n='Grafton Police Department';const _u='grafton-police-department.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Grafton Police Department</h3><img src="images/note_extracted/grafton-police-department/img_main.png" alt="Grafton Police Department"><div class="infobox-row"><span class="infobox-label">種類</span><span>未登録POI（警察署）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="grafton.html" class="auto-link">グラフトン</a>（市街地）</span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="super-mutant.html" class="auto-link">スーパーミュータント</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Grafton Police Department<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">グラフトン警察署</span></h1>");

fs.writeFileSync('f:/Fallout/grafton-police-department.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

グラフトン警察署（Grafton Police Department）
https://www.fallout-jp.com/grafton-police-department.html

概要

グラフトン市街地にある警察署跡。現在はスーパーミュータントが占拠している。

---

💭 感想

グラフトン市長がプレイヤーに依頼するウェービー・ウィラーズ・ウォーターパークでの行方不明の子供の事件などについて、戦前にこの警察署の警官たちとウォーターパークの警備隊との間でやり取りが行われていたというロアがターミナルなどに残されています。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/grafton-police-department', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/grafton-police-department/post.md', postContent);

console.log('Done.');
