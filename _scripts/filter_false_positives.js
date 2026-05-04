const fs = require('fs');

const batches = JSON.parse(fs.readFileSync('f:/Fallout/_short_batches.json', 'utf8'));

let validFiles = [];

for (const batch in batches) {
    for (const file of batches[batch]) {
        const content = fs.readFileSync(`f:/Fallout/${file}`, 'utf8');
        
        // Check if there is an ACTUAL impression box
        // Often marked by <b>感想</b> or similar
        const hasImpression = content.includes('<b>感想</b>');
        
        // Also check if main content is genuinely short, unless it has a good impression
        const mainMatch = content.match(/<main class="content">([\s\S]*?)<div class="comments-section">/);
        let mainContent = mainMatch ? mainMatch[1] : '';
        mainContent = mainContent.replace(/<div class="quote-box">[\s\S]*?<\/div>/g, '');
        mainContent = mainContent.replace(/<[^>]*>?/gm, '').replace(/\s+/g, '');
        
        if (!hasImpression || mainContent.length < 50) {
            validFiles.push(file);
        } else {
            console.log(`False positive removed: ${file}`);
        }
    }
}

console.log(`Remaining files: ${validFiles.length}`);

// Regroup into batches
validFiles.sort();
const batchSize = 3; // Let's do 3 per batch since these might require more manual checking
const newBatches = {};
let batchNumber = 29;

for (let i = 0; i < validFiles.length; i += batchSize) {
    newBatches[`Batch ${batchNumber}`] = validFiles.slice(i, i + batchSize);
    batchNumber++;
}

fs.writeFileSync('f:/Fallout/_short_batches.json', JSON.stringify(newBatches, null, 2));

// Update task.md
let taskContent = '';
for (const [batchName, files] of Object.entries(newBatches)) {
    taskContent += `- \`[ ]\` ${batchName}\n`;
    files.forEach(f => {
        taskContent += `  - \`[ ]\` ${f}\n`;
    });
}
fs.writeFileSync('C:/Users/futa1/.gemini/antigravity/brain/cf671907-9c70-4406-a29c-b2a63546bd71/task.md', taskContent);
console.log('task.md updated!');
