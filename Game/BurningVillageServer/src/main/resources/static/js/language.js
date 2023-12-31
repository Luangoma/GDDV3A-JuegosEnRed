const LANGUAGE = Object.freeze({
	SPANISH: 0,
	ENGLISH: 1,
	LANGUAGE_COUNT: 2
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
		key_waiting: "Esperando..."
	},
	ENGLISH: {
		key_language_name: "English",
		key_tutorial: "Tutorial",
		key_play: "Play",
		key_settings: "Settings",
		key_account: "Account",
		key_social: "Social",
		key_credits: "Credits",
		key_return: "Return",
		key_choose_language: "Choose language",
		key_volume_effects: "Effects volume",
		key_volume_menu: "Menu volume",
		key_volume_music: "Music volume",
		key_forum: "Forum",
		key_users: "Users",
		key_create_account: "Create Account",
		key_access_account: "Log into Account",
		key_create_account_title: "Create an Account",
		key_access_account_title: "Log into an Account",
		key_match_local: "Local Match",
		key_match_online: "Online Match",
		key_lobby_list: "Lobbies",
		key_users_list: "List of Users",
		key_users_total: "Total Users",
		key_users_connected: "Connected Users",
		key_create: "Create",
		key_refresh: "Refresh",
		key_player: "Player",
		key_players: "Players",
		key_lobby: "Lobby",
		key_dragon_red: "Red Dragon",
		key_dragon_blue: "Blue Dragon",
		key_ready: "Ready",
		key_unready: "Unready",
		key_waiting: "Waiting..."
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
		
		default:
			return "NO LANGUAGE";
			break;
	}
}

function lang(key){
	return getLanguageWord(gameConfig.language, key);
}
