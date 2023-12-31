class Credits extends Phaser.Scene 
{
    menuBackground = {};
    titulo = {};
    nombre1 = {};
    nombre2 = {};
    nombre3 = {};
    nombre4 = {};
    botonSalir = {};

    preload() {
        // Precarga del background con efecto de blur.
        this.load.image('menuBackgroundBlurry', 'assets/menu_background_blurry.jpg');
        this.load.svg('botonSalir', 'assets/botonSalir.svg');
    }

    create() {
        // Añadir el background a la escena.
        this.menuBackground = this.add.image(0, 0, 'menuBackgroundBlurry').setOrigin(0, 0).setDisplaySize(config.width, config.height);

        // xTitulo será la x para todos los textos, alineados a la derecha. yTitulo es la y inicial
        // que tiene el título 'Créditos' y que se incrementará para cada texto.
        let xTitulo = 700;
        let yTitulo = 150;

        // Píxeles de separación entre cada texto.
        let separacionTexto = 60;

        // Título 'Créditos'
        this.titulo = this.add.text(xTitulo, yTitulo, lang("key_credits"), styleText_AncientFont_90).setOrigin(1).setScale(1);

        // Textos de los nombres.
        this.nombre1 = this.add.text(xTitulo, yTitulo + separacionTexto * 1, 'Mario López García', styleText_PixelSansSerif_18).setOrigin(1);
        this.nombre2 = this.add.text(xTitulo, yTitulo + separacionTexto * 2, 'Daniel Rodríguez Ariza', styleText_PixelSansSerif_18).setOrigin(1);
        this.nombre3 = this.add.text(xTitulo, yTitulo + separacionTexto * 3, 'Luis Antonio González Martínez', styleText_PixelSansSerif_18).setOrigin(1);
        this.nombre4 = this.add.text(xTitulo, yTitulo + separacionTexto * 4, 'Juan Alessandro Vázquez Bustos', styleText_PixelSansSerif_18).setOrigin(1);

        // Botón para volver al menu principal.
        this.botonSalir = new Button(this, config.width - 150, config.height - 50, lang("key_return"));
		this.botonSalir.setButtonFunction(function(){
			game.scene.stop("Credits");
			game.scene.start("MainMenu");
		});
		this.botonSalir.setCanBePressed(true);
    }

    update(time, delta) 
    {
        //console.log('Credits');
    }
	
    shutdown() 
    {
        super.shutdown();
    }

    destroy() {
        this.menuBackground = {};
        this.titulo = {};
        this.nombre1 = {};
        this.nombre2 = {};
        this.nombre3 = {};
        this.nombre4 = {};
        this.botonSalir = {};
        super.destroy();
    }
}   