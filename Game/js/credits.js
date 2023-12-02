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

        // setOrigin(1) hace que el origen del texto esté a su derecha, setOrigin(0) a su izquierda.

        // Título 'Créditos'
        this.titulo = this.add.text(xTitulo, yTitulo, 'Creditos', { fontFamily: 'medieval-pixel', fontSize: 90, align: 'left' }).setOrigin(1);

        // Textos de los nombres.
        this.nombre1 = this.add.text(xTitulo, yTitulo + separacionTexto * 1, 'Daniel Rodríguez', { fontFamily: 'pixel_sans_serif', fontSize: 18 }).setOrigin(1);
        this.nombre2 = this.add.text(xTitulo, yTitulo + separacionTexto * 2, 'Juan Alessandro Vázquez Bustos', { fontFamily: 'pixel_sans_serif', fontSize: 18 }).setOrigin(1);
        this.nombre3 = this.add.text(xTitulo, yTitulo + separacionTexto * 3, 'Mario López García', { fontFamily: 'pixel_sans_serif', fontSize: 18 }).setOrigin(1);
        this.nombre4 = this.add.text(xTitulo, yTitulo + separacionTexto * 4, 'Luis Antonio González', { fontFamily: 'pixel_sans_serif', fontSize: 18 }).setOrigin(1);

        // Se coloca el boton en la esquina inferior derecha
        this.botonSalir = this.add.image(config.width - config.width / 5, config.height - 60, 'botonSalir').setScale(0.5);
        // Hacemos el boton interactivo
        this.botonSalir.setInteractive();
        // Al pulsar el boton salir, se vuelve al menu principal
        this.botonSalir.on('pointerdown', function (pointer) {
            console.log("Botón salir pulsado");
            // Salir del juego, en este caso, cerrar la pestaña
            game.scene.stop('Credits');
            game.scene.start("MainMenu");
        });
    }

    update(time, delta) 
    {
        console.log('Credits');
    }
    /**/
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
    }//*/
}   