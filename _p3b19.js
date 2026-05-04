// Phase 3 正式バッチ19: 完全翻訳
const fs = require('fs');
const dir = 'f:/Fallout/';

function update(slug, mainContent, quoteContent) {
  const fp = dir + slug + '.html';
  try {
    let html = fs.readFileSync(fp, 'utf8');
    const replaceRegex = /<h2>概要<\/h2>[\s\S]*?(?=<div class="quote-box")/;
    if (replaceRegex.test(html)) {
        html = html.replace(replaceRegex, mainContent);
    } else {
        html = html.replace(/<h2>概要<\/h2>[\s\S]*?(?=<\/main>)/, mainContent + (quoteContent || ''));
        quoteContent = ''; 
    }
    
    if (quoteContent) {
      if (html.includes('<div class="quote-box">')) {
         html = html.replace(/<div class="quote-box">[\s\S]*?<\/div>/, quoteContent);
      } else {
         html = html.replace(/<\/main>/, quoteContent + '\n</main>');
      }
    }
    
    // Format h1 with subtitle
    const names = {
      'happy-candlemaker': ['Happy Candlemaker', 'ハッピー・キャンドルメーカー'],
      'lacey-drummond': ['Lacey Drummond', 'レイシー・ドラモンド'],
      'pennington': ['Pennington', 'ペニントン'],
      'steelheart': ['Steelheart', 'スティールハート']
    };
    
    if (names[slug]) {
       const [en, jp] = names[slug];
       const fallbackH1Regex = /<h1>(.*?)<\/h1>/;
       const match = html.match(fallbackH1Regex);
       if (match && !match[1].includes('<br>')) {
           const subtitle = "<br><span style=\"font-size: 0.6em; color: #888; font-family: 'Noto Sans JP', sans-serif; font-weight: normal;\">" + jp + "</span>";
           html = html.replace(fallbackH1Regex, "<h1>" + match[1] + subtitle + "</h1>");
       }
    }

    fs.writeFileSync(fp, html, 'utf8');
    console.log('Updated: ' + slug);
  } catch(e) { console.log('ERROR: ' + slug + ' (' + e.message + ')'); }
}

update('happy-candlemaker',
`<h2>概要</h2>
<p>ハッピー・キャンドルメーカー（Happy Candlemaker）は、アパラチアのヘルヴェティア（Helvetia）で「ファスナハト・パレード」の時期に出現するプロテクトロン（Protectron）である。</p>

<h2>背景</h2>
<p>ヘルヴェティアで開催されるファスナハトのお祭りを盛り上げるために再プログラミングされたプロテクトロンの一体。<br>
白いシャーシと、頭のドームの上に火のついたロウソクを立てているのが特徴である。<br>
ファスナハトのイベントが開始され、彼が行進のメンバーに選ばれた場合、郵便局の中にある雑貨部門のカウンターの後ろに出現する。<br>
彼がパレードの行進に参加する前に、Vault 76の居住者は彼の注文通りにヘルヴェティアの「ハニー・ハウス」のミツバチの巣から「ミツロウ（Beeswax）」を10個集めて持ってくるよう要求される。</p>

<p>2102年の設定では彼自身もファスナハトの「出っ歯の男のお面」を被って行進していたが、2103年以降は別カラーバリエーションのランダムなファスナハトのお面を被って登場するようになった。</p>
`,
`<div class="quote-box"><b>感想</b><br><br>ファスナハトの初期準備フェーズで出現するロボットの一つ。<br>
ミツロウ集めのお使いを頼んでくるロウソク職人です。イベント中は彼自身の両腕の武器も火炎放射器と「紙吹雪（コンフェッティ・ガン）」に見た目が変更されており、パレードを火と紙吹雪でド派手に盛り上げてくれます。</div>`);

