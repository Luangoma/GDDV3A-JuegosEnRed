class map_test_1 extends Phaser.Scene
{
	flames = {};
	houses = [];
	tiles = [];
	num_houses = 60;
	
	preload()
	{
		this.load.image("world_grass","assets/WorldGrass.png");
		preloadDragonData(this);
		preloadTileData(this);
		preloadFlameData(this);
	}
	
	create()
	{
		createTileData(this);
		createDragonData(this);
		
		this.add.image(0, 0, 'world_grass').setOrigin(0,0).setScale(2);
		
		this.flames = createPhysicsGroup(this);
		
		createTiles(this, this.tiles, 'grass_tile_1');
		createHouses(this, this.houses, this.tiles, this.num_houses, this.flames);
		
		player1 = new Dragon(this, 0, 1024, 1024, this.flames);
		player2 = new Dragon(this, 1, 800, 800, this.flames);

		addMainCamera(this, player1);
		addSplitScreenCamera(this, player1, player2, 1);

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
		
		console.log("p1: " + player1.points + ", p2: " + player2.points);
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
