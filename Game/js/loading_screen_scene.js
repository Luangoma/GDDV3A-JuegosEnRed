class LoadingScreenScene extends DragonScene
{
	progressBar;
	progressText;
	
	//sceneToLoad = "PreloadScene";
	
	preload()
	{
		preloadProgressBarData(this);
		this.load.image('progress_bar_cover_left',   './assets/progress_bar/progress_bar_cover_segment_left.png');
		this.load.image('progress_bar_cover_middle', './assets/progress_bar/progress_bar_cover_segment_middle.png');
		this.load.image('progress_bar_cover_right',  './assets/progress_bar/progress_bar_cover_segment_right.png');
		this.load.image('dragon_head_progress_indicator', './assets/progress_bar/dragon_head_progress_indicator.png');
	}
	
	create()
	{
		let x_len = config.width / 2;
		let y_len = 20;
		
		this.progressBar = new DragonProgressBar(this, config.width / 2 - x_len/2, config.height / 2 - y_len / 2, 0xFF0000, x_len, y_len);
		this.progressBar.setValue(0);
		this.progressText = this.add.text(config.width/2-x_len/4, config.height/2-100, "x", styleText_MedievalPixel_30).setOrigin(0,0);
		this.scene.launch("PreloadScene");
	}
	
	update(time,delta)
	{
		let inc = getRandomInRange(0,0.5);
		this.progressBar.setValue(this.progressBar.getValue() + delta/1000 * inc);
		this.progressText.setText("Cargando: " + Math.floor(this.progressBar.getValue() * 100) + "%");
		
		//note: this.scene.get(key) is the same as this.scene.manager.getScene(key)
		if(this.scene.get("PreloadScene").getFinishedLoading() && this.progressBar.getValue() < 0.9)
		{
			this.progressBar.setValue(0.9);
		}
		
		if(this.progressBar.getValue() >= 1)
		{
			this.scene.start("MainMenu");
		}
	}
}
