const fs = require('fs');
const html = fs.readFileSync('f:/Fallout/_vault_fandom.html', 'utf-8');

const startIndex = html.indexOf('id="Vaults_from_media"');
if (startIndex !== -1) {
    // Next heading is either h2, h3, etc. but let's find the next <h[2-4]
    const nextHeadingRegex = /<h[2-4][^>]*>/g;
    nextHeadingRegex.lastIndex = startIndex;
    const matchHeading = nextHeadingRegex.exec(html);

    const endIndex = matchHeading ? matchHeading.index : html.length;
    const sectionHtml = html.substring(startIndex, endIndex);

    // Matches <div class="wikia-gallery-item">... or <li class="gallerybox">...
    // Let's just find all img tags in this section
    const imgRegex = /<img[^>]*alt="([^"]*)"[^>]*src="([^"]+)"/g;
    const items = [];
    let match;
    console.log("Images found in Vaults from media:");
    while ((match = imgRegex.exec(sectionHtml)) !== null) {
        let alt = match[1];
        let src = match[2];
        if (src.includes('data:image')) {
            // Fallback to data-src if available
            const dataSrcMatch = match[0].match(/data-src="([^"]+)"/);
            if (dataSrcMatch) {
                src = dataSrcMatch[1];
            }
        }
        // remove revision part for highest quality
        src = src.split('/revision/')[0];
        console.log(`- ${alt} : ${src}`);
        items.push({ alt, src });
    }
    fs.writeFileSync('f:/Fallout/media_images.json', JSON.stringify(items, null, 2));
} else {
    console.log('Vaults from media section not found.');
}
