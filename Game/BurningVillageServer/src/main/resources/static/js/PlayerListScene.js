class PlayerListScene extends DragonScene
{
	background1 = {};
	background2 = {};
	
	titulo = {};
	
	playersList = [];
	playersTextList = [];
	
	botonSalir = {};
	
	currentPage = 0;
	
	preload()
	{
		this.load.image('menuBackgroundBlurry', 'assets/menu_background_blurry.jpg');
		this.load.image('pergamino', 'assets/player_list_papyrus.png');
	}
	
	create()
	{
		this.currentPage = 0;
		
		this.background1 = this.add.image(0,0,'menuBackgroundBlurry').setOrigin(0,0).setDisplaySize(config.width, config.height);
		this.background2 = this.add.image(config.width/2, config.height/2, 'pergamino').setDisplaySize(config.width - config.width/10, config.height - config.height/10);
		
		this.titulo = this.add.text(config.width/2, 80, 'Lista de Usuarios', styleText_AncientFont_90).setOrigin(.5,0).setScale(0.7);
		
		this.getAllUsers();
		
		this.botonSalir = new Button(this, config.width - 150, config.height - 50, "Volver");
		this.botonSalir.setButtonFunction(function(){
			game.scene.stop("PlayerListScene");
			game.scene.start("SocialMenu");
		});
		this.botonSalir.setCanBePressed(true);
	}
	
	getAllUsers()
	{
		let that = this;
		$.ajax({
			url: ip.http + "/users",
			method: 'GET',
			contentType: 'application/json',
			success: function(data){that.playersList = data; that.makeUsersText()},
			error: function(xhr, status, error){console.log("There was an error retrieving the users list.");}
		});
	}
	
	makeUsersText()
	{
		let start = 10 * this.currentPage;
		let end = Math.min(start + 10, this.playersList.length);
		let height = 0;
		for(let i = start; i < end; ++i)
		{
			let currentText = this.add.text(200, 170 + 30 * height, this.playersList[i].username, styleText_MedievalPixel_30).setOrigin(0,0);
			this.playersTextList.push(currentText);
			++height;
		}
	}
}