package com.dragon.game.controllers;

public class Vector2f {
	private float x,y;
	
	public Vector2f() {
		this.x = 0;
		this.y = 0;
	}
	
	public Vector2f(float x, float y) {
		this.x = x;
		this.y = y;
	}
	
	//Setters:
	public void setX(float x) {
		this.x = x;
	}
	
	public void setY(float y) {
		this.y = y;
	}
	
	
	//Getters:
	public float getX() {
		return this.x;
	}
	
	public float getY() {
		return this.y;
	}
	
	
}
