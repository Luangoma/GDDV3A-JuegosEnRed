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