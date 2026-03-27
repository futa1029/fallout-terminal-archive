// バッチ2: 中重要度前半クリーチャー記事13件
const fs = require('fs');
const path = require('path');
const https = require('https');
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}
function downloadImage(url,fp){return new Promise((resolve,reject)=>{fs.mkdirSync(path.dirname(fp),{recursive:true});const mod=url.startsWith('https')?https:require('http');mod.get(url,{headers:{'User-Agent':'Mozilla/5.0'}},(res)=>{if(res.statusCode>=300&&res.statusCode<400&&res.headers.location){downloadImage(res.headers.location,fp).then(resolve).catch(reject);return;}if(res.statusCode!==200){resolve(false);return;}const ws=fs.createWriteStream(fp);res.pipe(ws);ws.on('finish',()=>{ws.close();resolve(true);});ws.on('error',reject);}).on('error',reject);});}
function getImageUrl(fn){return new Promise((resolve)=>{const url=`https://fallout.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(fn)}&prop=imageinfo&iiprop=url&format=json`;https.get(url,{headers:{'User-Agent':'Mozilla/5.0'}},(res)=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{const j=JSON.parse(d);const p=Object.values(j.query.pages)[0];resolve(p.imageinfo?.[0]?.url||null);}catch(e){resolve(null);}});}).on('error',()=>resolve(null));});}

const tmpl = fs.readFileSync('F:/Fallout/mole-miner.html','utf8');
const cssBlock = tmpl.substring(tmpl.indexOf('<style>'),tmpl.indexOf('</style>')+'</style>'.length);

