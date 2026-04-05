const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/hornwright-air-purifier-04.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ホーンライト空気清浄機サイト 04（Hornwright air purifier site #04）</b>は、アパラチアの<a href="ash-heap.html" class="auto-link">積灰の山</a>地域にある<a href="locations.html" class="auto-link">ロケーション</a>です。</p>

            <h2>背景</h2>
<p><a href="beckley.html" class="auto-link">ベックリー</a>の町の真北に位置するこの場所は、<a href="hornwright-industrial.html" class="auto-link">ホーンライト・インダストリアル</a>社が自社製の空気清浄機を設置した4つのロケーションのうちの1つです。ここは、新しい環境浄化技術の取り組みを「一般大衆に向けて公開（アピール）するため」の展示場所として選ばれていました。</p>
<p>しかし現実には、これらの大型の空気清浄機は空気を浄化するためには使用されておらず、エアロゾル化された空中のミネラルを濾し取って再び固体の形（鉱石）に戻すための「空中採掘ツール」として機能するように、裏で密かに改造されていました。<br>（一説によると、この地域にはカニ肉の缶詰があると言い伝えられています。）</p>

            <h2>レイアウト</h2>
<p>このロケーションには丘の上に1つの建物の施設があり、その中にはロックされたレベル1の<a href="explosives-crate.html" class="auto-link">爆発物の箱</a>や、<a href="combat-shotgun.html" class="auto-link">コンバットショットガン</a>、各種のジャンク品が含まれています。ファイリングキャビネットを<a href="scavenger.html" class="auto-link">スカベンジャー</a>が漁っている場合があります。</p>
<p>この場所の北側には小さなキャンプ場があり、そこではジャネル（Janelle Priblo）とレイモンド・プリブロという人物が、ベックリーの伝説的な獣（The Beast of Beckley）を狩るための準備をしていました。</p>

            <h2>関連項目</h2>
<ul class="loot-list">
    <li><a href="hornwright-air-purifier-01.html" class="auto-link">ホーンライト空気清浄機サイト 01</a></li>
    <li><a href="hornwright-air-purifier-02.html" class="auto-link">ホーンライト空気清浄機サイト 02</a></li>
    <li><a href="hornwright-air-purifier-03.html" class="auto-link">ホーンライト空気清浄機サイト 03</a></li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                かつてホーンライト・インダストリアル社が、積灰の山の住民たちから激しく反対されていた自社製の自動採掘機のイメージアップのために、「我が社は環境にも配慮していますよ」という（偽装のPR）目的で建てられた空気清浄機サイトの1つです。<br>この04サイトは、主に一般の住民向けの「展示・視察用」の拠点として選ばれていたという設定があります。（中に入ると他のサイトと同じように、内部の濾過装置の設定を「空気清浄」から「鉱石回収」にこっそり切り替える隠しターミナルが置かれています）<br>公式ガイドブック『Fallout 76 Vault Dweller's Survival Guide』における当ロケーションの解説には「カニ肉の缶詰を食べたくなったらこのサイトを訪れよう」という謎の一文が記載されていました。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Hornwright Air Purifier Site 04</h3><img src="images/note_extracted/hornwright-air-purifier-04/img_main.png" alt="Hornwright Air Purifier Site 04"><div class="infobox-row"><span class="infobox-label">種類</span><span>浄化施設</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="ash-heap.html" class="auto-link">積灰の山</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Hornwright Air Purifier Site 04<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ホーンライト空気清浄機サイト 04</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : `<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_hornwright_ap04" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Hornwright Air Purifier Site 04<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">ホーンライト空気清浄機サイト 04</span></h1>`;

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Hornwright_air_purifier_site_04" target="_blank" rel="noopener">Hornwright air purifier site #04</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_hornwright_ap04';const _n='Hornwright Air Purifier Site 04';const _u='hornwright-air-purifier-04.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Hornwright Air Purifier Site 04</h3><img src="images/note_extracted/hornwright-air-purifier-04/img_main.png" alt="Hornwright Air Purifier Site 04"><div class="infobox-row"><span class="infobox-label">種類</span><span>浄化施設</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="ash-heap.html" class="auto-link">積灰の山</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Hornwright Air Purifier Site 04<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ホーンライト空気清浄機サイト 04</span></h1>");

fs.writeFileSync('f:/Fallout/hornwright-air-purifier-04.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ホーンライト空気清浄機サイト 04（Hornwright Air Purifier Site 04）
https://www.fallout-jp.com/hornwright-air-purifier-04.html

概要

ベックリーの北にある、ホーンライト・インダストリアル社が自社製の空気清浄機を設置した4つのロケーションのうちの1つ。ここは一般大衆に向けた展示・視察用として使われていた。

---

💭 感想

かつてホーンライト社が、積灰の山の住民たちから激しく反対されていた自社製の自動採掘機のイメージアップのために、「我が社は環境にも配慮していますよ」という（偽装のPR）目的で建てられた空気清浄機サイトの1つ。
中に入ると他のサイトと同じように、内部の濾過装置の設定を「空気清浄」から「空中採掘（回収）」にこっそり切り替える隠しターミナルが置かれています。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/hornwright-air-purifier-04', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/hornwright-air-purifier-04/post.md', postContent);

console.log('Done.');
