class PlayerListScene extends DragonScene
{
	background1 = {};
	background2 = {};
	
	titulo = {};
	subtitulo = {};
	
	playersList = [];
	playersTextList = [];
	playersLeftSqureList = [];
	playersBackgroundsList = [];
	playersAliveStatusList = [];
	users_per_page = 10;
	
	total_number_of_connected_users = 0;
	
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
		
		this.load.image('background_slice', './assets/progress_bar/progress_bar_default_middle.png');
		
		this.load.image('status_offline', './assets/online_status_square_offline.png');
		this.load.image('status_online', './assets/online_status_square_online.png');
	}
	
	create()
	{
		//good old javascript hack, episode 2.
		let that = this;
		
		//TODO: Add this starter initialization to a function that is ALSO called when quitting the scene. Should also do this in all other scenes that use lists and variables that must be killed.
		this.playersList = [];
		this.playersTextList = [];
		this.playersLeftSqureList = [];
		this.playersBackgroundsList = [];
		this.playersAliveStatusList = [];
		this.currentPage = 0;
		this.obtained_any_users = false;
		
		this.background1 = this.add.image(0,0,'menuBackgroundBlurry').setOrigin(0,0).setDisplaySize(config.width, config.height);
		this.background2 = this.add.image(config.width/2, config.height/2, 'pergamino').setDisplaySize(config.width - config.width/10, config.height - config.height/10);
		
		this.titulo = this.add.text(config.width/2, 60, 'Lista de Usuarios', styleText_AncientFont_90).setOrigin(.5,0).setScale(0.7);
		this.subtitulo = this.add.text(config.width/2, 120, "...", styleText_MedievalPixel_30).setOrigin(.5,0).setScale(1); //update the text in the set interval.
		
		//spawn the user text list on screen.
		this.makeUsersObjects();
		//get all the users on the server and update the text list.
		this.getAllUsers();
		
		
		
		//while we are in this page, check periodically if the users are online or not.
		var check_alive_users_interval = setInterval(function(){that.updateAliveUsers();}, 1000 * 0.5); //check every half a second.
		
		//Button to exit this scene menu
		this.botonSalir = new Button(this, /*config.width - 150*/ config.width/2, config.height - 50, "Volver");
		this.botonSalir.setButtonFunction(function(){
			//stop the interval
			clearInterval(check_alive_users_interval);
			//change the scene
			game.scene.stop("PlayerListScene");
			game.scene.start("SocialMenu");
		});
		this.botonSalir.setCanBePressed(true);
		
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
			//create the users backgrounds
			let currentBg = this.add.image(200,170 + 30 * i, 'background_slice').setOrigin(0,0);
			currentBg.displayHeight = 25;
			currentBg.displayWidth = 400;
			currentBg.setTint(i % 2 === 0 ? 0xFFFFFF : 0xAAAAAA);
			currentBg.visible = false;
			this.playersBackgroundsList.push(currentBg);
			
			//create the user texts
			let currentText = this.add.text(250, 170 + 30 * i, " ", styleText_MedievalPixel_30).setOrigin(0,0);
			this.playersTextList.push(currentText);
			
			//create the user left side interact squares
			let currentImage = this.add.image(200,170 + 30 * i, /*'stone_button'*/ 'status_offline').setOrigin(0,0).setScale(0.5);
			currentImage.visible = false;
			this.playersLeftSqureList.push(currentImage);
		}
	}
	
	//completely unused, remove plz lol
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
			this.playersBackgroundsList[i].visible = false;
		}
		
		//also reset the active users list to prevent carrying on the status colors from one page to the next for a split second.
		this.playersAliveStatusList = [];
	}
	
	getUsersToDisplay()
	{
		//if the list is empty, then we cannot display any users.
		if(this.playersList.length === 0)
		{
			return 0;
		}
		
		//if the current page is the last page, then we need to display however many users are there on the last page.
		let users_on_last_page = Math.floor(this.playersList.length % this.users_per_page);
		if(this.currentPage === this.total_pages - 1 && users_on_last_page !== 0) //makes sure that it will properly display in the case that the last page is filled.
		{
			//number of users on last page
			return users_on_last_page;
		}
		
		//else, just return the total amount of users available per page.
		return this.users_per_page;
	}
	
	updateUsersObjects()
	{
		this.resetUsersObjects();
		if(!this.obtained_any_users || this.playersList.length === 0){
			return;
		}
		let users_to_display = this.getUsersToDisplay();
		console.log("-------Displaying " + users_to_display + " users on page " + this.currentPage + " (there are " + this.total_pages + " in total)");
		for(let i = 0; i < users_to_display; ++i)
		{
			this.playersTextList[i].setText(this.playersList[i + this.users_per_page * this.currentPage].username);
			this.playersLeftSqureList[i].visible = true;
			this.playersBackgroundsList[i].visible = true;
			//this.playersLeftSqureList[i].setTint(0xFFFFFF);
			this.playersLeftSqureList[i].setTexture('status_offline');
		}
	}
	
	
	updatePlayerCountText()
	{
		let str = '| usuarios totales: ' + this.playersList.length + ' | usuarios conectados: ' + this.total_number_of_connected_users + ' | ';
		this.subtitulo.setText(str);
	}
	
	updateAliveUsers()
	{
		
		this.updatePlayerCountText();
		
		let that = this;
		let users_to_display = this.getUsersToDisplay();
		
		//get the total amount of currently connected users in the server:
		$.ajax({
			url: ip.http + "/get_alive_count",
			method: 'GET',
			contentType: 'application/json',
			success: function(data){
				that.total_number_of_connected_users = data;
			},
			error: function(xhr, status, error){}
		});
		
		//check all the users through GET petitions and see if they are connected ("alive") or not.
		for(let i = 0; i < users_to_display; ++i){
			let idx = i;
			//let id = this.playersList[i].id;
			let id = this.playersList[i + this.users_per_page * this.currentPage].id;
			$.ajax({
				url: ip.http + '/is_alive/' + id,
				method: 'GET',
				contentType: 'application/json',
				success: function(data){
					console.log("user is alive? " + data);
					that.playersAliveStatusList[idx] = data;
				},
				error: function(xhr,status,error){}
			});
		}
		
		//early return if the list has been reset to prevent displaying the wrong colors.
		if(this.playersAliveStatusList.length === 0){
			return;
		}
		//update the squares with a green color if the user is connected.
		for(let i = 0; i < users_to_display; ++i){
			//old system that used tints
			//let chosen_color = this.playersAliveStatusList[i] ? 0x00FF00 : 0xFFFFFF;
			//console.log(chosen_color);
			//this.playersLeftSqureList[i].setTint(chosen_color);
			
			//current system uses textures
			let chosen_status_image = this.playersAliveStatusList[i] ? 'status_online' : 'status_offline';
			this.playersLeftSqureList[i].setTexture(chosen_status_image);
			
		}
	}
	
}