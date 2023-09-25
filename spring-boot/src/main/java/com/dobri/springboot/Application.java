package com.dobri.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootApplication
@RestController
public class Application {


    //    private final ClothesRepository clothesRepository;
//    private final CountryRepository countryRepository;
    private final CountryService countryService;


//    static private final Map<String, String> responseName = new HashMap<>();
//    static private final Map<String, List<String>> colorObject = new HashMap<>();
//    List<String> colors = new ArrayList<>();

    public Application(CountryService countryService) {
        //        this.clothesRepository = clothesRepository;

        this.countryService = countryService;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/countries")
    public List<Country> getAllCountries() {
        System.out.println("Dobrin in GetMapping");
        System.out.println("All countries: " + countryService.getAllCountries());
        return countryService.getAllCountries();
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/countries")
    public ResponseEntity<Country> addCountry(@RequestBody Country country) {
        Country savedCountry = countryService.saveCountry(country);
        return new ResponseEntity<>(savedCountry, HttpStatus.CREATED);
    }


//    public Application(CountryRepository countryRepository) {
////        this.clothesRepository = clothesRepository;
//        this.countryRepository = countryRepository;
//    }
//
//    public static void main(String[] args) {
//        SpringApplication.run(Application.class, args);
//    }

//    @CrossOrigin(origins = "http://localhost:3000")
//    @GetMapping("/data")
//    public Map<String, Object> getData() {
//        Map<String, Object> responseData = new HashMap<>();
//        responseData.put("name", responseName);
//        responseData.put("data", colorObject);
//        System.out.println("Name: " + responseName.get("name"));
//        System.out.println("Color: " + colorObject.get("colors"));
//        return responseData;
//    }
//
//    @CrossOrigin(origins = "http://localhost:3000")
//    @PutMapping("/data")
//    public void editName(@RequestBody Map<String, String> request) {
//        String newName = request.get("name");
//        System.out.println(request.get("name"));
//
//        responseName.put("name", newName);
//    }
//
//    @CrossOrigin(origins = "http://localhost:3000")
//    @PostMapping("/data")
//    public void addColor(@RequestBody Map<String, String> request) {
//        System.out.println("--------------------------");
//        System.out.println("In Post - Color: " + request.get("colors"));
//        String color = request.get("colors");
//        List<String> colors = colorObject.get("colors");
//        colors.add(color);
//        colorObject.put("colors", colors);
//        System.out.println(colorObject.get("colors"));
//
//    }
//
//    @CrossOrigin(origins = "http://localhost:3000")
//    @DeleteMapping("/data/{color}")
//    public void deleteColor(@PathVariable String color) {
//        System.out.println("--------------------------");
//        System.out.println("In Delete - Color: " + color);
//
//        List<String> allColors = colorObject.get("colors");
//
//        if (allColors.remove(color)) {
//            colorObject.put("colors", allColors);
//            System.out.println("Color removed successfully.");
//        } else {
//            System.out.println("Color not found.");
//        }
//    }
}

