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
	},
	rgb: function(r,g,b,msg){
		let ans = "<span style='color:rgb(" + r + "," + g + "," + b + ")'>" + msg + "</span>";
		return ans;
	}
};