var trollUser = {
	user:{
		password: 'Buen intento, pero los desarrolladores ya pensaron en eso lol. Vas a tener que currartelo más.'
	}
};
var command = {
	html: function(msg){
		let ans = msg.split('localUser.user.password').join('trollUser.user.password');
		return ans;
	},
	img: function(url){
		let ans = "<img src=\"" + stringReplaceHTMLSymbols(url) + "\"/>";
		return ans;
	},
	color: function(color, msg){
		let ans = "<span style='color:" + color + "'>" + stringReplaceHTMLSymbols(msg) + "</span>";
		return ans;
	},
	rgb: function(r,g,b,msg){
		let ans = "<span style='color:rgb(" + r + "," + g + "," + b + ")'>" + stringReplaceHTMLSymbols(msg) + "</span>";
		return ans;
	}
};