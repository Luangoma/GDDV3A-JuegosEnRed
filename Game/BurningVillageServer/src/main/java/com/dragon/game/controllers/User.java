package com.dragon.game.controllers;

public class User {
	
	private Long id;
	private String username;
	private String password;
	private Long highScore;
	
	public User(Long id, String name, String password) {
		this.id = id;
		this.username = name;
		this.password = password;
		this.highScore = 0L;
	}
	
	public User(User other) {
		this.id = other.id;
		this.username = other.username;
		this.password = other.password;
		this.highScore = other.highScore;
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
		return this.highScore;
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
		this.highScore = score;
	}
	
	public void updateHighScore(Long score) {
		if(this.highScore < score) {
			this.highScore = score;
		}
	}
	
	public String serializeUser() {
		String filtered_username = this.username.replace("\\", "\\\\").replace("\"", "\\\"");
		String filtered_password = this.password.replace("\\", "\\\\").replace("\"", "\\\"");
		String ans = "{\"id\": " + this.id + ", \"username\": \"" + filtered_username + "\", \"password\": \"" + filtered_password + "\", \"highScore\": " + this.highScore + "}";
		return ans;
	}
	
}
