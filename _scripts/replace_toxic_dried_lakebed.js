const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/toxic-dried-lakebed.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>有毒な干上がった湖底（Toxic Dried Lakebed）</b>は、アパラチア北部の<a href="toxic-valley.html" class="auto-link">毒の谷</a>地域にある<a href="locations.html" class="auto-link">ロケーション</a>です。</p>

            <h2>背景</h2>
<p>この巨大な湖は、戦前は観光客やボート遊びを楽しむ人々にとって人気の行楽スポットでした。</p>

            <h2>レイアウト</h2>
<p>この干上がった湖底は、南の<a href="clarksburg.html" class="auto-link">クラークスバーグ</a>と北の<a href="wavy-willards-water-park.html" class="auto-link">ウェービー・ウィラーズ・ウォーターパーク</a>を隔てる真っ白な帯状の広大な地形の窪地であり、長年の化学物質の不法投棄と<a href="great-war.html" class="auto-link">最終戦争</a>（核兵器）の影響によって水が干上がり、地面全体が激しく汚染（有毒化）されています。</p>

<p>このロケーションの発見ポイント（ファストトラベルの到着地点）はクラークスバーグの町の中にあり、入れない封鎖された建物である「<a href="crab-shack.html" class="auto-link">クラブシャック（Crab Shack）</a>」と「<a href="big-steves-sporting-goods.html" class="auto-link">ビッグスティーブのスポーツ用品店</a>」の近くです。<br>手前のクラブシャックの屋上へと続く道があり、そこにはいくらかのルートアイテムがある小さなサバイバリストのキャンプ跡があります。</p>

<p>湖の端に沿って、ボートハウス（船小屋）を含むいくつかの建物があります。<br>そのうちの1つは鍵がかかっており、中には赤い<a href="steamer-trunk.html" class="auto-link">スチーマートランク</a>が置かれています。<br>また、内部に様々な<a href="junk.html" class="auto-link">ジャンク品</a>が散乱している「<a href="lakeside-grill.html" class="auto-link">レイクサイド・グリル（Lakeside Grill）</a>」という名前のダイナーもあります。<br>さらに、広大な干上がった湖のエリアの中心部は、<a href="mirelurk-queen.html" class="auto-link">マイアルククイーン</a>や<a href="grafton-monster.html" class="auto-link">グラフトンモンスター</a>のような巨大クリーチャーの出現（周回）ルートの1つになっています。</p>

            <h2>主なアイテム（戦利品）</h2>
<ul class="loot-list">
    <li><b><a href="untitled-note.html" class="auto-link">無題（メモ）</a></b>：ダイナー（レイクサイド・グリル）の少し東にある小さな波止場のピクニックテーブルの上にあります。</li>
    <li><b><a href="boat-house-key.html" class="auto-link">ボートハウスの鍵</a></b>：レイクサイド・グリルの中、調理鍋の中に入っている「バブルガムベア」の近くにあります。この鍵を使うことで外にある鍵のかかったボートハウスを開けることができます。</li>
    <li>ランダムな<a href="weapon-mods.html" class="auto-link">武器モジュール</a>：桟橋にある鍵のかかったボートハウスの内側、金属棚の上に配置される可能性があります。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                クラークスバーグに面している、真っ白な有毒物質（白い粉塵）の地面が広がる巨大な窪地のエリアです。<br>戦前は人気の湖の行楽地でしたが、現在は化学物質でひどく汚染されており、マイアルクやスナリーギャスター、グラフトンモンスターなどの大型・有毒のクリーチャー達の巣窟と化しています。<br>カニ料理のお店の「クラブシャック」の看板のカニのイラストが可愛いですね。有毒化して巨大化したマイアルクの前に設置されているのが皮肉ですが。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Toxic Dried Lakebed</h3><img src="images/note_extracted/toxic-dried-lakebed/img_main.png" alt="Toxic Dried Lakebed"><div class="infobox-row"><span class="infobox-label">種類</span><span>湖底・窪地</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="toxic-valley.html" class="auto-link">毒の谷</a></span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="mirelurks.html" class="auto-link">マイアルク</a>など</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Toxic Dried Lakebed<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">有毒な干上がった湖底</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_toxic_dried_lakebed" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Toxic Dried Lakebed<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">有毒な干上がった湖底</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Toxic_Dried_Lakebed" target="_blank" rel="noopener">Toxic Dried Lakebed</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_toxic_dried_lakebed';const _n='Toxic Dried Lakebed';const _u='toxic-dried-lakebed.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Toxic Dried Lakebed</h3><img src="images/note_extracted/toxic-dried-lakebed/img_main.png" alt="Toxic Dried Lakebed"><div class="infobox-row"><span class="infobox-label">種類</span><span>湖底・窪地</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="toxic-valley.html" class="auto-link">毒の谷</a></span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="mirelurks.html" class="auto-link">マイアルク</a>など</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Toxic Dried Lakebed<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">有毒な干上がった湖底</span></h1>");

fs.writeFileSync('f:/Fallout/toxic-dried-lakebed.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

有毒な干上がった湖底（Toxic Dried Lakebed）
https://www.fallout-jp.com/toxic-dried-lakebed.html

概要

クラークスバーグに面している、真っ白な粉塵の地面が広がる巨大な窪地やボートハウスのエリア。

---

💭 感想

戦前は人気のある湖の行楽地でしたが、現在は化学物質でひどく汚染されており、マイアルクやグラフトンモンスターなどの大型クリーチャー達の巣窟と化しています。「クラブシャック」の看板のカニのイラストが可愛いですね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/toxic-dried-lakebed', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/toxic-dried-lakebed/post.md', postContent);

console.log('Done.');
