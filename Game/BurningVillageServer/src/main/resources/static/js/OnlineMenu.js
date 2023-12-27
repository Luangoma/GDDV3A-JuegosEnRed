//The name of this class maybe isn't the best to reflect what it exactly does. This is the class responsible for displaying the serverbrowser, aka, display the lobbies from the server.
class OnlineMenu extends DragonScene
{
	button_create_lobby = {};
	button_refresh = {};
	button_back = {};
	
	background = {};
	
	lobbies = [];
	
	preload()
	{
		this.load.image('menuBackgroundBlurry', 'assets/menu_background_blurry.jpg');
	}
	
	create()
	{
		this.background = this.add.image(0,0,'menuBackgroundBlurry').setOrigin(0).setDisplaySize(config.width, config.height);
		
		this.startConnection();
		
		this.button_create_lobby = new Button(this, config.width/4 - 50, config.height - 50, "Crear");
		this.button_create_lobby.setButtonFunction(function(){
			game.scene.stop("PlayMenu");
			game.scene.start("OnlineMenu");
		});
		this.button_create_lobby.setCanBePressed(true);
		
		this.button_match_making = new Button(this, config.width/2, config.height - 50, "Refrescar");
		this.button_match_making.setButtonFunction(function(){
			game.scene.stop("PlayMenu");
			game.scene.start("OnlineMenu");
		});
		this.button_match_making.setCanBePressed(true);
		
		this.button_back = new Button(this, config.width - config.width/4 + 50, config.height - 50, "Volver");
		this.button_back.setButtonFunction(function(){
			game.scene.stop("OnlineMenu");
			game.scene.start("PlayMenu");
		});
		this.button_back.setCanBePressed(true);
	}
	
	getLobbiesList()
	{
		
	}
	
	startConnection()
	{
		/*
		localUser.connection = new WebSocket(ip.ws + "/multiplayer");
		localUser.connection.onopen = function(){
			this.getLobbiesList();
		};
		localUser.connection.onclose = function(){
			this.lobbies = [];
		};
		*/
	}
}