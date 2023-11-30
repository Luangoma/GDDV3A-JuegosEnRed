function blazeHouse(flame, house) {
    flame.disableBody(true, true);
    house.play.anim("animacionFuegoStart");
}

function damageEnemy(flame, player) {
    flame.disableBody(true, true);
    player.setTint(0xff0000);
    player.anims.play('animacionFuegoEnd');
    console.log("Killing dragon");
}