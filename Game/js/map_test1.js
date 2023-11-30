var map_test_1 = {
	key: 'map_test_1',
	preload: map_test_1_preload,
	create: map_test_1_create,
	update: map_test_1_update
};

var map_test_1_variables = {
	player1: {},
	player2: {},
	houses: [],
	tiles: []
};

function map_test_1_preload() {
	
	this.load.image("world_grass","assets/WorldGrass.png");
	preloadDragon(this);
	preloadHouse(this);
	preloadTile(this);
}

function map_test_1_create() {
	
	this.add.image(0, 0, 'world_grass').setOrigin(0,0).setScale(2);
	
	/*
	map_test_1_variables.house1 = new House(this, 0, 700, 700);
	map_test_1_variables.house1.create();
	
	map_test_1_variables.house2 = new House(this, 1, 1000, 850);
	map_test_1_variables.house2.create();
	*/
	
	//spawnHouses(this, map_test_1_variables.houses, 100, {x: 0, y: 0}, {x: 2048, y: 2048});
	
	createTiles(this, map_test_1_variables.tiles);
	//createTiles(this, map_test_1_variables.houses);
	
	map_test_1_variables.player1 = new Dragon(this, 0, 1024, 1024);
	map_test_1_variables.player1.create();

	map_test_1_variables.player2 = new Dragon(this, 1, 800, 800);
	map_test_1_variables.player2.create();

	this.cameras.main.setBounds(0, 0, 2048, 2048);
    this.physics.world.setBounds(0, 0, 2048, 2048);
	this.cameras.main.startFollow(map_test_1_variables.player1.sprite, true);
	this.cameras.main.setZoom(1);
	
	// Poned comentarios !!!
	this.cameras.add(0,0,config.width,config.height/2).startFollow(map_test_1_variables.player1.sprite,true).setBounds(0,0,world_width, world_height);
	this.cameras.add(0,config.height/2,config.width,config.height/2).startFollow(map_test_1_variables.player2.sprite,true).setBounds(0,0,world_width, world_height);
	
	// Poned comentarios !!!
	for (let index = 0; index < map_test_1_variables.houses.length; index++) {	
		this.physics.add.overlap(map_test_1_variables.player1.flames, map_test_1_variables.houses[index], blazeHouse, null, this);
		this.physics.add.overlap(map_test_1_variables.player2.flames, map_test_1_variables.houses[index], blazeHouse, null, this);
	}
	this.physics.add.overlap(map_test_1_variables.player1.sprite, map_test_1_variables.player2.flames, (player1_Sprite, flame) => {
		// Llamamos a damageEnemy con el sprite de llama y el player
		damageEnemy(player1_Sprite, flame, map_test_1_variables.player1);
	}, null, this);
	this.physics.add.overlap(map_test_1_variables.player2.sprite, map_test_1_variables.player1.flames, (player2_Sprite, flame) => {
		// Llamamos a damageEnemy con el sprite de llama y el player
		damageEnemy(player2_Sprite, flame, map_test_1_variables.player2);
	}, null, this);
}

function map_test_1_update(time, delta) {
	map_test_1_variables.player1.update(time, delta);
	map_test_1_variables.player2.update(time, delta);
}