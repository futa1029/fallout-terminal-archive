// Phase 2Bバッチ1の記事情報を取得
const fs = require('fs');
const slugs = ['amp','art-knapp','ava-rose','axel-wastelanders','billy-harpers-ferry','biv','blackeye','blake-saunders'];
for (const slug of slugs) {
  const html = fs.readFileSync('f:/Fallout/' + slug + '.html', 'utf8');
  // タイトル取得
  const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g,'') : 'NO TITLE';
  // data-wiki取得
  const wikiMatch = html.match(/data-wiki="([^"]*)"/);
  const wiki = wikiMatch ? wikiMatch[1] : 'NONE';
  // copyright link取得
  const copyrightMatch = html.match(/class="copyright"[^>]*>[\s\S]*?<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/);
  const wikiUrl = copyrightMatch ? copyrightMatch[1] : 'NONE';
  const wikiTitle = copyrightMatch ? copyrightMatch[2] : 'NONE';
  // 既存日本語テキスト確認
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : '';
  const cleaned = body.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'');
  const text = cleaned.replace(/<[^>]+>/g,'').replace(/&[a-z]+;/g,' ');
  const jpn = (text.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/g) || []).length;
  console.log(`${slug} | ${title} | wiki: ${wiki} | url: ${wikiUrl} | wikiTitle: ${wikiTitle} | jpn: ${jpn}`);
}
