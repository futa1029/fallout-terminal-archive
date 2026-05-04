const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/vendor-bot-responder.html', 'utf8');

const newContent = `
            <div class="note-box" style="margin-bottom: 20px;">
                <b>補足：</b> 各地のランダムエンカウントで出現する特別な放浪個体のレスポンダーベンダーについては、「<a href="vendor-bot-responder-random-encounter.html" class="auto-link">ベンダーボット・レスポンダー（ランダムエンカウント）</a>」の記事を参照してください。
            </div>

            <h2>概要</h2>
<p><b>ベンダーボット・レスポンダー（Vendor bot Responder）</b>は、アパラチア各地にある<a href="responders.html" class="auto-link">レスポンダー</a>系に属する交易拠点の各駅などで常に営業・配備されている、<a href="vendors.html" class="auto-link">ベンダー</a>機能を持った<a href="protectron.html" class="auto-link">プロテクトロン</a>たちです。</p>

            <h2>背景</h2>
<p>これらの（白・水色・赤の専用塗装に塗られた）ベンダーボットたちは、日々のアイテム取引およびネットワークでの在庫商品の販売システムを完全に自動化させるために、<a href="responders.html" class="auto-link">レスポンダー</a>派閥によって生前にあらかじめプログラムされ、各地に配備されました。</p>

<p>・「すべてのご支払いは、フリーステイツ運動を支援します」（※レスポンダーのベンダーボットたちによる共通・共有の音声セリフ）</p>

            <h2>主な配置場所（ロケーション）</h2>
<ul class="loot-list">
    <li><a href="charleston-station.html" class="auto-link">チャールストン駅</a></li>
    <li><a href="grafton-station.html" class="auto-link">グラフトン駅</a></li>
    <li><a href="lewisburg-station.html" class="auto-link">ルイスバーグ駅</a></li>
    <li><a href="morgantown-station.html" class="auto-link">モーガンタウン駅</a></li>
    <li><a href="welch-station.html" class="auto-link">ウェルチ駅</a></li>
</ul>

            <h2>詳細な販売アイテム</h2>
<p>レスポンダー関連ということもあり、日用品や回復アイテム、序盤での有用な専用設計図などが他の派閥に比べて豊富にラインナップされています。</p>
<ul class="loot-list">
    <li>バルク（<a href="junk.html" class="auto-link">ジャンク品</a>）：粘着剤、アルミニウム、木材、ギアなど。</li>
    <li>各種<a href="ammo.html" class="auto-link">弾薬</a>、<a href="aid.html" class="auto-link">消耗品</a>（スティムパックやRad-X関係など）</li>
    <li>ランダムな<a href="power-armor-mods.html" class="auto-link">パワーアーマーモジュール</a>（<a href="excavator-power-armor.html" class="auto-link">エクスカベーター・パワーアーマー</a>のものを含む）</li>
    <li>基礎・基本的な<a href="weapons.html" class="auto-link">武器</a>群（近接武器、パイプガン、10mmピストル、ポンプアクションショットガン、ハンティングライフルなど）</li>
    <li>武器の<a href="plans.html" class="auto-link">設計図</a>（野球バットやピッチフォーク等の近接武器から狩猟用ライフル、サブマシンガン等の銃火器まで多数）</li>
    <li>ワークショップ（CAMP）関連の設計図：化学作業台、細工師の作業台、テント、クッキングステーション、モダンなテーブル、各種ベッドや椅子類、旗や楽器など多数。</li>
    <li>（各地の全ベンダー共通の1400キャップ枠を所持）</li>
</ul>

            <h2>豆知識（Notes）</h2>
<ul class="loot-list">
    <li>プレイヤーキャラクターがレベル30に達すると、各駅にいる彼らをはじめとしたベンダーボットのレベルは（レベル5ではなく）レベル14に動的スケーリングされます。</li>
    <li>プレイヤーキャラクターが「レスポンダー」派閥の専用ユニフォームの一部でも着用している場合、ベンダーボットたちはプレイヤーをレスポンダーの正規の仲間（生存者）として認識し、独自の歓迎セリフで対応するようになります。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                アパラチア西部の各所の駅などでおなじみの、レスポンダーカラー（白・水色・赤）にキレイに塗装され、独自のボイスが設定されているベンダー担当プロテクトロン群の記事です。<br>序盤から終盤まで各種アイテムの売買や設計図集め等で常にお世話になる存在ですね。<br>プレイヤー自身が彼らのプログラムに対して直接「自分はレスポンダーになった」と名乗れないシステムである場合でも、彼ら側が視覚センサーで「レスポンダーの服（塗装が施された服）を着ている人間」を認識するだけで、仲間だと判断してシステム対応してくれるのは少し面白くもありつつ、アパラチアの現状を考えると切ない感じもします。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Vendor bot Responder</h3><img src="images/note_extracted/vendor-bot-responder/img_main.png" alt="Vendor bot Responder"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="protectron.html" class="auto-link">プロテクトロン</a>（ベンダー）</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span>アパラチアの各駅</span></div><div class="infobox-row"><span class="infobox-label">所属派閥</span><span><a href="responders.html" class="auto-link">レスポンダー</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Vendor bot Responder<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ベンダーボット・レスポンダー</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : `<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_vendor_bot_responder" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Vendor bot Responder<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">ベンダーボット・レスポンダー</span></h1>`;

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Vendor_bot_Responder" target="_blank" rel="noopener">Vendor bot Responder</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_vendor_bot_responder';const _n='Vendor bot Responder';const _u='vendor-bot-responder.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Vendor bot Responder</h3><img src="images/note_extracted/vendor-bot-responder/img_main.png" alt="Vendor bot Responder"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="protectron.html" class="auto-link">プロテクトロン</a>（ベンダー）</span></div><div class="infobox-row"><span class="infobox-label">場所</span><span>アパラチアの各駅</span></div><div class="infobox-row"><span class="infobox-label">所属派閥</span><span><a href="responders.html" class="auto-link">レスポンダー</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Vendor bot Responder<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ベンダーボット・レスポンダー</span></h1>");

fs.writeFileSync('f:/Fallout/vendor-bot-responder.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ベンダーボット・レスポンダー（Vendor bot Responder）
https://www.fallout-jp.com/vendor-bot-responder.html

概要

アパラチア各地にあるレスポンダー系に属する交易拠点・駅などで常に営業しているベンダーボット。

---

💭 感想

おなじみの白・水色・赤に塗装されたプロテクトロン群。プレイヤーがレスポンダーの服を着ていくと（視覚的情報だけで）レスポンダーの生存者だと判断し、独自の歓迎セリフで対応してくれる少し切ないシステムも存在します。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/vendor-bot-responder', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/vendor-bot-responder/post.md', postContent);

console.log('Done.');
