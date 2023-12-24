var command = {
	html: function(msg){
		return msg;
	},
	img: function(url){
		let ans = "<img src=\"" + url + "\"/>";
		return ans;
	},
	color: function(color, msg){
		let ans = "<p style='color:" + color + "'>" + msg + "</p>";
		return ans;
	}
};