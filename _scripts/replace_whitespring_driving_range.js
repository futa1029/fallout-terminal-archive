const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/whitespring-driving-range.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ホワイトスプリングのゴルフ練習場（The Whitespring driving range）</b>は、アパラチア中部の<a href="the-whitespring-resort.html" class="auto-link">ホワイトスプリングの敷地</a>の中にある、<a href="locations.html" class="auto-link">マークされないロケーション</a>です。</p>

            <h2>背景</h2>
<p>この練習場（ドライビングレンジ）は広大な<a href="springhill-golf-course.html" class="auto-link">スプリングヒル・ゴルフコース</a>の施設の一部であり、現在は敷地内の離れにある小さな建物の中に、フリッツ（Fritz）という人物が住み着いています。<br>敷地の周囲一帯は大量の<a href="feral-ghouls.html" class="auto-link">フェラル・グール</a>たちが発生・徘徊しています。</p>

            <h2>レイアウト</h2>
<p>この練習場は、<a href="the-whitespring-golf-club.html" class="auto-link">ホワイトスプリング・ゴルフクラブ</a>（クラブハウス）側から丘を下った場所にある、ゴルフコースの特徴的な建築物の1つです。<br>ゴルフコースそのものは長大な練習場の周囲に向かって広がっており、正面玄関（メインエントランス）の東側にあるリゾートエリアの一部を網羅しています。</p>

<p>ここにある小さな建物（小屋）とその隣接する施設には、平らで一段高くなった練習エリアの足場、<a href="golf-cart.html" class="auto-link">ゴルフカート</a>の駐輪場、そしてコースの他の部分へと続く橋の架かった遊歩道（コースパス）があります。また、見学者用と思われるいくつかのベンチなどが練習場の南側に並んでいます。</p>

<p>小屋の内部には、寝袋や様々なジャンク品のほか、いくつかの<a href="golf-club.html" class="auto-link">ゴルフクラブ</a>、ゴルフバッグなどの様々なゴルフ用品が戦前からそのまま残されています。<br>現在はフリッツがこの場所に住み着いており、彼は話しかけてきたプレイヤーに対して「自分自身がハイソサエティ（上流社会）の一員である」と信じ込ませようとしてきます。</p>
<p>しかし、会話の選択肢（Perception 4以上）でその設定を追求すると、彼は自分がかつて<a href="crater-raiders.html" class="auto-link">クレーター・レイダー</a>の出身であることをあっさりと認めますが、今は以前のレイダーの生活よりもこの優雅な上流階級のライフスタイルをはるかに楽しんでいると語ります。</p>
<p>・「私のおふざけを？わかったわかった、降参だ。私は退屈しているただのレイダーだ。どうせ毎日放射能漬けの怪物どもと戦って生き延びてるんだ。少しくらい楽しんでも（真似事をして遊んでも）いいだろ？」</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                ゴルフ場エリアの手前にある、戦前のお金持ちが使っていたであろう「打ちっぱなし」のゴルフ練習場・コテージの跡地です。<br>WastelandersによるNPC実装以降、フリッツという変わったレイダーがここを自身の拠点として陣取っています。彼は普段クレーターのレイダー達が着ている特有のボロ布ではなく、戦前のゴルフウェアである「カントリーガール」の服を着こなし、上流階級の真似事をして遊んでいます。<br>どう見てもフェラル・グールだらけで危険極まりない環境のど真ん中のはずですが、彼自身はレイダー上がりで腕っぷしが強いためこの環境も特に気になっていないようです。ブラストゾーン（核）の範囲内になってしまった場合、防護スーツを着ていびきをかいて寝ている姿も確認できます。
            </div>
`;

// Replace infobox
let infoboxRegex = /<aside class="infobox">.*?<\/aside>/s;
content = content.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Whitespring driving range</h3><img src="images/note_extracted/whitespring-driving-range/img_main.png" alt="Whitespring driving range"><div class="infobox-row"><span class="infobox-label">種類</span><span>ゴルフ場施設（未マーク）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span>ホワイトスプリング敷地内</span></div><div class="infobox-row"><span class="infobox-label">住人</span><span><a href="fritz.html" class="auto-link">フリッツ</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

// Replace title
content = content.replace(/<h1>.*?<\/h1>/, "<h1>Whitespring driving range<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ホワイトスプリングのゴルフ練習場</span></h1>");

// Ensure standard footer
const titleMatcher = /<h1>.*?<\/h1>/s;
const splitContent = content.split(titleMatcher);
const preamble = splitContent[0] + (content.match(titleMatcher)[0] || '');

const beforeMain = content.split('<main class="content">')[0];
const headerBlockRegex = /<main class="content">.*?<h1>.*?<\/h1>/s;
const headerMatch = content.match(headerBlockRegex);
const headerHtml = headerMatch ? headerMatch[0] : '<main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="note_whitespring_driving_range" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>Whitespring driving range<br><span style="font-size:0.6em;color:#888;font-family:\'Noto Sans JP\',sans-serif;font-weight:normal;">ホワイトスプリングのゴルフ練習場</span></h1>';

const footerContent = `
            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/The_Whitespring_driving_range" target="_blank" rel="noopener">The Whitespring driving range</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p>
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
    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\u2665':'\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='note_whitespring_driving_range';const _n='Whitespring driving range';const _u='whitespring-driving-range.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class="comment-empty">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class="comment-item"><div class="comment-meta"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class="comment-body">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>
    <script src="article-common.js" defer></script>
</body>
</html>
`;

let finalHtml = beforeMain + headerHtml + newContent + footerContent;

finalHtml = finalHtml.replace(infoboxRegex, `<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Whitespring driving range</h3><img src="images/note_extracted/whitespring-driving-range/img_main.png" alt="Whitespring driving range"><div class="infobox-row"><span class="infobox-label">種類</span><span>ゴルフ場施設（未マーク）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span>ホワイトスプリング敷地内</span></div><div class="infobox-row"><span class="infobox-label">住人</span><span><a href="fritz.html" class="auto-link">フリッツ</a></span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>`);

finalHtml = finalHtml.replace(/<h1>.*?<\/h1>/, "<h1>Whitespring driving range<br><span style=\"font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;\">ホワイトスプリングのゴルフ練習場</span></h1>");

fs.writeFileSync('f:/Fallout/whitespring-driving-range.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ホワイトスプリングのゴルフ練習場（Whitespring driving range）
https://www.fallout-jp.com/whitespring-driving-range.html

概要

ホワイトスプリングのゴルフ場の端にある、かつての「打ちっぱなしエリア」。現在はフリッツが住み着いています。

---

💭 感想

Wastelanders以降、フリッツという変わったレイダーがここを陣取っています。彼は普段クレーターのレイダー達が着ているボロ布ではなく、戦前のゴルフウェアを着こなし上流階級の真似事をして遊んでいます。どう見てもフェラルだらけで危険極まりない環境ですが、気にしてないようです。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/whitespring-driving-range', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/whitespring-driving-range/post.md', postContent);

console.log('Done.');
