//this really needs a rework... i feel like this sucks so much right now, lol.
//maybe add some enums and some kind of real text list / array and some functions to get them through an index / enum name or whatever...

const cosmetics = {
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
};

var playerCosmetics = {
	body: 0
};

function preloadCosmeticsData(scene){
	
	//load shirts:
	for(let i = 0; i < cosmetics.body.length; ++i){
		scene.load.image(cosmetics.body[i], "./assets/cosmetics/" + cosmetics.body[i] + ".png");
	}
}