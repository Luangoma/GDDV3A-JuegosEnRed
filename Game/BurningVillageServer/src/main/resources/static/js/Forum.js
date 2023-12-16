class ForumScene extends DragonScene
{
	menuBackground = {};
    botonSalir = {};
	ForumChat = {};
	messages_box_div = null;
	
	accumulated_time = 0;

    preload() {
        // Precarga del background con efecto de blur.
        this.load.image('menuBackgroundBlurry', 'assets/menu_background_blurry.jpg');
		this.load.html('cajaForo', './assets/foro.html');
    }

    create() {
        // Añadir el background a la escena.
        this.menuBackground = this.add.image(0, 0, 'menuBackgroundBlurry').setOrigin(0, 0).setDisplaySize(config.width, config.height);
		
		//reset the timer to 0:
		this.accumulated_time = 0;
		
		const element = this.add.dom(config.width/2, config.height/2).createFromCache('cajaForo');
		this.ForumChat = element;
		
		this.messages_box_div = element.node.querySelector('#forum-messages-box');
		console.log(this.messages_box_div);
		
		let that = this;
		element.setPerspective(800);
		element.addListener('click');
		element.on('click', function (event)
		{

			//Botón de Enviar pulsado.
			if (event.target.name === 'send-message')
			{
				console.log("Botón enviar pulsado.");
				
				let msg_input_box = this.getChildByName('message-input');
				let mensaje = msg_input_box.value;
				msg_input_box.value = "";
				
				
				console.log(mensaje);
				console.log(localUser.user.id);

				if (mensaje !== '')
				{
					//Si hay mensaje, enviarlo por petición AJAX.
					$.ajax({
						method: "POST",
						url: ip.http + "/posts/new",
						data: JSON.stringify({postId: 1, authorId: 1, postContent: mensaje}),
						processData: false,
						headers: {
							"Content-type": "application/json"
						}
					}).done(function(data, textStatus, jqXHR) {
						console.log("El mensaje se ha añadido satisfactoriamente al servidor.");
						that.addMessage(that.getMessageString(localUser.user.username, mensaje));
						
						
					}).fail(function(data, textStatus, jqXHR) {
						console.log("Error, no se ha añadido el mensaje al servidor.");
						//that.loginBox.displayError("No se ha podido crear la cuenta.");
					});
				}
			}

		});
		
        // Botón para volver al menu anterior.
        this.botonSalir = new Button(this, config.width - 150, config.height - 50, "Volver");
		this.botonSalir.setButtonFunction(function(){
			game.scene.stop("ForumScene");
			game.scene.start("SocialMenu");
		});
		this.botonSalir.setCanBePressed(true);
    }
	
	update(time, delta)
	{
		let that = this;
		let N_sec = 2; //makes the petitions every N seconds.
		//if the accumulated wait time is greater than 1000 * N seconds, make a petition to get all of the new messages that were not on screen, just in case other users have sent messages.
		if(this.accumulated_time > 1000 * N_sec){
			$.ajax({
				url: ip.http + '/posts',
				method: 'GET',
				processData: false,
				headers: {
					"Content-type": "application/json"
				}
			}).done(function(data, status, xhr){
				console.log(data);
				let full_messages_str = "";
				
				for(let i = 0; i < data.length; ++i){
					full_messages_str += that.getMessageString("user", data[i].postContent);
				}
				console.log(full_messages_str);
				that.setMessages(full_messages_str);
				
			}).fail(function(xhr, status, error){
				//do nothing for now...
			});
			
			this.accumulated_time = 0;
		}
		this.accumulated_time += delta;
	}
	
	
	getMessageString(name, msg){
		let str = '<div class=\"message other-message\"><div><div class=\"name\">' + name + '</div><div class=\"text\">' + msg + '</div></div></div>';
		return str;
	}
	
	setMessages(message_string){
		this.messages_box_div.innerHTML = message_string;
	}
	
	addMessage(message_string){
		this.messages_box_div.innerHTML += message_string;
	}
	
}