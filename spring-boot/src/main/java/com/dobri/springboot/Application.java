package com.dobri.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

        return clothesService.getAllClothes();
    }

    @CrossOrigin(origins = reactURL)
    @RequestMapping(value = {"/clothes/details/{id}", "/clothes/edit/{id}"}, method = RequestMethod.GET)
    public Clothes findItemById(@PathVariable int id) {
        Optional<Clothes> entity = clothesService.findItemById(id);

        return entity.orElse(null);
    }


    @CrossOrigin(origins = reactURL)
    @PostMapping("/addClothes")
    public ResponseEntity<Clothes> addClothes(@RequestBody Clothes clothes) {
        Clothes savedClothes = clothesService.saveClothes(clothes);
        return new ResponseEntity<>(savedClothes, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = reactURL)
    @PutMapping("/clothes/edit/{id}")
    public ResponseEntity<String> updateItem(
            @PathVariable int id,
            @RequestBody Clothes updatedItem
    ) {
        try {
            // Retrieve the existing item by ID (you need to implement this)
            Optional<Clothes> existingItem = clothesService.findItemById(id);
            System.out.println("Put Method: " + existingItem );


            if (existingItem.isPresent()) {
                Clothes item = existingItem.get();
                // Update the existing item with the new data
                item.setGender(updatedItem.getGender());
                item.setColor(updatedItem.getColor());
                item.setDescription(updatedItem.getDescription());
                item.setImg_link(updatedItem.getImg_link());
                item.setPrice(updatedItem.getPrice());
                item.setQuantity(updatedItem.getQuantity());
                item.setSize(updatedItem.getSize());
                item.setType(updatedItem.getType());

                // Save the updated item (you need to implement this)
//                clothesService.updateItem(item);
                    clothesService.saveClothes(item);

            } else {
                // Item not found, return a 404 response

                return ResponseEntity.notFound().build();
            }
            
            // Return a success response
            return ResponseEntity.ok("Item updated successfully");
        } catch (Exception e) {
            // Handle any exceptions, e.g., database errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating item: " + e.getMessage());
        }
    }


    @CrossOrigin(origins = reactURL)
    @DeleteMapping("/clothes/{id}")
    public void deleteItemById(@PathVariable int id) {
        System.out.println("--------------------------");
        System.out.println("In Delete - Cloth ID: " + id);
        clothesService.deleteItemById(id);

    }


//    @CrossOrigin(origins = "http://localhost:3000")
//    @PutMapping("/data")
//    public void editName(@RequestBody Map<String, String> request) {
//        String newName = request.get("name");
//        System.out.println(request.get("name"));
//
//        responseName.put("name", newName);
//    }

//    }
//

}

