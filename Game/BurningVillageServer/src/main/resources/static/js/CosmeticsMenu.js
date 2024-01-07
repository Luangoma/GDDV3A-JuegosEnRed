class CosmeticsMenu extends DragonScene
{
	background = null;
	title = null;
	
	dragon_img = null;
	
	cosmetic_img_shirt = null;
	
	button_left = null;
	button_right = null;
	botonSalir = null;
	
	preload()
	{
		this.load.image('lobby_list_background', "./assets/LobbyListBackground.png");
		preloadCosmeticsData(this);
	}
	
	create()
	{
		//good old JS hack
		let that = this;
		
		//background image
		this.background = this.add.image(0,0,'lobby_list_background').setOrigin(0).setDisplaySize(config.width, config.height);
		
		//title
		this.title = this.add.text(config.width/2, 60, lang("key_cosmetics"), styleText_AncientFont_90).setOrigin(.5,0).setScale(0.7);
		
		//image for the player:
		this.dragon_img = this.add.sprite(config.width/2, config.height/2, 'dragon').setOrigin(.5).setScale(3);
		
		//image for player cosmetics (shirt):
		this.cosmetic_img_shirt = this.add.sprite(config.width/2, config.height/2, cosmetics.body[playerCosmetics.body]).setOrigin(.5).setScale(3);
		
		//move one cosmetic to the left
		this.button_left = new Button(this, 120, config.height/2, "", 'stone_button_left');
		this.button_left.setButtonFunction(function(){
			that.updatePlayerCosmetics(-1);
		});
		this.button_left.setCanBePressed(true);
		
		//move one cosmetic to the right
		this.button_right = new Button(this, config.width - 120, config.height/2, "", 'stone_button_right');
		this.button_right.setButtonFunction(function(){
			that.updatePlayerCosmetics(1);
		});
		this.button_right.setCanBePressed(true);
		
		// Botón para volver al menu principal.
        this.botonSalir = new Button(this, config.width - 150, config.height - 50, lang("key_return"));
		this.botonSalir.setButtonFunction(function(){
			game.scene.stop("CosmeticsMenu");
			game.scene.start("SettingsMenu");
		});
		this.botonSalir.setCanBePressed(true);
	}
	
	updatePlayerCosmetics(direction)
	{
		playerCosmetics.body = wrapAroundValue(playerCosmetics.body + direction, 0, cosmetics.body.length - 1);
		this.cosmetic_img_shirt.setTexture(cosmetics.body[playerCosmetics.body]);
	}
};