/**
 * Fallout 76 Perk データベース（Update 64対応）
 * fo76db.com + Fallout Wiki 準拠
 */

// fo76db.comと名前が異なるPerkの画像スラッグマッピング（完全版）
const PERK_IMAGE_OVERRIDES = {
    // === Strength ===
    "Shotgunner": "Scattershot",
    "Expert Shotgunner": "Scattershot",
    "Master Shotgunner": "Scattershot",
    "Expert Gladiator": "Gladiator",
    "Master Gladiator": "Gladiator",
    "Expert Slugger": "Slugger",
    "Master Slugger": "Slugger",
    "Heavy Gunner": "Bullet-Shield",
    "Expert Heavy Gunner": "Bullet-Shield",
    "Master Heavy Gunner": "Bullet-Shield",
    "Bullet Shield": "Bullet-Shield",

    // === Perception ===
    "Rifleman": "Long-Shot",
    "Expert Rifleman": "Long-Shot",
    "Master Rifleman": "Long-Shot",
    "Commando": "Ground-Pounder",
    "Expert Commando": "Ground-Pounder",
    "Master Commando": "Ground-Pounder",
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
    "Fire in the Hole": "Fire-in-the-Hole",

    // === Endurance ===
    "Aqua Boy/Girl": "AquaboyAquagirl",

    // === Charisma ===
    "Strange in Numbers": "Strange-in-Numbers",
    "E.M.T.": "E.M.T.",

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
    "Luck of the Draw": "Luck-of-the-Draw",
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
};

