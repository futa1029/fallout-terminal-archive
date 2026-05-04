const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/js/lore_index.js', 'utf8');

// A function to find and remove entries where url points to a non-existent file
let count = 0;

// The regex matches any object in the array.
// Because JSON parsing might fail if it's not strictly JSON, we can do this string manipulation.
// Instead of complex string manipulation, let's just find the `url: "..."` and if the file doesn't exist, we remove the object.

const urlRegex = /\{\s*name:\s*"[^"]*",\s*yomi:\s*"[^"]*",\s*url:\s*"([^"]+)",\s*category:\s*"[^"]*",\s*appearance:\s*\[[\s\S]*?\],\s*date:\s*"[^"]*"(?:,\s*isDraft:\s*true)?\s*\},?/g;

let newContent = content.replace(urlRegex, (match, url) => {
    const filePath = 'f:/Fallout/' + url;
    if (!fs.existsSync(filePath)) {
        console.log('File does not exist, removing entry:', url);
        count++;
        return ''; // Remove the entry
    }
    return match; // Keep the entry
});

// Since the last element might leave a trailing comma or the array might be malformed if we remove the last item,
// `lore_index.js` is basically: const loreEntries = [ ... ];
// A trailing comma in an array is valid in JS, but let's be careful.
// Let's also clean up any double commas or `{ ... },,` if they happen.
newContent = newContent.replace(/\},\s*\]/g, '}\n]');
newContent = newContent.replace(/,\s*,/g, ',');

if (count > 0) {
    fs.writeFileSync('f:/Fallout/js/lore_index.js', newContent, 'utf8');
    console.log('Removed ' + count + ' invalid entries.');
} else {
    console.log('No invalid entries found.');
}
