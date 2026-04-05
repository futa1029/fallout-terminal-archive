const fs = require('fs');

const entries = [
  {slug: "santa-monica", en: "Santa Monica", ja: "サンタモニカ", yomi: "さんたもにか"},
  {slug: "donut-shop", en: "Donut shop", ja: "ドーナツショップ", yomi: "どーなつしょっぷ"},
  {slug: "starlight-drive-in-theatre-tv-series", en: "Starlight Drive-In Theatre (TV series)", ja: "スターライト・ドライブイン", yomi: "すたーらいと・どらいぶいん"},
  {slug: "camp-golf-tent", en: "Camp Golf tent", ja: "キャンプ・ゴルフのテント", yomi: "きゃんぷ・ごるふのてんと"},
  {slug: "santa-monica-pier", en: "Santa Monica Pier", ja: "サンタモニカ・ピア", yomi: "さんたもにか・ぴあ"},
  {slug: "affordable-al-s-discount-hospital", en: "Affordable Al's Discount Hospital", ja: "アフォーダブル・アルのディスカウント・ホスピタル", yomi: "あふぉーだぶる・あるのでぃすかうんと・ほすぴたる"},
  {slug: "headquarters-of-the-united-nations", en: "Headquarters of the United Nations", ja: "国際連合本部", yomi: "こくさいれんごうほんぶ"},
  {slug: "westside-medical-clinic", en: "Westside Medical Clinic", ja: "ウエストサイド・メディカル・クリニック", yomi: "うえすとさいど・めでぃかる・くりにっく"},
  {slug: "yao-guai-cave-tv-series", en: "Yao guai cave (TV series)", ja: "ヤオ・グアイの洞窟", yomi: "やお・ぐあいのどうくつ"},
  {slug: "sonny-s-sundries", en: "Sonny's Sundries", ja: "ソニーズ・サンドリーズ", yomi: "そにーず・さんどりーず"},
  {slug: "the-ghoul-s-grave", en: "The Ghoul's grave", ja: "グールの墓", yomi: "ぐーるのはか"},
  {slug: "bbq-shack-tv-series", en: "BBQ Shack (TV series)", ja: "BBQシャック", yomi: "ばーべきゅーしゃっく"},
  {slug: "soviet-satellite", en: "Soviet satellite", ja: "ソビエトの人工衛星", yomi: "そびえとのじんこうえいせい"},
  {slug: "red-rocket-tv-series", en: "Red Rocket (TV series)", ja: "レッドロケット", yomi: "れっどろけっと"},
  {slug: "hawthorne-medical-laboratories", en: "Hawthorne Medical Laboratories", ja: "ホーソーン・メディカル・ラボラトリーズ", yomi: "ほーそーん・めでぃかる・らぼらとりーず"}
];

let today = new Date().toISOString().split('T')[0];

console.log("Updating title_to_slug...");
let tsPath = 'f:/Fallout/title_to_slug.json';
let titleToSlug = JSON.parse(fs.readFileSync(tsPath, 'utf8'));

for (let e of entries) {
    titleToSlug[e.en] = e.slug + '.html';
    titleToSlug[e.ja] = e.slug + '.html';
    if(e.en.includes('(TV series)')) {
        titleToSlug[e.en.replace(' (TV series)', '')] = e.slug + '.html';
    }
}
fs.writeFileSync(tsPath, JSON.stringify(titleToSlug, null, 2));

console.log("Updating remove_duplicates.js...");
let remDupPath = 'f:/Fallout/remove_duplicates.js';
let remDup = fs.readFileSync(remDupPath, 'utf8');

let inserts = "";
for (let e of [...entries].reverse()) {
    if (!remDup.includes(e.slug + ".html")) {
        inserts += `    {
        name: "${e.ja}",
        yomi: "${e.yomi}",
        url: "${e.slug}.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "${today}",
        status: "published"
    },\n`;
    }
}

if (inserts !== "") {
    remDup = remDup.replace('const manualEntries = [', 'const manualEntries = [\n' + inserts);
    fs.writeFileSync(remDupPath, remDup);
    console.log("Added entries to remove_duplicates.js");
} else {
    console.log("Entries already exist in remove_duplicates.js");
}

console.log('Done!');
