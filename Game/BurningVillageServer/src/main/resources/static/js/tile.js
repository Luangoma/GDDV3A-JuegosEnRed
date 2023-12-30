function Tile(scene, tilename, x, y, is_destructible = false, health = 100, flamesgroup = null)
{
	this.scene = scene;
	this.tile = tilename;
	
	this.start_x = x;
	this.start_y = y;
	
	this.is_destructible = is_destructible;
	this.health = health;
	this.max_health = health;
	
	this.tiles = [tilename,tilename,tilename,tilename];
	
	this.is_on_fire = false;
	
	this.flames = flamesgroup;
	
	this.last_dragon = null;
	this.current_dragon = null;
	this.has_to_switch_sprite = false;
	
	this.fire_sound = this.scene.sound.add("sound_fire_loop", {loop: true});
	this.destruction_sound = this.scene.sound.add("sound_destruction", {loop: false});
	
	this.has_been_destroyed = false;
}

var houseList = [];

function preloadTileData(scene)
{
	//cargar animaciones del fuego:
	scene.load.spritesheet('FuegoStart', 'assets/burning_animation/burning_start_1.png', {frameWidth: 24, frameHeight: 32});
	scene.load.spritesheet('FuegoLoop', 'assets/burning_animation/burning_loop_1.png', {frameWidth: 24, frameHeight: 32});
	scene.load.spritesheet('FuegoEnd', 'assets/burning_animation/burning_end_1.png', {frameWidth: 24, frameHeight: 32});
	
	//cargar animaciones del fuego azul:
	scene.load.spritesheet('FuegoStart_blue', 'assets/burning_animation/alt/burning_start_1.png', {frameWidth: 24, frameHeight: 32});
	scene.load.spritesheet('FuegoLoop_blue', 'assets/burning_animation/alt/burning_loop_1.png', {frameWidth: 24, frameHeight: 32});
	scene.load.spritesheet('FuegoEnd_blue', 'assets/burning_animation/alt/burning_end_1.png', {frameWidth: 24, frameHeight: 32});
	
	//cargar imágenes para los tiles por defecto (utilizados con propósito de debuggear y hacer pruebas)
	scene.load.image('default_tile', './assets/tiles/default_tile.png');
	scene.load.image('default_tile_small', './assets/tiles/default_tile_small.png');
	
	//cargar imágenes para los diferentes tipos de tiles de fondo (grass, ground, road, etc...)
	scene.load.image('grass_tile_1', './assets/tiles/grass_tile_1.png');
	scene.load.image('grass_tile_2', './assets/tiles/grass_tile_2.png');
	scene.load.image('ground_tile_2', './assets/tiles/ground_tile_2.png');
	
	//cargar imágenes para los diferentes edificios que pueden spawnear:
		
		//casa quemada: (utilizada cuando una casa ha sido destruida por completo)
			scene.load.image('casa_quemada', './assets/tiles/houses/tile_casa_quemada.png');
		
		//casa 01:
			//back
			scene.load.image('tc_01_b_d0', './assets/tiles/houses/tile_casa_01_back_d0.png');
			scene.load.image('tc_01_b_d1', './assets/tiles/houses/tile_casa_01_back_d1.png');
			scene.load.image('tc_01_b_d2', './assets/tiles/houses/tile_casa_01_back_d2.png');
			scene.load.image('tc_01_b_d3', './assets/tiles/houses/tile_casa_01_back_d3.png');
			houseList.push(
			['tc_01_b_d0',
			 'tc_01_b_d1',
			 'tc_01_b_d2',
			 'tc_01_b_d3']
			);
			//front
			scene.load.image('tc_01_f_d0', './assets/tiles/houses/tile_casa_01_front_d0.png');
			scene.load.image('tc_01_f_d1', './assets/tiles/houses/tile_casa_01_front_d1.png');
			scene.load.image('tc_01_f_d2', './assets/tiles/houses/tile_casa_01_front_d2.png');
			scene.load.image('tc_01_f_d3', './assets/tiles/houses/tile_casa_01_front_d3.png');
			houseList.push(
			['tc_01_f_d0',
			 'tc_01_f_d1',
			 'tc_01_f_d2',
			 'tc_01_f_d3']
			);
			//left
			scene.load.image('tc_01_l_d0', './assets/tiles/houses/tile_casa_01_left_d0.png');
			scene.load.image('tc_01_l_d1', './assets/tiles/houses/tile_casa_01_left_d1.png');
			scene.load.image('tc_01_l_d2', './assets/tiles/houses/tile_casa_01_left_d2.png');
			scene.load.image('tc_01_l_d3', './assets/tiles/houses/tile_casa_01_left_d3.png');
			houseList.push(
			['tc_01_l_d0',
			 'tc_01_l_d1',
			 'tc_01_l_d2',
			 'tc_01_l_d3']
			);
			//right
			scene.load.image('tc_01_r_d0', './assets/tiles/houses/tile_casa_01_right_d0.png');
			scene.load.image('tc_01_r_d1', './assets/tiles/houses/tile_casa_01_right_d1.png');
			scene.load.image('tc_01_r_d2', './assets/tiles/houses/tile_casa_01_right_d2.png');
			scene.load.image('tc_01_r_d3', './assets/tiles/houses/tile_casa_01_right_d3.png');
			houseList.push(
			['tc_01_r_d0',
			 'tc_01_r_d1',
			 'tc_01_r_d2',
			 'tc_01_r_d3']
			);
		
		//casa 02:
			//back
			scene.load.image('tc_02_b_d0', './assets/tiles/houses/tile_casa_02_back_d0.png');
			scene.load.image('tc_02_b_d1', './assets/tiles/houses/tile_casa_02_back_d1.png');
			scene.load.image('tc_02_b_d2', './assets/tiles/houses/tile_casa_02_back_d2.png');
			scene.load.image('tc_02_b_d3', './assets/tiles/houses/tile_casa_02_back_d3.png');
			houseList.push(
			['tc_02_b_d0',
			 'tc_02_b_d1',
			 'tc_02_b_d2',
			 'tc_02_b_d3']
			);
			//front
			scene.load.image('tc_02_f_d0', './assets/tiles/houses/tile_casa_02_front_d0.png');
			scene.load.image('tc_02_f_d1', './assets/tiles/houses/tile_casa_02_front_d1.png');
			scene.load.image('tc_02_f_d2', './assets/tiles/houses/tile_casa_02_front_d2.png');
			scene.load.image('tc_02_f_d3', './assets/tiles/houses/tile_casa_02_front_d3.png');
			houseList.push(
			['tc_02_f_d0',
			 'tc_02_f_d1',
			 'tc_02_f_d2',
			 'tc_02_f_d3']
			);
			//left
			scene.load.image('tc_02_l_d0', './assets/tiles/houses/tile_casa_02_left_d0.png');
			scene.load.image('tc_02_l_d1', './assets/tiles/houses/tile_casa_02_left_d1.png');
			scene.load.image('tc_02_l_d2', './assets/tiles/houses/tile_casa_02_left_d2.png');
			scene.load.image('tc_02_l_d3', './assets/tiles/houses/tile_casa_02_left_d3.png');
			houseList.push(
			['tc_02_l_d0',
			 'tc_02_l_d1',
			 'tc_02_l_d2',
			 'tc_02_l_d3']
			);
			//right
			scene.load.image('tc_02_r_d0', './assets/tiles/houses/tile_casa_02_right_d0.png');
			scene.load.image('tc_02_r_d1', './assets/tiles/houses/tile_casa_02_right_d1.png');
			scene.load.image('tc_02_r_d2', './assets/tiles/houses/tile_casa_02_right_d2.png');
			scene.load.image('tc_02_r_d3', './assets/tiles/houses/tile_casa_02_right_d3.png');
			houseList.push(
			['tc_02_r_d0',
			 'tc_02_r_d1',
			 'tc_02_r_d2',
			 'tc_02_r_d3']
			);
		
		//casa 03:
			//back
			scene.load.image('tc_03_b_d0', './assets/tiles/houses/tile_casa_03_back_d0.png');
			scene.load.image('tc_03_b_d1', './assets/tiles/houses/tile_casa_03_back_d1.png');
			scene.load.image('tc_03_b_d2', './assets/tiles/houses/tile_casa_03_back_d2.png');
			scene.load.image('tc_03_b_d3', './assets/tiles/houses/tile_casa_03_back_d3.png');
			houseList.push(
			['tc_03_b_d0',
			 'tc_03_b_d1',
			 'tc_03_b_d2',
			 'tc_03_b_d3']
			);
			//front
			scene.load.image('tc_03_f_d0', './assets/tiles/houses/tile_casa_03_front_d0.png');
			scene.load.image('tc_03_f_d1', './assets/tiles/houses/tile_casa_03_front_d1.png');
			scene.load.image('tc_03_f_d2', './assets/tiles/houses/tile_casa_03_front_d2.png');
			scene.load.image('tc_03_f_d3', './assets/tiles/houses/tile_casa_03_front_d3.png');
			houseList.push(
			['tc_03_f_d0',
			 'tc_03_f_d1',
			 'tc_03_f_d2',
			 'tc_03_f_d3']
			);
			//left
			scene.load.image('tc_03_l_d0', './assets/tiles/houses/tile_casa_03_left_d0.png');
			scene.load.image('tc_03_l_d1', './assets/tiles/houses/tile_casa_03_left_d1.png');
			scene.load.image('tc_03_l_d2', './assets/tiles/houses/tile_casa_03_left_d2.png');
			scene.load.image('tc_03_l_d3', './assets/tiles/houses/tile_casa_03_left_d3.png');
			houseList.push(
			['tc_03_l_d0',
			 'tc_03_l_d1',
			 'tc_03_l_d2',
			 'tc_03_l_d3']
			);
			//right
			scene.load.image('tc_03_r_d0', './assets/tiles/houses/tile_casa_03_right_d0.png');
			scene.load.image('tc_03_r_d1', './assets/tiles/houses/tile_casa_03_right_d1.png');
			scene.load.image('tc_03_r_d2', './assets/tiles/houses/tile_casa_03_right_d2.png');
			scene.load.image('tc_03_r_d3', './assets/tiles/houses/tile_casa_03_right_d3.png');
			houseList.push(
			['tc_03_r_d0',
			 'tc_03_r_d1',
			 'tc_03_r_d2',
			 'tc_03_r_d3']
			);
	
	
	//cargar las assets del castillo:
	//front
	scene.load.image('c_01_f_d0', './assets/tiles/castle/tile_castlewall01_front_d0.png');
	scene.load.image('c_01_f_d1', './assets/tiles/castle/tile_castlewall01_front_d1.png');
	scene.load.image('c_01_f_d2', './assets/tiles/castle/tile_castlewall01_front_d2.png');
	scene.load.image('c_01_f_d3', './assets/tiles/castle/tile_castlewall01_front_d3.png');
	//side
	scene.load.image('c_01_s_d0', './assets/tiles/castle/tile_castlewall01_side_d0.png');
	scene.load.image('c_01_s_d1', './assets/tiles/castle/tile_castlewall01_side_d1.png');
	scene.load.image('c_01_s_d2', './assets/tiles/castle/tile_castlewall01_side_d2.png');
	scene.load.image('c_01_s_d3', './assets/tiles/castle/tile_castlewall01_side_d3.png');
	//corner tl
	scene.load.image('c_01_ctl_d0', './assets/tiles/castle/tile_castlewall01_corner_tl_d0.png');
	scene.load.image('c_01_ctl_d1', './assets/tiles/castle/tile_castlewall01_corner_tl_d1.png');
	scene.load.image('c_01_ctl_d2', './assets/tiles/castle/tile_castlewall01_corner_tl_d2.png');
	scene.load.image('c_01_ctl_d3', './assets/tiles/castle/tile_castlewall01_corner_tl_d3.png');
	//corner tr
	scene.load.image('c_01_ctr_d0', './assets/tiles/castle/tile_castlewall01_corner_tr_d0.png');
	scene.load.image('c_01_ctr_d1', './assets/tiles/castle/tile_castlewall01_corner_tr_d1.png');
	scene.load.image('c_01_ctr_d2', './assets/tiles/castle/tile_castlewall01_corner_tr_d2.png');
	scene.load.image('c_01_ctr_d3', './assets/tiles/castle/tile_castlewall01_corner_tr_d3.png');
	//corner bl
	scene.load.image('c_01_cbl_d0', './assets/tiles/castle/tile_castlewall01_corner_bl_d0.png');
	scene.load.image('c_01_cbl_d1', './assets/tiles/castle/tile_castlewall01_corner_bl_d1.png');
	scene.load.image('c_01_cbl_d2', './assets/tiles/castle/tile_castlewall01_corner_bl_d2.png');
	scene.load.image('c_01_cbl_d3', './assets/tiles/castle/tile_castlewall01_corner_bl_d3.png');
	//corner br
	scene.load.image('c_01_cbr_d0', './assets/tiles/castle/tile_castlewall01_corner_br_d0.png');
	scene.load.image('c_01_cbr_d1', './assets/tiles/castle/tile_castlewall01_corner_br_d1.png');
	scene.load.image('c_01_cbr_d2', './assets/tiles/castle/tile_castlewall01_corner_br_d2.png');
	scene.load.image('c_01_cbr_d3', './assets/tiles/castle/tile_castlewall01_corner_br_d3.png');
	
	
	
	//cargar las assets de decoración:
	scene.load.image('decor_stones_01', 'assets/tiles/decor/tile_some_stones_01.png');
	scene.load.image('decor_stones_02', 'assets/tiles/decor/tile_some_stones_02.png');
	scene.load.image('decor_stones_03', 'assets/tiles/decor/tile_some_stones_03.png');
	
	
	//preload tile sounds:
	scene.load.audio("sound_fire_loop", ["./sounds/sound_fire_loop.wav"]);
	scene.load.audio("sound_destruction", ["./sounds/sound_destruction.wav"]);
}

