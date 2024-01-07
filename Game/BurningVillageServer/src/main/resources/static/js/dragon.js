function Dragon(new_scene, new_player_id, start_x, start_y, flames_group){
	this.scene = new_scene;
	this.player_id = new_player_id; //0: red, 1: blue. This variable should be renamed to dragonId or dragonSkin or whatever...
	
	this.player_velocity = 200;
	this.player_turn_speed = 0.1;

	// Contador de casas quemadas de cada jugador
	this.points = 0;

	this.flames = flames_group;	
	
	this.max_ammo = 60;
	this.ammo = this.max_ammo; //cantidad de llamas que el dragon puede spawnear en una llamarada
	this.delay = 3 * 1000; //tiempo entre llamaradas en ms (N sec * 1000 = ms)
	this.time_elapsed = 0;
	
	this.isShooting = false; //variable that holds the flame shooting status of the dragon.

	this.health = 100;	// Vida del dragon
	
	this.respawnTime = 0; //this variable has given me a headache trying to debug an error in the UI when playing multiplayer. People, you should ALWAYS fucking define the variables of your objects before you use them, even if JS uses prototypes and will add it later on, because you never know when you'll hit an edge case where you read a property that does not exist...
	
	
	//placeholders for online data holding. These do nothing in "single player" (local multiplayer).
	this.name = "none";
	this.playerId = -1;
	
	//image and data for the clothes/cosmetics:
	this.cosmetic = -1;
	this.cosmetic_sprite = null;
	
	//create the dragon data
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

Dragon.prototype.setCosmeticBodyId = function(id){
	if(this.cosmetic === id){
		return; //early return to prevent changing any information if the id is already the same (that way, we prevent wasting resources, as well as the animation getting stuck in the first frame if this information is updated on the update function, aka, updated every single frame.)
	}
	this.cosmetic = id;
	this.cosmetic_sprite.setTexture(cosmetics.body[this.cosmetic]);
	this.cosmetic_sprite.anims.play("flying_" + cosmetics.body[this.cosmetic]);
};

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
	
	this.cosmetic_sprite = this.scene.add.sprite(this.sprite.x, this.sprite.y, cosmetics.body[playerCosmetics.body]);
	this.cosmetic_sprite.anims.play('flying_cosmetic_none');
	
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
	
	//KNOWN ISSUE: Phaser 3's arcade physics run on a fixed step, which means that the update method is NOT called every single frame, which means that things will look jittery af if the position is updated on the update method... fuck phaser's terribly flawed design.
	
	//update the cosmetics position and visuals:
	//the values should be lerped because otherwise the movement looks kind of jittery due to the nature of the update function (does not run every single tick/frame like one would expect from a regular game engine, figures, this is JS after all...)
	this.cosmetic_sprite.x = this.sprite.x;
	this.cosmetic_sprite.y = this.sprite.y;
	this.cosmetic_sprite.angle = this.sprite.angle;
	
	/*
	this.cosmetic_sprite.x = lerpValue(this.cosmetic_sprite.x, this.sprite.x, delta / 1000 * 10);
	this.cosmetic_sprite.y = lerpValue(this.cosmetic_sprite.y, this.sprite.y, delta / 1000 * 10);
	this.cosmetic_sprite.angle = lerpValue(this.cosmetic_sprite.angle, this.sprite.angle, delta/1000*10);
	*/
	
	
	//Update player movement
	let playerVelocity = this.player_velocity; //something something phaser doesn't handle delta time in velocity and acceleration for some reason :(
	let playerTurnSpeed = this.player_turn_speed;
	playerForwardVector = getForwardVector(this.sprite);
	this.sprite.setVelocityX(playerForwardVector.y*playerVelocity);
	this.sprite.setVelocityY(-playerForwardVector.x*playerVelocity);
	this.cosmetic_sprite.visible = this.health>0;

	//Execute Player Controls
	if(this.health>0)
	{
		if (this.keyboard_controls.left.isDown) //Rotate left
		{
			this.sprite.angle-=playerTurnSpeed * delta;
		}
		else
		if (this.keyboard_controls.right.isDown) //Rotate right
		{
			this.sprite.angle+=playerTurnSpeed * delta;
		}
		
		if ((this.isShooting && this.ammo > 0) || (this.keyboard_controls.up.isDown && this.ammo > 0)) //Shoot flames if the keyboard is pressed (or if the remote client is told to shoot in online mode)
		{
			this.isShooting = true;
		}
		else
		{
			this.isShooting = false; //this part got extremely wonky just for multiplayer replication...
		}
		
		if(this.isShooting)
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