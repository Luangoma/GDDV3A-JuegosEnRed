class SettingsMenu extends DragonScene
{
	background = null;
	botonSalir = null;
	
	volume_settings_effects = null;
	volume_settings_menu = null;
	volume_settings_music = null;
	
	fromGame = false;
	
	init(data)
	{
		console.log("init with this data: ");
		console.log(data);
		
		//could be simplified into a ternary but I'm keeping it like this because we might add something else in the future.
		if(data && data.fromGame && data.fromGame == true)
		{
			//the settings menu was opened from the gameplay scene, during a match
			this.fromGame = true;
			console.log("The settings menu was opened from the gameplay scene.");
		}
		else
		{
			//the settings menu was opened from the main menu
			this.fromGame = false;
			console.log("The settings menu was opened from the main menu scene.");
		}
		
	}
	
	preload()
	{
        this.load.image('menuBackgroundBlurry', 'assets/menu_background_blurry.jpg');
        this.load.image('button_l_img', 'assets/StoneButton03.png');
        this.load.image('button_r_img', 'assets/StoneButton02.png');
	}
	
	create()
	{
		//Good old JS hack...
		let that = this;
		
		//blurry background image, only visible if the menu was opened from the main menu
		if(!this.fromGame){
			this.background = this.add.image(0, 0, 'menuBackgroundBlurry').setOrigin(0, 0).setDisplaySize(config.width, config.height);
		}
		
		//display the volume settings objects on the screen.
		this.volume_settings_effects = this.createVolumeSettings(config.width/2, 100, "Volumen de efectos", gameConfig.volumeFunctions.setEffectsVolume);
		this.volume_settings_menu    = this.createVolumeSettings(config.width/2, 200, "Volumen de menú", gameConfig.volumeFunctions.setMenuVolume);
		this.volume_settings_music   = this.createVolumeSettings(config.width/2, 300, "Volumen de música", gameConfig.volumeFunctions.setMusicVolume);
		
		//Button to return to the main menu.
        this.botonSalir = new Button(this, config.width - 150, config.height - 50, "Volver");
		this.botonSalir.setButtonFunction(function(){
			//stop the settings menu scene (close the settings menu)
			game.scene.stop("SettingsMenu");
			
			//load the main menu in the case that the settings menu was opened from the main menu
			if(!that.fromGame){
				game.scene.start("MainMenu");
			}
		});
		this.botonSalir.setCanBePressed(true);
		
	}
	
	createVolumeSettings(x, y, txt, volume_function = null, num_steps = 5)
	{
		//the volume settings object that will be returned by this function.
		let volumeSettingsObject = {
			button_left: null,
			button_right: null,
			numSteps: 0,
			display: null,
			text: null,
			volumeFuncRef: volume_function, //the function to modify the volume that will be used internally. Depends on the volume type.
			changeVolume: function(increment){
				//This is the amount of volume added / removed for each "step" / "square" in the volume meter. Note that the volume is a floating point number that goes from 0 to 1 (1 = 100%).
				let vol_percent = 1 / this.numSteps + 0.001; //added a 0.001 margin of error to prevent floating point shenanigans (for example level 0 of volume corresponding to an extremely small but still somewhat audible amount of volume)
				
				//a temporary variable to hold the value that the current volume var has been set to.
				let display_value = 0;
				
				//increment the volume and clamp it to the 0 to 1 range.
				if(this.volumeFuncRef){
					display_value = this.volumeFuncRef(increment * vol_percent);
				}
				
				//update the progress bar display value:
				this.display.setValue(display_value);
				
				//debug print:
				console.log("The volume is now: " + display_value);
			}
		};
		
		
		//adjust the number of volume setting "steps"/"squares" to display. Aka, the number of "steps" you can do when using the volume adjustment buttons.
		volumeSettingsObject.numSteps = num_steps;
		
		//JS hack
		let that = this;
		
		//text for this setting:
		volumeSettingsObject.text = this.add.text(config.width/2, y - 50, txt, styleText_PixelSansSerif_30).setOrigin(0.5).setScale(0.5);
		
		//button to decrease volume
		volumeSettingsObject.button_left = new Button(this, x - 180, y, " ", "button_l_img");
		volumeSettingsObject.button_left.setButtonFunction(function(){
			volumeSettingsObject.changeVolume(-1);
		});
		volumeSettingsObject.button_left.setCanBePressed(true);
		
		//button to increase volume
		volumeSettingsObject.button_right = new Button(this, x + 180, y, " ", "button_r_img");
		volumeSettingsObject.button_right.setButtonFunction(function(){
			volumeSettingsObject.changeVolume(1);
		});
		volumeSettingsObject.button_right.setCanBePressed(true);
		
		//progress bar to display the amount of volume
		let bar_width = 250;
		let bar_height = 50;
		volumeSettingsObject.display = new DragonProgressBar(this, x - bar_width/2, y - bar_height/2, 0x00FF00, bar_width, bar_height);
		volumeSettingsObject.display.bar.image_slider.visible = false; //hide the dragon head slider
		
		//change the volume by 0 (aka leave the volume at the same amount) only with the purpose of updating the volume info display on the settings menu once the scene is loaded (otherwise, the progress bar will be reset each time the user opens the settings menu and will only update accordingly once a change is made)
		volumeSettingsObject.changeVolume(0);
		
		//return the object so that it can be stored in a variable from this scene
		return volumeSettingsObject;
	}
};
