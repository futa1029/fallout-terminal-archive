const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/summersville-dam.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>サマーズビル・ダム（Summersville Dam）</b>は、アパラチアの<a href="the-forest.html" class="auto-link">森林地帯</a>にある<a href="locations.html" class="auto-link">ロケーション</a>です。</p>

            <h2>背景</h2>
<p>サマーズビル・ダムは、<a href="summersville-lake.html" class="auto-link">サマーズビル湖</a>を形成し、州都である<a href="charleston.html" class="auto-link">チャールストン</a>一帯へ水力発電の電力を供給するために建造された戦前の巨大施設です。<br>チャールストンの生存者の住民（<a href="responders.html" class="auto-link">レスポンダー</a>）たちは、「<a href="christmas-flood.html" class="auto-link">クリスマスの大洪水</a>」の惨事の出来事によってダムが破壊されてしまう直前まで、この発電所を修復して電力を完全に復旧させることにあと一歩のところまで近づいていました。</p>

<p>当時チャールストンに駐在していたレスポンダーのグループによって、第一世代レイダーであるカットスロートのメンバーの<a href="rosalynn-jeffries.html" class="auto-link">ロザリン・ジェフリーズ</a>が捕らえられた後、彼女のパートナー（夫）である<a href="david-thorpe.html" class="auto-link">デビッド・ソープ</a>は「自分が助けに行かなかったせいで彼女はすでに死んだもの」と思い込み、その復讐のためクリスマスの朝に<a href="mini-nuke.html" class="auto-link">ミニ・ニューク</a>などの爆発物を使用してサマーズビル・ダムの壁面を爆破し破壊しました。</p>

<p>これにより、膨大な水量のサマーズビル湖の水がチャールストンの街を壊滅的に浸水させ、（皮肉にも実際には生きてレスポンダーの牢屋で勾留されていた）ロザリン本人と、1,000人以上の生存者およびレスポンダーのメンバーたちを押し流して水死させました。この未曽有の惨事は「クリスマスの大洪水」として知られることになります。</p>

            <h2>レイアウト</h2>
<p>現在この場所を占拠している<a href="blood-eagles.html" class="auto-link">ブラッドイーグル</a>（レイダー）のグループが監視塔を建てており、破壊されたダムの隙間の上に粗末な橋（ロープ・ブリッジ等の足場）を作っています。<br>この橋は中間部分の足場が大きく壊れており、プレイヤーはダッシュして飛び越えなければなりません。</p>

            <h2>主なアイテム（戦利品）</h2>
<ul class="loot-list">
    <li><b><a href="charleston-is-ours.html" class="auto-link">チャールストンは俺たちのもの</a></b>（メモ）：ダムの底部へ続く足場に沿って下っていく途中にある、監視塔のひとつにあるテーブル（机）の上に置かれています。</li>
    <li><b><a href="cursed-note.html" class="auto-link">呪われている（メモ）</a></b>（メモ）：ダムの両端の隙間をつなぐ橋の上にある、レイダーのガイコツの死体の隣に置かれています。</li>
    <li><b><a href="the-evil-men.html" class="auto-link">悪人ども</a></b>（メモ）：ダムの底部にある、緑色のボートの残骸の中にあります。</li>
    <li><b><a href="the-power-plant-note.html" class="auto-link">発電所（メモ）</a></b>（メモ）：ダムの上部にある建物の中、壊れたターミナルの隣の机の上にあります。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                かつてはチャールストン一帯に大量の電力を供給していた水力発電用の巨大なダムの跡地です。<br>このサマーズビル・ダムをレイダーのリーダーであるデビッド・ソープが自分勝手な逆恨み（と勘違い）によって独断で爆破したことで発生した「クリスマスの大洪水」は、当時西バージニアのアパラチアで何とか生き残って復興を目指していた有能な生存者たちとレスポンダーのコミュニティを完全に崩壊（溺死）させました。この出来事がなければ、もっと多くのアパラチアの住人達が手を取り合って生きていけたかもしれないと思うと、非常に悲痛なロケーションですね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Summersville Dam</h3><img src="images/note_extracted/summersville-dam/img_main.png" alt="Summersville Dam"><div class="infobox-row"><span class="infobox-label">種類</span><span>ダム・施設跡</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="the-forest.html" class="auto-link">森林地帯</a></span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="blood-eagles.html" class="auto-link">ブラッドイーグル</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Summersville Dam<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">サマーズビル・ダム</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : `<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_summersville_dam" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Summersville Dam<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">サマーズビル・ダム</span></h1>`;

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Summersville_Dam" target="_blank" rel="noopener">Summersville Dam</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_summersville_dam';const _n='Summersville Dam';const _u='summersville-dam.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Summersville Dam</h3><img src="images/note_extracted/summersville-dam/img_main.png" alt="Summersville Dam"><div class="infobox-row"><span class="infobox-label">種類</span><span>ダム・施設跡</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="the-forest.html" class="auto-link">森林地帯</a></span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="blood-eagles.html" class="auto-link">ブラッドイーグル</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Summersville Dam<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">サマーズビル・ダム</span></h1>");

fs.writeFileSync('f:/Fallout/summersville-dam.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

サマーズビル・ダム（Summersville Dam）
https://www.fallout-jp.com/summersville-dam.html

概要

チャールストン一帯へ水力発電の電力を供給するために建造された戦前の巨大なダム施設跡。

---

💭 感想

レイダーのトップによる自分勝手な勘違いによってこのダムが爆破・決壊したことで起きた「クリスマスの大洪水」は、西バージニアに生き残っていた大勢のレスポンダーのコミュニティを完全に全滅（溺死）させました。非常に悲痛なロケーションですね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/summersville-dam', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/summersville-dam/post.md', postContent);

console.log('Done.');
