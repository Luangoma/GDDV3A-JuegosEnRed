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

/**
var styleText_MedievalPixel = {
	fontFamily: 'medieval-pixel',	// Tipografia
	color: '#ffffff',				// Color del texto
	stroke: 0x000,					// Color del contorno
	strokeThickness: 4				// Grosor del contorno
};
//*/
// Estilo de texto para contenidos generales
var styleText_MedievalPixel_30 = {	
	fontFamily: 'medieval-pixel',	// Tipografia
	color: '#ffffff',				// Color del texto
	fontSize: 30,					// Tamaño del texto
	stroke: 0x000,					// Color del contorno
	strokeThickness: 4				// Grosor del contorno
}
// Estilo  de texto para titulos (titulo de créditos)
var styleText_MedievalPixel_90 = {	
	fontFamily: 'medieval-pixel',	// Tipografia
	color: '#ffffff',				// Color del texto
	fontSize: 90,					// Tamaño del texto
	stroke: 0x000,					// Color del contorno
	strokeThickness: 4,				// Grosor del contorno
	align: 'left'					// Alineacion a la derecha
}

/**
var styleText_PixelSansSerif = { 
	fontFamily: 'pixel_sans_serif',	// Tipografia
	stroke: 0x000,					// Color del contorno
	strokeThickness: 4				// Grosor del contorno
}
//*/
// Estilo de texto para subtitulos (desarrolldores en creditos)
var styleText_PixelSansSerif_18 = {
	fontFamily: 'pixel_sans_serif',	// Tipografia
	stroke: 0x000,					// Color del contorno
	strokeThickness: 4,				// Grosor del contorno
	fontSize: 18					// Tamaño del texto
}