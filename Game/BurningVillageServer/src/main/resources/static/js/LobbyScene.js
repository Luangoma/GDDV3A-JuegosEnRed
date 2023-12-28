class LobbyScene extends DragonScene
{
	
	background = {};
	
	button_back = {};
	button_ready = {};
	
	player_1_text = null;
	player_2_text = null;
	
	preload()
	{
		this.load.image('lobby_background','./assets/lobby_background.png');
	}
	
	create()
	{
		//establish connection with the server and start match making
		connection.connect(function(){
			connection.matchMaking();
		});
		
		//generate the lobby background image
		this.background = this.add.image(0,0,'lobby_background').setOrigin(0).setDisplaySize(config.width, config.height);
		
		
		//text for the players:
		player_1_text = this.add.text(250, 170 + 30 * index, "Player 1", styleText_MedievalPixel_30).setOrigin(0,0);
		player_2_text = this.add.text(250, 170 + 30 * index, "Player 2", styleText_MedievalPixel_30).setOrigin(0,0);
		
		//buttons
		let buttons_height = config.height - 40;
		
		this.button_create_lobby = new Button(this, config.width/4 - 50, buttons_height, "Listo");
		this.button_create_lobby.setButtonFunction(function(){
			console.log("Ready state changed.");
		});
		this.button_create_lobby.setCanBePressed(true);
		
		this.button_back = new Button(this, config.width - config.width/4 + 50, buttons_height, "Volver");
		this.button_back.setButtonFunction(function(){
			console.log("Returning from the lobby menu.");
			
			//close connection with the server when leaving the lobby. The server handles the rest (removing player from lobby, removing lobby if it is left empty, etc...)
			connection.disconnect();
			
			//go back to the play menu
			game.scene.stop("LobbyScene");
			game.scene.start("PlayMenu");
		});
		this.button_back.setCanBePressed(true);
	}
};