package com.dragon.game.controllers;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class UserService {
	
	private final Map<Long, User> users = new HashMap<>();
	private Long currentId;
	
	//Constructor:
	UserService(){
		this.currentId = 0L;
	}
	
	UserService(String filename){
		//cargar archivo
	}
	
	//implement all of the basic functionality for a REST API:
	//GET (all), GET (one), POST, PUT, DELETE
	
	//GET (all)
	public List<User> getAllUsers(){
		return new ArrayList<>(users.values()); //the list can be empty if there are no users, but will always return.
	}
	
	//GET (one)
	public User getUserById(Long id) {
		if(users.containsKey(id))
		{
			return users.get(id);
		}
		return null; //check for null in the REST API and return 404.
	}
	
	//POST
	public User createUser(User user) {
		user.setId(currentId);
		users.put(user.getId(), user);
		
		++currentId;
		
		return user;
	}
	
	//PUT
	public User updateUser(Long id, User updatedUser) {
		if(users.containsKey(id)) {
			updatedUser.setId(id);
			users.put(id, updatedUser);
			return updatedUser;
		}
		return null; //check for null later in the REST API controller and return a 404.
	}
	
	//DELETE
	public void deleteUser(Long id) {
		users.remove(id);
	}
	
	public void clearUsers() {
		this.users.clear();
	}
	
	public void loadUsersFromFile(String filename) {
		JSONParser parser = new JSONParser();
        try {
            JSONArray a = (JSONArray) parser.parse(new FileReader(filename));

            for (Object o : a) {
                JSONObject person = (JSONObject) o;

                Long id = (Long) person.get("id");
                String name = (String) person.get("name");
                String password = (String) person.get("password");
                
                User user = new User(id, name, password);
                this.createUser(user);
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
	}
	
}
