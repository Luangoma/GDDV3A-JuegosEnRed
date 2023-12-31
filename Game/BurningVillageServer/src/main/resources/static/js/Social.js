class SocialMenu extends DragonScene
{
	button_Forum = {};
	button_Users = {};
	button_back = {};
	
	background = {};
	
	preload()
	{
		this.load.image('menuBackgroundBlurry', 'assets/menu_background_blurry.jpg');
	}
	
	create()
	{
		this.background = this.add.image(0,0,'menuBackgroundBlurry').setOrigin(0).setDisplaySize(config.width, config.height);
		
		this.button_Forum = new Button(this, config.width/2, config.height/5 + 100 * 0, lang("key_forum"));
		this.button_Forum.setButtonFunction(function(){
			gameConfig.multiplayerType = MULTIPLAYER_TYPE.LOCAL;
			game.scene.stop('SocialMenu');
			game.scene.start("ForumScene");
		});
		this.button_Forum.setCanBePressed(true);
		
		this.button_Users = new Button(this, config.width/2, config.height/5 + 100 * 1, lang("key_users"));
		this.button_Users.setButtonFunction(function(){
			gameConfig.multiplayerType = MULTIPLAYER_TYPE.ONLINE;
			game.scene.stop("SocialMenu");
			game.scene.start("PlayerListScene");
		});
		this.button_Users.setCanBePressed(true);
		
		this.button_back = new Button(this, config.width/2, config.height/5 + 100 * 2 , lang("key_return"));
		this.button_back.setButtonFunction(function(){
			game.scene.stop("SocialMenu");
			game.scene.start("MainMenu");
		});
		this.button_back.setCanBePressed(true);
	}
}
