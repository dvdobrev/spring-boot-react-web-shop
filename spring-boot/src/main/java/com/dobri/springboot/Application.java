package com.dobri.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
@RestController
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/name")
	public Map<String, String> getName() {
		Map<String, String> response = new HashMap<>();
		response.put("name", "Pestho Goshev");
		return response;
	}
}
