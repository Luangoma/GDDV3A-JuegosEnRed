class WarningMenu
{
	
	scene = null;
	
	x = 0;
	y = 0;
	
	image = null;
	text_array = [];
	text_object_array = [];
	
	button_proceed = {};
	button_back = {};
	
	previous_scene_name = "";
	current_scene_name = "";
	target_scene_name = "";
	
	
	constructor(scene, x, y, text_array, previous = "", current = "", target = "")
	{
		//the classic JS hack... once more
		let that = this;
		
		//initial construction (assignment of values and variables):
		this.scene = scene;
		this.image = null;
		this.text_array = text_array;
		this.button_proceed = null;
		this.button_back = null;
		
		this.x = x;
		this.y = y;
		
		this.previous_scene_name = previous;
		this.current_scene_name = current;
		this.target_scene_name = target;
		
		//construction process (creation of phaser objects and other objects):
		this.image = this.scene.add.image(x,y,"warning_popup").setDisplaySize(config.width, config.height);
		
		//Add each string within the text array as an individial line of text to the screen:
		for(let i = 0; i < this.text_array.length; ++i)
		{
			let current_text_object = this.scene.add.text(250, 170 + 30 * i, this.text_array[i], styleText_MedievalPixel_30).setOrigin(0,0)
			this.text_object_array.push(current_text_object);
		}
		
		
		//Add the buttons:
		this.button_proceed = new Button(this.scene, config.width/2, config.height/2 + 60 * 2, "Proceder");
		this.button_proceed.setButtonFunction(function(){
			game.scene.stop(that.current_scene_name);
			game.scene.start(that.target_scene_name);
		});
		this.button_proceed.setCanBePressed(true);
		
		this.button_back = new Button(this.scene, config.width/2, config.height/2 + 60 * 3, "Volver");
		this.button_back.setButtonFunction(function(){
			game.scene.stop(that.current_scene_name);
			game.scene.start(that.previous_scene_name);
		});
		this.button_back.setCanBePressed(true);
	}
	
	setTargetScene(str)
	{
		this.target_scene_name = str;
	}
	
	setCurrentScene(str)
	{
		this.current_scene_name = str;
	}
	
	setPreviousScene(str)
	{
		this.previous_scene_name = str;
	}
	
	
};

function preloadWarningMenuData(scene){
	scene.load.image('warning_popup', './assets/warning_popup_2.png');
}
