const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/monongah-overlook.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>モノンガー展望台（Monongah overlook）</b>は、アパラチアの<a href="savage-divide.html" class="auto-link">荒れた境域</a>にある双眼鏡アイコンの<a href="locations.html" class="auto-link">ロケーション</a>です。<br>これは<a href="grafton.html" class="auto-link">グラフトン</a>周辺の谷（トキシックバレー）を見渡せるように作られた、戦前の古い観光用展望台です。</p>

            <h2>レイアウト</h2>
<p>この展望台からは眼下の毒の谷（トキシックバレー）の素晴らしい景色を眺めることができ、野生の<a href="blackberry.html" class="auto-link">ブラックベリー</a>や野生の<a href="carrot-flower.html" class="auto-link">ニンジンの花</a>など、収穫が可能な植物がいくつか自生しています。</p>
<p>左側の簡易トイレ（ポータブルトイレ）の中には謎のボタンがあり、これは核ミサイル発射施設である<a href="site-bravo.html" class="auto-link">ミサイルサイロ・ブラボー</a>の非常口の扉を開くスイッチとなっています（サイロ内部から脱出するとここに出ます）。<br>近くにある大破したトラックには、木枠の箱やツールボックスなどのコンテナが含まれています。</p>
<p>展望台の東側、95号線沿いには古いレイダーの検問所の跡があり、数体の<a href="super-mutant.html" class="auto-link">スーパーミュータント</a>が徘徊（生息）している可能性があります。</p>
<p>また、この場所は、ローズからのメインクエストである<a href="flavors-of-mayhem.html" class="auto-link">Flavors of Mayhem</a>の一部で、「<a href="yao-guai.html" class="auto-link">ヤオ・グアイ</a>を倒す」ためのマップ上の指定場所となっていますが、必ずしも絶対にここで完了しなければならないわけではありません。ここでクエスト目標を完了する場合、通常の強力な個体ではなく、比較的弱い「発育不全のヤオ・グアイ（stunted yao guai）」が専用のターゲットとしてスポーン（出現）します。</p>

            <h2>主なアイテム（戦利品）</h2>
<ul class="loot-list">
    <li><b><a href="bird-watching-list.html" class="auto-link">野鳥観察のリスト</a></b>（メモ）：展望台の木製プラットフォーム（デッキ）上にある、ピクニックテーブルの上に置かれています。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                荒れた境域エリアにある双眼鏡アイコンの展望台です。<br>展望台の端にはポータブルトイレが2つ横並びで設置されており、その片方の中のボタンを押すと地面からトイレごと持ち上がってエレベーターが露出するという、ミサイルサイロを出た後の脱出ハッチに直結している隠しギミックがあります。<br>新規プレイヤーは、Roseのメインクエスト「Flavors of Mayhem」で、特殊なローズのシリンジャーを持たされて気性の荒いヤオ・グアイと相対させられる指定ポイントとして訪れることとなるため、印象に残っている方も多い場所ですね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Monongah Overlook</h3><img src="images/note_extracted/monongah-overlook/img_main.png" alt="Monongah Overlook"><div class="infobox-row"><span class="infobox-label">種類</span><span>展望台</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="savage-divide.html" class="auto-link">荒れた境域</a></span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="super-mutant.html" class="auto-link">スーパーミュータント</a>等</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Monongah Overlook<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">モノンガー展望台</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : `<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_monongah_overlook" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Monongah Overlook<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">モノンガー展望台</span></h1>`;

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Monongah_overlook" target="_blank" rel="noopener">Monongah overlook</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_monongah_overlook';const _n='Monongah Overlook';const _u='monongah-overlook.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Monongah Overlook</h3><img src="images/note_extracted/monongah-overlook/img_main.png" alt="Monongah Overlook"><div class="infobox-row"><span class="infobox-label">種類</span><span>展望台</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="savage-divide.html" class="auto-link">荒れた境域</a></span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="super-mutant.html" class="auto-link">スーパーミュータント</a>等</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Monongah Overlook<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">モノンガー展望台</span></h1>");

fs.writeFileSync('f:/Fallout/monongah-overlook.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

モノンガー展望台（Monongah Overlook）
https://www.fallout-jp.com/monongah-overlook.html

概要

荒れた境域にある、眼下のトキシックバレーを見渡せる戦前の観光展望台跡。

---

💭 感想

展望台の端にはポータブルトイレが2つ横並びで設置されており、その片方の中のボタンを押すと地面からトイレごと持ち上がってエレベーターが露出するという、ミサイルサイロ・ブラボーからの脱出ハッチに直結している隠しギミックがあります。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/monongah-overlook', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/monongah-overlook/post.md', postContent);

console.log('Done.');
