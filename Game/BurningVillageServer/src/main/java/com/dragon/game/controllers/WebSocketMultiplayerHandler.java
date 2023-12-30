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
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ch.qos.logback.core.joran.sanity.Pair;

//NOTE: In the REST API controllers, a different library was used for the JSON conversion. Here, we're going to use Jackson, as recommended by the professor.
//TODO: actually implement this. Currently it's just a copy-paste of the echo handler
public class WebSocketMultiplayerHandler extends TextWebSocketHandler {
	
	//Concurrent Hash Maps are used to guarantee that multiple connections can be handled properly and concurrently.
	private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>(); //each "session" is a WebSocket, aka a player connection to the server.
	private final Map<Long, Lobby> lobbies = new ConcurrentHashMap<>(); //each "lobby" is a container where we allow 2 (or more) players to meet so that they can decide if they want to play together or not. Once they play, the game match takes place between players within a certain lobby. For now, lobbies are a list of 2 players because only 2 players are allowed in this game, but internally, they support a growable list of any number of players.
	private final ObjectMapper mapper = new ObjectMapper(); //a mapper object to do some JSON parsing, because we can't have free functions in Java for some reason. Long live 21st century software development.
	
	private Long currentLobbyId = 0L;
	
	private long getNumberOfLobbies() {
		return lobbies.size();
	}
	
	//TODO: (This one is a maybe, it is not mandatory, we could instead just get the last used lobby ID and be done with it.) Make a function to get a good free lobby ID so that we can keep running without exausting our lobby ID numbers during runtime (which I doubt would ever happen, but it is possible...)
	
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
		
