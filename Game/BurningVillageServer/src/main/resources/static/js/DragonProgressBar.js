function DragonProgressBar(scene,x,y,color = 0xFF0000,width = 100,height = 10){
	this.bar = new CappedProgressBar(scene,x,y,color,
	width,height/2,'progress_bar_default_middle',
	width/20,height,'progress_bar_cover_left',
	width/20,height, 'progress_bar_cover_right',
	width,height, 'progress_bar_cover_middle',
	0,0,'dragon_head_progress_indicator'
	);
}

DragonProgressBar.prototype.getValue = function(){
	return this.bar.getValue();
}

DragonProgressBar.prototype.setValue = function(value){
	this.bar.setValue(value);
}