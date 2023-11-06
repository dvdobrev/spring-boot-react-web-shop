package com.dobri.springboot.shoppingCart;

import com.dobri.springboot.items.Items;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Dobrin Dobrev
 */

@Service
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    public ShoppingCart findItemById (Long itemId) {
        return shoppingCartRepository.findByItemItemId(itemId);
    }

    public ShoppingCart findItem (Items item) {
        return shoppingCartRepository.findByItem(item);
    }

    public List<ShoppingCart> findItemsByCustomerId(Long customerId) {
        return shoppingCartRepository.findByUserCustomerId(customerId);
    }

    public ShoppingCart findShoppingCartByItemIdAndCustomerId(Long itemId, Long customerId) {
        System.out.println("===================================");
        System.out.println("Shopping Cart: " + shoppingCartRepository.findShoppingCartByItemIdAndCustomerId(itemId, customerId) );
        System.out.println("===================================");
        return shoppingCartRepository.findShoppingCartByItemIdAndCustomerId(itemId, customerId);
    }


    public ShoppingCart saveShoppingCart(ShoppingCart shoppingCart) {

        return shoppingCartRepository.save(shoppingCart);
    }

    public void deleteShoppingCartById(Long shoppingCartId) {
        shoppingCartRepository.deleteById(shoppingCartId);
    }

//    public ShoppingCart findShoppingCartByCustomerAndItemId(Long itemId, Long currentCustomerId) {
//        return shoppingCartRepository.findShoppingCartByItemIdAndCustomerId(itemId, currentCustomerId);
//    }
}