		//sync this so that lobbies cannot accidentally be left empty because all players left at the exact same moment and the lobby did not perform the number of players check properly...
		synchronized(session) {
			leaveLobby(session); //this way, even if the connection is lost accidentally (an error happens, internet connection dies, etc, whatever...), the lobby is left successfully.
		}
		System.out.println("A connection was closed (" + sessions.size() + " connections in total).");
	}
	
	public void leaveLobby(WebSocketSession session) throws IOException {
		//find the lobby in which the player is located
		Long lobby_id = this.getLobbyWithPlayer(session.getId());
		
		//if the lobby exists (the id is not -1), then remove the player from the lobby. Then, if the lobby is empty, remove it from the lobbies list, because the lobby no longer needs to exist.
		if(lobby_id >= 0) {
			//get the lobby object from the lobbies list
			Lobby current_lobby = this.lobbies.get(lobby_id);
			
			//make the player leave the lobby
			current_lobby.removePlayer(session.getId());
			
			//send the new lobby info to all the remaining players in the lobby (which obviously does not include the player that just left the lobby)
			for(Player p : current_lobby.getPlayers()) {
				WebSocketSession current_session = this.sessions.get(p.getSessionId());
				sendLobbyInfo(current_session, current_lobby);
			}
			
			//if the lobby is empty, remove the lobby from the list of lobbies from the server
			if(current_lobby.getConnectedPlayers() <= 0) {
				this.lobbies.remove(lobby_id);
			}
		}
	}
	
	public void createLobby(WebSocketSession session, Long pid) throws IOException {
		
		//create a new lobby and configure it
		Lobby new_lobby = new Lobby();
		new_lobby.setLobbyId(this.currentLobbyId);
		new_lobby.setMaxPlayers(2);
		
		//new_lobby.addPlayerByString(session.getId()); //old method used to make a manual connection, which would skip all the logic written inside of the joinlobby function...
		
		//add the lobby to the list of lobbies from the server
		this.lobbies.put(this.currentLobbyId, new_lobby);
		
		//join the player that created the lobby to said lobby
		this.joinLobby(session, pid, this.currentLobbyId);
		
		System.out.println("The player tried to create a lobby.");
		
		++this.currentLobbyId;
	}
	
	public void joinLobby(WebSocketSession session, Long pid, Long lobby_id) throws IOException {
		//join the player to a lobby through the lobby ID:
		Lobby current_lobby = this.lobbies.get(lobby_id);
		current_lobby.addPlayer(session.getId(), pid);
		
		//notify all the players in the lobby about the new lobby info:
		for(Player p : current_lobby.getPlayers()) {
			WebSocketSession current_player_session = this.sessions.get(p.getSessionId());
			this.sendLobbyInfo(current_player_session, current_lobby);
		}
		
		//notify all the other players in the lobby (if they exist) that this player is ready.
		
		System.out.println("Player joined a lobby!");
	}
	
	public void matchMaking(WebSocketSession session, Long pid) throws IOException {
		
		System.out.println("A player wants to perform automatic match making.");
		
		//loop through all existing lobbies (if there are any) and join the player to the first lobby with an empty slot.
		for(Map.Entry<Long, Lobby> entry : this.lobbies.entrySet()) {
			Lobby current_lobby = entry.getValue();
			Long current_key = entry.getKey();
			if(current_lobby.getConnectedPlayers() < current_lobby.getMaxPlayers() && current_lobby.getConnectedPlayers() != 0) { //The last part of the check after the AND is completely unnecessary, but it exists in the case that the server has a hiccup and an empty lobby that is about to get deleted for being empty is somehow registered within this loop during player matchmaking, which would lead to a broken connection.
				//current_lobby.addPlayerByString(session.getId());
				this.joinLobby(session, pid, current_key);
				return;
			}
		}
		
		//if no lobbies exist currently, then create a new one and wait afk.
		this.createLobby(session, pid);
		return;
	}
	
	//send the lobby info that is stored within the server a certain player that is connected within a given lobby.
	public void sendLobbyInfo(WebSocketSession session, Lobby lobby) throws IOException{		
		ObjectNode node = this.mapper.createObjectNode();
		
		node.put("actionType","lobby-info");
		node.put("lobbyId",lobby.getLobbyId());
		
		Player p = lobby.getPlayer(session.getId()); //we really should check for null here... but we do not!!!! cause we're rad af.
		node.put("playerId", p.getPlayerId());
		
		ArrayNode arr = this.mapper.valueToTree(lobby.getPlayers().toArray());
		node.set("players", arr);
		
		String msg = node.toString(); //.asText() gives null because why not. Good old java doing things that are inconsistent because why not.
		
		//sync the message sending so that SpringBoot doesn't shit itself when trying to queue responses...
		synchronized(session) {
			session.sendMessage(new TextMessage(msg));
		}
		
		System.out.println("The sent info is: " + msg);
	}
	
	//obtain the lobby id from the lobby in which a given connection is stored.
	public Long getLobbyIdFromSessionId(String sessionId) {
		Long ans = -1L;
		for(Map.Entry<Long, Lobby> entry : this.lobbies.entrySet()) {
			Lobby current_lobby = entry.getValue();
			Long current_key = entry.getKey();
			if(current_lobby.hasPlayerByString(sessionId)) { //The last part of the check after the AND is completely unnecessary, but it exists in the case that the server has a hiccup and an empty lobby that is about to get deleted for being empty is somehow registered within this loop during player matchmaking, which would lead to a broken connection.
				return current_key;
			}
		}
		return ans;
	}

	//update player info in the server lobby and then communicate it to all clients within the same lobby
	public void sendPlayerInfo(WebSocketSession session, Player newPlayerInfo) throws IOException {
		Long lobbyId = this.getLobbyIdFromSessionId(session.getId());
		if(lobbyId == -1L) {
			return; //early return because the session is not inside of any lobby, so it can't really send any info to the game server.
		}
		
		//obtain the lobby in which the player is connected
		Lobby lobby = this.lobbies.get(lobbyId);
		
		//update the lobby info
		lobby.setPlayer(session.getId(), newPlayerInfo);
		
		//send the new lobby info to all players
		for(Player p : lobby.getPlayers()) {
			WebSocketSession current_session = this.sessions.get(p.getSessionId());
			this.sendLobbyInfo(current_session, lobby);
		}
		
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
		
		Long currentUserId = node.get("userId").asLong();
		//Long currentPlayerId = node.get("playerId").asLong();
		
		//String subtreestr = node.get("data").asText();
		//JsonNode subtree = mapper.readTree(subtreestr);
		
		//TODO: add null checks to all the strings down there. Just in case someone sends a hand crafted packet and everything breaks.
		switch(action) {
		case "create-lobby":{
			this.createLobby(session, currentUserId);
			break;
		}
		case "join-lobby":{
			Long lobby_id = node.get("lobbyId").asLong();
			
			long connected_players = this.lobbies.get(lobby_id).getConnectedPlayers();
			long max_players = this.lobbies.get(lobby_id).getMaxPlayers();
			
			//only join the player to the lobby if there are enough free slots.
			if(connected_players < max_players) {
				this.joinLobby(session, currentUserId, lobby_id);
			} else {
				this.createLobby(session, currentUserId);
			}
			
			break;
		}
		case "send-data":{
			
			//obtain the information from the received JSON
			Long uid = node.get("userId").asLong();
			Long pid = node.get("playerId").asLong();
			double positionX = node.get("positionX").asDouble();
			double positionY = node.get("positionY").asDouble();
			Vector2f64 pos = new Vector2f64(positionX, positionY);
			double rot = node.get("rotation").asDouble();
			String name = node.get("playerName").asText();
			String sessionStr = session.getId();
			boolean isReady = node.get("isReady").asBoolean();
			double health = node.get("playerHealth").asDouble();
			boolean isShooting = node.get("isShooting").asBoolean();
			int time = node.get("time").asInt();
			
			//compose the data into a new Player object
			Player playerData = new Player(uid,pid,pos,rot,name,sessionStr,isReady, health, isShooting, time);
			
			//send the player info
			sendPlayerInfo(session, playerData);
			
			break;
		}
		case "match-making":{
			this.matchMaking(session, currentUserId);
			break;
		}
		case "get-server-info":{
			String ans = "Server info:\n";
			
			for(Map.Entry<Long, Lobby> entry : this.lobbies.entrySet()) {
				//ans += entry.getValue().serializeLobby() + "\n"; //TODO: This shit is completely out of order because I'm falling asleep. Will fix some other day.
			}
			
			session.sendMessage(new TextMessage(ans));
			System.out.println(ans);
			break;
		}
		case "leave-lobby":{
			this.leaveLobby(session);
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
	
	//old unused method to remove unused lobbies. Do not use anymore.
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
	
	//Every N seconds, send each connected player an updated list of the lobbies that are currently open.
	/*
	@Scheduled(fixedRate = 1000 * 2) //2 seconds
	public void sendActiveLobbies() {
		//serialize all lobbies into a JSON list
		//loop through all sessions in the sessions list.
			//if the current session is of a player that is not in game
				//send the list of lobbies to the current session.
	}
	*/
	
	//some featrues such as this one really belong in some kind of lobby service class...
	public List<Lobby> getAllLobbies() {
		ArrayList<Lobby> ans = new ArrayList<>(this.lobbies.values());
		return ans;
	}
	
}
