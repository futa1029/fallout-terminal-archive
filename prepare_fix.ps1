const fs = require('fs');
let html = fs.readFileSync('f:/Fallout/deathclaw.html', 'utf8');

// Replace meta tags
html = html.replace(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="デスクロー  エンクレイヴが戦前に遺伝子工学で生み出した爬虫類型クリーチャー。ジャクソンカメレオンをベースに複数の動物種を混合し、人間兵士の代替として開発された。">');
html = html.replace(/<meta name="twitter:description" content="[^"]*">/, '<meta name="twitter:description" content="デスクロー  エンクレイヴが戦前に遺伝子工学で生み出した爬虫類型クリーチャー。Falloutシリーズを代表する最強の敵。">');

// Replace Infobox garbled text
html = html.replace(/alt="チEクロー"/g, 'alt="デスクロー"');
html = html.replace(/<span class="infobox-label">タイチE\/span>/, '<span class="infobox-label">タイプ</span>');
html = html.replace(/<span class="infobox-label">種旁E\/span>/, '<span class="infobox-label">種族</span>');
html = html.replace(/<span>チEクロー<\/span>/, '<span>デスクロー</span>');
html = html.replace(/<span class="infobox-label">起溁E\/span><span>エンクレイブE遺伝子実騁Ebr>EジャクソンカメレオンベEスEE\/span>/, '<span class="infobox-label">起源</span><span>エンクレイヴの遺伝子実験<br>（ジャクソンカメレオンベース）</span>');
html = html.replace(/<span class="infobox-label">特徴<\/span><span>二足歩衁E巨大な爪<br>高い耐乁E知性<\/span>/, '<span class="infobox-label">特徴</span><span>二足歩行、巨大な爪<br>高い耐久力知性</span>');

// Replace H1 Title
html = html.replace(/チEクロー<\/span><\/h1>/, 'デスクロー</span></h1>');

fs.writeFileSync('f:/Fallout/fix.js', 'console.log(\"Saved\");');
