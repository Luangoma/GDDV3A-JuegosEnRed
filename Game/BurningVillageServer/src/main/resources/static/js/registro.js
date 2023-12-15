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
		let that = this;
		this.loginBox.setRequest(function(){
			let usr = that.loginBox.getUsernameText();
			let pwd = that.loginBox.getPasswordText();
			//TODO: Remove this log in prod.
			console.log("Created a new user: usr= " + usr + ", pwd= " + pwd);
			
			$.ajax({
				method: "POST",
				url: ip.http + "/users",
				data: JSON.stringify({username: usr, password: pwd}),
				processData: false,
				headers: {
					"Content-type": "application/json"
				}
			}).done(function(data, textStatus, jqXHR) {
				console.log("user was successfully added to the database.");
				
				//login after registering:
				localUser.logIn(data);
				//exit the scene after registering:
				game.scene.stop("Registro");
				game.scene.start("AccountMenu");
				
			}).fail(function(data, textStatus, jqXHR) {
				console.log("there was an error, could not add user to db.");
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