function createTileData(scene)
{
	// Crear animaciones fuego, animaciones start, loop y end.
	
	//Animación animacionFuegoStart, inicio del fuego, solo reproducir 1 vez.
	scene.anims.create({
		key: 'animacionFuegoStart',
		frames: scene.anims.generateFrameNumbers('FuegoStart', { start: 0, end: 3 }),
		frameRate: 7,
		repeat: 0
	});
	
	scene.anims.create({
		key: 'animacionFuegoStart_blue',
		frames: scene.anims.generateFrameNumbers('FuegoStart_blue', { start: 0, end: 3 }),
		frameRate: 7,
		repeat: 0
	});

	//Animación animacionFuegoLoop, bucle del fuego, reproducir continuamente.
	scene.anims.create({
		key: 'animacionFuegoLoop',
		frames: scene.anims.generateFrameNumbers('FuegoLoop', { start: 0, end: 3 }),
		frameRate: 7,
		repeat: -1
	});
	
	scene.anims.create({
		key: 'animacionFuegoLoop_blue',
		frames: scene.anims.generateFrameNumbers('FuegoLoop_blue', { start: 0, end: 3 }),
		frameRate: 7,
		repeat: -1
	});

	//Animación animacionFuegoEnd, final del fuego, solo reproducir 1 vez al terminar la llama.
	scene.anims.create({
		key: 'animacionFuegoEnd',
		frames: scene.anims.generateFrameNumbers('FuegoEnd', { start: 0, end: 3 }),
		frameRate: 7,
		repeat: 0
	});
	
	scene.anims.create({
		key: 'animacionFuegoEnd_blue',
		frames: scene.anims.generateFrameNumbers('FuegoEnd_blue', { start: 0, end: 3 }),
		frameRate: 7,
		repeat: 0
	});
}