const articles = [
  {
    slug:'fog-crawler-fo76',title:'Fog crawler',titleJa:'フォグ・クロウラー',wikiSlug:'Fog_crawler_(Fallout_76)',
    mainImg:'FO76_creature_fogcrawler.png',
    infoRows:[['種別','ミュータント（甲殻類/昆虫変異体）'],['サイズ','非常に大型'],['攻撃','近接打撃、酸のブレス'],['地域','沼地地帯'],['登場作品','Fallout 76']],
    body:`<h2>概要</h2><p><b>フォグ・クロウラー</b>は、Fallout 76に登場する大型の昆虫/甲殻類型クリーチャーである。<br>沼地地帯の濃い霧の中に潜む捕食者で、その巨体と高い攻撃力から最も危険なクリーチャーの一つに数えられる。</p><h2>背景</h2><p>フォグ・クロウラーの起源は完全には解明されていない。<br>放射線で変異したシャコやカマキリの一種と推測されており、長い前肢と鎌状の爪を持つ。<br>沼地地帯の霧を好み、視界の悪い環境で獲物を狩る。</p><h2>特徴</h2><p>フォグ・クロウラーは非常にタフで、高いDRと大量のHPを持つ。<br>近接攻撃の射程が長く、距離を取ったつもりでも前肢の一振りで引っ掛けられることがある。<br>高レベルの亜種は単独プレイヤーにとって最も危険な敵の一つ。</p>`,
    kanso:`沼地地帯の霧の中から這い出てくるその姿は、FO76で最も恐ろしい遭遇の一つ。<br>とにかくタフで硬い。弾を湯水のように消費させられるので、遠くに見かけたら迂回したくなるクリーチャーです。<br>FO4のファー・ハーバーDLCから登場した比較的新しいクリーチャーですが、FO76の沼地との相性は抜群。`,
  },
  {
    slug:'floater-fo76',title:'Floater',titleJa:'フローター',wikiSlug:'Floater_(Fallout_76)',
    mainImg:'FO76WL_Floater.png',
    infoRows:[['種別','ミュータント（FEV変異体）'],['亜種','フレーマー、フリーザー、グルーパー'],['攻撃','遠距離（炎/冷気/粘液）'],['登場作品','Fallout 76 (Wastelanders)']],
    body:`<h2>概要</h2><p><b>フローター</b>は、Fallout 76のWastelandersアップデートで追加されたクリーチャーで、FEV（強制進化ウイルス）の実験によって生まれた変異体である。<br>クラシックFallout（Fallout 1/2）からの復活組。</p><h2>背景</h2><p>フローターは、FEV実験の失敗作として知られる浮遊型のクリーチャー。<br>ウエストイーク社のFEV実験から逃げ出した個体が野生化し、アパラチア各地に広がった。<br>3つの亜種が存在し、それぞれ異なる属性の遠距離攻撃を行う。</p><h2>バリエーション</h2><p>フレーマー・フローター（炎属性）、フリーザー・フローター（冷気属性）、グルーパー・フローター（粘液属性）の3種類。<br>いずれも遠距離から弾を吐き出して攻撃し、近づくと自爆する個体もいる。</p>`,
    kanso:`クラシックFalloutからの復活組というのがオールドファンには嬉しいポイント。<br>フローターは初代Falloutの初期から登場していた古参クリーチャーで、3Dで復活した姿はなかなかの迫力。<br>3つの属性亜種がいるのも面白く、特にフリーザー・フローターの冷気攻撃は移動速度を下げられるので厄介です。`,
  },
  {
    slug:'gulper-fo76',title:'Gulper',titleJa:'ガルパー',wikiSlug:'Gulper_(Fallout_76)',
    mainImg:'FO76_creature_gulper.png',
    infoRows:[['種別','ミュータント（両生類変異体）'],['外見','巨大な二足歩行のサンショウウオ'],['地域','沼地地帯'],['登場作品','Fallout 76']],
    body:`<h2>概要</h2><p><b>ガルパー</b>は、Fallout 76に登場する巨大な両生類型クリーチャーである。<br>放射線で変異したサンショウウオで、沼地地帯に広く分布している。</p><h2>背景</h2><p>ガルパーは、大戦後に放射線で変異したオオサンショウウオの一種とされている。<br>二足歩行が可能で、長い前肢を使って獲物を捕らえる。<br>名前の由来は「丸呑み」を意味する英語の「gulp」から。</p><h2>特徴</h2><p>ガルパーは群れで行動することが多く、1体を倒している間に背後から別の個体に攻撃される危険がある。<br>FO76以前はFO4のファー・ハーバーDLCに登場していた。</p>`,
    kanso:`でっかいサンショウウオが二足歩行で襲ってくる姿はシュールだけど怖い。<br>ファー・ハーバーからの続投組で、FO76の沼地環境にぴったりマッチしています。<br>群れで出てくるので囲まれると厄介ですが、肉がいい食料になるのは嬉しいポイント。`,
  },
  {
    slug:'hermit-crab-fo76',title:'Hermit crab',titleJa:'ハーミット・クラブ',wikiSlug:'Hermit_crab_(Fallout_76)',
    mainImg:'FO76_creature_hermitcrab.png',
    infoRows:[['種別','ミュータント（甲殻類変異体）'],['外見','バスの残骸を殻として背負うヤドカリ'],['攻撃','近接、酸'],['地域','沼地地帯、水辺'],['登場作品','Fallout 76']],
    body:`<h2>概要</h2><p><b>ハーミット・クラブ</b>は、放射線で巨大化したヤドカリで、大型車両の残骸を「殻」として利用する。</p><h2>背景</h2><p>通常のヤドカリが貝殻を背負うように、ハーミット・クラブは核戦争で放棄されたバスやトラックの残骸を殻として使用する。<br>一見すると普通の車両の残骸に見えるため、不用意に近づいたプレイヤーが奇襲される。</p><h2>特徴</h2><p>ハーミット・クラブは擬態の名手で、朽ちた車両に見せかけて静止している。<br>プレイヤーが近づくと殻から飛び出して攻撃を仕掛ける。<br>殻に縮こまっている状態ではダメージが大幅に軽減される。</p>`,
    kanso:`「あれ、この車の残骸なんか揺れてる…？」と思った瞬間に巨大ヤドカリが飛び出してくるビックリ系クリーチャー。<br>バスを殻に使うという発想が最高にFalloutらしい。<br>沼地を歩いていて油断したところに出てくるので心臓に悪いですが、その分「やられた！」感があって楽しいクリーチャーです。`,
  },
  {
    slug:'mirelurk-hunter-fo76',title:'Mirelurk hunter',titleJa:'マイアラーク・ハンター',wikiSlug:'Mirelurk_hunter_(Fallout_76)',
    mainImg:'FO76_creature_mirelurk_hunter.png',
    infoRows:[['種別','ミュータント（甲殻類変異体）'],['外見','エビ型マイアラーク'],['攻撃','酸の吐き出し、近接'],['地域','水辺'],['登場作品','Fallout 76']],
    body:`<h2>概要</h2><p><b>マイアラーク・ハンター</b>は、エビまたはロブスターが放射線で変異したマイアラーク亜種である。</p><h2>背景</h2><p>通常のカニ型マイアラークと異なり、ハンターはエビ/ロブスターの変異体で、より細長い体型と鋭い前肢を持つ。<br>遠距離から酸を吐き出して攻撃でき、通常のマイアラークよりも攻撃的。</p><h2>特徴</h2><p>マイアラーク・ハンターは通常のマイアラークの殻と異なり、正面からの射撃も比較的通りやすい。<br>ただし酸の遠距離攻撃が厄介で、距離を取っても安全とは言えない。</p>`,
    kanso:`マイアラークの中ではバランスの良い敵で、殻が硬すぎないので正面から撃っても倒せるのが気持ちいい。<br>酸の攻撃が遠距離まで飛んでくるので油断はできませんが、通常マイアラークほどのストレスはないかも。`,
  },
  {
    slug:'mirelurk-king-fo76',title:'Mirelurk king',titleJa:'マイアラーク・キング',wikiSlug:'Mirelurk_king_(Fallout_76)',
    mainImg:'FO76_creature_mirelurk_king.png',
    infoRows:[['種別','ミュータント（両生類変異体）'],['外見','人型の両生類'],['攻撃','超音波ブラスト、近接'],['地域','水辺'],['登場作品','Fallout 76']],
    body:`<h2>概要</h2><p><b>マイアラーク・キング</b>は、カエルまたはサンショウウオが変異した人型の両生類クリーチャーである。<br>「マイアラーク」の名を冠しているが、実際にはカニやエビとは異なる種。</p><h2>背景</h2><p>マイアラーク・キングは他のマイアラーク種と生態系を共有しているが、遺伝的には別種。<br>人間に近い直立歩行を行い、超音波ブラストで遠距離攻撃を行う能力を持つ。</p><h2>特徴</h2><p>超音波ブラストは貫通力が高く、障害物をある程度無視してダメージを与える。<br>近接戦闘でも素早い爪攻撃を繰り出し、総合的な戦闘能力はマイアラーク種の中で最も高い。</p>`,
    kanso:`「キング」の名に恥じない戦闘力。超音波攻撃は隠れていてもダメージが入ってくるのが厄介で、スナイパービルドで距離を取っても安心できない相手です。<br>見た目が完全にクリーチャー・フロム・ザ・ブラックラグーンで、古典的なモンスター映画好きにはたまらないデザイン。`,
  },
  {
    slug:'mirelurk-queen-fo76',title:'Mirelurk queen',titleJa:'マイアラーク・クイーン',wikiSlug:'Mirelurk_queen_(Fallout_76)',
    mainImg:'FO76_creature_mirelurk_queen.png',
    infoRows:[['種別','ミュータント（甲殻類変異体）'],['サイズ','非常に大型'],['攻撃','酸のブレス、マイアラーク召喚'],['地域','水辺（特にクランベリー湿原）'],['登場作品','Fallout 76']],
    body:`<h2>概要</h2><p><b>マイアラーク・クイーン</b>は、マイアラーク種の中で最大・最強の個体である。<br>巨大な体躯と酸のブレス攻撃を持ち、戦闘中にマイアラークの卵を産み落として援軍を召喚する。</p><h2>特徴</h2><p>マイアラーク・クイーンの酸のブレスは広範囲に持続ダメージを与え、近接距離ではその巨体で踏み潰してくる。<br>戦闘中に産み落とす卵からはマイアラーク・スポーンが孵化し、数で圧倒してくる。<br>パブリックイベントのボスとして登場することもあり、複数のプレイヤーでの対処が推奨される。</p>`,
    kanso:`産卵しながら戦ってくるのが地味にエグい。子マイアラークが次々と孵化して足元をうろちょろしている中で巨大な母親と戦う構図は、まさにエイリアン・クイーン。<br>酸のブレス範囲から逃げつつ、子マイアラークを処理しつつ母体を攻撃する立ち回りが要求される歯ごたえのある敵です。`,
  },
  {
    slug:'mole-rat-fo76',title:'Mole rat',titleJa:'モールラット',wikiSlug:'Mole_rat_(Fallout_76)',
    mainImg:'FO76_creature_mole_rat.png',
    infoRows:[['種別','ミュータント（齧歯類変異体）'],['攻撃','噛みつき、地中奇襲'],['弱点','体力が低い'],['地域','アパラチア全域'],['登場作品','Fallout 76']],
    body:`<h2>概要</h2><p><b>モールラット</b>は、放射線で変異した地中食虫として、Falloutシリーズに最初期から登場する古参クリーチャーである。</p><h2>背景</h2><p>ハダカデバネズミが放射線で巨大化した変異体で、名前の通りモグラネズミ。<br>地中を掘り進む能力を持ち、地面から突然飛び出して攻撃する。<br>群れで生活し、複数の個体が同時に出現することが多い。</p><h2>特徴</h2><p>モールラットは個体としては弱いが、群れで出現するため処理に手間がかかる。<br>地中から奇襲する際の予兆は地面の盛り上がりで分かるが、複数同時に出現すると混乱を招く。<br>V.A.T.S.での掃討が効果的。</p>`,
    kanso:`Fallout シリーズではモールラットの群れとの遭遇が「雑魚戦の基本」。<br>一匹一匹は弱いんですが、群れで地面から次々に飛び出してくると意外と弾を消費するのが悩ましい。<br>序盤の弾薬が貴重な時期に群れに遭遇すると、近接武器の重要性を痛感します。`,
  },
  {
    slug:'mongrel-fo76',title:'Mongrel',titleJa:'モングレル',wikiSlug:'Mongrel_(Fallout_76)',
    mainImg:'FO76_creature_mongrel.png',
    infoRows:[['種別','ミュータント（犬変異体）'],['攻撃','噛みつき'],['地域','アパラチア全域'],['登場作品','Fallout 76']],
    body:`<h2>概要</h2><p><b>モングレル</b>は、放射線で変異した野犬の一種で、FO76のアパラチア全域に生息する。</p><h2>背景</h2><p>大戦後に野生化した犬が放射線の影響で変異し、凶暴化した個体をモングレルと呼ぶ。<br>毛が抜け落ち、皮膚が露出した不気味な外見をしている。<br>群れで行動し、リーダー格のアルファ・モングレルが群れを統率する。</p><h2>特徴</h2><p>モングレルは素早く、群れで囲んで噛みつき攻撃を仕掛けてくる。<br>個体の戦闘力は低いが、数の暴力で押してくるため油断はできない。<br>スコーチ化したバリエーションも存在する。</p>`,
    kanso:`放射線で変異した野犬の群れ。見た目は可哀想ですが、実際に囲まれるとかなり厄介です。<br>特にスコーチ化したモングレルは遠距離攻撃もしてくるので注意。<br>Dogアーマーで飼い犬にしたくなる気持ちと、容赦なく倒す現実のギャップがFallout的。`,
  },
  {
    slug:'mutant-hound-fo76',title:'Mutant hound',titleJa:'ミュータント・ハウンド',wikiSlug:'Mutant_hound_(Fallout_76)',
    mainImg:'FO76_creature_mutanthound.png',
    infoRows:[['種別','ミュータント（FEV犬変異体）'],['外見','緑色の皮膚を持つ大型犬'],['関連','スーパーミュータント'],['地域','アパラチア全域'],['登場作品','Fallout 76']],
    body:`<h2>概要</h2><p><b>ミュータント・ハウンド</b>は、FEVに曝露した犬の変異体で、スーパーミュータントの忠実な番犬として行動する。</p><h2>背景</h2><p>ミュータント・ハウンドは、ウエストイーク社のFEV実験施設から逃げ出した犬が変異したもの。<br>緑がかった皮膚と異常なまでの忠誠心を持ち、スーパーミュータントの拠点には必ずと言っていいほど配置されている。</p><h2>特徴</h2><p>素早い突進と噛みつき攻撃が主な戦闘手段。<br>スーパーミュータントと連携して攻撃してくるため、まず足の速いハウンドから倒すのが定石。</p>`,
    kanso:`スーパーミュータントの拠点に必ずいる番犬。スーパーミュータントと撃ち合っている最中に横から突進してくるのが心底厄介。<br>先にハウンドを処理してからスーパーミュータント本体に集中するのがコツです。`,
  },
  {
    slug:'radroach-fo76',title:'Radroach',titleJa:'ラッドローチ',wikiSlug:'Radroach_(Fallout_76)',
    mainImg:'FO76_creature_radroach.png',
    infoRows:[['種別','ミュータント（昆虫変異体）'],['外見','巨大なゴキブリ'],['攻撃','噛みつき'],['地域','アパラチア全域（特に屋内）'],['登場作品','Fallout 76']],
    body:`<h2>概要</h2><p><b>ラッドローチ</b>は、放射線で巨大化したゴキブリであり、Falloutシリーズを象徴するクリーチャーの一つ。</p><h2>背景</h2><p>核戦争の放射線によって犬サイズにまで巨大化したゴキブリ。<br>「核戦争後もゴキブリは生き残る」というジョークが現実になった存在。<br>ほぼすべてのVaultや建物内に生息しており、最も一般的なクリーチャーの一つ。</p><h2>特徴</h2><p>戦闘力は低く、序盤の練習用の敵として最適。<br>ただし群れで出現することが多く、不意打ちされると低レベル時はダメージが蓄積する。<br>倒すとラッドローチの肉がドロップ。意外と食料として使える。</p>`,
    kanso:`Falloutの最も基本的な敵。Vault脱出直後に最初に遭遇するのが大体このラッドローチなので、全プレイヤーの共通体験です。<br>弱い敵ですが、現実のゴキブリと同じで不意に出てくると叫びたくなるのは否定できない。<br>「核戦争後にゴキブリが巨大化した」というFalloutの基本設定をこのクリーチャー一匹で体現しています。`,
  },
  {
    slug:'radstag-fo76',title:'Radstag',titleJa:'ラッドスタッグ',wikiSlug:'Radstag_(Fallout_76)',
    mainImg:'FO76_creature_radstag.png',
    infoRows:[['種別','ミュータント（シカ変異体）'],['外見','二つの頭を持つシカ'],['ドロップ','ラッドスタッグの肉（食料として優秀）'],['地域','森林地帯'],['登場作品','Fallout 76']],
    body:`<h2>概要</h2><p><b>ラッドスタッグ</b>は、放射線で変異したシカで、二つの頭を持つのが特徴。<br>比較的穏やかな性格で、プレイヤーから攻撃しない限り逃走する。</p><h2>背景</h2><p>大戦後にアパラチアの森林地帯に生息していたオジロジカが放射線で変異した。<br>二つの頭は放射線による奇形だが、両方の頭が独立して機能しているかは不明。<br>群れで行動し、プレイヤーの接近を察知すると素早く逃走する。</p><h2>特徴</h2><p>ラッドスタッグは基本的に非攻撃的で、攻撃されると逃げる。<br>ただし追い詰められると角を使って突進攻撃を行うこともある。<br>倒すとドロップするラッドスタッグの肉はキャリー重量ボーナスを付与する優秀な食料。</p>`,
    kanso:`FO76の食糧事情を支える重要なクリーチャー。ラッドスタッグのグリルステーキは最高のバフ食料です。<br>二つ頭のシカが森の中を跳ねて逃げていく姿は、核の荒野でありながらどこか牧歌的で癒やされます。<br>基本的に無害なので罪悪感がありますが、サバイバルのためには仕方ない…。`,
  },
  {
    slug:'stingwing-fo76',title:'Stingwing',titleJa:'スティングウィング',wikiSlug:'Stingwing_(Fallout_76)',
    mainImg:'FO76_creature_stingwing.png',
    infoRows:[['種別','ミュータント（昆虫変異体）'],['外見','巨大なスコーピオンフライ（シリアゲムシ）'],['攻撃','毒針、飛行急降下'],['地域','アパラチア全域'],['登場作品','Fallout 76']],
    body:`<h2>概要</h2><p><b>スティングウィング</b>は、放射線で変異した巨大なスコーピオンフライ（シリアゲムシ）型のクリーチャー。<br>飛行能力を持ち、空中から急降下して毒針で攻撃する。</p><h2>背景</h2><p>大戦前のアパラチアに生息していたシリアゲムシが放射線で巨大化した。<br>サソリに似た尾の先に強力な毒針を持ち、飛行しながら攻撃する厄介なハンター。</p><h2>特徴</h2><p>飛行しているため近接攻撃が当てにくく、V.A.T.S.を使った射撃が有効。<br>毒針によるDoTダメージが厄介で、複数体に囲まれると毒の蓄積で倒される危険がある。<br>ただし体力自体は低いため、命中さえすれば素早く倒せる。</p>`,
    kanso:`飛んでる敵は総じて厄介ですが、スティングウィングは特に小さくて素早いのが面倒。<br>V.A.T.S.がないと当てるのが一苦労。毒のDoTダメージが意外と痛くて舐めてると危ない相手です。<br>ただ、倒すとスティングウィングの毒液がドロップして薬物クラフトに使えるので、見つけたら積極的に狩りたいところ。`,
  },
];

