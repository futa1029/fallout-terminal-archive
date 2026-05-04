const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
    { url: 'https://images.fallout.wiki/1/1b/Fo1_Military_Base_Destroyed.png', name: 'Fo1_Military_Base_Destroyed.png' },
    { url: 'https://images.fallout.wiki/d/df/FO1_Dennis_Allen.png', name: 'FO1_Dennis_Allen.png' },
    { url: 'https://images.fallout.wiki/d/d7/FNV_Location_HELIOS_One.png', name: 'FNV_Location_HELIOS_One.png' },
    { url: 'https://images.fallout.wiki/7/7a/LibertyPrimeDestroyingVertibird.png', name: 'LibertyPrimeDestroyingVertibird.png' },
    { url: 'https://images.fallout.wiki/e/e0/BoS_logo.png', name: 'BoS_logo.png' },
    { url: 'https://images.fallout.wiki/e/e2/Fo4_launch_trailer_BoS_leader.png', name: 'Fo4_launch_trailer_BoS_leader.png' },
    { url: 'https://images.fallout.wiki/d/d4/Fallout_TV_S1E1_11.jpg', name: 'Fallout_TV_S1E1_11.jpg' },
    { url: 'https://images.fallout.wiki/7/71/T60LArmDecal_Initiate_d.png', name: 'T60LArmDecal_Initiate_d.png' },
    { url: 'https://images.fallout.wiki/c/c5/FO3_Screenshot_BoS_and_Washington_Monument.webp', name: 'FO3_Screenshot_BoS_and_Washington_Monument.webp' },
    { url: 'https://images.fallout.wiki/d/dc/Fo4_Prydwen_Concept_Art.jpg', name: 'Fo4_Prydwen_Concept_Art.jpg' },
    { url: 'https://images.fallout.wiki/c/cf/Brotherhood_of_Steel_end_slide_02.png', name: 'Brotherhood_of_Steel_end_slide_02.png' }
];

const targetDir = 'f:/Fallout/images/note_extracted/brotherhood-base';

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

async function download(url, filePath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${path.basename(filePath)}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filePath, () => {});
            reject(err);
        });
    });
}

(async () => {
    for (const img of images) {
        try {
            await download(img.url, path.join(targetDir, img.name));
        } catch (err) {
            console.error(`Error downloading ${img.name}: ${err.message}`);
        }
    }
})();
