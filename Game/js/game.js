var game = new Phaser.Game(config);
game.scene.add("MainMenu",MainMenu);
game.scene.add("Map1",Map1);
game.scene.add("map_test_1",map_test_1);
game.scene.start("map_test_1");
