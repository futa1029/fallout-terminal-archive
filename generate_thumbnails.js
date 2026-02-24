/**
 * generate_thumbnails.js
 * 全記事HTMLからOG画像メタタグを読み取り、lore-thumbnails.json を生成するスクリプト。
 * 使い方: node generate_thumbnails.js
 */
const fs = require('fs');
const path = require('path');

const DIR = 'f:\\Fallout';
const OUTPUT = path.join(DIR, 'lore-thumbnails.json');

// HTMLファイルを走査してOG画像を抽出
function extractOgImage(htmlPath) {
    try {
        const content = fs.readFileSync(htmlPath, 'utf8');
        // og:image メタタグから画像URLを抽出
        const match = content.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
        if (match) {
            let url = match[1];
            // フルURLからローカル相対パスに変換
            // https://www.fallout-jp.com/images/... → images/...
            const localMatch = url.match(/fallout-jp\.com\/(.+)/);
            if (localMatch) {
                return localMatch[1];
            }
            // 既にローカルパスの場合
            if (!url.startsWith('http')) {
                return url;
            }
        }
        // OG画像がない場合、本文中の最初の画像を取得
        const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (imgMatch && !imgMatch[1].startsWith('http')) {
            return imgMatch[1];
        }
    } catch (e) {
        // 読み取りエラーは無視
    }
    return null;
}

function main() {
    const thumbnails = {};
    const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html') && f !== 'lore.html' && f !== 'index.html');

    files.forEach(file => {
        const filePath = path.join(DIR, file);
        const image = extractOgImage(filePath);
        if (image) {
            thumbnails[file] = image;
        }
    });

    fs.writeFileSync(OUTPUT, JSON.stringify(thumbnails, null, 2), 'utf8');
    console.log(`サムネイル情報を生成しました: ${Object.keys(thumbnails).length} 件 → ${OUTPUT}`);
}

main();
