const https = require('https');

const titles = [
    'Dave_(Fallout_3)',
    'Roy_Phillips',
    'Sticky',
    'Gob',
    'Colin_Moriarty',
    'Lucas_Simms',
    'Sydney',
    'Herbert_Dashwood',
    'Argyle',
    'Pinkerton'
];

titles.forEach(t => {
    https.get('https://fallout.fandom.com/api.php?action=query&titles=' + encodeURIComponent(t) + '&format=json', r => {
        let d = ''; r.on('data', c=>d+=c);
        r.on('end', () => console.log(t + ' => ' + JSON.stringify(JSON.parse(d).query.pages).substring(0,50)));
    });
});
