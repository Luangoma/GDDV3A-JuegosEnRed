const LANGUAGE = Object.freeze({
	SPANISH: 0,
	ENGLISH: 1,
	HUNGARIAN: 2,
	FRENCH: 3,
	GERMAN: 4,
	LANGUAGE_COUNT: 5
});

const LANGUAGE_DATA = {
	SPANISH: {
		key_language_name: "Español",
		key_tutorial: "Tutorial",
		key_play: "Jugar",
		key_settings: "Ajustes",
		key_account: "Cuenta",
		key_social: "Social",
		key_credits: "Créditos",
		key_return: "Volver",
		key_choose_language: "Seleccionar Idioma",
		key_volume_effects: "Volumen de efectos",
		key_volume_menu: "Volumen de menú",
		key_volume_music: "Volumen de música",
		key_forum: "Foro",
		key_users: "Usuarios",
		key_create_account: "Crear Cuenta",
		key_access_account: "Acceder a Cuenta",
		key_create_account_title: "Crear una Cuenta",
		key_access_account_title: "Acceder a una Cuenta",
		key_match_local: "Partida Local",
		key_match_online: "Partida Online",
		key_lobby_list: "Lista de Salas",
		key_users_list: "Lista de Usuarios",
		key_users_total: "Usuarios Totales",
		key_users_connected: "Usuarios Conectados",
		key_create: "Crear",
		key_refresh: "Refrescar",
		key_player: "Jugador",
		key_players: "Jugadores",
		key_lobby: "Sala",
		key_dragon_red: "Dragón Rojo",
		key_dragon_blue: "Dragón Azul",
		key_ready: "Listo",
		key_unready: "No Listo",
		key_waiting: "Esperando...",
		key_game_over: "Fin de la Partida",
		key_results: "Resultados",
		key_burnt_houses: "Casas quemadas",
		key_total: "Total",
		key_continue: "Continuar",
		key_you: "Tú",
		key_anonymous: "Anónimo",
		key_anonymous_username: "< Usuario Anónimo >",
		key_join: "Unirse",
		key_loading: "Cargando",
		key_resume: "Reanudar",
		key_quit: "Salir"
	},
	ENGLISH: {
		key_language_name           :              "English"                        ,
		key_tutorial                :              "Tutorial"                       ,
		key_play                    :              "Play"                           ,
		key_settings                :              "Settings"                       ,
		key_account                 :              "Account"                        ,
		key_social                  :              "Social"                         ,
		key_credits                 :              "Credits"                        ,
		key_return                  :              "Return"                         ,
		key_choose_language         :              "Choose language"                ,
		key_volume_effects          :              "Effects volume"                 ,
		key_volume_menu             :              "Menu volume"                    ,
		key_volume_music            :              "Music volume"                   ,
		key_forum                   :              "Forum"                          ,
		key_users                   :              "Users"                          ,
		key_create_account          :              "Create Account"                 ,
		key_access_account          :              "Log into Account"               ,
		key_create_account_title    :              "Create an Account"              ,
		key_access_account_title    :              "Log into an Account"            ,
		key_match_local             :              "Local Match"                    ,
		key_match_online            :              "Online Match"                   ,
		key_lobby_list              :              "Lobbies"                        ,
		key_users_list              :              "List of Users"                  ,
		key_users_total             :              "Total Users"                    ,
		key_users_connected         :              "Connected Users"                ,
		key_create                  :              "Create"                         ,
		key_refresh                 :              "Refresh"                        ,
		key_player                  :              "Player"                         ,
		key_players                 :              "Players"                        ,
		key_lobby                   :              "Lobby"                          ,
		key_dragon_red              :              "Red Dragon"                     ,
		key_dragon_blue             :              "Blue Dragon"                    ,
		key_ready                   :              "Ready"                          ,
		key_unready                 :              "Unready"                        ,
		key_waiting                 :              "Waiting..."                     ,
		key_game_over               :              "Game Over"                      ,
		key_results                 :              "Results"                        ,
		key_burnt_houses            :              "Burnt houses"                   ,
		key_total                   :              "Total"                          ,
		key_continue                :              "Continue"                       ,
		key_you                     :              "You"                            ,
		key_anonymous               :              "Anonymous"                      ,
		key_anonymous_username      :              "< Anonymous User >"             ,
		key_join                    :              "Join"                           ,
		key_loading                 :              "Loading"                        ,
		key_resume                  :              "Resume"                         ,
		key_quit                    :              "Quit"                           ,
	},
	HUNGARIAN: {
		key_language_name: "Magyar",
		key_tutorial: "Oktatóanyag",
		key_play: "Játék",
		key_settings: "Beállítások",
		key_account: "Fiók",
		key_social: "Közösségi",
		key_credits: "jóváírások",
		key_return: "Visszatérés",
		key_choose_language: "Nyelv kiválasztása",
		key_volume_effects: "Effektek hangereje",
		key_volume_menu: "Menü hangereje",
		key_volume_music: "Zene hangereje",
		key_forum: "Fórum",
		key_users: "Felhasználók",
		key_create_account: "Fiók létrehozása",
		key_access_account: "Jelentkezzen be a fiókba",
		key_create_account_title: "Fiók létrehozása",
		key_access_account_title: "Jelentkezzen be egy fiókba",
		key_match_local: "Helyi egyezés",
		key_match_online: "Online mérkőzés",
		key_lobby_list: "Lobbik Listája",
		key_users_list: "Felhasználók listája",
		key_users_total: "Összes felhasználó",
		key_users_connected: "Csatlakozó felhasználók",
		key_create: "Létrehozás",
		key_refresh: "Frissítés",
		key_player: "Játékos",
		key_players: "Játékosok",
		key_lobby: "Lobbi",
		key_dragon_red: "Vörös sárkány",
		key_dragon_blue: "Kék sárkány",
		key_ready: "Kész",
		key_unready: "Nem kész",
		key_waiting: "Várakozás...",
		key_game_over: "A játék vége",
		key_results: "Eredmények",
		key_burnt_houses: "Leégett házak",
		key_total: "Összesen",
		key_continue: "Folytatás",
		key_you: "Te",
		key_anonymous: "Névtelen",
		key_anonymous_username: "< Névtelen Felhasználó >",
		key_join: "Csatlakozás",
		key_loading: "Betöltés",
		key_resume: "Önéletrajz",
		key_quit: "Kilépés"
	},
	FRENCH: {
		key_language_name           :              "Français"                      ,
		key_tutorial                :              "Didacticiel"                   ,
		key_play                    :              "Jouer"                         ,
		key_settings                :              "Paramètres"                    ,
		key_account                 :              "Compte"                        ,
		key_social                  :              "Sociale"                       ,
		key_credits                 :              "Crédits"                       ,
		key_return                  :              "Retour"                        ,
		key_choose_language         :              "Choisissez la langue"          ,
		key_volume_effects          :              "Volume des effets"             ,
		key_volume_menu             :              "Volume des menus"              ,
		key_volume_music            :              "Volume de la musique"          ,
		key_forum                   :              "Forum"                         ,
		key_users                   :              "Utilisateurs"                  ,
		key_create_account          :              "Créer un compte"               ,
		key_access_account          :              "Connectez-vous au compte"      ,
		key_create_account_title    :              "Créer un compte"               ,
		key_access_account_title    :              "Connectez-vous à un compte"    ,
		key_match_local             :              "Correspondance locale"         ,
		key_match_online            :              "Match en ligne"                ,
		key_lobby_list              :              "Lobbies"                       ,
		key_users_list              :              "Liste des utilisateurs"        ,
		key_users_total             :              "Nombre total d'utilisateurs"   ,
		key_users_connected         :              "Utilisateurs connectés"        ,
		key_create                  :              "Créer"                         ,
		key_refresh                 :              "Rafraîchir"                    ,
		key_player                  :              "Joueur"                        ,
		key_players                 :              "Joueurs"                       ,
		key_lobby                   :              "Hall d'entrée"                 ,
		key_dragon_red              :              "Dragon Rouge"                  ,
		key_dragon_blue             :              "Dragon bleu"                   ,
		key_ready                   :              "Prêt"                          ,
		key_unready                 :              "Pas prêt"                      ,
		key_waiting                 :              "En attendant"                  ,
		key_game_over               :              "Jeu terminé"                   ,
		key_results                 :              "Résultats"                     ,
		key_burnt_houses            :              "Maisons incendiées"            ,
		key_total                   :              "Total"                         ,
		key_continue                :              "Continuer"                     ,
		key_you                     :              "Toi"                           ,
		key_anonymous               :              "Anonyme"                       ,
		key_anonymous_username      :              "< Utilisateur anonyme >"       ,
		key_join                    :              "Rejoindre"                     ,
		key_loading                 :              "Chargement"                    ,
		key_resume                  :              "Reprendre"                     ,
		key_quit                    :              "Quitter"                       ,
	},
	GERMAN: {
		key_language_name           :              "Deutsch"                                ,
		key_tutorial                :              "Lernprogramm"                           ,
		key_play                    :              "Spielen"                                ,
		key_settings                :              "Einstellungen"                          ,
		key_account                 :              "Konto"                                  ,
		key_social                  :              "Sozial"                                 ,
		key_credits                 :              "Credits"                                ,
		key_return                  :              "Zurückkehren"                           ,
		key_choose_language         :              "Sprache wählen"                         ,
		key_volume_effects          :              "Effektlautstärke"                       ,
		key_volume_menu             :              "Menülautstärke"                         ,
		key_volume_music            :              "Musiklautstärke"                        ,
		key_forum                   :              "Forum"                                  ,
		key_users                   :              "Benutzer"                               ,
		key_create_account          :              "Benutzerkonto erstellen"                ,
		key_access_account          :              "Beim Konto anmelden"                    ,
		key_create_account_title    :              "Ein Konto erstellen"                    ,
		key_access_account_title    :              "Bei einem Konto anmelden"               ,
		key_match_local             :              "Lokale Übereinstimmung"                 ,
		key_match_online            :              "Online-Match"                           ,
		key_lobby_list              :              "Lobbys"                                 ,
		key_users_list              :              "Liste der Benutzer"                     ,
		key_users_total             :              "Gesamtbenutzer"                         ,
		key_users_connected         :              "Verbundene Benutzer"                    ,
		key_create                  :              "Erstellen"                              ,
		key_refresh                 :              "Aktualisierung"                         ,
		key_player                  :              "Spieler"                                ,
		key_players                 :              "Spieler"                                ,
		key_lobby                   :              "Empfangshalle"                          ,
		key_dragon_red              :              "Roter Drache"                           ,
		key_dragon_blue             :              "Blauer Drache"                          ,
		key_ready                   :              "Bereit"                                 ,
		key_unready                 :              "Unbereit"                               ,
		key_waiting                 :              "Warten"                                 ,
		key_game_over               :              "Spiel vorbei"                           ,
		key_results                 :              "Ergebnisse"                             ,
		key_burnt_houses            :              "Verbrannte Häuser"                      ,
		key_total                   :              "Gesamt"                                 ,
		key_continue                :              "Weitermachen"                           ,
		key_you                     :              "Du"                                     ,
		key_anonymous               :              "Anonym"                                 ,
		key_anonymous_username      :              "< Anonymer Benutzer >"                  ,
		key_join                    :              "Verbinden"                              ,
		key_loading                 :              "Wird geladen"                           ,
		key_resume                  :              "Wieder aufnehmen"                       ,
		key_quit                    :              "Aufhören"                               ,
	}
};

function getLanguageWord(lang, key){
	switch(lang)
	{
		case LANGUAGE.SPANISH:
			return LANGUAGE_DATA.SPANISH[key];
			break;
		
		case LANGUAGE.ENGLISH:
			return LANGUAGE_DATA.ENGLISH[key];
			break;
		
		case LANGUAGE.HUNGARIAN:
			return LANGUAGE_DATA.HUNGARIAN[key];
			break;
		
		case LANGUAGE.FRENCH:
			return LANGUAGE_DATA.FRENCH[key];
			break;
		
		case LANGUAGE.GERMAN:
			return LANGUAGE_DATA.GERMAN[key];
			break;
		
		default:
			return "NO LANGUAGE";
			break;
	}
}

function lang(key){
	return getLanguageWord(gameConfig.language, key);
}
