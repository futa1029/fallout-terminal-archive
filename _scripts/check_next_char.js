const https = require('https');

const chars = [
    "Preston_Garvey", "Cait", "Curie", "Deacon", "Strong",
    "John_Hancock", "X6-88", "Arthur_Maxson", "Desdemona",
    "Shaun", "Kellogg", "Ada", "Porter_Gage", "Old_Longfellow",
    "Sturges", "Tinker_Tom", "Glory", "Magnolia", "Paul_Pembroke"
];

let results = [];
let pending = chars.length;

chars.forEach(char => {
    const url = `https://fallout.fandom.com/api.php?action=query&prop=revisions&titles=${char}&rvslots=main&rvprop=content&format=json`;
    https.get(url, res => {
        let body = '';
        res.on('data', d => body += d);
        res.on('end', () => {
            try {
                const data = JSON.parse(body);
                const pages = data.query.pages;
                const pageId = Object.keys(pages)[0];
                if (pageId !== "-1") {
                    const content = pages[pageId].revisions[0].slots.main['*'];
                    results.push({ name: char, length: content.length });
                }
            } catch (e) {
                console.error("Error parsing " + char);
            }
            pending--;
            if (pending === 0) {
                results.sort((a, b) => b.length - a.length);
                results.forEach((r, i) => {
                    console.log(`${i+1}. ${r.name}: ${r.length}`);
                });
            }
        });
    });
});
