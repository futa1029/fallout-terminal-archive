const https = require('https');

const titles = [
    'Oliver_Swanick',
    'Motor-Runner',
    'Cook-Cook',
    'Driver_Nephi',
    'Follows-Chalk',
    'Daniel_(Honest_Hearts)',
    'Red_Lucy',
    'Orion_Moreno',
    'Henry_(Fallout:_New_Vegas)',
    'Beagle'
];

titles.forEach(t => {
    https.get('https://fallout.fandom.com/api.php?action=query&titles=' + encodeURIComponent(t) + '&format=json', r => {
        let d = ''; r.on('data', c=>d+=c);
        r.on('end', () => console.log(t + ' => ' + JSON.stringify(JSON.parse(d).query.pages).substring(0,50)));
    });
});
