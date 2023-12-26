package com.dragon.game.controllers;

import java.io.IOException; //it says that it goes unused, but this dependency is actually required to prevent warnings and errors when exceptions happen in the WS Handlers.
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import ch.qos.logback.core.joran.sanity.Pair;

//NOTE: In the REST API controllers, a different library was used for the JSON conversion. Here, we're going to use Jackson, as recommended by the professor.
//TODO: actually implement this. Currently it's just a copy-paste of the echo handler
public class WebSocketMultiplayerHandler extends TextWebSocketHandler {
	
	//Concurrent Hash Maps are used to guarantee that multiple connections can be handled properly and concurrently.
	private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>(); //each "session" is a WebSocket, aka a player connection to the server.
	private final Map<Long, Lobby> lobbies = new ConcurrentHashMap<>(); //each "lobby" is a container where we allow 2 (or more) players to meet so that they can decide if they want to play together or not. Once they play, the game match takes place between players within a certain lobby. For now, lobbies are a list of 2 players because only 2 players are allowed in this game, but internally, they support a growable list of any number of players.
	private final ObjectMapper mapper = new ObjectMapper(); //a mapper object to do some JSON parsing, because we can't have free functions in Java for some reason. Long live 21st century software development.
	
	
	private long getNumberOfLobbies() {
		return lobbies.size();
	}
	
	public WebSocketMultiplayerHandler(){}
	
	//When the player presses to play online, they establish a connection with the game server.
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.put(session.getId(), session);
		System.out.println("A new connection was received (" + sessions.size() + " connections in total).");
	}
	
	//Close the connection between the client and the server.
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
		
		sessions.remove(session.getId());
		Long lobby_id = this.getLobbyWithPlayer(session.getId());
		
		if(lobby_id >= 0) {
			Lobby current_lobby = this.lobbies.get(lobby_id);
			current_lobby.removePlayerByString(session.getId());
			if(current_lobby.getConnectedPlayers() <= 0) {
				this.lobbies.remove(lobby_id);
			}
		}
		
		System.out.println("A connection was closed (" + sessions.size() + " connections in total).");
	}
	
	//Handle the received messages from the client.
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Message received: " + message.getPayload());
		
		String msg = message.getPayload(); //get the string payload from the text message so that it can be used by Jackson to parse the JSON and extract the value for each field.
		
		JsonNode node = this.mapper.readTree(msg);
		
		String action = node.get("actionType").asText();
		if(action == null) {
			action = "UNKNOWN";
		}
		
		//String subtreestr = node.get("data").asText();
		//JsonNode subtree = mapper.readTree(subtreestr);
		
		//TODO: add null checks to all the strings down there. Just in case someone sends a hand crafted packet and everything breaks.
		switch(action) {
		case "create-lobby":{
			
			Lobby new_lobby = new Lobby();
			new_lobby.setLobbyId(this.getNumberOfLobbies());
			new_lobby.setMaxPlayers(2);
			new_lobby.addPlayerByString(session.getId());
			
			this.lobbies.put(this.getNumberOfLobbies(), new_lobby);
			
			System.out.println("The player tried to create a lobby.");
			break;
		}
		case "join-lobby":{
			//String lobby_id_str = subtree.get("lobby-id").asText();
			//System.out.println("The connection joined the lobby: " + lobby_id_str);
			
			String player_id_str = node.get("playerId").asText();
			String lobby_id_str = node.get("lobbyId").asText(); //if ID == -1, then create a new lobby and send the ID to the player.
			
			Long player_id = Long.getLong(player_id_str);
			Long lobby_id = Long.getLong(lobby_id_str);
			
			System.out.println("Player joined lobby! Player ID: " + player_id_str + ", lobby ID: " + lobby_id_str);
			break;
		}
		case "send-data":{
			//String pos_str = subtree.get("position").asText();
			//System.out.println("Moved to position: " + pos_str);
			
			String player_id_str = node.get("playerId").asText();
			String lobby_id_str = node.get("lobbyId").asText();
			String player_position_x_str = node.get("positionX").asText();
			String player_position_y_str = node.get("positionY").asText();
			
			System.out.println("Player " + player_id_str + " in lobby " + lobby_id_str + " sent position: {" + player_position_x_str + ", " + player_position_y_str + "}");
			break;
		}
		case "match-making":{
			System.out.println("A player wants to perform automatic match making. Sadly, none of this has been implemented yet, lol.");
			break;
		}
		case "get-server-info":{
			String ans = "Server info:\n";
			
			for(Map.Entry<Long, Lobby> entry : this.lobbies.entrySet()) {
				ans += entry.getValue().serializeLobby() + "\n";
			}
			
			session.sendMessage(new TextMessage(ans));
			System.out.println(ans);
			break;
		}
		default:{
			//an error ocurred, so the session must be closed.
			System.out.println("Unknown instruction was received. Terminating connection.");
			session.close();
			break;
		}
		}
		
		/*
		for(WebSocketSession s : sessions) {
			s.sendMessage(new TextMessage(msg));
		}
		*/
		
	}
	
	public Long getLobbyWithPlayer(String s) {
		for(Map.Entry<Long, Lobby> entry : this.lobbies.entrySet()) {
			Lobby current_lobby = entry.getValue();
			Long current_key = entry.getKey();
			if(current_lobby.hasPlayerByString(s)) {
				return current_key;
			}
		}
		return -1L;
	}
	
	/*
	@Scheduled(fixedRate = 1000 * 10)
	public void checkActiveLobbies() {
		for(Map.Entry<Long, Lobby> entry : this.lobbies.entrySet()) {
			Lobby current_lobby = entry.getValue();
			Long current_key = entry.getKey();
			if(current_lobby.getConnectedPlayers() <= 0) {
				lobbies.remove(current_key);
			}
		}
	}
	*/
	
}
