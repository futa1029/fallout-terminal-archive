/**
 * Fallout 76 Perk データベース（Update 64対応）
 * fo76db.com + Fallout Wiki 準拠
 */

// fo76db.comと名前が異なるPerkの画像スラッグマッピング（完全版）
const PERK_IMAGE_OVERRIDES = {
    // === Strength ===
    "Easy Target": "Scattershot",
    "Love the Spread": "Scattershot",
    "Shotgun Champ": "Scattershot",
    "Wound Salter": "Gladiator",
    "Natural Stance": "Gladiator",
    "Blood Luster": "Gladiator",
    "Knee-Capper": "Slugger",
    "Heavy Hitter": "Slugger",
    "Bullet Storm": "Bullet-Shield",
    "Tightly Wound": "Bullet-Shield",
    "Bullet Shield": "Bullet-Shield",

    // === Perception ===
    "Down Ranger": "Long-Shot",
    "Scoped-up": "Long-Shot",
    "Smart Shot": "Long-Shot",
    "Center Masochist": "Ground-Pounder",
    "Fast Fighter": "Ground-Pounder",
    "Number Cruncher": "Ground-Pounder",
    "Concentrated Fire": "Concentrated-Fire",
    "Butcher's Bounty": "Butchers-Bounty",
    "Green Thumb": "Green-Thumb",
    "Crack Shot": "Crack-Shot",
    "Ground Pounder": "Ground-Pounder",
    "Fortune Finder": "Fortune-Finder",
    "Tank Killer": "Tank-Killer",
    "Glow Sight": "Glow-Sight",
    "Long Shot": "Long-Shot",
    "Night Person": "Night-Person",
    "Fire in the Hole": "Fire-In-The-Hole",

    // === Endurance ===
    "Aqua Boy/Girl": "AquaboyAquagirl",

    // === Charisma ===
    "Strange in Numbers": "Strange-In-Numbers",
    "E.M.T.": "EMT",

    // === Intelligence ===
    "Nerd Rage!": "Nerd-Rage",
    "Power Smith": "Power-Patcher",
    "Exotic Weapons": "Exotic-Weapons",

    // === Agility ===
    "Guerrilla": "Modern-Renegade",
    "Expert Guerrilla": "Modern-Renegade",
    "Master Guerrilla": "Modern-Renegade",
    "Gunslinger": "Crack-Shot",
    "Expert Gunslinger": "Crack-Shot",
    "Master Gunslinger": "Crack-Shot",
    "Action Boy/Girl": "Action-BoyAction-Girl",
    "Packin' Light": "Packin-Light",

    // === Luck ===
    "Can Do!": "Can-Do",
    "Grim Reaper's Sprint": "Grim-Reapers-Sprint",
    "Mysterious Savior": "Mysterious-Stranger",
    "Better Criticals": "Better-Critical",
    "Luck of the Draw": "Luck-Of-The-Draw",
    "Party Boy/Girl": "Party-BoyParty-Girl",

    // === Legendary ===
    "Legendary Strength": "Strengthレジェンダリー",
    "Legendary Perception": "Perceptionレジェンダリー",
    "Legendary Endurance": "Enduranceレジェンダリー",
    "Legendary Charisma": "Charismaレジェンダリー",
    "Legendary Intelligence": "Intelligenceレジェンダリー",
    "Legendary Agility": "Agilityレジェンダリー",
    "Legendary Luck": "Luckレジェンダリー",
    "Hack and Slash": "Hack-And-Slash",
    "Exploding Palm": "Exploding-Palm",
    "Follow Through": "Follow-Through",
    "What Rads?": "What-Rads",
    "Master Infiltrator": "Master-Infiltrator",
    "Funky Duds": "Funky-Duds",
    "Sizzling Style": "Sizzling-Style",
    "Electric Absorption": "Electric-Absorption",
    "Taking One for the Team": "Taking-One-for-the-Team",
    "Far-Flung Fireworks": "Far-Flung-Fireworks",
    "Power Armor Reboot": "Power-Armor-Reboot",
    "Survival Shortcut": "Survival-Shortcut",
    "Blood Sacrifice": "Blood-Sacrifice",
    "Ammo Factory": "Ammo-Factory",

    // === 共通 ===
    "Mystic Power": "Mystic-Power",

    // === グール専用 ===
    "Hyper Reflex": "Hyper-Reflexes",
};

