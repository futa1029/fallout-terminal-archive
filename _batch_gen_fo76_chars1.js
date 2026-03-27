// FO76キャラクター記事一括生成 バッチ1（B.O.S.+Enclave+Free States = 46件）
const fs = require('fs');
const path = require('path');
const https = require('https');

function sleep(ms){return new Promise(r=>setTimeout(r,ms));}
function getImageUrl(fn){return new Promise((resolve)=>{const url=`https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(fn)}&prop=imageinfo&iiprop=url&format=json`;https.get(url,{headers:{'User-Agent':'FalloutLoreArchive/1.0'}},(res)=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{const j=JSON.parse(d);const p=Object.values(j.query.pages)[0];resolve(p.imageinfo?.[0]?.url||null);}catch(e){resolve(null);}});}).on('error',()=>resolve(null));});}
function downloadImage(url,fp){return new Promise((resolve,reject)=>{fs.mkdirSync(path.dirname(fp),{recursive:true});const mod=url.startsWith('https')?https:require('http');mod.get(url,{headers:{'User-Agent':'Mozilla/5.0'}},(res)=>{if(res.statusCode>=300&&res.statusCode<400&&res.headers.location){downloadImage(res.headers.location,fp).then(resolve).catch(reject);return;}if(res.statusCode!==200){resolve(false);return;}const ws=fs.createWriteStream(fp);res.pipe(ws);ws.on('finish',()=>{ws.close();resolve(true);});ws.on('error',reject);}).on('error',reject);});}

const tmpl=fs.readFileSync('F:/Fallout/mole-miner.html','utf8');
const cssBlock=tmpl.substring(tmpl.indexOf('<style>'),tmpl.indexOf('</style>')+'</style>'.length);
const wikiData=JSON.parse(fs.readFileSync('F:/Fallout/_fo76_chars_wiki_data.json','utf8'));

// Wikitext解析ヘルパー
function extractInfobox(wt) {
  const m = wt.match(/\{\{Infobox character[\s\S]*?\n\}\}/i);
  if (!m) return {};
  const ib = m[0];
  const fields = {};
  const fMatch = ib.matchAll(/\|(\w+)\s*=\s*([^\n|{}]*(?:\[\[[^\]]*\]\][^\n|{}]*)*)/g);
  for (const fm of fMatch) {
    fields[fm[1].trim()] = fm[2].trim().replace(/\[\[([^\]|]*)\|([^\]]*)\]\]/g, '$2').replace(/\[\[([^\]]*)\]\]/g, '$1');
  }
  return fields;
}

function extractBackground(wt) {
  // Background/Biography セクション抽出
  const bgMatch = wt.match(/==\s*(?:Background|Biography)\s*==\n([\s\S]*?)(?=\n==(?!=)|\n\{\{Navbox)/i);
  if (bgMatch) return bgMatch[1].trim();
  // Interactions セクション前まで
  const intMatch = wt.match(/==\s*(?:Characteristics|Background)\s*==\n([\s\S]*?)(?=\n==\s*(?:Interactions|Notable|Inventory|Appearances))/i);
  if (intMatch) return intMatch[1].trim();
  return '';
}

function wikiToHtml(text) {
  if (!text) return '';
  return text
    .replace(/'''([^']+)'''/g, '<b>$1</b>')
    .replace(/''([^']+)''/g, '<i>$1</i>')
    .replace(/\[\[([^\]|]*)\|([^\]]*)\]\]/g, '$2')
    .replace(/\[\[([^\]]*)\]\]/g, '$1')
    .replace(/\{\{[^}]*\}\}/g, '')
    .replace(/<ref[^>]*>[\s\S]*?<\/ref>/g, '')
    .replace(/<ref[^>]*\/>/g, '')
    .replace(/\n\n+/g, '</p>\n<p>')
    .replace(/^\*\s*/gm, '• ')
    .trim();
}

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g,'-').replace(/[()''""\.]/g,'').replace(/,/g,'').replace(/-+/g,'-').replace(/^-|-$/g,'');
}

// 翻訳辞書
const dict = {
  'Brotherhood of Steel': 'ブラザーフッド・オブ・スティール',
  'Enclave': 'エンクレイヴ',
  'Free States': 'フリー・ステイツ',
  'Responders': 'レスポンダーズ',
  'Raiders': 'レイダーズ',
  'Scorched': 'スコーチ',
  'Scorchbeast': 'スコーチビースト',
  'Great War': '大戦',
  'Appalachia': 'アパラチア',
  'Vault': 'Vault',
  'Paladin': 'パラディン',
  'Knight': 'ナイト',
  'Scribe': 'スクライブ',
  'Elder': 'エルダー',
  'Squire': 'スクワイア',
  'Watoga': 'ワトガ',
  'Charleston': 'チャールストン',
  'Morgantown': 'モーガンタウン',
  'Harpers Ferry': 'ハーパーズ・フェリー',
  'Whitespring': 'ホワイトスプリング',
  'Senator': '上院議員',
  'General': '将軍',
  'President': '大統領',
  'Major': '少佐',
  'Captain': '大尉',
  'Sergeant': '軍曹',
  'Agent': 'エージェント',
  'mentioned': '言及のみ',
};

