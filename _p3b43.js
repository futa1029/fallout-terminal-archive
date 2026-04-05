// Phase 3 正式バッチ43: 完全翻訳
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
      'the-boss': ['The Boss', 'ザ・ボス'],
      'higgenbottom': ['Higgenbottom', 'ヒッゲンボトム'],
      'loris': ['Doctor Loris', 'ドクター・ロリス'],
      'ronny-wastelanders': ['Ronny', 'ロンニー']
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

update('the-boss',
`<h2>概要</h2>
<p>ザ・ボス（The Boss）は、アパラチアの南西端に位置する遊園地「カムデンパーク（Camden Park）」の責任者として稼働しているロボブレイン（Robobrain）。</p>

<h2>背景</h2>
<p>戦前のカムデンパークでは最新の自動化が導入されており、「ザ・ボス」と名付けられたこのロボブレインが、従業員の賃金の支払いやパーク内のアトラクションの維持管理の全権を担っていた。<br>
大戦争の後も彼女（女性格のロボブレインである）は、誰もいなくなったカムデンパークで従業員が出勤してくるのを待ち続けている。</p>

<h2>プレイヤーとのインタラクション</h2>
<p>カムデンパーク内の「カンパニーストア（Company Store）」の室内にいるロボブレインのNPC。<br>
彼女はパークの客（人間）のことを「フレッシュリング（Fleshlings / 肉袋、生身のひよっこ等）」と呼ぶ。これは悪意のある呼称ではなく、純粋にロボットのシステム的な視点からの「記述的な用語」である。<br>
プレイヤーが最初に出会ったときは、非常に友好的に「ミスター・ファジー・トークンと賞品を交換する場所へようこそ、フレッシュリング！」と歓迎してくれる。</p>

<p>しかし、プレイヤーがカムデンパークの従業員の制服（カムデンパークのユニフォーム）を着ていると、彼女は態度を急変させて「フレッシュリング？ 制服のまま非着用エリアにいるなんて、減給に値するぞ！」と厳しく叱責してくる。<br>
逆に、クエスト「Mistaken Identity」で「新しく雇用された従業員」として登録された後も、制服を着ていないと「フレッシュリング！ なぜ制服を着ていない！ ふざけるな！（There will be shouting）」と怒り出す。</p>
`,
`<div class="quote-box"><b>感想</b><br><br>カムデンパークのデイリークエストを完了した際に、トークンを報酬としてもらうための報告先となるロボットです。<br>
プレイヤーを「フレッシュリング」と呼んでくるため一見すると邪悪なロボブレインに見えますが、実際にはただの「言葉選びのセンスがおかしいだけの真面目な遊園地の園長」であり、戦前の従業員たちの適当な勤務態度に常にイライラさせられていたことが窺えます。</div>`);

update('higgenbottom',
`<h2>概要</h2>
<p>ヒッゲンボトム（Higgenbottom）は、Vault 76の内部で稼働しているMr.ハンディ（Mister Handy）。<br>
Vault居住者たちが地上へ旅立つ「再生の日（Reclamation Day）」において、彼らの門出をサポートする役割を担っている。</p>

<h2>プレイヤーとのインタラクション</h2>
<p>プレイヤーがゲームを開始した直後、Vault 76の出口へ向かう途中にある「第3ステーション（Station #3: Power is Key!）」に配置されているロボット。<br>
話しかけると、「発電機を作って一から電気を作り出すなんて、簡単なことですよ（How hard could it be?）」と皮肉めいたエールを送りながら、地上でのC.A.M.P.での建設に役立つ基本的な建築素材（布×5、鉄×5、木材×5、粘着剤×3）を提供してくれる。<br>
その後、Vault 76を一度出てしまうと二度と戻ることができないため、彼を見るのはゲーム開始直後のその一瞬だけである。</p>
`,
`<div class="quote-box"><b>感想</b><br><br>Vault 76の中でチュートリアル素材を渡してくれるロボットの一人です。<br>
名前の「Higgenbottom（ヒッゲンボトム）」は、いかにもイギリスの執事らしい格式高い古典的な名前であり、アパラチアの過酷な環境に飛び出していく新米居住者たちを温かく（そして少し楽観的に）見送ってくれます。</div>`);

