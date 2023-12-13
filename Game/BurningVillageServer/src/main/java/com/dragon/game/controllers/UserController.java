package com.dragon.game.controllers;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	
	private final UserService userService = new UserService();
	
}
