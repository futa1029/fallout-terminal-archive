const fs = require('fs');
const https = require('https');
const path = require('path');

const html = fs.readFileSync('f:/Fallout/_media_section.html', 'utf-8');
const outputDir = 'f:/Fallout/images/note_extracted/vault/';
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(dest)) return resolve(); // Skip if exists
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            } else if (res.statusCode === 301 || res.statusCode === 302) {
                downloadImage(res.headers.location, dest).then(resolve).catch(reject);
            } else {
                reject(`Failed to download ${url}: ${res.statusCode}`);
            }
        }).on('error', reject);
    });
}

async function main() {
    let finalHtml = `\n            <!-- ===== メディアに登場するVault ===== -->\n            <div class="gallery-section">\n                <h2>メディアに登場するVault</h2>\n`;

    // Split by <h3> to get each media category
    const parts = html.split('<h3>');
    for (let i = 1; i < parts.length; i++) {
        const part = parts[i];
        const titleMatch = part.match(/<span class="mw-headline"[^>]*>(.*?)<\/span>/);
        if (!titleMatch) continue;

        // Clean title (remove <i> tags, etc)
        let title = titleMatch[1].replace(/<\/?[^>]+(>|$)/g, "");
        finalHtml += `                <h3>${title}</h3>\n                <div class="gallery-grid">\n`;

        // Find gallery items
        const itemRegex = /<div class="wikia-gallery-item"[\s\S]*?<a class="image lightbox" href="\/wiki\/File:([^"]+)"[\s\S]*?<img[\s\S]*?data-src="([^"]+)"[\s\S]*?<div class="lightbox-caption"[^>]*>([\s\S]*?)<\/div>/g;

        let match;
        while ((match = itemRegex.exec(part)) !== null) {
            let filename = decodeURIComponent(match[1]).replace(/_/g, ' ');
            let url = match[2].split('/revision/')[0]; // get full size
            let captionHtml = match[3];
            // Clean caption HTML
            let caption = captionHtml.replace(/<\/?[^>]+(>|$)/g, "").trim();

            // Clean filename to be safe
            let safeFilename = filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
            let destPath = path.join(outputDir, safeFilename);

            console.log(`Downloading ${safeFilename}...`);
            try {
                await downloadImage(url, destPath);
            } catch (e) {
                console.error(`Failed: ${url}`);
                // fallback to smaller image if full fails
                try {
                    await downloadImage(match[2], destPath);
                } catch (e2) {
                    console.error(`Fallback failed: ${match[2]}`);
                }
            }

            finalHtml += `                    <div class="gallery-item">\n                        <img src="images/note_extracted/vault/${safeFilename}" alt="${caption.replace(/"/g, '&quot;')}">\n                        <div class="caption">${caption}</div>\n                    </div>\n`;
        }
        finalHtml += `                </div>\n`;
    }
    finalHtml += `            </div>\n`;

    fs.writeFileSync('f:/Fallout/_media_gallery.html', finalHtml);
    console.log('Done generating _media_gallery.html');
}

main();
