const fs = require('fs');

fs.renameSync('F:/Fallout/images/note_extracted/four-leaf-fishpacking-plant/img_main.net', 'F:/Fallout/images/note_extracted/four-leaf-fishpacking-plant/img_main.jpg');
fs.renameSync('F:/Fallout/images/note_extracted/gwinnett-brewery/img_main.net', 'F:/Fallout/images/note_extracted/gwinnett-brewery/img_main.jpg');

let html1 = fs.readFileSync('F:/Fallout/four-leaf-fishpacking-plant.html', 'utf8');
html1 = html1.replace(/img_main\.jpg/g, 'img_main.jpg').replace(/img_main\.[a-zA-Z0-9]+/, 'img_main.jpg'); // Ensure
fs.writeFileSync('F:/Fallout/four-leaf-fishpacking-plant.html', html1);

let html2 = fs.readFileSync('F:/Fallout/gwinnett-brewery.html', 'utf8');
html2 = html2.replace(/img_main\.[a-zA-Z0-9]+/, 'img_main.jpg');
fs.writeFileSync('F:/Fallout/gwinnett-brewery.html', html2);
