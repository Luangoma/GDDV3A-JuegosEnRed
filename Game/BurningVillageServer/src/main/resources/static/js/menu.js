class MainMenu extends DragonScene
{
	menuBackground = {};
	menuTitleCard = {};
	
	botonTutorial = {};
	botonCuenta = {};
	botonJugar = {};
	botonAjustes = {};
	botonCreditos = {};
	botonSalir = {};
	
	preload()
	{
		//Precarga imagen background y botones svg.
		this.load.image('menuBackground', 'assets/menu_background.png');
		this.load.image('game_title', './assets/GameTitle.png');
		preloadButtonData(this);
	}
	
	create()
	{
		enableSound(this);
		
		//VERY IMPORTANT TODO: Fix the buttons being clickable during loading screen!
		this.setFinishedLoading(false);
		console.log("MENU HAS BEEN LOADED");
		//Creación imagen background
		this.menuBackground = this.add.image(0,0, 'menuBackground').setOrigin(0,0).setDisplaySize(config.width,config.height);
		let first_button_height = 200;
		let button_separation = 60;
		
		//Create the title card
		this.menuTitleCard = this.add.image(config.width/2, first_button_height/2, 'game_title');
		
		//Create buttons
		this.botonTutorial = new Button(this,config.width/2, first_button_height + button_separation * 0, "Tutorial");
		this.botonCuenta   = new Button(this,config.width/2, first_button_height + button_separation * 1, "Cuenta");
		this.botonJugar    = new Button(this,config.width/2, first_button_height + button_separation * 2, "Jugar");
		this.botonAjustes  = new Button(this,config.width/2, first_button_height + button_separation * 3, "Ajustes");
		this.botonCreditos = new Button(this,config.width/2, first_button_height + button_separation * 4, "Créditos");
		this.botonSalir    = new Button(this,config.width/2, first_button_height + button_separation * 5, "Salir");
		
		//Interacción con los botones.
		this.botonTutorial.setButtonFunction(function(){
			console.log("Botón tutorial pulsado");
			game.scene.stop('MainMenu');
			game.scene.start("Tutorial");
		});
		
		this.botonCuenta.setButtonFunction(function(){
			console.log("Botón cuenta pulsado");
			game.scene.stop('MainMenu');
			game.scene.start("Registro");
		});
		
		this.botonJugar.setButtonFunction(function(){
			console.log("Botón jugar pulsado");
			game.scene.stop('MainMenu');
			game.scene.start("PlayMenu");
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
			//window.open('','_parent','');
			//window.close();
		});
		
		this.setFinishedLoading(true);
		
		
		this.botonTutorial.setCanBePressed(true);
		this.botonCuenta.setCanBePressed(true);
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