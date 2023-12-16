package com.dragon.game.controllers;

import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;


public class PostService {		// PostService contiene 
	
	private final ArrayList<Post> posts = new ArrayList<Post>();
	private String jsonFile;	// El fichero con los posts
	private Long currentId = 0L;
	
	PostService(){	
		this.jsonFile = "./default.json";	// Si no se da nombre de archivo utiliza un fichero generico que se asume vacío
	}
	PostService(String filename){
		this.jsonFile = filename;
		this.readPostsFromFile();	// El objeto contendrá todos los post del archivo guardado en filename
	}

	public void addPost(Post post) {
		this.posts.add(post);			// Añade el post al final del arraylist
	}
	public void readPostsFromFile() {
		System.out.println("Reading existing posts data.");
		JSONParser parser = new JSONParser();
        try {
            JSONArray a = (JSONArray) parser.parse(new FileReader(this.jsonFile));
            for (Object o : a) {
                JSONObject post_info = (JSONObject) o;

                Long id = (Long) post_info.get("postId");
                Long authorId = (Long) post_info.get("authorId");
                String content = (String) post_info.get("postContent");
                
                Post post = new Post(id, authorId, content);
                this.addPost(post);	// Añade el post al objeto postService
                
                this.currentId = Math.max(this.currentId, id);	
                // nos quedamos con el id mas alto para seguir añadiendo posts en dicho orden de id
            }
        } catch (IOException | ParseException e) {
            //e.printStackTrace();
        	System.err.println("The specified file does not exist. Could not read existing post data.");
        }
        ++this.currentId;
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
			
			System.out.println("SUCCESS: Posts data was saved successfully to " + this.jsonFile);
		} catch (IOException e) {
			System.err.println("ERROR: Could not write posts data to " + this.jsonFile);
		}
	}
	
	public Post getPostById(Long id) {		// Devuelve un post en función de su id
		for (Post post : posts) {		// Muy ineficiente porque recorre todos los posts pero sirve
	        if (post.getPostId().equals(id)) {
	            return post;
	        }
	    }
		return null; //check for null in the REST API and return 404.
	}
	
	public Boolean deletePostById(Long id) {		// Devuelve un post en función de su id
		int index=0;
		for (Post post : posts) {		
	        if (post.getPostId().equals(id)) {
	        	posts.remove(index);	// Eliminamos el post eliminando del array el bloque que usa el indice calculado
	            return true;
	        }
	        index++;	// Llevamos la cuenta de la posición del arraylist por la que vamos para eliminarla si se requiere
	    }
		return false; //check for null in the REST API and return 404.
	}
	
	
	public Post createPost(Post post) {
		post.setPostId(currentId);
		this.posts.add(post);
		++currentId;
		return post;
	}
	
	public void clearPosts() {
		this.posts.clear();	// Borra todos los posts del arraylist
	}
	public ArrayList<Post> getAllPosts(){
		//ArrayList<Post> data = new ArrayList<>(posts.size()); //arraylist can be empty if there are no users, but will always return.
			//for(Post u : posts) {
			//	Post new_post = new Post(u.getId(), u.getPostContent());
			//	data.add(new_post);
			//}
			//return data;
		return this.posts;	// Devuelve una copia del array de usuarios
	}
}
