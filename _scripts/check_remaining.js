const fs = require('fs');

const fetchWikitext = async (title) => {
    try {
        const url = `https://fallout.fandom.com/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&titles=${encodeURIComponent(title)}&format=json`;
        console.log(`Fetching: ${title}`);
        const response = await fetch(url);
        const data = await response.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        
        if (pageId === '-1') {
            console.log(`Page not found: ${title}`);
            return "";
        }
        
        return pages[pageId].revisions[0].slots.main['*'];
    } catch (error) {
        console.error(`Error fetching ${title}:`, error);
        return "";
    }
};

const main = async () => {
    const listPath = 'f:/Fallout/_truly_broken.json';
    const brokenList = JSON.parse(fs.readFileSync(listPath, 'utf8'));
    
    // Batch 20 was 80-83, 21 was 84-87, 22 was 88-91, 23 was 92-95? Wait
    // Let me check.
    // 0~3, 4~7(2), 8~11(3), 12~15(4), 16~19(5), 20~23(6), 24~27(7)
    // 76~79(20) , 80~83(21), 84~87(22), 88~91(23)?
    // Let's just output the whole list from 92 to end to see what's left.
    for (let i = 92; i < brokenList.length; i++) {
        console.log(`${i}: ${brokenList[i].file}`);
    }
};

main();
