const fs = require('fs');

const content = fs.readFileSync('js/lore_index_v9.js', 'utf8');

// 正規表現で URL を抽出
const urls = [];
const matches = content.matchAll(/url:\s*"([^"]+)"/g);
for (const match of matches) {
    urls.push(match[1]);
}

console.log('Total URLs found:', urls.length);

const counts = {};
const duplicates = [];

urls.forEach(url => {
    counts[url] = (counts[url] || 0) + 1;
});

for (const url in counts) {
    if (counts[url] > 1) {
        duplicates.push({ url, count: counts[url] });
    }
}

if (duplicates.length > 0) {
    console.log('Duplicate URLs found:', duplicates.length);
    console.log('First 10 duplicates:', duplicates.slice(0, 10));
} else {
    console.log('No duplicate URLs found.');
}
