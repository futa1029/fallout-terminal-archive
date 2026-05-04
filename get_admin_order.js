const fs = require('fs');
const loreHtml = fs.readFileSync('f:/Fallout/lore.html', 'utf-8');
const match = loreHtml.match(/const loreEntries = \[([\s\S]*?)\];/);

if (match) {
    const jsString = '[' + match[1] + ']';
    // Use eval safely enough for our controlled environment
    const entries = eval(jsString);
    
    // Sort array the way admin.html does? Actually it seems admin.html loops or just displays them.
    // Wait, let's just get the URLs in the exact order they appear in lore.html.
    
    // Reverse the candidates array? Admin often shows "drafts" in reverse chronological, but let's just find the first 5 candidates in the order of lore.html.
    const candidates = JSON.parse(fs.readFileSync('f:/Fallout/lore_integration_candidates.json', 'utf-8'));
    
    const orderedCandidates = entries
        .map(e => e.url)
        .filter(url => candidates.includes(url));
        
    console.log(orderedCandidates.slice(0, 5));
} else {
    console.log("Not found target script in lore.html");
}
