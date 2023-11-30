// Poned comentarios !!!
function blazeHouse(flame, house) {
    flame.disableBody(true, true);
    house.play.anim("animacionFuegoStart");
}
// playerSprite: sprite del jugador que recibe llamas, flame: llamas del rival, y player: jugador que recibe llamas
function damageEnemy(playerSprite, flame, player) { 
    player.health -= 1;
    console.log("Vida del jugador"+player.life);
    flame.disableBody(true, true);
    playerSprite.setTint(0xff0000); // El personaje se pone rojo
    //playerSprite.anims.play('animacionFuegoEnd'); // Esta cosa no funciona

    if(player.health<=0){
        playerSprite.disableBody(true, true);
        console.log("Killing dragon");
    }
    player.scene.time.delayedCall(1000, ()=>{playerSprite.setTint(0xffffff);}); // El sprite deja de estar rojo tras 1 seg

}