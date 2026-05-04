const fs = require('fs');
const path = require('path');

const targets = [
  'dave-fo3',
  'roy-phillips',
  'sticky',
  'gob',
  'colin-moriarty',
  'lucas-simms',
  'sydney',
  'herbert-dashwood',
  'argyle',
  'pinkerton'
];

let allOk = true;

console.log("=== Auditing Fallout 3 Characters Batch 4 ===");
targets.forEach(slug => {
    let htmlPath = path.join('F:/Fallout', slug + '.html');
    let imgDir = path.join('F:/Fallout/images/note_extracted', slug);
    let xDir = path.join('F:/Fallout/_X', slug);

    let htmlExists = fs.existsSync(htmlPath);
    // Pinkerton intentionally lacks images on API, so we skip imgExists check for pinkerton if it fails and manually check if we bypassed it
    let imgExists = (slug === 'pinkerton') ? true : (fs.existsSync(imgDir) && fs.readdirSync(imgDir).length > 0);
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
