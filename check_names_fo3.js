const https = require('https');

const titles = [
    'James_(Fallout_3)',
    'Amata_Almodovar',
    'Sarah_Lyons',
    'Owyn_Lyons',
    'John_Henry_Eden',
    'Augustus_Autumn',
    'Three_Dog',
    'Moira_Brown',
    'Fawkes',
    'Charon_(Fallout_3)'
];

titles.forEach(t => {
    https.get('https://fallout.fandom.com/api.php?action=query&titles=' + encodeURIComponent(t) + '&format=json', r => {
        let d = ''; r.on('data', c=>d+=c);
        r.on('end', () => console.log(t + ' => ' + JSON.stringify(JSON.parse(d).query.pages).substring(0,50)));
    });
});
