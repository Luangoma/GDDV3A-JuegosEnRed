class map_test_1 extends Phaser.Scene
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
	}
	
	update(time, delta)
	{
		player1.update(time, delta);
		player2.update(time, delta);
		
		
		for(let i = 0; i < this.houses.length; ++i)
		{
			this.houses[i].update(time, delta);
		}
		
		//console.log("p1: " + player1.points + ", p2: " + player2.points);
	}
	
	shutdown()
	{
		super.shutdown();
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
