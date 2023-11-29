var MainMenu = {
	key: 'MainMenu',
	preload: MainMenuPreload,
	create: MainMenuCreate,
	update: MainMenuUpdate
};

function MainMenuPreload()
{
	//Precarga imagen background y botones svg.
	this.load.svg('botonJugar', 'assets/botonJugar.svg');
	this.load.svg('botonSalir', 'assets/botonSalir.svg');
	this.load.svg('botonAjustes', 'assets/botonAjustes.svg');
	this.load.svg('botonCreditos', 'assets/botonCreditos.svg');
	this.load.image('menuBackground', 'assets/menu_background.png');
	
}

function MainMenuCreate()
{
	//Creación imagen background y botones svg.
	var menuBackground = this.add.image(0,0, 'menuBackground').setOrigin(0,0);
	var botonJugar = this.add.image(400, 100, 'botonJugar').setScale(0.5);
	var botonSalir = this.add.image(400, 160, 'botonSalir').setScale(0.5);
	var botonAjustes = this.add.image(400, 220, 'botonAjustes').setScale(0.5);
	var botonCreditos = this.add.image(400, 280, 'botonCreditos').setScale(0.5);

	//Hacer los botones interactivos.
	botonJugar.setInteractive();
	botonCreditos.setInteractive();
	botonSalir.setInteractive();
	botonAjustes.setInteractive();

	//Interacción con los botones.
	botonJugar.on('pointerdown', function(pointer){
		console.log("Botón jugar pulsado");
	});
	botonCreditos.on('pointerdown', function(pointer){
		console.log("Botón créditos pulsado");
	});
	botonAjustes.on('pointerdown', function(pointer){
		console.log("Botón ajustes pulsado");
	});
	botonSalir.on('pointerdown', function(pointer){
		console.log("Botón salir pulsado");
	});
}

function MainMenuUpdate(time, delta)
{
	
}