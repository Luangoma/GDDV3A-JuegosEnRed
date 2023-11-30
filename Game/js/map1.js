var Map1 = {
	key: 'Map1',
	preload: Map1Preload,
	create: Map1Create,
	update: Map1Update
};

var player1;
var player2;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

function Map1Preload() {
	
	//Assets for testing (TODO: Remove)
	this.load.image('sky', 'assets/sky.png');
	this.load.image("fondo","assets/fondo_test.png");
	this.load.image('ground', 'assets/platform.png');
	this.load.image('star', 'assets/star.png');
	this.load.image('bomb', 'assets/bomb.png');
	this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
	
	//Real assets for the game (some are placeholders)
	this.load.image("fondo","assets/fondo_test.png");
	preloadDragon(this);

	//Animación fuego, burning_animation
	this.load.spritesheet('animacionFuegoStart', 'assets/burning_animation/burning_start_1.png', {frameWidth: 24, frameHeight: 32});
	this.load.spritesheet('animacionFuegoLoop', 'assets/burning_animation/burning_loop_1.png', {frameWidth: 24, frameHeight: 32});
	this.load.spritesheet('animacionFuegoEnd', 'assets/burning_animation/burning_end_1.png', {frameWidth: 24, frameHeight: 32});
}

function Map1Create() {
	
	this.cameras.main.setBounds(0, 0, 2048, 2048);
    this.physics.world.setBounds(0, 0, 2048, 2048);

	
	this.add.image(0, 0, 'fondo').setOrigin(0,0).setScale(2);
	
	player1 = new Dragon(this, 0, 1024, 1024);
	player1.create();

	player2 = new Dragon(this, 1, 800, 800);
	player2.create();

	
	
	stars = this.physics.add.group({
		key: 'star',
		repeat: 11,
		setXY: { x: 12, y: 0, stepX: 70 }
	});

	stars.children.iterate(function (child) {
		child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
	});

	bombs = this.physics.add.group();

	//  The score
	scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

	//  Checks to see if the player1 overlaps with any of the stars, if he does call the collectStar function
	this.physics.add.overlap(player1.sprite, stars, collectStar, null, this);
	this.physics.add.collider(player1.sprite, bombs, hitBomb, null, this);

	this.physics.add.overlap(player2.sprite, stars, collectStar, null, this);
	this.physics.add.collider(player2.sprite, bombs, hitBomb, null, this);
	
	this.cameras.main.startFollow(player1.sprite, true);
	this.cameras.main.setZoom(1);






	// ANIMACIÓN FUEGO

	// Añadir objeto a la escena con el sprite animacionFuegoStart.
	var animacionFuego = this.add.sprite(1000, 1000, 'animacionFuegoStart').setScale(5);
	
	animacionFuego.smoothed = false;

	// Crear animaciones fuego, animaciones start, loop y end.
	//Animación animacionFuegoStart, inicio del fuego, solo reproducir 1 vez.
	this.anims.create({
		key: 'animacionFuegoStart',
		frames: this.anims.generateFrameNumbers('animacionFuegoStart', { start: 0, end: 3 }),
		frameRate: 7,
		repeat: 0
	});

	//Animación animacionFuegoLoop, bucle del fuego, reproducir continuamente.
	this.anims.create({
		key: 'animacionFuegoLoop',
		frames: this.anims.generateFrameNumbers('animacionFuegoLoop', { start: 0, end: 3 }),
		frameRate: 7,
		repeat: -1
	});

	//Animación animacionFuegoEnd, final del fuego, solo reproducir 1 vez al terminar la llama.
	this.anims.create({
		key: 'animacionFuegoEnd',
		frames: this.anims.generateFrameNumbers('animacionFuegoEnd', { start: 0, end: 3 }),
		frameRate: 7,
		repeat: 0
	});

	//Reproducir animaciones fuego
	//animacionFuego.anims.play('animacionFuegoStart');
	//animacionFuego.anims.play('animacionFuegoLoop');
	//animacionFuego.anims.play('animacionFuegoEnd');

	// Las animaciones están disponibles globalmente para todos los elementos del juego, no pertenecen
	// a un elemento en concreto. Puedo decirle al elemento animacionFuego que reproduzca otra animación
	// aunque sea con otro spritesheet que no sea con el que se creó el elemento.

	// Una vez la animación animacionFuegoStart termine, comienza la animación animacionFuegoLoop.
	animacionFuego.anims.play("animacionFuegoStart").once('animationcomplete', () => {
		animacionFuego.anims.play("animacionFuegoLoop");
	 });

	// Falta implementar que pasado un tiempo la casa deje de quemarse y se reproduzca la animación
	// animacionFuegoEnd.






}

function Map1Update(time, delta) {
	player1.update(time, delta);
	player2.update(time, delta);
}

function collectStar(player, star) {
	star.disableBody(true, true);

	//  Add and update the score
	score += 10;
	scoreText.setText('Score: ' + score);

	if (stars.countActive(true) === 0) {
		//  A new batch of stars to collect
		stars.children.iterate(function (child) {

			child.enableBody(true, child.x, 0, true, true);

		});

		var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

		var bomb = bombs.create(x, 16, 'bomb');
		bomb.setBounce(1);
		bomb.setCollideWorldBounds(true);
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
		bomb.allowGravity = false;

	}
}

function hitBomb(player, bomb) {
	this.physics.pause();

	player.setTint(0xff0000);

	player.anims.play('turn');

	gameOver = true;
}