var Map1 = {
	key: 'Map1',
	preload: Map1Preload,
	create: Map1Create,
	update: Map1Update
};

var player1;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

function Map1Preload() {

	this.load.image("fondo","assets/fondo_test.png");	
	this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
	preloadDragon(this);
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
}


var deltaTime = 0;

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