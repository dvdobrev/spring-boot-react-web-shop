package com.dobri.springboot.shoppingCart;

import com.dobri.springboot.address.Address;
import com.dobri.springboot.items.Items;
import com.dobri.springboot.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author Dobrin Dobrev
 */


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "shoppingCart")
public class ShoppingCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shoppingCartId;

    @OneToOne
    @JoinColumn(name = "customerId")
    private User user;

    @OneToOne
    @JoinColumn(name = "itemId")
    private Items item;

    private Integer quantity;
}
