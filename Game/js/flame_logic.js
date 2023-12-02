
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
		deadCountdown = player.scene.time.addEvent({
			delay: 1000, // Se ejecuta cada segundo

			callback: ()=>{
				if(player.respawnTime>0){
					console.log("Tiempo restante: " + player.respawnTime);
					player.respawnTime--;
				} else {		// Si se ha acabado el tiempo
					player.health=100;
					playerSprite.enableBody(true, 500, 500, true, true);	// Rehabilitamos el dragón en la posición 500 500 (elegir una)
					oponent_player.max_ammo = 60;		// Quitamos el bonus al dragón que lo mató
					deadCountdown.remove();
				}
			},
			callbackScope: this,
			loop: true // Indica que se repita indefinidamente
		});
		
		
    }
    

}

function damageTile(tileSprite, flame, tile){
	//Si la casilla no puede ser dañada, salir de la función con un early return.
	//Aunque este caso no se debería de dar nunca por cómo se añade la detección de colisiones en la clase Tile, la comprobación se mantiene por razones de seguridad (posibles cambios a futuro en la implementación).
	if(!tile.is_destructible)
	{
		return;
	}
	
	if(tile.health <= 0)
	{
		return;
	}
	
	if(tile.current_dragon !== tile.last_dragon)
	{
		tile.has_to_switch_sprite = true;
	}
	
	if(tile.current_dragon)
	{
		tile.current_dragon.points -= 1;
	}
	tile.last_dragon = tile.current_dragon;
	tile.current_dragon = flame.owner;
	tile.current_dragon.points += 1;
	
	tile.is_on_fire = true;
	
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
	}
}