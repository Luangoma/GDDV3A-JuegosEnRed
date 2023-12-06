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
		this.load.svg('botonJugar', 'assets/botonJugar.svg');
		this.load.svg('botonSalir', 'assets/botonSalir.svg');
		this.load.svg('botonAjustes', 'assets/botonAjustes.svg');
		this.load.svg('botonCreditos', 'assets/botonCreditos.svg');
	}
	
	create()
	{
		//VERY IMPORTANT TODO: Fix the buttons being clickable during loading screen!
		this.setFinishedLoading(false);
		console.log("MENU HAS BEEN LOADED");
		//Creación imagen background y botones svg.
		this.menuBackground = this.add.image(0,0, 'menuBackground').setOrigin(0,0).setDisplaySize(config.width,config.height);
		let first_button_height = 60;
		let button_separation = 60;
		this.botonJugar    = this.add.image(config.width/5, first_button_height + button_separation * 0, 'botonJugar').setScale(0.5);
		this.botonAjustes  = this.add.image(config.width/5, first_button_height + button_separation * 1, 'botonAjustes').setScale(0.5);
		this.botonCreditos = this.add.image(config.width/5, first_button_height + button_separation * 2, 'botonCreditos').setScale(0.5);
		this.botonSalir    = this.add.image(config.width/5, first_button_height + button_separation * 3, 'botonSalir').setScale(0.5);
		var cosamierda = this.add.image(config.width/5, first_button_height + button_separation * 4, 'botonSalir').setScale(0.5);

		//Hacer los botones interactivos.
		this.botonJugar.setInteractive();
		this.botonCreditos.setInteractive();
		this.botonSalir.setInteractive();
		this.botonAjustes.setInteractive();

		//Interacción con los botones. //TODO: Add a custom button class with a generic background image and a "can be pressed / interacted" property that will be set to true once the scene has finished loading (set at the end of create) and then set to false again when going to another scene (maybe looping through some kind of button list? or simply keeping the scene disabling system we currently have, only that this time it would use something like this.scene.key to get the key of the this.scene scene from the button class object... etc etc...).
		this.botonJugar.on('pointerdown', function(pointer){
			console.log("Botón jugar pulsado");
			// Cambia la escena actual a la selecionada, en este caso, el mapa 1
			game.scene.stop('MainMenu');
			//game.scene.start("map_test_1");
			game.scene.start("LoadMap1");
		});
		this.botonCreditos.on('pointerdown', function(pointer){
			console.log("Botón créditos pulsado");
			// Cambia la escena actual a la selecionada, en este caso, los creditos
			game.scene.stop('MainMenu');
			game.scene.start("Credits");
		});
		this.botonAjustes.on('pointerdown', function(pointer){
			// Cambia la escena actual a la selecionada, en este caso, los ajustes (por crear)
			console.log("Botón ajustes pulsado");/**
			game.scene.stop('MainMenu');
			game.scene.start("Settings");//*/
		});
		this.botonSalir.on('pointerdown', function(pointer){
			console.log("Botón salir pulsado");
			// Salir del juego, en este caso, cerrar la pestaña
			window.open('','_parent','');
			window.close();
		});
		
		cosamierda.on('pointerdown', function(pointer){
			console.log("Botón cosamierda pulsado");
			
		});
		
		this.setFinishedLoading(true);
		
		var button_test = new Button(this,400,200);
		button_test.setCanBePressed(true);
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