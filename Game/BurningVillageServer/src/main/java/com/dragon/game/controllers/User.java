package com.dragon.game.controllers;

public class User {
	private Long id;
	private String username;
	private String email;
	
	public User(Long id, String name, String email) {
		this.id = id;
		this.username = name;
		this.email = email;
	}
	
	public Long getId() {
		return this.id;
	}
	
	public String getUsername() {
		return this.username;
	}
	
	public String getEmail() {
		return this.email;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public void setUsername(String name) {
		this.username = name;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
}
