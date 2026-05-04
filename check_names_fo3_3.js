const https = require('https');

const titles = [
    'Agatha',
    'Allistair_Tenpenny',
    'Sierra_Petrovita',
    'Zimmer',
    'Uncle_Leo',
    'Desmond_Lockheart',
    'Calvert',
    'Ishmael_Ashur',
    'Wernher',
    'Jingwei'
];

titles.forEach(t => {
    https.get('https://fallout.fandom.com/api.php?action=query&titles=' + encodeURIComponent(t) + '&format=json', r => {
        let d = ''; r.on('data', c=>d+=c);
        r.on('end', () => console.log(t + ' => ' + JSON.stringify(JSON.parse(d).query.pages).substring(0,50)));
    });
});
