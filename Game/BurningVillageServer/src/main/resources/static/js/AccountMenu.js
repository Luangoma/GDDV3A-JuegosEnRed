class AccountMenu extends DragonScene
{
	button_createAccount = {};
	button_loginAccount = {};
	button_back = {};
	
	background = {};
	
	preload()
	{
		this.load.image('menuBackgroundBlurry', 'assets/menu_background_blurry.jpg');
	}
	
	create()
	{
		this.background = this.add.image(0,0,'menuBackgroundBlurry').setOrigin(0).setDisplaySize(config.width, config.height);
		
		this.button_createAccount = new Button(this, config.width/2, config.height/5 + 100 * 0, "Crear Cuenta", 'boton_vacio_largo');
		this.button_createAccount.setButtonFunction(function(){
			gameConfig.multiplayerType = MULTIPLAYER_TYPE.LOCAL;
			game.scene.stop('AccountMenu');
			game.scene.start("Registro");
		});
		this.button_createAccount.setCanBePressed(true);
		
		this.button_loginAccount = new Button(this, config.width/2, config.height/5 + 100 * 1, "Acceder a Cuenta", 'boton_vacio_largo');
		this.button_loginAccount.setButtonFunction(function(){
			gameConfig.multiplayerType = MULTIPLAYER_TYPE.ONLINE;
			game.scene.stop("AccountMenu");
			game.scene.start("Login");
		});
		this.button_loginAccount.setCanBePressed(true);
		
		this.button_back = new Button(this, config.width/2, config.height/5 + 100 * 2 , "Volver");
		this.button_back.setButtonFunction(function(){
			game.scene.stop("AccountMenu");
			game.scene.start("MainMenu");
		});
		this.button_back.setCanBePressed(true);
	}
}