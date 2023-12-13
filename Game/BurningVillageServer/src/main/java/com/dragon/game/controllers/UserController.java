package com.dragon.game.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	
	private final UserService userService = new UserService();
	
	@GetMapping(value = "/users")
	public List<User>getAllUsers() {
		return this.userService.getAllUsers(false);
	}
	
	@GetMapping(value = "/ADMIN/users/{pwd}")
	public List<User>getAllUsersAdmin(@PathVariable String pwd) {
		String password = "173467321476-C-32789777643-T-732-V-73117888732476789764376-LOCK";
		return this.userService.getAllUsers(pwd.equals(password));
	}
	
	@GetMapping(value = "/TEST/create_test_users")
	public void createTestUsers() {
		this.userService.createUser(new User(0L, "Pepito", "1234"));
		this.userService.createUser(new User(0L, "Manolo", "Manolipassword"));
		this.userService.createUser(new User(0L, "Juanjo", "password"));
		this.userService.createUser(new User(0L, "Alfredo", "@AlFreditoMio69"));
	}
	
}
