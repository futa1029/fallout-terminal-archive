const fs = require('fs');

async function main() {
    let characters = [];
    let cmcontinue = '';
    
    do {
        let url = `https://fallout.fandom.com/api.php?action=query&list=categorymembers&cmtitle=Category:Fallout:_New_Vegas_characters&cmlimit=500&format=json`;
        if (cmcontinue) url += `&cmcontinue=${cmcontinue}`;
        
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.query && data.query.categorymembers) {
            characters = characters.concat(data.query.categorymembers.filter(cm => cm.ns === 0));
        }
        
        cmcontinue = data.continue ? data.continue.cmcontinue : '';
    } while (cmcontinue);
    
    console.log(`Found ${characters.length} characters.`);
    fs.writeFileSync('f:/Fallout/_scripts/nv_characters.json', JSON.stringify(characters, null, 2));
}

main().catch(err => console.error(err));
