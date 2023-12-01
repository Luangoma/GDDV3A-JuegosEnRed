function Flame(scene, owner, x, y, velx, vely){
	
	let current_flame = owner.flames.create(x, y, 'flame');
	current_flame.owner_id = owner.player_id;
	
	current_flame.setVelocityX(velx);
	current_flame.setVelocityY(vely);
	owner.scene.time.delayedCall(500 + getRandomInRange(0,200), () => {current_flame.destroy();}, [], this);
	
}

function preloadFlameData(scene){
	scene.load.image('flame', './assets/flame.png');
}