update('loris',
`<h2>概要</h2>
<p>ドクター・ロリス（Doctor Loris）は、アパラチアの「Vault-Tec大学（Vault-Tec University）」のシミュレーションVault内部で稼働しているMr.ハンディ。<br>
シミュレーションVaultの「筆頭医師（Head physician）」としての役割を与えられている。</p>

<h2>背景</h2>
<p>Vault-Tec大学の地下にあるシミュレーションVault（実際に人間を入れてVaultの実験プロトコルをシミュレートするための施設）において、ドクター・ロリスは「Vault内で緊急事態（放射能漏れなど）が発生した場合に、医師としてどのように冷酷な決断を下すべきか」をシミュレートするようにプログラムされていた。</p>

<p>実験のシナリオにおいて、シミュレーションVaultの反応炉（リアクター）で放射能漏れが発生した際、彼は放射能の汚染がVault全体に広がるのを防ぐため、内部にいた住人の「ケレメン（Kelemen）」を迷うことなく反応炉の中に閉じ込めて見殺しにするという決断を下した。<br>
ロリスはこの選択について悪びれる様子はなく、「多数の命を救うために一人の命を犠牲にしただけだ」と信じている。<br>
この決断は、同じくVault内で「主任エンジニア」の役割を与えられていた別のMr.ハンディである「ブラス（Head Engineer Brass）」との間に激しい対立を生んでおり、ブラスはこれを「単なる冷酷な殺人だ」と糾弾している。</p>

<h2>プレイヤーとのインタラクション</h2>
<p>Wastelandersのメインクエスト「Overseer, Overseen」で訪れることになるVault-Tec大学の地下に登場するNPC。<br>
プレイヤー（および本物のVault 76の監督官）は、このシミュレーションVaultのシステムを突破するために、彼ら二人のロボット（ロリスかブラスのどちらか一派）に取り入り、「派閥のリーダー」としてのクリアランス権限を利用する必要がある。<br>
話しかけると、当時のシミュレーションの出来事を延々とロールプレイし続けており、「私は何も隠してはいない！ 放射能の量を正確には把握していなかったかもしれないが…彼を助けることはできたかもしれない、だが代償はなんだった!?」と当時の言い訳を繰り返す。</p>
`,
`<div class="quote-box"><b>感想</b><br><br>「多数を救うために少数を見殺しにする」というトロッコ問題を体現したような、Vault-Tecらしい冷酷な医師ロボットです。<br>
対立している主任エンジニアのブラス（Brass）とは文字通り「冷たい計算」と「熱血漢」という真逆の性格設定を与えられており、ただのロボットである彼らが、人間たちが滅んだ後も延々と「シミュレーションの中の人間関係の対立」を大真面目に演じ続けている様子は滑稽でもあり、不気味でもあります。</div>`);

update('ronny-wastelanders',
`<h2>概要</h2>
<p>ロンニー（Ronny）は、アパラチアのレイダーギャング「エドウィンのギャング（Edwin's gang）」に所属する女性のレイダー。<br>
ギャングのリーダーであるエドウィン（Edwin）の姪っ子にあたる。</p>

<h2>背景</h2>
<p>ロンニーは、血まみれイーグルス（Blood Eagles）とは対立する独自のレイダーグループのリーダーであるエドウィンの姪である。<br>
しかし、現在エドウィンは病に倒れており、代わって彼女が実質的にギャングのリーダーシップを引き継いでいる。<br>
彼女自身は、長年の知人であり元血まみれイーグルスのベケット（Beckett）に対して恩義と友情を感じており、血まみれイーグルスのボスの一人である「ザ・クロウ（The Claw）」を暗殺するというベケットの計画に協力することになる。</p>

<h2>プレイヤーとのインタラクション</h2>
<p>ベケットをC.A.M.P.に迎え入れて進行するクエストラインの後半「Thicker Than Water」で登場するNPC。<br>
ワトガ・アンダーグラウンド（Watoga Underground）の入り口でベケットおよびプレイヤーと合流し、「今の私はただ借りを返しているだけよ。仲良しこよしのお涙頂戴劇をやるつもりはないわ」と軽口を叩きながら、重く閉ざされたワトガ・アンダーグラウンドの扉の鍵（Watoga Underground key）を彼らに引き渡してくれる。<br>
イベント終了後、エドウィンが正式に引退し、彼女がギャングの完全なリーダーになったことがベケットの口から語られる。</p>

<h3>舞台裏（没データ）</h3>
<p>ゲーム内データには「RonnyがプレイヤーのC.A.M.P.にいるベケットを訪ねてくる」という没データのNPC（DELETED_W05_COMP_Actor_Beckett_Visitor_Ronny）と、それに付随する削除された対話スクリプトが残されている。<br>
ベケットのセリフの中にも「ロンニーがたまにC.A.M.P.に挨拶に来るって言ってたよ」という内容が残っているが、実際のゲーム内で彼女がC.A.M.P.の訪問者として現れることはない。</p>
`,
`<div class="quote-box"><b>感想</b><br><br>ベケットのクエストラインで、彼の過去の因縁の仲間として登場する女レイダーです。<br>
出番自体はクエストの合間の一瞬だけですが、「ワトガの地下に繋がる鍵を持っている独自のギャングの後継者」という美味しい設定を持っており、ベケットの顔の広さと、血まみれイーグルスがアパラチアの他のすべてのレイダーから恨みを買っているという状況を物語っています。没データになったC.A.M.P.への訪問イベントが実装されなかったのは少し残念なところです。</div>`);

console.log('Batch 43 processing...');
