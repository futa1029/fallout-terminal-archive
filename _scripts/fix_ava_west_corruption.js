const fs = require('fs');
const path = require('path');

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const scriptsDir = 'f:/Fallout/_scripts';
const rootDir = 'f:/Fallout';

(async () => {
    let totalFixed = 0;
    let totalSkipped = 0;
    
    // Batch 9 through 44
    for (let i = 9; i <= 44; i++) {
        const scriptPath = path.join(scriptsDir, `generate_batch${i}.js`);
        if (!fs.existsSync(scriptPath)) {
            console.log(`Script batches up to ${i-1} likely found. Script ${scriptPath} does not exist, skipping...`);
            continue;
        }
        
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');
        // Check if it uses ava-west.html
        if (!scriptContent.includes('ava-west.html')) {
            console.log(`Script batch ${i} does not use ava-west template, skipping...`);
            continue;
        }

        const charsMatch = scriptContent.match(/const chars = (\[[\s\S]*?\]);\s*function downloadImage/);
        if (!charsMatch) {
            console.log(`Could not find chars array in batch ${i}, skipping...`);
            continue;
        }

        let chars;
        try {
            chars = new Function('return ' + charsMatch[1])();
        } catch (e) {
            console.error(`Failed to parse chars array in batch ${i}: ${e.message}`);
            continue;
        }

        console.log(`Processing batch ${i} (${chars.length} characters)...`);

        for (let char of chars) {
            const htmlPath = path.join(rootDir, `${char.id}.html`);
            if (!fs.existsSync(htmlPath)) {
                console.log(`  Target file ${char.id}.html does not exist, skipping...`);
                continue;
            }

            let htmlContent = fs.readFileSync(htmlPath, 'utf8');
            
            // Check if it is corrupted by looking for Ava West's specific text string
            if (!htmlContent.includes('エヴァは、バド・アスキンスの')) {
                console.log(`  File ${char.id}.html does not contain the corrupted text, skipping...`);
                totalSkipped++;
                continue;
            }

            const startStr = `<p>${char.jpName}（${char.enName}）は、`;
            const endStr = `<li><a href="buds_buds.html" class="auto-link">Bud's Buds</a></li>\n            </ul>`;
            
            const startIndex = htmlContent.indexOf(startStr);
            const endIndex = htmlContent.indexOf(endStr);
            
            if (startIndex !== -1 && endIndex !== -1) {
                const head = htmlContent.substring(0, startIndex);
                const tail = htmlContent.substring(endIndex + endStr.length);
                htmlContent = head + char.bodyHtml + tail;
            } else {
                console.log(`  Failed boundary matches for body in ${char.id}.html. Attempting RegExp fallback.`);
                // Fallback RegExp: just use the name up to closing bracket, then match all down to </ul>
                const simpleStartStr = `<p>${char.jpName}（`;
                const sIdx = htmlContent.indexOf(simpleStartStr);
                if (sIdx !== -1 && endIndex !== -1) {
                    const head = htmlContent.substring(0, sIdx);
                    const tail = htmlContent.substring(endIndex + endStr.length);
                    htmlContent = head + char.bodyHtml + tail;
                } else {
                    console.log(`  RegExp fallback also failed for ${char.id}.html! Skipping!`);
                    continue;
                }
            }
            
            // Fix the quote box corruption
            const quoteRegex = /<div class="quote-box">[\s\S]*?ロバート・オルセンとジョージ・ヤッフェの間に就任していた[\s\S]*?<\/div>/;
            if (quoteRegex.test(htmlContent)) {
                htmlContent = htmlContent.replace(quoteRegex, char.quote.replace('<div class="quote-box">', '<div class="quote-box">'));
            } else {
                console.log(`  Warning: Could not find corrupted quote-box in ${char.id}.html. Or it was already modified.`);
            }
            
            // Clean up: Vault33 / Vault-Tec hash tags from Ava West that were appended to the tags list, if not cleaned properly
            htmlContent = htmlContent.replace(/<span style="background:#222; padding:2px 5px; border-radius:3px; color:var\(--accent-color\); margin-right:5px;">#Vault33<\/span><span style="background:#222; padding:2px 5px; border-radius:3px; color:var\(--accent-color\); margin-right:5px;">#Vault-Tec<\/span>/, '');

            // Save the file
            fs.writeFileSync(htmlPath, htmlContent, 'utf8');
            console.log(`  Fixed ${char.id}.html successfully.`);
            totalFixed++;
        }
    }
    
    console.log(`\nDone. Fixed ${totalFixed} files, Skipped ${totalSkipped} (already fixed or no corruption).`);
})();