function generateHtml(a){const articleId=`note_${a.slug.replace(/-/g,'_')}`;const rows=a.infoRows.map(r=>`<div class="infobox-row"><span class="infobox-label">${r[0]}</span><span>${r[1]}</span></div>`).join('');return`<!DOCTYPE html>\n<html lang="ja">\n<head>\n    <meta charset="UTF-8"><title>${a.title} | Overseer Mohi's Terminal</title><link rel="canonical" href="https://www.fallout-jp.com/${a.slug}.html"><meta property="og:type" content="article"><meta property="og:site_name" content="Overseer Mohi's Terminal"><meta property="og:locale" content="ja_JP"><meta property="og:title" content="${a.title} | Overseer Mohi's Terminal"><meta property="og:description" content="${a.titleJa}"><meta property="og:url" content="https://www.fallout-jp.com/${a.slug}.html"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@IwamotoFuta"><script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">\n${cssBlock}\n</head>\n<body data-article-category="クリーチャー" data-article-appearance="Fallout 76">\n    <div class="container">\n        <aside class="infobox"><h3 style="margin-top:0;text-align:center;">${a.title}</h3><img src="images/note_extracted/${a.slug}/img_main.png" alt="${a.title}">${rows}</aside>\n        <main class="content">\n            <div class="action-header"><a href="lore.html" class="back-link">&lt; BACK TO TERMINAL</a><button class="like-button" data-article-id="${articleId}" onclick="toggleLike(this)"><span class="heart">♡</span> <span class="like-count">0</span></button></div>\n            <h1>${a.title}<br><span style="font-size:0.6em;color:#888;font-family:'Noto Sans JP',sans-serif;font-weight:normal;">${a.titleJa}</span></h1>\n            ${a.body}\n<div class="quote-box"><b>感想</b><br><br>${a.kanso}</div>\n            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">\n                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/${a.wikiSlug}" target="_blank" rel="noopener">${a.title}</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>\n                <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>\n            </div>\n            <div class="comments-section"><h2 class="comments-title">&gt; COMMENTS_</h2><div class="comment-form"><textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力..." oninput="updateCharCount()"></textarea><div class="comment-form-footer"><span class="char-count"><span id="char-count">0</span>/100</span><button class="comment-submit-btn" onclick="submitComment()">SUBMIT &gt;</button></div><div id="comment-msg" class="comment-msg"></div></div><div id="comments-list"></div></div>\n        </main>\n    </div>\n    <div class="lightbox-overlay" id="lightbox" onclick="this.classList.remove('active')"><img id="lightbox-img" src="" alt=""></div>\n    <script>\n        const supabaseUrl='https://qkdjufvdeisnunismgaw.supabase.co';const supabaseKey='sb_publishable_6MtJQZESOx1XLLZ6cBeyJA_D_DyT2Zl';const supabaseClient=window.supabase.createClient(supabaseUrl,supabaseKey);\n        async function toggleLike(btn){const articleId=btn.getAttribute('data-article-id');let isLiked=localStorage.getItem(articleId+'_liked')==='true';btn.disabled=true;if(isLiked){isLiked=false;const{data,error}=await supabaseClient.rpc('decrement_like',{article_id_param:articleId});if(!error){localStorage.setItem(articleId+'_liked',isLiked);updateLikeButton(btn,isLiked,data);}}else{isLiked=true;const{data,error}=await supabaseClient.rpc('increment_like',{article_id_param:articleId});if(!error){localStorage.setItem(articleId+'_liked',isLiked);updateLikeButton(btn,isLiked,data);}}btn.disabled=false;}\n        function updateLikeButton(btn,isLiked,count){const heart=btn.querySelector('.heart');const countSpan=btn.querySelector('.like-count');if(isLiked){btn.classList.add('liked');heart.textContent='♥';}else{btn.classList.remove('liked');heart.textContent='♡';}countSpan.textContent=count;}\n        document.addEventListener('DOMContentLoaded',async()=>{const btn=document.querySelector('.like-button');if(btn){const articleId=btn.getAttribute('data-article-id');const isLiked=localStorage.getItem(articleId+'_liked')==='true';const{data,error}=await supabaseClient.from('likes').select('like_count').eq('article_id',articleId).single();let count=0;if(!error&&data)count=data.like_count;updateLikeButton(btn,isLiked,count);}const lightbox=document.getElementById('lightbox');const lightboxImg=document.getElementById('lightbox-img');document.querySelectorAll('.content img, .infobox img, .gallery-item img').forEach(img=>{img.addEventListener('click',(e)=>{e.stopPropagation();lightboxImg.src=img.src;lightbox.classList.add('active');});});});\n        const _commentArticleId='${articleId}';const _commentArticleName='${a.title.replace(/'/g,"\\'")}';const _commentArticleUrl='${a.slug}.html';\n        const ADMIN_TOKEN_KEY='fallout_admin_token';const ADMIN_PASSWORD='tq7jtq7j';const RATE_LIMIT_KEY='comment_last_posted';const RATE_LIMIT_SEC=60;let _isAdminMode=false;\n        function updateCharCount(){const len=document.getElementById('comment-input').value.length;const el=document.getElementById('char-count');if(el){el.textContent=len;el.style.color=len>90?'#ff6b6b':'var(--accent-color)';}}\n        function relativeTime(s){const d=(Date.now()-new Date(s).getTime())/1000;if(d<60)return'たった今';if(d<3600)return Math.floor(d/60)+'分前';if(d<86400)return Math.floor(d/3600)+'時間前';if(d<86400*7)return Math.floor(d/86400)+'日前';return new Date(s).toLocaleDateString('ja-JP');}\n        function escapeHtml(str){return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}\n        function renderComments(comments){const list=document.getElementById('comments-list');if(!list)return;if(!comments||comments.length===0){list.innerHTML='<div class="comment-empty">まだコメントがありません。最初のコメントを投稿してみましょう！</div>';return;}list.innerHTML=comments.map(c=>\`<div class="comment-item" data-id="\${c.id}"><div class="comment-meta"><span class="comment-time">\${relativeTime(c.created_at)}</span>\${_isAdminMode?\`<button class="comment-delete-btn" onclick="deleteComment('\${c.id}')">&#128465;</button>\`:''}</div><div class="comment-body">\${escapeHtml(c.content)}</div></div>\`).join('');}\n        async function loadComments(){const list=document.getElementById('comments-list');if(!list)return;const{data,error}=await supabaseClient.from('comments').select('id,content,created_at').eq('article_id',_commentArticleId).order('created_at',{ascending:false}).limit(50);if(error){list.innerHTML='<div class="comment-empty">コメントを読み込めませんでした。</div>';return;}renderComments(data||[]);}\n        async function submitComment(){const input=document.getElementById('comment-input');const content=input?input.value.trim():'';if(!content){showCommentMsg('コメントを入力してください。',false);return;}if(content.length>100){showCommentMsg('100文字以内で入力してください。',false);return;}const lastPosted=parseInt(localStorage.getItem(RATE_LIMIT_KEY)||'0');const now=Date.now();if(now-lastPosted<RATE_LIMIT_SEC*1000){showCommentMsg('あと'+Math.ceil((RATE_LIMIT_SEC*1000-(now-lastPosted))/1000)+'秒後に投稿できます。',false);return;}const btn=document.querySelector('.comment-submit-btn');if(btn)btn.disabled=true;const{error}=await supabaseClient.from('comments').insert({article_id:_commentArticleId,article_name:_commentArticleName,article_url:_commentArticleUrl,content:content});if(btn)btn.disabled=false;if(error){showCommentMsg('投稿に失敗しました。',false);return;}localStorage.setItem(RATE_LIMIT_KEY,now.toString());input.value='';updateCharCount();showCommentMsg('コメントを投稿しました！',true);await loadComments();}\n        function showCommentMsg(text,ok){const el=document.getElementById('comment-msg');if(!el)return;el.textContent=text;el.style.color=ok?'var(--accent-color)':'#ff6b6b';setTimeout(()=>{el.textContent='';},3000);}\n        async function deleteComment(commentId){if(!_isAdminMode)return;if(!confirm('このコメントを削除しますか？'))return;const{error}=await supabaseClient.rpc('delete_comment_admin',{comment_id:commentId,admin_token:localStorage.getItem(ADMIN_TOKEN_KEY)||''});if(error){alert('削除失敗: '+error.message);return;}await loadComments();}\n        document.addEventListener('keydown',(e)=>{if(e.ctrlKey&&e.shiftKey&&e.key==='D'){e.preventDefault();if(_isAdminMode){_isAdminMode=false;localStorage.removeItem(ADMIN_TOKEN_KEY);loadComments();alert('管理者モードを終了しました。');return;}const pw=prompt('管理者パスワードを入力してください:');if(!pw)return;if(pw===ADMIN_PASSWORD){_isAdminMode=true;localStorage.setItem(ADMIN_TOKEN_KEY,pw);loadComments();alert('管理者モードに入りました。');}else{alert('パスワードが違います。');}}});\n        document.addEventListener('DOMContentLoaded',()=>{loadComments();});\n    </script>\n    <script src="article-common.js" defer></script>\n</body>\n</html>`;}

