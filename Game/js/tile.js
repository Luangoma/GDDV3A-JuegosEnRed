function Tile(scene,tilename,x,y, is_destructible = false, health = 100)
{
	this.scene = scene;
	this.tile = tilename;
	
	this.start_x = x;
	this.start_y = y;
	
	this.is_destructible = is_destructible;
	this.health = health;
	//this.health = getRandomInRange(0,100);
	
	
	this.tiles = [tilename,tilename,tilename,tilename];
	
	this.is_on_fire = false;
}

function preloadTileData(scene)
{
	//cargar animaciones del fuego:
	scene.load.spritesheet('animacionFuegoStart', 'assets/burning_animation/burning_start_1.png', {frameWidth: 24, frameHeight: 32});
	scene.load.spritesheet('animacionFuegoLoop', 'assets/burning_animation/burning_loop_1.png', {frameWidth: 24, frameHeight: 32});
	scene.load.spritesheet('animacionFuegoEnd', 'assets/burning_animation/burning_end_1.png', {frameWidth: 24, frameHeight: 32});
	
	
	scene.load.image('default_tile', './assets/tiles/default_tile.png');
	scene.load.image('default_tile_small', './assets/tiles/default_tile_small.png');
	
	scene.load.image('grass_tile_1', './assets/tiles/grass_tile_1.png');
	scene.load.image('ground_tile_2', './assets/tiles/ground_tile_2.png');
	
	//scene.load.spritesheet('house_1_sheet','./assets/house_1_sheet.png', {frameWidth: 126, frameHeight: 126});
	scene.load.image('house_tile_1_d0', './assets/tiles/house_tile_1_d0.png');
	scene.load.image('house_tile_1_d1', './assets/tiles/house_tile_1_d1.png');
	scene.load.image('house_tile_1_d2', './assets/tiles/house_tile_1_d2.png');
	scene.load.image('house_tile_1_d3', './assets/tiles/house_tile_1_d3.png');
	
	//scene.load.spritesheet('default_tile_small', './assets/tiles/default_tile_small.png', {frameWidth: 126, frameHeight: 126});
	
	
	scene.load.image('house_tile_2_d0', './assets/tiles/house_tile_2_d0.png');
	scene.load.image('house_tile_2_d1', './assets/tiles/house_tile_2_d1.png');
	scene.load.image('house_tile_2_d2', './assets/tiles/house_tile_2_d2.png');
	scene.load.image('house_tile_2_d3', './assets/tiles/house_tile_2_d3.png');
	
}

function createTileData(scene)
{
	// Crear animaciones fuego, animaciones start, loop y end.
	
	//Animación animacionFuegoStart, inicio del fuego, solo reproducir 1 vez.
	scene.anims.create({
		key: 'animacionFuegoStart',
		frames: scene.anims.generateFrameNumbers('animacionFuegoStart', { start: 0, end: 3 }),
		frameRate: 7,
		repeat: 0
	});

	//Animación animacionFuegoLoop, bucle del fuego, reproducir continuamente.
	scene.anims.create({
		key: 'animacionFuegoLoop',
		frames: scene.anims.generateFrameNumbers('animacionFuegoLoop', { start: 0, end: 3 }),
		frameRate: 7,
		repeat: -1
	});

	//Animación animacionFuegoEnd, final del fuego, solo reproducir 1 vez al terminar la llama.
	scene.anims.create({
		key: 'animacionFuegoEnd',
		frames: scene.anims.generateFrameNumbers('animacionFuegoEnd', { start: 0, end: 3 }),
		frameRate: 7,
		repeat: 0
	});
}

Tile.prototype.create = function(){
	this.sprite = this.scene.add.image(this.start_x, this.start_y, this.tile).setOrigin(0,0);
	
	if(this.is_destructible === true)
	{
		this.fire_sprite = this.scene.add.sprite(this.start_x + (126/2), this.start_y + (126/2) - 50, 'animacionFuegoLoop');
		this.fire_sprite.setScale(3);
		this.fire_sprite.play('animacionFuegoLoop');
	}
}

Tile.prototype.update = function(time, delta){
	if(this.health >= 100 - 25 * 1)
	{
		this.sprite.setTexture(this.tiles[0]);
	}
	else
	if(this.health >= 100 - 25 * 2)
	{
		this.sprite.setTexture(this.tiles[1]);
	}
	else
	if(this.health >= 100 - 25 * 3)
	{
		this.sprite.setTexture(this.tiles[2]);
	}
	else
	{
		this.sprite.setTexture(this.tiles[3]);
	}
	
	if(this.is_on_fire)
	{
		let damage_over_time = 2; // puntos de daño por segundo
		this.fire_sprite.setVisible(true);
		this.health -= (delta/1000) * damage_over_time; // calcular el daño aplicado en un frame 
	}
	else
	{
		this.fire_sprite.setVisible(false);
	}
}

function createTiles(scene, tiles, tile_key = 'default_tile_small')
{
	//let num_tiles = (config.width / 256) * (config.height / 256);
	for(let i = 0; i < world_height ; i+=128)
	{
		for(let j = 0; j < world_width; j+=128)
		{
			let current_tile = new Tile(scene, tile_key, j, i);
			tiles.push(current_tile);
			current_tile.create();
			//console.log("spawned a tile at: " + j + ", " + i);
		}
	}
}

function getRandomHouseTiles()
{
	let houseList = [
		['house_tile_1_d0', 'house_tile_1_d1', 'house_tile_1_d2', 'house_tile_1_d3'],
		['house_tile_2_d0', 'house_tile_2_d1', 'house_tile_2_d2', 'house_tile_2_d3'],
	];
	
	return houseList[getRandomInRangeInt(0, houseList.length - 1)];
}

function createHouses(scene,tiles,background_tiles,num_houses)
{
	//generar una lista aleatoria donde se determina cuantas casas tienen que spawnear en el mundo.
	//nota: no se hace uso de un rand en el spawneo de casas directamente para garantizar que el numero de casas spawneadas sean exactamente "num_houses".
	let spawn_location_list = [];
	let num_tiles = (world_height / 128) * (world_width / 128);
	for(let i = 0; i < num_houses; ++i){
		spawn_location_list.push(true);
	}
	for(let i = 0; i < num_tiles - num_houses; ++i){
		spawn_location_list.push(false);
	}
	shuffleList(spawn_location_list);
	
	let global_index = 0;
	for(let i = 0; i < world_height ; i+=128)
	{
		for(let j = 0; j < world_width; j+=128)
		{
			let should_spawn = spawn_location_list[global_index]; //utilizar el índice global de la casilla en la lista donde está en memoria para determinar si debe de spawnear una casa o no.
			++global_index;
			if(!should_spawn)
			{
				continue;
			}
			
			let current_tile = new Tile(scene, 'house_tile_1_d0', j, i, true);
			current_tile.tiles = getRandomHouseTiles();
			current_tile.tile = current_tile.tiles[0];
			background_tiles[global_index - 1].sprite.setTexture('ground_tile_2');
			
			tiles.push(current_tile);
			current_tile.create();
		}
	}
}

//TODO: Hacer fusionado de tiles del fondo para hacer un sistema de carreteras. Posible implementación con doble pasada (generar casas, marcar tiles de fondo, etc...).