//The name of this class maybe isn't the best to reflect what it exactly does. This is the class responsible for displaying the serverbrowser, aka, display the lobbies from the server.
//in short, this class should actually be renamed to LobbyListMenu or LobbiesMenu or something like that.
class OnlineMenu extends DragonScene
{
	button_create_lobby = {};
	button_refresh = {};
	button_back = {};
	
	background = {};
	list_background = {};
	title = {};
	
	lobbies = [];
	
	paged_menu = {};
	
	preload()
	{
		this.load.image('menuBackgroundBlurry', 'assets/menu_background_blurry.jpg');
		this.load.image('lobby_list_background', "./assets/LobbyListBackground.png");
		preloadPagedMenuData(this);
	}
	
	create()
	{
		//Good old JS hack, yet again.
		let that = this;
		
		//reset lobbies list when the scene is started.
		this.lobbies = [];
		
		//background images
		this.background = this.add.image(0,0,'menuBackgroundBlurry').setOrigin(0).setDisplaySize(config.width, config.height);
		
		//title text
		this.title = this.add.text(config.width/2, 5, 'Lista de Salas', styleText_AncientFont_90).setOrigin(.5,0).setScale(0.8);
		
		
		//paged menu for displaying lobbies.
		this.paged_menu = new PagedMenu(this,config.width/2,config.height/2,10,'lobby_list_background');
		this.paged_menu.background_image.displayHeight -= 100;
		
		this.paged_menu.object_creation_function = function(scene, data_list, obj_list, index, global_index){
			
			let currentButton = new Button(that, 200, 150 + 30 * index, "Unirse");
			currentButton.setButtonFunction(function(){
				console.log("Unirse no configurado");
			});
			currentButton.setCanBePressed(true);
			
			let current_obj = {
				text: scene.add.text(100, 150 + 30 * index, " ", styleText_MedievalPixel_30).setOrigin(0.5),
				button: currentButton
			};
			
			obj_list.push(current_obj);
		};
		
		this.paged_menu.object_reset_function = function(scene, data_list, obj_list, index, global_index){
			obj_list[index].text.setText(" ");
			obj_list[index].button.setVisible(false);
		};
		
		this.paged_menu.object_update_function = function(scene, data_list, obj_list, index, global_index){
			
			console.log("updating the element: " + index);
			obj_list[index].text.setText("lobby: " + data_list[global_index].lobbyId /*+ " [" + data_list[global_index].playerSlots[0] + "] | [" + data_list[global_index].playerSlots[1] + "]"*/);
			obj_list[index].button.setVisible(true);
			obj_list[index].button.setButtonFunction(function(){
				let current_lobby_id = data_list[global_index].lobbyId;
				console.log("Unirse al lobby : " + current_lobby_id);
				that.joinLobby(current_lobby_id);
			});
		};
		
		this.paged_menu.create_objects();
		
		
		//get a list of the lobbies as soon as the "serverbrowser" scene is loaded.
		this.getLobbies();
		
		
		//buttons
		let buttons_height = config.height - 40;
		
		this.button_create_lobby = new Button(this, config.width/4 - 50, buttons_height, "Crear");
		this.button_create_lobby.setButtonFunction(function(){
			console.log("Create a new lobby.");
		});
		this.button_create_lobby.setCanBePressed(true);
		
		this.button_refresh = new Button(this, config.width/2, buttons_height, "Refrescar");
		this.button_refresh.setButtonFunction(function(){
			console.log("Refreshing the lobby list.");
			that.getLobbies();
		});
		this.button_refresh.setCanBePressed(true);
		
		this.button_back = new Button(this, config.width - config.width/4 + 50, buttons_height, "Volver");
		this.button_back.setButtonFunction(function(){
			console.log("Returning from the lobby list.");
			game.scene.stop("OnlineMenu");
			game.scene.start("PlayMenu");
		});
		this.button_back.setCanBePressed(true);
		
	}
	
	getLobbies()
	{
		let that = this;
		$.ajax({
			url: ip.http + "/lobbies",
			method: 'GET',
			contentType: 'application/json',
			success: function(data){
				that.lobbies = data;
				that.paged_menu.update_info(that.lobbies);
			},
			error: function(xhr, status, error){
				console.log("Error happened when trying to obtain list of lobbies!");
				that.lobbies = [];
				that.paged_menu.update_info(that.lobbies);
			}
		});
	}
	
	joinLobby(id)
	{
		console.log("joining lobby: " + id);
		
		//stop the current scene
		game.scene.stop("OnlineMenu");
		
		//configure the connection type to make use of a direct connection to the chosen lobby with the specified ID
		connection.event_on_open = function(){ //open function
			connection.joinLobby(id);
		};
		
		//load the lobby scene
		game.scene.start("LobbyScene");
	}
}