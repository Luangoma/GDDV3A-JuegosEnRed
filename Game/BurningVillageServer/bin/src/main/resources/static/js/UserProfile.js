class UserProfile extends DragonScene
{
	button_delete_account = {};
	button_log_out = {};
	button_back = {};
	
	background = {};
	titulo = {};
	
	preload()
	{
		this.load.image('menuBackgroundBlurry', 'assets/menu_background_blurry.jpg');
	}
	
	create()
	{
		this.background = this.add.image(0,0,'menuBackgroundBlurry').setOrigin(0).setDisplaySize(config.width, config.height);
		
		this.titulo = this.add.text(config.width/2, 40, 'Cuenta: ' + localUser.user.username, styleText_AncientFont_90).setOrigin(.5,0).setScale(0.5);
		
		this.button_delete_account = new Button(this, config.width/2, config.height/5 + 100 * 2 , "Eliminar");
		this.button_delete_account.setButtonFunction(function(){
			game.scene.stop("UserProfile");
			game.scene.start("DeleteAccount");
		});
		this.button_delete_account.setCanBePressed(true);
		
		this.button_log_out = new Button(this, config.width/2, config.height/5 + 100 * 3 , "Salir");
		this.button_log_out.setButtonFunction(function(){
			localUser.logOut();
			game.scene.stop("UserProfile");
			game.scene.start("AccountMenu");
		});
		this.button_log_out.setCanBePressed(true);
		
		this.button_back = new Button(this, config.width/2, config.height/5 + 100 * 4 , "Volver");
		this.button_back.setButtonFunction(function(){
			game.scene.stop("UserProfile");
			game.scene.start("MainMenu");
		});
		this.button_back.setCanBePressed(true);
		
	}
}