package com.dragon.game.controllers;

import java.io.IOException; //it says that it goes unused, but this dependency is actually required to prevent warnings and errors when exceptions happen in the WS Handlers.
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class WebSocketEchoHandler extends TextWebSocketHandler {
	
	private final List<WebSocketSession> sessions = new ArrayList<>();
	
	public WebSocketEchoHandler(){}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
		System.out.println("A new connection was received (" + sessions.size() + " connections in total).");
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
		sessions.remove(session);
		System.out.println("A connection was closed (" + sessions.size() + " connections in total).");
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Message received: " + message.getPayload());
		String msg = message.getPayload();
		
		for(WebSocketSession s : sessions) {
			s.sendMessage(new TextMessage(msg));
		}
		
	}
	
}
