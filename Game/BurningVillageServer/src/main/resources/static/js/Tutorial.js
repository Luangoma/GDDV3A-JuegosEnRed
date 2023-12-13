class Tutorial extends DragonScene
{
	background = {};
	botonSalir = {};
	
	controls_p1 = [];
	controls_p2 = [];
		
	preload()
	{
		this.load.image('tutorial_background', './assets/tutorial/generic_tutorial_slide.png');
		this.load.image('menuBackgroundBlurry', 'assets/menu_background_blurry.jpg');
		
		this.load.image('p1_keys', './assets/tutorial/ArrowKeys.png');
		this.load.image('p2_keys', './assets/tutorial/WASDKeys.png');
		
		this.load.image('a_key', './assets/tutorial/teclas_tutorial/a_key.png');
		this.load.image('d_key', './assets/tutorial/teclas_tutorial/d_key.png');
		this.load.image('w_key', './assets/tutorial/teclas_tutorial/w_key.png');
		
		this.load.image('up_arrow',    './assets/tutorial/teclas_tutorial/up_arrow.png');
		this.load.image('left_arrow',  './assets/tutorial/teclas_tutorial/left_arrow.png');
		this.load.image('right_arrow', './assets/tutorial/teclas_tutorial/right_arrow.png');
	}
	
	create()
	{
		enableSound(this);
		
		this.background = this.add.image(0,0,'menuBackgroundBlurry').setOrigin(0,0).setDisplaySize(config.width, config.height);
		
		this.controls_p1 = this.addControls(0,0,0,"Rojo");
		this.controls_p2 = this.addControls(0,250,1,"Azul");
		
		this.botonSalir = new Button(this, config.width - 150, config.height - 50, "Volver");
		this.botonSalir.setButtonFunction(function(){
			game.scene.stop("Tutorial");
			game.scene.start("MainMenu");
		});
		this.botonSalir.setCanBePressed(true);
		
	}
	
	//TODO: When controls customization is finally implemented, it would be nice to replace the default controls images used here with the current controls. Also, possibly add a restore settings to default option in the settings menu.
	addControls(x,y, playerid, playercolortext){
		let txt_player_controls = this.add.text( x + 10, y + 50, 'Controles para el Dragón ' + playercolortext + ' (jugador ' + (playerid+1) + '):', styleText_PixelSansSerif_18).setOrigin(0);
			
			let img_move_l = this.add.image( x + 20, y + 100, playerid == 0 ? 'left_arrow' : 'a_key').setOrigin(0,0);
			let txt_move_l = this.add.text( x + 100, y + 100, 'Rotar hacia la izquierda', styleText_PixelSansSerif_18).setOrigin(0);
			
			let img_move_r = this.add.image( x + 20, y + 150, playerid == 0 ? 'right_arrow' : 'd_key').setOrigin(0,0);
			let txt_move_r = this.add.text( x + 100, y + 150, 'Rotar hacia la derecha', styleText_PixelSansSerif_18).setOrigin(0);

			let img_shoot = this.add.image( x + 20, y + 200, playerid == 0 ? 'up_arrow' : 'w_key').setOrigin(0,0);
			let txt_shoot = this.add.text( x + 100, y + 200, 'Disparar llamarada de fuego', styleText_PixelSansSerif_18).setOrigin(0);
			
		return [txt_player_controls,img_move_l,txt_move_l,img_move_r,txt_move_r,img_shoot,txt_shoot];
	}
	
}