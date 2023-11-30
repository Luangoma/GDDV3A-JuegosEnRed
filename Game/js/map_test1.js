var map_test_1 = {
	key: 'map_test_1',
	preload: map_test_1_preload,
	create: map_test_1_create,
	update: map_test_1_update
};

var map_test_1_variables = {
	player1: {},
	player2: {},
	houses: []
};

function map_test_1_preload() {
	
	this.load.image("world_grass","assets/WorldGrass.png");
	preloadDragon(this);
	preloadHouse(this);
}

function map_test_1_create() {
	
	this.cameras.main.setBounds(0, 0, 2048, 2048);
    this.physics.world.setBounds(0, 0, 2048, 2048);
	
	this.add.image(0, 0, 'world_grass').setOrigin(0,0).setScale(2);
	
	/*
	map_test_1_variables.house1 = new House(this, 0, 700, 700);
	map_test_1_variables.house1.create();
	
	map_test_1_variables.house2 = new House(this, 1, 1000, 850);
	map_test_1_variables.house2.create();
	*/
	
	spawnHouses(this, map_test_1_variables.houses, 50, {x: 0, y: 0}, {x: 2048, y: 2048});
	
	map_test_1_variables.player1 = new Dragon(this, 0, 1024, 1024);
	map_test_1_variables.player1.create();

	map_test_1_variables.player2 = new Dragon(this, 1, 800, 800);
	map_test_1_variables.player2.create();

	
	this.cameras.main.startFollow(map_test_1_variables.player1.sprite, true);
	this.cameras.main.setZoom(1);
}

function map_test_1_update(time, delta) {
	map_test_1_variables.player1.update(time, delta);
	map_test_1_variables.player2.update(time, delta);
}