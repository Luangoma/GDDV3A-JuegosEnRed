function Tile(scene,tilename,x,y)
{
	this.scene = scene;
	this.tile = tilename;
	this.start_x = x;
	this.start_y = y;
}

function preloadTile(scene)
{
	scene.load.image('default_tile', './assets/tiles/default_tile.png');
	scene.load.image('default_tile_small', './assets/tiles/default_tile_small.png');
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
			let current_tile = new Tile(scene, 'default_tile_small', j, i);
			tiles.push(current_tile);
			current_tile.create();
			console.log("spawned a tile at: " + j + ", " + i);
		}
	}
}