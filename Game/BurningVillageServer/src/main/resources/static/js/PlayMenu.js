class PlayMenu extends DragonScene
{
	button_play_sp = {};
	button_play_mp_matchmaking = {};
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
		
		this.button_play_sp = new Button(this, config.width/2, config.height/5 + 100 * 0, "Partida Local", 'boton_vacio_largo');
		this.button_play_sp.setButtonFunction(function(){
			gameConfig.multiplayerType = MULTIPLAYER_TYPE.LOCAL;
			game.scene.stop('PlayMenu');
			game.scene.start("LoadMap1");
		});
		this.button_play_sp.setCanBePressed(true);
		
		this.button_play_mp_matchmaking = new Button(this, config.width/2, config.height/5 + 100 * 1, "Partida Online", 'boton_vacio_largo'); //Online Matchmaking
		this.button_play_mp_matchmaking.setButtonFunction(function(){
			gameConfig.multiplayerType = MULTIPLAYER_TYPE.ONLINE;
			game.scene.stop("PlayMenu");
			
			//configure the connection type to make use of matchmaking instead of direct lobby connection
			connection.event_on_open = function(){ //open function
				connection.matchMaking();
			};
			
			
			//load the lobby
			game.scene.start("LobbyScene");
		});
		this.button_play_mp_matchmaking.setCanBePressed(true);
		
		this.button_play_mp = new Button(this, config.width/2, config.height/5 + 100 * 2, "Lista de Salas", 'boton_vacio_largo'); //Online Serverbrowser. Old name was "Lista de Servidores" but it was misleading due to the fact that it actually displays lobbies ("rooms") instead of servers. We could actually implement a real server list some other time.
		this.button_play_mp.setButtonFunction(function(){
			gameConfig.multiplayerType = MULTIPLAYER_TYPE.ONLINE;
			game.scene.stop("PlayMenu");
			game.scene.start("OnlineMenu");
		});
		this.button_play_mp.setCanBePressed(true);
		
		this.button_back = new Button(this, config.width/2, config.height/5 + 100 * 3 , "Volver");
		this.button_back.setButtonFunction(function(){
			game.scene.stop("PlayMenu");
			game.scene.start("MainMenu");
		});
		this.button_back.setCanBePressed(true);
	}
}