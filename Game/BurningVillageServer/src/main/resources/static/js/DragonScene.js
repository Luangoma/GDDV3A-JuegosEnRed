class DragonScene extends Phaser.Scene
{
	is_loaded;
	constructor()
	{
		super({});
		this.is_loaded = false;
	}
	
	getFinishedLoading(){
		return this.is_loaded;
	}
	
	setFinishedLoading(val){
		this.is_loaded = true;
	}
	
	//maybe make a call to finished loading in create at the start and make it so that the child classes will have to call super.create() or something.
	//maybe implement some kind of loading stage thing or loading percent which dictates how much the loading bar has to skip on each increment depending on the assets that have been loaded.
}