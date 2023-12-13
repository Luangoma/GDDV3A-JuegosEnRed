package com.dragon.game;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.dragon.game.controllers")
public class BurningVillageServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BurningVillageServerApplication.class, args);
	}

}
