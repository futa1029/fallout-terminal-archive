const fs = require('fs');

['lore.html', 'admin-drafts.html'].forEach(file => {
    let content = fs.readFileSync('f:/Fallout/' + file, 'utf8');
    
    // We parse the exact format:
    // {
    //     name: "Dave",
    //     ...
    //     date: "2026-04-05"
    // },
    // Regex looks for { followed by non-} containing date: "2026-04-05"
    const regex = /\{\s*name:[^}]*date:\s*"2026-04-05"(?:\s*,\s*isDraft:\s*(?:true|false))?\s*\},?\s*/g;
    
    const matches = content.match(regex);
    if(matches) {
        console.log(file, 'matches:', matches.length);
        content = content.replace(regex, '');
        fs.writeFileSync('f:/Fallout/' + file, content);
    } else {
        console.log(file, 'No matches found.');
    }
});
