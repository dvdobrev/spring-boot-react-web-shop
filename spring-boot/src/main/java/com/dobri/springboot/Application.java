package com.dobri.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@SpringBootApplication
@RestController
public class Application {
    static private final Map<String, String> responseName = new HashMap<>();
    static private final Map<String, List<String>> colorObject = new HashMap<>();
    List<String> colors = new ArrayList<>();

    public Application() {
        responseName.put("name", "Dobri");
        colors.add("white");
        colorObject.put("colors", colors);

    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/data")
    public Map<String, Object> getData() {
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("name", responseName);
        responseData.put("data", colorObject);
        System.out.println("Name: " + responseName.get("name"));
        System.out.println("Color: " + colorObject.get("colors"));
        return responseData;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/data")
    public void editName(@RequestBody Map<String, String> request) {
        String newName = request.get("name");
        System.out.println(request.get("name"));

        responseName.put("name", newName);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/data")
    public void addColor(@RequestBody Map<String, String> request) {
        System.out.println("--------------------------");
        System.out.println("In Post - Color: " + request.get("colors"));
        String color = request.get("colors");
        List<String> colors = colorObject.get("colors");
        colors.add(color);
        colorObject.put("colors", colors);
        System.out.println(colorObject.get("colors"));

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/data/{color}")
    public void deleteColor(@PathVariable String color) {
        System.out.println("--------------------------");
        System.out.println("In Delete - Color: " + color);

        List<String> allColors = colorObject.get("colors");

        if (allColors.remove(color)) {
            colorObject.put("colors", allColors);
            System.out.println("Color removed successfully.");
        } else {
            System.out.println("Color not found.");
        }
    }
}

