const fs = require('fs');
const path = require('path');

const slug = 'snallygaster-fo76';
const xDir = `f:/Fallout/_X/${slug}`;
const imgDir = `${xDir}/images`;

if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

const postContent = `#Fallout76

Snallygaster
https://www.fallout-jp.com/${slug}.html

概要

スナリーギャスターは、アパラチア全域に生息する変異クリーチャーです。
その姿はウエスト・バージニアの伝説に登場する怪物を彷彿とさせますが、実際には大戦直前のWest Tek研究所における非人道的な実験によって生み出された悲劇の産物です。

---

背景

アパラチアのWest Tek研究センターで行われた組み換え型FEVの実験は、数多くの失敗作を生み出しましたが、その中で安定した数少ない成功例の一つがスナリーギャスターでした。
2077年10月14日、被験体AM52において、複数の種を組み合わせたような変異が安定して定着しました。
研究者たちはその外見を「悍ましい」と評しながらも、組み換えFEVの可能性を示す貴重な知見として記録しています。
2078年1月3日、この被験体AM52は収容施設から脱走し、外部へと流出しました。
施設外へ出た個体は繁殖を繰り返し、結果としてアパラチア全域にスナリーギャスターが蔓延することとなったのです。

---

特徴と生態

スナリーギャスターは四足歩行を行いますが、背中にはさらに2本の小さな肢を持っており、合計6本の四肢を有します。
口からは酸性の粘液を帯びた触手のような長い舌が伸びています。
最大の特徴は、背中に沿って並ぶ40個以上の目です。
また、体からはカチカチという独特のクリック音を発し、周囲に刺激的な悪臭を漂わせます。

遠距離では口から毒性のスライムを吐き出し、近距離では鋭い爪や、鞭のようにしなる長い舌による打撃を行います。
放射線ダメージを完全に無効化しますが、頭部が弱点となっています。

---

バリエーション

生息環境や変異の度合いにより、初期、成体、悪臭、血まみれ、発光、そしてスコーチといった亜種が確認されています。

---

舞台裏

スナリーギャスターは、メリーランド州フレデリック郡に伝わる伝説の怪物（ドイツ語の「素早い幽霊」が由来）に基づいています。
コンセプトアートの段階では、神話上の恐怖の獣というよりも、FEVによって「極限まで変異してしまった生物」というアプローチでデザインされました。

---

💭 感想

目がいっぱいある見た目のキモさがとにかくインパクト大。
毒の峡谷を歩いていると突然酸を飛ばしてくるのが厄介で、特にローレベル時は恐怖の対象でした。
FEV実験の産物という設定でグラフトン・モンスターと出自が同じなのも面白いポイント。
メリーランドの実在する都市伝説がモデルで、ドイツ語由来の名前というのも異国情緒があって良いですね。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.`;

fs.writeFileSync(`${xDir}/post.md`, postContent, 'utf8');

// 画像のコピー
const srcBase = `f:/Fallout/images/note_extracted/${slug}`;
const imagesToCopy = [
    'fallout76_tales_snallygaster.png',
    'fo76_ben_carnow_snallygaster_concept_art.jpg',
    'fo76_glowing_snallygaster.jpg',
    'fo76-snallygaster-spawn-locations.jpeg'
];

imagesToCopy.forEach((img, i) => {
    const src = `${srcBase}/${img}`;
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, `${imgDir}/img_${i}.png`); // X投稿用にリネーム
    }
});

console.log('X post files updated.');
