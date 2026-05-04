const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/old-storehouse.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>古い保管庫（Old storehouse）</b>は、アパラチアの<a href="ash-heap.html" class="auto-link">積雪地帯（積灰の山）</a>にある<a href="locations.html" class="auto-link">マークされないロケーション</a>です。<br><a href="abandoned-mine-shaft-2.html" class="auto-link">放棄された鉱山シャフト2</a>の北東、かつ<a href="nuka-world-on-tour.html" class="auto-link">ヌカ・ワールド・オン・ツアー</a>の南西に位置しています。</p>

            <h2>背景</h2>
<p>某年の9月、元<a href="blood-eagles.html" class="auto-link">ブラッドイーグル</a>のメンバーである<a href="jack-woodhouse.html" class="auto-link">ジャック・ウッドハウス</a>がここで隠れ家として寝泊まりしていました。<br>当面の生活費を稼ぐための<a href="ultracite.html" class="auto-link">ウルトラサイト</a>採掘の準備をしていた最中、ジャックはこの放棄された保管庫内で数人のレイダー（<a href="crater-raiders.html" class="auto-link">クレーター・レイダー</a>）からなる一団と鉢合わせしました。<br>ブラッドイーグルの追手に追跡されている身だったジャックは、リスクを負いたくなかったため彼らをその場で全員殺害しました。彼らが自分を追っている追手ではなかったとジャック本人が気づいたのは、標的が全員死んだ後のことでした。<br>ジャックは死体を埋めようと思いましたが、近くに<a href="mole-miner.html" class="auto-link">モールマイナー</a>が徘徊していたため埋めることができませんでした。その後、9月10日から11日にかけて、彼はこっそりと抜け出し、<a href="abandoned-mine-shaft-2.html" class="auto-link">放棄された鉱山シャフト2</a>へと向かいました。</p>

            <h2>レイアウト</h2>
<p>周囲の積灰の山の景色を見渡せる、開けた倉庫跡地で構成されています。<br>丘に囲まれたこの敷地内には、ジャックが殺害したと思われるレイダーの死体がいくつか転がっています。<br>倉庫内部は大部分が崩落して廃墟と化しており、瓦礫で埋まっています。数台のモーターサイクル（Lone Wanderer）が周囲に散乱しています。<br>倉庫の2階部分にアクセスでき、そこには漁れるコンテナがいくつかあります。</p>

            <h2>主なアイテム</h2>
<ul class="loot-list">
    <li><b><a href="jacks-journal.html" class="auto-link">ジャックの日誌（Jack's journal）</a></b>：メモアイテム。2階の箱の中、<a href="gas-mask.html" class="auto-link">ガスマスク</a>と<a href="addictol.html" class="auto-link">アディクトール</a>の下に隠れるように置かれています。</li>
</ul>

            <h2>メモ</h2>
<ul class="loot-list">
    <li>このロケーション自体はゲームのリリース当初から存在していましたが、「ジャックの日誌」等の一連のオブジェクトは後の『Nuka-World on Tour』アップデートで追加されました。</li>
    <li>公式の『Vault Dweller's Survival Guide』のアパラチア地図にはこの場所は記載されていません。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                積灰の山にあるマップにマークされない名もなきロケーションです。<br>「ジャック・ウッドハウスの因果な逃避行」を描いた一連のサブストーリーを補完する場所として、後のアップデートでしれっと彼の日誌が追加されました。ただの廃墟に過ぎなかった場所にも後付けで細かなロアが追加され、アパラチアの物語が拡張されていくのは面白いですね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Old storehouse</h3><img src="images/note_extracted/old-storehouse/img_main.png" alt="Old storehouse"><div class="infobox-row"><span class="infobox-label">種類</span><span>マークされないロケーション</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="ash-heap.html" class="auto-link">積灰の山</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Old storehouse<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">古い保管庫</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_old_storehouse" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Old storehouse<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">古い保管庫</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Old_storehouse" target="_blank" rel="noopener">Old storehouse</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_old_storehouse';const _n='Old storehouse';const _u='old-storehouse.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Old storehouse</h3><img src="images/note_extracted/old-storehouse/img_main.png" alt="Old storehouse"><div class="infobox-row"><span class="infobox-label">種類</span><span>マークされないロケーション</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="ash-heap.html" class="auto-link">積灰の山</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Old storehouse<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">古い保管庫</span></h1>");

fs.writeFileSync('f:/Fallout/old-storehouse.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

古い保管庫（Old storehouse）
https://www.fallout-jp.com/old-storehouse.html

概要

積雪地帯（積灰の山）にあるマークされないロケーション。追手から逃げる元ブラッドイーグルのジャック・ウッドハウスが寝泊まりしていた場所です。

---

💭 感想

「ジャック・ウッドハウスの逃避行」を描いた一連のサブストーリーを補完する場所として、アップデートで静かに彼の日誌などが追加されました。リリース当時からあるただの廃墟に後付けでロアが追加され、アパラチアの物語が拡張されていくのは面白いですね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/old-storehouse', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/old-storehouse/post.md', postContent);

console.log('Done.');
