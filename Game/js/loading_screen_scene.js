class LoadingScreenScene extends Phaser.Scene
{
	loadingBar;
	leftCover;
	rightCover;
	middleCover;
	progressIndicator;
	
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
		
		this.leftCover = this.add.image(config.width / 2 - x_len/2 - x_len / 20, config.height / 2 - y_len / 2, 'progress_bar_cover_left').setOrigin(0,0);
		this.leftCover.displayHeight = y_len;
		this.leftCover.displayWidth = x_len / 20;
		
		this.middleCover = this.add.image(config.width / 2 - x_len/2, config.height / 2 - y_len / 2, 'progress_bar_cover_middle').setOrigin(0,0);
		this.middleCover.displayHeight = y_len;
		this.middleCover.displayWidth = x_len;
		
		this.rightCover = this.add.image(config.width / 2 + x_len/2, config.height / 2 - y_len / 2, 'progress_bar_cover_right').setOrigin(0,0);
		this.rightCover.displayHeight = y_len;
		this.rightCover.displayWidth = x_len / 20;
		
		
		y_len = 10;
		this.loadingBar = new ProgressBar(this, config.width / 2 - x_len/2, config.height / 2 - y_len / 2, 0xFF0000, x_len, y_len);
		this.loadingBar.setValue(0);
		
		this.progressIndicator = this.add.image(0, config.height / 2, 'dragon_head_progress_indicator');
		
		this.scene.launch("PreloadScene");
	}
	
	update(time,delta)
	{
		let inc = getRandomInRange(0,0.5);
		this.loadingBar.setValue(this.loadingBar.value + delta/1000 * inc);
		this.progressIndicator.x = config.width / 2 - (config.width/2) / 2 + (config.width/2) * this.loadingBar.value;
		if(this.loadingBar.value >= 1)
		{
			this.scene.start("MainMenu");
		}
	}
}
