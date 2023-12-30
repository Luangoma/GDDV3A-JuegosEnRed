//Object that represents the game time
var gameTime = {
	defaultTime: 90, //Each game match will have a total time of 90 seconds.
	currentTime: 0, //this holds the time of the currently ongoing match.
	timer: null,
	startTimer: function(){
		//initialize the game timer to the default time
		gameTime.currentTime = gameTime.defaultTime;
		//each 1000ms (1sec) remove 1 second from the timer.
		gameTime.timer = setInterval(function(){
			gameTime.currentTime -= 1;
		}, 1000);
	},
	stopTimer: function(){
		//stop the timer only if the timer is valid
		if(gameTime.timer){
			clearInterval(gameTime.timer);
			gameTime.timer = null; //reset the timer to null so that we can check again later if the timer is valid or not
		}
	},
	timeHasFinished: function(){
		return gameTime.currentTime <= 0;
	}
};

//NOTE: A benefit of using set interval instead of Phaser's time function is that now, the timer still runs even when the game is minimized, which saves us a lot of trouble and headaches with sync.
