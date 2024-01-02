class game_over extends Phaser.Scene 
{
	player1 = null;
	player2 = null;
	
	player_1_data = null;
	player_2_data = null;
	
	botonContinuar = null;
	
	preload(){
	}
	
	reason = "game-finished";
	
	init(data)
	{
		if(data && data.reason)
		{
			this.reason = data.reason;
		}
		else
		{
			this.reason = "game-finished";
		}
	}
	
	create(){
		
		this.player1 = players[0];
		this.player2 = players[1];
		
		
		//get the player data (names and scores):
		this.player_1_data = this.getPlayerData(0);
		this.player_2_data = this.getPlayerData(1);
		
		
		//Good old JS hack
		let that = this;
		
		console.log("create");
		//game.scene.stop('ui');

		// BACKGROUND
		var background = this.add.sprite(0,0, 'town-on-fire').setOrigin(0,0).setDisplaySize(config.width,config.height);
		background.anims.play("animacionBackground");

		// TÍTULO
	
		var titulo = this.add.text(config.width/2, 80, lang("key_game_over"), styleText_AncientFont_90).setOrigin(0.5).setScale(1);
		
		// Text to display the reason for which the game was finished
		
		var game_over_reason_text = this.add.text(config.width/2, 555, " ", styleText_PixelSansSerif_30_red).setOrigin(0.5).setScale(0.4);
		
		switch(this.reason)
		{
			case "game-finished":
				game_over_reason_text.setText(" ");
				break;
			
			case "connection-lost":
				game_over_reason_text.setText(lang("key_connection_lost"));
				break;
			
			case "other-left":
				game_over_reason_text.setText(lang("key_other_left"));
				break;
			
			default:
				game_over_reason_text.setText(" ");
				break;
		}


		// PUNTUACIONES

		let separacionTextoGameOver = 30;
		let separacionJugadores = 70;
		let xResultados = 200;
		let yResultados = 150;

		var tituloResultados = this.add.text(config.width/2, yResultados + 10, lang("key_results"), styleText_AncientFont_90).setOrigin(0.5).setScale(0.7);
		
		var tituloJugador1 = this.add.text(xResultados, yResultados + separacionJugadores, this.player_1_data.name, styleText_PixelSansSerif_30).setOrigin(0).setScale(0.7);

		var casasQuemadasJugador1 = this.add.text(xResultados, yResultados + separacionJugadores*1 + separacionTextoGameOver*1, lang("key_burnt_houses") + ' : ' + this.player_1_data.score + " (+" + this.calcularPuntosCasasQuemadas(this.player_1_data.score) + ")", styleText_PixelSansSerif_18).setOrigin(0);

		var totalPuntosJugador1 = this.add.text(xResultados, yResultados + separacionJugadores*1 + separacionTextoGameOver*2, lang("key_total") + " : " + this.calcularPuntosCasasQuemadas(this.player_1_data.score), styleText_PixelSansSerif_18).setOrigin(0);
		
		var tituloJugador2 = this.add.text(xResultados, yResultados + separacionJugadores*2 + separacionTextoGameOver*2, this.player_2_data.name, styleText_PixelSansSerif_30).setOrigin(0).setScale(0.7);

		var casasQuemadasJugador2 = this.add.text(xResultados, yResultados + separacionJugadores*2 + separacionTextoGameOver*3, lang("key_burnt_houses") + ' : ' + this.player_2_data.score + " (+" + this.calcularPuntosCasasQuemadas(this.player_2_data.score) + ")", styleText_PixelSansSerif_18).setOrigin(0);

		var totalPuntosJugador2 = this.add.text(xResultados, yResultados + separacionJugadores*2 + separacionTextoGameOver*4, lang("key_total") + " : " + this.calcularPuntosCasasQuemadas(this.player_2_data.score), styleText_PixelSansSerif_18).setOrigin(0);
		
		
		// BOTÓN CONTINUAR: Botón para volver al menu principal.
        this.botonContinuar = new Button(this, config.width/2, 500, lang("key_continue"));
		this.botonContinuar.setButtonFunction(function(){
			//simple debug print.
			console.log("Botón continuar pulsado");
			
			//stop the game sound before coming back to the main menu.
			stopSound(that);
			
			//Return to the Main Menu.
			game.scene.stop('game_over');
			game.scene.start("MainMenu");
		});
		this.botonContinuar.setCanBePressed(true);
	}
	
	getPlayerData(idx)
	{
		let ans = {name: lang("key_player") + " ", score: 0};
		
		if(!players[idx])
		{
			ans.name = "ERROR";
			ans.score = -1;
		}
		else
		if(gameConfig.multiplayerType == MULTIPLAYER_TYPE.ONLINE)
		{
			//online mode:
			
			/*
			//if the requested player does not exist, then return empty data to prevent a crash
			if(idx < 0 || idx >= connection.lobbyInfo.players.length)
			{
				ans.name = lang("key_unconnected"); //report unconnected user as the username, because the player left the game so they are now gone. Basically kinda like l4d2 but more explicit.
				ans.score = 0;
			}
			else
			{
				ans.name += connection.lobbyInfo.players[idx].userId === -1 ? lang("key_anonymous_username") : connection.lobbyInfo.players[idx].name;
				ans.score = connection.lobbyInfo.players[idx].score;
				if(connection.lobbyInfo.players[idx].playerId == connection.lobbyInfo.playerId)
				{
					ans.name += " (" + lang("key_you") + ")";
				}
			}
			*/
			ans.name += players[idx].userId === -1 ? lang("key_anonymous_username") : players[idx].name;
			ans.score = players[idx].points;
			if(players[idx].playerId == connection.lobbyInfo.playerId)
			{
				ans.name += " (" + lang("key_you") + ")";
			}
			
			//if(!connection.lobbyInfo.players[idx]) {//add a text that says disconnected or something... maybe? it's just eyecandy...}
		}
		else
		{
			//local multiplayer mode:
			ans.name += ("" + (idx + 1)); //stringified version of the index plus 1 ("player 1", "player 2", etc...)
			ans.score = players[idx].points;
		}
		return ans;
	}
	
	getPlayerName(idx)
	{
		return getPlayerData(idx).name;
	}
	
	getPlayerScore(idx)
	{
		return getPlayerData(idx).score;
	}

	update(time, delta){

	}

	shutdown()
	{
		console.log("shutdown");
		super.shutdown();
	}

	destroy()
	{
		console.log("destroy");
		super.destroy();
	}

	calcularPuntosCasasQuemadas(casasQuemadas)
	{
		let puntos = casasQuemadas * 5;
		console.log(puntos);
		return puntos;

	}

};

function preloadGameOverData(scene)
{
	scene.load.spritesheet('town-on-fire', 'assets/town_on_fire_reduced.png', { frameWidth: 1200, frameHeight: 730 });
}

function createGameOverData(scene)
{
	scene.anims.create({
		key: 'animacionBackground',
		frames: scene.anims.generateFrameNumbers('town-on-fire', { start: 0, end: 2 }),
		frameRate: 7,
		repeat: -1
	});
}