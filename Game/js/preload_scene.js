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
		//preload cursor image
		this.load.image('cursor02', './assets/cursor02.png');
		
		//preload heavy assets and commonly used assets
		preloadGameOverData(this);
		preloadDragonData(this);
		preloadTileData(this);
		preloadFlameData(this);
		
		preloadProgressBarData(this);
	}
	
	create()
	{
		//set the cursor image
		this.input.setDefaultCursor('url(assets/cursor02.png), pointer');
		
		//create data and anims
		createGameOverData(this);
		createTileData(this);
		createDragonData(this);
		
		//start the main menu scene as soon as the preloading and creation processes are finished
		this.scene.start("MainMenu");
	}
}