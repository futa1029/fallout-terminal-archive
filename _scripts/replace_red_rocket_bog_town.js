const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/red-rocket-bog-town.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>捨てられたボグタウンのレッドロケット（abandoned Bog Town Red Rocket）</b>は、アパラチア南東部の<a href="cranberry-bog.html" class="auto-link">クランベリー湿原</a>地域にある<a href="locations.html" class="auto-link">マークされないロケーション</a>です。</p>

            <h2>背景</h2>
<p><a href="great-war.html" class="auto-link">最終戦争</a>（核戦争）が発生する前は、原子力（ニュークリア）<a href="coolant.html" class="auto-link">冷却材</a>の補充およびサービスステーション（ガソリンスタンドの一種）として機能していましたが、現在は放棄され、無人の状態になっています。</p>

            <h2>レイアウト</h2>
<p>西から（近隣の居住地であったアバンダンド・ボグタウンの）町にアプローチする場合、この<a href="red-rocket.html" class="auto-link">レッドロケット</a>のステーションは町の西側郊外にある<a href="adelaides-diner.html" class="auto-link">アデレードの食堂（ダイナー）</a>の隣の右側に位置しています。<br>このロケーションには、ステーションの裏手にある小屋の大きな<a href="wood.html" class="auto-link">薪の山（廃材）</a>の近くに、<a href="stash-box.html" class="auto-link">収納箱（スタッシュ）</a>と武器作業台が設置されています。</p>

<p>また、この建物の屋上（屋根の上）には、（ボグタウンを見下ろすように）立派なキャンプが設営されており、<a href="highway-65.html" class="auto-link">ハイウェイ65号線</a>を上から眺めることができます。<br>屋上へは裏手の仮設のスロープを使ってアクセスできますが、屋上に足を踏み入れた瞬間の場所にベアトラップ（トラバサミ）が仕掛けられているので注意が必要です（2つ目のベアトラップも屋根の正面の縁の近くに配置されています）。</p>

<p>屋上の隅の大きな積み重なったタイヤの隣には、かつてこのキャンプに住んでいたであろう2人の<a href="raiders.html" class="auto-link">レイダー達（死体）</a>が横たわっています。<br>また周辺には、おもちゃのブロック、<a href="fuel-tank.html" class="auto-link">燃料タンク</a>、ピエロのフィギュア、6つの<a href="atomic-roller-ball.html" class="auto-link">アトミックローラーボール</a>などの様々なガラクタが散乱しています。<br>このピエロのフィギュアはボウリングのピンのように並べられており、その中に遊んでいたローラーボールが混ざっています。<br>下のハイウェイにある燃料ポンプの向こうには、戦前に放置された<a href="pick-r-up-truck.html" class="auto-link">ピックアップトラック（Pick-R-Up）</a>がいまだに停まっています。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                アバンダンド・ボグタウンのすぐ西側に隣接している、独立したレッドロケットのステーションです。<br>この建物では屋根の上に仮設の居住キャンプが設営されており、ピエロのフィギュアによる自作のボウリングなど、かつてこの上に住んでいたレイダーたちが余暇で遊んでいた形跡を見ることができます。<br>入り口にトラバサミの罠を張っていたにも関わらず、結局そのレイダー自身の死体が屋上に転がっているなど、いつ敵やクリーチャーが襲ってくるかわからない無法地帯のアパラチアらしい光景が広がっています。<br>プレイヤーにとっても武器作業台やスタッシュ（収納箱）が配置されているため、ボグタウン探索やイベント（Defend Abandoned Bog Town など）の際の拠点としても便利なロケーションですね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Red Rocket (Abandoned Bog Town)</h3><img src="images/note_extracted/red-rocket-bog-town/img_main.png" alt="Red Rocket (Abandoned Bog Town)"><div class="infobox-row"><span class="infobox-label">種類</span><span>サービス・ステーション（未マーク）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span>クランベリー湿原<br>（ｱﾊﾞﾝﾀﾞﾝﾄﾞ・ﾎﾞｸﾞﾀｳﾝ隣接）</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Red Rocket (Abandoned Bog Town)<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ボグタウンのレッドロケット</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_red_rocket_bog_town" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Red Rocket (Abandoned Bog Town)<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ボグタウンのレッドロケット</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Red_Rocket_(Abandoned_Bog_Town)" target="_blank" rel="noopener">Red Rocket (Abandoned Bog Town)</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_red_rocket_bog_town';const _n='Red Rocket (Abandoned Bog Town)';const _u='red-rocket-bog-town.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Red Rocket (Abandoned Bog Town)</h3><img src="images/note_extracted/red-rocket-bog-town/img_main.png" alt="Red Rocket (Abandoned Bog Town)"><div class="infobox-row"><span class="infobox-label">種類</span><span>サービス・ステーション（未マーク）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span>クランベリー湿原<br>（ｱﾊﾞﾝﾀﾞﾝﾄﾞ・ﾎﾞｸﾞﾀｳﾝ隣接）</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Red Rocket (Abandoned Bog Town)<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ボグタウンのレッドロケット</span></h1>");

fs.writeFileSync('f:/Fallout/red-rocket-bog-town.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ボグタウンのレッドロケット（Red Rocket: Abandoned Bog Town）
https://www.fallout-jp.com/red-rocket-bog-town.html

概要

アバンダンド・ボグタウンの西側に隣接しているレッドロケット。屋根にレイダーのキャンプが張られています。

---

💭 感想

屋上では罠を張って篭っていたレイダーたちの死体と、ピエロを使った自作のボウリングなど余暇を見つけて遊んでいた形跡を見ることができます。作業台やスタッシュなどの設備も整っているため、プレイヤーにとってもボグタウン探索の拠点として便利な場所ですね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/red-rocket-bog-town', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/red-rocket-bog-town/post.md', postContent);

console.log('Done.');
