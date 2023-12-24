var command = {
	html: function(msg){
		return msg;
	},
	img: function(url){
		let ans = "<img src=\"" + url + "\"/>";
		return ans;
	},
	color: function(color, msg){
		let ans = "<span style='color:" + color + "'>" + msg + "</span>";
		return ans;
	}
};