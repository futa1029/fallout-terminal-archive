/**
 * generate_banners.js
 * YouTuber/Vtuber・攻略サイト募集バナー画像を生成
 * 日本語テキストをUTF-8で直接埋め込み
 */
const fs = require('fs');
const sharp = require('sharp');

const svgYT = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="300">
  <defs>
    <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="800" height="300" fill="#0a0a0a"/>
  <g opacity="0.07" stroke="#00ff00" stroke-width="1">
    <line x1="0" y1="50" x2="800" y2="50"/><line x1="0" y1="100" x2="800" y2="100"/>
    <line x1="0" y1="150" x2="800" y2="150"/><line x1="0" y1="200" x2="800" y2="200"/>
    <line x1="0" y1="250" x2="800" y2="250"/><line x1="100" y1="0" x2="100" y2="300"/>
    <line x1="200" y1="0" x2="200" y2="300"/><line x1="300" y1="0" x2="300" y2="300"/>
    <line x1="400" y1="0" x2="400" y2="300"/><line x1="500" y1="0" x2="500" y2="300"/>
    <line x1="600" y1="0" x2="600" y2="300"/><line x1="700" y1="0" x2="700" y2="300"/>
  </g>
  <rect x="10" y="10" width="780" height="280" fill="none" stroke="#00ff00" stroke-width="1.5" opacity="0.5"/>
  <text x="50" y="50" fill="#00aa00" font-family="sans-serif" font-size="13" opacity="0.6">&gt; RECRUITMENT.EXE</text>
  <text x="400" y="115" fill="#00ff00" font-family="sans-serif" font-size="50" font-weight="bold" text-anchor="middle" filter="url(#glow)">YouTube / Vtuber</text>
  <line x1="100" y1="140" x2="700" y2="140" stroke="#00ff00" stroke-width="1" opacity="0.4"/>
  <text x="400" y="185" fill="#ffce07" font-family="sans-serif" font-size="30" text-anchor="middle" font-weight="bold" filter="url(#glow)">活動紹介　掲載者　募集中</text>
  <text x="400" y="232" fill="#aaffaa" font-family="sans-serif" font-size="17" text-anchor="middle" opacity="0.8">紹介画像 / チャンネルURL / 紹介文を掲載します</text>
  <rect x="260" y="255" width="280" height="28" rx="3" fill="none" stroke="#ffce07" stroke-width="1" opacity="0.6"/>
  <text x="400" y="274" fill="#ffce07" font-family="sans-serif" font-size="15" text-anchor="middle">DMでお気軽にご連絡ください</text>
</svg>`;

const svgGuide = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="300">
  <defs>
    <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="800" height="300" fill="#0a0a0a"/>
  <g opacity="0.07" stroke="#00ff00" stroke-width="1">
    <line x1="0" y1="50" x2="800" y2="50"/><line x1="0" y1="100" x2="800" y2="100"/>
    <line x1="0" y1="150" x2="800" y2="150"/><line x1="0" y1="200" x2="800" y2="200"/>
    <line x1="0" y1="250" x2="800" y2="250"/><line x1="100" y1="0" x2="100" y2="300"/>
    <line x1="200" y1="0" x2="200" y2="300"/><line x1="300" y1="0" x2="300" y2="300"/>
    <line x1="400" y1="0" x2="400" y2="300"/><line x1="500" y1="0" x2="500" y2="300"/>
    <line x1="600" y1="0" x2="600" y2="300"/><line x1="700" y1="0" x2="700" y2="300"/>
  </g>
  <rect x="10" y="10" width="780" height="280" fill="none" stroke="#00ff00" stroke-width="1.5" opacity="0.5"/>
  <text x="50" y="50" fill="#00aa00" font-family="sans-serif" font-size="13" opacity="0.6">&gt; SITE_INDEX.EXE</text>
  <text x="400" y="115" fill="#00ff00" font-family="sans-serif" font-size="62" font-weight="bold" text-anchor="middle" filter="url(#glow)">攻略サイト</text>
  <line x1="100" y1="140" x2="700" y2="140" stroke="#00ff00" stroke-width="1" opacity="0.4"/>
  <text x="400" y="185" fill="#ffce07" font-family="sans-serif" font-size="30" text-anchor="middle" font-weight="bold" filter="url(#glow)">掲載サイト　募集中</text>
  <text x="400" y="232" fill="#aaffaa" font-family="sans-serif" font-size="17" text-anchor="middle" opacity="0.8">サイトURL / 紹介文 / 画像を掲載します</text>
  <rect x="260" y="255" width="280" height="28" rx="3" fill="none" stroke="#ffce07" stroke-width="1" opacity="0.6"/>
  <text x="400" y="274" fill="#ffce07" font-family="sans-serif" font-size="15" text-anchor="middle">DMでお気軽にご連絡ください</text>
</svg>`;

// UTF-8エンコーディングで書き出し
fs.writeFileSync('_yt_banner.svg', svgYT, 'utf8');
fs.writeFileSync('_guide_banner.svg', svgGuide, 'utf8');

Promise.all([
  sharp('_yt_banner.svg').png().toFile('images/youtuber-banner.png'),
  sharp('_guide_banner.svg').png().toFile('images/guide-banner.png')
]).then(() => {
  fs.unlinkSync('_yt_banner.svg');
  fs.unlinkSync('_guide_banner.svg');
  console.log('バナー画像生成完了: youtuber-banner.png / guide-banner.png');
}).catch(e => {
  console.error('エラー:', e.message);
});
