function CredentialsBox(scene, form_type = FORM_TYPE.DEFAULT){
	
	this.illegalCharacters = ['/', ' ', '<', '>', '&', '\"', '\'', '\\'];
	
	this.scene = scene;
	this.form_enum_type = form_type;
	this.credentialsBox = {};
	this.requestFunction = function(){
		console.log("NO REQUEST WAS CONFIGURED YET.");
	};
	
	let form_name_string = "";
	let form_names_to_find = [];
	switch(this.form_enum_type)
	{
		default:
		case FORM_TYPE.DEFAULT:
			form_name_string = 'formularioRegistro';
			form_names_to_find = ['username', 'password'];
			break;
		
		case FORM_TYPE.PASSWORD_ONLY:
			form_name_string = 'formularioRegistroCorto';
			form_names_to_find = ['password'];
			break;
		
		case FORM_TYPE.PASSWORD_DOUBLE:
			form_name_string = 'formularioPassword';
			form_names_to_find = ['oldPassword', 'password'];
			break;
		
		case FORM_TYPE.FULL:
			form_name_string = 'formularioEntero'; //TODO: actually make the full form...
			form_names_to_find = ['TODO_REMEMBER_TO_CHANGE'];
			break;
	}
	const element = this.scene.add.dom(config.width/2, config.height/2).createFromCache(form_name_string);
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
			//get all children elements from the HTML form.
			let input_boxes = [];
			for(let i = 0; i < form_names_to_find.length; ++i){
				input_boxes[i] = this.getChildByName(form_names_to_find[i]);
			}
			
			//set variables for illegal input values.
			let fields_contain_empty_values = false;
			let fields_contain_invalid_characters = false;
			for(let i = 0; i < input_boxes.length; ++i){
				if(input_boxes[i].value == ''){fields_contain_empty_values = true;}
				if(stringContains(input_boxes[i].value, that.illegalCharacters)){fields_contain_invalid_characters = true;}
			}
			
			
			//Check if the user input is valid. Follows multiple conditions for validity are checked.
			if(fields_contain_empty_values)
			{
				that.displayError(lang("key_empty_fields"));
			}
			else
			if(fields_contain_invalid_characters)
			{
				that.displayError(lang("key_invalid_characters"));
			}
			else
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
	scene.load.html('formularioPassword', './assets/formularioPassword.html');
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

CredentialsBox.prototype.getOldPasswordText = function() {
	return this.credentialsBox.getChildByName('oldPassword').value;
}

CredentialsBox.prototype.displayError = function(errormsg) {
	this.errorText.visible = true;
	this.errorText.setText("ERROR: " + errormsg);
}