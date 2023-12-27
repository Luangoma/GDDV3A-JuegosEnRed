//Object that represents the connection to the server for this client.
var connection = {
	socket: null, //this is what we usually call "var connection" in the JS world
	is_connected: false,
	isConnected: function(){
		//Devuelve true si el socket pasa al estado de OPEN.
		return connection.socket.readyState === WebSocket.OPEN;
	},
	connect: function(){
		//This could take an address as an input argument, but since we always connect to the same place, and this is an object and not a class, then we don't need an address
		connection.socket = new WebSocket(ip.ws + "/multiplayer");
		connection.socket.onopen = function(){
			console.log("Socket: connection opened.");
		};
		connection.socket.onclose = function(){
			console.log("Socket: connection closed.");
		};
		connection.socket.onerror = function(error){
			console.log("Socket: network error: " + error);
		};
		connection.socket.onmessage = function(message){
			let message_str = message.data;
			console.log("Socket: message received: " + message_str);
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
	}
};