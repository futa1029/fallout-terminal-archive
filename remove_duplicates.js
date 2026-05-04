const fs = require('fs');
const path = require('path');

const DIR = 'f:\\Fallout';
const DATA_FILE = path.join(DIR, 'note_articles_data.json');
const LORE_HTML = path.join(DIR, 'lore.html');

// 既存の9件の手動定義データ（維持するオリジナル版）
const manualEntries = [
    {
        name: "10mmピストル",
        yomi: "10mmピストル",
        url: "10mm-pistol.html",
        category: "武器",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: ".44ピストル",
        yomi: ".44ピストル",
        url: "44-pistol.html",
        category: "武器",
        appearance: ["Fallout 76","Fallout 4"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "98 NARリージョナル",
        yomi: "98 NARリージョナル",
        url: "98-nar-regional.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アーロンホルト農場",
        yomi: "アーロンホルト農場",
        url: "aaron-holt-farm.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "アーロン・キンバル",
        yomi: "アーロン・キンバル",
        url: "aaron-kimball.html",
        category: "人物",
        appearance: ["Fallout 76","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アーロンホルト農家",
        yomi: "アーロンホルト農家",
        url: "aaronholt-homestead.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "放棄された湿原の町",
        yomi: "放棄された湿原の町",
        url: "abandoned-bog-town.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "放棄されたバンカー",
        yomi: "放棄されたバンカー",
        url: "abandoned-bunker.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "放棄鉱山キタリー",
        yomi: "放棄鉱山キタリー",
        url: "abandoned-mine-kittery.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "放棄鉱山坑道 1",
        yomi: "放棄鉱山坑道 1",
        url: "abandoned-mine-shaft-1.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "放棄された鉱山坑道2",
        yomi: "放棄された鉱山坑道2",
        url: "abandoned-mine-shaft-2.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "放棄鉱山坑道 3",
        yomi: "放棄鉱山坑道 3",
        url: "abandoned-mine-shaft-3.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "放棄鉱山坑道 4",
        yomi: "放棄鉱山坑道 4",
        url: "abandoned-mine-shaft-4.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "放棄鉱山坑道 5",
        yomi: "放棄鉱山坑道 5",
        url: "abandoned-mine-shaft-5.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "放棄鉱山坑道 6",
        yomi: "放棄鉱山坑道 6",
        url: "abandoned-mine-shaft-6.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "放棄鉱山坑道エレイン",
        yomi: "放棄鉱山坑道エレイン",
        url: "abandoned-mine-shaft-elaine.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "放棄された鉱山サイト・キタリー",
        yomi: "放棄された鉱山サイト・キタリー",
        url: "abandoned-mine-site-kittery.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "廃墟となったタコス屋",
        yomi: "廃墟となったタコス屋",
        url: "abandoned-taco-stand.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "放棄された廃棄場",
        yomi: "放棄された廃棄場",
        url: "abandoned-waste-dump.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アビーのバンカー",
        yomi: "アビーのバンカー",
        url: "abbies-bunker.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アバナシー・ファーム",
        yomi: "アバナシー・ファーム",
        url: "abernathy-farm.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アビゲイル・\"アビー\"・シン",
        yomi: "アビゲイル・\"アビー\"・シン",
        url: "abigayle-singh.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アブラクソダイン・ケミカル配電所",
        yomi: "アブラクソダイン・ケミカル配電所",
        url: "abraxodyne-chemical-power-substation.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アブラクソダイン・オフィス",
        yomi: "アブラクソダイン・オフィス",
        url: "abraxodyne-office.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アカディア",
        yomi: "アカディア",
        url: "acadia-location.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4 (Far Harbor)"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エイダ",
        yomi: "エイダ",
        url: "ada.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Adam",
        yomi: "Adam",
        url: "adam-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アディクトール（Addictol）",
        yomi: "アディクトール（Addictol）",
        url: "addictol.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "アデレード",
        yomi: "アデレード",
        url: "adelaide.html",
        category: "人物",
        appearance: ["Fallout 76","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "アデレードのダイナー",
        yomi: "アデレードのダイナー",
        url: "adelaides-diner.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アドベ教会",
        yomi: "アドベ教会",
        url: "adobe-church.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エイ・リ",
        yomi: "エイ・リ",
        url: "ae-ri.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アフォーダブル・アルのディスカウント・ホスピタル",
        yomi: "アフォーダブル・アルのディスカウント・ホスピタル",
        url: "affordable-al-s-discount-hospital.html",
        category: "場所",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アガサ",
        yomi: "アガサ",
        url: "agatha.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "航空券検査員",
        yomi: "航空券検査員",
        url: "airline-ticket-inspector.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "空港の旅行者",
        yomi: "空港の旅行者",
        url: "airport-traveler.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オールバニー",
        yomi: "オールバニー",
        url: "albany.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Alderton",
        yomi: "Alderton",
        url: "alderton.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オルドリッジ",
        yomi: "オルドリッジ",
        url: "aldridge.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アレクサンダー・ボーマー",
        yomi: "アレクサンダー・ボーマー",
        url: "alexander-boamer.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アレクシス",
        yomi: "アレクシス",
        url: "alexis.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アリ",
        yomi: "アリ",
        url: "ali.html",
        category: "クリーチャー",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "エイリアンブラスター",
        yomi: "エイリアンブラスター",
        url: "alien-blaster.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "エイリアンの食用生物",
        yomi: "エイリアンの食用生物",
        url: "alien-edible-creatures.html",
        category: "クリーチャー",
        appearance: ["Fallout 76","Fallout 3"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "エイリアン（概要）",
        yomi: "エイリアン（概要）",
        url: "aliens-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アリステア",
        yomi: "アリステア",
        url: "alistair.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "アレゲニー山脈",
        yomi: "アレゲニー山脈",
        url: "allegheny-mountains.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アレメイン軍曹",
        yomi: "アレメイン軍曹",
        url: "allemane.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アリステア・テンペニー将軍",
        yomi: "アリステア・テンペニー将軍",
        url: "allistair-tenpenny.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Aloe",
        yomi: "Aloe",
        url: "aloe.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アルパインリバー・キャビン",
        yomi: "アルパインリバー・キャビン",
        url: "alpine-river-cabin.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "アルパイン・リバー・キャビンズ",
        yomi: "アルパイン・リバー・キャビンズ",
        url: "alpine-river-cabins.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アマタ・アルモドバル",
        yomi: "アマタ・アルモドバル",
        url: "amata.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "弾薬庫",
        yomi: "弾薬庫",
        url: "ammo-dump.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ボットスミス・アンプ",
        yomi: "ボットスミス・アンプ",
        url: "amp.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "AMS本社ビル",
        yomi: "AMS本社ビル",
        url: "ams-corporate-headquarters.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "AMSテストサイト",
        yomi: "AMSテストサイト",
        url: "ams-testing-site.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エイミー・ケリー",
        yomi: "エイミー・ケリー",
        url: "amy-kelly.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "エイミー・L・ケリー",
        yomi: "エイミー・L・ケリー",
        url: "amy-kerry.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アンカー農場",
        yomi: "アンカー農場",
        url: "anchor-farm.html",
        category: "場所",
        appearance: ["Fallout 76","Fallout 3"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "アンドリュー・ローズ",
        yomi: "アンドリュー・ローズ",
        url: "andrew-rhodes.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アンドリュー駅",
        yomi: "アンドリュー駅",
        url: "andrew-station.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アネットのアレンジメンツ",
        yomi: "アネットのアレンジメンツ",
        url: "anettes-arrangements.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アングラー",
        yomi: "アングラー",
        url: "angler.html",
        category: "クリーチャー",
        appearance: ["Fallout 76","Fallout 4"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "アン・リッツィンガー",
        yomi: "アン・リッツィンガー",
        url: "anne-litzinger.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アンセル・エイブラムス",
        yomi: "アンセル・エイブラムス",
        url: "ansel-abrahms.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "antagonizer",
        yomi: "antagonizer",
        url: "antagonizer.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アントワーヌ",
        yomi: "アントワーヌ",
        url: "antoine.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "appalachia",
        yomi: "appalachia",
        url: "appalachia.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アパラチアン・アンティーク",
        yomi: "アパラチアン・アンティーク",
        url: "appalachian-antiques.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アパラチアの核発射コード",
        yomi: "アパラチアの核発射コード",
        url: "appalachian-launch-codes.html",
        category: "ゲームプレイ",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アパラチア・ラジオ",
        yomi: "アパラチア・ラジオ",
        url: "appalachian-radio.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "水上トイレ小屋",
        yomi: "水上トイレ小屋",
        url: "aquatic-outhouse.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アラデシュ",
        yomi: "アラデシュ",
        url: "aradesh.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "アーケイド・ギャノン",
        yomi: "アーケイド・ギャノン",
        url: "arcade-gannon.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アーチェリー・セット",
        yomi: "アーチェリー・セット",
        url: "archery-set.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "アーチボルド・サックス",
        yomi: "アーチボルド・サックス",
        url: "archibald-sachs.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Archie the Kid (アーチー・ザ・キッド)",
        yomi: "Archie the Kid (アーチー・ザ・キッド)",
        url: "archie-the-kid.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アークジェット・システム",
        yomi: "アークジェット・システム",
        url: "arcjet-systems.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エリア51",
        yomi: "エリア51",
        url: "area-51.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アーガイル",
        yomi: "アーガイル",
        url: "argyle.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "自律型研究知能コンピューター",
        yomi: "自律型研究知能コンピューター",
        url: "aric-4.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Aries",
        yomi: "Aries",
        url: "aries.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アークトス・ファーマ・バイオーム研究所",
        yomi: "アークトス・ファーマ・バイオーム研究所",
        url: "arktos-pharma-biome-research-institute.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "アークトス・ファーマ (企業)",
        yomi: "アークトス・ファーマ (企業)",
        url: "arktos-pharma-corporate.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "アークトス・ファーマ",
        yomi: "アークトス・ファーマ",
        url: "arktos-pharma.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "アーマー・エース",
        yomi: "アーマー・エース",
        url: "armor-ace.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Arnold",
        yomi: "Arnold",
        url: "arnold-galaxy-news-network.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アーノルド（ギャラクシー・ニュース・ネットワーク）",
        yomi: "アーノルド（ギャラクシー・ニュース・ネットワーク）",
        url: "arnold-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アート・ナップ",
        yomi: "アート・ナップ",
        url: "art-knapp.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ARTEMIS",
        yomi: "ARTEMIS",
        url: "artemis-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アーサー・マクソン (少年期)",
        yomi: "アーサー・マクソン (少年期)",
        url: "arthur-maxson.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アーサー・ワームリー",
        yomi: "アーサー・ワームリー",
        url: "arthur-wormeley.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アーティザンズ・ロウ・ショップス",
        yomi: "アーティザンズ・ロウ・ショップス",
        url: "artisans-row-shoppes.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アッシュ・ケイブ",
        yomi: "アッシュ・ケイブ",
        url: "ash-cave.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Ash Heap Marketplace",
        yomi: "Ash Heap Marketplace",
        url: "ash-heap-marketplace.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アッシュヒープ",
        yomi: "アッシュヒープ",
        url: "ash-heap.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アッシュ・ローズ",
        yomi: "アッシュ・ローズ",
        url: "ash-rose.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "アシュモア",
        yomi: "アシュモア",
        url: "ashmore.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Aspirant",
        yomi: "Aspirant",
        url: "aspirant-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アサルトロン",
        yomi: "アサルトロン",
        url: "assaultron.html",
        category: "武器",
        appearance: ["Fallout 76","Fallout 4"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Recovered Assaultron Head (回収されたアサルトロン頭部)",
        yomi: "Recovered Assaultron Head (回収されたアサルトロン頭部)",
        url: "assaultron_head.html",
        category: "武器",
        appearance: ["Fallout 4","Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "助監督",
        yomi: "助監督",
        url: "assistant-director.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ATHENA",
        yomi: "ATHENA",
        url: "athena.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アテネ武器庫",
        yomi: "アテネ武器庫",
        url: "athens-armory.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アテネ精神病院",
        yomi: "アテネ精神病院",
        url: "athens-lunatic-asylum.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アテネ",
        yomi: "アテネ",
        url: "athens.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ATLAS天文台",
        yomi: "ATLAS天文台",
        url: "atlas-observatory.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アトムキャッツのガレージ",
        yomi: "アトムキャッツのガレージ",
        url: "atom-cats-garage.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アトミック・ラングラー・カジノ (Atomic Wrangler Casino)",
        yomi: "アトミック・ラングラー・カジノ (Atomic Wrangler Casino)",
        url: "atomic-wrangler-casino.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Aubrie Willem",
        yomi: "Aubrie Willem",
        url: "aubrie-willem.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オーガスタス・オータム大佐",
        yomi: "オーガスタス・オータム大佐",
        url: "augustus-autumn.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オートマイナーDU-K3",
        yomi: "オートマイナーDU-K3",
        url: "auto-miner-du-k3.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オータム・エーカー・キャビン",
        yomi: "オータム・エーカー・キャビン",
        url: "autumn-acre-cabin.html",
        category: "ロケーション",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エイバ・ローズ",
        yomi: "エイバ・ローズ",
        url: "ava-rose.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エヴァ・ウェスト",
        yomi: "エヴァ・ウェスト",
        url: "ava-west.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "AVR Medical Center",
        yomi: "AVR Medical Center",
        url: "avr-medical-center.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Axel (アクセル)",
        yomi: "Axel (アクセル)",
        url: "axel-milepost-zero.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アクセル",
        yomi: "アクセル",
        url: "axel-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "B.O.B.クッキングステーション",
        yomi: "B.O.B.クッキングステーション",
        url: "b-o-b-cooking-station.html",
        category: "場所",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "B.O.S.アウトキャスト",
        yomi: "B.O.S.アウトキャスト",
        url: "b-o-s-outcast.html",
        category: "勢力",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "バックパック",
        yomi: "バックパック",
        url: "backpack.html",
        category: "アイテム",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "BADTFL地方局",
        yomi: "BADTFL地方局",
        url: "badtfl-regional-office.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベイリー家のキャビン",
        yomi: "ベイリー家のキャビン",
        url: "bailey-family-cabin.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハゲのレイダー",
        yomi: "ハゲのレイダー",
        url: "bald-raider.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バナナ・ユッカの果実",
        yomi: "バナナ・ユッカの果実",
        url: "banana-yucca-fruit.html",
        category: "植物",
        appearance: ["Fallout 76","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Bar patron",
        yomi: "Bar patron",
        url: "bar-patron-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バーブ・ハワード",
        yomi: "バーブ・ハワード",
        url: "barb-howard.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バーブ",
        yomi: "バーブ",
        url: "barb-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Barbara Elizabeth",
        yomi: "Barbara Elizabeth",
        url: "barbara-elizabeth.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドラム缶埋葬地",
        yomi: "ドラム缶埋葬地",
        url: "barrel-burial.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Bartender (Los Angeles)",
        yomi: "Bartender (Los Angeles)",
        url: "bartender-los-angeles.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Bartender (Lucky 38)",
        yomi: "Bartender (Lucky 38)",
        url: "bartender-lucky-38.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バーブ（フィリー）",
        yomi: "バーブ（フィリー）",
        url: "barv.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バスティオン・パーク",
        yomi: "バスティオン・パーク",
        url: "bastion-park.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Batter",
        yomi: "Batter",
        url: "batter.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "BBQシャック (TVシリーズ)",
        yomi: "BBQシャック (TVシリーズ)",
        url: "bbq-shack-tv-series.html",
        category: "場所",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ビーグル保安官補",
        yomi: "ビーグル保安官補",
        url: "beagle.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ビーンタウン醸造所",
        yomi: "ビーンタウン醸造所",
        url: "beantown-brewery.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベックリーの獣の巣",
        yomi: "ベックリーの獣の巣",
        url: "beast-of-beckleys-den.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Beastmaster Lina",
        yomi: "Beastmaster Lina",
        url: "beastmaster-lina.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Beatrice the Wrench",
        yomi: "Beatrice the Wrench",
        url: "beatrice-the-wrench.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ビーバー",
        yomi: "ビーバー",
        url: "beaver.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ベッカー農場",
        yomi: "ベッカー農場",
        url: "becker-farm.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Beckett",
        yomi: "Beckett",
        url: "beckett-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベケット",
        yomi: "ベケット",
        url: "beckett.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Beckley Mine Exhibit",
        yomi: "Beckley Mine Exhibit",
        url: "beckley-mine-exhibit.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベックリー",
        yomi: "ベックリー",
        url: "beckley.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベックウィス農場",
        yomi: "ベックウィス農場",
        url: "beckwith-farm.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベッドフォード駅",
        yomi: "ベッドフォード駅",
        url: "bedford-station.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベルチング・ベティ",
        yomi: "ベルチング・ベティ",
        url: "belching-betty.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベルホップ",
        yomi: "ベルホップ",
        url: "bellhop.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Overseer Benjamin",
        yomi: "Overseer Benjamin",
        url: "benjamin-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "監督官ベンジャミン",
        yomi: "監督官ベンジャミン",
        url: "benjamin-tv.html",
        category: "人物",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベニー",
        yomi: "ベニー",
        url: "benny.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バークレー・スプリングス駅",
        yomi: "バークレー・スプリングス駅",
        url: "berkeley-springs-station.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バークレー・スプリングス西",
        yomi: "バークレー・スプリングス西",
        url: "berkeley-springs-west.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バークレー・スプリングス",
        yomi: "バークレー・スプリングス",
        url: "berkeley-springs.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Bernie",
        yomi: "Bernie",
        url: "bernie.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Bert",
        yomi: "Bert",
        url: "bert-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベッシー",
        yomi: "ベッシー",
        url: "bessie-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベティ・マンガノ",
        yomi: "ベティ・マンガノ",
        url: "bethy-mangano.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Betty Hill",
        yomi: "Betty Hill",
        url: "betty-hill.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベティ・ピアソン",
        yomi: "ベティ・ピアソン",
        url: "betty-pearson.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "自転車の墓場",
        yomi: "自転車の墓場",
        url: "bicycle-graveyard.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Ranger Biff",
        yomi: "Ranger Biff",
        url: "biff-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ビッグ・アルのタトゥー・パーラー",
        yomi: "ビッグ・アルのタトゥー・パーラー",
        url: "big-al-s-tattoo-parlor.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ビッグ・アルのタトゥーパーラー",
        yomi: "ビッグ・アルのタトゥーパーラー",
        url: "big-als-tattoo.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ビッグベンド・トンネル・キャンプサイト",
        yomi: "ビッグベンド・トンネル・キャンプサイト",
        url: "big-bend-tunnel-campsite.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ビッグベンド・トンネル東口",
        yomi: "ビッグベンド・トンネル東口",
        url: "big-bend-tunnel-east.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ビッグ・ベンド・トンネル西",
        yomi: "ビッグ・ベンド・トンネル西",
        url: "big-bend-tunnel-west.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ビッグベンド・トンネル",
        yomi: "ビッグベンド・トンネル",
        url: "big-bend-tunnel.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ビッグBの休憩所",
        yomi: "ビッグBの休憩所",
        url: "big-bs-rest-stop.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ビッグ・フレッドのBBQシャック",
        yomi: "ビッグ・フレッドのBBQシャック",
        url: "big-freds-bbq-shack.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ビッグジョンのサルベージ場",
        yomi: "ビッグジョンのサルベージ場",
        url: "big-johns-salvage.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ビッグ・モウ",
        yomi: "ビッグ・モウ",
        url: "big-maw.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ビッグ・マスキーのバケット",
        yomi: "ビッグ・マスキーのバケット",
        url: "big-muskies-bucket.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ビッグ・パパ・モーのサンドイッチ小屋",
        yomi: "ビッグ・パパ・モーのサンドイッチ小屋",
        url: "big-papa-moes.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "bigfoot",
        yomi: "bigfoot",
        url: "bigfoot.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ビギー",
        yomi: "ビギー",
        url: "biggie.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Bill",
        yomi: "Bill",
        url: "bill-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ビルボードのジャンクキャンプ",
        yomi: "ビルボードのジャンクキャンプ",
        url: "billboard-junk-camp.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ビリングス農家",
        yomi: "ビリングス農家",
        url: "billings-homestead.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ビリー",
        yomi: "ビリー",
        url: "billy-harpers-ferry.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Biplane crash (Anchor farm)",
        yomi: "Biplane crash (Anchor farm)",
        url: "biplane-crash-anchor-farm.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "バードハウス・リッジ",
        yomi: "バードハウス・リッジ",
        url: "birdhouse-ridge.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "バーディ",
        yomi: "バーディ",
        url: "birdie-tv.html",
        category: "人物",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バーディ",
        yomi: "バーディ",
        url: "birdie.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Birdwatcher's platform",
        yomi: "Birdwatcher's platform",
        url: "birdwatchers-platform.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "誕生会に呼ばれた客たち",
        yomi: "誕生会に呼ばれた客たち",
        url: "birthday-party-guest.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ビブ・E・リッジ",
        yomi: "ビブ・E・リッジ",
        url: "biv.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブラックベア・ロッジ",
        yomi: "ブラックベア・ロッジ",
        url: "black-bear-lodge.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブラックアイド・スーザン",
        yomi: "ブラックアイド・スーザン",
        url: "black-eyed-susan.html",
        category: "植物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Black Mountain Ordnance Works",
        yomi: "Black Mountain Ordnance Works",
        url: "black-mountain-ordnance-works.html",
        category: "未分類",
        appearance: [],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ブラックマウンテン兵器工場",
        yomi: "ブラックマウンテン兵器工場",
        url: "black-mountain-ordnance.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "黒色火薬ブランダーバス",
        yomi: "黒色火薬ブランダーバス",
        url: "black-powder-blunderbuss.html",
        category: "武器",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "黒色火薬ピストル",
        yomi: "黒色火薬ピストル",
        url: "black-powder-pistol.html",
        category: "武器",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ブラックアイ",
        yomi: "ブラックアイ",
        url: "blackeye.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブラックウォーター鉱山",
        yomi: "ブラックウォーター鉱山",
        url: "blackwater-mine.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブレイク・サンダース博士",
        yomi: "ブレイク・サンダース博士",
        url: "blake-saunders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブレイクの供物",
        yomi: "ブレイクの供物",
        url: "blakes-offering.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブリーディング・ケイトのグラインドハウス",
        yomi: "ブリーディング・ケイトのグラインドハウス",
        url: "bleeding-kates-grindhouse.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Blight (ブライト)",
        yomi: "Blight (ブライト)",
        url: "blight.html",
        category: "植物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ブラッドバグ",
        yomi: "ブラッドバグ",
        url: "blood-bug.html",
        category: "クリーチャー",
        appearance: ["Fallout 76","Fallout 4"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ブラッドイーグル・キャンプ",
        yomi: "ブラッドイーグル・キャンプ",
        url: "blood-eagle-camp.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブラッド・イーグル",
        yomi: "ブラッド・イーグル",
        url: "blood-eagle.html",
        category: "勢力",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Bloodhound",
        yomi: "Bloodhound",
        url: "bloodhound-gleaming-depths.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Bloodleaf",
        yomi: "Bloodleaf",
        url: "bloodleaf.html",
        category: "植物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "血濡れ不屈ビルド",
        yomi: "血濡れ不屈ビルド",
        url: "bloody-indomitable-build.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ブルーリッジ・バンクハウス",
        yomi: "ブルーリッジ・バンクハウス",
        url: "blue-ridge-bunkhouse.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブルーリッジ・ギャラリー",
        yomi: "ブルーリッジ・ギャラリー",
        url: "blue-ridge-gallery.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブルーリッジの宿泊小屋",
        yomi: "ブルーリッジの宿泊小屋",
        url: "blue-ridge-lodge.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ボブ・スペンサー",
        yomi: "ボブ・スペンサー",
        url: "bob-spencer.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Bodhi (ボーディ)",
        yomi: "Bodhi (ボーディ)",
        url: "bodhi.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ボグ水路シェルター",
        yomi: "ボグ水路シェルター",
        url: "bog-channel-shelter.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ボルトン・グリーンズ",
        yomi: "ボルトン・グリーンズ",
        url: "bolton-greens.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブーマー",
        yomi: "ブーマー",
        url: "boomer-fallout-76.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "密造酒業者の小屋",
        yomi: "密造酒業者の小屋",
        url: "bootleggers-shack.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "国境警備隊員",
        yomi: "国境警備隊員",
        url: "border-agent.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Dr. ボロス",
        yomi: "Dr. ボロス",
        url: "borous.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ボズリー",
        yomi: "ボズリー",
        url: "bosley.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ボストン空港",
        yomi: "ボストン空港",
        url: "boston-airport.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ボストン・コモン（スワンの池）",
        yomi: "ボストン・コモン（スワンの池）",
        url: "boston-common.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ボストン市長用シェルター",
        yomi: "ボストン市長用シェルター",
        url: "boston-mayoral-shelter.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ボストン警察配給所",
        yomi: "ボストン警察配給所",
        url: "boston-police-rationing-site.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ボストン公共図書館",
        yomi: "ボストン公共図書館",
        url: "boston-public-library.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ボトルキャップ",
        yomi: "ボトルキャップ",
        url: "bottle-cap.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ボトル",
        yomi: "ボトル",
        url: "bottle.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ボイルストンクラブ",
        yomi: "ボイルストンクラブ",
        url: "boylston-club.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バラモン",
        yomi: "バラモン",
        url: "brahmin.html",
        category: "クリーチャー",
        appearance: ["Fallout 76","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "脳みそキノコ",
        yomi: "脳みそキノコ",
        url: "brain-mushroom.html",
        category: "植物",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ブラムコ・ブランド・マック＆チーズ",
        yomi: "ブラムコ・ブランド・マック＆チーズ",
        url: "bramco-brand-mac-and-cheese.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ブラムウェル",
        yomi: "ブラムウェル",
        url: "bramwell.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Head Engineer Brass",
        yomi: "Head Engineer Brass",
        url: "brass.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブラクソンの医療品店",
        yomi: "ブラクソンの医療品店",
        url: "braxsons-quality-medical.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブレイクハート・バンクス",
        yomi: "ブレイクハート・バンクス",
        url: "breakheart-banks.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブリム採石場",
        yomi: "ブリム採石場",
        url: "brim-quarry.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブロートフライ",
        yomi: "ブロートフライ",
        url: "broat-fries_2.html",
        category: "クリーチャー",
        appearance: ["Fallout 76","Fallout 3","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブロディ・トーランス",
        yomi: "ブロディ・トーランス",
        url: "brody-torrance.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バーナビー医師",
        yomi: "バーナビー医師",
        url: "brotherhood-barnaby.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブラザーフッドのバリー",
        yomi: "ブラザーフッドのバリー",
        url: "brotherhood-barry.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブラザーフッド・ベース",
        yomi: "ブラザーフッド・ベース",
        url: "brotherhood-base.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Brotherhood Buck",
        yomi: "Brotherhood Buck",
        url: "brotherhood-buck.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "B.O.S. 共同墓地",
        yomi: "B.O.S. 共同墓地",
        url: "brotherhood-graveyard.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブラザーフッドの衛生兵",
        yomi: "ブラザーフッドの衛生兵",
        url: "brotherhood-medic.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブラザーフッド・オブ・スティール",
        yomi: "ブラザーフッド・オブ・スティール",
        url: "brotherhood-of-steel.html",
        category: "勢力",
        appearance: ["Fallout 全般"],
        date: "2026-05-03",
        status: "published"
    },
    {
        name: "ブラザーフッドのオフィサー（将校）",
        yomi: "ブラザーフッドのオフィサー（将校）",
        url: "brotherhood-officer.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Brotherhood soldier",
        yomi: "Brotherhood soldier",
        url: "brotherhood-soldier-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "B.O.S.ベンダー",
        yomi: "B.O.S.ベンダー",
        url: "brotherhood-vendor.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブルーザー",
        yomi: "ブルーザー",
        url: "bruiser-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Bruno the Strongbot (ブルーノ・ザ・ストロングボット)",
        yomi: "Bruno the Strongbot (ブルーノ・ザ・ストロングボット)",
        url: "bruno-the-strongbot.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バブルガム",
        yomi: "バブルガム",
        url: "bubble-gum.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "バブルス",
        yomi: "バブルス",
        url: "bubbles.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バド・アスキンス",
        yomi: "バド・アスキンス",
        url: "bud-askins.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バッズ・バッズ",
        yomi: "バッズ・バッズ",
        url: "buds_buds.html",
        category: "未分類",
        appearance: [],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ケン・ユアーズ",
        yomi: "ケン・ユアーズ",
        url: "buds_full.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バッファロー・ゴードの種",
        yomi: "バッファロー・ゴードの種",
        url: "buffalo-gourd-seed.html",
        category: "植物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "バファウト",
        yomi: "バファウト",
        url: "buffout.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "バンカーヒル",
        yomi: "バンカーヒル",
        url: "bunker-hill.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バーデット邸",
        yomi: "バーデット邸",
        url: "burdette-manor.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "大柄なレイダー",
        yomi: "大柄なレイダー",
        url: "burly-raider.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バーニング・スプリングス（地域）",
        yomi: "バーニング・スプリングス（地域）",
        url: "burning-springs-region.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バーニング・スプリングス",
        yomi: "バーニング・スプリングス",
        url: "burning-springs.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブッチ・デロリア",
        yomi: "ブッチ・デロリア",
        url: "butch-deloria.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout 4","Fallout 3"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "バズソー",
        yomi: "バズソー",
        url: "buzzsaw.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "C.A.M.P. (建設組立用移動プラットフォーム)",
        yomi: "C.A.M.P. (建設組立用移動プラットフォーム)",
        url: "c-a-m-p-mobile-platform-for-construction-assembly.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Cabbage",
        yomi: "Cabbage",
        url: "cabbage.html",
        category: "植物",
        appearance: ["Fallout 2"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "カボット邸（キャボット邸）",
        yomi: "カボット邸（キャボット邸）",
        url: "cabot-house.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キャデラック・ボブ",
        yomi: "キャデラック・ボブ",
        url: "cadillac-bob.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シーザー・リージョンのキャンプ",
        yomi: "シーザー・リージョンのキャンプ",
        url: "caesar-s-legion-camp.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シーザー",
        yomi: "シーザー",
        url: "caesar-tv.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シーザー (エドワード・サロウ)",
        yomi: "シーザー (エドワード・サロウ)",
        url: "caesar.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ケイト",
        yomi: "ケイト",
        url: "cait.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ケイレブ・カーソン",
        yomi: "ケイレブ・カーソン",
        url: "caleb-carson.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Caleb Fisher",
        yomi: "Caleb Fisher",
        url: "caleb-fisher.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ケイレブ・ウィドマー",
        yomi: "ケイレブ・ウィドマー",
        url: "caleb-widmer.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カリフォルニア・クレスト・スタジオ",
        yomi: "カリフォルニア・クレスト・スタジオ",
        url: "california-crest-studios.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カルバート教授",
        yomi: "カルバート教授",
        url: "calvert.html",
        category: "人物",
        appearance: ["Fallout 3 (Point Lookout)"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ケンブリッジ警察署",
        yomi: "ケンブリッジ警察署",
        url: "cambridge-police-station.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ケンブリッジポリマー研究所",
        yomi: "ケンブリッジポリマー研究所",
        url: "cambridge-polymer-labs.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カムデンパーク・セキュリティ",
        yomi: "カムデンパーク・セキュリティ",
        url: "camden-park-security.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カムデンパーク",
        yomi: "カムデンパーク",
        url: "camden-park.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キャンプ・アダムス見張り台",
        yomi: "キャンプ・アダムス見張り台",
        url: "camp-adams-lookout.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キャンプ・アダムス",
        yomi: "キャンプ・アダムス",
        url: "camp-adams.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キャンプ・ゴルフのテント",
        yomi: "キャンプ・ゴルフのテント",
        url: "camp-golf-tent.html",
        category: "場所",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キャンプ・ゴルフ",
        yomi: "キャンプ・ゴルフ",
        url: "camp-golf.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キャンプ・マクリントック",
        yomi: "キャンプ・マクリントック",
        url: "camp-mcclintock.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キャンプ・ベンチャー",
        yomi: "キャンプ・ベンチャー",
        url: "camp-venture.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カナダの反乱者",
        yomi: "カナダの反乱者",
        url: "canadian-rebel.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キャッピー",
        yomi: "キャッピー",
        url: "cappy.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout 4"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "キャプテン・コスモス",
        yomi: "キャプテン・コスモス",
        url: "captain-cosmos.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "カーヘンジ",
        yomi: "カーヘンジ",
        url: "carhenge-fo76.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "DJカール",
        yomi: "DJカール",
        url: "carl-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カールトン鉱山",
        yomi: "カールトン鉱山",
        url: "carleton-mine.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キャロル・パットナム",
        yomi: "キャロル・パットナム",
        url: "carol-putnam.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キャロル・スウィーニー",
        yomi: "キャロル・スウィーニー",
        url: "carol-sweeney.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キャロリン",
        yomi: "キャロリン",
        url: "carolyn.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "carrie-boyd",
        yomi: "carrie-boyd",
        url: "carrie-boyd.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "「長い茎に繊細な白い花をつけた標本。食用と思われ、農場で栽培されている変異ニンジンとの関連が疑われる。性質が不明なため、摂取には十分注意されたし。」<br>\r\n                <span style=\"font-size: 0.85em; color: #888;\">— シニア・スクライブ ネリア（プリドウェン植物学ターミナル）</span>",
        yomi: "「長い茎に繊細な白い花をつけた標本。食用と思われ、農場で栽培されている変異ニンジンとの関連が疑われる。性質が不明なため、摂取には十分注意されたし。」<br>\r\n                <span style=\"font-size: 0.85em; color: #888;\">— シニア・スクライブ ネリア（プリドウェン植物学ターミナル）</span>",
        url: "carrot-flower.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "carrot",
        yomi: "carrot",
        url: "carrot.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カーソン家のバンカー",
        yomi: "カーソン家のバンカー",
        url: "carson-family-bunker.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Carver Timmerman",
        yomi: "Carver Timmerman",
        url: "carver-timmerman.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ケイシー・シュルツ",
        yomi: "ケイシー・シュルツ",
        url: "casey-schulz.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カサンドラ・ホーソーン",
        yomi: "カサンドラ・ホーソーン",
        url: "cassandra-hawthorne.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "cassandra-moore",
        yomi: "cassandra-moore",
        url: "cassandra-moore.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キャシー・ハロウェイ",
        yomi: "キャシー・ハロウェイ",
        url: "cassie-halloway.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "catarax",
        yomi: "catarax",
        url: "catarax.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "キャシー",
        yomi: "キャシー",
        url: "cathy-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キャベンディッシュ",
        yomi: "キャベンディッシュ",
        url: "cavendish.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カマドウマ",
        yomi: "カマドウマ",
        url: "cave_cricket.html",
        category: "未分類",
        appearance: [],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Cavit Klein",
        yomi: "Cavit Klein",
        url: "cavit-klein.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "セドリック",
        yomi: "セドリック",
        url: "cedric.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Census taker",
        yomi: "Census taker",
        url: "census-taker.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "セントラル・マウンテン見張り台",
        yomi: "セントラル・マウンテン見張り台",
        url: "central-mountain-lookout.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "鎖で封じられた農場",
        yomi: "鎖で封じられた農場",
        url: "chained-up-farm.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Chally the moo-moo",
        yomi: "Chally the moo-moo",
        url: "chally-the-moo-moo.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "先見の明ある賢きチャールズ",
        yomi: "先見の明ある賢きチャールズ",
        url: "charles-cult-of-the-mothman.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チャールズビュー円形劇場",
        yomi: "チャールズビュー円形劇場",
        url: "charles-view-amphitheater.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チャールズ・ホワイトナイフ",
        yomi: "チャールズ・ホワイトナイフ",
        url: "charles-whiteknife.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チャールストン議事堂ビル",
        yomi: "チャールストン議事堂ビル",
        url: "charleston-capitol-building.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チャールストン議事堂裁判所",
        yomi: "チャールストン議事堂裁判所",
        url: "charleston-capitol-courthouse.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チャールストン議事堂 車両管理局",
        yomi: "チャールストン議事堂 車両管理局",
        url: "charleston-capitol-dmv.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チャールストン緊急政府",
        yomi: "チャールストン緊急政府",
        url: "charleston-emergency-government.html",
        category: "勢力",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チャールストン消防署",
        yomi: "チャールストン消防署",
        url: "charleston-fire-department.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チャールストン・ヘラルド新聞社ビル",
        yomi: "チャールストン・ヘラルド新聞社ビル",
        url: "charleston-herald-building.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チャールストン埋立地",
        yomi: "チャールストン埋立地",
        url: "charleston-landfill.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チャールストン駅",
        yomi: "チャールストン駅",
        url: "charleston-station.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チャールストン操車場",
        yomi: "チャールストン操車場",
        url: "charleston-trainyard.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チャールストン",
        yomi: "チャールストン",
        url: "charleston.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カロン",
        yomi: "カロン",
        url: "charon.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チェイス・パウエル",
        yomi: "チェイス・パウエル",
        url: "chase-powell.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チェイス・\"ディガー\"・テリア",
        yomi: "チェイス・\"ディガー\"・テリア",
        url: "chase-terrier.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チェックポイント・キャニオン",
        yomi: "チェックポイント・キャニオン",
        url: "checkpoint-canyon.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "陽気な養蜂家",
        yomi: "陽気な養蜂家",
        url: "cheerful-beekeeper.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チーズハウス",
        yomi: "チーズハウス",
        url: "cheese-haus.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ケム・アンド・フープ小屋",
        yomi: "ケム・アンド・フープ小屋",
        url: "chem-and-hoop-shack.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Chem and Hoop Shack",
        yomi: "Chem and Hoop Shack",
        url: "chem-hoop-shack.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シェリーズ",
        yomi: "シェリーズ",
        url: "cherise.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チェストナット・ヒロック・タンク",
        yomi: "チェストナット・ヒロック・タンク",
        url: "chestnut-hillock-reservoir.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チェスウィック",
        yomi: "チェスウィック",
        url: "cheswick.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チェット・ジュニア（チェットの父）",
        yomi: "チェット・ジュニア（チェットの父）",
        url: "chet-jr-mentioned.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チェット・ジュニア",
        yomi: "チェット・ジュニア",
        url: "chet-jr.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チェット",
        yomi: "チェット",
        url: "chet-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チェット",
        yomi: "チェット",
        url: "chet-tv.html",
        category: "人物",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "鶏集めの男",
        yomi: "鶏集めの男",
        url: "chicken-collector.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ニワトリ",
        yomi: "ニワトリ",
        url: "chicken.html",
        category: "クリーチャー",
        appearance: ["Fallout 4","Fallout 76","Fallout TV series"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チーフ・ハンロン",
        yomi: "チーフ・ハンロン",
        url: "chief-hanlon.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "中華人民共和国",
        yomi: "中華人民共和国",
        url: "china.html",
        category: "勢力",
        appearance: ["Fallout 3","Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "中国ステルスアーマー（黒鬼）",
        yomi: "中国ステルスアーマー（黒鬼）",
        url: "chinese-stealth-armor.html",
        category: "アーマー",
        appearance: ["Fallout シリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クロエ・グラス",
        yomi: "クロエ・グラス",
        url: "chloe-glass.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Chloe the Clown",
        yomi: "Chloe the Clown",
        url: "chloe-the-clown.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クリス・ハバーサム",
        yomi: "クリス・ハバーサム",
        url: "chris-haversam.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クリスティーン・ロイス",
        yomi: "クリスティーン・ロイス",
        url: "christine-royce.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クリスティン・マリ",
        yomi: "クリスティン・マリ",
        url: "christyn-mari.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クライスラス・モータース・コーポレーション",
        yomi: "クライスラス・モータース・コーポレーション",
        url: "chryslus-motors-corporation.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "シンディ・ホロウェイ",
        yomi: "シンディ・ホロウェイ",
        url: "cindy-holloway.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サークルG",
        yomi: "サークルG",
        url: "circle-g.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "C.I.T.廃墟",
        yomi: "C.I.T.廃墟",
        url: "cit-ruins.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クレア・フェルドマン",
        yomi: "クレア・フェルドマン",
        url: "claire-feldman.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Claire Hudson",
        yomi: "Claire Hudson",
        url: "claire-hudson.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クランシー邸",
        yomi: "クランシー邸",
        url: "clancy-manor.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クランシー邸宅",
        yomi: "クランシー邸宅",
        url: "clancy-mansion.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Clara Song",
        yomi: "Clara Song",
        url: "clara-song.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "通訳官クラレンス",
        yomi: "通訳官クラレンス",
        url: "clarence-fallout-76.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クラリス",
        yomi: "クラリス",
        url: "clarice.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クラーク",
        yomi: "クラーク",
        url: "clark-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クラークスバーグ射撃クラブ",
        yomi: "クラークスバーグ射撃クラブ",
        url: "clarksburg-shooting-club.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クラークスバーグ",
        yomi: "クラークスバーグ",
        url: "clarksburg.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クラウディア",
        yomi: "クラウディア",
        url: "claudia-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クラウス＆カンパニー",
        yomi: "クラウス＆カンパニー",
        url: "claus-and-co.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "B.O.S.クレリック",
        yomi: "B.O.S.クレリック",
        url: "cleric.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "崖上展望キャビン",
        yomi: "崖上展望キャビン",
        url: "clifftop-vista-cabin.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クリフウォーク・トラック",
        yomi: "クリフウォーク・トラック",
        url: "cliffwalk-track.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クリフウォッチ",
        yomi: "クリフウォッチ",
        url: "cliffwatch.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クローバー",
        yomi: "クローバー",
        url: "clover.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Clyde",
        yomi: "Clyde",
        url: "clyde.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "沿岸警備隊のピア",
        yomi: "沿岸警備隊のピア",
        url: "coast-guard-pier.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "沿岸のコテージ",
        yomi: "沿岸のコテージ",
        url: "coastal-cottage.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "コブルトン農場",
        yomi: "コブルトン農場",
        url: "cobbleton-farm.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Cobby",
        yomi: "Cobby",
        url: "cobby.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "コズワース",
        yomi: "コズワース",
        url: "codsworth.html",
        category: "クリーチャー",
        appearance: ["Fallout 76","Fallout 4","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "コール・カーバー",
        yomi: "コール・カーバー",
        url: "cole-carver.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "コール",
        yomi: "コール",
        url: "cole-fallout-76.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "コリン・モリアティ",
        yomi: "コリン・モリアティ",
        url: "colin-moriarty.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "コリン・パットナム",
        yomi: "コリン・パットナム",
        url: "colin-putnam.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Collector Murmrgh (コレクター・マームル / 没データ)",
        yomi: "Collector Murmrgh (コレクター・マームル / 没データ)",
        url: "collector-murmrgh.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Collectron (コレクトロン)",
        yomi: "Collectron (コレクトロン)",
        url: "collectron.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カレッジスクエア",
        yomi: "カレッジスクエア",
        url: "college-square.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ケリー大佐記念碑",
        yomi: "ケリー大佐記念碑",
        url: "colonel-kelly-monument.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Colonel",
        yomi: "Colonel",
        url: "colonel.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "コンバットゾーン",
        yomi: "コンバットゾーン",
        url: "combat-zone.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "コミンスキー軍曹",
        yomi: "コミンスキー軍曹",
        url: "cominsky.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "コミーカミカゼ",
        yomi: "コミーカミカゼ",
        url: "commie-kazi.html",
        category: "アイテム",
        appearance: ["Fallout 4","Fallout 76"],
        date: "2026-05-01",
        status: "published"
    },
    {
        name: "コミッショナー・カオス",
        yomi: "コミッショナー・カオス",
        url: "commissioner-chaos.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "コンコード市街地へのアクセス（地下水路）",
        yomi: "コンコード市街地へのアクセス（地下水路）",
        url: "concord-civic-access.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "コンコード",
        yomi: "コンコード",
        url: "concord.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "コンスタンティン・チェイス",
        yomi: "コンスタンティン・チェイス",
        url: "constantine-chase.html",
        category: "人物",
        appearance: ["Fallout 76","Fallout 3"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "改装弾薬工場",
        yomi: "改装弾薬工場",
        url: "converted-munitions-factory.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "陽気な歴史家",
        yomi: "陽気な歴史家",
        url: "convivial-historian.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クック・クック",
        yomi: "クック・クック",
        url: "cook-cook.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "コロナドのエルダー",
        yomi: "コロナドのエルダー",
        url: "coronado-elder.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "コロナドのナイト",
        yomi: "コロナドのナイト",
        url: "coronado-knight.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "コルベガ組立工場",
        yomi: "コルベガ組立工場",
        url: "corvega-assembly-plant.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "コズミック・ナイフ",
        yomi: "コズミック・ナイフ",
        url: "cosmic-knife.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "カウンティー・クロッシング",
        yomi: "カウンティー・クロッシング",
        url: "county-crossing.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "コートニー・ケリー",
        yomi: "コートニー・ケリー",
        url: "courtney-kelly.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "コベナント",
        yomi: "コベナント",
        url: "covenant.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "屋根付き橋",
        yomi: "屋根付き橋",
        url: "covered-bridge.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カウスポット乳製品製造所",
        yomi: "カウスポット乳製品製造所",
        url: "cow-spots-creamery.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カウスポット乳製品製造所",
        yomi: "カウスポット乳製品製造所",
        url: "cowspot-dairy.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "クレイグ・ブーン",
        yomi: "クレイグ・ブーン",
        url: "craig-boone.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クランベリー湿原",
        yomi: "クランベリー湿原",
        url: "cranberry-bog.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クランベリー・グレイド",
        yomi: "クランベリー・グレイド",
        url: "cranberry-glade.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クランベリー・ハイツ",
        yomi: "クランベリー・ハイツ",
        url: "cranberry-heights.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クランベリー島の沼地",
        yomi: "クランベリー島の沼地",
        url: "cranberry-island-bog.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4 (Far Harbor)"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Crane",
        yomi: "Crane",
        url: "crane-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クレーン",
        yomi: "クレーン",
        url: "crane.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "墜落した複葉機（グラニンジャー農場）",
        yomi: "墜落した複葉機（グラニンジャー農場）",
        url: "crashed-biplane-graninger.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "墜落した飛行機",
        yomi: "墜落した飛行機",
        url: "crashed-plane-mire.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クレーター・オブ・アトム",
        yomi: "クレーター・オブ・アトム",
        url: "crater-of-atom.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クレーター前哨基地",
        yomi: "クレーター前哨基地",
        url: "crater-outpost.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クレーター監視所",
        yomi: "クレーター監視所",
        url: "crater-watchstation.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クリード",
        yomi: "クリード",
        url: "creed.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クリークサイド・サンデュー叢",
        yomi: "クリークサイド・サンデュー叢",
        url: "creekside-sundew-grove.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クレバス・ダム",
        yomi: "クレバス・ダム",
        url: "crevasse-dam.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クリムゾン・プロスペクト",
        yomi: "クリムゾン・プロスペクト",
        url: "crimson-prospect.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "批評家",
        yomi: "批評家",
        url: "critic.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クロスロード",
        yomi: "クロスロード",
        url: "crossroad.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クループ家の館",
        yomi: "クループ家の館",
        url: "croup-manor.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Crowley",
        yomi: "Crowley",
        url: "crowley-fallout-76.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クルセイダーピストル",
        yomi: "クルセイダーピストル",
        url: "crusader-pistol.html",
        category: "武器",
        appearance: ["Fallout 76","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "クラッチリー",
        yomi: "クラッチリー",
        url: "crutchley.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クリプトス",
        yomi: "クリプトス",
        url: "cryptos.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "教団のトーテム",
        yomi: "教団のトーテム",
        url: "cultist-totem.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カニンガム",
        yomi: "カニンガム",
        url: "cunningham-fallout-76.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キュリー",
        yomi: "キュリー",
        url: "curie.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カトラー・ベンド",
        yomi: "カトラー・ベンド",
        url: "cutler-bend.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カットスロート",
        yomi: "カットスロート",
        url: "cutthroats.html",
        category: "勢力",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シンノック",
        yomi: "シンノック",
        url: "cynnoc.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シンシア",
        yomi: "シンシア",
        url: "cynthia.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "D.B.テクニカルハイスクール",
        yomi: "D.B.テクニカルハイスクール",
        url: "d-b-technical-high-school.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ダブニー農家",
        yomi: "ダブニー農家",
        url: "dabney-homestead.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Dagger",
        yomi: "Dagger",
        url: "dagger.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ダガーズ・デン",
        yomi: "ダガーズ・デン",
        url: "daggers-den.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Dagger&#39;s lieutenant",
        yomi: "Dagger&#39;s lieutenant",
        url: "daggers-lieutenant.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "デイリー・オプス",
        yomi: "デイリー・オプス",
        url: "daily-ops.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Dr. ダラ",
        yomi: "Dr. ダラ",
        url: "dala.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ダルトン・ファーム",
        yomi: "ダルトン・ファーム",
        url: "dalton-farm.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4 (Far Harbor)"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ダン",
        yomi: "ダン",
        url: "dan-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "デイン",
        yomi: "デイン",
        url: "dane-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "デイン",
        yomi: "デイン",
        url: "dane-tv.html",
        category: "人物",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ダニエル",
        yomi: "ダニエル",
        url: "daniel-honest-hearts.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ダニエル・ホーンライト",
        yomi: "ダニエル・ホーンライト",
        url: "daniel-hornwright.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Knight Shin",
        yomi: "Knight Shin",
        url: "daniel-shin.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ダニエル",
        yomi: "ダニエル",
        url: "daniel-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ダニーロ",
        yomi: "ダニーロ",
        url: "danilo.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "パラディン・ダンス",
        yomi: "パラディン・ダンス",
        url: "danse.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Daphne",
        yomi: "Daphne",
        url: "daphne.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ダリオン・ジョーンズ少佐",
        yomi: "ダリオン・ジョーンズ少佐",
        url: "darion-jones.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ダーリン・シスターの研究所",
        yomi: "ダーリン・シスターの研究所",
        url: "darling-sister-s-institute.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ダーリング姉妹の研究室",
        yomi: "ダーリング姉妹の研究室",
        url: "darling-sisters-lab.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Darwin the Devil (ダーウィン・ザ・デビル)",
        yomi: "Darwin the Devil (ダーウィン・ザ・デビル)",
        url: "darwin-the-devil.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Dassa Ben-Ami",
        yomi: "Dassa Ben-Ami",
        url: "dassa-ben-ami.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "デイブ大統領",
        yomi: "デイブ大統領",
        url: "dave-fo3.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Dave",
        yomi: "Dave",
        url: "dave-ghoul-within.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Davenport",
        yomi: "Davenport",
        url: "davenport.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "デイヴィー",
        yomi: "デイヴィー",
        url: "davey-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Davey (デイヴィー)",
        yomi: "Davey (デイヴィー)",
        url: "davey-tv.html",
        category: "人物",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "デイヴィー",
        yomi: "デイヴィー",
        url: "davey-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "David Thorpe",
        yomi: "David Thorpe",
        url: "david-thorpe.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "デイビー・テイラー",
        yomi: "デイビー・テイラー",
        url: "davie-taylor.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "D.B.テクニカルハイスクール",
        yomi: "D.B.テクニカルハイスクール",
        url: "db-technical-high-school.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ディーコン",
        yomi: "ディーコン",
        url: "deacon.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ディーン・ドミノ",
        yomi: "ディーン・ドミノ",
        url: "dean-domino.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "デスクロー・アイランド",
        yomi: "デスクロー・アイランド",
        url: "deathclaw-island.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "チE��クロー",
        yomi: "チE��クロー",
        url: "deathclaw.html",
        category: "クリーチャー",
        appearance: ["Fallout","Fallout 2","Fallout 3","Fallout: New Vegas","Fallout 4","Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "デスクロース",
        yomi: "デスクロース",
        url: "deathklaus.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "デコラ",
        yomi: "デコラ",
        url: "decorat.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "deep-sleep-project",
        yomi: "deep-sleep-project",
        url: "deep-sleep-project.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "デル・ローソン",
        yomi: "デル・ローソン",
        url: "del-lawson.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Del Walsh",
        yomi: "Del Walsh",
        url: "del-walsh.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "デラノ・グレンジ",
        yomi: "デラノ・グレンジ",
        url: "delano-grange.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "デルバート・ウィンターズ",
        yomi: "デルバート・ウィンターズ",
        url: "delbert-winters.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "デント＆サンズ建設",
        yomi: "デント＆サンズ建設",
        url: "dent-and-sons-construction.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "歯医者兼理髪師",
        yomi: "歯医者兼理髪師",
        url: "dentist-barber.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "デレク・ガリソン",
        yomi: "デレク・ガリソン",
        url: "derek-garrison.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Derrick Taylor",
        yomi: "Derrick Taylor",
        url: "derrick-taylor.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ダーヴィン",
        yomi: "ダーヴィン",
        url: "dervin.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "荒廃した鉱山",
        yomi: "荒廃した鉱山",
        url: "deserted-mine.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "デズモンド・ロックハート",
        yomi: "デズモンド・ロックハート",
        url: "desmond-lockheart.html",
        category: "人物",
        appearance: ["Fallout 3 (Point Lookout)"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "デビルズ・アレー",
        yomi: "デビルズ・アレー",
        url: "devils-alley.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "デビルズ・バックボーン",
        yomi: "デビルズ・バックボーン",
        url: "devils-backbone.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ダイアモンドシティ",
        yomi: "ダイアモンドシティ",
        url: "diamond-city.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ダイアン・ウェルチ",
        yomi: "ダイアン・ウェルチ",
        url: "diane-welch.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ディロ",
        yomi: "ディロ",
        url: "dillo.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ディンキー・ザ・T-レックス",
        yomi: "ディンキー・ザ・T-レックス",
        url: "dinky-the-t-rex.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ダイノ・ディーライト・モーテル",
        yomi: "ダイノ・ディーライト・モーテル",
        url: "dino-dee-lite-motel.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ダイノ・ピークス・ミニゴルフ",
        yomi: "ダイノ・ピークス・ミニゴルフ",
        url: "dino-peaks-mini-golf.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "飛行船の従者",
        yomi: "飛行船の従者",
        url: "dirigible-squire.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "分岐",
        yomi: "分岐",
        url: "divergence.html",
        category: "設定",
        appearance: ["Fallout シリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "doc-mitchell",
        yomi: "doc-mitchell",
        url: "doc-mitchell.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Doc Stanley",
        yomi: "Doc Stanley",
        url: "doc-stanley.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "dog-and-god",
        yomi: "dog-and-god",
        url: "dog-and-god.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドッグフード缶",
        yomi: "ドッグフード缶",
        url: "dog-food-cans.html",
        category: "アイテム",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "犬",
        yomi: "犬",
        url: "dog.html",
        category: "クリーチャー",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ドッグミート (FO3)",
        yomi: "ドッグミート (FO3)",
        url: "dogmeat-fo3.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドリー・ソッズ・キャンプ場",
        yomi: "ドリー・ソッズ・キャンプ場",
        url: "dolly-sods-campground.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドリー・ソッズ見張り台",
        yomi: "ドリー・ソッズ見張り台",
        url: "dolly-sods-lookout.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドリー・ソッズ・レンジャーステーション",
        yomi: "ドリー・ソッズ・レンジャーステーション",
        url: "dolly-sods-ranger-station.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドリー・ソッズ荒野",
        yomi: "ドリー・ソッズ荒野",
        url: "dolly-sods-wilderness.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドルフィッシュ",
        yomi: "ドルフィッシュ",
        url: "dolphish-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドム・ペドロ",
        yomi: "ドム・ペドロ",
        url: "dom-pedro.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ドン・ペドロの護衛",
        yomi: "ドン・ペドロの護衛",
        url: "dom-pedros-guard.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドンネリー",
        yomi: "ドンネリー",
        url: "donnelley.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドントレル・ヘインズ",
        yomi: "ドントレル・ヘインズ",
        url: "dontrelle-haines.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドーナツショップ",
        yomi: "ドーナツショップ",
        url: "donut-shop.html",
        category: "場所",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ディアス博士",
        yomi: "ディアス博士",
        url: "dorothea-dias.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Dottie",
        yomi: "Dottie",
        url: "dottie-gone-fission.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドッティ",
        yomi: "ドッティ",
        url: "dotty.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ダウ湖流域",
        yomi: "ダウ湖流域",
        url: "dow-lake-watershed.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Dr.ブレインウォッシュ",
        yomi: "Dr.ブレインウォッシュ",
        url: "dr-brainwash.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エディ・ハリソン医師の家",
        yomi: "エディ・ハリソン医師の家",
        url: "dr-eddie-harrisons-house.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Dr. ヘンリー",
        yomi: "Dr. ヘンリー",
        url: "dr-henry.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドクター・ゾルボ",
        yomi: "ドクター・ゾルボ",
        url: "dr-zorbo.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ドライバー・ネフィ",
        yomi: "ドライバー・ネフィ",
        url: "driver-nephi.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドロップサイト C2",
        yomi: "ドロップサイト C2",
        url: "drop-site-c2.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドロップサイト G3",
        yomi: "ドロップサイト G3",
        url: "drop-site-g3.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドロップサイト V9",
        yomi: "ドロップサイト V9",
        url: "drop-site-v9.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドラムリン・ダイナー",
        yomi: "ドラムリン・ダイナー",
        url: "drumlin-diner-watoga.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドラムリン・ダイナー",
        yomi: "ドラムリン・ダイナー",
        url: "drumlin-diner.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドライロックガルチ",
        yomi: "ドライロックガルチ",
        url: "dry-rock-gulch.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ダッチェス",
        yomi: "ダッチェス",
        url: "duchess.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ダンカン＆ダンカン・ロボティクス",
        yomi: "ダンカン＆ダンカン・ロボティクス",
        url: "duncan-duncan-robotics.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Duncan McKann",
        yomi: "Duncan McKann",
        url: "duncan-mckann.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ダンウィッチ・ボーラー",
        yomi: "ダンウィッチ・ボーラー",
        url: "dunwich-borers.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ダスティ・ヒープ",
        yomi: "ダスティ・ヒープ",
        url: "dusty-heap.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ダイアー・ケミカル",
        yomi: "ダイアー・ケミカル",
        url: "dyer-chemical.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ディラン・ローズ",
        yomi: "ディラン・ローズ",
        url: "dylan-rhodes.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Earle Williams",
        yomi: "Earle Williams",
        url: "earle-williams.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "イーストボーストン・プレップスクール",
        yomi: "イーストボーストン・プレップスクール",
        url: "east-boston-preparatory-school.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "東カナワ見張り台",
        yomi: "東カナワ見張り台",
        url: "east-kanawha-lookout.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "イースト・マウンテン見張り台",
        yomi: "イースト・マウンテン見張り台",
        url: "east-mountain-lookout.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "イースト・リッジ見張り台",
        yomi: "イースト・リッジ見張り台",
        url: "east-ridge-lookout.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "イーストストリート銀行",
        yomi: "イーストストリート銀行",
        url: "east-street-bank.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "東部地域刑務所",
        yomi: "東部地域刑務所",
        url: "eastern-regional-penitentiary.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "イージーシティ・ダウンズ",
        yomi: "イージーシティ・ダウンズ",
        url: "easy-city-downs.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エコーレイク・ランバー・ミル",
        yomi: "エコーレイク・ランバー・ミル",
        url: "echo-lake-lumber.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4 (Far Harbor)"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エディ (ED-E)",
        yomi: "エディ (ED-E)",
        url: "ed-e.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Edgar Blackburn",
        yomi: "Edgar Blackburn",
        url: "edgar-blackburn.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "イーディ・スティーブンス",
        yomi: "イーディ・スティーブンス",
        url: "edie-stevens.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エドウィン",
        yomi: "エドウィン",
        url: "edwin.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "イーグレット・ツアー・マリーナ",
        yomi: "イーグレット・ツアー・マリーナ",
        url: "egret-tours-marina.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エイトボール",
        yomi: "エイトボール",
        url: "eightball.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "年配の司会者",
        yomi: "年配の司会者",
        url: "elderly-speaker.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エリヤ (ファザー・エリヤ)",
        yomi: "エリヤ (ファザー・エリヤ)",
        url: "elijah.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Elizabeth Taggerdy",
        yomi: "Elizabeth Taggerdy",
        url: "elizabeth-taggerdy.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エラ・エイムズのバンカー",
        yomi: "エラ・エイムズのバンカー",
        url: "ella-ames-bunker.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Ella Ames",
        yomi: "Ella Ames",
        url: "ella-ames.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Ellen Santiago",
        yomi: "Ellen Santiago",
        url: "ellen-santiago.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エリオット・ティスデイル",
        yomi: "エリオット・ティスデイル",
        url: "elliot-tisdale.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エルマー・グリーン",
        yomi: "エルマー・グリーン",
        url: "elmer-greene.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エルシー・テイラー",
        yomi: "エルシー・テイラー",
        url: "elsie-taylor.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "「彼女とのリンクは切れていないことを知っておくべきだ。ソフィア、君の目を見ると、あの人工知能がそこにいる。私たち全員を見ている。」<br>\r\n                <span style=\"font-size: 0.85em; color: #888;\">— エマーソン・ヘイル（A.T.H.E.N.A.がソフィアの目を通して自分を見ていることを躊躇いながら告げる）</span>",
        yomi: "「彼女とのリンクは切れていないことを知っておくべきだ。ソフィア、君の目を見ると、あの人工知能がそこにいる。私たち全員を見ている。」<br>\r\n                <span style=\"font-size: 0.85em; color: #888;\">— エマーソン・ヘイル（A.T.H.E.N.A.がソフィアの目を通して自分を見ていることを躊躇いながら告げる）</span>",
        url: "emerson-hale.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エミール・デール",
        yomi: "エミール・デール",
        url: "emil-dale.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エメット山廃棄場",
        yomi: "エメット山廃棄場",
        url: "emmett-mountain-disposal-site.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エメット・マウンテン採掘施設",
        yomi: "エメット・マウンテン採掘施設",
        url: "emmett-mountain-mining-facility.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エメット・マウンテン側トンネル",
        yomi: "エメット・マウンテン側トンネル",
        url: "emmett-mountain-side-tunnel.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "EN-06 ガーディアン",
        yomi: "EN-06 ガーディアン",
        url: "en06-guardian.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エンクレイヴの管理者",
        yomi: "エンクレイヴの管理者",
        url: "enclave-administrator.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エンクレイヴ石油リグ",
        yomi: "エンクレイヴ石油リグ",
        url: "enclave-oil-rig.html",
        category: "場所",
        appearance: ["Fallout 2"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エンクレイヴの研究コロニー",
        yomi: "エンクレイヴの研究コロニー",
        url: "enclave-research-colony.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エンクレイヴの科学者",
        yomi: "エンクレイヴの科学者",
        url: "enclave-scientist-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エンクレイヴの警備員",
        yomi: "エンクレイヴの警備員",
        url: "enclave-security-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エンクレイヴ・ベルチバード墜落地点",
        yomi: "エンクレイヴ・ベルチバード墜落地点",
        url: "enclave-vertibird-crash-site.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エンクレイヴ",
        yomi: "エンクレイヴ",
        url: "enclave.html",
        category: "勢力",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "道の終わり",
        yomi: "道の終わり",
        url: "end-of-the-road.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Erika Hewsen",
        yomi: "Erika Hewsen",
        url: "erika-hewsen.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アーニー・ナヴァロ",
        yomi: "アーニー・ナヴァロ",
        url: "ernie-navarro.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Observer Errol",
        yomi: "Observer Errol",
        url: "errol.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Escaped inmate",
        yomi: "Escaped inmate",
        url: "escaped-inmate.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エスメラルダ・ルソー（シェフ・エスメ）",
        yomi: "エスメラルダ・ルソー（シェフ・エスメ）",
        url: "esme-rousseau.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エスポジト",
        yomi: "エスポジト",
        url: "esposito.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エスター・ライト博士",
        yomi: "エスター・ライト博士",
        url: "esther-wright.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "イータ・プサイ・ハウス",
        yomi: "イータ・プサイ・ハウス",
        url: "eta-psi-house.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ユージニー",
        yomi: "ユージニー",
        url: "eugenie.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "eulogy-jones",
        yomi: "eulogy-jones",
        url: "eulogy-jones.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "イヴ・ドゥヴァール",
        yomi: "イヴ・ドゥヴァール",
        url: "eve-devoir.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エクセルシオール・モデルホーム",
        yomi: "エクセルシオール・モデルホーム",
        url: "excelsior-model-home.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "興奮したパーティー客",
        yomi: "興奮したパーティー客",
        url: "excited-partygoer.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エグゼクティヴ・アシスタント",
        yomi: "エグゼクティヴ・アシスタント",
        url: "executive-assistant.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エグゼクティブの部屋",
        yomi: "エグゼクティブの部屋",
        url: "executives-apartment.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "爆発物の祠",
        yomi: "爆発物の祠",
        url: "explosives-shrine.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ファビュラス・ニューベガスの看板",
        yomi: "ファビュラス・ニューベガスの看板",
        url: "fabulous-new-vegas-sign.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フェアライン・ヒル・エステート",
        yomi: "フェアライン・ヒル・エステート",
        url: "fairline-hill-estates.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ファロンデパート",
        yomi: "ファロンデパート",
        url: "fallons-department-store.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "fallout-1",
        yomi: "fallout-1",
        url: "fallout-1.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "fallout-2",
        yomi: "fallout-2",
        url: "fallout-2.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フォールアウト 3",
        yomi: "フォールアウト 3",
        url: "fallout-3.html",
        category: "ゲーム",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ペット",
        yomi: "ペット",
        url: "fallout-76-pets.html",
        category: "システム",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "フォールアウト: ニューベガス",
        yomi: "フォールアウト: ニューベガス",
        url: "fallout-new-vegas.html",
        category: "ゲーム",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フォールアウト タクティクス：ブラザーフッド・オブ・スティール",
        yomi: "フォールアウト タクティクス：ブラザーフッド・オブ・スティール",
        url: "fallout-tactics.html",
        category: "ゲーム",
        appearance: ["Fallout Tactics"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "偽のシーザー",
        yomi: "偽のシーザー",
        url: "false-caesar.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ファニュエル・ホール",
        yomi: "ファニュエル・ホール",
        url: "faneuil-hall.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ファンタスティック",
        yomi: "ファンタスティック",
        url: "fantastic.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ファー・ハーバー",
        yomi: "ファー・ハーバー",
        url: "far-harbor-loc.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "遠くのツリーハウス",
        yomi: "遠くのツリーハウス",
        url: "faraway-treehouse.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Doctor Farha",
        yomi: "Doctor Farha",
        url: "farha.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "農夫",
        yomi: "農夫",
        url: "farmer-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Fasnacht Day",
        yomi: "Fasnacht Day",
        url: "fasnacht-day.html",
        category: "イベント・現象",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "フォークス",
        yomi: "フォークス",
        url: "fawkes.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "連邦廃棄場 HZ-21",
        yomi: "連邦廃棄場 HZ-21",
        url: "federal-disposal-field-hz-21.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "連邦食糧備蓄庫",
        yomi: "連邦食糧備蓄庫",
        url: "federal-ration-stockpile.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "連邦監視センターK-21B",
        yomi: "連邦監視センターK-21B",
        url: "federal-surveillance-center-k-21b.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クレリック・フェリックス",
        yomi: "クレリック・フェリックス",
        url: "felix-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フェリックス聖職者",
        yomi: "フェリックス聖職者",
        url: "felix-tv.html",
        category: "人物",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フェルトン・リード",
        yomi: "フェルトン・リード",
        url: "felton-reed.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "女性の給仕",
        yomi: "女性の給仕",
        url: "female-server.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フェンズ・ストリート下水道",
        yomi: "フェンズ・ストリート下水道",
        url: "fens-street-sewer.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フェラル・グール",
        yomi: "フェラル・グール",
        url: "feral-ghoul-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フィドラーズ・グリーン・トレーラー・エステート",
        yomi: "フィドラーズ・グリーン・トレーラー・エステート",
        url: "fiddlers-green-trailer-estates.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フィリーの巨漢",
        yomi: "フィリーの巨漢",
        url: "filly-huge-man.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フィリーの町民",
        yomi: "フィリーの町民",
        url: "filly-townsperson.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フィリーの商人",
        yomi: "フィリーの商人",
        url: "filly-vendor.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フィンチ・ファーム",
        yomi: "フィンチ・ファーム",
        url: "finch-farm.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ファイアベース・ハンコック",
        yomi: "ファイアベース・ハンコック",
        url: "firebase-hancock.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ファイアベース LT",
        yomi: "ファイアベース LT",
        url: "firebase-lt.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ファイアベース・メジャー",
        yomi: "ファイアベース・メジャー",
        url: "firebase-major.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ファイアベース MG",
        yomi: "ファイアベース MG",
        url: "firebase-mg.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ファイアフライ",
        yomi: "ファイアフライ",
        url: "firefly-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ファースト・フレンズ教会",
        yomi: "ファースト・フレンズ教会",
        url: "first-friends-church.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "魚",
        yomi: "魚",
        url: "fish-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フィッシュボーンズ",
        yomi: "フィッシュボーンズ",
        url: "fishbones.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "釣り人の休息所",
        yomi: "釣り人の休息所",
        url: "fishermans-rest.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フィッシャーサイト・プライム",
        yomi: "フィッシャーサイト・プライム",
        url: "fissure-site-prime.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フィズトップ・マウンテン",
        yomi: "フィズトップ・マウンテン",
        url: "fizztop-mountain.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フラック",
        yomi: "フラック",
        url: "flak.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フレアガン",
        yomi: "フレアガン",
        url: "flare-gun.html",
        category: "武器",
        appearance: ["Fallout 76","Fallout 4"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "フラットウッズ見張り台",
        yomi: "フラットウッズ見張り台",
        url: "flatwoods-lookout.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フラットウッズ集会場",
        yomi: "フラットウッズ集会場",
        url: "flatwoods-meeting-hall.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フラットウッズ・リバー",
        yomi: "フラットウッズ・リバー",
        url: "flatwoods-river.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フラットウッズ",
        yomi: "フラットウッズ",
        url: "flatwoods.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フローレスカ",
        yomi: "フローレスカ",
        url: "flauresca.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フリントロック",
        yomi: "フリントロック",
        url: "flintlock.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フローター",
        yomi: "フローター",
        url: "floater-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "水没した操車場",
        yomi: "水没した操車場",
        url: "flooded-trainyard.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハエ",
        yomi: "ハエ",
        url: "fly-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フォグ・クロウラー",
        yomi: "フォグ・クロウラー",
        url: "fog-crawler-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フォローズ・チョーク",
        yomi: "フォローズ・チョーク",
        url: "follows-chalk.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フーズボールゲーム",
        yomi: "フーズボールゲーム",
        url: "foosball-game.html",
        category: "アイテム",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "強制進化ウイルス（FEV）",
        yomi: "強制進化ウイルス（FEV）",
        url: "forced-evolution-virus-fev.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout 3","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Ford",
        yomi: "Ford",
        url: "ford.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フォレスト・グルーブ・マーシュ",
        yomi: "フォレスト・グルーブ・マーシュ",
        url: "forest-grove-marsh.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Former raider",
        yomi: "Former raider",
        url: "former-raider.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フォート・ディファイアンス",
        yomi: "フォート・ディファイアンス",
        url: "fort-defiance.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヘーゲン砦",
        yomi: "ヘーゲン砦",
        url: "fort-hagen.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フォート・スチューベン",
        yomi: "フォート・スチューベン",
        url: "fort-steuben.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ストロング砦",
        yomi: "ストロング砦",
        url: "fort-strong.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "前進基地アルファ",
        yomi: "前進基地アルファ",
        url: "forward-station-alpha.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "前進基地デルタ",
        yomi: "前進基地デルタ",
        url: "forward-station-delta.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "前進基地タンゴ",
        yomi: "前進基地タンゴ",
        url: "forward-station-tango.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ファウンデーション前哨基地",
        yomi: "ファウンデーション前哨基地",
        url: "foundation-outpost.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ファウンデーション補給室",
        yomi: "ファウンデーション補給室",
        url: "foundation-supply-room.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ファウンダーズ・ホール",
        yomi: "ファウンダーズ・ホール",
        url: "founders-hall.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フォー・リーフ・プラント（水産加工所）",
        yomi: "フォー・リーフ・プラント（水産加工所）",
        url: "four-leaf-fishpacking-plant.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キツネ",
        yomi: "キツネ",
        url: "fox-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フランチェスカ・マハジャン",
        yomi: "フランチェスカ・マハジャン",
        url: "francesca-mahajan.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "肉屋のフランク",
        yomi: "肉屋のフランク",
        url: "frank-the-butcher.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フランク",
        yomi: "フランク",
        url: "frank-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フランキー・ベケット",
        yomi: "フランキー・ベケット",
        url: "frankie-beckett.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "フランクの娘",
        yomi: "フランクの娘",
        url: "franks-daughter.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フラターナルポスト115",
        yomi: "フラターナルポスト115",
        url: "fraternal-post-115.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フラタニティ・ロウ",
        yomi: "フラタニティ・ロウ",
        url: "fraternity-row.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Sergeant Fred Radcliff",
        yomi: "Sergeant Fred Radcliff",
        url: "fred-radcliff.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フレディ・ラング",
        yomi: "フレディ・ラング",
        url: "freddie-lang.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フレディ・フィアーの地下室",
        yomi: "フレディ・フィアーの地下室",
        url: "freddy-fears-basement.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フレディ・フィアーのお化け屋敷",
        yomi: "フレディ・フィアーのお化け屋敷",
        url: "freddy-fears-house-of-scares.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フレデリック・リバーズ",
        yomi: "フレデリック・リバーズ",
        url: "frederick-rivers.html",
        category: "キャラクター",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フレデリック・シンクレア",
        yomi: "フレデリック・シンクレア",
        url: "frederick-sinclair-tv.html",
        category: "人物",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フレデリック・シンクレア",
        yomi: "フレデリック・シンクレア",
        url: "frederick-sinclair.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フリーラジカルズ",
        yomi: "フリーラジカルズ",
        url: "free-radicals.html",
        category: "勢力",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Free States vendor",
        yomi: "Free States vendor",
        url: "free-states-vendor.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "解放されたグール",
        yomi: "解放されたグール",
        url: "freed-ghoul-tv.html",
        category: "人物",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フリーサイドの子供のハスラー",
        yomi: "フリーサイドの子供のハスラー",
        url: "freeside-child-hustler.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フリーサイドの子供のリーダー",
        yomi: "フリーサイドの子供のリーダー",
        url: "freeside-child-in-charge.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "薬を売るフリーサイドの子供",
        yomi: "薬を売るフリーサイドの子供",
        url: "freeside-child-selling-drugs.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フリーサイドのクルーピエ",
        yomi: "フリーサイドのクルーピエ",
        url: "freeside-croupier.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フリーサイドの客",
        yomi: "フリーサイドの客",
        url: "freeside-customer.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フリーサイドのギャンブラー",
        yomi: "フリーサイドのギャンブラー",
        url: "freeside-gambler.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フリーサイドのショーガール",
        yomi: "フリーサイドのショーガール",
        url: "freeside-showgirl.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フリーサイドの住人",
        yomi: "フリーサイドの住人",
        url: "freesider.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フレッシュ・ソイル・レストラン",
        yomi: "フレッシュ・ソイル・レストラン",
        url: "fresh-soil-restaurant.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フレイヤのレストラン",
        yomi: "フレイヤのレストラン",
        url: "freyjas-haus.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Frida Madani",
        yomi: "Frida Madani",
        url: "frida-madani.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フリードリヒ",
        yomi: "フリードリヒ",
        url: "friedrich.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フレンドリー",
        yomi: "フレンドリー",
        url: "friendly.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フリッツ",
        yomi: "フリッツ",
        url: "fritz.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カエル",
        yomi: "カエル",
        url: "frog-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "前線基地タンゴ",
        yomi: "前線基地タンゴ",
        url: "front-line-tango.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "フジニヤ諜報基地",
        yomi: "フジニヤ諜報基地",
        url: "fujiniya-intelligence-base.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "future-tec",
        yomi: "future-tec",
        url: "future-tec.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "G.O.A.T.",
        yomi: "G.O.A.T.",
        url: "g-o-a-t.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout 3"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "G・ウォルトン",
        yomi: "G・ウォルトン",
        url: "g-walton.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ポーター・ゲイジ",
        yomi: "ポーター・ゲイジ",
        url: "gage.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ゲイル",
        yomi: "ゲイル",
        url: "gail.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ギャラクティックゾーン",
        yomi: "ギャラクティックゾーン",
        url: "galactic-zone.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ギャラクシー・ニュースのアナウンサー",
        yomi: "ギャラクシー・ニュースのアナウンサー",
        url: "galaxy-news-announcer.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ゲーム・オブ・スローンズ",
        yomi: "ゲーム・オブ・スローンズ",
        url: "game-of-thrones.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ガンマ線銃",
        yomi: "ガンマ線銃",
        url: "gamma-ray-gun.html",
        category: "武器",
        appearance: ["Fallout 76","Fallout 4"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "庭師の小屋",
        yomi: "庭師の小屋",
        url: "gardeners-shack.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ガラハン邸",
        yomi: "ガラハン邸",
        url: "garrahan-estate.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ギャラハン・マイニング本社",
        yomi: "ギャラハン・マイニング本社",
        url: "garrahan-mining-headquarters.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ガラハン・マイニング本社",
        yomi: "ガラハン・マイニング本社",
        url: "garrahan-mining-hq.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ギャリー・ウィルキンス",
        yomi: "ギャリー・ウィルキンス",
        url: "garry-wilkins.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "プレストン・ガービー",
        yomi: "プレストン・ガービー",
        url: "garvey.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ゲイリー",
        yomi: "ゲイリー",
        url: "gary-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ゲイリー・ウェバー",
        yomi: "ゲイリー・ウェバー",
        url: "gary-weber.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ゲイリー",
        yomi: "ゲイリー",
        url: "gary.html",
        category: "人物",
        appearance: ["Fallout 3","Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ゲートの警備員",
        yomi: "ゲートの警備員",
        url: "gate-guard.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ガウスピストル",
        yomi: "ガウスピストル",
        url: "gauss-pistol.html",
        category: "武器",
        appearance: ["Fallout 76","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "geck",
        yomi: "geck",
        url: "geck.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ゼネラル・アトミックス工場",
        yomi: "ゼネラル・アトミックス工場",
        url: "general-atomics-factory.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ゼネラル・アトミックス・ガレリア",
        yomi: "ゼネラル・アトミックス・ガレリア",
        url: "general-atomics-galleria.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジョージ・パットナム",
        yomi: "ジョージ・パットナム",
        url: "george-putnam.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジョージ・ヤッファ",
        yomi: "ジョージ・ヤッファ",
        url: "george-yaffe.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グール",
        yomi: "グール",
        url: "ghoul.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ジャイアントラット",
        yomi: "ジャイアントラット",
        url: "giant-rat.html",
        category: "クリーチャー",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ジャイアントティーポット",
        yomi: "ジャイアントティーポット",
        url: "giant-teapot.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ギース・ベリー・ボグ",
        yomi: "ギース・ベリー・ボグ",
        url: "giese-berry-bog.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Gilbert Hopson",
        yomi: "Gilbert Hopson",
        url: "gilbert-hopson.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジャイルズ・スウィートウォーター",
        yomi: "ジャイルズ・スウィートウォーター",
        url: "giles-sweetwater.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ギルマン製材所",
        yomi: "ギルマン製材所",
        url: "gilman-lumber-mill.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジーナ・ベイリー",
        yomi: "ジーナ・ベイリー",
        url: "gina-bailey.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グランピングサイト",
        yomi: "グランピングサイト",
        url: "glamping-site.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ガラス化した洞窟",
        yomi: "ガラス化した洞窟",
        url: "glassed-cavern.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グリーミング・デプス",
        yomi: "グリーミング・デプス",
        url: "gleaming-depths.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ご機嫌な肉屋",
        yomi: "ご機嫌な肉屋",
        url: "gleeful-butcher.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グレン",
        yomi: "グレン",
        url: "glenn.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グロリア・チャンス",
        yomi: "グロリア・チャンス",
        url: "gloria-chance.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グロリア・ヴァン・グラフ",
        yomi: "グロリア・ヴァン・グラフ",
        url: "gloria-van-graff.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "glowing-fungus",
        yomi: "glowing-fungus",
        url: "glowing-fungus.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "輝きの海",
        yomi: "輝きの海",
        url: "glowing-sea.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ナールド・シャローズ",
        yomi: "ナールド・シャローズ",
        url: "gnarled-shallows.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Gnash",
        yomi: "Gnash",
        url: "gnash.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ナイト・グナティウス",
        yomi: "ナイト・グナティウス",
        url: "gnatius.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ノームの菜園",
        yomi: "ノームの菜園",
        url: "gnomes-allotment.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ゴブ",
        yomi: "ゴブ",
        url: "gob.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ゴールデングローブ・ポルノ",
        yomi: "ゴールデングローブ・ポルノ",
        url: "golden-globes-porn.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ゴルフカート",
        yomi: "ゴルフカート",
        url: "golf-cart.html",
        category: "車両",
        appearance: ["Fallout シリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グッドネイバー",
        yomi: "グッドネイバー",
        url: "goodneighbor.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ゴーリー鉱山",
        yomi: "ゴーリー鉱山",
        url: "gorey-mines.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ゴージ・ジャンクヤード",
        yomi: "ゴージ・ジャンクヤード",
        url: "gorge-junkyard.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ゴルスキーの小屋",
        yomi: "ゴルスキーの小屋",
        url: "gorski-cabin.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グルマンズ",
        yomi: "グルマンズ",
        url: "gourmands.html",
        category: "勢力",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グラフトン・ダム",
        yomi: "グラフトン・ダム",
        url: "grafton-dam.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グラフトン高校",
        yomi: "グラフトン高校",
        url: "grafton-high-school.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グラフトン湖",
        yomi: "グラフトン湖",
        url: "grafton-lake.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グラフトン市長",
        yomi: "グラフトン市長",
        url: "grafton-mayor.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グラフトン・モンスター",
        yomi: "グラフトン・モンスター",
        url: "grafton-monster.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グラフトン質店",
        yomi: "グラフトン質店",
        url: "grafton-pawn-shop.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グラフトン警察署",
        yomi: "グラフトン警察署",
        url: "grafton-police-department.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グラフトン駅",
        yomi: "グラフトン駅",
        url: "grafton-station.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グラフトン製鉄地下",
        yomi: "グラフトン製鉄地下",
        url: "grafton-steel-underground.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グラフトン製鉄ヤード",
        yomi: "グラフトン製鉄ヤード",
        url: "grafton-steel-yard.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グラフトン製鉄所",
        yomi: "グラフトン製鉄所",
        url: "grafton-steel.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グラフトン",
        yomi: "グラフトン",
        url: "grafton.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Grahm's Meat-Cook(ミート ウィーク)",
        yomi: "Grahm's Meat-Cook(ミート ウィーク)",
        url: "grahm-s-meat-cook-meat-week.html",
        category: "イベント・現象",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Grahm",
        yomi: "Grahm",
        url: "grahm.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グラム",
        yomi: "グラム",
        url: "grams.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "グランドキャニオンのエルダー",
        yomi: "グランドキャニオンのエルダー",
        url: "grand-canyon-elder.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グランチェスター・ミステリー・マンション",
        yomi: "グランチェスター・ミステリー・マンション",
        url: "grandchester-mystery-mansion.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Grandma Junko",
        yomi: "Grandma Junko",
        url: "grandma-junko.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グラニンジャー農場",
        yomi: "グラニンジャー農場",
        url: "graninger-farm.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グラント・マクナマラ",
        yomi: "グラント・マクナマラ",
        url: "grant-mcnamara.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グレイガーデン",
        yomi: "グレイガーデン",
        url: "graygarden.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マサチューセッツ血液クリニック",
        yomi: "マサチューセッツ血液クリニック",
        url: "greater-mass-blood-clinic.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グリーン・カントリー橋",
        yomi: "グリーン・カントリー橋",
        url: "green-country-bridge.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グリーンカントリー・ロッジ",
        yomi: "グリーンカントリー・ロッジ",
        url: "green-country-lodge.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "グリーンテック・ジェネティクス",
        yomi: "グリーンテック・ジェネティクス",
        url: "greenetech-genetics.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グリーントップ菜園",
        yomi: "グリーントップ菜園",
        url: "greentop-nursery.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グレッグ・ゴールドスタイン",
        yomi: "グレッグ・ゴールドスタイン",
        url: "greg-goldstein.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Gregory Dixon",
        yomi: "Gregory Dixon",
        url: "gregory-dixon.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Gregory Timmerman",
        yomi: "Gregory Timmerman",
        url: "gregory-timmerman.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グレゴリー",
        yomi: "グレゴリー",
        url: "gregory-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グレッグの鉱山用品店",
        yomi: "グレッグの鉱山用品店",
        url: "gregs-mine-supply.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グレロック",
        yomi: "グレロック",
        url: "grelock.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout 4","Fallout 3"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "グリフィス天文台",
        yomi: "グリフィス天文台",
        url: "griffith-observatory.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グログナック",
        yomi: "グログナック",
        url: "grognac.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "グローブス家のキャビン",
        yomi: "グローブス家のキャビン",
        url: "groves-family-cabin.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ガルパー",
        yomi: "ガルパー",
        url: "gulper-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ガルパー・ラグーン",
        yomi: "ガルパー・ラグーン",
        url: "gulper-lagoon.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ガンナープラザ",
        yomi: "ガンナープラザ",
        url: "gunners-plaza.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ガンサー・ジェンキンス",
        yomi: "ガンサー・ジェンキンス",
        url: "gunther-jenkins.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Guy",
        yomi: "Guy",
        url: "guy-ghoul-within.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グウィネット醸造所",
        yomi: "グウィネット醸造所",
        url: "gwinnett-brewery.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジャイロ",
        yomi: "ジャイロ",
        url: "gyro.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "H&H Tools Company",
        yomi: "H&H Tools Company",
        url: "h-h-tools-company.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout 4","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Hailey Takano",
        yomi: "Hailey Takano",
        url: "hailey-takano.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハル・グリーソン",
        yomi: "ハル・グリーソン",
        url: "hal-gleeson.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハロウィン恐怖農場",
        yomi: "ハロウィン恐怖農場",
        url: "halloween-fright-farm.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハロウィンホラー集落",
        yomi: "ハロウィンホラー集落",
        url: "halloween-horror-hamlet.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハルシジェン社",
        yomi: "ハルシジェン社",
        url: "hallucigen-inc.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハムリー・ラン・キャンプ",
        yomi: "ハムリー・ラン・キャンプ",
        url: "hamley-run-camp.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジョン・ハンコック",
        yomi: "ジョン・ハンコック",
        url: "hancock.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハングマンズ・アリー（絞首刑の裏路地）",
        yomi: "ハングマンズ・アリー（絞首刑の裏路地）",
        url: "hangmans-alley.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハンク・マクレーン",
        yomi: "ハンク・マクレーン",
        url: "hank-maclean.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハンク・マディガン",
        yomi: "ハンク・マディガン",
        url: "hank-madigan.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "hanlon",
        yomi: "hanlon",
        url: "hanlon.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Hannah de Silva",
        yomi: "Hannah de Silva",
        url: "hannah-de-silva.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハンナ",
        yomi: "ハンナ",
        url: "hannah-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハッピー・キャンドルメーカー",
        yomi: "ハッピー・キャンドルメーカー",
        url: "happy-candlemaker.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハードボール",
        yomi: "ハードボール",
        url: "hardball.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハードウェア・タウン",
        yomi: "ハードウェア・タウン",
        url: "hardware-town.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "harold",
        yomi: "harold",
        url: "harold.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハーパーズ・フェリー兵器庫",
        yomi: "ハーパーズ・フェリー兵器庫",
        url: "harpers-ferry-armory.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハーパーズ・フェリー・クリニック",
        yomi: "ハーパーズ・フェリー・クリニック",
        url: "harpers-ferry-clinic.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハーパーズ・フェリー操車場",
        yomi: "ハーパーズ・フェリー操車場",
        url: "harpers-ferry-trainyard.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハーパーズ・フェリー",
        yomi: "ハーパーズ・フェリー",
        url: "harpers-ferry.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハリソン・ハイツ",
        yomi: "ハリソン・ハイツ",
        url: "harrison-heights.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハーベイ・ティンリー",
        yomi: "ハーベイ・ティンリー",
        url: "harvey-tinley.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヘイブン教会",
        yomi: "ヘイブン教会",
        url: "haven-church.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホークの隠れ家",
        yomi: "ホークの隠れ家",
        url: "hawkes-refuge.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーソーン・メディカル・ラボラトリーズ",
        yomi: "ホーソーン・メディカル・ラボラトリーズ",
        url: "hawthorne-medical-laboratories.html",
        category: "場所",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "国際連合本部",
        yomi: "国際連合本部",
        url: "headquarters-of-the-united-nations.html",
        category: "場所",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Heather Ellis",
        yomi: "Heather Ellis",
        url: "heather-ellis.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヘレナ・ブルム",
        yomi: "ヘレナ・ブルム",
        url: "helena-blum.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヘレナ",
        yomi: "ヘレナ",
        url: "helena-fallout-76.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヘルヴェティア",
        yomi: "ヘルヴェティア",
        url: "helvetia.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ヘムロック・ホールズ整備場",
        yomi: "ヘムロック・ホールズ整備場",
        url: "hemlock-holes-maintenance.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヘムロック・ホールズ",
        yomi: "ヘムロック・ホールズ",
        url: "hemlock-holes.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヘンリック",
        yomi: "ヘンリック",
        url: "henrick.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "henry",
        yomi: "henry",
        url: "henry.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハーバート・ダッシュウッド",
        yomi: "ハーバート・ダッシュウッド",
        url: "herbert-dashwood.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハーミット・クラブ",
        yomi: "ハーミット・クラブ",
        url: "hermit-crab-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハーシェル・クライン",
        yomi: "ハーシェル・クライン",
        url: "herschel-klein.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヘスター・ロボティクス",
        yomi: "ヘスター・ロボティクス",
        url: "hesters-consumer-robotics.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヘックス",
        yomi: "ヘックス",
        url: "hex-expeditions-the-pitt.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヒッゲンボトム",
        yomi: "ヒッゲンボトム",
        url: "higgenbottom.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハイランド・マーシュ",
        yomi: "ハイランド・マーシュ",
        url: "highland-marsh.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハイウェイ・タウン",
        yomi: "ハイウェイ・タウン",
        url: "highway-town.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Hijack",
        yomi: "Hijack",
        url: "hijack.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヒルフォーク・ホットドッグ",
        yomi: "ヒルフォーク・ホットドッグ",
        url: "hillfolk-hotdogs.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヒルサイド・ケイバーン",
        yomi: "ヒルサイド・ケイバーン",
        url: "hillside-cavern.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "丘上パイロンキャンプ",
        yomi: "丘上パイロンキャンプ",
        url: "hilltop-pylon-camp.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホッキング・ヒルズ州立公園",
        yomi: "ホッキング・ヒルズ州立公園",
        url: "hocking-hills-state-park.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホッキング・ヒルズ・ステーション",
        yomi: "ホッキング・ヒルズ・ステーション",
        url: "hocking-hills-station.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホールディングフォード農家",
        yomi: "ホールディングフォード農家",
        url: "holdingford-homestead.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハリウッド大通り",
        yomi: "ハリウッド大通り",
        url: "hollywood-boulevard.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハリウッド・フォーエバーの集会の参加者",
        yomi: "ハリウッド・フォーエバーの集会の参加者",
        url: "hollywood-forever-meeting-attendee.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハリウッド・ヒルズ",
        yomi: "ハリウッド・ヒルズ",
        url: "hollywood-hills.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハリウッドサイン",
        yomi: "ハリウッドサイン",
        url: "hollywood-sign.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハリウッド・ウォーク・オブ・フェーム",
        yomi: "ハリウッド・ウォーク・オブ・フェーム",
        url: "hollywood-walk-of-fame.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホロテープ",
        yomi: "ホロテープ",
        url: "holotape.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ホルスタイン軍曹",
        yomi: "ホルスタイン軍曹",
        url: "holstein.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホームプレート",
        yomi: "ホームプレート",
        url: "home-plate.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーマー・サパースタイン",
        yomi: "ホーマー・サパースタイン",
        url: "homer-saperstein.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ホンチョー",
        yomi: "ホンチョー",
        url: "honcho.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハニービースト",
        yomi: "ハニービースト",
        url: "honey-beast-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハニーハウス",
        yomi: "ハニーハウス",
        url: "honey-haus.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハニーウェル養蜂場",
        yomi: "ハニーウェル養蜂場",
        url: "honey-well-apiary.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホップの墓",
        yomi: "ホップの墓",
        url: "hop-graves.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Hopewell Cave",
        yomi: "Hopewell Cave",
        url: "hopewell-cave.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "horace-pinkerton",
        yomi: "horace-pinkerton",
        url: "horace-pinkerton.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホライズンズ・レスト",
        yomi: "ホライズンズ・レスト",
        url: "horizons-rest.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーンライト空気清浄機サイト 01",
        yomi: "ホーンライト空気清浄機サイト 01",
        url: "hornwright-air-purifier-01.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーンライト空気清浄機サイト 02",
        yomi: "ホーンライト空気清浄機サイト 02",
        url: "hornwright-air-purifier-02.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーンライト空気清浄機サイト 03",
        yomi: "ホーンライト空気清浄機サイト 03",
        url: "hornwright-air-purifier-03.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーンライト空気清浄機サイト 04",
        yomi: "ホーンライト空気清浄機サイト 04",
        url: "hornwright-air-purifier-04.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーンライト空気清浄機設置場 #01",
        yomi: "ホーンライト空気清浄機設置場 #01",
        url: "hornwright-air-purifier-site-01.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーンライト空気清浄機設置場 #02",
        yomi: "ホーンライト空気清浄機設置場 #02",
        url: "hornwright-air-purifier-site-02.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーンライト空気清浄機設置場 #03",
        yomi: "ホーンライト空気清浄機設置場 #03",
        url: "hornwright-air-purifier-site-03.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーンライト空気清浄機設置場 #04",
        yomi: "ホーンライト空気清浄機設置場 #04",
        url: "hornwright-air-purifier-site-04.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーンライト邸",
        yomi: "ホーンライト邸",
        url: "hornwright-estate.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーンライト・インダストリアル本社",
        yomi: "ホーンライト・インダストリアル本社",
        url: "hornwright-industrial-headquarters.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーンライト・インダストリアル本社",
        yomi: "ホーンライト・インダストリアル本社",
        url: "hornwright-industrial-hq.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーンライト家の別荘",
        yomi: "ホーンライト家の別荘",
        url: "hornwright-summer-villa.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーンライト・テストサイト 2",
        yomi: "ホーンライト・テストサイト 2",
        url: "hornwright-testing-2.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーンライト・テストサイト 3",
        yomi: "ホーンライト・テストサイト 3",
        url: "hornwright-testing-3.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーンライト・テストサイト 4",
        yomi: "ホーンライト・テストサイト 4",
        url: "hornwright-testing-4.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーンライト試験サイト #03",
        yomi: "ホーンライト試験サイト #03",
        url: "hornwright-testing-site-03.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーンライト試験場 #02",
        yomi: "ホーンライト試験場 #02",
        url: "hornwright-testing-site-2.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホーンライト試験場 #03",
        yomi: "ホーンライト試験場 #03",
        url: "hornwright-testing-site-3.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハウス・リゾート",
        yomi: "ハウス・リゾート",
        url: "house-resort.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハワード邸",
        yomi: "ハワード邸",
        url: "howard-residence.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハブ360",
        yomi: "ハブ360",
        url: "hub-360.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハブシティ・オートウォレッカーズ",
        yomi: "ハブシティ・オートウォレッカーズ",
        url: "hub-city-auto-wreckers.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヒューブリス・コミックス＆トイズ",
        yomi: "ヒューブリス・コミックス＆トイズ",
        url: "hubris-comics-watoga.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハブリス・コミック",
        yomi: "ハブリス・コミック",
        url: "hubris-comics.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヒューイ",
        yomi: "ヒューイ",
        url: "huey.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハンター・リッジ",
        yomi: "ハンター・リッジ",
        url: "hunter-ridge.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ハンターズ・リッジ",
        yomi: "ハンターズ・リッジ",
        url: "hunters-ridge.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハンターの小屋",
        yomi: "ハンターの小屋",
        url: "hunters-shack.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハンターズヴィル",
        yomi: "ハンターズヴィル",
        url: "huntersville.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Huntmaster",
        yomi: "Huntmaster",
        url: "huntmaster.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハンツマンズ・グレイド",
        yomi: "ハンツマンズ・グレイド",
        url: "huntsmans-glade.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハイドパーク",
        yomi: "ハイドパーク",
        url: "hyde-park.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "イアン・ジャクソン",
        yomi: "イアン・ジャクソン",
        url: "ian-jackson.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Ian Orwell",
        yomi: "Ian Orwell",
        url: "ian-orwell.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "イグアナ",
        yomi: "イグアナ",
        url: "iguana-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Ineke de Haan",
        yomi: "Ineke de Haan",
        url: "ineke-de-haan.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "イングラム邸",
        yomi: "イングラム邸",
        url: "ingram-mansion.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "インサルトボット",
        yomi: "インサルトボット",
        url: "insult-bot.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Invaders from Beyond",
        yomi: "Invaders from Beyond",
        url: "invaders-from-beyond.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "調査官のキャビン",
        yomi: "調査官のキャビン",
        url: "investigators-cabin.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アイリッシュプライド工業造船所",
        yomi: "アイリッシュプライド工業造船所",
        url: "irish-pride-industries-shipyard.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アーヴ",
        yomi: "アーヴ",
        url: "irv.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アイザック・ハモンド",
        yomi: "アイザック・ハモンド",
        url: "isaac-hammond.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "イセラ・メジア",
        yomi: "イセラ・メジア",
        url: "isela-mejia.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロード・アッシャー",
        yomi: "ロード・アッシャー",
        url: "ishmael-ashur.html",
        category: "人物",
        appearance: ["Fallout 3 (The Pitt)"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "孤立したキャビン",
        yomi: "孤立したキャビン",
        url: "isolated-cabin.html",
        category: "場所",
        appearance: ["Fallout 76","Fallout 3"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "J・シュラムの家",
        yomi: "J・シュラムの家",
        url: "j-schrams-house.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジャック・オ・ランタン",
        yomi: "ジャック・オ・ランタン",
        url: "jack-o-lantern.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジャック・ウッドハウス",
        yomi: "ジャック・ウッドハウス",
        url: "jack-woodhouse.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジャクソン・ジャンクヤード",
        yomi: "ジャクソン・ジャンクヤード",
        url: "jackson-junkyard.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジャッキー",
        yomi: "ジャッキー",
        url: "jacky-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジェイコブ・ラーナー",
        yomi: "ジェイコブ・ラーナー",
        url: "jacob-lerner.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジャクリーン・マーフィー",
        yomi: "ジャクリーン・マーフィー",
        url: "jacqueline-murphy.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スカウトリーダー・ジャギー",
        yomi: "スカウトリーダー・ジャギー",
        url: "jaggy.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジャギーズ・クラッグ",
        yomi: "ジャギーズ・クラッグ",
        url: "jaggys-crag.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドクター・ジェイン",
        yomi: "ドクター・ジェイン",
        url: "jain-steel-reign.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジャルバートブラザーズ廃棄場",
        yomi: "ジャルバートブラザーズ廃棄場",
        url: "jalbert-brothers-disposal.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジャマイカ・プレイン",
        yomi: "ジャマイカ・プレイン",
        url: "jamaica-plain.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジェームズ・アディソン",
        yomi: "ジェームズ・アディソン",
        url: "james-addison.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "james-fallout-3",
        yomi: "james-fallout-3",
        url: "james-fallout-3.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジェームズ・シュー",
        yomi: "ジェームズ・シュー",
        url: "james-hsu.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジェームス",
        yomi: "ジェームス",
        url: "james.html",
        category: "人物",
        appearance: ["Fallout 76","Fallout 3","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ジャミラ",
        yomi: "ジャミラ",
        url: "jamila.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジャネル・プリブロ",
        yomi: "ジャネル・プリブロ",
        url: "janelle-priblo.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Janelle's Camp",
        yomi: "Janelle's Camp",
        url: "janelles-camp.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジェイニー・ハワード",
        yomi: "ジェイニー・ハワード",
        url: "janey-howard.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジャニス",
        yomi: "ジャニス",
        url: "janice-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジェイソン・ブライト",
        yomi: "ジェイソン・ブライト",
        url: "jason-bright.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジャビン",
        yomi: "ジャビン",
        url: "javin.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジェイ・ヴォー",
        yomi: "ジェイ・ヴォー",
        url: "jaye-vo.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジェフ・ナカムラ",
        yomi: "ジェフ・ナカムラ",
        url: "jeff-nakamura.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ジェファーソン・グレイ",
        yomi: "ジェファーソン・グレイ",
        url: "jefferson-grey.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Jen",
        yomi: "Jen",
        url: "jen.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Jennie Brown",
        yomi: "Jennie Brown",
        url: "jennie-brown.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジェリコ",
        yomi: "ジェリコ",
        url: "jericho.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "JES-2R",
        yomi: "JES-2R",
        url: "jes-2r.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Jess",
        yomi: "Jess",
        url: "jess-ghoul-within.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジェシ・ザ・フック",
        yomi: "ジェシ・ザ・フック",
        url: "jessi-the-hook.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Jesus Sunday",
        yomi: "Jesus Sunday",
        url: "jesus-sunday.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジャイド",
        yomi: "ジャイド",
        url: "jide.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジム",
        yomi: "ジム",
        url: "jim-raider.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジム",
        yomi: "ジム",
        url: "jim-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジンウェイ将軍",
        yomi: "ジンウェイ将軍",
        url: "jingwei.html",
        category: "人物",
        appearance: ["Fallout 3 (Operation Anchorage)"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジョアン・ポランスキー",
        yomi: "ジョアン・ポランスキー",
        url: "joan-polansky.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジョアン",
        yomi: "ジョアン",
        url: "joan-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジョアンナ・メイフィールド",
        yomi: "ジョアンナ・メイフィールド",
        url: "joanna-mayfield.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジョアン・ワームウッド",
        yomi: "ジョアン・ワームウッド",
        url: "joanne-wormwood.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジョーのスパッキーズ",
        yomi: "ジョーのスパッキーズ",
        url: "joes-spuckies.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジョーイ・ベロ",
        yomi: "ジョーイ・ベロ",
        url: "joey-bello.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オブザーバー・ジョアンナ",
        yomi: "オブザーバー・ジョアンナ",
        url: "johanna.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジョン・アーロンホルト",
        yomi: "ジョン・アーロンホルト",
        url: "john-aaronholt.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジョン・ハンコック",
        yomi: "ジョン・ハンコック",
        url: "john-hancock.html",
        category: "人物",
        appearance: ["Fallout 76","Fallout 4"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ジョン・ヘンリー・エデン大統領",
        yomi: "ジョン・ヘンリー・エデン大統領",
        url: "john-henry-eden.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジョン・ホロウェイ",
        yomi: "ジョン・ホロウェイ",
        url: "john-holloway.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Johnny Moreno",
        yomi: "Johnny Moreno",
        url: "johnny-moreno.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジョニー・ウェストン",
        yomi: "ジョニー・ウェストン",
        url: "johnny-weston.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Johnson's Acre",
        yomi: "Johnson's Acre",
        url: "johnsons-acre.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "陽気なパン職人",
        yomi: "陽気なパン職人",
        url: "jolly-baker.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジョナ・イトウ",
        yomi: "ジョナ・イトウ",
        url: "jonah-ito.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジューキー・ヘアサロン",
        yomi: "ジューキー・ヘアサロン",
        url: "jooky-hair-salon.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホルヘ",
        yomi: "ホルヘ",
        url: "jorge-tv.html",
        category: "人物",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホルヘ",
        yomi: "ホルヘ",
        url: "jorge.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジョセフ・モールダー",
        yomi: "ジョセフ・モールダー",
        url: "joseph-moerder.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジョセフ",
        yomi: "ジョセフ",
        url: "joseph-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジョシュア・グラハム",
        yomi: "ジョシュア・グラハム",
        url: "joshua-graham.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジョージー",
        yomi: "ジョージー",
        url: "josie-milepost-zero.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "喜びに満ちたミュージシャン",
        yomi: "喜びに満ちたミュージシャン",
        url: "joyous-musician.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Juan Diego Sunday",
        yomi: "Juan Diego Sunday",
        url: "juan-diego-sunday.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "陽気なデコレーター",
        yomi: "陽気なデコレーター",
        url: "jubilant-decorator.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジュリア・マスターズ",
        yomi: "ジュリア・マスターズ",
        url: "julia-masters.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジュリア",
        yomi: "ジュリア",
        url: "julia-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "julie-farkas",
        yomi: "julie-farkas",
        url: "julie-farkas.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジュリエット",
        yomi: "ジュリエット",
        url: "juliette.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジュンコおばあちゃん",
        yomi: "ジュンコおばあちゃん",
        url: "junko-grandma.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "K.D.インクウェル",
        yomi: "K.D.インクウェル",
        url: "k-d-inkwell.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "カナワ郡墓地",
        yomi: "カナワ郡墓地",
        url: "kanawha-county-cemetery.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カノーワ国立公園",
        yomi: "カノーワ国立公園",
        url: "kanawha-national-park.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カナー・ヌカコーラ工場",
        yomi: "カナー・ヌカコーラ工場",
        url: "kanawha-nuka-cola-plant.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カナー川",
        yomi: "カナー川",
        url: "kanawha-river.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Kassie",
        yomi: "Kassie",
        url: "kassie.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "「人生の綱渡りをするとき、絶対に下を見てはいけない。」",
        yomi: "「人生の綱渡りをするとき、絶対に下を見てはいけない。」",
        url: "katherine-swan.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キャスリン・セップ",
        yomi: "キャスリン・セップ",
        url: "kathryn-cep.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ケレメン",
        yomi: "ケレメン",
        url: "kelemen.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ケンダル病院",
        yomi: "ケンダル病院",
        url: "kendall-hospital.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ケンディル・シムズ",
        yomi: "ケンディル・シムズ",
        url: "kendyll-sims.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Kenneth Dean",
        yomi: "Kenneth Dean",
        url: "kenneth-dean.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ケンジントン捜査官",
        yomi: "ケンジントン捜査官",
        url: "kensington.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Kerry",
        yomi: "Kerry",
        url: "kerry-brotherhood.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ケリー",
        yomi: "ケリー",
        url: "kerry-cutthroats.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カーウッド鉱山",
        yomi: "カーウッド鉱山",
        url: "kerwood-mine.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ケシャ・マクダーモット",
        yomi: "ケシャ・マクダーモット",
        url: "kesha-mcdermott.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Kevan Asherton",
        yomi: "Kevan Asherton",
        url: "kevan-asherton.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キディ・コーナー・キャビンズ",
        yomi: "キディ・コーナー・キャビンズ",
        url: "kiddie-corner-cabins.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キッディキングダム",
        yomi: "キッディキングダム",
        url: "kiddie-kingdom.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Kieran Kennedy",
        yomi: "Kieran Kennedy",
        url: "kieran-kennedy.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Aaron Kimball (アーロン・キンバル)",
        yomi: "Aaron Kimball (アーロン・キンバル)",
        url: "kimball.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "キングス・インパーソネーション・スクール",
        yomi: "キングス・インパーソネーション・スクール",
        url: "king-s-school-of-impersonation.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キングスポート灯台",
        yomi: "キングスポート灯台",
        url: "kingsport-lighthouse.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キット軍曹",
        yomi: "キット軍曹",
        url: "kit.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キヨミ",
        yomi: "キヨミ",
        url: "kiyomi.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Dr. クライン",
        yomi: "Dr. クライン",
        url: "klein.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "KMAX送信塔",
        yomi: "KMAX送信塔",
        url: "kmax-transmission.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ナイフ・エッジ",
        yomi: "ナイフ・エッジ",
        url: "knife-edge.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ナイト",
        yomi: "ナイト",
        url: "knight-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "コーガン",
        yomi: "コーガン",
        url: "kogan.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "コラ",
        yomi: "コラ",
        url: "kora.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "KPSSラジオ放送局",
        yomi: "KPSSラジオ放送局",
        url: "kpss-radio-station.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ラセルタ軍団長",
        yomi: "ラセルタ軍団長",
        url: "lacerta-legate.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レイシー・ドラモンド",
        yomi: "レイシー・ドラモンド",
        url: "lacey-drummond.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ラッドガル",
        yomi: "ラッドガル",
        url: "ladgal.html",
        category: "クリーチャー",
        appearance: ["Fallout 76","Fallout 4"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Lady G the Fortune Teller",
        yomi: "Lady G the Fortune Teller",
        url: "lady-g-the-fortune-teller.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レディ・ジャネットのソフトクリーム",
        yomi: "レディ・ジャネットのソフトクリーム",
        url: "lady-janets-soft-serve.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エロイーズ湖",
        yomi: "エロイーズ湖",
        url: "lake-eloise.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クアナポウィット湖",
        yomi: "クアナポウィット湖",
        url: "lake-quannapowitt.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レイノルズ湖",
        yomi: "レイノルズ湖",
        url: "lake-reynolds.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レイクサイド・キャビンズ",
        yomi: "レイクサイド・キャビンズ",
        url: "lakeside-cabins.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ランドン",
        yomi: "ランドン",
        url: "landon.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ランドビュー灯台",
        yomi: "ランドビュー灯台",
        url: "landview-lighthouse.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リゲート・ラニウス (軍団長・怪物)",
        yomi: "リゲート・ラニウス (軍団長・怪物)",
        url: "lanius.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ラスベガス管理Vault (Las Vegas management Vault)",
        yomi: "ラスベガス管理Vault (Las Vegas management Vault)",
        url: "las-vegas-management-vault.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レーザーガン",
        yomi: "レーザーガン",
        url: "laser-gun.html",
        category: "武器",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "アメリカ合衆国大統領",
        yomi: "アメリカ合衆国大統領",
        url: "last-president-of-the-united-states.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ラスト・リゾート",
        yomi: "ラスト・リゾート",
        url: "last-resort.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ローレンス・ロナルド",
        yomi: "ローレンス・ロナルド",
        url: "laurence-ronald.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レモン・プライス",
        yomi: "レモン・プライス",
        url: "leamon-price.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リー・モルデイヴァー",
        yomi: "リー・モルデイヴァー",
        url: "lee-moldaver.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "lee-oliver",
        yomi: "lee-oliver",
        url: "lee-oliver.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヒル",
        yomi: "ヒル",
        url: "leech-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Lee Moldaver (リー・モルデイヴァー)",
        yomi: "Lee Moldaver (リー・モルデイヴァー)",
        url: "lee_moldaver.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "リージョン上級顧問",
        yomi: "リージョン上級顧問",
        url: "legion-senior-advisor.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リージョナリー",
        yomi: "リージョナリー",
        url: "legionary-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Leila Rahmani",
        yomi: "Leila Rahmani",
        url: "leila-rahmani.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レノックス",
        yomi: "レノックス",
        url: "lennox.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "「爆弾が落ちる前ですら、家族との関係を修復できたかどうかはわからない。<br>\r\n                でも、あとどれだけ時間が残されていたか…それを知っていたかった。」",
        yomi: "「爆弾が落ちる前ですら、家族との関係を修復できたかどうかはわからない。<br>\r\n                でも、あとどれだけ時間が残されていたか…それを知っていたかった。」",
        url: "leo-petrov.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レオン・フォン・フェルデン",
        yomi: "レオン・フォン・フェルデン",
        url: "leon-von-felden.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レフ",
        yomi: "レフ",
        url: "lev.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ルイス＆サンズ農業用品店",
        yomi: "ルイス＆サンズ農業用品店",
        url: "lewis-and-sons-farming-supply.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ルイス＆サンズ農業用品店",
        yomi: "ルイス＆サンズ農業用品店",
        url: "lewis-sons-farming.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ルイスバーグ駅",
        yomi: "ルイスバーグ駅",
        url: "lewisburg-station.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ルイスバーグ",
        yomi: "ルイスバーグ",
        url: "lewisburg.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レキシントン",
        yomi: "レキシントン",
        url: "lexington.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リビー・ウェン",
        yomi: "リビー・ウェン",
        url: "libby-wen.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リベルタリア",
        yomi: "リベルタリア",
        url: "libertalia.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "自由の鐘",
        yomi: "自由の鐘",
        url: "liberty-bell.html",
        category: "アイテム",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "liberty-prime",
        yomi: "liberty-prime",
        url: "liberty-prime.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リリィ・ボウエン",
        yomi: "リリィ・ボウエン",
        url: "lily-bowen.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リムジンの衝突事故現場",
        yomi: "リムジンの衝突事故現場",
        url: "limousine-crash.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "監視郷（リスニング・ポスト）・ブラボー",
        yomi: "監視郷（リスニング・ポスト）・ブラボー",
        url: "listening-post-bravo.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロイド・ホーソーン",
        yomi: "ロイド・ホーソーン",
        url: "lloyd-hawthorne.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロイス",
        yomi: "ロイス",
        url: "lois.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オールド・ロングフェロー",
        yomi: "オールド・ロングフェロー",
        url: "longfellow.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "長江ルカウスキーの缶詰工場（ロングネック・ルカウスキー）",
        yomi: "長江ルカウスキーの缶詰工場（ロングネック・ルカウスキー）",
        url: "longneck-lukowskis-cannery.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドクター・ロリス",
        yomi: "ドクター・ロリス",
        url: "loris.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロサンゼルス市庁舎",
        yomi: "ロサンゼルス市庁舎",
        url: "los-angeles-city-hall.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロサンゼルス国際空港",
        yomi: "ロサンゼルス国際空港",
        url: "los-angeles-international-airport.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "失われた家",
        yomi: "失われた家",
        url: "lost-home.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロータス",
        yomi: "ロータス",
        url: "lotus.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ラバーズ・リープ",
        yomi: "ラバーズ・リープ",
        url: "lovers-leap.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ローウェル・アーロンホルト",
        yomi: "ローウェル・アーロンホルト",
        url: "lowell-aaronholt.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ルカ・コスタ",
        yomi: "ルカ・コスタ",
        url: "luca-costa.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ルーカス・シムズ",
        yomi: "ルーカス・シムズ",
        url: "lucas-simms.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ラッキー38・セキュリトロン",
        yomi: "ラッキー38・セキュリトロン",
        url: "lucky-38-securitron.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Lucky Hole Mine",
        yomi: "Lucky Hole Mine",
        url: "lucky-hole-mine.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Lucky Lou",
        yomi: "Lucky Lou",
        url: "lucky-lou.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Lucy Harwick",
        yomi: "Lucy Harwick",
        url: "lucy-harwick.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ルーシー・マクレーン",
        yomi: "ルーシー・マクレーン",
        url: "lucy-maclean.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Luis Ramirez",
        yomi: "Luis Ramirez",
        url: "luis-ramirez.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ルーク",
        yomi: "ルーク",
        url: "luke-milepost-zero.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ランチボックス",
        yomi: "ランチボックス",
        url: "lunch-box.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "リン・ウッズ",
        yomi: "リン・ウッズ",
        url: "lynn-woods.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Lynx",
        yomi: "Lynx",
        url: "lynx.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マ・ジューンの雑貨店",
        yomi: "マ・ジューンの雑貨店",
        url: "ma-june-s-sundries.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マ・ジューン",
        yomi: "マ・ジューン",
        url: "ma-june.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マックの農場",
        yomi: "マックの農場",
        url: "macs-farm.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マダム・テイラーズ",
        yomi: "マダム・テイラーズ",
        url: "madame-taylors.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マドックス・マレン",
        yomi: "マドックス・マレン",
        url: "maddox-mullen.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マデリーン・キーン",
        yomi: "マデリーン・キーン",
        url: "madeline-keene.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マジソン・リー",
        yomi: "マジソン・リー",
        url: "madison-li.html",
        category: "人物",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "雑誌",
        yomi: "雑誌",
        url: "magazine.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Magellan",
        yomi: "Magellan",
        url: "magellan.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マギー・スターン",
        yomi: "マギー・スターン",
        url: "maggie-stern.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Maggie Williams",
        yomi: "Maggie Williams",
        url: "maggie-williams.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マグパイ",
        yomi: "マグパイ",
        url: "magpie.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マクラッチー魚包装工場（マクラ・フィッシュパッキング）",
        yomi: "マクラッチー魚包装工場（マクラ・フィッシュパッキング）",
        url: "mahkra-fishpacking.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "MAIA",
        yomi: "MAIA",
        url: "maia.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モールデン・センター",
        yomi: "モールデン・センター",
        url: "malden-center.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モールラット",
        yomi: "モールラット",
        url: "mall-rat.html",
        category: "クリーチャー",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ママ・ドルスの食品加工場",
        yomi: "ママ・ドルスの食品加工場",
        url: "mama-dolces-food-processing.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ママ・ドルチのフードプロセッシング",
        yomi: "ママ・ドルチのフードプロセッシング",
        url: "mama-dolces.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "暗がりに立つ男",
        yomi: "暗がりに立つ男",
        url: "man-in-shadows.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マニー・バルガス",
        yomi: "マニー・バルガス",
        url: "manny-vargas.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マンタ・マン",
        yomi: "マンタ・マン",
        url: "manta-man.html",
        category: "人物",
        appearance: ["Fallout 4","Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Maram Ayari",
        yomi: "Maram Ayari",
        url: "maram-ayari.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マーチ・シャーウッド",
        yomi: "マーチ・シャーウッド",
        url: "march-sherwood.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Marcia Leone",
        yomi: "Marcia Leone",
        url: "marcia-leone.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マーカス",
        yomi: "マーカス",
        url: "marcus.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マーガレット",
        yomi: "マーガレット",
        url: "margaret-fallout-76.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Margie McClintock",
        yomi: "Margie McClintock",
        url: "margie-mcclintock.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マリア・チャベス",
        yomi: "マリア・チャベス",
        url: "maria-chavez.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マリアン",
        yomi: "マリアン",
        url: "marianne-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マリアン",
        yomi: "マリアン",
        url: "marianne-tv.html",
        category: "人物",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マリー",
        yomi: "マリー",
        url: "marie-fallout-76.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マリーゴールド・パビリオン",
        yomi: "マリーゴールド・パビリオン",
        url: "marigold-pavilion.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "マリリン",
        yomi: "マリリン",
        url: "marilyn-fallout-76.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Marion Copeland",
        yomi: "Marion Copeland",
        url: "marion-copeland.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マージョリー",
        yomi: "マージョリー",
        url: "marjorie-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マーリー",
        yomi: "マーリー",
        url: "marley.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オブザーバー・マーロン",
        yomi: "オブザーバー・マーロン",
        url: "marlon.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "沼地のコテージ",
        yomi: "沼地のコテージ",
        url: "marsh-cottage.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マーティ・パットナム",
        yomi: "マーティ・パットナム",
        url: "marty-putnam.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マスベイ医療センター",
        yomi: "マスベイ医療センター",
        url: "mass-bay-medical-center.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マスフュージョン・ビル",
        yomi: "マスフュージョン・ビル",
        url: "mass-fusion-building.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マスパイク・インターチェンジ",
        yomi: "マスパイク・インターチェンジ",
        url: "mass-pike-interchange.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マサチューセッツ州議事堂",
        yomi: "マサチューセッツ州議事堂",
        url: "massachusetts-state-house.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "大柄なリージョナリー",
        yomi: "大柄なリージョナリー",
        url: "massive-legionary.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "司会者",
        yomi: "司会者",
        url: "master-of-ceremonies.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マスターガッツィー軍曹",
        yomi: "マスターガッツィー軍曹",
        url: "master-sergeant-gutsy.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "「うーん…マウル、そんなこと考えたことなかった。<br>\r\n                でも人間の言う通りだ。<br>\r\n                お前は強い。<br>\r\n                グログナックより強いかもしれない。<br>\r\n                人間が前に進めるなら、マウルにもできるかもしれない。」",
        yomi: "「うーん…マウル、そんなこと考えたことなかった。<br>\r\n                でも人間の言う通りだ。<br>\r\n                お前は強い。<br>\r\n                グログナックより強いかもしれない。<br>\r\n                人間が前に進めるなら、マウルにもできるかもしれない。」",
        url: "maul.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Max Posey",
        yomi: "Max Posey",
        url: "max-posey.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マクシミリアン・ドッティーノ",
        yomi: "マクシミリアン・ドッティーノ",
        url: "maximillian-dottino.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マキシモ・レオーネ",
        yomi: "マキシモ・レオーネ",
        url: "maximo-leone.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Maximum Maddie",
        yomi: "Maximum Maddie",
        url: "maximum-maddie.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マキシマス",
        yomi: "マキシマス",
        url: "maximus-tv.html",
        category: "人物",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マキシマス",
        yomi: "マキシマス",
        url: "maximus.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マクシーン・バラード",
        yomi: "マクシーン・バラード",
        url: "maxine-ballard.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マクレディ市長 (幼少期)",
        yomi: "マクレディ市長 (幼少期)",
        url: "mayor-maccready.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マクレー",
        yomi: "マクレー",
        url: "mcrae.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "メドウ・ブリーズ貯蔵庫",
        yomi: "メドウ・ブリーズ貯蔵庫",
        url: "meadow-breeze-storage-depot.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "メカニックの金属小屋",
        yomi: "メカニックの金属小屋",
        url: "mechanics-metal-shack.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "mechanist-fo3",
        yomi: "mechanist-fo3",
        url: "mechanist-fo3.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "メカニスト",
        yomi: "メカニスト",
        url: "mechanist.html",
        category: "人物",
        appearance: ["Fallout 3","Fallout 4","Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "メッド・テック・リサーチ",
        yomi: "メッド・テック・リサーチ",
        url: "med-tek-research.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "メドフォード記念病院",
        yomi: "メドフォード記念病院",
        url: "medford-memorial-hospital.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Meg Groberg",
        yomi: "Meg Groberg",
        url: "meg-groberg.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "メガ・マンション",
        yomi: "メガ・マンション",
        url: "mega-mansion.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "メガ・スロス",
        yomi: "メガ・スロス",
        url: "mega-sloth-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "メガ整形外科センター",
        yomi: "メガ整形外科センター",
        url: "mega-surgery-center.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "メロディ・K・ラーキン",
        yomi: "メロディ・K・ラーキン",
        url: "melody-larkin.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "メモリー・デン",
        yomi: "メモリー・デン",
        url: "memory-den.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "メンタス",
        yomi: "メンタス",
        url: "mentas.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "メルセデス・スターン",
        yomi: "メルセデス・スターン",
        url: "mercedes-stern.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "メリマン",
        yomi: "メリマン",
        url: "merriman.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "陽気な木こり",
        yomi: "陽気な木こり",
        url: "merry-woodsman.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "メタル・ドーム",
        yomi: "メタル・ドーム",
        url: "metal-dome.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "michael-angelo",
        yomi: "michael-angelo",
        url: "michael-angelo.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マイケル・ターナー",
        yomi: "マイケル・ターナー",
        url: "michael-turner.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ミック＆ラルフ",
        yomi: "ミック＆ラルフ",
        url: "mick-ralph-s.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ミドル・マウンテン・キャビン",
        yomi: "ミドル・マウンテン・キャビン",
        url: "middle-mountain-cabins.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ミドルマウンテン湖",
        yomi: "ミドルマウンテン湖",
        url: "middle-mountain-lake.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ミドル・マウンテン・ピットストップ",
        yomi: "ミドル・マウンテン・ピットストップ",
        url: "middle-mountain-pitstop.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ミゲル・カルデラ",
        yomi: "ミゲル・カルデラ",
        url: "miguel-caldera.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マイク・ティラー",
        yomi: "マイク・ティラー",
        url: "mike-tiller.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "憲兵（ミリタリーポリス・オフィサー）",
        yomi: "憲兵（ミリタリーポリス・オフィサー）",
        url: "military-police-officer.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ミラーの家電店",
        yomi: "ミラーの家電店",
        url: "millers-appliances.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ミルストーン",
        yomi: "ミルストーン",
        url: "millstone.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マイロ",
        yomi: "マイロ",
        url: "milo-raider.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ミルトン・ジェネラル病院",
        yomi: "ミルトン・ジェネラル病院",
        url: "milton-general-hospital.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ミルトン・パーキング・ガレージ",
        yomi: "ミルトン・パーキング・ガレージ",
        url: "milton-parking-garage.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マイナーズ・モニュメント",
        yomi: "マイナーズ・モニュメント",
        url: "miners-monument.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Minerva",
        yomi: "Minerva",
        url: "minerva.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ミラージュ・ピクチャーズ",
        yomi: "ミラージュ・ピクチャーズ",
        url: "mirage-pictures.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マイアラーク",
        yomi: "マイアラーク",
        url: "mirelurk-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マイアラーク・ハンター",
        yomi: "マイアラーク・ハンター",
        url: "mirelurk-hunter-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マイアラーク・キング",
        yomi: "マイアラーク・キング",
        url: "mirelurk-king-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マイアラーク・クイーン",
        yomi: "マイアラーク・クイーン",
        url: "mirelurk-queen-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マイアラーク・スポーン",
        yomi: "マイアラーク・スポーン",
        url: "mirelurk-spawn-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マイアの眼",
        yomi: "マイアの眼",
        url: "mires-eye.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Mischief Night",
        yomi: "Mischief Night",
        url: "mischief-night.html",
        category: "イベント・現象",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ミス・アニー",
        yomi: "ミス・アニー",
        url: "miss-annie.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "mistress-of-mystery",
        yomi: "mistress-of-mystery",
        url: "mistress-of-mystery.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Dr. モビウス",
        yomi: "Dr. モビウス",
        url: "mobius.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Agent Mochou",
        yomi: "Agent Mochou",
        url: "mochou.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "MODUSアーマリー・ターミナル",
        yomi: "MODUSアーマリー・ターミナル",
        url: "modus-armory-terminal.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "MODUSメディカル・ターミナル",
        yomi: "MODUSメディカル・ターミナル",
        url: "modus-medical-terminal.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "MODUSプロダクション・ターミナル",
        yomi: "MODUSプロダクション・ターミナル",
        url: "modus-production-terminal.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "MODUSサイエンス・ターミナル",
        yomi: "MODUSサイエンス・ターミナル",
        url: "modus-science-terminal.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Multi-Operation Directions and Utility System",
        yomi: "Multi-Operation Directions and Utility System",
        url: "modus.html",
        category: "キャラクター",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モール・ザ・モール",
        yomi: "モール・ザ・モール",
        url: "moe-the-mole.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モヒカンのリージョナリー",
        yomi: "モヒカンのリージョナリー",
        url: "mohawk-legionary.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モイラ・ブラウン",
        yomi: "モイラ・ブラウン",
        url: "moira-brown.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モハビ・ミッション・スクール",
        yomi: "モハビ・ミッション・スクール",
        url: "mojave-mission-school.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モハビ・ウェイストランド (Mojave Wasteland)",
        yomi: "モハビ・ウェイストランド (Mojave Wasteland)",
        url: "mojave-wasteland.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モルデイヴァーのエリート護衛",
        yomi: "モルデイヴァーのエリート護衛",
        url: "moldavers-elite-guard.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モール・マイナー",
        yomi: "モール・マイナー",
        url: "mole-miner.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モールラット",
        yomi: "モールラット",
        url: "mole-rat-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モリー",
        yomi: "モリー",
        url: "molly-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブラザー・モンクリフ",
        yomi: "ブラザー・モンクリフ",
        url: "moncrief.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モングレル",
        yomi: "モングレル",
        url: "mongrel-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モノンガー鉱山",
        yomi: "モノンガー鉱山",
        url: "monongah-mine.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モノンガー展望台",
        yomi: "モノンガー展望台",
        url: "monongah-overlook.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モノンガー発電所",
        yomi: "モノンガー発電所",
        url: "monongah-power-plant.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モノンガー",
        yomi: "モノンガー",
        url: "monongah.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モノンガヒラ国立森林",
        yomi: "モノンガヒラ国立森林",
        url: "monongahela-national-forest.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モノレール・エレベーター",
        yomi: "モノレール・エレベーター",
        url: "monorail-elevator.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モンシニョール・プラザ",
        yomi: "モンシニョール・プラザ",
        url: "monsignor-plaza.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モンティ",
        yomi: "モンティ",
        url: "monty-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モンティ",
        yomi: "モンティ",
        url: "monty-tv.html",
        category: "人物",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ムーンモンキーのジャングルズ",
        yomi: "ムーンモンキーのジャングルズ",
        url: "moon-monkey-jungles.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Moonshiner Ned",
        yomi: "Moonshiner Ned",
        url: "moonshiner-ned.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "密造酒業者の見晴らし台",
        yomi: "密造酒業者の見晴らし台",
        url: "moonshiners-overlook.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "密造酒業者の小屋",
        yomi: "密造酒業者の小屋",
        url: "moonshiners-shack.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ムーンベイル・トンネル",
        yomi: "ムーンベイル・トンネル",
        url: "moonvale-tunnel.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Mordecai McCoy",
        yomi: "Mordecai McCoy",
        url: "mordecai-mccoy.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モルデカイ &quot;モート&quot; マッコイ",
        yomi: "モルデカイ &quot;モート&quot; マッコイ",
        url: "mordecai-mort-mccoy.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "モーガンタウン空港ターミナル",
        yomi: "モーガンタウン空港ターミナル",
        url: "morgantown-airport-terminal.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モーガンタウン空港",
        yomi: "モーガンタウン空港",
        url: "morgantown-airport.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モーガンタウン高校",
        yomi: "モーガンタウン高校",
        url: "morgantown-high-school.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モーガンタウン・モノレール",
        yomi: "モーガンタウン・モノレール",
        url: "morgantown-monorail.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モーガンタウン操車場",
        yomi: "モーガンタウン操車場",
        url: "morgantown-trainyard.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モーガンタウン",
        yomi: "モーガンタウン",
        url: "morgantown.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モーリー",
        yomi: "モーリー",
        url: "morley.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Morris Stevens",
        yomi: "Morris Stevens",
        url: "morris-stevens.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モーティマー",
        yomi: "モーティマー",
        url: "mortimer-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モスタウン",
        yomi: "モスタウン",
        url: "mosstown.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モスホーム",
        yomi: "モスホーム",
        url: "moth-home.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マザーロード取得施設",
        yomi: "マザーロード取得施設",
        url: "motherlode-acquisition-facility.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モスマン博物館",
        yomi: "モスマン博物館",
        url: "mothman-museum.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "モスマン",
        yomi: "モスマン",
        url: "mothman.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "モーターランナー",
        yomi: "モーターランナー",
        url: "motor-runner.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マウント・ブレア・コーヒー小屋",
        yomi: "マウント・ブレア・コーヒー小屋",
        url: "mount-blair-coffee-shack.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マウント・ブレア操車場",
        yomi: "マウント・ブレア操車場",
        url: "mount-blair-trainyard.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マウント・ブレア",
        yomi: "マウント・ブレア",
        url: "mount-blair.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マウンテンサイド B&amp;B",
        yomi: "マウンテンサイド B&amp;B",
        url: "mountainside-bed-and-breakfast.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "山腹のキャビン",
        yomi: "山腹のキャビン",
        url: "mountainside-cabin.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マウンテンサイド・ファーム",
        yomi: "マウンテンサイド・ファーム",
        url: "mountainside-farm.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マウンテンサイド駅",
        yomi: "マウンテンサイド駅",
        url: "mountainside-station.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Mr. Fluffy",
        yomi: "Mr. Fluffy",
        url: "mr-fluffy.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ミスター・ハンディ",
        yomi: "ミスター・ハンディ",
        url: "mr-handy.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Mr.スクイーズ",
        yomi: "Mr.スクイーズ",
        url: "mr-squeeze.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "マギー",
        yomi: "マギー",
        url: "muggy.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Munch",
        yomi: "Munch",
        url: "munch.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マークウォーター建設現場",
        yomi: "マークウォーター建設現場",
        url: "murkwater-construction-site.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Murray",
        yomi: "Murray",
        url: "murray-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "自由博物館",
        yomi: "自由博物館",
        url: "museum-of-freedom.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サレム魔女博物館",
        yomi: "サレム魔女博物館",
        url: "museum-of-witchcraft.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ミュータント・ハウンド",
        yomi: "ミュータント・ハウンド",
        url: "mutant-hound-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "変異パブリックイベント",
        yomi: "変異パブリックイベント",
        url: "mutation-public-event.html",
        category: "イベント・現象",
        appearance: ["Fallout 76","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "変異",
        yomi: "変異",
        url: "mutation.html",
        category: "イベント・現象",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ミステリアス・ガイドストーン",
        yomi: "ミステリアス・ガイドストーン",
        url: "mysterious-guidestones.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "N. Jackson",
        yomi: "N. Jackson",
        url: "n-jackson.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ナハント海洋学協会",
        yomi: "ナハント海洋学協会",
        url: "nahant-oceanological-society.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "NAR修理ヤード",
        yomi: "NAR修理ヤード",
        url: "nar-repair-yard.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ネリ・サミール",
        yomi: "ネリ・サミール",
        url: "nari-samir.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Natasha Hunt",
        yomi: "Natasha Hunt",
        url: "natasha-hunt.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "州兵訓練所",
        yomi: "州兵訓練所",
        url: "national-guard-training-yard.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "国立隔離無線アレイ",
        yomi: "国立隔離無線アレイ",
        url: "national-isolated-radio-array.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "国立公園案内所",
        yomi: "国立公園案内所",
        url: "national-park-visitors-center.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4 (Far Harbor)"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "National Radio Astronomy Research Center",
        yomi: "National Radio Astronomy Research Center",
        url: "national-radio-astronomy-research-center.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "NCRのキャラバン商人",
        yomi: "NCRのキャラバン商人",
        url: "ncr-caravaner.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "NCRの市民",
        yomi: "NCRの市民",
        url: "ncr-citizen-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "NCRアウトポスト (TVドラマ)",
        yomi: "NCRアウトポスト (TVドラマ)",
        url: "ncr-outpost.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "NCR兵士（シーズン1残党）",
        yomi: "NCR兵士（シーズン1残党）",
        url: "ncr-soldier-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "NCRトルーパー（シーズン2）",
        yomi: "NCRトルーパー（シーズン2）",
        url: "ncr-trooper-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "New California Republic",
        yomi: "New California Republic",
        url: "ncr.html",
        category: "勢力",
        appearance: ["Fallout","Fallout 2","Fallout: New Vegas","Fallout TV"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ニードルズ",
        yomi: "ニードルズ",
        url: "needles.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "隣接する農家",
        yomi: "隣接する農家",
        url: "neighboring-homesteads.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Nellie Wright",
        yomi: "Nellie Wright",
        url: "nellie-wright.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ニュー・アパラチアン中央操車場",
        yomi: "ニュー・アパラチアン中央操車場",
        url: "new-appalachian-central-trainyard.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ニューガッド",
        yomi: "ニューガッド",
        url: "new-gad.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ニューリバー渓谷橋",
        yomi: "ニューリバー渓谷橋",
        url: "new-river-gorge-bridge.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ニューリバー峡谷リゾート",
        yomi: "ニューリバー峡谷リゾート",
        url: "new-river-gorge-resort.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ニューリバー・ゴージ・ロープスコース",
        yomi: "ニューリバー・ゴージ・ロープスコース",
        url: "new-river-gorge-ropes-course.html",
        category: "ロケーション",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ニューリバー峡谷ロープコース",
        yomi: "ニューリバー峡谷ロープコース",
        url: "new-river-gorge-ropes.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ニューリバー",
        yomi: "ニューリバー",
        url: "new-river.html",
        category: "ロケーション",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ニュースキャスター",
        yomi: "ニュースキャスター",
        url: "news-anchor.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キャンプカウンセラー・ニア",
        yomi: "キャンプカウンセラー・ニア",
        url: "nia.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ニコルソンの最期",
        yomi: "ニコルソンの最期",
        url: "nicholsons-end.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ニック・ザ・プリック",
        yomi: "ニック・ザ・プリック",
        url: "nick-the-prick.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ニック・バレンタイン",
        yomi: "ニック・バレンタイン",
        url: "nick-valentine.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ニング",
        yomi: "ニング",
        url: "ning.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ニラジ・シン",
        yomi: "ニラジ・シン",
        url: "niraj-singh.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ノーバーク・ヌーナン",
        yomi: "ノーバーク・ヌーナン",
        url: "no-bark-noonan.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ノードハーゲン・ビーチ",
        yomi: "ノードハーゲン・ビーチ",
        url: "nordhagen-beach.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Norland",
        yomi: "Norland",
        url: "norland.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ノーム・マクレーン",
        yomi: "ノーム・マクレーン",
        url: "norm-maclean.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ノース・カットスロート・キャンプ",
        yomi: "ノース・カットスロート・キャンプ",
        url: "north-cutthroat-camp.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ノースカナワの監視地点",
        yomi: "ノースカナワの監視地点",
        url: "north-kanawha-lookout.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "北カナー監視地点",
        yomi: "北カナー監視地点",
        url: "north-kanner-monitoring-point.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ノース・マウンテン監視塔",
        yomi: "ノース・マウンテン監視塔",
        url: "north-mountain-lookout.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ノース・マウンテン演説キャンプ",
        yomi: "ノース・マウンテン演説キャンプ",
        url: "north-mountain-oratory-camp.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ノースロードブリッジ（シルバーブリッジ）",
        yomi: "ノースロードブリッジ（シルバーブリッジ）",
        url: "north-road-bridge.html",
        category: "ロケーション",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ドクター・\"ノーズ\"・エドモンドソン",
        yomi: "ドクター・\"ノーズ\"・エドモンドソン",
        url: "nose-edmundson.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヌカ・ドン",
        yomi: "ヌカ・ドン",
        url: "nuclear-don.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヌカケイド",
        yomi: "ヌカケイド",
        url: "nuka-cade-fo76.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヌカ・ケード",
        yomi: "ヌカ・ケード",
        url: "nuka-cade-nuka-world.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヌカ・コーラ (Nuka-Cola)",
        yomi: "ヌカ・コーラ (Nuka-Cola)",
        url: "nuka-cola.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ヌカ・ギャラクシー",
        yomi: "ヌカ・ギャラクシー",
        url: "nuka-galaxy.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヌカ・ガール",
        yomi: "ヌカ・ガール",
        url: "nuka-girl.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヌカ・ランチャー",
        yomi: "ヌカ・ランチャー",
        url: "nuka-launcher.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヌカ・タッパー",
        yomi: "ヌカ・タッパー",
        url: "nuka-tapper.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ヌカ・タウンU.S.A.",
        yomi: "ヌカ・タウンU.S.A.",
        url: "nuka-town-usa.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヌカ・ワールド",
        yomi: "ヌカ・ワールド",
        url: "nuka-world-loc.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヌカワールド・オン・ツアー",
        yomi: "ヌカワールド・オン・ツアー",
        url: "nuka-world-on-tour.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヌカ・ワールド・発電所",
        yomi: "ヌカ・ワールド・発電所",
        url: "nuka-world-power-plant.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オバーランド駅",
        yomi: "オバーランド駅",
        url: "oberland-station.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "天文台",
        yomi: "天文台",
        url: "observatory-savage-divide.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Odessa Valdez",
        yomi: "Odessa Valdez",
        url: "odessa-valdez.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オハイオの川下りアドベンチャーズ",
        yomi: "オハイオの川下りアドベンチャーズ",
        url: "ohio-river-adventures.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オハイオ川",
        yomi: "オハイオ川",
        url: "ohio-river.html",
        category: "ロケーション",
        appearance: ["Fallout 76","The Pitt"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オールド・ダニエルソン・キャビン",
        yomi: "オールド・ダニエルソン・キャビン",
        url: "old-danielson-cabin.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オールド・ガレット・シンクホール",
        yomi: "オールド・ガレット・シンクホール",
        url: "old-gullet-sinkhole.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オールド・モールド採石場",
        yomi: "オールド・モールド採石場",
        url: "old-mold-quarry.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オールド・ネイト",
        yomi: "オールド・ネイト",
        url: "old-nate.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オールド・ノース・チャーチ",
        yomi: "オールド・ノース・チャーチ",
        url: "old-north-church.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オールド・ピートの終焉地",
        yomi: "オールド・ピートの終焉地",
        url: "old-petes-end.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "古い保管庫",
        yomi: "古い保管庫",
        url: "old-storehouse.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "老婆のグレッチ",
        yomi: "老婆のグレッチ",
        url: "old-woman-gretch.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オリバー・フィールズ大尉",
        yomi: "オリバー・フィールズ大尉",
        url: "oliver-fields.html",
        category: "キャラクター",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オリバー・スワニック",
        yomi: "オリバー・スワニック",
        url: "oliver-swanick.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オリヴィア・リバーズ",
        yomi: "オリヴィア・リバーズ",
        url: "olivia-rivers.html",
        category: "キャラクター",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オポッサム",
        yomi: "オポッサム",
        url: "opossum-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オルガン洞窟",
        yomi: "オルガン洞窟",
        url: "organ-cave.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "オリオン・モレノ",
        yomi: "オリオン・モレノ",
        url: "orion-moreno.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オーランド",
        yomi: "オーランド",
        url: "orlando.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オーウェル果樹園",
        yomi: "オーウェル果樹園",
        url: "orwell-orchards.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "オーティス・パイク",
        yomi: "オーティス・パイク",
        url: "otis-pike.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジモンヤ前哨基地",
        yomi: "ジモンヤ前哨基地",
        url: "outpost-zimonja.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "繁茂したサンデュー叢",
        yomi: "繁茂したサンデュー叢",
        url: "overgrown-sundew-grove.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "展望キャビン",
        yomi: "展望キャビン",
        url: "overlook-cabin.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "監督官のキャンプ",
        yomi: "監督官のキャンプ",
        url: "overseers-camp.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "監督官の家",
        yomi: "監督官の家",
        url: "overseers-home.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フクロウ",
        yomi: "フクロウ",
        url: "owl-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フクロウ（子）",
        yomi: "フクロウ（子）",
        url: "owlet-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エルダー・オーウェン・リオンズ",
        yomi: "エルダー・オーウェン・リオンズ",
        url: "owyn-lyons.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Paige",
        yomi: "Paige",
        url: "paige.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Palace of the Winding Path",
        yomi: "Palace of the Winding Path",
        url: "palace-of-the-winding-path.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "PANDORA",
        yomi: "PANDORA",
        url: "pandora.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "パパ・カーン",
        yomi: "パパ・カーン",
        url: "papa-khan.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Initiate Pappas",
        yomi: "Initiate Pappas",
        url: "pappas-fallout-76.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "パークストリート駅",
        yomi: "パークストリート駅",
        url: "park-street-station.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "パーソンズ州立精神病院",
        yomi: "パーソンズ州立精神病院",
        url: "parsons-state-insane-asylum.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "パルテニア・ブランケンシップ",
        yomi: "パルテニア・ブランケンシップ",
        url: "parthenia-blankenship.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "パーティー客",
        yomi: "パーティー客",
        url: "party-guest.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "パーティーハット",
        yomi: "パーティーハット",
        url: "party-hat.html",
        category: "アイテム",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "パーティタイム・ダイナーズ",
        yomi: "パーティタイム・ダイナーズ",
        url: "party-time-diners.html",
        category: "ロケーション",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "パーティーの参加者（Lucky 38）",
        yomi: "パーティーの参加者（Lucky 38）",
        url: "partygoer-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Patricia Myers",
        yomi: "Patricia Myers",
        url: "patricia-myers.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "パトリシア・ピーターズ",
        yomi: "パトリシア・ピーターズ",
        url: "patricia-peters.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "常連客（ザ・ウェイワード）",
        yomi: "常連客（ザ・ウェイワード）",
        url: "patron-the-wayward.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Paul",
        yomi: "Paul",
        url: "paul-responders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ペンドルトン",
        yomi: "ペンドルトン",
        url: "pendleton.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ペネロペ・ホーンライト",
        yomi: "ペネロペ・ホーンライト",
        url: "penelope-hornwright.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ペニントン",
        yomi: "ペニントン",
        url: "pennington.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スカウトリーダー・ペニー",
        yomi: "スカウトリーダー・ペニー",
        url: "penny-wild-appalachia.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Pete Myers",
        yomi: "Pete Myers",
        url: "pete-myers.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ピート",
        yomi: "ピート",
        url: "pete-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ピーターセン",
        yomi: "ピーターセン",
        url: "petersen-steel-reign.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "小柄なレイダー",
        yomi: "小柄なレイダー",
        url: "petite-raider.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フィリッピ戦場墓地",
        yomi: "フィリッピ戦場墓地",
        url: "philippi-battlefield-cemetery.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フィリッピ",
        yomi: "フィリッピ",
        url: "philippi.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "パイ・ハウス",
        yomi: "パイ・ハウス",
        url: "pi-house.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ピックマン・ギャラリー",
        yomi: "ピックマン・ギャラリー",
        url: "pickman-gallery.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "パイハウス",
        yomi: "パイハウス",
        url: "pie-house.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ピアス",
        yomi: "ピアス",
        url: "pierce-steel-dawn.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ピンカートン",
        yomi: "ピンカートン",
        url: "pinkerton.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "パイオニア・スカウト・キャンプ",
        yomi: "パイオニア・スカウト・キャンプ",
        url: "pioneer-scout-camp.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "パイオニア・スカウトの監視地点",
        yomi: "パイオニア・スカウトの監視地点",
        url: "pioneer-scout-lookout.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "pip-boy-character",
        yomi: "pip-boy-character",
        url: "pip-boy-character.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Pip-Boy",
        yomi: "Pip-Boy",
        url: "pip-boy.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "パイプボルトアクション",
        yomi: "パイプボルトアクション",
        url: "pipe-bolt-action.html",
        category: "武器",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "パイプガン",
        yomi: "パイプガン",
        url: "pipe-gun.html",
        category: "武器",
        appearance: ["Fallout 76","Fallout 4"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "パイプ・リボルバー",
        yomi: "パイプ・リボルバー",
        url: "pipe-revolver.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "パイパー・ライト",
        yomi: "パイパー・ライト",
        url: "piper-light.html",
        category: "人物",
        appearance: ["Fallout 76","Fallout 4"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "海賊放送",
        yomi: "海賊放送",
        url: "pirate-broadcast.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "プラズマガン",
        yomi: "プラズマガン",
        url: "plasma-gun.html",
        category: "武器",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "プレザント・ヒルズ墓地",
        yomi: "プレザント・ヒルズ墓地",
        url: "pleasant-hills-cemetery.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "プレザント・バレー・キャビン",
        yomi: "プレザント・バレー・キャビン",
        url: "pleasant-valley-cabins.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "プレザント・バレー・スキーリゾート",
        yomi: "プレザント・バレー・スキーリゾート",
        url: "pleasant-valley-ski-resort.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "プレザント・バレー駅",
        yomi: "プレザント・バレー駅",
        url: "pleasant-valley-station.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ポイント・プレザント",
        yomi: "ポイント・プレザント",
        url: "point-pleasant.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ポイント・リポーズ",
        yomi: "ポイント・リポーズ",
        url: "point-repose.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Polly",
        yomi: "Polly",
        url: "polly-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ポリー",
        yomi: "ポリー",
        url: "polly.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "スカウトリーダー・ポンピー",
        yomi: "スカウトリーダー・ポンピー",
        url: "pompy.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "プール",
        yomi: "プール",
        url: "poole.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Pop",
        yomi: "Pop",
        url: "pop.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ポートサイド・パブ",
        yomi: "ポートサイド・パブ",
        url: "portside-pub.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ポセイドン・エネルギープラント",
        yomi: "ポセイドン・エネルギープラント",
        url: "poseidon-energy-fo4.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ポセイドン・エナジー発電所 WV-06",
        yomi: "ポセイドン・エナジー発電所 WV-06",
        url: "poseidon-energy-plant-wv-06.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ポセイドン発電所ヤード",
        yomi: "ポセイドン発電所ヤード",
        url: "poseidon-energy-plant-yard.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ポセイドン・エネルギー",
        yomi: "ポセイドン・エネルギー",
        url: "poseidon-energy.html",
        category: "勢力",
        appearance: ["Fallout","Fallout 2","Fallout 3","Fallout: New Vegas","Fallout 4","Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ポセイドン・ガソリン",
        yomi: "ポセイドン・ガソリン",
        url: "poseidon-gasoline.html",
        category: "勢力",
        appearance: ["Fallout","Fallout 2"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ポセイドン・オイル",
        yomi: "ポセイドン・オイル",
        url: "poseidon-oil.html",
        category: "勢力",
        appearance: ["Fallout 2"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ポセイドン変電所PX-01",
        yomi: "ポセイドン変電所PX-01",
        url: "poseidon-power-substation-px-01.html",
        category: "ロケーション",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ポセイドン変電所PX-02",
        yomi: "ポセイドン変電所PX-02",
        url: "poseidon-power-substation-px-02.html",
        category: "ロケーション",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ポセイドン変電所 PX-03",
        yomi: "ポセイドン変電所 PX-03",
        url: "poseidon-power-substation-px-03.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ポセイドン変電所 PX-01",
        yomi: "ポセイドン変電所 PX-01",
        url: "poseidon-substation-px-01.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ポセイドン変電所 PX-02",
        yomi: "ポセイドン変電所 PX-02",
        url: "poseidon-substation-px-02.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ポセイドン変電所 PX-03",
        yomi: "ポセイドン変電所 PX-03",
        url: "poseidon-substation-px-03.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ポセイドネット",
        yomi: "ポセイドネット",
        url: "poseidonet.html",
        category: "ロア",
        appearance: ["Fallout 2","Fallout: New Vegas","Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ポトマック川",
        yomi: "ポトマック川",
        url: "potomac-river.html",
        category: "場所",
        appearance: ["Fallout 76","Fallout 3"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ナース・パウエル",
        yomi: "ナース・パウエル",
        url: "powell.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "パワーアーマー",
        yomi: "パワーアーマー",
        url: "power-armor.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "パワーヌードル",
        yomi: "パワーヌードル",
        url: "power-noodles.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "先史時代の骨のキャンプ",
        yomi: "先史時代の骨のキャンプ",
        url: "prehistoric-bones-camp.html",
        category: "ロケーション",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "プレッパーのパイロン天国",
        yomi: "プレッパーのパイロン天国",
        url: "preppers-pylon-paradise.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "プリブロスの骨董品店",
        yomi: "プリブロスの骨董品店",
        url: "priblos-curios.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "プリケッツ砦のキュレーター",
        yomi: "プリケッツ砦のキュレーター",
        url: "pricketts-fort-curator.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "プリケットの砦",
        yomi: "プリケットの砦",
        url: "pricketts-fort.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "プリム",
        yomi: "プリム",
        url: "primm.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Mr. Prize Bot (ミスター・プライズボット)",
        yomi: "Mr. Prize Bot (ミスター・プライズボット)",
        url: "prize_bot.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "プロフェッサーボット",
        yomi: "プロフェッサーボット",
        url: "professor-bot.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Project Paradise",
        yomi: "Project Paradise",
        url: "project-paradise.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "プロスペクト・ヒル",
        yomi: "プロスペクト・ヒル",
        url: "prospect-hill.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "プロテクトロン",
        yomi: "プロテクトロン",
        url: "protectron.html",
        category: "クリーチャー",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "抗議活動のまとめ役",
        yomi: "抗議活動のまとめ役",
        url: "protest-foreperson.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "抗議プラカード",
        yomi: "抗議プラカード",
        url: "protest-placard.html",
        category: "武器",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "プリドゥエン",
        yomi: "プリドゥエン",
        url: "pryduen.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout 4","Fallout 3"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "サイコ",
        yomi: "サイコ",
        url: "psycho.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "PTSアップデート – 2026年1月16日",
        yomi: "PTSアップデート – 2026年1月16日",
        url: "pts-update-january-16-2026.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "パブリックパーティー",
        yomi: "パブリックパーティー",
        url: "public-party.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "パンプキンハウス",
        yomi: "パンプキンハウス",
        url: "pumpkin-house.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "カボチャ",
        yomi: "カボチャ",
        url: "pumpkin.html",
        category: "植物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "パイロン待ち伏せ地点",
        yomi: "パイロン待ち伏せ地点",
        url: "pylon-ambush-site.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "パイロン V-13",
        yomi: "パイロン V-13",
        url: "pylon-v-13.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "pyramind",
        yomi: "pyramind",
        url: "pyramind.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "採石場 X3",
        yomi: "採石場 X3",
        url: "quarry-x3.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クエルクス",
        yomi: "クエルクス",
        url: "quercus.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クインシー採石場",
        yomi: "クインシー採石場",
        url: "quincy-quarries.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クインシー跡地",
        yomi: "クインシー跡地",
        url: "quincy-ruins.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クイン・カーター",
        yomi: "クイン・カーター",
        url: "quinn-carter.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クインタス長老聖職者",
        yomi: "クインタス長老聖職者",
        url: "quintus-tv.html",
        category: "人物",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エルダー・クレリック・クインタス",
        yomi: "エルダー・クレリック・クインタス",
        url: "quintus.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ララ",
        yomi: "ララ",
        url: "ra-ra.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウサギ",
        yomi: "ウサギ",
        url: "rabbit-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Rad-X",
        yomi: "Rad-X",
        url: "rad-x.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "RadAway",
        yomi: "RadAway",
        url: "radaway.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ラッドホッグ",
        yomi: "ラッドホッグ",
        url: "radhog-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ラディアント・ヒルズ",
        yomi: "ラディアント・ヒルズ",
        url: "radiant-hills.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ラッドラット",
        yomi: "ラッドラット",
        url: "radrat-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ラッドローチ",
        yomi: "ラッドローチ",
        url: "radroach-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ラッドスコルピオン",
        yomi: "ラッドスコルピオン",
        url: "radscorpion-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ラッドスタッグ",
        yomi: "ラッドスタッグ",
        url: "radstag-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ラッドトード",
        yomi: "ラッドトード",
        url: "radtoad-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Raf",
        yomi: "Raf",
        url: "raf.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ragnarok",
        yomi: "ragnarok",
        url: "ragnarok.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ラグナルスドッティル少佐",
        yomi: "ラグナルスドッティル少佐",
        url: "ragnarsdottir.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レイダー3",
        yomi: "レイダー3",
        url: "raider-3.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レイダーのトイレと堀",
        yomi: "レイダーのトイレと堀",
        url: "raider-outhouse-and-moat.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "「人生の大半を、あちこちのギャングで育ったよ。<br>\r\n                ここやあそこで。よくある悲しい話さ、俺たちの大半がそうだ。<br>\r\n                でも主に北の方だな。」",
        yomi: "「人生の大半を、あちこちのギャングで育ったよ。<br>\r\n                ここやあそこで。よくある悲しい話さ、俺たちの大半がそうだ。<br>\r\n                でも主に北の方だな。」",
        url: "raider-punk.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Raiders vendor",
        yomi: "Raiders vendor",
        url: "raiders-vendor.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Raiders (レイダー / Fallout 76)",
        yomi: "Raiders (レイダー / Fallout 76)",
        url: "raiders_76.html",
        category: "勢力",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "レールロード本部",
        yomi: "レールロード本部",
        url: "railroad-hq.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "鉄道整備場",
        yomi: "鉄道整備場",
        url: "railroad-service-yard.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Raleigh Clay",
        yomi: "Raleigh Clay",
        url: "raleigh-clay.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ローリー・クレイのバンカー",
        yomi: "ローリー・クレイのバンカー",
        url: "raleigh-clays-bunker.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "randall-clark",
        yomi: "randall-clark",
        url: "randall-clark.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ランディ・キャロウェイ",
        yomi: "ランディ・キャロウェイ",
        url: "randy-calloway.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レンジャーの小屋",
        yomi: "レンジャーの小屋",
        url: "ranger-cabin.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レンジャー管区事務所",
        yomi: "レンジャー管区事務所",
        url: "ranger-district-office.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レンジャー見張り台",
        yomi: "レンジャー見張り台",
        url: "ranger-lookout-bog.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "略奪されたバンカー",
        yomi: "略奪されたバンカー",
        url: "ransacked-bunker.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ラピダン・クリーク",
        yomi: "ラピダン・クリーク",
        url: "rapidan-creek.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Rattler",
        yomi: "Rattler",
        url: "rattler.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ラウル・テハダ",
        yomi: "ラウル・テハダ",
        url: "raul-tejada.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レイ・ゲイリー",
        yomi: "レイ・ゲイリー",
        url: "ray-gary.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Raymond Clark",
        yomi: "Raymond Clark",
        url: "raymond-clark.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レイモンド・プリブロ",
        yomi: "レイモンド・プリブロ",
        url: "raymond-priblo.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レッドデスの島",
        yomi: "レッドデスの島",
        url: "red-death-island.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4 (Far Harbor)"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "赤毛の男",
        yomi: "赤毛の男",
        url: "red-haired-man.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "赤毛の女",
        yomi: "赤毛の女",
        url: "red-haired-woman.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レッド・ルーシー",
        yomi: "レッド・ルーシー",
        url: "red-lucy.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ボグタウンのレッドロケット",
        yomi: "ボグタウンのレッドロケット",
        url: "red-rocket-bog-town.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レッドロケット・給油所",
        yomi: "レッドロケット・給油所",
        url: "red-rocket-filling-station.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レッド・ロケット（フラットウッズ）",
        yomi: "レッド・ロケット（フラットウッズ）",
        url: "red-rocket-flatwoods.html",
        category: "ロケーション",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レッド・ロケット（巨大ティーポット）",
        yomi: "レッド・ロケット（巨大ティーポット）",
        url: "red-rocket-giant-teapot.html",
        category: "ロケーション",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レッドロケット・メガストップ",
        yomi: "レッドロケット・メガストップ",
        url: "red-rocket-mega-stop.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レッド・ロケット（モーガンタウン）",
        yomi: "レッド・ロケット（モーガンタウン）",
        url: "red-rocket-morgantown.html",
        category: "ロケーション",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レッドロケット（荒れた境域）",
        yomi: "レッドロケット（荒れた境域）",
        url: "red-rocket-savage-divide.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レッドロケット（サットン）",
        yomi: "レッドロケット（サットン）",
        url: "red-rocket-sutton.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レッドロケット・トラックストップ",
        yomi: "レッドロケット・トラックストップ",
        url: "red-rocket-truck-stop.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レッドロケット (TVシリーズ)",
        yomi: "レッドロケット (TVシリーズ)",
        url: "red-rocket-tv-series.html",
        category: "場所",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レッドロケット（バレー・ギャレリア）",
        yomi: "レッドロケット（バレー・ギャレリア）",
        url: "red-rocket-valley-galleria.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リーブ・マリーナ",
        yomi: "リーブ・マリーナ",
        url: "reeb-marina.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "反射",
        yomi: "反射",
        url: "reflection.html",
        category: "イベント・現象",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "レグ・マクフィー",
        yomi: "レグ・マクフィー",
        url: "reg-mcphee.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "reginald-rothchild",
        yomi: "reginald-rothchild",
        url: "reginald-rothchild.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レジナルド・\"レグズ\"・ストーン",
        yomi: "レジナルド・\"レグズ\"・ストーン",
        url: "reginald-stone.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Registration guard",
        yomi: "Registration guard",
        url: "registration-guard.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Regular Debbie",
        yomi: "Regular Debbie",
        url: "regular-debbie.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リレータワー DP-B5-21",
        yomi: "リレータワー DP-B5-21",
        url: "relay-tower-dp-b5-21.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リレータワー EL-B1-02",
        yomi: "リレータワー EL-B1-02",
        url: "relay-tower-el-b1-02.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "中継タワーEM-B1-27",
        yomi: "中継タワーEM-B1-27",
        url: "relay-tower-em-b1-27.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "中継塔 HG-B7-09",
        yomi: "中継塔 HG-B7-09",
        url: "relay-tower-hg-b7-09.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リレータワー HN-B1-12",
        yomi: "リレータワー HN-B1-12",
        url: "relay-tower-hn-b1-12.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リレータワー LW-B1-22",
        yomi: "リレータワー LW-B1-22",
        url: "relay-tower-lw-b1-22.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リポーター",
        yomi: "リポーター",
        url: "reporter-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "RESOURCES",
        yomi: "RESOURCES",
        url: "resources.html",
        category: "未分類",
        appearance: [],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Responder courier",
        yomi: "Responder courier",
        url: "responder-courier.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Responder Rocky",
        yomi: "Responder Rocky",
        url: "responder-rocky.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Responders vendor",
        yomi: "Responders vendor",
        url: "responders-vendor.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レスポンダー",
        yomi: "レスポンダー",
        url: "responders.html",
        category: "組織",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ルーベン・ギル",
        yomi: "ルーベン・ギル",
        url: "reuben-gill.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リビア・ビーチ駅",
        yomi: "リビア・ビーチ駅",
        url: "revere-beach-station.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リビア衛星アレイ",
        yomi: "リビア衛星アレイ",
        url: "revere-satellite-array.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "保安官レックス",
        yomi: "保安官レックス",
        url: "rex-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "レックス",
        yomi: "レックス",
        url: "rex.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "R&amp;Gプロセッシング・サービス",
        yomi: "R&amp;Gプロセッシング・サービス",
        url: "rg-processing-services.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リッチ・テイラー",
        yomi: "リッチ・テイラー",
        url: "rich-taylor.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ナイト・ライリー",
        yomi: "ナイト・ライリー",
        url: "riley-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リンク",
        yomi: "リンク",
        url: "rink.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "rip-daring",
        yomi: "rip-daring",
        url: "rip-daring.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リッパー・アレー",
        yomi: "リッパー・アレー",
        url: "ripper-alley.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リプトカ－ド",
        yomi: "リプトカ－ド",
        url: "ripto-card.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "リタ",
        yomi: "リタ",
        url: "rita-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リタ・ウィルコックス",
        yomi: "リタ・ウィルコックス",
        url: "rita-wilcox.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "River Treehouse",
        yomi: "River Treehouse",
        url: "river-treehouse.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リバーサイド・コテージ",
        yomi: "リバーサイド・コテージ",
        url: "riverside-cottage-ash.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リバーサイド・マナー",
        yomi: "リバーサイド・マナー",
        url: "riverside-manor.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "RobCo Auto-Cache #001",
        yomi: "RobCo Auto-Cache #001",
        url: "robco-auto-cache-001.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "RobCo研究センター",
        yomi: "RobCo研究センター",
        url: "robco-research-center.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロバート・ゲインズ",
        yomi: "ロバート・ゲインズ",
        url: "robert-gaines.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロバート・ハウス / ミスター・ハウス",
        yomi: "ロバート・ハウス / ミスター・ハウス",
        url: "robert-house-tv.html",
        category: "人物",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロバート・ハウス (Mr.ハウス)",
        yomi: "ロバート・ハウス (Mr.ハウス)",
        url: "robert-house.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Mr.ハウスの影武者",
        yomi: "Mr.ハウスの影武者",
        url: "robert-houses-double.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "robert-maccready",
        yomi: "robert-maccready",
        url: "robert-maccready.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロバート・オルセン",
        yomi: "ロバート・オルセン",
        url: "robert-olsen.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロバート",
        yomi: "ロバート",
        url: "robert-whitespring.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "警備主任ロビンソン",
        yomi: "警備主任ロビンソン",
        url: "robinson.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロボブレイン",
        yomi: "ロボブレイン",
        url: "robobrain.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ロボット廃棄場",
        yomi: "ロボット廃棄場",
        url: "robotics-disposal-ground.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Robyn the Brute",
        yomi: "Robyn the Brute",
        url: "robyn-the-brute.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Rocco",
        yomi: "Rocco",
        url: "rocco.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Rocksy",
        yomi: "Rocksy",
        url: "rocksy.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キャプテン・ロドリゲス",
        yomi: "キャプテン・ロドリゲス",
        url: "rodriguez.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "High Elder Roger Maxson",
        yomi: "High Elder Roger Maxson",
        url: "roger-maxson.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロリンズ労働キャンプ",
        yomi: "ロリンズ労働キャンプ",
        url: "rollins-labor-camp.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ronald-curtis",
        yomi: "ronald-curtis",
        url: "ronald-curtis.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロンダ・スペンサー",
        yomi: "ロンダ・スペンサー",
        url: "ronda-spencer.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロニー・マクカートリー",
        yomi: "ロニー・マクカートリー",
        url: "ronnie-mccurtry.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロニー",
        yomi: "ロニー",
        url: "ronnie.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ロンニー",
        yomi: "ロンニー",
        url: "ronny-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ルーファス",
        yomi: "ルーファス",
        url: "roofus.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ローパー",
        yomi: "ローパー",
        url: "roper.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロザリン・ジェフリーズ",
        yomi: "ロザリン・ジェフリーズ",
        url: "rosalynn-jeffries.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Rose",
        yomi: "Rose",
        url: "rose-fallout-76.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ローズ・マクレーン",
        yomi: "ローズ・マクレーン",
        url: "rose-maclean.html",
        category: "人物",
        appearance: ["Fallout TV series"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ローズ・オブ・シャロン・キャシディ",
        yomi: "ローズ・オブ・シャロン・キャシディ",
        url: "rose-of-sharon-cassidy.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Rover",
        yomi: "Rover",
        url: "rover.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Roy Lopez",
        yomi: "Roy Lopez",
        url: "roy-lopez.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロイ・フィリップス",
        yomi: "ロイ・フィリップス",
        url: "roy-phillips.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロイ・スペンサー",
        yomi: "ロイ・スペンサー",
        url: "roy-spencer.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Rucker",
        yomi: "Rucker",
        url: "rucker.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Rudy Fernandez",
        yomi: "Rudy Fernandez",
        url: "rudy-fernandez.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Ruggy",
        yomi: "Ruggy",
        url: "ruggy.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "さびれた町 (Run-down town)",
        yomi: "さびれた町 (Run-down town)",
        url: "run-down-town.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ラント（シュケト）",
        yomi: "ラント（シュケト）",
        url: "runt.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Russell Dorsey",
        yomi: "Russell Dorsey",
        url: "russell-dorsey.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ザ・サクラメント",
        yomi: "ザ・サクラメント",
        url: "sacrament.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "聖別の空地",
        yomi: "聖別の空地",
        url: "sacramental-glade.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "聖なる書物",
        yomi: "聖なる書物",
        url: "sacred-writings.html",
        category: "武器",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "生贄の祭壇",
        yomi: "生贄の祭壇",
        url: "sacrifice-altar.html",
        category: "ロケーション",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サファリアドベンチャー",
        yomi: "サファリアドベンチャー",
        url: "safari-adventure.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "セーフ・アンド・クリーン廃棄場",
        yomi: "セーフ・アンド・クリーン廃棄場",
        url: "safe-n-clean-disposal.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "金庫破りの小屋",
        yomi: "金庫破りの小屋",
        url: "safecrackers-shack.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Sage",
        yomi: "Sage",
        url: "sage.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サレム",
        yomi: "サレム",
        url: "salem.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サルのグラインダーズ",
        yomi: "サルのグラインダーズ",
        url: "sals-grinders.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サミュエル・ブラックウェル",
        yomi: "サミュエル・ブラックウェル",
        url: "sam-blackwell.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サム・ブラックウェルのバンカー",
        yomi: "サム・ブラックウェルのバンカー",
        url: "sam-blackwells-bunker.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "「お前が言ってたこと、考えてたんだ。<br>\r\n                俺が生きてるのは運がいいって話。<br>\r\n                間違ってはいない。<br>\r\n                でも、完全に正しくもない。<br>\r\n                俺だって努力してきたんだ。」",
        yomi: "「お前が言ってたこと、考えてたんだ。<br>\r\n                俺が生きてるのは運がいいって話。<br>\r\n                間違ってはいない。<br>\r\n                でも、完全に正しくもない。<br>\r\n                俺だって努力してきたんだ。」",
        url: "sam-nguyen.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サミュエル・ハッカーマン",
        yomi: "サミュエル・ハッカーマン",
        url: "samuel-hackerman.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Samuel",
        yomi: "Samuel",
        url: "samuel-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "samureye",
        yomi: "samureye",
        url: "samureye.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サンクチュアリ・ヒルズ",
        yomi: "サンクチュアリ・ヒルズ",
        url: "sanctuary-hills.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サンド・フォーク製材所",
        yomi: "サンド・フォーク製材所",
        url: "sand-fork-lumber.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サンドラ",
        yomi: "サンドラ",
        url: "sandra-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サンディ・コーヴス・コンヴァレッセント・ホーム",
        yomi: "サンディ・コーヴス・コンヴァレッセント・ホーム",
        url: "sandy-coves-convalescent-home.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サンディーズ・ソック・ホップ",
        yomi: "サンディーズ・ソック・ホップ",
        url: "sandys-sock-hop.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サンジェイ・クマール",
        yomi: "サンジェイ・クマール",
        url: "sanjay-kumar.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サンタモニカ・ピア",
        yomi: "サンタモニカ・ピア",
        url: "santa-monica-pier.html",
        category: "場所",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サンタモニカ",
        yomi: "サンタモニカ",
        url: "santa-monica.html",
        category: "場所",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Sara Matthews",
        yomi: "Sara Matthews",
        url: "sara-matthews.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サラ・サミール",
        yomi: "サラ・サミール",
        url: "sara-samir.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サラ・クレメンツ",
        yomi: "サラ・クレメンツ",
        url: "sarah-clements.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サラ・リオンズ",
        yomi: "サラ・リオンズ",
        url: "sarah-lyons.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サラ・ワイントローブ",
        yomi: "サラ・ワイントローブ",
        url: "sarah-weintraub.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サルジェント",
        yomi: "サルジェント",
        url: "sargento.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サターナイト・フィスト",
        yomi: "サターナイト・フィスト",
        url: "saturnite-fist.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "サウガス製鉄所",
        yomi: "サウガス製鉄所",
        url: "saugus-ironworks.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スカーレット・メドウズ・コテージ",
        yomi: "スカーレット・メドウズ・コテージ",
        url: "scarlett-meadows-cottage.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スカベンジャー",
        yomi: "スカベンジャー",
        url: "scavenger-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シーニック展望台",
        yomi: "シーニック展望台",
        url: "scenic-overlook.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スクートの小屋",
        yomi: "スクートの小屋",
        url: "scoots-shack.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スコーチ",
        yomi: "スコーチ",
        url: "scorch.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "スコーチビースト",
        yomi: "スコーチビースト",
        url: "scorchbeast-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スコーチビースト・クイーン",
        yomi: "スコーチビースト・クイーン",
        url: "scorchbeast-queen.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Scott Conroy",
        yomi: "Scott Conroy",
        url: "scott-conroy.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スコット・マリッシュ",
        yomi: "スコット・マリッシュ",
        url: "scott-malish.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スコット・シェパード（ナース・スコット）",
        yomi: "スコット・シェパード（ナース・スコット）",
        url: "scott-shepherd.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スコット・ターナー",
        yomi: "スコット・ターナー",
        url: "scott-turner.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スクライブ",
        yomi: "スクライブ",
        url: "scribe-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "セバスチャン・レスリー",
        yomi: "セバスチャン・レスリー",
        url: "sebastian-leslie.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "人里離れた洞窟",
        yomi: "人里離れた洞窟",
        url: "secluded-cave.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シークレットサービスのエージェント",
        yomi: "シークレットサービスのエージェント",
        url: "secret-service-agent.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シーカー・オブ・ミステリー",
        yomi: "シーカー・オブ・ミステリー",
        url: "seeker-of-mysteries.html",
        category: "クエスト",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "セネカ・ギャング・キャンプ",
        yomi: "セネカ・ギャング・キャンプ",
        url: "seneca-gang-camp.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "セネカ・ロックス・ビジターセンター",
        yomi: "セネカ・ロックス・ビジターセンター",
        url: "seneca-rocks-visitor-center.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "セネカ・ロックス",
        yomi: "セネカ・ロックス",
        url: "seneca-rocks.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "センチネルサイト",
        yomi: "センチネルサイト",
        url: "sentinel-site.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "セントリーボット",
        yomi: "セントリーボット",
        url: "sentry-bot.html",
        category: "人物",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "入植者のコテージとバンカー",
        yomi: "入植者のコテージとバンカー",
        url: "settler-cottage-bunker.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "「ビンゴ！ 当たりが出たぞ、みんな！<br>\r\n                見てくれよ。俺のことを知ってる奴がいた！<br>\r\n                いつかこうなると思ってたんだ。」",
        yomi: "「ビンゴ！ 当たりが出たぞ、みんな！<br>\r\n                見てくれよ。俺のことを知ってる奴がいた！<br>\r\n                いつかこうなると思ってたんだ。」",
        url: "settler-forager.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "入植者のリッジ",
        yomi: "入植者のリッジ",
        url: "settler-s-ridge.html",
        category: "勢力",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "「ねえ、忘れがちだけど、私たちは恵まれてるのよ。<br>\r\n                たくさんの人が生き残れなかった。だから…小さなことに感謝しましょう。」",
        yomi: "「ねえ、忘れがちだけど、私たちは恵まれてるのよ。<br>\r\n                たくさんの人が生き残れなかった。だから…小さなことに感謝しましょう。」",
        url: "settler-wanderer.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "セトラーズリッジ",
        yomi: "セトラーズリッジ",
        url: "settlers-ridge.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シェイド・ヒル教会",
        yomi: "シェイド・ヒル教会",
        url: "shade-hill-church.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シャドウブリーズ・アパート",
        yomi: "シャドウブリーズ・アパート",
        url: "shadowbreeze-apartments.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "謎の施設",
        yomi: "謎の施設",
        url: "shadowy-facility.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シェイディ・サンズの市民",
        yomi: "シェイディ・サンズの市民",
        url: "shady-sands-citizen-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シェイディ・サンズ市民センター",
        yomi: "シェイディ・サンズ市民センター",
        url: "shady-sands-civic-center.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シェイディ・サンズ裁判所",
        yomi: "シェイディ・サンズ裁判所",
        url: "shady-sands-courthouse.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シェイディ・サンズ小学校",
        yomi: "シェイディ・サンズ小学校",
        url: "shady-sands-elementary-school.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シェイディ・サンズの農民",
        yomi: "シェイディ・サンズの農民",
        url: "shady-sands-farmer.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シェイディ・サンズ公共図書館",
        yomi: "シェイディ・サンズ公共図書館",
        url: "shady-sands-public-library.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シェイディ・サンズ",
        yomi: "シェイディ・サンズ",
        url: "shady-sands.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "シャノン・リバーズ",
        yomi: "シャノン・リバーズ",
        url: "shannon-rivers.html",
        category: "キャラクター",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ショウ・ハイスクール",
        yomi: "ショウ・ハイスクール",
        url: "shaw-high-school.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ショーン・アーロンホルト",
        yomi: "ショーン・アーロンホルト",
        url: "shawn-aaronholt.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ショーン・ホックマン",
        yomi: "ショーン・ホックマン",
        url: "shawn-hockman.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シーナ",
        yomi: "シーナ",
        url: "sheena.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シェリー",
        yomi: "シェリー",
        url: "shelley-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シェルター受付センター",
        yomi: "シェルター受付センター",
        url: "shelter-reception-center.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "シェナンドー国立公園",
        yomi: "シェナンドー国立公園",
        url: "shenandoah-national-park.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Shenandoah River",
        yomi: "Shenandoah River",
        url: "shenandoah-river.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "保安官（ガバミント）",
        yomi: "保安官（ガバミント）",
        url: "sheriff-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シャーマン",
        yomi: "シャーマン",
        url: "sherman-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "上半身裸のレイダー",
        yomi: "上半身裸のレイダー",
        url: "shirtless-raider.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "店主サイモン",
        yomi: "店主サイモン",
        url: "shopkeep-simon.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ショッピングモール・ベンダー",
        yomi: "ショッピングモール・ベンダー",
        url: "shopping-mall-vendor.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ショートサイト士官",
        yomi: "ショートサイト士官",
        url: "shortsight-tv.html",
        category: "人物",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ショートサイト",
        yomi: "ショートサイト",
        url: "shortsight.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ショットガン・ジェフ",
        yomi: "ショットガン・ジェフ",
        url: "shotgun-jeff.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シュラプネル",
        yomi: "シュラプネル",
        url: "shrapnel.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シドニー",
        yomi: "シドニー",
        url: "sidney.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シエラ・ペトロビタ",
        yomi: "シエラ・ペトロビタ",
        url: "sierra-petrovita.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シギ・ウィルギグ博士",
        yomi: "シギ・ウィルギグ博士",
        url: "siggi-wilzig.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サイロ補給小屋",
        yomi: "サイロ補給小屋",
        url: "silo-supply-shed.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サイラス",
        yomi: "サイラス",
        url: "silus.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シルバ農家",
        yomi: "シルバ農家",
        url: "silva-homestead.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シルバーラッシュ (Silver Rush)",
        yomi: "シルバーラッシュ (Silver Rush)",
        url: "silver-rush.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "silver-shroud",
        yomi: "silver-shroud",
        url: "silver-shroud.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Single action revolver",
        yomi: "Single action revolver",
        url: "single-action-revolver.html",
        category: "武器",
        appearance: ["Fallout 76","Fallout TV series"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "シンク中央知能ユニット",
        yomi: "シンク中央知能ユニット",
        url: "sink-central-intelligence-unit.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "中米戦争",
        yomi: "中米戦争",
        url: "sino-american-war.html",
        category: "イベント",
        appearance: ["Fallout シリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サイト・アルファ",
        yomi: "サイト・アルファ",
        url: "site-alpha.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サイト・ブラボー",
        yomi: "サイト・ブラボー",
        url: "site-bravo.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サイト・チャーリー",
        yomi: "サイト・チャーリー",
        url: "site-charlie.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スケルトン・ラフト",
        yomi: "スケルトン・ラフト",
        url: "skeleton-raft.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スキーリフト・ベースキャンプ",
        yomi: "スキーリフト・ベースキャンプ",
        url: "ski-lift-base-camp.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スキーリフト",
        yomi: "スキーリフト",
        url: "ski-lift.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スキッピー・ローリッチ",
        yomi: "スキッピー・ローリッチ",
        url: "skippy-roerich.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スカルボーン・ヴァンテージ",
        yomi: "スカルボーン・ヴァンテージ",
        url: "skullbone-vantage.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スカイライン・ドライブ：入り口",
        yomi: "スカイライン・ドライブ：入り口",
        url: "skyline-drive-entrance.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スカイライン・ドライブ",
        yomi: "スカイライン・ドライブ",
        url: "skyline-drive.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "中傷ボット",
        yomi: "中傷ボット",
        url: "slander-bot.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "スリム",
        yomi: "スリム",
        url: "slim-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "喉を掻き切られた犠牲者",
        yomi: "喉を掻き切られた犠牲者",
        url: "slit-throat-victim.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スローカム・ジョー [企業]",
        yomi: "スローカム・ジョー [企業]",
        url: "slocum-joe-corporate.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout 4","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "スローカム・ジョー",
        yomi: "スローカム・ジョー",
        url: "slocum-joe.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "スロッカムズ・ジョー（チャールストン店）",
        yomi: "スロッカムズ・ジョー（チャールストン店）",
        url: "slocums-joe-charleston.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スローカムズ・ジョー本社",
        yomi: "スローカムズ・ジョー本社",
        url: "slocums-joe-corporate-hq.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スローカムズ・ジョー",
        yomi: "スローカムズ・ジョー",
        url: "slocums-joe-fo76.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スローカムズ・ジョー（ワトガ店舗）",
        yomi: "スローカムズ・ジョー（ワトガ店舗）",
        url: "slocums-joe-watoga.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スラッジ・トレーラー",
        yomi: "スラッジ・トレーラー",
        url: "sludge-trailer.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スラリー・ラン",
        yomi: "スラリー・ラン",
        url: "slurry-run.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スマイリー",
        yomi: "スマイリー",
        url: "smiley-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スマイリング・マン（イングリッド・コールド）",
        yomi: "スマイリング・マン（イングリッド・コールド）",
        url: "smiling-man.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スミス農場",
        yomi: "スミス農場",
        url: "smith-farm.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "胡散臭いセールスマン",
        yomi: "胡散臭いセールスマン",
        url: "snake-oil-salesman.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スナリーギャスター",
        yomi: "スナリーギャスター",
        url: "snallygaster-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "石鹸",
        yomi: "石鹸",
        url: "soap.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "石鹸まみれの骸骨",
        yomi: "石鹸まみれの骸骨",
        url: "soapy-skeleton.html",
        category: "ロケーション",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Single-Operation Direction and Utility System",
        yomi: "Single-Operation Direction and Utility System",
        url: "sodus.html",
        category: "キャラクター",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "「私は…たくさん聞きたいことがある。ただ…どうして？なぜ？<br>\r\n                みんなにお別れを言っていたのに…本当にみんないなくなったの。<br>\r\n                放送の断片から…ある程度は何が起きたか理解したつもり。たぶん…戦争だったのね。<br>\r\n                そしてどういうわけか…これが生き残った世界。今は言葉にすらできないわ。」",
        yomi: "「私は…たくさん聞きたいことがある。ただ…どうして？なぜ？<br>\r\n                みんなにお別れを言っていたのに…本当にみんないなくなったの。<br>\r\n                放送の断片から…ある程度は何が起きたか理解したつもり。たぶん…戦争だったのね。<br>\r\n                そしてどういうわけか…これが生き残った世界。今は言葉にすらできないわ。」",
        url: "sofia-daguerre.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Sofie Yates",
        yomi: "Sofie Yates",
        url: "sofie-yates.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Soggy Bottom",
        yomi: "Soggy Bottom",
        url: "soggy-bottom.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ソル",
        yomi: "ソル",
        url: "sol.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "「実を言うと、俺は長い長い医者の家系の出だ…でも育ってく中で、それが身につかなかった。学校に興味を失くして、成績も取れなかった。軍なら自分が何かを変えられる場所だと思って、高校を出てすぐに入隊したんだ。」<br>\r\n                <span style=\"font-size: 0.85em; color: #888;\">— ソロモン・ハーディ</span>",
        yomi: "「実を言うと、俺は長い長い医者の家系の出だ…でも育ってく中で、それが身につかなかった。学校に興味を失くして、成績も取れなかった。軍なら自分が何かを変えられる場所だと思って、高校を出てすぐに入隊したんだ。」<br>\r\n                <span style=\"font-size: 0.85em; color: #888;\">— ソロモン・ハーディ</span>",
        url: "solomon-hardy.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サマービル・プレイス",
        yomi: "サマービル・プレイス",
        url: "somerville-place.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ソニーズ・サンドリーズ",
        yomi: "ソニーズ・サンドリーズ",
        url: "sonny-s-sundries.html",
        category: "場所",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ソニー",
        yomi: "ソニー",
        url: "sonny.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サンズ・オブ・デーン・コンパウンド",
        yomi: "サンズ・オブ・デーン・コンパウンド",
        url: "sons-of-dane-compound.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ソフィー・ワゴナー",
        yomi: "ソフィー・ワゴナー",
        url: "sophie-wagoner.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ソレル・ブッカー",
        yomi: "ソレル・ブッカー",
        url: "sorrel-booker.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "南ボストン軍防衛線",
        yomi: "南ボストン軍防衛線",
        url: "south-boston-military-checkpoint.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "南カットスロートのキャンプ",
        yomi: "南カットスロートのキャンプ",
        url: "south-cutthroat-camp.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "South Mountain Lookout",
        yomi: "South Mountain Lookout",
        url: "south-mountain-lookout.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "South Mountain Nuke Crater",
        yomi: "South Mountain Nuke Crater",
        url: "south-mountain-nuke-crater.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "南オハイオ避難センター",
        yomi: "南オハイオ避難センター",
        url: "south-ohio-evacuation-center.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サウス・ロード・ブリッジ",
        yomi: "サウス・ロード・ブリッジ",
        url: "south-road-bridge.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サウスサイド・ブリッジ",
        yomi: "サウスサイド・ブリッジ",
        url: "south-side-bridge.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サザン・ベル・モーテル",
        yomi: "サザン・ベル・モーテル",
        url: "southern-belle-motel.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サウサンプトン・エステート",
        yomi: "サウサンプトン・エステート",
        url: "southhampton-estate.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ソビエトの人工衛星",
        yomi: "ソビエトの人工衛星",
        url: "soviet-satellite.html",
        category: "場所",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "まばらなサンデュー叢",
        yomi: "まばらなサンデュー叢",
        url: "sparse-sundew-grove.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "SPECIAL",
        yomi: "SPECIAL",
        url: "special.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout 4","Fallout 3"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "スペクタクル・アイランド",
        yomi: "スペクタクル・アイランド",
        url: "spectacle-island.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "見物人（Vault-Tec）",
        yomi: "見物人（Vault-Tec）",
        url: "spectator.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スペンサー邸",
        yomi: "スペンサー邸",
        url: "spencer-residence.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Splint",
        yomi: "Splint",
        url: "splint.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スプリングヒル・ゴルフコース",
        yomi: "スプリングヒル・ゴルフコース",
        url: "springhill-golf-course.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スプルース・ノブ水路",
        yomi: "スプルース・ノブ水路",
        url: "spruce-knob-channels.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Spruce Knob Lake",
        yomi: "Spruce Knob Lake",
        url: "spruce-knob-lake.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スプルース・ノブ・ワークショップ",
        yomi: "スプルース・ノブ・ワークショップ",
        url: "spruce-knob-workshop.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スプルース・ノブ",
        yomi: "スプルース・ノブ",
        url: "spruce-knob.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スクワイア（Fallout TV）",
        yomi: "スクワイア（Fallout TV）",
        url: "squire-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "リス",
        yomi: "リス",
        url: "squirrel-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スクワール",
        yomi: "スクワール",
        url: "squirrel-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "刺されたリージョナリー",
        yomi: "刺されたリージョナリー",
        url: "stabbed-legionary.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スタニスラウス・ブラウン",
        yomi: "スタニスラウス・ブラウン",
        url: "stanislaus-braun.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スターパラディン・クロス",
        yomi: "スターパラディン・クロス",
        url: "star-paladin-cross.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Star",
        yomi: "Star",
        url: "star.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スターライト・ドライブイン",
        yomi: "スターライト・ドライブイン",
        url: "starlight-drive-in-bs.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スターライト・ドライブイン劇場 (TVシリーズ)",
        yomi: "スターライト・ドライブイン劇場 (TVシリーズ)",
        url: "starlight-drive-in-theatre-tv-series.html",
        category: "場所",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スターライト・ドライブイン",
        yomi: "スターライト・ドライブイン",
        url: "starlight-drive-in.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ステルス・ボーイ",
        yomi: "ステルス・ボーイ",
        url: "stealth-boy.html",
        category: "アイテム",
        appearance: ["Fallout シリーズ"],
        date: "2026-05-04",
        status: "published"
    },
    {
        name: "ステルス技術",
        yomi: "ステルス技術",
        url: "stealth-technology.html",
        category: "テクノロジー",
        appearance: ["Fallout シリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スティールハート",
        yomi: "スティールハート",
        url: "steelheart.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ステフ・ハーパー",
        yomi: "ステフ・ハーパー",
        url: "steph-harper.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スティーブン・ウィンスロップ",
        yomi: "スティーブン・ウィンスロップ",
        url: "stephen-winthrop.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "「あぁ、傲慢さの話か。俺たちには、太陽に近づきすぎて翼を焼いた蛾の物語がある。どうやらあいつも同じ結末を迎えたようだな、偽りの神と共に。」<br>\r\n                <span style=\"font-size: 0.85em; color: #888;\">— スティーヴン・スカーベリー</span>",
        yomi: "「あぁ、傲慢さの話か。俺たちには、太陽に近づきすぎて翼を焼いた蛾の物語がある。どうやらあいつも同じ結末を迎えたようだな、偽りの神と共に。」<br>\r\n                <span style=\"font-size: 0.85em; color: #888;\">— スティーヴン・スカーベリー</span>",
        url: "steven-scarberry.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スティッキー",
        yomi: "スティッキー",
        url: "sticky.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スティムパック",
        yomi: "スティムパック",
        url: "stim-pack.html",
        category: "アイテム",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "スティングウィング",
        yomi: "スティングウィング",
        url: "stingwing-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ストーニー・クリーク駅",
        yomi: "ストーニー・クリーク駅",
        url: "stony-creek-station.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ストラングラー・ハート",
        yomi: "ストラングラー・ハート",
        url: "strangler-heart-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ストラトフォード",
        yomi: "ストラトフォード",
        url: "stratford.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ストリート・ハスラー",
        yomi: "ストリート・ハスラー",
        url: "street-hustler.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ストライカー・ロウ",
        yomi: "ストライカー・ロウ",
        url: "striker-row.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ストロング",
        yomi: "ストロング",
        url: "strong.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ストラウズ・ラン州立公園",
        yomi: "ストラウズ・ラン州立公園",
        url: "strouds-run-state-park.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Stuart's Department Store",
        yomi: "Stuart's Department Store",
        url: "stuarts-department-store.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "被験体476",
        yomi: "被験体476",
        url: "subject-476.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サフォーク郡チャータースクール",
        yomi: "サフォーク郡チャータースクール",
        url: "suffolk-county-charter-school.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シュガーボム",
        yomi: "シュガーボム",
        url: "sugar-bomb.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "シュガー・グローブ",
        yomi: "シュガー・グローブ",
        url: "sugar-grove.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シュガーメイプル",
        yomi: "シュガーメイプル",
        url: "sugarmaple.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サマーズビル・ダム",
        yomi: "サマーズビル・ダム",
        url: "summersville-dam.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サマーズヴィル・ドック",
        yomi: "サマーズヴィル・ドック",
        url: "summersville-docks.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サマーズビル湖",
        yomi: "サマーズビル湖",
        url: "summersville-lake.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サマーズビル",
        yomi: "サマーズビル",
        url: "summersville.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "サミット・オブ・ザ・ワールド",
        yomi: "サミット・オブ・ザ・ワールド",
        url: "summit-of-the-world.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "日焼けした男",
        yomi: "日焼けした男",
        url: "sunburned-man.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サンデー兄弟のキャビン",
        yomi: "サンデー兄弟のキャビン",
        url: "sunday-brothers-cabin.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "沈んだ教会",
        yomi: "沈んだ教会",
        url: "sunken-church.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サニー",
        yomi: "サニー",
        url: "sunny-steel-dawn.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Sunny",
        yomi: "Sunny",
        url: "sunny-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サニートップ・ベースロッジ",
        yomi: "サニートップ・ベースロッジ",
        url: "sunnytop-ski-lanes-base-lodge.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サニートップ・スキーレーン",
        yomi: "サニートップ・スキーレーン",
        url: "sunnytop-ski-lanes.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サニートップ駅",
        yomi: "サニートップ駅",
        url: "sunnytop-station.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サンライズ・フィールド",
        yomi: "サンライズ・フィールド",
        url: "sunrise-field.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サンセット・サルサパリラ・ファクトリー",
        yomi: "サンセット・サルサパリラ・ファクトリー",
        url: "sunset-sarsaparilla-factory.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サンセット・サルサパリラ",
        yomi: "サンセット・サルサパリラ",
        url: "sunset-sarsaparilla.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "サンシャイン・メドウズ工業農場",
        yomi: "サンシャイン・メドウズ工業農場",
        url: "sunshine-meadows-farm.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サンシャイン・メドウズ工業農場",
        yomi: "サンシャイン・メドウズ工業農場",
        url: "sunshine-meadows-industrial-farm.html",
        category: "ロケーション",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サンシャイン・タイディングスCo-op",
        yomi: "サンシャイン・タイディングスCo-op",
        url: "sunshine-tidings-co-op.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スーパー・デューパー・マート",
        yomi: "スーパー・デューパー・マート",
        url: "super-duper-mart-bs.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Super-Duper Mart (Morgantown)",
        yomi: "Super-Duper Mart (Morgantown)",
        url: "super-duper-mart-morgantown.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スーパーウルトラ・マーケット (TVシリーズ)",
        yomi: "スーパーウルトラ・マーケット (TVシリーズ)",
        url: "super-duper-mart-tv-series.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スーパーデューパーマート（ワトガ）",
        yomi: "スーパーデューパーマート（ワトガ）",
        url: "super-duper-mart-watoga.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スーパーウルトラ・マーケット",
        yomi: "スーパーウルトラ・マーケット",
        url: "super-duper-mart.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スーパーミュータント・ベヒモス",
        yomi: "スーパーミュータント・ベヒモス",
        url: "super-mutant-behemoth-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スーパーミュータント",
        yomi: "スーパーミュータント",
        url: "super-mutant.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "スーペリア・サンセット農場",
        yomi: "スーペリア・サンセット農場",
        url: "superior-sunset-farm.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "監督官チャッティンガム",
        yomi: "監督官チャッティンガム",
        url: "supervisor-chattingham.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "監督官ダンフォース",
        yomi: "監督官ダンフォース",
        url: "supervisor-danforth.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "監督官ウェリントン",
        yomi: "監督官ウェリントン",
        url: "supervisor-wellington.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サージ",
        yomi: "サージ",
        url: "surge.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Surly's Shack",
        yomi: "Surly's Shack",
        url: "surlys-shack.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "測量キャンプ・アルファ",
        yomi: "測量キャンプ・アルファ",
        url: "survey-camp-alpha.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サバイバルテント",
        yomi: "サバイバルテント",
        url: "survival-tent.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "スーザンの小屋",
        yomi: "スーザンの小屋",
        url: "susan-s-cabin.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "サットン駅",
        yomi: "サットン駅",
        url: "sutton-station.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サットン",
        yomi: "サットン",
        url: "sutton.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "パラディン・スワフォード",
        yomi: "パラディン・スワフォード",
        url: "swafford-brotherhood.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スワンク",
        yomi: "スワンク",
        url: "swank.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "蜂の群れ",
        yomi: "蜂の群れ",
        url: "swarm-of-bees.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "スウィートウォータースペシャルブレンド",
        yomi: "スウィートウォータースペシャルブレンド",
        url: "sweetwater-special-blend.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ソードハンターズ・キャンプ",
        yomi: "ソードハンターズ・キャンプ",
        url: "sword-hunters-camp.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シドニー",
        yomi: "シドニー",
        url: "sydney.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シルベスター・テイト",
        yomi: "シルベスター・テイト",
        url: "sylvester-tate.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シルヴィ＆サンズ伐採キャンプ",
        yomi: "シルヴィ＆サンズ伐採キャンプ",
        url: "sylvie-and-sons-logging-camp.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "T. Harper",
        yomi: "T. Harper",
        url: "t-harper.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "タッド・チャンス",
        yomi: "タッド・チャンス",
        url: "tad-chance.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "タフィントン・ボートハウス",
        yomi: "タフィントン・ボートハウス",
        url: "taffington-boathouse.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "タリー・ラング",
        yomi: "タリー・ラング",
        url: "tally-lang.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "タナグラ・タウン",
        yomi: "タナグラ・タウン",
        url: "tanagra-town.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Tandi (タンディ)",
        yomi: "Tandi (タンディ)",
        url: "tandi.html",
        category: "人物",
        appearance: ["Fallout","Fallout 2"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "タンニン",
        yomi: "タンニン",
        url: "tannin.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "タトゥーパーラー",
        yomi: "タトゥーパーラー",
        url: "tattoo-parlor.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "タチアナ・リー",
        yomi: "タチアナ・リー",
        url: "tatyana-lee.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "テッド・ウィルソン",
        yomi: "テッド・ウィルソン",
        url: "ted-wilson.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "テディベアの家",
        yomi: "テディベアの家",
        url: "teddy-bear-house.html",
        category: "ロケーション",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "テレビ司会者",
        yomi: "テレビ司会者",
        url: "television-host.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "テンパインズの断崖",
        yomi: "テンパインズの断崖",
        url: "tenpines-bluff.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ナイト・\"テックス\"・ロジャース",
        yomi: "ナイト・\"テックス\"・ロジャース",
        url: "tex-rogers.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サデウスの子分",
        yomi: "サデウスの子分",
        url: "thaddeus-minion.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サディアス",
        yomi: "サディアス",
        url: "thaddeus-tv.html",
        category: "人物",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サデウス",
        yomi: "サデウス",
        url: "thaddeus.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベックリーの獣",
        yomi: "ベックリーの獣",
        url: "the-beast-of-beckley.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "The Big Bloom",
        yomi: "The Big Bloom",
        url: "the-big-bloom.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ブラッド",
        yomi: "ブラッド",
        url: "the-blood.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ザ・ボス",
        yomi: "ザ・ボス",
        url: "the-boss.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ザ・バウンティ",
        yomi: "ザ・バウンティ",
        url: "the-bounty.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ブラウン・ハウス",
        yomi: "ブラウン・ハウス",
        url: "the-brown-house.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ザ・ブレングルーベ",
        yomi: "ザ・ブレングルーベ",
        url: "the-bullengrube.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バーニング・マイン",
        yomi: "バーニング・マイン",
        url: "the-burning-mine.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ザ・バロウズ",
        yomi: "ザ・バロウズ",
        url: "the-burrows.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "キャッスル",
        yomi: "キャッスル",
        url: "the-castle.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ザ・チョップ・ショップ",
        yomi: "ザ・チョップ・ショップ",
        url: "the-chop-shop-bs.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ザ・クープ",
        yomi: "ザ・クープ",
        url: "the-coop.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ザ・コア",
        yomi: "ザ・コア",
        url: "the-core.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "クレーター作戦室",
        yomi: "クレーター作戦室",
        url: "the-crater-war-room.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ザ・クレーター",
        yomi: "ザ・クレーター",
        url: "the-crater.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ザ・クロスヘア",
        yomi: "ザ・クロスヘア",
        url: "the-crosshair.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ザ・ディープ",
        yomi: "ザ・ディープ",
        url: "the-deep.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "the-diabolicals",
        yomi: "the-diabolicals",
        url: "the-diabolicals.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "使者",
        yomi: "使者",
        url: "the-emissary.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "エグゼクティブ（トニー）",
        yomi: "エグゼクティブ（トニー）",
        url: "the-exec.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "The Eye",
        yomi: "The Eye",
        url: "the-eye.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "フィッシャーマン",
        yomi: "フィッシャーマン",
        url: "the-fisherman.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "森林地帯",
        yomi: "森林地帯",
        url: "the-forest.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ザ・フリークショー",
        yomi: "ザ・フリークショー",
        url: "the-freak-show.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ガントレット",
        yomi: "ガントレット",
        url: "the-gauntlet-nuka-world.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジェネラルのステーキハウス",
        yomi: "ジェネラルのステーキハウス",
        url: "the-generals-steakhouse.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グールの墓",
        yomi: "グールの墓",
        url: "the-ghoul-s-grave.html",
        category: "場所",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グール（クーパー・ハワード）",
        yomi: "グール（クーパー・ハワード）",
        url: "the-ghoul.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "巨大ティーポット",
        yomi: "巨大ティーポット",
        url: "the-giant-teapot.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "グウィネット・レストラン",
        yomi: "グウィネット・レストラン",
        url: "the-gwinnett-restaurant.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "the-inspector",
        yomi: "the-inspector",
        url: "the-inspector.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "インスティチュート",
        yomi: "インスティチュート",
        url: "the-institute.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジ・インターローパー",
        yomi: "ジ・インターローパー",
        url: "the-interloper.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "島 (ファー・ハーバー)",
        yomi: "島 (ファー・ハーバー)",
        url: "the-island.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4 (Far Harbor)"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ザ・キルボックス",
        yomi: "ザ・キルボックス",
        url: "the-kill-box.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ザ・キング",
        yomi: "ザ・キング",
        url: "the-king.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "メカニストの隠れ家",
        yomi: "メカニストの隠れ家",
        url: "the-mechanists-lair.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マイア",
        yomi: "マイア",
        url: "the-mire.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ザ・ミストレス・オブ・ミステリー",
        yomi: "ザ・ミストレス・オブ・ミステリー",
        url: "the-mistress-of-mystery.html",
        category: "クエスト",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "マザーロード",
        yomi: "マザーロード",
        url: "the-motherlode-robot.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "The Mothman Equinox",
        yomi: "The Mothman Equinox",
        url: "the-mothman-equinox.html",
        category: "イベント・現象",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ニュークリアス",
        yomi: "ニュークリアス",
        url: "the-nucleus.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヌカシャイン",
        yomi: "ヌカシャイン",
        url: "the-nukashine.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "The Pigsty",
        yomi: "The Pigsty",
        url: "the-pigsty.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "The Pitt",
        yomi: "The Pitt",
        url: "the-pitt.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "プリドゥエン",
        yomi: "プリドゥエン",
        url: "the-prydwen.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ザ・リトリート",
        yomi: "ザ・リトリート",
        url: "the-retreat.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "The Rust King",
        yomi: "The Rust King",
        url: "the-rust-king.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ラスト・キングダム",
        yomi: "ラスト・キングダム",
        url: "the-rust-kingdom.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ラスティ・ピック",
        yomi: "ラスティ・ピック",
        url: "the-rusty-pick.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シャムロック酒場",
        yomi: "シャムロック酒場",
        url: "the-shamrock-taphouse.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スロッグ",
        yomi: "スロッグ",
        url: "the-slog.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スラッジ・ホール",
        yomi: "スラッジ・ホール",
        url: "the-sludge-hole.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ザ・スラッジ・ワークス",
        yomi: "ザ・スラッジ・ワークス",
        url: "the-sludge-works.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スプリングハウス",
        yomi: "スプリングハウス",
        url: "the-springhouse.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スウィッチボード",
        yomi: "スウィッチボード",
        url: "the-switchboard.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サードレール",
        yomi: "サードレール",
        url: "the-third-rail.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ザ・ソーン",
        yomi: "ザ・ソーン",
        url: "the-thorn-fo76.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "The Vault Dweller's Official Cookbook",
        yomi: "The Vault Dweller's Official Cookbook",
        url: "the-vault-dweller-s-official-cookbook.html",
        category: "場所",
        appearance: ["Fallout 76","Fallout 4","Fallout 3"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "The WayWard",
        yomi: "The WayWard",
        url: "the-wayward.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ホワイトスプリング議会バンカー",
        yomi: "ホワイトスプリング議会バンカー",
        url: "the-whitespring-bunker.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホワイトスプリング・ゴルフクラブ",
        yomi: "ホワイトスプリング・ゴルフクラブ",
        url: "the-whitespring-golf-club.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホワイトスプリング・リゾート",
        yomi: "ホワイトスプリング・リゾート",
        url: "the-whitespring-resort.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "The Whitespring Station vendor",
        yomi: "The Whitespring Station vendor",
        url: "the-whitespring-station-vendor.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホワイトスプリング駅",
        yomi: "ホワイトスプリング駅",
        url: "the-whitespring-station.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホワイトスプリング",
        yomi: "ホワイトスプリング",
        url: "the-whitespring.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Theodore",
        yomi: "Theodore",
        url: "theodore-milepost-zero.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "シケット・エクスカーベーションズ",
        yomi: "シケット・エクスカーベーションズ",
        url: "thicket-excavations.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Thomas Eckhart",
        yomi: "Thomas Eckhart",
        url: "thomas-eckhart.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "トーマス農場",
        yomi: "トーマス農場",
        url: "thomas-farm.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "トーマス・ハミルトン",
        yomi: "トーマス・ハミルトン",
        url: "thomas-hamilton.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "thomas-hildern",
        yomi: "thomas-hildern",
        url: "thomas-hildern.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Sergeant Thompson",
        yomi: "Sergeant Thompson",
        url: "thompson-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "トンプソン軍曹",
        yomi: "トンプソン軍曹",
        url: "thompson.html",
        category: "キャラクター",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スリードッグ",
        yomi: "スリードッグ",
        url: "three-dog.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サンダー・マウンテン発電所",
        yomi: "サンダー・マウンテン発電所",
        url: "thunder-mountain-power-plant.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サンダーマウンテン発電所ヤード",
        yomi: "サンダーマウンテン発電所ヤード",
        url: "thunder-mountain-pp-yard.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サンダーマウンテン変電所 TM-01",
        yomi: "サンダーマウンテン変電所 TM-01",
        url: "thunder-mountain-substation-tm-01.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "サンダーマウンテン変電所 TM-02",
        yomi: "サンダーマウンテン変電所 TM-02",
        url: "thunder-mountain-substation-tm-02.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ティック",
        yomi: "ティック",
        url: "tick-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "タイコンデロガ",
        yomi: "タイコンデロガ",
        url: "ticonderoga.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ティファニー・ブラントリー",
        yomi: "ティファニー・ブラントリー",
        url: "tiffany-brantley.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "綱渡り",
        yomi: "綱渡り",
        url: "tightrope.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ティモシー・ウルフ",
        yomi: "ティモシー・ウルフ",
        url: "timothy-wolfe.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "タイタス騎士",
        yomi: "タイタス騎士",
        url: "titus-tv.html",
        category: "人物",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "タイタス",
        yomi: "タイタス",
        url: "titus.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "トースター",
        yomi: "トースター",
        url: "toaster.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "タバコ",
        yomi: "タバコ",
        url: "tobacco.html",
        category: "植物",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "トム",
        yomi: "トム",
        url: "tom-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Tommy Ten-Toes",
        yomi: "Tommy Ten-Toes",
        url: "tommy-ten-toes.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Tommy",
        yomi: "Tommy",
        url: "tommy-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "トップ・オブ・ザ・ワールド",
        yomi: "トップ・オブ・ザ・ワールド",
        url: "top-of-the-world.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "トーランス・ハウス",
        yomi: "トーランス・ハウス",
        url: "torrance-house.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "有毒な干上がった湖底",
        yomi: "有毒な干上がった湖底",
        url: "toxic-dried-lakebed.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "トキシック・ラリーのミート・アンド・ゴー",
        yomi: "トキシック・ラリーのミート・アンド・ゴー",
        url: "toxic-larrys-meat-n-go.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "有毒池と残骸",
        yomi: "有毒池と残骸",
        url: "toxic-pond-wreckage.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "トキシックバレー",
        yomi: "トキシックバレー",
        url: "toxic-valley.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "トレイル・ヒル展望台",
        yomi: "トレイル・ヒル展望台",
        url: "trail-hill-overlook.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "送信ステーション 1AT-U03",
        yomi: "送信ステーション 1AT-U03",
        url: "transmission-station-1at-u03.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "トラッパーズ・キャンプ",
        yomi: "トラッパーズ・キャンプ",
        url: "trappers-camp.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "スカウトリーダー・トレッドリー",
        yomi: "スカウトリーダー・トレッドリー",
        url: "treadly.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ツリーハウス・ビレッジ",
        yomi: "ツリーハウス・ビレッジ",
        url: "treehouse-village.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ツリートップ展望台",
        yomi: "ツリートップ展望台",
        url: "treetop-lookout.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ツリートップス",
        yomi: "ツリートップス",
        url: "treetops.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "トリニティ・チャーチ",
        yomi: "トリニティ・チャーチ",
        url: "trinity-church.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "トリニティ・タワー",
        yomi: "トリニティ・タワー",
        url: "trinity-tower.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Sheriff Troy",
        yomi: "Sheriff Troy",
        url: "troy-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Trudy",
        yomi: "Trudy",
        url: "trudy-tv-series.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Tumblin&#39; Joe",
        yomi: "Tumblin&#39; Joe",
        url: "tumblin-joe.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "トンネル・オブ・ラブ",
        yomi: "トンネル・オブ・ラブ",
        url: "tunnel-of-love-fo76.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ツイード",
        yomi: "ツイード",
        url: "tweed.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ツイン・レイクス",
        yomi: "ツイン・レイクス",
        url: "twin-lakes.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ツイン・パイン・キャビン",
        yomi: "ツイン・パイン・キャビン",
        url: "twin-pine-cabin.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ツインパイン・キャビンズ",
        yomi: "ツインパイン・キャビンズ",
        url: "twin-pine-cabins.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "タイクーン・レイク",
        yomi: "タイクーン・レイク",
        url: "tycoon-lake.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "タイガートバレー川",
        yomi: "タイガートバレー川",
        url: "tygart-valley-river.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "タイガート水処理場",
        yomi: "タイガート水処理場",
        url: "tygart-water-treatment-plant.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "タイガート浄水場",
        yomi: "タイガート浄水場",
        url: "tygart-water-treatment.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "タイラー郡ダートトラック",
        yomi: "タイラー郡ダートトラック",
        url: "tyler-county-dirt-track.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "タイラー郡フェアグラウンド",
        yomi: "タイラー郡フェアグラウンド",
        url: "tyler-county-fairgrounds.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "タイラー郡移動遊園地",
        yomi: "タイラー郡移動遊園地",
        url: "tyler-county-mobile-amusement-park.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "米連邦捜査官",
        yomi: "米連邦捜査官",
        url: "u-s-federal-agent.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウルトラ・ルックス (Ultra-Luxe)",
        yomi: "ウルトラ・ルックス (Ultra-Luxe)",
        url: "ultra-luxe.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウルトラサイト・テラー",
        yomi: "ウルトラサイト・テラー",
        url: "ultracite-terror-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウルトラサイト・タイタン",
        yomi: "ウルトラサイト・タイタン",
        url: "ultracite-titan.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウルトラサイト",
        yomi: "ウルトラサイト",
        url: "ultracite.html",
        category: "アイテム",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ユリシーズ",
        yomi: "ユリシーズ",
        url: "ulysses.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "不気味な洞窟群",
        yomi: "不気味な洞窟群",
        url: "uncanny-caverns.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アンクル・レオ",
        yomi: "アンクル・レオ",
        url: "uncle-leo.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Under the I-65 Bridge",
        yomi: "Under the I-65 Bridge",
        url: "under-the-i-65-bridge.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Unfinished Mansion",
        yomi: "Unfinished Mansion",
        url: "unfinished-mansion.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "組合の抗議者",
        yomi: "組合の抗議者",
        url: "union-protester.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アメリカ合衆国",
        yomi: "アメリカ合衆国",
        url: "united-states-of-america.html",
        category: "勢力",
        appearance: ["Fallout 4","Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ユニバーシティ・ポイント",
        yomi: "ユニバーシティ・ポイント",
        url: "university-point.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アンストッパブル",
        yomi: "アンストッパブル",
        url: "unstoppable.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout 4","Fallout 3"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ウラニウム・シティ強制収容所",
        yomi: "ウラニウム・シティ強制収容所",
        url: "uranium-city-internment-camp.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "アーサラ",
        yomi: "アーサラ",
        url: "ursala.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "US-13C 野営地",
        yomi: "US-13C 野営地",
        url: "us-13c-bivouac.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "USAF衛星通信基地オリビア",
        yomi: "USAF衛星通信基地オリビア",
        url: "usaf-satellite-station-olivia.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "USSコンスティチューション",
        yomi: "USSコンスティチューション",
        url: "uss-constitution.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ussa",
        yomi: "ussa",
        url: "ussa.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "バレー・ギャレリア",
        yomi: "バレー・ギャレリア",
        url: "valley-galleria.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "渓谷の廃品集積場",
        yomi: "渓谷の廃品集積場",
        url: "valley-junkyard.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ヴァンロウ剥製店",
        yomi: "ヴァンロウ剥製店",
        url: "van-lowe-taxidermy.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 101",
        yomi: "Vault 101",
        url: "vault-101.html",
        category: "場所",
        appearance: ["Fallout 76","Fallout 4","Fallout 3"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Vault 108",
        yomi: "Vault 108",
        url: "vault-108.html",
        category: "場所",
        appearance: ["Fallout 76","Fallout 3"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Vault 111",
        yomi: "Vault 111",
        url: "vault-111.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 112",
        yomi: "Vault 112",
        url: "vault-112.html",
        category: "ロケーション",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 114",
        yomi: "Vault 114",
        url: "vault-114.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 118",
        yomi: "Vault 118",
        url: "vault-118.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 13",
        yomi: "Vault 13",
        url: "vault-13.html",
        category: "場所",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Vault 24",
        yomi: "Vault 24",
        url: "vault-24.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 31 dweller",
        yomi: "Vault 31 dweller",
        url: "vault-31-dweller.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 32 dweller",
        yomi: "Vault 32 dweller",
        url: "vault-32-dweller.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 32 raider",
        yomi: "Vault 32 raider",
        url: "vault-32-raider.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 33 dweller",
        yomi: "Vault 33 dweller",
        url: "vault-33-dweller.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 33 engineer",
        yomi: "Vault 33 engineer",
        url: "vault-33-engineer.html",
        category: "人物",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 4",
        yomi: "Vault 4",
        url: "vault-4.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 51",
        yomi: "Vault 51",
        url: "vault-51.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Vault 63 アトリウム",
        yomi: "Vault 63 アトリウム",
        url: "vault-63-atrium.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 63 墜落現場",
        yomi: "Vault 63 墜落現場",
        url: "vault-63-crash-site.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 63 エンジニアリング区画",
        yomi: "Vault 63 エンジニアリング区画",
        url: "vault-63-engineering.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 63 気象学区画",
        yomi: "Vault 63 気象学区画",
        url: "vault-63-meteorology.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 63 オーガニクス区画",
        yomi: "Vault 63 オーガニクス区画",
        url: "vault-63-organics.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 63",
        yomi: "Vault 63",
        url: "vault-63.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 75",
        yomi: "Vault 75",
        url: "vault-75.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Overseer",
        yomi: "Overseer",
        url: "vault-76-overseer.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 76",
        yomi: "Vault 76",
        url: "vault-76.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ボルト 79",
        yomi: "ボルト 79",
        url: "vault-79.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 81",
        yomi: "Vault 81",
        url: "vault-81.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 88",
        yomi: "Vault 88",
        url: "vault-88.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault 95",
        yomi: "Vault 95",
        url: "vault-95.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "vault-boy",
        yomi: "vault-boy",
        url: "vault-boy.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "vault-girl",
        yomi: "vault-girl",
        url: "vault-girl.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault-Tec農業研究センター",
        yomi: "Vault-Tec農業研究センター",
        url: "vault-tec-agricultural-research-center.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault-Tec農業研究センター",
        yomi: "Vault-Tec農業研究センター",
        url: "vault-tec-agricultural-research.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault-Tec: アマング・ザ・スター",
        yomi: "Vault-Tec: アマング・ザ・スター",
        url: "vault-tec-among-the-stars.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4 (Nuka-World)"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault-Tec ボブルヘッド",
        yomi: "Vault-Tec ボブルヘッド",
        url: "vault-tec-bobblehead.html",
        category: "場所",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Vault-Tec コーポレーション本部 (TVシリーズ)",
        yomi: "Vault-Tec コーポレーション本部 (TVシリーズ)",
        url: "vault-tec-headquarters-tv-series.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ボルトテック地区本部",
        yomi: "ボルトテック地区本部",
        url: "vault-tec-regional-hq.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault-Tec大学（VTU）",
        yomi: "Vault-Tec大学（VTU）",
        url: "vault-tec-university.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vault",
        yomi: "Vault",
        url: "vault.html",
        category: "ロケーション",
        appearance: ["Fallout","Fallout 2","Fallout 3","Fallout 4","Fallout 76","Fallout: New Vegas","Fallout TV"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Vault76",
        yomi: "Vault76",
        url: "vault76.html",
        category: "場所",
        appearance: ["Fallout 76","Fallout 3"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Vault Dweller (Vaultの居住者)",
        yomi: "Vault Dweller (Vaultの居住者)",
        url: "vault_dweller_lore.html",
        category: "人物",
        appearance: ["Fallout"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Vault-Tec Industries",
        yomi: "Vault-Tec Industries",
        url: "vault_tec.html",
        category: "勢力",
        appearance: ["Fallout","Fallout 2","Fallout 3","Fallout 4","Fallout 76","Fallout: New Vegas","Fallout TV"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ヴェール・オブ・シークレッツ",
        yomi: "ヴェール・オブ・シークレッツ",
        url: "veil-of-secrets.html",
        category: "アーマー・装備",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "隠されたサンデュー叢",
        yomi: "隠されたサンデュー叢",
        url: "veiled-sundew-grove.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vendor bot Bob /<br />Volunteer bot",
        yomi: "Vendor bot Bob /<br />Volunteer bot",
        url: "vendor-bot-bob.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vendor bot Chad",
        yomi: "Vendor bot Chad",
        url: "vendor-bot-chad.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vendor bot Greg",
        yomi: "Vendor bot Greg",
        url: "vendor-bot-greg.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベンダーボット・マック",
        yomi: "ベンダーボット・マック",
        url: "vendor-bot-mack.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベンダーボット・フェニックス",
        yomi: "ベンダーボット・フェニックス",
        url: "vendor-bot-phoenix.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベンダーボット・レスポンダー",
        yomi: "ベンダーボット・レスポンダー",
        url: "vendor-bot-responder.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベンダーボット・ウォレス",
        yomi: "ベンダーボット・ウォレス",
        url: "vendor-bot-wallace.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヴェラ",
        yomi: "ヴェラ",
        url: "vera-fallout-76.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vera Thornberg",
        yomi: "Vera Thornberg",
        url: "vera-thornberg.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vernon Dodge",
        yomi: "Vernon Dodge",
        url: "vernon-dodge.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベロニカ・サンタンジェロ",
        yomi: "ベロニカ・サンタンジェロ",
        url: "veronica-santangelo.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヴェロニカ",
        yomi: "ヴェロニカ",
        url: "veronica-tv.html",
        category: "人物",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベルチバード",
        yomi: "ベルチバード",
        url: "vertibird.html",
        category: "乗り物",
        appearance: ["Fallout 2","Fallout 3","Fallout: New Vegas","Fallout 4","Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ベスタの日用品店",
        yomi: "ベスタの日用品店",
        url: "vestas-housewares.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ビクター",
        yomi: "ビクター",
        url: "victor.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "村人（ザ・リトリート）",
        yomi: "村人（ザ・リトリート）",
        url: "villager.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヴィム・ポップ工場",
        yomi: "ヴィム・ポップ工場",
        url: "vim-pop-factory.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヴィンセント・フリード",
        yomi: "ヴィンセント・フリード",
        url: "vincent-fried.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヴィンセント・メイ・リリー",
        yomi: "ヴィンセント・メイ・リリー",
        url: "vincent-may-lilly.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vincent Costa",
        yomi: "Vincent Costa",
        url: "vinny-costa.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ビジター",
        yomi: "ビジター",
        url: "visitor-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヴルペス・インカルタ",
        yomi: "ヴルペス・インカルタ",
        url: "vulpes-inculta.html",
        category: "人物",
        appearance: ["Fallout: New Vegas"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ハゲタカ",
        yomi: "ハゲタカ",
        url: "vulture-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Vulture",
        yomi: "Vulture",
        url: "vulture-gleaming-depths.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウェイド空港",
        yomi: "ウェイド空港",
        url: "wade-airport.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウォールデン・ポンド",
        yomi: "ウォールデン・ポンド",
        url: "walden-pond.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "散策路のピクニックエリアと展望台",
        yomi: "散策路のピクニックエリアと展望台",
        url: "walking-trail-picnic-area.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウォルター・グリズウォルド",
        yomi: "ウォルター・グリズウォルド",
        url: "walter-griswold.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Ward",
        yomi: "Ward",
        url: "ward-wastelanders.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ワーウィック農園",
        yomi: "ワーウィック農園",
        url: "warwick-homestead.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Wasted on Nukashine",
        yomi: "Wasted on Nukashine",
        url: "wasted-on-nukashine.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "水",
        yomi: "水",
        url: "water.html",
        category: "アイテム",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ワトガの野外ステージ",
        yomi: "ワトガの野外ステージ",
        url: "watoga-bandstand.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ワトガ・シビックセンター",
        yomi: "ワトガ・シビックセンター",
        url: "watoga-civic-center.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ワトガ緊急サービス",
        yomi: "ワトガ緊急サービス",
        url: "watoga-emergency-services.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ワトガ・エステーツ",
        yomi: "ワトガ・エステーツ",
        url: "watoga-estates.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ワトガ高校",
        yomi: "ワトガ高校",
        url: "watoga-high-school.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ワトガ市役所",
        yomi: "ワトガ市役所",
        url: "watoga-municipal-center.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Watoga Real Estate",
        yomi: "Watoga Real Estate",
        url: "watoga-real-estate.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ワトガ・ショッピングプラザ",
        yomi: "ワトガ・ショッピングプラザ",
        url: "watoga-shopping-plaza.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ワトガ駅",
        yomi: "ワトガ駅",
        url: "watoga-station.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ワトガ・タワー",
        yomi: "ワトガ・タワー",
        url: "watoga-towers.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ワトガ・トランジットハブ",
        yomi: "ワトガ・トランジットハブ",
        url: "watoga-transit-hub.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ワトガ・アンダーグラウンド",
        yomi: "ワトガ・アンダーグラウンド",
        url: "watoga-underground.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ワトガ大学",
        yomi: "ワトガ大学",
        url: "watoga-university.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ワトガ",
        yomi: "ワトガ",
        url: "watoga.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ワッツ・エレクトロニクス",
        yomi: "ワッツ・エレクトロニクス",
        url: "wattz-consumer-electronics.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウェイビー・ウィラードのウォーターパーク",
        yomi: "ウェイビー・ウィラードのウォーターパーク",
        url: "wavy-willards.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウィーゼル",
        yomi: "ウィーゼル",
        url: "weasel.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "天候制御ステーション",
        yomi: "天候制御ステーション",
        url: "weather-control-station.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ウェルチ駅",
        yomi: "ウェルチ駅",
        url: "welch-station.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウェルチ",
        yomi: "ウェルチ",
        url: "welch.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Wendigo Cave",
        yomi: "Wendigo Cave",
        url: "wendigo-cave.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウェンディゴ・コロッサス",
        yomi: "ウェンディゴ・コロッサス",
        url: "wendigo-colossus.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウェンディゴ",
        yomi: "ウェンディゴ",
        url: "wendigo.html",
        category: "クリーチャー",
        appearance: ["Fallout 76","Fallout 3"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ワーナー",
        yomi: "ワーナー",
        url: "wernher.html",
        category: "人物",
        appearance: ["Fallout 3 (The Pitt)"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウェスト・チャールストン・ブリッジ",
        yomi: "ウェスト・チャールストン・ブリッジ",
        url: "west-charleston-bridge.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウエスト・エバレット私有地",
        yomi: "ウエスト・エバレット私有地",
        url: "west-everett-estates.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウェスト・ロックスバリー駅",
        yomi: "ウェスト・ロックスバリー駅",
        url: "west-roxbury-station.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウエスト・テック研究センター",
        yomi: "ウエスト・テック研究センター",
        url: "west-tek-research-center.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウエスト・テック (West Tek)",
        yomi: "ウエスト・テック (West Tek)",
        url: "west-tek.html",
        category: "記録",
        appearance: ["Fallout 76","Fallout 4","Fallout 3"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ウェストブルック牧場",
        yomi: "ウェストブルック牧場",
        url: "westbrook-horse-ranch.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "western-revolver",
        yomi: "western-revolver",
        url: "western-revolver.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウェスティング・エステート",
        yomi: "ウェスティング・エステート",
        url: "westing-estate.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウェストン水処理場",
        yomi: "ウェストン水処理場",
        url: "weston-water-treatment-plant.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウエストサイド・メディカル・クリニック",
        yomi: "ウエストサイド・メディカル・クリニック",
        url: "westside-medical-clinic.html",
        category: "場所",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホワイトパウダー・ウィンタースポーツ",
        yomi: "ホワイトパウダー・ウィンタースポーツ",
        url: "white-powder-winter-sports.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホワイトスプリング・バンカー",
        yomi: "ホワイトスプリング・バンカー",
        url: "whitespring-bunker.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホワイトスプリング・コテージ",
        yomi: "ホワイトスプリング・コテージ",
        url: "whitespring-cottages.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホワイトスプリングのゴルフ練習場",
        yomi: "ホワイトスプリングのゴルフ練習場",
        url: "whitespring-driving-range.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホワイトスプリング・ゴルフクラブ",
        yomi: "ホワイトスプリング・ゴルフクラブ",
        url: "whitespring-golf-club.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホワイトスプリング見張り台",
        yomi: "ホワイトスプリング見張り台",
        url: "whitespring-lookout.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホワイトスプリング大統領別荘と博物館",
        yomi: "ホワイトスプリング大統領別荘と博物館",
        url: "whitespring-presidential-cottage.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホワイトスプリング避難所",
        yomi: "ホワイトスプリング避難所",
        url: "whitespring-refuge.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホワイトスプリング・リゾート",
        yomi: "ホワイトスプリング・リゾート",
        url: "whitespring-resort.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホワイトスプリング・サービスエントランス",
        yomi: "ホワイトスプリング・サービスエントランス",
        url: "whitespring-service-entrance.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ホワイトスプリング駅",
        yomi: "ホワイトスプリング駅",
        url: "whitespring-station.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウィケッド・シッピング・フリート・ロックアップ",
        yomi: "ウィケッド・シッピング・フリート・ロックアップ",
        url: "wicked-shipping-fleet-lockup.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウィッカー",
        yomi: "ウィッカー",
        url: "wicker.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウィドウズ・パーチ",
        yomi: "ウィドウズ・パーチ",
        url: "widows-perch.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ワイルドウルフ農場",
        yomi: "ワイルドウルフ農場",
        url: "wild-wolf-homestead.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "荒野 (TVシリーズ)",
        yomi: "荒野 (TVシリーズ)",
        url: "wilds.html",
        category: "場所",
        appearance: ["Fallout TV"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウィルキンス",
        yomi: "ウィルキンス",
        url: "wilkins-steel-reign.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウィラード企業住宅",
        yomi: "ウィラード企業住宅",
        url: "willard-corporate-housing.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウィリー・メイ",
        yomi: "ウィリー・メイ",
        url: "willie-mae.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウィルソン・アトマトイズ本社",
        yomi: "ウィルソン・アトマトイズ本社",
        url: "wilson-atomatoys-corporate-hq.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウィルソン・アトマトイズ工場",
        yomi: "ウィルソン・アトマトイズ工場",
        url: "wilson-atomatoys-factory.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウィルソン・ブラザーズ自動車修理屋",
        yomi: "ウィルソン・ブラザーズ自動車修理屋",
        url: "wilson-brothers-auto-repair-shop.html",
        category: "記録",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ウィルソン兄弟のオート修理工場",
        yomi: "ウィルソン兄弟のオート修理工場",
        url: "wilson-brothers-auto.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Windy Park",
        yomi: "Windy Park",
        url: "windy-park.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "賢明なるチャールズ",
        yomi: "賢明なるチャールズ",
        url: "wise-charles.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ワイズ・モスマン",
        yomi: "ワイズ・モスマン",
        url: "wise-mothman-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウィクソン農場",
        yomi: "ウィクソン農場",
        url: "wixon-homestead.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウルフ",
        yomi: "ウルフ",
        url: "wolf-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウッズ・エステート",
        yomi: "ウッズ・エステート",
        url: "woods-estate.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウッズ伍長",
        yomi: "ウッズ伍長",
        url: "woods.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ウッディ・トーマス",
        yomi: "ウッディ・トーマス",
        url: "woody-thomas.html",
        category: "人物",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ワールド・オブ・コーン",
        yomi: "ワールド・オブ・コーン",
        url: "world-of-corn.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ワールド・オブ・リフレッシュメント",
        yomi: "ワールド・オブ・リフレッシュメント",
        url: "world-of-refreshment.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Worthy",
        yomi: "Worthy",
        url: "worthy.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "FMSノーザンスターの残骸",
        yomi: "FMSノーザンスターの残骸",
        url: "wreck-of-the-fms-northern-star.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "Wren",
        yomi: "Wren",
        url: "wren-raider.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "WRVR放送局",
        yomi: "WRVR放送局",
        url: "wrvr-broadcast-station.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "WV製材会社",
        yomi: "WV製材会社",
        url: "wv-lumber-co.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "WV木材会社",
        yomi: "WV木材会社",
        url: "wv-lumber-company.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "ザンダー・ブラウン",
        yomi: "ザンダー・ブラウン",
        url: "xander-brown.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ザビエル",
        yomi: "ザビエル",
        url: "xavier.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "「それがお前の最初の過ちだ。考えるということがな。だが安心しろ、我々がお前たちの種族を侵略し支配下に置けば、もう考える必要はなくなる。<br>\r\n                実際、思考は死刑に値する犯罪になるだろう。そしてもちろんその後に、一連の教育ビデオを視聴させられることになる。<br>\r\n                ゼビュロンの死後の世界には1,757段階の地獄があるのだから、ビデオを観て自分の過ちを振り返る時間は十分にあるだろう。」<br>\r\n                <span style=\"font-size: 0.85em; color: #888;\">— ゼルゾ</span>",
        yomi: "「それがお前の最初の過ちだ。考えるということがな。だが安心しろ、我々がお前たちの種族を侵略し支配下に置けば、もう考える必要はなくなる。<br>\r\n                実際、思考は死刑に値する犯罪になるだろう。そしてもちろんその後に、一連の教育ビデオを視聴させられることになる。<br>\r\n                ゼビュロンの死後の世界には1,757段階の地獄があるのだから、ビデオを観て自分の過ちを振り返る時間は十分にあるだろう。」<br>\r\n                <span style=\"font-size: 0.85em; color: #888;\">— ゼルゾ</span>",
        url: "xerxo.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "長江 (揚子江 / Yangtze)",
        yomi: "長江 (揚子江 / Yangtze)",
        url: "yangtze.html",
        category: "拠点/ダンジョン",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヤオ・グアイの洞窟 (TVシリーズ)",
        yomi: "ヤオ・グアイの洞窟 (TVシリーズ)",
        url: "yao-guai-cave-tv-series.html",
        category: "場所",
        appearance: ["Fallout TVシリーズ"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ヤオ・グアイ",
        yomi: "ヤオ・グアイ",
        url: "yao-guai-fo76.html",
        category: "クリーチャー",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "「はじめまして。私の名前はヤスミン。アパラチアを旅するシェフよ。」<br>\r\n                <span style=\"font-size: 0.85em; color: #888;\">— ヤスミン・チョウドリー</span>",
        yomi: "「はじめまして。私の名前はヤスミン。アパラチアを旅するシェフよ。」<br>\r\n                <span style=\"font-size: 0.85em; color: #888;\">— ヤスミン・チョウドリー</span>",
        url: "yasmin-chowdhury.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "イエロー・サンディの蒸留所",
        yomi: "イエロー・サンディの蒸留所",
        url: "yellow-sandys-still.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "yes-man",
        yomi: "yes-man",
        url: "yes-man.html",
        category: "人物",
        appearance: ["Fallout 4"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ZAX 1.3c",
        yomi: "ZAX 1.3c",
        url: "zax-13c.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ジーク",
        yomi: "ジーク",
        url: "zeke-fallout-76.html",
        category: "人物",
        appearance: ["Fallout 76"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ゼータ星人",
        yomi: "ゼータ星人",
        url: "zeta-alien.html",
        category: "クリーチャー",
        appearance: ["Fallout 76","Fallout 4","Fallout 3","Fallout: New Vegas"],
        date: "2026-05-02",
        status: "published"
    },
    {
        name: "Dr. ジマー",
        yomi: "Dr. ジマー",
        url: "zimmer.html",
        category: "人物",
        appearance: ["Fallout 3"],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "変異パブリック��ベント",
        yomi: "変異パブリック��ベント",
        url: "変異パブリック��ベント.html",
        category: "未分類",
        appearance: [],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "��スローカム・ジョー",
        yomi: "��スローカム・ジョー",
        url: "��スローカム・ジョー.html",
        category: "未分類",
        appearance: [],
        date: "2026-05-02",
        status: "draft"
    },
    {
        name: "ロバート・マクレディ (Robert MacCready)",
        yomi: "ロバート・マクレディ (Robert MacCready)",
        url: "maccready.html",
        category: "未分類",
        appearance: [],
        date: "2026-04-30",
        status: "draft"
    },
    {
        name: "放棄されたコンボイ",
        yomi: "放棄されたコンボイ",
        url: "abandoned-convoy.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "バンカーとハチの巣",
        yomi: "バンカーとハチの巣",
        url: "bunker-and-beehive.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "キャンプ・リバティ",
        yomi: "キャンプ・リバティ",
        url: "camp-liberty.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "コビーズ・コーナー",
        yomi: "コビーズ・コーナー",
        url: "cobbys-corner.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "ダーク・ホロウ・マナー",
        yomi: "ダーク・ホロウ・マナー",
        url: "dark-hollow-manor.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "SUPPORT THE ARCHIVES",
        yomi: "SUPPORT THE ARCHIVES",
        url: "donate.html",
        category: "未分類",
        appearance: [],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "FALLOUT 76 攻略",
        yomi: "FALLOUT 76 攻略",
        url: "fo76-guide.html",
        category: "未分類",
        appearance: [],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "グラインドストーン・アーチ",
        yomi: "グラインドストーン・アーチ",
        url: "grindstone-arch.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "ホークスビル気象観測所",
        yomi: "ホークスビル気象観測所",
        url: "hawksbill-weather-station.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "ヘムロック・スプリングス・ダンプ",
        yomi: "ヘムロック・スプリングス・ダンプ",
        url: "hemlock-springs-dump.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "ハイ・ノブ展望台",
        yomi: "ハイ・ノブ展望台",
        url: "high-knob-lookout.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "ハイウェイ35給水塔",
        yomi: "ハイウェイ35給水塔",
        url: "highway-35-water-tower.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "ホッキング・ヒルズ・リトルリーグ場",
        yomi: "ホッキング・ヒルズ・リトルリーグ場",
        url: "hocking-hills-little-league-field.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "アイスクリーム・レストストップ",
        yomi: "アイスクリーム・レストストップ",
        url: "ice-cream-rest-stop.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "メイクアウト・ポイント",
        yomi: "メイクアウト・ポイント",
        url: "makeout-point.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "メアリーズ・ロック・トンネル",
        yomi: "メアリーズ・ロック・トンネル",
        url: "marys-rock-tunnel.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "マイルポスト・ゼロ",
        yomi: "マイルポスト・ゼロ",
        url: "milepost-zero.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "オールド・クリモラ鉱山",
        yomi: "オールド・クリモラ鉱山",
        url: "old-crimora-mines.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "オールド・ラグ展望台",
        yomi: "オールド・ラグ展望台",
        url: "old-rag-lookout.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "ペブルズ・ザ・キャット博物館",
        yomi: "ペブルズ・ザ・キャット博物館",
        url: "pebbles-the-cat-museum.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "パイパー・ライト (Piper Wright)",
        yomi: "パイパー・ライト (Piper Wright)",
        url: "piper.html",
        category: "未分類",
        appearance: [],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "プレッパーの貯蔵バンカー",
        yomi: "プレッパーの貯蔵バンカー",
        url: "prepper-storage-bunkers.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "レンジャーステーション・バンカー",
        yomi: "レンジャーステーション・バンカー",
        url: "ranger-station-bunker.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "ラピダン・キャンプ",
        yomi: "ラピダン・キャンプ",
        url: "rapidan-camp.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "リサーチサイト・バヴァリア",
        yomi: "リサーチサイト・バヴァリア",
        url: "research-site-bavaria.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "リサーチサイト・ラインラント",
        yomi: "リサーチサイト・ラインラント",
        url: "research-site-rhineland.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "リサーチサイト・ザクセン",
        yomi: "リサーチサイト・ザクセン",
        url: "research-site-saxony.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "ルート33の渋滞",
        yomi: "ルート33の渋滞",
        url: "route-33-traffic-jam.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "シェナンドー・ビジターセンター",
        yomi: "シェナンドー・ビジターセンター",
        url: "shenandoah-visitor-center.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "シャイニング・クリーク洞窟",
        yomi: "シャイニング・クリーク洞窟",
        url: "shining-creek-cavern.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "スランバー・ミル・モーテル",
        yomi: "スランバー・ミル・モーテル",
        url: "slumber-mill-motel.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "サウスリバー・ブリッジ",
        yomi: "サウスリバー・ブリッジ",
        url: "south-river-bridge.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "ストーニー・マン展望台",
        yomi: "ストーニー・マン展望台",
        url: "stony-man-lookout.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "スーザンのキャビン",
        yomi: "スーザンのキャビン",
        url: "susans-cabin.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "バッカイ・ダイナー",
        yomi: "バッカイ・ダイナー",
        url: "the-buckeye-diner.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "トレーディング・ポスト",
        yomi: "トレーディング・ポスト",
        url: "the-trading-post.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "スリー・ポンズ",
        yomi: "スリー・ポンズ",
        url: "three-ponds.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "サンダーマウンテン変電所TM-03",
        yomi: "サンダーマウンテン変電所TM-03",
        url: "thunder-mountain-substation-tm-03.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "ウラジミールのキャンプ",
        yomi: "ウラジミールのキャンプ",
        url: "vladimirs-camp.html",
        category: "場所",
        appearance: ["Fallout 76"],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "ボルトテック・コーポレーション",
        yomi: "ボルトテック・コーポレーション",
        url: "ボルトテック・コーポレーション.html",
        category: "未分類",
        appearance: [],
        date: "2026-04-29",
        status: "draft"
    },
    {
        name: "_catarax_fandom",
        yomi: "_catarax_fandom",
        url: "_catarax_fandom.html",
        category: "未分類",
        appearance: [],
        date: "2026-02-26",
        status: "published"
    },
    {
        name: "_media_gallery",
        yomi: "_media_gallery",
        url: "_media_gallery.html",
        category: "未分類",
        appearance: [],
        date: "2026-02-26",
        status: "published"
    },
    {
        name: "_media_section",
        yomi: "_media_section",
        url: "_media_section.html",
        category: "未分類",
        appearance: [],
        date: "2026-02-26",
        status: "published"
    },
    {
        name: "_vault_fandom",
        yomi: "_vault_fandom",
        url: "_vault_fandom.html",
        category: "未分類",
        appearance: [],
        date: "2026-02-26",
        status: "published"
    }
];

// 重複判定に用いるベースキーワード
const duplicateKeywords = [
    "レイダー",
    "リー・モルデイヴァー",
    "Vaultの居住者",
    "アサルトロン頭部",
    "ブライト",
    "タンディ",
    "プライズボット",
    "新カリフォルニア共和国",
    "ボルトテック",
    "ビリングス農場",
    "ペット",
    "ブラッドリーフ",
    "シングルアクション・リボルバー",
    "キャベツ",
    "カタラックス",
    "ルーシー・マクレーン",
    "複葉機の墜落現場",
    "バードハウス・リッジ",
    "野鳥観察者のプラットフォーム",
    "ブラックマウンテン兵器工場",
    "ダフネ",
    "ダーリング姉妹のラボ",
    "デスクロー・アイランド",
    "デスクロー",
    "イースト・カナー監視塔",
    "Vault-Tec農業研究センター",
    "フラットウッズ監視塔",
    "チェスウィック",
    "フラットウッズ・リバー",
    "ケシャ・マクダーモット",
    "ママ・ドルスの食品加工場",
    "藤仁屋情報基地",
    "アパラチアの核発射コード",
    "ステルス技術",
    "中国ステルスアーマー",
    "中米戦争",
    "分岐",
    "ステルス・ボーイ",
    "Game of Thrones",
    "グレッグの鉱山用品店",
    "ホールディングフォード農場",
    "ゴルフカート",
    "ホライゾンズ・レスト",
    "ホーンライト夏の別荘",
    "ハンツマンズ・グレイド",
    "J. シュラムの家",
    "カナー郡墓地",
    "カナー・ヌカコーラ工場",
    "カナー川",
    "レイクサイド・キャビンズ",
    "ルイス＆サンズ農業用品店",
    "リムジンの衝突事故現場",
    "モーガンタウン",
    "オハイオ川",
    "オハイオの川下りアドベンチャーズ",
    "オーウェル果樹園",
    "見晴らしのいいキャビン",
    "監督官の自宅",
    "パーティタイム・ダイナーズ",
    "ポートサイド・パブ",
    "ポセイドン・エネルギー発電所WV-06",
    "HalluciGen, Inc.",
    "ポセイドン・エネルギー発電所ヤード",
    "ポセイドン変電所PX-01",
    "ポセイドン変電所PX-02",
    "先史時代の骨のキャンプ",
    "プリブロの珍品店",
    "レッド・ロケット（フラットウッズ）",
    "レッド・ロケット（巨大ティーポット）",
    "レッド・ロケット（モーガンタウン）",
    "中継タワー EM-B1-27",
    "中継タワー HN-B1-12",
    "リバーサイド邸",
    "ヴェール・オブ・シークレッツ",
    "シーカー・オブ・ミステリー",
    "ザ・ミストレス・オブ・ミステリー",
    "オリヴィア・リバーズ",
    "フレデリック・リバーズ",
    "シャノン・リバーズ",
    "生贄の祭壇",
    "金庫破りの小屋",
    "シャドーブリーズ・アパートメント",
    "シルヴァ・ホームステッド",
    "石鹸まみれの骸骨",
    "シュガーメイプル",
    "サマーズビル・ダム",
    "サマーズビル・ドック",
    "サマーズビル湖",
    "サンシャイン・メドウズ工業農場",
    "テディベアの家",
    "ザ・ディープ",
    "ザ・キルボックス",
    "ザ・ピグスティ",
    "トーランス・ハウス",
    "ブロディ・トーランス",
    "中継局1AT-U03",
    "タイガート浄水施設",
    "タイラー郡ダートトラック",
    "Vault 63墜落現場",
    "ウェイド空港",
    "ランドン",
    "ベルチバード",
    "ホワイトパウダー・ウィンタースポーツ",
    "ホワイトスプリング",
    "ホワイトスプリング・リゾート",
    "アネットのアレンジメンツ",
    "アーティザンズ・ロウ",
    "ブルーリッジ・ギャラリー",
    "クラウス＆カンパニー",
    "デコラ",
    "マダム・テイラーズ",
    "スプリングヒル・ゴルフコース",
    "スプリングハウス",
    "ホワイトスプリング・バンカー",
    "中華人民共和国",
    "エンクレイヴ石油リグ",
    "ポセイドン・エネルギー",
    "ポセイドン・ガソリン",
    "ポセイドン・オイル",
    "PoseidoNet",
    "積灰の山",
    "放棄された鉱山坑道1",
    "放棄された鉱山坑道2",
    "放棄された鉱山坑道3",
    "モール・マイナー",
    "放棄された鉱山坑道4",
    "放棄された鉱山坑道5",
    "放棄された鉱山坑道6",
    "放棄された鉱山坑道イレーン",
    "放棄された鉱山サイト・キタリー",
    "AMSテストサイト",
    "ウルトラサイト",
    "積灰の山マーケットプレイス",
    "シュガー・グローヴ",
    "アブラクソダイン・ケミカル配電所",
    "アブラクソダイン・オフィス",
    "オールバニー",
    "アッシュ・ケイブ",
    "アテネ",
    "アテネ武器庫",
    "アテネ精神病院",
    "ビッグ・マスキーのバケット",
    "バーニング・スプリングス（地域）",
    "鎖で封じられた農場",
    "チェックポイント・キャニオン",
    "ダイノ・ピークス・ミニゴルフ",
    "ダウ湖流域",
    "エンクレイヴ・ベルチバード墜落地点",
    "フォート・スチューベン",
    "ハイウェイ・タウン",
    "ホッキング・ヒルズ・ステーション",
    "ホッキング・ヒルズ州立公園",
    "ハニーウェル養蜂場",
    "ムーンベイル・トンネル",
    "サンディーズ・ソック・ホップ",
    "シェイド・ヒル教会",
    "南オハイオ避難センター",
    "スターライト・ドライブイン（BS）",
    "ストラウズ・ラン州立公園",
    "エグゼクティブの部屋",
    "ハムリー・ラン・キャンプ",
    "ジャクソン・ジャンクヤード",
    "ラスト・リゾート",
    "メドウ・ブリーズ貯蔵庫",
    "プロスペクト・ヒル",
    "鉄道整備場",
    "サンド・フォーク製材所",
    "スーパー・デューパー・マート（BS）",
    "ザ・チョップ・ショップ",
    "ラスト・キングダム",
    "タイクーン・レイク",
    "ウェストブルック牧場",
    "ワールド・オブ・コーン",
    "アーロンホルト農家",
    "放棄された湿原の町",
    "放棄されたバンカー",
    "放棄鉱山キタリー",
    "放棄された廃棄場",
    "アビーのバンカー",
    "アデレードのダイナー",
    "アルパイン・リバー・キャビンズ",
    "AMS本社ビル",
    "Appalachia",
    "アパラチアン・アンティーク",
    "水上トイレ小屋",
    "A.T.H.E.N.A.",
    "ATLAS天文台",
    "Autumn Acre Cabin",
    "AVR Medical Center",
    "ベイリー家のキャビン",
    "バスティオン・パーク",
    "ベックリーの獣の巣",
    "ベッカー農場",
    "Beckley Mine Exhibit",
    "Beckley",
    "ベルチング・ベティ",
    "バークレー・スプリングス駅",
    "バークレー・スプリングス西",
    "バークレー・スプリングス",
    "自転車の墓場",
    "ビッグ・アルのタトゥーパーラー",
    "ビッグベンド・トンネル・キャンプサイト",
    "ビッグベンド・トンネル東口",
    "Big Bend Tunnel West",
    "ビッグベンド・トンネル",
    "ビッグBの休憩所",
    "ビッグ・モウ",
    "ビッグ・パパ・モーのサンドイッチ小屋",
    "Bigfoot",
    "ブラックベア・ロッジ",
    "ブラックマウンテン兵器工場",
    "ブラックウォーター鉱山",
    "ブレイクの供物",
    "ブリーディング・ケイトのグラインドハウス",
    "ブラッドイーグル・キャンプ",
    "ブルーリッジ・バンクハウス",
    "ボグ水路シェルター",
    "ボルトン・グリーンズ",
    "密造酒業者の小屋",
    "Bramwell",
    "ブラクソンの医療品店",
    "ブリム採石場",
    "ブロートフライ",
    "B.O.S. 共同墓地",
    "バッズ・バッズ",
    "Just a moment...",
    "バーデット邸",
    "バーニング・スプリングス",
    "カムデンパーク",
    "キャンプ・アダムス見張り台",
    "キャンプ・アダムス",
    "キャンプ・マクリントック",
    "キャンプ・ベンチャー",
    "カールトン鉱山",
    "Carrot Flower",
    "Carrot",
    "カーソン家のバンカー",
    "カマドウマ",
    "セントラル・マウンテン見張り台",
    "Charleston Capitol Building",
    "Charleston Capitol Courthouse",
    "Charleston Capitol DMV",
    "Charleston Emergency Government",
    "Charleston Fire Department",
    "Charleston Herald building",
    "チャールストン埋立地",
    "Charleston",
    "チーズハウス",
    "ケム&フープの小屋",
    "Chicken",
    "クラークスバーグ射撃クラブ",
    "クラークスバーグ",
    "クリフウォーク・トラック",
    "クリフウォッチ",
    "コブルトン農場",
    "ケリー大佐記念碑",
    "Commie-Kazi",
    "Commissioner Chaos",
    "改装弾薬工場",
    "クランベリー湿原",
    "クランベリー・グレイド",
    "クランベリー・ハイツ",
    "墜落した複葉機（グラニンジャー農場）",
    "墜落した飛行機",
    "クレーター前哨基地",
    "クレーター監視所",
    "クリークサイド・サンデュー叢",
    "クレバス・ダム",
    "クリムゾン・プロスペクト",
    "Cutthroats",
    "Cynnoc",
    "ダブニー農家",
    "ダガーズ・デン",
    "David Thorpe",
    "ディープ・スリープ・プロジェクト",
    "デラノ・グレンジ",
    "荒廃した鉱山",
    "デビルズ・バックボーン",
    "ドリー・ソッズ・キャンプ場",
    "ドリー・ソッズ見張り台",
    "ドリー・ソッズ・レンジャーステーション",
    "ドリー・ソッズ荒野",
    "Support the Archives",
    "Dontrelle Haines",
    "Dr Brainwash",
    "ドロップサイト C2",
    "ドロップサイト G3",
    "ドロップサイト V9",
    "ドラムリン・ダイナー",
    "ダスティ・ヒープ",
    "ダイアー・ケミカル",
    "イースト・マウンテン見張り台",
    "イースト・リッジ見張り台",
    "イーストストリート銀行",
    "東部地域刑務所",
    "エラ・エイムズのバンカー",
    "エマーソン・ヘイル",
    "Emmett Mountain Disposal Site",
    "エメット・マウンテン採掘施設",
    "エンクレイヴ",
    "エクセルシオール・モデルホーム",
    "Just a moment...",
    "Fallout",
    "Fallout 2",
    "Fallout 3",
    "Fallout: New Vegas",
    "Fallout Tactics: Brotherhood of Steel",
    "遠くのツリーハウス",
    "連邦廃棄場 HZ-21",
    "ファイアベース・ハンコック",
    "ファイアベース LT",
    "ファイアベース・メジャー",
    "ファイアベース MG",
    "釣り人の休息所",
    "フィッシャーサイト・プライム",
    "フラットウッズ集会場",
    "フラットウッズ",
    "水没した操車場",
    "Fallout 76 攻略ガイド",
    "フォート・ディファイアンス",
    "前進基地アルファ",
    "前進基地デルタ",
    "前進基地タンゴ",
    "ファウンデーション前哨基地",
    "フレディ・フィアーの地下室",
    "フレディ・フィアーのお化け屋敷",
    "フレッシュ・ソイル・レストラン",
    "フレイヤのレストラン",
    "Friendly",
    "Future-Tec",
    "ガラハン邸",
    "Garrahan Mining Headquarters",
    "ガラハン・マイニング本社",
    "G.E.C.K.",
    "ギース・ベリー・ボグ",
    "ギルマン製材所",
    "ガラス化した洞窟",
    "グリーミング・デプス",
    "Glowing Fungus",
    "ナールド・シャローズ",
    "ゴーリー鉱山",
    "ゴージ・ジャンクヤード",
    "Gourmands",
    "グラフトン・ダム",
    "グラフトン高校",
    "グラフトン湖",
    "グラフトン質店",
    "グラフトン警察署",
    "グラフトン駅",
    "グラフトン製鉄地下",
    "グラフトン製鉄ヤード",
    "グラフトン製鉄所",
    "グラフトン",
    "グラニンジャー農場",
    "グリーン・カントリー橋",
    "ガルパー・ラグーン",
    "Hank MacLean",
    "ハーパーズ・フェリー兵器庫",
    "ハーパーズ・フェリー・クリニック",
    "ハーパーズ・フェリー操車場",
    "ハーパーズ・フェリー",
    "ハリソン・ハイツ",
    "ヘイブン教会",
    "ホークの隠れ家",
    "ヘムロック・ホールズ整備場",
    "ヘムロック・ホールズ",
    "ハイランド・マーシュ",
    "ヒルフォーク・ホットドッグ",
    "丘上パイロンキャンプ",
    "ハニーハウス",
    "ホップの墓",
    "Hopewell Cave",
    "ホーンライト空気清浄機サイト 01",
    "ホーンライト空気清浄機サイト 02",
    "ホーンライト空気清浄機サイト 03",
    "ホーンライト空気清浄機サイト 04",
    "Hornwright Air Purifier Site 01",
    "Hornwright Air Purifier Site 02",
    "Hornwright Air Purifier Site 03",
    "Hornwright Air Purifier Site 04",
    "ホーンライト邸",
    "ホーンライト・インダストリアル本社",
    "ホーンライト・テストサイト 2",
    "ホーンライト・テストサイト 3",
    "ホーンライト・テストサイト 4",
    "ホーンライト試験サイト #03",
    "Hornwright Testing Site 2",
    "Hornwright Testing Site 3",
    "ヒューブリス・コミックス＆トイズ",
    "ハンターズ・リッジ",
    "ハンターの小屋",
    "ハンターズヴィル",
    "イングラム邸",
    "調査官のキャビン",
    "ジャネルのキャンプ",
    "ジョーのスパッキーズ",
    "Joey Bello",
    "Johnson's Acre",
    "ジューキー・ヘアサロン",
    "カナワ国立公園",
    "Katherine Swan",
    "カーウッド鉱山",
    "キディ・コーナー・キャビンズ",
    "KMAX送信塔",
    "ナイフ・エッジ",
    "レディ・ジャネットのソフトクリーム",
    "レイノルズ湖",
    "ランドビュー灯台",
    "Leo Petrov",
    "ルイス＆サンズ農業用品店",
    "ルイスバーグ駅",
    "ルイスバーグ",
    "失われた家",
    "ラバーズ・リープ",
    "Lucky Hole Mine",
    "マックの農場",
    "ママ・ドルチのフードプロセッシング",
    "Manta Man",
    "Maria Chavez",
    "沼地のコテージ",
    "Maul",
    "メカニックの金属小屋",
    "The Mechanist",
    "メガ・マンション",
    "Melody Larkin",
    "Middle Mountain Cabins",
    "ミドル・マウンテン・レイク",
    "ミラーの家電店",
    "マイアの眼",
    "Mistress of Mystery",
    "MODUS",
    "Moe the Mole",
    "モノンガー鉱山",
    "モノンガー展望台",
    "モノンガー発電所",
    "Monongah",
    "モノンガヒラ国立森林",
    "モノレール・エレベーター",
    "密造酒業者の小屋",
    "モーガンタウン空港ターミナル",
    "Morgantown Airport",
    "モーガンタウン高校",
    "Morgantown Monorail",
    "モーガンタウン操車場",
    "Morris Stevens",
    "モスタウン",
    "モスホーム",
    "マザーロード取得施設",
    "モスマン博物館",
    "マウント・ブレア・コーヒー小屋",
    "マウント・ブレア操車場",
    "マウント・ブレア",
    "マウンテンサイド B&amp;B",
    "マウンテンサイド・ファーム",
    "マウンテンサイド駅",
    "NAR修理ヤード",
    "国立隔離無線アレイ",
    "National Radio Astronomy Research Center",
    "隣接する農家",
    "ニュー・アパラチアン中央操車場",
    "ニューガッド",
    "ニューリバー峡谷リゾート",
    "New River Gorge Ropes Course",
    "ニューリバー峡谷ロープコース",
    "New River",
    "ニコルソンの最期",
    "ノース・カットスロート・キャンプ",
    "北カナワ見張り台",
    "North Road Bridge",
    "ヌカケイド",
    "Nuka-Girl",
    "ヌカ・ランチャー",
    "ヌカシャイン",
    "ヌカワールド・オン・ツアー",
    "Just a moment...",
    "天文台",
    "オールド・モールド採石場",
    "オールド・ピートの終焉地",
    "古い倉庫",
    "Oliver Fields",
    "繁茂したサンデュー叢",
    "監督官のキャンプ",
    "Palace of the Winding Path",
    "フィリッピ戦場墓地",
    "フィリッピ",
    "パイ・ハウス",
    "パイオニア・スカウト・キャンプ",
    "パイオニア・スカウト見張り台",
    "Pip-Boy (character)",
    "プレザントヒルズ墓地",
    "Pleasant Valley Cabins",
    "Pleasant Valley Ski Resort",
    "プレザント・バレー駅",
    "ポセイドン変電所 PX-01",
    "ポセイドン変電所 PX-02",
    "ポセイドン変電所 PX-03",
    "プレッパーのパイロン天国",
    "プリケットの砦",
    "Pumpkin House",
    "パイロン待ち伏せ地点",
    "パイロン V-13",
    "Pyramind",
    "採石場 X3",
    "Quinn Carter",
    "Ragnarök",
    "Raider Punk",
    "ローリー・クレイのバンカー",
    "レンジャー管区事務所",
    "レンジャー見張り台",
    "略奪されたバンカー",
    "レッドロケット（湿原の町）",
    "レッドロケット給油所",
    "レッドロケット・メガストップ",
    "レッドロケット（荒れた境域）",
    "レッドロケット（サットン）",
    "レッドロケット（バレー・ギャレリア）",
    "リレータワー EL-B1-02",
    "中継塔 HG-B7-09",
    "リレータワー LW-B1-22",
    "Resources",
    "Responders",
    "R&amp;Gプロセッシング・サービス",
    "Rip Daring",
    "Ripper Alley",
    "川沿いのツリーハウス",
    "リバーサイド・コテージ",
    "RobCo研究センター",
    "ロリンズ労働キャンプ",
    "Rosalynn Jeffries",
    "Rose MacLean",
    "Rules",
    "ザ・サクラメント",
    "聖別の空地",
    "セーフ・アンド・クリーン廃棄場",
    "Sal's Grinders",
    "Sam Blackwell",
    "サム・ブラックウェルのバンカー",
    "Sam Nguyen",
    "SamurEye",
    "Sanjay Kumar",
    "スカーレット・メドウズ・コテージ",
    "スクートの小屋",
    "Season &amp; Events",
    "セネカ・ギャング・キャンプ",
    "Seneca Rocks Visitor Center",
    "セネカ・ロックス",
    "入植者のコテージとバンカー",
    "Settler Forager",
    "Settler Wanderer",
    "セトラーズ・リッジ",
    "シェナンドー川",
    "サイロ補給小屋",
    "Silver Shroud",
    "サイト・アルファ",
    "Site Bravo",
    "Site Charlie",
    "スケルトン・ラフト",
    "スカルボーン・ヴァンテージ",
    "スローカムズ・ジョー",
    "スローカムズ・ジョー（ワトガ）",
    "スラッジ・トレーラー",
    "スラリー・ラン",
    "スミス農場",
    "SODUS",
    "Sofia Daguerre",
    "ソギー・ボトム",
    "ソロモン・ハーディ",
    "サンズ・オブ・デーン・コンパウンド",
    "サウス・カットスロート・キャンプ",
    "サウス・マウンテン見張り台",
    "サウス・マウンテン核クレーター",
    "South Road Bridge",
    "サザン・ベル・モーテル",
    "サウスハンプトン邸",
    "まばらなサンデュー叢",
    "スプルース・ノブ水路",
    "Spruce Knob Lake",
    "スプルース・ノブ・ワークショップ",
    "スプルース・ノブ",
    "Stanislaus Braun (スタニスラウス・ブラウン)",
    "スティーヴン・スカーベリー",
    "ストーニー・クリーク駅",
    "ストライカー・ロウ",
    "スチュアートのデパート",
    "サミット・オブ・ザ・ワールド",
    "サンデー兄弟のキャビン",
    "沈んだ教会",
    "サニートップ・ベースロッジ",
    "Sunnytop Ski Lanes",
    "サニートップ駅",
    "サンライズ・フィールド",
    "サンシャイン・メドウズ工業農場",
    "スーパーデューパーマート（モーガンタウン）",
    "スーパーデューパーマート（ワトガ）",
    "スーペリア・サンセット農場",
    "サーリーの小屋",
    "測量キャンプ・アルファ",
    "サットン駅",
    "ソードハンターズ・キャンプ",
    "タナグラ・タウン",
    "バーニング・マイン",
    "ザ・バロウズ",
    "ザ・クープ",
    "ザ・コア",
    "クレーター作戦室",
    "ザ・クレーター",
    "The Diabolicals",
    "森林地帯",
    "ジェネラルのステーキハウス",
    "巨大ティーポット",
    "The Inspector",
    "マイア",
    "ヌカシャイン",
    "ザ・リトリート",
    "ラスティ・ピック",
    "スラッジ・ホール",
    "ザ・スラッジ・ワークス",
    "ザ・ソーン",
    "ホワイトスプリング・ゴルフクラブ",
    "ホワイトスプリング駅",
    "Thompson",
    "サンダー・マウンテン発電所",
    "サンダーマウンテン発電所ヤード",
    "サンダーマウンテン変電所 TM-01",
    "サンダーマウンテン変電所 TM-02",
    "トップ・オブ・ザ・ワールド",
    "有毒干上がり湖底",
    "有毒池と残骸",
    "トキシックバレー",
    "トラッパーズ・キャンプ",
    "ツリーハウス・ビレッジ",
    "ツリートップス",
    "トンネル・オブ・ラブ",
    "ツイン・レイクス",
    "ツインパイン・キャビンズ",
    "タイガートバレー川",
    "タイラー郡フェアグラウンド",
    "不気味な洞窟群",
    "I-65橋の下",
    "未完成の邸宅",
    "United States of America",
    "US-13C 野営地",
    "合衆国宇宙管理局 (U.S.S.A.)",
    "バレー・ギャレリア",
    "ヴァンロウ剥製店",
    "Vault Dweller (ヴォルト・ドゥエラー)",
    "Vault 112",
    "Vault 63 アトリウム",
    "Vault 63 エンジニアリング区画",
    "Vault 63 気象学区画",
    "Vault 63 オーガニクス区画",
    "Vault 63",
    "Vault 76",
    "ボルト 79",
    "Vault Boy",
    "Vault Girl",
    "Vault-Tec農業研究センター",
    "隠されたサンデュー叢",
    "ベスタの日用品店",
    "ワトガの野外ステージ",
    "ワトガ・シビックセンター",
    "ワトガ緊急サービス",
    "ワトガ・エステーツ",
    "ワトガ高校",
    "ワトガ市役所",
    "ワトガ不動産",
    "ワトガ・ショッピングプラザ",
    "ワトガ駅",
    "ワトガ・タワーズ",
    "ワトガ・トランジットハブ",
    "ワトガ・アンダーグラウンド",
    "ワトガ大学",
    "ワトガ",
    "ウェイビー・ウィラードのウォーターパーク",
    "The Wayward (ザ・ウェイワード)",
    "ウェルチ駅",
    "ウェルチ",
    "Wendigo Cave",
    "ウエスト・テック研究センター",
    "Western Revolver",
    "ホワイトスプリング・バンカー",
    "ホワイトスプリング・コテージ",
    "ホワイトスプリング・ドライビングレンジ",
    "ホワイトスプリング・ゴルフクラブ",
    "ホワイトスプリング見張り台",
    "ホワイトスプリング大統領別荘と博物館",
    "ホワイトスプリング避難所",
    "ホワイトスプリング・リゾート",
    "ホワイトスプリング・サービスエントランス",
    "ホワイトスプリング駅",
    "ウィドウズ・パーチ",
    "ウィラード企業住宅",
    "ウィルソン兄弟自動車修理工場",
    "ウィクソン農家",
    "ウッズ邸",
    "WV製材会社",
    "Xerxo",
    "Yasmin Chowdhury",
    "イエロー・サンディの蒸留所",
    "ヌカシャイン",
    "ブロートフライ",
    "ボルトテック・コーポレーション",
    "変異パブリック��ベント",
    "��スローカム・ジョー",
];

function isDuplicate(title) {
    for (let kw of duplicateKeywords) {
        if (title.includes(kw)) {
            return true;
        }
    }
    return false;
}

function guessCategoryAndAppearance(title, bodyText) {
    let cat = "";
    let apps = new Set();
    const t = title.toLowerCase();
    const b = bodyText ? bodyText.toLowerCase() : "";

    if (/(駅|小屋|邸宅|集会所|タワー|農場|工場|キャンプ|・リッジ|ロッジ|会社|製造所|橋|灯台|研究所|パビリオン|酒場|教会|Vault|廃品集積場)/.test(t)) cat = "場所";
    if (/(ピストル|ガン|ライフル|アサルト|ブランダーバス|剣|弓|頭部|フレア)/.test(t)) cat = "武器";
    if (/(レイダー|エンクレイヴ|入植者|フリーラジカルズ|レスポンダー|ブラザーフッド|BOS|カルト)/.test(t)) cat = "勢力";
    if (/(アングラー|スコーチ|ウェンディゴ|ブロートフライ|アサルトロン|ハンディ|プロテクトロン|モールラット|アリ|デスクロー|ビーバー|犬|ラット|ゼータ|モスマン)/.test(t)) cat = "クリーチャー";
    if (/(花|ハルシジェン|ブライト|ユッカ|キノコ|茸|カボチャ|スーザン|マリーゴールド)/.test(t)) cat = "植物";
    if (/(メンタス|スティムパック|rad-x|radaway|サイコ|アディクトール|ヌカシャイン|コーラ|サルサパリラ|フード|シュガーボム)/.test(t)) cat = "アイテム";

    apps.add("Fallout 76");
    if (t.includes("fallout tv") || t.includes("ドラマ") || b.includes("ドラマ版")) apps.add("Fallout TV");
    if (t.includes("new vegas") || b.includes("new vegas") || b.includes("ニューベガス")) apps.add("Fallout: New Vegas");
    if (t.includes("fallout 4") || b.includes("連邦")) apps.add("Fallout 4");
    if (t.includes("fallout 3") || b.includes("キャピタル")) apps.add("Fallout 3");
    if (b.includes("fallout 1") || b.includes("fallout 2")) {
        if (b.includes("fallout 1")) apps.add("Fallout");
        if (b.includes("fallout 2")) apps.add("Fallout 2");
    }
    return { category: cat, appearance: Array.from(apps) };
}

async function rebuildLoreHtml() {
    if (!fs.existsSync(DATA_FILE) || !fs.existsSync(LORE_HTML)) {
        console.log('Required files not found.');
        return;
    }

    const dataRaw = fs.readFileSync(DATA_FILE, 'utf8');
    const articles = JSON.parse(dataRaw);
    let loreContent = fs.readFileSync(LORE_HTML, 'utf8');

    const regex = /const loreEntries = \[[\s\S]*?\];/;
    let finalEntriesObjStr = `const loreEntries = [\n`;

    // 1. まず手作業で作った完全版を配列へ追加（draftはisDraft:trueフラグ付き）
    manualEntries.forEach(e => {
        const isDraft = e.status === 'draft';
        if (isDraft) {
            console.log(`[Draft] ${e.name} - isDraft:trueで出力`);
        }
        finalEntriesObjStr += `            {
                name: ${JSON.stringify(e.name)},
                yomi: ${JSON.stringify(e.yomi)},
                url: ${JSON.stringify(e.url)},
                category: ${JSON.stringify(e.category)},
                appearance: ${JSON.stringify(e.appearance)},
                date: ${JSON.stringify(e.date)}${isDraft ? ',\n                isDraft: true' : ''}
            },\n`;
    });

    let removedCount = 0;
    const usedFilenames = new Set();
    const protectedFiles = [
    "brotherhood-of-steel",
    "lore", 'tandi', 'raiders_76', 'blight', 'ncr', 'prize_bot', 'assaultron_head', 'lee_moldaver', 'vault_dweller_lore', 'vault_dweller_jp', 'wayward_jp', 'buffalo-gourd-seed', 'vault_tec', 'armor-ace', 'billings-homestead', 'fallout-76-pets', 'bloodleaf', 'single-action-revolver', 'cabbage', 'vault', 'catarax', 'lucy-maclean', 'biplane-crash-anchor-farm', 'birdhouse-ridge', 'birdwatchers-platform', 'black-mountain-ordnance-works', 'daphne', 'charleston-station', 'charleston-trainyard', 'first-friends-church', 'hornwright-industrial-headquarters', 'liberty-bell', 'slocums-joe-charleston', 'south-side-bridge', 'tattoo-parlor', 'west-charleston-bridge', 'clancy-manor', 'covered-bridge', 'cultist-totem', 'cow-spots-creamery', 'darling-sisters-lab', 'deathclaw-island', 'deathclaw', 'east-kanawha-lookout', 'vault-tec-agricultural-research-center', 'flatwoods-lookout', 'cheswick', 'flatwoods-river', 'kesha-mcdermott', 'mama-dolces-food-processing', 'fujiniya-intelligence-base', 'appalachian-launch-codes', 'stealth-technology', 'chinese-stealth-armor', 'sino-american-war', 'divergence', 'stealth-boy', 'game-of-thrones', 'gregs-mine-supply', 'holdingford-homestead', 'golf-cart', 'horizons-rest', 'hornwright-summer-villa', 'huntsmans-glade', 'j-schrams-house', 'kanawha-county-cemetery', 'kanawha-nuka-cola-plant', 'kanawha-river', 'lakeside-cabins', 'lewis-and-sons-farming-supply', 'limousine-crash', 'morgantown', 'ohio-river', 'ohio-river-adventures', 'orwell-orchards', 'overlook-cabin', 'overseers-home', 'party-time-diners', 'portside-pub', 'poseidon-energy-plant-wv-06', 'hallucigen-inc', 'poseidon-energy-plant-yard', 'poseidon-power-substation-px-01', 'poseidon-power-substation-px-02', 'prehistoric-bones-camp', 'priblos-curios', 'red-rocket-flatwoods', 'red-rocket-giant-teapot', 'red-rocket-morgantown', 'relay-tower-em-b1-27', 'relay-tower-hn-b1-12', 'riverside-manor', 'veil-of-secrets', 'seeker-of-mysteries', 'the-mistress-of-mystery', 'olivia-rivers', 'frederick-rivers', 'shannon-rivers', 'sacrifice-altar', 'safecrackers-shack', 'shadowbreeze-apartments', 'silva-homestead', 'soapy-skeleton', 'sugarmaple', 'summersville-dam', 'summersville-docks', 'summersville-lake', 'sunshine-meadows-industrial-farm', 'teddy-bear-house', 'the-deep', 'the-kill-box', 'the-pigsty', 'torrance-house', 'brody-torrance', 'transmission-station-1at-u03', 'tygart-water-treatment', 'tyler-county-dirt-track', 'vault-63-crash-site', 'wade-airport', 'landon', 'vertibird', 'white-powder-winter-sports', 'the-whitespring', 'the-whitespring-resort', 'anettes-arrangements', 'artisans-row-shoppes', 'blue-ridge-gallery', 'claus-and-co', 'decorat', 'madame-taylors', 'springhill-golf-course', 'the-springhouse', 'the-whitespring-bunker', 'china', 'enclave-oil-rig', 'poseidon-energy', 'poseidon-gasoline', 'poseidon-oil', 'poseidonet', 'ash-heap', 'abandoned-mine-shaft-1', 'abandoned-mine-shaft-2', 'abandoned-mine-shaft-3', 'mole-miner', 'abandoned-mine-shaft-4', 'abandoned-mine-shaft-5', 'abandoned-mine-shaft-6', 'abandoned-mine-shaft-elaine', 'abandoned-mine-site-kittery', 'ams-testing-site', 'vault-tec-university', 'ultracite', 'ash-heap-marketplace', 'sugar-grove', 'abraxodyne-chemical-power-substation', 'abraxodyne-office', 'albany', 'ash-cave', 'athens', 'athens-armory', 'athens-lunatic-asylum', 'big-muskies-bucket', 'burning-springs-region', 'chained-up-farm', 'checkpoint-canyon', 'dino-peaks-mini-golf', 'dow-lake-watershed', 'enclave-vertibird-crash-site', 'fort-steuben', 'highway-town', 'hocking-hills-station', 'hocking-hills-state-park', 'honey-well-apiary', 'moonvale-tunnel', 'sandys-sock-hop', 'shade-hill-church', 'south-ohio-evacuation-center', 'starlight-drive-in-bs', 'strouds-run-state-park', 'executives-apartment', 'hamley-run-camp', 'jackson-junkyard', 'last-resort', 'meadow-breeze-storage-depot', 'prospect-hill', 'railroad-service-yard', 'sand-fork-lumber', 'super-duper-mart-bs', 'the-chop-shop-bs', 'the-rust-kingdom', 'tycoon-lake', 'westbrook-horse-ranch', 'world-of-corn', 'aaronholt-homestead', 'abandoned-bog-town', 'abandoned-bunker', 'abandoned-mine-kittery', 'abandoned-waste-dump', 'abbies-bunker', 'adelaides-diner', 'alpine-river-cabins', 'ams-corporate-headquarters', 'appalachia', 'appalachian-antiques', 'aquatic-outhouse', 'athena', 'atlas-observatory', 'autumn-acre-cabin', 'avr-medical-center', 'bailey-family-cabin', 'bastion-park', 'beast-of-beckleys-den', 'becker-farm', 'beckley-mine-exhibit', 'beckley', 'belching-betty', 'berkeley-springs-station', 'berkeley-springs-west', 'berkeley-springs', 'bicycle-graveyard', 'big-als-tattoo', 'big-bend-tunnel-campsite', 'big-bend-tunnel-east', 'big-bend-tunnel-west', 'big-bend-tunnel', 'big-bs-rest-stop', 'big-maw', 'big-papa-moes', 'bigfoot', 'black-bear-lodge', 'black-mountain-ordnance', 'blackwater-mine', 'blakes-offering', 'bleeding-kates-grindhouse', 'blood-eagle-camp', 'blue-ridge-bunkhouse', 'bog-channel-shelter', 'bolton-greens', 'bootleggers-shack', 'bramwell', 'braxsons-quality-medical', 'brim-quarry', 'broat-fries_2', 'brotherhood-graveyard', 'buds_buds', 'buds_full', 'burdette-manor', 'burning-springs', 'camden-park', 'camp-adams-lookout', 'camp-adams', 'camp-mcclintock', 'camp-venture', 'carleton-mine', 'carrot-flower', 'carrot', 'carson-family-bunker', 'cave_cricket', 'central-mountain-lookout', 'charleston-capitol-building', 'charleston-capitol-courthouse', 'charleston-capitol-dmv', 'charleston-emergency-government', 'charleston-fire-department', 'charleston-herald-building', 'charleston-landfill', 'charleston', 'cheese-haus', 'chem-hoop-shack', 'chicken', 'clarksburg-shooting-club', 'clarksburg', 'cliffwalk-track', 'cliffwatch', 'cobbleton-farm', 'colonel-kelly-monument', 'commie-kazi', 'commissioner-chaos', 'converted-munitions-factory', 'cranberry-bog', 'cranberry-glade', 'cranberry-heights', 'crashed-biplane-graninger', 'crashed-plane-mire', 'crater-outpost', 'crater-watchstation', 'creekside-sundew-grove', 'crevasse-dam', 'crimson-prospect', 'cutthroats', 'cynnoc', 'dabney-homestead', 'daggers-den', 'david-thorpe', 'deep-sleep-project', 'delano-grange', 'deserted-mine', 'devils-backbone', 'dolly-sods-campground', 'dolly-sods-lookout', 'dolly-sods-ranger-station', 'dolly-sods-wilderness', 'donate', 'dontrelle-haines', 'dr-brainwash', 'drop-site-c2', 'drop-site-g3', 'drop-site-v9', 'drumlin-diner-watoga', 'dusty-heap', 'dyer-chemical', 'east-mountain-lookout', 'east-ridge-lookout', 'east-street-bank', 'eastern-regional-penitentiary', 'ella-ames-bunker', 'emerson-hale', 'emmett-mountain-disposal-site', 'emmett-mountain-mining-facility', 'enclave', 'excelsior-model-home', 'f76', 'fallout-1', 'fallout-2', 'fallout-3', 'fallout-new-vegas', 'fallout-tactics', 'faraway-treehouse', 'federal-disposal-field-hz-21', 'firebase-hancock', 'firebase-lt', 'firebase-major', 'firebase-mg', 'fishermans-rest', 'fissure-site-prime', 'flatwoods-meeting-hall', 'flatwoods', 'flooded-trainyard', 'fo76-guide', 'fort-defiance', 'forward-station-alpha', 'forward-station-delta', 'forward-station-tango', 'foundation-outpost', 'freddy-fears-basement', 'freddy-fears-house-of-scares', 'fresh-soil-restaurant', 'freyjas-haus', 'friendly', 'future-tec', 'garrahan-estate', 'garrahan-mining-headquarters', 'garrahan-mining-hq', 'geck', 'giese-berry-bog', 'gilman-lumber-mill', 'glassed-cavern', 'gleaming-depths', 'glowing-fungus', 'gnarled-shallows', 'gorey-mines', 'gorge-junkyard', 'gourmands', 'grafton-dam', 'grafton-high-school', 'grafton-lake', 'grafton-pawn-shop', 'grafton-police-department', 'grafton-station', 'grafton-steel-underground', 'grafton-steel-yard', 'grafton-steel', 'grafton', 'graninger-farm', 'green-country-bridge', 'gulper-lagoon', 'hank-maclean', 'harpers-ferry-armory', 'harpers-ferry-clinic', 'harpers-ferry-trainyard', 'harpers-ferry', 'harrison-heights', 'haven-church', 'hawkes-refuge', 'hemlock-holes-maintenance', 'hemlock-holes', 'highland-marsh', 'hillfolk-hotdogs', 'hilltop-pylon-camp', 'honey-haus', 'hop-graves', 'hopewell-cave', 'hornwright-air-purifier-01', 'hornwright-air-purifier-02', 'hornwright-air-purifier-03', 'hornwright-air-purifier-04', 'hornwright-air-purifier-site-01', 'hornwright-air-purifier-site-02', 'hornwright-air-purifier-site-03', 'hornwright-air-purifier-site-04', 'hornwright-estate', 'hornwright-industrial-hq', 'hornwright-testing-2', 'hornwright-testing-3', 'hornwright-testing-4', 'hornwright-testing-site-03', 'hornwright-testing-site-2', 'hornwright-testing-site-3', 'hubris-comics-watoga', 'hunters-ridge', 'hunters-shack', 'huntersville', 'ingram-mansion', 'investigators-cabin', 'janelles-camp', 'joes-spuckies', 'joey-bello', 'johnsons-acre', 'jooky-hair-salon', 'kanawha-national-park', 'katherine-swan', 'kerwood-mine', 'kiddie-corner-cabins', 'kmax-transmission', 'knife-edge', 'lady-janets-soft-serve', 'lake-reynolds', 'landview-lighthouse', 'leo-petrov', 'lewis-sons-farming', 'lewisburg-station', 'lewisburg', 'lost-home', 'lovers-leap', 'lucky-hole-mine', 'macs-farm', 'mama-dolces', 'manta-man', 'maria-chavez', 'marsh-cottage', 'maul', 'mechanics-metal-shack', 'mechanist', 'mega-mansion', 'melody-larkin', 'middle-mountain-cabins', 'middle-mountain-lake', 'millers-appliances', 'mires-eye', 'mistress-of-mystery', 'modus', 'moe-the-mole', 'monongah-mine', 'monongah-overlook', 'monongah-power-plant', 'monongah', 'monongahela-national-forest', 'monorail-elevator', 'moonshiners-shack', 'morgantown-airport-terminal', 'morgantown-airport', 'morgantown-high-school', 'morgantown-monorail', 'morgantown-trainyard', 'morris-stevens', 'mosstown', 'moth-home', 'motherlode-acquisition-facility', 'mothman-museum', 'mount-blair-coffee-shack', 'mount-blair-trainyard', 'mount-blair', 'mountainside-bed-and-breakfast', 'mountainside-farm', 'mountainside-station', 'nar-repair-yard', 'national-isolated-radio-array', 'national-radio-astronomy-research-center', 'neighboring-homesteads', 'new-appalachian-central-trainyard', 'new-gad', 'new-river-gorge-resort', 'new-river-gorge-ropes-course', 'new-river-gorge-ropes', 'new-river', 'nicholsons-end', 'north-cutthroat-camp', 'north-kanawha-lookout', 'north-road-bridge', 'nuka-cade-fo76', 'nuka-girl', 'nuka-launcher', 'nuka-shine_2', 'nuka-world-on-tour', 'nw', 'observatory-savage-divide', 'old-mold-quarry', 'old-petes-end', 'old-storehouse', 'oliver-fields', 'overgrown-sundew-grove', 'overseers-camp', 'palace-of-the-winding-path', 'philippi-battlefield-cemetery', 'philippi', 'pi-house', 'pioneer-scout-camp', 'pioneer-scout-lookout', 'pip-boy-character', 'pleasant-hills-cemetery', 'pleasant-valley-cabins', 'pleasant-valley-ski-resort', 'pleasant-valley-station', 'poseidon-substation-px-01', 'poseidon-substation-px-02', 'poseidon-substation-px-03', 'preppers-pylon-paradise', 'pricketts-fort', 'pumpkin-house', 'pylon-ambush-site', 'pylon-v-13', 'pyramind', 'quarry-x3', 'quinn-carter', 'ragnarok', 'raider-punk', 'raleigh-clays-bunker', 'ranger-district-office', 'ranger-lookout-bog', 'ransacked-bunker', 'red-rocket-bog-town', 'red-rocket-filling-station', 'red-rocket-mega-stop', 'red-rocket-savage-divide', 'red-rocket-sutton', 'red-rocket-valley-galleria', 'relay-tower-el-b1-02', 'relay-tower-hg-b7-09', 'relay-tower-lw-b1-22', 'resources', 'responders', 'rg-processing-services', 'rip-daring', 'ripper-alley', 'river-treehouse', 'riverside-cottage-ash', 'robco-research-center', 'rollins-labor-camp', 'rosalynn-jeffries', 'rose-maclean', 'rules', 'sacrament', 'sacramental-glade', 'safe-n-clean-disposal', 'sals-grinders', 'sam-blackwell', 'sam-blackwells-bunker', 'sam-nguyen', 'samureye', 'sanjay-kumar', 'scarlett-meadows-cottage', 'scoots-shack', 'season', 'seneca-gang-camp', 'seneca-rocks-visitor-center', 'seneca-rocks', 'settler-cottage-bunker', 'settler-forager', 'settler-wanderer', 'settlers-ridge', 'shenandoah-river', 'silo-supply-shed', 'silver-shroud', 'site-alpha', 'site-bravo', 'site-charlie', 'skeleton-raft', 'skullbone-vantage', 'slocums-joe-fo76', 'slocums-joe-watoga', 'sludge-trailer', 'slurry-run', 'smith-farm', 'sodus', 'sofia-daguerre', 'soggy-bottom', 'solomon-hardy', 'sons-of-dane-compound', 'south-cutthroat-camp', 'south-mountain-lookout', 'south-mountain-nuke-crater', 'south-road-bridge', 'southern-belle-motel', 'southhampton-estate', 'sparse-sundew-grove', 'spruce-knob-channels', 'spruce-knob-lake', 'spruce-knob-workshop', 'spruce-knob', 'stanislaus-braun', 'steven-scarberry', 'stony-creek-station', 'striker-row', 'stuarts-department-store', 'summit-of-the-world', 'sunday-brothers-cabin', 'sunken-church', 'sunnytop-ski-lanes-base-lodge', 'sunnytop-ski-lanes', 'sunnytop-station', 'sunrise-field', 'sunshine-meadows-farm', 'super-duper-mart-morgantown', 'super-duper-mart-watoga', 'superior-sunset-farm', 'surlys-shack', 'survey-camp-alpha', 'sutton-station', 'sword-hunters-camp', 'tanagra-town', 'the-burning-mine', 'the-burrows', 'the-coop', 'the-core', 'the-crater-war-room', 'the-crater', 'the-diabolicals', 'the-forest', 'the-generals-steakhouse', 'the-giant-teapot', 'the-inspector', 'the-mire', 'the-nukashine', 'the-retreat', 'the-rusty-pick', 'the-sludge-hole', 'the-sludge-works', 'the-thorn-fo76', 'the-whitespring-golf-club', 'the-whitespring-station', 'thompson', 'thunder-mountain-power-plant', 'thunder-mountain-pp-yard', 'thunder-mountain-substation-tm-01', 'thunder-mountain-substation-tm-02', 'top-of-the-world', 'toxic-dried-lakebed', 'toxic-pond-wreckage', 'toxic-valley', 'trappers-camp', 'treehouse-village', 'treetops', 'tunnel-of-love-fo76', 'twin-lakes', 'twin-pine-cabins', 'tygart-valley-river', 'tyler-county-fairgrounds', 'uncanny-caverns', 'under-the-i-65-bridge', 'unfinished-mansion', 'united-states-of-america', 'us-13c-bivouac', 'ussa', 'valley-galleria', 'van-lowe-taxidermy', 'vault_dweller_jp', 'vault-112', 'vault-63-atrium', 'vault-63-engineering', 'vault-63-meteorology', 'vault-63-organics', 'vault-63', 'vault-76', 'vault-79', 'vault-boy', 'vault-girl', 'vault-tec-agricultural-research', 'veiled-sundew-grove', 'vestas-housewares', 'watoga-bandstand', 'watoga-civic-center', 'watoga-emergency-services', 'watoga-estates', 'watoga-high-school', 'watoga-municipal-center', 'watoga-real-estate', 'watoga-shopping-plaza', 'watoga-station', 'watoga-towers', 'watoga-transit-hub', 'watoga-underground', 'watoga-university', 'watoga', 'wavy-willards', 'wayward_jp', 'welch-station', 'welch', 'wendigo-cave', 'west-tek-research-center', 'western-revolver', 'whitespring-bunker', 'whitespring-cottages', 'whitespring-driving-range', 'whitespring-golf-club', 'whitespring-lookout', 'whitespring-presidential-cottage', 'whitespring-refuge', 'whitespring-resort', 'whitespring-service-entrance', 'whitespring-station', 'widows-perch', 'willard-corporate-housing', 'wilson-brothers-auto', 'wixon-homestead', 'woods-estate', 'wv-lumber-co', 'xerxo', 'yasmin-chowdhury', 'yellow-sandys-still', 'ヌカシャイン_2', 'ブロートフライ_2', 'ボルトテック・コーポレーション', '変異パブリックベント', 'スローカム・ジョー'];
    protectedFiles.forEach(f => usedFilenames.add(`${f}.html`));

    let titleToSlug = {};
    const slugPath = path.join(DIR, 'title_to_slug.json');
    if (fs.existsSync(slugPath)) {
        titleToSlug = JSON.parse(fs.readFileSync(slugPath, 'utf8'));
    }

    // 2. Note記事を追加（ただし重複するものは除外＆ファイルを削除）
    articles.forEach(article => {
        let sanitized = '';
        if (titleToSlug[article.title]) {
            sanitized = titleToSlug[article.title];
        } else {
            sanitized = article.title.replace(/[\\/:*?"<>|]/g, '_').trim();
            if (!sanitized) sanitized = 'untitled';
        }
        let htmlFilename = `${sanitized}.html`;
        let counter = 2;
        while (usedFilenames.has(htmlFilename)) {
            htmlFilename = `${sanitized}_${counter}.html`;
            counter++;
        }
        usedFilenames.add(htmlFilename);

        if (isDuplicate(article.title)) {
            removedCount++;
            console.log(`[Removed Duplicate] ${article.title}`);
            const htmlFilePath = path.join(DIR, htmlFilename);
            // 手動作成（protectedFiles）に含まれるファイルは削除しない
            if (fs.existsSync(htmlFilePath) && !protectedFiles.includes(sanitized)) {
                fs.unlinkSync(htmlFilePath);
            }
            return;
        }

        const safeTitle = article.title.replace(/"/g, '\\"');
        const dateStr = new Date(article.date).toISOString().split('T')[0];
        const { category, appearance } = guessCategoryAndAppearance(article.title, article.bodyHtml);

        finalEntriesObjStr += `            {
                name: ${JSON.stringify(article.title)},
                yomi: ${JSON.stringify(article.title)},
                url: ${JSON.stringify(htmlFilename)},
                category: ${JSON.stringify(category)},
                appearance: ${JSON.stringify(appearance)},
                date: ${JSON.stringify(dateStr)}
            },\n`;
    });

    finalEntriesObjStr = finalEntriesObjStr.slice(0, -2) + `\n        ];`;

    
    const INDEX_FILE = path.join(DIR, 'js', 'lore_index.js');
    const finalIndexContent = `${finalEntriesObjStr.trim().replace(/,$/, '')};`;
    fs.writeFileSync(INDEX_FILE, finalIndexContent, 'utf8');
    console.log(`Successfully regenerated ${INDEX_FILE}!`);

    if (regex.test(loreContent)) {
        loreContent = loreContent.replace(regex, finalEntriesObjStr);
        fs.writeFileSync(LORE_HTML, loreContent, 'utf8');
        console.log('Also updated loreEntries in lore.html for compatibility.');
    }
}

rebuildLoreHtml();
