package com.dragon.game;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ComponentScan("com.dragon.game.controllers")
@EnableScheduling
public class BurningVillageServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BurningVillageServerApplication.class, args);
	}

}
