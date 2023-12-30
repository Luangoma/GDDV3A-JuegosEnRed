var gameConfig = {
	multiplayerType : MULTIPLAYER_TYPE.LOCAL,
	screenSplitType : CAMERA_SPLIT_TYPE.VERTICAL,
	language: LANGUAGE.SPANISH,
	volumeSettings: {
		effectsVolume: 1,
		menuVolume: 1,
		musicVolume: 1
	},
	volumeFunctions: {
		setEffectsVolume: function(increment){
			gameConfig.volumeSettings.effectsVolume = clampValue(gameConfig.volumeSettings.effectsVolume + increment, 0, 1);
			return gameConfig.volumeSettings.effectsVolume;
		},
		setMenuVolume: function(increment){
			gameConfig.volumeSettings.menuVolume = clampValue(gameConfig.volumeSettings.menuVolume + increment, 0, 1);
			return gameConfig.volumeSettings.menuVolume;
		},
		setMusicVolume: function(increment){
			gameConfig.volumeSettings.musicVolume = clampValue(gameConfig.volumeSettings.musicVolume + increment, 0, 1);
			return gameConfig.volumeSettings.musicVolume;
		}
	}
};