// Perk名から画像URLを生成する関数
function getPerkImageUrl(perkName, rank) {
    // マッピングテーブルにある場合はそちらを使用
    const override = PERK_IMAGE_OVERRIDES[perkName];
    let slug;
    if (override) {
        slug = override;
    } else {
        // 命名規則: スペース→ハイフン、特殊文字除去
        slug = perkName
            .replace(/'/g, '')
            .replace(/!/g, '')
            .replace(/\?/g, '')
            .replace(/\./g, '')
            .replace(/\(/g, '')
            .replace(/\)/g, '')
            .replace(/\//g, '')
            .replace(/\s+/g, '-');
    }
    // ローカル画像を参照（ランク1固定 - 高ランク画像は用意していないため）
    return `images/perks/${slug}_1.png`;
}

const PERK_DATA = {
    "Strength": [
        { name: "Bandolier", level: 22, maxRank: 2, cost: [1, 2], desc: ["実弾武器の弾薬の重量が45%軽くなる。", "実弾武器の弾薬の重量が90%軽くなる。"] },
        { name: "Barbarian", level: 14, maxRank: 3, cost: [1, 2, 3], desc: ["パワーアーマー未装着時、STR1ごとにDR+2。", "パワーアーマー未装着時、STR1ごとにDR+3。", "パワーアーマー未装着時、STR1ごとにDR+4。"] },
        { name: "Basher", level: 11, maxRank: 2, cost: [1, 2], desc: ["銃バッシュのダメージが+25%増加する。", "銃バッシュのダメージが+50%増加する。"] },
        { name: "Bear Arms", level: 35, maxRank: 1, cost: [1], desc: ["Bullet Stormのスタックごとにバッシュダメージが5%増加する。"] },
        { name: "Blocker", level: 21, maxRank: 3, cost: [1, 2, 3], desc: ["近接攻撃からのダメージを15%軽減する。", "近接攻撃からのダメージを30%軽減する。", "近接攻撃からのダメージを45%軽減する。"] },
        { name: "Blood Luster", level: 25, maxRank: 3, cost: [1, 2, 3], desc: ["同一ターゲットへの近接連続ヒットでダメージが増加（最大40%）。", "同一ターゲットへの近接連続ヒットでダメージが増加（最大80%）。", "同一ターゲットへの近接連続ヒットでダメージが増加（最大120%）。"] },
        { name: "Bullet Storm", level: 10, maxRank: 3, cost: [1, 2, 3], desc: ["弾薬30発消費ごとにダメージ+3%（最大10スタック）。", "弾薬30発消費ごとにダメージ+6%（最大10スタック）。", "弾薬30発消費ごとにダメージ+9%（最大10スタック）。"] },
        { name: "Easy Target", level: 10, maxRank: 3, cost: [1, 2, 3], desc: ["重傷部位へのダメージが+25%増加する。", "重傷部位へのダメージが+50%増加する。", "重傷部位へのダメージが+75%増加する。"] },
        { name: "Full Charge", level: 33, maxRank: 2, cost: [1, 2], desc: ["PA装着中のスプリントによるフュージョンコア消費が50%減少する。", "PA装着中のスプリントによるフュージョンコア消費がなくなる。"] },
        { name: "Heavy Hitter", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["移動中の近接攻撃ダメージが+10%増加する。", "移動中の近接攻撃ダメージが+20%増加する。", "移動中の近接攻撃ダメージが+30%増加する。"] },
        { name: "Incisor", level: 34, maxRank: 3, cost: [1, 2, 3], desc: ["近接武器が標的のアーマーを25%無視する。", "近接武器が標的のアーマーを50%無視する。", "近接武器が標的のアーマーを75%無視する。"] },
        { name: "Iron Fist", level: 2, maxRank: 1, cost: [1], desc: ["素手ダメージがDR（防御力）に応じて増加する。"] },
        { name: "Knee-Capper", level: 20, maxRank: 1, cost: [1], desc: ["近接武器の四肢ダメージが+50%増加する。"] },
        { name: "Lock and Load", level: 37, maxRank: 3, cost: [1, 2, 3], desc: ["ヘビー武器のリロード速度が+10%速くなる。", "ヘビー武器のリロード速度が+20%速くなる。", "ヘビー武器のリロード速度が+30%速くなる。"] },
        { name: "Love the Spread", level: 20, maxRank: 1, cost: [1], desc: ["発射弾数3以上の武器の射程が+30%増加する。"] },
        { name: "Martial Artist", level: 16, maxRank: 3, cost: [1, 2, 3], desc: ["近接武器の振り速度が+10%速くなり、重量が20%軽くなる。", "近接武器の振り速度が+20%速くなり、重量が40%軽くなる。", "近接武器の振り速度が+30%速くなり、重量が60%軽くなる。"] },
        { name: "Natural Stance", level: 15, maxRank: 3, cost: [1, 2, 3], desc: ["近接武器装備中、被スタガーを15%軽減する。", "近接武器装備中、被スタガーを30%軽減する。", "近接武器装備中、被スタガーを45%軽減する。"] },
        { name: "Shotgun Champ", level: 30, maxRank: 1, cost: [1], desc: ["重傷部位へのダメージ+10%（発射弾数に応じて倍増）。"] },
        { name: "Ordnance Express", level: 31, maxRank: 2, cost: [1, 2], desc: ["爆発物の重量が45%軽くなる。", "爆発物の重量が90%軽くなる。"] },
        { name: "Pack Rat", level: 7, maxRank: 2, cost: [1, 2], desc: ["全てのジャンクアイテムの重量が50%軽くなる。", "全てのジャンクアイテムの重量が75%軽くなる。"] },
        { name: "Pain Train", level: 41, maxRank: 3, cost: [1, 2, 3], desc: ["PA装着中のスプリントで敵にダメージを与えてよろめかせる。", "PA装着中のスプリントで敵により大きなダメージを与えてよろめかせる。", "PA装着中のスプリントで敵に大ダメージを与えてよろめかせる。"] },
        { name: "Portable Power", level: 24, maxRank: 2, cost: [1, 2], desc: ["パワーアーマーのパーツの重量が50%軽くなる。", "パワーアーマーのパーツの重量が75%軽くなる。"] },
        { name: "Scattershot", level: 18, maxRank: 1, cost: [1], desc: ["与えた四肢ダメージの20%を他の四肢にも拡散する。"] },
        { name: "Slugger", level: 6, maxRank: 3, cost: [1, 2, 3], desc: ["重傷部位への近接ダメージが+10%増加する。", "重傷部位への近接ダメージが+20%増加する。", "重傷部位への近接ダメージが+30%増加する。"] },
        { name: "Tightly Wound", level: 20, maxRank: 3, cost: [1, 2, 3], desc: ["ヘビーガンのスピンアップ時間-15%、リロード速度向上。", "ヘビーガンのスピンアップ時間-30%、リロード速度向上。", "ヘビーガンのスピンアップ時間-45%、リロード速度向上。"] },
        { name: "Wound Salter", level: 2, maxRank: 3, cost: [1, 2, 3], desc: ["出血中の敵へのダメージが+10%増加する。", "出血中の敵へのダメージが+20%増加する。", "出血中の敵へのダメージが+30%増加する。"] },
        { name: "Strong Arm", level: 5, maxRank: 1, cost: [1], desc: ["投擲武器をより遠くに投げられる。"] },
        { name: "Strong Back", level: 10, maxRank: 1, cost: [2], desc: ["STRに基づいて所持重量が増加する（STR1で+10、STR15で+40）。"] },
        { name: "Sturdy Frame", level: 13, maxRank: 2, cost: [1, 2], desc: ["アーマーの重量が25%軽くなる。", "アーマーの重量が50%軽くなる。"] },
        { name: "Traveling Pharmacy", level: 3, maxRank: 2, cost: [1, 2], desc: ["スティムパックを含む薬品の重量が45%軽くなる。", "スティムパックを含む薬品の重量が90%軽くなる。"] }
    ],
    "Perception": [
        { name: "Awareness", level: 27, maxRank: 1, cost: [1], desc: ["V.A.T.S.で標的の耐性を確認できる。"] },
        { name: "Butcher's Bounty", level: 3, maxRank: 3, cost: [1, 2, 3], desc: ["動物の死体から40%の確率で追加の肉を入手。", "動物の死体から60%の確率で追加の肉を入手。", "動物の死体から80%の確率で追加の肉を入手。"] },
        { name: "Center Masochist", level: 15, maxRank: 3, cost: [1, 2, 3], desc: ["胴体へのダメージが+25%増加する。", "胴体へのダメージが+50%増加する。", "胴体へのダメージが+75%増加する。"] },
        { name: "Concentrated Fire", level: 2, maxRank: 3, cost: [1, 2, 3], desc: ["V.A.T.S.で射撃ごとに命中率とダメージが+1%蓄積。", "V.A.T.S.で射撃ごとに命中率とダメージが+2%蓄積。", "V.A.T.S.で射撃ごとに命中率とダメージが+3%蓄積。"] },
        { name: "Crack Shot", level: 7, maxRank: 3, cost: [1, 2, 3], desc: ["ピストルの射程と精度が+10%向上する。", "ピストルの射程と精度が+20%向上する。", "ピストルの射程と精度が+30%向上する。"] },
        { name: "Down Ranger", level: 2, maxRank: 3, cost: [1, 2, 3], desc: ["遠距離の敵へのライフルダメージが+10%増加。", "遠距離の敵へのライフルダメージが+15%増加。", "遠距離の敵へのライフルダメージが+20%増加。"] },
        { name: "Exterminator", level: 14, maxRank: 3, cost: [1, 2, 3], desc: ["ミレルークとバグ系へのダメージが+30%増加する。", "ミレルークとバグ系へのダメージが+45%増加する。", "ミレルークとバグ系へのダメージが+75%増加する。"] },
        { name: "Fast Fighter", level: 15, maxRank: 3, cost: [1, 2, 3], desc: ["自動小銃のリロード速度が+10%向上する。", "自動小銃のリロード速度が+20%向上する。", "自動小銃のリロード速度が+30%向上する。"] },
        { name: "Fire in the Hole", level: 45, maxRank: 3, cost: [1, 2, 3], desc: ["投擲爆発物の軌道が表示される。爆発範囲が+50%。", "投擲爆発物の軌道が表示される。爆発範囲が+100%。", "投擲爆発物の軌道が表示される。爆発範囲が2倍。"] },
        { name: "Fortune Finder", level: 22, maxRank: 3, cost: [1, 2, 3], desc: ["キャップの入った箱が近くにあると音が鳴る。範囲が通常の2倍。", "キャップの入った箱が近くにあると音が鳴る。範囲が通常の3倍。", "キャップの入った箱が近くにあると音が鳴る。範囲が通常の4倍。"] },
        { name: "Glow Sight", level: 33, maxRank: 3, cost: [1, 2, 3], desc: ["発光した敵へのダメージが+30%増加する。", "発光した敵へのダメージが+45%増加する。", "発光した敵へのダメージが+60%増加する。"] },
        { name: "Green Thumb", level: 4, maxRank: 1, cost: [1], desc: ["植物の収穫量が2倍になる。"] },
        { name: "Grenadier", level: 35, maxRank: 2, cost: [1, 2], desc: ["爆発の範囲が50%拡大する。", "範囲が2倍になる。"] },
        { name: "Ground Pounder", level: 18, maxRank: 3, cost: [1, 2, 3], desc: ["オートマチックライフルのリロード速度が+10%、腰だめ精度が+10%向上する。", "オートマチックライフルのリロード速度が+20%、腰だめ精度が+20%向上する。", "オートマチックライフルのリロード速度が+30%、腰だめ精度が+30%向上する。"] },
        { name: "Long Shot", level: 37, maxRank: 3, cost: [1, 2, 3], desc: ["ライフルの射程と精度が+10%向上する。", "ライフルの射程と精度が+20%向上する。", "ライフルの射程と精度が+30%向上する。"] },
        { name: "Number Cruncher", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["自動小銃のアーマー貫通が+10%向上する。", "自動小銃のアーマー貫通が+20%向上する。", "自動小銃のアーマー貫通が+30%向上する。"] },
        { name: "Night Person", level: 37, maxRank: 2, cost: [1, 2], desc: ["夜は（6PM-6AM）INTとPERが+1。", "夜は（6PM-6AM）INTとPERが+2。"] },
        { name: "Pannapictagraphist", level: 40, maxRank: 1, cost: [1], desc: ["雑誌が近くにあると音が鳴る。"] },
        { name: "Picklock", level: 5, maxRank: 3, cost: [1, 2, 3], desc: ["ピッキングスキル+1。", "ピッキングスキル+2。", "ピッキングスキル+3。"] },
        { name: "Refractor", level: 39, maxRank: 4, cost: [1, 2, 3, 4], desc: ["エネルギー耐性+10。", "エネルギー耐性+20。", "エネルギー耐性+30。", "エネルギー耐性+40。"] },
        { name: "Scoped-up", level: 15, maxRank: 1, cost: [1], desc: ["スコープ付き武器の射程が照準時に+50%増加する。"] },
        { name: "Smart Shot", level: 30, maxRank: 1, cost: [1], desc: ["スコープ付き武器の急所ダメージが照準時に+25%増加する。"] },
        { name: "Sniper", level: 28, maxRank: 3, cost: [1, 2, 3], desc: ["スコープ越しの息止め時間が25%増加し、5%の確率でよろめかせる。", "スコープ越しの息止め時間が50%増加し、10%の確率でよろめかせる。", "スコープ越しの息止め時間が75%増加し、15%の確率でよろめかせる。"] },
        { name: "Tank Killer", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["ライフルが標的のアーマーの12%を無視する。", "ライフルが標的のアーマーの24%を無視する。", "ライフルが標的のアーマーの36%を無視し、9%の確率でよろめかせる。"] }
    ],
    "Endurance": [
        { name: "Adamantium Skeleton", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["四肢のダメージを30%軽減。", "四肢のダメージを60%軽減。", "四肢が壊れなくなる。"] },
        { name: "All Night Long", level: 37, maxRank: 3, cost: [1, 2, 3], race: "human", desc: ["空腹と渇きの進行が20%遅くなる。", "空腹と渇きの進行が40%遅くなる。", "空腹と渇きの進行が60%遅くなる。"] },
        { name: "Aqua Boy/Girl", level: 14, maxRank: 2, cost: [1, 2], desc: ["水中で放射能を受けず呼吸ができる。", "水中で放射能を受けず呼吸ができ、水中で透明になる。"] },
        { name: "Bullet Shield", level: 39, maxRank: 3, cost: [1, 2, 3], desc: ["ヘビー武器で射撃中にDR+20。", "ヘビー武器で射撃中にDR+40。", "ヘビー武器で射撃中にDR+60。"] },
        { name: "Cannibal", level: 15, maxRank: 3, cost: [1, 2, 3], desc: ["人間やグールの死体を食べてHPと空腹を回復。", "人間やグールの死体を食べてHPと空腹をより多く回復。", "人間やグールの死体を食べてHPと空腹を大幅に回復。"] },
        { name: "Chem Resistant", level: 23, maxRank: 2, cost: [1, 2], race: "human", desc: ["薬品に中毒になる確率が50%減少。", "薬品に中毒にならない。"] },
        { name: "Cola Nut", level: 34, maxRank: 2, cost: [1, 2], race: "human", desc: ["ヌカ・コーラの効果が2倍。", "ヌカ・コーラの効果が3倍。"] },
        { name: "Dromedary", level: 3, maxRank: 3, cost: [1, 2, 3], race: "human", desc: ["水分の減少速度が25%遅くなる。", "水分の減少速度が50%遅くなる。", "水分の減少速度が75%遅くなる。"] },
        { name: "Fireproof", level: 27, maxRank: 3, cost: [1, 2, 3], desc: ["火炎と爆発のダメージを15%軽減。", "火炎と爆発のダメージを30%軽減。", "火炎と爆発のダメージを45%軽減。"] },
        { name: "Ghoulish", level: 40, maxRank: 3, cost: [1, 2, 3], race: "human", desc: ["RADでHPが回復する。", "RADでHPがより多く回復する。", "RADでHPが大幅に回復する。"] },
        { name: "Good Doggy", level: 8, maxRank: 1, cost: [1], race: "human", desc: ["缶詰のドッグフードの効果が3倍になる。"] },
        { name: "Iron Stomach", level: 4, maxRank: 3, cost: [1, 2, 3], race: "human", desc: ["生の食料からの病気確率が50%減少。", "生の食料からの病気確率が75%減少。", "生の食料から病気にならない。"] },
        { name: "Ironclad", level: 30, maxRank: 5, cost: [1, 2, 3, 4, 5], desc: ["PA未装着時にDR+10、ER+10。", "PA未装着時にDR+20、ER+20。", "PA未装着時にDR+30、ER+30。", "PA未装着時にDR+40、ER+40。", "PA未装着時にDR+50、ER+50。"] },
        { name: "Lead Belly", level: 2, maxRank: 3, cost: [1, 2, 3], race: "human", desc: ["食べ物と飲み物からの放射能を30%軽減。", "食べ物と飲み物からの放射能を60%軽減。", "食べ物と飲み物から放射能を受けない。"] },
        { name: "Lifegiver", level: 26, maxRank: 4, cost: [1, 2, 3, 4], desc: ["最大HP+15。", "最大HP+30。", "最大HP+45。", "最大HP+45、さらにHP自動回復。"] },
        { name: "Natural Resistance", level: 10, maxRank: 3, cost: [1, 2, 3], race: "human", desc: ["かかっている病気の効果が-30%減少。", "かかっている病気の効果が-60%減少。", "かかっている病気の効果が-90%減少。"] },
        { name: "Nocturnal Fortitude", level: 36, maxRank: 2, cost: [1, 2], race: "human", desc: ["夜間（6PM-6AM）にHP+20。", "夜間（6PM-6AM）にHP+40。"] },
        { name: "Photosynthetic", level: 12, maxRank: 2, cost: [1, 2], race: "human", desc: ["日中に体力がゆっくりと回復する。", "日中に体力が速く回復する。"] },
        { name: "Professional Drinker", level: 20, maxRank: 1, cost: [1], race: "human", desc: ["アルコールに中毒にならなくなる。"] },
        { name: "Rad Sponge", level: 44, maxRank: 4, cost: [1, 2, 3, 4], race: "human", desc: ["チームメイトがRADを受けると自分のRADが80回復。", "チームメイトがRADを受けると自分のRADが160回復。", "チームメイトがRADを受けると自分のRADが300回復。", "チームメイトがRADを受けると自分のRADが全回復。"] },
        { name: "Radicool", level: 32, maxRank: 1, cost: [1], race: "human", desc: ["RADが高いほどSTRにボーナス（最大+5 STR）。"] },
        { name: "Rejuvenated", level: 12, maxRank: 2, cost: [1, 2], race: "human", desc: ["十分に食べて飲むとENDとAPに小ボーナス。", "十分に食べて飲むとENDとAPに大ボーナス。"] },
        { name: "Revenant", level: 38, maxRank: 2, cost: [1, 2], desc: ["復活後ダメージ+25%（2分間）。", "復活後ダメージ+50%（2分間）。"] },
        { name: "Slow Metabolizer", level: 4, maxRank: 3, cost: [1, 2, 3], race: "human", desc: ["食料の減少速度が25%遅くなる。", "食料の減少速度が50%遅くなる。", "食料の減少速度が75%遅くなる。"] },
        { name: "Solar Powered", level: 42, maxRank: 3, cost: [1, 2, 3], desc: ["昼間（6AM-6PM）にSTRとENDが+1。", "昼間（6AM-6PM）にSTRとENDが+2。", "昼間（6AM-6PM）にSTRとENDが+3、HP回復。"] },
        { name: "Sun Kissed", level: 45, maxRank: 2, cost: [1, 2], race: "human", desc: ["昼間（6AM-6PM）にゆっくりRADが回復する。", "昼間（6AM-6PM）にRADが速く回復する。"] },
        { name: "Thirst Quencher", level: 6, maxRank: 3, cost: [1, 2, 3], race: "human", desc: ["汚染された水を飲んだ時の病気確率が50%減少。", "汚染された水を飲んだ時の病気確率が75%減少。", "汚染された水を飲んでも病気にならない。"] },
        { name: "Vaccinated", level: 16, maxRank: 3, cost: [1, 2, 3], race: "human", desc: ["クリーチャーからの病気感染率が60%減少。", "クリーチャーからの病気感染率が80%減少。", "クリーチャーから病気に感染しない。"] }
    ],
    "Charisma": [
        { name: "Animal Friend", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["照準時に動物が25%の確率で戦闘停止。", "照準時に動物が50%の確率で戦闘停止。", "照準時に動物が75%の確率で味方になる。"] },
        { name: "Bodyguards", level: 5, maxRank: 1, cost: [2], desc: ["チーム参加時、CHAに基づいてチームメイト1人ごとに耐性が上昇する。"] },
        { name: "EMT", level: 9, maxRank: 1, cost: [2], desc: ["倒れたチームメイトを3分ごとに自動蘇生し、1分間回復量を増加させる。"] },
        { name: "Field Surgeon", level: 24, maxRank: 1, cost: [1], desc: ["スティムパックとRadAwayが即座に効果を発揮する。"] },
        { name: "Happy-Go-Lucky", level: 17, maxRank: 3, cost: [1, 2, 3], race: "human", desc: ["アルコール摂取中はLuck+2。", "アルコール摂取中はLuck+3。", "アルコール摂取中はLuck+4。"] },
        { name: "Hard Bargain", level: 7, maxRank: 1, cost: [1], desc: ["NPCベンダーとの取引時にCHR+7。"] },
        { name: "Inspirational", level: 2, maxRank: 1, cost: [2], desc: ["チーム参加時にXP獲得量+30%。"] },
        { name: "Lone Wanderer", level: 4, maxRank: 1, cost: [2], desc: ["チーム未参加時、CHAに基づいて耐性とAP回復速度が上昇する。"] },
        { name: "Magnetic Personality", level: 13, maxRank: 2, cost: [1, 2], desc: ["チーム参加時にCHR+1。", "チーム参加時にCHR+2。"] },
        { name: "Overly Generous", level: 26, maxRank: 3, cost: [1, 2, 3], race: "human", desc: ["チームで食料を食べると仲間のRADが15回復。", "チームで食料を食べると仲間のRADが30回復。", "チームで食料を食べると仲間のRADが60回復。"] },
        { name: "Party Boy/Girl", level: 24, maxRank: 2, cost: [2, 3], desc: ["アルコールの正の効果が2倍。", "アルコールの正の効果が3倍。"] },
        { name: "Philanthropist", level: 7, maxRank: 3, cost: [1, 2, 3], race: "human", desc: ["チームで食料を食べるとチーム全体の空腹回復。", "チームで食料を食べるとチーム全体の空腹と渇き回復。", "チームで食料を食べるとチーム全体が全回復。"] },
        { name: "Quack Surgeon", level: 11, maxRank: 1, cost: [1], desc: ["アルコールで他プレイヤーを蘇生できる。"] },
        { name: "Spiritual Healer", level: 10, maxRank: 1, cost: [1], desc: ["プレイヤーを蘇生後、全チームメイトのHP回復速度が上昇する（1分間）。"] },
        { name: "Squad Maneuvers", level: 33, maxRank: 1, cost: [1], desc: ["チーム全員の移動速度+10%。"] },
        { name: "Strange in Numbers", level: 42, maxRank: 1, cost: [1], desc: ["チームメイトも変異持ちの場合、変異のプラス効果が+25%。"] },
        { name: "Suppressor", level: 11, maxRank: 1, cost: [2], desc: ["攻撃した標的のダメージ出力を30%減少させる（2秒間）。"] },
        { name: "Team Medic", level: 20, maxRank: 1, cost: [2], desc: ["スティムパック使用時に近くのチームメイトもスティムパックの回復量の100%分回復する。"] },
        { name: "Tenderizer", level: 46, maxRank: 1, cost: [2], desc: ["攻撃するたびに標的が受けるダメージが増加する。"] },
        { name: "Travel Agent", level: 26, maxRank: 1, cost: [1], desc: ["重量オーバーの状態でも追加コストを支払うことでファストトラベルが可能。"] },
        { name: "Wasteland Whisperer", level: 48, maxRank: 3, cost: [1, 2, 3], desc: ["照準時にクリーチャーが25%の確率で戦闘停止。", "照準時にクリーチャーが50%の確率で戦闘停止。", "照準時にクリーチャーが75%の確率で味方になる。"] }
    ],
    "Intelligence": [
        { name: "Batteries Included", level: 28, maxRank: 2, cost: [1, 2], desc: ["エネルギー弾の重量が45%軽くなる。", "エネルギー弾の重量が90%軽くなる。"] },
        { name: "Chemist", level: 18, maxRank: 1, cost: [2], desc: ["薬品クラフト時の獲得量が2倍。"] },
        { name: "Contractor", level: 18, maxRank: 2, cost: [1, 2], desc: ["CAMPやワークショップの建設コストが-25%。", "CAMPやワークショップの建設コストが-50%。"] },
        { name: "Demolition Expert", level: 10, maxRank: 5, cost: [1, 2, 3, 4, 5], desc: ["爆発物のダメージが+20%増加する。", "爆発物のダメージが+30%増加する。", "爆発物のダメージが+40%増加する。", "爆発物のダメージが+50%増加する。", "爆発物のダメージが+60%増加し、クラフト可能になる。"] },
        { name: "Exotic Weapons", level: 48, maxRank: 1, cost: [1], desc: ["エキゾチック武器のクラフトが可能になる。"] },
        { name: "First Aid", level: 2, maxRank: 3, cost: [1, 2, 3], desc: ["スティムパックの回復量が+15%増加する。", "スティムパックの回復量が+30%増加する。", "スティムパックの回復量が+45%増加する。"] },
        { name: "Fix It Good", level: 27, maxRank: 3, cost: [1, 2, 3], desc: ["アーマー修理時に130%の状態にできる。", "アーマー修理時に160%の状態にできる。", "アーマー修理時に200%の状態にできる。"] },
        { name: "Gunsmith", level: 11, maxRank: 5, cost: [1, 2, 3, 4, 5], desc: ["銃の壊れる速度が20%遅くなり、Tier1の銃を作れる。", "銃の壊れる速度が50%遅くなり、Tier2の銃を作れる。", "銃の壊れる速度が大幅に減少し、Tier3の銃を作れる。", "銃がさらに壊れにくくなり、Tier4の銃を作れる。", "銃が非常に壊れにくくなり、最高ランクまでクラフト可能。"] },
        { name: "Hacker", level: 4, maxRank: 3, cost: [1, 2, 3], desc: ["ターミナルハッキングスキル+1。", "ターミナルハッキングスキル+2。", "ターミナルハッキングスキル+3。"] },
        { name: "Licensed Plumber", level: 5, maxRank: 3, cost: [1, 2, 3], desc: ["パイプ武器の壊れる速度が30%遅くなる。", "パイプ武器の壊れる速度が60%遅くなる。", "パイプ武器が非常に壊れにくくなる。"] },
        { name: "Makeshift Warrior", level: 9, maxRank: 5, cost: [1, 2, 3, 4, 5], desc: ["近接武器の壊れる速度が30%遅くなり、クラフトが向上する。", "近接武器の壊れる速度が50%遅くなり、クラフトが向上する。", "近接武器のクラフト可能なランクが増える。", "近接武器のクラフト可能なランクがさらに増える。", "近接武器が非常に壊れにくくなり、最高ランクまでクラフト可能。"] },
        { name: "Nerd Rage!", level: 19, maxRank: 3, cost: [1, 2, 3], desc: ["HP20%以下でダメージ+10%、DR+20。", "HP20%以下でダメージ+20%、DR+30。", "HP20%以下でダメージ+40%、DR+40、AP回復。"] },
        { name: "Pharmacist", level: 6, maxRank: 3, cost: [1, 2, 3], desc: ["RadAwayの回復量が+30%増加する。", "RadAwayの回復量が+60%増加する。", "RadAwayの回復量が+100%増加する。"] },
        { name: "Power Patcher", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["PA修理コストが-20%。", "PA修理コストが-40%。", "PA修理コストが-60%。"] },
        { name: "Power Smith", level: 41, maxRank: 3, cost: [1, 2, 3], desc: ["PA改造で上位MODが利用可能になる。", "PA改造でさらに上位のMODが利用可能になる。", "PA改造で全MODが利用可能になる。"] },
        { name: "Power User", level: 35, maxRank: 3, cost: [1, 2, 3], desc: ["フュージョンコアの持続時間が+30%。", "フュージョンコアの持続時間が+60%。", "フュージョンコアの持続時間が+100%。"] },
        { name: "Science", level: 16, maxRank: 1, cost: [1], desc: ["エネルギー武器のクラフトが可能になる。"] },
        { name: "Scrapper", level: 13, maxRank: 1, cost: [1], desc: ["武器やアーマーの解体時にレア素材を入手する。"] },
        { name: "Stabilized", level: 36, maxRank: 3, cost: [1, 2, 3], desc: ["PA装着中、ヘビーガンの精度が向上しアーマーを15%無視。", "PA装着中、ヘビーガンの精度が向上しアーマーを30%無視。", "PA装着中、ヘビーガンの精度が向上しアーマーを45%無視し、よろめかせる。"] },
        { name: "Weapon Artisan", level: 14, maxRank: 3, cost: [1, 2, 3], desc: ["武器修理時に130%まで修復可能。", "武器修理時に160%まで修復可能。", "武器修理時に200%まで修復可能。"] },
        { name: "Wrecking Ball", level: 24, maxRank: 3, cost: [1, 2, 3], desc: ["ワークショップ内オブジェクトへのダメージが+40%増加。", "ワークショップ内オブジェクトへのダメージが+80%増加。", "ワークショップ内オブジェクトへのダメージが+120%増加。"] }
    ],
    "Agility": [
        { name: "Action Boy/Girl", level: 2, maxRank: 3, cost: [1, 2, 3], desc: ["AP回復速度が+15%速くなる。", "AP回復速度が+30%速くなる。", "AP回復速度が+45%速くなる。"] },
        { name: "Adrenaline", level: 49, maxRank: 5, cost: [1, 2, 3, 4, 5], desc: ["キルごとにダメージ+6%（最大60%、30秒持続）。", "キルごとにダメージ+7%（最大70%、30秒持続）。", "キルごとにダメージ+8%（最大80%、30秒持続）。", "キルごとにダメージ+9%（最大90%、30秒持続）。", "キルごとにダメージ+10%（最大100%、30秒持続）。"] },
        { name: "Ammosmith", level: 34, maxRank: 2, cost: [1, 2], desc: ["弾薬クラフト時に獲得量が+40%増加する。", "弾薬クラフト時に獲得量が+80%増加する。"] },
        { name: "Born Survivor", level: 7, maxRank: 3, cost: [1, 2, 3], desc: ["HP20%以下で自動的にスティムパックを使用する。", "HP30%以下で自動的にスティムパックを使用する。", "HP40%以下で自動的にスティムパックを使用する。"] },
        { name: "Covert Operative", level: 27, maxRank: 3, cost: [1, 2, 3], desc: ["遠距離スニークアタックのダメージ+0.25x。", "遠距離スニークアタックのダメージ+0.5x。", "遠距離スニークアタックのダメージ+0.75x。"] },
        { name: "Dead Man Sprinting", level: 12, maxRank: 2, cost: [1, 2], desc: ["HP50%以下でスプリントのAP消費が-20%。", "HP50%以下でスプリントのAP消費が-40%。"] },
        { name: "Dodge", level: 25, maxRank: 3, cost: [1, 2, 3], desc: ["PA未装着時に被弾を10%の確率で回避。", "PA未装着時に被弾を20%の確率で回避。", "PA未装着時に被弾を30%の確率で回避。"] },
        { name: "Escape Artist", level: 35, maxRank: 1, cost: [1], desc: ["スニーク中にしゃがむと見つかりにくくなる。移動速度の影響が減少する。"] },
        { name: "Evasive", level: 14, maxRank: 3, cost: [1, 2, 3], desc: ["AGI1ごとにDR+1、ER+1。", "AGI1ごとにDR+2、ER+2。", "AGI1ごとにDR+3、ER+3。"] },
        { name: "Expert Guerrilla", level: 15, maxRank: 3, cost: [1, 2, 3], desc: ["全遠距離武器の発射速度がさらに+2%向上する。", "全遠距離武器の発射速度がさらに+4%向上する。", "全遠距離武器の発射速度がさらに+6%向上する。"] },
        { name: "Expert Gunslinger", level: 20, maxRank: 3, cost: [1, 2, 3], desc: ["ノンオートマチックピストルのリロード速度が+10%向上。", "ノンオートマチックピストルのリロード速度が+20%向上。", "ノンオートマチックピストルのリロード速度が+30%向上。"] },
        { name: "Guerrilla", level: 2, maxRank: 3, cost: [1, 2, 3], desc: ["全遠距離武器の発射速度が+2%向上する。", "全遠距離武器の発射速度が+4%向上する。", "全遠距離武器の発射速度が+6%向上する。"] },
        { name: "Gun Runner", level: 8, maxRank: 1, cost: [2], desc: ["武器装備中の移動速度が+10%速くなる。"] },
        { name: "Gunslinger", level: 6, maxRank: 3, cost: [1, 2, 3], desc: ["全遠距離武器の急所ダメージが+4%増加する。", "全遠距離武器の急所ダメージが+8%増加する。", "全遠距離武器の急所ダメージが+12%増加する。"] },
        { name: "Light Footed", level: 29, maxRank: 1, cost: [1], desc: ["スニーク中にフロアトラップを作動させない。"] },
        { name: "Marathoner", level: 10, maxRank: 3, cost: [1, 2, 3], desc: ["スプリントのAP消費が-20%。", "スプリントのAP消費が-30%。", "スプリントのAP消費が-40%。"] },
        { name: "Master Guerrilla", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["全遠距離武器の発射速度がさらに+2%向上する。", "全遠距離武器の発射速度がさらに+4%向上する。", "全遠距離武器の発射速度がさらに+6%向上する。"] },
        { name: "Master Gunslinger", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["Onslaughtスタックに応じてダメージが+3%増加。", "Onslaughtスタックに応じてダメージが+5%増加。", "Onslaughtスタックに応じてダメージが+8%増加。"] },
        { name: "Mister Sandman", level: 37, maxRank: 3, cost: [1, 2, 3], desc: ["夜間のスニーク攻撃ダメージが+25%増加。", "夜間のスニーク攻撃ダメージが+38%増加。", "夜間のスニーク攻撃ダメージが+50%増加。"] },
        { name: "Modern Renegade", level: 42, maxRank: 3, cost: [1, 2, 3], desc: ["ピストルのヒップ射撃が5%の確率でよろめかせる。", "ピストルのヒップ射撃が10%の確率でよろめかせる。", "ピストルのヒップ射撃が15%の確率でよろめかせる。"] },
        { name: "Moving Target", level: 20, maxRank: 3, cost: [1, 2, 3], desc: ["スプリント中にDR+20、ER+20。", "スプリント中にDR+40、ER+40。", "スプリント中にDR+60、ER+60。"] },
        { name: "Ninja", level: 15, maxRank: 3, cost: [1, 2, 3], desc: ["遠距離スニークアタックのダメージが+1.0x。近接が+1.5x。", "遠距離スニークアタックのダメージが+1.5x。近接が+2.0x。", "遠距離スニークアタックのダメージが+2.0x。近接が+2.5x。"] },
        { name: "Packin' Light", level: 9, maxRank: 3, cost: [1, 2, 3], desc: ["ピストルの重量が25%軽くなる。", "ピストルの重量が50%軽くなる。", "ピストルの重量が75%軽くなる。"] },
        { name: "Secret Agent", level: 39, maxRank: 3, cost: [1, 2, 3], desc: ["ステルスボーイの持続時間が+100%。", "ステルスボーイの持続時間が+200%。", "ステルスボーイの持続時間が+300%。"] },
        { name: "Serendipity", level: 34, maxRank: 3, cost: [1, 2, 3], desc: ["HP30%以下で15%の確率でダメージ回避。", "HP30%以下で25%の確率でダメージ回避。", "HP30%以下で45%の確率でダメージ回避。"] },
        { name: "Sneak", level: 18, maxRank: 3, cost: [1, 2, 3], desc: ["発見されにくくなる。", "より発見されにくくなる。", "非常に見つかりにくい。"] },
        { name: "Thru-Hiker", level: 7, maxRank: 2, cost: [1, 2], desc: ["食料と飲料の重量が45%軽くなる。", "食料と飲料の重量が90%軽くなる。"] },
        { name: "White Knight", level: 22, maxRank: 3, cost: [1, 2, 3], desc: ["アーマーの壊れる速度が30%遅くなり、修理コスト-20%。", "アーマーの壊れる速度が60%遅くなり、修理コスト-40%。", "アーマーの壊れる速度が90%遅くなり、修理コスト-60%。"] }
    ],
    "Luck": [
        { name: "Better Criticals", level: 33, maxRank: 3, cost: [1, 2, 3], desc: ["VATSクリティカルのダメージが+20%。", "VATSクリティカルのダメージが+30%。", "VATSクリティカルのダメージが+40%。"] },
        { name: "Bloody Mess", level: 42, maxRank: 1, cost: [1], desc: ["出血している敵を倒すと、LCKの値に基づいて爆発する可能性がある。"] },
        { name: "Can Do!", level: 7, maxRank: 3, cost: [1, 2, 3], desc: ["食料コンテナから40%で追加の缶詰を発見。", "食料コンテナから60%で追加の缶詰を発見。", "食料コンテナから80%で追加の缶詰を発見。"] },
        { name: "Class Freak", level: 46, maxRank: 3, cost: [1, 2, 3], race: "human", desc: ["変異のマイナス効果を25%軽減。", "変異のマイナス効果を50%軽減。", "変異のマイナス効果を75%軽減。"] },
        { name: "Critical Savvy", level: 23, maxRank: 3, cost: [1, 2, 3], desc: ["クリティカル消費後にゲージが15%残る。", "クリティカル消費後にゲージが25%残る。", "クリティカル消費後にゲージが35%残る。"] },
        { name: "Curator", level: 19, maxRank: 1, cost: [1], desc: ["雑誌とボブルヘッドの効果持続時間が2倍。"] },
        { name: "Four Leaf Clover", level: 28, maxRank: 3, cost: [1, 2, 3], desc: ["VATSヒットごとに5%でクリティカルゲージが満タンに。", "VATSヒットごとに8%でクリティカルゲージが満タンに。", "VATSヒットごとに10%でクリティカルゲージが満タンに。"] },
        { name: "Grim Reaper's Sprint", level: 35, maxRank: 3, cost: [1, 2, 3], desc: ["VATSキルで15%の確率でAPを全回復。", "VATSキルで25%の確率でAPを全回復。", "VATSキルで35%の確率でAPを全回復し、クリティカルゲージも回復。"] },
        { name: "Junk Shield", level: 10, maxRank: 3, cost: [1, 2, 3], desc: ["ジャンク所持中にDR+10、ER+10。", "ジャンク所持中にDR+20、ER+20。", "ジャンク所持中にDR+30、ER+30。"] },
        { name: "Last Laugh", level: 48, maxRank: 1, cost: [1], desc: ["死亡時にフラグメンテーショングレネードかプラズマグレネードを落とす。"] },
        { name: "Luck of the Draw", level: 5, maxRank: 3, cost: [1, 2, 3], desc: ["攻撃時に10%の確率で武器の耐久を少し回復。", "攻撃時に15%の確率で武器の耐久を回復。", "攻撃時に20%の確率で武器の耐久を大幅回復。"] },
        { name: "Lucky Break", level: 14, maxRank: 3, cost: [1, 2, 3], desc: ["被弾時に4%の確率でアーマーが自動修復。", "被弾時に8%の確率でアーマーが自動修復。", "被弾時に12%の確率でアーマーが自動修復。"] },
        { name: "Mysterious Savior", level: 15, maxRank: 3, cost: [1, 2, 3], desc: ["瀕死時に6%の確率で謎のヒーローが蘇生してくれる。", "瀕死時に12%の確率で謎のヒーローが蘇生してくれる。", "瀕死時に18%の確率で謎のヒーローが蘇生してくれる。"] },
        { name: "Mysterious Stranger", level: 16, maxRank: 3, cost: [1, 2, 3], desc: ["VATSで10%の確率で謎のストレンジャーが助けにくる。", "VATSで15%の確率で謎のストレンジャーが助けにくる。", "VATSで20%の確率で謎のストレンジャーが助けにくる。"] },
        { name: "One Gun Army", level: 31, maxRank: 3, cost: [1, 2, 3], desc: ["ヘビーガンで射撃時に4%の確率でよろめかせる。", "ヘビーガンで射撃時に8%の確率でよろめかせる。", "ヘビーガンで射撃時に12%の確率でよろめきと四肢損傷。"] },
        { name: "Pharma Farma", level: 2, maxRank: 3, cost: [1, 2, 3], desc: ["医療用コンテナから40%で追加の薬品を発見。", "医療用コンテナから60%で追加の薬品を発見。", "医療用コンテナから80%で追加の薬品を発見。"] },
        { name: "Psychopath", level: 17, maxRank: 3, cost: [1, 2, 3], desc: ["VATSでのキル時にクリティカルゲージが15%追加チャージ。", "VATSでのキル時にクリティカルゲージが25%追加チャージ。", "VATSでのキル時にクリティカルゲージが35%追加チャージ。"] },
        { name: "Ricochet", level: 37, maxRank: 3, cost: [1, 2, 3], desc: ["遠距離攻撃を8%の確率で反射。", "遠距離攻撃を12%の確率で反射。", "遠距離攻撃を18%の確率で反射し、敵にダメージ。"] },
        { name: "Scrounger", level: 3, maxRank: 3, cost: [1, 2, 3], desc: ["弾薬コンテナから40%で追加弾薬を発見。", "弾薬コンテナから60%で追加弾薬を発見。", "弾薬コンテナから80%で追加弾薬を発見。"] },
        { name: "Starched Genes", level: 30, maxRank: 2, cost: [1, 2], race: "human", desc: ["RADアウェイで変異が除去されなくなる。", "RADアウェイで変異が除去されなくなり、RADで変異が発生しなくなる。"] },
        { name: "Super Duper", level: 50, maxRank: 3, cost: [1, 2, 3], desc: ["クラフト時に10%の確率で追加アイテム。", "クラフト時に20%の確率で追加アイテム。", "クラフト時に30%の確率で追加アイテム。"] },
        { name: "Tormentor", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["ライフルでVATS攻撃時に5%の確率で四肢を損傷。", "ライフルでVATS攻撃時に8%の確率で四肢を損傷。", "ライフルでVATS攻撃時に15%の確率で四肢を損傷。"] },
        { name: "Woodchucker", level: 4, maxRank: 1, cost: [1], desc: ["木材の収穫量が2倍になる。"] }
    ]
};

// レジェンダリーPerkデータ
const LEGENDARY_PERKS = [
    { name: "Ammo Factory", maxRank: 4, desc: ["弾薬クラフト時の獲得量+50%。", "弾薬クラフト時の獲得量+75%。", "弾薬クラフト時の獲得量+100%。", "弾薬クラフト時の獲得量+150%。"] },
    { name: "Follow Through", maxRank: 4, desc: ["遠距離スニーク攻撃で標的が受けるダメージ+10%（10秒間）。", "遠距離スニーク攻撃で標的が受けるダメージ+20%（10秒間）。", "遠距離スニーク攻撃で標的が受けるダメージ+30%（10秒間）。", "遠距離スニーク攻撃で標的が受けるダメージ+40%（10秒間）。"] },
    { name: "What Rads?", maxRank: 4, desc: ["放射能耐性+50、毎秒RAD1回復。", "放射能耐性+100、毎秒RAD2回復。", "放射能耐性+200、毎秒RAD4回復。", "放射能耐性+300、毎秒RAD6回復。"] },
    { name: "Master Infiltrator", maxRank: 4, desc: ["ピッキング/ハッキングスキル+1。スキル0自動解除。", "ピッキング/ハッキングスキル+2。スキル1自動解除。", "ピッキング/ハッキングスキル+3。スキル2自動解除。", "ピッキング/ハッキングスキル0〜3自動解除。"] },
    { name: "Legendary Strength", maxRank: 4, desc: ["STR+1。", "STR+2。", "STR+3。", "STR+5。"], special: "Strength" },
    { name: "Legendary Perception", maxRank: 4, desc: ["PER+1。", "PER+2。", "PER+3。", "PER+5。"], special: "Perception" },
    { name: "Legendary Endurance", maxRank: 4, desc: ["END+1。", "END+2。", "END+3。", "END+5。"], special: "Endurance" },
    { name: "Legendary Charisma", maxRank: 4, desc: ["CHR+1。", "CHR+2。", "CHR+3。", "CHR+5。"], special: "Charisma" },
    { name: "Legendary Intelligence", maxRank: 4, desc: ["INT+1。", "INT+2。", "INT+3。", "INT+5。"], special: "Intelligence" },
    { name: "Legendary Agility", maxRank: 4, desc: ["AGI+1。", "AGI+2。", "AGI+3。", "AGI+5。"], special: "Agility" },
    { name: "Legendary Luck", maxRank: 4, desc: ["LCK+1。", "LCK+2。", "LCK+3。", "LCK+5。"], special: "Luck" },
    { name: "Funky Duds", maxRank: 4, desc: ["マッチングアーマー着用時、毒耐性+50。", "マッチングアーマー着用時、毒耐性+100。", "マッチングアーマー着用時、毒耐性+150。", "マッチングアーマー着用時、毒耐性+200。"] },
    { name: "Sizzling Style", maxRank: 4, desc: ["マッチングアーマー着用時、火炎耐性+50。", "マッチングアーマー着用時、火炎耐性+100。", "マッチングアーマー着用時、火炎耐性+150。", "マッチングアーマー着用時、火炎耐性+200。"] },
    { name: "Electric Absorption", maxRank: 4, desc: ["エネルギー攻撃を10%の確率で吸収しコア充電。", "エネルギー攻撃を15%の確率で吸収しコア充電。", "エネルギー攻撃を20%の確率で吸収しコア充電。", "エネルギー攻撃を25%の確率で吸収しコア充電。"] },
    { name: "Taking One for the Team", maxRank: 4, desc: ["チームメイト攻撃中の敵が受けるダメージ+10%。", "チームメイト攻撃中の敵が受けるダメージ+20%。", "チームメイト攻撃中の敵が受けるダメージ+30%。", "チームメイト攻撃中の敵が受けるダメージ+40%。"] },
    { name: "Far-Flung Fireworks", maxRank: 4, desc: ["レジェンダリーの敵を倒すと10%で爆発。", "レジェンダリーの敵を倒すと15%で爆発。", "レジェンダリーの敵を倒すと20%で爆発。", "レジェンダリーの敵を倒すと25%で爆発。"] },
    { name: "Retribution", maxRank: 4, desc: ["近接攻撃を受けた時に5%の確率で敵をスタン。", "近接攻撃を受けた時に10%の確率で敵をスタン。", "近接攻撃を受けた時に15%の確率で敵をスタン。", "近接攻撃を受けた時に20%の確率で敵をスタン。"] },
    { name: "Power Armor Reboot", maxRank: 4, desc: ["PA装着中、HP0で10%の確率で復活。", "PA装着中、HP0で15%の確率で復活。", "PA装着中、HP0で20%の確率で復活。", "PA装着中、HP0で25%の確率で復活。"] },
    { name: "Survival Shortcut", maxRank: 4, desc: ["30分ごとに缶詰を自動生成。1個。", "20分ごとに缶詰を自動生成。1個。", "15分ごとに缶詰を自動生成。1個。", "10分ごとに缶詰を自動生成。2個。"] },
    { name: "Blood Sacrifice", maxRank: 4, desc: ["チームメイト倒れた時にHP25%消費で自動蘇生。", "チームメイト倒れた時にHP20%消費で自動蘇生。", "チームメイト倒れた時にHP15%消費で自動蘇生。", "チームメイト倒れた時にHP10%消費で自動蘇生。"] },
    { name: "Hack and Slash", maxRank: 4, desc: ["VATS近接クリティカルのAoEダメージ。範囲小。", "VATS近接クリティカルのAoEダメージ。範囲中。", "VATS近接クリティカルのAoEダメージ。範囲大。", "VATS近接クリティカルのAoEダメージ。範囲特大。"] },
    { name: "Exploding Palm", maxRank: 4, desc: ["VATS素手クリティカルで爆発ダメージ。範囲小。", "VATS素手クリティカルで爆発ダメージ。範囲中。", "VATS素手クリティカルで爆発ダメージ。範囲大。", "VATS素手クリティカルで爆発ダメージ。範囲特大。"] }
];

// グール専用Perkデータ
const GHOUL_PERK_DATA = {
    "Strength": [
        { name: "Arms of Steel", level: 7, maxRank: 2, cost: [1, 1], race: "ghoul", desc: ["遠距離武器のリコイルを15%軽減し精度を向上。", "遠距離武器のリコイルを30%軽減し精度を向上。"] },
        { name: "Bone Shatterer", level: 15, maxRank: 3, cost: [1, 2, 3], race: "ghoul", desc: ["近接攻撃で20%の確率で四肢を損傷。", "近接攻撃で40%の確率で四肢を損傷。", "近接攻撃で60%の確率で四肢を損傷。"] },
        { name: "Brick Wall", level: 30, maxRank: 1, cost: [1], race: "ghoul", desc: ["Glowが高い時、よろめき攻撃を無効化。"] },
        { name: "Bullet Storm", level: 40, maxRank: 3, cost: [1, 2, 3], race: "ghoul", desc: ["弾薬30発消費ごとにダメージ+3%。最大10スタック。", "弾薬25発消費ごとにダメージ+3%。最大10スタック。", "弾薬20発消費ごとにダメージ+3%。最大10スタック。"] },
        { name: "Easy Target", level: 25, maxRank: 3, cost: [1, 2, 3], race: "ghoul", desc: ["損傷した四肢への遠距離ダメージ+25%。", "損傷した四肢への遠距離ダメージ+50%。", "損傷した四肢への遠距離ダメージ+75%。"] },
        { name: "Natural Stance", level: 10, maxRank: 1, cost: [1], race: "ghoul", desc: ["近接武器装備時、被スタガーを25%軽減。"] },
        { name: "Radioactive Strength", level: 22, maxRank: 3, cost: [1, 2, 3], race: "ghoul", desc: ["Glowを消費してパワーアタックとバッシュのダメージ+100%。", "Glowを消費してパワーアタックとバッシュのダメージ+200%。", "Glowを消費してパワーアタックとバッシュのダメージ+300%。"] },
        { name: "Wound Salter", level: 35, maxRank: 3, cost: [1, 2, 3], race: "ghoul", desc: ["出血中の標的へのダメージ+10%。", "出血中の標的へのダメージ+20%。", "出血中の標的へのダメージ+30%。"] }
    ],
    "Perception": [
        { name: "Breathe It In", level: 12, maxRank: 3, cost: [1, 1, 1], race: "ghoul", desc: ["RAD耐性を15%低下させ環境放射線の吸収を速める。", "RAD耐性を20%低下させ環境放射線の吸収を速める。", "RAD耐性を25%低下させ環境放射線の吸収を速める。"] },
        { name: "Down Ranger", level: 28, maxRank: 3, cost: [1, 2, 3], race: "ghoul", desc: ["HP50%以下の標的へのダメージ+10%。", "HP50%以下の標的へのダメージ+20%。", "HP50%以下の標的へのダメージ+30%。"] },
        { name: "Eye of the Hunter", level: 20, maxRank: 3, cost: [1, 1, 1], race: "ghoul", desc: ["VATSの命中率+5%。", "VATSの命中率+10%。", "VATSの命中率+15%。"] },
        { name: "Hat Trick", level: 42, maxRank: 3, cost: [1, 1, 1], race: "ghoul", desc: ["ヘッドショットキルでAP5回復。", "ヘッドショットキルでAP10回復。", "ヘッドショットキルでAP15回復。"] },
        { name: "Rad-Reaver", level: 35, maxRank: 2, cost: [1, 2], race: "ghoul", desc: ["ノンオートマチック武器で被放射線の敵からGlowを吸収。", "吸収量が増加。"] }
    ],
    "Endurance": [
        { name: "Chem Diet", level: 10, maxRank: 3, cost: [1, 1, 1], race: "ghoul", desc: ["薬品のフェラル化抑制効果が25%増加。", "薬品のフェラル化抑制効果が50%増加。", "薬品のフェラル化抑制効果が75%増加。"] },
        { name: "Glowing Gut", level: 18, maxRank: 3, cost: [1, 2, 3], race: "ghoul", desc: ["汚染された飲食物からのRAD獲得量が100%増加。", "汚染された飲食物からのRAD獲得量が200%増加。", "汚染された飲食物からのRAD獲得量が300%増加。"] },
        { name: "Rad Specialist", level: 40, maxRank: 3, cost: [1, 2, 3], race: "ghoul", desc: ["アーマー/PAのRAD耐性を15%低下。マッチングセットで効果2倍。", "RAD耐性を20%低下。マッチングセットで効果2倍。", "RAD耐性を25%低下。マッチングセットで効果2倍。"] },
        { name: "Radiation Power", level: 30, maxRank: 3, cost: [1, 2, 3], race: "ghoul", desc: ["Glowを消費して追加ダメージ+10%。", "Glowを消費して追加ダメージ+20%。", "Glowを消費して追加ダメージ+30%。"] },
        { name: "Thick Skin", level: 25, maxRank: 3, cost: [1, 1, 1], race: "ghoul", desc: ["PA未装着時に被弾ダメージを10%軽減。", "PA未装着時に被弾ダメージを20%軽減。", "PA未装着時に被弾ダメージを30%軽減。"] }
    ],
    "Charisma": [
        { name: "Feral Presence", level: 15, maxRank: 2, cost: [1, 1], race: "ghoul", desc: ["攻撃した標的のダメージ出力を15%減少。", "攻撃した標的のダメージ出力を30%減少。"] },
        { name: "Glowing One", level: 35, maxRank: 1, cost: [2], race: "ghoul", desc: ["チーム内のグール仲間にGlowを分け与えられる。"] },
        { name: "Moral Support", level: 25, maxRank: 1, cost: [1], race: "ghoul", desc: ["チーム参加中はフェラル化の速度が遅くなる。"] },
        { name: "United Ordeal", level: 45, maxRank: 3, cost: [1, 2, 3], race: "ghoul", desc: ["チームに他のグールがいると全SPECIAL+1。", "チームに他のグールがいると全SPECIAL+2。", "チームに他のグールがいると全SPECIAL+3。"] }
    ],
    "Intelligence": [
        { name: "Bomb Scientist", level: 20, maxRank: 3, cost: [1, 2, 3], race: "ghoul", desc: ["Glowを消費してグレネードのダメージ+20%。", "Glowを消費してグレネードのダメージ+35%。", "Glowを消費してグレネードのダメージ+50%。"] },
        { name: "Mad Scientist", level: 28, maxRank: 3, cost: [1, 1, 1], race: "ghoul", desc: ["Glowを消費してエネルギー武器のダメージ+10%。", "Glowを消費してエネルギー武器のダメージ+15%。", "Glowを消費してエネルギー武器のダメージ+20%。"] },
        { name: "Science Monster", level: 40, maxRank: 3, cost: [1, 1, 1], race: "ghoul", desc: ["Glow保持中、被弾後10秒間ダメージ+5%。", "Glow保持中、被弾後10秒間ダメージ+10%。", "Glow保持中、被弾後10秒間ダメージ+15%。"] }
    ],
    "Agility": [
        { name: "Action Ghoul", level: 12, maxRank: 3, cost: [1, 1, 1], race: "ghoul", desc: ["Glowを消費してAP回復速度+15%。", "Glowを消費してAP回復速度+30%。", "Glowを消費してAP回復速度+45%。"] },
        { name: "Gun Tricks", level: 22, maxRank: 3, cost: [1, 1, 1], race: "ghoul", desc: ["武器のリロード速度+10%。", "武器のリロード速度+20%。", "武器のリロード速度+30%。"] },
        { name: "Hyper Reflex", level: 35, maxRank: 3, cost: [1, 1, 1], race: "ghoul", desc: ["Glowが高くPA未装着時に回避率+15%。", "Glowが高くPA未装着時に回避率+30%。", "Glowが高くPA未装着時に回避率+45%。"] },
        { name: "Jaguar Speed", level: 28, maxRank: 2, cost: [1, 1], race: "ghoul", desc: ["Glowが高い時にスプリント速度+10%。", "Glowが高い時にスプリント速度+20%。"] }
    ],
    "Luck": [
        { name: "Battle Genes", level: 15, maxRank: 2, cost: [1, 2], race: "ghoul", desc: ["戦闘中に毎秒HP2回復。", "戦闘中に毎秒HP4回復。"] },
        { name: "Faulty Spots", level: 25, maxRank: 1, cost: [1], race: "ghoul", desc: ["弱点ダメージ+15%。"] },
        { name: "Glowing Criticals", level: 35, maxRank: 3, cost: [1, 2, 3], race: "ghoul", desc: ["Glowが高い時、VATSクリティカルダメージ+20%。", "Glowが高い時、VATSクリティカルダメージ+35%。", "Glowが高い時、VATSクリティカルダメージ+50%。"] },
        { name: "Wild West Hands", level: 42, maxRank: 3, cost: [1, 1, 1], race: "ghoul", desc: ["弾切れ時に12%の確率で即リロード。", "弾切れ時に24%の確率で即リロード。", "弾切れ時に36%の確率で即リロード。"] }
    ]
};

// グール用レジェンダリーPerk
const GHOUL_LEGENDARY_PERKS = [
    { name: "Action Diet", maxRank: 4, race: "ghoul", desc: ["キル時にHP2回復、フェラル化2%減少。", "キル時にHP4回復、フェラル化3%減少。", "キル時にHP6回復、フェラル化4%減少。", "キル時にHP8回復、フェラル化5%減少。"] },
    { name: "Feral Rage", maxRank: 4, race: "ghoul", desc: ["フェラル化中、Glow消費Perkのコスト-20%。", "フェラル化中、Glow消費Perkのコスト-30%。", "フェラル化中、Glow消費Perkのコスト-40%。", "フェラル化中、Glow消費Perkのコスト-50%。"] }
];

// ミューテーション（変異）データ
const MUTATIONS = [
    { name: "Adrenal Reaction", positive: "低HPでダメージ増加", negative: "最大HP-50" },
    { name: "Bird Bones", positive: "AGI+4、落下速度低下", negative: "STR-4" },
    { name: "Carnivore", positive: "肉料理の効果2倍、病気にならない", negative: "野菜は食べられない" },
    { name: "Chameleon", positive: "非戦闘時しゃがみで透明化（アーマー未装着時）", negative: "―" },
    { name: "Eagle Eyes", positive: "PER+4、クリティカルダメージ+25%", negative: "STR-4" },
    { name: "Egg Head", positive: "INT+6", negative: "STR-3、END-3" },
    { name: "Electrically Charged", positive: "近接攻撃を受けた時に電気ダメージで反撃", negative: "―" },
    { name: "Empath", positive: "チームメイトが受けるダメージ-25%", negative: "自分が受けるダメージ+33%" },
    { name: "Grounded", positive: "エネルギー耐性+100", negative: "エネルギー武器のダメージ-50%" },
    { name: "Healing Factor", positive: "非戦闘時にHP回復速度+300%", negative: "薬品の効果-55%" },
    { name: "Herbivore", positive: "野菜料理の効果2倍、病気にならない", negative: "肉は食べられない" },
    { name: "Herd Mentality", positive: "チーム時に全SPECIAL+2", negative: "ソロ時に全SPECIAL-2" },
    { name: "Marsupial", positive: "所持重量+20、ジャンプ力大幅増加", negative: "INT-4" },
    { name: "Plague Walker", positive: "病気の数に応じて周囲に毒ダメージ", negative: "―" },
    { name: "Scaly Skin", positive: "DR/ER+50", negative: "AP-50" },
    { name: "Speed Demon", positive: "移動速度+20%、リロード速度+20%", negative: "移動中の空腹・渇き+50%" },
    { name: "Talons", positive: "素手ダメージ+25%、出血効果付与", negative: "AGI-4" },
    { name: "Twisted Muscles", positive: "近接ダメージ+25%、よろめき確率増加", negative: "銃の精度-50%" },
    { name: "Unstable Isotope", positive: "近接攻撃を受けた時に放射線バーストで反撃", negative: "―" }
];