async function main(){
  for(const a of articles){
    console.log(`\n📄 生成中: ${a.title}`);
    const imgDir=`F:/Fallout/images/note_extracted/${a.slug}`;
    fs.mkdirSync(imgDir,{recursive:true});
    await sleep(200);
    const mainUrl=await getImageUrl(a.mainImg);
    if(mainUrl){await downloadImage(mainUrl,path.join(imgDir,'img_main.png'));console.log('  ✅ メイン画像');}else{console.log('  ⚠️ メイン画像なし');}
    fs.writeFileSync(`F:/Fallout/${a.slug}.html`,generateHtml(a),'utf8');
    console.log(`  ✅ HTML: ${a.slug}.html`);
    // X投稿素材
    const xDir=`F:/Fallout/_X/${a.slug}`;fs.mkdirSync(`${xDir}/images`,{recursive:true});
    const mainSrc=path.join(imgDir,'img_main.png');
    if(fs.existsSync(mainSrc)){fs.copyFileSync(mainSrc,`${xDir}/images/1.png`);}
    const postMd=`#Fallout76\n\n${a.title}（${a.titleJa}）\nhttps://www.fallout-jp.com/${a.slug}.html\n\n${a.body.replace(/<[^>]+>/g,'').replace(/\n\n+/g,'\n\n').trim()}\n\n---\n\n💭 感想\n\n${a.kanso.replace(/<br>/g,'\n').trim()}\n\n---\n\nThis article uses material from the Fallout wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.\n`;
    fs.writeFileSync(`${xDir}/post.md`,postMd,'utf8');
    console.log(`  ✅ X素材: _X/${a.slug}/post.md`);
  }
  console.log('\n✅ バッチ2（中重要度前半13件）完了！');
}
main().catch(e=>console.error('エラー:',e));