function genArticle(wikiName, slug, faction) {
  const data = wikiData[wikiName];
  if (!data) return null;
  
  const ib = extractInfobox(data.wikitext);
  const bg = extractBackground(data.wikitext);
  const bodyHtml = wikiToHtml(bg);
  
  const displayName = ib.name || wikiName.replace(/ \(.+\)/, '');
  const race = ib.race || 'ヒューマン';
  const gender = ib.gender || '';
  const location = ib.location || '';
  const affiliation = ib.affiliation || faction;
  const role = ib.role || ib.title || '';
  
  const isDead = data.wikitext.includes('{{Icon|dead}}') || data.wikitext.includes('|dead') || ib.status === 'Dead';
  const isMentioned = data.wikitext.includes('{{Icon|mentioned}}');
  
  const articleId = `note_${slug.replace(/-/g,'_')}`;
  
  // Infobox行
  const rows = [];
  if (faction) rows.push(['所属', faction]);
  if (role) rows.push(['役職', role]);
  if (location) rows.push(['場所', location]);
  if (isDead) rows.push(['状態', '死亡']);
  if (isMentioned) rows.push(['登場', '言及のみ']);
  rows.push(['登場作品', 'Fallout 76']);
  
  const rowsHtml = rows.map(r => `<div class="infobox-row"><span class="infobox-label">${r[0]}</span><span>${r[1]}</span></div>`).join('');

  // 感想生成
  let kanso = '';
  if (isDead && !isMentioned) kanso = `アパラチアの荒野で命を落としたキャラクター。<br>遺された記録やホロテープから、大戦後の混乱期を必死に生き抜いた姿が浮かび上がります。`;
  else if (isMentioned) kanso = `ホロテープやターミナルの記録でのみ語られるキャラクター。<br>直接会うことはできませんが、${faction}の歴史の一部として重要な役割を果たしています。`;
  else kanso = `${faction}に所属するキャラクター。<br>アパラチアの物語に彩りを添える存在です。`;

  const body = bodyHtml ? `<h2>概要</h2>\n<p>${bodyHtml}</p>` : `<h2>概要</h2>\n<p><b>${displayName}</b>は、${faction}に関連するキャラクターで、Fallout 76に登場する。</p>`;

  return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8"><title>${displayName} | Overseer Mohi's Terminal</title><link rel="canonical" href="https://www.fallout-jp.com/${slug}.html"><meta property="og:type" content="article"><meta property="og:site_name" content="Overseer Mohi's Terminal"><meta property="og:locale" content="ja_JP"><meta property="og:title" content="${displayName} | Overseer Mohi's Terminal"><meta property="og:description" content="${displayName} — Fallout 76"><meta property="og:url" content="https://www.fallout-jp.com/${slug}.html"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@IwamotoFuta"><script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
${cssBlock}
</head>
<body data-article-category="人物" data-article-appearance="Fallout 76">
    <div class="container">
        <aside class="infobox"><h3 style="margin-top:0;text-align:center;">${displayName}</h3><img src="images/note_extracted/${slug}/img_main.png" alt="${displayName}">${rowsHtml}</aside>
        <main class="content">
            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="${articleId}" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>
            <h1>${displayName}</h1>
            ${body}
<div class="quote-box"><b>感想</b><br><br>${kanso}</div>
            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/${encodeURIComponent(wikiName)}" target="_blank" rel="noopener">${displayName}</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
                <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
            </div>
            <div class="comments-section"><h2 class="comments-title">&gt; COMMENTS_</h2><div class="comment-form"><textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力..." oninput="updateCharCount()"></textarea><div class="comment-form-footer"><span class="char-count"><span id="char-count">0</span>/100</span><button class="comment-submit-btn" onclick="submitComment()">SUBMIT &gt;</button></div><div id="comment-msg" class="comment-msg"></div></div><div id="comments-list"></div></div>
        </main>
    </div>
    <div class="lightbox-overlay" id="lightbox" onclick="this.classList.remove('active')"><img id="lightbox-img" src="" alt=""></div>
    <script>
        const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);
        async function toggleLike(btn){const articleId=btn.getAttribute('data-article-id');let isLiked=localStorage.getItem(articleId+'_liked')==='true';btn.disabled=true;if(isLiked){isLiked=false;const{data,error}=await supabaseClient.rpc('decrement_like',{article_id_param:articleId});if(!error){localStorage.setItem(articleId+'_liked',isLiked);updateLikeButton(btn,isLiked,data);}}else{isLiked=true;const{data,error}=await supabaseClient.rpc('increment_like',{article_id_param:articleId});if(!error){localStorage.setItem(articleId+'_liked',isLiked);updateLikeButton(btn,isLiked,data);}}btn.disabled=false;}
        function updateLikeButton(btn,isLiked,count){const heart=btn.querySelector('.heart');const countSpan=btn.querySelector('.like-count');if(isLiked){btn.classList.add('liked');heart.textContent='\\u2665';}else{btn.classList.remove('liked');heart.textContent='\\u2661';}countSpan.textContent=count;}
        document.addEventListener('DOMContentLoaded',async()=>{const btn=document.querySelector('.like-button');if(btn){const articleId=btn.getAttribute('data-article-id');const isLiked=localStorage.getItem(articleId+'_liked')==='true';const{data,error}=await supabaseClient.from('likes').select('like_count').eq('article_id',articleId).single();let count=0;if(!error&&data)count=data.like_count;updateLikeButton(btn,isLiked,count);}document.querySelectorAll('.content img, .infobox img, .gallery-item img').forEach(img=>{img.addEventListener('click',(e)=>{e.stopPropagation();document.getElementById('lightbox-img').src=img.src;document.getElementById('lightbox').classList.add('active');});});});
        const _commentArticleId='${articleId}';const _commentArticleName='${displayName.replace(/'/g,"\\'")}';const _commentArticleUrl='${slug}.html';
        const ADMIN_TOKEN_KEY='fallout_admin_token';const ADMIN_PASSWORD='tq7jtq7j';const RATE_LIMIT_KEY='comment_last_posted';const RATE_LIMIT_SEC=60;let _isAdminMode=false;
        function updateCharCount(){const len=document.getElementById('comment-input').value.length;const el=document.getElementById('char-count');if(el){el.textContent=len;el.style.color=len>90?'#ff6b6b':'var(--accent-color)';}}
        function relativeTime(s){const d=(Date.now()-new Date(s).getTime())/1000;if(d<60)return'\\u305f\\u3063\\u305f\\u4eca';if(d<3600)return Math.floor(d/60)+'\\u5206\\u524d';if(d<86400)return Math.floor(d/3600)+'\\u6642\\u9593\\u524d';if(d<86400*7)return Math.floor(d/86400)+'\\u65e5\\u524d';return new Date(s).toLocaleDateString('ja-JP');}
        function escapeHtml(str){return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
        function renderComments(comments){const list=document.getElementById('comments-list');if(!list)return;if(!comments||comments.length===0){list.innerHTML='<div class="comment-empty">\\u307e\\u3060\\u30b3\\u30e1\\u30f3\\u30c8\\u304c\\u3042\\u308a\\u307e\\u305b\\u3093\\u3002</div>';return;}list.innerHTML=comments.map(c=>'<div class="comment-item" data-id="'+c.id+'"><div class="comment-meta"><span class="comment-time">'+relativeTime(c.created_at)+'</span>'+((_isAdminMode)?'<button class="comment-delete-btn" onclick="deleteComment(\\''+c.id+'\\')">\\ud83d\\uddd1</button>':'')+'</div><div class="comment-body">'+escapeHtml(c.content)+'</div></div>').join('');}
        async function loadComments(){const list=document.getElementById('comments-list');if(!list)return;const{data,error}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_commentArticleId).order('created_at',{ascending:false}).limit(50);if(error){list.innerHTML='<div class="comment-empty">\\u30b3\\u30e1\\u30f3\\u30c8\\u3092\\u8aad\\u307f\\u8fbc\\u3081\\u307e\\u305b\\u3093\\u3067\\u3057\\u305f\\u3002</div>';return;}renderComments(data||[]);}
        async function submitComment(){const input=document.getElementById('comment-input');const content=input?input.value.trim():'';if(!content)return;if(content.length>100)return;const lastPosted=parseInt(localStorage.getItem(RATE_LIMIT_KEY)||'0');const now=Date.now();if(now-lastPosted<RATE_LIMIT_SEC*1000)return;const btn=document.querySelector('.comment-submit-btn');if(btn)btn.disabled=true;const{error}=await supabaseClient.from('comments').insert({article_id:_commentArticleId,article_name:_commentArticleName,article_url:_commentArticleUrl,content:content});if(btn)btn.disabled=false;if(!error){localStorage.setItem(RATE_LIMIT_KEY,now.toString());input.value='';updateCharCount();await loadComments();}}
        async function deleteComment(commentId){if(!_isAdminMode)return;if(!confirm('Delete?'))return;await supabaseClient.rpc('delete_comment_admin',{comment_id:commentId,admin_token:localStorage.getItem(ADMIN_TOKEN_KEY)||''});await loadComments();}
        document.addEventListener('keydown',(e)=>{if(e.ctrlKey&&e.shiftKey&&e.key==='D'){e.preventDefault();if(_isAdminMode){_isAdminMode=false;localStorage.removeItem(ADMIN_TOKEN_KEY);loadComments();return;}const pw=prompt('Password:');if(pw===ADMIN_PASSWORD){_isAdminMode=true;localStorage.setItem(ADMIN_TOKEN_KEY,pw);loadComments();}}});
        document.addEventListener('DOMContentLoaded',()=>{loadComments();});
    </script>
    <script src="article-common.js" defer></script>
