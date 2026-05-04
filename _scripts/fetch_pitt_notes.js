const https = require('https');
const fs = require('fs');

const pages = [
  "Elsie's_story",
  "Paige's_journal,_entry_1",
  "The_Old_Guard,_Vol_14:_Ch_2",
  "The_Hellcats'_new_assignment",
  "Hellcat_contract",
  "Haven_terminal_entries",
  "Ashur's_diary",
  "Rollings_--_We're_done",
  "Marcella's_journal",
  "Blackwater_Mine_terminal_entries",
  "Holland_Chase_Invoice_9021",
  "Scavenger's_journal_(Expeditions:_The_Pitt)",
  "Product_ID_cheat_sheet",
  "Waste_storage_memo",
  "Concerned_employee",
  "I'm_getting_out_of_this_town",
  "The_Sanctum_terminal_entries",
  "A_farewell_to_Pittsburgh",
  "Union_missive"
];
let results = {};
let count = 0;

pages.forEach(page => {
    // replace ' with %27 for the URL
    let safePage = page.replace(/'/g, "%27");
    const url = 'https://fallout.fandom.com/api.php?action=parse&page=' + encodeURIComponent(page) + '&prop=wikitext&format=json';
    https.get(url, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
            const data = JSON.parse(body);
            if(data.parse && data.parse.wikitext) {
                results[page] = data.parse.wikitext['*'];
            } else {
                results[page] = 'Error or not found: ' + body;
            }
            count++;
            if(count === pages.length) {
                fs.writeFileSync('f:/Fallout/_drafts/the_pitt_notes.json', JSON.stringify(results, null, 2));
                console.log('Done fetching notes: ' + Object.keys(results).length);
            }
        });
    }).on('error', (e) => console.log('Error fetching ' + page + ': ' + e.message));
});
