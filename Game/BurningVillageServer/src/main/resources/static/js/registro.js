class Registro extends DragonScene
{
    background = {};
	loginBox = {};
	botonSalir = {};
	
	titulo = {};
	
    preload() {
		this.load.image('menuBackgroundBlurry', 'assets/menu_background_blurry.jpg');
        this.load.html('formularioRegistro', 'assets/formularioRegistro.html');
    }

    create() {
		
		this.background = this.add.image(0,0,'menuBackgroundBlurry').setOrigin(0,0).setDisplaySize(config.width, config.height);
		this.titulo = this.add.text(config.width/2, 40, 'Crear Cuenta', styleText_AncientFont_90).setOrigin(.5,0).setScale(1);
		
        const element = this.add.dom(config.width/2, config.height/2).createFromCache('formularioRegistro');
		this.loginBox = element;
		
        element.setPerspective(800);

        element.addListener('click');

        element.on('click', function (event)
        {

            if (event.target.name === 'loginButton')
            {
                const inputUsername = this.getChildByName('username');
                const inputPassword = this.getChildByName('password');

                //  Have they entered anything?
                if (inputUsername.value !== '' && inputPassword.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');

                    //  Tween the login form out
                    this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

                    this.scene.tweens.add({
                        targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
                        onComplete: function ()
                        {
                            element.setVisible(false);
                        }
                    });

                    //Hacer un POST a la API REST /usuarios.

                    $(document).ready(function(){
                        console.log("DOM cargado.");
                        console.log(ip.http + "/users");
                        
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

                    //  Populate the text with whatever they typed in as the username!
                    //text.setText(`Welcome ${inputUsername.value}`);
                }
                else
                {
                    //  Flash the prompt
                    this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                }
            }

        });
        

        this.tweens.add({
            targets: element,
            y: 300,
            duration: 3000,
            ease: 'Power3'
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