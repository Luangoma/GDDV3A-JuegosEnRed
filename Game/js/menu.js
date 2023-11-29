var MainMenu = {
	key: 'MainMenu',
	preload: MainMenuPreload,
	create: MainMenuCreate,
	update: MainMenuUpdate
};

function MainMenuPreload()
{
	this.load.image("menu_background","./assets/menu_background.png");
}

function MainMenuCreate()
{
	this.add.image(0,0,"menu_background").setOrigin(0,0);
}

function MainMenuUpdate(time, delta)
{}