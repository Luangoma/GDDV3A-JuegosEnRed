class UpdateUser extends DragonScene{
    background = {};
    currentPassword ={};
    newPassword = {};
    titulo = {};

    preload(){
        this.load.image('menuBackgroundBlurry', 'assets/menu_background_blurry.jpg');
		preloadCredentialsBoxData(this);
    }
    create(){
        this.background = this.add.image(0,0,'menuBackgroundBlurry').setOrigin(0,0).setDisplaySize(config.width, config.height);
		this.titulo = this.add.text(config.width/2, 40, 'Cambiar contraseña', styleText_AncientFont_90).setOrigin(.5,0).setScale(1);
		
		this.loginBox = new CredentialsBox(this);

        $.ajax({
            method: "PUT",
            url: ip.http + "/users/login/" + usr + "/" + pwd,
            data: JSON.stringify({}),
            processData: false,
            headers:{ contentType: "application/json; charset=utf-8"}


        });
    }
    update(){}
}