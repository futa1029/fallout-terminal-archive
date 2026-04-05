const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/summersville-lake.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>サマーズビル湖（Summersville Lake）</b>は、アパラチアの<a href="the-forest.html" class="auto-link">森林地帯</a>にある<a href="locations.html" class="auto-link">マークされない広大なロケーション</a>です。</p>

            <h2>レイアウトと歴史</h2>
<p><a href="great-war.html" class="auto-link">最終戦争</a>（核戦争）が起こる前、サマーズビル湖は<a href="kanawha-river.html" class="auto-link">カノーワ川</a>の水をさらにせき止める<a href="summersville-dam.html" class="auto-link">サマーズビル・ダム</a>によって作られた巨大な貯水池でした。<br>しかし戦後の2082年、レイダーのリーダーである<a href="david-thorpe.html" class="auto-link">デビッド・ソープ</a>がこのダムを破壊し、貯水池の水を近くの（レスポンダーの拠点となっていた）都市<a href="charleston.html" class="auto-link">チャールストン</a>に一気に氾濫させました（この事件は後に「<a href="the-christmas-flood.html" class="auto-link">クリスマスの大洪水</a>」と呼ばれることになります）。<br>これにより、当時のサマーズビル湖は干上がり、広大なすり鉢状の湖の底（クレーター）となりました。</p>

<p>現在のかつての湖の底（中央付近）には、貯水池によって水没していた戦前の町・ガド（Gad）の遺跡が見えるようになっており、その土台の上に建設されたスーパーミュータントの巨大なボート（集落）である<a href="new-gad.html" class="auto-link">ニューガド</a>が存在します。<br>干上がった湖の北岸には<a href="lakeside-cabins.html" class="auto-link">レイクサイド・キャビン</a>、東岸には<a href="overlook-cabin.html" class="auto-link">展望台のキャビン</a>、西岸には<a href="summersville-docks.html" class="auto-link">サマーズビル・ドック</a>が点在し、南にはかつての豊かな水を解放してしまった破壊されたサマーズビル・ダムがあります。</p>

<p>湖の底（砂地）に座礁した船の残骸のそばには、両足をコンクリートで固められ、ピストルを持った白骨死体があり、戦前に起きたマフィアスタイルの殺人（死体遺棄）事件を暗示しています。<br>さらに西の方には、手足を縛られてコンクリートブロックにくくりつけられた別の白骨死体も見つかります。</p>

            <h2>豆知識（Behind the scenes）</h2>
<ul class="loot-list">
    <li>サマーズビル湖は、現実世界のウェストバージニア州に実在する貯水池であり、1960年の現実のサマーズビル・ダムの建設によって形成されました。</li>
    <li>干上がった湖の中にある、レイクサイド・キャビンの東の赤いボートの近くには、水面に浮いているようなドア板の上に横たわる女性のガイコツが、部分的に沈んだ別のガイコツの腕に手を伸ばしているシーンがあります。<br>これは1997年の映画『<a href="https://ja.wikipedia.org/wiki/%E3%82%BF%E3%82%A4%E3%82%BF%E3%83%8B%E3%83%83%E3%82%AF_(1997%E5%B9%B4%E3%81%AE%E6%98%A0%E7%94%BB)" target="_blank" rel="noopener" class="auto-link" style="border-bottom: 1px dashed var(--accent-color) !important;">タイタニック（Titanic）</a>』のキャラクターであるローズとジャックに対するパロディ（オマージュ）です。</li>
</ul>

            <div class="quote-box">
                <b>感想</b><br><br>
                かつて豊かな水をたたえていた湖でしたが、レイダーたちによって「チャールストンを水没させるため」にダムが爆破・解放されたため、現在では広大な干上がったすり鉢状のクレーターになっています。<br>干上がる前には湖底に沈んでいた町の跡地などを利用してスーパーミュータントの拠点「ニューガド」が作られており、全体として高低差のある巨大な構造を生み出しています。<br>マフィアの死体遺棄現場やタイタニックのパロディなど、戦前・戦後のさまざまなイベントの形跡を残すロケーションであり、歩いて見て回るだけでも楽しい場所です。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Summersville Lake</h3><img src="images/note_extracted/summersville-lake/img_main.png" alt="Summersville Lake"><div class="infobox-row"><span class="infobox-label">種類</span><span>マークされない広範エリア</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="the-forest.html" class="auto-link">森林地帯</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Summersville Lake<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">サマーズビル湖</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_summersville_lake" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Summersville Lake<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">サマーズビル湖</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Summersville_Lake" target="_blank" rel="noopener">Summersville Lake</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_summersville_lake';const _n='Summersville Lake';const _u='summersville-lake.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Summersville Lake</h3><img src="images/note_extracted/summersville-lake/img_main.png" alt="Summersville Lake"><div class="infobox-row"><span class="infobox-label">種類</span><span>マークされない広範エリア</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="the-forest.html" class="auto-link">森林地帯</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Summersville Lake<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">サマーズビル湖</span></h1>");

fs.writeFileSync('f:/Fallout/summersville-lake.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

サマーズビル湖（Summersville Lake）
https://www.fallout-jp.com/summersville-lake.html

概要

森林地帯に広がる干上がった湖。レイダーのデビッドによりダムの堰が切られ、チャールストン水没の原因になった歴史があります。

---

💭 感想

干上がる前には湖底に沈んでいた町の跡地を利用してスーパーミュータントの拠点「ニューガド」が作られていたり、マフィアの死体遺棄現場やタイタニックのパロディがあるなど、戦前・戦後のさまざまな歴史の形跡を残すロケーションです。景色も最高ですね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/summersville-lake', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/summersville-lake/post.md', postContent);

console.log('Done.');
