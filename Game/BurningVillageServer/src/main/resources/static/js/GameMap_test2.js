class GameMap extends DragonScene
{
	flames = {};
	
	houses = [];
	tiles = [];
	decor = [];
	
	num_houses = 60;
	num_decor = 30;
	
	onlineInterval = null;
	
	preload()
	{
		this.load.image("world_grass","assets/WorldGrass.png");
	}
	
	create()
	{
		enableSound(this);
		enableInput(this);
		connection.removeCallbacks();
		
		this.setFinishedLoading(false);
		
		setWorldBounds(this,0,0,world_width,world_height);
		
		//this.spawnWorld();
		//this.generateWorld();
		//this.spawnPlayers();
		
		//if the multiplayer mode is online, start the online logic.
		//this.startOnlineLogic();
		
		this.initGameData();
		
		this.setFinishedLoading(true);
		
		gameTime.startTimer();
	}
	
	spawnPlayers()
	{
		//Spawn the dragon players
		players[0] = new Dragon(this, 0, 1024, 1024, this.flames);
		players[1] = new Dragon(this, 1, 800, 800, this.flames);
		
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
	
	startOnlineLogic()
	{
		//good old JS hack
		let that = this;
		
		//reset the interval variable value to null before doing anything with it so that we can automatically not do anything in the stopOnlineLogic function when the online mode fails for some reason.
		this.onlineInterval = null;
		
		//if the multiplayer mode is set to online AND the socket connection is open, proceed with the online multiplayer logic, which entails starting the messaging interval
		if(this.isOnline() && this.isConnected())
		{
			//generate online world data
			this.onlineWorldData();
			
			//set up an interval that will send information to the server every X ms while the match is active
			this.onlineInterval = setInterval(function(){
				//get the current player and use that to get the data to be sent
				console.log("sending data to the server...");
				
				//if there are any players, send the data of this client's player
				if(players.length > 0)
				{
					let x = players[0].sprite.x;
					let y = players[0].sprite.y;
					let rot = players[0].sprite.angle;
					let health = players[0].health;
					let time = gameTime.currentTime;
					let shooting = players[0].isShooting;
					let score = players[0].points;
					
					connection.sendData(x,y,rot,health,time,score,shooting);
				}
				
			}, 20); //use 20 ms, as most games send packets this often, if not faster.
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
		
	}
	
	shutdown()
	{
		//nothing
	}
	
	destroy()
	{
		//nothing
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
	}
	
	configureOnline()
	{
		//if the game is in online mode, then proceed to configuring the online mode.
		if(this.isOnline() && this.isConnected())
		{
			//configure the connection callbacks so that we can properly manage the incoming data messages
			connection.setCallbacks(
				function(){
					//open
				},
				function(){
					//close
				},
				function(msg){
					
					if(msg.actionType && msg.actionType === "forward-data") //the received data corresponds to world data (map, houses, tiles, etc...)
					{
						createTilesFromList(that, that.houses, msg.houses);
					}
					else //the received data corresponds to player and lobby data (player position, health, scores, etc...)
					{
						//message: update the other player character's information on this client with the data received from the server.
						//console.log(msg); //this spams a lot in the console, so enable at your own risk
						
						//pick the information from the player that has a playerID different from ours. (NOTE: Player ID is NOT the same as User ID)
						//TODO: modify this in the future so that it can actually work with N player lobbies, because right now we assume that every single entry we find that does not match the client's own connection's playerID will be players[1], which is not correct for lobbies with more than 2 players.
						for(let i = 0; i < msg.players.length; ++i)
						{
							if(msg.players[i].playerId !== connection.lobbyInfo.playerId)
							{
								let current_player = msg.players[i];
								
								//if the players have been generated, then proceed
								if(players.length > 0 && players[1])
								{
									let lerp_value = 0.5;
									
									players[1].sprite.x = lerpValue(players[1].sprite.x, current_player.position.x, lerp_value);
									players[1].sprite.y = lerpValue(players[1].sprite.y, current_player.position.y, lerp_value);
									players[1].sprite.angle = lerpValue(players[1].sprite.angle, current_player.rotation, lerp_value);
									players[1].health = current_player.health;
									//playyers[1].somethingsomething = .....???? basically, for now, ignore time sync, as the setInterval does a pretty good job out of the box
									players[1].isShooting = current_player.isShooting;
									players[1].points = current_player.score;
								}
							}
						}
					}
					
				},
				function(e){
					//error
				}
			);
		}
	}
	
	initGameData()
	{
		//reset the game data first
		this.resetGameData();
		
		//if the game mode is online, then configure the connection callbacks
		this.configureOnline();
		
		//generate the parts of the world that this client has to generate
		this.spawnWorld();
		
		//spawn the players
		this.spawnPlayers();
		
		//start online logic
		this.startOnlineLogic();
		
	}
	
	finishGame()
	{
		//Finish the game. This implies stopping the game timer, stopping this scene and loading the game over scene.
		console.log("GAME OVER (Scene \"" + this.scene.key + "\" has been unloaded...)");
		
		//stop the timer
		gameTime.stopTimer();
		
		//if the multiplayer mode is online, stop the online logic.
		this.stopOnlineLogic();
		
		//reset the game data again once the game is finished
		this.resetGameData();
		
		//stop the game scene and ui scene and then load the game over scene
		game.scene.stop(this.scene.key); //By using this, we automatically get the key from this scene, meaning we no longer hard code stopping this scene by its configured name.
		game.scene.stop("ui");
		game.scene.start("game_over");
	}
	
	generateBackground()
	{
		createTiles(this, this.tiles, ['grass_tile_1']);
		createDecor(this,this.decor,['decor_stones_01', 'decor_stones_02', 'decor_stones_03'], this.num_decor);
	}
	
	generateWorld()
	{
		//TODO: Add support for different world gen types (desert, other biomes, etc...)
		this.houses = [];
		this.tiles = [];
		this.flames = {};
		
		this.add.image(0, 0, 'world_grass').setOrigin(0,0).setScale(2); //this is actualy NOT needed lol, and as it is, could leak if called multiple times during the same match.
		
		this.flames = createPhysicsGroup(this);
		
		this.generateBackground();
		createHouses(this, this.tiles, this.houses, this.flames, this.num_houses);
		
		let castle_x = getRandomInRangeInt(0,world_tiles_width - 6); //take away 6 due to castle lenght
		let castle_y = getRandomInRangeInt(0,world_tiles_height - 6);
		createCastle(this,this.tiles,this.houses,this.flames,castle_x,castle_y);
		console.log("castle spawned at : " + castle_x + "," + castle_y);
	}
	
	spawnWorld()
	{
		if(!(this.isOnline() && this.isConnected()))
		{
			//generate the world from 0 if the client is playing local multiplayer. Otherwise, don't do anything yet.
			this.generateWorld();
		}
	}
	
	onlineWorldData()
	{
		if(!(this.isOnline() && this.isConnected())){
			return; //early return if the online connection does not exist.
		}
		
		//if the client is playing online multiplayer, determine wether to only generate the background and decor or to generate the whole world.
		
		//as an heuristic, the player with the smallest player ID will be the one that gets to generate the world (basically, the first player to have joined the lobby will be the one in charge of generating the world and telling the other players what the world looks like)
		
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
		
		//if the smallest ID is the same as the self ID, generate the world, else, generate only the background stuff.
		if(smallest_id === self_id)
		{
			this.generateWorld();
			
			//create the JSON object to be sent through the network
			let obj = {
				actionType: 'forward-data',
				houses: []
			};
			
			//obtained the generated data and assign it to the JSON object
			obj.houses = this.obtainWorldDataArray();
			
			//send the data to the other clients
			connection.sendObject(obj);
		}
		else
		{
			this.generateBackground();
			//then, the rest of the world will be generated once the message with the world data is received, so we do nothing else in here for now.
		}
	}
	
	obtainWorldDataArray()
	{
		let ans = [];
		for(let i = 0; i < this.houses.length; ++i)
		{
			let current_house = this.houses[i];
			let current_tile_obj = {
				x: current_house.start_x,
				y: current_house.start_y,
				is_destructible: true,
				tiles: current_house.tiles
			};
			ans.push(current_tile_obj);
		}
		return ans;
	}
};
