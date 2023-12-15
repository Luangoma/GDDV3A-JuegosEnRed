class PlayerListScene extends DragonScene
{
	background1 = {};
	background2 = {};
	
	titulo = {};
	
	playersList = [];
	playersTextList = [];
	playersLeftSqureList = [];
	users_per_page = 10;
	
	botonSalir = {};
	
	currentPage = 0;
	
	button_left = {};
	button_right = {};
	
	obtained_any_users = false;
	total_pages = 0;
	
	preload()
	{
		this.load.image('menuBackgroundBlurry', './assets/menu_background_blurry.jpg');
		this.load.image('pergamino', './assets/player_list_papyrus.png');
		this.load.image('stone_button', './assets/StoneButton01.png');
		this.load.image('stone_button_right', './assets/StoneButton02.png');
		this.load.image('stone_button_left', './assets/StoneButton03.png');
	}
	
	create()
	{
		//TODO: Add this starter initialization to a function that is ALSO called when quitting the scene. Should also do this in all other scenes that use lists and variables that must be killed.
		this.playersList = [];
		this.playersTextList = [];
		this.playersLeftSqureList = [];
		this.currentPage = 0;
		this.obtained_any_users = false;
		
		this.background1 = this.add.image(0,0,'menuBackgroundBlurry').setOrigin(0,0).setDisplaySize(config.width, config.height);
		this.background2 = this.add.image(config.width/2, config.height/2, 'pergamino').setDisplaySize(config.width - config.width/10, config.height - config.height/10);
		
		this.titulo = this.add.text(config.width/2, 80, 'Lista de Usuarios', styleText_AncientFont_90).setOrigin(.5,0).setScale(0.7);
		
		//spawn the user text list on screen.
		this.makeUsersObjects();
		//get all the users on the server and update the text list.
		this.getAllUsers();
		
		this.botonSalir = new Button(this, config.width - 150, config.height - 50, "Volver");
		this.botonSalir.setButtonFunction(function(){
			game.scene.stop("PlayerListScene");
			game.scene.start("SocialMenu");
		});
		this.botonSalir.setCanBePressed(true);
		
		let that = this;
		//move one page to the left
		this.button_left = new Button(this, 64, config.height/2, "", 'stone_button_left');
		this.button_left.setButtonFunction(function(){
			if(!that.obtained_any_users){
				return;
			}
			that.currentPage = clampValue(that.currentPage - 1, 0, that.total_pages - 1);
			that.updateUsersObjects();
		});
		this.button_left.setCanBePressed(true);
		
		//move one page to the right
		this.button_right = new Button(this, config.width - 64, config.height/2, "", 'stone_button_right');
		this.button_right.setButtonFunction(function(){
			if(!that.obtained_any_users){
				return;
			}
			that.currentPage = clampValue(that.currentPage + 1, 0, that.total_pages - 1);
			that.updateUsersObjects();
		});
		this.button_right.setCanBePressed(true);
	}
	
	getAllUsers()
	{
		let that = this;
		$.ajax({
			url: ip.http + "/users",
			method: 'GET',
			contentType: 'application/json',
			success: function(data){
				console.log("Obtained the list of players currenly registered in the server.");
				console.log(data);
				
				that.playersList = data;
				that.obtained_any_users = true;
				that.total_pages = Math.ceil(that.playersList.length / that.users_per_page);
				that.updateUsersObjects();
			},
			error: function(xhr, status, error){
				console.log("There was an error retrieving the users list.");
				
				that.playersList = [];
				that.obtained_any_users = false;
				that.total_pages = 0;
				that.updateUsersObjects();
				
				//Stuff that only exists for offline debugging:
				/*
				that.playersList = [{username: "usr1"},{username: "usr2"},{username: "usr3"},{username: "usr4"}];
				that.obtained_any_users = true;
				that.total_pages = Math.ceil(that.playersList.length / that.users_per_page);
				that.updateUsersObjects();
				*/
			}
		});
	}
	
	makeUsersObjects()
	{
		for(let i = 0; i < this.users_per_page; ++i)
		{
			let currentText = this.add.text(250, 170 + 30 * i, " ", styleText_MedievalPixel_30).setOrigin(0,0);
			this.playersTextList.push(currentText);
			
			let currentImage = this.add.image(200,170 + 30 * i, 'stone_button').setOrigin(0,0).setScale(0.5);
			currentImage.visible = false;
			this.playersLeftSqureList.push(currentImage);
		}
	}
	
	makeUsersDots()
	{
		for(let i = 0; i < this.users_per_page; ++i)
		{
			let currentImage = this.add.image(200,170 + 30 * i, 'stone_button').setOrigin(0,0).setScale(0.5);
		}
	}
	
	resetUsersObjects()
	{
		for(let i = 0; i < this.users_per_page; ++i)
		{
			this.playersTextList[i].setText(" ");
			this.playersLeftSqureList[i].visible = false;
		}
	}
	
	updateUsersObjects()
	{
		this.resetUsersObjects();
		if(!this.obtained_any_users || this.playersList.length === 0){
			return;
		}
		let users_to_display = this.currentPage === this.total_pages - 1 ? Math.floor(this.playersList.length % this.users_per_page) : this.users_per_page;
		console.log("-------Displaying " + users_to_display + " users on page " + this.currentPage + " (there are " + this.total_pages + " in total)");
		for(let i = 0; i < users_to_display; ++i)
		{
			this.playersTextList[i].setText(this.playersList[i + this.users_per_page * this.currentPage].username);
			this.playersLeftSqureList[i].visible = true;
		}
	}
}