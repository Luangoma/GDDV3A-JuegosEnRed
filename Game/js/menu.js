class MainMenu extends DragonScene
{
	menuBackground = {};
	botonJugar = {};
	botonAjustes = {};
	botonCreditos = {};
	botonSalir = {};
	
	preload()
	{
		//Precarga imagen background y botones svg.
		this.load.image('menuBackground', 'assets/menu_background.png');
		preloadButtonData(this);
	}
	
	create()
	{
		enableSound(this);
		
		//VERY IMPORTANT TODO: Fix the buttons being clickable during loading screen!
		this.setFinishedLoading(false);
		console.log("MENU HAS BEEN LOADED");
		//Creación imagen background y botones svg.
		this.menuBackground = this.add.image(0,0, 'menuBackground').setOrigin(0,0).setDisplaySize(config.width,config.height);
		let first_button_height = 60;
		let button_separation = 60;
		//this.botonJugar    = this.add.image(config.width/5, first_button_height + button_separation * 0, 'botonJugar').setScale(0.5);
		//this.botonAjustes  = this.add.image(config.width/5, first_button_height + button_separation * 1, 'botonAjustes').setScale(0.5);
		//this.botonCreditos = this.add.image(config.width/5, first_button_height + button_separation * 2, 'botonCreditos').setScale(0.5);
		//this.botonSalir    = this.add.image(config.width/5, first_button_height + button_separation * 3, 'botonSalir').setScale(0.5);
		
		this.botonJugar    = new Button(this,config.width/5, first_button_height + button_separation * 0, "Jugar");
		this.botonAjustes  = new Button(this,config.width/5, first_button_height + button_separation * 1, "Ajustes");
		this.botonCreditos = new Button(this,config.width/5, first_button_height + button_separation * 2, "Créditos");
		this.botonSalir    = new Button(this,config.width/5, first_button_height + button_separation * 3, "Salir");
		
		//Interacción con los botones.
		this.botonJugar.setButtonFunction(function(){
			console.log("Botón jugar pulsado");
			game.scene.stop('MainMenu');
			game.scene.start("LoadMap1");
		});
		
		this.botonCreditos.setButtonFunction(function(){
			console.log("Botón créditos pulsado");
			game.scene.stop('MainMenu');
			game.scene.start("Credits");
		});
		
		this.botonAjustes.setButtonFunction(function(){
			console.log("Botón ajustes pulsado");
		});
		
		this.botonSalir.setButtonFunction(function(){
			console.log("Botón salir pulsado");
			window.open('','_parent','');
			window.close();
		});
		
		this.setFinishedLoading(true);
		
		
		this.botonJugar.setCanBePressed(true);
		this.botonAjustes.setCanBePressed(true);
		this.botonCreditos.setCanBePressed(true);
		this.botonSalir.setCanBePressed(true);
		
		
	}
	
	update(time,delta)
	{
		//console.log("menu");
	}
	
	shutdown()
	{
		super.shutdown();
	}
	
	destroy()
	{
		this.menuBackground = {};
		this.botonJugar = {};
		this.botonAjustes = {};
		this.botonCreditos = {};
		this.botonSalir = {};
		super.destroy();
	}
};