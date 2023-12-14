var game = new Phaser.Game(config);
game.scene.add("Registro",Registro);
game.scene.add("MainMenu",MainMenu);
game.scene.add("Map1",Map1);
game.scene.add("map_test_1",map_test_1);
game.scene.add("ui",ui);
game.scene.add("game_over", game_over);
game.scene.add("Credits", Credits);
game.scene.add("PreloadScene", PreloadScene);
game.scene.add("LoadingScreenScene",LoadingScreenScene);

game.scene.add("LoadMap1",LoadMap1); //TODO... maybe remove?


game.scene.add("Tutorial",Tutorial);
game.scene.add("PlayMenu",PlayMenu);

//game.scene.start("MainMenu");
//game.scene.start("PreloadScene");
game.scene.start("LoadingScreenScene");
//game.scene.start("Registro"); //Implementar que del registro vaya a LoadingScreenScene.
//game.scene.launch("PreloadScene");