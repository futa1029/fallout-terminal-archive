const fs = require('fs');

const transMap = JSON.parse(fs.readFileSync('f:/Fallout/_scripts/batch2_translations.json', 'utf8'));

for(let [slug, data] of Object.entries(transMap)) {
    const htmlPath = 'f:/Fallout/' + slug + '.html';
    if(fs.existsSync(htmlPath)) {
        let html = fs.readFileSync(htmlPath, 'utf8');
        
        // Replace H1 title
        html = html.replace(/<h1>.*?<br>/, '<h1>' + data.title + '<br>');
        
        let replaced = html.replace(/(<div class="infobox">.*?<\/div>\s*)([\s\S]*?)(\s*<div class="quote-box">)/, '$1' + data.text + '$3');
        replaced = replaced.replace(/自動生成によるロケーションインポート。<br>※本テキストは未翻訳のプレースホルダーです。/, '（準備中）');
        
        fs.writeFileSync(htmlPath, replaced, 'utf8');
        console.log('Injected translates for ' + slug);
    }
}
