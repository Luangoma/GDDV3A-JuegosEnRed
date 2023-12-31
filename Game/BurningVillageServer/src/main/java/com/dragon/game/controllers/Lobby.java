package com.dragon.game.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

//NOTE: A null string signifies that said player slot in the lobby is not occupied, thus, no player is connected on said slot, which means that it is free to use by another user.
public class Lobby {
	
	private Long lobbyId;
	private final Map<String, Player> playerSlots = new ConcurrentHashMap<>(); //possible concurrency problem? use map later maybe.
	private long maxPlayers;
	private boolean isInGame;
	private Long lastPlayerId = 0L;
	
	
	public Lobby() {
		this.lobbyId = -1L;
		this.maxPlayers = 2;
		this.isInGame = false;
		this.lastPlayerId = 0L;
	}
	
	public void setIsInGame(boolean val) {
		this.isInGame = val;
	}
	
	public boolean getIsInGame() {
		return this.isInGame;
	}
	
	public void setMaxPlayers(long value) {
		this.maxPlayers = value;
	}
	
	public long getMaxPlayers() {
		return this.maxPlayers;
	}
	
	public long getConnectedPlayers() {
		return this.playerSlots.size();
	}
	
	//Determine if the index is out of range or not. Returns true if the given input index is valid for the lobby's player slots list. This is done because, even if we know in most cases that we want a limit of players, we still give support for a growable player list, which is why we use an ArrayList.
	private boolean isValidIndex(int idx) {
		return (idx >= 0 || idx < this.getConnectedPlayers()) && idx < this.getMaxPlayers();
	}
	
	//Get the ID of this lobby.
	public Long getLobbyId() {
		return this.lobbyId;
	}
	
	//Set the ID of this lobby.
	public void setLobbyId(Long id) {
		this.lobbyId = id;
	}
	
	//Get the player session string for the player in the slot with index "idx" within this lobby. If the index is not in use by this lobby, return null so that we can tell that no player is connected in said slot.
	/*
	public String getPlayerByIndex(int idx) {
		if(this.isValidIndex(idx)) {
			return this.playerSlots.get(idx).getSessionId();
		}
		return null;
	}
	*/
	
	//Set the player session string for the player in the slot with index "idx" within this lobby with the chosen value string. If the index is out of bounds, then nothing happens. Maybe in the future change this to a boolean function so that it can return a result to confirm wether it has worked or not.
	/*
	public void setPlayerByIndex(int idx, String value) {
		if(this.isValidIndex(idx)) {
			//this.playerSlots.set(idx, value);
			this.playerSlots.get(idx).setSessionId(value);
		}
	}
	*/
	
	/*
	public void setPlayerDataByIndex(int idx, Player newData) {
		if(this.isValidIndex(idx)) {
			this.playerSlots.set(idx, new Player(newData));
		}
	}
	*/
	
	//Remove the chosen player from the list. Uses a list index.
	/*
	public void removePlayerByIndex(int idx) {
		if(this.isValidIndex(idx)) {
			this.playerSlots.remove(idx);
		}
	}
	*/
	
	
	//Check if a player is connected in the lobby through their lobby index.
	/*
	public boolean hasPlayerByIndex(int idx) {
		return isValidIndex(idx);
	}
	*/
	
	//Check if a certain player is inside of this lobby through their connection string.
	public boolean hasPlayerByString(String target_player_id) {
		for(Map.Entry<String, Player> entry : this.playerSlots.entrySet()) {
			String s = entry.getKey();
			if(s.equals(target_player_id)) {
				return true;
			}
		}
		return false;
	}
	
	//Get the lobby index of a given player by their player ID string. If the player is not in the list, it will return -1.
	/*
	public int getPlayerIndexByString(String target_player_id) {
		int i = 0;
		for(Player p : this.playerSlots) {
			String s = p.getSessionId();
			if(s.equals(target_player_id)) {
				return i;
			}
			++i;
		}
		return -1;
	}
	*/
	
	
	//Add a player connection to the lobby if the player is not already connected to the lobby.
	//WARNING: UNUSED FUNCTION DUE TO BEING AN OBSOLETE AND BADLY THOUGHT OUT PIECE OF CRAP
	/*
	public boolean addPlayerByString(String s) {
		if(!this.hasPlayerByString(s) && this.getConnectedPlayers() < this.getMaxPlayers()) {
			Player p = new Player();
			p.setSessionId(s);
			this.playerSlots.add(p);
			return true;
		}
		return false;
	}
	*/
	
	public void addPlayer(String s, Long id) {
		if(!this.hasPlayerByString(s) && this.getConnectedPlayers() < this.getMaxPlayers()) {
			Player p = new Player();
			p.setSessionId(s);
			p.setUserId(id);
			p.setPlayerId(this.lastPlayerId);
			this.playerSlots.put(s, p);
			
			++this.lastPlayerId;
		}
	}
	
	//Remove the chosen player from the list. Uses a connection string.
	public void removePlayer(String s) {
		this.playerSlots.remove(s);
	}
	
	//Simple function to serialize the lobby into a JSON string.
	//TODO: Use jackson instead of doing this by hand.
	/*
	public String serializeLobby() {
		String player_slots_str = "";
		
		for(int i = 0; i < this.getConnectedPlayers(); ++i) {
			player_slots_str += "\"" + this.getPlayerByIndex(i) + "\"";
			if(i < this.getConnectedPlayers() - 1) {
				player_slots_str += ", ";
			}
		}
		
		String ans = "{\"lobbyId\": " + this.getLobbyId() + ", \"maxPlayers\": " + this.getMaxPlayers() + ", \"playerCount\": " + this.getConnectedPlayers() + ", \"playerSlots\": [" + player_slots_str + "]}";
		return ans;
	}
	*/
	
	public List<Player> getPlayers() {
		//List<Player> ans = new ArrayList<>(this.playerSlots.values());
		List<Player> ans = this.getPlayersSorted();
		return ans;
	}
	
	public Player getPlayer(String s) {
		return this.playerSlots.get(s);
	}
	
	public void setPlayer(String s, Player p) {
		Player new_p = new Player(p);
		this.playerSlots.put(s, new_p);
	}
	
	//custom sorting function to sort players by playerId, from smaller to bigger (which is the same as ordering by insertion order).
	//This is required because, since we now use a concurrent map, the order is completely lost, thus, we need to handle this manually.
	public List<Player> getPlayersSorted() {
		List<Player> ans = new ArrayList<>(this.playerSlots.values());
		
		for(int i = 0; i < ans.size(); ++i) {
			for(int j = 0; j < ans.size(); ++j) {
				
				Long player_i = ans.get(i).getPlayerId();
				Long player_j = ans.get(j).getPlayerId();
				
				if(player_i < player_j) {
					Player temp = ans.get(i);
					ans.set(i, ans.get(j));
					ans.set(j, temp);
				}
			}
		}
		
		return ans;
	}
	
}
