package com.dragon.game.controllers;

public class Vector2f64 {
	private double x,y;
	
	public Vector2f64() {
		this.x = 0.0;
		this.y = 0.0;
	}
	
	public Vector2f64(double x, double y) {
		this.x = x;
		this.y = y;
	}
	
	//Setters:
	public void setX(double x) {
		this.x = x;
	}
	
	public void setY(double y) {
		this.y = y;
	}
	
	
	//Getters:
	public double getX() {
		return this.x;
	}
	
	public double getY() {
		return this.y;
	}
	
	
}
