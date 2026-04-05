const https = require('https');

const titles = [
    'Butch_DeLoria',
    'Jericho',
    'Clover',
    'Cross',
    'Dogmeat_(Fallout_3)',
    'Robert_Joseph_MacCready',
    'Madison_Li',
    'Arthur_Maxson',
    'Flak',
    'Shrapnel'
];

titles.forEach(t => {
    https.get('https://fallout.fandom.com/api.php?action=query&titles=' + encodeURIComponent(t) + '&format=json', r => {
        let d = ''; r.on('data', c=>d+=c);
        r.on('end', () => console.log(t + ' => ' + JSON.stringify(JSON.parse(d).query.pages).substring(0,50)));
    });
});
