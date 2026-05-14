const images = [
  { file: "Paladin.jpg", caption: "B.O.S. パラディン (T-51b)", cat: "Fallout" },
  { file: "Fo1_Losthills_Entrance.png", caption: "ロスト・ヒルズ 入口", cat: "Fallout" },
  { file: "Fallout_Lost_Hills_Level_1.png", caption: "ロスト・ヒルズ レベル1", cat: "Fallout" },
  { file: "Fo1_Brotherhood_Interior.jpg", caption: "ロスト・ヒルズ 内部施設", cat: "Fallout" },
  { file: "Fo1_Lost_Hills_Townmap.png", caption: "ロスト・ヒルズ 周辺地図", cat: "Fallout" },
  { file: "BOS.gif", caption: "ブラザーフッド ロゴ (アニメーション)", cat: "Fallout" },
  { file: "FO01_NPC_Maxson_G.png", caption: "創設者ロジャー・マクソン (肖像)", cat: "Fallout" },
  { file: "BOS_Rhombus.png", caption: "パラディン・ロンバス", cat: "Fallout" },
  { file: "Fo1_Military_Base_Destroyed.png", caption: "破壊されたマリポサ軍事基地", cat: "Fallout" },
  { file: "Fo1_Hub_Downtown.png", caption: "ハブ ダウンタウン (交易拠点)", cat: "Fallout" },
  { file: "Fo1_caravan_leader.png", caption: "キャラバンのリーダー", cat: "Fallout" },
  
  { file: "FO2_Den_BoS.png", caption: "デンのB.O.S.拠点", cat: "Fallout 2" },
  { file: "Fo2_BOS_Outpost_NCR.png", caption: "NCR内のB.O.S.前哨基地", cat: "Fallout 2" },
  { file: "Brotherhood_OutpostFrancisco.png", caption: "サンフランシスコ前哨基地", cat: "Fallout 2" },
  { file: "Fo2_Matthew_v_Horrigan.png", caption: "マシューとフランク・ホリガン", cat: "Fallout 2" },
  { file: "Fo2_Jimmy.png", caption: "ジム (B.O.S.ガード)", cat: "Fallout 2" },

  { file: "Citadel.jpg", caption: "要塞 (シタデル) 全景", cat: "Fallout 3 / NV" },
  { file: "Elder_Lyons.jpg", caption: "エルダー・オーウェン・リオンズ", cat: "Fallout 3 / NV" },
  { file: "Fallout_3_power_armor_concept_art.jpg", caption: "パワーアーマー コンセプト", cat: "Fallout 3 / NV" },
  { file: "BOSvertibird.jpg", caption: "B.O.S. ベルチバード", cat: "Fallout 3 / NV" },
  { file: "CBailey7.jpg", caption: "シタデル 司令部", cat: "Fallout 3 / NV" },
  { file: "Dlc03watercrate.jpg", caption: "アクア・プーラの補給箱", cat: "Fallout 3 / NV" },
  { file: "Graffitifo35.png", caption: "壁のB.O.S.グラフィティ", cat: "Fallout 3 / NV" },
  { file: "Bosbanner.png", caption: "ブラザーフッドのバナー", cat: "Fallout 3 / NV" },
  { file: "Fallout_New_Vegas_T-51b.jpg", caption: "モハビのパトロール隊", cat: "Fallout 3 / NV" },
  { file: "Hidden_Valley_bunker.jpg", caption: "ヒドゥンバレー・バンカー", cat: "Fallout 3 / NV" },
  { file: "Elder_McNamara.jpg", caption: "エルダー・マクナマラ", cat: "Fallout 3 / NV" },
  { file: "FNV_brotherhoodlogo_nif.png", caption: "モハビ B.O.S. ロゴ", cat: "Fallout 3 / NV" },
  { file: "Mojave_BOS_banner.png", caption: "モハビ支部の旗", cat: "Fallout 3 / NV" },
  { file: "Activated_Purifier02.jpg", caption: "稼働するプロジェクト・ピュリティ", cat: "Fallout 3 / NV" },
  { file: "Following_In_His_Footsteps.jpg", caption: "父の足跡を追って (シタデル)", cat: "Fallout 3 / NV" },
  { file: "Ft_Bannister_BOS_aqua_pura_security_after_Broken_Steel.jpg", caption: "アクア・プーラの警備", cat: "Fallout 3 / NV" },
  { file: "Frag_mines1_Washington_Monument.jpg", caption: "ワシントン記念塔周辺の地雷", cat: "Fallout 3 / NV" },
  { file: "FO3BS_Water_caravan_in_the_Big_Town.png", caption: "ビッグタウンへの水キャラバン", cat: "Fallout 3 / NV" },
  { file: "Outcast_patrol_fighting_raiders.png", caption: "レイダーと戦うアウトキャスト", cat: "Fallout 3 / NV" },
  { file: "Outcast_Patrol_2.jpg", caption: "アウトキャストの巡回", cat: "Fallout 3 / NV" },
  { file: "Rockland_CT_exterior.jpg", caption: "ロックランド・カース・トンネル", cat: "Fallout 3 / NV" },
  { file: "Adams_Air_Force_Base_map.jpg", caption: "アダムス空軍基地 地図", cat: "Fallout 3 / NV" },
  { file: "Prime.jpg", caption: "リバティ・プライム", cat: "Fallout 3 / NV" },

  { file: "The_Prydwen.png", caption: "飛行船 プリドゥエン", cat: "Fallout 4" },
  { file: "Fo4_Elder_Maxson.png", caption: "エルダー・アーサー・マクソン", cat: "Fallout 4" },
  { file: "Prydwen-CommandDeck-Fallout4.jpg", caption: "プリドゥエン 指令デッキ", cat: "Fallout 4" },
  { file: "Fo4-drop-concept.jpg", caption: "降下作戦 コンセプト", cat: "Fallout 4" },
  { file: "BostonAirport-FiringRange-Fallout4.jpg", caption: "ボストン空港 射撃場", cat: "Fallout 4" },
  { file: "Fo4-Bos-flag.png", caption: "B.O.S. 旗 (Fo4)", cat: "Fallout 4" },
  { file: "Prydwen-StowageDepot-Fallout4.jpg", caption: "プリドゥエン 保管庫", cat: "Fallout 4" },
  { file: "Brotherhood_soldiers_patrolling_Boston.png", caption: "ボストンを巡回する兵士", cat: "Fallout 4" },
  { file: "Fo4_vertibird.jpg", caption: "ベルチバード (Fo4)", cat: "Fallout 4" },
  { file: "Brotherhood_trade_mission_Diamond_City.png", caption: "ダイヤモンドシティへの交易任務", cat: "Fallout 4" },
  { file: "FO4-Liberty-prime-kills-behemoth.png", caption: "ベヒモスを倒すリバティ・プライム", cat: "Fallout 4" },
  { file: "FO4_Pryd_TV_14.png", caption: "プリドゥエン 内部モニター", cat: "Fallout 4" },
  { file: "Clarke-in-jail.jpg", caption: "拘束されたクラーク", cat: "Fallout 4" },

  { file: "Steam_reward_Taggerdy's_Thunder_group_photo.jpg", caption: "タガティズ・サンダー 集合写真", cat: "Fallout 76" },
  { file: "FO76_Twitter_Brotherhood_of_Steel.jpg", caption: "アパラチアのB.O.S.", cat: "Fallout 76" },
  { file: "FO76_Forward_Station_Alpha.png", "caption": "前方観測拠点アルファ", cat: "Fallout 76" },
  { file: "FO76LR_Fortifying_ATLAS_Dorsey.jpg", caption: "アトラス砦のドーシー", cat: "Fallout 76" },
  { file: "FO76SR_The_Catalyst_Shin_victory.png", caption: "作戦完了後のナイト・シン", cat: "Fallout 76" },
  { file: "BOS_weapons_cache.png", caption: "B.O.S. 武器キャッシュ", cat: "Fallout 76" },
  { file: "FO76LL_BoS_medallion.png", caption: "B.O.S. メダリオン", cat: "Fallout 76" },
  { file: "FO76_steelreign_chronicsonictonic_02.jpg", caption: "スティール・レイン (キービジュアル)", cat: "Fallout 76" },
  { file: "FO76_Makeshift_Vault_Interior_Atrium.png", caption: "仮設Vault アトリウム", cat: "Fallout 76" },
  { file: "FO76_steelreign_chronicsonictonic_01.jpg", caption: "作戦会議 (スティール・レイン)", cat: "Fallout 76" },
  { file: "FO76_Brotherhood_vendor.png", caption: "B.O.S. ベンダー", cat: "Fallout 76" },
  { file: "Watoga_Shopping_Plaza_Vendor_bot_Phoenix.jpg", caption: "ベンダーボット・フェニックス", cat: "Fallout 76" },
  { file: "FO76TM_Gladiators_of_Steel_end.jpg", caption: "鋼鉄の剣闘士", cat: "Fallout 76" },
  { file: "FO76_BoS_GY_1.png", caption: "アトラス砦 墓地", cat: "Fallout 76" },
  { file: "Fallout_76_super_mutants_are_attacking_fort_atlas_by_spartan22294.jpg", caption: "アトラス砦への攻撃", cat: "Fallout 76" },
  { file: "FO76_BoS_TIE_fighter_1.png", caption: "アパラチアのB.O.S.工作員", cat: "Fallout 76" },
  { file: "FO76_Ultracite_power_armor.png", caption: "ウルトラサイト・パワーアーマー", cat: "Fallout 76" },
  { file: "FO76SD_supplyingdemands_chronicsonictonic_01.jpg", caption: "物資供給 (キービジュアル)", cat: "Fallout 76" },
  { file: "FO76_steelreign_chronicsonictonic_08.jpg", caption: "最終決戦 (スティール・レイン)", cat: "Fallout 76" },

  { file: "FOTV_Amazon_Profile_Picture_Power_Armor.png", caption: "ドラマ版 パワーアーマー", cat: "Television Series" },
  { file: "FOTV_Brotherhood_lineup.jpg", caption: "B.O.S. 隊列", cat: "Television Series" },
  { file: "FOTV_S1_Amazon_promo_14.jpg", caption: "ドラマ版 プロモ 14", cat: "Television Series" },
  { file: "FOTV_S1_Amazon_promo_15.jpg", caption: "ドラマ版 プロモ 15", cat: "Television Series" },
  { file: "FOTV_S1_Amazon_promo_18.jpg", caption: "ドラマ版 プロモ 18", cat: "Television Series" },
  { file: "FoTV_Brotherhood_group.jpg", caption: "志願兵の集合", cat: "Television Series" },
  { file: "FOTV_Brotherhood_Stole_and_Censer.png", caption: "聖職者の法衣と香炉", cat: "Television Series" },
  { file: "FOTV_Season_2_Maximus_Character_Poster_2.jpg", caption: "マキシマス (シーズン2ポスター)", cat: "Television Series" },
  { file: "The_Target_credits_Brotherhood_poster.png", caption: "エンディング クレジット ポスター", cat: "Television Series" },
  { file: "FOTV_S01E01_Quintus_01.jpg", caption: "エルダー・クィンタス", cat: "Television Series" },
  { file: "FOTV_Official_Trailer_Still_055.png", caption: "トレイラー 静止画 55", cat: "Television Series" },
  { file: "FOTV_Official_Trailer_Still_085.png", caption: "トレイラー 静止画 85", cat: "Television Series" },
  { file: "Fallout_Season_1_Amazon_Maximus_bg.jpg", caption: "マキシマス 背景ビジュアル", cat: "Television Series" },
  { file: "FOTV_Altar_Brotherhood_of_Steel.png", caption: "B.O.S.の祭壇", cat: "Television Series" },
  { file: "FOTV_Branding_by_the_Brotherhood.png", caption: "B.O.S.の焼印", cat: "Television Series" },
  { file: "Shady_Sands_Knight_and_Maximus.png", caption: "シェイディ・サンズの騎士と子供", cat: "Television Series" },
  { file: "BoS_Recruitment_Poster_from_FOTV_Merch.jpg", caption: "公式徴兵ポスター", cat: "Television Series" },
  { file: "FOTV_Prydwen_Landing.png", caption: "カサウンディンの飛来", cat: "Television Series" },
  { file: "FOTV_Official_Trailer_Still_059.png", caption: "トレイラー 静止画 59", cat: "Television Series" },
  { file: "FOTV_BoS_Base_Classroom.png", caption: "B.O.S.基地の教室", cat: "Television Series" },

  { file: "Bosdecal.png", caption: "ロゴ デカール (D)", cat: "Assets & Others" },
  { file: "Bosdecal_n.png", caption: "ロゴ デカール (N)", cat: "Assets & Others" },
  { file: "DecalSheet_d.png", caption: "デカールシート", cat: "Assets & Others" },
  { file: "BoS_FO4_CC_Minigun_Decal_recreation.png", caption: "CC ミニガン デカール", cat: "Assets & Others" },
  { file: "BoS_CC_Wingspan_Decal-3.png", caption: "CC ウィングスパン デカール", cat: "Assets & Others" },
  { file: "BoS_CC_Wings_and_Chevrons_Decal.png", caption: "CC ウィング&シェブロン", cat: "Assets & Others" },
  { file: "BoS_CC_Combat_Wing_Decal.png", caption: "CC コンバットウィング", cat: "Assets & Others" },
  { file: "F76_BOS_Scout_Tower_Banner_1.png", caption: "スカウトタワー バナー 1", cat: "Assets & Others" },
  { file: "F76_BOS_Scout_Tower_Banner_2.png", caption: "スカウトタワー バナー 2", cat: "Assets & Others" },
  { file: "F76_BOS_Scout_Tower_Banner_3.png", caption: "スカウトタワー バナー 3", cat: "Assets & Others" },
  { file: "HVB_workshop.jpg", caption: "ヒドゥンバレー ワークショップ", cat: "Assets & Others" },
  { file: "FI_research_room.jpg", caption: "要塞 研究室", cat: "Assets & Others" },
  { file: "HVB_class_room.jpg", caption: "ヒドゥンバレー 教室", cat: "Assets & Others" },
  { file: "FOT_Intro_War_10.jpg", caption: "Fallout Tactics イントロ", cat: "Assets & Others" },
  { file: "Two_knights_with_assault_rifles.png", caption: "アサルトライフルを持つ騎士", cat: "Assets & Others" },
  { file: "FO_Vertibird_on_ground_vs_Gunners.jpg", caption: "ガンナーと交戦するベルチバード", cat: "Assets & Others" },
  { file: "FO76_Brotherhood_Recruiter.webp", caption: "B.O.S. リクルーター", cat: "Assets & Others" }
];

let html = `<div class="gallery-section">
                <h2>ギャラリー</h2>
                <p>ブラザーフッド・オブ・スティールの各支部や歴史に関わる画像資料群です。全114枚のアーカイブから作品・カテゴリ別に整理されています。</p>`;

const categories = [...new Set(images.map(img => img.cat))];

categories.forEach(cat => {
  const catImages = images.filter(img => img.cat === cat);
  html += `
                <h3 style="margin-top: 30px; border-left: 5px solid var(--accent-color); padding-left: 10px;">${cat}</h3>
                <div class="gallery-grid">`;
  catImages.forEach(img => {
    html += `
                    <div class="gallery-item">
                        <img src="images/note_extracted/brotherhood-base/${img.file}" alt="${img.caption}" loading="lazy" onerror="this.onerror=null; this.src='images/placeholder.jpg';">
                        <div class="caption">${img.caption}</div>
                    </div>`;
  });
  html += `
                </div>`;
});

html += `
            </div>`;

console.log(html);
