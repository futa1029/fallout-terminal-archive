const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'bos_content');
const imgDir = path.join(__dirname, '..', 'images', 'note_extracted', 'brotherhood-base');
const localFiles = new Set(fs.readdirSync(imgDir));

const modules = [
  'background.js',
  'society_p1.js',
  'society_p2.js',
  'society_p3.js',
  'divisions.js',
  'foreign_relations.js',
  'technology.js',
  'notes_behind.js',
  'gallery.js'
];

console.log('--- Image Reference Check ---');

modules.forEach(mod => {
    const modPath = path.join(contentDir, mod);
    if (!fs.existsSync(modPath)) return;
    
    const content = fs.readFileSync(modPath, 'utf8');
    // img("filename" or gi("filename"
    const regex = /(?:img|gi)\(\s*["']([^"']+)["']/g;
    let match;
    
    while ((match = regex.exec(content)) !== null) {
        const ref = match[1];
        if (!localFiles.has(ref)) {
            console.log(`[MISSING] In ${mod}: ${ref}`);
        }
    }
});
