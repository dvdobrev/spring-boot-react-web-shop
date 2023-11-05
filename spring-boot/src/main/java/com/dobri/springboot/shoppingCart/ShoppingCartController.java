package com.dobri.springboot.shoppingCart;

import com.dobri.springboot.Constants;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author Dobrin Dobrev
 */

@CrossOrigin(origins = Constants.REACT_URL)
@RestController
@RequiredArgsConstructor
public class ShoppingCartController {

    @Autowired
    ShoppingCartService shoppingCartService;


    @PostMapping("/addToShoppingCart")
    public ResponseEntity<String> addToShoppingCart(@RequestBody ShoppingCart shoppingCart) {
        System.out.println("---------------in POST SHOPPINGCart");
        Long itemId = shoppingCart.getItem().getItemId();

        ShoppingCart existingItem = shoppingCartService.findItemById(itemId);

        try {
            if (existingItem == null) {
                shoppingCart.setQuantity(1);
                shoppingCartService.saveShoppingCart(shoppingCart);
            } else {
                Integer currentQuantity = existingItem.getQuantity();
                existingItem.setQuantity(currentQuantity + 1);
                shoppingCartService.saveShoppingCart(existingItem);
            }
            return ResponseEntity.ok("Item updated successfully");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating item: " + e.getMessage());
        }
    }
}