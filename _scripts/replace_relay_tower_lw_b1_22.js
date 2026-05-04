const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/relay-tower-lw-b1-22.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>リレータワー LW-B1-22（Relay tower LW-B1-22）</b>は、アパラチアの<a href="savage-divide.html" class="auto-link">荒れた境域</a>にある<a href="locations.html" class="auto-link">ロケーション</a>です。</p>

            <h2>レイアウト</h2>
<p><a href="sons-of-dane-compound.html" class="auto-link">サンズ・オブ・デーンの屋敷</a>の南、<a href="fort-atlas.html" class="auto-link">ATLAS観測所</a>の東に位置しています。このワンルーム構造の通信中継塔は、アパラチア各地にある他のリレータワーとよく似た作りになっています。<br>部屋の中央には柱があり、その南側にリレータワーのターミナルが設置されています。南西側を向いている入り口の両脇には、<a href="automated-turret.html" class="auto-link">自動壁掛けタレット</a>が配置されています。入り口の内側には壁に救急箱が掛けられており、通常は何かしらの形態の「水」が入っています。</p>

<p>建物の外側、南東部分には屋上へ通じる階段があります。屋上には<a href="super-mutant.html" class="auto-link">スーパーミュータント</a>の監視兵がおり、プレイヤーが接近すると他の仲間に警戒を促します。北東の壁にある入り口の外側にも、ドアの西側に自動壁掛けタレット（通常はマシンガン・タイプ）が備え付けられています。</p>

            <h2>主なアイテム</h2>
<ul class="loot-list">
    <li><b>加熱コイル</b>：クエストアイテム。木枠の箱の上に置かれた道具箱の中にあります。</li>
    <li><b><a href="vault-tec-bobblehead.html" class="auto-link">ボブルヘッド</a></b>（スポーン候補）：北西側の内壁のロッカーの中に置かれることがあります。</li>
    <li><b><a href="magazines.html" class="auto-link">雑誌</a></b>（スポーン候補）：中央の巨大なコンクリート柱に面したメインフレーム（コンピューターバンク）の上、ランプの近くに置かれることがあります。</li>
    <li><b><a href="fusion-core-fallout-76.html" class="auto-link">フュージョン・コア</a></b>：リレータワーのターミナルの左側に配置された棚の上にあります。</li>
</ul>

            <h2>関連クエスト</h2>
<ul class="loot-list">
    <li><b><a href="request-government-air-drop.html" class="auto-link">Request Government Air Drop</a></b>：<a href="us-government-supply-requisition.html" class="auto-link">US政府の補給申請書</a>をこのリレータワーのターミナルからアップロードするために使用します。</li>
    <li><b><a href="always-vigilant.html" class="auto-link">Always Vigilant</a>（パブリックイベント）</b>：リレータワーを修理するアイボット「ローバー」を敵から防衛します。</li>
    <li><b><a href="strange-bedfellows.html" class="auto-link">Strange Bedfellows</a></b>：ターミナルから「接続用ホロテープ」をアップロードするための対象ロケーションの一つです。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                荒れた境域にある通信中継塔（リレータワー）の一つです。<br>政府の補給申請書の登録先として使えたり、パブリックイベント「Always Vigilant」の舞台になったりするなど、序盤〜中盤にかけて訪れる機会が何度かあります。内部はあまり広くありませんが、確定でフュージョン・コアが手に入る場所でもあるので、近くを通りかかった際に回収していくのも良いでしょう。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Relay Tower LW-B1-22</h3><img src="images/note_extracted/relay-tower-lw-b1-22/img_main.png" alt="Relay tower LW-B1-22"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="unmarked-locations.html" class="auto-link">通信中継塔</a></span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="savage-divide.html" class="auto-link">荒れた境域</a></span></div><div class="infobox-row"><span class="infobox-label">敵関連</span><span><a href="super-mutant.html" class="auto-link">スーパーミュータント</a></span></div><div class="infobox-row"><span class="infobox-label">関連クエスト</span><span><a href="always-vigilant.html" class="auto-link">Always Vigilant</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Relay Tower LW-B1-22<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">リレータワー LW-B1-22</span></h1>");

const startMarker = '<h2>概要</h2>';
const preamble = content.split(startMarker)[0];

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Relay_tower_LW-B1-22" target="_blank" rel="noopener">Relay tower LW-B1-22</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_relay_tower_lw_b1_22';const _n='Relay Tower LW-B1-22';const _u='relay-tower-lw-b1-22.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

fs.writeFileSync('f:/Fallout/relay-tower-lw-b1-22.html', preamble + newContent + footerContent);

// X post
const postContent = `#Fallout76 #Fallout

リレータワー LW-B1-22（Relay tower LW-B1-22）
https://www.fallout-jp.com/relay-tower-lw-b1-22.html

概要

荒れた境域にある通信中継塔の一つ。ATLAS観測所の東に位置しており、中ではタレットやスーパーミュータントが警戒に当たっています。

---

💭 感想

お馴染みのリレータワー（通信中継塔）です。政府の補給申請書を使って支援物資を要請したり、パブリックイベント「Always Vigilant」でアイボットを守ったり、メインクエストで訪れたりと、序盤〜中盤にかけて訪れる機会が何度かあるロケーションです！

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/relay-tower-lw-b1-22', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/relay-tower-lw-b1-22/post.md', postContent);

console.log('Done.');
