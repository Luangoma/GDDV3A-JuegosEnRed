package com.dragon.game.controllers;

public class User {
	
	private Long id;
	private String username;
	private String password;
	private Long high_score;
	
	public User(Long id, String name, String password) {
		this.id = id;
		this.username = name;
		this.password = password;
		this.high_score = 0L;
	}
	
	public User(User other) {
		this.id = other.id;
		this.username = other.username;
		this.password = other.password;
		this.high_score = other.high_score;
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
	
	public Long getHighScore() {
		return this.high_score;
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
	
	public void setHighScore(Long score) {
		this.high_score = score;
	}
	
	public String serializeUser() {
		String filtered_username = this.username.replace("\\", "\\\\").replace("\"", "\\\"");
		String filtered_password = this.password.replace("\\", "\\\\").replace("\"", "\\\"");
		String ans = "{\"id\": " + this.id + ", \"username\": \"" + filtered_username + "\", \"password\": \"" + filtered_password + "\", \"high_score\": " + this.high_score + "}";
		return ans;
	}
	
}
