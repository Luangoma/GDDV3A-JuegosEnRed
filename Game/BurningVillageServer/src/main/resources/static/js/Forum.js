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

			//Botón de Enviar pulsado.
			if (event.target.name === 'send-message')
			{
				console.log("Botón enviar pulsado.");

				let mensaje = this.getChildByName('message-input').value;
				console.log(mensaje);
				console.log(localUser.user.id);
				/*let inputUsername = this.getChildByName('password');*/

				if (mensaje !== '')
				{
					//Si hay mensaje, enviarlo por petición AJAX.
					$.ajax({
						method: "POST",
						url: ip.http + "/posts/new",
						data: JSON.stringify({postId: 1, authorId: 1, postContent: mensaje}),
						processData: false,
						headers: {
							"Content-type": "application/json"
						}
					}).done(function(data, textStatus, jqXHR) {
						console.log("El mensaje se ha añadido satisfactoriamente al servidor.");
						/*
						//login after registering:
						localUser.logIn(data);
						//exit the scene after registering:
						game.scene.stop("Registro");
						game.scene.start("AccountMenu");*/
						
					}).fail(function(data, textStatus, jqXHR) {
						console.log("Error, no se ha añadido el mensaje al servidor.");
						//that.loginBox.displayError("No se ha podido crear la cuenta.");
					});
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