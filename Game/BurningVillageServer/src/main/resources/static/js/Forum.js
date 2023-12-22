class ForumScene extends DragonScene
{
	menuBackground = {};
    botonSalir = {};
	ForumChat = {};
	
	//elements from the document that represents the chat
	messages_box_div = null; //the div where messages are displayed
	msg_input_box = null; //the text box where the user can write messages
	
	accumulated_time = 0;
	seconds_per_petition = 2; //makes the petitions every N seconds.

    preload() {
        // Precarga del background con efecto de blur.
        this.load.image('menuBackgroundBlurry', 'assets/menu_background_blurry.jpg');
		this.load.html('cajaForo', './assets/foro.html');
    }
	
	sendMessage(){
		let that = this; //Good old JS hack, Episode IV, A New Hope (not).
		let mensaje = this.msg_input_box.value;
		this.msg_input_box.value = '';
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

    create() {
        //Good old JS hack, the third...
		let that = this;
		
		// Añadir el background a la escena.
        this.menuBackground = this.add.image(0, 0, 'menuBackgroundBlurry').setOrigin(0, 0).setDisplaySize(config.width, config.height);
		
		//reset the timer to 0:
		this.accumulated_time = 0;
		
		//setup the chat element:
		const element = this.add.dom(config.width/2, config.height/2).createFromCache('cajaForo');
		this.ForumChat = element;
		
		//get the forum message box, which is the div where all the chat messages will be displayed:
		this.messages_box_div = element.node.querySelector('#forum-messages-box');
			//console.log(this.messages_box_div);
		
		//obtain the message input box:
		this.msg_input_box = element.getChildByName('message-input');
			//console.log(this.msg_input_box);
		
		//add the event listener for clicks to the send msg button: (note: this really could be simplified down to look like the onkeypress event but whatever, it's fucking Christmas and I shouldn't be doing this at almost 1AM, someone else added the complexity here and now it's going to stay until the change is really needed...)
		element.setPerspective(800);
		element.addListener('click');
		element.on('click', function (event)
		{

			//Botón de Enviar pulsado.
			if (event.target.name === 'send-message')
			{
				console.log("Botón enviar pulsado.");
				that.sendMessage();
			}

		});
		
		//add the event to the message text box so that the enter key will also act as a way to send messages:
		this.msg_input_box.onkeypress = function(e){
			//if the key code is equals to the ENTER key, send the message
			if(e.keyCode === 13){
				that.sendMessage();
			}
		};
		
		
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
		//let str = '<div class=\"message ' + chat_msg_type + '\"><div><div class=\"name\">' + stringReplaceHTMLSymbols(name) + '</div><div class=\"text\">' + stringReplaceHTMLSymbols(msg) + '</div></div></div>';
		
		//pattern match for commands.
		//TODO: Replace with proper pattern matching. In C or C++, we would make an scanner class and parse this, tokenize it and match patterns for commands. In JS, we can just convert these strings and treat them as JSON so the language will do the work for us. Bu that's a story for another day, cause we're running out of time now.
		//TODO: Add command chaining within the same message. Something like making it so that commands take text as an argument and multiple commands can be written in the same message separated by semicolons.
		//TODO ASAP: Fix the HTML command so that it is not as destructive as it currently is. The quotation marks bug is now fixed, but this still can break the styling of the entire chat!
		let final_msg_str = "";
		if(msg.startsWith('/html')){ //this one is dangerous af lol
			final_msg_str = msg;
		}
		else
		if(msg.startsWith('/img')){
			let tmp_str = msg.split('/img').join('');
			final_msg_str = "<img src=\"" + tmp_str + "\"/>";
		}
		else
		if(msg.startsWith('/color(red)')){
			let tmp_str = msg.split('/color(red)').join('');
			final_msg_str = "<p style='color:red'>" + tmp_str + "</p>"; 
		}
		else
		if(msg.startsWith('/color(green)')){
			let tmp_str = msg.split('/color(green)').join('');
			final_msg_str = "<p style='color:green'>" + tmp_str + "</p>"; 
		}
		else
		if(msg.startsWith('/color(blue)')){
			let tmp_str = msg.split('/color(blue)').join('');
			final_msg_str = "<p style='color:blue'>" + tmp_str + "</p>"; 
		}
		else
		if(msg.startsWith('/color(purple)')){
			let tmp_str = msg.split('/color(purple)').join('');
			final_msg_str = "<p style='color:purple'>" + tmp_str + "</p>"; 
		}
		else
		if(msg.startsWith('/color(cyan)')){
			let tmp_str = msg.split('/color(cyan)').join('');
			final_msg_str = "<p style='color:cyan'>" + tmp_str + "</p>"; 
		}
		else
		{
			final_msg_str = stringReplaceHTMLSymbols(msg);
		}
		
		let str = '<div class=\"message ' + chat_msg_type + '\"><div><div class=\"name\">' + stringReplaceHTMLSymbols(name) + '</div><div class=\"text\">' + final_msg_str + '</div></div></div>';
		
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