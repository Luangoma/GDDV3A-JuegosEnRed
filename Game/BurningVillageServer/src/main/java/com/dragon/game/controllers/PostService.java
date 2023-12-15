package com.dragon.game.controllers;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;


public class PostService {		// PostService contiene 
	
	private final ArrayList<Post> posts = new ArrayList<Post>();
	private String jsonFile;	// El fichero con los posts
	
	PostService(String filename){
		this.jsonFile = filename;
		this.readPostsFromFile();
	}

	public void addPost(Post post) {
		this.posts.add(post);			// Añade el post al final del arraylist
	}
	public void readPostsFromFile() {
		
	}
	public void writePostsToFile() {
		
		try (BufferedWriter writer = new BufferedWriter(new FileWriter(this.jsonFile))){
			
			writer.write("[\n");
			for(int i = 0; i < posts.size(); ++i) {
				Post current_post = posts.get(i);
				String content = "    " + current_post.serializePost();
				writer.write(content);
				if(i < posts.size() - 1) {
					writer.write(",");
				}
				writer.write("\n");
			}
			writer.write("]\n");
			
			System.out.println("SUCCESS: User data was saved successfully to " + this.jsonFile);
		} catch (IOException e) {
			System.err.println("ERROR: Could not write user data to " + this.jsonFile);
		}
	}
	public ArrayList<Post> getAllPosts(){
		//ArrayList<Post> data = new ArrayList<>(posts.size()); //arraylist can be empty if there are no users, but will always return.
			//for(Post u : posts) {
			//	Post new_post = new Post(u.getId(), u.getPostContent());
			//	data.add(new_post);
			//}
			//return data;
		return posts;	// Devuelve una copia del array de usuarios
	}
}
