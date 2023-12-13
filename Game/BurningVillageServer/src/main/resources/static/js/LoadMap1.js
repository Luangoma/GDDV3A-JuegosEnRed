class LoadMap1 extends LoadingScreenScene
{
	constructor()
	{
		super({});
	}
	
	create()
	{
		this.setScenesToLoad(["map_test_1"]);
		this.setSceneToEnter("map_test_1");
		super.create();
	}
	
	update(time,delta)
	{
		super.update(time,delta);
	}
}