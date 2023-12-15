function CredentialsBox(scene, isShort = false){
	
	this.illegalCharactersUsername = ['/', ' '];
	this.illegalCharactersPassword = ['/', ' '];
	
	this.scene = scene;
	this.isShort = isShort;
	this.credentialsBox = {};
	this.requestFunction = function(){
		console.log("NO REQUEST WAS CONFIGURED YET.");
	};
	
	const element = this.scene.add.dom(config.width/2, config.height/2).createFromCache(this.isShort ? 'formularioRegistroCorto' : 'formularioRegistro');
	this.credentialsBox = element;
	
	this.errorText = this.scene.add.text(config.width/2, config.height/2 + 210, 'DEFAULT TEXT', styleText_Generic_Text).setOrigin(.5,.5).setScale(1);
	this.errorText.visible = false;
	
	let that = this;
	element.setPerspective(800);
	element.addListener('click');
	element.on('click', function (event)
	{

		//If the login button was pressed, process the user input and return it.
		if (event.target.name === 'loginButton')
		{
			let inputUsername;
			let inputPassword = this.getChildByName('password');
			if(that.isShort){
				inputUsername = {value: "nothing"};
			}
			inputUsername = this.getChildByName('username');

			//Check if the user input is valid. Conditions for validity are:
			//1-The text boxes are not empty
			//TODO: Prevent weird special characters such as '/'
			//TODO: Don't close the box unless the request returned an OK status, aka in case of error keep the box open and notify the user of the error somehow (user already exists, invalid input, etc...)
			
			if(inputUsername.value === '' || inputPassword.value === '')
			{
				that.displayError("Los campos tienen que contener un valor.");
			}
			else
			if(stringContains(inputUsername.value, that.illegalCharactersUsername) || stringContains(inputPassword.value, that.illegalCharactersPassword))
			{
				that.displayError("Los campos contienen caracteres no válidos.");
			}
			else
			if (inputUsername.value !== '' && inputPassword.value !== '')
			{
				//Make a request (most likely through ajax, but could be anything, even fully clientside dependant operations). The request is configured by the caller code.
				that.requestFunction();
			}
		}

	});
	
}

function preloadCredentialsBoxData(scene){
	scene.load.html('formularioRegistro', './assets/formularioRegistro.html');
	scene.load.html('formularioRegistroCorto', './assets/formularioRegistroCorto.html');
}

CredentialsBox.prototype.setRequest = function(request_fn){
	this.requestFunction = request_fn;
}

CredentialsBox.prototype.getUsernameText = function() {
	if(this.isShort){
		return "NO USERNAME";
	}
	return this.credentialsBox.getChildByName('username').value;
}

CredentialsBox.prototype.getPasswordText = function() {
	return this.credentialsBox.getChildByName('password').value;
}

CredentialsBox.prototype.displayError = function(errormsg) {
	this.errorText.visible = true;
	this.errorText.setText("ERROR: " + errormsg);
}