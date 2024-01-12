package com.dobri.springboot.shoppingCart;

import com.dobri.springboot.items.Items;
import com.dobri.springboot.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * @author Dobrin Dobrev
 */


@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    ShoppingCart findByUser(User user);

    List<ShoppingCart> findByUserCustomerId(Long customerId);

    ShoppingCart findByItemItemId(Long itemId);

    ShoppingCart findByItem(Items item);

//    @Modifying
//    @Query("DELETE FROM ShoppingCart s WHERE s.item.itemId = :itemId AND s.user.customerId = :customerId")
//    void deleteItemByCustomerIdAndItemId(@Param("customerId") Long customerId, @Param("itemId") Long itemId);

    @Query("SELECT s FROM ShoppingCart s WHERE s.item.itemId = :itemId AND s.user.customerId = :customerId")
    ShoppingCart findShoppingCartByItemIdAndCustomerId(@Param("itemId") Long itemId, @Param("customerId") Long customerId);

    boolean existsByItemItemIdAndUserCustomerId(Long itemId, Long customerId);

    void deleteByUserCustomerIdAndItemItemId(Long customerId, Long itemId);

//    @Modifying
//    @Query("DELETE FROM ShoppingCart s WHERE s.user.customerId = :customerId AND s.item.itemId = :itemId")
//    void deleteItemByCustomerIdAndItemId(@Param("customerId") Long customerId, @Param("itemId") Long itemId);

//    @Modifying
//    @Query("DELETE FROM ShoppingCart s WHERE s.user.customerId = :customerId AND s.item.itemId = :itemId")
//    void deleteByCustomerIdAndItemId(@Param("customerId") Long customerId, @Param("itemId") Long itemId);

//    List<ShoppingCart> deleteAllShoppingCart (List<ShoppingCart> shoppingCart);

}
