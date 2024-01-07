//this really needs a rework... i feel like this sucks so much right now, lol.
//maybe add some enums and some kind of real text list / array and some functions to get them through an index / enum name or whatever...

const cosmetics = {
	/*
	body: [
		"shirt_none",
		"shirt_01",
		"shirt_02",
		"shirt_03",
		"shirt_04",
		"shirt_05",
		"shirt_06",
		"shirt_07",
		"shirt_08",
		"shirt_09"
	]
	*/
	body: [ //these names could be automatically inserted, wtf am I doing with my life...
		"cosmetic_none",
		"cape_01",
		"cape_02",
		"cape_03",
		"cape_04",
		"cape_05",
		"cape_06",
		"cape_07",
		"cape_08",
		"cape_09",
		"cape_10",
		"cape_11",
		"cape_12",
		"cape_13"
	]
};

var playerCosmetics = {
	body: 0
};

function preloadCosmeticsData(scene){
	
	//scene.load.spritesheet('dragon','./assets/dragon.png', {frameWidth: 144, frameHeight: 125});
	
	//load the "none" cosmetic (literally just a transparent image lol):
	scene.load.spritesheet("cosmetic_none", "./assets/cosmetics/cosmetic_none.png", {frameWidth: 144, frameHeight: 125});
	
	//load cosmetics (operations begin from index 1 because index 0 is reserved for the generic "cosmetic_none" string):
	//load capes:
	for(let i = 1; i < cosmetics.body.length; ++i){
		scene.load.spritesheet(cosmetics.body[i], "./assets/cosmetics/capes/" + cosmetics.body[i] + ".png", {frameWidth: 144, frameHeight: 125});
	}
}

function createCosmeticsData(scene){
	scene.anims.create({
		key: 'flying_cosmetic_none',
		frames: scene.anims.generateFrameNumbers('cosmetic_none', { start: 0, end: 2 }),
		frameRate: 7,
		repeat: -1
	});
	
	for(let i = 1; i < cosmetics.body.length; ++i){
		scene.anims.create({
			key: 'flying_' + cosmetics.body[i],
			frames: scene.anims.generateFrameNumbers(cosmetics.body[i], { start: 0, end: 2 }),
			frameRate: 7,
			repeat: -1
		});
	}
}