class PauseMenu extends DragonScene
{
	background = null;
	
	resumeButton = null;
	quitButton = null;
	
	preload()
	{
		//for now, preload stuff here
		preloadPauseMenuData(this);
	}
	
	create()
	{
		//JS hack
		let that = this;
		
		//display the background of the pause menu
		this.background = this.add.image(0,0,'PauseMenuBackground2').setOrigin(0).setDisplaySize(config.width, config.height);
		
		//button to open settings menu
		this.resumeButton = new Button(this, config.width/2, config.height/5 * 1 + 50, lang("key_resume"), "boton_vacio_largo");
		this.resumeButton.setButtonFunction(function(){
			game.scene.stop("PauseMenu");
		});
		this.resumeButton.setCanBePressed(true);
		
		//button to close the menu and resume the game
		this.resumeButton = new Button(this, config.width/2, config.height/5 * 2 + 50, lang("key_settings"), "boton_vacio_largo");
		this.resumeButton.setButtonFunction(function(){
			game.scene.stop("PauseMenu");
			that.scene.launch("SettingsMenu", {fromGame: true});
		});
		this.resumeButton.setCanBePressed(true);
		
		//button to finish the game and return to main menu
		this.quitButton = new Button(this, config.width/2, config.height/5 * 3 + 50, lang("key_quit"), "boton_vacio_largo");
		this.quitButton.setButtonFunction(function(){
			game.scene.stop("PauseMenu");
			game.scene.stop("GameMap");
			game.scene.stop("ui");
			stopSound(that);
			game.scene.start("MainMenu");
		});
		this.quitButton.setCanBePressed(true);
		
	}
	
};

function preloadPauseMenuData(scene){
	scene.load.image('PauseMenuBackground', './assets/PauseMenuBackground.png');
	scene.load.image('PauseMenuBackground2', './assets/PauseMenuBackground2.png');
}