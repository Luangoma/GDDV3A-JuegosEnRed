function CappedProgressBar(
	scene, x, y, color = 0xFFFFFF,
	width_middle = 50, height_middle = 10,image_middle = 'progress_bar_default_middle',
	width_left = 50, height_left = 10, image_left = 'progress_bar_default_left',
	width_right = 50, height_right = 10, image_right = 'progress_bar_default_right',
	width_background = 50, height_background = 10, image_background = 'progress_bar_default_middle',
	width_slider = 50, height_slider = 10, image_slider = null, //width and height for the slider are unused variables as of now.
	center_progress_bar = true
)
{
	
	/*
	this.image_middle = this.scene.add.image(x,y,image_middle).setOrigin(0,0);
	this.image_middle.displayWidth = this.width;
	this.image_middle.displayHeight = this.height;
	this.image_middle.setTint(this.color);
	*/
	
	if(image_left)
	{
		this.image_left = scene.add.image(x - width_left, y, image_left).setOrigin(0,0);
		this.image_left.displayHeight = height_left;
		this.image_left.displayWidth = width_left;
	}
	
	if(image_right)
	{
		this.image_right = scene.add.image(x + width_middle, y, image_right).setOrigin(0,0);
		this.image_right.displayHeight = height_right;
		this.image_right.displayWidth = width_right;
	}
	
	if(image_background)
	{
		this.image_background = scene.add.image(x, y, image_background).setOrigin(0,0);
		this.image_background.displayHeight = height_background;
		this.image_background.displayWidth = width_background;
	}
	
	this.progress_bar = new ProgressBar(scene,x,y,color,width_middle,height_middle,image_middle);
	
	if(center_progress_bar)
	{
		this.progress_bar.image_middle.y = y + height_middle / 2;
	}
	
	if(image_slider)
	{
		this.image_slider = scene.add.image(x, this.progress_bar.image_middle.y, image_slider);
	}
	
}

//CappedProgressBar.prototype = Object.create(ProgressBar.prototype);

CappedProgressBar.prototype.setValue = function(value){
	this.progress_bar.setValue(value);
	this.image_slider.x = this.progress_bar.x + this.progress_bar.value * this.progress_bar.width;
}

CappedProgressBar.prototype.getValue = function(){
	return this.progress_bar.value;
}