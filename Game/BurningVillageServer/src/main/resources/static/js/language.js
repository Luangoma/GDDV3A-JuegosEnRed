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
		key_lobby_list: "Lista de Salas"
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
		key_lobby_list: "Lobbies"
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
