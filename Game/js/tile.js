function Tile(scene,tilename,x,y, is_destructible = false, health = 100)
{
	this.scene = scene;
	this.tile = tilename;
	
	this.start_x = x;
	this.start_y = y;
	
	this.is_destructible = is_destructible;
	//this.health = health;
	this.health = getRandomInRange(0,100);
	
	
	this.tiles = [tilename,tilename,tilename,tilename];
}

function preloadTile(scene)
{
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

Tile.prototype.create = function(){
	this.sprite = this.scene.add.image(this.start_x, this.start_y, this.tile).setOrigin(0,0);
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
			
			let current_tile = new Tile(scene, 'house_tile_1_d0', j, i);
			current_tile.tiles = getRandomHouseTiles();
			current_tile.tile = current_tile.tiles[0];
			background_tiles[global_index - 1].sprite.setTexture('ground_tile_2');
			
			tiles.push(current_tile);
			current_tile.create();
		}
	}
}