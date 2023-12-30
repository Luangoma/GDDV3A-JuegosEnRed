//Object that represents the connection to the server for this client.
var connection = {
	socket: null, //this is what we usually call "var connection" in the JS world
	lobbyInfo: {lobbyId: -1, players: []},
	isConnected: function(){
		//Devuelve true si el socket pasa al estado de OPEN.
		return connection.socket.readyState === WebSocket.OPEN;
	},
	//These callbacks are configurable on each scene. Remember to set them to whatever scene specific functionality you want to execute. These callbacks exist as scene specific functionality that executes AFTER the baseline connection and socket functionality is executed.
	event_on_open: null,
	event_on_close: null,
	event_on_message: null, //this callback receives as an input parameter an already parsed JSON object, which means it can be used like any regular JavaScript object. That way, the parsing is done only once, within the baseline onmessage callback for the internal websocket.
	event_on_error: null,
	setCallbacks: function(onopenfn = null, onclosefn = null, onmsgfn = null, onerrorfn = null){
		connection.event_on_open = onopenfn;
		connection.event_on_close = onclosefn;
		connection.event_on_message = onmsgfn;
		connection.event_on_error = onerrorfn;
	},
	removeCallbacks: function(){ //NOTE: Calling connection.removeCallbacks() does the same as connection.setCallbacks() with no arguments, because the default values are null.
		connection.setCallbacks(null,null,null,null);
	},
	connect: function(){
		//This could take an address as an input argument, but since we always connect to the same place, and this is an object and not a class, then we don't need an address
		connection.socket = new WebSocket(ip.ws + "/multiplayer");
		connection.socket.onopen = function(){
			console.log("Socket: connection opened.");
			
			//call external custom callback
			if(connection.event_on_open){
				connection.event_on_open();
			}
		};
		connection.socket.onclose = function(){
			console.log("Socket: connection closed.");
			
			//call external custom callback
			if(connection.event_on_close){
				connection.event_on_close();
			}
		};
		connection.socket.onerror = function(error){
			console.log("Socket: network error: " + error);
			
			//call external custom callback
			if(connection.event_on_error){
				connection.event_on_error(error);
			}
		};
		connection.socket.onmessage = function(message){
			let message_str = message.data;
			console.log("Socket: message received: " + message_str);
			
			let message_obj = JSON.parse(message_str);
			console.log(message_obj);
			
			if(message_obj.actionType){
				switch(message_obj.actionType){
					default:{
						console.log("Obtained unknown info: " + message_obj.actionType);
						break;
					}
					case "lobby-info":{
						console.log("Obtained lobby info");
						connection.recvLobbyData(message_obj);
						break;
					}
				}
			}
			
			//call external custom callback
			if(connection.event_on_message){
				connection.event_on_message(message_obj);
			}
		};
	},
	disconnect: function(){
		connection.socket.close();
	},
	send: function(msg){
		connection.socket.send(msg);
	},
	sendObject: function(obj){
		connection.socket.send(JSON.stringify(obj));
	},
	matchMaking: function(){
		let obj = {actionType: 'match-making', playerId: localUser.user.id};
		connection.sendObject(obj);
	},
	leaveLobby: function(){
		let obj = {actionType: 'leave-lobby', playerId: localUser.user.id};
		connection.sendObject(obj);
	},
	joinLobby: function(id){
		let obj = {actionType: 'join-lobby', playerId: localUser.user.id, lobbyId: id};
		connection.sendObject(obj);
	},
	createLobby: function(){
		let obj = {actionType: 'create-lobby', playerId: localUser.user.id}
		connection.sendObject(obj);
	},
	sendData: function(x = 0, y = 0, rot = 0, health = 0, current_time = 0, shooting = false, ready = true){
		let obj = {
			actionType: 'send-data',
			playerId: localUser.user.id,
			playerName: localUser.user.username,
			positionX: x,
			positionY: y,
			rotation: rot, //rot is an angle value (iirc in radians)
			isReady: ready,
			playerHealth: health,
			isShooting: shooting,
			time: current_time
		};
		connection.sendObject(obj);
	},
	sendLobbyData: function(isReady){
		connection.sendData(0,0,0,0,0,false,isReady);
	},
	recvLobbyData: function(msg){ //msg is an object here, it has already gone through a JSON parse in the onmessage event.
		connection.lobbyInfo.lobbyId = msg.lobbyId;
		connection.lobbyInfo.players = msg.players;
	}
};