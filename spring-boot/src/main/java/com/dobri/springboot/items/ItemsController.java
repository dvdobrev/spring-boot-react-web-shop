package com.dobri.springboot.items;

import com.dobri.springboot.Constants;
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

    @GetMapping("/")
    public List<Items> getAllItems() {

        return itemsService.getAllItems();
    }

    @RequestMapping(value = {"/clothes/details/{id}", "/clothes/edit/{id}"}, method = RequestMethod.GET)
    public Items findItemById(@PathVariable int id) {
        Optional<Items> entity = itemsService.findItemById(id);

        return entity.orElse(null);
    }

    @PostMapping("/addClothes")
    public ResponseEntity<Items> addItem(@RequestBody Items item) {
        Items newItem = itemsService.saveItem(item);
        return new ResponseEntity<>(newItem, HttpStatus.CREATED);
    }

    @PutMapping("/clothes/edit/{id}")
    public ResponseEntity<String> updateItem(
            @PathVariable int id,
            @RequestBody Items updatedItem
    ) {
        try {

            Optional<Items> existingItem = itemsService.findItemById(id);

            if (existingItem.isPresent()) {
                Items newItem = existingItem.get();
                // Update the existing item with the new data
                newItem.setGender(updatedItem.getGender());
                newItem.setColor(updatedItem.getColor());
                newItem.setDescription(updatedItem.getDescription());
                newItem.setImg_link(updatedItem.getImg_link());
                newItem.setPrice(updatedItem.getPrice());
                newItem.setQuantity(updatedItem.getQuantity());
                newItem.setSize(updatedItem.getSize());
                newItem.setType(updatedItem.getType());

                // Save the updated item (you need to implement this)
//                itemsService.updateItem(item);
                itemsService.saveItem(newItem);

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

    @DeleteMapping("/clothes/{id}")
    public void deleteItemById(@PathVariable int id) {

        itemsService.deleteItemById(id);
    }
}
