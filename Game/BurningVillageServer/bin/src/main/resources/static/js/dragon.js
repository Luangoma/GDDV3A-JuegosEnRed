function Dragon(new_scene, new_player_id, start_x, start_y, flames_group){
	this.scene = new_scene;
	this.player_id = new_player_id;
	
	this.player_velocity = 200;
	this.player_turn_speed = 0.1;

	// Contador de casas quemadas de cada jugador
	this.points = 0;

	this.flames = flames_group;	
	
	this.max_ammo = 60;
	this.ammo = this.max_ammo; //cantidad de llamas que el dragon puede spawnear en una llamarada
	this.delay = 3 * 1000; //tiempo entre llamaradas en ms (N sec * 1000 = ms)
	this.time_elapsed = 0;


	this.health = 100;	// Vida del dragon
	
	this.createDragon(start_x, start_y);
}

function preloadDragonData(scene){
	scene.load.spritesheet('dragon','./assets/dragon.png', {frameWidth: 144, frameHeight: 125});
	scene.load.spritesheet('dragon_red','./assets/dragon_red.png', {frameWidth: 144, frameHeight: 125});
	scene.load.spritesheet('dragon_blue','./assets/dragon_blue.png', {frameWidth: 144, frameHeight: 125});
};

function createDragonData(scene){
	//create the animations for the player (creation should be done once per scene, within the create function of the scene)
	scene.anims.create({
		key: 'flyingDragon',
		frames: scene.anims.generateFrameNumbers('dragon', { start: 0, end: 2 }),
		frameRate: 7,
		repeat: -1
	});
	
	scene.anims.create({
		key: 'flyingDragon_red',
		frames: scene.anims.generateFrameNumbers('dragon_red', { start: 0, end: 2 }),
		frameRate: 7,
		repeat: -1
	});
	
	scene.anims.create({
		key: 'flyingDragon_blue',
		frames: scene.anims.generateFrameNumbers('dragon_blue', { start: 0, end: 2 }),
		frameRate: 7,
		repeat: -1
	});
}

Dragon.prototype.createDragon = function(start_x, start_y){
	
	//create the physics sprite for the player and play the flying animation
	switch(this.player_id)
	{
		case 0:
			console.log("dragon is red");
			this.sprite = this.scene.physics.add.sprite(start_x, start_y, 'dragon_red');
			this.sprite.anims.play('flyingDragon_red');
			break;
		case 1:
			console.log("dragon is blue");
			this.sprite = this.scene.physics.add.sprite(start_x, start_y, 'dragon_blue');
			this.sprite.anims.play('flyingDragon_blue');
			break;
		default:
			console.log("dragon is other.");
			this.sprite = this.scene.physics.add.sprite(start_x, start_y, 'dragon');
			this.sprite.anims.play('flyingDragon');
			break;
	}
	
	let player_ref = this.sprite;
	player_ref.setBounce(0.2);
	player_ref.setCollideWorldBounds(true);
	
	//Player controller:
	/*
		-Keyboard support for players 1 and 2
		TODO: controller and touch screen support, as well as real multiplayer support
	*/
	switch(this.player_id)
	{
		case 0:
			this.keyboard_controls = this.scene.input.keyboard.createCursorKeys();
			break;
		default:
			this.keyboard_controls = {
				left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
				right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
				up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
			};
			break;
	}
	
	this.scene.physics.add.overlap(this.sprite, this.flames, (player_sprite, flame) => {
		// Llamamos a damageEnemy con el sprite de llama y el player solo si las llamas que han colisionado con el player NO pertenecen a dicho player.
		if(flame.owner_id != this.player_id)
		{
			damageEnemy(player_sprite, flame, this);
		}
	}, null, this);
};


	
Dragon.prototype.update = function(time, delta){
	
	//Update player movement
	let playerVelocity = this.player_velocity; //something something phaser doesn't handle delta time in velocity and acceleration for some reason :(
	let playerTurnSpeed = this.player_turn_speed;
	playerForwardVector = getForwardVector(this.sprite);
	this.sprite.setVelocityX(playerForwardVector.y*playerVelocity);
	this.sprite.setVelocityY(-playerForwardVector.x*playerVelocity);

	//Execute Player Controls
	if(this.health>0){
		if (this.keyboard_controls.left.isDown) //Rotate left
		{
			this.sprite.angle-=playerTurnSpeed * delta;
		}
		else
		if (this.keyboard_controls.right.isDown) //Rotate right
		{
			this.sprite.angle+=playerTurnSpeed * delta;
		}
		
		if (this.keyboard_controls.up.isDown && this.ammo > 0) //Shoot flames
		{
			this.spawnFlames(1);
		}
	}	
	this.time_elapsed+=delta;
	if(this.time_elapsed >= this.delay)
	{
		this.time_elapsed -= this.delay;
		this.ammo = this.max_ammo;
	}
	
};

// Función para lanzar llamas por la boca.
Dragon.prototype.spawnFlames = function(flame_count){
	
	this.ammo -= 1;
	
	for(let i = 0; i < flame_count; ++i)
	{
		let forward_vec = getForwardVector(this.sprite);
		let spawn_distance = 50;
		let flame_spawn_point = new Phaser.Math.Vector2(this.sprite.x + forward_vec.y * spawn_distance, this.sprite.y - forward_vec.x * spawn_distance);
		
		forward_vec.x /= forward_vec.length();
		forward_vec.y /= forward_vec.length();
		
		let rand = getRandomInRange(-15,15);
		forward_vec.rotate(Phaser.Math.DegToRad(rand));
		let velx = (forward_vec.y * this.player_velocity * 2);
		let vely = (-forward_vec.x * this.player_velocity * 2);
		
		let current_flame = new Flame(this.scene, this, flame_spawn_point.x, flame_spawn_point.y, velx, vely);
	}
	
}