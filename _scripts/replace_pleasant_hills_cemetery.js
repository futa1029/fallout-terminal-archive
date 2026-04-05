const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/pleasant-hills-cemetery.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>プレザント・ヒルズ墓地（Pleasant Hills Cemetery）</b>は、アパラチアの<a href="ash-heap.html" class="auto-link">積灰の山</a>地域にある<a href="lewisburg.html" class="auto-link">ルイスバーグ</a>の町に隣接した<a href="locations.html" class="auto-link">ロケーション</a>（広大な墓地）です。</p>

            <h2>背景</h2>
<p>かつてルイスバーグに住む人々のために築かれた、何段にも分かれた手厚い段々畑のような地形の大規模な墓地ですが、最終戦争後の現在では金目のものや戦利品を探すスカベンジャーたちやレイダーによって徹底的に荒らされ、冒涜されています。</p>

            <h2>レイアウト</h2>
<p>ルイスバーグの町の北東部にある野外ステージの裏手から、1本の上り道が丘の上の墓地へと続いています。<br>墓地は緩やかな段々畑状になった3つの区画に分かれています。墓の多くには、<a href="mining-helmet.html" class="auto-link">採掘帽</a>などの個人的な生前のアイテムが供え置かれていたり、<a href="carrot-flower.html" class="auto-link">ニンジンの花</a>が飾られていたりします。</p>

<p>また、ここには複数の<a href="safe.html" class="auto-link">金庫</a>も埋められて（あるいは放置されて）おり、そのうちの2つの金庫はピッキングスキル（Picklock）のレベル3で開錠することができます。<br>いくつかの墓はすでに暴かれており、棺桶が掘り起こされていたりと、過去に度重なる墓荒らしが行われていた歴史（形跡）を示しています。<br>一番下（麓）の区画には小さな霊廟があり、中には別の棺桶や（弾薬などの入った）<a href="explosives-crate.html" class="auto-link">爆発物の木箱</a>が置かれています。</p>

            <h2>主なアイテム（戦利品）</h2>
<ul class="loot-list">
    <li>ランダムな<a href="magazines.html" class="auto-link">雑誌（マガジン）</a>：一番下の区画の霊廟の内部、石棺の上に置かれている金庫の上に出現する可能性があります。</li>
    <li>ランダムな<a href="armor-mods.html" class="auto-link">アーマーモジュール</a>：墓地への入り口付近、暴かれた墓の横に置かれている棺桶の上に出現する可能性があります。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                ルイスバーグの北東部の丘にある静かで大規模な墓地です。<br>高難易度のピッキングスキルが要求される金庫がいくつも転がっており、あちこちの土が掘り起こされてスカベンジャーたちによって墓荒らしされてしまった痛ましい形跡が残されています。<br>その一方で、採掘帽が供えられているお墓などがいまだに残されているものもあり、生前の故人を偲ぶように飾られている光景を見ると何とも言えない気分にさせられますね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Pleasant Hills Cemetery</h3><img src="images/note_extracted/pleasant-hills-cemetery/img_main.png" alt="Pleasant Hills Cemetery"><div class="infobox-row"><span class="infobox-label">種類</span><span>墓所</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span>積灰の山<br><a href="lewisburg.html" class="auto-link">ルイスバーグ</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Pleasant Hills Cemetery<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">プレザント・ヒルズ墓地</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_pleasant_hills_cemetery" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Pleasant Hills Cemetery<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">プレザント・ヒルズ墓地</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Pleasant_Hills_Cemetery" target="_blank" rel="noopener">Pleasant Hills Cemetery</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_pleasant_hills_cemetery';const _n='Pleasant Hills Cemetery';const _u='pleasant-hills-cemetery.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Pleasant Hills Cemetery</h3><img src="images/note_extracted/pleasant-hills-cemetery/img_main.png" alt="Pleasant Hills Cemetery"><div class="infobox-row"><span class="infobox-label">種類</span><span>墓所</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span>積灰の山<br><a href="lewisburg.html" class="auto-link">ルイスバーグ</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Pleasant Hills Cemetery<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">プレザント・ヒルズ墓地</span></h1>");

fs.writeFileSync('f:/Fallout/pleasant-hills-cemetery.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

プレザント・ヒルズ墓地（Pleasant Hills Cemetery）
https://www.fallout-jp.com/pleasant-hills-cemetery.html

概要

ルイスバーグの北東部の丘にある静かで大規模な墓地。現在では徹底的に掘り返され、墓荒らしの形跡が残っています。

---

💭 感想

高難易度のピッキングスキルが要求される金庫がいくつも転がっており、あちこちの土が掘り起こされています。その一方で、採掘帽が供えられているお墓などがいまだに残っている部分もあり、生前の故人を偲ぶように飾られている光景を見ると何とも言えない気分にさせられます。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/pleasant-hills-cemetery', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/pleasant-hills-cemetery/post.md', postContent);

console.log('Done.');
