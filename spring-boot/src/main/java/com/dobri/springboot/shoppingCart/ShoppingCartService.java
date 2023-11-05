package com.dobri.springboot.shoppingCart;

import com.dobri.springboot.items.Items;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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


    public ShoppingCart saveShoppingCart(ShoppingCart shoppingCart) {

        return shoppingCartRepository.save(shoppingCart);
    }
}
