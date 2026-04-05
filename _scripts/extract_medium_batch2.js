const fs = require('fs');

const rawDataPath = 'f:/Fallout/_drafts/tv_locations_raw.json';
const smallDataPath = 'f:/Fallout/_drafts/small20_eng.json';
const batch1DataPath = 'f:/Fallout/_drafts/medium_batch1_eng.json';
const listPath = 'f:/Fallout/_drafts/tv_locations_list.json';
const outputPath = 'f:/Fallout/_drafts/medium_batch2_eng.json';

const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'));
const listData = JSON.parse(fs.readFileSync(listPath, 'utf8'));

let smallData = {};
try { smallData = JSON.parse(fs.readFileSync(smallDataPath, 'utf8')); } catch (e) {}

let batch1Data = {};
try { batch1Data = JSON.parse(fs.readFileSync(batch1DataPath, 'utf8')); } catch (e) {}

const smallNames = Object.keys(smallData).map(k => k.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
const batch1Names = Object.keys(batch1Data).map(k => k.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
const massiveNames = [
    "Vault 4",
    "Primm",
    "Mojave Wasteland",
    "Las Vegas management Vault",
    "Ultra-Luxe",
    "Silver Rush"
].map(k => k.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));

const completedSlugs = new Set([...smallNames, ...batch1Names, ...massiveNames]);

let remaining = [];

for (const locName of listData) {
    const slug = locName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (!completedSlugs.has(slug)) {
        if (rawData[locName]) {
            remaining.push({
                name: locName,
                slug: slug,
                length: rawData[locName].length,
                wikitext: rawData[locName]
            });
        }
    }
}

// Sort by length ascending
remaining.sort((a, b) => a.length - b.length);

const batch = remaining.slice(0, 15);

const output = {};
batch.forEach(loc => {
    output[loc.name] = {
        slug: loc.slug,
        original_wikitext: loc.wikitext,
        japanese_translation: {
            intro: "",
            background: "",
            layout: "",
            notes: "",
            behind_the_scenes: "",
            impression: "ここにロケーションに対する熱い考察や感想を記載します。"
        }
    };
});

fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');

console.log('--- Medium Batch 2 (15 locations) ---');
batch.forEach((loc, index) => {
    console.log(`${index + 1}. ${loc.name} (${loc.length} chars)`);
});
console.log('Saved to ' + outputPath);
console.log('Remaining after this batch: ' + (remaining.length - batch.length));
