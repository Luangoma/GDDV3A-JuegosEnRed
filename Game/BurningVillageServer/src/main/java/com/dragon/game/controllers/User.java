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
		String ans = "{id: " + this.id + ", username: " + this.username + ", password: " + this.password + "}";
		return ans;
	}
	
}
