const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/pompy.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>スカウトリーダー・ポンピー（Scout Leader Pompy）</b>は、アパラチアの<a href="kiddie-corner-cabins.html" class="auto-link">キディコーナー・キャビン</a>で稼働している<a href="mister-handy.html" class="auto-link">Mr.ハンディ</a>です。（※Wild Appalachiaアップデートで追加）</p>

            <h2>背景</h2>
<p>ポンピーは、アパラチアで今なお稼働し続けている<a href="pioneer-scouts.html" class="auto-link">パイオニア・スカウト</a>のリーダーの一人（一機）です。<br>彼は新しい見習いスカウトたちに対して、<a href="toxic-mutagenic-waste.html" class="auto-link">有毒な変異原性廃棄物（Toxic mutagenic waste）</a>を回収し、これを安全に洗浄・処分する方法を指導する責任を負っています。</p>

            <h2>関連クエスト</h2>
<ul class="loot-list">
    <li><b><a href="operation-tidy.html" class="auto-link">Operation Tidy</a></b>：メインクエスト「<a href="the-order-of-the-tadpole.html" class="auto-link">The Order of the Tadpole</a>」の最中に、<a href="toxic-valley.html" class="auto-link">毒の谷</a>のキディコーナー・キャビンでポンピーに出会うとこのクエストが開始されます。<br>毒の谷の周囲に散らばった有毒な変異原性廃棄物の浄化を手伝う内容となっており、パイオニア・スカウトのオタマジャクシ（Tadpole）からポッサム（Possum）へ昇格するための要件の一つでもあります。<br>一度クリアした後も、デイリークエストとして毎日受注できます。</li>
</ul>

            <h2>メモ</h2>
<p><a href="middle-mountain-cabins.html" class="auto-link">ミドルマウンテン・キャビン</a>のターミナル・エントリー内では、初期は「スカウトリーダー・ポンピー」はMr.ハンディではなく<a href="protectron.html" class="auto-link">プロテクトロン</a>であると言及されていました。これは後のアップデートで修正されました。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                Wild Appalachiaアップデートでパイオニア・スカウト要素が追加された際に登場したMr.ハンディです。<br>各種バックパックの解放や改造設計図を入手できるポッサムバッジ集めのために、日課として彼のデイリークエスト「Operation Tidy」をこなしているプレイヤーも多いですね。「まだオタマジャクシか？大丈夫だ。私がこれまで見た中で一番の年長オタマジャクシだとしても、判断はしないさ」など、相変わらずプレイヤーの年齢と見習い階級のアンバランスさをイジってくる愉快なロボットです。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Pompy</h3><img src="images/note_extracted/pompy/img_main.png" alt="Pompy"><div class="infobox-row"><span class="infobox-label">種族</span><span><a href="mister-handy.html" class="auto-link">Mr.ハンディ</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="pioneer-scouts.html" class="auto-link">パイオニア・スカウト</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>スカウトリーダー</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="kiddie-corner-cabins.html" class="auto-link">キディコーナー・キャビン</a></span></div><div class="infobox-row"><span class="infobox-label">関連クエスト</span><span><a href="operation-tidy.html" class="auto-link">Operation Tidy</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Scout Leader Pompy<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">スカウトリーダー・ポンピー</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_pompy" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Scout Leader Pompy<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">スカウトリーダー・ポンピー</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Scout_Leader_Pompy" target="_blank" rel="noopener">Scout Leader Pompy</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_pompy';const _n='Scout Leader Pompy';const _u='pompy.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Pompy</h3><img src="images/note_extracted/pompy/img_main.png" alt="Pompy"><div class="infobox-row"><span class="infobox-label">種族</span><span><a href="mister-handy.html" class="auto-link">Mr.ハンディ</a></span></div><div class="infobox-row"><span class="infobox-label">所属</span><span><a href="pioneer-scouts.html" class="auto-link">パイオニア・スカウト</a></span></div><div class="infobox-row"><span class="infobox-label">役職</span><span>スカウトリーダー</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span><a href="kiddie-corner-cabins.html" class="auto-link">キディコーナー・キャビン</a></span></div><div class="infobox-row"><span class="infobox-label">関連クエスト</span><span><a href="operation-tidy.html" class="auto-link">Operation Tidy</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Scout Leader Pompy<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">スカウトリーダー・ポンピー</span></h1>");

fs.writeFileSync('f:/Fallout/pompy.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

スカウトリーダー・ポンピー（Scout Leader Pompy）
https://www.fallout-jp.com/pompy.html

概要

キディコーナー・キャビンで稼働しているMr.ハンディ。現在もパイオニア・スカウトのリーダーとしての使命を守っており、見習いスカウトたちに有害な変異原性廃棄物の浄化を指導しています。

---

💭 感想

ポッサムバッジ集めのために、日課として彼のデイリークエスト「Operation Tidy」をこなしているプレイヤーも多いですね。「まだオタマジャクシか？私がこれまで見た中で一番の年長オタマジャクシだとしても、判断はしないさ」など、相変わらずプレイヤーの年齢と見習い階級のアンバランスさをイジってくる愉快なロボットです。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/pompy', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/pompy/post.md', postContent);

console.log('Done.');
