class map_test_multiplayer extends DragonScene
{
	
	flames = {};
	houses = [];
	tiles = [];
	decor = [];
	num_houses = 60;
	bar;
	
	preload()
	{
		this.load.image("world_grass","assets/WorldGrass.png");
	}
	
	create()
	{
		connection.connect();

		enableSound(this);
		enableInput(this);
		
		this.setFinishedLoading(false);
		
		setWorldBounds(this,0,0,world_width,world_height);
		
		this.houses = [];
		this.tiles = [];
		this.flames = {};
		
		this.add.image(0, 0, 'world_grass').setOrigin(0,0).setScale(2);
		
		this.flames = createPhysicsGroup(this);
		
		createTiles(this, this.tiles, ['grass_tile_1']);
		//createTiles(this, this.decor, ['decor_stones_01', 'decor_stones_02', 'decor_stones_01']);
		createDecor(this,this.decor,['decor_stones_01', 'decor_stones_02', 'decor_stones_03'], 30);
		createHouses(this, this.tiles, this.houses, this.flames, this.num_houses);
		
		let castle_x = getRandomInRangeInt(0,world_tiles_width - 6); //take away 6 due to castle lenght
		let castle_y = getRandomInRangeInt(0,world_tiles_height - 6);
		createCastle(this,this.tiles,this.houses,this.flames,castle_x,castle_y);
		console.log("castle spawned at : " + castle_x + "," + castle_y);
		
		player1 = new Dragon(this, 0, 1024, 1024, this.flames);
		player2 = new Dragon(this, 1, 800, 800, this.flames);
		
		addCamera(this,player1,player2,gameConfig.multiplayerType, gameConfig.screenSplitType);
		
		// Se hace launch para que la escena UI corra de forma simultánea a esta escena (map1).
		// Si se hace launch en game.js no funciona.
		this.scene.launch("ui");
		
		this.setFinishedLoading(true);
	}
	
	update(time, delta)
	{
		player1.update(time, delta);
		player2.update(time, delta);
		
		for(let i = 0; i < this.houses.length; ++i)
		{
			this.houses[i].update(time, delta);
		}

		//MANDAR INFORMACIÓN POR WEBSOCKET
		if(connection.isConnected()){
			console.log("Mensaje enviado desde el update()");
			//connection.send("HI");
			connection.send(JSON.stringify({
				'actionType': 'send-data',
				'playerId': '1',
				'lobbyId': '9',
				'positionX': '8',
				'positionY': '9'
				//'shootingFlames': ,
				//'rivalHealth':
			}));
			//Enviar si el dragón está disparando.
		}
		
		//console.log("p1: " + player1.points + ", p2: " + player2.points);
	}
	
	shutdown()
	{
		console.log("THE SCENE HAS BEEN SHUT DOWN!!!");
		//super.shutdown(); //this crashes because the parent actually does not have such a function... and Phaser.Scene apparently doesn't have one of these either...? ok, thanks for the faulty documentation? good old phaser and their crappy docs that contain information that is wrong (for example the false promise that shutdown is meant to be called automatically, despite the years worth of reports saying that it doesn't work for shit...) So basically, once we implement our own loadScene and stopScene functions, be careful when calling shutdown and destroy. Make sure they exist with a check, something like if(target_scene.shutdown){target_scene.shutdown();} etc...
	}
	
	destroy()
	{
		player1 = null;
		player2 = null;
		houses = [];
		tiles = [];
		super.destroy();
	}
	
};
