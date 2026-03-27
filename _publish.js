#!/usr/bin/env node
// _publish.js - Draft記事を公開状態にし、リンクを動的管理するスクリプト
//
// 使い方:
//   node _publish.js <slug>              指定スラッグの記事を公開
//   node _publish.js --group <N>         グループN番を一括公開
//   node _publish.js --list              公開済みリストを表示
//   node _publish.js --status            全体の公開状況を表示
//
// 動作:
//   1. remove_duplicates.jsの該当エントリのstatusを "draft" → "published" に変更
//   2. 公開対象記事のHTML内部リンクを調査し、リンク先が公開済みでないものを無効化
//   3. 既に公開済みの記事から、新規公開記事へのリンクがあれば有効化
//   4. remove_duplicates.js を実行してインデックス再構築

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = 'F:/Fallout';
const RD_PATH = path.join(ROOT, 'remove_duplicates.js');
const GROUPS_PATH = path.join(ROOT, '_publish_groups.json');

// ヘルパー: manualEntriesから全エントリを抽出
function parseEntries() {
  const rd = fs.readFileSync(RD_PATH, 'utf8');
  const entries = [];
  const regex = /\{\s*name:\s*"([^"]+)",\s*yomi:\s*"([^"]*)",\s*url:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*appearance:\s*\[([^\]]*)\],\s*date:\s*"([^"]*)",\s*status:\s*"([^"]+)"\s*\}/g;
  let m;
  while ((m = regex.exec(rd)) !== null) {
    entries.push({ name: m[1], yomi: m[2], url: m[3], category: m[4], appearance: m[5], date: m[6], status: m[7] });
  }
  return entries;
}

// ヘルパー: 記事のstatusを変更
function updateStatus(slug, newStatus) {
  let rd = fs.readFileSync(RD_PATH, 'utf8');
  const url = slug.endsWith('.html') ? slug : slug + '.html';
  
  // url:"xxx.html" ... status: "draft" → status: "published"
  const pattern = new RegExp(`(url:\\s*"${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*status:\\s*")draft(")`);
  if (pattern.test(rd)) {
    rd = rd.replace(pattern, `$1${newStatus}$2`);
    fs.writeFileSync(RD_PATH, rd, 'utf8');
    return true;
  }
  return false;
}

// ヘルパー: HTML内の内部リンクを取得
function getInternalLinks(htmlPath) {
  if (!fs.existsSync(htmlPath)) return [];
  const html = fs.readFileSync(htmlPath, 'utf8');
  const links = new Set();
  const regex = /href="([a-z0-9_-]+\.html)"/g;
  let m;
  while ((m = regex.exec(html)) !== null) {
    if (m[1] !== 'lore.html' && m[1] !== 'index.html') {
      links.add(m[1]);
    }
  }
  return [...links];
}

// ヘルパー: 未公開記事へのリンクをテキスト化（リンク除去）
function disableUnpublishedLinks(htmlPath, publishedUrls) {
  if (!fs.existsSync(htmlPath)) return 0;
  let html = fs.readFileSync(htmlPath, 'utf8');
  let count = 0;
  
  // <a href="xxx.html">テキスト</a> → テキスト（未公開のものだけ）
  html = html.replace(/<a\s+href="([a-z0-9_-]+\.html)"([^>]*)>([^<]*)<\/a>/g, (match, href, attrs, text) => {
    if (href === 'lore.html' || href === 'index.html') return match;
    if (publishedUrls.has(href)) return match; // 公開済みならリンク維持
    count++;
    return text; // 未公開ならテキストのみに
  });
  
  if (count > 0) {
    fs.writeFileSync(htmlPath, html, 'utf8');
  }
  return count;
}

// ヘルパー: 新規公開記事へのリンクを有効にする（公開済み記事内）
function enableLinksTo(targetUrl, publishedUrls) {
  // 公開済み記事をスキャンし、targetUrlに該当するテキストがあればリンク化
  // ※これは将来的な拡張ポイント（現在のバッチ生成記事にはリンクテキストが少ないため）
  return 0;
}

// メイン処理
const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '--help') {
  console.log(`
📚 _publish.js - Draft記事 公開管理ツール

使い方:
  node _publish.js <slug>              スラッグ指定で1件公開
  node _publish.js <slug1> <slug2> ... 複数記事を一括公開
  node _publish.js --group <N>         グループN番を一括公開
  node _publish.js --list              公開済みリストを表示
  node _publish.js --status            全体の公開状況を表示
  node _publish.js --dry-run <slug>    実行せず確認のみ
`);
  process.exit(0);
}

