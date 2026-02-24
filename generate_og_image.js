/**
 * generate_og_image.js
 * sharpを使って、SVGからOGP画像（og-image.png）を生成するスクリプト。
 * 1200x630px, Falloutターミナル風デザイン
 */

const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const OUTPUT_PATH = path.join('images', 'og-image.png');

// SVGテンプレート（1200x630px）
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <!-- 背景グラデーション -->
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#0a1a0a"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    <!-- 緑グロー -->
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <!-- 強いグロー -->
    <filter id="strongGlow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- 背景 -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>

  <!-- グリッドライン（薄緑） -->
  <g opacity="0.06" stroke="#00ff00" stroke-width="1">
    <line x1="0" y1="63" x2="1200" y2="63"/>
    <line x1="0" y1="126" x2="1200" y2="126"/>
    <line x1="0" y1="189" x2="1200" y2="189"/>
    <line x1="0" y1="252" x2="1200" y2="252"/>
    <line x1="0" y1="315" x2="1200" y2="315"/>
    <line x1="0" y1="378" x2="1200" y2="378"/>
    <line x1="0" y1="441" x2="1200" y2="441"/>
    <line x1="0" y1="504" x2="1200" y2="504"/>
    <line x1="0" y1="567" x2="1200" y2="567"/>
    <line x1="120" y1="0" x2="120" y2="630"/>
    <line x1="240" y1="0" x2="240" y2="630"/>
    <line x1="360" y1="0" x2="360" y2="630"/>
    <line x1="480" y1="0" x2="480" y2="630"/>
    <line x1="600" y1="0" x2="600" y2="630"/>
    <line x1="720" y1="0" x2="720" y2="630"/>
    <line x1="840" y1="0" x2="840" y2="630"/>
    <line x1="960" y1="0" x2="960" y2="630"/>
    <line x1="1080" y1="0" x2="1080" y2="630"/>
  </g>

  <!-- スキャンライン効果 -->
  <rect width="1200" height="630" fill="url(#scanlines)" opacity="0.05"/>

  <!-- ボーダー -->
  <rect x="20" y="20" width="1160" height="590" fill="none" stroke="#00ff00" stroke-width="2" opacity="0.5"/>
  <rect x="25" y="25" width="1150" height="580" fill="none" stroke="#00ff00" stroke-width="1" opacity="0.2"/>

  <!-- コーナー装飾 -->
  <g stroke="#00ff00" stroke-width="2" fill="none" opacity="0.8">
    <line x1="20" y1="20" x2="80" y2="20"/>
    <line x1="20" y1="20" x2="20" y2="80"/>
    <line x1="1180" y1="20" x2="1120" y2="20"/>
    <line x1="1180" y1="20" x2="1180" y2="80"/>
    <line x1="20" y1="610" x2="80" y2="610"/>
    <line x1="20" y1="610" x2="20" y2="550"/>
    <line x1="1180" y1="610" x2="1120" y2="610"/>
    <line x1="1180" y1="610" x2="1180" y2="550"/>
  </g>

  <!-- ROBCO ロゴ装飾テキスト -->
  <text x="60" y="55" fill="#00ff00" font-family="monospace" font-size="14" opacity="0.5">ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM</text>
  <text x="900" y="55" fill="#00ff00" font-family="monospace" font-size="14" opacity="0.5">COPYRIGHT 2076</text>

  <!-- メインタイトル -->
  <text x="600" y="220" fill="#00ff00" font-family="monospace" font-size="86" font-weight="bold"
    text-anchor="middle" letter-spacing="4" filter="url(#strongGlow)">FALLOUT JP</text>

  <!-- サブタイトル (英語) -->
  <text x="600" y="300" fill="#00ff00" font-family="monospace" font-size="40"
    text-anchor="middle" letter-spacing="8" filter="url(#glow)" opacity="0.9">COMMUNITY</text>

  <!-- 区切り線 -->
  <line x1="200" y1="330" x2="1000" y2="330" stroke="#00ff00" stroke-width="1" opacity="0.4"/>

  <!-- 日本語テキスト -->
  <text x="600" y="400" fill="#00ff00" font-family="monospace" font-size="42"
    text-anchor="middle" filter="url(#glow)">ロア・アーカイブ</text>

  <!-- 説明テキスト -->
  <text x="600" y="460" fill="#aaffaa" font-family="monospace" font-size="22"
    text-anchor="middle" opacity="0.8">日本語Falloutファンコミュニティ</text>

  <!-- 記事数バッジ -->
  <rect x="490" y="490" width="220" height="46" rx="4" fill="none" stroke="#00ff00" stroke-width="1.5" opacity="0.7"/>
  <text x="600" y="520" fill="#ffce07" font-family="monospace" font-size="22"
    text-anchor="middle" font-weight="bold" filter="url(#glow)">240+ 記事収録</text>

  <!-- フッター -->
  <text x="600" y="590" fill="#00aa00" font-family="monospace" font-size="16"
    text-anchor="middle" opacity="0.6">www.fallout-jp.com | OVERSEER MOHI</text>

  <!-- ブリンクカーソル装飾 -->
  <rect x="60" y="590" width="10" height="18" fill="#00ff00" opacity="0.7"/>
</svg>`;

// imagesディレクトリが存在しない場合は作成
if (!fs.existsSync('images')) {
    fs.mkdirSync('images');
}

// SVGをPNGに変換
sharp(Buffer.from(svg))
    .png()
    .toFile(OUTPUT_PATH)
    .then(() => {
        console.log(`OGP画像を生成しました: ${OUTPUT_PATH}`);
    })
    .catch(err => {
        console.error('エラー:', err.message);
    });
