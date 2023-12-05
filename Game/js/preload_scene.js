/*
	class PreloadScene:
	
	This class is reserved for preloading heavy assets that will be commonly used throughout the game.
	This allows the game to keep data around in memory for the entire execution of the game, which means that the usage of this class should be reserved to large assets of common use.
	The class can also be abused to preload literally all assets if the game is small enough, making it so that there would be no need to load any resources during the rest of the execution.
*/

class PreloadScene extends Phaser.Scene
{
	preload()
	{
		this.load.spritesheet('town-on-fire', 'assets/town_on_fire_reduced.png', { frameWidth: 1200, frameHeight: 730 });
		preloadDragonData(this);
		preloadTileData(this);
		preloadFlameData(this);
	}
	
	create()
	{
		this.scene.start("MainMenu");
	}
}