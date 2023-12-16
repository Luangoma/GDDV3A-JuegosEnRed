package com.dragon.game.controllers;


import java.util.ArrayList;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class PostController {
	
	private final PostService postService = new PostService("./posteos.json");
	
	@GetMapping(value = "/posts")
	public ArrayList<Post>getAllPosts() {
		return this.postService.getAllPosts();
	}
	@GetMapping(value = "/testPosts")
	public void createTestPosts() {
		this.postService.createPost(new Post(0L,0L, "Pepito"));
	}
	
}
