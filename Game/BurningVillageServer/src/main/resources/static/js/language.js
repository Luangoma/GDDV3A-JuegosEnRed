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
		key_volume_music: "Volumen de música"
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
		key_volume_music: "Music volume"
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
