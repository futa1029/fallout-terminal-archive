/**
 * generate_banners.js
 * YouTuber/Vtuber・攻略サイト募集バナー画像を生成
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
  <text x="50" y="50" fill="#00aa00" font-family="monospace" font-size="13" opacity="0.6">&gt; RECRUITMENT.EXE</text>
  <text x="400" y="115" fill="#00ff00" font-family="monospace" font-size="50" font-weight="bold" text-anchor="middle" filter="url(#glow)">YouTube / Vtuber</text>
  <line x1="100" y1="140" x2="700" y2="140" stroke="#00ff00" stroke-width="1" opacity="0.4"/>
  <text x="400" y="185" fill="#ffce07" font-family="monospace" font-size="30" text-anchor="middle" font-weight="bold" filter="url(#glow)">&#27963;&#21205;&#32057;&#20171; &#25387;&#36020;&#32773; &#24155;&#38598;&#20013;</text>
  <text x="400" y="232" fill="#aaffaa" font-family="monospace" font-size="17" text-anchor="middle" opacity="0.8">&#32057;&#20171;&#30011;&#20687; / &#12481;&#12515;&#12531;&#12493;&#12523;URL / &#32057;&#20171;&#25991;&#12434;&#25563;&#36617;&#12375;&#12414;&#12377;</text>
  <rect x="260" y="255" width="280" height="28" rx="3" fill="none" stroke="#ffce07" stroke-width="1" opacity="0.6"/>
  <text x="400" y="274" fill="#ffce07" font-family="monospace" font-size="15" text-anchor="middle">DM&#12391;&#12362;&#27083;&#12356;&#12395;&#12372;&#36899;&#32097;&#12367;&#12384;&#12373;&#12356;</text>
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
  <text x="50" y="50" fill="#00aa00" font-family="monospace" font-size="13" opacity="0.6">&gt; SITE_INDEX.EXE</text>
  <text x="400" y="115" fill="#00ff00" font-family="monospace" font-size="62" font-weight="bold" text-anchor="middle" filter="url(#glow)">&#25915;&#30053;&#12469;&#12452;&#12488;</text>
  <line x1="100" y1="140" x2="700" y2="140" stroke="#00ff00" stroke-width="1" opacity="0.4"/>
  <text x="400" y="185" fill="#ffce07" font-family="monospace" font-size="30" text-anchor="middle" font-weight="bold" filter="url(#glow)">&#25563;&#36617;&#12469;&#12452;&#12488; &#24155;&#38598;&#20013;</text>
  <text x="400" y="232" fill="#aaffaa" font-family="monospace" font-size="17" text-anchor="middle" opacity="0.8">&#12469;&#12452;&#12488;URL / &#32057;&#20171;&#25991; / &#30011;&#20687;&#12434;&#25563;&#36617;&#12375;&#12414;&#12377;</text>
  <rect x="260" y="255" width="280" height="28" rx="3" fill="none" stroke="#ffce07" stroke-width="1" opacity="0.6"/>
  <text x="400" y="274" fill="#ffce07" font-family="monospace" font-size="15" text-anchor="middle">DM&#12391;&#12362;&#27683;&#12356;&#12395;&#12372;&#36899;&#32097;&#12367;&#12384;&#12373;&#12356;</text>
</svg>`;

Promise.all([
    sharp(Buffer.from(svgYT)).png().toFile('images/youtuber-banner.png'),
    sharp(Buffer.from(svgGuide)).png().toFile('images/guide-banner.png')
]).then(() => {
    console.log('バナー画像生成完了: youtuber-banner.png / guide-banner.png');
}).catch(e => {
    console.error('エラー:', e.message);
});
