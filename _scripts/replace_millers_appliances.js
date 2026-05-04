const fs = require('fs');

let content = fs.readFileSync('f:/Fallout/millers-appliances.html', 'utf8');

const newContent = `
            <h2>概要</h2>
<p><b>ミラーの家電店（Miller's Appliances）</b>は、アパラチアの<a href="watoga.html" class="auto-link">ワトガ</a>市内に存在する、マップにマークされない小規模なロケーションです。</p>
<p>ワトガ・ショッピングプラザ内にあるこの家電量販店は、テレビ、ストーブ、洗濯機、乾燥機などの一般的な家庭用品を販売していました。戦前、このショッピングプラザは町にいる裕福な市民たちを主な顧客としていました。</p>
<p>この店の経営者は、裕福な客たちが商品の平均的な価格や実際の価値を全く把握していないことにいち早く気づき、この情報を自身の利益のために利用しました。不要なアップグレードが消費者に提案（そして承認）され、商品は不当に吊り上げられた法外な価格で販売されていました。<br>ミラーの家電店のマネージャーは、店内で稼働している接客用のMr.ハンディ・ベンダーたちに「全ての製品モデルをイタリア語で案内する」ように再プログラムしたところ、即座に売上が大幅に増加したと報告しています。</p>

            <h2>レイアウト</h2>
<p>この店舗は、ワトガの町外れの北東部に位置するプラザ内にあります。店頭には外周の歩道に向けていくつかの入り口が設けられています。スチュアート・デパートメントストアに隣接しており、ドアの右側の壁際にはテーブル、椅子、投票ブースがあるパティオを共有しています。<br>店内にはターミナルが置かれたフロントデスクがあり、売り場のフロアにはカウンターや冷蔵庫、洗濯機、乾燥機、テレビ、ストーブなどが展示されています。</p>

            <div class="quote-box">
                <b>感想</b><br><br>
                ワトガ・ショッピングプラザにあるマップにマークされない店舗の一つです。<br>戦前の富裕層向けに詐欺まがいの商法を行っていた家電量販店跡です。「ロボットにイタリア語を喋らせるだけで飛ぶように売れるようになった」という内容がフロントデスクのターミナルに残されており、戦前の裕福な市民たちの見栄っ張りなマインドを皮肉ったブラックジョークをうかがい知ることができます。
            </div>
`;

// Also replace the infobox
content = content.replace(/<aside class="infobox">.*?<\/aside>/, '<aside class="infobox"><h3 style="margin-top:0;text-align:center;">Miller\'s Appliances</h3><img src="images/note_extracted/millers-appliances/img_main.png" alt="Miller\'s Appliances"><div class="infobox-row"><span class="infobox-label">種類</span><span><a href="locations.html" class="auto-link">ロケーション</a>（店舗）</span></div><div class="infobox-row"><span class="infobox-label">地域</span><span><a href="cranberry-bog.html" class="auto-link">クランベリー湿原</a>（<a href="watoga.html" class="auto-link">ワトガ</a>）</span></div><div class="infobox-row"><span class="infobox-label">登場作品</span><span>Fallout 76</span></div></aside>');

// Try to handle escaping for quotes if needed: _commentArticleName = 'Miller's Appliances'
content = content.replace(/_commentArticleName = 'Miller's Appliances'/g, "_commentArticleName = 'Miller\\'s Appliances'");

const startMarker = '<h2>概要</h2>';
const endMarker = '<div class="quote-box">';

const parts = content.split(endMarker);
// preamble split by the FIRST start marker. Actually, there are multiple `<h2>概要</h2>`.
// So we use indexOf and substring
const firstStart = content.indexOf(startMarker);
const preamble = content.substring(0, firstStart);
const endSectionsText = '<div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">';
const endSectionsIndex = content.indexOf(endSectionsText);
const endSections = content.substring(endSectionsIndex);

const finalHtml = preamble + newContent + '\\n            ' + endSections;

fs.writeFileSync('f:/Fallout/millers-appliances.html', finalHtml);

// X post
const postContent = `#Fallout76 #Fallout

ミラーの家電店（Miller's Appliances）
https://www.fallout-jp.com/millers-appliances.html

概要

ワトガ市内に存在するマップにマークされない店舗。テレビやストーブなどの一般的な家庭用品を販売していました。「接客ロボットの言語をイタリア語に変えるだけで富裕層に飛ぶように売れる」という詐欺まがいの商法を行っていた形跡が残っています。

---

💭 感想

ワトガ・ショッピングプラザにある店舗の一つです。フロントデスクのターミナルには、戦前の裕福な市民たちの見栄っ張りなマインドを皮肉ったブラックジョークが記録されています。

---

This article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.
`;

fs.mkdirSync('f:/Fallout/_X/millers-appliances', { recursive: true });
fs.writeFileSync('f:/Fallout/_X/millers-appliances/post.md', postContent);

console.log('Done.');
