package com.dragon.game.controllers;

import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
//import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class UserService {
	
	private final Map<Long, User> users = new ConcurrentHashMap<>();
	private Long currentId;
	private String jsonFile;
	
	//Constructor:
	UserService(){
		this.currentId = 0L;
		this.jsonFile = "./default.json";
	}
	
	UserService(String filename){
		this.currentId = -1L;
		this.jsonFile = filename;
		this.readUsersFromFile();
	}
	
	
	//getters and setters
	public Long getCurrentId() {
		return this.currentId;
	}
	
	
	//implement all of the basic functionality for a REST API:
	//GET (all), GET (one), POST, PUT, DELETE
	
	//GET (all)
	public List<User> getAllUsers(boolean displayPasswords){
		ArrayList<User> data = new ArrayList<>(users.values()); //the list can be empty if there are no users, but will always return.
		if(!displayPasswords) {
			ArrayList<User> ans = new ArrayList<>();
			for(User u : data) {
				User new_user = new User(u.getId(), u.getUsername(), "***");
				ans.add(new_user);
			}
			return ans;
		}
		return data;
	}
	
	//GET (one)
	public User getUserById(Long id) {
		if(users.containsKey(id))
		{
			return users.get(id);
		}
		return null; //check for null in the REST API and return 404.
	}
	
	public User getUserByName(String name) {
		for(Map.Entry<Long, User> entry : this.users.entrySet()) {
			if(entry.getValue().getUsername().equals(name)) {
				return entry.getValue();
			}
		}
		return null;
	}
	
	//POST
	public User createUser(User user) {
		user.setId(currentId);
		users.put(user.getId(), user);
		
		++currentId;
		
		return user;
	}
	
	//Auxiliary function to add users to the array list (does not necessarily create a new user. Used when loading existing users from file.)
	public void addUser(User user) {
		this.users.put(user.getId(), user);
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
	
	public void writeUsersToFile() {
		ArrayList<User> users_list= new ArrayList<>(users.values());
		
		try (BufferedWriter writer = new BufferedWriter(new FileWriter(this.jsonFile))){
			
			writer.write("[\n");
			for(int i = 0; i < users_list.size(); ++i) {
				User current_user = users_list.get(i);
				String content = "    " + current_user.serializeUser();
				writer.write(content);
				if(i < users_list.size() - 1) {
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
	
	public void readUsersFromFile() {
		System.out.println("Reading existing user data.");
		JSONParser parser = new JSONParser();
        try {
            JSONArray a = (JSONArray) parser.parse(new FileReader(this.jsonFile));
            for (Object o : a) {
                JSONObject person = (JSONObject) o;

                Long id = (Long) person.get("id");
                String name = (String) person.get("username");
                String password = (String) person.get("password");
                
                User user = new User(id, name, password);
                this.addUser(user);
                
                this.currentId = Math.max(this.currentId, id);
            }
        } catch (IOException | ParseException e) {
            //e.printStackTrace();
        	System.err.println("The specified file does not exist. Could not read existing user data.");
        }
        ++this.currentId;
	}
	
}
