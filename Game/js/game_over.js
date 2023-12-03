var game_over = {
	key: 'game_over',
	preload: game_overPreload,
	create: game_overCreate,
	update: game_overUpdate
};

function game_overPreload(){

	this.load.spritesheet('town-on-fire', 'assets/town-on-fire-spritesheet.png', { frameWidth: 1200, frameHeight: 730 });

}

function game_overCreate(){

    var background = this.add.sprite(0,0, 'town-on-fire').setOrigin(0,0).setDisplaySize(config.width,config.height);

	this.anims.create({
		key: 'animacionBackground',
		frames: this.anims.generateFrameNumbers('town-on-fire', { start: 0, end: 64 }),
		frameRate: 7,
		repeat: -1
	});

	background.anims.play("animacionBackground");

	var titulo = this.add.text(config.width/2, 150, 'Game Over', styleText_MedievalPixel_90).setOrigin(0.5);

}

function game_overUpdate(time, delta){
	
}