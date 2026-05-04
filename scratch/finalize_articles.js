const fs = require('fs');

// --- brotherhood-of-steel.html ---
let bosHtml = fs.readFileSync('f:/Fallout/brotherhood-of-steel.html', 'utf8');

// 1. Update Liberty Prime caption
const primeOld = `<img src="images/note_extracted/brotherhood-base/FO4-Liberty-prime-kills-behemoth.png" class="article-image" alt="リバティ・プライム起動" onerror="this.onerror=null; this.src='images/placeholder.jpg';">
            <div class="note-figcaption">連邦で再起動した巨大最終兵器リバティ・プライム</div>`;
const primeNew = `<img src="images/note_extracted/brotherhood-base/FO4-Liberty-prime-kills-behemoth.png" class="article-image" alt="リバティ・プライム vs ベヒモス" onerror="this.onerror=null; this.src='images/placeholder.jpg';">
            <div class="note-figcaption">連邦で再起動し、スーパーミュータント・ベヒモスを粉砕する巨大最終兵器リバティ・プライム</div>`;

if (bosHtml.includes(primeOld.replace(/\n/g, '\r\n')) || bosHtml.includes(primeOld.replace(/\r\n/g, '\n'))) {
    bosHtml = bosHtml.replace(primeOld.replace(/\n/g, '\r\n'), primeNew.replace(/\n/g, '\r\n'));
    bosHtml = bosHtml.replace(primeOld.replace(/\r\n/g, '\n'), primeNew.replace(/\r\n/g, '\n'));
} else {
    // Try fuzzy match or direct replacement
    bosHtml = bosHtml.replace(/<img src="images\/note_extracted\/brotherhood-base\/FO4-Liberty-prime-kills-behemoth\.png".*?>\s*<div class="note-figcaption">連邦で再起動した巨大最終兵器リバティ・プライム<\/div>/s, primeNew);
}

// 2. Replace Gallery
const gallerySnippet = fs.readFileSync('f:/Fallout/scratch/gallery_snippet.html', 'utf8');
const galleryStart = /<h3 style="margin-top: 30px; border-left: 5px solid var\(--accent-color\); padding-left: 10px;">Fallout 1 & 2<\/h3>/s;
const galleryEnd = /<\/div>\s*<\/main>/s; // Find the end of gallery before main ends

// Actually, let's find the specific block
const oldGalleryBlock = bosHtml.match(/<h3 style="margin-top: 30px; border-left: 5px solid var\(--accent-color\); padding-left: 10px;">Fallout 1 & 2<\/h3>.*?<\/div>\s*<\/div>\s*<\/main>/s);

if (oldGalleryBlock) {
    bosHtml = bosHtml.replace(oldGalleryBlock[0], gallerySnippet + '\n            </div>\n        </main>');
} else {
    // Try alternative match
    bosHtml = bosHtml.replace(/<div class="gallery-grid">.*?<\/div>\s*<\/main>/s, gallerySnippet + '\n            </div>\n        </main>');
}

fs.writeFileSync('f:/Fallout/brotherhood-of-steel.html', bosHtml, 'utf8');
console.log('Updated brotherhood-of-steel.html');

// --- madison-li.html ---
let liHtml = fs.readFileSync('f:/Fallout/madison-li.html', 'utf8');
const primeImg = `<img src="images/note_extracted/brotherhood-base/Prime.jpg" class="article-image left" alt="要塞で修復されるリバティ・プライム" onerror="this.src='images/placeholder.jpg'">\n            `;
const targetParagraph = `<p name="251ea72e-8e56-4f59-b225-ce76d06901ac" id="251ea72e-8e56-4f59-b225-ce76d06901ac">`;

if (liHtml.includes(targetParagraph) && !liHtml.includes('Prime.jpg')) {
    liHtml = liHtml.replace(targetParagraph, primeImg + targetParagraph);
}

fs.writeFileSync('f:/Fallout/madison-li.html', liHtml, 'utf8');
console.log('Updated madison-li.html');
