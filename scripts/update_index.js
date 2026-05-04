const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, '..', 'js', 'lore_index.js');
let content = fs.readFileSync(indexFile, 'utf8').trim();

const newEntry = `,
    {
        name: "Brotherhood of Steel",
        yomi: "ぶらざーふっどおぶすてぃーる",
        url: "brotherhood-of-steel.html",
        category: "勢力",
        appearance: [
            "Fallout",
            "Fallout 2",
            "Fallout 3",
            "Fallout 4",
            "Fallout 76",
            "Fallout: New Vegas",
            "Fallout TV"
        ],
        date: "2026-05-02"
    }
];`;

if (content.endsWith('];')) {
    const updatedContent = content.substring(0, content.length - 2) + newEntry;
    fs.writeFileSync(indexFile, updatedContent, 'utf8');
    console.log('Successfully added Brotherhood of Steel to lore_index.js');
} else {
    console.error('Could not find the end of the array (];)');
}
