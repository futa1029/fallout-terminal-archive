const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getHash(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
}

const dir = 'f:/Fallout/images/note_extracted';
const imageStats = {}; 
// key: string (size_hash), value: { size, hash, count, samplePaths: [] }

function walk(d) {
    if (!fs.existsSync(d)) return;
    const files = fs.readdirSync(d);
    for (const f of files) {
        const p = path.join(d, f);
        const stat = fs.statSync(p);
        if (stat.isDirectory()) {
            walk(p);
        } else if (p.endsWith('.png') || p.endsWith('.jpg') || p.endsWith('.jpeg') || p.endsWith('.webp')) {
            const size = stat.size;
            // Get hash to uniquely identify identical images
            const hash = getHash(p);
            const key = `${size}_${hash}`;
            
            if (!imageStats[key]) {
                imageStats[key] = { size, hash, count: 0, samplePaths: [] };
            }
            imageStats[key].count++;
            if (imageStats[key].samplePaths.length < 3) {
                imageStats[key].samplePaths.push(p);
            }
        }
    }
}

console.log("Analyzing images...");
walk(dir);
const sorted = Object.values(imageStats).sort((a, b) => b.count - a.count);

const outputData = sorted.slice(0, 50).filter(item => item.count > 3).map(item => ({
    count: item.count,
    size: item.size,
    hash: item.hash,
    samples: item.samplePaths
}));
fs.writeFileSync('bad_images.json', JSON.stringify(outputData, null, 2));
console.log('Saved to bad_images.json');
