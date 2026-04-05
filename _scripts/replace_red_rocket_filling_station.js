const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/red-rocket-filling-station.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>レッドロケット給油所（Red Rocket filling station）</b>は、アパラチア南西部にあたる<a href="ash-heap.html" class="auto-link">積灰の山</a>地域にある<a href="locations.html" class="auto-link">ロケーション</a>です。</p>

            <h2>背景</h2>
<p>州道から少し外れた場所にあるこの小さな<a href="red-rocket.html" class="auto-link">レッドロケット</a>のガソリンスタンド（給油所）は、戦前のアッシュヒープ一帯での一連の労働闘争である「<a href="automation-riots.html" class="auto-link">自動化暴動</a>」が起きた時期に、活動家たちの拠点・待機エリア（あるいはバリケード）として機能し利用されていました。</p>
<p>当時の人間たちはすでに去りましたが、現在でも戦前の建物の姿を残したまま、積灰の山の深層（地下の石炭火災等）から上がってくる灰の土埃の底へとゆっくりと沈んでいき、消えようとしています。</p>

            <h2>レイアウト</h2>
<p>元のレッドロケットの給油所の建物の入り口や窓は、現在すべて木の板で厳重に塞がれており、内部へ入ることはできません。</p>

<p>建物の周囲には<a href="u-mine-it-vending-machine.html" class="auto-link">U・マイント！の自動販売機</a>がある小屋があり、中にはランダムな戦利品と青い<a href="stash-box.html" class="auto-link">収納箱</a>（スタッシュ）があります。<br>板張りのステーションの建物の真裏側には、野外に<a href="power-armor-station.html" class="auto-link">パワーアーマーステーション</a>（PA台）が設置されています。</p>

            <h2>主なアイテム（戦利品）</h2>
<ul class="loot-list">
    <li><b><a href="power-armor.html" class="auto-link">パワーアーマーシャーシ</a></b>（ランダムな装甲部品付き）：建物の北側、板張りのレンガ造りの給油所とオレンジ色の燃料タンクの後ろにあるパワーアーマーステーションでそのままスポーン（出現）します。</li>
    <li>ランダムな<a href="vault-tec-bobblehead.html" class="auto-link">ボブルヘッド</a>：給油所の建物の屋上、南東の端（角）に配置される可能性があります。</li>
    <li>ランダムな<a href="magazines.html" class="auto-link">雑誌（マガジン）</a>：プレイヤー用の収納箱の近くにある、金網のメンテナンスガレージの地面より少し高くなったコンクリート部分の、2つの緑色のキャビネット間の狭い隙間に配置される可能性があります。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                積灰の山エリアにあるレッドロケットの店舗跡です。<br>アパラチアの他地域にあるレッドロケットの建物とは異なり、建物内部に入る操作はできず、ドア等の入り口はすべて分厚い木の板でこれでもかと塞がれてしまっています。<br>かつて戦前の炭鉱での労働争議の際に、ロボットによる急激なオートメーション化に反対する市民（解雇された作業員や組合員など）たちがここにバリケードを組んで立て籠もって使っていたような痕跡がありますね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Red Rocket filling station</h3><img src="images/note_extracted/red-rocket-filling-station/img_main.png" alt="Red Rocket filling station"><div class="infobox-row"><span class="infobox-label">種類</span><span>ガソリンスタンド</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="ash-heap.html" class="auto-link">積灰の山</a></span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="mole-miners.html" class="auto-link">モールマイナー</a>等</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Red Rocket filling station<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">レッドロケット・給油所</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : `<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_red_rocket_filling_station" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Red Rocket filling station<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">レッドロケット・給油所</span></h1>`;

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Red_Rocket_filling_station" target="_blank" rel="noopener">Red Rocket filling station</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_red_rocket_filling_station';const _n='Red Rocket filling station';const _u='red-rocket-filling-station.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Red Rocket filling station</h3><img src="images/note_extracted/red-rocket-filling-station/img_main.png" alt="Red Rocket filling station"><div class="infobox-row"><span class="infobox-label">種類</span><span>ガソリンスタンド</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="ash-heap.html" class="auto-link">積灰の山</a></span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="mole-miners.html" class="auto-link">モールマイナー</a>等</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Red Rocket filling station<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">レッドロケット・給油所</span></h1>");

fs.writeFileSync('f:/Fallout/red-rocket-filling-station.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

レッドロケット・給油所（Red Rocket filling station）
https://www.fallout-jp.com/red-rocket-filling-station.html

概要

アパラチア南西部の「積灰の山」地域にある、木の板で塞がれた拠点跡。

---

💭 感想

アパラチアの他のレッドロケットとは異なり、建物内部に入ることはできず入り口等はすべて木の板で塞がれています。戦前の労働争議の際に、オートメーション化に反対する市民たちが立て籠もって使っていたような痕跡がありますね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/red-rocket-filling-station', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/red-rocket-filling-station/post.md', postContent);

console.log('Done.');