if (args[0] === '--status') {
  const entries = parseEntries();
  const published = entries.filter(e => e.status === 'published');
  const draft = entries.filter(e => e.status === 'draft');
  console.log(`\n📊 公開状況`);
  console.log(`  公開済み: ${published.length}件`);
  console.log(`  Draft:    ${draft.length}件`);
  console.log(`  合計:     ${entries.length}件`);
  
  if (published.length > 0) {
    console.log(`\n最近の公開:`);
    published.slice(-10).forEach(e => console.log(`  ✅ ${e.name} (${e.url})`));
  }
  process.exit(0);
}

if (args[0] === '--list') {
  const entries = parseEntries();
  const published = entries.filter(e => e.status === 'published');
  console.log(`\n📋 公開済み記事 (${published.length}件)\n`);
  published.forEach(e => console.log(`  ✅ ${e.name} → ${e.url}`));
  process.exit(0);
}

// 公開対象スラッグの決定
let targetSlugs = [];
const isDryRun = args.includes('--dry-run');
const filteredArgs = args.filter(a => a !== '--dry-run');

if (filteredArgs[0] === '--group') {
  const groupNum = parseInt(filteredArgs[1]);
  if (!fs.existsSync(GROUPS_PATH)) {
    console.error('❌ _publish_groups.json が見つかりません。先に node _gen_publish_queue.js を実行してください。');
    process.exit(1);
  }
  const groups = JSON.parse(fs.readFileSync(GROUPS_PATH, 'utf8'));
  const group = groups.find(g => g.group === groupNum);
  if (!group) {
    console.error(`❌ グループ${groupNum}が見つかりません (1-${groups.length})`);
    process.exit(1);
  }
  targetSlugs = group.slugs;
  console.log(`\n📦 グループ${groupNum}: ${group.faction || group.type} (${targetSlugs.length}件)`);
} else {
  targetSlugs = filteredArgs.map(a => a.replace('.html', ''));
}

if (targetSlugs.length === 0) {
  console.error('❌ 公開する記事が指定されていません');
  process.exit(1);
}

// 現在の公開済みリスト取得
const entries = parseEntries();
const publishedUrls = new Set(entries.filter(e => e.status === 'published').map(e => e.url));

console.log(`\n🚀 ${targetSlugs.length}件の記事を公開します${isDryRun ? ' (DRY RUN)' : ''}\n`);

let published = 0, linksCleaned = 0;

for (const slug of targetSlugs) {
  const url = slug + '.html';
  const entry = entries.find(e => e.url === url);
  
  if (!entry) {
    console.log(`  ⚠️  ${slug} - エントリが見つかりません`);
    continue;
  }
  
  if (entry.status === 'published') {
    console.log(`  ⏭️  ${slug} - 既に公開済み`);
    continue;
  }
  
  const htmlPath = path.join(ROOT, url);
  if (!fs.existsSync(htmlPath)) {
    console.log(`  ⚠️  ${slug} - HTMLファイルが見つかりません`);
    continue;
  }
  
  // 今回公開するものも公開済みに含める
  publishedUrls.add(url);
  
  if (!isDryRun) {
    // 1. ステータス変更
    updateStatus(slug, 'published');
    
    // 2. 未公開記事へのリンクを無効化
    const cleaned = disableUnpublishedLinks(htmlPath, publishedUrls);
    linksCleaned += cleaned;
    
    console.log(`  ✅ ${entry.name} (${slug})${cleaned > 0 ? ` [${cleaned}リンク無効化]` : ''}`);
  } else {
    // DRY RUN: リンク状況のみ表示
    const links = getInternalLinks(htmlPath);
    const unpublished = links.filter(l => !publishedUrls.has(l));
    console.log(`  📝 ${entry.name} (${slug})`);
    if (unpublished.length > 0) {
      console.log(`     未公開リンク: ${unpublished.join(', ')}`);
    }
  }
  
  published++;
}

console.log(`\n${isDryRun ? '📝 DRY RUN完了' : '✅ 公開完了'}: ${published}件${linksCleaned > 0 ? `, ${linksCleaned}リンク無効化` : ''}`);

// ビルド実行（DRY RUN以外）
if (!isDryRun && published > 0) {
  console.log('\n🔄 ビルド中...');
  try {
    execSync('node remove_duplicates.js', { cwd: ROOT, stdio: 'pipe' });
    execSync('node generate_thumbnails.js', { cwd: ROOT, stdio: 'pipe' });
    console.log('✅ ビルド完了');
  } catch (e) {
    console.log('⚠️ ビルドエラー:', e.message);
  }
}
