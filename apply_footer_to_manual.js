const fs = require('fs');
const path = require('path');

const DIR = 'f:\\Fallout';

const manualFiles = [
    { file: "kimball.html", tags: ["#FalloutNV", "#Person"] },
    { file: "raiders_76.html", tags: ["#Fallout76", "#Faction"] },
    { file: "lee_moldaver.html", tags: ["#FalloutTV", "#Person"] },
    { file: "vault_dweller_lore.html", tags: ["#ClassicFallout", "#Person"] },
    { file: "assaultron_head.html", tags: ["#Fallout4", "#Fallout76", "#Weapon"] },
    { file: "blight.html", tags: ["#Fallout76", "#Plant"] },
    { file: "tandi.html", tags: ["#ClassicFallout", "#Person"] },
    { file: "prize_bot.html", tags: ["#Fallout76", "#Creature"] },
    { file: "ncr.html", tags: ["#ClassicFallout", "#FalloutNV", "#FalloutTV", "#Faction"] },
    { file: "buffalo-gourd-seed.html", tags: ["#FalloutNV", "#Plant"] }
];

const copyrightText = `<p name="copyright-default">This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.</p>`;

manualFiles.forEach(entry => {
    const filePath = path.join(DIR, entry.file);
    if (!fs.existsSync(filePath)) {
        console.log(`Skipping missing file: ${entry.file}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Remove existing copyright blocks to prevent duplicates
    content = content.replace(/<div style="margin-top: 30px; border-top: 1px (solid|dashed) [^>]+>[\s\S]*?This article uses material[\s\S]*?<\/div>/i, "");
    content = content.replace(/<p[^>]*>This article uses material.*?<\/p>/i, "");

    let tagsHtml = entry.tags.map(t => `<span style="background:#222; padding:2px 5px; border-radius:3px; color:var(--accent-color); margin-right:5px;">${t}</span>`).join('');

    const footerHtml = `
            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <div style="margin-bottom: 10px;">
                    TAGS: ${tagsHtml}
                </div>
                ${copyrightText}
            </div>`;

    // Insert right before </main>
    if (content.includes('</main>')) {
        content = content.replace('</main>', footerHtml + '\n        </main>');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated footer in: ${entry.file}`);
    } else {
        console.log(`Warning: </main> not found in ${entry.file}`);
    }
});
