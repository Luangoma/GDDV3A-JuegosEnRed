package com.dragon.game;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.dragon.game.controllers.WebSocketEchoHandler;
import com.dragon.game.controllers.WebSocketMultiplayerHandler;

@SpringBootApplication
@EnableScheduling
@EnableWebSocket
@ComponentScan("com.dragon.game.controllers")
public class BurningVillageServerApplication implements WebSocketConfigurer {
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(echoHandler(), "/echo").setAllowedOrigins("*");
		registry.addHandler(multiplayerHandler(), "/multiplayer").setAllowedOrigins("*");
	}
	
	@Bean
	public WebSocketEchoHandler echoHandler() {
		return new WebSocketEchoHandler();
	}
	
	@Bean
	public WebSocketMultiplayerHandler multiplayerHandler() {
		return new WebSocketMultiplayerHandler();
	}
	
	public static void main(String[] args) {
		SpringApplication.run(BurningVillageServerApplication.class, args);
	}

}
