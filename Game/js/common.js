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
	game.sound.stopAll();
	scene.sound.removeAll();
	if (game.sound.context.state === 'suspended') {
		game.sound.context.resume();
	}
}

function distanceBetweenPoints2D(point1, point2){
	let dist_x = point1.x - point2.x;
	let dist_y = point1.y - point2.y;
	let delta = dist_x * dist_x + dist_y * dist_y;
	let len = Math.sqrt(delta);
	return len;
}