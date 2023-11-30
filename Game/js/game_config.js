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
	scene : []
};

var world_width = 2048;
var world_height = 2048;