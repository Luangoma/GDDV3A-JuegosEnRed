class MainMenu extends DragonScene
{
	menuBackground = {};
	menuTitleCard = {};
	
	botonTutorial = {};
	botonCuenta = {};
	botonSocial = {};
	botonJugar = {};
	botonAjustes = {};
	botonCreditos = {};
	//botonSalir = {}; //deprecated because modern browsers don't let us close the current tab with in page scripts due to security reasons...
	
	preload()
	{
		//Precarga imagen background y botones svg.
		this.load.image('menuBackground', 'assets/menu_background.png');
		this.load.image('game_title', './assets/GameTitle.png');
		preloadButtonData(this);
	}
	
	create()
	{
		stopSound(this);
		enableSound(this);
		disableInput(this);
		
		//Good old JS hack, I lost the count...
		let that = this;
		
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
		/* old button coords (single column menu)
		this.botonTutorial = new Button(this,config.width/2, first_button_height + button_separation * 0, "Tutorial");
		this.botonCuenta   = new Button(this,config.width/2, first_button_height + button_separation * 1, "Cuenta");
		this.botonSocial   = new Button(this,config.width/2, first_button_height + button_separation * 2, "Social");
		this.botonJugar    = new Button(this,config.width/2, first_button_height + button_separation * 3, "Jugar");
		this.botonAjustes  = new Button(this,config.width/2, first_button_height + button_separation * 4, "Ajustes");
		this.botonCreditos = new Button(this,config.width/2, first_button_height + button_separation * 5, "Créditos");
		this.botonSalir    = new Button(this,config.width/2, first_button_height + button_separation * 6, "Salir");
		*/
		
		//Left button Col (gameplay related)
		this.botonTutorial = new Button(this,config.width/4, first_button_height + button_separation * 1, "Tutorial");
		this.botonJugar    = new Button(this,config.width/4, first_button_height + button_separation * 2, "Jugar");
		this.botonAjustes  = new Button(this,config.width/4, first_button_height + button_separation * 3, "Ajustes");
		
		//Right button Col (account/social related)
		this.botonCuenta   = new Button(this, config.width - config.width/4, first_button_height + button_separation * 1, "Cuenta");
		this.botonSocial   = new Button(this, config.width - config.width/4, first_button_height + button_separation * 2, "Social");
		this.botonCreditos = new Button(this, config.width - config.width/4, first_button_height + button_separation * 3, "Créditos");
		
		//Interacción con los botones.
		this.botonTutorial.setButtonFunction(function(){
			console.log("Botón tutorial pulsado");
			game.scene.stop('MainMenu');
			game.scene.start("Tutorial");
		});
		
		this.botonCuenta.setButtonFunction(function(){
			console.log("Botón cuenta pulsado");
			game.scene.stop('MainMenu');
			game.scene.start("AccountMenu");
		});
		
		this.botonSocial.setButtonFunction(function(){
			console.log("Botón comunidad pulsado");
			game.scene.stop('MainMenu');
			game.scene.start("SocialMenu");
		});
		
		this.botonJugar.setButtonFunction(function(){
			console.log("Botón jugar pulsado");
			game.scene.stop('MainMenu');
			//game.scene.start( localUser.isLogged() ? "PlayMenu" : "MP_WarningScene");
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
		/*
		this.botonSalir.setButtonFunction(function(){
			console.log("Botón salir pulsado");
			//window.open('','_parent','');
			//window.close();
			//toggleFullScreen(that);
		});
		*/
		this.setFinishedLoading(true);
		
		
		this.botonTutorial.setCanBePressed(true);
		this.botonCuenta.setCanBePressed(true);
		this.botonSocial.setCanBePressed(true);
		this.botonJugar.setCanBePressed(true);
		this.botonAjustes.setCanBePressed(true);
		this.botonCreditos.setCanBePressed(true);
		//this.botonSalir.setCanBePressed(true);
		
		
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