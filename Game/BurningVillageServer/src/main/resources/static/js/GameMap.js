class GameMap extends DragonScene
{
	flames = {};
	
	houses = [];
	tiles = [];
	decor = [];
	
	num_houses = 60;
	num_decor = 30;
	
	onlineInterval = null;
	
	has_generated_world = false;
	
	game_has_finished = false;
	
	world_obj = null;
	
	preload()
	{
		this.load.image("world_grass","assets/WorldGrass.png");
	}
	
	create()
	{
		this.setFinishedLoading(false);
		
		this.generateGameData();
		
		//if the multiplayer mode is online, start the online logic.
		this.startOnlineLogic();
		
		this.setFinishedLoading(true);
		
		gameTime.startTimer();
	}
	
	//resets all of the game data, including the players data and tiles data
	resetGameData()
	{
		players = [];
		this.flames = {};
		this.houses = [];
		this.tiles = [];
		this.decor = [];
		this.onlineInterval = null;
		this.has_generated_world = false;
		this.game_has_finished = false;
		this.world_obj = null;
	}
	
	generateGameData()
	{
		stopSound(this);
		enableSound(this);
		enableInput(this);
		
		connection.removeCallbacks();
		this.resetGameData(); //reset the game data every time we start a new match before creating anything new
		
		setWorldBounds(this,0,0,world_width,world_height);
		
		this.generateWorld();
		//do not generate the players yet, wait for network message to confirm player generation, see the "handleWorldData" function for more details.
	}
	
	spawnPlayers()
	{
		//starting values for the dragon ids
		let self_id  = 0;
		let other_id = 1;
		
		//if playing an online match, change the dragon ids according to the order in which the players joined the lobby, otherwise, keep the default values for single player.
		if(this.isOnline())
		{
			//Note: Red dragon has id 0, and blue dragon has id 1. Assign the dragon id (originally called player_id, not to be confused with the real player id variable playerId) based on wether they are the lobby leader or not.
			self_id  = this.isLobbyLeader() ? 0 : 1;
			other_id = this.isLobbyLeader() ? 1 : 0;
		}
		
		//choose random x and y coords for both dragon characters
		let p0x = getRandomInRangeInt(0, (world_tiles_width  - 1) * world_tile_size);
		let p0y = getRandomInRangeInt(0, (world_tiles_height - 1) * world_tile_size);
		let p1x = getRandomInRangeInt(0, (world_tiles_width  - 1) * world_tile_size);
		let p1y = getRandomInRangeInt(0, (world_tiles_height - 1) * world_tile_size);
		
		//Spawn the dragon players
		players[0] = new Dragon(this, self_id  , p0x, p0y, this.flames);
		players[1] = new Dragon(this, other_id , p1x, p1y, this.flames);
		
		//set the default cosmetics for the dragons as the ones configured by the local client (will be overwritten in online mp by whatever each client has selected, will be kept in local mp so that both dragons will have the chosen cosmetics by the local player):
		players[0].setCosmeticBodyId(playerCosmetics.body);
		players[1].setCosmeticBodyId(playerCosmetics.body);
		
		//add the camera (which depends on the game config and multiplayer type)
		addCamera(this,players[0],players[1],gameConfig.multiplayerType, gameConfig.screenSplitType);
		
		//add the UI
		this.scene.launch("ui");
	}
	
	isOnline()
	{
		return gameConfig.multiplayerType === MULTIPLAYER_TYPE.ONLINE;
	}
	
	isConnected()
	{
		return connection.isConnected();
	}
	
	handleClientData(msg)
	{
		//pick the information from the player that has a playerID different from ours. (NOTE: Player ID is NOT the same as User ID)
		//TODO: modify this in the future so that it can actually work with N player lobbies, because right now we assume that every single entry we find that does not match the client's own connection's playerID will be players[1], which is not correct for lobbies with more than 2 players.
		
		if(!msg.players || players.length === 0){
			return; //early return if the message does not contain the players data field.
		}
		
		for(let i = 0; i < msg.players.length; ++i)
		{
			let current_player = msg.players[i];
			
			if(msg.players[i].playerId !== connection.lobbyInfo.playerId)
			{	
				if(players[1])
				{
					let lerp_value = 0.5;
					
					players[1].sprite.x = lerpValue(players[1].sprite.x, current_player.position.x, lerp_value);
					players[1].sprite.y = lerpValue(players[1].sprite.y, current_player.position.y, lerp_value);
					players[1].sprite.angle = lerpValue(players[1].sprite.angle, current_player.rotation, lerp_value);
					players[1].health = current_player.health;
					//players[1].somethingsomething_timeywimeystuff = .....???? basically, for now, ignore time sync, as the setInterval does a pretty good job out of the box
					players[1].isShooting = current_player.isShooting;
					players[1].points = current_player.score;
					
					//store the name and ID of the remote client inside of the player entity that they are controlling.
					players[1].name = current_player.name;
					players[1].playerId = current_player.playerId;
					players[1].userId = current_player.userId;
					
					//update the cosmetics:
					players[1].setCosmeticBodyId(current_player.cosmeticBodyId);
				}
			}
			else
			{
				//kinda shitty way to do updates on self info but whatever.
				if(players[0])
				{
					players[0].name = current_player.name;
					players[0].playerId = current_player.playerId;
					players[0].userId = current_player.userId;
					
					players[0].setCosmeticBodyId(current_player.cosmeticBodyId);
				}
			}
		}
	}
	
	handleWorldData(msg)
	{
		if(msg.petition === "ask-for-world")
		{
			this.sendWorld();
		}
		else
		if(msg.houses && !this.has_generated_world)
		{
			console.log("supposedly i have generated the houses....................");
			createHousesFromShortList(this, this.tiles, this.houses, this.flames, msg.houses);
			this.spawnPlayers();
			this.has_generated_world = true;
		}
	}
	
	startOnlineLogic()
	{
		//Good old JS hack yet again...
		let that = this;
		
		//reset the interval variable value to null before doing anything with it so that we can automatically not do anything in the stopOnlineLogic function when the online mode fails for some reason.
		this.onlineInterval = null;
		
		//if the multiplayer mode is set to online AND the socket connection is open, proceed with the online multiplayer logic
		if(this.isOnline() && this.isConnected())
		{
			//Good old JS hack yet again...
			let that = this;
			
			//configure the connection callbacks so that we can properly manage the incoming data messages
			connection.setCallbacks(
				function(){
					//open
				},
				function(){
					//close
				},
				function(msg){
					//message: update the other player character's information on this client with the data received from the server.
					//console.log(msg); //this spams a lot in the console, so enable at your own risk
					
					that.handleClientData(msg);
					that.handleWorldData(msg);
					
				},
				function(e){
					//error
				}
			);
			
			//set up an interval that will send information to the server every X ms while the match is active
			this.onlineInterval = setInterval(function(){
				//get the current player and use that to get the data to be sent
				//console.log("sending data to the server..."); //lots of spam during mp, enable at your own risk.
				
				//ask for the world if the world has not been generated and we are not the lobby leaders
				if(!that.has_generated_world)
				{
					let obj = {
						actionType: 'forward-data',
						userId: localUser.user.id,
						petition: 'ask-for-world'
					};
					connection.sendObject(obj);
				}
				else
				if(players.length > 0) //only send the data if the players exist (this is done because the connection already starts data during the world sharing process)
				{
					let x = players[0].sprite.x;
					let y = players[0].sprite.y;
					let rot = players[0].sprite.angle;
					let health = players[0].health;
					let time = gameTime.currentTime;
					let shooting = players[0].isShooting;
					let score = players[0].points;
					let cosmetic_body = playerCosmetics.body;
					
					//console.log("Puntuación: "+score);
					connection.sendData(x,y,rot,health,time,score,shooting, cosmetic_body);
				}
				
			}, /*100*/ 20); //use 20 ms, as most games send packets this often, if not faster.
		}
	}
	
	stopOnlineLogic()
	{
		//if the multiplayer type is online, then stop the online interval, aka, stop sending information to the server
		if(this.isOnline() && this.onlineInterval)
		{
			//stop sending data to the server by clearing the interval
			clearInterval(this.onlineInterval);
			
			//close the socket connection
			connection.disconnect();
		}
	}
	
	update(time, delta)
	{
		//update the logic for all players
		for(let i = 0; i < players.length; ++i)
		{
			players[i].update(time, delta);
		}
		
		//update the logic for all houses / structures in the scene
		for(let i = 0; i < this.houses.length; ++i)
		{
			this.houses[i].update(time, delta);
		}
		
		
		//If the time has reached 0, then end the game.
		if(gameTime.timeHasFinished()){
			this.finishGame();
		}
		else //online only checks. Only perform if we know that the game has not finished, aka, if the time has not reached 0 yet, we still want to check for disconnections. This is done like this to prevent the second player from seeing the lobby host leaving when the game is over as an unintended disconnection.
		if(this.isOnline() && !this.game_has_finished && gameTime.currentTime > 1) //only enter the if statement's body if the match is in online mode AND if the game has not finished yet.
		{
			if(connection.lobbyInfo.players.length <= 1){
				//if the other player has left, finish the game, and notify the game over scene that the reason for finishing was that the other player left.
				//NOTE: if the other player leaves... aka, when only 1 player is left. This line of thinking will be useful when adding support for more than 2 players per lobby.
				this.finishGame("game_over", {reason: "other-left"});
			}
			else //this else is necessary, otherwise, the finishGame would cause the game to end with a connection-lost always.
			if(!connection.isConnected()){
				//if the connection has been lost, finish the game, and notify the game over scene that the reason for finishing was a connection loss (connection timed out).
				this.finishGame("game_over", {reason: "connection-lost"});
			}
		}
	}
	
	shutdown()
	{
		//nothing
	}
	
	destroy()
	{
		//nothing
	}
	
	finishGame(target_map = "game_over", data = {reason: "game-finished"})
	{
		//check if the game has already finished to prevent executing this function twice.
		if(this.game_has_finished){
			return; //early return to prevent executing the finishGame() function more than once in a row.
		}
		//set the game finished status
		this.game_has_finished = true;
		
		
		//Finish the game. This implies stopping the game timer, stopping this scene and loading the game over scene.
		console.log("GAME OVER (Scene \"" + this.scene.key + "\" has been unloaded...) (the key \"" + data.reason + "\" has been used to trigger the game over)");
		
		//stop the timer
		gameTime.stopTimer();
		
		//if the multiplayer mode is online, stop the online logic.
		this.stopOnlineLogic();
		
		//stop the scenes used during a game match (game scene, ui, pause menu and settings menu, etc...) and then load the game over scene
		game.scene.stop(this.scene.key); //By using this, we automatically get the key from this scene, meaning we no longer hard code stopping this scene by its configured name.
		game.scene.stop("ui");
		game.scene.stop("PauseMenu"); //even if these scenes are not currently loaded because the menus are not loaded, nothing happens when this is called, which is good for us. Simpler to implement.
		game.scene.stop("SettingsMenu");
		
		//finally, load and start the game over scene.
		game.scene.start(target_map, data);
	}
	
	//check if this client is the "host" / "lobby leader" (the host is actually the server, obviously, what we mean by this is to check whether this client is the one responsible for generating the world or not)
	//the "host" / "lobby leader" is the player with the smallest ID
	isLobbyLeader()
	{
		//find self player ID within this lobby
		let self_id = connection.lobbyInfo.playerId;
		
		//find smallest player ID within this lobby
		let smallest_id = connection.lobbyInfo.players[0].playerId;
		for(let i = 0; i < connection.lobbyInfo.players.length; ++i)
		{
			if(connection.lobbyInfo.players[i].playerId < smallest_id)
			{
				smallest_id = connection.lobbyInfo.players[i].playerId;
			}
		}
		
		return smallest_id === self_id;
	}
	
	generateWorld()
	{
		//TODO: Add support for different world gen types (desert, other biomes, etc...)
		this.houses = [];
		this.tiles = [];
		this.flames = {};
		
		this.add.image(0, 0, 'world_grass').setOrigin(0,0).setScale(2); //this is actualy NOT needed lol, and as it is, could leak if called multiple times during the same match.
		
		this.flames = createPhysicsGroup(this);
		
		createTiles(this, this.tiles, ['grass_tile_1']);
		//createTiles(this, this.decor, ['decor_stones_01', 'decor_stones_02', 'decor_stones_01']);
		createDecor(this,this.decor,['decor_stones_01', 'decor_stones_02', 'decor_stones_03'], this.num_decor);
		//createHouses(this, this.tiles, this.houses, this.flames, this.num_houses);
		
		//if the game mode is local multiplayer or if this client is the lobby leader, then generate the world
		if(!this.isOnline() || this.isLobbyLeader())
		{
			let that = this;
			
			let obj = {
				actionType: 'forward-data',
				userId: localUser.user.id,
				houses: generateTilesList()
			};
			
			//generate the houses
			generateHouseData(obj.houses, that.num_houses);
			
			//add the castle
			let castle_x = getRandomInRangeInt(0,world_tiles_width - 6); //take away 6 due to castle lenght
			let castle_y = getRandomInRangeInt(0,world_tiles_height - 6);
			createCastleData(obj.houses, castle_x, castle_y);
			console.log("castle spawned at : " + castle_x + "," + castle_y);
			
			console.log(obj.houses);
			
			//store the simplified list in the houses list from the network object to be sent
			obj.houses = generateShortTilesList(obj.houses);
			console.log(obj.houses);
			
			//if the client is online, then we already know that it is the lobby leader because of the previos check, so we then send the data of the generated world. The world will be generated when we get back a response from the server with the exact same message as a form of confirmation that the other clients got the message as well.
			if(this.isOnline())
			{
				//store the generated world obj, but do not generate it yet. Await response from remote client.
				this.world_obj = obj;
			}
			else
			{
				//create the houses from the short list
				createHousesFromShortList(this, this.tiles, this.houses, this.flames, obj.houses);
				
				//spawn the players
				this.spawnPlayers();
			}
		}
		
		//let castle_x = getRandomInRangeInt(0,world_tiles_width - 6); //take away 6 due to castle lenght
		//let castle_y = getRandomInRangeInt(0,world_tiles_height - 6);
		//createCastle(this,this.tiles,this.houses,this.flames,castle_x,castle_y);
		//console.log("castle spawned at : " + castle_x + "," + castle_y);
	}
	
	//send the world obj to the remote clients.
	sendWorld()
	{
		console.log("BEFORE SENDING WORLD DATA----------------------------------------------------");
		if(this.world_obj){
			connection.sendObject(this.world_obj);
		}
		console.log("AFTER SENDING WORLD DATA----------------------------------------------------");
	}
	
};