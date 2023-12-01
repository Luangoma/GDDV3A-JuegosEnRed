var map_test_1 = {
	key: 'map_test_1',
	preload: map_test_1_preload,
	create: map_test_1_create,
	update: map_test_1_update
};

var map_test_1_variables = {
	player1: {},
	player2: {},
	flames: {},
	houses: [],
	tiles: []
};

function map_test_1_preload() {
	
	this.load.image("world_grass","assets/WorldGrass.png");
	preloadDragon(this);
	preloadHouse(this);
	preloadTileData(this);
	preloadFlameData(this);
}

function map_test_1_create() {
	
	createTileData(this);
	this.add.image(0, 0, 'world_grass').setOrigin(0,0).setScale(2);
	
	/*
	map_test_1_variables.house1 = new House(this, 0, 700, 700);
	map_test_1_variables.house1.create();
	
	map_test_1_variables.house2 = new House(this, 1, 1000, 850);
	map_test_1_variables.house2.create();
	*/
	
	//spawnHouses(this, map_test_1_variables.houses, 100, {x: 0, y: 0}, {x: 2048, y: 2048});
	
	map_test_1_variables.flames = createPhysicsGroup(this);
	
	createTiles(this, map_test_1_variables.tiles, 'grass_tile_1');
	createHouses(this, map_test_1_variables.houses, map_test_1_variables.tiles, 60, map_test_1_variables.flames);
	
	map_test_1_variables.player1 = new Dragon(this, 0, 1024, 1024, map_test_1_variables.flames);
	map_test_1_variables.player1.create();

	map_test_1_variables.player2 = new Dragon(this, 1, 800, 800, map_test_1_variables.flames);
	map_test_1_variables.player2.create();

	addMainCamera(this, map_test_1_variables.player1);
	addSplitScreenCamera(this, map_test_1_variables.player1, map_test_1_variables.player2, 0);
}

function map_test_1_update(time, delta) {
	map_test_1_variables.player1.update(time, delta);
	map_test_1_variables.player2.update(time, delta);
	
	
	for(let i = 0; i < map_test_1_variables.houses.length; ++i)
	{
		map_test_1_variables.houses[i].update(time, delta);
	}
}