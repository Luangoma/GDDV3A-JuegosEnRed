//import config from "./game_config.js";

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
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

function preload() {
	this.load.image('sky', 'assets/sky.png');
	this.load.image("fondo","assets/fondo_test.png");
	this.load.image('ground', 'assets/platform.png');
	this.load.image('star', 'assets/star.png');
	this.load.image('bomb', 'assets/bomb.png');
	this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
	this.load.spritesheet('dragon','./assets/dragon.png', {frameWidth: 144, frameHeight: 125});
}

function create() {
	
	this.cameras.main.setBounds(0, 0, 2048, 2048);
    this.physics.world.setBounds(0, 0, 2048, 2048);
	
	//  A simple background for our game
	//this.add.image(400, 300, 'sky');
	this.add.image(0, 0, 'fondo').setOrigin(0,0).setScale(2);

	//  The platforms group contains the ground and the 2 ledges we can jump on
	platforms = this.physics.add.staticGroup();

	//  Here we create the ground.
	//  Scale it to fit the width of the game (the original sprite is 400x32 in size)
	platforms.create(400, 568, 'ground').setScale(2).refreshBody();

	//  Now let's create some ledges
	//platforms.create(600, 400, 'ground');
	//platforms.create(50, 250, 'ground');
	//platforms.create(750, 220, 'ground');

	// The player and its settings
	player = this.physics.add.sprite(1024, 1024, 'dragon');

	//  Player physics properties. Give the little guy a slight bounce.
	player.setBounce(0.2);
	player.setCollideWorldBounds(true);

	//  Our player animations, turning, walking left and walking right.
	/*
	this.anims.create({
		key: 'left',
		frames: this.anims.generateFrameNumbers('dragon', { start: 0, end: 3 }),
		frameRate: 10,
		repeat: -1
	});
	*/
	
	/*
	this.anims.create({
		key: 'turn',
		frames: [{ key: 'dragon', frame: 4 }],
		frameRate: 20
	});
	*/
	
	this.anims.create({
		key: 'turn',
		frames: this.anims.generateFrameNumbers('dragon', { start: 0, end: 2 }),
		frameRate: 7,
		repeat: -1
	});
	player.anims.play('turn');

	/*
	this.anims.create({
		key: 'right',
		frames: this.anims.generateFrameNumbers('dragon', { start: 5, end: 8 }),
		frameRate: 10,
		repeat: -1
	});
	*/

	//  Input Events
	cursors = this.input.keyboard.createCursorKeys();

	//  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
	stars = this.physics.add.group({
		key: 'star',
		repeat: 11,
		setXY: { x: 12, y: 0, stepX: 70 }
	});

	stars.children.iterate(function (child) {

		//  Give each star a slightly different bounce
		child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

	});

	bombs = this.physics.add.group();

	//  The score
	scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

	//  Collide the player and the stars with the platforms
	this.physics.add.collider(player, platforms);
	this.physics.add.collider(stars, platforms);
	this.physics.add.collider(bombs, platforms);

	//  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
	this.physics.add.overlap(player, stars, collectStar, null, this);

	this.physics.add.collider(player, bombs, hitBomb, null, this);
	
	
	this.cameras.main.startFollow(player, true);
	this.cameras.main.setZoom(1);
}

var deltaTime = 0;

function getForwardVector(sprite)
{
	const angleInRadians = Phaser.Math.DegToRad(sprite.angle);
    const forwardVector = new Phaser.Math.Vector2(Math.cos(angleInRadians), Math.sin(angleInRadians));
	return forwardVector;
}

function update(time, delta) {
	
	//console.log(getForwardVector(player));
	console.log(delta);
	if (gameOver) {
		return;
	}
	
	//player.anims.play('left', true);
	
	let playerVelocity = 10 * delta;
	let playerTurnSpeed = 0.1;
	playerForwardVector = getForwardVector(player);
	player.setVelocityX(playerForwardVector.y*playerVelocity);
	player.setVelocityY(-playerForwardVector.x*playerVelocity);

	if (cursors.left.isDown) {
		//player.setVelocityX(-160);
		player.angle-=playerTurnSpeed * delta;
	}
	else if (cursors.right.isDown) {
		//player.setVelocityX(160);
		player.angle+=playerTurnSpeed * delta;
	}
	/*
	else {
		player.setVelocityX(0);
	}*/

	if (cursors.up.isDown && player.body.touching.down) {
		player.setVelocityY(-330);
	}
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