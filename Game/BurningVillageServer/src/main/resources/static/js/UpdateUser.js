class UpdateUser extends DragonScene
{
    background = {};
    passwordBox = {};
    titulo = {};
    botonSalir = {};

    preload() {
        this.load.image('menuBackgroundBlurry', 'assets/menu_background_blurry.jpg');
        preloadCredentialsBoxData(this);
    }
    create() {
        this.background = this.add.image(0, 0, 'menuBackgroundBlurry').setOrigin(0, 0).setDisplaySize(config.width, config.height);
        this.titulo = this.add.text(config.width / 2, 40, 'Cambiar contraseña', styleText_AncientFont_90).setOrigin(.5, 0).setScale(1);

        this.passwordBox = new CredentialsBox(this, false, true);
        let that = this;
        this.passwordBox.setRequest(function () {
            let newPasswword = that.passwordBox.getPasswordText();
            let oldPassword = that.passwordBox.getOldPasswordText();
            
            //TODO: Remove this log in prod.
            console.log("Trying to log in with user credentials: oldPassword = " + oldPassword + ", newPasswword = " + newPasswword);

            $.ajax({ // vale, no estaba entendiendo, si, te enseño 
                method: "PUT",
                url: ip.http + "/users/" + localUser.user.id + "/" + localUser.user.password,
                data: JSON.stringify(newPasswword),
                processData: false,
                headers: {
                    contentType: "application/json; charset=utf-8"
                }
            }).done(function () {
                console.log("User password changed");
                game.scene.stop("Update");
                game.scene.start("AccountMenu");
            }).fail(function () {
                console.log("Error al cambiar la contraseña del usuario");
                that.passwordBox.displayError("No se ha modificado la contraseña.");
            });
        });

        this.botonSalir = new Button(this, config.width - 150, config.height - 50, "Volver");
		this.botonSalir.setButtonFunction(function(){
			game.scene.stop("UpdateUser");
			game.scene.start("AccountMenu");
		});
		this.botonSalir.setCanBePressed(true);
    }
    update() { }
}