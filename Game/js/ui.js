class ui extends Phaser.Scene
{
	textoTemporizador = {};
	tiempoInicial = {};
	temporizadorPartida = {};

	preload()
	{

		this.load.svg('dragon1graphic', 'assets/dragon1graphic.svg');
		this.load.svg('dragon2graphic', 'assets/dragon2graphic.svg');
		this.load.svg('grafico_temporizador', 'assets/grafico_temporizador.svg');
	}

	create()
	{
		
		// TEMPORIZADOR PARTIDA

		// Gráfico del temporizador.
		var graficoTemporizador = this.add.image(config.width/2, 40, 'grafico_temporizador');
		graficoTemporizador.setScale(0.4);

		// Tiempo en segundos de la cuenta atrás.
		this.tiempoInicial = 80;
		
		// Texto de la interfaz donde aparece el tiempo restante. Llama a formatoTiempo() para poner el tiempo
		// en minutos y segundos.
		// setOrigin(0.5) hace que el origen del texto sea su centro en vez de a su izquierda.
		this.textoTemporizador = this.add.text(config.width/2, 40, this.formatoTiempo(this.tiempoInicial), { fontFamily: 'medieval-pixel', fontSize: 30 }).setOrigin(0.5);

		this.textoTemporizador.setScrollFactor(0);

		//Cada 1000 ms, es decir, 1 segundo se llama a la función temporizadorTerminado. Para ello se hace en bucle.
		this.temporizadorPartida = this.time.addEvent({ delay: 1000, callback: this.temporizadorTerminado, callbackScope: this, loop: true });

		


		
		// GRÁFICOS DE LOS DRAGONES

		var graficoDragon1 = this.add.image(40, 450, 'dragon1graphic').setOrigin(0,0);
		graficoDragon1.setScale(0.4);
		var graficoDragon2 = this.add.image(650, 450, 'dragon2graphic').setOrigin(0,0);
		graficoDragon2.setScale(0.4);
	}

	update(time, delta)
	{

	}
	
	// Esta función es llamada cada 1 segundo para actualizar el contador de tiempo restante.
	temporizadorTerminado() {
		// Se resta 1 segundo al tiempo inicial.
		this.tiempoInicial = this.tiempoInicial - 1;

		// Se actualiza el texto del tiempo restante cada 1 segundo.
		this.textoTemporizador.setText(this.formatoTiempo(this.tiempoInicial));

		// Si el tiempo inicial es 0, la partida ha terminado.
		if (this.tiempoInicial === 0){
			console.log("GAME OVER");

			// Ir a la escena GAME OVER.
		}
	}



	//Esta función coge segundos y lo formatea en minutos y segundos (por ejemplo, 80 -> 1:20)
	formatoTiempo(segundos) {
		// Minutos
		var minutos = Math.floor(segundos/60);
		// Segundos
		var parteEnSegundos = segundos%60;
		// Añadir ceros a la izquierda a los segundos
		parteEnSegundos = parteEnSegundos.toString().padStart(2,'0');
		// Devolver el tiempo bien formateado.
		return `${minutos}:${parteEnSegundos}`;
	}
	
};
