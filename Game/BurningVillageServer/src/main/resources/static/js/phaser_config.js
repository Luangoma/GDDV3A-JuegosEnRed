//Phaser Config

//var default_game_resolution = {width: 1024, height: 576}; // a true 16:9 aspect ratio resolution for the future?
var default_game_resolution = {width: 800, height: 600};

var config = {
	type: Phaser.AUTO,
	width: default_game_resolution.width,
	height: default_game_resolution.height,
	dom: {
        createContainer: true
    },
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
