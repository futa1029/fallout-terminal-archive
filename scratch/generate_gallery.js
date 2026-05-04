const fs = require('fs');
const path = require('path');

const dir = 'f:/Fallout/images/note_extracted/brotherhood-base';
const files = fs.readdirSync(dir);

const categories = {
    'Fallout 1 & 2': [],
    'Fallout 3 & Tactics': [],
    'Fallout: New Vegas': [],
    'Fallout 4': [],
    'Fallout 76': [],
    'Fallout (TV Series)': [],
    'Other / General': []
};

files.forEach(file => {
    const f = file.toLowerCase();
    if (f.startsWith('fo1') || f.startsWith('fo2')) {
        categories['Fallout 1 & 2'].push(file);
    } else if (f.startsWith('fo3') || f.startsWith('fot') || f.includes('citadel') || f.includes('lyons') || f.includes('prime')) {
        categories['Fallout 3 & Tactics'].push(file);
    } else if (f.startsWith('fnv') || f.includes('mojave') || f.includes('mcnamara') || f.includes('hidden_valley')) {
        categories['Fallout: New Vegas'].push(file);
    } else if (f.startsWith('fo4') || f.includes('boston') || f.includes('prydwen') || f.includes('maxson')) {
        categories['Fallout 4'].push(file);
    } else if (f.startsWith('fo76')) {
        categories['Fallout 76'].push(file);
    } else if (f.startsWith('fotv') || f.includes('maximus')) {
        categories['Fallout (TV Series)'].push(file);
    } else {
        categories['Other / General'].push(file);
    }
});

let galleryHtml = '';

for (const [cat, items] of Object.entries(categories)) {
    if (items.length === 0) continue;
    galleryHtml += `                <h3 style="margin-top: 30px; border-left: 5px solid var(--accent-color); padding-left: 10px;">${cat}</h3>\n`;
    galleryHtml += `                <div class="gallery-grid">\n`;
    items.forEach(item => {
        const caption = item.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
        galleryHtml += `                    <div class="gallery-item">\n`;
        galleryHtml += `                        <img src="images/note_extracted/brotherhood-base/${item}" alt="${caption}" loading="lazy" onerror="this.onerror=null; this.src='images/placeholder.jpg';">\n`;
        galleryHtml += `                        <div class="caption">${caption}</div>\n`;
        galleryHtml += `                    </div>\n`;
    });
    galleryHtml += `                </div>\n`;
}

fs.writeFileSync('f:/Fallout/scratch/gallery_snippet.html', galleryHtml);
console.log('Gallery snippet generated with ' + files.length + ' images.');
