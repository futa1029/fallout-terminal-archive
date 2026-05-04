const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/southhampton-estate.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>サウサンプトン・エステート（Southhampton Estate）</b>は、アパラチアの<a href="the-mire.html" class="auto-link">沼地地帯</a>にある<a href="locations.html" class="auto-link">ロケーション</a>です。</p>

            <h2>レイアウト</h2>
<p>サウサンプトン・エステートには、2階建ての母屋（家）と隣接する納屋の2つの建物があります。<br>沼地にあるほとんどの建物と同様に、ここの建物も周囲一帯を含む異常成長したオレンジ色のストラングラーの蔓（ツル）に覆われ、飲み込まれています。</p>
<p>母屋の1階にはキッチンがあります。冷蔵庫、クーラーボックス、隅に空の牛乳瓶の木箱などがありますが、それ以上の目ぼしいものはありません。ダイニングテーブルはひっくり返され、壁に押し付けられています。<br>2階は寝室になっており、そこでバックパックの横に倒れている<a href="ella-ames.html" class="auto-link">エラ・エイムズ</a>の死体が見つかります。<a href="typewriter.html" class="auto-link">タイプライター</a>が置かれた机はまだ無傷ですが、ベッドは壊れています。</p>
<p>納屋にはもはや使い物にならない錆びたトラクターが入っています。また、建物のあちこちで数本の<a href="whiskey.html" class="auto-link">ウイスキー</a>を見つけることができます。<br>2階にはひっくり返った手漕ぎボートがあり、その横の棚には<a href="combat-shotgun.html" class="auto-link">コンバットショットガン</a>、それに対応する<a href="shotgun-shell.html" class="auto-link">弾薬（ショットガンシェル）</a>、および鍵のかかった弾薬箱（ロックピック：必要スキル0）があります。<br>さらに2つの建物の間には、錆びついたピックアップトラックが停まっています。</p>

            <h2>主なアイテム</h2>
<ul class="loot-list">
    <li><b><a href="ellas-research.html" class="auto-link">エラの研究（Ella's research）</a></b>：ホロテープ。クエスト「<a href="an-organic-solution.html" class="auto-link">An Organic Solution</a>」の進行中、家の中の2階に横たわるエラ・エイムズの死体（インベントリ）から見つけられます。</li>
    <li><b><a href="vault-tec-bobblehead.html" class="auto-link">ボブルヘッド</a></b>（スポーン候補：2か所）：
        <ul>
            <li>赤い納屋の2階、バルコニーの北東の角にある金属製テーブルの上。</li>
            <li>母屋の2階、ベッドのヘッドボードの右側の角の上。</li>
        </ul>
    </li>
    <li><b><a href="magazines.html" class="auto-link">雑誌</a></b>（スポーン候補：2か所）：
        <ul>
            <li>母屋の1階、キッチンのカウンターの上（シンクの横）。</li>
            <li>赤い納屋の入り口部分（差し掛け屋根）、壊れた金属の棚の上。</li>
        </ul>
    </li>
    <li><b><a href="plans.html" class="auto-link">設計図</a></b>（スポーン候補）：納屋の2階。</li>
    <li><b>武器モジュール</b>（スポーン候補）：母屋の2階、机の左側にあたる床の上。</li>
</ul>

            <h2>関連クエスト</h2>
<ul class="loot-list">
    <li><b><a href="an-organic-solution.html" class="auto-link">An Organic Solution</a></b></li>
    <li><b><a href="stings-and-things.html" class="auto-link">Stings and Things</a></b></li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                沼地地帯にある放棄された農場の跡地です。<br>この家で息絶えている「エラ・エイムズ」はフリーステイツの重要メンバーであった天才科学者です。彼女は沼地全体に異常繁殖していくストラングラーの生態を必死に研究し、その対抗手段となる防護薬「ラッド・シールド」の製法を命懸けで完成させました。<br>メインストーリーでも重要な役割を果たした場所になり、彼女の死は結果的にアパラチアの生存競争において大きな損失であったと感じさせられますね。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Southhampton Estate</h3><img src="images/note_extracted/southhampton-estate/img_main.png" alt="Southhampton Estate"><div class="infobox-row"><span class="infobox-label">種類</span><span>廃屋</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="the-mire.html" class="auto-link">沼地地帯</a></span></div><div class="infobox-row"><span class="infobox-label">関連クエスト</span><span><a href="an-organic-solution.html" class="auto-link">An Organic Solution</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Southhampton Estate<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">サウサンプトン・エステート</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_southhampton_estate" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Southhampton Estate<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">サウサンプトン・エステート</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Southhampton_Estate" target="_blank" rel="noopener">Southhampton Estate</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_southhampton_estate';const _n='Southhampton Estate';const _u='southhampton-estate.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Southhampton Estate</h3><img src="images/note_extracted/southhampton-estate/img_main.png" alt="Southhampton Estate"><div class="infobox-row"><span class="infobox-label">種類</span><span>廃屋</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="the-mire.html" class="auto-link">沼地地帯</a></span></div><div class="infobox-row"><span class="infobox-label">関連クエスト</span><span><a href="an-organic-solution.html" class="auto-link">An Organic Solution</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Southhampton Estate<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">サウサンプトン・エステート</span></h1>");

fs.writeFileSync('f:/Fallout/southhampton-estate.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

サウサンプトン・エステート（Southhampton Estate）
https://www.fallout-jp.com/southhampton-estate.html

概要

沼地にある放棄された農場跡地。ストラングラーの生態を研究してその対抗薬を作ったフリーステイツの天才科学者「エラ・エイムズ」が息絶えている場所でもあります。

---

💭 感想

「ラッド・シールド」の製法を命懸けで完成させた天才科学者エラの死に際を直接確認できるメインストーリーでの重要ポイント。彼女の死は結果的にアパラチアの生存競争全体において大きな損失であったんだなと実感させられます。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/southhampton-estate', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/southhampton-estate/post.md', postContent);

console.log('Done.');
