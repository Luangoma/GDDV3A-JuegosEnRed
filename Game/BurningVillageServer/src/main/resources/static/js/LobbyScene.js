class LobbyScene extends DragonScene
{
	
	background = {};
	
	button_back = {};
	button_ready = {};
	
	player_1_text = null;
	player_2_text = null;
	
	//username_1_text = null;
	//username_2_text = null;
	username_text_array = [];
	
	
	//ready_1_text = null;
	//ready_2_text = null;
	ready_text_array = [];
	
	errorText = null;
	
	dragon_1_img = null;
	dragon_2_img = null;
	
	dragon_1_clothes_img = null;
	dragon_2_clothes_img = null;
	
	localReady = false;
	
	lobby_interval = null;
	
	preload()
	{
		this.load.image('lobby_background','./assets/lobby_background.png');
	}
	
	create()
	{
		//reset info:
		this.username_text_array = [];
		this.localReady = false;
		
		//Good old JS hack
		let that = this;
		
		//placeholder name for an unconnected user:
		let username_unconnected = "----------"
		
		//text for ready status:
		let ready_text = {
			not_ready: lang("key_unready"),
			waiting: lang("key_waiting"),
			ready: lang("key_ready")
		};
		
		//generate the lobby background image
		this.background = this.add.image(0,0,'lobby_background').setOrigin(0).setDisplaySize(config.width, config.height);
		
		
		//text for the players:
		this.player_1_text = this.add.text(config.width/4 * 1, 40 * 1, lang("key_player") + " 1 (" + lang("key_dragon_red") + ")", styleText_PixelSansSerif_30).setOrigin(0.5).setScale(0.5);
		this.player_2_text = this.add.text(config.width/4 * 3, 40 * 1, lang("key_player") + " 2 (" + lang("key_dragon_blue") + ")", styleText_PixelSansSerif_30).setOrigin(0.5).setScale(0.5);
		
		//text for the usernames:
		this.username_text_array[0] = this.add.text(config.width/4 * 1, 40 * 2, username_unconnected, styleText_PixelSansSerif_30).setOrigin(0.5).setScale(0.5);
		this.username_text_array[1] = this.add.text(config.width/4 * 3, 40 * 2, username_unconnected, styleText_PixelSansSerif_30).setOrigin(0.5).setScale(0.5);
		
		//text for the ready status:
		this.ready_text_array[0] = this.add.text(config.width/4 * 1, 40 * 3, ready_text.waiting, styleText_PixelSansSerif_30).setOrigin(0.5).setScale(0.5);
		this.ready_text_array[1] = this.add.text(config.width/4 * 3, 40 * 3, ready_text.waiting, styleText_PixelSansSerif_30).setOrigin(0.5).setScale(0.5);
		
		//text for errors:
		this.errorText = this.add.text(config.width/2, config.height/2 + 210, 'DEFAULT TEXT', styleText_Generic_Text).setOrigin(.5,.5).setScale(1);
		this.errorText.visible = false;
		
		//image for the players:
		this.dragon_1_img = this.add.sprite(config.width/4 * 1, config.height/2, 'dragon_red').setOrigin(.5).setScale(2);
		this.dragon_2_img = this.add.sprite(config.width/4 * 3, config.height/2, 'dragon_blue').setOrigin(.5).setScale(2);
		
		//image for the players' clothes:
		this.dragon_1_clothes_img = this.add.sprite(config.width/4 * 1, config.height/2, 'cosmetic_none').setOrigin(.5).setScale(2);
		this.dragon_2_clothes_img = this.add.sprite(config.width/4 * 3, config.height/2, 'cosmetic_none').setOrigin(.5).setScale(2);
		
		//buttons
		let buttons_height = config.height - 40;
		
		this.button_create_lobby = new Button(this, config.width/4 - 50, buttons_height, (!this.localReady) ? lang("key_ready") : lang("key_unready"));
		this.button_create_lobby.setButtonFunction(function(){
			console.log("Ready state changed.");
			
			that.localReady = !that.localReady;
			connection.sendLobbyData(that.localReady);
		});
		this.button_create_lobby.setCanBePressed(true);
		
		this.button_back = new Button(this, config.width - config.width/4 + 50, buttons_height, lang("key_return"));
		this.button_back.setButtonFunction(function(){
			console.log("Returning from the lobby menu.");
			
			//leave the lobby
			connection.leaveLobby();
			
			//close connection with the server when leaving the lobby. The server handles the rest (removing player from lobby, removing lobby if it is left empty, etc...)
			connection.disconnect();
			
			//clean up when disconnecting by setting the scene specific callbacks to null
			connection.removeCallbacks();
			
			//clear the interval
			clearInterval(that.lobby_interval);
			
			//go back to the play menu
			game.scene.stop("LobbyScene");
			game.scene.start("PlayMenu");
		});
		this.button_back.setCanBePressed(true);
		
		
		
		
		//WebSocket stuff:
		//NOTE: All of this is done after the entire UI has been drawn so that any error that happens during this process will be handled accordingly without breaking the UI.
		
		let old_on_open_callback = connection.event_on_open; //keep the old on open event, which was configured on the previous scene (matchaking or join to specific lobby, depends on the button that the user pressed)
		
		//Set scene specific callbacks for this client's conneciton:
		connection.setCallbacks(
			/*function(){ //open
				//NOTE: Cannot do it this way because sendLobbyData will overwrite the playerId and other data, because it sends whatever exists before resolving the matchmaking or whatever connection method is used... GG JS and the good old async nature of... fucking everything. This has led us to the gypsy af solution of using the lobby interval. Noice.
				old_on_open_callback();
				connection.sendLobbyData(false); //send the lobby data once to update the username and other information the first time the client connects to the lobby.
			},*/
			connection.event_on_open,
			function(){ //close
				
			},
			function(m){ //msg
				
				//reset all status values to the default value (blank names, waiting for connection, etc...)
				for(let i = 0; i < 2; ++i){
					that.username_text_array[i].setText(username_unconnected);
					that.ready_text_array[i].setText(ready_text.waiting);
				}
				
				//reset the cosmetics:
				that.dragon_1_clothes_img.setTexture("cosmetic_none");
				that.dragon_2_clothes_img.setTexture("cosmetic_none");
				
				
				//early return if the received message does not contain the information we're looking for, aka, a message with the wrong action type and contents was sent. This could be caused by an user playing from the console with connection.sendObject() or other errors.
				if(!m.players){
					return;
				}
				
				//update the names and other information...
				
				//start with 0 ready players
				let total_ready_players = 0;
				//iterate over all of the players in the received message and perform different operations with said data:
				for(let i = 0; i < m.players.length; ++i){
					//change the ready status of the players and change the amount of ready players
					let current_ready = m.players[i].isReady;
					that.ready_text_array[i].setText(current_ready ? ready_text.ready : ready_text.not_ready);
					if(current_ready){
						++total_ready_players;
					}
					
					//get the user id and then change the username text based on the userid and name variables (if the user id is -1, then use the anon uname, otherwise, use the name from the name variable)
					//if the user has connected for the first time, display connecting until the first update packet with the name is sent.
					let current_id = m.players[i].userId;
					that.username_text_array[i].setText(current_id !== -1 ? (m.players[i].name.length === 0 ? (lang("key_connecting") + "...") : m.players[i].name) : lang("key_anonymous_username"));
				}
				
				//update the cosmetics according to the playerdata:
				if(connection.lobbyInfo.players && connection.lobbyInfo.players[0]){
					that.dragon_1_clothes_img.setTexture(cosmetics.body[connection.lobbyInfo.players[0].cosmeticBodyId]);
				}
				if(connection.lobbyInfo.players && connection.lobbyInfo.players[1]){
					that.dragon_2_clothes_img.setTexture(cosmetics.body[connection.lobbyInfo.players[1].cosmeticBodyId]);
				}
				
				
				if(total_ready_players >= 2){ //hardcoded 2 should be changed in the future to the number of max players, which can be obtained from the received msg object
					//redundant multiplayer type variable change (already performed from the outisde, but it's here just in case the users play around with the console and break things)
					gameConfig.multiplayerType = MULTIPLAYER_TYPE.ONLINE;
					
					//clear the connection callbacks
					connection.removeCallbacks();
					
					//clear the interval
					clearInterval(that.lobby_interval);
					
					//start multiplayer match
					game.scene.stop("LobbyScene");
					game.scene.start("GameMapLoader");
				}
			},
			function(e){ //error
				that.errorText.setText(lang("key_could_not_connect"));
				that.errorText.visible = true;
			}
		);
		
		//Establish connection with the server and start match making.
		connection.connect();
		
		//periodically send information to the other clients: (update every 0.5 seconds)
		this.lobby_interval = setInterval(function(){
			if(connection.isConnected()){
				connection.sendLobbyData(that.localReady);
			}
		},1000 * 0.5);
		
		
	}
};