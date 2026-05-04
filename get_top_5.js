const fs = require('fs');
const js = fs.readFileSync('remove_duplicates.js', 'utf8');
const match = js.match(/const manualEntries\s*=\s*(\[[\s\S]*?\]);/m);
const allEntries = eval('(' + match[1] + ')');

const drafts = allEntries.filter(e => e.status === 'draft' && /^[a-zA-Z0-9\s\'\-\.\&\(\):]+$/.test(e.name));
drafts.sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return da - db;
});

console.log('--- Top 5 Oldest English Drafts ---');
drafts.slice(0, 5).forEach(d => console.log(`${d.name} (${d.date})`));
