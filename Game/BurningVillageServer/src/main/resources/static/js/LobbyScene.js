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
	
	
	ready_1_text = null;
	ready_2_text = null;
	
	errorText = null;
	
	dragon_1_img = null;
	dragon_2_img = null;
	
	
	preload()
	{
		this.load.image('lobby_background','./assets/lobby_background.png');
	}
	
	create()
	{
		//reset info:
		this.username_text_array = [];
		
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
		this.ready_1_text = this.add.text(config.width/4 * 1, 40 * 3, ready_text.waiting, styleText_PixelSansSerif_30).setOrigin(0.5).setScale(0.5);
		this.ready_2_text = this.add.text(config.width/4 * 3, 40 * 3, ready_text.waiting, styleText_PixelSansSerif_30).setOrigin(0.5).setScale(0.5);
		
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
		});
		this.button_create_lobby.setCanBePressed(true);
		
		this.button_back = new Button(this, config.width - config.width/4 + 50, buttons_height, "Volver");
		this.button_back.setButtonFunction(function(){
			console.log("Returning from the lobby menu.");
			
			//leave the lobby
			connection.leaveLobby();
			
			//close connection with the server when leaving the lobby. The server handles the rest (removing player from lobby, removing lobby if it is left empty, etc...)
			connection.disconnect();
			
			//go back to the play menu
			game.scene.stop("LobbyScene");
			game.scene.start("PlayMenu");
		});
		this.button_back.setCanBePressed(true);
		
		
		
		
		//Establish connection with the server and start match making.
		//All of this is done after the entire UI has been drawn so that any error that happens during this process will be handled accordingly without breaking the UI.
		connection.connect(
			function(){ //open
				connection.matchMaking();
			},
			function(){ //close
				
			},
			function(m){ //msg
				
				//reset all names to blank
				for(let i = 0; i < 2; ++i){
					that.username_text_array[i].setText(username_unconnected);
				}
				
				//update the names
				if(m.players){
					for(let i = 0; i < m.players.length; ++i){
						let current_id = m.players[i].playerId;
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
				}
			},
			function(e){ //error
				that.errorText.setText("No se ha podido establecer conexión con el servidor.");
				that.errorText.visible = true;
			}
		);
		
		
	}
};