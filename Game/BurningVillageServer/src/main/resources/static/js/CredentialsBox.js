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

		if (event.target.name === 'loginButton')
		{
			const inputUsername = this.getChildByName('username');
			const inputPassword = this.getChildByName('password');

			//  Have they entered anything?
			if (inputUsername.value !== '' && inputPassword.value !== '')
			{
				//  Turn off the click events
				this.removeListener('click');

				//  Tween the login form out
				this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

				this.scene.tweens.add({
					targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
					onComplete: function ()
					{
						element.setVisible(false);
					}
				});

				//Make a request through ajax. The request is configured by the caller.
				that.requestFunction();

				//  Populate the text with whatever they typed in as the username!
				//text.setText(`Welcome ${inputUsername.value}`);
			}
			else
			{
				//  Flash the prompt ///////this is to give an error when the text box is empty but there is no text for the error prompt lol
				//this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
			}
		}

	});
	

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