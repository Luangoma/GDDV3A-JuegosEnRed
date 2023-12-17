class ForumScene extends DragonScene
{
	menuBackground = {};
    botonSalir = {};
	ForumChat = {};
	messages_box_div = null;
	
	accumulated_time = 0;
	seconds_per_petition = 2; //makes the petitions every N seconds.

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
		
		//setup the chat element:
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
				msg_input_box.value = ""; //empty the user's text prompt when they send a message.
				
				
				console.log(mensaje);
				console.log(localUser.user.id);

				if (mensaje !== '')
				{
					//Si hay mensaje, enviarlo por petición AJAX.
					$.ajax({
						method: "POST",
						url: ip.http + "/posts/new",
						data: JSON.stringify({postId: 1, authorId: localUser.user.id, postContent: mensaje}),
						processData: false,
						headers: {
							"Content-type": "application/json"
						}
					}).done(function(data, textStatus, jqXHR) {
						console.log("El mensaje se ha añadido satisfactoriamente al servidor.");
						that.addMessage(that.getMessageString(localUser.user.id, localUser.user.username, mensaje));
						that.scrollChat(); //always scroll to the bottom when the user sends a message.
						
						
					}).fail(function(data, textStatus, jqXHR) {
						console.log("Error, no se ha añadido el mensaje al servidor.");
						//that.loginBox.displayError("No se ha podido crear la cuenta.");
					});
				}
			}

		});
		
		
		//get the chat list a first time and force a scroll to the bottom:
		this.getMessagesFromServer(true);
		
		
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
		//if the accumulated wait time is greater than N seconds, make a petition to get all of the new messages that were not on screen, just in case other users have sent messages.
		if(this.accumulated_time > 1000 * this.seconds_per_petition){
			this.getMessagesFromServer(this.shouldScroll());
			this.accumulated_time = 0;
		}
		this.accumulated_time += delta;
	}
	
	
	getMessageString(id, name, msg){
		let chat_msg_type = id === localUser.user.id ? 'my-message' : 'other-message'; //the class for the message div
		if(id === -1){
			chat_msg_type += " anonymous-message";
			name = "< Anonymous User >"; //redundant, this is also done in the getUsernameByIdFromList function, but it is done so that it can instantly display "anonymous user" instead of "none" when posting messages as an anonymous user. TODO: Find a better alternative... because right now, you need to change the anonymous user name in multiple places in the code (maybe an enum?).
		}
		let str = '<div class=\"message ' + chat_msg_type + '\"><div><div class=\"name\">' + stringReplaceHTMLSymbols(name) + '</div><div class=\"text\">' + stringReplaceHTMLSymbols(msg) + '</div></div></div>';
		return str;
	}
	
	setMessages(message_string){
		this.messages_box_div.innerHTML = message_string;
	}
	
	addMessage(message_string){
		this.messages_box_div.innerHTML += message_string;
	}
	
	scrollChat(){
		this.messages_box_div.scrollTop = this.messages_box_div.scrollHeight;
	}
	
	shouldScroll(){
		//threshold space for auto scrolling.
		const threshold = 150;
		//Remaining space from the bottom.
		let remainingSpace = this.messages_box_div.scrollHeight - this.messages_box_div.scrollTop - this.messages_box_div.clientHeight;
		//Check if the remaining space is within the threshold, so that we can determine whether the user wants to auto scroll to the bottom or not (they might not want to auto scroll if they are reading old posts for example).
		console.log("the remaining space is : " + remainingSpace);
		return remainingSpace < threshold;
	}
	
	/*
	getMessagesFromServer(should_scroll){
		let that = this;
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
				full_messages_str += that.getMessageString(that.getUsernameById(data[i].authorId), data[i].postContent);
			}
			console.log(full_messages_str);
			that.setMessages(full_messages_str);
			//scroll to the bottom only if the user is within the scrolling threshold (aka, they are near the bottom of the chat)
			if(should_scroll){
				that.scrollChat();
			}
			
		}).fail(function(xhr, status, error){
			//do nothing for now...
		});
	}
	*/
	
	
	getMessagesFromServer(should_scroll){
		let that = this;
		
		//obtain all the users
		$.ajax({
			url: ip.http + '/users',
			method: 'GET',
			processData: false,
			headers: {
				"Content-type": "application/json"
			}
		}).done(function(users_data, status, xhr){
			
			let obtained_users = users_data;
			
			//obtain all the messages
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
					full_messages_str += that.getMessageString(data[i].authorId, that.getUsernameByIdFromList(obtained_users, data[i].authorId), data[i].postContent);
				}
				console.log(full_messages_str);
				that.setMessages(full_messages_str);
				//scroll to the bottom only if the user is within the scrolling threshold (aka, they are near the bottom of the chat)
				if(should_scroll){
					that.scrollChat();
				}
				
			}).fail(function(xhr, status, error){
				//do nothing for now...
			});
			
			
		}).fail(function(xhr, status, error){
			//do nothing for now...
		});
		
		
		
	}
	
	
	getUsernameById(id){
		$.ajax({
			url: ip.http + '/users/' + id,
			method: 'GET',
			processData: false,
			headers: {
				"Content-type": "application/json"
			}
		}).done(function(data, status, xhr){
			console.log("the user is : " + data.username);
			return data.username;
		}).fail(function(xhr, status, error){
			return 'UNKNOWN_USERNAME';
		});
	}
	
	getUsernameByIdFromList(list, id){
		for(let i = 0; i < list.length; ++i){
			if(list[i].id === id){
				return list[i].username;
			}
		}
		return "< Anonymous User >";
	}
	
}