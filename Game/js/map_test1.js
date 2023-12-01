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
	preloadDragonData(this);
	preloadTileData(this);
	preloadFlameData(this);
}

function map_test_1_create() {
	
	createTileData(this);
	createDragonData(this);
	
	this.add.image(0, 0, 'world_grass').setOrigin(0,0).setScale(2);
	
	map_test_1_variables.flames = createPhysicsGroup(this);
	
	createTiles(this, map_test_1_variables.tiles, 'grass_tile_1');
	createHouses(this, map_test_1_variables.houses, map_test_1_variables.tiles, 60, map_test_1_variables.flames);
	
	map_test_1_variables.player1 = new Dragon(this, 0, 1024, 1024, map_test_1_variables.flames);
	map_test_1_variables.player2 = new Dragon(this, 1, 800, 800, map_test_1_variables.flames);

	addMainCamera(this, map_test_1_variables.player1);
	addSplitScreenCamera(this, map_test_1_variables.player1, map_test_1_variables.player2, 0);

	// Se hace launch para que la escena UI corra de forma simultánea a esta escena (map1).
	// Si se hace launch en game.js no funciona.
	this.scene.launch("ui");
}

function map_test_1_update(time, delta) {
	map_test_1_variables.player1.update(time, delta);
	map_test_1_variables.player2.update(time, delta);
	
	
	for(let i = 0; i < map_test_1_variables.houses.length; ++i)
	{
		map_test_1_variables.houses[i].update(time, delta);
	}
}