const fs = require('fs');
let html = fs.readFileSync('f:/Fallout/deathclaw.html', 'utf8');

html = html.replace(/<meta property="og:description"[^>]+>/, '<meta property="og:description" content="デスクロー ── エンクレイヴが戦前に遺伝子工学で生み出した爬虫類型クリーチャー。ジャクソンカメレオンをベースに複数の動物種を混合し、人間兵士の代替として開発された。">');
html = html.replace(/<meta name="twitter:description"[^>]+>/, '<meta name="twitter:description" content="デスクロー ── エンクレイヴが戦前に遺伝子工学で生み出した爬虫類型クリーチャー。Falloutシリーズを代表する最強の敵。">');

fs.writeFileSync('f:/Fallout/deathclaw.html', html, 'utf8');
console.log('Meta tags fixed');
