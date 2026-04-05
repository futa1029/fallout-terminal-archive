const fs = require('fs');
const path = require('path');

const targets = [
  'rex',
  'ed-e',
  'victor',
  'vulpes-inculta',
  'the-king',
  'toaster',
  'no-bark-noonan',
  'sarah-weintraub',
  'dala',
  'chris-haversam'
];

let allOk = true;

console.log("=== Auditing Fallout New Vegas Characters Batch 3 ===");
targets.forEach(slug => {
    let htmlPath = path.join('F:/Fallout', slug + '.html');
    let imgDir = path.join('F:/Fallout/images/note_extracted', slug);
    let xDir = path.join('F:/Fallout/_X', slug);

    let htmlExists = fs.existsSync(htmlPath);
    let imgExists = fs.existsSync(imgDir) && fs.readdirSync(imgDir).length > 0;
    let postExists = fs.existsSync(path.join(xDir, 'post.md'));

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
    console.log("All 10 characters passed the audit successfully!");
} else {
    console.log("Audit failed for some characters.");
}
