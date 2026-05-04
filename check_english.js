const fs = require('fs');
const lines = fs.readFileSync('remove_duplicates.js', 'utf8').split('\n');
const result = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('{ name: "')) {
    const match = line.match(/name:\s*"([^"]+)"/);
    if (match) {
      const name = match[1];
      if (/^[a-zA-Z0-9\s\'\-\.\&\(\):]+$/.test(name)) {
        result.push(name);
      }
    }
  }
}
console.log('Total English items in remove_duplicates.js:', result.length);
console.log(result.slice(0, 30).join('\n'));
