// FO76キャラクター100件をmanualEntriesに登録するためのエントリ生成
const fs = require('fs');

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[()''""\.]/g, '').replace(/,/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function toYomi(name) {
  // 簡易的にアルファベットをそのまま小文字化（ソート用）
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const allChars = [
  // B.O.S. (13)
  ...['Elizabeth Taggerdy','Kerry (Brotherhood)','Esposito','Gary Weber','Grant McNamara','Hailey Takano','Hannah de Silva','Johnny Moreno','Roger Maxson','Swafford (Brotherhood)','Ted Wilson','Tex Rogers','Vendor bot Phoenix'].map(n => ({ name: n.replace(/ \(.+\)/, ''), wikiName: n })),
  // Enclave (11)
  ...['Donnelley','Ellen Santiago','Jefferson Grey','MODUS armory terminal','MODUS medical terminal','MODUS production terminal','MODUS science terminal','N. Jackson','Ragnarsdottir','Thomas Eckhart','T. Harper'].map(n => ({ name: n, wikiName: n })),
  // Free States (22)
  ...['Abigayle Singh','Cedric','Caleb Carson','Courtney Kelly','Duncan McKann','Ella Ames','Hardball','Jacob Lerner','Jacqueline Murphy','Jesus Sunday','Juan Diego Sunday','Kendyll Sims','Kora','Lucy Harwick','Nari Samir','Niraj Singh','Raleigh Clay','Randy Calloway','Rover','Sam Blackwell','Sara Samir','Vendor bot Wallace'].map(n => ({ name: n, wikiName: n })),
  // Raider (15)
  ...['Bosley','Brody Torrance','Carol Sweeney','David Thorpe','Edie Stevens','Freddie Lang','Henrick','Jim (raider)','Kerry (Cutthroats)','Margie McClintock','Milo (raider)','Morris Stevens','Rosalynn Jeffries','Rose (Fallout 76)','Walter Griswold'].map(n => ({ name: n.replace(/ \(.+\)/, ''), wikiName: n })),
  // Responders (29)
  ...['Allemane','Amy Kerry','Andrew Rhodes','Bernie','Caleb Widmer','Claire Hudson','Colonel','Cominsky','Darion Jones','Dassa Ben-Ami','Hank Madigan','Holstein','Maxine Ballard','Miguel Caldera','Mr. Fluffy','Paul (Responders)','Responder courier','Responder Rocky','Rita Wilcox','Scott Shepherd','Sofie Yates','Steelheart','Sylvester Tate','Timothy Wolfe','Vendor bot Bob','Vendor bot Chad','Vendor bot Greg','Vendor bot Mack','Vendor bot Responder'].map(n => ({ name: n.replace(/ \(.+\)/, ''), wikiName: n })),
  // Vault 76 (10)
  ...['Vault 76 overseer','Alderton','Cavendish','Crowley (Fallout 76)','Crutchley','Higgenbottom','Merriman','Pennington','Poole','Worthy'].map(n => ({ name: n.replace(/ \(.+\)/, ''), wikiName: n })),
];

const entries = allChars.map(c => {
  const slug = slugify(c.wikiName);
  return `    { name: "${c.name}", yomi: "${toYomi(c.name)}", url: "${slug}.html", category: "人物", appearance: ["Fallout 76"], date: "2026-03-27", status: "draft" },`;
});

console.log(`// === FO76 キャラクター記事 ${entries.length}件 (2026-03-27) ===`);
entries.forEach(e => console.log(e));
