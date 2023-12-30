function getForwardVector(sprite)
{
	const angleInRadians = Phaser.Math.DegToRad(sprite.angle);
    const forwardVector = new Phaser.Math.Vector2(Math.cos(angleInRadians), Math.sin(angleInRadians));
	return forwardVector;
}

function getRandomInRange(min, max)
{
	return Math.random() * (max - min) + min;
}

function getRandomInRangeInt(min, max)
{
	return Math.floor(getRandomInRange(min,max + 1));
}

function shuffleList(list)
{
	for(let i = 0; i < list.length; ++i)
	{
		let rand = getRandomInRangeInt(0, list.length - 1);
		let temp = list[i];
		list[i] = list[rand];
		list[rand] = temp;
	}
}

function createPhysicsGroup(scene){
	return scene.physics.add.group();
}


function damageTintSprite(scene, sprite, duration = 1000)
{
	sprite.setTint(0xff0000); // el sprite se pone rojo al recibir daño.
	scene.time.delayedCall(duration, ()=>{sprite.setTint(0xffffff);}); // El sprite deja de estar rojo tras haber pasado duration ms (por defecto 1000ms = 1sec).
}

function setWorldBounds(scene, min_x, min_y, max_x, max_y)
{
	scene.physics.world.setBounds(min_x, min_y, max_x, max_y);
}

function clampValue(value, min = 0, max = 1){
	ans = value;
	ans = ans < min ? min : ans;
	ans = ans > max ? max : ans;
	return ans;
}

function lerpValue(a,b,t = 0.5){
	return (1 - t) * a + b * t;
}

function enableSound(scene){
	if (game.sound.context.state === 'suspended') {
		game.sound.context.resume();
	}
}

function stopSound(scene){
	game.sound.stopAll();
	scene.sound.removeAll();
	gameConfig.music = null; //reset the music to null
}

function playGameMusic(scene){
	//If the game music is null, then create the data for the music and play it
	//also check if the key is in cache so that it won't give an error if the song tries to play while it is still loading.
	if(!gameConfig.music && scene.cache.audio.exists("CANCION_01")){
		gameConfig.music = scene.sound.add("CANCION_01", {loop: true});
		gameConfig.music.play();
		gameConfig.volumeFunctions.setMusicVolume(gameConfig.volumeSettings.musicVolume);
	}
}

function distanceBetweenPoints2D(point1, point2){
	let dist_x = point1.x - point2.x;
	let dist_y = point1.y - point2.y;
	let delta = dist_x * dist_x + dist_y * dist_y;
	let len = Math.sqrt(delta);
	return len;
}


function stringContains(str, arr){
	for(let i = 0; i < arr.length; ++i){
		if(str.includes(arr[i])){
			return true;
		}
	}
	return false;
}

function stringReplaceHTMLSymbols(str){
	let ans = str;
	ans = ans.split('&').join('&amp');
	ans = ans.split('<').join('&lt');
	ans = ans.split('>').join('&gt');
	return ans;
}

//todo: change a lot of the stuff from the game to use scale and add a proper button to all scenes or keep a scale scene with the button at the top of the scene stack at all times.
function toggleFullScreen() {
    if (game.scale.isFullscreen) {
        game.scale.stopFullscreen();
		game.scale.resize(default_game_resolution.width,default_game_resolution.height); //remember to change this to whatever default size you choose for the window size of the game in phaser config.
		game.scale.refresh();
	} else {
        game.scale.startFullscreen();
		game.scale.resize(window.innerWidth, window.innerHeight);
		game.scale.refresh();
    }
}

function setInputEnabled(scene, enabled_value = true){
	scene.input.keyboard.manager.enabled = enabled_value;
}

function enableInput(scene) {
	setInputEnabled(scene,true);
}

function disableInput(scene) {
	setInputEnabled(scene,false);
}