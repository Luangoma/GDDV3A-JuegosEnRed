class map_test_1 extends Phaser.Scene
{
	player1 = {};
	player2 = {};
	flames = {};
	houses = [];
	tiles = [];
	
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
		createHouses(this, this.houses, this.tiles, 60, this.flames);
		
		this.player1 = new Dragon(this, 0, 1024, 1024, this.flames);
		this.player2 = new Dragon(this, 1, 800, 800, this.flames);

		addMainCamera(this, this.player1);
		addSplitScreenCamera(this, this.player1, this.player2, 0);

		// Se hace launch para que la escena UI corra de forma simultánea a esta escena (map1).
		// Si se hace launch en game.js no funciona.
		this.scene.launch("ui");
	}
	
	update(time, delta)
	{
		this.player1.update(time, delta);
		this.player2.update(time, delta);
		
		
		for(let i = 0; i < this.houses.length; ++i)
		{
			this.houses[i].update(time, delta);
		}
		
		console.log("p1: " + this.player1.points + ", p2: " + this.player2.points);
	}
};
