const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { JSDOM } = require('jsdom');

const badData = JSON.parse(fs.readFileSync('bad_images.json', 'utf8'));
const badHashes = new Set(badData.map(d => d.hash));

const rootDir = 'f:/Fallout';

function getHash(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
}

function processHtml(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    let modified = false;

    // 分類処理用
    const infoboxImg = document.querySelector('aside.infobox > img');
    const galleryDiv = document.querySelector('.gallery');
    
    let goodGalleryItems = [];
    let badGalleryItems = [];

    // ギャラリーの画像チェック
    if (galleryDiv) {
        const imgs = Array.from(galleryDiv.querySelectorAll('img'));
        for (const img of imgs) {
            let src = img.getAttribute('src');
            if (src && !src.startsWith('http')) {
                const localPath = path.join(rootDir, src);
                const hash = getHash(localPath);
                let targetElement = img.parentElement && img.parentElement.tagName === 'A' ? img.parentElement : img;
                if (hash && badHashes.has(hash)) {
                    badGalleryItems.push(targetElement);
                } else if (hash) {
                    goodGalleryItems.push(targetElement);
                }
            }
        }
    }

    // Infobox画像のチェック
    if (infoboxImg) {
        let infoboxSrc = infoboxImg.getAttribute('src');
        if (infoboxSrc && !infoboxSrc.startsWith('http')) {
            const localPath = path.join(rootDir, infoboxSrc);
            const hash = getHash(localPath);
            if (hash && badHashes.has(hash)) {
                // 交換が必要
                console.log(`[${path.basename(filePath)}] Bad infobox image found.`);
                if (goodGalleryItems.length > 0) {
                    const replacementTarget = goodGalleryItems.shift(); // 最初の良い画像（imgまたはaタグ）
                    const replacementImg = replacementTarget.tagName === 'IMG' ? replacementTarget : replacementTarget.querySelector('img');
                    infoboxImg.setAttribute('src', replacementImg.getAttribute('src'));
                    console.log(` -> Replaced with ${replacementImg.getAttribute('src')}`);
                    // ギャラリーからは削除する
                    replacementTarget.remove();
                    modified = true;
                } else {
                    // 代替画像がない場合はimgタグ自体を削除
                    infoboxImg.remove();
                    console.log(` -> Removed completely (no replacements available).`);
                    modified = true;
                }
            }
        }
    }

    // ギャラリーの不要画像を削除
    if (badGalleryItems.length > 0) {
        for (const a of badGalleryItems) {
            a.remove();
        }
        modified = true;
        console.log(`[${path.basename(filePath)}] Removed ${badGalleryItems.length} bad gallery images.`);
    }

    // 空になったギャラリーセクションの削除
    if (galleryDiv) {
        const remainingImg = galleryDiv.querySelectorAll('img');
        if (remainingImg.length === 0) {
            const prevH2 = galleryDiv.previousElementSibling;
            if (prevH2 && prevH2.tagName === 'H2' && prevH2.textContent.includes('ギャラリー')) {
                const prevHr = prevH2.previousElementSibling;
                if (prevHr && prevHr.tagName === 'HR') prevHr.remove();
                prevH2.remove();
            }
            galleryDiv.remove();
            console.log(`[${path.basename(filePath)}] Removed empty gallery section.`);
            modified = true;
        }
    }

    if (modified) {
        const outHtml = dom.serialize();
        fs.writeFileSync(filePath, outHtml, 'utf8');
    }
}

const files = fs.readdirSync(rootDir);
let count = 0;
for (const f of files) {
    if (f.endsWith('.html') && f !== 'admin.html' && f !== 'admin-drafts.html' && f !== 'lore.html' && f!== 'index.html') {
        const p = path.join(rootDir, f);
        processHtml(p);
        count++;
    }
}

console.log(`Processed ${count} HTML files.`);
