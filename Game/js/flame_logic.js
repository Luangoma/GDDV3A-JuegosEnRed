
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
		oponent_player = getPlayer(flame.owner_id);
		oponent_player.max_ammo = 200;		// El dragón que mató a su oponente tendrá fuego ilimitado mientras este reaparece
		playerSprite.disableBody(true, true); 	// Ocultamos y deshabilitamos el dragón
		player.scene.time.delayedCall(10000, ()=>{
			player.health=100;
			playerSprite.enableBody(true, 500, 500, true, true);	// Rehabilitamos el dragón en la posición 500 500 (elegir una)
			oponent_player.max_ammo = 60;	// Quitamos el bonus al dragón que lo mató
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
	
	tile.is_on_fire = true;
	
	//disabling the flame ensures that no more than one collision is detected per hit, but allowing the flames to keep existing and hitting the houses on the other side is far more epic looking.
	/*
	tile.health -= 1;
	flame.disableBody(true, true);
	*/
	
	tile.health -= 0.1;
	
	damageTintSprite(tile.scene, tileSprite);
}