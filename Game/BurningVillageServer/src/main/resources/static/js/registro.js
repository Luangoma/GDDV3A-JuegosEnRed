class Registro extends DragonScene
{
    background = {};
	loginBox = {};
	botonSalir = {};
	
	titulo = {};
	
    preload() {
		this.load.image('menuBackgroundBlurry', 'assets/menu_background_blurry.jpg');
        //this.load.html('formularioRegistro', 'assets/formularioRegistro.html');
		preloadCredentialsBoxData(this);
    }

    create() {
		
		this.background = this.add.image(0,0,'menuBackgroundBlurry').setOrigin(0,0).setDisplaySize(config.width, config.height);
		this.titulo = this.add.text(config.width/2, 40, 'Crear Cuenta', styleText_AncientFont_90).setOrigin(.5,0).setScale(1);
		
		this.loginBox = new CredentialsBox(this);
		this.loginBox.setRequest(function(){
			$.ajax({
				method: "POST",
				url: ip.http + "/users",
				data: JSON.stringify({id:0, username: "Soso43", password: "1234567890"}),
				processData: false,
				headers: {
					"Content-type": "application/json"
				}
			}).done(function(data, textStatus, jqXHR) {
				console.log("ajax done");
			}).fail(function(data, textStatus, jqXHR) {
			});
		});
		
		this.botonSalir = new Button(this, config.width - 150, config.height - 50, "Volver");
		this.botonSalir.setButtonFunction(function(){
			game.scene.stop("Registro");
			game.scene.start("AccountMenu");
		});
		this.botonSalir.setCanBePressed(true);

    }


    update() {

    }
}