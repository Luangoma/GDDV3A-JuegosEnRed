//NOTE: For some reason, the order in which the scenes are added matters sometimes. Such good library design! Not...

var game = new Phaser.Game(config);

game.scene.add("Registro",Registro);
game.scene.add("Login",Login);
game.scene.add("DeleteAccount",DeleteAccount);


game.scene.add("PlayerListScene", PlayerListScene);
game.scene.add("ForumScene", ForumScene);
game.scene.add("SocialMenu", SocialMenu);


game.scene.add("MainMenu",MainMenu);
game.scene.add("Map1",Map1);
game.scene.add("map_test_1",map_test_1);
game.scene.add("GameMap", GameMap);
game.scene.add("map_test_multiplayer",map_test_multiplayer);
game.scene.add("ui",ui);
game.scene.add("game_over", game_over);
game.scene.add("Credits", Credits);
game.scene.add("PreloadScene", PreloadScene);
game.scene.add("LoadingScreenScene",LoadingScreenScene);

game.scene.add("GameMapLoader", GameMapLoader);
game.scene.add("LoadMap1",LoadMap1); //TODO... maybe remove?


game.scene.add("Tutorial",Tutorial);
game.scene.add("PlayMenu",PlayMenu);
game.scene.add("OnlineMenu",OnlineMenu);

game.scene.add("AccountMenu",AccountMenu);
game.scene.add("UserProfile",UserProfile);
game.scene.add("UpdateUser",UpdateUser);
game.scene.add("MP_WarningScene", MP_WarningScene);
game.scene.add("LobbyScene", LobbyScene);

//game.scene.start("MainMenu");
//game.scene.start("PreloadScene");
game.scene.start("LoadingScreenScene");
//game.scene.start("Registro"); //Implementar que del registro vaya a LoadingScreenScene.
//game.scene.launch("PreloadScene");
