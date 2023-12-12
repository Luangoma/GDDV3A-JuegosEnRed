class Tutorial extends DragonScene
{
	background = {};
	botonSalir = {};
	
	preload()
	{
		this.load.image('tutorial_background', './assets/tutorial/generic_tutorial_slide.png');
	}
	
	create()
	{
		enableSound(this);
		
		this.background = this.add.image(0,0,'tutorial_background').setOrigin(0,0);
		
		this.botonSalir = new Button(this, config.width - 150, config.height - 50, "Volver");
		this.botonSalir.setButtonFunction(function(){
			game.scene.stop("Tutorial");
			game.scene.start("MainMenu");
		});
		this.botonSalir.setCanBePressed(true);
		
	}
	
	
}