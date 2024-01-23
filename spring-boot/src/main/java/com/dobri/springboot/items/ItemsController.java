package com.dobri.springboot.items;

import com.dobri.springboot.Constants;
import com.dobri.springboot.user.User;
import com.dobri.springboot.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * @author Dobrin Dobrev
 */

@CrossOrigin(origins = Constants.REACT_URL)
@RestController
@RequiredArgsConstructor
public class ItemsController {

    @Autowired
    ItemsService itemsService;

    @Autowired
    private UserService userService;

// For production
//    @GetMapping("/")
//    public List<Items> getAllItems() {
//
//        return itemsService.getAllItems();
//    }

// For Testing - It generates an admin user with ADMIN role
    @GetMapping("/")
    public List<Items> getAllItems() {

        User admin = userService.findByEmail("admin@gmail.com");
        
        System.out.println("In Items Controller is admin created: " + admin);

        if (admin == null) {
            userService.createAdminUser();
        }

        System.out.println("In Items Controller is admin created: " + admin);


        return itemsService.getAllItems();
    }

    @RequestMapping(value = {"/clothes/details/{id}", "/clothes/edit/{id}"}, method = RequestMethod.GET)
    public Items findItemById(@PathVariable Long id) {
        Items entity = itemsService.findItemById(id);

        return entity;
    }

    @PostMapping("/addClothes")
    public ResponseEntity<Items> addItem(@RequestBody Items item) {
        Items newItem = itemsService.saveItem(item);
        return new ResponseEntity<>(newItem, HttpStatus.CREATED);
    }

    @PutMapping("/clothes/edit/{id}")
    public ResponseEntity<String> updateItem(
            @PathVariable Long id,
            @RequestBody Items updatedItem
    ) {
        try {

            Items existingItem = itemsService.findItemById(id);

            try {
                // Update the existing item with the new data
                existingItem.setGender(updatedItem.getGender());
                existingItem.setColor(updatedItem.getColor());
                existingItem.setDescription(updatedItem.getDescription());
                existingItem.setImg_link(updatedItem.getImg_link());
                existingItem.setPrice(updatedItem.getPrice());
                existingItem.setQuantity(updatedItem.getQuantity());
                existingItem.setSize(updatedItem.getSize());
                existingItem.setType(updatedItem.getType());

                // Save the updated item (you need to implement this)
//                itemsService.updateItem(item);
                itemsService.saveItem(existingItem);

            } catch (Exception e) {
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

    @DeleteMapping("/clothes/{id}")
    public void deleteItemById(@PathVariable Long id) {

        itemsService.deleteItemById(id);
    }
}
