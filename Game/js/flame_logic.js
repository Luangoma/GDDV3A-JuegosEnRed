
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

    if(player.health<=0){
        playerSprite.disableBody(true, true);
        console.log("Killing dragon");
    }
    player.scene.time.delayedCall(1000, ()=>{playerSprite.setTint(0xffffff);}); // El sprite deja de estar rojo tras 1 seg

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