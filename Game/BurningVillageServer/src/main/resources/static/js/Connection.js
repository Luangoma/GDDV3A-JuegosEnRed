//Object that represents the connection to the server for this client.
var connection = {
	socket: null, //this is what we usually call "var connection" in the JS world
	lobbyInfo: {lobbyId: -1, players: []},
	isConnected: function(){
		//Devuelve true si el socket pasa al estado de OPEN.
		return connection.socket.readyState === WebSocket.OPEN;
	},
	connect: function(onopenfn = null, onclosefn = null, onmsgfn = null, onerrorfn = null){
		//This could take an address as an input argument, but since we always connect to the same place, and this is an object and not a class, then we don't need an address
		connection.socket = new WebSocket(ip.ws + "/multiplayer");
		connection.socket.onopen = function(){
			console.log("Socket: connection opened.");
			if(onopenfn){
				onopenfn();
			}
		};
		connection.socket.onclose = function(){
			console.log("Socket: connection closed.");
			if(onclosefn){
				onclosefn();
			}
		};
		connection.socket.onerror = function(error){
			console.log("Socket: network error: " + error);
			if(onerrorfn){
				onerrorfn(error);
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
						connection.lobbyInfo.lobbyId = message_obj.lobbyId;
						connection.lobbyInfo.players = message_obj.players;
						break;
					}
				}
			}
			
			if(onmsgfn){
				onmsgfn(message_obj);
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
	}
};