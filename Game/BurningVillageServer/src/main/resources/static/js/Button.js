function Button(scene, x, y, text = "Button Text", scale = 0.5, text_scale = 0.5, image = 'boton_vacio', fn = function() {console.log("Acción por defecto...");}){
	this.scene = scene;
	this.x = x;
	this.y = y;
	this.scale = scale;
	this.text_scale = text_scale;
	this.ButtonImage = scene.add.image(x,y,image);
	this.ButtonImage.setScale(this.scale);
	this.ButtonImage.setInteractive();
	this.ButtonText = this.scene.add.text(x,y,text, styleText_button_1).setOrigin(0.5).setScale(this.text_scale);
	this.can_be_pressed = false;
	this.buttonFunction = fn;
	
	//add sounds to the scene.
	this.sound_click = this.scene.sound.add("sound_ui_click",{loop: false});
	this.sound_hover = this.scene.sound.add("sound_ui_hover",{loop: false});
	
	//button actions (start hover, end hover, click...)
	let that = this; //good old ES5 hack...
	this.ButtonImage.on('pointerdown', function(pointer){
		console.log("Botón presionado");
		if(that.can_be_pressed)
		{
			that.sound_click.play();
			that.buttonFunction();
		}
	});
	this.ButtonImage.on('pointerover', function(pointer){
		console.log("El puntero está encima del botón");
		that.ButtonImage.setScale(that.scale + 0.1);
		that.ButtonText.setScale(that.text_scale + 0.1);
		that.sound_hover.play();
	});
	this.ButtonImage.on('pointerout', function(pointer){
		console.log("El puntero ya no está encima del botón");
		that.ButtonImage.setScale(that.scale);
		that.ButtonText.setScale(that.text_scale);
	});
}

function preloadButtonData(scene){
	scene.load.svg('botonJugar', 'assets/botonJugar.svg');
	scene.load.svg('botonSalir', 'assets/botonSalir.svg');
	scene.load.svg('botonAjustes', 'assets/botonAjustes.svg');
	scene.load.svg('botonCreditos', 'assets/botonCreditos.svg');
	scene.load.svg('botonContinuar', 'assets/botonContinuar.svg');
	scene.load.svg('boton_vacio', './assets/boton_vacio.svg');
	
	scene.load.audio("sound_ui_hover", ["./sounds/menu/sound_ui_hover.wav"]);
	scene.load.audio("sound_ui_click", ["./sounds/menu/sound_ui_click.wav"]);
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
	this.ButtonText.setOrigin(0.5);
}