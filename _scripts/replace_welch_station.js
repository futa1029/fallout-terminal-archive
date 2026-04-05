const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/welch-station.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ウェルチ駅（Welch Station）</b>は、アパラチアの<a href="ash-heap.html" class="auto-link">積灰の山</a>にある<a href="locations.html" class="auto-link">ロケーション</a>です。他の駅とは異なり、町を見下ろす小さなキャビンという独特な形態をとっています。<br>元鉱夫である<a href="dylan-rhodes.html" class="auto-link">ディラン・ローズ</a>がここに住んでいます。</p>

            <h2>背景</h2>
<p>ウェルチの市境界内、レッドライン線路沿いに敷設されたこの施設は、線路脇のプラットフォームと駅舎で構成されています。<a href="great-war.html" class="auto-link">最終戦争</a>前は、有人のチケット販売カウンターや自動発券機など、地域の補助的なサービスが提供されていました。<br>戦争後、時期は不明ですがここは<a href="responders.html" class="auto-link">レスポンダー</a>によって押収され、<a href="vendor-bot-responder.html" class="auto-link">レスポンダー・ベンダーボット</a>を介した作戦と貿易のハブへと改装されました。</p>

            <h2>レイアウト</h2>
<p>この駅は町の北東の角、<a href="mount-blair.html" class="auto-link">ブレア山</a>から南下する階段の端、州道83号線を挟んだ向かい側に位置しています。高台の尾根に位置しているため、駅からはウェルチの町の全体像や敵の接近などの潜在的な脅威をよく見渡せます。<br>鉄道のレッドライン上において、東の<a href="lewisburg.html" class="auto-link">ルイスバーグ</a>駅と北のチャールストン駅の中間に位置しています。</p>
<p>ウェルチ駅のレイアウトは他の地域の駅とは異なり、小さな木造の建物の中に設置されている独特な構造をしています。<br>建物の外側には<a href="armor-workbench.html" class="auto-link">アーマー作業台</a>、<a href="ammunition-vending-machine.html" class="auto-link">弾薬販売機</a>、<a href="cooking-station.html" class="auto-link">クッキングステーション</a>があります。レスポンダー・ベンダーボットは、小さなキャビン内部のカウンターの裏から取引を提供しています。</p>
<p>建物の内部には<a href="medical-supplies-vending-machine.html" class="auto-link">医療品自動販売機</a>、パンチカードマシンがあり、西側の入り口の隣にはマップが貼られ、その向かいにはアクセス用<a href="terminals.html" class="auto-link">ターミナル</a>とスタッシュボックス（収納箱）が置かれています。<br>プラットフォームの町側、出入り口付近には<a href="legendary-exchange-machine.html" class="auto-link">レジェンダリー交換機</a>があります。</p>
<p>ディラン・ローズはプラットフォーム上を行ったり来たり徘徊しながら、<a href="vault-dwellers.html" class="auto-link">Vault居住者</a>に向かってコメントを発しています。<br>また、稀にドラマに登場する<a href="the-ghoul.html" class="auto-link">クーパー・ハワード（The Ghoul）</a>がこの駅を訪れていることがあります。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                他の駅とは違い、なぜか民家のような小さな木造キャビンにすべての駅設備が雑多に詰め込まれているという珍しい構造の駅ロケーションです。<br>高台にあるため積灰の山の景色と眼下のウェルチの町を見渡すことができます。NPCのディランおじいちゃんが常駐しており、最近のアップデートでドラマ版の主人公であるクーパー・ハワード（グール）もたまにこの駅を訪れるようになったことで、以前よりも少し賑やかな拠点になっています。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Welch Station</h3><img src="images/note_extracted/welch-station/img_main.png" alt="Welch Station"><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="ash-heap.html" class="auto-link">積灰の山</a></span></div><div class="infobox-row"><span class="infobox-label">勢力</span><span><a href="responders.html" class="auto-link">レスポンダー</a></span></div><div class="infobox-row"><span class="infobox-label">商人</span><span><a href="vendor-bot-responder.html" class="auto-link">レスポンダー・ベンダーボット</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Welch Station<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ウェルチ駅</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_welch_station" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Welch Station<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ウェルチ駅</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Welch_Station" target="_blank" rel="noopener">Welch Station</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_welch_station';const _n='Welch Station';const _u='welch-station.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Welch Station</h3><img src="images/note_extracted/welch-station/img_main.png" alt="Welch Station"><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="ash-heap.html" class="auto-link">積灰の山</a></span></div><div class="infobox-row"><span class="infobox-label">勢力</span><span><a href="responders.html" class="auto-link">レスポンダー</a></span></div><div class="infobox-row"><span class="infobox-label">商人</span><span><a href="vendor-bot-responder.html" class="auto-link">レスポンダー・ベンダーボット</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Welch Station<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ウェルチ駅</span></h1>");


fs.writeFileSync('f:/Fallout/welch-station.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ウェルチ駅（Welch Station）
https://www.fallout-jp.com/welch-station.html

概要

積灰の山の町ウェルチを見下ろす高台にある駅。他の駅とは異なり、民家のような小さな木造キャビンにすべての駅設備が詰め込まれている珍しい構造をしています。

---

💭 感想

ディランおじいちゃんが常駐しており、最近のアップデートでドラマ版の主人公であるクーパー・ハワード（The Ghoul）もたまにこの駅を訪れるようになったことで、以前よりも少し賑やかな拠点になっています。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/welch-station', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/welch-station/post.md', postContent);

console.log('Done.');
