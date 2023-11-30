function Tile(scene,tilename,x,y, is_destructible = false, health = 100)
{
	this.scene = scene;
	this.tile = tilename;
	
	this.start_x = x;
	this.start_y = y;
	
	this.is_destructible = is_destructible;
	this.health = health;
}

function preloadTile(scene)
{
	scene.load.image('default_tile', './assets/tiles/default_tile.png');
	scene.load.image('default_tile_small', './assets/tiles/default_tile_small.png');
	
	scene.load.image('house_tile_1_d0', './assets/tiles/house_tile_1_d0.png');
	scene.load.image('house_tile_1_d1', './assets/tiles/house_tile_1_d1.png');
	scene.load.image('house_tile_1_d2', './assets/tiles/house_tile_1_d2.png');
	scene.load.image('house_tile_1_d3', './assets/tiles/house_tile_1_d3.png');
}

Tile.prototype.create = function(){
	this.sprite = this.scene.add.image(this.start_x, this.start_y, this.tile).setOrigin(0,0);
}

function createTiles(scene, tiles)
{
	//let num_tiles = (config.width / 256) * (config.height / 256);
	for(let i = 0; i < world_height ; i+=128)
	{
		for(let j = 0; j < world_width; j+=128)
		{
			let current_tile = new Tile(scene, /*'default_tile_small'*/ 'house_tile_1_d0', j, i);
			tiles.push(current_tile);
			current_tile.create();
			console.log("spawned a tile at: " + j + ", " + i);
		}
	}
}