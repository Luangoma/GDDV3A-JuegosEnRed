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
	
	
	localReady = false;
	
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
			not_ready: "No Listo",
			waiting: "Esperando...",
			ready: "Listo"
		};
		
		//generate the lobby background image
		this.background = this.add.image(0,0,'lobby_background').setOrigin(0).setDisplaySize(config.width, config.height);
		
		
		//text for the players:
		this.player_1_text = this.add.text(config.width/4 * 1, 40 * 1, "Jugador 1 (Dragón Rojo)", styleText_PixelSansSerif_30).setOrigin(0.5).setScale(0.5);
		this.player_2_text = this.add.text(config.width/4 * 3, 40 * 1, "Jugador 2 (Dragón Azul)", styleText_PixelSansSerif_30).setOrigin(0.5).setScale(0.5);
		
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
		
		//buttons
		let buttons_height = config.height - 40;
		
		this.button_create_lobby = new Button(this, config.width/4 - 50, buttons_height, "Listo");
		this.button_create_lobby.setButtonFunction(function(){
			console.log("Ready state changed.");
			
			that.localReady = !that.localReady;
			connection.sendLobbyData(that.localReady);
		});
		this.button_create_lobby.setCanBePressed(true);
		
		this.button_back = new Button(this, config.width - config.width/4 + 50, buttons_height, "Volver");
		this.button_back.setButtonFunction(function(){
			console.log("Returning from the lobby menu.");
			
			//leave the lobby
			connection.leaveLobby();
			
			//close connection with the server when leaving the lobby. The server handles the rest (removing player from lobby, removing lobby if it is left empty, etc...)
			connection.disconnect();
			
			//clean up when disconnecting by setting the scene specific callbacks to null
			connection.removeCallbacks();
			
			//go back to the play menu
			game.scene.stop("LobbyScene");
			game.scene.start("PlayMenu");
		});
		this.button_back.setCanBePressed(true);
		
		
		
		
		//WebSocket stuff:
		//NOTE: All of this is done after the entire UI has been drawn so that any error that happens during this process will be handled accordingly without breaking the UI.
		
		//Set scene specific callbacks for this client's conneciton:
		connection.setCallbacks(
			connection.event_on_open, //keep the old on open event, which was configured on the previous scene (matchaking or join to specific lobby, depends on the button that the user pressed)
			function(){ //close
				
			},
			function(m){ //msg
				
				//reset all status values to the default value (blank names, waiting for connection, etc...)
				for(let i = 0; i < 2; ++i){
					that.username_text_array[i].setText(username_unconnected);
					that.ready_text_array[i].setText(ready_text.waiting);
				}
				
				//update the names
				//NOTE: The new packets include the user names, so this info is obtained with the lobby data updates, which means it could be optimized and no longer make use of AJAX requests. Just note that in the PlayMenu.js scene, the information that is sent is with the matchmaking function from the connection object, which means that the first time the player connects, their name is NOT sent to the server, which means that either you need to send a send-data packet right after match making OR you need to send the name with the match making packet. Figure this out later because it is not critical.
				if(m.players){
					for(let i = 0; i < m.players.length; ++i){
						let current_id = m.players[i].userId; //we use the user ID because we want to look up the name of the user to display it in the lobby. The player ID is for gameplay purposes and has nothing to do with the player's account.
						if(current_id !== -1){
							$.ajax({
								url: ip.http + "/users/" + current_id,
								method: 'GET',
								contentType: 'application/json',
								success: function(data){
									let current_username = data.username;
									that.username_text_array[i].setText(current_username);
								},
								error: function(xhr, status, error){
									that.username_text_array[i].setText("< Anonymous >");
								}
							});
						}
						else
						{
							//the user has id = -1 which means that they are anonymous. So there is no need to perform a GET petition, as we already know that it is going to fail.
							that.username_text_array[i].setText("< Anonymous >");
						}
					}
				}
				
				let total_ready_players = 0;
				
				for(let i = 0; i < m.players.length; ++i){
					let current_ready = m.players[i].isReady;
					that.ready_text_array[i].setText(current_ready ? ready_text.ready : ready_text.not_ready);
					
					if(current_ready){
						++total_ready_players;
					}
				}
				
				
				if(total_ready_players >= 2){ //hardcoded 2 should be changed in the future to the number of max players, which can be obtained from the received msg object
					//redundant multiplayer type variable change (already performed from the outisde, but it's here just in case the users play around with the console and break things)
					gameConfig.multiplayerType = MULTIPLAYER_TYPE.ONLINE;
					
					//start multiplayer match
					game.scene.stop("LobbyScene");
					game.scene.start("map_test_multiplayer");
				}
				
				
				
				
				
				//(OPTIONAL) TODO: Move the name reset loop after the petition so that it can reset the names of the remaining clients (2 - players.length clients in a loop...), which will prevent the already correct names from blinking.
				
			},
			function(e){ //error
				that.errorText.setText("No se ha podido establecer conexión con el servidor.");
				that.errorText.visible = true;
			}
		);
		
		//Establish connection with the server and start match making.
		connection.connect();
		
		
	}
};