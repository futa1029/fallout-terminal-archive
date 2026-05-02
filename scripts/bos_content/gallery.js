/**
 * Gallery + 感想 + コピーライト セクション
 * 全画像を作品別に整理して配置
 */
const img = (f, a) => `<img src="images/note_extracted/brotherhood-base/${f}" alt="${a}" loading="lazy" onerror="this.onerror=null; this.src='images/placeholder.jpg';">`;
const gi = (f, c) => `<div class="gallery-item">${img(f, c)}<div class="caption">${c}</div></div>`;

const html = `
            <h2>ギャラリー (Gallery)</h2>

            <h3>Fallout</h3>
            <div class="gallery-grid">
                ${gi("Paladin.jpg","B.O.S. パラディン (T-51b)")}
                ${gi("Fo1_Losthills_Entrance.png","ロスト・ヒルズ 入口")}
                ${gi("Fallout_Lost_Hills_Level_1.png","ロスト・ヒルズ Level 1")}
                ${gi("Fo1_Brotherhood_Interior.jpg","ブラザーフッド本部 内部")}
                ${gi("Fo1_Lost_Hills_Townmap.png","ロスト・ヒルズ タウンマップ")}
                ${gi("BOS.gif","ブラザーフッドのエンブレム")}
                ${gi("Fo1_Brotherhood_Corridor.png","ブラザーフッド基地の廊下")}
                ${gi("FO01_NPC_Maxson_G.png","ジョン・マクソン将軍")}
                ${gi("BOS_Rhombus.png","パラディン・ロンバス")}
                ${gi("Fo1_Military_Base_Destroyed.png","破壊されたマリポサ軍事基地")}
                ${gi("Fo1_Hub_Downtown.png","ハブ中心部")}
                ${gi("Fo1_caravan_leader.png","キャラバンリーダー")}
                ${gi("Fallout_Lost_Hills_Level_3.png","ロスト・ヒルズ Level 3")}
            </div>

            <h3>Fallout 2</h3>
            <div class="gallery-grid">
                ${gi("FO2_Den_BoS.png","デンのブラザーフッド")}
                ${gi("Fo2_BOS_Outpost_NCR.png","NCRのブラザーフッド前哨基地")}
                ${gi("Brotherhood_OutpostFrancisco.png","サンフランシスコの前哨基地")}
                ${gi("Fo2_Matthew_v_Horrigan.png","マシュー vs フランク・ホリガン")}
                ${gi("Fo2_Jimmy.png","ジミー")}
            </div>

            <h3>Fallout 3</h3>
            <div class="gallery-grid">
                ${gi("Fallout_3_power_armor_concept_art.jpg","Fallout 3 パワーアーマー コンセプトアート")}
                ${gi("Elder_Lyons.jpg","エルダー・リヨンズ")}
                ${gi("CBailey7.jpg","ブラザーフッドの騎士")}
                ${gi("Citadel.jpg","シタデル")}
                ${gi("Following_In_His_Footsteps.jpg","シタデルへの道")}
                ${gi("Frag_mines1_Washington_Monument.jpg","ワシントン記念碑の防衛陣地")}
                ${gi("FO3_Screenshot_BoS_and_Washington_Monument.jpg","ブラザーフッドとワシントン記念碑")}
                ${gi("FO3BS_Water_caravan_in_the_Big_Town.png","ビッグ・タウンの水キャラバン")}
                ${gi("Ft_Bannister_BOS_aqua_pura_security_after_Broken_Steel.jpg","アクア・ピュラの護衛")}
                ${gi("Outcast_patrol_fighting_raiders.png","アウトキャスト vs レイダー")}
                ${gi("Outcast_Patrol_2.jpg","アウトキャスト・パトロール")}
                ${gi("Rockland_CT_exterior.jpg","ロックランド車両デポ")}
                ${gi("Adams_Air_Force_Base_map.jpg","アダムス空軍基地")}
                ${gi("Activated_Purifier02.jpg","起動した浄水器")}
                ${gi("Prime.jpg","リバティ・プライム")}
            </div>

            <h3>Fallout: New Vegas</h3>
            <div class="gallery-grid">
                ${gi("Fallout_New_Vegas_T-51b.jpg","T-51bパワーアーマー")}
                ${gi("Hidden_Valley_bunker.jpg","ヒドゥンバレー・バンカー")}
                ${gi("Elder_McNamara.jpg","エルダー・マクナマラ")}
                ${gi("FNV_brotherhoodlogo_nif.png","ブラザーフッドのロゴ")}
                ${gi("Bosdecal.png","BOSデカール")}
                ${gi("FNV_131120_188_trading_roadway_4.png","188交易所")}
                ${gi("Mojave_BOS_banner.png","モハビ支部のバナー")}
                ${gi("HVB_class_room.jpg","ヒドゥンバレーの教室")}
                ${gi("HVB_workshop.jpg","ヒドゥンバレーの工房")}
                ${gi("Clarke-in-jail.jpg","収監されたクラーク")}
            </div>

            <h3>Fallout 4</h3>
            <div class="gallery-grid">
                ${gi("Fo4_Elder_Maxson.png","エルダー・アーサー・マクソン")}
                ${gi("Fo4-drop-concept.jpg","降下作戦コンセプトアート")}
                ${gi("BostonAirport-FiringRange-Fallout4.jpg","ボストン空港の射撃場")}
                ${gi("The_Prydwen.png","プリドゥウェン")}
                ${gi("Prydwen-CommandDeck-Fallout4.jpg","プリドゥウェン 指揮甲板")}
                ${gi("Fo4_Prydwen_Concept_Art.png","プリドゥウェン コンセプトアート")}
                ${gi("Fo4-Bos-flag.png","ブラザーフッドの旗")}
                ${gi("Prydwen-StowageDepot-Fallout4.jpg","プリドゥウェン物資貯蔵庫")}
                ${gi("Brotherhood_soldiers_patrolling_Boston.png","ボストンをパトロール")}
                ${gi("Fo4_vertibird.jpg","ベルチバード")}
                ${gi("Brotherhood_trade_mission_Diamond_City.png","ダイアモンドシティ交易任務")}
                ${gi("FO4-Liberty-prime-kills-behemoth.png","リバティ・プライム vs ベヒモス")}
                ${gi("FO_Vertibird_on_ground_vs_Gunners.jpg","ベルチバード vs ガンナーズ")}
                ${gi("FI_research_room.jpg","研究室")}
                ${gi("FO4_Pryd_TV_14.png","プリドゥウェン艦内")}
                ${gi("Two_knights_with_assault_rifles.png","アサルトライフルを装備したナイト")}
                ${gi("DecalSheet_d.png","デカールシート")}
            </div>

            <h3>Fallout 76</h3>
            <div class="gallery-grid">
                ${gi("Steam_reward_Taggerdys_Thunder_group_photo.jpg","タガーディの雷鳴隊 集合写真")}
                ${gi("FO76_Twitter_Brotherhood_of_Steel.jpg","FO76ブラザーフッド公式ビジュアル")}
                ${gi("FO76_Forward_Station_Alpha.png","前線基地アルファ")}
                ${gi("FO76LR_Fortifying_ATLAS_Dorsey.jpg","アトラス砦の強化")}
                ${gi("FO76SR_The_Catalyst_Shin_victory.png","カタリスト：シンの勝利")}
                ${gi("BOS_weapons_cache.png","ブラザーフッドの武器キャッシュ")}
                ${gi("FO76LL_BoS_medallion.png","BOSメダリオン")}
                ${gi("FO76_steelreign_chronicsonictonic_02.jpg","Steel Reign イベント")}
                ${gi("FO76_steelreign_chronicsonictonic_01.jpg","ブラザーフッドの旗")}
                ${gi("FO76_steelreign_chronicsonictonic_08.jpg","ブラザーフッドの裁き")}
                ${gi("FO76_Brotherhood_vendor.png","ブラザーフッド・ベンダーボット")}
                ${gi("FO76_Brotherhood_Recruiter.webp","ブラザーフッド・リクルーター")}
                ${gi("FO76_BoS_GY_1.png","ブラザーフッド戦闘シーン")}
                ${gi("Fallout_76_super_mutants_are_attacking_fort_atlas_by_spartan22294.jpg","アトラス砦を攻撃するスーパーミュータント")}
                ${gi("FO76_BoS_TIE_fighter_1.png","ブラザーフッド重火器")}
                ${gi("FO76_Ultracite_power_armor.png","ウルトラサイト・パワーアーマー")}
                ${gi("FO76SD_supplyingdemands_chronicsonictonic_01.jpg","物資供給任務")}
                ${gi("FO76TM_Gladiators_of_Steel_end.jpg","スティールの剣闘士たち")}
                ${gi("FO76_Makeshift_Vault_Interior_Atrium.png","即席Vault内部")}
                ${gi("Watoga_Shopping_Plaza_Vendor_bot_Phoenix.jpg","ワトガ・ショッピングプラザ")}
                ${gi("F76_BOS_Scout_Tower_Banner_1.png","スカウトタワー バナー 1")}
                ${gi("F76_BOS_Scout_Tower_Banner_2.png","スカウトタワー バナー 2")}
                ${gi("F76_BOS_Scout_Tower_Banner_3.png","スカウトタワー バナー 3")}
            </div>

            <h3>Fallout TVシリーズ</h3>
            <div class="gallery-grid">
                ${gi("FOTV_Amazon_Profile_Picture_Power_Armor.png","TVシリーズ パワーアーマー")}
                ${gi("FOTV_Brotherhood_lineup.jpg","ブラザーフッドの整列")}
                ${gi("FOTV_S1_Amazon_promo_14.jpg","シーズン1 プロモーション 14")}
                ${gi("FOTV_S1_Amazon_promo_15.jpg","シーズン1 プロモーション 15")}
                ${gi("FOTV_S1_Amazon_promo_18.jpg","シーズン1 プロモーション 18")}
                ${gi("FoTV_Brotherhood_group.jpg","ブラザーフッドのグループ")}
                ${gi("FOTV_Brotherhood_Stole_and_Censer.png","ブラザーフッドの聖具")}
                ${gi("FOTV_Season_2_Maximus_Character_Poster_2.jpg","マキシマス キャラクターポスター")}
                ${gi("The_Target_credits_Brotherhood_poster.png","ブラザーフッドのポスター")}
                ${gi("FOTV_S01E01_Quintus_01.jpg","エルダー・クインタス")}
                ${gi("FOTV_Official_Trailer_Still_055.png","公式トレーラー 場面55")}
                ${gi("FOTV_Official_Trailer_Still_059.png","公式トレーラー 場面59")}
                ${gi("FOTV_Official_Trailer_Still_085.png","公式トレーラー 場面85")}
                ${gi("Fallout_Season_1_Amazon_Maximus_bg.jpg","マキシマス ビジュアル")}
                ${gi("FOTV_BoS_Base_Classroom.png","ブラザーフッド基地の教室")}
                ${gi("FOTV_Altar_Brotherhood_of_Steel.png","ブラザーフッドの祭壇")}
                ${gi("FOTV_Branding_by_the_Brotherhood.png","焼印の儀式")}
                ${gi("FoTV_Prydwen.webp","プリドゥウェン (TVシリーズ)")}
                ${gi("Shady_Sands_Knight_and_Maximus.png","シャディ・サンズのナイトとマキシマス")}
                ${gi("BoS_Recruitment_Poster_from_FOTV_Merch.jpg","リクルートポスター")}
            </div>

            <div class="quote-box">
                <b>感想</b><br><br>
                ブラザーフッド・オブ・スティールは、Falloutシリーズを通じて最も複雑で多面的な勢力です。技術の保護者として崇高な使命を掲げながらも、その実践においては独善、孤立主義、そして時に暴力的な教条主義に陥る——この矛盾こそが、彼らを単純な「善玉」や「悪役」に分類することを不可能にし、Falloutの世界観に深い奥行きを与えています。<br><br>

                リヨンズの人道主義、マクソンの軍国主義、マクナマラの孤立主義、エリヤの狂気——それぞれの指導者が体現する哲学の違いは、「テクノロジーとは何のためにあるのか」という根源的な問いに対する異なる回答です。<br><br>

                TVシリーズでの宗教的要素の強化は、ブラザーフッドの本質を鮮やかに照らし出しました。彼らは技術の管理者であると同時に、技術を崇拝する信者でもあるのです。マキシマスの物語を通じて、個人がこの巨大な組織の中でどのように自己を見出し、あるいは失うのかが描かれており、これまでのゲーム作品では見られなかった人間ドラマの深みを加えています。<br><br>

                Ad Victoriam（勝利に栄光あれ）。
            </div>

            <div style="margin-top: 30px; border-top: 1px dashed var(--accent-color); padding-top: 20px; font-size: 0.85em; color: #888;">
                <p name="copyright-default">This article was created by translating and editing <a href="https://fallout.fandom.com/wiki/Brotherhood_of_Steel" target="_blank" rel="noopener">Brotherhood of Steel</a> from <a href="https://fallout.fandom.com/" target="_blank" rel="noopener">Nukapedia: The Fallout Wiki</a>.<br>Licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">Creative Commons Attribution-Share Alike License (CC BY-SA 3.0)</a>.</p>
                <p style="margin-top: 15px;">コミュニティ維持のため、<a href="https://mohi3.fanbox.cc/" target="_blank" rel="noopener" style="color: var(--accent-color);">寄付を受け付けております</a>。</p>
            </div>

            <div class="comments-section">
                <h3 class="comments-title">// TERMINAL COMMENTS</h3>
                <div class="comment-form">
                    <textarea id="comment-input" class="comment-textarea" maxlength="100" placeholder="コメントを入力..." oninput="updateCharCount()"></textarea>
                    <input type="text" id="hp_field" name="website" style="display:none;position:absolute;left:-9999px" tabindex="-1" autocomplete="off" aria-hidden="true">
                    <div class="comment-form-footer">
                        <span class="char-count"><span id="char-count">0</span>/100</span>
                        <button class="comment-submit-btn" onclick="submitComment()">SUBMIT</button>
                    </div>
                    <div id="comment-msg" class="comment-msg"></div>
                </div>
                <div id="comments-list" class="comments-list">
                    <div class="comment-loading">コメントを読み込み中...</div>
                </div>
            </div>

            <div class="lightbox-overlay" id="lightbox" onclick="this.classList.remove('active');">
                <img id="lightbox-img" src="" alt="拡大画像">
            </div>
`;
module.exports = { html };