Tile.prototype.create = function(){
	//this.sprite = this.scene.add.image(this.start_x, this.start_y, this.tile).setOrigin(0,0);
	this.sprite = this.scene.physics.add.staticImage(this.start_x, this.start_y, this.tile).setOrigin(0,0);
	
	if(this.is_destructible === true)
	{
		this.fire_sprite = this.scene.add.sprite(this.start_x + (126/2), this.start_y + (126/2) - 50, 'animacionFuegoLoop');
		this.fire_sprite.setScale(3);
		this.fire_sprite.play('animacionFuegoLoop');
		
		this.scene.physics.add.overlap(this.sprite, this.flames, (tile_sprite, flame) => {
			// Llamamos a damageTile con el sprite de llama y el tile.
			damageTile(tile_sprite, flame, this);
		}, null, this);
		
	}
}

Tile.prototype.update = function(time, delta){
	if(this.health >= this.max_health - ((this.max_health/4) * 1))
	{
		this.sprite.setTexture(this.tiles[0]);
	}
	else
	if(this.health >= this.max_health - ((this.max_health/4) * 2))
	{
		this.sprite.setTexture(this.tiles[1]);
	}
	else
	if(this.health >= this.max_health - ((this.max_health/4) * 3))
	{
		this.sprite.setTexture(this.tiles[2]);
	}
	else
	if(this.health > 0)
	{
		this.sprite.setTexture(this.tiles[3]);
	}
	else
	if(!this.has_been_destroyed)
	{
		this.sprite.setTexture('casa_quemada');
		this.destruction_sound.play();
		this.has_been_destroyed = true;
	}
	
	if(this.is_on_fire)
	{
		let damage_over_time = 2; // puntos de daño por segundo
		this.fire_sprite.setVisible(true);
		this.health -= (delta/1000) * damage_over_time; // calcular el daño aplicado en un frame
		
		
		if(this.has_to_switch_sprite)
		{
			switch(this.current_dragon.player_id)
			{
				case 0:
					this.fire_sprite.setTexture('FuegoLoop');
					this.fire_sprite.play('animacionFuegoLoop');
					break;
				
				default:
					this.fire_sprite.setTexture('FuegoLoop_blue');
					this.fire_sprite.play('animacionFuegoLoop_blue');
					break;
			}
			this.has_to_switch_sprite = false;
			this.fire_sound.stop();
			this.fire_sound.play();
		}
		
		//NOTE: This could be optimized to not even compute or spawn the sounds in the first place if the game is muted / the volume is 0, but it is done this way so that players will still be able to hear these sounds in case that they unmute the game during a match.
		let distance = distanceBetweenPoints2D({x: players[currentPlayer].sprite.x, y: players[currentPlayer].sprite.y}, {x: this.sprite.x, y: this.sprite.y});
		let distance_factor = lerpValue(1 , 0, clampValue(distance, 0, 300) / 300); //300 is some arbitrary attenuation and max audio distance value
		this.fire_sound.setVolume(gameConfig.volumeSettings.effectsVolume * distance_factor); //set the final volume to the distance factor multiplied by the total volume
		
	}
	else
	{
		this.fire_sprite.setVisible(false);
	}
}