update('lacey-drummond',
`<h2>概要</h2>
<p>レイシー・ドラモンド（Lacey Drummond）は、アパラチアを探索しているウェイストランド人の女性。</p>

<h2>背景</h2>
<p>バージニア州の廃墟からやってきた好奇心旺盛な探検家であるレイシーとイセラ・メジアの二人は、アパラチアに呼び寄せられた「謎の宝」についての答えを求めて Vault 76 の周辺に立ち寄った。<br>
彼女たちはラジオの放送で「アパラチアのどこかに金塊の宝が埋まっている」というニュースを聞きつけてやってきたが、その詳細は曖昧なものであった。</p>

<p>Vault 76に到着する前、二人は情報と引き換えにザ・ウェイワードにいた「カーター」という名の男たちに手持ちのキャップをすべて騙し取られて無一文になってしまっていた。<br>
レイシーたちはまだアパラチアに来て日が浅いが、この地域が甚大な被害を受けていることに気づいている。それでも彼女は、これまで旅をしてきた他の土地に比べれば「アパラチアのほうがまだマシだ」と語っている。</p>

<h2>プレイヤーとのインタラクション</h2>
<p>新しくVault 76から出てきた居住者が一番最初に出会うことになるNPCの片割れである。<br>
プレイヤーのCharismaが2以上ある場合、彼女に「余っている武器はないか？」と尋ねることができ、彼女から「パイプリボルバー」と「マチェット」を譲ってもらうことができる。<br>
（※ただし、この選択肢はプレイヤーがレベル5以下であり、かつインベントリにまだ銃を持っていない場合にのみ出現する）</p>

<p>また、もしプレイヤーが彼女たちに「Vault 76の内部にお宝が眠っている」と嘘の情報を伝えた場合、相棒のイセラがスペイン語で小声で「ay, pendeja（このバカが）」と呟くのを聞くことができる。</p>
`,
`<div class="quote-box"><b>感想</b><br><br>Wastelandersへの大型アップデート以降、新たにゲームを開始したプレイヤーが（ロボットを除いて）一番最初に出会う生きた人間のNPCになりました。<br>
最初はVaultの長い階段の一番下（現在のVault 76無料ファストトラベルの出現位置付近）にいましたが、その後のAtlantic Cityアップデートでファストトラベルポイントが外に移動したのに伴い、彼女たちもVaultの入り口の扉のすぐ目の前まで配置が移動されています。</div>`);

update('pennington',
`<h2>概要</h2>
<p>ペニントン（Pennington）は、Vault 76の入り口で稼働しているMr.ハンディ（Mister Handy）。</p>

<h2>背景</h2>
<p>ペニントンは Vault 76 で稼働している多数のMr.ハンディのうちの一体である。<br>
監督官（Overseer）から、Vaultの入り口に滞在し、外に出てきた居住者たちを彼女のキャンプ（ザ・ウェイワードの南）へ向かわせるように案内するよう指示を受けていた。<br>
Wastelandersアップデートで Vault 76 の外に「Vaultの部外者」である人間のNPC（レイシー・ドラモンドとイセラ・メジア）が居座り始めると、ペニントンは彼女たちのような「Vault以外の人間」を警戒しており、出入りするプレイヤーにも「彼女たちには気をつけるように」などと警告してくるようになる。</p>
`,
`<div class="quote-box"><b>感想</b><br><br>Vault 76の扉を出てすぐの場所にいるMr.ハンディのおじさんロボットです。<br>
以前のバージョンでは、もしプレイヤーがVault内で「監督官のログ」を取り忘れていた場合、彼が代わりにホロテープを渡してくれるという救済措置の役割を持っていましたが、いつかのアップデート以降はVaultから出た時点で自動的にインベントリにテープが追加されるように変更されたため、現在ではただ道案内をしてくれるだけのロボットになっています。</div>`);

update('steelheart',
`<h2>概要</h2>
<p>スティールハート（Steelheart）は、アパラチアのモーガンタウン（Morgantown）で稼働するプロテクトロン（Protectron）。</p>

<h2>背景</h2>
<p>スティールハートは、モーガンタウンで発生するパブリックイベント「Back on the Beat」の中心となるロボットである。<br>
かつてレスポンダーは、フェラル・グールやレイダーなどの攻撃からモーガンタウンの街を守るために、街の巡回とシステムチェックを行う警備システム「スティールハート」を立ち上げた。<br>
彼はレスポンダーによってプログラムが書き換えられ「再利用された警察用プロテクトロン」の最初の成功例であった。</p>

<p>イベント中にVault 76の居住者が彼のターミナルにアクセスしてシステムを起動すると、彼は街中の要所に設置された銀行や各種セキュリティドアのターミナルを巡回して機能をアップデートしていく。<br>
しかし彼が動いていると、それに引き寄せられた大量のフェラル・グールたちが襲いかかってくるため、住民は彼のバッテリーが切れて巡回が完了するまでグールから彼を護衛し続けなければならない。</p>
`,
`<div class="quote-box"><b>感想</b><br><br>低レベル地帯の森林地帯（モーガンタウン）でお手軽に参加できるパブリックイベント「Back on the Beat」の主役となるプロテクトロンです。<br>
低レベルのうちは非常に頼りになる味方であり、プレイヤーが彼を守りながら大量のグールの大群を相手に撃ち合うという、初期のFallout 76における「レスポンダーの制圧作戦」の雰囲気と共闘感をもっとも手軽に味わえる素晴らしいイベントの顔役でもあります。</div>`);

console.log('Batch 19 processing...');
