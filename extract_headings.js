const fs = require('fs');
const html = fs.readFileSync('f:/Fallout/_vault_fandom.html', 'utf-8');
const regex = /<h[2-4][^>]*>.*?<span class="mw-headline"[^>]*>([^<]+)<\/span>.*?<\/h[2-4]>/g;
let match;
while ((match = regex.exec(html)) !== null) {
    console.log(`Heading: ${match[1]}`);
}
