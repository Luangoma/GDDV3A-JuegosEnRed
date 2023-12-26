class map_test_multiplayer extends DragonScene
{
	
	players = [];
	
	preload()
	{
		this.load.image("world_grass","./assets/WorldGrass.png");
	}
	
	create()
	{
		enableSound(this);
		enableInput(this);
		
		//this.setFinishedLoading(true);
		
		
		
	}
	
};
