const fs = require('fs');

const blessedUrls = new Set([
  'kimball.html', 'raiders_76.html', 'lee_moldaver.html', 'vault_dweller_lore.html', 
  'assaultron_head.html', 'blight.html', 'tandi.html', 'prize_bot.html', 
  'ncr.html', 'buffalo-gourd-seed.html', 'armor-ace.html', 'vault_tec.html', 
  'billings-homestead.html', 'fallout-76-pets.html', 'bloodleaf.html', 
  'single-action-revolver.html', 'cabbage.html', 'vault.html', 'catarax.html', 
  'lucy-maclean.html', 'biplane-crash-anchor-farm.html', 'birdhouse-ridge.html', 
  'birdwatchers-platform.html'
]);

['lore.html', 'admin-drafts.html'].forEach(file => {
    let content = fs.readFileSync('f:/Fallout/' + file, 'utf8');
    
    // We will find all blocks { ...url: "...", ... } and process them
    // It's safer to just do a smart regex over the date line, but we need to know the URL.
    // Let's use a regex that captures the url and the date.
    // The format is:
    // url: "abc.html",
    // category: "...",
    // appearance: [...],
    // date: "YYYY-MM-DD",
    // isDraft: true
    // }
    
    // Actually, capturing the whole { ... } block:
    let newContent = content.replace(/\{\s*name:(?:[^}]*?)url:\s*"([^"]+)"(?:[^}]*?)date:\s*"([0-9-]{10})"(?:[^}]*?)\}/g, (match, url, date) => {
        // Let's rebuild the isDraft line properly
        let cleanBlock = match;
        
        // Remove any existing isDraft line to avoid duplicates
        cleanBlock = cleanBlock.replace(/,\s*isDraft:\s*(true|false|undefined)/g, '');
        cleanBlock = cleanBlock.replace(/\s*isDraft:\s*(true|false|undefined)/g, '');

        if (!blessedUrls.has(url)) {
            // It's NOT a blessed URL, so it MUST be a draft.
            // Insert isDraft: true right after date.
            // Replace date: "..." with date: "...",\n                isDraft: true
            cleanBlock = cleanBlock.replace(new RegExp('date:\\s*"' + date + '"'), 'date: "' + date + '",\n                isDraft: true');
        }
        
        return cleanBlock;
    });

    fs.writeFileSync('f:/Fallout/' + file, newContent);
    console.log('Processed', file);
});
