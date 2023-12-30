package com.dragon.game.controllers;

public class Player {
	private Long userId; //this determines the user ID, aka, the ID of the account in use.
	private Long playerId; //this determines the player ID relative to the lobby, aka an "entity" ID of sorts for the player objects within a lobby.
	private Vector2f64 position;
	private double rotation;
	private String name;
	private String sessionId;
	private boolean isReady;
	private double health;
	private boolean isShooting;
	private int time;
	
	public Player() {
		this.userId = -1L;
		this.playerId = -1L;
		this.position = new Vector2f64();
		this.rotation = 0;
		this.name = new String();
		this.sessionId = new String();
		this.isReady = false;
		this.health = -1;
		this.isShooting = false;
		this.time = 0;
	}
	
	public Player(Long uid, Long pid, Vector2f64 pos, double rot, String name, String session, boolean isReady, double health, boolean isShooting, int time) {
		this.userId = uid;
		this.playerId = pid;
		this.position = pos;
		this.rotation = rot;
		this.name = name;
		this.sessionId = session;
		this.isReady = isReady;
		this.health = health;
		this.isShooting = isShooting;
		this.time = time;
	}
	
	public Player(Player p) {
		this.userId = p.userId;
		this.playerId = p.playerId;
		this.position = p.position;
		this.rotation = p.rotation;
		this.name = p.name;
		this.sessionId = p.sessionId;
		this.isReady = p.isReady;
		this.health = p.health;
		this.isShooting = p.isShooting;
		this.time = p.time;
	}
	
	public boolean isPlayerValid() {
		boolean is_valid =
				this.playerId != null &&
				this.playerId >= 0
				;
		return is_valid;
	}
	
	
	//Setters:
	public void setUserId(Long id) {
		this.userId = id;
	}
	
	public void setPlayerId(Long id) {
		this.playerId = id;
	}
	
	public void setPosition(Vector2f64 position) {
		this.position = position;
	}
	
	public void setRotation(double rotation) {
		this.rotation = rotation;
	}
	
	public void setName(String s) {
		this.name = s;
	}
	
	public void setSessionId(String s) {
		this.sessionId = s;
	}
	
	public void setIsReady(boolean b) {
		this.isReady = b;
	}
	
	public void setHealth(double d) {
		this.health = d;
	}

	public void setIsShooting(boolean b) {
		this.isShooting = b;
	}
	
	public void setTime(int t) {
		this.time = t;
	}
	
	
	//Getters:
	public Long getUserId() {
		return this.userId;
	}
	
	public Long getPlayerId() {
		return this.playerId;
	}
	
	public Vector2f64 getPosition() {
		return this.position;
	}
	
	public double getRotation() {
		return this.rotation;
	}
	
	public String getName() {
		return this.name;
	}
	
	public String getSessionId() {
		return this.sessionId;
	}
	
	public boolean getIsReady() {
		return this.isReady;
	}
	
	public double getHealth() {
		return this.health;
	}
	
	public boolean getIsShooting() {
		return this.isShooting;
	}
	
	public int getTime() {
		return this.time;
	}
	
}
