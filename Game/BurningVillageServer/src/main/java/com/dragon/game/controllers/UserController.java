package com.dragon.game.controllers;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;

@RestController
public class UserController {
	
	private final UserService userService = new UserService("./some_file.json");
	private final String password = "173467321476-C-32789777643-T-732-V-73117888732476789764376-LOCK";
	
	@GetMapping(value = "/users")
	public List<User>getAllUsers() {
		return this.userService.getAllUsers(false);
	}
	
	@GetMapping(value = "/ADMIN/users/{pwd}")
	public List<User>getAllUsersAdmin(@PathVariable String pwd) {
		return this.userService.getAllUsers(pwd.equals(this.password));
	}
	
	@GetMapping(value = "/ADMIN/write/{pwd}")
	public void performTestWrite(@PathVariable String pwd) {
		if(pwd.equals(this.password)) {
			System.out.println("The password matches.");
			try (BufferedWriter writer = new BufferedWriter(new FileWriter("./EXPERIMENTAL_FILE.txt"))){
				String content = "Experimental text to be written to the file.";
				writer.write(content);
				System.out.println("The file has been written.");
			} catch (IOException e) {
				System.err.println("ERROR: Could not write file.");
			}
		}
	}
	
	@GetMapping(value = "/ADMIN/save/{pwd}")
	public void performTestSave(@PathVariable String pwd) {
		if(pwd.equals(this.password)) {
			this.userService.writeUsersToFile();
		}
	}
	
	@GetMapping(value = "/TEST/create_test_users")
	public void createTestUsers() {
		this.userService.createUser(new User(0L, "Pepito", "1234"));
		this.userService.createUser(new User(0L, "Manolo", "Manolipassword"));
		this.userService.createUser(new User(0L, "Juanjo", "password"));
		this.userService.createUser(new User(0L, "Alfredo", "@AlFreditoMio69"));
	}
	
	@DeleteMapping(value = "/users/delete/{id}/{pwd}")
	public ResponseEntity<User> deleteUsers(@PathVariable Long id, @PathVariable String pwd){
		User user = this.userService.getUserById(id);
		if(!checkUserCredentials(user, pwd)) {
			System.out.println("User UNKOWN with wrong id " + id + " tried to delete the account but used the wrong credentials.");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		System.out.println("User " + user.getUsername() + " successfully deleted their account.");
		this.userService.deleteUser(id);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@PostMapping(value = "/users")
	public boolean crearUsuario() {
		this.userService.createUser(new User(1L, "crearUsuarioTest", "1234567890"));
		return true;
	}
	
	
	
	@GetMapping(value = "/users/login/{usr}/{pwd}") //This really should be a POST to hide the login data from the URL, but bureaucracy wins...
	public ResponseEntity<User> loginRequest(@PathVariable String usr, @PathVariable String pwd) {
		User user = this.userService.getUserByName(usr);
		if(!checkUserCredentials(user, pwd)) {
			System.out.println("User " + usr + " tried to log in but used the wrong credentials.");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		System.out.println("User " + usr + " successfully logged in.");
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	
	
	
	
	//checks if an user is null and if the credentials are valid.
	private boolean checkUserCredentials(User user, String pwd) {
		if(user == null || !user.getPassword().equals(pwd)) {
			return false;
		}
		return true;
	}
	
}
