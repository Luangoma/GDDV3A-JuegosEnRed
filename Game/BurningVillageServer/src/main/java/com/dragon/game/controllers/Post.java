package com.dragon.game.controllers;

public class Post {
	
	private Long postId;
	private Long authorId;	// Id del autor del post
	private String content;	// Contenido del post
	
	public Post(Long postId, Long authorId, String content) {
		this.postId = postId;
		this.authorId = authorId;		
		this.content = content;	
	}
	//public Post(Long authorId, String content) {	// Si no se quiere usar id en el post
	//	this.authorId = authorId;		
	//	this.content = content;	
	//}
	
	public Long getAuthorId() {
		return this.authorId;
	}
	
	public Long getPostId() {
		return this.postId;
	}
	
	public String getPostContent() {
		return this.content;
	}
	
	
	public void setAuthorId(Long id) {
		this.authorId = id;
	}
	
	public void setPostId(Long id) {
		this.postId = id;
	}
	
	public void setPostContent(String content) {
		this.content = content;
	}
	
	
	public String serializePost() {
		String ans = "{\"postId\": " + this.postId + ", \"authorId\": " + this.authorId + ", \"postContent\": \"" + this.content + "\"}";
		return ans;
	}
	
}