function createTiles(scene, tiles, tile_keys = ['default_tile_small'])
{
	//let num_tiles = (config.width / 256) * (config.height / 256);
	for(let i = 0; i < world_height ; i+=128)
	{
		for(let j = 0; j < world_width; j+=128)
		{
			let rand = getRandomInRangeInt(0, tile_keys.length - 1);
			let tile_key = tile_keys[rand];
			let current_tile = new Tile(scene, tile_key, j, i);
			tiles.push(current_tile);
			current_tile.create();
			//console.log("spawned a tile at: " + j + ", " + i);
		}
	}
}

function getRandomHouseTiles()
{
	return houseList[getRandomInRangeInt(0, houseList.length - 1)];
}

function createDecor(scene, decor, chosen_decor, num_decor)
{
	let spawn_location_list = [];
	let num_tiles = (world_height / 128) * (world_width / 128);
	for(let i = 0; i < num_decor; ++i){
		spawn_location_list.push(true);
	}
	for(let i = 0; i < num_tiles - num_decor; ++i){
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
			
			let rand = getRandomInRangeInt(0, chosen_decor.length - 1);
			let current_decor = new Tile(scene, chosen_decor[rand], j, i);
			current_decor.create();
			decor.push(current_decor);
		}
	}
}

function createHouses(scene, background_tiles, tiles, flamesgroup, num_houses)
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
			
			let current_tile = new Tile(scene, 'house_tile_1_d0', j, i, flamesgroup ? true : false, 300 /*TODO: add hp config later*/, flamesgroup);
			current_tile.tiles = getRandomHouseTiles();
			current_tile.tile = current_tile.tiles[0];
			background_tiles[global_index - 1].sprite.setTexture('ground_tile_2');
			
			tiles.push(current_tile);
			current_tile.create();
		}
	}
}

