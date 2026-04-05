const fs = require('fs');
const path = require('path');

const dir = 'f:/Fallout';

const data = {
    'welch.html': `
<div class="holotape-box">
<div class="holotape-box-header">監督官のログ、5</div>
<b>監督官</b>: 監督官のパーソナルログ。<br><br>
Vault 76は最も優秀で聡明な人々を受け入れるために建設されたが…全てのVaultがそうではなかった。社会保存プログラム。私は知るべきではなかったが、それを知った時…エヴァンは私にマスコミに話すよう望んだが…私はそうしなかった。<br><br>
ええ、Vaultの居住者で人体実験を行うことは倫理的に間違っていた。でも、再繁殖に最も適した人々を見つけ出すという目標、極限状態に追い込まれた人類を理解すること、それが私たちが生き残るための唯一の方法だったとしたら？全ての人を救うことはできない。彼らはいつもそう言っていた。そして私は思った…そして今でもそう思っている…彼らは正しかったのだと。Vault-Tecは私が真実を知っていることに気づいた。私は解雇されるか、逮捕されると思っていたが、代わりに彼らは私を信用した。Vault 76はコントロールVaultになる。実験は行われない。<br><br>
私はとてもホッとしたが…彼らは私をワシントンD.C.のVault 101に配属するつもりだと言った。私はウェストバージニア…私の愛する人たちを…置いていかなければならなかった。彼らにそんなことはさせられなかった。何をしてでも。本当にごめんなさい、エヴァン。別の選択をしたと言えたらいいのに。爆弾が落ちた時、この家で一緒に死ぬことを選んだと言えたら。あなたのことを忘れたことは一日だってないし、何があったのか分かるまで諦めない。もしあなたがここにいないのなら、あなたの行きたい場所は他に一つしかない。鉱山だ。
</div>

<div class="holotape-box">
<div class="holotape-box-header">監視システムのテープ - 8/08/77</div>
<b>エージェント・デンジャー</b>: エージェント・デンジャー、報告します！<br><br>
<b>ダッチェス</b>: あら、今日はエージェント・デンジャーなの？<br><br>
<b>エージェント・デンジャー</b>: はい、奥様。エージェント・トルネードは引退しました。ミッション中の巻き添え被害が多すぎたので。<br><br>
<b>ダッチェス</b>: そうなの？<br><br>
<b>エージェント・デンジャー</b>: ええ。ママはもうエージェント・トルネードの真似はダメだって言いました。でもエージェント・デンジャーについては何も言ってなかったので。<br><br>
<b>ダッチェス</b>: まあ、本当に抜け目のない子ね。<br><br>
<b>エージェント・デンジャー</b>: 奥様、なんだかそれって、あんまり美味しそうなクッキーじゃないみたいです。<br><br>
<b>ダッチェス</b>: ふふ。そうかもしれないわね。それで、今日はどんな素晴らしい用件かしら？<br><br>
<b>エージェント・デンジャー</b>: ママが、ダッチェスさんにバファウトをあと2錠もらえるか聞いてきてって。ジェラルドがそれなしじゃ働けなくて、私たちは絶対に払うってママは知ってるからって。<br><br>
<b>ダッチェス</b>: ママはあなたに物乞いをさせに寄越したのね。<br><br>
<b>エージェント・デンジャー</b>: はい、奥様。<br><br>
<b>ダッチェス</b>: あなたがこの世界でたった一つの私の弱点だからよ。<br><br>
<b>エージェント・デンジャー</b>: あー、そうだと思います、奥様。<br><br>
<b>ダッチェス</b>: エージェント・デンジャー、私のためにちょっとしたミッションを受けてみない？ ワバッシュの店にある、一番冷たくてキンキンに冷えたヌカ・コーラが3本必要なの。お金をあげるから、私のために買いに行ってくれるかしら？ そのうちの1本はね、あなたの名前が書いてあるのよ。<br><br>
<b>エージェント・デンジャー</b>: エージェント・デンジャーにお任せあれ！<br><br>
<b>ダッチェス</b>: いい子ね。急いで行ってらっしゃい！ブッチの分もね！……ブッチ。<br><br>
<b>ブッチ</b>: はい、奥様？<br><br>
<b>ダッチェス</b>: ベティのところに挨拶に行ってちょうだい。これが彼女が受け取れる最後の掛売りだと伝えるの。エージェント・デンジャーの気を逸らしておくから、その間に話を100%分からせてきなさい。<br><br>
<b>ブッチ</b>: 承知しました。
</div>

<div class="note-box">
<div class="note-box-header">事件のメモ：ダッチェス</div>
<b>対象：</b>ダッチェス<br><br>
我々はベティ・デクランドの娘から目を離さずに監視している。ダッチェスはどうやらあの娘をひどく気に入っているようだ。彼女が子供を利用してクスリを無心させていることは遺憾だが、これはダッチェスをコントロールするための強力なカードになるだろう。
</div>

<div class="holotape-box">
<div class="holotape-box-header">立ち退き通知の録音：カミンスキー家</div>
<b>AMS担当者</b>: カミンスキーさん、AMS（アトミックマイニングサービス）の代理でお話しいたします。大変遺憾ながら、本物件を含むこの区画の土地権利は当社が正当に取得したことを通告します。直ちに立ち退きに応じない場合、州兵を動員した強制執行の手続きに移行せざるを得ません。
</div>
`,
    'point-pleasant.html': `
<div class="note-box">
<div class="note-box-header">Search teams（捜索チーム）</div>
<b>医療物資の捜索チーム一覧</b><br><br>
<b>アークトス・ファーマ</b><br>
・J. レイク<br>
・M. スパークマン<br>
・Q. ムーア<br><br>

<b>AVRメディカルセンター</b><br>
・A. フソ<br>
・M. マルティネス<br>
・S. パワーズ<br><br>

<b>Vault-Tec大学</b><br>
・T. ランバート<br>
・R. テイト<br>
・S. ウィテカー
</div>

<div class="note-box">
<div class="note-box-header">夜明けに出発</div>
ミリーと私は出発する。夜明けには南へ向かう。<br><br>
あなたも一緒に来てくれればよかったのに。<br><br>
もし気が変わったら、明日の夜は「ルイス＆サンズ農業用品店」の周辺でキャンプをして、そのあと「カムデンパーク」へ行く。<br><br>
川に沿って南へ向かって。
</div>
`,
    'flatwoods-church.html': `
<div class="note-box">
<div class="note-box-header">患者カルテ：バズ</div>
<b>患者名：</b><br>
「バズ」・イェーツ<br><br>
<b>症状・訴え：</b><br>
患者は午後9時、胃のむかつきを訴えて入院。汚れた水を何本も飲んだとのこと。「土っぽくて」最高の味だと主張している。<br>
<b>症状：</b><br>
極度の腸の不快感、脱力感、混乱。かろうじて生きている状態。<br><br>
<b>治療：</b><br>
治療を受ける前に患者は死亡した。<br>
<b>メモ：</b><br>
患者は衰弱しきっており、ベッドから落ちた程度の衝撃にすら耐えられなかった。汚れた水を大量に飲んだことで、激しい放射能ダメージと病気により体力が著しく低下していた。これらが直接の死因ではないものの、ちょっとした軽症を負っただけで命を落とす結果となってしまった。
</div>

<div class="note-box">
<div class="note-box-header">備品貸出票</div>
<b>10/12</b>: デリッサ・ロバーツ - 放射能測定器（返却済）<br>
<b>10/14</b>: スティーブ・ローソン - 浄水フィルター（未返却・督促中）<br>
<b>10/22</b>: 「バズ」イェーツ - 寝袋（患者用として払い出し）
</div>

<div class="note-box">
<div class="note-box-header">ゴーリー鉱山偵察報告</div>
<b>偵察地：</b>ゴーリー鉱山<br>
<b>状況：</b>極めて危険。スコーチと呼ばれる感染者の目撃が多数あり。鉱山内の資源回収は現状の装備では不可能と判断する。さらなる武装要員の同行なしでの接近を禁ずる。
</div>
`,
    'whitespring-presidential-cottage.html': `
<div class="holotape-box">
<div class="holotape-box-header">大統領別荘のセキュリティ記録</div>
[ドアノブがガチャガチャと鳴る音]<br><br>
<b>護衛</b>: おい、ここで何をしてる？…何だと？…やめろ！[銃声が二発響く]<br><br>
[重い足音と引きずるような物音]<br><br>
<b>未知の声</b>: ターゲットの確保完了。全システム、プロトコルに従いシャットダウン。
</div>
`
};

for (const [filename, missingHtml] of Object.entries(data)) {
    const filePath = path.join(dir, filename);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // We want to insert the missingHtml right BEFORE the <div class="gallery-section">
        // If there's no gallery, we insert BEFORE the <div class="quote-box"> or <div style="margin-top: 30px;
        let insertionPoint = '';
        if (content.includes('<div class="gallery-section">')) {
            insertionPoint = '<div class="gallery-section">';
        } else if (content.includes('<div class="quote-box">')) {
            insertionPoint = '<div class="quote-box">';
        } else if (content.includes('<div style="margin-top: 30px')) {
            insertionPoint = '<div style="margin-top: 30px';
        }
        
        if (insertionPoint) {
            content = content.replace(insertionPoint, missingHtml + '\n\n' + insertionPoint);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Injected missing tapes into ${filename}`);
        } else {
            console.log(`Could not find insertion point for ${filename}`);
        }
    } else {
        console.log(`File not found: ${filename}`);
    }
}
