class GameMap extends DragonScene
{
	flames = {};
	houses = [];
	tiles = [];
	decor = [];
	num_houses = 60;
	
	preload()
	{
		this.load.image("world_grass","assets/WorldGrass.png");
	}
	
	create()
	{
		enableSound(this);
		enableInput(this);
		
		this.setFinishedLoading(false);
		
		setWorldBounds(this,0,0,world_width,world_height);
		
		this.generateWorld();
		
		player1 = new Dragon(this, 0, 1024, 1024, this.flames);
		player2 = new Dragon(this, 1, 800, 800, this.flames);
		
		addCamera(this,player1,player2,gameConfig.multiplayerType, gameConfig.screenSplitType);
		
		// Se hace launch para que la escena UI corra de forma simultánea a esta escena (map1).
		// Si se hace launch en game.js no funciona.
		this.scene.launch("ui");
		
		this.setFinishedLoading(true);
		
		
		gameTime.startTimer();
		
	}
	
	update(time, delta)
	{
		player1.update(time, delta);
		player2.update(time, delta);
		
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
	
	finishGame()
	{
		//Finish the game. This implies stopping the game timer, stopping this scene and loading the game over scene.
		console.log("GAME OVER (Scene \"" + this.scene.key + "\" has been unloaded...)");
			
		//stop the timer
		gameTime.stopTimer();
		
		//stop the game scene and ui scene and then load the game over scene
		game.scene.stop(this.scene.key); //By using this, we automatically get the key from this scene, meaning we no longer hard code stopping this scene by its configured name.
		game.scene.stop("ui");
		game.scene.start("game_over");
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
		createDecor(this,this.decor,['decor_stones_01', 'decor_stones_02', 'decor_stones_03'], 30);
		createHouses(this, this.tiles, this.houses, this.flames, this.num_houses);
		
		let castle_x = getRandomInRangeInt(0,world_tiles_width - 6); //take away 6 due to castle lenght
		let castle_y = getRandomInRangeInt(0,world_tiles_height - 6);
		createCastle(this,this.tiles,this.houses,this.flames,castle_x,castle_y);
		console.log("castle spawned at : " + castle_x + "," + castle_y);
	}
	
	
};
