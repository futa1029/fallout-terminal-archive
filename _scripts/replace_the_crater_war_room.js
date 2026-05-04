const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/the-crater-war-room.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>クレーター作戦室（The Crater war room）</b>は、アパラチアの<a href="toxic-valley.html" class="auto-link">毒の峡谷</a>にある<a href="unmarked-locations.html" class="auto-link">未記載のロケーション</a>です。<a href="the-crater.html" class="auto-link">クレーター</a>の内部に存在しています。</p>

            <h2>レイアウト</h2>
<p>クレーター作戦室は、クレーターにあるエーリ（Ae-Ri）のショップのさらに奥、墜落した宇宙ステーションのバラバラになった区画（上下逆さまに破損している部分）の内部に位置しています。</p>
<p>中へ入ると、道が前と左の二手に分かれています。<br>左へ進むと小さな部屋があり、ベッド、2つの机、<a href="weapons-workbench.html" class="auto-link">武器作業台</a>に加えて、機械類や箱などがいくつか置かれています。<br>まっすぐ進むと、発掘された洞窟のような空間に出ます。そこが実際の作戦室となっており、バーク、ピアース、シーナの3人が襲撃の計画を練っています。作戦室のテーブルの周りにはビールの空き瓶が散乱しています。</p>
<p>部屋の隅にはジュークボックスが置かれ、左側の壁沿いには<a href="brewing-station.html" class="auto-link">醸造ステーション</a>が設置されています。ゲート（金網）の奥には物資や武器、コンテナ類が山積みになっていますが、このケージで囲われたエリアには通常アクセスできません。なお、ゲート自体にはアパラチアのマップとコルクボードが張り付けられています。</p>

            <h2>主なアイテム</h2>
<ul class="loot-list">
    <li><b><a href="marcias-diary.html" class="auto-link">マーシアの日記</a></b>：シーナのすぐ後ろに置かれているマーシアのバックパックの中にあります。</li>
    <li><b><a href="sheenas-holotape.html" class="auto-link">シーナのホロテープ</a></b>：クエスト「Property Rights」の進行中、クレーター作戦室にいるシーナから入手できます。</li>
</ul>

            <h2>バグ</h2>
<p>マップとコルクボードの間を前方に走り抜けることで、ゲート（金網）をすり抜けることが可能な場合があります。この方法を使うと、ゲートの後ろにある全てのアイテムやコンテナにアクセスし、中身を入手することができます。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                クレーターの最奥にある、まさにレイダーたちの中枢とも言える場所です。<br>クエストで訪れる機会も多く、個性豊かな名有りのレイダーたちが集まって作戦会議をしているため、拠点としての雰囲気を強く感じられます。金網の奥にある大量の物資は、実はバグ技ですり抜けてほぼ全て回収できる…というのも、アパラチアのレイダーのアジトらしくて面白いですね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">The Crater war room</h3><img src="images/note_extracted/the-crater-war-room/img_main.png" alt="The Crater war room"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="unmarked-locations.html" class="auto-link">未記載のロケーション</a>（作戦室）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="toxic-valley.html" class="auto-link">毒の峡谷</a></span></div><div class="infobox-row"><span class="infobox-label">勢力</span><span><a href="raiders.html" class="auto-link">レイダー</a>（クレーター）</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>The Crater War Room<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">クレーター作戦室</span></h1>");

// Wait, the original HTML has the new format footer, but it has old buggy script content?
// Let's replace everything below <h2>概要</h2> just to be sure
const startMarker = '<h2>概要</h2>';
const preamble = content.split(startMarker)[0];

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/The_Crater_war_room" target="_blank" rel="noopener">The Crater war room</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_crater_war_room';const _n='The Crater War Room';const _u='the-crater-war-room.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

fs.writeFileSync('f:/Fallout/the-crater-war-room.html', preamble + newContent + footerContent);

// X post
const postContent = `#Fallout76 #Fallout

クレーター作戦室（The Crater war room）
https://www.fallout-jp.com/the-crater-war-room.html

概要

毒の峡谷にあるレイダーの拠点「クレーター」内にある作戦室。バークやピアースらが計画を練っている洞窟で、金網の奥には大量の物資が山積みになっています。

---

💭 感想

レイダーたちの中枢とも言える場所です。クエストで訪れる機会も多く、雰囲気抜群！実は金網の奥にある大量の物資は、ちょっとしたバグ技ですり抜けてほぼ全て回収できちゃったりします（笑）。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/the-crater-war-room', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/the-crater-war-room/post.md', postContent);

console.log('Done.');
