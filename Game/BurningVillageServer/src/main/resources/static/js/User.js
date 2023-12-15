//WIP
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
