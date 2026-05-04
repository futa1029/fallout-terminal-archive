const fs = require('fs');
const files = ['athena.html', 'autumn-acre-cabin.html', 'buds_full.html', 'commie-kazi.html', 'commissioner-chaos.html', 'cynnoc.html', 'dr-brainwash.html', 'joey-bello.html', 'manta-man.html', 'mechanist.html', 'moe-the-mole.html', 'poseidonet.html'];
files.forEach(f => {
    let txt = fs.readFileSync('f:/Fallout/' + f, 'utf8');
    txt = txt.replace(/<div style="margin-top: 30px\r?\n/, '<div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">\n');
    fs.writeFileSync('f:/Fallout/' + f, txt);
});
console.log('Fixed tags');
