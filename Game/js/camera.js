//Add the main scene camera. This camera will follow the player with local id 0. Used for online multiplayer mode.
//note: still requires being used even in local multiplayer before being able to add the split screen cameras.
function addMainCamera(scene, player)
{
	scene.cameras.main.setBounds(0, 0, 2048, 2048);
	scene.cameras.main.startFollow(player.sprite, true);
	scene.cameras.main.setZoom(1);
}

//Add the split screen cameras to the scene. Can be configured to split top/bottom or left/right.
function addSplitScreenCamera(scene, p1, p2, split_type = CAMERA_SPLIT_TYPE.VERTICAL)
{
	switch(split_type)
	{
		case CAMERA_SPLIT_TYPE.HORIZONTAL: // horizontal camera split (top+bottom)
			scene.cameras.add(0,config.height/2,config.width,config.height/2).startFollow(p1.sprite,true).setBounds(0,0,world_width, world_height);
			scene.cameras.add(0,0,config.width,config.height/2).startFollow(p2.sprite,true).setBounds(0,0,world_width, world_height);
			break;
		case CAMERA_SPLIT_TYPE.VERTICAL: // vertical camera split (left+right)
			scene.cameras.add(config.width/2,0,config.width/2,config.height).startFollow(p1.sprite,true).setBounds(0,0,world_width, world_height);
			scene.cameras.add(0,0,config.width/2,config.height).startFollow(p2.sprite,true).setBounds(0,0,world_width, world_height);
			break;
	}
}

function addCamera(scene, p1, p2, mode = MULTIPLAYER_TYPE.LOCAL, split = CAMERA_SPLIT_TYPE.VERTICAL)
{
	switch(mode)
	{
		case MULTIPLAYER_TYPE.ONLINE:
			addMainCamera(scene, p1);
			break;
		case MULTIPLAYER_TYPE.LOCAL:
			addSplitScreenCamera(scene, p1, p2, split);
			break;
		default:
			console.log("Unknown multiplayer mode: " + mode);
			break;
	}
}