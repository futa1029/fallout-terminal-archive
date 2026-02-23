const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = 'f:/Fallout/images/note_extracted/fallout-76-pets';
fs.mkdirSync(targetDir, { recursive: true });

const images = [
    { name: 'FO76_Pets_tabby_cat_preview.png', url: 'https://static.wikia.nocookie.net/fallout/images/7/7d/FO76_Pets_tabby_cat_preview.png/revision/latest' },
    { name: 'Score_s19_camp_camppets_cat_blackcat_c1.webp', url: 'https://static.wikia.nocookie.net/fallout/images/9/90/Score_s19_camp_camppets_cat_blackcat_c1.webp/revision/latest' },
    { name: 'Score_s19_camp_camppets_dog_whitegermanshepherd_c2.webp', url: 'https://static.wikia.nocookie.net/fallout/images/8/85/Score_s19_camp_camppets_dog_whitegermanshepherd_c2.webp/revision/latest' },
    { name: 'Score_s19_camp_camppets_idlefurniture_catcutsscratchingpost_c2.webp', url: 'https://static.wikia.nocookie.net/fallout/images/a/a9/Score_s19_camp_camppets_idlefurniture_catcutsscratchingpost_c2.webp/revision/latest' },
    { name: 'Score_s19_camp_camppets_idlefurniture_dogleafpile_c2.webp', url: 'https://static.wikia.nocookie.net/fallout/images/7/7d/Score_s19_camp_camppets_idlefurniture_dogleafpile_c2.webp/revision/latest' },
    { name: 'Score_s22_camp_camppets_idlefurniture_mushroomsscratchingpost_l.webp', url: 'https://static.wikia.nocookie.net/fallout/images/c/c6/Score_s22_camp_camppets_idlefurniture_mushroomsscratchingpost_l.webp/revision/latest' },
    { name: 'FO76_Cardinal_bird_cage_in-game.png', url: 'https://static.wikia.nocookie.net/fallout/images/9/96/FO76_Cardinal_bird_cage_in-game.png/revision/latest' },
    { name: 'S19_Pets_1080p.png', url: 'https://static.wikia.nocookie.net/fallout/images/5/52/S19_Pets_1080p.png/revision/latest' },
    { name: 'Score_s22_camp_camppets_cat_vaulttec_ragdoll_c3.webp', url: 'https://static.wikia.nocookie.net/fallout/images/d/de/Score_s22_camp_camppets_cat_vaulttec_ragdoll_c3.webp/revision/latest' },
    { name: 'Score_s22_camp_camppets_dog_sablegermanshepherd_c3.webp', url: 'https://static.wikia.nocookie.net/fallout/images/5/58/Score_s22_camp_camppets_dog_sablegermanshepherd_c3.webp/revision/latest' },
    { name: 'Score_s23_camp_camppets_lykoi_l.webp', url: 'https://static.wikia.nocookie.net/fallout/images/c/c4/Score_s23_camp_camppets_lykoi_l.webp/revision/latest' }
];

images.forEach(img => {
    const filePath = path.join(targetDir, img.name);
    https.get(img.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        const fileStream = fs.createWriteStream(filePath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Downloaded ${img.name}`);
        });
    }).on('error', (err) => {
        console.error(`Error downloading ${img.name}: ${err.message}`);
    });
});
