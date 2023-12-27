package com.dragon.game.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LobbyController {
	
	private final WebSocketMultiplayerHandler wshandler;
	
	//Extremely hacky looking way that Spring Boot has to "wire" controllers and handlers and stuff... this constructor is called automatically and doesn't even need the autowired tag. Basically, we would be able to do this way easier if this was more C like and we were allowed to have some kind of global list of users and lobbies. Would have been good to know about this feature sooner for the other controllers...
	public LobbyController(WebSocketMultiplayerHandler wshandler) {
		this.wshandler = wshandler;
	}
	
	//allow the users to use ajax on the client side to get a list of all the lobbies that exist in the server currently.
	@GetMapping(value = "/lobbies")
	public List<Lobby> getAllLobbies(){
		return this.wshandler.getAllLobbies();
	}
}
