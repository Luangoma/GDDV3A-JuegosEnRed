//Phaser Config
var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false
		}
	},
	pixelArt: true,
	scene : [],
	parent:"GameBox"
};