//WARN: Only use after having generated the world. Either that or change world gen to use index assigments instead of pushing back, or use a rectangle fill internally for the create tiles fn.
function rectangleFill(scene, btiles, htiles, fgroup, btiletype, htiletypes, xmin, ymin, xmax, ymax)
{
	let total_tiles = (xmax - xmin) * (ymax - ymin);
	for(let i = ymin; i <= ymax; ++i)
	{
		for(let j = xmin; j <= xmax; ++j)
		{
			let pos = j + i * (xmax - xmin);
			btiles[pos] = new Tile(scene, btiletype, j*128, i*128, false, 300, fgroup);
			btiles[pos].create();
			
			//this method gives error when using push in the other side. Not using push would make the array larger than it has to be tho...
			//but now we need to perform a linear search to find the house tile at a certain position. Instead of using pos, we need to find the position x,y (j,i)
			//htiles[pos] = new Tile(scene, htiletypes[0], j*128, i*128, fgroup ? true : false, 300, fgroup);
			//htiles[pos].create();
			//htiles[pos].tiles = htiletypes;
			
			let current_htile = new Tile(scene, htiletypes[0], j*128, i*128, fgroup ? true : false, 300, fgroup);
			current_htile.create();
			current_htile.tiles = htiletypes;
			htiles.push(current_htile);
		}
	}
}

