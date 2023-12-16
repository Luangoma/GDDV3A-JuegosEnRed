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
	private final String password = "173467321476-C-32789777643-T-732-V-73117888732476789764376-LOCK";
	
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
		this.postService.createPost(post);
		this.postService.writePostsToFile();
	}
	@GetMapping(value = "/posts/save")
	public void PostWrite() {
		this.postService.writePostsToFile();	// Escribe todos los datos al fichero permanentemente
	}
	@GetMapping(value = "/posts/deleteAll/{pwd}")
	public void deleteAllPosts(@PathVariable String pwd){
		if(pwd.equals(this.password)) {
		this.postService.clearPosts();			// Borra el array de posts
		this.postService.writePostsToFile();	// Sobreescribe el archivo con el array vaciado
		}
	}
	
	@GetMapping(value = "/posts/deleteId/{id}/{pwd}")
	public ResponseEntity<Post> deletePost(@PathVariable Long id, @PathVariable String pwd){
		Post post = this.postService.getPostById(id);
		if(!pwd.equals(this.password)|| post.getPostId() == null) {
			System.out.println("Post UNKOWN with wrong id " + id + " tried to be deleted");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		System.out.println("Post from: " + post.getAuthorId() + " successfully deleted.");
		this.postService.deletePostById(id);
		this.postService.writePostsToFile();	// Sobreescribimos el archivo a uno sin ese post
		return new ResponseEntity<>(post, HttpStatus.OK);
	}
	
}
