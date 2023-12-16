class ForumScene extends DragonScene
{
	menuBackground = {};
    botonSalir = {};
	cajaTexto = {};

    preload() {
        // Precarga del background con efecto de blur.
        this.load.image('menuBackgroundBlurry', 'assets/menu_background_blurry.jpg');
		this.load.html('cajaForo', './assets/foro.html');
    }

    create() {
        // Añadir el background a la escena.
        this.menuBackground = this.add.image(0, 0, 'menuBackgroundBlurry').setOrigin(0, 0).setDisplaySize(config.width, config.height);
		
		
		
		const element = this.add.dom(config.width/2, config.height/2).createFromCache('cajaForo');
		this.credentialsBox = element;
		
		let that = this;
		element.setPerspective(800);
		element.addListener('click');
		element.on('click', function (event)
		{

			//If the login button was pressed, process the user input and return it.
			if (event.target.name === 'loginButton')
			{
				let inputUsername = this.getChildByName('password');

				if (inputUsername.value !== '')
				{
					//Make a request (most likely through ajax, but could be anything, even fully clientside dependant operations). The request is configured by the caller code.
					that.requestFunction();
				}
			}

		});
		
        // Botón para volver al menu anterior.
        this.botonSalir = new Button(this, config.width - 150, config.height - 50, "Volver");
		this.botonSalir.setButtonFunction(function(){
			game.scene.stop("ForumScene");
			game.scene.start("SocialMenu");
		});
		this.botonSalir.setCanBePressed(true);
    }
}