function createCastle(scene, btiles, htiles, flames, x, y)
{
	let castle_front = ['c_01_f_d0','c_01_f_d1','c_01_f_d2','c_01_f_d3'];
	let castle_side = ['c_01_s_d0','c_01_s_d1','c_01_s_d2','c_01_s_d3'];
	
	let castle_corner_tl = ['c_01_ctl_d0','c_01_ctl_d1','c_01_ctl_d2','c_01_ctl_d3'];
	let castle_corner_tr = ['c_01_ctr_d0','c_01_ctr_d1','c_01_ctr_d2','c_01_ctr_d3'];
	let castle_corner_bl = ['c_01_cbl_d0','c_01_cbl_d1','c_01_cbl_d2','c_01_cbl_d3'];
	let castle_corner_br = ['c_01_cbr_d0','c_01_cbr_d1','c_01_cbr_d2','c_01_cbr_d3'];
	
	
	//corner top left
	rectangleFill(scene, btiles, htiles, flames, 'grass_tile_1', castle_corner_tl, x, y, x, y);
	//corner top right
	rectangleFill(scene, btiles, htiles, flames, 'grass_tile_1', castle_corner_tr, x+3, y, x+3, y);
	//corner bottom left
	rectangleFill(scene, btiles, htiles, flames, 'grass_tile_1', castle_corner_bl, x, y+3, x, y+3);
	//corner bottom right
	rectangleFill(scene, btiles, htiles, flames, 'grass_tile_1', castle_corner_br, x+3, y+3, x+3, y+3);
	
	//side top
	rectangleFill(scene, btiles, htiles, flames, 'grass_tile_1', castle_front, x+1, y, x+2, y);
	//side right
	rectangleFill(scene, btiles, htiles, flames, 'grass_tile_1', castle_side, x+3, y+1, x+3, y+2);
	//side bottom
	rectangleFill(scene, btiles, htiles, flames, 'grass_tile_1', castle_front, x+1, y+3, x+2, y+3);
	//side left
	rectangleFill(scene, btiles, htiles, flames, 'grass_tile_1', castle_side, x, y+1, x, y+2);
	
	
	//inner parts (placeholder, will be its own castle components in the future)
	//corner top left
	rectangleFill(scene, btiles, htiles, flames, 'ground_tile_2', getRandomHouseTiles(), x+1, y+1, x+1, y+1);
	//corner top right
	rectangleFill(scene, btiles, htiles, flames, 'ground_tile_2', getRandomHouseTiles(), x+2, y+1, x+2, y+1);
	//corner bottom left
	rectangleFill(scene, btiles, htiles, flames, 'ground_tile_2', getRandomHouseTiles(), x+1, y+2, x+1, y+2);
	//corner bottom right
	rectangleFill(scene, btiles, htiles, flames, 'ground_tile_2', getRandomHouseTiles(), x+2, y+2, x+2, y+2);

	

}

//TODO: Hacer fusionado de tiles del fondo para hacer un sistema de carreteras. Posible implementación con doble pasada (generar casas, marcar tiles de fondo, etc...).
//TODO: Fix problem with passing null for flames. Pass null to see the problem. Passing null exists only for the purpose of using rectangle fill without passing flames.