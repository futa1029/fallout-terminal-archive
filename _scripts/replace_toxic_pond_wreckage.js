const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/toxic-pond-wreckage.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>有毒池と残骸（Toxic pond and wreckage）</b>は、アパラチアの<a href="toxic-valley.html" class="auto-link">毒の谷</a>（トキシックバレー）地域にあるマップにマークされていない<a href="locations.html" class="auto-link">ロケーション</a>（POI）です。<br><a href="graninger-farm.html" class="auto-link">グラニンジャー農場</a>の南東、<a href="philippi-battlefield-cemetery.html" class="auto-link">フィリピ戦場墓地</a>の南西に位置しています。</p>

            <h2>レイアウト</h2>
<p>このロケーションの名称にある「残骸（wreckage）」とは、<a href="toxic-water.html" class="auto-link">有毒な水</a>が溜まった池の中に崩落して沈んでいる、沈没した家の跡のことを指しています。</p>
<p>このエリアは非常に高度に放射能汚染されており、沈んだ家のすぐ外側の陸地にはテントが張られています。<br>沈んだ残骸の、かつて家の床であった水没した場所に開いた状態の金庫があります。その金庫の中には<a href="alien-blaster.html" class="auto-link">エイリアンブラスター</a>と、「<a href="rusted-key.html" class="auto-link">錆びた鍵</a>（rusted key）」が入っています。</p>
<p>ここで手に入る鍵は、<a href="freddy-fears-house-of-scares.html" class="auto-link">フレディ・フィアーの恐怖の家</a>の屋上にある小さな小屋のロックを解除するために使用されます。これは最終的に、<a href="black-mountain-ordnance-works.html" class="auto-link">ブラックマウンテン兵器実験場</a>のTNTドーム2号棟のロックを解除するための鍵探しの始まり（起点）の場所となっています。</p>

            <h2>主なアイテム（戦利品）</h2>
<ul class="loot-list">
    <li><a href="alien-blaster.html" class="auto-link">エイリアンブラスター</a>：池に沈んでいる開いた金庫の中に固定で配置されています。（取得後に一定のリスポーン期間あり）</li>
    <li><a href="rusted-key.html" class="auto-link">錆びた鍵</a>（Rusted key）：同じく開いた金庫の中に配置されています。TNTドーム2号探索クエスト専用の鍵です。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                トキシックバレーの地域名に違わぬ有毒な池に沈みかかっている、名もない家の残骸（未登録POI）です。<br>この場所は強力なユニークエネルギー武器である「エイリアンブラスター」が確定で固定配置されている場所として有名であるほか、水中に沈んでいるためRad-Xを飲んだりPA（パワーアーマー）を着込んだりして放射能対策をしてから拾いに行く必要があります。<br>ちなみに海外の公式ガイドブック『Fallout 76 Vault Dweller's Survival Guide』によれば、ここにあるエイリアンのおもちゃがエイリアンブラスターと何か関係している（異世界的な雰囲気を演出している）との興味深い記述が残されています。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Toxic Pond and Wreckage</h3><img src="images/note_extracted/toxic-pond-wreckage/img_main.png" alt="Toxic Pond and Wreckage"><div class="infobox-row"><span class="infobox-label">種類</span><span>未登録POI</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="toxic-valley.html" class="auto-link">毒の谷</a></span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="radstag.html" class="auto-link">ラッドスタッグ</a>等</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Toxic Pond and Wreckage<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">有毒池と残骸</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : `<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_toxic_pond" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Toxic Pond and Wreckage<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">有毒池と残骸</span></h1>`;

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Toxic_pond_and_wreckage" target="_blank" rel="noopener">Toxic pond and wreckage</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_toxic_pond';const _n='Toxic Pond and Wreckage';const _u='toxic-pond-wreckage.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Toxic Pond and Wreckage</h3><img src="images/note_extracted/toxic-pond-wreckage/img_main.png" alt="Toxic Pond and Wreckage"><div class="infobox-row"><span class="infobox-label">種類</span><span>未登録POI</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="toxic-valley.html" class="auto-link">毒の谷</a></span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="radstag.html" class="auto-link">ラッドスタッグ</a>等</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Toxic Pond and Wreckage<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">有毒池と残骸</span></h1>");

fs.writeFileSync('f:/Fallout/toxic-pond-wreckage.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

有毒池と残骸（Toxic pond and wreckage）
https://www.fallout-jp.com/toxic-pond-wreckage.html

概要

グラニンジャー農場の南東に位置する、有毒の池に沈みきった家の残骸（名無しのロケーション）。

---

💭 感想

この場所は強力な初期エネルギー武器である「エイリアンブラスター」が確定固定で沈んでいる場所として有名であるほか、公式のSurvival Guideによれば、ここにあるエイリアンのおもちゃが何か関係しているとの興味深い記述が残されています。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/toxic-pond-wreckage', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/toxic-pond-wreckage/post.md', postContent);

console.log('Done.');
