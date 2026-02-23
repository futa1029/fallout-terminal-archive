const fs = require('fs');

// 1. Update title_to_slug.json
const jsonPath = 'f:/Fallout/title_to_slug.json';
let jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
jsonContent['ビリングス農場'] = 'billings-homestead';
fs.writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2), 'utf8');

// 2. Update lore.html
const htmlPath = 'f:/Fallout/lore.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

const newEntry = `        const loreEntries = [
            {
                name: "ビリングス農場",
                yomi: "ビリングス農場",
                url: "billings-homestead.html",
                category: "場所",
                appearance: ["Fallout 76"],
                date: "2026-02-23"
            },`;

htmlContent = htmlContent.replace('        const loreEntries = [', newEntry);
fs.writeFileSync(htmlPath, htmlContent, 'utf8');

console.log('Successfully updated title_to_slug.json and lore.html');
