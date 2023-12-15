package com.dragon.game.controllers;

public class Post {
	
	private Long authorId;	// Id del autor del post
	private String content;	// Contenido del post
	
	public Post(Long id, String content) {
		this.authorId = id;		
		this.content = content;	
	}
	
	public Long getId() {
		return this.authorId;
	}
	
	public String getPostContent() {
		return this.content;
	}
	
	
	public void setId(Long id) {
		this.authorId = id;
	}
	
	public void setPostContent(String content) {
		this.content = content;
	}
	
	
	public String serializePost() {
		String ans = "{\"authorId\": " + this.authorId + ", \"post\": \"" + this.content + "\"}";
		return ans;
	}
	
}