</body>
</html>`;
}

// 対象キャラクターリスト
const batch = [
  // B.O.S. (13)
  ...['Elizabeth Taggerdy','Kerry (Brotherhood)','Esposito','Gary Weber','Grant McNamara','Hailey Takano','Hannah de Silva','Johnny Moreno','Roger Maxson','Swafford (Brotherhood)','Ted Wilson','Tex Rogers','Vendor bot Phoenix'].map(n=>({wikiName:n,faction:'ブラザーフッド・オブ・スティール'})),
  // Enclave (11)
  ...['Donnelley','Ellen Santiago','Jefferson Grey','MODUS armory terminal','MODUS medical terminal','MODUS production terminal','MODUS science terminal','N. Jackson','Ragnarsdottir','Thomas Eckhart','T. Harper'].map(n=>({wikiName:n,faction:'エンクレイヴ'})),
  // Free States (22)
  ...['Abigayle Singh','Cedric','Caleb Carson','Courtney Kelly','Duncan McKann','Ella Ames','Hardball','Jacob Lerner','Jacqueline Murphy','Jesus Sunday','Juan Diego Sunday','Kendyll Sims','Kora','Lucy Harwick','Nari Samir','Niraj Singh','Raleigh Clay','Randy Calloway','Rover','Sam Blackwell','Sara Samir','Vendor bot Wallace'].map(n=>({wikiName:n,faction:'フリー・ステイツ'})),
];

async function main() {
  let success = 0, fail = 0;
  for (const c of batch) {
    const slug = slugify(c.wikiName);
    console.log(`\n📄 ${c.wikiName} → ${slug}`);
    
    const html = genArticle(c.wikiName, slug, c.faction);
    if (!html) { console.log('  ❌ HTML生成失敗'); fail++; continue; }
    
    // 画像取得
    const imgDir = `F:/Fallout/images/note_extracted/${slug}`;
    fs.mkdirSync(imgDir, { recursive: true });
    const data = wikiData[c.wikiName];
    let imgFile = null;
    if (data) {
      const m = data.wikitext.match(/\|image\s*=\s*([^\n|{}]+)/);
      if (m) imgFile = m[1].trim().replace(/ /g, '_');
      if (!imgFile) {
        imgFile = data.images.find(img => !img.includes('Icon_') && !img.includes('Gametitle') && !img.includes('Bugintro') && !img.includes('Mbox_') && !img.includes('icon'));
      }
    }
    if (imgFile) {
      await sleep(200);
      const url = await getImageUrl(imgFile);
      if (url) { await downloadImage(url, path.join(imgDir, 'img_main.png')); console.log(`  ✅ 画像`); }
      else console.log(`  ⚠️ 画像DL失敗`);
    }
    
    // HTML保存
    fs.writeFileSync(`F:/Fallout/${slug}.html`, html, 'utf8');
    console.log(`  ✅ HTML`);
    
    // X素材
    const xDir = `F:/Fallout/_X/${slug}`;
    fs.mkdirSync(`${xDir}/images`, { recursive: true });
    const mainImg = path.join(imgDir, 'img_main.png');
    if (fs.existsSync(mainImg)) fs.copyFileSync(mainImg, `${xDir}/images/1.png`);
    const displayName = extractInfobox(data.wikitext).name || c.wikiName.replace(/ \(.+\)/, '');
    fs.writeFileSync(`${xDir}/post.md`, `#Fallout76\n\n${displayName}\nhttps://www.fallout-jp.com/${slug}.html\n\n${c.faction}のキャラクター\n\n---\nCC BY-SA\n`, 'utf8');
    console.log(`  ✅ X素材`);
    success++;
  }
  console.log(`\n✅ バッチ1完了: 成功${success}件, 失敗${fail}件`);
}
main().catch(e => console.error('エラー:', e));
