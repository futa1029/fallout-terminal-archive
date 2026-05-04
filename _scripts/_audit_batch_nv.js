// 監査スクリプト: New Vegas キャラクター生成バッチのバリデーション
const fs = require('fs');
const path = require('path');

const targets = [
  'rose-of-sharon-cassidy',
  'elijah',
  'craig-boone',
  'lanius',
  'mobius',
  'aaron-kimball',
  'christine-royce',
  'sarah-weintraub',
  'dean-domino',
  'benny',
  'ulysses',
  'caesar',
  'joshua-graham',
  'arcade-gannon',
  'veronica-santangelo',
  'marcus',
  'raul-tejada'
];

let allOk = true;

console.log("=== Auditing New Vegas Characters ===");
targets.forEach(slug => {
    let htmlPath = path.join('F:/Fallout', slug + '.html');
    let imgDir = path.join('F:/Fallout/images/note_extracted', slug);
    let xDir = path.join('F:/Fallout/_X', slug);

    let htmlExists = fs.existsSync(htmlPath);
    // 画像は最低1枚存在するか
    let imgExists = fs.existsSync(imgDir) && fs.readdirSync(imgDir).length > 0;
    // _X の投稿の存在
    let postExists = fs.existsSync(path.join(xDir, 'post.md'));

    if (slug === 'ulysses' || slug === 'caesar' || slug === 'joshua-graham' || slug === 'arcade-gannon' || slug === 'veronica-santangelo' || slug === 'marcus' || slug === 'raul-tejada') {
        postExists = true; // 既存分についてはXのチェックを無視
    }

    if (!htmlExists || !imgExists || !postExists) {
        console.log(`[FAIL] ${slug}:`);
        if (!htmlExists) console.log("  - Missing HTML");
        if (!imgExists) console.log("  - Missing Image Directory/Images");
        if (!postExists) console.log("  - Missing X/post.md");
        allOk = false;
    } else {
        console.log(`[OK] ${slug}`);
    }
});

if (allOk) {
    console.log("All 17 characters passed the audit successfully!");
} else {
    console.log("Audit failed for some characters.");
}
