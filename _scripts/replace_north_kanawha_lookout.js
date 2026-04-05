const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/north-kanawha-lookout.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ノースカナワの監視地点（North Kanawha lookout）</b>は、アパラチアの<a href="the-forest.html" class="auto-link">森林地帯</a>にある<a href="locations.html" class="auto-link">ロケーション</a>です。<a href="vault-76.html" class="auto-link">Vault 76</a>のすぐ東に位置しています。</p>

            <h2>背景</h2>
<p>この監視塔はかつて<a href="responders.html" class="auto-link">レスポンダー</a>によって使用されていましたが、<a href="super-mutant.html" class="auto-link">スーパーミュータント</a>の集団に制圧され、彼らの拠点として利用されるようになりました。<br>監視塔にいたレスポンダーたちは死の間際、ミュータントたちに中身を奪われないように金庫の鍵を外部に投げ捨てました。</p>

            <h2>レイアウト</h2>
<p>多数のスーパーミュータントがこの火の見櫓を占拠しています。塔の真下には<a href="cooking-station.html" class="auto-link">クッキングステーション</a>と爆発物の箱があり、塔の最上階にいるスーパーミュータントが作ったと思われる<a href="meat-bag.html" class="auto-link">ミートバッグ</a>に囲まれています。<br>階段を上った先の最上階の部屋はミートバッグで散らかっており、その中央に鍵が必要な金庫が置かれています。<a href="safe-key.html" class="auto-link">金庫の鍵</a>は、西側にある仮設トイレの屋根の上で見つけることができます。付近には<a href="weapons-workbench.html" class="auto-link">武器作業台</a>と<a href="water-pump.html" class="auto-link">ウォーターポンプ</a>があります。周辺では<a href="rhododendron.html" class="auto-link">ツツジ</a>や<a href="soot-flower.html" class="auto-link">スートフラワー</a>を採取できます。</p>
<p>監視地点のすぐ近くには廃墟の小屋があり、床下のクロールスペースには「Sickleman is here.（シックルマンはここにいる）」というグラフィティが描かれています。（※Wastelandersアップデート以前は「Sickleman ''was'' here」でした）。<br>グラフィティの近くには首のない白骨死体がいくつか転がっています。ここの床の穴から小屋の内部にアクセスできます。</p>

            <h2>主なアイテム</h2>
<ul class="loot-list">
    <li><b><a href="responders-note.html" class="auto-link">レスポンダーのメモ（Responder's note）</a></b>：塔内部の金庫の上に置かれています。</li>
    <li><b>金庫の鍵</b>：西側にある仮設トイレの屋根の上。塔の最上階の金庫を開けることができます。</li>
    <li><b><a href="recipes.html" class="auto-link">レシピ</a></b>（スポーン候補：2か所）：塔の南側にあるホットタブ付きの小屋の中と、同じく南側のもう一つの小屋の中に置かれることがあります。</li>
</ul>

            <h2>メモ</h2>
<p>最上階に登って周辺を見渡すことで、以下のロケーションをマップに登録することができます。</p>
<ul>
    <li>ツインパイン・キャビン</li>
    <li>ゴージ・ジャンクヤード</li>
    <li>ランドビュー灯台</li>
    <li>孤立したキャビン</li>
    <li>密造酒製造者の小屋</li>
    <li>ギルマン製材所</li>
    <li>ウィルソン・ブラザーズ自動車修理屋</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                Vault 76を出てすぐ東にある監視塔で、多くの新規プレイヤーが本格的な探索を開始して最初に遭遇するロケーションの一つです。<br>塔の真下にいるスーパーミュータントは最序盤の装備ではかなりの強敵であり、ここで初めて本格的な戦闘と死を経験するプレイヤーも少なくありません。近くの小屋の床下にある「シックルマン（Sickleman）」の不気味なメッセージと白骨死体など、Falloutならではのダークなロアも仕込まれている印象深い場所です。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">North Kanawha lookout</h3><img src="images/note_extracted/north-kanawha-lookout/img_main.png" alt="North Kanawha lookout"><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="the-forest.html" class="auto-link">森林地帯</a></span></div><div class="infobox-row"><span class="infobox-label">勢力</span><span><a href="responders.html" class="auto-link">レスポンダー</a>（元）</span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="super-mutant.html" class="auto-link">スーパーミュータント</a><br><a href="floater.html" class="auto-link">フローター</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>North Kanawha lookout<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ノースカナワの監視地点</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_north_kanawha_lookout" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>North Kanawha lookout<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ノースカナワの監視地点</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/North_Kanawha_lookout" target="_blank" rel="noopener">North Kanawha lookout</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_north_kanawha_lookout';const _n='North Kanawha lookout';const _u='north-kanawha-lookout.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">North Kanawha lookout</h3><img src="images/note_extracted/north-kanawha-lookout/img_main.png" alt="North Kanawha lookout"><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="the-forest.html" class="auto-link">森林地帯</a></span></div><div class="infobox-row"><span class="infobox-label">勢力</span><span><a href="responders.html" class="auto-link">レスポンダー</a>（元）</span></div><div class="infobox-row"><span class="infobox-label">出現する敵</span><span><a href="super-mutant.html" class="auto-link">スーパーミュータント</a><br><a href="floater.html" class="auto-link">フローター</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>North Kanawha lookout<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ノースカナワの監視地点</span></h1>");

fs.writeFileSync('f:/Fallout/north-kanawha-lookout.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ノースカナワの監視地点（North Kanawha lookout）
https://www.fallout-jp.com/north-kanawha-lookout.html

概要

Vault 76を出て東にある監視塔。現在はスーパーミュータントに占拠されています。付近の小屋の床下には「シックルマン」の不気味なメッセージが残されています。

---

💭 感想

多くの新規プレイヤーが本格的な探索を開始して最初に遭遇するロケーションの一つです。初期装備ではスーパーミュータントはかなりの強敵であり、ここで初めて本格的な戦闘と死を経験するプレイヤーも少なくありません。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/north-kanawha-lookout', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/north-kanawha-lookout/post.md', postContent);

console.log('Done.');