// Perk名から画像URLを生成する関数
function getPerkImageUrl(perkName, rank) {
    // マッピングテーブルにある場合はそちらを使用
    const override = PERK_IMAGE_OVERRIDES[perkName];
    let slug;
    if (override) {
        slug = override;
    } else {
        // fo76db.comの命名規則: スペース→ハイフン、特殊文字除去
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
    return encodeURI(`https://fo76db.com/wp-content/uploads/pbs/${slug}_${rank || 1}.png`);
}

const PERK_DATA = {
    "Strength": [
        { name: "Slugger", level: 6, maxRank: 3, cost: [1, 2, 3], desc: ["重傷を負った敵への近接ダメージが10%増加する。", "重傷を負った敵への近接ダメージが20%増加する。", "重傷を負った敵への近接ダメージが30%増加する。"] },
        { name: "Iron Fist", level: 2, maxRank: 3, cost: [1, 2, 3], desc: ["パンチ攻撃のダメージが+10%増加する。", "パンチ攻撃のダメージが+20%増加する。", "パンチ攻撃のダメージが+30%増加する。"] },
        { name: "Traveling Pharmacy", level: 3, maxRank: 2, cost: [1, 2], desc: ["スティムパックを含む薬品の重量が45%軽くなる。", "スティムパックを含む薬品の重量が90%軽くなる。"] },
        { name: "Strong Arm", level: 5, maxRank: 1, cost: [1], desc: ["投擲武器をより遠くに投げられる。"] },
        { name: "Pack Rat", level: 7, maxRank: 3, cost: [1, 2, 3], desc: ["全てのジャンクアイテムの重量が25%軽くなる。", "重量が50%軽くなる。", "重量が75%軽くなる。"] },
        { name: "Gladiator", level: 2, maxRank: 3, cost: [1, 2, 3], desc: ["片手近接武器のダメージが+10%増加する。", "ダメージが+15%増加する。", "ダメージが+20%増加する。"] },
        { name: "Expert Gladiator", level: 15, maxRank: 3, cost: [1, 2, 3], desc: ["片手近接武器のダメージが+10%増加する。", "ダメージが+15%増加する。", "ダメージが+20%増加する。"] },
        { name: "Master Gladiator", level: 25, maxRank: 3, cost: [1, 2, 3], desc: ["片手近接武器のダメージが+10%増加する。", "ダメージが+15%増加する。", "ダメージが+20%増加する。"] },
        { name: "Expert Slugger", level: 20, maxRank: 3, cost: [1, 2, 3], desc: ["両手近接武器のダメージが+10%増加する。", "ダメージが+15%増加する。", "ダメージが+20%増加する。"] },
        { name: "Master Slugger", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["両手近接武器のダメージが+10%増加する。", "ダメージが+15%増加する。", "ダメージが+20%増加する。"] },
        { name: "Shotgunner", level: 10, maxRank: 3, cost: [1, 2, 3], desc: ["ショットガンのダメージが+10%増加する。", "ダメージが+15%増加する。", "ダメージが+20%増加する。"] },
        { name: "Expert Shotgunner", level: 20, maxRank: 3, cost: [1, 2, 3], desc: ["ショットガンのダメージが+10%増加する。", "ダメージが+15%増加する。", "ダメージが+20%増加する。"] },
        { name: "Master Shotgunner", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["ショットガンのダメージが+10%増加する。", "ダメージが+15%増加する。", "ダメージが+20%増加する。"] },
        { name: "Heavy Gunner", level: 10, maxRank: 3, cost: [1, 2, 3], desc: ["非爆発系ヘビー武器のダメージが+10%増加する。", "ダメージが+15%増加する。", "ダメージが+20%増加する。"] },
        { name: "Expert Heavy Gunner", level: 20, maxRank: 3, cost: [1, 2, 3], desc: ["非爆発系ヘビー武器のダメージが+10%増加する。", "ダメージが+15%増加する。", "ダメージが+20%増加する。"] },
        { name: "Master Heavy Gunner", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["非爆発系ヘビー武器のダメージが+10%増加する。", "ダメージが+15%増加する。", "ダメージが+20%増加する。"] },
        { name: "Basher", level: 11, maxRank: 2, cost: [1, 2], desc: ["銃バッシュのダメージが+25%増加する。", "バッシュのダメージが+50%増加する。"] },
        { name: "Sturdy Frame", level: 13, maxRank: 2, cost: [1, 2], desc: ["アーマーの重量が25%軽くなる。", "アーマーの重量が50%軽くなる。"] },
        { name: "Barbarian", level: 14, maxRank: 3, cost: [1, 2, 3], desc: ["パワーアーマー未装着時、STR1ごとにDR+2。", "STR1ごとにDR+3。", "STR1ごとにDR+4。"] },
        { name: "Martial Artist", level: 16, maxRank: 3, cost: [1, 2, 3], desc: ["近接武器の振り速度が+10%速くなり、重量が20%軽くなる。", "振り速度+20%、重量40%減。", "振り速度+30%、重量60%減。"] },
        { name: "Scattershot", level: 18, maxRank: 3, cost: [1, 2, 3], desc: ["ショットガンの重量が30%軽くなり、リロード速度が+10%速くなる。", "重量60%減、リロード+20%。", "重量90%減、リロード+30%。"] },
        { name: "Blocker", level: 21, maxRank: 3, cost: [1, 2, 3], desc: ["近接攻撃からのダメージを15%軽減する。", "30%軽減。", "45%軽減。"] },
        { name: "Bandolier", level: 22, maxRank: 2, cost: [1, 2], desc: ["実弾武器の弾薬の重量が45%軽くなる。", "弾薬の重量が90%軽くなる。"] },
        { name: "Portable Power", level: 24, maxRank: 2, cost: [1, 2], desc: ["パワーアーマーのパーツの重量が25%軽くなる。", "重量が50%軽くなる。"] },
        { name: "Strong Back", level: 26, maxRank: 4, cost: [1, 2, 3, 4], desc: ["所持重量+10。", "+20。", "+30。", "+40。"] },
        { name: "Bear Arms", level: 35, maxRank: 3, cost: [1, 2, 3], desc: ["ヘビー武器の重量が30%軽くなる。", "重量60%減。", "重量90%減。"] },
        { name: "Ordnance Express", level: 31, maxRank: 3, cost: [1, 2, 3], desc: ["爆発物の重量が30%軽くなる。", "重量60%減。", "重量90%減。"] },
        { name: "Full Charge", level: 33, maxRank: 2, cost: [1, 2], desc: ["PA装着中のスプリントによるフュージョンコア消費が50%減少する。", "消費がなくなる。"] },
        { name: "Incisor", level: 34, maxRank: 3, cost: [1, 2, 3], desc: ["近接武器が標的のアーマーを25%無視する。", "50%無視。", "75%無視。"] },
        { name: "Lock and Load", level: 37, maxRank: 3, cost: [1, 2, 3], desc: ["ヘビー武器のリロード速度が+10%速くなる。", "+20%。", "+30%。"] },
        { name: "Pain Train", level: 41, maxRank: 3, cost: [1, 2, 3], desc: ["PA装着中のスプリントで敵にダメージを与えてよろめかせる。", "ダメージ増加。", "大ダメージ。"] },
        { name: "Bullet Shield", level: 39, maxRank: 3, cost: [1, 2, 3], desc: ["ヘビー武器で射撃中にDR+20。", "+40。", "+60。"] }
    ],
    "Perception": [
        { name: "Picklock", level: 5, maxRank: 3, cost: [1, 2, 3], desc: ["ピッキングスキル+1。", "スキル+2。", "スキル+3。"] },
        { name: "Concentrated Fire", level: 2, maxRank: 3, cost: [1, 2, 3], desc: ["V.A.T.S.で部位を狙える。命中率とダメージが各ショットごとに+1%。", "+2%。", "+3%。"] },
        { name: "Butcher's Bounty", level: 3, maxRank: 3, cost: [1, 2, 3], desc: ["動物の死体から40%の確率で追加の肉を入手。", "60%。", "80%。"] },
        { name: "Green Thumb", level: 4, maxRank: 1, cost: [1], desc: ["植物の収穫量が2倍になる。"] },
        { name: "Rifleman", level: 2, maxRank: 3, cost: [1, 2, 3], desc: ["ノンオートマチックライフルのダメージが+10%増加する。", "+15%。", "+20%。"] },
        { name: "Expert Rifleman", level: 15, maxRank: 3, cost: [1, 2, 3], desc: ["ノンオートマチックライフルのダメージが+10%増加する。", "+15%。", "+20%。"] },
        { name: "Master Rifleman", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["ノンオートマチックライフルのダメージが+10%増加する。", "+15%。", "+20%。"] },
        { name: "Commando", level: 2, maxRank: 3, cost: [1, 2, 3], desc: ["オートマチック武器のダメージが+10%増加する。", "+15%。", "+20%。"] },
        { name: "Expert Commando", level: 15, maxRank: 3, cost: [1, 2, 3], desc: ["オートマチック武器のダメージが+10%増加する。", "+15%。", "+20%。"] },
        { name: "Master Commando", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["オートマチック武器のダメージが+10%増加する。", "+15%。", "+20%。"] },
        { name: "Crack Shot", level: 7, maxRank: 3, cost: [1, 2, 3], desc: ["ピストルの射程と精度が+10%向上する。", "+20%。", "+30%。"] },
        { name: "Exterminator", level: 14, maxRank: 3, cost: [1, 2, 3], desc: ["ミレルークとバグ系のダメージが+30%増加する。", "+45%。", "+75%。"] },
        { name: "Ground Pounder", level: 18, maxRank: 3, cost: [1, 2, 3], desc: ["オートマチックライフルのリロード速度が+10%、腰だめ精度が+10%向上する。", "+20%。", "+30%。"] },
        { name: "Fortune Finder", level: 22, maxRank: 3, cost: [1, 2, 3], desc: ["キャップの入った箱が近くにあると音が鳴る。範囲が通常の2倍。", "3倍。", "4倍。"] },
        { name: "Awareness", level: 27, maxRank: 1, cost: [1], desc: ["V.A.T.S.で標的の耐性を確認できる。"] },
        { name: "Tank Killer", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["ライフルが標的のアーマーの12%を無視する。", "24%無視。", "36%無視、9%でよろめかせる。"] },
        { name: "Glow Sight", level: 33, maxRank: 3, cost: [1, 2, 3], desc: ["発光した敵へのダメージが+30%増加する。", "+45%。", "+60%。"] },
        { name: "Grenadier", level: 35, maxRank: 2, cost: [1, 2], desc: ["爆発の範囲が50%拡大する。", "範囲が2倍になる。"] },
        { name: "Long Shot", level: 37, maxRank: 3, cost: [1, 2, 3], desc: ["ライフルの射程と精度が+10%向上する。", "+20%。", "+30%。"] },
        { name: "Night Person", level: 37, maxRank: 2, cost: [1, 2], desc: ["夜は（6PM-6AM）INTとPERが+1。", "+2。"] },
        { name: "Refractor", level: 39, maxRank: 4, cost: [1, 2, 3, 4], desc: ["エネルギー耐性+10。", "+20。", "+30。", "+40。"] },
        { name: "Sniper", level: 28, maxRank: 3, cost: [1, 2, 3], desc: ["スコープ越しの息止め時間が25%増加し、5%の確率でよろめかせる。", "50%増加、10%よろめき。", "75%増加、15%よろめき。"] },
        { name: "Fire in the Hole", level: 45, maxRank: 3, cost: [1, 2, 3], desc: ["投擲爆発物の軌道が表示される。爆発範囲が+50%。", "+100%。", "範囲が2倍。"] },
        { name: "Pannapictagraphist", level: 40, maxRank: 1, cost: [1], desc: ["雑誌が近くにあると音が鳴る。"] }
    ],
    "Endurance": [
        { name: "Lead Belly", level: 2, maxRank: 3, cost: [1, 2, 3], desc: ["食べ物と飲み物からの放射能を30%軽減。", "60%軽減。", "放射能を受けない。"] },
        { name: "Dromedary", level: 3, maxRank: 3, cost: [1, 2, 3], desc: ["水分の減少速度が25%遅くなる。", "50%遅くなる。", "75%遅くなる。"] },
        { name: "Slow Metabolizer", level: 4, maxRank: 3, cost: [1, 2, 3], desc: ["食料の減少速度が25%遅くなる。", "50%遅くなる。", "75%遅くなる。"] },
        { name: "Good Doggy", level: 8, maxRank: 1, cost: [1], desc: ["缶詰のドッグフードの効果が3倍になる。"] },
        { name: "Thirst Quencher", level: 6, maxRank: 3, cost: [1, 2, 3], desc: ["汚染された水を飲んだ時の病気確率が50%減少。", "75%減少。", "病気にならない。"] },
        { name: "Iron Stomach", level: 4, maxRank: 3, cost: [1, 2, 3], desc: ["生の食料からの病気確率が50%減少。", "75%減少。", "病気にならない。"] },
        { name: "Natural Resistance", level: 10, maxRank: 3, cost: [1, 2, 3], desc: ["かかっている病気の効果が-30%減少。", "-60%。", "-90%。"] },
        { name: "Vaccinated", level: 16, maxRank: 3, cost: [1, 2, 3], desc: ["クリーチャーからの病気感染率が60%減少。", "80%減。", "感染しない。"] },
        { name: "Photosynthetic", level: 12, maxRank: 2, cost: [1, 2], desc: ["日中に体力がゆっくりと回復する。", "回復が速くなる。"] },
        { name: "Aqua Boy/Girl", level: 14, maxRank: 2, cost: [1, 2], desc: ["水中で放射能を受けず呼吸ができる。", "水中で透明になる。"] },
        { name: "Cannibal", level: 15, maxRank: 3, cost: [1, 2, 3], desc: ["人間やグールの死体を食べてHPと空腹を回復。", "回復量増加。", "大幅に回復。"] },
        { name: "Chem Resistant", level: 23, maxRank: 2, cost: [1, 2], desc: ["薬品に中毒になる確率が50%減少。", "中毒にならない。"] },
        { name: "Lifegiver", level: 26, maxRank: 4, cost: [1, 2, 3, 4], desc: ["最大HP+15。", "+30。", "+45。", "さらにHP自動回復。"] },
        { name: "Fireproof", level: 27, maxRank: 3, cost: [1, 2, 3], desc: ["火炎と爆発のダメージを15%軽減。", "30%軽減。", "45%軽減。"] },
        { name: "Adamantium Skeleton", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["四肢のダメージを30%軽減。", "60%軽減。", "手足が壊れなくなる。"] },
        { name: "Ironclad", level: 30, maxRank: 5, cost: [1, 2, 3, 4, 5], desc: ["PA未装着時にDR+10、ER+10。", "+20、+20。", "+30、+30。", "+40、+40。", "+50、+50。"] },
        { name: "Radicool", level: 32, maxRank: 1, cost: [1], desc: ["RADが高いほどSTRにボーナス（最大+5 STR）。"] },
        { name: "Cola Nut", level: 34, maxRank: 2, cost: [1, 2], desc: ["ヌカ・コーラの効果が2倍。", "3倍。"] },
        { name: "Nocturnal Fortitude", level: 36, maxRank: 2, cost: [1, 2], desc: ["夜間（6PM-6AM）にHP+20。", "+40。"] },
        { name: "Revenant", level: 38, maxRank: 2, cost: [1, 2], desc: ["復活後ダメージ+25%（2分間）。", "+50%。"] },
        { name: "Ghoulish", level: 40, maxRank: 3, cost: [1, 2, 3], desc: ["RADでHPが回復する。", "回復量向上。", "大幅回復。"] },
        { name: "Solar Powered", level: 42, maxRank: 3, cost: [1, 2, 3], desc: ["昼間（6AM-6PM）にSTRとENDが+1。", "+2。", "+3でHP回復。"] },
        { name: "Sun Kissed", level: 45, maxRank: 2, cost: [1, 2], desc: ["昼間（6AM-6PM）にゆっくりRADが回復する。", "速く回復。"] },
        { name: "Rejuvenated", level: 12, maxRank: 2, cost: [1, 2], desc: ["十分に食べて飲むとENDとAPに小ボーナス。", "大ボーナス。"] },
        { name: "Professional Drinker", level: 20, maxRank: 1, cost: [1], desc: ["アルコールに中毒にならなくなる。"] },
        { name: "All Night Long", level: 37, maxRank: 3, cost: [1, 2, 3], desc: ["空腹と渇きの進行が20%遅くなる。", "40%。", "60%。"] },
        { name: "Rad Sponge", level: 44, maxRank: 4, cost: [1, 2, 3, 4], desc: ["チームメイトがRADを受けると自分のRADが80回復。", "160回復。", "300回復。", "全回復。"] }
    ],
    "Charisma": [
        { name: "Lone Wanderer", level: 4, maxRank: 4, cost: [1, 2, 3, 4], desc: ["ソロ時にダメージ+10%、AP回復+10%。", "ダメージ+15%、AP+20%。", "ダメージ+20%、AP+30%。", "DR+40追加。"] },
        { name: "Inspirational", level: 2, maxRank: 3, cost: [1, 2, 3], desc: ["チーム全員のXP獲得量+5%。", "+10%。", "+15%。"] },
        { name: "Bodyguards", level: 5, maxRank: 4, cost: [1, 2, 3, 4], desc: ["チームメイト1人ごとにDR+6、ER+6。", "+8。", "+10。", "+12。"] },
        { name: "Happy-Go-Lucky", level: 17, maxRank: 3, cost: [1, 2, 3], desc: ["アルコール摂取中はLuck+2。", "+3。", "+4。"] },
        { name: "Philanthropist", level: 7, maxRank: 3, cost: [1, 2, 3], desc: ["チームで食料を食べるとチーム全体の空腹回復。", "空腹と渇き回復。", "全回復。"] },
        { name: "Quack Surgeon", level: 11, maxRank: 1, cost: [1], desc: ["アルコールで他プレイヤーを蘇生できる。"] },
        { name: "Suppressor", level: 20, maxRank: 3, cost: [1, 2, 3], desc: ["攻撃した標的のダメージ出力を10%減少させる。", "20%減。", "30%減。"] },
        { name: "Tenderizer", level: 22, maxRank: 3, cost: [1, 2, 3], desc: ["攻撃した標的が受けるダメージが5%増加する。", "7%増加。", "10%増加。"] },
        { name: "Hard Bargain", level: 7, maxRank: 3, cost: [1, 2, 3], desc: ["ベンダーとの売買価格が改善。", "さらに改善。", "大幅改善。"] },
        { name: "Party Boy/Girl", level: 15, maxRank: 3, cost: [1, 2, 3], desc: ["アルコールの正の効果が2倍。", "3倍。", "効果が低下しない。"] },
        { name: "Strange in Numbers", level: 30, maxRank: 1, cost: [1], desc: ["チームメイトも変異持ちの場合、変異のプラス効果が+25%。"] },
        { name: "Spiritual Healer", level: 10, maxRank: 3, cost: [1, 2, 3], desc: ["プレイヤーを蘇生するとHP回復が5%増加。", "10%。", "15%。"] },
        { name: "EMT", level: 9, maxRank: 3, cost: [1, 2, 3], desc: ["蘇生速度が+30%速くなる。", "+60%。", "+100%。"] },
        { name: "Field Surgeon", level: 24, maxRank: 1, cost: [1], desc: ["スティムパックとRadAwayが即座に効果を発揮する。"] },
        { name: "Team Medic", level: 29, maxRank: 3, cost: [1, 2, 3], desc: ["スティムパック使用時にチーム全体も回復。", "回復増加。", "大幅回復。"] },
        { name: "Overly Generous", level: 26, maxRank: 3, cost: [1, 2, 3], desc: ["チームで食料を食べると仲間のRADが15回復。", "30回復。", "60回復。"] },
        { name: "Animal Friend", level: 28, maxRank: 3, cost: [1, 2, 3], desc: ["照準時に動物が20%の確率で戦闘停止。", "30%停止。", "味方になる。"] },
        { name: "Wasteland Whisperer", level: 34, maxRank: 3, cost: [1, 2, 3], desc: ["照準時にクリーチャーが20%の確率で戦闘停止。", "30%停止。", "味方になる。"] },
        { name: "Squad Maneuvers", level: 33, maxRank: 2, cost: [1, 2], desc: ["チーム全員の移動速度+10%。", "+20%。"] },
        { name: "Magnetic Personality", level: 13, maxRank: 2, cost: [1, 2], desc: ["チーム参加時にCHR+1。", "+2。"] },
        { name: "Travel Agent", level: 8, maxRank: 1, cost: [1], desc: ["ファストトラベルのキャップコストが30%減少。"] }
    ],
    "Intelligence": [
        { name: "First Aid", level: 2, maxRank: 3, cost: [1, 2, 3], desc: ["スティムパックの回復量が+15%増加する。", "+30%。", "+45%。"] },
        { name: "Hacker", level: 4, maxRank: 3, cost: [1, 2, 3], desc: ["ターミナルハッキングスキル+1。", "+2。", "+3。"] },
        { name: "Pharmacist", level: 6, maxRank: 3, cost: [1, 2, 3], desc: ["RadAwayの回復量が+30%増加する。", "+60%。", "+100%。"] },
        { name: "Licensed Plumber", level: 5, maxRank: 3, cost: [1, 2, 3], desc: ["パイプ武器の壊れる速度が30%遅くなる。", "60%遅くなる。", "壊れにくくなる。"] },
        { name: "Makeshift Warrior", level: 9, maxRank: 5, cost: [1, 2, 3, 4, 5], desc: ["近接武器の壊れる速度が30%遅くなり、クラフトが向上する。", "50%遅くなる。", "クラフト可能なランクが増える。", "さらに増える。", "最高ランクまでクラフト可能。"] },
        { name: "Scrapper", level: 13, maxRank: 1, cost: [1], desc: ["武器やアーマーの解体時にレア素材を入手する。"] },
        { name: "Gunsmith", level: 11, maxRank: 5, cost: [1, 2, 3, 4, 5], desc: ["銃の壊れる速度が20%遅くなり、Tier1の銃を作れる。", "壊れる速度50%減、Tier2。", "Tier3。", "Tier4。", "壊れにくくなり最高ランクまでクラフト可能。"] },
        { name: "Science", level: 16, maxRank: 1, cost: [1], desc: ["エネルギー武器のクラフトが可能になる。"] },
        { name: "Weapon Artisan", level: 14, maxRank: 3, cost: [1, 2, 3], desc: ["武器修理時に130%まで修復可能。", "160%。", "200%。"] },
        { name: "Chemist", level: 18, maxRank: 1, cost: [2], desc: ["薬品クラフト時の獲得量が2倍。"] },
        { name: "Demolition Expert", level: 10, maxRank: 5, cost: [1, 2, 3, 4, 5], desc: ["爆発物のダメージが+20%増加する。", "+30%。", "+40%。", "+50%。", "クラフト可能。"] },
        { name: "Batteries Included", level: 22, maxRank: 3, cost: [1, 2, 3], desc: ["エネルギー弾の重量が30%軽くなる。", "60%軽くなる。", "90%軽くなる。"] },
        { name: "Nerd Rage!", level: 19, maxRank: 3, cost: [1, 2, 3], desc: ["HP20%以下でダメージ+10%、DR+20。", "+20%、DR+30。", "+40%、DR+40、AP回復。"] },
        { name: "Stabilized", level: 36, maxRank: 3, cost: [1, 2, 3], desc: ["PA装着中、ヘビーガンの精度が向上しアーマーを15%無視。", "30%無視。", "45%無視しよろめかせる。"] },
        { name: "Power Patcher", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["PA修理コストが-20%。", "-40%。", "-60%。"] },
        { name: "Power User", level: 35, maxRank: 3, cost: [1, 2, 3], desc: ["フュージョンコアの持続時間が+30%。", "+60%。", "+100%。"] },
        { name: "Fix It Good", level: 27, maxRank: 3, cost: [1, 2, 3], desc: ["アーマー修理時に130%の状態にできる。", "160%。", "200%。"] },
        { name: "Contractor", level: 18, maxRank: 2, cost: [1, 2], desc: ["CAMPやワークショップの建設コストが-25%。", "-50%。"] },
        { name: "Wrecking Ball", level: 24, maxRank: 3, cost: [1, 2, 3], desc: ["ワークショップ内オブジェクトへのダメージが+40%増加。", "+80%。", "+120%。"] },
        { name: "Power Smith", level: 41, maxRank: 3, cost: [1, 2, 3], desc: ["PA改造で上位MODが利用可能に。", "さらに上位。", "全MOD利用可能。"] },
        { name: "Exotic Weapons", level: 48, maxRank: 1, cost: [1], desc: ["エキゾチック武器のクラフトが可能になる。"] }
    ],
    "Agility": [
        { name: "Action Boy/Girl", level: 2, maxRank: 3, cost: [1, 2, 3], desc: ["AP回復速度が+15%速くなる。", "+30%。", "+45%。"] },
        { name: "Guerrilla", level: 2, maxRank: 3, cost: [1, 2, 3], desc: ["オートマチックピストルのダメージが+10%。", "+15%。", "+20%。"] },
        { name: "Expert Guerrilla", level: 15, maxRank: 3, cost: [1, 2, 3], desc: ["オートマチックピストルのダメージが+10%。", "+15%。", "+20%。"] },
        { name: "Master Guerrilla", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["オートマチックピストルのダメージが+10%。", "+15%。", "+20%。"] },
        { name: "Gunslinger", level: 6, maxRank: 3, cost: [1, 2, 3], desc: ["ノンオートマチックピストルのダメージが+10%。", "+15%。", "+20%。"] },
        { name: "Expert Gunslinger", level: 20, maxRank: 3, cost: [1, 2, 3], desc: ["ノンオートマチックピストルのダメージが+10%。", "+15%。", "+20%。"] },
        { name: "Master Gunslinger", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["ノンオートマチックピストルのダメージが+10%。", "+15%。", "+20%。"] },
        { name: "Thru-Hiker", level: 3, maxRank: 3, cost: [1, 2, 3], desc: ["食料と飲料の重量が30%軽くなる。", "60%軽くなる。", "90%軽くなる。"] },
        { name: "Born Survivor", level: 7, maxRank: 3, cost: [1, 2, 3], desc: ["HP20%以下で自動的にスティムパックを使用する。", "HP30%以下。", "HP40%以下。"] },
        { name: "Gun Runner", level: 8, maxRank: 1, cost: [2], desc: ["武器装備中の移動速度が+10%速くなる。"] },
        { name: "Packin' Light", level: 9, maxRank: 3, cost: [1, 2, 3], desc: ["ピストルの重量が25%軽くなる。", "50%。", "75%。"] },
        { name: "Marathoner", level: 10, maxRank: 3, cost: [1, 2, 3], desc: ["スプリントのAP消費が-20%。", "-30%。", "-40%。"] },
        { name: "Dead Man Sprinting", level: 12, maxRank: 2, cost: [1, 2], desc: ["HP50%以下でスプリントのAP消費が-20%。", "-40%。"] },
        { name: "Evasive", level: 14, maxRank: 3, cost: [1, 2, 3], desc: ["AGI1ごとにDR+1、ER+1。", "+2。", "+3。"] },
        { name: "Ninja", level: 15, maxRank: 3, cost: [1, 2, 3], desc: ["遠距離スニークアタックのダメージが+1.0x。近接が+1.5x。", "+1.5x、+2.0x。", "+2.0x、+2.5x。"] },
        { name: "Sneak", level: 18, maxRank: 3, cost: [1, 2, 3], desc: ["発見されにくくなる。", "より発見されにくくなる。", "非常に見つかりにくい。"] },
        { name: "Moving Target", level: 20, maxRank: 3, cost: [1, 2, 3], desc: ["スプリント中にDR+20、ER+20。", "+40。", "+60。"] },
        { name: "White Knight", level: 22, maxRank: 3, cost: [1, 2, 3], desc: ["アーマーの壊れる速度が30%遅くなり、修理コスト-20%。", "60%遅くなり、-40%。", "90%遅くなり、-60%。"] },
        { name: "Dodge", level: 25, maxRank: 3, cost: [1, 2, 3], desc: ["PA未装着時に被弾を10%の確率で回避。", "20%。", "30%。"] },
        { name: "Covert Operative", level: 27, maxRank: 3, cost: [1, 2, 3], desc: ["遠距離スニークアタックのダメージ+0.25x。", "+0.5x。", "+0.75x。"] },
        { name: "Light Footed", level: 29, maxRank: 1, cost: [1], desc: ["スニーク中にフロアトラップを作動させない。"] },
        { name: "Ammosmith", level: 34, maxRank: 2, cost: [1, 2], desc: ["弾薬クラフト時に獲得量が+40%増加する。", "+80%。"] },
        { name: "Escape Artist", level: 35, maxRank: 1, cost: [1], desc: ["スニーク中にしゃがむと見つかりにくくなる。移動速度の影響が減少する。"] },
        { name: "Adrenaline", level: 49, maxRank: 5, cost: [1, 2, 3, 4, 5], desc: ["キルごとにダメージ+6%（最大60%、30秒持続）。", "+7%、最大70%。", "+8%、最大80%。", "+9%、最大90%。", "+10%、最大100%。"] },
        { name: "Mister Sandman", level: 37, maxRank: 3, cost: [1, 2, 3], desc: ["夜間のスニーク攻撃ダメージが+25%増加。", "+38%。", "+50%。"] },
        { name: "Modern Renegade", level: 42, maxRank: 3, cost: [1, 2, 3], desc: ["ピストルのヒップ射撃が5%の確率でよろめかせる。", "10%。", "15%。"] },
        { name: "Secret Agent", level: 39, maxRank: 3, cost: [1, 2, 3], desc: ["ステルスボーイの持続時間が+100%。", "+200%。", "+300%。"] },
        { name: "Serendipity", level: 34, maxRank: 3, cost: [1, 2, 3], desc: ["HP30%以下で15%の確率でダメージ回避。", "25%。", "45%。"] }
    ],
    "Luck": [
        { name: "Pharma Farma", level: 2, maxRank: 3, cost: [1, 2, 3], desc: ["医療用コンテナから40%で追加の薬品を発見。", "60%。", "80%。"] },
        { name: "Scrounger", level: 3, maxRank: 3, cost: [1, 2, 3], desc: ["弾薬コンテナから40%で追加弾薬を発見。", "60%。", "80%。"] },
        { name: "Woodchucker", level: 4, maxRank: 1, cost: [1], desc: ["木材の収穫量が2倍になる。"] },
        { name: "Luck of the Draw", level: 5, maxRank: 3, cost: [1, 2, 3], desc: ["攻撃時に10%の確率で武器の耐久を少し回復。", "15%。", "20%で大幅回復。"] },
        { name: "Can Do!", level: 7, maxRank: 3, cost: [1, 2, 3], desc: ["食料コンテナから40%で追加の缶詰を発見。", "60%。", "80%。"] },
        { name: "Junk Shield", level: 10, maxRank: 3, cost: [1, 2, 3], desc: ["ジャンク所持中にDR+10、ER+10。", "+20。", "+30。"] },
        { name: "Lucky Break", level: 14, maxRank: 3, cost: [1, 2, 3], desc: ["被弾時に4%の確率でアーマーが自動修復。", "8%。", "12%。"] },
        { name: "Mysterious Stranger", level: 16, maxRank: 3, cost: [1, 2, 3], desc: ["VATSで10%の確率で謎のストレンジャーが助けにくる。", "15%。", "20%。"] },
        { name: "Psychopath", level: 17, maxRank: 3, cost: [1, 2, 3], desc: ["VATSでのキル時にクリティカルゲージが15%追加チャージ。", "25%。", "35%。"] },
        { name: "Curator", level: 19, maxRank: 1, cost: [1], desc: ["雑誌とボブルヘッドの効果持続時間が2倍。"] },
        { name: "Critical Savvy", level: 23, maxRank: 3, cost: [1, 2, 3], desc: ["クリティカル消費後にゲージが15%残る。", "25%。", "35%。"] },
        { name: "Four Leaf Clover", level: 28, maxRank: 3, cost: [1, 2, 3], desc: ["VATSヒットごとに5%でクリティカルゲージが満タンに。", "8%。", "10%。"] },
        { name: "Starched Genes", level: 30, maxRank: 2, cost: [1, 2], desc: ["RADアウェイで変異が除去されなくなる。", "RADで変異が発生しなくなる。"] },
        { name: "Tormentor", level: 30, maxRank: 3, cost: [1, 2, 3], desc: ["ライフルでVATS攻撃時に5%の確率で四肢を損傷。", "8%。", "15%。"] },
        { name: "One Gun Army", level: 31, maxRank: 3, cost: [1, 2, 3], desc: ["ヘビーガンで射撃時に4%の確率でよろめかせる。", "8%。", "12%でよろめきと四肢損傷。"] },
        { name: "Better Criticals", level: 33, maxRank: 3, cost: [1, 2, 3], desc: ["VATSクリティカルのダメージが+20%。", "+30%。", "+40%。"] },
        { name: "Grim Reaper's Sprint", level: 35, maxRank: 3, cost: [1, 2, 3], desc: ["VATSキルで15%の確率でAPを全回復。", "25%。", "35%でクリティカルゲージも回復。"] },
        { name: "Ricochet", level: 37, maxRank: 3, cost: [1, 2, 3], desc: ["遠距離攻撃を8%の確率で反射。", "12%。", "18%で敵にダメージ。"] },
        { name: "Bloody Mess", level: 42, maxRank: 3, cost: [1, 2, 3], desc: ["全ダメージ+5%。敵が爆発死する可能性。", "+10%。", "+15%。"] },
        { name: "Class Freak", level: 46, maxRank: 3, cost: [1, 2, 3], desc: ["変異のマイナス効果を25%軽減。", "50%軽減。", "75%軽減。"] },
        { name: "Super Duper", level: 50, maxRank: 3, cost: [1, 2, 3], desc: ["クラフト時に10%の確率で追加アイテム。", "20%。", "30%。"] },
        { name: "Mysterious Savior", level: 15, maxRank: 3, cost: [1, 2, 3], desc: ["瀕死時に6%の確率で謎のヒーローが蘇生してくれる。", "12%。", "18%。"] },
        { name: "Last Laugh", level: 48, maxRank: 1, cost: [1], desc: ["死亡時にフラグメンテーショングレネードかプラズマグレネードを落とす。"] }
    ]
};

// レジェンダリーPerkデータ
const LEGENDARY_PERKS = [
    { name: "Ammo Factory", maxRank: 4, desc: ["弾薬クラフト時の獲得量+50%。", "+75%。", "+100%。", "+150%。"] },
    { name: "Follow Through", maxRank: 4, desc: ["遠距離スニーク攻撃で標的が受けるダメージ+10%（10秒間）。", "+20%。", "+30%。", "+40%。"] },
    { name: "What Rads?", maxRank: 4, desc: ["放射能耐性+50、毎秒RAD1回復。", "+100、毎秒2回復。", "+200、毎秒4回復。", "+300、毎秒6回復。"] },
    { name: "Master Infiltrator", maxRank: 4, desc: ["ピッキング/ハッキングスキル+1。スキル0自動解除。", "スキル+2。スキル1自動解除。", "スキル+3。スキル2自動解除。", "スキル3自動解除。"] },
    { name: "Legendary Strength", maxRank: 4, desc: ["STR+1。", "+2。", "+3。", "+5。"], special: "Strength" },
    { name: "Legendary Perception", maxRank: 4, desc: ["PER+1。", "+2。", "+3。", "+5。"], special: "Perception" },
    { name: "Legendary Endurance", maxRank: 4, desc: ["END+1。", "+2。", "+3。", "+5。"], special: "Endurance" },
    { name: "Legendary Charisma", maxRank: 4, desc: ["CHR+1。", "+2。", "+3。", "+5。"], special: "Charisma" },
    { name: "Legendary Intelligence", maxRank: 4, desc: ["INT+1。", "+2。", "+3。", "+5。"], special: "Intelligence" },
    { name: "Legendary Agility", maxRank: 4, desc: ["AGI+1。", "+2。", "+3。", "+5。"], special: "Agility" },
    { name: "Legendary Luck", maxRank: 4, desc: ["LCK+1。", "+2。", "+3。", "+5。"], special: "Luck" },
    { name: "Funky Duds", maxRank: 4, desc: ["マッチングアーマー着用時、毒耐性+50。", "+100。", "+150。", "+200。"] },
    { name: "Sizzling Style", maxRank: 4, desc: ["マッチングアーマー着用時、火炎耐性+50。", "+100。", "+150。", "+200。"] },
    { name: "Electric Absorption", maxRank: 4, desc: ["エネルギー攻撃を10%の確率で吸収しコア充電。", "15%。", "20%。", "25%。"] },
    { name: "Taking One for the Team", maxRank: 4, desc: ["チームメイト攻撃中の敵が受けるダメージ+10%。", "+20%。", "+30%。", "+40%。"] },
    { name: "Far-Flung Fireworks", maxRank: 4, desc: ["レジェンダリーの敵を倒すと10%で爆発。", "+15%。", "+20%。", "+25%。"] },
    { name: "Retribution", maxRank: 4, desc: ["近接攻撃を受けた時に5%の確率で敵をスタン。", "10%。", "15%。", "20%。"] },
    { name: "Power Armor Reboot", maxRank: 4, desc: ["PA装着中、HP0で10%の確率で復活。", "15%。", "20%。", "25%。"] },
    { name: "Survival Shortcut", maxRank: 4, desc: ["30分ごとに缶詰1個を自動生成。", "20分ごと。", "15分ごと。", "10分ごとに2個。"] },
    { name: "Blood Sacrifice", maxRank: 4, desc: ["チームメイト倒れた時にHP25%消費で自動蘇生。", "HP20%。", "HP15%。", "HP10%。"] },
    { name: "Hack and Slash", maxRank: 4, desc: ["VATS近接クリティカルのAoEダメージ。範囲小。", "範囲中。", "範囲大。", "範囲特大。"] },
    { name: "Exploding Palm", maxRank: 4, desc: ["VATS素手クリティカルで爆発ダメージ。範囲小。", "範囲中。", "範囲大。", "範囲特大。"] }
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
