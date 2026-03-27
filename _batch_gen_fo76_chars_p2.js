// Phase 2: 汎用記事生成エンジン（114件一括）
const fs = require('fs');
const path = require('path');
const https = require('https');
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}
function getImageUrl(fn){return new Promise((resolve)=>{const url=`https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(fn)}&prop=imageinfo&iiprop=url&format=json`;https.get(url,{headers:{'User-Agent':'FalloutLoreArchive/1.0'}},(res)=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{const j=JSON.parse(d);const p=Object.values(j.query.pages)[0];resolve(p.imageinfo?.[0]?.url||null);}catch(e){resolve(null);}});}).on('error',()=>resolve(null));});}
function downloadImage(url,fp){return new Promise((resolve,reject)=>{fs.mkdirSync(path.dirname(fp),{recursive:true});const mod=url.startsWith('https')?https:require('http');mod.get(url,{headers:{'User-Agent':'Mozilla/5.0'}},(res)=>{if(res.statusCode>=300&&res.statusCode<400&&res.headers.location){downloadImage(res.headers.location,fp).then(resolve).catch(reject);return;}if(res.statusCode!==200){resolve(false);return;}const ws=fs.createWriteStream(fp);res.pipe(ws);ws.on('finish',()=>{ws.close();resolve(true);});ws.on('error',reject);}).on('error',reject);});}

const tmpl=fs.readFileSync('F:/Fallout/mole-miner.html','utf8');
const cssBlock=tmpl.substring(tmpl.indexOf('<style>'),tmpl.indexOf('</style>')+'</style>'.length);
const wikiData=JSON.parse(fs.readFileSync('F:/Fallout/_fo76_chars_wiki_data.json','utf8'));

