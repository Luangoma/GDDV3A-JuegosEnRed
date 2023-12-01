var MainMenu = {
	key: 'MainMenu',
	preload: MainMenuPreload,
	create: MainMenuCreate,
	update: MainMenuUpdate
};

function MainMenuPreload()
{
	//Precarga imagen background y botones svg.
	this.load.image('menuBackground', 'assets/menu_background.png');
	this.load.svg('botonJugar', 'assets/botonJugar.svg');
	this.load.svg('botonSalir', 'assets/botonSalir.svg');
	this.load.svg('botonAjustes', 'assets/botonAjustes.svg');
	this.load.svg('botonCreditos', 'assets/botonCreditos.svg');
}

function MainMenuCreate()
{
	//Creación imagen background y botones svg.
	var menuBackground = this.add.image(0,0, 'menuBackground').setOrigin(0,0).setDisplaySize(config.width,config.height);
	let first_button_height = 60;
	let button_separation = 60;
	var botonJugar    = this.add.image(config.width/5, first_button_height + button_separation * 0, 'botonJugar').setScale(0.5);
	var botonAjustes  = this.add.image(config.width/5, first_button_height + button_separation * 1, 'botonAjustes').setScale(0.5);
	var botonCreditos = this.add.image(config.width/5, first_button_height + button_separation * 2, 'botonCreditos').setScale(0.5);
	var botonSalir    = this.add.image(config.width/5, first_button_height + button_separation * 3, 'botonSalir').setScale(0.5);

	//Hacer los botones interactivos.
	botonJugar.setInteractive();
	botonCreditos.setInteractive();
	botonSalir.setInteractive();
	botonAjustes.setInteractive();

	//Interacción con los botones.
	botonJugar.on('pointerdown', function(pointer){
		console.log("Botón jugar pulsado");
		// Cambia la escena actual a la selecionada, en este caso, el mapa 1
		game.scene.start("map_test_1");
	});
	botonCreditos.on('pointerdown', function(pointer){
		console.log("Botón créditos pulsado");
		// Cambia la escena actual a la selecionada, en este caso, los creditos
		game.scene.start("Credits");
	});
	botonAjustes.on('pointerdown', function(pointer){
		// Cambia la escena actual a la selecionada, en este caso, los ajustes (por crear)
		console.log("Botón ajustes pulsado");
		game.scene.start("Settings");
	});
	botonSalir.on('pointerdown', function(pointer){
		console.log("Botón salir pulsado");
		// Salir del juego, en este caso, cerrar la pestaña
		window.close();
	});
}

function MainMenuUpdate(time, delta)
{}