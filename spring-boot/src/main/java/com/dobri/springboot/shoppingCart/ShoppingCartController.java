package com.dobri.springboot.shoppingCart;

import com.dobri.springboot.Constants;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Dobrin Dobrev
 */

@CrossOrigin(origins = Constants.REACT_URL)
@RestController
@RequiredArgsConstructor
public class ShoppingCartController {

    @Autowired
    ShoppingCartService shoppingCartService;

    @Autowired
    ShoppingCartRepository shoppingCartRepository;

    @GetMapping("/shoppingCart")
    public List<ShoppingCart> getUserShoppingCart(@RequestHeader("X-Customer-Id") String customerId) {

        System.out.println("==================IN GET SHOPPINGCART");
        List<ShoppingCart> items = shoppingCartService.findItemsByCustomerId(Long.valueOf(customerId));

        return items;
    }


    @PostMapping("/addToShoppingCart")
    public ResponseEntity<String> addToShoppingCart(@RequestBody ShoppingCart shoppingCart) {
        Long itemId = shoppingCart.getItem().getItemId();
        Long currentCustomerId = shoppingCart.getUser().getCustomerId();

        System.out.println("Current Customer ID: " + currentCustomerId);

        ShoppingCart existingShoppingCart = shoppingCartService.findShoppingCartByItemIdAndCustomerId(itemId, currentCustomerId);

        try {
            if (existingShoppingCart == null) {
                shoppingCart.setQuantity(1);
                shoppingCartService.saveShoppingCart(shoppingCart);
            } else {

                Integer currentQuantity = existingShoppingCart.getQuantity();
                existingShoppingCart.setQuantity(currentQuantity + 1);
                shoppingCartService.saveShoppingCart(existingShoppingCart);
            }
            return ResponseEntity.ok("Item updated successfully");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating item: " + e.getMessage());
        }
    }


    @DeleteMapping("/delete/{customerId}/{itemId}")
    public ResponseEntity<String> removeItemFromCart(@PathVariable Long customerId, @PathVariable Long itemId) {
        try {
            ShoppingCart cart = shoppingCartService.findShoppingCartByItemIdAndCustomerId(itemId, customerId);
            Long shoppingCartId = cart.getShoppingCartId();

            shoppingCartService.deleteShoppingCartById(shoppingCartId);

            return new ResponseEntity<>("Item removed successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to remove item from cart", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}