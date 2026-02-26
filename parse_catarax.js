const fs = require('fs');
const html = fs.readFileSync('f:/Fallout/_catarax_fandom.html', 'utf-8');

// Extract headings
const regex = /<h[2-4][^>]*>.*?<span class="mw-headline"[^>]*>([^<]+)<\/span>.*?<\/h[2-4]>/g;
console.log("--- Headings ---");
let match;
while ((match = regex.exec(html)) !== null) {
    console.log(`Heading: ${match[1]}`);
}

// Extract images
console.log("\n--- Images ---");
const imgRegex = /<a href="\/wiki\/File:([^"]+)" class="image"[^>]*>.*?<img[^>]*src="([^"]+)"[^>]*>/g;
let imgMatch;
while ((imgMatch = imgRegex.exec(html)) !== null) {
    let filename = decodeURIComponent(imgMatch[1]).replace(/_/g, ' ');
    let src = imgMatch[2];
    if (src.includes('data:image')) {
        const dataSrcMatch = imgMatch[0].match(/data-src="([^"]+)"/);
        if (dataSrcMatch) {
            src = dataSrcMatch[1];
        }
    }
    src = src.split('/revision/')[0]; // get full size
    console.log(`- ${filename} : ${src}`);
}
