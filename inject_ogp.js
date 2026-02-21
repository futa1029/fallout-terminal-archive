/**
 * inject_ogp.js
 * f:\Fallout 内の全HTMLファイルに Open Graph (OGP) メタタグを一括挿入するスクリプト。
 * 既にOGPタグが存在するファイルはスキップする。
 */
const fs = require('fs');
const path = require('path');

const DIR = 'f:\\Fallout';
const BASE_URL = 'https://www.fallout-jp.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-default.png`;

// 処理をスキップするファイル
const SKIP_FILES = ['lore.html', 'index.html', 'f76.html', 'nw.html', 'buds_full.html'];

/**
 * HTML内から最初の <img src="..."> を抽出する
 * @param {string} html
 * @returns {string|null}
 */
function extractFirstImage(html) {
    // bodyタグ以降から取得（headの画像を除外）
    const bodyMatch = html.match(/<body[\s\S]*?>([\s\S]*)/i);
    const body = bodyMatch ? bodyMatch[1] : html;
    const match = body.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (!match) return null;
    const src = match[1];
    // 相対パスを絶対URLに変換
    if (src.startsWith('http')) return src;
    // ./images/... → https://www.fallout-jp.com/images/...
    return `${BASE_URL}/${src.replace(/^\.\//, '')}`;
}

/**
 * titleタグからテキストを抽出する
 * @param {string} html
 * @returns {string}
 */
function extractTitle(html) {
    const match = html.match(/<title>([^<]+)<\/title>/i);
    return match ? match[1].trim() : 'Overseer Mohi\'s Terminal';
}

/**
 * 記事名（記事ファイル名の英語部分を除いたもの）を抽出する
 * 「アーマー・エース (Armor Ace) | Overseer Mohi's Terminal」
 * → 「アーマー・エース (Armor Ace) のFalloutロア記事。Overseer Mohi's Terminalで読む。」
 */
function buildDescription(fullTitle) {
    // "|" より前の記事名を取得
    const articleName = fullTitle.split('|')[0].trim();
    return `${articleName}のFalloutロア記事。Overseer Mohi's Terminalで読む。`;
}

/**
 * OGPタグのHTML文字列を生成する
 */
function buildOgpBlock(ogTitle, ogDesc, ogImage, ogUrl) {
    return `    <!-- Open Graph / Discord Embed -->
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Overseer Mohi's Terminal">
    <meta property="og:title" content="${ogTitle}">
    <meta property="og:description" content="${ogDesc}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:url" content="${ogUrl}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${ogTitle}">
    <meta name="twitter:description" content="${ogDesc}">
    <meta name="twitter:image" content="${ogImage}">`;
}

// 全HTMLファイルを処理
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html') && !SKIP_FILES.includes(f));

let injectedCount = 0;
let skippedCount = 0;

for (const file of files) {
    const filePath = path.join(DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // 既にOGPタグがある場合はスキップ
    if (html.includes('property="og:title"')) {
        skippedCount++;
        continue;
    }

    // 各種メタ情報を取得
    const fullTitle = extractTitle(html);
    const firstImage = extractFirstImage(html) || DEFAULT_OG_IMAGE;
    const ogUrl = `${BASE_URL}/${file}`;
    const ogDesc = buildDescription(fullTitle);
    const ogpBlock = buildOgpBlock(fullTitle, ogDesc, firstImage, ogUrl);

    // </title> の直後にOGPブロックを挿入
    const newHtml = html.replace(/(<\/title>)/i, `$1\n${ogpBlock}`);

    if (newHtml !== html) {
        fs.writeFileSync(filePath, newHtml, 'utf8');
        injectedCount++;
        console.log(`[OGP追加] ${file}`);
    }
}

console.log(`\n完了: ${injectedCount}件にOGPを追加、${skippedCount}件はスキップ（既存OGPあり）`);
