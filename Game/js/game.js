var game = new Phaser.Game(config);
game.scene.add("MainMenu",MainMenu);
game.scene.add("Map1",Map1);
game.scene.start("Map1");
