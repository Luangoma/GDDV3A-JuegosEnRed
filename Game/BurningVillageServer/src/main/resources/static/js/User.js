//Variable that holds the user account that the client is currently logged into.
var localUser = {
	user: {id: -1, username: 'none', password: 'none'},
	logged: false,
	
	//deleteUser: function(username, password){//ajax...},
	//createUser: function(username, password){},
	//loginUser: function(username, password){}
	
	log: function(){
		console.log("Local user: {" + JSON.stringify(this.user) + ", isLogged=" + this.logged + "}");
	},
	
	logIn: function(user){
		this.user = user;
		this.logged = true;
	},
	
	logOut: function(){
		this.user = {id: -1, username: 'none', password: 'none'};
		this.logged = false;
	},
	
	isLogged: function(){
		return this.logged;
	}
};

//function that periodically makes petitions to the server as a "keep alive" mechanism to notify that the user is still online. Once the user is considered to be offline, the server can determine what to do with it.
//Disconnection timeout in X seconds.
setInterval(function(){
	
	//only perform the petition if the user is logged into an account (which means that the local user does not have id = -1).
	if(localUser.user.id !== -1){
		$.ajax({
			url: ip.http + '/keep_alive/' + localUser.user.id,
			method: 'POST',
			contentType: 'application/json',
			success: function(data){
				console.log("Successfully notified the server that the user is still connected.");
			},
			error: function(xhr, status, error){
				console.log("Could not send a petition to the server to notify that the user is still connected.");
			}
		});
	}
	else
	{
		//not necessary to have this else block, but it's good to have it for debugging purposes.
		console.log("User is not logged in. No petition was sent to the server.");
	}
}, 1000 * 5); //the seconds chosen right now are 5.