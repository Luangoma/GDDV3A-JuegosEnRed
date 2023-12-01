var credits = {
	key: 'credits',
	preload: creditsPreload,
	create: creditsCreate,
	update: creditsUpdate
};

function creditsPreload(){
    // Precarga del background con efecto de blur.
    this.load.image('menuBackgroundBlurry', 'assets/menu_background_blurry.jpg');

}

function creditsCreate(){
    // Añadir el background a la escena.
    var menuBackground = this.add.image(0,0, 'menuBackgroundBlurry').setOrigin(0,0).setDisplaySize(config.width,config.height);

    // xTitulo será la x para todos los textos, alineados a la derecha. yTitulo es la y inicial
    // que tiene el título 'Créditos' y que se incrementará para cada texto.
    let xTitulo = 700;
    let yTitulo = 150;
    
    // Píxeles de separación entre cada texto.
    let separacionTexto = 60;

    // setOrigin(1) hace que el origen del texto esté a su derecha, setOrigin(0) a su izquierda.

    // Título 'Créditos'
    var titulo = this.add.text(xTitulo, yTitulo, 'Creditos', { fontFamily: 'medieval-pixel', fontSize: 90, align: 'left' }).setOrigin(1);
    
    // Textos de los nombres.
    var nombre1 = this.add.text(xTitulo, yTitulo + separacionTexto*1, 'Daniel Rodríguez', { fontFamily: 'pixel_sans_serif', fontSize: 18 }).setOrigin(1);
    var nombre2 = this.add.text(xTitulo, yTitulo + separacionTexto*2, 'Juan Alessandro Vázquez Bustos',  { fontFamily: 'pixel_sans_serif', fontSize: 18 }).setOrigin(1);
    var nombre3 = this.add.text(xTitulo, yTitulo + separacionTexto*3, 'Mario López García',  { fontFamily: 'pixel_sans_serif', fontSize: 18 }).setOrigin(1);
    var nombre4 = this.add.text(xTitulo, yTitulo + separacionTexto*4, 'Luis Antonio González',  { fontFamily: 'pixel_sans_serif', fontSize: 18 }).setOrigin(1);

}

function creditsUpdate(time, delta){

}