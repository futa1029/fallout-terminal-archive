const https = require('https');
const fs = require('fs');

const url = "https://fallout.fandom.com/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&titles=Fallout_76_pets&format=json";

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            const pages = parsedData.query.pages;
            const pageId = Object.keys(pages)[0];
            const wikitext = pages[pageId].revisions[0].slots.main['*'];
            fs.mkdirSync('f:/Fallout/_drafts', { recursive: true });
            fs.writeFileSync('f:/Fallout/_drafts/fallout_76_pets_wikitext.txt', wikitext);
            console.log("Wikitext saved.");
        } catch (e) {
            console.error(e.message);
        }
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});

const imgUrl = "https://fallout.fandom.com/api.php?action=query&prop=images&titles=Fallout_76_pets&format=json&imlimit=50";

https.get(imgUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            const pages = parsedData.query.pages;
            const pageId = Object.keys(pages)[0];
            const images = pages[pageId].images || [];

            let imgInfo = [];
            let completed = 0;

            if (images.length === 0) {
                fs.writeFileSync('f:/Fallout/_drafts/fallout_76_pets_images.txt', 'No images found.');
                return;
            }

            images.forEach((img) => {
                const title = encodeURIComponent(img.title);
                const infoUrl = `https://fallout.fandom.com/api.php?action=query&titles=${title}&prop=imageinfo&iiprop=url&format=json`;
                https.get(infoUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
                    let rawData2 = '';
                    res2.on('data', (chunk) => { rawData2 += chunk; });
                    res2.on('end', () => {
                        try {
                            const parsedData2 = JSON.parse(rawData2);
                            const pages2 = parsedData2.query.pages;
                            const pageId2 = Object.keys(pages2)[0];
                            if (pages2[pageId2].imageinfo) {
                                const url = pages2[pageId2].imageinfo[0].url;
                                imgInfo.push(`${img.title}: ${url}`);
                            }
                        } catch (e) {
                            console.error(e.message);
                        }
                        completed++;
                        if (completed === images.length) {
                            fs.writeFileSync('f:/Fallout/_drafts/fallout_76_pets_images.txt', imgInfo.join('\n'));
                            console.log("Images saved.");
                        }
                    });
                });
            });
        } catch (e) {
            console.error(e.message);
        }
    });
});
