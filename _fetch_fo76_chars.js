// Phase 1: 主要ファクションキャラクターのWikiデータ一括取得
const fs = require('fs');
const https = require('https');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fetchWikitext(title) {
  return new Promise((resolve) => {
    const url = `https://fallout.fandom.com/api.php?action=parse&page=${encodeURIComponent(title)}&prop=wikitext|images&format=json`;
    https.get(url, { headers: { 'User-Agent': 'FalloutLoreArchive/1.0' } }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          if (j.error) { resolve(null); return; }
          resolve({ wikitext: j.parse.wikitext['*'], images: j.parse.images || [] });
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

// Phase1対象: B.O.S. + Enclave + Free States + Raider + Responders
const characters = [
  // Brotherhood of Steel (13)
  'Elizabeth Taggerdy','Kerry (Brotherhood)','Esposito','Gary Weber','Grant McNamara',
  'Hailey Takano','Hannah de Silva','Johnny Moreno','Roger Maxson','Swafford (Brotherhood)',
  'Ted Wilson','Tex Rogers','Vendor bot Phoenix',
  // Enclave (11)
  'Donnelley','Ellen Santiago','Jefferson Grey','MODUS armory terminal','MODUS medical terminal',
  'MODUS production terminal','MODUS science terminal','N. Jackson','Ragnarsdottir',
  'Thomas Eckhart','T. Harper',
  // Free States (22)
  'Abigayle Singh','Cedric','Caleb Carson','Courtney Kelly','Duncan McKann','Ella Ames',
  'Hardball','Jacob Lerner','Jacqueline Murphy','Jesus Sunday','Juan Diego Sunday',
  'Kendyll Sims','Kora','Lucy Harwick','Nari Samir','Niraj Singh','Raleigh Clay',
  'Randy Calloway','Rover','Sam Blackwell','Sara Samir','Vendor bot Wallace',
  // Raider (Base game 15)
  'Bosley','Brody Torrance','Carol Sweeney','David Thorpe','Edie Stevens','Freddie Lang',
  'Henrick','Jim (raider)','Kerry (Cutthroats)','Margie McClintock','Milo (raider)',
  'Morris Stevens','Rosalynn Jeffries','Rose (Fallout 76)','Walter Griswold',
  // Responders (29)
  'Allemane','Amy Kerry','Andrew Rhodes','Bernie','Caleb Widmer','Claire Hudson',
  'Colonel','Cominsky','Darion Jones','Dassa Ben-Ami','Hank Madigan','Holstein',
  'Maxine Ballard','Miguel Caldera','Mr. Fluffy','Paul (Responders)',
  'Responder courier','Responder Rocky','Rita Wilcox','Scott Shepherd','Sofie Yates',
  'Steelheart','Sylvester Tate','Timothy Wolfe','Vendor bot Bob','Vendor bot Chad',
  'Vendor bot Greg','Vendor bot Mack','Vendor bot Responder',
  // Vault 76 (10)
  'Vault 76 overseer','Alderton','Cavendish','Crowley (Fallout 76)','Crutchley',
  'Higgenbottom','Merriman','Pennington','Poole','Worthy',
];

async function main() {
  const outputPath = 'F:/Fallout/_fo76_chars_wiki_data.json';
  let data = {};
  if (fs.existsSync(outputPath)) {
    data = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  }

  const remaining = characters.filter(c => !data[c]);
  console.log(`既存: ${Object.keys(data).length}件, 残り: ${remaining.length}件`);

  for (let i = 0; i < remaining.length; i++) {
    const name = remaining[i];
    await sleep(250);
    const result = await fetchWikitext(name);
    if (result) {
      data[name] = { wikitext: result.wikitext, images: result.images };
      console.log(`[${i+1}/${remaining.length}] ✅ ${name} (${result.wikitext.length}c)`);
    } else {
      console.log(`[${i+1}/${remaining.length}] ❌ ${name}`);
    }
    // 定期的に保存
    if ((i+1) % 20 === 0) {
      fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');
    }
  }

  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n✅ 全${Object.keys(data).length}件のデータを保存`);
}

main().catch(e => console.error('エラー:', e));
