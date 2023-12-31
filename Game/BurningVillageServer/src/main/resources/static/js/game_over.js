class game_over extends Phaser.Scene 
{
	player1 = null;
	player2 = null;
	
	botonContinuar = null;
	
	preload(){
	}

	create(){
		
		this.player1 = players[0];
		this.player2 = players[1];
		
		
		//Good old JS hack
		let that = this;
		
		console.log("create");
		//game.scene.stop('ui');

		// BACKGROUND
		var background = this.add.sprite(0,0, 'town-on-fire').setOrigin(0,0).setDisplaySize(config.width,config.height);
		background.anims.play("animacionBackground");

		// TÍTULO
	
		var titulo = this.add.text(config.width/2, 100, lang("key_game_over"), styleText_MedievalPixel_90).setOrigin(0.5);


		// PUNTUACIONES

		let separacionTextoGameOver = 30;
		let separacionJugadores = 70;
		let xResultados = 200;
		let yResultados = 150;

		var tituloResultados = this.add.text(xResultados, yResultados, lang("key_results"), styleText_MedievalPixel_30).setOrigin(0);

		var tituloJugador1 = this.add.text(xResultados, yResultados + separacionJugadores, lang("key_player") + ' 1:', styleText_MedievalPixel_30).setOrigin(0);

		var casasQuemadasJugador1 = this.add.text(xResultados, yResultados + separacionJugadores*1 + separacionTextoGameOver*1, lang("key_burnt_houses") + ' : ' + this.player1.points + " (+" + this.calcularPuntosCasasQuemadas(this.player1.points) + ")", styleText_PixelSansSerif_18).setOrigin(0);

		//var casasDestruidasJugador1 = this.add.text(xResultados, yResultados + separacionTextoGameOver * 3, 'Casas destruidas +' + this.calcularPuntosCasasQuemadas(this.player1.points), styleText_PixelSansSerif_18).setOrigin(0);

		var totalPuntosJugador1 = this.add.text(xResultados, yResultados + separacionJugadores*1 + separacionTextoGameOver*2, lang("key_total") + " : " + this.calcularPuntosCasasQuemadas(this.player1.points), styleText_PixelSansSerif_18).setOrigin(0);
	
		var tituloJugador2 = this.add.text(xResultados, yResultados + separacionJugadores*2 + separacionTextoGameOver*2, lang("key_player") + ' 2:', styleText_MedievalPixel_30).setOrigin(0);

		var casasQuemadasJugador2 = this.add.text(xResultados, yResultados + separacionJugadores*2 + separacionTextoGameOver*3, lang("key_burnt_houses") + ' : ' + this.player2.points + " (+" + this.calcularPuntosCasasQuemadas(this.player2.points) + ")", styleText_PixelSansSerif_18).setOrigin(0);

		var totalPuntosJugador2 = this.add.text(xResultados, yResultados + separacionJugadores*2 + separacionTextoGameOver*4, lang("key_total") + " : " + this.calcularPuntosCasasQuemadas(this.player2.points), styleText_PixelSansSerif_18).setOrigin(0);
		
		
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