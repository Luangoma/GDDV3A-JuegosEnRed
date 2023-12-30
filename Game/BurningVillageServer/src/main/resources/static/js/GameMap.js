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
		enableSound(this); //the disable sound call from the main menu should be moved to the game over scene instead of being in the main menu, and this enable sound should be moved to the main menu. That way, main menu button sounds wont stutter / cut off when returning to main menu from other menus, and once we add music, we wont have any problems with it getting reset all the time.
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
		
		
		//If the time has reached 0, then end the game AND stop the timer.
		if(gameTime.timeHasFinished()){
			console.log("GAME OVER (Scene \"" + this.scene.key + "\" has been unloaded...)");
			
			//stop the timer
			gameTime.stopTimer(); //maybe the timer stopping could be handled within the startTimer function itself, checking once the time reaches 0 or being called each time the timerStart function is called, but this is what we have right now, which might be the lesser of 2 evils considering how an in game menu and a quit option could require a manual timer killing mechanism.
			
			//stop the game scene and ui scene and then load the game over scene
			//TODO: Add scene shutdown support for map_test_1
			game.scene.stop(this.scene.key);
			game.scene.stop("ui");
			game.scene.start("game_over");
		}
		
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
		//super.destroy(); //same problem as above.
	}
};
