package com.dragon.game.controllers;


import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class PostController {
	
	// El objeto postService leerá en su constructor el fichero que indicamos en forma de string
	private final PostService postService = new PostService("./posteos.json");	
	
	@GetMapping(value = "/posts")
	public ArrayList<Post>getAllPosts() {
		return this.postService.getAllPosts();
	}
	@GetMapping(value = "/testPosts")
	public void createTestPosts() {
		this.postService.createPost(new Post(0L,0L, "Nuevo titulo"));
	}
	@PostMapping(value = "/posts/new")
	public void createPost(@RequestBody Post post) {
		// El id enviado es irrelevante porque se genera en orden de llegada
		this.postService.createPost(new Post(post.getPostId(),post.getAuthorId(), post.getPostContent()));
	}
	@GetMapping(value = "/savePosts")
	public void PostWrite() {
		this.postService.writePostsToFile();	// Escribe todos los datos al fichero permanentemente
	}
	@GetMapping(value = "/posts/delete")
	public void deleteAllPosts(){
		// Forma sencilla de borrar el array de posts pero no el fichero (posibles mejoras a futuro)
		this.postService.clearPosts(); 
	}
	
}
