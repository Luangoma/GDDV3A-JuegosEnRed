var game = new Phaser.Game(config);
game.scene.add("MainMenu",MainMenu);
game.scene.add("Map1",Map1);
game.scene.add("map_test_1",map_test_1);
game.scene.add("ui",ui);
game.scene.add("game_over", game_over);
game.scene.add("Credits", Credits);
//game.scene.start("MainMenu");
game.scene.start("game_over");