function extractInfobox(wt){const m=wt.match(/\{\{Infobox character[\s\S]*?\n\}\}/i);if(!m)return{};const ib=m[0];const fields={};const fMatch=ib.matchAll(/\|(\w+)\s*=\s*([^\n|{}]*(?:\[\[[^\]]*\]\][^\n|{}]*)*)/g);for(const fm of fMatch){fields[fm[1].trim()]=fm[2].trim().replace(/\[\[([^\]|]*)\|([^\]]*)\]\]/g,'$2').replace(/\[\[([^\]]*)\]\]/g,'$1');}return fields;}
function extractBackground(wt){const m=wt.match(/==\s*(?:Background|Biography)\s*==\n([\s\S]*?)(?=\n==(?!=)|\n\{\{Navbox)/i);if(m)return m[1].trim();const m2=wt.match(/==\s*(?:Characteristics|Background)\s*==\n([\s\S]*?)(?=\n==\s*(?:Interactions|Notable|Inventory|Appearances))/i);return m2?m2[1].trim():'';}
function wikiToHtml(text){if(!text)return'';return text.replace(/'''([^']+)'''/g,'<b>$1</b>').replace(/''([^']+)''/g,'<i>$1</i>').replace(/\[\[([^\]|]*)\|([^\]]*)\]\]/g,'$2').replace(/\[\[([^\]]*)\]\]/g,'$1').replace(/\{\{[^}]*\}\}/g,'').replace(/<ref[^>]*>[\s\S]*?<\/ref>/g,'').replace(/<ref[^>]*\/>/g,'').replace(/\n\n+/g,'</p>\n<p>').replace(/^\*\s*/gm,'• ').trim();}
function slugify(name){return name.toLowerCase().replace(/\s+/g,'-').replace(/[()''""\.]/g,'').replace(/,/g,'').replace(/-+/g,'-').replace(/^-|-$/g,'');}

function genArticle(wikiName, slug, faction) {
  const data = wikiData[wikiName]; if (!data) return null;
  const ib = extractInfobox(data.wikitext);
  const bg = extractBackground(data.wikitext);
  const bodyHtml = wikiToHtml(bg);
  const displayName = ib.name || wikiName.replace(/ \(.+\)/, '');
  const location = ib.location || '';
  const role = ib.role || ib.title || '';
  const isDead = (data.wikitext.includes('|status') && data.wikitext.match(/\|status\s*=\s*(?:Dead|Deceased)/i)) || ib.status === 'Dead';
  const isMentioned = data.wikitext.includes('{{Icon|mentioned}}');
  const articleId = `note_${slug.replace(/-/g,'_')}`;
  const rows = [];
  if (faction) rows.push(['所属', faction]);
  if (role) rows.push(['役職', role]);
  if (location) rows.push(['場所', location]);
  if (isDead) rows.push(['状態', '死亡']);
  if (isMentioned) rows.push(['登場', '言及のみ']);
  rows.push(['登場作品', 'Fallout 76']);
  const rowsHtml = rows.map(r => `<div class="infobox-row"><span class="infobox-label">${r[0]}</span><span>${r[1]}</span></div>`).join('');
  let kanso = '';
  if (isDead) kanso = `アパラチアで命を落としたキャラクター。<br>遺された記録から、大戦後の過酷な日々が伝わってきます。`;
  else if (isMentioned) kanso = `ターミナルやホロテープでのみ語られる存在。<br>${faction}の歴史の一片を担うキャラクターです。`;
  else kanso = `${faction}に関わるキャラクター。<br>アパラチアの物語を彩る存在です。`;
  const body = bodyHtml ? `<h2>概要</h2>\n<p>${bodyHtml}</p>` : `<h2>概要</h2>\n<p><b>${displayName}</b>は、${faction}に関連するキャラクター。</p>`;
  return `<!DOCTYPE html>\n<html lang="ja">\n<head>\n    <meta charset="UTF-8"><title>${displayName} | Overseer Mohi's Terminal</title><link rel="canonical" href="https://www.fallout-jp.com/${slug}.html"><meta property="og:type" content="article"><meta property="og:site_name" content="Overseer Mohi's Terminal"><meta property="og:locale" content="ja_JP"><meta property="og:title" content="${displayName} | Overseer Mohi's Terminal"><meta property="og:description" content="${displayName} — Fallout 76"><meta property="og:url" content="https://www.fallout-jp.com/${slug}.html"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@IwamotoFuta"><script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">\n${cssBlock}\n</head>\n<body data-article-category="人物" data-article-appearance="Fallout 76">\n    <div class="container">\n        <aside class="infobox"><h3 style="margin-top:0;text-align:center;">${displayName}</h3><img src="images/note_extracted/${slug}/img_main.png" alt="${displayName}">${rowsHtml}</aside>\n        <main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="${articleId}" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>${displayName}</h1>\n            ${body}\n<div class="quote-box"><b>感想</b><br><br>${kanso}</div>\n            <div style="margin-top:30px;border-top:1px dashed var(--accent-color);padding-top:20px;font-size:0.85em;color:#888;"><p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/${encodeURIComponent(wikiName)}" target="_blank" rel="noopener">${displayName}</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia</a>.<br>Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.</p><p style="margin-top:15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color:var(--accent-color);">寄付を受け付けております</a>。</p></div>\n            <div class="comments-section"><h2 class="comments-title">&gt; COMMENTS_</h2><div class="comment-form"><textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力..." oninput="updateCharCount()"></textarea><div class="comment-form-footer"><span class="char-count"><span id="char-count">0</span>/100</span><button class="comment-submit-btn" onclick="submitComment()">SUBMIT &gt;</button></div><div id="comment-msg" class="comment-msg"></div></div><div id="comments-list"></div></div>\n        </main>\n    </div>\n    <div class="lightbox-overlay" id="lightbox" onclick="this.classList.remove('active')"><img id="lightbox-img" src="" alt=""></div>\n    <script>const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);async function toggleLike(b){const a=b.getAttribute('data-article-id');let l=localStorage.getItem(a+'_liked')==='true';b.disabled=true;if(l){const{data}=await supabaseClient.rpc('decrement_like',{article_id_param:a});localStorage.setItem(a+'_liked','false');uLB(b,false,data);}else{const{data}=await supabaseClient.rpc('increment_like',{article_id_param:a});localStorage.setItem(a+'_liked','true');uLB(b,true,data);}b.disabled=false;}function uLB(b,l,c){b.querySelector('.heart').textContent=l?'\\u2665':'\\u2661';l?b.classList.add('liked'):b.classList.remove('liked');b.querySelector('.like-count').textContent=c;}document.addEventListener('DOMContentLoaded',async()=>{const b=document.querySelector('.like-button');if(b){const a=b.getAttribute('data-article-id');const{data}=await supabaseClient.from('likes').select('like_count').eq('article_id',a).single();uLB(b,localStorage.getItem(a+'_liked')==='true',data?data.like_count:0);}document.querySelectorAll('.content img,.infobox img').forEach(i=>{i.onclick=e=>{e.stopPropagation();document.getElementById('lightbox-img').src=i.src;document.getElementById('lightbox').classList.add('active');};});const _a='${articleId}';const _n='${displayName.replace(/'/g,"\\'")}';const _u='${slug}.html';function uc(){document.getElementById('char-count').textContent=document.getElementById('comment-input').value.length;}async function lc(){const{data}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_a).order('created_at',{ascending:false}).limit(50);const l=document.getElementById('comments-list');if(!data||!data.length){l.innerHTML='<div class=\"comment-empty\">まだコメントがありません。</div>';return;}l.innerHTML=data.map(c=>'<div class=\"comment-item\"><div class=\"comment-meta\"><span>'+new Date(c.created_at).toLocaleDateString('ja-JP')+'</span></div><div class=\"comment-body\">'+c.content.replace(/</g,'&lt;')+'</div></div>').join('');}window.updateCharCount=uc;window.submitComment=async function(){const i=document.getElementById('comment-input');const v=i.value.trim();if(!v||v.length>100)return;await supabaseClient.from('comments').insert({article_id:_a,article_name:_n,article_url:_u,content:v});i.value='';uc();lc();};lc();});</script>\n    <script src="article-common.js" defer></script>\n</body>\n</html>`;
}

const batch = [
  ...['Ae-Ri','Aldridge','Axel (Wastelanders)','Barb (Wastelanders)','Blackeye','Bruiser (Wastelanders)','Deathklaus','Fishbones','Caleb Fisher','Creed','Former raider','Gail','Glenn','Gnash','Hal Gleeson','Hijack','Johnny Weston','Kiyomi','Kogan','Lev','Lucky Lou','Maximum Maddie','Meg Groberg','Molly (Wastelanders)','Mortimer (Wastelanders)','Munch','Nuclear Don','Ra-Ra','Raf','Registration guard','Rocksy','Ronny (Wastelanders)','Sargento','Surge','Weasel','Wren (raider)'].map(n=>({wikiName:n,faction:'レイダー（クレーター）'})),
  ...['Aubrie Willem','Davie Taylor','Derrick Taylor','Elsie Taylor','Fred Radcliff','Gate guard','Jen','Mochou','Paige','Penelope Hornwright','Samuel (Wastelanders)','Sunny (Wastelanders)','Thompson (Wastelanders)','Ward (Wastelanders)'].map(n=>({wikiName:n,faction:'入植者（ファウンデーション）'})),
  ...['Derek Garrison','Chase Terrier','Mercedes Stern','Maggie Stern','Reginald Stone','Secret Service agent','Cole Carver'].map(n=>({wikiName:n,faction:'シークレットサービス'})),
  ...['Bessie (Wastelanders)','Cherise','Crane (Wastelanders)','Jide','Mordecai McCoy','Patron (The Wayward)','Polly (Wastelanders)','Smiley (Wastelanders)'].map(n=>({wikiName:n,faction:'ウェイワード'})),
  ...['Aries','Carver Timmerman','Eugenie','Kieran Kennedy','Libby Wen','Rudy Fernandez','Vinny Costa'].map(n=>({wikiName:n,faction:'ブルーリッジ・キャラバン'})),
  ...['Batter','Davey (Wastelanders)','Jacky (Wastelanders)','Roper'].map(n=>({wikiName:n,faction:'フリー・ラジカルズ'})),
  ...['Daniel (Wastelanders)','Hannah (Wastelanders)','Murray (Wastelanders)','Ursala','Xavier'].map(n=>({wikiName:n,faction:'アンカー農場'})),
  ...['The Blood','The Eye','Frank the Butcher','Jessi the Hook','Star'].map(n=>({wikiName:n,faction:'ブラッドイーグルズ'})),
  ...['Alexis','Aloe','Antoine','Bubbles','Carolyn','Clarice','Cunningham (Fallout 76)','Cynthia','Doc Stanley','Flauresca','Flintlock','Friedrich','Helena (Fallout 76)','Lotus','Margaret (Fallout 76)','Marie (Fallout 76)','Pendleton','Robert (Whitespring)','Stratford','Tannin','Tweed','Vera (Fallout 76)','The Whitespring Station vendor','Brotherhood vendor','Free States vendor','Raiders vendor','Responders vendor','Shopping mall vendor'].map(n=>({wikiName:n,faction:'ホワイトスプリング・リゾート'})),
];

async function main(){
  let success=0;
  for(const c of batch){
    const slug=slugify(c.wikiName);
    console.log(`📄 ${c.wikiName} → ${slug}`);
    const html=genArticle(c.wikiName,slug,c.faction);
    if(!html){console.log('  ❌');continue;}
    const imgDir=`F:/Fallout/images/note_extracted/${slug}`;
    fs.mkdirSync(imgDir,{recursive:true});
    const data=wikiData[c.wikiName];
    let imgFile=null;
    if(data){const m=data.wikitext.match(/\|image\s*=\s*([^\n|{}]+)/);if(m)imgFile=m[1].trim().replace(/ /g,'_');if(!imgFile)imgFile=data.images.find(img=>!img.includes('Icon_')&&!img.includes('Gametitle')&&!img.includes('Bugintro')&&!img.includes('Mbox_')&&!img.includes('icon'));}
    if(imgFile){await sleep(150);const url=await getImageUrl(imgFile);if(url){await downloadImage(url,path.join(imgDir,'img_main.png'));}}
    fs.writeFileSync(`F:/Fallout/${slug}.html`,html,'utf8');
    const xDir=`F:/Fallout/_X/${slug}`;fs.mkdirSync(`${xDir}/images`,{recursive:true});
    const mi=path.join(imgDir,'img_main.png');if(fs.existsSync(mi))fs.copyFileSync(mi,`${xDir}/images/1.png`);
    const dn=(extractInfobox(data.wikitext).name||c.wikiName.replace(/ \(.+\)/,'')).replace(/'/g,'');
    fs.writeFileSync(`${xDir}/post.md`,`#Fallout76\n\n${dn}\nhttps://www.fallout-jp.com/${slug}.html\n\n${c.faction}\n\n---\nCC BY-SA\n`,'utf8');
    success++;
  }
  console.log(`\n✅ Phase2完了: ${success}/${batch.length}件`);
}
main().catch(e=>console.error(e));
