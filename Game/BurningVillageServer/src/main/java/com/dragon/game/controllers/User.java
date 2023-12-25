package com.dragon.game.controllers;

public class User {
	
	private Long id;
	private String username;
	private String password;
	
	public User(Long id, String name, String password) {
		this.id = id;
		this.username = name;
		this.password = password;
	}
	
	public Long getId() {
		return this.id;
	}
	
	public String getUsername() {
		return this.username;
	}
	
	public String getPassword() {
		return this.password;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public void setUsername(String name) {
		this.username = name;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String serializeUser() {
		String filtered_username = this.username.replace("\\", "\\\\").replace("\"", "\\\"");
		String filtered_password = this.password.replace("\\", "\\\\").replace("\"", "\\\"");
		String ans = "{\"id\": " + this.id + ", \"username\": \"" + filtered_username + "\", \"password\": \"" + filtered_password + "\"}";
		return ans;
	}
	
}
