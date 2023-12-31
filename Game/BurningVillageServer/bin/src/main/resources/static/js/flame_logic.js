
function blazeHouse(flame, house) {
    //flame.disableBody(true, true);
    //house.play.anim("animacionFuegoStart");
}

// playerSprite: sprite del jugador que recibe llamas, flame: llamas del rival, y player: jugador que recibe llamas
function damageEnemy(playerSprite, flame, player) { 
    player.health -= 1;
    console.log("Current Player Health: " + player.health);
    flame.disableBody(true, true);
    playerSprite.setTint(0xff0000); // El personaje se pone rojo

	player.scene.time.delayedCall(1000, ()=>{playerSprite.setTint(0xffffff);}); // El sprite deja de estar rojo tras 1 seg
    if(player.health<=0){
        console.log("Killing dragon");
		let oponent_player = flame.owner;
		oponent_player.max_ammo = 200;		// El dragón que mató a su oponente tendrá fuego ilimitado mientras este reaparece
		playerSprite.disableBody(true, true); 	// Ocultamos y deshabilitamos el dragón

		player.respawnTime = 10;		// Sirve de contador del tiempo restante para reaparecer
		if(player.player_id==0) {
			deadCountdown0 = player.scene.time.addEvent({
				delay: 1000, // Se ejecuta cada segundo

				callback: ()=>{
					if(player.respawnTime>0){
						console.log("Tiempo restante: " + player.respawnTime);
						player.respawnTime--;
					} else {		// Si se ha acabado el tiempo
						player.health=100;
						playerSprite.enableBody(true, 500, 500, true, true);	// Rehabilitamos el dragón en la posición 500 500 (elegir una)
						oponent_player.max_ammo = 60;		// Quitamos el bonus al dragón que lo mató
						deadCountdown0.remove();
						console.log("Se ha eliminado el deadcount del dragon jugador con id: "+player.player_id);
					}
				},
				callbackScope: this,
				loop: true // Indica que se repita indefinidamente
			});
		} else if(player.player_id==1){
			deadCountdown1 = player.scene.time.addEvent({
				delay: 1000, // Se ejecuta cada segundo

				callback: ()=>{
					if(player.respawnTime>0){
						console.log("Tiempo restante: " + player.respawnTime);
						player.respawnTime--;
					} else {		// Si se ha acabado el tiempo
						player.health=100;
						playerSprite.enableBody(true, 500, 500, true, true);	// Rehabilitamos el dragón en la posición 500 500 (elegir una)
						oponent_player.max_ammo = 60;		// Quitamos el bonus al dragón que lo mató
						deadCountdown1.remove();
						console.log("Se ha eliminado el deadcount del dragon jugador con id: "+player.player_id);
					}
				},
				callbackScope: this,
				loop: true // Indica que se repita indefinidamente
			});
		}
    }
    

}

function damageTile(tileSprite, flame, tile){
	//Si la casilla no puede ser dañada, salir de la función con un early return.
	//Aunque este caso no se debería de dar nunca por cómo se añade la detección de colisiones en la clase Tile, la comprobación se mantiene por razones de seguridad (posibles cambios a futuro en la implementación).
	if(!tile.is_destructible)
	{
		return;
	}
	
	//do not process tile damage anymore once the tile has been fully destroyed (hp = 0).
	if(tile.health <= 0)
	{
		return;
	}
	
	//if the current dragon is not null, then take away their score by 1
	if(tile.current_dragon)
	{
		tile.current_dragon.points -= 1;
	}
	
	tile.last_dragon = tile.current_dragon;
	tile.current_dragon = flame.owner;
	
	if(tile.current_dragon !== tile.last_dragon)
	{
		tile.has_to_switch_sprite = true;
	}
	
	//if the current dragon is not null, then add 1 point to their score.
	if(tile.current_dragon)
	{
		tile.current_dragon.points += 1;
	}
	
	tile.is_on_fire = true;
	
	//possible fix for race condition with flame coloring. Need to rework.
	/*
	tile.fire_sprite.setTexture(flame.owner.player_id === 0 ? 'FuegoLoop' : 'FuegoLoop_blue');
	if(tile.current_dragon !== tile.last_dragon)
		tile.fire_sprite.play(flame.owner.player_id === 0 ? 'animacionFuegoLoop' : 'animacionFuegoLoop_blue');
	*/
	
	//disabling the flame ensures that no more than one collision is detected per hit, but allowing the flames to keep existing and hitting the houses on the other side is far more epic looking.
	/*
	tile.health -= 1;
	flame.disableBody(true, true);
	*/
	
	let dt = tile.scene.sys.game.loop.delta / 1000;
	let dmg = 10 * dt;
	tile.health -= dmg;
	
	damageTintSprite(tile.scene, tileSprite);
	
	console.log("hit with dmg: " + dmg);

	if(tile.current_dragon.points >= 60){

		console.log("GAME OVER");
		// game.scene.stop('map_test_1');
		// game.scene.start("game_over");
	}
}