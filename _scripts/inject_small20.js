const fs = require('fs');

const transMap = JSON.parse(fs.readFileSync('f:/Fallout/_scripts/batch1_translations.json', 'utf8'));

for(let [slug, data] of Object.entries(transMap)) {
    const htmlPath = 'f:/Fallout/' + slug + '.html';
    if(fs.existsSync(htmlPath)) {
        let html = fs.readFileSync(htmlPath, 'utf8');
        
        // Replace H1 title
        html = html.replace(/<h1>.*?<br>/, '<h1>' + data.title + '<br>');
        
        // Replace body content between <div class="infobox"> ... </div>  AND  <div class="quote-box">
        let replaced = html.replace(/(<div class="infobox">.*?<\/div>\s*)([\s\S]*?)(\s*<div class="quote-box">)/, '$1' + data.text + '$3');
        
        // Remove placeholder text in the quote box
        replaced = replaced.replace(/自動生成によるロケーションインポート。<br>※本テキストは未翻訳のプレースホルダーです。/, '（準備中）');
        
        fs.writeFileSync(htmlPath, replaced, 'utf8');
        console.log('Injected translates for ' + slug);
    }
}
