const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/widows-perch.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ウィドウズ・パーチ（Widow's Perch）</b>は、アパラチアの<a href="ash-heap.html" class="auto-link">積灰の山</a>にある<a href="locations.html" class="auto-link">ロケーション</a>です。<a href="timeline.html" class="auto-link">2103年</a>までには、この地域は<a href="blood-eagles.html" class="auto-link">ブラッドイーグル</a>の拠点となっていました。</p>

            <h2>背景</h2>
<p>山の斜面に建てられ、地上の人目を引くような巨大な「Lone Wanderer」の看板によって隠されているこの住居の住人たちは、時間を稼ぐことはできたものの、結局のところアパラチアの全ての人々に降りかかった運命から逃れることはできませんでした。</p>

            <h2>レイアウト</h2>
<p>ウィドウズ・パーチは、<a href="the-forest.html" class="auto-link">森林地帯</a>に近い積灰の山の境界線上に建てられた粗末な木造の小屋です。<br>屋根の北西側には小さな<a href="cooking-station.html" class="auto-link">クッキングステーション</a>があります。最上階にはランダムな残骸の山、<a href="armor-workbench.html" class="auto-link">アーマー作業台</a>、そして<a href="brewing-station.html" class="auto-link">醸造ステーション</a>が設置されています。下の階にはマットレスと木枠の箱が置かれています。</p>
<p>一番下の階には、看板に向かって架けられた吊り橋がありますが、中間地点に隙間が空いています。その隙間の下にある穴には、レベル3のロックがかかった<a href="safes.html" class="auto-link">金庫</a>があります。看板側の橋の端には、フットロッカーとクーラーボックスが置かれています。</p>

            <h2>主なアイテム</h2>
<ul class="loot-list">
    <li><b><a href="vault-tec-bobblehead.html" class="auto-link">ボブルヘッド</a></b>（スポーン候補）：看板の上の、小屋と看板を繋ぐ板の橋の南端に置かれることがあります。</li>
    <li><b><a href="magazines.html" class="auto-link">雑誌</a></b>（スポーン候補）：作業台の下の階にある、コンクリートブロックの近くの床の上に置かれることがあります。</li>
    <li><b><a href="plans.html" class="auto-link">設計図</a></b>（スポーン候補）：最上階にある、金属箱の左側の木製棚の上に置かれることがあります。</li>
    <li><b><a href="fusion-core-fallout-76.html" class="auto-link">フュージョン・コア</a></b>：最上階のバルコニーにある、金属箱の上の木製棚の上に置かれています。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                積灰の山と森林地帯の境界近くにある、巨大な看板の裏に隠されたアジトです。<br>遠目からはただの大きな看板にしか見えませんが、裏に回るとひっそりとブラッドイーグルの拠点になっています。足場を渡る構造が秘密基地のようで、隠れ家らしい雰囲気がとても良いロケーションですね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Widow&apos;s Perch</h3><img src="images/note_extracted/widows-perch/img_main.png" alt="Widow&apos;s perch"><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="ash-heap.html" class="auto-link">積灰の山</a></span></div><div class="infobox-row"><span class="infobox-label">勢力</span><span><a href="blood-eagles.html" class="auto-link">ブラッドイーグル</a></span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="mole-rat.html" class="auto-link">モールラット</a><br><a href="blood-eagles.html" class="auto-link">ブラッドイーグル</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Widow's Perch<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ウィドウズ・パーチ</span></h1>");

const startMarker = '<h2>概要</h2>';
const preamble = content.split(startMarker)[0];

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Widow's_Perch" target="_blank" rel="noopener">Widow's Perch</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_widows_perch';const _n='Widows Perch';const _u='widows-perch.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

fs.writeFileSync('f:/Fallout/widows-perch.html', preamble + newContent + footerContent);

// X post
const postContent = `#Fallout76 #Fallout

ウィドウズ・パーチ（Widow's Perch）
https://www.fallout-jp.com/widows-perch.html

概要

積灰の山の境界にあるブラッドイーグルの拠点。巨大な看板の裏側に隠れるように建てられた粗末な木造の小屋です。

---

💭 感想

遠目からはただの看板にしか見えませんが、裏に回るとひっそりとブラッドイーグルのアジトになっています。看板を支える足場を渡る構造など、隠れ家らしい雰囲気がとても良いロケーションですね！

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/widows-perch', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/widows-perch/post.md', postContent);

console.log('Done.');
