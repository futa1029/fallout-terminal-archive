const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/willard-corporate-housing.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ウィラード企業住宅（Willard Corporate Housing）</b>は、アパラチアの<a href="toxic-valley.html" class="auto-link">毒の谷</a>地域にある<a href="locations.html" class="auto-link">ロケーション</a>です。</p>

            <h2>背景</h2>
<p><a href="wavy-willards-water-park.html" class="auto-link">ウェイビー・ウィラーズ・ウォーターパーク</a>の南東にある、腐食性の有毒物質にまみれた谷の環境の只中に位置しています。<br>ここの数軒の小さなトレーラーハウス群は、かつて（戦前は）ウォーターパークのスタッフたちの居住空間（社宅）として使用されていましたが、核戦争後から現在は長らく放棄され、ごくわずかなサルベージ資源（ジャンク品）集めができる程度の場所となっています。</p>

            <h2>レイアウト</h2>
<p>ロケーションの東側にある住宅の1つの内部には、<a href="tinkers-workbench.html" class="auto-link">細工師の作業台</a>が置かれています。<br>廃墟の広場の中央のロータリーには、<a href="cooking-station.html" class="auto-link">クッキングステーション</a>があります。また、そのクッキングステーションの位置から見て右側（北方向）の家の裏には、<a href="weapons-workbench.html" class="auto-link">武器作業台</a>が野外に設置されています。</p>

            <h2>主なアイテム（戦利品）</h2>
<ul class="loot-list">
    <li><b><a href="darius-anglers-manifesto-part-3.html" class="auto-link">ダリアス・アングラーの宣言 パート3</a></b>（ホロテープ）：クッキングステーションの左手にある家の内部、壊れたターミナルの近くの机の上にあります。</li>
    <li><b><a href="darius-anglers-manifesto-part-4.html" class="auto-link">ダリアス・アングラーの宣言 パート4</a></b>（ホロテープ）：同じくクッキングステーションの左手にある家の内部、壊れたターミナルの前の机の上にあります。</li>
    <li><b><a href="darius-anglers-manifesto-part-5.html" class="auto-link">ダリアス・アングラーの宣言 パート5</a></b>（メモ）：崖の端に最も近い家の内部にある、トイレの蓋の上に置かれています。</li>
    <li>ランダムな<a href="vault-tec-bobblehead.html" class="auto-link">ボブルヘッド</a>：中央の中庭の環状交差点とクッキングステーションのすぐ北側にあるトレーラーハウス内にある、壊れたターミナルの横の金属製の机の上に配置される可能性があります。</li>
    <li>ランダムな<a href="magazines.html" class="auto-link">雑誌（マガジン）</a>：トレーラーパークの中央、パークのロゴがある環状交差点内にある、半分灰に埋もれた緑色のゴルフカートの上に配置される可能性があります。</li>
    <li>ランダムな<a href="recipes.html" class="auto-link">レシピ</a>：ロケーション内北東の家の内部、キッチンカウンターの上に配置される可能性があります。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                ウェイビー・ウィラーズで働かされていた従業員たちが共同生活を強いられていた社宅（トレーラーハウスの区画）跡です。<br>過酷な「有給休暇・福利厚生なしの低賃金重労働」という戦前のブラック労働環境に不満を持った従業員たち（ダリアスやキッドウェル等）が、社長のクロフトンへの反逆から暴動を起こすべく、パークを機能不全に陥らせるための工作兵器の準備を行っていたことが各トレーラーのホロテープ記録から痛々しく伺えます。結局核兵器の投下により復讐は果たされることなく、ここはただのフェラルの巣窟と化してしまいました。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Willard Corporate Housing</h3><img src="images/note_extracted/willard-corporate-housing/img_main.png" alt="Willard Corporate Housing"><div class="infobox-row"><span class="infobox-label">種類</span><span>住宅地（トレーラーハウス）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="toxic-valley.html" class="auto-link">毒の谷</a></span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="feral-ghouls.html" class="auto-link">フェラル・グール</a>等</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Willard Corporate Housing<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ウィラード企業住宅</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : `<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_willard_housing" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Willard Corporate Housing<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">ウィラード企業住宅</span></h1>`;

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Willard_Corporate_Housing" target="_blank" rel="noopener">Willard Corporate Housing</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_willard_housing';const _n='Willard Corporate Housing';const _u='willard-corporate-housing.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Willard Corporate Housing</h3><img src="images/note_extracted/willard-corporate-housing/img_main.png" alt="Willard Corporate Housing"><div class="infobox-row"><span class="infobox-label">種類</span><span>住宅地（トレーラーハウス）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="toxic-valley.html" class="auto-link">毒の谷</a></span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="feral-ghouls.html" class="auto-link">フェラル・グール</a>等</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Willard Corporate Housing<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ウィラード企業住宅</span></h1>");

fs.writeFileSync('f:/Fallout/willard-corporate-housing.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ウィラード企業住宅（Willard Corporate Housing）
https://www.fallout-jp.com/willard-corporate-housing.html

概要

毒の谷にあるウェイビー・ウィラーズ・ウォーターパークの南東にある従業員用の居住空間（社宅）跡。

---

💭 感想

「有給休暇・福利厚生一切なしの極低賃金労働」という戦前のブラック労働環境に不満を持った過激派の従業員たちが社長への反逆から暴動を起こし、パークを機能不全に陥らせるための準備を行っていたことが残された記録から伺えます。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/willard-corporate-housing', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/willard-corporate-housing/post.md', postContent);

console.log('Done.');
