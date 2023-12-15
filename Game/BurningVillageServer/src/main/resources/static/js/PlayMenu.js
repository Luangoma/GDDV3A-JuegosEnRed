class PlayMenu extends DragonScene
{
	button_play_sp = {};
	button_play_mp = {};
	button_back = {};
	
	background = {};
	
	preload()
	{
		this.load.image('menuBackgroundBlurry', 'assets/menu_background_blurry.jpg');
	}
	
	create()
	{
		this.background = this.add.image(0,0,'menuBackgroundBlurry').setOrigin(0).setDisplaySize(config.width, config.height);
		
		this.button_play_sp = new Button(this, config.width/2, config.height/5 + 100 * 0, "Local");
		this.button_play_sp.setButtonFunction(function(){
			gameConfig.multiplayerType = MULTIPLAYER_TYPE.LOCAL;
			game.scene.stop('PlayMenu');
			game.scene.start("LoadMap1");
		});
		this.button_play_sp.setCanBePressed(true);
		
		this.button_play_mp = new Button(this, config.width/2, config.height/5 + 100 * 1, "Online");
		this.button_play_mp.setButtonFunction(function(){
			gameConfig.multiplayerType = MULTIPLAYER_TYPE.ONLINE;
			game.scene.stop("PlayMenu");
			game.scene.start("MainMenu");
		});
		this.button_play_mp.setCanBePressed(true);
		
		this.button_back = new Button(this, config.width/2, config.height/5 + 100 * 2 , "Volver");
		this.button_back.setButtonFunction(function(){
			game.scene.stop("PlayMenu");
			game.scene.start("MainMenu");
		});
		this.button_back.setCanBePressed(true);
	}
}