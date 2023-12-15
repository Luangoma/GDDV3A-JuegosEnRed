function CredentialsBox(scene){
	
	this.scene = scene;
	this.credentialsBox = {};
	this.requestFunction = function(){
		console.log("NO REQUEST WAS CONFIGURED YET.");
	};
	
	const element = this.scene.add.dom(config.width/2, config.height/2).createFromCache('formularioRegistro');
	this.credentialsBox = element;
	
	let that = this;
	element.setPerspective(800);
	element.addListener('click');
	element.on('click', function (event)
	{

		//If the login button was pressed, process the user input and return it.
		if (event.target.name === 'loginButton')
		{
			const inputUsername = this.getChildByName('username');
			const inputPassword = this.getChildByName('password');

			//Check if the user input is valid. Conditions for validity are:
			//1-The text boxes are not empty
			//TODO: Prevent weird special characters such as '/'
			//TODO: Don't close the box unless the request returned an OK status, aka in case of error keep the box open and notify the user of the error somehow (user already exists, invalid input, etc...)
			if (inputUsername.value !== '' && inputPassword.value !== '')
			{
				//Disable click events from the form so that it can't be interacted during the animation.
				this.removeListener('click');

				//Use the tween to move the form out of view (the animation).
				this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });
				this.scene.tweens.add({
					targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
					onComplete: function ()
					{
						element.setVisible(false);
					}
				});

				//Make a request (most likely through ajax, but could be anything, even fully clientside dependant operations). The request is configured by the caller code.
				that.requestFunction();
			}
			else
			{
				//Display some kind of error when the text is not valid (empty, already existing user, lacking info, net error, "some unknown error ocurred", internal server error, etc...)
			}
		}

	});
	
	//Add a tween for the form to move (the animation).
	this.scene.tweens.add({
		targets: element,
		y: 300,
		duration: 3000,
		ease: 'Power3'
	});
	
}

function preloadCredentialsBoxData(scene){
	scene.load.html('formularioRegistro', 'assets/formularioRegistro.html');
}

CredentialsBox.prototype.setRequest = function(request_fn){
	this.requestFunction = request_fn;
}

CredentialsBox.prototype.getUsernameText = function() {
	return this.credentialsBox.getChildByName('username').value;
}

CredentialsBox.prototype.getPasswordText = function() {
	return this.credentialsBox.getChildByName('password').value;
}