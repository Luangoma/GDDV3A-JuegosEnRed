class DeleteAccount extends DragonScene
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
		this.titulo = this.add.text(config.width/2, 40, 'Eliminar Cuenta', styleText_AncientFont_90).setOrigin(.5,0).setScale(1);
		
		this.loginBox = new CredentialsBox(this, true);
		let that = this;
		this.loginBox.setRequest(function(){
			let pwd = that.loginBox.getPasswordText();
			//TODO: Remove this log in prod.
			console.log("Trying to delete account.");
			
			$.ajax({
				method: "DELETE",
				url: ip.http + "/users/delete/" + localUser.user.id + "/" + pwd,
				processData: false,
				headers: {
					"Content-type": "application/json"
				}
			}).done(function(data, textStatus, jqXHR) {
				console.log("user has successfully deleted the account.");
				
				//logout:
				localUser.logOut();
				//exit the scene after successfully deleting the account:
				game.scene.stop("DeleteAccount");
				game.scene.start("AccountMenu");
				
			}).fail(function(data, textStatus, jqXHR) {
				console.log("the credentials given are not valid. Could not delete the account.");
				that.loginBox.displayError("No se ha podido eliminar la cuenta.");
			});
		});
		
		this.botonSalir = new Button(this, config.width - 150, config.height - 50, "Volver");
		this.botonSalir.setButtonFunction(function(){
			game.scene.stop("DeleteAccount");
			game.scene.start("AccountMenu");
		});
		this.botonSalir.setCanBePressed(true);

    }


    update() {

    }
}