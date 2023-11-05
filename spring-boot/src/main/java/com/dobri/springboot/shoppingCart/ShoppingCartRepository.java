package com.dobri.springboot.shoppingCart;

import com.dobri.springboot.items.Items;
import com.dobri.springboot.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * @author Dobrin Dobrev
 */


@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    ShoppingCart findByUser(User user);

    ShoppingCart findByItemItemId(Long itemId);

    ShoppingCart findByItem(Items item);
}