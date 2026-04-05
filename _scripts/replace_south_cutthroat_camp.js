const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/south-cutthroat-camp.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>南カットスロートのキャンプ（South Cutthroat camp）</b>は、アパラチア中部の<a href="savage-divide.html" class="auto-link">荒れた境域</a>にある<a href="locations.html" class="auto-link">ロケーション</a>です。<br>ここはかつて第一世代レイダーの<a href="cutthroats.html" class="auto-link">カットスロート</a>ギャングが関所としてかつて使用していたキャンプでしたが、現在では（<a href="wastelanders.html" class="auto-link">Wastelanders</a>アップデート以降）新たなレイダー派閥である<a href="blood-eagles.html" class="auto-link">ブラッドイーグル</a>のギャングに占拠・使用されています。</p>

            <h2>レイアウト</h2>
<p>このキャンプはハイウェイの道路の周りをバリケードで囲むように建設されており、重火器を装備したパワーアーマーを着ている個体を含む、複数の<a href="blood-eagles.html" class="auto-link">ブラッドイーグル</a>が入り口などに配置されています。<br>彼らに発見されて警報のクラクションが鳴らされると、<a href="blood-eagle-attack-dog.html" class="auto-link">アタックドッグ</a>を含む強力なブラッドイーグルの増援部隊が到着します。<br>キャンプ内のいくつかの取引所（トレーディングポスト）のような小屋には、ルート可能な2つの<a href="safe.html" class="auto-link">金庫</a>があります。</p>

            <h2>主なアイテム（戦利品）</h2>
<ul class="loot-list">
    <li><b><a href="blood-eagle-oath.html" class="auto-link">ブラッドイーグルの誓い</a></b>（ホロテープ）：キャンプの北側にある、赤い<a href="ski-lift.html" class="auto-link">スキーリフト</a>のゴンドラの中にあります。</li>
    <li>4つのランダムな<a href="vault-tec-bobblehead.html" class="auto-link">ボブルヘッド</a>出現ポイント：
        <ul style="margin: 5px 0 10px 20px; color: #ccc;">
            <li>道路の北端にある、トイレ付きの再利用されたスキーリフトのゴンドラの中、窓枠の上にあります。</li>
            <li>道路の北側にある、壊れた車と赤い椅子で作られた即席の玉座の真上にあります。</li>
            <li>キャンプの南西側にある、監視塔の近くの店舗（ショーケースの中）にあります。</li>
            <li>道路の北側にある、ソファとして再利用されている車のシャーシの隣、エンドテーブルの上にあります。</li>
        </ul>
    </li>
    <li>2つのランダムな<a href="magazines.html" class="auto-link">雑誌（マガジン）</a>出現ポイント：
        <ul style="margin: 5px 0 10px 20px; color: #ccc;">
            <li>キャンプの北東側にある、即席の木製テーブルの上にあります。</li>
            <li>監視塔の近くのキャンプ南端にある、ソファの前のコンクリートブロックの上にあります。</li>
        </ul>
    </li>
    <li>ランダムな<a href="plans.html" class="auto-link">ワークショップの設計図</a>：キャンプの南東側にある、上部にレジスターが置かれた緑色の供給コンテナ（サプライクレート）の上に出現する可能性があります。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                メインクエスト序盤の流れで訪れることになるローズの拠点「世界の頂上（Top of the World）」から南東の麓周辺に位置している規模の大きい拠点です。<br>Wastelandersによる住民NPC実装前はこの場所の名称通り、かつての第一世代レイダー派閥「カットスロート」の誰もいない空きキャンプとなっていましたが、現在はブラッドイーグルに占拠されています。<br>全体で4つものボブルヘッド出現可能ポイントがあるほか、重火器装備のパワーアーマーに載ったブラッドイーグルが確定で出現する可能性があるなど、敵の強さやアイテム密度の高い戦闘エリアに再構築されたロケーションですね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">South Cutthroat camp</h3><img src="images/note_extracted/south-cutthroat-camp/img_main.png" alt="South Cutthroat camp"><div class="infobox-row"><span class="infobox-label">種類</span><span>集落・キャンプ</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="savage-divide.html" class="auto-link">荒れた境域</a></span></div><div class="infobox-row"><span class="infobox-label">占拠派閥</span><span><a href="blood-eagles.html" class="auto-link">ブラッドイーグル</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>South Cutthroat camp<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">南カットスロートのキャンプ</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_south_cutthroat_camp" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>South Cutthroat camp<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">南カットスロートのキャンプ</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/South_Cutthroat_camp" target="_blank" rel="noopener">South Cutthroat camp</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_south_cutthroat_camp';const _n='South Cutthroat camp';const _u='south-cutthroat-camp.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">South Cutthroat camp</h3><img src="images/note_extracted/south-cutthroat-camp/img_main.png" alt="South Cutthroat camp"><div class="infobox-row"><span class="infobox-label">種類</span><span>集落・キャンプ</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="savage-divide.html" class="auto-link">荒れた境域</a></span></div><div class="infobox-row"><span class="infobox-label">占拠派閥</span><span><a href="blood-eagles.html" class="auto-link">ブラッドイーグル</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>South Cutthroat camp<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">南カットスロートのキャンプ</span></h1>");

fs.writeFileSync('f:/Fallout/south-cutthroat-camp.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

南カットスロートのキャンプ（South Cutthroat camp）
https://www.fallout-jp.com/south-cutthroat-camp.html

概要

かつてレイダーのカットスロートギャングが使用していたキャンプ。現在は代わってブラッドイーグルの前哨基地になっています。

---

💭 感想

Wastelanders以前の無人だった頃とは異なり、現在は重火器持ちのPAブラッドイーグルが出現したり警報でアタックドックの増援が来るなどアイテム密度の高い強力な戦闘エリアに再構築されています。ボブルヘッドのポップ位置も4つありますね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/south-cutthroat-camp', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/south-cutthroat-camp/post.md', postContent);

console.log('Done.');
