class MP_WarningScene extends DragonScene
{
	background = {};
	warning_menu = {};
	
	preload()
	{
		this.load.image('menuBackgroundBlurry', 'assets/menu_background_blurry.jpg');
		preloadWarningMenuData(this);
	}
	
	create()
	{
		this.background = this.add.image(0,0,'menuBackgroundBlurry').setOrigin(0).setDisplaySize(config.width, config.height);
		
		let messages = [
			"¿Estás seguro de que quieres jugar sin iniciar sesión?",
			"Tu progreso no se guardará."
		];
		
		this.warning_menu = new WarningMenu(this, config.width / 2, config.height / 2, messages);
		this.warning_menu.setPreviousScene("MainMenu");
		this.warning_menu.setCurrentScene("MP_WarningScene");
		this.warning_menu.setTargetScene("PlayMenu");
	}
};