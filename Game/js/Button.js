function Button(scene, x, y, text = "Button Text", scale = 0.5, image = 'botonJugar', fn = function() {console.log("Acción por defecto...");}){
	this.scene = scene;
	this.x = x;
	this.y = y;
	this.scale = scale;
	this.ButtonImage = scene.add.image(x,y,image);
	this.ButtonImage.setScale(this.scale);
	this.ButtonImage.setInteractive();
	this.ButtonText = {}; //TODO: Add button text.
	this.can_be_pressed = false;
	this.buttonFunction = fn;
	
	let that = this; //good old ES5 hack...
	this.ButtonImage.on('pointerdown', function(pointer){
		console.log("Botón presionado");
		if(that.can_be_pressed)
		{
			that.buttonFunction();
		}
	});
	this.ButtonImage.on('pointerover', function(pointer){
		console.log("El puntero está encima del botón");
		that.ButtonImage.setScale(that.scale + 0.1);
	});
	this.ButtonImage.on('pointerout', function(pointer){
		console.log("El puntero ya no está encima del botón");
		that.ButtonImage.setScale(that.scale);
	});
}

Button.prototype.setButtonFunction = function(fn){
	this.buttonFunction = fn;
}

Button.prototype.setCanBePressed = function(value){
	this.can_be_pressed = value;
}

Button.prototype.getCanBePressed = function(){
	return this.can_be_pressed;
}

Button.prototype.setText = function(new_text){
	this.ButtonText.setText(new_text);
}