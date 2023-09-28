package com.dobri.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SpringBootApplication
@RestController
public class Application {

    private final String reactURL = "http://localhost:3000";


//    private final ClothesRepository clothesRepository;
    private final ClothesService clothesService;
//    private final CountryRepository countryRepository;
//    private final CountryService countryService;


//    static private final Map<String, String> responseName = new HashMap<>();
//    static private final Map<String, List<String>> colorObject = new HashMap<>();
//    List<String> colors = new ArrayList<>();

    public Application(CountryService countryService, ClothesService clothService) {
        this.clothesService = clothService;

//        this.countryService = countryService;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @CrossOrigin(origins = reactURL)
    @GetMapping("/clothes")
    public List<Clothes> getAllClothes() {
        System.out.println("Dobrin in GetMapping");
        System.out.println("All clothes: " + clothesService.getAllClothes());
        return clothesService.getAllClothes();
    }


    @CrossOrigin(origins = reactURL)
    @PostMapping("/addClothes")
    public ResponseEntity<Clothes> addClothes(@RequestBody Clothes clothes) {
        Clothes savedClothes = clothesService.saveClothes(clothes);
        return new ResponseEntity<>(savedClothes, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = reactURL)
    @DeleteMapping("/clothes/{id}")
    public void deleteItemById(@PathVariable int id) {
        System.out.println("--------------------------");
        System.out.println("In Delete - Cloth ID: " +id);
        clothesService.deleteItemById(id);
        
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

}

