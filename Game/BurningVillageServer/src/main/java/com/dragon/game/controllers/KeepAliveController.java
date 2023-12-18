package com.dragon.game.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KeepAliveController {
	
	//TODO: this maybe should use a single map with some kind of "Status" class that contains the 2 booleans or something... or maybe not...
	private Map<Long, Boolean> user_status_list = new ConcurrentHashMap<>();
	private Map<Long, Boolean> has_messaged_list = new ConcurrentHashMap<>(); //acts as a lock of sorts on the status
	private Long aliveCount = 0L;
	
	
	//TODO: this really should check some credentials to confirm that the user that is attempting to be kept alive is truly who they claim to be
	@PostMapping(value = "/keep_alive/{id}")
	public void keepAlivePetition(@PathVariable Long id) {
		user_status_list.put(id, true);
		has_messaged_list.put(id, true);
	}
	
	//every 20 seconds set the users to appear to be offline. Then, the users will reset themselves to online shortly after. Gypsy solution but the constraints on this project forced us down this path of Doom and mediocrity.
	@Scheduled(fixedRate = 1000 * 10) //Do not confuse fixedDelay with fixedRate... this will make you lose hours of debugging on end.
	public void checkUserActivity() {
		System.out.println("Routing user check for connectivity...");
		Long current_user_count = 0L;
		for(Map.Entry<Long, Boolean> entry : this.has_messaged_list.entrySet()) {
			//entry.setValue(false); //does not work because we are changing a temporary copy instead of the original.
			
			//if the server has not received a message from the user in the last periodic check, then it will set the user as offline.
			if(entry.getValue() == false) {
				this.user_status_list.put(entry.getKey(), false);
			}
			
			//set the message lock to false. If the user messages within this period of time, then it will not set the user as offline. This means that the user has a grace period of 2 * N seconds, plus a lock. (with N being the amount of seconds this function is scheduled to use as a delay between calls.)
			this.has_messaged_list.put(entry.getKey(), false);
			
			//change currently stored count of the amount of users that are currently logged in and actively connected to the server.
			if(this.user_status_list.get(entry.getKey())) {
				current_user_count += 1; //the count increases by 1 for every single connected user that was found.
			}
		}
		
		this.aliveCount = current_user_count;
	}
	
	//This used to be more complex with a whole set of Response entities and what-not, but they really are not needed because an user that is not in the list simply should return that they are not online. This kind of situation can happen when you ask for an user that does not exist... or an user who has not reported in yet during the current runtime of the server.
	@GetMapping(value = "/is_alive/{id}")
	public Boolean getIsAlive(@PathVariable Long id) {
		Boolean b = this.user_status_list.get(id);
		if(b == null) {
			return false;
		}
		System.out.println("The user with id " + id + " has alive status: " + b);
		return b;
	}
	
	//simply returns the amount of users that are currently "alive" (connected/online).
	@GetMapping(value = "/get_alive_count")
	public Long getAliveCount() {
		return this.aliveCount;
	}
	
}
