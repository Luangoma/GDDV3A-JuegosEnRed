function ProgressBar(scene, x, y, color = 0xFFFFFF, width = 50, height = 10, image_left = 'progress_bar_default_left', image_middle = 'progress_bar_default_middle', image_right = 'progress_bar_default_right'){
	//set properties
	this.scene = scene;
	this.x = x;
	this.y = y;
	this.color = color;
	this.width = width; //will act as a max width value for the bar width.
	this.height = height;
	this.value = 1; // value contains the percentage, which goes from 0 to 1 (0 = 0%, 1 = 100%)
	
	//create properties
	//this.image_left = this.scene.add.image(x,y,image_left).setOrigin(0,0);
	this.image_middle = this.scene.add.image(x,y,image_middle).setOrigin(0,0);
	this.image_middle.displayWidth = this.width;
	this.image_middle.displayHeight = this.height;
	this.image_middle.setTint(this.color);
	//this.image_right = this.scene.add.image(x,y,image_right).setOrigin(0,0);
	
	//TODO: Take into account the width and height properties when drawing the bar, and also add some scale parameter.
}

function preloadProgressBarData(scene){
	//preload default progress bar segments
	scene.load.image('progress_bar_default_left', './assets/progress_bar/progress_bar_default_left.png');
	scene.load.image('progress_bar_default_middle', './assets/progress_bar/progress_bar_default_middle.png');
	scene.load.image('progress_bar_default_right', './assets/progress_bar/progress_bar_default_right.png');
}

ProgressBar.prototype.setValue = function(value){
	this.value = clampValue(value, 0, 1);
	this.image_middle.displayWidth = lerpValue(0,this.width,this.value);
}

ProgressBar.prototype.setColor = function(color){
	this.color = color;
	this.image_middle.setTint(this.color);
}