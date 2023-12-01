//Add the main scene camera. This camera will follow the player with local id 0. Used for online multiplayer mode.
//note: still requires being used even in local multiplayer before being able to add the split screen cameras.
function addMainCamera(scene, player)
{
	scene.cameras.main.setBounds(0, 0, 2048, 2048);
	scene.physics.world.setBounds(0, 0, 2048, 2048);
	scene.cameras.main.startFollow(player.sprite, true);
	scene.cameras.main.setZoom(1);
}

//Add the split screen cameras to the scene. Can be configured to split top/bottom or left/right.
// 0 = t/b, 1 = l/r
//TODO: modify to use something like Camera.splitType... instead of 0 and 1, which would imply putting this in a class or using prototypes.
function addSplitScreenCamera(scene, player1, player2, split_type = 0)
{
	if(split_type === 0) //top / bottom camera split
	{
		scene.cameras.add(0,config.height/2,config.width,config.height/2).startFollow(player1.sprite,true).setBounds(0,0,world_width, world_height);
		scene.cameras.add(0,0,config.width,config.height/2).startFollow(player2.sprite,true).setBounds(0,0,world_width, world_height);
	}
	else //left / right camera split
	{
		scene.cameras.add(config.width/2,0,config.width/2,config.height).startFollow(player1.sprite,true).setBounds(0,0,world_width, world_height);
		scene.cameras.add(0,0,config.width/2,config.height).startFollow(player2.sprite,true).setBounds(0,0,world_width, world_height);
	}
}