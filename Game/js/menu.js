var MainMenu = {
	key: 'MainMenu',
	preload: MainMenuPreload,
	create: MainMenuCreate,
	update: MainMenuUpdate
};

function MainMenuPreload()
{
	this.load.svg('botonJugar', 'assets/botonJugar.svg');
	this.load.svg('botonSalir', 'assets/botonSalir.svg');
	this.load.svg('botonAjustes', 'assets/botonAjustes.svg');
	this.load.svg('botonCreditos', 'assets/botonCreditos.svg');
	this.load.image('menuBackground', 'assets/menu_background.png');
	
}

function MainMenuCreate()
{
	var menuBackground = this.add.image(0,0, 'menuBackground').setOrigin(0,0);
	var botonJugar = this.add.image(100, 100, 'botonJugar').setScale(0.5);
	var botonSalir = this.add.image(100, 160, 'botonSalir').setScale(0.5);
	var botonAjustes = this.add.image(100, 220, 'botonAjustes').setScale(0.5);
	var botonCreditos = this.add.image(100, 280, 'botonCreditos').setScale(0.5);
}

function MainMenuUpdate(time, delta)
{}