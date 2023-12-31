class ui extends Phaser.Scene
{
	textoTemporizador = {};
	tiempoInicial = {};
	temporizadorPartida = {};

	barraIzquierdaAzul = {};
	barraMedioAzul = {};
	barraDerechaAzul = {};

	barraIzquierdaRoja = {};
	barraMedioRoja = {};
	barraDerechaRoja = {};

	textoPuntuacionAzul = {};
	textoPuntuacionRoja = {};
	puntuacionAzul = {};
	puntuacionRoja = {};

	init()
	{
		// Ancho cuando las barras de vida están al máximo.
		this.anchoTotal = 100;
	}

	preload()
	{
		// Imágenes de los gráficos de los dragones.
		this.load.svg('dragon1graphic', 'assets/dragon1graphic.svg');
		this.load.svg('dragon2graphic', 'assets/dragon2graphic.svg');

		// Imagen del gráfico del temporizador.
		this.load.svg('grafico_temporizador', 'assets/grafico_temporizador.svg');

		// Imágenes de la barra de vida del jugador azul.
		this.load.image('barraIzquierdaAzul', 'assets/barra_vida/barHorizontal_blue_left.png');
		this.load.image('barraMedioAzul', 'assets/barra_vida/barHorizontal_blue_mid.png');
		this.load.image('barraDerechaAzul', 'assets/barra_vida/barHorizontal_blue_right.png');

		// Imágenes de la barra de vida del jugador rojo.
		this.load.image('barraIzquierdaRoja', 'assets/barra_vida/barHorizontal_red_left.png');
		this.load.image('barraMedioRoja', 'assets/barra_vida/barHorizontal_red_mid.png');
		this.load.image('barraDerechaRoja', 'assets/barra_vida/barHorizontal_red_right.png');

		// Las imágenes de sombra son las mismas para ambas barras de vida.
		this.load.image('barraIzquierdaSombra', 'assets/barra_vida/barHorizontal_shadow_left.png');
		this.load.image('barraMedioSombra', 'assets/barra_vida/barHorizontal_shadow_mid.png');
		this.load.image('barraDerechaSombra', 'assets/barra_vida/barHorizontal_shadow_right.png');
		
		// imágenes de los bordes de la pantalla
		//this.load.image('border_camera_single', './assets/ui_border01.png'); // online
		this.load.image('border_camera_vertical', './assets/ui_border_vertical.png'); // local (split screen vertical)
		this.load.image('border_camera_horizontal', './assets/ui_border_horizontal.png'); // local (split screen horizontal)
	}

	create()
	{	
	
		//BORDES DE LA PANTALLA Y CAMARA:
		if(gameConfig.multiplayerType == MULTIPLAYER_TYPE.ONLINE)
		{
			//this.add.image(0,0,'border_camera_single').setOrigin(0,0);
		}
		else
		{
			switch(gameConfig.screenSplitType)
			{
				case CAMERA_SPLIT_TYPE.VERTICAL:
					this.add.image(0,0,'border_camera_vertical').setOrigin(0,0);
					break;
				case CAMERA_SPLIT_TYPE.HORIZONTAL:
					this.add.image(0,0,'border_camera_horizontal').setOrigin(0,0);
					break;
			}
		}
		
	
	
		// BARRAS DE VIDA

		// Posición de la barra del jugador azul.
		let xBarraAzul = 40;
		let yBarraAzul = 575;

		// Posición de la barra del jugador rojo.
		let xBarraRoja = 650;
		let yBarraRoja = 575;

		// Sombra de la barra del jugador azul.
		var barraIzquierdaSombra = this.add.image(xBarraAzul, yBarraAzul, 'barraIzquierdaSombra').setOrigin(0, 0.5);

		var barraMedioSombra = this.add.image(barraIzquierdaSombra.x + barraIzquierdaSombra.width, yBarraAzul, 'barraMedioSombra').setOrigin(0, 0.5);
		barraMedioSombra.displayWidth = this.anchoTotal;

		var barraDerechaSombra = this.add.image(barraMedioSombra.x + barraMedioSombra.displayWidth, yBarraAzul, 'barraDerechaSombra').setOrigin(0, 0.5);


		// Sombra de la barra del jugador rojo.
		var barraIzquierdaSombra2 = this.add.image(xBarraRoja, yBarraRoja, 'barraIzquierdaSombra').setOrigin(0, 0.5);

		var barraMedioSombra2 = this.add.image(barraIzquierdaSombra2.x + barraIzquierdaSombra2.width, yBarraRoja, 'barraMedioSombra').setOrigin(0, 0.5);
		barraMedioSombra2.displayWidth = this.anchoTotal;

		var barraDerechaSombra2 = this.add.image(barraMedioSombra2.x + barraMedioSombra2.displayWidth, yBarraRoja, 'barraDerechaSombra').setOrigin(0, 0.5);


		// Barra de vida azul
		this.barraIzquierdaAzul = this.add.image(xBarraAzul, yBarraAzul, 'barraIzquierdaAzul').setOrigin(0, 0.5);

		this.barraMedioAzul = this.add.image(this.barraIzquierdaAzul.x + this.barraIzquierdaAzul.width, yBarraAzul, 'barraMedioAzul').setOrigin(0, 0.5);

		this.barraDerechaAzul = this.add.image(this.barraMedioAzul.x + this.barraMedioAzul.displayWidth, yBarraAzul, 'barraDerechaAzul').setOrigin(0, 0.5);


		// Barra de vida roja
		this.barraIzquierdaRoja = this.add.image(xBarraRoja, yBarraRoja, 'barraIzquierdaRoja').setOrigin(0, 0.5);

		this.barraMedioRoja = this.add.image(this.barraIzquierdaRoja.x + this.barraIzquierdaRoja.width, yBarraRoja, 'barraMedioRoja').setOrigin(0, 0.5);

		this.barraDerechaRoja = this.add.image(this.barraMedioRoja.x + this.barraMedioRoja.displayWidth, yBarraRoja, 'barraDerechaRoja').setOrigin(0, 0.5);
		



		// TEMPORIZADOR PARTIDA

		// Gráfico del temporizador.
		var graficoTemporizador = this.add.image(config.width/2, 40, 'grafico_temporizador');
		graficoTemporizador.setScale(0.4);

		// Tiempo en segundos de la cuenta atrás.
		this.tiempoInicial = gameTime;
		
		// Texto de la interfaz donde aparece el tiempo restante. Llama a formatoTiempo() para poner el tiempo
		// en minutos y segundos.
		// setOrigin(0.5) hace que el origen del texto sea su centro en vez de a su izquierda.
		this.textoTemporizador = this.add.text(config.width/2, 40, this.formatoTiempo(this.tiempoInicial), styleText_MedievalPixel_30).setOrigin(0.5);
		this.textoTemporizador.setScrollFactor(0);

		//Cada 1000 ms, es decir, 1 segundo se llama a la función temporizadorTerminado. Para ello se hace en bucle.
		this.temporizadorPartida = this.time.addEvent({ delay: 1000, callback: this.temporizadorTerminado, callbackScope: this, loop: true });

		// TEMPORIZADOR PARA NÚMEROS DE RESPAWN 

		// Definimos las posiciones de el contador de respawn para cada uno de los jugadores
		this.textoTemporizadorRespawnIzq = this.add.text(config.width/4, config.height/2, player1.respawnTime, styleText_MedievalPixel_30).setOrigin(0.5);
		this.textoTemporizadorRespawnDer = this.add.text((config.width/4)*3, config.height/2, player2.respawnTime, styleText_MedievalPixel_30).setOrigin(0.5);

		// GRÁFICOS DE LOS DRAGONES

		var graficoDragon1 = this.add.image(650, 450, 'dragon1graphic').setOrigin(0,0);
		graficoDragon1.setScale(0.4);
		var graficoDragon2 = this.add.image(40, 450, 'dragon2graphic').setOrigin(0,0);
		graficoDragon2.setScale(0.4);


		// PUNTUACION EN PANTALLA
		
		// Margenes para separar el texto de los graficos de los dragones
		let marginX = 50, marginY = 200;
		// Inicializamos el valor de los textos que mostraran el valor de la puntuación
		this.textoPuntuacionAzul = this.add.text(config.width-marginX, config.height-marginY, player1.points, styleText_MedievalPixel_30).setOrigin(0.5);
		this.textoPuntuacionRoja = this.add.text(marginX, config.height-marginY, player2.points, styleText_MedievalPixel_30).setOrigin(0.5);
		// Puntos del jugador a mostrar en pantalla
		this.puntuacionAzul = this.time.addEvent({ delay: 1000, callback:player1.points, callbackScope: this, loop: true });
		this.puntuacionRoja = this.time.addEvent({ delay: 1000, callback:player2.points, callbackScope: this, loop: true });

	}

	update(time, delta)
	{
		// Cambiar la barra de vida del jugador 2. Se divide entre 100 para que sea del 0 al 1.
		this.cambiarAnchoBarraAnimado(player2.health/100, this.barraIzquierdaAzul, this.barraMedioAzul, this.barraDerechaAzul);
		// Cambiar la barra de vida del jugador 1. Se divide entre 100 para que sea del 0 al 1.
		this.cambiarAnchoBarraAnimado(player1.health/100, this.barraIzquierdaRoja, this.barraMedioRoja, this.barraDerechaRoja);
		
		if(player1.health<=0){
			this.textoTemporizadorRespawnDer.setText(player1.respawnTime.toString().padStart(2,'0'));
		} else {
			this.textoTemporizadorRespawnDer.setText('');
		}
		if(player2.health<=0){
			this.textoTemporizadorRespawnIzq.setText(player2.respawnTime.toString().padStart(2,'0'));
		} else {
			this.textoTemporizadorRespawnIzq.setText('');
		}
		
		// Actualizamos el valor de las puntuaciones 
		this.textoPuntuacionAzul.setText(player1.points);
		this.textoPuntuacionRoja.setText(player2.points);
	}

	// Esta función cambia el tamaño de la barra de vida, pasándole un número de 0 a 1.
	cambiarAnchoBarra(porcentaje = 1, barraIzquierdaCambiar, barraMedioCambiar, barraDerechaCambiar)
	{

		// Calcular el ancho con el porcentaje pasado.
		let ancho = this.anchoTotal * porcentaje;

		// Actualizar el ancho de la parte media de la barra.
		barraMedioCambiar.displayWidth = ancho;
		// Actualizar la posición de la parte derecha de la barra.
		barraDerechaCambiar.x = barraMedioCambiar.x + barraMedioCambiar.displayWidth;

		// Si el displayWidth de la barra del medio es 0, la barra deja de ser visible
		// porque el dragón está muerto.
		barraIzquierdaCambiar.visible = barraMedioCambiar.displayWidth > 0;
		barraMedioCambiar.visible = barraMedioCambiar.displayWidth > 0;
		barraDerechaCambiar.visible = barraMedioCambiar.displayWidth > 0;
	}

	// Usar este código para que tenga una animación más smooth.
	cambiarAnchoBarraAnimado(porcentaje = 1, barraIzquierdaCambiar, barraMedioCambiar, barraDerechaCambiar,  duracion = 1000)
	{
		// Calcular el ancho con el porcentaje pasado.
		let ancho = this.anchoTotal * porcentaje;

		// Actualizar el ancho de la barra con un Easing.
		this.tweens.add({
			targets: barraMedioCambiar,
			displayWidth: ancho,
			duracion,
			ease: Phaser.Math.Easing.Sine.Out,
			onUpdate: () => {
				// Actualizar la posición de la parte derecha de la barra.
				barraDerechaCambiar.x = barraMedioCambiar.x + barraMedioCambiar.displayWidth;
	
				// 0.5 porque con el Easing el displayWidth nunca llega a 0, se queda en 0 con algo.
				barraIzquierdaCambiar.visible = barraMedioCambiar.displayWidth > 0.5;
				barraMedioCambiar.visible = barraMedioCambiar.displayWidth > 0.5;
				barraDerechaCambiar.visible = barraMedioCambiar.displayWidth > 0.5;

			}
		});
	}
	
	// Esta función es llamada cada 1 segundo para actualizar el contador de tiempo restante.
	temporizadorTerminado()
	{
		// Se resta 1 segundo al tiempo inicial.
		this.tiempoInicial = this.tiempoInicial - 1;

		// Se actualiza el texto del tiempo restante cada 1 segundo.
		this.textoTemporizador.setText(this.formatoTiempo(this.tiempoInicial));

		// Si el tiempo inicial es 0, la partida ha terminado.
		if (this.tiempoInicial === 0){
			console.log("GAME OVER");
			game.scene.stop('map_test_1');
			this.scene.stop("ui");
			game.scene.start("game_over");

			// Ir a la escena GAME OVER.
		}
	}

	//Esta función coge segundos y lo formatea en minutos y segundos (por ejemplo, 80 -> 1:20)
	formatoTiempo(segundos)
	{
		// Minutos
		var minutos = Math.floor(segundos/60);
		// Segundos
		var parteEnSegundos = segundos%60;
		// Añadir ceros a la izquierda a los segundos
		parteEnSegundos = parteEnSegundos.toString().padStart(2,'0');
		// Devolver el tiempo bien formateado.
		return `${minutos}:${parteEnSegundos}`;
	}

	destroy()
	{
		this.textoTemporizador = {};
		this.tiempoInicial = {};
		this.temporizadorPartida = {};

		this.barraIzquierdaAzul = {};
		this.barraMedioAzul = {};
		this.barraDerechaAzul = {};

		this.barraIzquierdaRoja = {};
		this.barraMedioRoja = {};
		this.barraDerechaRoja = {};

		this.textoPuntuacionAzul = {};
		this.textoPuntuacionRoja = {};
		this.puntuacionAzul = {};
		this.puntuacionRoja = {};
		super.destroy();

	}
};