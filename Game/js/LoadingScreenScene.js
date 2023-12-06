class LoadingScreenScene extends DragonScene
{
	progressBar;
	progressText;
	
	scenesToLoad;
	sceneToEnter;
	
	setScenesToLoad(scenes)
	{
		this.scenesToLoad = scenes;
	}
	
	setSceneToEnter(scene)
	{
		this.sceneToEnter = scene;
	}
	
	constructor()
	{
		super({});
		this.scenesToLoad = ["PreloadScene", "MainMenu"];
		this.sceneToEnter = "MainMenu";
	}
	
	preload()
	{
		preloadProgressBarData(this);
		this.load.image('progress_bar_cover_left',   './assets/progress_bar/progress_bar_cover_segment_left.png');
		this.load.image('progress_bar_cover_middle', './assets/progress_bar/progress_bar_cover_segment_middle.png');
		this.load.image('progress_bar_cover_right',  './assets/progress_bar/progress_bar_cover_segment_right.png');
		this.load.image('dragon_head_progress_indicator', './assets/progress_bar/dragon_head_progress_indicator.png');
		
		this.load.image('background_image_floriture_01', "./assets/background_image_01.png");
	}
	
	create()
	{
		let background_image = this.add.image(0,0,'background_image_floriture_01').setOrigin(0,0);
		background_image.displayWidth = config.width;
		background_image.displayHeight = config.height;
		
		let x_len = config.width / 2;
		let y_len = 20;
		
		this.progressBar = new DragonProgressBar(this, config.width / 2 - x_len/2, config.height / 2 - y_len / 2, 0xFF0000, x_len, y_len);
		this.progressBar.setValue(0);
		this.progressText = this.add.text(config.width/2-x_len/4, config.height/2-100, "x", styleText_MedievalPixel_30).setOrigin(0,0);
		
		//iterate over all the scenes to be loaded during the loading screen and launch them.
		for(let i = 0; i < this.scenesToLoad.length; ++i)
		{
			this.scene.launch(this.scenesToLoad[i]);
		}
	}
	
	update(time,delta)
	{
		let inc = getRandomInRange(0,0.5);
		this.progressBar.setValue(this.progressBar.getValue() + delta/1000 * inc);
		this.progressText.setText("Cargando: " + Math.floor(this.progressBar.getValue() * 100) + "%");
		
		//note: this.scene.get(key) is the same as this.scene.manager.getScene(key)
		
		//check for the scene to have finished first
		let loaded_scenes = 0;
		let finished_loading_scenes = false;
		for(let i = 0; i < this.scenesToLoad.length; ++i)
		{
			if(this.scene.get(this.scenesToLoad[i]).getFinishedLoading())
			{
				loaded_scenes++;
			}
		}
		
		finished_loading_scenes = loaded_scenes == this.scenesToLoad.length;
		if(finished_loading_scenes && this.progressBar.getValue() < 0.9)
		{
			this.progressBar.setValue(0.9);
		}
		
		if(this.progressBar.getValue() >= 0.99 && finished_loading_scenes)
		{
			console.log("Entering scene : " + this.sceneToEnter);
			this.scene.start(this.sceneToEnter);
		}
	}
}
