package com.dragon.game.controllers;

public class Player {
	private Long playerId;
	private Vector2f position;
	private Vector2f rotation;
	private String name;
	private String sessionId;
	
	public Player() {
		this.playerId = -1L;
		this.position = new Vector2f();
		this.rotation = new Vector2f();
		this.name = new String();
		this.sessionId = new String();
	}
	
	public Player(Long id, Vector2f pos, Vector2f rot, String name, String session) {
		this.playerId = id;
		this.position = pos;
		this.rotation = rot;
		this.name = name;
		this.sessionId = session;
	}
	
	public boolean isPlayerValid() {
		boolean is_valid =
				this.playerId != null &&
				this.playerId >= 0 &&
				this.position != null &&
				this.rotation != null &&
				this.name != null &&
				this.sessionId != null
				;
		return is_valid;
	}
	
	
	//Setters:
	public void setPlayerId(Long id) {
		this.playerId = id;
	}
	
	public void setPosition(Vector2f position) {
		this.position = position;
	}
	
	public void setRotation(Vector2f rotation) {
		this.rotation = rotation;
	}
	
	public void setName(String s) {
		this.name = s;
	}
	
	public void setSessionId(String s) {
		this.sessionId = s;
	}
	
	
	//Getters:
	public Long getPlayerId() {
		return this.playerId;
	}
	
	public Vector2f getPosition() {
		return this.position;
	}
	
	public Vector2f getRotation() {
		return this.rotation;
	}
	
	public String getName() {
		return this.name;
	}
	
	public String getSessionId() {
		return this.sessionId;
	}
	
	
}
