const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const scriptsDir = 'f:/Fallout/_scripts';
const files = fs.readdirSync(scriptsDir).filter(f => f.startsWith('_batch_gen_') && f.endsWith('.js'));

console.log(`Found ${files.length} batch generation scripts. Executing them all...`);

let successCount = 0;
let failCount = 0;

for (const file of files) {
    console.log(`Running ${file}...`);
    try {
        execSync(`node "${path.join(scriptsDir, file)}"`, { stdio: 'inherit', cwd: 'f:/Fallout' });
        successCount++;
    } catch (error) {
        console.error(`FAILED to run ${file}:`, error.message);
        failCount++;
    }
}

console.log(`\nExecution Summary:`);
console.log(`Success: ${successCount}`);
console.log(`Failed:  ${failCount}`);
