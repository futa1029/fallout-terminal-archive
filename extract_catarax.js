const fs = require('fs');

const html = fs.readFileSync('f:/Fallout/_catarax_fandom.html', 'utf-8');

// Function to clean HTML tags and entities
function cleanText(str) {
    if (!str) return '';
    return str
        .replace(/<[^>]+>/g, '') // remove HTML tags
        .replace(/&#160;/g, ' ') // replace explicit spaces
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#91;.*?&#93;/g, '') // remove reference brackets like [1]
        .replace(/\[\d+\]/g, '') // remove reference brackets like [1]
        .replace(/\n\s*\n/g, '\n') // remove extra lines
        .trim();
}

let result = "=== CATARAX ARTICLE SOURCE ===\n\n";

// Extract Infobox (basic text)
const infoboxMatch = html.match(/<aside[^>]+pi-infobox[^>]*>([\s\S]*?)<\/aside>/);
if (infoboxMatch) {
    result += "=== INFOBOX ===\n" + cleanText(infoboxMatch[1]) + "\n\n";
}

// Extract main sections
const contentParts = html.split(/<h[2-4][^>]*>.*?<span class="mw-headline"[^>]*>([^<]+)<\/span>.*?<\/h[2-4]>/g);
// contentParts[0] is the intro before the first heading
result += "=== INTRO ===\n" + cleanText(contentParts[0]) + "\n\n";

for (let i = 1; i < contentParts.length; i += 2) {
    const heading = contentParts[i];
    const content = contentParts[i + 1];
    result += `=== ${heading.toUpperCase()} ===\n`;

    // Attempt to extract lists separately if Appearances
    if (heading.toLowerCase() === 'appearances' || heading.toLowerCase() === 'gallery' || heading.toLowerCase() === 'behind the scenes') {
        result += cleanText(content) + "\n\n";
    } else {
        // Extract paragraphs mainly
        const pRegex = /<p>([\s\S]*?)<\/p>/g;
        let pMatch;
        while ((pMatch = pRegex.exec(content)) !== null) {
            result += cleanText(pMatch[1]) + "\n\n";
        }
    }
}

// Extract Images
result += "=== IMAGES ===\n";
const imgRegex = /<img[^>]*src="([^"]+)"[^>]*>/g;
let imgMatch;
while ((imgMatch = imgRegex.exec(html)) !== null) {
    let src = imgMatch[1];
    if (src.includes('data:image')) {
        const dataSrcMatch = imgMatch[0].match(/data-src="([^"]+)"/);
        if (dataSrcMatch) {
            src = dataSrcMatch[1];
        }
    }
    src = src.split('/revision/')[0];

    // Get alt or name if possible
    let altMatch = imgMatch[0].match(/alt="([^"]+)"/);
    let alt = altMatch ? altMatch[1] : 'unknown';

    // Ignore small icons
    if (!src.includes('static.wikia.nocookie.net') || alt.includes('Edit') || src.includes('.gif')) continue;

    result += `- [${alt}] ${src}\n`;
}

fs.writeFileSync('f:/Fallout/catarax_parsed.txt', result);
console.log('Saved parsed content to f:/Fallout/catarax_parsed.txt');
