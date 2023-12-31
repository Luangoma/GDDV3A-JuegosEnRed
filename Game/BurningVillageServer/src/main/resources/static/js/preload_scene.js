/*
	class PreloadScene:
	
	This class is reserved for preloading heavy assets that will be commonly used throughout the game.
	This allows the game to keep data around in memory for the entire execution of the game, which means that the usage of this class should be reserved to large assets of common use.
	The class can also be abused to preload literally all assets if the game is small enough, making it so that there would be no need to load any resources during the rest of the execution.
*/

class PreloadScene extends DragonScene
{
	preload()
	{
		//preload cursor image
		this.load.image('cursor02', './assets/cursor02.png');
		//set the cursor image (we're doing this in the preload function instead of the create function to ensure that the cursor is the first thing to appear on screen. Otherwise the custom cursor won't be visible during the loading screen.)
		this.input.setDefaultCursor('url(assets/cursor02.png), pointer');
		
		//preload heavy assets and commonly used assets
		preloadGameOverData(this);
		preloadDragonData(this);
		preloadTileData(this);
		preloadFlameData(this);
		
		//preload game music
		this.load.audio("CANCION_01", ["./sounds/music/CANCION_01.mp3"]);
	}
	
	create()
	{
		//reset the loading status to "not loaded".
		this.setFinishedLoading(false);
		
		//create data and anims
		createGameOverData(this);
		createTileData(this);
		createDragonData(this);
		
		//play the game music the first time that the game data has been loaded.
		playGameMusic(this);
		
		//start the main menu scene as soon as the preloading and creation processes are finished
		//this.scene.start("MainMenu");
		
		//set the loading status to "finished loading".
		this.setFinishedLoading(true);
	}
}