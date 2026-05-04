const fs = require('fs');

const tvSeriesLocations = [
  'Abandoned taco stand',
  'Adobe church',
  "Affordable Al's Discount Hospital",
  'Area 51',
  'Atomic Wrangler Casino',
  'BBQ Shack (TV series)',
  'Brotherhood base',
  "Caesar's Legion camp",
  'California Crest Studios',
  'Camp Golf',
  'Camp Golf tent',
  'Dinky the T-Rex',
  'Dino Dee-lite Motel',
  'Donut shop',
  'Enclave research colony',
  'Fabulous New Vegas sign',
  'Filly',
  'Freeside',
  'Golden Globes Porn',
  'Griffith Observatory',
  'Hawthorne Medical Laboratories',
  'Headquarters of the United Nations',
  'Hollywood',
  'Hollywood Boulevard',
  'Hollywood Forever',
  'Hollywood Hills',
  'Hollywood Sign',
  'Hollywood Walk of Fame',
  'House Resort',
  'Howard residence',
  "King's School of Impersonation",
  'KPSS radio station',
  'Las Vegas management Vault',
  'Los Angeles City Hall',
  'Los Angeles International Airport',
  "Ma June's Sundries",
  "Mick & Ralph's",
  'Mirage Pictures',
  'Mojave Mission School',
  'Mojave Wasteland',
  'NCR outpost',
  'Primm',
  'Red Rocket (TV series)',
  'Run-down town',
  'Santa Monica',
  'Santa Monica Pier',
  'Shadowy facility',
  'Shady Sands civic center',
  'Shady Sands courthouse',
  'Shady Sands Elementary School',
  'Shady Sands Public Library',
  'Silver Rush',
  "Sonny's Sundries",
  'Soviet satellite',
  'Spencer residence',
  'Starlight Drive-in Theatre (TV series)',
  'Sunset Sarsaparilla factory',
  'Super Duper Mart (TV series)',
  "The Ghoul's grave",
  'Ultra-Luxe',
  'Uranium City Internment Camp',
  'Vault 4',
  'Vault 24',
  'Vault 32',
  'Vault 33',
  'Vault-Tec headquarters (TV series)',
  'Westside Medical Clinic',
  'Wilds',
  'Yao guai cave (TV series)'
];

fs.writeFileSync('f:/Fallout/_drafts/tv_locations_list.json', JSON.stringify(tvSeriesLocations, null, 2));

const htmls = fs.readdirSync('f:/Fallout').filter(f => f.endsWith('.html'));
const existing = [];
const nonExisting = [];

for(const loc of tvSeriesLocations) {
    const tempName = loc.toLowerCase().replace(/[^a-z0-g0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    let found = false;
    for(const html of htmls) {
        if(html.includes(tempName)) {
            found = true;
            existing.push({loc, html});
            break;
        }
    }
    if(!found) {
        nonExisting.push(loc);
    }
}
const output = 'Total: ' + tvSeriesLocations.length + '\nExisting: ' + existing.length + '\nMissing: ' + nonExisting.length + '\nMissing list: ' + JSON.stringify(nonExisting, null, 2);
fs.writeFileSync('f:/Fallout/_drafts/tv_locations_status.txt', output);
console.log(output);
