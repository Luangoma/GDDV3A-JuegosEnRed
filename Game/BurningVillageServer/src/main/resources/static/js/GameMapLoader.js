class GameMapLoader extends LoadingScreenScene
{
	constructor()
	{
		super({});
	}
	
	create()
	{
		this.setScenesToLoad(["GameMap"]);
		this.setSceneToEnter("GameMap");
		super.create();
	}
	
	update(time,delta)
	{
		super.update(time,delta);
	}
}