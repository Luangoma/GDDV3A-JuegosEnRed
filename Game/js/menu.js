class MainMenu extends Phaser.Scene
{
	menuBackground = {};
	botonJugar = {};
	botonAjustes = {};
	botonCreditos = {};
	botonSalir = {};
	
	preload()
	{
		//Precarga imagen background y botones svg.
		this.load.image('menuBackground', 'assets/menu_background.png');
		this.load.svg('botonJugar', 'assets/botonJugar.svg');
		this.load.svg('botonSalir', 'assets/botonSalir.svg');
		this.load.svg('botonAjustes', 'assets/botonAjustes.svg');
		this.load.svg('botonCreditos', 'assets/botonCreditos.svg');
	}
	
	create()
	{
		//Creación imagen background y botones svg.
		this.menuBackground = this.add.image(0,0, 'menuBackground').setOrigin(0,0).setDisplaySize(config.width,config.height);
		let first_button_height = 60;
		let button_separation = 60;
		this.botonJugar    = this.add.image(config.width/5, first_button_height + button_separation * 0, 'botonJugar').setScale(0.5);
		this.botonAjustes  = this.add.image(config.width/5, first_button_height + button_separation * 1, 'botonAjustes').setScale(0.5);
		this.botonCreditos = this.add.image(config.width/5, first_button_height + button_separation * 2, 'botonCreditos').setScale(0.5);
		this.botonSalir    = this.add.image(config.width/5, first_button_height + button_separation * 3, 'botonSalir').setScale(0.5);

		//Hacer los botones interactivos.
		this.botonJugar.setInteractive();
		this.botonCreditos.setInteractive();
		this.botonSalir.setInteractive();
		this.botonAjustes.setInteractive();

		//Interacción con los botones.
		this.botonJugar.on('pointerdown', function(pointer){
			console.log("Botón jugar pulsado");
			// Cambia la escena actual a la selecionada, en este caso, el mapa 1
			game.scene.stop('MainMenu');
			game.scene.start("map_test_1");
		});
		this.botonCreditos.on('pointerdown', function(pointer){
			console.log("Botón créditos pulsado");
			// Cambia la escena actual a la selecionada, en este caso, los creditos
			game.scene.stop('MainMenu');
			game.scene.start("Credits");
		});
		this.botonAjustes.on('pointerdown', function(pointer){
			// Cambia la escena actual a la selecionada, en este caso, los ajustes (por crear)
			console.log("Botón ajustes pulsado");
			game.scene.stop('MainMenu');
			game.scene.start("Settings");
		});
		this.botonSalir.on('pointerdown', function(pointer){
			console.log("Botón salir pulsado");
			// Salir del juego, en este caso, cerrar la pestaña
			window.close();
		});
	}
	
	update(time,delta)
	{
		console.log("menu");
	}
	
	shutdown()
	{
		super.shutdown();
	}
	
	destroy()
	{
		this.menuBackground = {};
		this.botonJugar = {};
		this.botonAjustes = {};
		this.botonCreditos = {};
		this.botonSalir = {};
		super.destroy();
	}
};
